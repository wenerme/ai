---
description: Display source citations alongside AI-generated answers.
title: Show source citations in responses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Show source citations in responses

Last updated Jul 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/chunk-citations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[AI Search](https://developers.cloudflare.com/ai-search/) returns the source chunks it uses to generate an answer. Use those chunks to show citations, references, or source links in your application.

This guide shows how to build a [Cloudflare Worker](https://developers.cloudflare.com/workers/) that returns an AI-generated answer with the documents that informed it. Use this pattern when you want users to verify answers, inspect source material, or debug retrieval quality.

## What you will build

You will create a Worker endpoint that:

* Sends a user question to `chatCompletions()`
* Returns the generated answer with source identifiers, snippets, metadata, and relevance scores
* Groups repeated chunks into one citation per source document
* Handles citations for standard and streaming responses

## How citations work

AI Search retrieves source chunks before it generates an answer:

1. Finds matching chunks from your indexed documents.
2. Sends those chunks to the model as context.
3. Returns the answer and chunks in the response.

Each returned chunk contains an `item` object with `key` (filename or URL), `timestamp`, and any custom `metadata` you attached during indexing. For citations, `item.key` is usually the most useful field because it identifies the source document.

The `score` field indicates how relevant the chunk was to the query. The `chunks` array is also available in the `search()` response, and the same approach applies.

## 1\. Create a Worker

Create a Worker project for the citation examples:

npmyarnpnpm

```
npm create cloudflare@latest -- ai-search-citations
```

```
yarn create cloudflare ai-search-citations
```

```
pnpm create cloudflare@latest ai-search-citations
```

When prompted, choose **Hello World example**, **Worker only**, and **TypeScript**.

Move into the project directory:

```sh
cd ai-search-citations
```

## 2\. Configure the binding

Add an AI Search namespace binding to your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "ai-search-citations",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-22",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default"
    }
  ]
}
```

```toml
name = "ai-search-citations"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-22"

[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
```

This binding lets your Worker access AI Search instances in the `default` namespace. The examples use an instance named `my-instance`.

If you do not have an instance yet, create one and add content before you run the Worker. To create an instance with Wrangler, refer to [Wrangler commands](https://developers.cloudflare.com/ai-search/get-started/wrangler/).

## 3\. Display citations from chat completions

Start with the simplest citation pattern: return the generated answer and a list of source documents in the same JSON response.

Replace the contents of `src/index.ts` with the following Worker code:

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns an answer and the source chunks used as context.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		// Convert source chunks into citations your UI can display.
		const citations = response.chunks.map((chunk, index) => ({
			index: index + 1,
			source: chunk.item.key,
			score: chunk.score,
			snippet: chunk.text.slice(0, 200),
			metadata: chunk.item.metadata,
		}));

		return Response.json({ answer, citations });
	},
};
```

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns an answer and the source chunks used as context.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		// Convert source chunks into citations your UI can display.
		const citations = response.chunks.map((chunk, index) => ({
			index: index + 1,
			source: chunk.item.key,
			score: chunk.score,
			snippet: chunk.text.slice(0, 200),
			metadata: chunk.item.metadata,
		}));

		return Response.json({ answer, citations });
	},
} satisfies ExportedHandler<Env>;
```

The response looks like:

```json
{
	"answer": "Cloudflare is a global network that provides security, performance, and reliability services...",
	"citations": [
		{
			"index": 1,
			"source": "docs/what-is-cloudflare.md",
			"score": 0.92,
			"snippet": "Cloudflare is one of the world's largest networks. Today, businesses, non-profits, bloggers...",
			"metadata": {
				"folder": "docs"
			}
		},
		{
			"index": 2,
			"source": "blog/intro-to-cloudflare.md",
			"score": 0.85,
			"snippet": "Cloudflare provides a broad range of services to businesses of all sizes...",
			"metadata": {
				"folder": "blog"
			}
		}
	]
}
```

## 4\. Deduplicate citations by source

Multiple chunks can come from the same document. Group them by `item.key` to show one citation per source document.

To show one citation per source, update `src/index.ts` to group chunks by source document:

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns an answer and the source chunks used as context.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		// Group chunks by source document so each source appears once.
		const sourceMap = new Map();

		for (const chunk of response.chunks) {
			// item.key is the source file path or URL.
			const key = chunk.item.key;
			const existing = sourceMap.get(key);

			if (existing) {
				// Keep the highest relevance score for each source.
				existing.score = Math.max(existing.score, chunk.score);
				existing.snippets.push(chunk.text.slice(0, 200));
			} else {
				sourceMap.set(key, {
					score: chunk.score,
					snippets: [chunk.text.slice(0, 200)],
					metadata: chunk.item.metadata,
				});
			}
		}

		const citations = [...sourceMap.entries()].map(
			([source, { score, snippets, metadata }], i) => ({
				index: i + 1,
				source,
				score,
				snippets,
				metadata,
			}),
		);

		return Response.json({ answer, citations });
	},
};
```

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns an answer and the source chunks used as context.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		// Group chunks by source document so each source appears once.
		const sourceMap = new Map<
			string,
			{ score: number; snippets: string[]; metadata?: Record<string, unknown> }
		>();

		for (const chunk of response.chunks) {
			// item.key is the source file path or URL.
			const key = chunk.item.key;
			const existing = sourceMap.get(key);

			if (existing) {
				// Keep the highest relevance score for each source.
				existing.score = Math.max(existing.score, chunk.score);
				existing.snippets.push(chunk.text.slice(0, 200));
			} else {
				sourceMap.set(key, {
					score: chunk.score,
					snippets: [chunk.text.slice(0, 200)],
					metadata: chunk.item.metadata,
				});
			}
		}

		const citations = [...sourceMap.entries()].map(
			([source, { score, snippets, metadata }], i) => ({
				index: i + 1,
				source,
				score,
				snippets,
				metadata,
			}),
		);

		return Response.json({ answer, citations });
	},
} satisfies ExportedHandler<Env>;
```

## 5\. Parse citations from a streaming response

When using `stream: true`, the chunks are sent as a separate Server-Sent Events (SSE) event named `chunks` before the streamed answer begins. Parse this event to show citations before the full answer finishes streaming.

To show citations before the full answer finishes streaming, update `src/index.ts` to transform the stream:

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Stream answer tokens, but extract source chunks first.
		const stream = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
			stream: true,
		});

		// Transform the stream: extract the chunks event and forward the rest
		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		const reader = stream.getReader();

		// Track the current SSE event type to identify source chunks.
		let currentEvent = "";

		const pump = async () => {
			try {
				let buffer = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";

					for (const line of lines) {
						// The chunks event arrives before the streamed answer.
						if (line.startsWith("event: ")) {
							currentEvent = line.slice(7).trim();
							continue;
						}

						// Transform the chunks data line into a citations event for your UI.
						if (currentEvent === "chunks" && line.startsWith("data: ")) {
							const chunks = JSON.parse(line.slice(6));
							const citations = chunks.map((chunk) => ({
								source: chunk.item.key,
								score: chunk.score,
							}));
							await writer.write(
								encoder.encode(
									`event: citations\ndata: ${JSON.stringify(citations)}\n\n`,
								),
							);
							currentEvent = "";
							continue;
						}

						// Forward answer tokens and other SSE data unchanged.
						currentEvent = "";
						await writer.write(encoder.encode(line + "\n"));
					}
				}
			} finally {
				reader.releaseLock();
				await writer.close();
			}
		};

		pump().catch(() => writer.close());

		return new Response(readable, {
			headers: {
				"content-type": "text/event-stream",
				"cache-control": "no-cache",
			},
		});
	},
};
```

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Stream answer tokens, but extract source chunks first.
		const stream = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
			stream: true,
		});

		// Transform the stream: extract the chunks event and forward the rest
		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		const reader = stream.getReader();

		// Track the current SSE event type to identify source chunks.
		let currentEvent = "";

		const pump = async () => {
			try {
				let buffer = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";

					for (const line of lines) {
						// The chunks event arrives before the streamed answer.
						if (line.startsWith("event: ")) {
							currentEvent = line.slice(7).trim();
							continue;
						}

						// Transform the chunks data line into a citations event for your UI.
						if (currentEvent === "chunks" && line.startsWith("data: ")) {
							const chunks = JSON.parse(line.slice(6));
							const citations = chunks.map(
								(chunk: { item: { key: string }; score: number }) => ({
									source: chunk.item.key,
									score: chunk.score,
								}),
							);
							await writer.write(
								encoder.encode(
									`event: citations\ndata: ${JSON.stringify(citations)}\n\n`,
								),
							);
							currentEvent = "";
							continue;
						}

						// Forward answer tokens and other SSE data unchanged.
						currentEvent = "";
						await writer.write(encoder.encode(line + "\n"));
					}
				}
			} finally {
				reader.releaseLock();
				await writer.close();
			}
		};

		pump().catch(() => writer.close());

		return new Response(readable, {
			headers: {
				"content-type": "text/event-stream",
				"cache-control": "no-cache",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

## 6\. Use scoring details to rank citations

Each chunk includes a `scoring_details` object with a breakdown of how it was scored. Use these details to filter out low-quality citations or display confidence indicators.

To filter citations by relevance, update `src/index.ts` to use score fields:

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns scoring details with each source chunk.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		const citations = response.chunks
			// Filter out lower-scoring chunks for stronger citations.
			.filter((chunk) => chunk.score > 0.5)
			// Expose scoring details if your UI shows confidence indicators.
			.map((chunk, index) => ({
				index: index + 1,
				source: chunk.item.key,
				score: chunk.score,
				vectorScore: chunk.scoring_details?.vector_score,
				keywordScore: chunk.scoring_details?.keyword_score,
				rerankingScore: chunk.scoring_details?.reranking_score,
				confidence: chunk.score > 0.8 ? "high" : "medium",
				snippet: chunk.text.slice(0, 200),
			}));

		return Response.json({ answer, citations });
	},
};
```

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns scoring details with each source chunk.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		const citations = response.chunks
			// Filter out lower-scoring chunks for stronger citations.
			.filter((chunk) => chunk.score > 0.5)
			// Expose scoring details if your UI shows confidence indicators.
			.map((chunk, index) => ({
				index: index + 1,
				source: chunk.item.key,
				score: chunk.score,
				vectorScore: chunk.scoring_details?.vector_score,
				keywordScore: chunk.scoring_details?.keyword_score,
				rerankingScore: chunk.scoring_details?.reranking_score,
				confidence: chunk.score > 0.8 ? "high" : "medium",
				snippet: chunk.text.slice(0, 200),
			}));

		return Response.json({ answer, citations });
	},
} satisfies ExportedHandler<Env>;
```

## Use citation fields

Each chunk in the `chunks` array can include the following fields:

| Field                             | Type   | Description                                                               |
| --------------------------------- | ------ | ------------------------------------------------------------------------- |
| id                                | string | Unique identifier for the chunk.                                          |
| type                              | string | Content type, typically text.                                             |
| score                             | number | Overall relevance score between 0 and 1.                                  |
| text                              | string | The text content of the chunk.                                            |
| item.key                          | string | The file path or URL of the source document.                              |
| item.timestamp                    | number | Unix timestamp of when the item was last indexed.                         |
| item.metadata                     | object | Custom metadata associated with the source item.                          |
| scoring\_details.vector\_score    | number | Semantic similarity score (0 to 1).                                       |
| scoring\_details.keyword\_score   | number | BM25 keyword match score. Present when using hybrid or keyword retrieval. |
| scoring\_details.keyword\_rank    | number | Keyword rank position.                                                    |
| scoring\_details.vector\_rank     | number | Vector rank position.                                                     |
| scoring\_details.reranking\_score | number | Reranking score (0 to 1). Present when reranking is enabled.              |
| scoring\_details.fusion\_method   | string | Fusion method used (rrf or max). Present when using hybrid retrieval.     |

For multi-instance searches, each chunk also includes an `instance_id` field identifying which instance it came from. To search or chat across multiple instances, refer to [namespace methods](https://developers.cloudflare.com/ai-search/api/search/workers-binding/#namespace-methods).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/chunk-citations/#page","headline":"Show source citations in responses · Cloudflare AI Search docs","description":"Display source citations alongside AI-generated answers.","url":"https://developers.cloudflare.com/ai-search/how-to/chunk-citations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
