---
title: Query rewriting
description: Query rewriting is an optional step in the AI Search pipeline that improves retrieval quality by transforming the original user query into a more effective search query.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/configuration/query-rewriting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Query rewriting

Query rewriting is an optional step in the AI Search pipeline that improves retrieval quality by transforming the original user query into a more effective search query.

Instead of embedding the raw user input directly, AI Search can use a large language model (LLM) to rewrite the query based on a system prompt. The rewritten query is then used to perform the vector search.

## Why use query rewriting?

The wording of a user’s question may not match how your documents are written. Query rewriting helps bridge this gap by:

* Rephrasing informal or vague queries into precise, information-dense terms
* Adding synonyms or related keywords
* Removing filler words or irrelevant details
* Incorporating domain-specific terminology

This leads to more relevant vector matches which improves the accuracy of the final generated response.

## Example

**Original query:** `how do i make this work when my api call keeps failing?`

**Rewritten query:** `API call failure troubleshooting authentication headers rate limiting network timeout 500 error`

In this example, the original query is conversational and vague. The rewritten version extracts the core problem (API call failure) and expands it with relevant technical terms and likely causes. These terms are much more likely to appear in documentation or logs, improving semantic matching during vector search.

## How it works

If query rewriting is enabled, AI Search performs the following:

1. Sends the **original user query** and the **query rewrite system prompt** to the configured LLM
2. Receives the **rewritten query** from the model
3. Embeds the rewritten query using the selected embedding model
4. Performs vector search in your AI Search's Vectorize index

For details on how to guide model behavior during this step, see the [system prompt](https://developers.cloudflare.com/ai-search/configuration/system-prompt/) documentation.

Note

All AI Search requests are routed through [AI Gateway](https://developers.cloudflare.com/ai-gateway/) and logged there. If you do not select an AI Gateway during setup, AI Search creates a default gateway for your instance. You can view query rewrites, embeddings, text generation, and other model calls in the AI Gateway logs for monitoring and debugging.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/query-rewriting/","name":"Query rewriting"}}]}
```
