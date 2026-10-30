---
description: Add features to a Durable Object one capability at a time with lifecycle.use(). Capabilities accept WebSocket clients, sync state, schedule work, connect to MCP servers, and store streams and conversations.
title: Capabilities
image: https://developers.cloudflare.com/agents/runtime/capabilities/og.png?v=eb2072e73524ab9d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Capabilities

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/capabilities/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A capability adds a reusable feature to your agent, such as WebSocket connections, scheduled tasks, or an agent harness. You construct it as a field on your Durable Object and attach it to the [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) with `lifecycle.use()`. Install only the features your application needs.

## Why capabilities

A [Durable Object](https://developers.cloudflare.com/durable-objects/) keeps stored data across restarts. To continue interrupted work, a feature also needs to save its progress and arrange for the object to wake again. A Durable Object has one [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/) for scheduling that wake-up.

Lifecycle coordinates startup, event dispatch, and a durable job queue. Capabilities share these services, so each feature does not need to manage the object's alarm or startup independently. A capability can:

- **Store data in tables.** For example, `Scheduler` keeps its schedules in SQLite. Capabilities use distinct table names within the same database.
- **Schedule work as jobs.** A job records work to run later. Lifecycle stores it in SQLite, sets the alarm, and calls the capability's `onJob()` hook when it is due.
- **Handle matching requests.** For example, `MCPClientManager` handles its OAuth callback URL before the request reaches your `onRequest()`.

Each capability implements only the hooks it needs.

This example combines a Pi harness and a scheduler in one object:

```
flowchart TB
    accTitle: Capabilities share a Durable Object's storage and alarm
    accDescr: PiHarness and Scheduler submit jobs to Lifecycle, which stores pending jobs in the shared SQLite database and manages the object's single alarm.
    subgraph DO["One Durable Object"]
        direction TB
        P["PiHarness<br/>agent loop and recovery"] -->|"wake-up jobs"| L
        S["Scheduler<br/>scheduled callbacks"] -->|"scheduled jobs"| L
        L["Lifecycle<br/>startup, dispatch, job queue"] -->|"sets next wake-up"| A["One alarm"]
        A -->|"invokes"| L
        P -->|"Pi data"| DB[("Shared SQLite database")]
        S -->|"Schedules"| DB
        L -->|"Pending jobs"| DB
    end

```

Both capabilities schedule through Lifecycle without overwriting each other's alarm. After a restart, Lifecycle starts them again and dispatches due jobs. The harness or capability reads its saved state to decide how to continue. Lifecycle does not automatically save the progress of arbitrary JavaScript code.

## Choose capabilities

Capabilities add features to your agent. Before installing one, check what your harness or base class already provides.

| Your starting point | What it already provides | What you configure |
| --- | --- | --- |
| [Pi](https://developers.cloudflare.com/agents/harnesses/pi/) or [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) | The agent loop, conversation storage, and recovery | Use the harness's session and tool APIs. Add capabilities for other application features. |
| [`Agent`](https://developers.cloudflare.com/agents/agent-class/) | WebSockets, shared state, scheduling, and MCP connections | Use the existing `Agent` APIs. |
| [Think](https://developers.cloudflare.com/agents/harnesses/think/) or [`AIChatAgent`](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/chat-agents/) | The capabilities provided by `Agent`, plus conversation storage and streaming | Use the framework's conversation APIs. |
| Plain Durable Object | The capabilities you explicitly install | Choose the features your application needs. |

For features your starting point does not provide, use these capabilities:

| You want to… | Use |
| --- | --- |
| Connect browser clients to the agent | [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) |
| Keep a shared value synchronized with connected clients | [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) with `WebSockets` |
| Run a callback later or on a recurring schedule | [`Scheduler`](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/) |
| Manage MCP connections through the runtime | [`MCPClientManager`](https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/). Check your harness's MCP integration first, such as [OpenCode's MCP plugins](https://developers.cloudflare.com/agents/harnesses/opencode/#connect-an-mcp-server). |

If you are writing your own agent loop, consider [`Sessions`](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/) for conversation history and [`Streams`](https://developers.cloudflare.com/agents/runtime/capabilities/streams/) for replayable output.

For guidance on conversation storage, refer to [Choose a session store](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/#choose-a-session-store).

## Compose capabilities

This object combines MCP connections, scheduled callbacks, shared settings, and WebSocket clients:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";
import { Scheduler } from "agents/schedules";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

export class MyAgent extends DurableObject {
	mcp = new MCPClientManager("my-agent", "1.0.0");
	scheduler = new Scheduler({
		callbacks: {
			dailySummary: async () => {
				for (const connection of this.webSockets.getConnections()) {
					connection.send("Time for your daily summary");
				}
			},
		},
	});
	settings = new State({
		initialState: { model: "anthropic/claude-opus-5.5" },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	webSockets = new WebSockets({ state: this.settings });

	lifecycle = Lifecycle.install(this)
		.use(this.mcp)
		.use(this.scheduler)
		.use(this.settings)
		.use(this.webSockets);
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";
import { Scheduler } from "agents/schedules";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

type Settings = { model: string };

export class MyAgent extends DurableObject<Env> {
	readonly mcp = new MCPClientManager("my-agent", "1.0.0");
	readonly scheduler = new Scheduler({
		callbacks: {
			dailySummary: async () => {
				for (const connection of this.webSockets.getConnections()) {
					connection.send("Time for your daily summary");
				}
			},
		},
	});
	readonly settings: State<Settings> = new State<Settings>({
		initialState: { model: "anthropic/claude-opus-5.5" },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	readonly webSockets: WebSockets = new WebSockets({ state: this.settings });

	readonly lifecycle = Lifecycle.install(this)
		.use(this.mcp)
		.use(this.scheduler)
		.use(this.settings)
		.use(this.webSockets);
}
```

Pass what a capability needs, such as callbacks or another capability, to its constructor. In this example, `WebSockets` receives the `State` capability to synchronize settings with clients.

## Available capabilities

These capabilities ship with the `agents` package and are stable:

| Capability | Import | What it does |
| --- | --- | --- |
| [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) | `agents/websockets` | Accepts WebSocket connections from `useAgent` and other clients |
| [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) | `agents/state` | Stores one validated value and syncs it to clients through `WebSockets` |
| [`Scheduler`](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/) | `agents/schedules` | Runs callbacks after a delay, at a date, on a cron, or on an interval |
| [`MCPClientManager`](https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/) | `agents/mcp/client` | Connects to MCP servers and keeps the connections across restarts |

These capabilities are experimental. Their APIs may change between releases:

| Capability | Import | What it does |
| --- | --- | --- |
| [`Streams`](https://developers.cloudflare.com/agents/runtime/capabilities/streams/) | `agents/streams` | Stores incremental output that readers replay and follow |
| [`Sessions`](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/) | `agents/sessions` | Stores conversation history as a tree of messages |
| `Queue` | `agents/queue` | Runs background callbacks one at a time, in push order |
| `Tasks` | `agents/tasks` | Runs replayable background work with journaled steps |
| `RoutedAgents` | `agents/routing` | Keeps a catalog of independent agents and forwards requests to them |
| `Browser` | `agents/browser` | Keeps one persistent Browser Run session open for the agent |

A [harness](https://developers.cloudflare.com/agents/harnesses/), such as `PiHarness`, is a capability that runs a whole agent loop.

To write a capability of your own, refer to [Build a capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/).

## How capabilities run

- **Install before startup.** Call `use()` in a field initializer or in the constructor. The Lifecycle starts on the first request, alarm, or WebSocket message, and `use()` throws after that.
- **Declare fields before the Lifecycle.** Class fields initialize in order. Declare each capability field before the `lifecycle` field that installs it.
- **Install each capability once.** Each capability has a stable ID, such as `"scheduler"` or `"mcp"`. The ID namespaces its jobs and events, and `use()` throws on a duplicate.
- **Startup order.** At startup, the Lifecycle runs each capability's `onStart()` in install order, with a catch-all capability last. Then it runs your own `onStart()`.
- **Request order.** The Lifecycle offers each request to the capabilities in install order before your `onRequest()`. `WebSockets` accepts every WebSocket upgrade, so it always runs after the others. For more information, refer to [Request dispatch](https://developers.cloudflare.com/agents/runtime/lifecycle/#request-dispatch).
- **Shared alarm.** Capabilities that run work later, such as `Scheduler`, store it as Lifecycle [jobs](https://developers.cloudflare.com/agents/runtime/lifecycle/job-queue/), so they never overwrite each other's alarm.
- **Host context.** Callbacks you register, such as `Scheduler` callbacks, `WebSockets` handlers, and callables, run inside your object's context, where [`getCurrentAgent()`](https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/) returns your object.
- **RPC.** Native Durable Object RPC bypasses `fetch()`, so it does not start the Lifecycle. Call `await this.lifecycle.start()` at the top of an RPC method that uses a capability.

## On the Agent class

The [`Agent` class](https://developers.cloudflare.com/agents/agent-class/) is a preset: a Durable Object with the Lifecycle and several capabilities already installed, including `Scheduler`, `State`, `WebSockets`, and `MCPClientManager`. Its methods, such as `this.schedule()`, `this.setState()`, and `this.addMcpServer()`, call those capabilities.

To add another capability to an `Agent`, call `this.lifecycle.use()` in its constructor. Do not install a second copy of a capability the `Agent` already has, because `use()` throws on a duplicate ID.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/capabilities/#page","headline":"Capabilities","description":"Add features to a Durable Object one capability at a time with lifecycle.use(). Capabilities accept WebSocket clients, sync state, schedule work, connect to MCP servers, and store streams and conversations.","url":"https://developers.cloudflare.com/agents/runtime/capabilities/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/capabilities/og.png?v=eb2072e73524ab9d","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
