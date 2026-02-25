# ai

A curated collection of AI Agent Skills — some crafted by me, some from the community.

```bash
# Install a skill
npx skills add wenerme/ai --skill <skill-name>
```

<!--region skills-->
## Skills

> 9 skills available

| Skill | Description |
|-------|-------------|
| `agent-browser` | Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages,... |
| `ai-sdk` | Answer questions about the AI SDK and help build AI-powered features. Use when developers: (1) Ask about AI SDK... |
| `bun-ffi-interop-pattern` | USE THIS SKILL STRICTLY WHEN the user requests to call Native libraries (C/C++, Rust, Go compiled shared libs) using... |
| `chrome-devtools` | Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web... |
| `orpc-implementation-sops` | USE THIS SKILL WHEN the user needs to build, update, or refactor oRPC (TypeScript type-safe RPC) contracts, server... |
| `tmux-session-manager` | USE THIS SKILL WHEN the user needs to execute shell commands, run builds, start services, or monitor logs in a visible... |
| `wode-db-schema-pattern` | USE THIS SKILL WHEN the user needs to design, create, or modify PostgreSQL database table schemas in the Wode project... |
| `wode-emittery-pattern` | USE THIS SKILL WHEN the user needs to implement type-safe event-driven architecture using Emittery in React... |
| `zustand-mutative-pattern` | USE THIS SKILL EXCLUSIVELY WHEN implementing React state management using Zustand in this project's specific... |

<details>
<summary><code>agent-browser</code></summary>

```bash
npx skills add wenerme/ai --skill agent-browser
```

Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task. Triggers include requests to "open a website", "fill out a form", "click a button", "take a screenshot", "scrape data from a page", "test this web app", "login to a site", "automate browser actions", or any task requiring programmatic web interaction.

</details>
<details>
<summary><code>ai-sdk</code></summary>

```bash
npx skills add wenerme/ai --skill ai-sdk
```

Answer questions about the AI SDK and help build AI-powered features. Use when developers: (1) Ask about AI SDK functions like generateText, streamText, ToolLoopAgent, embed, or tools, (2) Want to build AI agents, chatbots, RAG systems, or text generation features, (3) Have questions about AI providers (OpenAI, Anthropic, Google, etc.), streaming, tool calling, structured output, or embeddings, (4) Use React hooks like useChat or useCompletion. Triggers on: "AI SDK", "Vercel AI SDK", "generateText", "streamText", "add AI to my app", "build an agent", "tool calling", "structured output", "useChat".

</details>
<details>
<summary><code>bun-ffi-interop-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill bun-ffi-interop-pattern
```

USE THIS SKILL STRICTLY WHEN the user requests to call Native libraries (C/C++, Rust, Go compiled shared libs) using `bun:ffi`.
Core scenarios: (1) Loading shared libraries (.so/.dylib/.dll) via dlopen, (2) Defining FFI function signatures, (3) Safe pointer and memory manipulation, (4) Reading C struct data via memory offsets, (5) Handling Pass-by-Value struct limitations.
Trigger keywords: "bun:ffi", "调用 native 库", "dlopen", "FFI 指针", "C 结构体", "toArrayBuffer", "CString".

</details>
<details>
<summary><code>chrome-devtools</code></summary>

```bash
npx skills add wenerme/ai --skill chrome-devtools
```

Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to `--slim` mode (MCP configuration).

</details>
<details>
<summary><code>orpc-implementation-sops</code></summary>

```bash
npx skills add wenerme/ai --skill orpc-implementation-sops
```

USE THIS SKILL WHEN the user needs to build, update, or refactor oRPC (TypeScript type-safe RPC) contracts, server handlers, or clients.
Trigger keywords: "oRPC", "Contract-First", "RPC 客户端", "API Contract", "createRpcContractClient".
Provides strict SOPs for: (1) Contract-First API design, (2) Server Handlers, (3) RPC Clients, (4) React Query integration, (5) REST API modeling.

</details>
<details>
<summary><code>tmux-session-manager</code></summary>

```bash
npx skills add wenerme/ai --skill tmux-session-manager
```

USE THIS SKILL WHEN the user needs to execute shell commands, run builds, start services, or monitor logs in a visible tmux pane.
Core triggers:
(1) Executing terminal commands or starting services.
(2) Running long-running tasks requiring real-time output observation.
(3) Collaborative debugging within the user's active terminal context.
(4) Managing background services or tailing log streams.
Provides the SOP for safely interacting with the user's tmux environment.

</details>
<details>
<summary><code>wode-db-schema-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill wode-db-schema-pattern
```

USE THIS SKILL WHEN the user needs to design, create, or modify PostgreSQL database table schemas in the Wode project architecture.
This pattern enforces: (1) K-Sortable IDs (ULID/UUIDv7) with type prefixes, (2) Multi-tenant isolation via tid, (3) Strict naming conventions (singular tables, _at/_id/_type suffixes, PascalCase enums), (4) Standard field templates, (5) Extension data strategy (attributes/properties/extensions).
Trigger keywords: "设计表结构", "数据库 schema", "主键策略", "多租户表", "ULID", "UUIDv7", "create table".

</details>
<details>
<summary><code>wode-emittery-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill wode-emittery-pattern
```

USE THIS SKILL WHEN the user needs to implement type-safe event-driven architecture using Emittery in React applications.
This pattern enforces: (1) as-const event type objects (never enums), (2) 'Module:Action' naming convention, (3) Typed Emittery instances, (4) Sidecar component pattern for side-effects, (5) useEmitteryListen hook for subscriptions.
Trigger keywords: "事件驱动", "Emittery", "事件发射", "Sidecar 模式", "useEmitteryListen", "event emitter".

</details>
<details>
<summary><code>zustand-mutative-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill zustand-mutative-pattern
```

USE THIS SKILL EXCLUSIVELY WHEN implementing React state management using Zustand in this project's specific architecture.
This pattern enforces: (1) Context-based scope isolation, (2) 'zustand-mutative' for immutable updates, (3) Strict 'actions' namespace for state mutations, (4) Event-driven side-effects via Emittery, (5) 'useShallow' for performance.
Trigger keywords: "zustand", "状态管理", "createStore", "useShallow", "mutative", "状态作用域隔离".

</details>
<!--endregion-->
