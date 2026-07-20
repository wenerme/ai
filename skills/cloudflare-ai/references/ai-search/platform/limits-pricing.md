---
title: Limits &amp; pricing
description: View AI Search usage limits and pricing details for Free and Paid Workers plans.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Limits & pricing

AI Search usage limits and pricing depend on your [Workers plan](https://developers.cloudflare.com/workers/platform/pricing/).

## Limits

The following limits apply based on your [Workers plan](https://developers.cloudflare.com/workers/platform/pricing/):

| Limit                                       | Workers Free             | Workers Paid                 |
| ------------------------------------------- | ------------------------ | ---------------------------- |
| AI Search instances per account             | 100                      | 5,000                        |
| Namespaces per account                      | 100                      | 100                          |
| Files per instance                          | 100,000                  | 1M or 500K for hybrid search |
| Max file size                               | 4 MB                     | 4 MB                         |
| Queries per month                           | 20,000                   | Unlimited                    |
| Instances per cross-instance search request | 10                       | 10                           |
| Maximum pages crawled per day               | 500                      | Unlimited                    |
| Max custom metadata fields                  | 5 per AI Search instance | 5 per AI Search instance     |
| Max text metadata value length              | 500 characters           | 500 characters               |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8). If the limit can be increased, Cloudflare will contact you with next steps.

## Pricing

During the open beta, AI Search is free within these limits. [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/) usage is billed separately. Pricing details will be communicated at least 30 days before any billing begins.

## Historical billing

Instances created before AI Search moved to managed infrastructure ran on Cloudflare services in your own account, so older invoices may include separate charges for [R2](https://developers.cloudflare.com/r2/pricing/), [Vectorize](https://developers.cloudflare.com/vectorize/platform/pricing/), [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/), [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/), and [Browser Run](https://developers.cloudflare.com/browser-run/pricing/).

After the move, storage, vector indexing, and Browser Run usage for crawling are included. Workers AI and AI Gateway are still billed separately.

If your instance crawled a website, those pages now live in built-in storage. The dedicated R2 bucket AI Search originally created in your account is no longer used. It remains in your account, and any objects left in it may still count toward [R2 storage usage](https://developers.cloudflare.com/r2/pricing/). AI Search no longer writes to this bucket, so you can delete it if you no longer need its contents.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/platform/limits-pricing/#page","headline":"Limits & pricing · Cloudflare AI Search docs","description":"View AI Search usage limits and pricing details for Free and Paid Workers plans.","url":"https://developers.cloudflare.com/ai-search/platform/limits-pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/platform/limits-pricing/","name":"Limits & pricing"}}]}
```
