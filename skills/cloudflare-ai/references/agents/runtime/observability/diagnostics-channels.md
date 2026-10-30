---
description: Subscribe to structured events from the Lifecycle, its capabilities, and the Agent class, including RPC calls, schedules, jobs, and MCP connections.
title: Diagnostics channels
image: https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/og.png?v=540fccc9d492b2ec
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Diagnostics channels

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) and its capabilities publish structured events to [diagnostics channels](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/) for significant operations, such as RPC calls, schedule execution, job queue warnings, and MCP connections. The `Agent` class publishes more events for state changes, chat, workflows, and email. Publishing has no overhead when nobody is listening.

Events work the same on any Durable Object that installs the Lifecycle and on the `Agent` class.

## Event structure

Every event has these fields:

```ts
{
  type: "rpc",                        // what happened
  source: "websockets",               // which capability emitted it
  agent: "MyAgent",                   // which Durable Object class emitted it
  name: "user-123",                   // which instance (Durable Object name)
  payload: { method: "getWeather" },  // details
  timestamp: 1758005142787            // when (ms since epoch)
}
```

- `agent` is the Durable Object class name and `name` is the instance name.
- `source` is the ID of the capability that emitted the event, or `lifecycle` for events from the Lifecycle job queue. It is set on events that a Lifecycle publishes directly. Events emitted through the `Agent` class's `observability` property do not have a `source`.

## Channels

Each event goes to one channel, chosen by the prefix of its `type`:

| Channel | Event types | Description |
| --- | --- | --- |
| `agents:state` | `state:*` | State sync events |
| `agents:rpc` | `rpc`, `rpc:*` | RPC method calls and failures |
| `agents:message` | `message:*`, `tool:*`, `submission:*`, `action:*` | Chat message, tool, Think submission, and Think action lifecycle |
| `agents:chat` | `chat:*`, except `chat:transcript:*` | Chat turns, requests, recovery, stream stalls, and context handling |
| `agents:transcript` | `transcript:*`, `chat:transcript:*` | Transcript repair events |
| `agents:fiber` | `fiber:*` | Durable fiber lifecycle |
| `agents:agent_tool` | `agent_tool:*` | Parent and child agent-tool runs |
| `agents:schedule` | `schedule:*`, `queue:*` | Scheduled and queued callbacks |
| `agents:workflow` | `workflow:*` | Workflow state transitions |
| `agents:mcp` | `mcp:*` | MCP client operations |
| `agents:email` | `email:*` | Email processing |
| `agents:task` | `task:*` | Events from the experimental Tasks capability. Not covered on this page |
| `agents:stream` | `stream:*` | Events from the experimental Streams capability. Not covered on this page |
| `agents:channel` | `channel:*`, `notice:*` | Events from the experimental channels module. Not covered on this page |
| `agents:lifecycle` | `connect`, `disconnect`, `destroy`, `job:*`, `alarm:*`, and every type that matches no other prefix | Connections, teardown, the job queue, and custom capability events |

`agents:lifecycle` is the fallback channel. An event whose type matches none of the prefixes above, such as an event from your own capability, lands there.

## Subscribing to events

### Typed subscribe helper

The `subscribe()` function from `agents/observability` provides type-safe access to events on a specific channel:

```js
import { subscribe } from "agents/observability";

const unsub = subscribe("rpc", (event) => {
	if (event.type === "rpc") {
		console.log(`RPC call: ${event.payload.method}`);
	}
	if (event.type === "rpc:error") {
		console.error(
			`RPC failed: ${event.payload.method} — ${event.payload.error}`,
		);
	}
});

// Clean up when done
unsub();
```

```ts
import { subscribe } from "agents/observability";

const unsub = subscribe("rpc", (event) => {
	if (event.type === "rpc") {
		console.log(`RPC call: ${event.payload.method}`);
	}
	if (event.type === "rpc:error") {
		console.error(
			`RPC failed: ${event.payload.method} — ${event.payload.error}`,
		);
	}
});

// Clean up when done
unsub();
```

The callback is typed: `event` is narrowed to the event types in the [event reference](#event-reference) for that channel. Events from your own capabilities are not part of those types. Read them with the raw API.

The typed helper uses camelCase keys, so agent-tool events are `subscribe("agentTool", ...)`. Raw diagnostics channel subscribers use the emitted channel name, `agents:agent_tool`.

### Raw diagnostics\_channel

You can also subscribe directly using the Node.js API:

```js
import { subscribe } from "node:diagnostics_channel";

subscribe("agents:schedule", (event) => {
	console.log(event);
});
```

```ts
import { subscribe } from "node:diagnostics_channel";

subscribe("agents:schedule", (event) => {
	console.log(event);
});
```

## Emit events from your own capability

A capability that extends `LifecycleCapability` publishes events with `this.lifecycle.events.emit(type, payload)`. The Lifecycle adds the `source`, `agent`, `name`, and `timestamp` fields and routes the event by its type prefix. A type with an unknown prefix lands on `agents:lifecycle`:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, LifecycleCapability } from "agents/lifecycle";

class Orders extends LifecycleCapability {
	constructor() {
		super("orders");
	}

	place(orderId) {
		// Unknown prefix, so this lands on agents:lifecycle
		this.lifecycle.events.emit("order:placed", { orderId });
	}
}

export class Shop extends DurableObject {
	orders = new Orders();
	lifecycle = Lifecycle.install(this).use(this.orders);
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, LifecycleCapability } from "agents/lifecycle";

class Orders extends LifecycleCapability {
	constructor() {
		super("orders");
	}

	place(orderId: string) {
		// Unknown prefix, so this lands on agents:lifecycle
		this.lifecycle.events.emit("order:placed", { orderId });
	}
}

export class Shop extends DurableObject<Env> {
	readonly orders = new Orders();
	readonly lifecycle = Lifecycle.install(this).use(this.orders);
}
```

Read these events by type on the raw channel:

```js
import { subscribe } from "node:diagnostics_channel";

subscribe("agents:lifecycle", (message) => {
	const event = message;
	if (event.type === "order:placed") {
		console.log(event.source, event.payload);
	}
});
```

```ts
import { subscribe } from "node:diagnostics_channel";

subscribe("agents:lifecycle", (message) => {
	const event = message as { type: string; source?: string; payload: unknown };
	if (event.type === "order:placed") {
		console.log(event.source, event.payload);
	}
});
```

Events are best effort. Events emitted while the Lifecycle is starting are held and published once startup finishes, and dropped if startup fails. Refer to [Build a capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/) for the rest of the capability API.

## Tail Workers (production)

In production, all diagnostics channel messages are automatically forwarded to [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/). No subscription code is needed in the agent itself. Attach a Tail Worker and read events from `event.diagnosticsChannelEvents`:

```js
export default {
	async tail(events) {
		for (const event of events) {
			for (const msg of event.diagnosticsChannelEvents) {
				// msg.channel is "agents:rpc", "agents:lifecycle", etc.
				// msg.message is the event
				console.log(msg.timestamp, msg.channel, msg.message);
			}
		}
	},
};
```

```ts
export default {
	async tail(events) {
		for (const event of events) {
			for (const msg of event.diagnosticsChannelEvents) {
				// msg.channel is "agents:rpc", "agents:lifecycle", etc.
				// msg.message is the event
				console.log(msg.timestamp, msg.channel, msg.message);
			}
		}
	},
};
```

This gives you structured, filterable observability in production with no overhead in the agent hot path.

## On the `Agent` class

The `Agent` class sends its events through an `observability` property. The default implementation, `genericObservability` from `agents/observability`, publishes each event to the channels above. A Durable Object that installs the Lifecycle directly has no `observability` property. Its events always go to the channels, and you filter them in the subscriber.

To replace the default on an `Agent`, provide your own `Observability` implementation:

```js
import { Agent } from "agents";

const myObservability = {
	emit(event) {
		// Send to your logging service, filter events, etc.
		if (event.type === "rpc:error") {
			console.error(event.payload.method, event.payload.error);
		}
	},
};

class MyAgent extends Agent {
	observability = myObservability;
}
```

```ts
import { Agent } from "agents";
import type { Observability } from "agents/observability";

const myObservability: Observability = {
	emit(event) {
		// Send to your logging service, filter events, etc.
		if (event.type === "rpc:error") {
			console.error(event.payload.method, event.payload.error);
		}
	},
};

class MyAgent extends Agent {
	override observability = myObservability;
}
```

Set `observability` to `undefined` to disable all event emission:

```js
import { Agent } from "agents";

class MyAgent extends Agent {
	observability = undefined;
}
```

```ts
import { Agent } from "agents";

class MyAgent extends Agent {
	override observability = undefined;
}
```

## Event reference

### RPC events

| Type | Payload | When |
| --- | --- | --- |
| `rpc` | `{ method, streaming? }` | A client calls a method on the `WebSockets` capability's `callables`, or a `@callable` method |
| `rpc:error` | `{ method, error }` | That method throws |

### State events

| Type | Payload | When |
| --- | --- | --- |
| `state:update` | `{}` | `setState()` is called on an `Agent` |

### Message, tool, and submission events

These events track chat message lifecycle, client-side tool interactions, and Think durable submissions.

| Type | Payload | When |
| --- | --- | --- |
| `message:request` | `{}` | A chat message is received |
| `message:response` | `{}` | A chat response stream completes |
| `message:clear` | `{}` | Chat history is cleared |
| `message:cancel` | `{ requestId }` | A streaming request is cancelled |
| `message:error` | `{ error }` | A chat stream fails |
| `tool:result` | `{ toolCallId, toolName }` | A client tool result is received |
| `tool:approval` | `{ toolCallId, approved }` | A tool call is approved or rejected |
| `submission:create` | `{ submissionId }` | A Think submission is accepted |
| `submission:status` | `{ submissionId, status }` | A Think submission status changes |
| `submission:error` | `{ submissionId, error }` | A Think submission fails |

### Chat turn events

| Type | Payload | When |
| --- | --- | --- |
| `chat:turn:start` | `{ requestId, trigger, admission, continuation?, generation? }` | A chat turn starts |
| `chat:turn:finish` | `{ requestId, trigger, admission, continuation?, generation?, status, durationMs, error? }` | A chat turn ends |

### Chat recovery events

| Type | Payload | When |
| --- | --- | --- |
| `chat:request:failed` | `{ requestId?, stage, messagesPersisted?, error }` | A Think chat request fails while parsing, persisting, running, or streaming |
| `chat:recovery:detected` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind }` | An interrupted chat fiber is first observed |
| `chat:recovery:attempt` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind }` | The framework begins a recovery attempt |
| `chat:recovery:scheduled` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind }` | A retry or continuation callback is scheduled |
| `chat:recovery:completed` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind }` | Recovery completed successfully |
| `chat:recovery:skipped` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind, reason? }` | Recovery was skipped because the conversation changed or was no longer recoverable |
| `chat:recovery:failed` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind, reason? }` | Recovery ran but failed |
| `chat:recovery:exhausted` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind, reason }` | Recovery exceeded its configured attempt budget |
| `chat:stream:stalled` | `{ requestId, timeoutMs }` | The inactivity watchdog fired because no stream chunk arrived within `chatStreamStallTimeoutMs`. The turn routes into durable recovery |

`recoveryKind` is `"retry"` when recovery replays an unanswered user turn and `"continue"` when it continues a partial assistant turn.

### Chat context events

| Type | Payload | When |
| --- | --- | --- |
| `chat:context:compacted` | `{ reason, shortened, requestId?, attempt? }` | Think compacts the session to handle a context-window overflow. `reason` is `"proactive"` (the `contextOverflow.proactive` guard fired before a step) or `"reactive"` (`contextOverflow.reactive` fired after an overflow). `shortened` is whether compaction actually reduced history — `false` means a retry would overflow again. Refer to [Context-window overflow recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/#context-window-overflow-recovery). |

### Transcript events

| Type | Payload | When |
| --- | --- | --- |
| `chat:transcript:repaired` | `{ requestId?, removedToolCalls, normalizedInputs, toolCallIds? }` | Think repairs a persisted transcript before sending it to the provider. `removedToolCalls` counts orphaned tool calls healed; `normalizedInputs` counts stringified or missing tool inputs repaired |

### Fiber events

| Type | Payload | When |
| --- | --- | --- |
| `fiber:run:started` | `{ fiberId, fiberName, managed? }` | A durable fiber starts |
| `fiber:run:completed` | `{ fiberId, fiberName, managed?, elapsedMs? }` | A durable fiber completes |
| `fiber:run:failed` | `{ fiberId, fiberName, managed?, error, elapsedMs? }` | A durable fiber throws |
| `fiber:run:interrupted` | `{ fiberId, fiberName, managed?, recoveryReason, elapsedMs? }` | Startup finds an interrupted fiber |
| `fiber:recovery:detected` | `{ fiberId, fiberName, managed?, recoveryReason, elapsedMs? }` | Recovery sees an interrupted fiber |
| `fiber:recovery:attempt` | `{ fiberId, fiberName, managed?, recoveryReason }` | A recovery hook starts |
| `fiber:recovery:handled` | `{ fiberId, fiberName, managed?, recoveryReason, status, elapsedMs? }` | Recovery handling completes |
| `fiber:recovery:skipped` | `{ fiberId, fiberName, managed?, reason, elapsedMs? }` | A recovery scan skips remaining work |
| `fiber:recovery:failed` | `{ fiberId, fiberName, managed?, error, reason?, elapsedMs? }` | A recovery hook fails |

### Agent-tool recovery events

| Type | Payload | When |
| --- | --- | --- |
| `agent_tool:recovery:begin` | `{ runCount, totalTimeoutMs? }` | Parent recovery starts scanning stale agent-tool runs |
| `agent_tool:recovery:row` | `{ runId, agentType, status, reason?, elapsedMs? }` | One stale run is reconciled |
| `agent_tool:recovery:deadline` | `{ runId, agentType, elapsedMs? }` | Total recovery deadline is exhausted before inspecting a row |
| `agent_tool:recovery:complete` | `{ runCount, elapsedMs? }` | Parent recovery finishes scanning rows |
| `agent_tool:recovery:failed` | `{ error }` | Parent recovery fails unexpectedly |

### Schedule and queue events

| Type | Payload | When |
| --- | --- | --- |
| `schedule:create` | `{ callback, id }` | A schedule is created |
| `schedule:execute` | `{ callback, id }` | A scheduled callback starts |
| `schedule:cancel` | `{ callback, id }` | A schedule is cancelled |
| `schedule:retry` | `{ callback, id, attempt, maxAttempts }` | A scheduled callback is retried |
| `schedule:error` | `{ callback, id, error, attempts }` | A scheduled callback fails after all retries |
| `schedule:duplicate_warning` | `{ callback, count, type }` | A non-idempotent schedule may duplicate work |
| `queue:create` | `{ callback, id }` | A task is enqueued |
| `queue:retry` | `{ callback, id, attempt, maxAttempts }` | A queued callback is retried |
| `queue:error` | `{ callback, id, error, attempts }` | A queued callback fails after all retries |

### Lifecycle events

These events come from the `Agent` class:

| Type | Payload | When |
| --- | --- | --- |
| `connect` | `{ connectionId }` | A WebSocket connection is established |
| `disconnect` | `{ connectionId, code, reason }` | A WebSocket connection is closed |
| `destroy` | `{}` | The agent is destroyed |

These events come from the Lifecycle job queue, on any Durable Object that installs the Lifecycle. Their `source` is `lifecycle`:

| Type | Payload | When |
| --- | --- | --- |
| `job:slow_dispatch` | `{ capability, fn, id, thresholdMs }` | A job's `onJob` dispatch has run longer than its threshold. Long dispatches delay every other job on the object |
| `job:backlog_warning` | `{ capability, count }` | One capability has many due jobs in a single alarm cycle, usually because one-shot jobs are pushed without a stable ID |
| `alarm:memory_limit_reset` | `{ strikes, limit, sealed, error }` | An alarm hit the memory limit. `sealed` is `true` once the strike limit is reached |

### Workflow events

| Type | Payload | When |
| --- | --- | --- |
| `workflow:start` | `{ workflowId, workflowName? }` | A workflow instance is started |
| `workflow:event` | `{ workflowId, eventType? }` | An event is sent to a workflow |
| `workflow:approved` | `{ workflowId, reason? }` | A workflow is approved |
| `workflow:rejected` | `{ workflowId, reason? }` | A workflow is rejected |
| `workflow:terminated` | `{ workflowId, workflowName? }` | A workflow is terminated |
| `workflow:paused` | `{ workflowId, workflowName? }` | A workflow is paused |
| `workflow:resumed` | `{ workflowId, workflowName? }` | A workflow is resumed |
| `workflow:restarted` | `{ workflowId, workflowName? }` | A workflow is restarted |

### MCP events

| Type | Payload | When |
| --- | --- | --- |
| `mcp:client:preconnect` | `{ serverId }` | Before connecting to an MCP server |
| `mcp:client:connect` | `{ url, transport, state, error? }` | An MCP connection attempt completes or fails |
| `mcp:client:authorize` | `{ serverId, authUrl, clientId? }` | An MCP OAuth flow begins |
| `mcp:client:discover` | `{ url?, state?, error?, capability? }` | MCP capability discovery succeeds or fails |
| `mcp:client:close` | `{ url, transport?, state, error?, phase? }` | An MCP connection is closed |

### Email events

| Type | Payload | When |
| --- | --- | --- |
| `email:receive` | `{ from, to, subject? }` | An email is received |
| `email:reply` | `{ from, to, subject? }` | A reply email is sent |
| `email:send` | `{ from, to, subject? }` | An email is sent |

## Next steps

### [Tracing](https://developers.cloudflare.com/agents/runtime/observability/tracing/)

Trace model calls, tool runs, and approvals with Workers traces.

### [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/)

Forward diagnostics channel events to a Tail Worker for production monitoring.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/#page","headline":"Diagnostics channels","description":"Subscribe to structured events from the Lifecycle, its capabilities, and the Agent class, including RPC calls, schedules, jobs, and MCP connections.","url":"https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/og.png?v=540fccc9d492b2ec","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
