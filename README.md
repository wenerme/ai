# ai

A curated collection of AI Agent Skills — some crafted by me, some from the community.

```bash
# Install a skill
npx skills add wenerme/ai --skill <skill-name>
```

<!--region skills-->
## Skills

> 17 skills available

| Skill | Description | Source |
|-------|-------------|--------|
| `agent-browser` | Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages,... | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) |
| `ai-sdk` | Answer questions about the AI SDK and help build AI-powered features. Use when developers: (1) Ask about AI SDK... | [vercel/ai](https://github.com/vercel/ai) |
| `argocd-cli-guide` | Use when managing, inspecting, syncing, or troubleshooting Kubernetes applications via the argocd CLI, including... |  |
| `biome-lint` | Use when fixing Biome linter errors, TypeScript/tsgo type-check errors, or running lint/typecheck workflows |  |
| `bun-ffi-interop-pattern` | Use when calling native libraries via bun:ffi, loading shared libraries with dlopen, or working with FFI pointers and C... |  |
| `chrome-devtools` | Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web... | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| `glab-cli` | Use when interacting with GitLab via the glab CLI: creating/reviewing merge requests, managing issues, monitoring CI/CD... |  |
| `lark-node-sdk` | Use when developing with Lark/Feishu Open Platform using @larksuiteoapi/node-sdk, including API calls, event handling,... |  |
| `mikro-orm-v6-to-v7` | Use when upgrading @mikro-orm packages from v6 to v7, fixing v7 runtime/type errors (decorator SyntaxError,... |  |
| `orpc-implementation-sops` | Use when building, updating, or refactoring oRPC contracts, server handlers, clients, or React Query integration |  |
| `react-resizable-panels-v3-to-v4` | Use when upgrading react-resizable-panels from v3 to v4, fixing v4 type/runtime errors (PanelGroup not exported,... |  |
| `skill-writer` | Use when creating new skills, editing existing skills, optimizing skill descriptions and structure, splitting large... |  |
| `tmux-session-manager` | Use when executing commands, running builds, starting services, or monitoring logs in a visible tmux pane |  |
| `wode-db-schema-pattern` | Use when designing, creating, or modifying PostgreSQL table schemas in the Wode project, including ID strategy,... |  |
| `wode-emittery-pattern` | Use when implementing event-driven communication between React components using Emittery, including event types, sidecar... |  |
| `writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment | [obra/superpowers](https://github.com/obra/superpowers) |
| `zustand-mutative-pattern` | Use when implementing React state management with Zustand, including context-scoped stores, mutative updates, or actions... |  |

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
<summary><code>argocd-cli-guide</code></summary>

```bash
npx skills add wenerme/ai --skill argocd-cli-guide
```

Use when managing, inspecting, syncing, or troubleshooting Kubernetes applications via the argocd CLI, including checking app health, running diffs, syncing deployments, viewing logs, or switching between ArgoCD server contexts

</details>
<details>
<summary><code>biome-lint</code></summary>

```bash
npx skills add wenerme/ai --skill biome-lint
```

Use when fixing Biome linter errors, TypeScript/tsgo type-check errors, or running lint/typecheck workflows

</details>
<details>
<summary><code>bun-ffi-interop-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill bun-ffi-interop-pattern
```

Use when calling native libraries via bun:ffi, loading shared libraries with dlopen, or working with FFI pointers and C struct memory layouts

</details>
<details>
<summary><code>chrome-devtools</code></summary>

```bash
npx skills add wenerme/ai --skill chrome-devtools
```

Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to `--slim` mode (MCP configuration).

</details>
<details>
<summary><code>glab-cli</code></summary>

```bash
npx skills add wenerme/ai --skill glab-cli
```

Use when interacting with GitLab via the glab CLI: creating/reviewing merge requests, managing issues, monitoring CI/CD pipelines, making API calls, or performing any GitLab operation from the terminal. Triggers on glab, gitlab cli, merge request, MR create, pipeline status, ci lint.

</details>
<details>
<summary><code>lark-node-sdk</code></summary>

```bash
npx skills add wenerme/ai --skill lark-node-sdk
```

Use when developing with Lark/Feishu Open Platform using @larksuiteoapi/node-sdk, including API calls, event handling, or message card building

</details>
<details>
<summary><code>mikro-orm-v6-to-v7</code></summary>

```bash
npx skills add wenerme/ai --skill mikro-orm-v6-to-v7
```

Use when upgrading @mikro-orm packages from v6 to v7, fixing v7 runtime/type errors (decorator SyntaxError, persistAndFlush removed, nativeInsert not found), adapting knex to kysely or better-sqlite to new SQLite drivers, running MikroORM in Edge/Bun/node:sqlite environments, or choosing between defineEntity vs decorator entity definitions. Triggers on "mikro-orm v7", "persistAndFlush", "@mikro-orm/decorators", "@mikro-orm/sql", "defineEntity", "bun:sqlite mikro-orm".

</details>
<details>
<summary><code>orpc-implementation-sops</code></summary>

```bash
npx skills add wenerme/ai --skill orpc-implementation-sops
```

Use when building, updating, or refactoring oRPC contracts, server handlers, clients, or React Query integration

</details>
<details>
<summary><code>react-resizable-panels-v3-to-v4</code></summary>

```bash
npx skills add wenerme/ai --skill react-resizable-panels-v3-to-v4
```

Use when upgrading react-resizable-panels from v3 to v4, fixing v4 type/runtime errors (PanelGroup not exported, direction prop invalid, layout broken), adapting to the new Group/Separator API and percentage string syntax, or updating CSS selectors for renamed data attributes. Triggers on "react-resizable-panels v4", "PanelGroup not found", "PanelResizeHandle not found", "panel layout broken after upgrade".

</details>
<details>
<summary><code>skill-writer</code></summary>

```bash
npx skills add wenerme/ai --skill skill-writer
```

Use when creating new skills, editing existing skills, optimizing skill descriptions and structure, splitting large skills into references, or validating skills against best practices

</details>
<details>
<summary><code>tmux-session-manager</code></summary>

```bash
npx skills add wenerme/ai --skill tmux-session-manager
```

Use when executing commands, running builds, starting services, or monitoring logs in a visible tmux pane

</details>
<details>
<summary><code>wode-db-schema-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill wode-db-schema-pattern
```

Use when designing, creating, or modifying PostgreSQL table schemas in the Wode project, including ID strategy, multi-tenant isolation, or naming conventions

</details>
<details>
<summary><code>wode-emittery-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill wode-emittery-pattern
```

Use when implementing event-driven communication between React components using Emittery, including event types, sidecar components, or subscription hooks

</details>
<details>
<summary><code>writing-skills</code></summary>

```bash
npx skills add wenerme/ai --skill writing-skills
```

Use when creating new skills, editing existing skills, or verifying skills work before deployment

</details>
<details>
<summary><code>zustand-mutative-pattern</code></summary>

```bash
npx skills add wenerme/ai --skill zustand-mutative-pattern
```

Use when implementing React state management with Zustand, including context-scoped stores, mutative updates, or actions namespace patterns

</details>
<!--endregion-->
