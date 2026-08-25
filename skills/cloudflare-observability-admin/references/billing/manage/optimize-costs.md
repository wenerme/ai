---
description: Strategies for reducing usage-based charges across Cloudflare products.
title: Optimize costs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize costs

Last updated May 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/billing/manage/optimize-costs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Reducing usage-based charges starts with understanding where your consumption comes from. Use the [billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/) to identify which products are driving costs, then apply the strategies below.

## General strategies

| Strategy                                                                                                                               | Impact                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Set up [budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) to catch unexpected spikes early               | Prevents surprise invoices across all products              |
| Review the [billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/) weekly to identify cost trends | Catches runaway costs before the invoice arrives            |
| Understand [how charges accrue](https://developers.cloudflare.com/billing/understand/how-charges-accrue/) across the request lifecycle | Identifies which stage of a request generates the most cost |

## Per-product optimization

### Cache and CDN

Cached responses are the cheapest path through Cloudflare. Every cache hit avoids origin fetch costs, Argo routing charges, and Workers execution.

| Strategy                                                                                                                                               | What it reduces                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Increase cache hit ratio with longer TTLs and appropriate Cache-Control headers                                                                        | Argo data transfer, Workers invocations, origin load                         |
| Use [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) for long-tail content that is accessed infrequently | Origin fetches — keeps content cached even when it would normally be evicted |
| Use [tiered caching](https://developers.cloudflare.com/cache/how-to/tiered-cache/) to reduce origin pulls                                              | Origin bandwidth and Argo transfer between Cloudflare data centers           |
| Configure [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to cache more static content by default                           | Overall cache hit ratio                                                      |

### Workers & Durable Objects

| Strategy                                                                                                                                                                                                        | What it reduces                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Use [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) for log retention instead of Logpush                                                                             | Logpush-enabled Workers requests and Logpush data transfer                      |
| Use the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api) for Durable Objects with idle WebSocket connections | Duration (GB-s) charges — billing pauses while the Durable Object is hibernated |

### R2

| Strategy                                                                                                                                                 | What it reduces                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Use [R2 lifecycle rules](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) to transition cold data to the Infrequent Access storage class | Storage costs for archival data              |
| Batch R2 operations where possible instead of per-object reads                                                                                           | Class B operation count                      |
| Use [presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) for direct client access instead of proxying through Workers           | Workers invocations and CPU time             |
| Enable [Cache-Control headers on R2 objects](https://developers.cloudflare.com/r2/buckets/public-buckets/) to leverage Cloudflare's CDN cache            | Class B reads — cached objects do not hit R2 |

### Stream and Images

| Strategy                                                                                                                                                            | What it reduces                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Set appropriate cache headers on Stream embed pages                                                                                                                 | Repeated Stream delivery minutes                 |
| Use [Image Resizing URL format](https://developers.cloudflare.com/images/optimization/features/) with width/height parameters to serve appropriately sized variants | Transformation count — sized variants are cached |

### Load Balancing

| Strategy                                                                                      | What it reduces                        |
| --------------------------------------------------------------------------------------------- | -------------------------------------- |
| Set health check intervals to the longest acceptable value for your availability requirements | DNS queries to load-balanced hostnames |
| Use fewer health check regions where regional redundancy is not critical                      | Health check frequency multiplier      |

## Monitor and alert

Visibility is the foundation of cost optimization. Cloudflare provides two complementary tools:

1. **[Billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/)** — shows daily usage-based costs per product with a chart and sortable table. Available to Pay-as-you-go accounts.
2. **[Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/)** — sends an email notification when your total spend crosses a dollar threshold you define.

For per-product usage notifications (bytes, requests, minutes), configure [usage-based billing notifications](https://developers.cloudflare.com/billing/understand/usage-based-billing/#set-up-usage-notifications) in the Cloudflare dashboard.

## Related resources

* [How charges accrue](https://developers.cloudflare.com/billing/understand/how-charges-accrue/) — Follow a request and see which products generate charges
* [Usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/) — Products table with free tiers and overage rates
* [Monitor billable usage](https://developers.cloudflare.com/billing/manage/billable-usage/) — Track daily usage-based costs
* [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) — Get notified when spend crosses a threshold

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/manage/optimize-costs/#page","headline":"Optimize costs · Cloudflare Billing docs","description":"Strategies for reducing usage-based charges across Cloudflare products.","url":"https://developers.cloudflare.com/billing/manage/optimize-costs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
