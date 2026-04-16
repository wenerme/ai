---
title: Limits &#38; pricing
description: During the open beta, AI Search is free to enable. When you create an AI Search instance, it provisions and runs on top of Cloudflare services in your account. These resources are billed as part of your Cloudflare usage, and includes:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/platform/limits-pricing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Limits & pricing

## Pricing

During the open beta, AI Search is **free to enable**. When you create an AI Search instance, it provisions and runs on top of Cloudflare services in your account. These resources are **billed as part of your Cloudflare usage**, and includes:

| Service & Pricing                                                                 | Description                                                                                                                                                       |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**R2**](https://developers.cloudflare.com/r2/pricing/)                           | Stores your source data                                                                                                                                           |
| [**Vectorize**](https://developers.cloudflare.com/vectorize/platform/pricing/)    | Stores vector embeddings and powers semantic search                                                                                                               |
| [**Workers AI**](https://developers.cloudflare.com/workers-ai/platform/pricing/)  | Handles image-to-Markdown conversion, embedding, query rewriting, and response generation                                                                         |
| [**AI Gateway**](https://developers.cloudflare.com/ai-gateway/reference/pricing/) | Monitors and controls model usage                                                                                                                                 |
| [**Browser Run**](https://developers.cloudflare.com/browser-run/pricing/)         | Loads dynamic JavaScript content during [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) crawling with the Render option |

For more information about how each resource is used within AI Search, reference [How AI Search works](https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/).

## Limits

The following limits currently apply to AI Search during the open beta:

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8). If the limit can be increased, Cloudflare will contact you with next steps.

| Limit                               | Value                    |
| ----------------------------------- | ------------------------ |
| Max AI Search instances per account | 50                       |
| Max files per AI Search             | 1,000,000                |
| Max file size                       | 4 MB                     |
| Max custom metadata fields          | 5 per AI Search instance |
| Max text metadata value length      | 500 characters           |

These limits are subject to change as AI Search evolves beyond open beta.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/platform/limits-pricing/","name":"Limits & pricing"}}]}
```
