---
description: View all AI models supported by AI Search, including text generation, embedding, and reranking models.
title: Supported models
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported models

Last updated Jun 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This page lists all models supported by AI Search and their lifecycle status.

Request model support

If you would like to use a model that is not currently supported, reach out to us on [Discord ↗](https://discord.gg/cloudflaredev) to request it.

## Production models

Production models are the actively supported and recommended models that are stable and fully available.

### Text generation

| Provider             | Alias                                       | Context window (tokens) |
| -------------------- | ------------------------------------------- | ----------------------- |
| **Anthropic**        | anthropic/claude-3-7-sonnet                 | 200,000                 |
|                      | anthropic/claude-sonnet-4                   | 200,000                 |
|                      | anthropic/claude-opus-4                     | 200,000                 |
|                      | anthropic/claude-3-5-haiku                  | 200,000                 |
| **Cerebras**         | cerebras/qwen-3-235b-a22b-instruct          | 64,000                  |
|                      | cerebras/qwen-3-235b-a22b-thinking          | 65,000                  |
|                      | cerebras/llama-3.3-70b                      | 65,000                  |
|                      | cerebras/llama-4-maverick-17b-128e-instruct | 8,000                   |
|                      | cerebras/llama-4-scout-17b-16e-instruct     | 8,000                   |
|                      | cerebras/gpt-oss-120b                       | 64,000                  |
| **Google AI Studio** | google-ai-studio/gemini-2.5-flash           | 1,048,576               |
|                      | google-ai-studio/gemini-2.5-pro             | 1,048,576               |
| **Grok (x.ai)**      | grok/grok-4                                 | 256,000                 |
| **Groq**             | groq/llama-3.3-70b-versatile                | 131,072                 |
|                      | groq/llama-3.1-8b-instant                   | 131,072                 |
| **OpenAI**           | openai/gpt-5                                | 400,000                 |
|                      | openai/gpt-5-mini                           | 400,000                 |
|                      | openai/gpt-5-nano                           | 400,000                 |
| **Workers AI**       | @cf/meta/llama-3.3-70b-instruct-fp8-fast    | 24,000                  |
|                      | @cf/meta/llama-3.1-8b-instruct-fast         | 60,000                  |
|                      | @cf/meta/llama-3.1-8b-instruct-fp8          | 32,000                  |
|                      | @cf/meta/llama-4-scout-17b-16e-instruct     | 131,000                 |
|                      | @cf/zai-org/glm-4.7-flash                   | 131,072                 |
|                      | @cf/qwen/qwen3-30b-a3b-fp8                  | 32,000                  |

### Embedding

| Provider             | Alias                                 | Vector dims | Input tokens | Metric |
| -------------------- | ------------------------------------- | ----------- | ------------ | ------ |
| **Google AI Studio** | google-ai-studio/gemini-embedding-001 | 1,536       | 2048         | cosine |
| **OpenAI**           | openai/text-embedding-3-small         | 1,536       | 8192         | cosine |
|                      | openai/text-embedding-3-large         | 1,536       | 8192         | cosine |
| **Workers AI**       | @cf/baai/bge-m3                       | 1,024       | 512          | cosine |
|                      | @cf/baai/bge-large-en-v1.5            | 1,024       | 512          | cosine |
|                      | @cf/qwen/qwen3-embedding-0.6b         | 1,024       | 8,192        | cosine |
|                      | @cf/google/embeddinggemma-300m        | 768         | 512          | cosine |

### Reranking

| Provider       | Alias                      | Input tokens |
| -------------- | -------------------------- | ------------ |
| **Workers AI** | @cf/baai/bge-reranker-base | 512          |

## Transition models

There are currently no models marked for end-of-life.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/models/supported-models/#page","headline":"Supported models · Cloudflare AI Search docs","description":"View all AI models supported by AI Search, including text generation, embedding, and reranking models.","url":"https://developers.cloudflare.com/ai-search/configuration/models/supported-models/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
