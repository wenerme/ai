---
description: Configure vector search in AI Search to find semantically similar content using embeddings.
title: Vector search
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Vector search

Last updated Jun 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Vector search converts your query into a vector embedding and finds chunks with similar meaning. It is enabled by default on all AI Search instances. For an overview of search modes, refer to [Search modes](https://developers.cloudflare.com/ai-search/concepts/search-modes/).

## Built-in vector index

AI Search instances include a built-in vector index powered by [Vectorize](https://developers.cloudflare.com/vectorize/). The vector index stores embeddings generated from your content and is created and maintained automatically. You do not need to create or manage a Vectorize index yourself.

## Embedding model

The [embedding model](https://developers.cloudflare.com/ai-search/configuration/models/) determines the vector dimensions for the vector index. The embedding model is set when creating an instance and cannot be changed after creation.

## Disable vector search

Vector search is the default index method for all instances. To switch to [keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/) only, set `index_method.vector` to `false`. At least one of `vector` or `keyword` must be `true`.

```ts
const instance = await env.AI_SEARCH.create({
	id: "my-instance",
	index_method: {
		vector: false,
		keyword: true,
	},
});
```

## Per-request overrides

You can force vector-only search on a per-request basis using `ai_search_options.retrieval.retrieval_type`, even if keyword search is also enabled on the instance.

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			retrieval_type: "vector",
		},
	},
});
```

## Scoring details

When using vector search, each chunk includes a `scoring_details` object:

| Field         | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| vector\_score | number | Vector similarity score (0 to 1). |
| vector\_rank  | number | Rank position in the result set.  |

## Limits

For vector index limits, refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/#page","headline":"Vector search · Cloudflare AI Search docs","description":"Configure vector search in AI Search to find semantically similar content using embeddings.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
