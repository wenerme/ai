---
description: Use AI Search from the Vercel AI SDK to create an instance, index content, and generate grounded responses in a TypeScript project.
title: AI SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# AI SDK

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/agent-sdks/ai-sdk/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [Vercel AI SDK ↗](https://sdk.vercel.ai/) is a TypeScript toolkit for building applications with large language models. The [ai-search-provider ↗](https://www.npmjs.com/package/ai-search-provider) package connects AI Search to the AI SDK, so you can generate responses grounded in your indexed content, retrieve chunks, and manage documents from the same API.

This guide builds a Worker that creates an AI Search instance, uploads and indexes a document, and then queries it with the AI SDK.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `ai-search-ai-sdk` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- ai-search-ai-sdk
```

```
yarn create cloudflare ai-search-ai-sdk
```

```
pnpm create cloudflare@latest ai-search-ai-sdk
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd ai-search-ai-sdk
```

## 2\. Install the AI SDK and provider

Install the AI SDK and the AI Search provider. The provider requires AI SDK v6 (`ai@^6`):

npmyarnpnpmbun

```
npm i ai ai-search-provider
```

```
yarn add ai ai-search-provider
```

```
pnpm add ai ai-search-provider
```

```
bun add ai ai-search-provider
```

## 3\. Bind your Worker to AI Search

Create a binding between your Worker and AI Search. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Worker to interact with resources on the Cloudflare Developer Platform.

Add the following to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

This binds the `default` [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) to `env.AI_SEARCH`. The `remote` option lets `wrangler dev` proxy requests to your deployed instance, since AI Search does not run locally. The `ai_search_namespaces` binding requires a `compatibility_date` of `2026-03-27` or later, which new C3 projects already satisfy.

## 4\. Create an instance and index content

Add a `/setup` route that creates an instance and uploads a document. Enable [hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) at creation by setting `index_method` to index both vectors and keywords.

The `create()` method is on the namespace binding (`env.AI_SEARCH`), not on the provider client. Creating an instance that already exists throws, so the following code creates it and, on the next run, updates it instead.

```js
import { createAISearchNamespace } from "ai-search-provider";
import { generateText, streamText } from "ai";

const INSTANCE_NAME = "knowledge-base";

const SAMPLE_DOC = `# Caching on Cloudflare
Cloudflare caches static assets at the edge. Use Cache Rules to control what is
cached, set an Edge Cache TTL to control how long objects stay in cache, and
purge the cache after a deploy.`;

// Create the instance with hybrid search, or update it if it already exists.
async function ensureInstance(env) {
	// index_method with both vector and keyword enables hybrid search.
	const hybrid = { index_method: { vector: true, keyword: true } };
	try {
		await env.AI_SEARCH.create({ id: INSTANCE_NAME, ...hybrid });
	} catch {
		await env.AI_SEARCH.get(INSTANCE_NAME).update(hybrid);
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		// createAISearchNamespace adapts the binding to the AI SDK provider API.
		const aiSearch = createAISearchNamespace({ binding: env.AI_SEARCH });

		// Visit /setup once to create the instance and index a document.
		if (url.pathname === "/setup") {
			await ensureInstance(env);

			const instance = aiSearch.get(INSTANCE_NAME);

			// upload() queues the file and returns immediately. Indexing runs in
			// the background, so poll the item's status until it is searchable.
			const { id, key } = await instance.items.upload("caching.md", SAMPLE_DOC);

			let info = await instance.items.get(id).info();
			while (info.status === "queued" || info.status === "running") {
				await new Promise((resolve) => setTimeout(resolve, 2_000));
				info = await instance.items.get(id).info();
			}

			return Response.json({ key, status: info.status });
		}

		// Query the instance (see the next step).
		return new Response("Visit /setup first, then query with ?q=");
	},
};
```

```ts
import { createAISearchNamespace } from "ai-search-provider";
import { generateText, streamText } from "ai";

interface Env {
	AI_SEARCH: AiSearchNamespace;
}

const INSTANCE_NAME = "knowledge-base";

const SAMPLE_DOC = `# Caching on Cloudflare
Cloudflare caches static assets at the edge. Use Cache Rules to control what is
cached, set an Edge Cache TTL to control how long objects stay in cache, and
purge the cache after a deploy.`;

// Create the instance with hybrid search, or update it if it already exists.
async function ensureInstance(env: Env) {
	// index_method with both vector and keyword enables hybrid search.
	const hybrid = { index_method: { vector: true, keyword: true } };
	try {
		await env.AI_SEARCH.create({ id: INSTANCE_NAME, ...hybrid });
	} catch {
		await env.AI_SEARCH.get(INSTANCE_NAME).update(hybrid);
	}
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		// createAISearchNamespace adapts the binding to the AI SDK provider API.
		const aiSearch = createAISearchNamespace({ binding: env.AI_SEARCH });

		// Visit /setup once to create the instance and index a document.
		if (url.pathname === "/setup") {
			await ensureInstance(env);

			const instance = aiSearch.get(INSTANCE_NAME);

			// upload() queues the file and returns immediately. Indexing runs in
			// the background, so poll the item's status until it is searchable.
			const { id, key } = await instance.items.upload("caching.md", SAMPLE_DOC);

			let info = await instance.items.get(id).info();
			while (info.status === "queued" || info.status === "running") {
				await new Promise((resolve) => setTimeout(resolve, 2_000));
				info = await instance.items.get(id).info();
			}

			return Response.json({ key, status: info.status });
		}

		// Query the instance (see the next step).
		return new Response("Visit /setup first, then query with ?q=");
	},
} satisfies ExportedHandler<Env>;
```

`AiSearchNamespace` is an ambient type available after you run `wrangler types`.

## 5\. Query your instance

There are three ways to query your instance from the AI SDK. Pick the one that fits your application:

* [Generate a response](#generate-a-response) returns the complete answer in one call.
* [Stream a response](#stream-a-response) sends tokens as they are generated, which suits long answers and chat interfaces.
* [Search as a tool](#search-as-a-tool) lets the model decide when to search, which is what you want in an agent.

### Generate a response

Pass `instance.chat()` to `generateText`, and AI Search retrieves relevant content and generates a response in one call.

Replace the query placeholder in your `fetch` handler with the following:

```js
const query = url.searchParams.get("q") ?? "How does caching work?";

// chat() returns an AI SDK model that retrieves matching chunks and generates
// a grounded answer in one call, so there is no separate search step.
const { text, sources } = await generateText({
	model: aiSearch.get(INSTANCE_NAME).chat({
		ai_search_options: {
			// "hybrid" ranks results from both the vector and keyword indexes.
			retrieval: { retrieval_type: "hybrid", max_num_results: 5 },
		},
	}),
	messages: [{ role: "user", content: query }],
});

// `sources` holds the retrieved chunks, so you can cite them alongside `text`.
return Response.json({ text, sources });
```

```ts
const query = url.searchParams.get("q") ?? "How does caching work?";

// chat() returns an AI SDK model that retrieves matching chunks and generates
// a grounded answer in one call, so there is no separate search step.
const { text, sources } = await generateText({
	model: aiSearch.get(INSTANCE_NAME).chat({
		ai_search_options: {
			// "hybrid" ranks results from both the vector and keyword indexes.
			retrieval: { retrieval_type: "hybrid", max_num_results: 5 },
		},
	}),
	messages: [{ role: "user", content: query }],
});

// `sources` holds the retrieved chunks, so you can cite them alongside `text`.
return Response.json({ text, sources });
```

AI Search returns the retrieved chunks as AI SDK source parts in `sources`, so you can cite them alongside the generated text. Because the instance indexes both vectors and keywords, `retrieval_type: "hybrid"` uses both.

### Stream a response

For longer responses, use `streamText` instead of `generateText`. AI Search emits the retrieved chunks as source parts before the first text part.

```js
// streamText returns right away; tokens stream in as they are generated.
const result = streamText({
	model: aiSearch.get(INSTANCE_NAME).chat(),
	messages: [{ role: "user", content: query }],
});

// toTextStreamResponse() streams the generated text only.
return result.toTextStreamResponse();
```

```ts
// streamText returns right away; tokens stream in as they are generated.
const result = streamText({
	model: aiSearch.get(INSTANCE_NAME).chat(),
	messages: [{ role: "user", content: query }],
});

// toTextStreamResponse() streams the generated text only.
return result.toTextStreamResponse();
```

`toTextStreamResponse()` sends the generated text and drops the sources. To stream the retrieved chunks as well, return a UI message stream with `sendSources` enabled, or read `result.fullStream` directly:

```js
// sendSources forwards each retrieved chunk as a source-url part. They arrive
// before the first text part, so you can render citations as the answer streams.
return result.toUIMessageStreamResponse({ sendSources: true });
```

```ts
// sendSources forwards each retrieved chunk as a source-url part. They arrive
// before the first text part, so you can render citations as the answer streams.
return result.toUIMessageStreamResponse({ sendSources: true });
```

### Search as a tool

With `chat()`, AI Search searches your instance on every request. To let the model decide when to search instead, expose `instance.search()` as an AI SDK [tool ↗](https://sdk.vercel.ai/docs/foundations/tools) and pass it to a model that supports function calling, such as a [Workers AI](https://developers.cloudflare.com/workers-ai/) model. This is the pattern to use in an agent, where the model chooses between searching and other tools.

Install the Workers AI provider and Zod. Use version 3 of `workers-ai-provider`: the latest version 4 requires AI SDK v7, but `ai-search-provider` requires v6, so npm fails to install them together.

npmyarnpnpmbun

```
npm i workers-ai-provider@^3 zod
```

```
yarn add workers-ai-provider@^3 zod
```

```
pnpm add workers-ai-provider@^3 zod
```

```
bun add workers-ai-provider@^3 zod
```

Add a Workers AI binding to your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai": {
    "binding": "AI"
  }
}
```

```toml
[ai]
binding = "AI"
```

Then define a search tool. The model calls it when it needs to retrieve content:

```js
import { createWorkersAI } from "workers-ai-provider";
import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";

const instance = aiSearch.get(INSTANCE_NAME);
// The tool-caller must support function calling. Use a dedicated model here
// rather than the AI Search chat model, which retrieves on every request.
const workersai = createWorkersAI({ binding: env.AI });

const { text } = await generateText({
	model: workersai("@cf/zai-org/glm-5.2"),
	messages: [{ role: "user", content: query }],
	tools: {
		search_knowledge_base: tool({
			description: "Search the indexed knowledge base for relevant content.",
			inputSchema: z.object({
				query: z.string().describe("The search query"),
			}),
			// The model decides when to call this; it searches the instance.
			execute: async ({ query }) =>
				instance.search({
					query,
					ai_search_options: { retrieval: { max_num_results: 5 } },
				}),
		}),
	},
	// Cap the tool-call loop so the model cannot invoke tools indefinitely.
	stopWhen: stepCountIs(5),
});
```

```ts
import { createWorkersAI } from "workers-ai-provider";
import { generateText, tool, stepCountIs } from "ai";
import { z } from "zod";

const instance = aiSearch.get(INSTANCE_NAME);
// The tool-caller must support function calling. Use a dedicated model here
// rather than the AI Search chat model, which retrieves on every request.
const workersai = createWorkersAI({ binding: env.AI });

const { text } = await generateText({
	model: workersai("@cf/zai-org/glm-5.2"),
	messages: [{ role: "user", content: query }],
	tools: {
		search_knowledge_base: tool({
			description: "Search the indexed knowledge base for relevant content.",
			inputSchema: z.object({
				query: z.string().describe("The search query"),
			}),
			// The model decides when to call this; it searches the instance.
			execute: async ({ query }) =>
				instance.search({
					query,
					ai_search_options: { retrieval: { max_num_results: 5 } },
				}),
		}),
	},
	// Cap the tool-call loop so the model cannot invoke tools indefinitely.
	stopWhen: stepCountIs(5),
});
```

## 6\. Test it locally

Before you deploy, confirm the whole flow works against your instance with `wrangler dev`, which proxies the remote AI Search binding. The output below is from the [generate a response](#generate-a-response) option.

Start a local development server:

```sh
npx wrangler dev
```

First, index the sample document by visiting `/setup`:

```sh
curl http://localhost:8787/setup
```

The first `/setup` can take a minute or two while the document indexes. When it finishes, you get back the item key and a `completed` status:

```json
{ "key": "caching.md", "status": "completed" }
```

Then query the instance:

```sh
curl "http://localhost:8787/?q=How+does+caching+work%3F"
```

A working integration returns generated `text` grounded in your document, along with a `sources` array referencing the file it retrieved (fields trimmed):

```json
{
	"text": "Cloudflare caches static assets at the edge...",
	"sources": [{ "sourceType": "url", "url": "caching.md" }]
}
```

If `sources` comes back empty, the document has not finished indexing yet. Run `/setup` again, then retry the query.

## 7\. Deploy

Log in with your Cloudflare account:

```sh
npx wrangler login
```

Deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler deploy
```

## Considerations

* The chat model is text-only. File and image message parts are not supported.
* Generation options such as `temperature` and `maxOutputTokens` are passed through to the instance's generation model. `maxOutputTokens` truncates the response and sets `finishReason` to `"length"`. If a model ignores an option, the result's `warnings` array stays empty, so an unsupported option fails silently.
* AI Search uses the generation model configured on the instance by default. Pass `instance.chat({ model: "..." })` to override it per request.

## Next steps

### [Hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/)

Combine vector and keyword search with configurable fusion.

### [Instances Workers binding](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/)

Full reference for create, update, list, and delete.

### [Search Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Full reference for searching and chatting from a Worker.

### [Agents SDK](https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/)

Build a stateful chat agent that searches your instance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/agent-sdks/ai-sdk/#page","headline":"AI SDK · Cloudflare AI Search docs","description":"Use AI Search from the Vercel AI SDK to create an instance, index content, and generate grounded responses in a TypeScript project.","url":"https://developers.cloudflare.com/ai-search/agent-sdks/ai-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
