---
title: Limits &#38; pricing
description: View AI Search usage limits and pricing details for Free and Paid Workers plans.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/platform/limits-pricing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Limits & pricing

Instances created after **April 16, 2026** include [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/), a [built-in vector index](https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/#built-in-vector-index), and web crawling. You can see if your instance was created after the new release by checking if it has built-in storage and vector index. You can check by going on the dashboard under **AI** \> **AI Search**. Select your instance and check the **Overview** tab to see if it includes built-in storage and built-in vector database.

## New instances

If your instance was created after **April 16, 2026**, it includes built-in storage, a built-in vector index, and web crawling. During the open beta, AI Search is free within the limits below. [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/) usage is billed separately. Pricing details will be communicated at least 30 days before any billing begins.

The following limits apply based on your [Workers plan](https://developers.cloudflare.com/workers/platform/pricing/):

| Limit                           | Workers Free             | Workers Paid                 |
| ------------------------------- | ------------------------ | ---------------------------- |
| AI Search instances per account | 100                      | 5,000                        |
| Files per instance              | 100,000                  | 1M or 500K for hybrid search |
| Max file size                   | 4 MB                     | 4 MB                         |
| Queries per month               | 20,000                   | Unlimited                    |
| Maximum pages crawled per day   | 500                      | Unlimited                    |
| Max custom metadata fields      | 5 per AI Search instance | 5 per AI Search instance     |
| Max text metadata value length  | 500 characters           | 500 characters               |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8). If the limit can be increased, Cloudflare will contact you with next steps.

## Previous instances

If your instance was created before **April 16, 2026**, it provisions and runs on top of Cloudflare services in your account. AI Search is free to enable. You are billed for the underlying services it provisions on your account:

| Service                                                                       | Description                                                 |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [R2](https://developers.cloudflare.com/r2/pricing/)                           | Stores your source data                                     |
| [Vectorize](https://developers.cloudflare.com/vectorize/platform/pricing/)    | Stores vector embeddings and powers semantic search         |
| [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/)  | Handles embedding, query rewriting, and response generation |
| [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/) | Monitors and controls model usage                           |
| [Browser Run](https://developers.cloudflare.com/browser-run/pricing/)         | Loads dynamic JavaScript content during website crawling    |

The following limits apply to these instances:

| Limit                               | Value                    |
| ----------------------------------- | ------------------------ |
| Max AI Search instances per account | 100                      |
| Max files per AI Search             | 1,000,000                |
| Max file size                       | 4 MB                     |
| Max custom metadata fields          | 5 per AI Search instance |
| Max text metadata value length      | 500 characters           |

All instances will be migrated to managed infrastructure. Migration details are coming soon.

For more information about how each service is used, refer to [How AI Search works](https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/platform/limits-pricing/","name":"Limits & pricing"}}]}
```
