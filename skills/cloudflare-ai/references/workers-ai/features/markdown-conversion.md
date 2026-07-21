---
description: Convert documents in multiple formats to Markdown using the Workers AI toMarkdown method.
title: Markdown Conversion
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Markdown Conversion

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Markdown ↗](https://en.wikipedia.org/wiki/Markdown) is essential for text generation and large language models (LLMs) in training and inference because it can provide structured, semantic, human, and machine-readable input. Likewise, Markdown facilitates chunking and structuring input data for better retrieval and synthesis in the context of RAGs, and its simplicity and ease of parsing and rendering make it ideal for AI Agents.

For these reasons, document conversion plays an important role when designing and developing AI applications. Workers AI provides the `toMarkdown` utility method that developers can use from the [env.AI](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/) binding or the [REST APIs](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/) for quick, easy, and convenient conversion and summary of documents in multiple formats to Markdown language.

## Pricing

`toMarkdown` is free for most format conversions. In some cases, like image conversion, it can use Workers AI models for object detection and summarization, which may incur additional costs if it exceeds the Workers AI free allocation limits. Refer to [what models we use](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/) and the [Workers AI pricing page](https://developers.cloudflare.com/workers-ai/platform/pricing/) for more details.

## Other Markdown conversion features

* The Browser Run [/markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/) endpoint supports markdown conversion if you need to render a dynamic page or application in a real browser before converting it.
* [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) allows real-time document conversion for Cloudflare zones using content negotiation headers.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/#page","headline":"Markdown Conversion · Cloudflare Workers AI docs","description":"Convert documents in multiple formats to Markdown using the Workers AI toMarkdown method.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
