---
description: Enable reranking in AI Search to reorder retrieved results by semantic relevance.
title: Reranking
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

#  Reranking

Last updated Jun 8, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Reranking can help improve the quality of AI Search results by reordering retrieved documents based on semantic relevance to the user's query. It applies a secondary model after retrieval to rerank the top results before they are returned.

## How it works

By default, reranking is **disabled** for all AI Search instances. You can enable it during creation or later from the settings page.

When enabled, AI Search will:

1. Retrieve a set of relevant results from your index, constrained by your `max_num_results` and `score_threshold` parameters.
2. Pass those results through a [reranking model](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/).
3. Return the reranked results, which the text generation model can use for answer generation.

Reranking helps improve accuracy, especially for large or noisy datasets where vector similarity alone may not produce the optimal ordering.

## Configuration

When you make a `/search` or `/chat/completions` request using the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) or [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/), you can enable or disable reranking per request and specify the reranking model.

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		reranking: {
			enabled: true,
			model: "@cf/baai/bge-reranker-base",
		},
	},
});
```

### Considerations

Adding reranking will include an additional step to the query request. As a result, there may be an increase in the latency of the request.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/#page","headline":"Reranking · Cloudflare AI Search docs","description":"Enable reranking in AI Search to reorder retrieved results by semantic relevance.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
