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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/#page","headline":"Supported model types · Cloudflare AI Gateway docs","description":"Review which AI model types AI Gateway Guardrails evaluates for text generation, embeddings, and unknown models.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
