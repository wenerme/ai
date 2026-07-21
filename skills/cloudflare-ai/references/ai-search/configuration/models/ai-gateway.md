---
description: Observe and control the AI models your AI Search instance uses through the connected AI Gateway.
title: AI Gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

#  AI Gateway

Last updated Jul 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Every AI Search instance is connected to a Cloudflare [AI Gateway](https://developers.cloudflare.com/ai-gateway/). The model calls that AI Search makes for embedding, query rewriting, reranking, and response generation run through this gateway. By configuring the connected gateway, you can observe and control those model calls.

To choose or change which gateway your instance uses, see [Models](https://developers.cloudflare.com/ai-search/configuration/models/).

## Observe your model calls

AI Gateway records the model requests that run through it, so you can see what your instance is doing.

* **[Analytics](https://developers.cloudflare.com/ai-gateway/observability/analytics/):** Track the number of requests, tokens used, cost, latency, and errors across your model calls.
* **[Logs](https://developers.cloudflare.com/ai-gateway/observability/logging/):** Inspect individual requests and responses, including the effective [system prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/), rewritten queries, and generated answers.

## Use models from other providers

By default, AI Search uses [Workers AI](https://developers.cloudflare.com/workers-ai/) models. To use models from other providers, such as OpenAI or Anthropic, add your provider keys to AI Gateway and select those models in AI Search.

1. Add your provider keys with [Bring Your Own Keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
2. Connect the gateway and select the models in your AI Search settings. For details, see [Models](https://developers.cloudflare.com/ai-search/configuration/models/).

## Guard against unsafe content

Use AI Gateway [Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/) to screen the prompts and responses that flow through your instance and block content that is unsafe or inappropriate. To detect and handle sensitive information, such as personal or financial data, use [Data Loss Prevention (DLP)](https://developers.cloudflare.com/ai-gateway/features/dlp/).

## Improve resilience

Configure [request retries and model fallbacks](https://developers.cloudflare.com/ai-gateway/configuration/fallbacks/) so that a model call can automatically retry or fall back to another model when a provider returns an error.

## Caching and rate limiting

Some AI Gateway features act on every request that passes through the gateway. Because your AI Search instance shares this gateway for its internal model calls, a few features can interfere with indexing and querying.

Do not turn on [AI Gateway caching](https://developers.cloudflare.com/ai-gateway/features/caching/) for the gateway connected to your AI Search instance. This matters most for embedding requests. AI Search relies on fresh embeddings to build its vector index and to match each query against it, so serving cached embeddings can store or return incorrect vectors and quietly degrade the accuracy of your search results. To cache search results, use AI Search's own [Similarity cache](https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/) instead.

Similarly, avoid setting [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) on this gateway. Rate limits apply to AI Search's own model calls, including the many embedding requests made while indexing, and can interrupt indexing and querying.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/#page","headline":"AI Gateway · Cloudflare AI Search docs","description":"Observe and control the AI models your AI Search instance uses through the connected AI Gateway.","url":"https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
