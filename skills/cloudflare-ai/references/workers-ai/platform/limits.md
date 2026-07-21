---
description: Rate limits for Workers AI inference requests, organized by task type and model.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Limits

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/platform/limits/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Workers AI is now Generally Available. We've updated our rate limits to reflect this.

Note that model inferences in local mode using Wrangler will also count towards these limits. Beta models may have lower rate limits while we work on performance and scale.

Custom requirements

If you have custom requirements like private custom models or higher limits, complete the [Custom Requirements Form ↗](https://forms.gle/axnnpGDb6xrmR31T6). Cloudflare will contact you with next steps.

Rate limits are default per task type, with some per-model limits defined as follows:

## Rate limits by task type

### [Automatic Speech Recognition](https://developers.cloudflare.com/workers-ai/models/)

* 720 requests per minute

### [Image Classification](https://developers.cloudflare.com/workers-ai/models/)

* 3000 requests per minute

### [Image-to-Text](https://developers.cloudflare.com/workers-ai/models/)

* 720 requests per minute

### [Object Detection](https://developers.cloudflare.com/workers-ai/models/)

* 3000 requests per minute

### [Summarization](https://developers.cloudflare.com/workers-ai/models/)

* 1500 requests per minute

### [Text Classification](https://developers.cloudflare.com/workers-ai/models/)

* 2000 requests per minute

### [Text Embeddings](https://developers.cloudflare.com/workers-ai/models/)

* 3000 requests per minute
* [@cf/baai/bge-large-en-v1.5](https://developers.cloudflare.com/workers-ai/models/bge-large-en-v1.5/) is 1500 requests per minute

### [Text Generation](https://developers.cloudflare.com/workers-ai/models/)

* 300 requests per minute
* [@hf/thebloke/mistral-7b-instruct-v0.1-awq](https://developers.cloudflare.com/workers-ai/models/mistral-7b-instruct-v0.1-awq/) is 400 requests per minute
* [@cf/microsoft/phi-2](https://developers.cloudflare.com/workers-ai/models/phi-2/) is 720 requests per minute
* [@cf/qwen/qwen1.5-0.5b-chat](https://developers.cloudflare.com/workers-ai/models/qwen1.5-0.5b-chat/) is 1500 requests per minute
* [@cf/qwen/qwen1.5-1.8b-chat](https://developers.cloudflare.com/workers-ai/models/qwen1.5-1.8b-chat/) is 720 requests per minute
* [@cf/qwen/qwen1.5-14b-chat-awq](https://developers.cloudflare.com/workers-ai/models/qwen1.5-14b-chat-awq/) is 150 requests per minute
* [@cf/tinyllama/tinyllama-1.1b-chat-v1.0](https://developers.cloudflare.com/workers-ai/models/tinyllama-1.1b-chat-v1.0/) is 720 requests per minute

### [Text-to-Image](https://developers.cloudflare.com/workers-ai/models/)

* 720 requests per minute
* [@cf/runwayml/stable-diffusion-v1-5-img2img](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/) is 1500 requests per minute

### [Translation](https://developers.cloudflare.com/workers-ai/models/)

* 720 requests per minute

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/platform/limits/#page","headline":"Limits · Cloudflare Workers AI docs","description":"Rate limits for Workers AI inference requests, organized by task type and model.","url":"https://developers.cloudflare.com/workers-ai/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
