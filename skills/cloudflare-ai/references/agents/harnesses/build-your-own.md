---
description: Write your own agent loop as a Lifecycle capability, using the experimental Sessions, Streams, and Tasks capabilities or HarnessStore.
title: Build your own harness
image: https://developers.cloudflare.com/agents/harnesses/build-your-own/og.png?v=a4dbf70ba75d0701
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build your own harness

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/build-your-own/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Experimental

The building blocks on this page are experimental: the Sessions, Streams, and Tasks capabilities, and `HarnessStore` from `agents/harness/store`. Their APIs may change in any release. To run an agent loop on a stable API today, use the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/).

Write your own harness when you need full control over the model call, the message format, the tool loop, or the protocol your clients speak. A harness is a [Lifecycle capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/) like any other: it gets the Durable Object's SQLite storage and a durable job queue, and the job queue wakes it after an eviction so it can finish its work.

What you build on depends on where the agent loop runs:

- **Inside the Durable Object.** Combine the Sessions, Streams, and Tasks capabilities. Sessions stores the conversation, Streams stores model output as it arrives so clients can reconnect and resume, and Tasks runs each turn as replayable steps.
- **Outside the Durable Object**, such as in a container or a remote process. Keep the agent's durable record in `HarnessStore`, and let the agent speak its own format.

## Run the loop inside the Durable Object

This sketch stores the user's message, runs the turn as a task, and streams the reply to the client over Server-Sent Events (SSE). Replace `generateReply()` with your model call.

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions } from "agents/sessions";
import { sseResponse, Streams } from "agents/streams";
import { Tasks } from "agents/tasks";

// Replace with your model call. It yields text deltas.

export class MyHarness extends DurableObject {
	sessions = new Sessions();
	streams = new Streams();
	tasks = new Tasks({
		definitions: {
			"turn@v1": async ({ streamId }, step) => {
				const text = await step.do("generate", async () => {
					const history = await this.session.getHistory();
					const stream = await this.streams.open(streamId);
					let reply = "";
					for await (const delta of generateReply(history)) {
						reply += delta;
						stream.append({ delta });
					}
					stream.close();
					return reply;
				});
				await step.do("save", async () => {
					await this.session.appendMessage({
						id: streamId,
						role: "assistant",
						parts: [{ type: "text", text }],
					});
				});
			},
		},
	});
	lifecycle = Lifecycle.install(this)
		.use(this.sessions)
		.use(this.streams)
		.use(this.tasks);
	session = this.sessions.session();

	async onRequest(request) {
		const url = new URL(request.url);
		if (request.method === "POST") {
			await this.session.appendMessage({
				id: crypto.randomUUID(),
				role: "user",
				parts: [{ type: "text", text: await request.text() }],
			});
			const streamId = crypto.randomUUID();
			await this.tasks.run("turn@v1", { streamId });
			return Response.json({ streamId }, { status: 202 });
		}
		const streamId = url.searchParams.get("stream");
		if (!streamId) return new Response("Missing stream", { status: 400 });
		return sseResponse(this.streams, streamId, { request });
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions, type SessionMessage } from "agents/sessions";
import { sseResponse, Streams } from "agents/streams";
import { Tasks, type TaskStep } from "agents/tasks";

// Replace with your model call. It yields text deltas.
declare function generateReply(
	history: SessionMessage[],
): AsyncIterable<string>;

type TurnInput = { streamId: string };

export class MyHarness extends DurableObject<Env> {
	readonly sessions = new Sessions();
	readonly streams = new Streams();
	readonly tasks = new Tasks({
		definitions: {
			"turn@v1": async ({ streamId }: TurnInput, step: TaskStep) => {
				const text = await step.do("generate", async () => {
					const history = await this.session.getHistory();
					const stream = await this.streams.open(streamId);
					let reply = "";
					for await (const delta of generateReply(history)) {
						reply += delta;
						stream.append({ delta });
					}
					stream.close();
					return reply;
				});
				await step.do("save", async () => {
					await this.session.appendMessage({
						id: streamId,
						role: "assistant",
						parts: [{ type: "text", text }],
					});
				});
			},
		},
	});
	readonly lifecycle = Lifecycle.install(this)
		.use(this.sessions)
		.use(this.streams)
		.use(this.tasks);
	readonly session = this.sessions.session();

	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);
		if (request.method === "POST") {
			await this.session.appendMessage({
				id: crypto.randomUUID(),
				role: "user",
				parts: [{ type: "text", text: await request.text() }],
			});
			const streamId = crypto.randomUUID();
			await this.tasks.run("turn@v1", { streamId });
			return Response.json({ streamId }, { status: 202 });
		}
		const streamId = url.searchParams.get("stream");
		if (!streamId) return new Response("Missing stream", { status: 400 });
		return sseResponse(this.streams, streamId, { request });
	}
}
```

How the pieces work together:

- **Sessions** keeps the transcript in the object's SQLite database. `getHistory()` reads the active path, and `appendMessage()` writes a message.
- **Tasks** journals each `step.do()`. After an eviction, a finished step returns its stored result, and the run continues from the first unfinished step. A model call cannot resume halfway, so an interrupted `generate` step runs again from the start. Check `step.interrupted` in the handler to decide what to do with a partial reply.
- **Streams** stores each delta as it is appended. `sseResponse()` replays what a client missed, then follows the live stream, so a client that reconnects mid-turn catches up.

To turn the sketch into a reusable harness, move the loop into a class that extends `LifecycleCapability` and takes the three capabilities as constructor options. The host object installs all four on its Lifecycle. Refer to [Build a capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/).

For a complete harness built this way, refer to the [Codex harness](https://developers.cloudflare.com/agents/harnesses/codex/). It runs a turn loop derived from Codex, compiled to WebAssembly, as a capability on a plain Durable Object. The transcript lives in Sessions, operation events go to Streams, model and tool steps run as Tasks, files live in a [Cloudflare Computer workspace](https://developers.cloudflare.com/agents/tools/filesystem/), and the [WebSockets](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) capability serves the events to the browser.

The Agents SDK also includes a small experimental AI SDK harness, `AiSdkHarness` from `agents/harness/ai-sdk`. It runs one AI SDK `streamText` call per operation and keeps its sessions in the Durable Object's storage. It is the smallest complete harness in the SDK, and a useful reference when you write your own.

## Keep the record of an agent that runs elsewhere

When the agent loop runs outside the Durable Object, the object still needs a durable record: which sessions exist, what was submitted, and what the agent produced. `HarnessStore` from `agents/harness/store` keeps that record in the object's SQLite database. It is a helper over `ctx.storage.sql`, not a capability, so you open it on the storage and do not install it on the Lifecycle.

It stores three things:

- **Sessions**, each with an optional parent and a JSON state that your harness owns.
- **Operations**, the submissions to a session. Each has an idempotency id that is unique within its session, an input, and a status: `queued`, `running`, `done`, or `unanswered`.
- **Logs**, named lists of JSON entries per session, such as `messages` or `events`. An entry with an id replaces the earlier entry with the same id, in place.

The store does not know your agent's format. Every input, result, and log entry is plain JSON.

```js
import { DurableObject } from "cloudflare:workers";
import { openHarnessStore } from "agents/harness/store";

export class RemoteAgent extends DurableObject {
	store = openHarnessStore(this.ctx.storage, { prefix: "my_agent_" });

	submit(session, operationId, text) {
		this.store.createSession({ id: session });
		const { record, accepted } = this.store.enqueue({
			session,
			id: operationId,
			input: { text },
		});
		return { operationId: record.id, accepted };
	}

	// Called by the process that runs the agent, as it makes progress.
	report(session, operationId, messages) {
		this.store.start(session, operationId);
		this.store.append(
			session,
			"messages",
			messages.map((message) => ({ id: message.id, data: message })),
		);
	}

	finish(session, operationId, text) {
		this.store.settle(session, operationId, {
			status: "done",
			result: { text },
		});
	}

	transcript(session) {
		return this.store.read(session, "messages").map((entry) => entry.data);
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { openHarnessStore } from "agents/harness/store";

export class RemoteAgent extends DurableObject<Env> {
	readonly store = openHarnessStore(this.ctx.storage, { prefix: "my_agent_" });

	submit(session: string, operationId: string, text: string) {
		this.store.createSession({ id: session });
		const { record, accepted } = this.store.enqueue({
			session,
			id: operationId,
			input: { text },
		});
		return { operationId: record.id, accepted };
	}

	// Called by the process that runs the agent, as it makes progress.
	report(
		session: string,
		operationId: string,
		messages: { id: string; text: string }[],
	) {
		this.store.start(session, operationId);
		this.store.append(
			session,
			"messages",
			messages.map((message) => ({ id: message.id, data: message })),
		);
	}

	finish(session: string, operationId: string, text: string) {
		this.store.settle(session, operationId, {
			status: "done",
			result: { text },
		});
	}

	transcript(session: string) {
		return this.store.read(session, "messages").map((entry) => entry.data);
	}
}
```

The store's tables share one prefix, `harness_` by default. Give each harness in the same object its own prefix. A prefix cannot start with `_cf_`, which Durable Objects reserve.

Pair the store with the Lifecycle's job queue to wake the object while the remote agent works, and with the [WebSockets](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) capability to serve the logs to clients.

## Related resources

- [Build a capability](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/): the `LifecycleCapability` base class, its storage, and its job queue.
- [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/): a complete harness on a stable API.
- [Codex harness](https://developers.cloudflare.com/agents/harnesses/codex/): a harness built on Sessions, Streams, and Tasks.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/build-your-own/#page","headline":"Build your own harness","description":"Write your own agent loop as a Lifecycle capability, using the experimental Sessions, Streams, and Tasks capabilities or HarnessStore.","url":"https://developers.cloudflare.com/agents/harnesses/build-your-own/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/build-your-own/og.png?v=a4dbf70ba75d0701","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
