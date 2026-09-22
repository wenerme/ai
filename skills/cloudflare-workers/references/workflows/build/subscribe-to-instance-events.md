---
description: Use Cloudflare Workflows subscribe method to receive historical and live instance events without polling status.
title: Subscribe to instance events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Subscribe to instance events

Last updated Sep 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workflows/build/subscribe-to-instance-events/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `WorkflowInstance.subscribe()` to receive events without polling [`status()`](https://developers.cloudflare.com/workflows/build/workers-api/#status). A subscription first delivers events recorded before you subscribed. After delivering these retained events, the subscription waits for new events as the instance runs.

You can subscribe immediately after creating an instance. To subscribe later, retrieve the instance with [`get()`](https://developers.cloudflare.com/workflows/build/workers-api/#get). Subscriptions remain available during the [instance retention period](https://developers.cloudflare.com/workflows/reference/limits/).

## Subscribe to all events

```js
export default {
	async fetch(_request, env) {
		const instance = await env.MY_WORKFLOW.create({
			params: { reportId: "report-123" },
		});

		using subscription = await instance.subscribe();

		while (true) {
			const result = await subscription.next();
			if (result.done) {
				break;
			}

			console.log(result.value.type, result.value);
		}

		return Response.json({ instanceId: instance.id });
	},
};
```

```ts
interface Env {
	MY_WORKFLOW: Workflow;
}

export default {
	async fetch(_request: Request, env: Env) {
		const instance = await env.MY_WORKFLOW.create({
			params: { reportId: "report-123" },
		});

		using subscription = await instance.subscribe();

		while (true) {
			const result = await subscription.next();
			if (result.done) {
				break;
			}

			console.log(result.value.type, result.value);
		}

		return Response.json({ instanceId: instance.id });
	},
} satisfies ExportedHandler<Env>;
```

The subscription ends when the instance emits `workflow_completed`, `workflow_errored`, or `workflow_terminated`. After a terminal event, each later `next()` call returns `done: true`.

## Filter events

Set `filter` to limit `next()` results to specific event types.

```js
const instance = await env.MY_WORKFLOW.get("report-123");

using subscription = await instance.subscribe({
	filter: ["workflow_completed", "workflow_errored", "workflow_terminated"],
});

const result = await subscription.next();
if (result.done) {
	throw new Error("The instance ended without a matching event.");
}

switch (result.value.type) {
	case "workflow_completed":
		console.log("Workflow output:", result.value.output);
		break;
	case "workflow_errored":
		console.error("Workflow errored:", result.value.error);
		break;
	case "workflow_terminated":
		console.log("Workflow terminated.");
		break;
}
```

```ts
const instance = await env.MY_WORKFLOW.get("report-123");

using subscription = await instance.subscribe({
	filter: ["workflow_completed", "workflow_errored", "workflow_terminated"],
});

const result = await subscription.next();
if (result.done) {
	throw new Error("The instance ended without a matching event.");
}

switch (result.value.type) {
	case "workflow_completed":
		console.log("Workflow output:", result.value.output);
		break;
	case "workflow_errored":
		console.error("Workflow errored:", result.value.error);
		break;
	case "workflow_terminated":
		console.log("Workflow terminated.");
		break;
}
```

A subscription ends even when its filter excludes a terminal event. In that case, `next()` returns `done: true` without the event.

## Resume from a cursor

Each event includes an `eventId`. To resume after a remote procedure call (RPC) fails, store the last processed event ID. Then pass that ID as `cursor`:

```js
using subscription = await instance.subscribe({
	cursor: lastProcessedEventId,
	filter: ["step_completed", "workflow_completed", "workflow_errored"],
});

while (true) {
	const result = await subscription.next();
	if (result.done) {
		break;
	}

	await processEvent(result.value);
	await saveLastProcessedEventId(result.value.eventId);
}
```

```ts
using subscription = await instance.subscribe({
	cursor: lastProcessedEventId,
	filter: ["step_completed", "workflow_completed", "workflow_errored"],
});

while (true) {
	const result = await subscription.next();
	if (result.done) {
		break;
	}

	await processEvent(result.value);
	await saveLastProcessedEventId(result.value.eventId);
}
```

The cursor identifies the last processed event. The subscription starts with the first event whose `eventId` is greater than the cursor.

## Sensitive outputs

For steps marked as sensitive, the `step_completed` event sets `output` to `"[REDACTED]"`.

## Dispose of a subscription

A subscription holds a Workers RPC resource. Disposing the subscription stops event delivery, clears its state, and releases its resources.

Declare the subscription with `using` for automatic disposal when the scope exits, or call `subscription[Symbol.dispose]()` in a `finally` block. For more information, refer to [RPC lifecycle](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/).

## Event fields

The public type definition shows the fields available on each event:

```js

```

```ts
type WorkflowInstanceEvent = {
	instanceId: string;
	eventId: number;
	timestamp: number;
} & (
	| { type: "workflow_queued" }
	| { type: "workflow_started"; params?: unknown }
	| { type: "workflow_running" }
	| { type: "workflow_paused" }
	| { type: "workflow_waiting_for_pause" }
	| { type: "workflow_waiting" }
	| { type: "workflow_completed"; output?: unknown }
	| { type: "workflow_errored"; error: { name: string; message: string } }
	| { type: "workflow_terminated" }
	| {
			type: "step_started";
			stepName: string;
			config?: {
				retries: {
					limit: number;
					delay: WorkflowSleepDuration | "[dynamic]";
					backoff?: "constant" | "linear" | "exponential";
				};
				timeout: WorkflowSleepDuration;
				sensitive?: "output";
			};
	  }
	| { type: "step_completed"; stepName: string; output?: unknown }
	| { type: "step_errored"; stepName: string }
	| { type: "attempt_started"; stepName: string; attempt: number }
	| { type: "attempt_completed"; stepName: string; attempt: number }
	| {
			type: "attempt_errored";
			stepName: string;
			attempt: number;
			retryDelayMs?: number;
			error: { name: string; message: string };
	  }
	| { type: "sleep_started"; stepName: string; durationMs: number }
	| { type: "sleep_completed"; stepName: string }
	| { type: "wait_started"; stepName: string; eventType: string }
	| { type: "wait_completed"; stepName: string }
	| { type: "wait_timed_out"; stepName: string }
	| { type: "rollback_started" }
	| {
			type: "rollback_step_started";
			stepName: string;
			config?: {
				retries: {
					limit: number;
					delay: WorkflowSleepDuration | "[dynamic]";
					backoff?: "constant" | "linear" | "exponential";
				};
				timeout: WorkflowSleepDuration;
				sensitive?: "output";
			};
	  }
	| { type: "rollback_step_completed"; stepName: string }
	| {
			type: "rollback_step_errored";
			stepName: string;
			error: { name: string; message: string };
	  }
	| { type: "rollback_attempt_started"; stepName: string; attempt: number }
	| { type: "rollback_attempt_completed"; stepName: string; attempt: number }
	| {
			type: "rollback_attempt_errored";
			stepName: string;
			attempt: number;
			retryDelayMs?: number;
			error: { name: string; message: string };
	  }
	| { type: "rollback_completed" }
	| { type: "rollback_errored" }
);
```

The following sections describe when each event is emitted.

### Workflow lifecycle events

| Event type | Emitted when |
| --- | --- |
| `workflow_queued` | The instance enters the execution queue |
| `workflow_started` | The instance starts |
| `workflow_running` | The instance starts or resumes execution |
| `workflow_paused` | The instance pauses |
| `workflow_waiting_for_pause` | The instance waits for current work before pause |
| `workflow_waiting` | The instance enters waiting state |
| `workflow_completed` | The instance completes successfully |
| `workflow_errored` | The instance ends with an error |
| `workflow_terminated` | The instance is terminated |

### Step and attempt events

| Event type | Emitted when |
| --- | --- |
| `step_started` | A `step.do()` call starts |
| `step_completed` | A `step.do()` call completes |
| `step_errored` | A `step.do()` call errors |
| `attempt_started` | A step attempt starts |
| `attempt_completed` | A step attempt completes |
| `attempt_errored` | A step attempt errors |

### Sleep and wait events

| Event type | Emitted when |
| --- | --- |
| `sleep_started` | A `step.sleep()` or `step.sleepUntil()` call starts |
| `sleep_completed` | A sleep finishes |
| `wait_started` | A `step.waitForEvent()` call starts |
| `wait_completed` | A matching event reaches `step.waitForEvent()` |
| `wait_timed_out` | A `step.waitForEvent()` call times out |

### Rollback events

| Event type | Emitted when |
| --- | --- |
| `rollback_started` | The Workflow starts a rollback |
| `rollback_step_started` | A rollback handler starts |
| `rollback_step_completed` | A rollback handler completes |
| `rollback_step_errored` | A rollback handler errors |
| `rollback_attempt_started` | A rollback attempt starts |
| `rollback_attempt_completed` | A rollback attempt completes |
| `rollback_attempt_errored` | A rollback attempt errors |
| `rollback_completed` | All required rollback handlers complete |
| `rollback_errored` | The rollback operation errors |

For method signatures and option types, refer to [`WorkflowInstance.subscribe()`](https://developers.cloudflare.com/workflows/build/workers-api/#subscribe).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/subscribe-to-instance-events/#page","headline":"Subscribe to instance events","description":"Use Cloudflare Workflows subscribe method to receive historical and live instance events without polling status.","url":"https://developers.cloudflare.com/workflows/build/subscribe-to-instance-events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
