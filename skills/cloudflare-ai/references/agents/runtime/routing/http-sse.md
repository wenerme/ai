---
description: Handle HTTP requests in onRequest() and stream responses with Server-Sent Events from a Durable Object with the Lifecycle.
title: HTTP and Server-Sent Events
image: https://developers.cloudflare.com/agents/runtime/routing/http-sse/og.png?v=6a7d7c17114b80c8
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# HTTP and Server-Sent Events

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/routing/http-sse/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Once a request reaches your Durable Object, the [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) offers it to your capabilities, then calls your `onRequest()`. Use it for an HTTP API, or to stream a response with Server-Sent Events (SSE).

## Handle HTTP requests

The object receives the full URL, so match on the end of the path:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class ApiAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/status")) {
			return Response.json({ name: this.lifecycle.name, status: "ok" });
		}

		if (url.pathname.endsWith("/action")) {
			if (request.method !== "POST") {
				return new Response("Method not allowed", { status: 405 });
			}
			const { action } = await request.json();
			await this.ctx.storage.put("lastAction", action);
			return Response.json({ success: true });
		}

		return new Response("Not found", { status: 404 });
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class ApiAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/status")) {
			return Response.json({ name: this.lifecycle.name, status: "ok" });
		}

		if (url.pathname.endsWith("/action")) {
			if (request.method !== "POST") {
				return new Response("Method not allowed", { status: 405 });
			}
			const { action } = await request.json<{ action: string }>();
			await this.ctx.storage.put("lastAction", action);
			return Response.json({ success: true });
		}

		return new Response("Not found", { status: 404 });
	}
}
```

Without `onRequest()`, a request that no capability handles returns `404`. To reach the object from your Worker, refer to [Routing](https://developers.cloudflare.com/agents/runtime/routing/).

## Stream a model reply

Return a streaming response from `onRequest()`. The AI SDK builds one for you:

```js
import { DurableObject } from "cloudflare:workers";
import { streamText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";

export class ChatAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const { prompt } = await request.json();
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt,
		});

		return result.toTextStreamResponse();
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { streamText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";

export class ChatAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const { prompt } = await request.json<{ prompt: string }>();
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt,
		});

		return result.toTextStreamResponse();
	}
}
```

To write SSE yourself, return a `ReadableStream` with the `text/event-stream` content type. Each event is one or more `field: value` lines followed by a blank line:

```txt
event: update
id: 42
data: {"count": 42}
```

## Resume a stream after a disconnect

A stream from `onRequest()` ends when the client disconnects, and the client loses what it missed. The [`Streams` capability](https://developers.cloudflare.com/agents/runtime/capabilities/streams/) stores each chunk, and `sseResponse()` serves a stored stream as SSE. A browser `EventSource` that reconnects sends `Last-Event-ID`, and the response continues from the next chunk:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Streams, sseResponse } from "agents/streams";

export class ReportAgent extends DurableObject {
	streams = new Streams();
	lifecycle = Lifecycle.install(this).use(this.streams);

	async onRequest(request) {
		const id = new URL(request.url).searchParams.get("id") ?? "report";
		return sseResponse(this.streams, id, { request });
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Streams, sseResponse } from "agents/streams";

export class ReportAgent extends DurableObject<Env> {
	readonly streams = new Streams();
	readonly lifecycle = Lifecycle.install(this).use(this.streams);

	async onRequest(request: Request): Promise<Response> {
		const id = new URL(request.url).searchParams.get("id") ?? "report";
		return sseResponse(this.streams, id, { request });
	}
}
```

`Streams` is experimental. For producing the chunks, refer to [Streams](https://developers.cloudflare.com/agents/runtime/capabilities/streams/).

## WebSockets or SSE

| Feature | WebSockets | SSE |
| --- | --- | --- |
| Direction | Both ways | Server to client |
| Protocol | `ws://` or `wss://` | HTTP |
| Binary data | Yes | No, text only |
| Reconnection | Handled by `useAgent` and `AgentClient` | Handled by the browser |
| Best for | Interactive apps, chat, callables | Streaming replies, notifications |

For WebSockets, install the [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/).

## On the Agent class

The [`Agent` class](https://developers.cloudflare.com/agents/agent-class/) calls the same `onRequest(request)` method, so these examples work on an `Agent` with `extends Agent<Env>` in place of the Lifecycle setup.

### [Streams](https://developers.cloudflare.com/agents/runtime/capabilities/streams/)

Store a reply as it is written, so clients can resume it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/routing/http-sse/#page","headline":"HTTP and Server-Sent Events","description":"Handle HTTP requests in onRequest() and stream responses with Server-Sent Events from a Durable Object with the Lifecycle.","url":"https://developers.cloudflare.com/agents/runtime/routing/http-sse/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/routing/http-sse/og.png?v=6a7d7c17114b80c8","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
