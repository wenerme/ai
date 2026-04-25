> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/guides/coding-agents/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/guides/coding-agents/llms-full.txt.

# Build Your Own Agent TUI

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
  <Tab title="Skills CLI">
    Works with any agent that supports [Agent Skills](https://agentskills.io/home):

    ```bash
    npx skills add OpenRouterTeam/skills
    ```
  </Tab>

  <Tab title="Claude Code">
    ```
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

![Grouped tool display](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ffc6a75bed6e7af737e21fdd93908ca60bc384a2c99761c61ecbfd365bca2cfb/content/pages/guides/tool-display-grouped.png)

**Emoji** — per-call markers with tool name, arguments, and timing:

![Emoji tool display](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/9c54edb558ae000fae8fcac16696be013e3e83e422b985aff307164e7aa9c1ee/content/pages/guides/tool-display-emoji.png)

**Minimal** — aggregated one-liner summaries:

![Minimal tool display](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/67b4c45480c37d0fee1247d2d3e0e50fe6ccdbe116e8bf774b47318bfaade8ed/content/pages/guides/tool-display-minimal.png)

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

![Block input style](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/34d02afe904cd002836999f17c8604cdbd285a9d336d371fa7c2c0b6c5f42440/content/pages/guides/input-style-block.png)

**Bordered** — horizontal line frame that works on any terminal:

![Bordered input style](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/48e27c84cb32a7805f05a060726e848d9f33c7f5feb4068d5ec4cbe61a73e336/content/pages/guides/input-style-bordered.png)

**Plain** — simple readline prompt, no escape sequences:

![Plain input style](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/c6c86308616d92986bca9b2c0cbfe1bf819ceb558f48a9de89d0d3c8f01c7735/content/pages/guides/input-style-plain.png)

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

![Gradient loader](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ffc6a75bed6e7af737e21fdd93908ca60bc384a2c99761c61ecbfd365bca2cfb/content/pages/guides/loader-gradient.png)

**Spinner** — braille dot animation:

![Spinner loader](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ffc6a75bed6e7af737e21fdd93908ca60bc384a2c99761c61ecbfd365bca2cfb/content/pages/guides/loader-spinner.png)

**Minimal** — trailing dots:

![Minimal loader](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ffc6a75bed6e7af737e21fdd93908ca60bc384a2c99761c61ecbfd365bca2cfb/content/pages/guides/loader-minimal.png)

You can also describe a completely custom loader animation and the skill will implement it for you.

### ASCII banner

Enable `showBanner` or pass `--banner "Your Agent Name"` to display a custom ASCII art logo on startup. The skill generates block-letter art for your project name using the `█` character, colored and sized to fit a 60-column terminal.

![ASCII banner on startup](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/8db8219e896387700a03ff3487cd69848a13e858d5026fc75fb5324e4f40c2ca/content/pages/guides/banner.png)

## Generated project structure

With default options selected, the skill generates this layout:

```
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

```bash
export OPENROUTER_API_KEY="sk-or-..."
npm start
```

Override visual styles at launch:

```bash
npm start -- --banner "Acme Bot" --model anthropic/claude-sonnet-4 --input bordered --tool-display emoji
```

![Agent TUI running in the terminal](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/1ad9193b995bc66fa0a8746e2f7a9028234eef3e19d7b5d9a1d6557ec02b2c6d/content/pages/guides/agent-harness-tui.png)

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

![A demo app built by the agent TUI](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/ce54b0ae0482180b6f6f14f16c860facd71331dccfb7cfb07cb9e27103472ace/content/pages/guides/agent-harness-demo.png)

## Resources

* [Create Agent TUI skill README](https://github.com/OpenRouterTeam/skills/tree/main/skills/create-agent-tui)
* [OpenRouter Skills repository](https://github.com/OpenRouterTeam/skills)
* [`@openrouter/agent` on npm](https://www.npmjs.com/package/@openrouter/agent)
* [OpenRouter TypeScript SDK](/docs/sdks/typescript)
* [Server Tools documentation](/docs/guides/features/server-tools)
* [OpenRouter API keys](https://openrouter.ai/settings/keys)