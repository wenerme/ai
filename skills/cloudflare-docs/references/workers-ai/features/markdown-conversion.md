---
title: Markdown Conversion
description: Convert documents in multiple formats to Markdown using the Workers AI toMarkdown method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Markdown Conversion

[Markdown ↗](https://en.wikipedia.org/wiki/Markdown) is essential for text generation and large language models (LLMs) in training and inference because it can provide structured, semantic, human, and machine-readable input. Likewise, Markdown facilitates chunking and structuring input data for better retrieval and synthesis in the context of RAGs, and its simplicity and ease of parsing and rendering make it ideal for AI Agents.

For these reasons, document conversion plays an important role when designing and developing AI applications. Workers AI provides the `toMarkdown` utility method that developers can use from the [env.AI](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/) binding or the [REST APIs](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/) for quick, easy, and convenient conversion and summary of documents in multiple formats to Markdown language.

## Pricing

`toMarkdown` is free for most format conversions. In some cases, like image conversion, it can use Workers AI models for object detection and summarization, which may incur additional costs if it exceeds the Workers AI free allocation limits. Refer to [what models we use](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/) and the [Workers AI pricing page](https://developers.cloudflare.com/workers-ai/platform/pricing/) for more details.

## Other Markdown conversion features

* The Browser Run [/markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/) endpoint supports markdown conversion if you need to render a dynamic page or application in a real browser before converting it.
* [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) allows real-time document conversion for Cloudflare zones using content negotiation headers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/markdown-conversion/","name":"Markdown Conversion"}}]}
```
