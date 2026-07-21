---
description: Control AI Search result count and minimum score thresholds for returned results.
title: Result controls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

#  Result controls

Last updated Jun 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

These settings control how many results are returned and the minimum score required. To filter results by metadata attributes like folder or category, refer to [Filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/).

## Match threshold

The `match_threshold` sets the minimum vector similarity score that a chunk must meet to be included in the results. Threshold values range from `0` to `1`. The threshold filters on the vector similarity score, not the fused score returned in the response.

* A higher threshold means stricter filtering, returning only highly similar matches.
* A lower threshold allows broader matches, increasing recall but possibly reducing precision.

## Maximum number of results

The `max_num_results` setting controls the number of top-matching chunks returned. The maximum allowed value is 50.

* Use a higher value if you want to synthesize across multiple documents. However, providing more input to the model can increase latency and cost.
* Use a lower value if you prefer concise answers with minimal context.

## How they work together

1. Your query is embedded using the configured embedding model.
2. The search index is queried. For [hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/), vector and keyword results are fused into a single ranked list.
3. Chunks with a vector similarity score below `match_threshold` are filtered out.
4. The filtered results are limited to `max_num_results` and passed into the generation step as context.

If no results meet the threshold, AI Search will not generate a response.

If [reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/) is enabled, a separate `reranking.match_threshold` can be configured to filter chunks by their reranking score.

## Per-request override

These values can be configured at the instance level or overridden per request:

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			match_threshold: 0.5,
			max_num_results: 10,
		},
	},
});
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/#page","headline":"Result controls · Cloudflare AI Search docs","description":"Control AI Search result count and minimum score thresholds for returned results.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
