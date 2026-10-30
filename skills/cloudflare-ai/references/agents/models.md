---
description: Call Workers AI, AI Gateway catalog models, dynamic routes, and vendor models from the AI SDK or Pi AI with one createAI provider over the AI binding or an account id and API token.
title: Models
image: https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/models/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Agents SDK includes model providers for [Workers AI](https://developers.cloudflare.com/workers-ai/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Each provider is one `createAI` factory over the Worker's `AI` binding, or an account id and API token. There are two, one per framework:

| Import | Framework | Use it with |
| --- | --- | --- |
| `agents/models/ai-sdk` | [AI SDK ↗︎](https://ai-sdk.dev/) v7 | `generateText`, `streamText`, Think, and any AI SDK consumer |
| `agents/models/pi-ai` | [Pi AI ↗︎](https://github.com/earendil-works/pi/tree/main/packages/ai) | The [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/), and Pi AI's `stream` |

Both take the same options, route through the same gateway, and handle Workers AI the same way. The [OpenCode harness](https://developers.cloudflare.com/agents/harnesses/opencode/) has a third, `agents/models/opencode`, built on the AI SDK provider.

## How a model is chosen

Name a model with a string, or pass a model object built by the vendor's own package:

```ts
ai("@cf/zai-org/glm-5.3-flash"); // Workers AI
ai("anthropic/claude-opus-5.5"); // AI Gateway catalog
ai("dynamic/support"); // AI Gateway dynamic route
ai(anthropic("claude-opus-5-5")); // the vendor's own model object
```

- **A Workers AI model** is a `@cf/` id. It runs through `env.AI.run()`. A compatibility layer turns each model's response into the standard OpenAI chat completions shape.
- **An AI Gateway catalog model** is an `<author>/<model>` id from the [model catalog](https://developers.cloudflare.com/ai/models/), such as `anthropic/claude-opus-5.5` or `openai/gpt-5.5`. It also runs through `env.AI.run()`, which sends it to AI Gateway. The gateway picks a provider and bills the call. Use the catalog's spelling, not the vendor's: `anthropic/claude-opus-5.5`, not `claude-opus-5-5`.
- **A [dynamic route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)** is `dynamic/<route>`. The route you configured on the gateway picks the model.
- **A model object** comes from the vendor's provider package, such as `anthropic("claude-opus-5-5")`. The vendor's code builds the request and parses the response. The provider sends that request unchanged through the binding to AI Gateway's [provider-native endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/) for that vendor.

The providers do not use the deprecated [Universal Endpoint](https://developers.cloudflare.com/ai-gateway/usage/universal/).

## What every model gets

- **No vendor keys.** AI Gateway holds third-party credentials, through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a key you [store on the gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/). Unified Billing requires [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) on the gateway.
- **Gateway options.** Caching, logging, metadata, timeouts, retries, and BYOK key aliases are options on the provider, the model, or the call. The `default` gateway is created the first time you use it.
- **Fallback.** List models to try in order if the first fails before it produces output. Mix Workers AI ids, catalog ids, dynamic routes, and model objects.
- **Stream resume.** Through the binding, a stream from a catalog model or a dynamic route resumes after a dropped connection. You do not need to configure anything.
- **Gateway metadata on every result.** Each response carries the gateway log id, cache status, run id, and the model that actually answered.

`createAI` from `agents/models/ai-sdk` replaces `workers-ai-provider` and `ai-gateway-provider`. For AI Search, use `ai-search-provider`.

## Connect to Cloudflare

Inside a Worker, pass the `AI` binding, `createAI({ binding: env.AI })`, and add it to your Wrangler configuration:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
}
```

```toml
[ai]
binding = "AI"
```

To use a gateway in another account, or to call from outside a Worker, pass an account id and API token instead. [Create the token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Workers AI Read** and **AI Gateway Run**:

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

## Call models from a Durable Object

An agent is a [Durable Object](https://developers.cloudflare.com/durable-objects/) with the Agents SDK [Lifecycle ↗︎](https://github.com/cloudflare/agents/blob/main/docs/agents/lifecycle.md) installed. `Lifecycle.install(this)` installs the platform `fetch`, `alarm`, and WebSocket handlers, and calls your `onStart()`, `onRequest()`, and `onAlarm()` callbacks instead. You can call models from any of these callbacks, from a [WebSocket handler](#stream-over-websockets), or from your own RPC methods.

A Durable Object can call models on its own, without a client waiting, and can handle responses that take minutes (or longer) to finish.

To reach the Durable Object from your Worker, route requests with `routeAgentRequest()`. The default URL shape is `/agents/:binding/:name`:

*src/index.jsjs*

```js
import { routeAgentRequest } from "agents";

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
import { routeAgentRequest } from "agents";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

The examples on this page show only the Durable Object class. To add the Durable Object binding to your Wrangler configuration, refer to [Get started with Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/).

### Generate text with the AI SDK

npmyarnpnpmbun

```
npm i agents ai @ai-sdk/provider
```

```
yarn add agents ai @ai-sdk/provider
```

```
pnpm add agents ai @ai-sdk/provider
```

```
bun add agents ai @ai-sdk/provider
```

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { generateText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const ai = createAI({ binding: this.env.AI });
		const { text } = await generateText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt: "Build me an AI agent on Cloudflare Workers",
		});

		return Response.json({ modelResponse: text });
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { generateText } from "ai";
import { createAI } from "agents/models/ai-sdk";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const ai = createAI({ binding: this.env.AI });
		const { text } = await generateText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt: "Build me an AI agent on Cloudflare Workers",
		});

		return Response.json({ modelResponse: text });
	}
}
```

To use a different model, change the string, such as `ai("openai/gpt-5.5")` or `ai("@cf/zai-org/glm-5.3-flash")`, or pass the vendor's own model object, such as `ai(openai("gpt-5.5"))`. All of these route through AI Gateway, so you do not need a vendor API key in your Worker.

You can also use any other AI SDK provider directly, without `createAI`. The call then goes straight to the vendor, with your own API key, and skips AI Gateway:

npmyarnpnpmbun

```
npm i ai @ai-sdk/openai
```

```
yarn add ai @ai-sdk/openai
```

```
pnpm add ai @ai-sdk/openai
```

```
bun add ai @ai-sdk/openai
```

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });
		const { text } = await generateText({
			model: openai("gpt-5.5"),
			prompt: "Build me an AI agent on Cloudflare Workers",
		});

		return Response.json({ modelResponse: text });
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

interface Env {
	OPENAI_API_KEY: string;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });
		const { text } = await generateText({
			model: openai("gpt-5.5"),
			prompt: "Build me an AI agent on Cloudflare Workers",
		});

		return Response.json({ modelResponse: text });
	}
}
```

### Stream over WebSockets

Reasoning models can take some time to both generate a response *and* stream it back to the client. Instead of buffering the entire response, stream it back over a WebSocket. Install the `WebSockets` capability to accept upgrades and handle messages. Without it, the Lifecycle declines WebSocket upgrades:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { WebSockets } from "agents/websockets";
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends DurableObject {
	webSockets = new WebSockets({
		handlers: {
			onMessage: (connection, message) => this.reply(connection, message),
		},
	});

	lifecycle = Lifecycle.install(this).use(this.webSockets);

	async reply(connection, message) {
		const { prompt } = JSON.parse(message);

		try {
			const ai = createAI({ binding: this.env.AI });
			const result = streamText({
				model: ai("anthropic/claude-opus-5.5"),
				prompt,
			});

			for await (const chunk of result.textStream) {
				if (chunk) {
					connection.send(JSON.stringify({ type: "chunk", content: chunk }));
				}
			}

			connection.send(JSON.stringify({ type: "done" }));
		} catch (error) {
			connection.send(JSON.stringify({ type: "error", error: String(error) }));
		}
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, type Connection } from "agents/lifecycle";
import { WebSockets, type WebSocketMessage } from "agents/websockets";
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly webSockets = new WebSockets({
		handlers: {
			onMessage: (connection, message) => this.reply(connection, message),
		},
	});

	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);

	async reply(connection: Connection, message: WebSocketMessage) {
		const { prompt } = JSON.parse(message as string);

		try {
			const ai = createAI({ binding: this.env.AI });
			const result = streamText({
				model: ai("anthropic/claude-opus-5.5"),
				prompt,
			});

			for await (const chunk of result.textStream) {
				if (chunk) {
					connection.send(JSON.stringify({ type: "chunk", content: chunk }));
				}
			}

			connection.send(JSON.stringify({ type: "done" }));
		} catch (error) {
			connection.send(JSON.stringify({ type: "error", error: String(error) }));
		}
	}
}
```

To survive a dropped connection, save each response with the [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) on `this.ctx.storage`. When the client reconnects, read the message history back and send it.

## Call the AI binding directly

You do not need a provider to call a model. You can call `env.AI.run()` with any of the [Workers AI models](https://developers.cloudflare.com/workers-ai/models/). No API keys are required. Refer to [Workers AI bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/) for the full binding API.

Set `stream: true` to avoid buffering and delaying responses, especially for larger models or reasoning models:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const stream = await this.env.AI.run("@cf/zai-org/glm-5.3-flash", {
			messages: [
				{
					role: "user",
					content: "Build me a Cloudflare Worker that returns JSON.",
				},
			],
			stream: true,
		});

		return new Response(stream, {
			headers: { "content-type": "text/event-stream" },
		});
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const stream = await this.env.AI.run("@cf/zai-org/glm-5.3-flash", {
			messages: [
				{
					role: "user",
					content: "Build me a Cloudflare Worker that returns JSON.",
				},
			],
			stream: true,
		});

		return new Response(stream, {
			headers: { "content-type": "text/event-stream" },
		});
	}
}
```

To send the call through [AI Gateway](https://developers.cloudflare.com/ai-gateway/), pass a [`gateway` option](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/). The gateway can then cache responses and route requests across providers based on availability, rate limits, or cost budgets:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const response = await this.env.AI.run(
			"@cf/zai-org/glm-5.3-flash",
			{
				messages: [
					{
						role: "user",
						content: "Build me a Cloudflare Worker that returns JSON.",
					},
				],
			},
			{
				gateway: {
					id: "{gateway_id}",
					skipCache: false,
					cacheTtl: 3360,
				},
			},
		);

		return Response.json(response);
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const response = await this.env.AI.run(
			"@cf/zai-org/glm-5.3-flash",
			{
				messages: [
					{
						role: "user",
						content: "Build me a Cloudflare Worker that returns JSON.",
					},
				],
			},
			{
				gateway: {
					id: "{gateway_id}",
					skipCache: false,
					cacheTtl: 3360,
				},
			},
		);

		return Response.json(response);
	}
}
```

The same `ai` binding serves both Workers AI and AI Gateway. Refer to the [AI Gateway documentation](https://developers.cloudflare.com/ai-gateway/) to configure a gateway and find its ID.

## OpenAI-compatible endpoints

You can call models on any service that supports the OpenAI API. For example, use the OpenAI SDK to call one of [Google's Gemini models ↗︎](https://ai.google.dev/gemini-api/docs/openai#node.js). These calls go straight to the vendor with your own API key.

Stream the response back over HTTP with Server-Sent Events (SSE) from `fetch`, or over a [WebSocket](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { OpenAI } from "openai";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const client = new OpenAI({
			apiKey: this.env.GEMINI_API_KEY,
			baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
		});

		const stream = await client.chat.completions.create({
			model: "gemini-3.5-flash",
			messages: [{ role: "user", content: "Write me a Cloudflare Worker." }],
			stream: true,
		});

		const encoder = new TextEncoder();
		const body = new ReadableStream({
			async start(controller) {
				for await (const part of stream) {
					controller.enqueue(
						encoder.encode(part.choices[0]?.delta?.content ?? ""),
					);
				}
				controller.close();
			},
		});

		return new Response(body);
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { OpenAI } from "openai";

interface Env {
	GEMINI_API_KEY: string;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const client = new OpenAI({
			apiKey: this.env.GEMINI_API_KEY,
			baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
		});

		const stream = await client.chat.completions.create({
			model: "gemini-3.5-flash",
			messages: [{ role: "user", content: "Write me a Cloudflare Worker." }],
			stream: true,
		});

		const encoder = new TextEncoder();
		const body = new ReadableStream({
			async start(controller) {
				for await (const part of stream) {
					controller.enqueue(
						encoder.encode(part.choices[0]?.delta?.content ?? ""),
					);
				}
				controller.close();
			},
		});

		return new Response(body);
	}
}
```

## Choose a provider

### [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/)

A full AI SDK ProviderV4 for text, tools, structured output, embeddings, images, speech, transcription, and reranking.

### [Pi AI](https://developers.cloudflare.com/agents/models/pi-ai/)

Pi AI models for the Pi harness, Pi Durable, and any framework built on a Pi AI Models registry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/models/#page","headline":"Models","description":"Call Workers AI, AI Gateway catalog models, dynamic routes, and vendor models from the AI SDK or Pi AI with one createAI provider over the AI binding or an account id and API token.","url":"https://developers.cloudflare.com/agents/models/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
