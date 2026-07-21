---
description: Compare AI Search vector, keyword, and hybrid search modes to choose the right retrieval strategy.
title: Search modes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

#  Search modes

Last updated Apr 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-search/concepts/search-modes/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

AI Search supports three search modes: vector, keyword, and hybrid. By default, new instances use vector search only. You can enable keyword or hybrid search when creating or updating an instance.

## Vector search

Vector search converts your query into a vector embedding and finds chunks with similar meaning, even when the exact words differ. It knows that "deployment guide" and "how to ship my app" mean similar things. However, it can lose specifics. In a query like "ERR\_CONNECTION\_REFUSED timeout," vector search captures the broad concept of connection failures but might not surface the page that contains that exact error string.

## Keyword search

Keyword search matches chunks that contain your query terms exactly using BM25 full-text search. When you search "ERR\_CONNECTION\_REFUSED timeout," BM25 finds documents that actually contain "ERR\_CONNECTION\_REFUSED" as a term. However, it may miss a page about "troubleshooting network connections" that describes the same problem. Refer to [Keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/) for setup.

## Hybrid search

Hybrid search runs vector and keyword search in parallel and merges the results using a fusion method. Vector search understands intent, keyword search matches specific terms. Together, a query like "ERR\_CONNECTION\_REFUSED timeout" finds the exact error page and related troubleshooting content. Refer to [Hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) for setup.

![Hybrid search](https://developers.cloudflare.com/_astro/hybrid-search.CJ9Cuw7h_13NTs.webp)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/concepts/search-modes/#page","headline":"Search modes · Cloudflare AI Search docs","description":"Compare AI Search vector, keyword, and hybrid search modes to choose the right retrieval strategy.","url":"https://developers.cloudflare.com/ai-search/concepts/search-modes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
