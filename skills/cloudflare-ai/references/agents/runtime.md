---
description: The Agents SDK runtime is a Durable Object with the Lifecycle installed, a Worker that routes requests to it, and the capabilities you attach to it.
title: Runtime
image: https://developers.cloudflare.com/agents/runtime/og.png?v=c94301a4a54bcd9d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Runtime

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Every agent built with the Agents SDK runs on a [Durable Object](https://developers.cloudflare.com/durable-objects/). The runtime coordinates its startup, incoming events, and scheduled work. Your capabilities or harness use stored state to recover after interruptions:

- **[Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/)** ( `agents/lifecycle`) runs startup, dispatches each request and WebSocket event, and owns a durable job queue and the object's single alarm.
- **[Routing](https://developers.cloudflare.com/agents/runtime/routing/)** ( `agents/routing`) sends requests from your Worker to the right named object.
- **[Capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/)** are features you attach with `lifecycle.use()`, such as WebSocket clients, shared state, a scheduler, and MCP connections.
- **[Observability](https://developers.cloudflare.com/agents/runtime/observability/)** traces model calls and publishes events from the Lifecycle and its capabilities.

```
flowchart LR
    Client["Client<br/>useAgent, AgentClient, HTTP"] -->|"HTTP or WebSocket"| Worker["Worker<br/>routeAgentRequest()"]
    Worker --> L
    subgraph DO["Durable Object, one per name"]
        L["Lifecycle<br/>startup, dispatch, jobs, the one alarm"]
        L --> WS["WebSockets"]
        L --> SC["Scheduler"]
        L --> H["Harness, such as PiHarness"]
        L --> More["Other capabilities"]
        WS --- DB[("SQLite storage")]
        SC --- DB
        H --- DB
        More --- DB
    end
    DO -.->|"traces and events"| Obs["Observability"]

```

## If you use a harness

You do not have to assemble all of this yourself. A [harness](https://developers.cloudflare.com/agents/harnesses/) sets up what it needs:

- **[Think](https://developers.cloudflare.com/agents/harnesses/think/)** extends the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/), which installs the Lifecycle and its capabilities for you.
- **[Pi](https://developers.cloudflare.com/agents/harnesses/pi/)** is one capability. You install the Lifecycle and add the harness with `.use()`, and Pi handles its own storage and recovery.

With either harness, the parts of the runtime you work with directly are usually:

- **[Routing](https://developers.cloudflare.com/agents/runtime/routing/)**, to send requests to the right agent and check who is calling.
- **[WebSockets](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/)**, to connect your frontend to the agent.
- **[Observability](https://developers.cloudflare.com/agents/runtime/observability/)**, to trace model calls and debug what the agent did.

The rest of this section matters when you build your own agent loop, or add a capability of your own.

## Compose the runtime yourself

You compose these parts on a plain `DurableObject`:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { Scheduler } from "agents/schedules";
import { WebSockets } from "agents/websockets";

export class MyAgent extends DurableObject {
	scheduler = new Scheduler({ callbacks: {} });
	webSockets = new WebSockets();
	lifecycle = Lifecycle.install(this).use(this.scheduler).use(this.webSockets);

	onRequest(request) {
		return new Response(`Hello from ${this.lifecycle.name}`);
	}
}

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { Scheduler } from "agents/schedules";
import { WebSockets } from "agents/websockets";

export class MyAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({ callbacks: {} });
	readonly webSockets = new WebSockets();
	readonly lifecycle = Lifecycle.install(this)
		.use(this.scheduler)
		.use(this.webSockets);

	onRequest(request: Request): Response {
		return new Response(`Hello from ${this.lifecycle.name}`);
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

The [`Agent` class](https://developers.cloudflare.com/agents/agent-class/) is a preset of the same runtime: a Durable Object with the Lifecycle and several capabilities already installed.

## Lifecycle

- [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) explains what the Lifecycle provides and how to install it.
- [Jobs and alarms](https://developers.cloudflare.com/agents/runtime/lifecycle/job-queue/) describes the durable job queue.
- [`getCurrentAgent()`](https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/) reads the current object, request, and connection from shared code.
- [Lifecycle API](https://developers.cloudflare.com/agents/runtime/lifecycle/api-reference/) is the complete reference for `agents/lifecycle`.

## Routing

- [Routing](https://developers.cloudflare.com/agents/runtime/routing/) covers `routeAgentRequest()`, the URL shape, and naming agents.
- [Routing options](https://developers.cloudflare.com/agents/runtime/routing/options/) covers CORS, placement, startup props, and retries.
- [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/) checks callers before a request reaches the object.
- [Custom routing](https://developers.cloudflare.com/agents/runtime/routing/custom-routing/) reaches objects with your own URLs, or over RPC.
- [HTTP and Server-Sent Events](https://developers.cloudflare.com/agents/runtime/routing/http-sse/) handles requests in `onRequest()` and streams responses.

## Capabilities

Capabilities are optional features. Start with [Choose capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/#choose-capabilities) to check what your harness already provides and what to add yourself.

| Capability | Import | What it adds | Status |
| --- | --- | --- | --- |
| [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) | `agents/websockets` | Real-time client connections | Stable |
| [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) | `agents/state` | Shared state that syncs to clients | Stable |
| [`Scheduler`](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/) | `agents/schedules` | Delayed, dated, cron, and interval callbacks | Stable |
| [`MCPClientManager`](https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/) | `agents/mcp/client` | Connections to MCP servers | Stable |
| [`Streams`](https://developers.cloudflare.com/agents/runtime/capabilities/streams/) | `agents/streams` | Durable incremental output | Experimental |
| [`Sessions`](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/) | `agents/sessions` | Durable conversation history | Experimental |

To write your own capability, refer to [Build a capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/).

## Observability

- [Tracing](https://developers.cloudflare.com/agents/runtime/observability/tracing/) records model calls, tool runs, and approvals as Workers traces.
- [Diagnostics channels](https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/) publish structured events from the Lifecycle, its capabilities, and the `Agent` class.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/runtime/#page","headline":"Runtime","description":"The Agents SDK runtime is a Durable Object with the Lifecycle installed, a Worker that routes requests to it, and the capabilities you attach to it.","url":"https://developers.cloudflare.com/agents/runtime/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/og.png?v=c94301a4a54bcd9d","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
