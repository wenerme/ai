---
description: View all AI models supported by AI Search, including text generation, embedding, and reranking models.
title: Supported models
image: https://developers.cloudflare.com/ai-search/configuration/models/supported-models/og.png?v=41bd375e44ab5f9f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported models

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This page lists all models supported by AI Search and their lifecycle status.

Request model support

If you would like to use a model that is not currently supported, reach out to us on [Discord ↗︎](https://discord.gg/cloudflaredev) to request it.

## Production models

Production models are the actively supported and recommended models that are stable and fully available.

### Text generation

AI Search supports the following Workers AI models for text generation:

| Provider | Alias | Context window (tokens) |
| --- | --- | --- |
| **Workers AI** | `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | 24,000 |
|  | `@cf/meta/llama-3.1-8b-instruct-fast` | 60,000 |
|  | `@cf/meta/llama-3.1-8b-instruct-fp8` | 32,000 |
|  | `@cf/meta/llama-4-scout-17b-16e-instruct` | 131,000 |
|  | `@cf/deepseek-ai/deepseek-v4-flash-0731` | 1,048,576 |
|  | `@cf/deepseek-ai/deepseek-v4-pro-0813` | 1,048,576 |
|  | `@cf/openai/gpt-oss-120b` | 128,000 |
|  | `@cf/openai/gpt-oss-20b` | 128,000 |
|  | `@cf/qwen/qwen3.8-27b` | 262,144 |
|  | `@cf/moonshotai/kimi-k2.7-code` | 262,144 |
|  | `@cf/zai-org/glm-4.7-flash` | 131,072 |
|  | `@cf/zai-org/glm-5.3-flash` | 1,048,576 |
|  | `@cf/zai-org/glm-5.3` | 1,310,720 |
|  | `@cf/qwen/qwen3-30b-a3b-fp8` | 32,000 |

For external generation models, AI Search supports any provider compatible with the [AI Gateway chat completions endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

### Embedding

| Provider | Alias | Vector dims | Input tokens | Image support | Default | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| **Google AI Studio** | `google-ai-studio/gemini-embedding-001` | 1,536 | 2,048 | No | No | cosine |
|  | `google-ai-studio/gemini-embedding-2` | 1,536 | 8,192 | Yes | No | cosine |
| **OpenAI** | `openai/text-embedding-3-small` | 1,536 | 8,192 | No | No | cosine |
|  | `openai/text-embedding-3-large` | 1,536 | 8,192 | No | No | cosine |
| **Workers AI** | `@cf/baai/bge-m3` | 1,024 | 512 | No | No | cosine |
|  | `@cf/baai/bge-large-en-v1.5` | 1,024 | 512 | No | No | cosine |
|  | `@cf/qwen/qwen3-embedding-0.6b` | 1,024 | 8,192 | No | Yes | cosine |
|  | `@cf/qwen/qwen3-vl-embedding-2b` | 1,024 | 32,768 | Yes | No | cosine |
|  | `@cf/google/embeddinggemma-300m` | 768 | 512 | No | No | cosine |

### Reranking

| Provider | Alias | Input tokens | Default |
| --- | --- | --- | --- |
| **Workers AI** | `@cf/baai/bge-reranker-base` | 512 | Yes |

## Transition models

There are currently no models marked for end-of-life.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/models/supported-models/#page","headline":"Supported models","description":"View all AI models supported by AI Search, including text generation, embedding, and reranking models.","url":"https://developers.cloudflare.com/ai-search/configuration/models/supported-models/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/configuration/models/supported-models/og.png?v=41bd375e44ab5f9f","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
