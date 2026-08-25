---
description: View AI Search usage limits and pricing details for Free and Paid Workers plans.
title: Limits &amp; pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits & pricing

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/platform/limits-pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Limits

The following limits apply based on your [Workers plan](https://developers.cloudflare.com/workers/platform/pricing/):

| Limit                                       | Workers Free             | Workers Paid                 |
| ------------------------------------------- | ------------------------ | ---------------------------- |
| AI Search instances per account             | 100                      | 5,000                        |
| Namespaces per account                      | 100                      | 100                          |
| Files per instance                          | 100,000                  | 1M or 500K for hybrid search |
| Pages per crawl, discover parse type        | 100,000                  | 100,000                      |
| Max file size                               | 4 MB                     | 4 MB                         |
| Queries per month                           | 20,000                   | Unlimited                    |
| Instances per cross-instance search request | 10                       | 10                           |
| Maximum pages crawled per day               | 500                      | Unlimited                    |
| Max custom metadata fields                  | 5 per AI Search instance | 5 per AI Search instance     |
| Max text metadata value length              | 500 characters           | 500 characters               |

Website crawling is bounded by several of these limits at once. A `discover` crawl accepts up to 100,000 pages, but the files per instance and maximum pages crawled per day limits also apply, so the number of pages you end up with is whichever of those values is lowest. On Workers Free, the daily limit of 500 pages is the binding one.

For the limits that apply only to website data sources, refer to [Website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/#limits).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8). If the limit can be increased, Cloudflare will contact you with next steps.

## Pricing

During the open beta, AI Search is free within these limits. [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/) usage is billed separately. Pricing details will be communicated at least 30 days before any billing begins.

Storage, vector indexing, and the [Browser Run](https://developers.cloudflare.com/browser-run/pricing/) usage that website crawling consumes are included with AI Search. You are not billed separately for them.

## Historical billing

Instances created before AI Search moved to managed infrastructure ran on Cloudflare services in your own account, so older invoices may include separate charges for [R2](https://developers.cloudflare.com/r2/pricing/), [Vectorize](https://developers.cloudflare.com/vectorize/platform/pricing/), [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/), [AI Gateway](https://developers.cloudflare.com/ai-gateway/reference/pricing/), and [Browser Run](https://developers.cloudflare.com/browser-run/pricing/).

After the move, storage, vector indexing, and Browser Run usage for crawling are included. Workers AI and AI Gateway are still billed separately.

If your instance crawled a website, those pages now live in built-in storage. The dedicated R2 bucket AI Search originally created in your account is no longer used. It remains in your account, and any objects left in it may still count toward [R2 storage usage](https://developers.cloudflare.com/r2/pricing/). AI Search no longer writes to this bucket, so you can delete it if you no longer need its contents.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/platform/limits-pricing/#page","headline":"Limits & pricing · Cloudflare AI Search docs","description":"View AI Search usage limits and pricing details for Free and Paid Workers plans.","url":"https://developers.cloudflare.com/ai-search/platform/limits-pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
