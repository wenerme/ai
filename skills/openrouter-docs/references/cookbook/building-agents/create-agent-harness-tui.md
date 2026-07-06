> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build Your Own Agent TUI

> Scaffold a custom AI agent with a fully customizable terminal interface using an AI coding agent

<Info>
  Looking to build a headless agent for scripts, pipelines, or API servers instead? See the [Build Your Own Headless Agent](/cookbook/building-agents/create-headless-agent) guide.
</Info>

The [create-agent-tui](https://github.com/OpenRouterTeam/skills/tree/main/skills/create-agent-tui) skill scaffolds a complete agent TUI (terminal user interface) in TypeScript — like `create-react-app` for terminal agents. Tell your AI coding agent what kind of agent you want, and it generates a runnable project targeting [OpenRouter](https://openrouter.ai) with a fully customizable terminal interface, tools, and configuration.

Under the hood, this is a full **agent harness**: the generated project uses [`@openrouter/agent`](https://www.npmjs.com/package/@openrouter/agent) for the inner loop (model calls, tool execution, stop conditions) and provides everything around it — configuration, tool definitions, session management, and the entry point.

## When to build your own

Building a custom agent TUI makes sense when:

* **You want to customize the look** — create a fun UI or a custom one for your project or team
* **You need custom tools** — your agent interacts with your own APIs, databases, or domain-specific systems that generic agents can't reach
* **You want control over the loop** — you need custom stop conditions, approval flows, cost limits, or model selection logic that hosted agents don't expose
* **You're shipping a product** — the agent is part of your application, not a developer tool, and you need to own the entry point (CLI, API server, embedded)
* **You want to learn** — understanding how agents work at the tool-execution level makes you better at using and debugging them

If you're already using Claude Code, Codex CLI, or Cursor as-is, you probably don't need this — those are already production agent TUIs. This skill is for when you need to build your own.

## Install the skill

The create-agent-tui skill is part of the [OpenRouter Skills](https://github.com/OpenRouterTeam/skills) collection. Install it with your AI coding agent of choice:

<Tabs>
  <Tab title="GitHub CLI">
    Requires [GitHub CLI](https://cli.github.com/) v2.90.0+. Works with Claude Code, Cursor, OpenCode, Codex, Gemini CLI, Windsurf, and [many more agents](https://cli.github.com/manual/gh_skill_install):

    ```bash lines theme={null}
    gh skill install OpenRouterTeam/skills create-agent-tui
    ```
  </Tab>

  <Tab title="Claude Code">
    ```lines theme={null}
    /plugin marketplace add OpenRouterTeam/skills
    /plugin install openrouter@openrouter
    ```
  </Tab>

  <Tab title="Cursor">
    Add via **Settings > Rules > Add Rule > Remote Rule (Github)** with `OpenRouterTeam/skills`.
  </Tab>
</Tabs>

Once installed, ask your agent something like *"build me an agent TUI"* or *"scaffold a coding assistant"* and the skill activates automatically.

## Prerequisites

* Node.js 18+
* An [OpenRouter API key](https://openrouter.ai/settings/keys)

## How it works

The skill presents your coding agent with an interactive checklist of tools, modules, visual styles, and slash commands. You pick what you need, and the agent generates the entire project — ready to run with `npm start`.

### What `@openrouter/agent` handles

| Concern             | How the SDK handles it                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Model calls**     | `client.callModel()` — one call, any model on OpenRouter                                              |
| **Tool execution**  | Define tools with `tool()` and Zod schemas; the SDK validates input and calls your `execute` function |
| **Multi-turn**      | The SDK loops (call model -> execute tools -> call model) until a stop condition fires                |
| **Stop conditions** | `stepCountIs(n)`, `maxCost(amount)`, `hasToolCall(name)`, or custom functions                         |
| **Streaming**       | `result.getTextStream()` for text deltas, `result.getToolCallsStream()` for tool calls                |
| **Cost tracking**   | `result.getResponse().usage` with input/output token counts                                           |
| **Shared context**  | Type-safe shared state across tools via `sharedContextSchema`                                         |

## Visual customization

Every part of the terminal UI is customizable. The skill lets you choose each style when scaffolding, and you can override them at launch via CLI flags or in the config file.

### Tool display styles

Choose how tool calls appear during agent execution. Set `display.toolDisplay` in your config or pass `--tool-display` at launch.

| Style                   | Description                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **`grouped`** (default) | Bold action labels with tree-branch output; consecutive same-type calls are merged |
| **`emoji`**             | Per-call markers with tool name, arguments, and timing                             |
| **`minimal`**           | Aggregated one-liner summaries, flushed when text resumes                          |
| **`hidden`**            | Suppresses tool output entirely                                                    |
| **Custom**              | Describe what you want — the skill implements a custom display                     |

**Grouped** — bold action labels with tree-branch output:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/tool-display-grouped.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=9af120a40df609342a411864a334b8e7" alt="Grouped tool display" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/tool-display-grouped.png" />
</Frame>

**Emoji** — per-call markers with tool name, arguments, and timing:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/tool-display-emoji.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=fb13de6628931a227c94e0130f00a8a9" alt="Emoji tool display" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/tool-display-emoji.png" />
</Frame>

**Minimal** — aggregated one-liner summaries:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/tool-display-minimal.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=ae60482d5364fa70f272e43a0638d733" alt="Minimal tool display" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/tool-display-minimal.png" />
</Frame>

You can also describe a completely custom tool display style and the skill will implement it for you.

### Input styles

Three input styles are available via `display.inputStyle` or `--input`.

| Style                 | Description                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`block`** (default) | Full-width background-colored input box with `›` prompt — adapts to your terminal's color scheme using OSC 11 background detection |
| **`bordered`**        | Horizontal `─` lines above and below the input — works on any terminal                                                             |
| **`plain`**           | Simple `> ` readline prompt — no raw mode, no escape sequences                                                                     |
| **Custom**            | Describe what you want — the skill implements a custom input style                                                                 |

**Block** — full-width background input box that adapts to your terminal theme:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/input-style-block.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=2b96f4997b82b71144b0a498c7074c7b" alt="Block input style" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/input-style-block.png" />
</Frame>

**Bordered** — horizontal line frame that works on any terminal:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/input-style-bordered.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=71fde3d3b5d61d56905e53955cc97ccd" alt="Bordered input style" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/input-style-bordered.png" />
</Frame>

**Plain** — simple readline prompt, no escape sequences:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/input-style-plain.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=95737609cbefab8cb263e150611dd46c" alt="Plain input style" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/input-style-plain.png" />
</Frame>

You can also describe a completely custom input style and the skill will implement it for you.

### Loader animations

Three loader styles shown while waiting for the model response. Set `display.loader.style` and `display.loader.text` in config.

| Style                    | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| **`gradient`** (default) | Scrolling color shimmer over the loader text                     |
| **`spinner`**            | Braille dot animation (⠋⠙⠹…) to the left of the text             |
| **`minimal`**            | Trailing dots (`Working···`)                                     |
| **Custom**               | Describe what you want — the skill implements a custom animation |

**Gradient** — scrolling color shimmer:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/loader-gradient.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=ef65fe345c3b097ce510e31a1c0d1a3c" alt="Gradient loader" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/loader-gradient.png" />
</Frame>

**Spinner** — braille dot animation:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/loader-spinner.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=4ca66d2a48131bc94ce89df51ac55bb5" alt="Spinner loader" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/loader-spinner.png" />
</Frame>

**Minimal** — trailing dots:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/loader-minimal.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=190a85197f129673395e425cb0ea9a3b" alt="Minimal loader" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/loader-minimal.png" />
</Frame>

You can also describe a completely custom loader animation and the skill will implement it for you.

### ASCII banner

Enable `showBanner` or pass `--banner "Your Agent Name"` to display a custom ASCII art logo on startup. The skill generates block-letter art for your project name using the `█` character, colored and sized to fit a 60-column terminal.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/banner.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=d9c3d77f67846fd9bf810adef7514609" alt="ASCII banner on startup" width="1080" height="720" data-path="assets/cookbook/building-agents/create-agent-harness-tui/banner.png" />
</Frame>

## Generated project structure

With default options selected, the skill generates this layout:

```expandable lines theme={null}
my-agent/
  package.json              @openrouter/agent, zod, tsx
  tsconfig.json             ES2022, Node16, strict
  .env.example              OPENROUTER_API_KEY=
  src/
    config.ts               Layered config (defaults -> file -> env)
    agent.ts                Core runner with retry
    cli.ts                  Interactive REPL with streaming
    session.ts              JSONL conversation persistence
    terminal-bg.ts          Adaptive background detection
    renderer.ts             Tool display renderer
    loader.ts               Loader animation
    commands.ts             Slash command registry
    tools/
      index.ts              Tool registry + server tools
      file-read.ts          Read files with offset/limit
      file-write.ts         Write/create files
      file-edit.ts          Search-and-replace with diff
      glob.ts               Find files by pattern
      grep.ts               Search content by regex
      list-dir.ts           List directory entries
      shell.ts              Execute commands with timeout
```

Run it with:

```bash lines theme={null}
export OPENROUTER_API_KEY="sk-or-..."
npm start
```

Override visual styles at launch:

```bash lines theme={null}
npm start -- --banner "Acme Bot" --model '~anthropic/claude-sonnet-latest' --input bordered --tool-display emoji
```

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/agent-harness-tui.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=3d8cb85bf772c777311209e42dd94d9b" alt="Agent TUI running in the terminal" width="700" height="550" data-path="assets/cookbook/building-agents/create-agent-harness-tui/agent-harness-tui.png" />
</Frame>

## Customization options

The skill presents a checklist when invoked. Items marked **on** are pre-selected defaults.

### Server tools

Executed by OpenRouter server-side — zero client code needed.

| Tool             | Default | Description                                       |
| ---------------- | ------- | ------------------------------------------------- |
| Web Search       | on      | Real-time web search via `openrouter:web_search`  |
| Datetime         | on      | Current date/time via `openrouter:datetime`       |
| Image Generation | off     | Generate images via `openrouter:image_generation` |

### User-defined tools

Generated into `src/tools/` with full implementations.

| Tool                 | Default | Description                                   |
| -------------------- | ------- | --------------------------------------------- |
| File Read            | on      | Read files with offset/limit, detect images   |
| File Write           | on      | Write/create files, auto-create directories   |
| File Edit            | on      | Search-and-replace with diff output           |
| Glob/Find            | on      | Find files by glob pattern                    |
| Grep/Search          | on      | Search file contents by regex                 |
| Directory List       | on      | List directory entries                        |
| Shell/Bash           | on      | Execute commands with timeout                 |
| JS REPL              | off     | Persistent Node.js environment                |
| Sub-agent Spawn      | off     | Delegate tasks to child agents                |
| Plan/Todo            | off     | Track multi-step task progress                |
| Request User Input   | off     | Ask structured questions                      |
| Web Fetch            | off     | Fetch and extract text from URLs              |
| View Image           | off     | Read local images as base64                   |
| Custom Tool Template | on      | Empty skeleton for your domain-specific tools |

### Harness modules

Architectural components that extend the core agent harness.

| Module                      | Default | Description                                             |
| --------------------------- | ------- | ------------------------------------------------------- |
| Session Persistence         | on      | JSONL append-only conversation log                      |
| ASCII Logo Banner           | off     | Custom ASCII art banner on startup                      |
| Context Compaction          | off     | Summarize older messages when context gets long         |
| System Prompt Composition   | off     | Build instructions from static + dynamic context files  |
| Tool Permissions / Approval | off     | Gate dangerous tools behind user confirmation           |
| Structured Event Logging    | off     | Emit events for tool calls, API requests, errors        |
| `@`-file References         | off     | `@filename` to attach file content to the next message  |
| `!` Shell Shortcut          | off     | `!command` to run shell and inject output into context  |
| Multi-line Input            | off     | Shift+Enter for multi-line (requires raw terminal mode) |

### Slash commands

User-facing REPL commands generated into `src/commands.ts`.

| Command    | Default | Description                           |
| ---------- | ------- | ------------------------------------- |
| `/model`   | on      | Switch model via OpenRouter API       |
| `/new`     | on      | Start a fresh conversation            |
| `/help`    | on      | List available commands               |
| `/compact` | off     | Manually trigger context compaction   |
| `/session` | off     | Show session metadata and token usage |
| `/export`  | off     | Save conversation as Markdown         |

## Entry points

The skill generates a CLI REPL by default, but you can also ask for:

* **HTTP API server** — Express/Hono server with SSE streaming for building web-accessible agents
* **Both** — CLI for development, server for production

## Example

Here's a demo app built entirely by the agent TUI skill — a GitHub trending repos viewer, scaffolded and running from a single prompt:

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/building-agents/create-agent-harness-tui/agent-harness-demo.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=f5b663bbf7cc734c7a5c6a5aaf9b72d1" alt="A demo app built by the agent TUI" width="2624" height="2304" data-path="assets/cookbook/building-agents/create-agent-harness-tui/agent-harness-demo.png" />
</Frame>

## Resources

* [Create Agent TUI skill README](https://github.com/OpenRouterTeam/skills/tree/main/skills/create-agent-tui)
* [OpenRouter Skills repository](https://github.com/OpenRouterTeam/skills)
* [`@openrouter/agent` on npm](https://www.npmjs.com/package/@openrouter/agent)
* [OpenRouter TypeScript SDK](/client-sdks/typescript)
* [Server Tools documentation](/guides/features/server-tools)
* [OpenRouter API keys](https://openrouter.ai/settings/keys)
