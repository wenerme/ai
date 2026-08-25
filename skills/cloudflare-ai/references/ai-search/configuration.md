---
description: Customize how your AI Search instance indexes data, retrieves results, and generates responses.
title: Configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can customize how your AI Search instance indexes your data, retrieves results, and generates responses. Some settings can be updated after the instance is created, while others are fixed at creation time.

## Data source

| Configuration                                                                                               | Editable after creation | Description                                              |
| ----------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------- |
| [Built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) | n/a                     | Upload files directly to an instance                     |
| [Website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/)                   | no                      | Connect a domain you own to index website pages          |
| [R2 Bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/)                      | no                      | Connect a Cloudflare R2 bucket to index stored documents |

## Indexing

| Configuration                                                                                              | Editable after creation | Description                                                     |
| ---------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------- |
| [Vector search](https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/)         | yes                     | Vector search and the built-in vector index                     |
| [Path filtering](https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/)       | yes                     | Include or exclude specific paths from indexing                 |
| [Chunking](https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/)                   | yes                     | Number of tokens per chunk and overlap between chunks           |
| [Syncing](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/)                     | yes                     | Sync jobs and indexing controls                                 |
| [Keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/)       | yes                     | Enable keyword (BM25) search for exact term matching            |
| [Hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/)         | yes                     | Combine vector and keyword search with configurable fusion      |
| [Metadata attributes](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/)        | yes                     | Define built-in and custom metadata fields                      |
| [Service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) | yes                     | API token that grants AI Search permission to access R2 buckets |

## Retrieval

| Configuration                                                                                                                | Editable after creation | Description                                                   |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| [Result controls](https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/)                      | yes                     | Match threshold and maximum number of results                 |
| [Filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/)                                  | yes                     | Filter results by metadata attributes                         |
| [Relevance boosting](https://developers.cloudflare.com/ai-search/configuration/retrieval/boosting/)                          | yes                     | Bias results by metadata characteristics                      |
| [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/)                                  | yes                     | Reorder results by semantic relevance using a reranking model |
| [Query rewriting](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/)                      | yes                     | Rewrite follow-up queries using conversation context          |
| [System prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/)                          | yes                     | Guide query rewriting and response generation behavior        |
| [Similarity caching](https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/)                             | yes                     | Cache responses for similar prompts                           |
| [Public endpoint](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)                      | yes                     | Enable public access to search, chat, and MCP endpoints       |
| [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/)        | yes                     | Serve a public endpoint from a hostname that you own          |
| [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/)  | yes                     | Require callers to authenticate before they can search        |
| [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/) | yes                     | Search across several instances from a single public endpoint |
| [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/)    | yes                     | Embed pre-built search and chat components in your website    |

## Models

| Configuration                                                                              | Editable after creation | Description                                         |
| ------------------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------- |
| [Embedding model](https://developers.cloudflare.com/ai-search/configuration/models/)       | no                      | Model used to generate vector embeddings            |
| [Generation model](https://developers.cloudflare.com/ai-search/configuration/models/)      | yes                     | Model used to generate the final response           |
| [Query rewriting model](https://developers.cloudflare.com/ai-search/configuration/models/) | yes                     | Model used for query rewriting                      |
| [Reranking model](https://developers.cloudflare.com/ai-search/configuration/models/)       | yes                     | Model used to reorder results by semantic relevance |
| [AI Gateway](https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/) | yes                     | Observe and control the model calls AI Search makes |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-search/configuration/#page","headline":"Configuration · Cloudflare AI Search docs","description":"Customize how your AI Search instance indexes data, retrieves results, and generates responses.","url":"https://developers.cloudflare.com/ai-search/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
