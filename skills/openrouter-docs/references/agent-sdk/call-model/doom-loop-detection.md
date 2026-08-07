> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Doom-Loop Detection

> Detect and act on agent runs that repeat the same tool calls, server-tool requests, or text without making progress.

## Overview

Sometimes an agent gets stuck. It tries the same tool call, gets the same result, and tries again anyway, like a robot vacuum bumping into the same wall forever. That's a doom loop: the run keeps spending money without getting anywhere.

Doom-loop detection watches for this inside the `callModel` tool loop. It's **off by default**. Turn it on with `doomLoop: true`:

```typescript theme={null}
const result = openrouter.callModel({
  model: 'openai/gpt-4o',
  input: 'Research this topic',
  tools: [searchTool, bashTool] as const,
  doomLoop: true, // recommended defaults: observe@2, block@3, stop@6
  // or tune it:
  // doomLoop: {
  //   ladder: { observe: 2, steer: false, block: 3, stop: 6 },
  //   text: { minRepeats: 4 }, // or `false` to disable text detection
  // },
});

// Was the run stopped by detection?
const verdict = await result.getDoomLoopVerdict();
if (verdict) console.warn(verdict.message);
```

It watches for three kinds of stuck:

1. **Repeating a call to one of your tools.** The model calls a tool you defined in `tools` with the same inputs, turn after turn. Broken calls count too: a model that keeps sending empty `{}` or invalid JSON is just as stuck.
2. **Repeating a request to an OpenRouter server tool.** Server tools like web search run on OpenRouter's side, not in your code, so you never see the call. The detector still catches a model running the exact same web search every turn.
3. **Repeating the same text.** A phrase repeating at the end of one response, or a response that's identical to the previous one.

## How repeats are counted

Each time the model repeats itself, its streak grows by one. The rules for counting are simple and predictable: the same transcript always produces the same result.

A repeat only counts when the model saw the result and tried the same thing again. So if the model fires five identical calls at once in a single turn, that counts as one, not five. Using other tools in between doesn't reset a tool's streak. Changing the inputs does.

## What happens as the streak grows

You set a threshold for each action you want. When the streak reaches a threshold, that action fires, and the strongest one wins:

| Action     | Effect                                                                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `observe`  | Take notes only: emit the `DoomLoopDetected` hook so you can see it happened                                                                                                                                                                                                  |
| `steer`    | Nudge the agent with a message before its next turn, telling it it's repeating itself (off by default)                                                                                                                                                                        |
| `escalate` | Call in help: run the next turn on a stronger model and/or a forced `openrouter:advisor` consult, then switch back (off by default; needs an `escalation` config)                                                                                                             |
| `block`    | Refuse to run the repeated call. The model gets an error explaining why, so it can change course. Text and server-tool repeats can't be blocked (they already happened); those fall through to the strongest weaker action you've enabled (`escalate`, `steer`, or `observe`) |
| `stop`     | End the run before it wastes more money (`SessionEnd.reason: 'doom_loop'`). Any unfinished tool calls get clean error outputs, so the saved conversation stays valid and can be resumed                                                                                       |

The SDK checks your thresholds make sense and warns about combinations that can't work. For example, `block` without `stop` means a stubborn model can keep retrying the blocked call forever (bounded only by `stopWhen`), and a weaker action set at a higher threshold than a stronger one can never fire.

Want different behavior for one tool? The `DoomLoopDetected` [lifecycle hook](/docs/agent-sdk/call-model/lifecycle-hooks) sees every verdict and can override the action per event (`overrideAction`, last handler wins). Downgrade a block to observe for a tool you know repeats harmlessly, or jump straight to stop.

## Getting unstuck with a stronger model

Instead of just blocking a stuck agent, you can give it help. With `escalate`, the next turn runs on a smarter model, then switches back to the cheap one:

```typescript theme={null}
openrouter.callModel({
  model: 'z-ai/glm-5.2', // the everyday executor
  input: 'Research this topic',
  tools: [searchTool] as const,
  doomLoop: {
    ladder: { observe: 2, escalate: 3, block: 5, stop: 8 },
    escalation: {
      // Either or both:
      model: 'anthropic/claude-opus-4.6', // run the NEXT turn on a stronger model
      advisor: true, // and/or force an openrouter:advisor consult
      maxEscalations: 2, // spend cap for the whole conversation
    },
  },
});
```

When this fires, the engine tells the model a loop was detected, runs one turn with the extra help, then goes back to normal. `maxEscalations` caps how many times this can happen in a conversation, even across pauses and resumes. Once the budget runs out, the weaker actions take over.

## Telling the detector what counts as "the same": `loopKey`

By default, two calls count as the same when all their inputs match exactly. That default is sometimes wrong, so you can give each tool its own idea of "the same" with `loopKey`:

```typescript theme={null}
// Compute the identity. A web-search tool normalizes its query,
// so "Cats" and " cats " count as the same search.
tool({
  name: 'web_search',
  inputSchema: z.object({ query: z.string() }),
  loopKey: ({ query }) => query.trim().toLowerCase(),
  execute: async ({ query }) => search(query),
});

// Only some fields matter. A bash call is identified by the command
// AND where it runs; other fields (e.g. verbose) don't count.
tool({
  name: 'bash',
  inputSchema: z.object({
    command: z.string(),
    cwd: z.string(),
    verbose: z.boolean(),
  }),
  loopKey: ({ command, cwd }) => ({ command, cwd }),
  execute: async ({ command, cwd }) => run(command, cwd),
});

// false: never count this tool. Repetition is this tool's job.
tool({
  name: 'check_status',
  inputSchema: z.object({ jobId: z.string() }),
  loopKey: false,
  execute: async ({ jobId }) => poll(jobId),
});
```

A function-form `loopKey` can return `null` to skip one specific call. If it fails in any way (returns `undefined`, throws, or returns something that can't be hashed), the SDK falls back to comparing all the inputs and logs a warning. Detection never crashes a run.

A field-name array (`loopKey: ['command', 'cwd']`) also works. Because it's plain data rather than code, it survives caching and can travel over the wire via `_meta['openrouter/loopKey']`. [MCP-wrapped tools](/docs/agent-sdk/call-model/mcp-tools) accept a `loopKey` via `markMcp(tool, { loopKey })` or the `loopKeys` map on `createMCPTools`.

## Pausing and resuming

You don't need to worry about a model dodging detection with rearranged JSON keys or formatting changes, and a model stuck sending the same invalid JSON gets caught instead of bouncing off the parse error forever.

The detector's memory lives inside the conversation state, so streaks survive when you save and resume a conversation, as long as your resuming call also passes `doomLoop`. You can clear a `stop` verdict by sending a fresh user message, but the streaks stay, so you'll still catch a model that goes right back to repeating.

<Note>
  The SDK treats built-in `task`-tool calls as internal: they're exempt from
  doom-loop detection. See [Async Tools](/docs/agent-sdk/call-model/async-tools).
</Note>

## What this doesn't catch

* **Loops with changing inputs.** If the model invents a fresh timestamp or random value each call, the calls never look "the same". You can fix this per tool with a `loopKey` that picks out the fields that matter.
* **Saying the same thing in different words.** Text detection needs exact repeats. Rephrasing the same idea doesn't trip it.
* **Inputs changed by hooks.** Repeats are judged on what the model sent, before any `PreToolUse` hook rewrites it. A hook can't create repeats that weren't there, and can't hide ones that were.
* **Calls your own code executes.** Manual and client-executed calls pause the loop and aren't counted. Only calls the SDK ran, blocked, or failed to parse count as evidence.
