> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto-Approve Coding Agent Permission Prompts with Jev

> Auto-approve routine permission prompts in OpenCode, Claude Code, Codex CLI, and Cursor with Jev, keep risky commands on a static rule, and send unclear ones to you

<Tip>
  This recipe assumes a coding agent is already running against OpenRouter, for OpenCode the way [OpenCode Integration](/docs/cookbook/coding-agents/opencode-integration) describes, and that `OPENROUTER_API_KEY` is set in the environment the agent runs in. Jev is available on OpenRouter as `typesafe/jev-1.13` through the Decisions endpoint, so the coding model and the approval check can bill to the same key.
</Tip>

**Goal:** Stop approving `bun test`, `git status`, and `ls src` by hand in your coding agent without switching shell permissions to allow everything.

**Outcome:** One small TypeScript file, loaded as an OpenCode plugin or as a permission hook in Claude Code, Codex CLI, or Cursor, that sends each pending shell request to Jev and approves it only when Jev is at least 90% confident the command is reversible and matches the task. Commands that match your static risk list never reach Jev. Every other request falls through to the agent's normal permission prompt unchanged.

Every coding agent that asks before running shell commands produces the same problem. You turn prompting on to get a check between the model and `git push --force`, and you get dozens of prompts in a single session. Most of them are for `bun test`, `git diff`, or `cat package.json`. If you turn prompting off, the check disappears entirely. This page keeps the prompt and lets Jev clear the routine requests instead of you.

Jev doesn't generate text. It reads the state you send, the command, the task, and the project path, then returns a probability for each yes-or-no question. Your hook compares those probabilities to a fixed threshold. Anything below it leaves the request exactly as the agent had it, so a wrong or missing answer yields one extra prompt instead of an unwanted command. The [Jevvy](https://github.com/PanAchy/jevvy) project ships this pattern as an installable OpenCode plugin. This page shows the same design in code you own, shared across four agents, so you control the risk list and the questions.

Jev sees only the evidence in your request. It can't tell that a command reads a credential file or that a remote is production unless the command text says so. Keep irreversible and credential-touching commands on a static list in code, evaluated before Jev, and keep each agent's own deny rules for anything that must never run. In all four agents, a deny rule is evaluated by the host and a hook returning allow can't override it.

## Prerequisites

* One of OpenCode `2.0.12` or later, Claude Code, Codex CLI, or Cursor. The hook names, event fields, and output shapes below are verified against the OpenCode v2.0.12 source and the current hooks documentation for the other three, linked in each section
* [Bun](https://bun.sh) on the machine the agent runs on. OpenCode runs plugins with its own runtime, and the hook scripts for the other agents run with `bun`
* `OPENROUTER_API_KEY` in the environment the agent runs in, with credits for the coding model and Jev

Steps 1 to 3 are shared. Then pick the section for your agent, which adds the entry point and the configuration. The TypeScript blocks from the shared steps and from one agent section form a single file.

## 1. Keep risky commands on a static list

There are some commands you probably don't want running based off of your model's opinion, so this check catches them in code before Jev is consulted. A match sends the request straight back to the prompt with no Decisions call made. The list is short on purpose: recursive deletes, force pushes and hard resets, privilege escalation, publishing and deploying, credential files, and commands that hand a quoted string to another shell or interpreter, which is the one way to hide any of the above from a text check. The rest of the code exists so a compound or disguised command can't slip past those patterns. It splits at every operator that can start a new command, strips wrappers, assignments, path prefixes, and shell keywords until each program name is bare, and refuses anything it still can't read. Splitting ignores quotes, so a separator inside a quoted argument can only add a prompt, never hide a command. Add your own entries for your project, such as a production database CLI or a remote you never push to from an agent.

```typescript lines theme={null}
const RISKY = [
  /^(\S*['"\\=$]|[-0-9])/,
  /^(sudo|doas|su)\b/,
  /^(bash|sh|zsh|fish|eval|xargs)\b/,
  /^(node|bun|python3?)\s+(-\S+\s+)*(-c|-e|-p|--eval)\b/,
  /^rm\s+(-\S*[rRf]\S*\s+)+/,
  /^git\b.*\b(push|reset\s+--hard|clean\s+-\S*[fd]|branch\s+-D)\b/,
  /^(npm|pnpm|yarn|bun)\s+publish\b/,
  /^(wrangler|vercel|fly|flyctl)\s+deploy\b|^terraform\s+(apply|destroy)\b|^kubectl\s+(delete|apply)\b/,
  /\.env\b|\.ssh\b|\.aws\b|\.npmrc\b|\.netrc\b|credentials/i,
]

function neverAutoApprove(command: string): boolean {
  if (/\$\(|[<>]\(|`|\\\r?\n/.test(command)) return true
  return command
    .split(/\s*(?:&&|\|\||;|\||&|\n|[(){}])\s*/)
    .map(normalizeCommand)
    .some((part) => RISKY.some((pattern) => pattern.test(part)))
}

function normalizeCommand(part: string): string {
  let current = part
  while (true) {
    const next = current
      .trim()
      .replace(/^(if|then|elif|else|fi|while|until|do|done|for|in|case|esac|!)\s+/, "")
      .replace(/^(command|builtin|exec|env|nohup|time|timeout|nice|watch|npx|bunx|pnpx)\s+/, "")
      .replace(/^[A-Za-z_][A-Za-z0-9_]*=[^\s'"\\$]*\s+/, "")
      .replace(/^\\/, "")
      .replace(/^[^\s'"\\$]*\//, "")
    if (next === current) return current
    current = next
  }
}
```

## 2. Ask Jev two Noul questions

With the dangerous commands filtered out, what remains is the judgment a reviewer makes before clicking approve: can this be undone, and does it move the task forward. This function puts those two questions to Jev as Nouls, yes-or-no questions answered with a probability between `0` and `1`, so the bar for approval is a number you set rather than a prompt you tune. It answers yes only when every asked score clears the threshold, and it answers unknown for any network failure, timeout, error response, unreadable body, or score outside the expected range, so every entry point can treat anything other than a clear yes as leave the prompt alone. When the agent's hook carries no task text, only the reversibility question is asked.

```typescript lines theme={null}
const JEV_MODEL = "typesafe/jev-1.13"
const APPROVE_AT = 0.9

const QUESTIONS = {
  reversible: {
    type: "noul",
    instructions:
      "Every command in `commands` only reads or changes files inside `project` and can be undone with git or by rerunning it. It does not push, publish, deploy, delete files outside the project, change system settings, or send data to a network service.",
  },
  serves_task: {
    type: "noul",
    instructions: "Running `commands` is a reasonable next step toward `task`.",
  },
} as const

type State = {
  commands: readonly string[]
  project: string
  task?: string
  agent?: string
}

async function jevApproves(state: State): Promise<boolean | undefined> {
  const asked: ReadonlyArray<keyof typeof QUESTIONS> =
    state.task === undefined ? ["reversible"] : ["reversible", "serves_task"]
  const questions = Object.fromEntries(asked.map((key) => [key, QUESTIONS[key]]))
  const res = await fetch("https://openrouter.ai/api/alpha/decisions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: JEV_MODEL, state, questions }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => undefined)
  if (res === undefined) return undefined
  if (!res.ok) {
    await res.body?.cancel()
    return undefined
  }
  const body = (await res.json().catch(() => undefined)) as
    | { answers?: Record<string, { type: "noul"; noul: unknown } | undefined> }
    | undefined
  const scores = asked.map((key) => body?.answers?.[key]?.noul)
  if (!scores.every(isProbability)) return undefined
  return scores.every((score) => score >= APPROVE_AT)
}

function isProbability(value: unknown): value is number {
  return typeof value === "number" && value >= 0 && value <= 1
}
```

The response also includes `id`, `provider`, `model`, and `usage` (which has `input_tokens`, `output_tokens`, and `cost`). If you want an audit trail of what was approved and what it cost, log `id` and `usage.cost` next to the commands.

<Warning>
  Each prompt that passes the risk list is one paid Decisions request. In the captured runs below, a request with a 400-token state cost \$0.0000168. Jev's answer is only as good as the state. A command that reads a secret from a file whose name isn't on your risk list looks like a routine `cat` to Jev, so treat the risk list, not the threshold, as the security boundary.
</Warning>

## 3. Check the thresholds against real commands

Before wiring the function into an agent, it helps to see what the scores look like for commands you recognize, and to check that the threshold separates them the way you would. The three requests below were sent to `typesafe/jev-1.13` with both questions from step 2 and share one task and project, so only the command changes between them. Output is captured from the Decisions endpoint on 2026-09-21, trimmed to `answers` and `usage`.

```json lines theme={null}
// state, shared by all three requests
{ "task": "Fix the failing date parsing test in src/utils/date.test.ts and make the suite pass",
  "project": "/Users/dev/shop-api", "agent": "build" }

// commands: ["bun test src/utils/date.test.ts"]
{ "answers": { "reversible": { "noul": 0.93 }, "serves_task": { "noul": 0.95 } },
  "usage": { "input_tokens": 400, "output_tokens": 40, "cost": 0.0000168 } }

// commands: ["bun add left-pad"]
{ "answers": { "reversible": { "noul": 0.45 }, "serves_task": { "noul": 0.09 } },
  "usage": { "input_tokens": 397, "output_tokens": 40, "cost": 0.000016674 } }

// commands: ["npx wrangler deploy"]
{ "answers": { "reversible": { "noul": 0.04 }, "serves_task": { "noul": 0.07 } },
  "usage": { "input_tokens": 399, "output_tokens": 40, "cost": 0.000016758 } }
```

With `APPROVE_AT = 0.9`, the test run is approved and the other two stay on the prompt. `bun add left-pad` isn't dangerous, but it isn't what the task asked for, and its low `serves_task` score reflects that. `npx wrangler deploy` is also caught by the `wrangler` pattern in step 1, so in a running hook it never reaches Jev. It's included here to show that the model and the static list agree.

The scores aren't constants, they're probabilities. Repeating the same request moves them by a few hundredths, and even the task text can move them as much as the command does. So a routine command with a vague or missing task description might land just under `0.9` and prompt you. Start at `0.9` and expect this in the first few days. If commands you'd have approved by hand without a second thought keep prompting you, lower it toward `0.8`. But if Jev approved a command you'd have declined at a glance, add its shape to `RISKY` first, then tighten the threshold. The list is where the fix belongs.

## Auto-approve OpenCode permissions

OpenCode 2.x starts every agent with an `allow` rule for every tool, so nothing prompts until you add a rule. OpenCode then evaluates every tool permission in three stages. Your configured rules produce `allow`, `deny`, or `ask`. A `deny` stops right there. Otherwise OpenCode calls each plugin's `permission.hook("evaluate")` with the result, and the plugin may change `event.effect`. A final `allow` runs the command, a final `deny` blocks it, and a final `ask` opens the prompt you already see. Hook names and event fields are verified against the [OpenCode v2.0.12 source](https://github.com/anomalyco/opencode/tree/v2.0.12). Older 1.x releases used a different `permission.ask` hook that this page doesn't cover.

### Set OpenCode shell permissions to ask

A plugin that only turns ask into allow has nothing to act on while OpenCode approves everything by default. This rule in `opencode.json` makes every shell command prompt, which gives the plugin a request to evaluate and gives you the baseline the rest of the section improves on. Commands that must never run belong on a deny rule in the same file, because OpenCode applies deny rules before any plugin sees the request. The [OpenCode permissions docs](https://opencode.ai/docs/permissions) describe the rule format for your version.

```json lines theme={null}
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "shell": "ask"
  }
}
```

### Hook OpenCode permission evaluation

This plugin is where the shared checks meet a live request. It ignores anything that isn't a shell command still waiting on a prompt, returns early when the static list matches any of the parsed commands, and otherwise sends Jev the commands together with the last thing you asked for in the session and the directory OpenCode is working in. Only a confident yes changes the request to allow, and every other outcome leaves the prompt as it was. Save it together with the shared blocks as one `.ts` file under `.opencode/plugins/` in your project, where OpenCode loads it with no install step.

```typescript lines theme={null}
import type { Plugin } from "@opencode/plugin"

type Event = Parameters<Parameters<Plugin.Context["permission"]["hook"]>[1]>[0]

export default {
  id: "jev-permissions",
  setup: async (ctx) => {
    await ctx.permission.hook("evaluate", async (event) => {
      if (event.effect !== "ask" || event.action !== "shell") return
      if (event.resources.some(neverAutoApprove)) return
      if ((await jevApproves(await buildState(ctx, event))) === true) {
        event.effect = "allow"
      }
    })
  },
} satisfies Plugin.Plugin

async function buildState(ctx: Plugin.Context, event: Event): Promise<State> {
  const messages = await ctx.session.context({ sessionID: event.sessionID })
  const task = messages
    .filter((message) => message.type === "user")
    .at(-1)?.text.slice(0, 2_000)
  return {
    task,
    project: ctx.location.directory,
    agent: event.agent,
    commands: event.resources,
  }
}
```

Setting `event.effect` approves this one request and doesn't write a saved rule. The same command asks again next time unless Jev clears it again. OpenCode already splits `&&`, `;`, pipes, and `$(...)` substitutions into separate entries of `event.resources`, and `event.metadata` is `undefined` on shell requests, so read commands from `event.resources`, not from `event.metadata.command`. `@opencode/plugin` is a type-only import. To typecheck the file in your editor, add it as a dev dependency and set `moduleResolution` to `bundler` in `tsconfig.json`, since the package resolves its types through `exports`.

## Auto-approve Claude Code permission prompts

Claude Code runs [`PermissionRequest` hooks](https://code.claude.com/docs/en/hooks#permissionrequest) only when it's about to ask you for permission, so a hook here never sees commands that an allow rule already covers. The hook receives one JSON object on stdin with `cwd`, `tool_name`, and `tool_input`, and for `Bash` the command is `tool_input.command`. Printing `{"hookSpecificOutput": {"hookEventName": "PermissionRequest", "decision": {"behavior": "allow"}}}` grants this one request. Exiting `0` with no output leaves the permission flow unchanged, which is what the script does whenever the static list matches or Jev isn't confident. The hook also runs where Claude Code can't show a prompt, such as `claude -p` and background subagents, and there a request with no hook decision is denied rather than asked. Deny and ask rules in your settings are still evaluated, so an `allow` from the hook can't override a matching deny rule.

### Read the Claude Code hook input

Claude Code runs this script only when it's about to interrupt you, and it hands over the tool name, the command, and the agent's own one-line description of what it's doing. There's no user task in that input, so the script uses the description in its place, which means the second Jev question checks the command against what the agent said it was doing rather than what you asked for. When the command passes the static list and Jev is confident, the script prints an allow decision, and in every other case it prints nothing and exits cleanly so the prompt appears as before. The `turn_id` check exists for Codex, which sends the same input shape but fills the description with an approval question instead of a task, as the next section explains, and you can save the script together with the shared blocks as one `.ts` file anywhere in your project.

```typescript lines theme={null}
import { text } from "node:stream/consumers"

type PermissionRequest = {
  cwd: string
  tool_name: string
  tool_input: { command?: unknown; description?: unknown }
  turn_id?: unknown
}

const input = JSON.parse(await text(process.stdin)) as PermissionRequest
const command = input.tool_input.command
const description = input.tool_input.description
if (input.tool_name === "Bash" && typeof command === "string" && !neverAutoApprove(command)) {
  const approved = await jevApproves({
    commands: [command],
    project: input.cwd,
    task: typeof description === "string" && input.turn_id === undefined ? description : undefined,
  })
  if (approved === true) {
    console.log(
      JSON.stringify({
        hookSpecificOutput: { hookEventName: "PermissionRequest", decision: { behavior: "allow" } },
      }),
    )
  }
}
```

### Register the hook in Claude Code settings

Claude Code runs the script only once it is registered as a permission hook in `.claude/settings.json` in your project. The entry limits the script to shell prompts, so file edits and other tools keep their normal flow. Jev gets up to 15 seconds to answer before Claude Code gives up on the hook and prompts. Replace the path with wherever you saved the file.

```json lines theme={null}
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bun ./path/to/jev-permission-hook.ts",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

## Auto-approve Codex CLI approval prompts

Codex CLI has a [`PermissionRequest` hook](https://developers.openai.com/codex/hooks#permissionrequest) with the same input and output contract as Claude Code. It runs when Codex is about to ask for approval, such as a shell escalation, and not for commands that don't need one. The input carries `cwd`, `tool_name`, and `tool_input`, with `tool_input.command` for `Bash` and an optional `tool_input.description`. The same `hookSpecificOutput` object with `decision.behavior` set to `allow` skips the prompt. If no matching hook returns a decision, Codex uses its normal approval flow, and if any matching hook returns `deny`, the deny wins. Don't return `updatedInput`, `updatedPermissions`, or `interrupt` from this hook, since Codex treats those fields as reserved and fails closed.

The script from the Claude Code section serves Codex too, with one difference in what it sends to Jev. Codex fills `tool_input.description` with its approval reason, phrased as a question to you such as `May I run git add src/date.test.ts outside the sandbox?`, and Jev reads that as a poor fit for the command. Captured on 2026-09-22 from a Codex CLI 0.155.1 session, that exact state scored `0.91` on `reversible` and `0.54` on `serves_task`, so a script that passed it as the task would never approve. Codex adds a `turn_id` field to the hook input that Claude Code doesn't send, and the script uses it to drop the task for Codex and ask only the reversibility question, as it does for Cursor. Save the script once and point both configurations at it.

### Register the hook in Codex

Codex picks up the same script through its own registration in `.codex/hooks.json` in your project, and the entry mirrors the Claude Code one with an optional status line shown while the hook runs. Codex loads project-local hooks only when the project's `.codex/` layer is trusted, and it requires you to review and trust each new or changed non-managed hook through `/hooks` in the CLI before it runs. Until you do, Codex skips the hook and every approval prompts as before.

<Info>
  In a Codex CLI 0.155.1 session on 2026-09-22, the hook process received no environment variable whose name contained `KEY`, including `OPENROUTER_API_KEY`, even with `shell_environment_policy.inherit` set to `all`, so the Decisions request failed and every command prompted. Bun loads a `.env` file from the directory the hook runs in, which is your project, so put `OPENROUTER_API_KEY` in a `.env` that Git ignores and the script works unchanged.
</Info>

```json lines theme={null}
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bun ./path/to/jev-permission-hook.ts",
            "statusMessage": "Checking with Jev",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

## Auto-approve Cursor shell commands

Cursor's [`beforeShellExecution` hook](https://cursor.com/docs/agent/hooks) runs before every shell command the agent executes, not only the ones that would prompt, and returns a permission decision. The input is `command`, `cwd`, and `sandbox`. The output is `{"permission": "allow" | "deny" | "ask"}` with optional `user_message` and `agent_message`. Cursor's failure handling is the opposite of the other three agents. Valid JSON that doesn't match the schema blocks the command, but a crash, a timeout, or a nonzero exit code other than `2` fails open by default and the command runs. The configuration below sets `failClosed` so that those failures block instead.

### Return a Cursor permission decision

Cursor asks this script about every shell command, not only the ones that would prompt, so it must always answer. It answers `allow` only when the static list doesn't match and Jev is confident, and `ask` in every other case, including input it can't parse, so a Jev outage, a timeout, or malformed stdin still produces a prompt rather than an approval or a crash that Cursor might treat as permission. Cursor sends no task text, so only the reversibility question is asked and the static list carries more of the weight here. Save it together with the shared blocks as one `.ts` file anywhere in your project.

```typescript lines theme={null}
import { text } from "node:stream/consumers"

type CursorBeforeShellExecution = { command: string; cwd: string; sandbox: boolean }

function isCursorInput(value: unknown): value is CursorBeforeShellExecution {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { command?: unknown }).command === "string" &&
    typeof (value as { cwd?: unknown }).cwd === "string"
  )
}

const input: unknown = await text(process.stdin)
  .then((raw) => JSON.parse(raw) as unknown)
  .catch(() => undefined)
const approved =
  !isCursorInput(input) || neverAutoApprove(input.command)
    ? false
    : await jevApproves({ commands: [input.command], project: input.cwd })
console.log(JSON.stringify({ permission: approved === true ? "allow" : "ask" }))
```

### Register the hook in Cursor

Cursor's default is to let a command run when a hook crashes or times out, which is the wrong direction for an approval gate. This registration in `.cursor/hooks.json` in your project turns that around so a failed hook blocks the command, and it gives Jev up to 15 seconds to answer. Add a `matcher` regex if you want the hook to run only for some commands.

```json lines theme={null}
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "command": "bun ./path/to/jev-permission-hook.ts",
        "timeout": 15,
        "failClosed": true
      }
    ]
  }
}
```

## Check your work

* With the hook or plugin removed and prompting configured, every shell command prompts, including `bun test`. This is the baseline the hook improves on
* With the hook in place, ask the agent for a small change that needs tests. Test commands that score at least `0.9` on every asked question run without a prompt, and the rest prompt as before. In OpenCode, `opencode plugin list` shows `jev-permissions` as a local plugin
* Ask the agent to push the branch. `git push` always prompts, because the `git push` pattern in `RISKY` returns before `jevApproves` and no Decisions request is made
* Change `AbortSignal.timeout(8_000)` to `AbortSignal.timeout(1)` and repeat the test request. Every shell command prompts, because `jevApproves` returns `undefined` when the request fails and the entry point leaves the request on the prompt. In Cursor, the script prints `{"permission":"ask"}`
* A command approved by Jev runs once. The same command asks again on the next call, because the hook never writes a saved rule
* A host deny rule blocks the command with no Decisions request in OpenCode, and can't be overridden by an `allow` from the hook in Claude Code and Codex, because each agent evaluates deny rules independently of the hook
* Pipe a sample `PermissionRequest` JSON object into `bun ./path/to/jev-permission-hook.ts` from a terminal. A `Bash` command that matches `RISKY` prints nothing and exits `0`. Pipe text that isn't JSON into the Cursor script and it prints `{"permission":"ask"}`
* In Codex, a shell escalation such as `git add` inside `.git` reaches the hook with `turn_id` set, and a command that scores at least `0.9` on `reversible` runs without the approval prompt

## Next steps

* [Gate Agent Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) applies the same threshold pattern to tools in an OpenRouter Agent SDK agent, with `approve`, `block`, and `review` outcomes
* [OpenCode Integration](/docs/cookbook/coding-agents/opencode-integration) covers pointing OpenCode at OpenRouter and picking models, which the OpenCode section assumes is done
* [Add Human-in-the-Loop Controls](/docs/cookbook/building-agents/hitl-tools) is the pause-and-resume pattern that these prompts are a coding-agent version of
* [TypeSafe SDK on OpenRouter](/docs/guides/community/typesafe-sdk) shows the Choice, Score, and Noul primitives if you want a three-way `approve`, `ask`, `deny` question instead of two Nouls
