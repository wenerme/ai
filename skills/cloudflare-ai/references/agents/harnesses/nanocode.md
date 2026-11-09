---
description: Run Nanocode on Cloudflare Workers with its own Durable Object host, and connect optional Agents SDK capabilities.
title: Nanocode
image: https://developers.cloudflare.com/agents/harnesses/nanocode/og.png?v=43b4aec9564b6d35
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Nanocode

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/nanocode/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Nanocode ↗︎](https://github.com/gakonst/nanocode) is an SDK for embedding Codex and Claude agents in your application. It brings both harnesses behind one runtime, with shared tools, subagents, and session storage. Use it when you want their prompt and tool conventions with control over your application's UI, tools, and execution environment.

On Cloudflare, its Rust engine runs as [WebAssembly](https://developers.cloudflare.com/workers/runtime-apis/webassembly/) inside a [Durable Object](https://developers.cloudflare.com/durable-objects/). Its [Code Mode ↗︎](https://nanocode.xyz/docs/guides/code-mode) lets agents combine tool calls in JavaScript, while [remote hands ↗︎](https://nanocode.xyz/docs/guides/remote-hands) let them run code on a laptop, build machine, or sandbox while keeping the agent session on Cloudflare.

The Nanocode project maintains its own Cloudflare host independently of Cloudflare. It does not require the Agents SDK, and there is no `agents/harness/nanocode` export. Refer to the upstream project for integration updates and issues.

```
flowchart TD
    Client --> Worker[Worker router]
    Worker --> Session[Nanocode AgentSession]
    Session --> Storage[(Durable Object SQLite)]
    Session --> Model[AI binding / AI Gateway]
    Session --> Tools[Workspace and host tools]

```

## Run on Workers

Start with the [Nanocode Workers guide ↗︎](https://nanocode.xyz/docs/guides/workers) and [reference Worker ↗︎](https://github.com/gakonst/nanocode-cloudflare-durable). Use the reference Worker for the complete host, including authentication, recovery alarms, and streaming.

The reference Worker uses `App.create()` from `nanocode-ts/cloudflare`. That factory returns the `AgentSession` Durable Object class and a Worker request handler.

Use the package version pinned by the reference Worker: it installs `nanocode-ts` from a GitHub release tarball.

Nanocode handles these parts of the deployment:

| Component | Responsibility |
| --- | --- |
| Rust/Wasm engine | Model calls, tools, checkpoints, and tool receipts |
| `AgentSession` | SQLite storage, recovery alarms, and hibernating WebSockets |
| Worker router | Authenticate requests and route each account/session pair to its object |
| Host adapters | Connect models, workspace operations, and external tools |

## Submit a turn

After deploying the host, call its session API. The `provider` field selects Nanocode's harness implementation. This example uses `provider: "codex"` with Workers AI model `glm-5.3` through `Gateway.create()`.

Configure the host with the `AI` binding and an `AI_GATEWAY_ID`. Run this helper in your backend, passing the deployment origin and its configured bearer token:

```js
export async function submitTurn(origin, token, requestId) {
	const response = await fetch(new URL("/sessions/demo/turns", origin), {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
		body: JSON.stringify({
			request_id: requestId,
			prompt: "Explain durable agents in two sentences.",
			provider: "codex",
			model: "glm-5.3",
			thinking: "low",
		}),
	});

	if (!response.ok) {
		throw new Error(`Nanocode submission failed: ${response.status}`);
	}
	return response.json();
}
```

```ts
export async function submitTurn(
	origin: string,
	token: string,
	requestId: string,
): Promise<unknown> {
	const response = await fetch(new URL("/sessions/demo/turns", origin), {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
		body: JSON.stringify({
			request_id: requestId,
			prompt: "Explain durable agents in two sentences.",
			provider: "codex",
			model: "glm-5.3",
			thinking: "low",
		}),
	});

	if (!response.ok) {
		throw new Error(`Nanocode submission failed: ${response.status}`);
	}
	return response.json();
}
```

Store the request ID before submitting. Reuse that ID and input when retrying. Different input under the same ID returns HTTP `409`.

HTTP `202` means the turn is pending, not complete. Use the same authentication when reading its status or events:

| Request | Result |
| --- | --- |
| `GET /sessions/demo/turns/{request_id}` | Turn status and recorded result |
| `GET /sessions/demo/events?after=0` with `Accept: text/event-stream` | Server-sent events from the stored log, followed by new events |
| WebSocket upgrade to `/sessions/demo/socket` | Nanocode client connection |

For reconnects, resume from the last event cursor your client processed. Use the [Nanocode Cloudflare transport ↗︎](https://github.com/gakonst/nanocode-ts/blob/main/src/cloudflare/Transport.ts) for its client protocol.

## Recovery boundaries

Nanocode journals turns and tool receipts. Its Cloudflare host uses alarms to resume pending work after an interruption.

- **Committed tool receipt:** Recovery reuses the saved result.
- **Tool started without a receipt:** Recovery depends on the host adapter. Remote tools can recover a recorded reply or reconnect to outstanding work. An outcome that cannot be recovered remains unknown. External effects still need idempotency or reconciliation.
- **External sandbox:** Session recovery does not restore its filesystem or running processes. Those depend on your workspace backend.

Refer to [Nanocode durability ↗︎](https://nanocode.xyz/docs/guides/durability).

## Workspaces

Nanocode uses its own host adapters for workspace and tool operations. Its Cloudflare host does not include an `@cloudflare/computer` integration. To use Computer, implement an adapter that maps those operations to a [Workspace](https://developers.cloudflare.com/agents/tools/filesystem/) in the session's Durable Object, or call a separate object that owns one.

Persistent session state does not preserve an external sandbox's files or processes. Choose and configure that backend's persistence separately.

## Add Agents SDK capabilities

Use a separate SDK Agent when your application needs schedules, email, or synchronized application state:

```
flowchart TD
    Schedule[Scheduled task] --> App[SDK Agent]
    Email[Incoming email] --> App
    App -->|Submit with a stable request ID| Session[Nanocode AgentSession]
    Session -->|Status and events| App
    App -->|State sync| UI[Client UI]

```

For example, a [scheduled task](https://developers.cloudflare.com/agents/agent-class/schedule-tasks/) can submit a daily review. An [email handler](https://developers.cloudflare.com/agents/agent-class/communication-channels/email/) can submit a message, and [state sync](https://developers.cloudflare.com/agents/agent-class/state/) can show task progress in your UI.

This requires application code to map identities, submit turns, and track results. Nanocode retains its own transcript and recovery loop.

Keep SDK Lifecycle on the SDK object: `AgentSession` already owns its alarm and WebSocket handlers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/nanocode/#page","headline":"Nanocode","description":"Run Nanocode on Cloudflare Workers with its own Durable Object host, and connect optional Agents SDK capabilities.","url":"https://developers.cloudflare.com/agents/harnesses/nanocode/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/nanocode/og.png?v=43b4aec9564b6d35","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
