---
description: Review which AI model types AI Gateway Guardrails evaluates for text generation, embeddings, and unknown models.
title: Supported model types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported model types

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Gateway's Guardrails detects the type of AI model being used and applies safety checks accordingly:

* **Text generation models**: Both prompts and responses are evaluated.
* **Embedding models**: Only the prompt is evaluated, as the response consists of numerical embeddings, which are not meaningful for moderation.
* **Unknown models**: If the model type cannot be determined, only the prompt is evaluated, while the response bypass Guardrails.

Note

Guardrails does not yet support streaming responses. Support for streaming is planned for a future update.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/#page","headline":"Supported model types · Cloudflare AI Gateway docs","description":"Review which AI model types AI Gateway Guardrails evaluates for text generation, embeddings, and unknown models.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
