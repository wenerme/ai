---
description: Enable BM25 keyword search in AI Search to match documents containing exact query terms.
title: Keyword search
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Keyword search

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Enable keyword search to match chunks that contain your query terms exactly. For an overview of search modes, refer to [Search modes](https://developers.cloudflare.com/ai-search/concepts/search-modes/).

## Enable keyword search

Set `index_method.keyword` to `true` when creating or updating an instance. You can use keyword search on its own or alongside vector search for [hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/).

| Field   | Type    | Default | Description                      |
| ------- | ------- | ------- | -------------------------------- |
| vector  | boolean | true    | Enable vector (semantic) search. |
| keyword | boolean | false   | Enable keyword (BM25) search.    |

At least one of `vector` or `keyword` must be `true`. Changing `index_method` triggers a full reindex of your content.

```ts
const instance = await env.AI_SEARCH.create({
	id: "my-instance",
	index_method: {
		vector: false,
		keyword: true,
	},
});
```

## Keyword tokenizer

The `keyword_tokenizer` field (inside `indexing_options`) controls how text is split into tokens. Changing this triggers a full reindex.

| Value   | Default | Description                                                                       |
| ------- | ------- | --------------------------------------------------------------------------------- |
| porter  | Yes     | Applies Porter stemming. "running" matches "run." Best for natural language.      |
| trigram | No      | Overlapping 3-character windows. "config" matches "configuration." Best for code. |

## Keyword match mode

The `keyword_match_mode` field (inside `retrieval_options`) controls how multiple query terms are combined.

| Value | Default | Description                                                   |
| ----- | ------- | ------------------------------------------------------------- |
| and   | Yes     | All query terms must appear. Higher precision, fewer results. |
| or    | No      | Any query term can match. Higher recall, more results.        |

You can override `keyword_match_mode` per request:

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			keyword_match_mode: "or",
		},
	},
});
```

## Limits

Instances with keyword search enabled support up to 500,000 files per instance on the Workers Paid tier, compared to 1,000,000 for vector-only instances. Refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/) for the full list of limits.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/#page","headline":"Keyword search · Cloudflare AI Search docs","description":"Enable BM25 keyword search in AI Search to match documents containing exact query terms.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
