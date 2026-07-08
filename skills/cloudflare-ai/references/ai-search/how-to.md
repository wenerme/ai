---
title: How to
description: Step-by-step guides for building search engines, per-tenant search, and other AI Search use cases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# How to

These guides walk through common AI Search use cases, from no-code setups to full agent applications. Use the difficulty column to find the right place to start.

| Guide                                                                                                                            | Difficulty   | What you build                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| [Add search to your website](https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/)                     | Beginner     | Add a search bar, chat bubble, and search modal to a site with the prebuilt UI snippets.                 |
| [Connect your AI Search to an MCP client](https://developers.cloudflare.com/ai-search/how-to/connect-mcp-client/)                | Beginner     | Expose your indexed content as a search tool for any MCP client or AI assistant, with no code.           |
| [Create a simple search engine](https://developers.cloudflare.com/ai-search/how-to/simple-search-engine/)                        | Beginner     | Query an instance from a Worker using the search binding.                                                |
| [Multi-tenant search isolation](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)                           | Intermediate | Keep each tenant's data separate with a per-tenant instance or a shared instance and metadata filtering. |
| [Search multiple sources at once](https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/)                   | Intermediate | Search a shared knowledge base and a tenant-specific one together in a single query.                     |
| [Fetch and index single web pages](https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/)                | Intermediate | Use Browser Run to fetch a page's rendered HTML, index it, and search it from one Worker.                |
| [Bring your own generation model](https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/)           | Intermediate | Use AI Search for retrieval and an external model, such as OpenAI, for generation.                       |
| [Human-in-the-loop knowledge base updates](https://developers.cloudflare.com/ai-search/how-to/human-in-the-loop-knowledge-base/) | Advanced     | Build an agent that proposes new documents and pauses for human approval, with rollback.                 |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-search/how-to/#page","headline":"How to · Cloudflare AI Search docs","description":"Step-by-step guides for building search engines, per-tenant search, and other AI Search use cases.","url":"https://developers.cloudflare.com/ai-search/how-to/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}}]}
```
