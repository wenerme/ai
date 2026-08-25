---
description: Improve AI Search retrieval quality by enabling query rewriting to rephrase user queries.
title: Query rewriting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Query rewriting

Last updated Jun 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Query rewriting is an optional step in the AI Search pipeline that improves retrieval quality for follow-up queries. It applies to both [Search](https://developers.cloudflare.com/ai-search/api/search/workers-binding/#search) and [Chat Completions](https://developers.cloudflare.com/ai-search/api/search/workers-binding/#chatcompletions) requests.

## Why use query rewriting?

The wording of a user's question may not match how your documents are written. Query rewriting helps bridge this gap by:

* Rephrasing informal or vague queries into precise, information-dense terms
* Adding synonyms or related keywords
* Removing filler words or irrelevant details
* Resolving follow-up queries that reference previous messages (for example, "tell me more about that" becomes a specific query based on conversation history)

This leads to more relevant search matches, which improves the accuracy of results and generated responses.

## How it works

Query rewriting requires the `messages` format and does not apply when using the `query` format. The first message is always used as-is. For follow-up queries, AI Search sends the conversation history, the latest user message, and the [query rewrite system prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/) to the configured LLM. The rewritten query is then embedded and used to perform the search.

## Example

**First message:** `What is Cloudflare Workers?`(used as-is, no rewriting)

**Follow-up message:** `How do I deploy one?` **Rewritten query:** `deploy Cloudflare Worker getting started`

The follow-up "How do I deploy one?" is vague on its own. Query rewriting uses the conversation context to understand "one" refers to a Cloudflare Worker. How the query is rewritten depends on your [query rewrite system prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/#query-rewriting-system-prompt).

## Considerations

Enabling query rewriting adds an extra LLM call to the query pipeline, which may increase latency.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/#page","headline":"Query rewriting · Cloudflare AI Search docs","description":"Improve AI Search retrieval quality by enabling query rewriting to rephrase user queries.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
