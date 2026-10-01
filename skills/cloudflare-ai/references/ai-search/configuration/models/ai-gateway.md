---
description: Observe and control the AI models your AI Search instance uses through the connected AI Gateway.
title: AI Gateway
image: https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/og.png?v=da0d19a2e49194ce
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Gateway

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Every AI Search instance is connected to a Cloudflare [AI Gateway](https://developers.cloudflare.com/ai-gateway/). External-provider embedding and reranking calls run through your connected gateway. Query rewriting and response generation also run through your gateway.

Workers AI embedding and reranking usage is included in AI Search usage. These calls do not appear in your AI Gateway logs or analytics and are not billed separately as Workers AI usage.

To choose or change which gateway your instance uses, see [Models](https://developers.cloudflare.com/ai-search/configuration/models/).

## Observe your model calls

AI Gateway records the model requests routed through your gateway. This includes all query-rewriting and response-generation calls, plus external-provider embedding and reranking calls.

- **[Analytics](https://developers.cloudflare.com/ai-gateway/observability/analytics/):** Track the number of requests, tokens used, cost, latency, and errors across your model calls.
- **[Logs](https://developers.cloudflare.com/ai-gateway/observability/logging/):** Inspect individual requests and responses, including the effective [system prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/), rewritten queries, and generated answers.

## Use models from other providers

By default, AI Search uses [Workers AI](https://developers.cloudflare.com/workers-ai/) models. To use models from other providers, such as OpenAI or Anthropic, add your provider keys to AI Gateway and select those models in AI Search.

1. Add your provider keys with [Bring Your Own Keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
2. Connect the gateway and select the models in your AI Search settings. For details, see [Models](https://developers.cloudflare.com/ai-search/configuration/models/).

## Guard against unsafe content

Use AI Gateway [Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/) to screen the prompts and responses that flow through your instance and block content that is unsafe or inappropriate. To detect and handle sensitive information, such as personal or financial data, use [Data Loss Prevention (DLP)](https://developers.cloudflare.com/ai-gateway/features/dlp/).

## Improve resilience

Configure [request retries and model fallbacks](https://developers.cloudflare.com/ai-gateway/configuration/fallbacks/) so that a model call can automatically retry or fall back to another model when a provider returns an error.

## Caching and rate limiting

Some AI Gateway features act on every request that passes through your gateway. These features can interfere with external-provider embedding and reranking, query rewriting, and response generation.

Do not turn on [AI Gateway caching](https://developers.cloudflare.com/ai-gateway/features/caching/) for the gateway connected to your AI Search instance. This matters most for embedding requests. AI Search relies on fresh embeddings to build its vector index and to match each query against it, so serving cached embeddings can store or return incorrect vectors and quietly degrade the accuracy of your search results. To cache search results, use AI Search's own [Similarity cache](https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/) instead.

Similarly, avoid setting [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) on this gateway. Rate limits apply to AI Search's own model calls, including the many embedding requests made while indexing, and can interrupt indexing and querying.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/#page","headline":"AI Gateway","description":"Observe and control the AI models your AI Search instance uses through the connected AI Gateway.","url":"https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/og.png?v=da0d19a2e49194ce","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
