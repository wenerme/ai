---
description: Build a Cloudflare Agent that provisions an AI Search instance, indexes content, and searches it with a tool.
title: Agents SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Agents SDK

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/) lets you build stateful AI agents that run on Workers. This guide builds a chat agent that provisions its own AI Search instance, indexes a document, and then searches that content with a tool before it answers.

This guide uses the recommended agent pattern, exposing AI Search's `search()` to the model as a tool. For more on this pattern, refer to [AI Search as an agent tool](https://developers.cloudflare.com/agents/tools/ai-search/).

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `ai-search-agent` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- ai-search-agent
```

```
yarn create cloudflare ai-search-agent
```

```
pnpm create cloudflare@latest ai-search-agent
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd ai-search-agent
```

## 2\. Install the Agents SDK packages

Install the Agents SDK, the AI SDK, and the Workers AI provider:

npmyarnpnpmbun

```
npm i agents @cloudflare/ai-chat ai workers-ai-provider zod
```

```
yarn add agents @cloudflare/ai-chat ai workers-ai-provider zod
```

```
pnpm add agents @cloudflare/ai-chat ai workers-ai-provider zod
```

```
bun add agents @cloudflare/ai-chat ai workers-ai-provider zod
```

## 3\. Bind your Worker to AI Search

Replace your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the following. This adds a [namespace binding](https://developers.cloudflare.com/ai-search/concepts/namespaces/) for AI Search, a Workers AI binding for response generation, and the Durable Object that stores chat history for the agent.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "ai-search-agent",
  "main": "src/server.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-30",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "ai": {
    "binding": "AI"
  },
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "SearchAgent",
        "class_name": "SearchAgent"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": [
        "SearchAgent"
      ]
    }
  ]
}
```

```toml
name = "ai-search-agent"
main = "src/server.ts"
# Set this to today's date
compatibility_date = "2026-07-30"
compatibility_flags = ["nodejs_compat"]

[ai]
binding = "AI"

[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true

[[durable_objects.bindings]]
name = "SearchAgent"
class_name = "SearchAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["SearchAgent"]
```

The namespace binding (`ai_search_namespaces`), not the single-instance `ai_search` binding, is required because the agent calls `create()` at runtime. The `remote` option lets `wrangler dev` proxy requests to your deployed instance, since AI Search does not run locally. `AIChatAgent` persists messages to SQLite, so its class must be listed in `new_sqlite_classes`.

## 4\. Write the agent

Create `src/server.ts`. The agent provisions an AI Search instance with [hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) enabled the first time it runs, seeds it with a document, and exposes two tools: `search_knowledge_base` retrieves content, and `save_resolution` writes new content back.

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import { routeAgentRequest } from "agents";
import { createWorkersAI } from "workers-ai-provider";
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";

const INSTANCE_ID = "knowledge-base";

const SEED_DOC = `# Getting started
AI Search indexes your content so an agent can retrieve it at query time.`;

// AIChatAgent stores the conversation history and calls onChatMessage() once
// for each user message.
export class SearchAgent extends AIChatAgent {
	// Guard so the one-time instance setup runs only once per running agent.
	ready = false;

	// Create the agent's instance with hybrid search enabled, then seed it so
	// the first query has content. create() throws if the instance already
	// exists, so the try/catch makes this idempotent.
	async ensureInstance() {
		if (this.ready) return;
		try {
			// index_method with both vector and keyword enables hybrid search.
			await this.env.AI_SEARCH.create({
				id: INSTANCE_ID,
				index_method: { vector: true, keyword: true },
			});
			// upload() queues the file; indexing runs in the background. Poll the
			// item status until it is searchable so the first query has content.
			const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
			const { id } = await instance.items.upload(
				"getting-started.md",
				SEED_DOC,
			);
			let info = await instance.items.get(id).info();
			while (info.status === "queued" || info.status === "running") {
				await new Promise((resolve) => setTimeout(resolve, 2_000));
				info = await instance.items.get(id).info();
			}
		} catch {
			// Instance already exists.
		}
		this.ready = true;
	}

	// Runs on every chat message: make sure the instance exists, then stream a
	// tool-using response.
	async onChatMessage() {
		await this.ensureInstance();

		// The agent exposes AI Search's search() as a tool instead of using AI
		// Search's own chat model, so this model must support function calling to
		// decide when to search and drive the tool calls.
		const workersai = createWorkersAI({ binding: this.env.AI });

		const result = streamText({
			model: workersai("@cf/zai-org/glm-5.2"),
			system:
				"You are a support assistant. Use search_knowledge_base to find " +
				"relevant content before answering, and cite what you use.",
			// this.messages is the stored chat history; convert it to the format
			// the model expects.
			messages: await convertToModelMessages(this.messages),
			tools: {
				search_knowledge_base: tool({
					description: "Search the knowledge base for relevant content.",
					inputSchema: z.object({
						query: z.string().describe("The user's question or search terms"),
					}),
					// Hybrid search runs by default because the instance indexes
					// both vectors and keywords.
					execute: async ({ query }) => {
						const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
						return await instance.search({
							query,
							ai_search_options: { retrieval: { max_num_results: 5 } },
						});
					},
				}),
				save_resolution: tool({
					description:
						"Save a resolved answer to the knowledge base for reuse.",
					inputSchema: z.object({
						title: z.string().describe("Short descriptive title"),
						content: z.string().describe("The resolution to save"),
					}),
					// upload() returns as soon as the file is queued; indexing then
					// finishes in the background.
					execute: async ({ title, content }) => {
						const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
						const item = await instance.items.upload(`${title}.md`, content);
						return { key: item.key, status: item.status };
					},
				}),
			},
			// Cap the tool-call loop so the agent cannot run tools indefinitely.
			stopWhen: stepCountIs(5),
		});

		// Stream the reply, including any tool activity, back to the client.
		return result.toUIMessageStreamResponse();
	}
}

export default {
	async fetch(request, env) {
		// Route the request to the matching agent instance, keyed by the URL.
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { routeAgentRequest } from "agents";
import { createWorkersAI } from "workers-ai-provider";
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";

const INSTANCE_ID = "knowledge-base";

const SEED_DOC = `# Getting started
AI Search indexes your content so an agent can retrieve it at query time.`;

// AIChatAgent stores the conversation history and calls onChatMessage() once
// for each user message.
export class SearchAgent extends AIChatAgent {
	// Guard so the one-time instance setup runs only once per running agent.
	private ready = false;

	// Create the agent's instance with hybrid search enabled, then seed it so
	// the first query has content. create() throws if the instance already
	// exists, so the try/catch makes this idempotent.
	private async ensureInstance() {
		if (this.ready) return;
		try {
			// index_method with both vector and keyword enables hybrid search.
			await this.env.AI_SEARCH.create({
				id: INSTANCE_ID,
				index_method: { vector: true, keyword: true },
			});
			// upload() queues the file; indexing runs in the background. Poll the
			// item status until it is searchable so the first query has content.
			const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
			const { id } = await instance.items.upload(
				"getting-started.md",
				SEED_DOC,
			);
			let info = await instance.items.get(id).info();
			while (info.status === "queued" || info.status === "running") {
				await new Promise((resolve) => setTimeout(resolve, 2_000));
				info = await instance.items.get(id).info();
			}
		} catch {
			// Instance already exists.
		}
		this.ready = true;
	}

	// Runs on every chat message: make sure the instance exists, then stream a
	// tool-using response.
	async onChatMessage() {
		await this.ensureInstance();

		// The agent exposes AI Search's search() as a tool instead of using AI
		// Search's own chat model, so this model must support function calling to
		// decide when to search and drive the tool calls.
		const workersai = createWorkersAI({ binding: this.env.AI });

		const result = streamText({
			model: workersai("@cf/zai-org/glm-5.2"),
			system:
				"You are a support assistant. Use search_knowledge_base to find " +
				"relevant content before answering, and cite what you use.",
			// this.messages is the stored chat history; convert it to the format
			// the model expects.
			messages: await convertToModelMessages(this.messages),
			tools: {
				search_knowledge_base: tool({
					description: "Search the knowledge base for relevant content.",
					inputSchema: z.object({
						query: z.string().describe("The user's question or search terms"),
					}),
					// Hybrid search runs by default because the instance indexes
					// both vectors and keywords.
					execute: async ({ query }) => {
						const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
						return await instance.search({
							query,
							ai_search_options: { retrieval: { max_num_results: 5 } },
						});
					},
				}),
				save_resolution: tool({
					description:
						"Save a resolved answer to the knowledge base for reuse.",
					inputSchema: z.object({
						title: z.string().describe("Short descriptive title"),
						content: z.string().describe("The resolution to save"),
					}),
					// upload() returns as soon as the file is queued; indexing then
					// finishes in the background.
					execute: async ({ title, content }) => {
						const instance = this.env.AI_SEARCH.get(INSTANCE_ID);
						const item = await instance.items.upload(`${title}.md`, content);
						return { key: item.key, status: item.status };
					},
				}),
			},
			// Cap the tool-call loop so the agent cannot run tools indefinitely.
			stopWhen: stepCountIs(5),
		});

		// Stream the reply, including any tool activity, back to the client.
		return result.toUIMessageStreamResponse();
	}
}

export default {
	async fetch(request: Request, env: Env) {
		// Route the request to the matching agent instance, keyed by the URL.
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`this.env.AI_SEARCH.get(INSTANCE_ID)` is synchronous and resolves lazily. It does not create the instance, so `ensureInstance` creates it first. To search several instances in one call, use a namespace-level search with `ai_search_options.instance_ids`. Refer to [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/).

### How the tools work

The `search_knowledge_base` tool calls `search()` on the instance. Because the instance indexes both vectors and keywords, retrieval uses hybrid search by default.

The `save_resolution` tool calls `items.upload()`, which uploads a document to built-in storage and queues it for indexing. The call returns quickly, and the content becomes searchable once background indexing finishes. Uploading a file with the same name overwrites and re-indexes it.

## 5\. Test it locally

Generate types and start the development server:

```sh
npx wrangler types
npm run dev
```

`AIChatAgent` speaks its chat protocol over a WebSocket, so drive it from a chat client rather than a plain `curl` request. The quickest way is to point a UI built with the Agents SDK [useAgentChat](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) hook at your local server.

Send a message such as `How do I get started?`. On the first message, the agent creates and seeds the instance, so the first response can take a minute or two while the seed document indexes.

You know the integration works when:

* The `wrangler dev` logs show a request to `/agents/search-agent/<name>`, followed by the `search_knowledge_base` tool running before the reply.
* The agent's answer is grounded in the seeded content and cites it, rather than answering generically.

## 6\. Deploy

Log in with your Cloudflare account:

```sh
npx wrangler login
```

Deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler deploy
```

## Next steps

### [AI Search as an agent tool](https://developers.cloudflare.com/agents/tools/ai-search/)

The agent-side reference for retrieving content with AI Search.

### [Hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/)

Combine vector and keyword search with configurable fusion.

### [Per-tenant search](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

Give each tenant or agent its own isolated instance.

### [Instances Workers binding](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/)

Full reference for create, update, list, and delete.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/#page","headline":"Agents SDK · Cloudflare AI Search docs","description":"Build a Cloudflare Agent that provisions an AI Search instance, indexes content, and searches it with a tool.","url":"https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
