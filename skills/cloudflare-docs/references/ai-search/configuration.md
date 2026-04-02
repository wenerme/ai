---
title: Configuration
description: You can customize how your AI Search instance indexes your data, and retrieves and generates responses for queries. Some settings can be updated after the instance is created, while others are fixed at creation time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/configuration/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Configuration

You can customize how your AI Search instance indexes your data, and retrieves and generates responses for queries. Some settings can be updated after the instance is created, while others are fixed at creation time.

The table below lists all available configuration options:

| Configuration                                                                                                   | Editable after creation | Description                                                                                               |
| --------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| [Data source](https://developers.cloudflare.com/ai-search/configuration/data-source/)                           | no                      | The source where your knowledge base is stored                                                            |
| [Custom metadata schema](https://developers.cloudflare.com/ai-search/configuration/metadata/#define-a-schema)   | no                      | Define custom metadata fields for filtering (max 5 fields)                                                |
| [Path filtering](https://developers.cloudflare.com/ai-search/configuration/path-filtering/)                     | yes                     | Include or exclude specific paths from indexing                                                           |
| [Chunk size](https://developers.cloudflare.com/ai-search/configuration/chunking/)                               | yes                     | Number of tokens per chunk                                                                                |
| [Chunk overlap](https://developers.cloudflare.com/ai-search/configuration/chunking/)                            | yes                     | Number of overlapping tokens between chunks                                                               |
| [Embedding model](https://developers.cloudflare.com/ai-search/configuration/models/)                            | no                      | Model used to generate vector embeddings                                                                  |
| [Query rewrite](https://developers.cloudflare.com/ai-search/configuration/query-rewriting/)                     | yes                     | Enable or disable query rewriting before retrieval                                                        |
| [Query rewrite model](https://developers.cloudflare.com/ai-search/configuration/models/)                        | yes                     | Model used for query rewriting                                                                            |
| [Query rewrite system prompt](https://developers.cloudflare.com/ai-search/configuration/system-prompt/)         | yes                     | Custom system prompt to guide query rewriting behavior                                                    |
| [Match threshold](https://developers.cloudflare.com/ai-search/configuration/retrieval-configuration/)           | yes                     | Minimum similarity score required for a vector match                                                      |
| [Maximum number of results](https://developers.cloudflare.com/ai-search/configuration/retrieval-configuration/) | yes                     | Maximum number of vector matches returned (top\_k)                                                        |
| [Reranking](https://developers.cloudflare.com/ai-search/configuration/reranking/)                               | yes                     | Rerank to reorder retrieved results by semantic relevance using a reranking model after initial retrieval |
| [Generation model](https://developers.cloudflare.com/ai-search/configuration/models/)                           | yes                     | Model used to generate the final response                                                                 |
| [Generation system prompt](https://developers.cloudflare.com/ai-search/configuration/system-prompt/)            | yes                     | Custom system prompt to guide response generation                                                         |
| [Similarity caching](https://developers.cloudflare.com/ai-search/configuration/cache/)                          | yes                     | Enable or disable caching of responses for similar (not just exact) prompts                               |
| [Similarity caching threshold](https://developers.cloudflare.com/ai-search/configuration/cache/)                | yes                     | Controls how similar a new prompt must be to a previous one to reuse its cached response                  |
| [AI Gateway](https://developers.cloudflare.com/ai-gateway)                                                      | yes                     | AI Gateway for monitoring and controlling model usage                                                     |
| AI Search name                                                                                                  | no                      | Name of your AI Search instance                                                                           |
| [Service API token](https://developers.cloudflare.com/ai-search/configuration/service-api-token/)               | yes                     | API token that grants AI Search permission to configure resources on your account                         |
| [Public endpoint](https://developers.cloudflare.com/ai-search/configuration/public-endpoint/)                   | yes                     | Enable public access to search, chat, and MCP endpoints                                                   |
| [UI snippets](https://developers.cloudflare.com/ai-search/configuration/embed-search-snippets/)                 | yes                     | Embed pre-built search and chat components in your website                                                |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}}]}
```
