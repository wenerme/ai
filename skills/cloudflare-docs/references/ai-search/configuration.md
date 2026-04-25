---
title: Configuration
description: Customize how your AI Search instance indexes data, retrieves results, and generates responses.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Configuration

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
| [Metadata](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/)                   | yes                     | Custom metadata fields for filtering                            |
| [Service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) | yes                     | API token that grants AI Search permission to access R2 buckets |

## Retrieval

| Configuration                                                                                             | Editable after creation | Description                                                   |
| --------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| [Result filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/result-filtering/) | yes                     | Match threshold and maximum number of results                 |
| [Relevance boosting](https://developers.cloudflare.com/ai-search/configuration/retrieval/boosting/)       | yes                     | Bias results by metadata characteristics                      |
| [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/)               | yes                     | Reorder results by semantic relevance using a reranking model |
| [Query rewriting](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/)   | yes                     | Rewrite follow-up queries using conversation context          |
| [System prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/)       | yes                     | Guide query rewriting and response generation behavior        |
| [Similarity caching](https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/)          | yes                     | Cache responses for similar prompts                           |
| [Public endpoint](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)   | yes                     | Enable public access to search, chat, and MCP endpoints       |
| [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/) | yes                     | Embed pre-built search and chat components in your website    |

## Models

| Configuration                                                                              | Editable after creation | Description                                         |
| ------------------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------- |
| [Embedding model](https://developers.cloudflare.com/ai-search/configuration/models/)       | no                      | Model used to generate vector embeddings            |
| [Generation model](https://developers.cloudflare.com/ai-search/configuration/models/)      | yes                     | Model used to generate the final response           |
| [Query rewriting model](https://developers.cloudflare.com/ai-search/configuration/models/) | yes                     | Model used for query rewriting                      |
| [Reranking model](https://developers.cloudflare.com/ai-search/configuration/models/)       | yes                     | Model used to reorder results by semantic relevance |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}}]}
```
