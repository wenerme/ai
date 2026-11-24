---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Configuration overrides, dynamic runtime configuration, and package exports for the Think chat agent framework.
title: Configuration
image: https://developers.cloudflare.com/agents/harnesses/think/configuration/og.png?v=933c898d421435fa
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Think is configured by overriding methods and properties on your `Think` subclass. Most agents only override `getModel()`.

## Configuration overrides

| Method / Property | Default | Description |
| --- | --- | --- |
| `getModel()` | throws | Return the `LanguageModel` to use |
| `getSystemPrompt()` | `"You are a helpful assistant."` | Instructions at the top of the system prompt, above context blocks. The default is used only with no context blocks |
| `getTools()` | `{}` | AI SDK `ToolSet` for the agentic loop |
| `getScheduledTasks()` | `{}` | Code-declared recurring prompts or handlers — refer to [Scheduled tasks](https://developers.cloudflare.com/agents/harnesses/think/scheduled-tasks/) |
| `getScheduledTasksScope()` | `"root"` | Which instances arm the declared tasks: `"root"` (the top-level agent only) or `"all"` (sub-agents too) |
| `getDefaultTimezone()` | `undefined` | Default timezone for wall-clock scheduled tasks |
| `getMessengers()` | `{}` | Messenger ingress and delivery declarations — refer to [Messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/) |
| `getActions()` | `{}` | Server actions with idempotency, approvals, and authorization — refer to [Actions](https://developers.cloudflare.com/agents/harnesses/think/actions/) |
| `configureChannels()` | `{}` | Per-channel policy beyond the implicit `web` channel — refer to [Channels](https://developers.cloudflare.com/agents/harnesses/think/channels/) |
| `maxSteps` | `10` | Max tool-call rounds per turn |
| `sendReasoning` | `true` | Send reasoning chunks to chat clients |
| `configureSession()` | identity | Configure compaction and search on the conversation — refer to [Sessions](https://developers.cloudflare.com/agents/harnesses/think/sessions/) |
| `configureContext()` | `[]` | Declare context blocks for the system prompt — refer to [Context](https://developers.cloudflare.com/agents/harnesses/think/context/) |
| `hydrationByteBudget` | 32 MiB | Byte budget for loading the transcript at startup |
| `mediaEviction` | `true` | Move aged media out of the conversation and into a workspace file. `false` keeps it in the conversation |
| `truncationStep` | `8` | Move the read-time truncation cutoff once every this many messages. `1` cuts every turn — refer to [Sessions](https://developers.cloudflare.com/agents/harnesses/think/sessions/#prompt-caching) |
| `getSkills()` | `[]` | Return Agent Skills sources for on-demand skill activation — refer to [Agent Skills](https://developers.cloudflare.com/agents/skills/) |
| `getSkillScriptRunner()` | `null` | Enable the experimental `run_skill_script` tool — refer to [Execution](https://developers.cloudflare.com/agents/skills/execution/) |
| `fetchTools` | `false` | Turn on the allowlisted, read-only fetch tools — refer to [Fetch tool](https://developers.cloudflare.com/agents/harnesses/think/tools/#fetch-tool) |
| `messageConcurrency` | `"queue"` | How overlapping submits behave — refer to [Client tools](https://developers.cloudflare.com/agents/harnesses/think/client-tools/#message-concurrency) |
| `includeMcpTools` | `true` | Convert connected MCP tools to AI SDK tools and add them to model turns. Refer to [MCP tools](https://developers.cloudflare.com/agents/harnesses/think/tools/#mcp-tools) |
| `waitForMcpConnections` | `false` | Wait for MCP servers before inference |
| `chatRecovery` | Always on | Durable recovery configuration. Refer to [Durable recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/) for all options and defaults |
| `chatStreamStallTimeoutMs` | `0` (off) | Opt-in inactivity watchdog: abort a turn whose model stream produces no chunk for this long (measures the gap between chunks, including tool execution). A stall routes into bounded recovery |
| `contextOverflow` | `undefined` | Opt-in mid-turn context-overflow handling with `reactive`, `maxRetries`, and `proactive` options. Requires `classifyChatError` plus a session compaction function — refer to [Context-window overflow recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/#context-window-overflow-recovery) |

For `chatRecovery` and `chatStreamStallTimeoutMs` behavior, refer to [Durable recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/).

## Dynamic configuration

Think's class generics match `Agent<Env, State, Props>`. Persisted runtime configuration is typed at the `configure<T>()` and `getConfig<T>()` call sites, stored in SQLite, and survives hibernation and restarts.

```js
export class MyAgent extends Think {
	getModel() {
		const tier = this.getConfig()?.modelTier ?? "fast";
		const models = {
			fast: "@cf/qwen/qwen3.8-27b",
			capable: "@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		};
		return createAI({ binding: this.env.AI })(models[tier]);
	}
}
```

```ts
type MyConfig = { modelTier: "fast" | "capable"; theme: string };

export class MyAgent extends Think<Env> {
	getModel() {
		const tier = this.getConfig<MyConfig>()?.modelTier ?? "fast";
		const models = {
			fast: "@cf/qwen/qwen3.8-27b",
			capable: "@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		};
		return createAI({ binding: this.env.AI })(models[tier]);
	}
}
```

| Method | Description |
| --- | --- |
| `configure<T>(config: T)` | Persist a typed configuration object |
| `getConfig<T>()` | Read the persisted configuration as `T`, or `null` if never configured |

Expose configuration to the client via `@callable`:

```js
import { callable } from "agents";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends Think {
	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		);
	}

	@callable()
	updateConfig(config) {
		this.configure(config);
	}
}
```

```ts
import { callable } from "agents";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends Think<Env> {
	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		);
	}

	@callable()
	updateConfig(config: MyConfig) {
		this.configure<MyConfig>(config);
	}
}
```

## Memory and context

Think stores the conversation and builds the system prompt for you. `configureSession()` sets compaction and search, and `configureContext()` declares the context blocks of the system prompt, such as a `memory` block the model can write to. Refer to [Sessions](https://developers.cloudflare.com/agents/harnesses/think/sessions/) and [Context](https://developers.cloudflare.com/agents/harnesses/think/context/).

## Package exports

| Export | Description |
| --- | --- |
| `@cloudflare/think` | `Think`, `Session`, `skills` namespace |
| `@cloudflare/think/react` | `useAgentChat` for Think agents |
| `@cloudflare/think/tools/fetch` | `createFetchTools()` — allowlisted, read-only HTTP fetches |
| `@cloudflare/think/messengers` | Messenger contracts, Chat SDK bridge, state agent, delivery |
| `@cloudflare/think/messengers/telegram` | Telegram messenger provider and delivery helpers |
| `@cloudflare/think/workflows` | `ThinkWorkflow`, `step.prompt()` — Workflow prompts |
| `@cloudflare/think/tools/execute` | `createExecuteTool()` — deprecated Code Mode execution tool |
| `@cloudflare/think/tools/browser` | `createBrowserTools()` — deprecated browser tools |
| `@cloudflare/think/tools/extensions` | `createExtensionTools()` — LLM-driven extension loading |
| `@cloudflare/think/extensions` | `ExtensionManager`, `HostBridgeLoopback` — extension runtime |

## Dependencies

Peer dependencies you provide:

| Package | Required | Notes |
| --- | --- | --- |
| `agents` | yes | Cloudflare Agents SDK |
| `ai` | yes | AI SDK v7 |
| `zod` | yes | Schema validation (v4) |
| `@cloudflare/computer` | yes | Workspace and workspace tools (0.10) |
| `@chat-adapter/telegram` | optional | Required for Telegram messengers |
| `react`, `@ai-sdk/react` | optional | Required for `@cloudflare/think/react` |

Bundled with `@cloudflare/think`:

| Package | Notes |
| --- | --- |
| `@cloudflare/codemode` | Code execution for `createExecuteTool()` |

The Agent Skills parser, sources, and script runner live in [`agents/skills`](https://developers.cloudflare.com/agents/skills/), so the script runner pulls `just-bash` through `agents`, not Think.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/configuration/#page","headline":"Configuration","description":"Configuration overrides, dynamic runtime configuration, and package exports for the Think chat agent framework.","url":"https://developers.cloudflare.com/agents/harnesses/think/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/think/configuration/og.png?v=933c898d421435fa","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
