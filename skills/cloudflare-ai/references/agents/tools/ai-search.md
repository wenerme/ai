---
description: Give agents retrieval capabilities with Cloudflare AI Search.
title: AI Search
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Search

Last updated Jun 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/ai-search/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Agents can use [AI Search](https://developers.cloudflare.com/ai-search/) to retrieve relevant information from indexed content and use it to augment [calls to AI models](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/). AI Search manages the retrieval pipeline for you, including indexing, search, and optional chat completions over your content.

Use AI Search when you want an agent to:

* Search product docs, support content, user files, or internal knowledge bases.
* Retrieve relevant chunks before calling a model.
* Use managed indexing instead of building retrieval infrastructure yourself.
* Query content from an R2 bucket, website, or uploaded files.

## Basic pattern

Bind AI Search to your Worker, then query an instance from an agent method.

```js
import { Agent, callable } from "agents";

export class SearchAgent extends Agent {
	@callable()
	async searchKnowledge(query) {
		const instance = this.env.AI_SEARCH.get("my-instance");

		const results = await instance.search({
			messages: [{ role: "user", content: query }],
		});

		return results;
	}
}
```

```ts
import { Agent, callable } from "agents";

type Env = {
	AI_SEARCH: AiSearchNamespace;
};

export class SearchAgent extends Agent<Env> {
	@callable()
	async searchKnowledge(query: string) {
		const instance = this.env.AI_SEARCH.get("my-instance");

		const results = await instance.search({
			messages: [{ role: "user", content: query }],
		});

		return results;
	}
}
```

For answer generation, use `chatCompletions()` to retrieve relevant content and generate a response in one call.

```js
const instance = this.env.AI_SEARCH.get("my-instance");

const response = await instance.chatCompletions({
	messages: [{ role: "user", content: "How do I deploy an Agent?" }],
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	ai_search_options: {
		retrieval: {
			max_num_results: 5,
		},
	},
});
```

```ts
const instance = this.env.AI_SEARCH.get("my-instance");

const response = await instance.chatCompletions({
	messages: [{ role: "user", content: "How do I deploy an Agent?" }],
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	ai_search_options: {
		retrieval: {
			max_num_results: 5,
		},
	},
});
```

## Configuration

Use an `ai_search_namespaces` binding when the agent needs to access AI Search instances by name.

```jsonc
{
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

Use `remote: true` to query deployed AI Search instances during local development with `wrangler dev`.

## Related resources

### [AI Search](https://developers.cloudflare.com/ai-search/)

Create managed retrieval pipelines over websites, R2 buckets, and uploaded files.

### [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Query AI Search directly from Workers code.

### [Create an AI Search instance](https://developers.cloudflare.com/ai-search/get-started/)

Create your first AI Search instance and run your first query.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/ai-search/#page","headline":"AI Search · Cloudflare Agents docs","description":"Give agents retrieval capabilities with Cloudflare AI Search.","url":"https://developers.cloudflare.com/agents/tools/ai-search/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
