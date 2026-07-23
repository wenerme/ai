---
description: Reduce origin load and latency by caching static and dynamic content at 300+ Cloudflare edge locations.
title: Cache content globally
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache content globally

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/performance/caching/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every request that reaches your origin server adds latency and costs. Cloudflare Cache serves static and dynamic content globally, reducing round-trip times for visitors and offloading traffic from your origin.

## Solutions

### Cache

Cache content at Cloudflare's global network of edge locations. [Learn more about Cache](https://developers.cloudflare.com/cache/).

* **Global distribution** \- Content cached in 300+ edge locations so visitors are served from the location nearest to them
* **Reduced latency** \- Cache hits are served directly from the edge, eliminating round-trips to your origin
* **Customizable cache rules** \- Create rules that change how Cloudflare caches content, or transforms requests
* **Origin offload** \- Regional cache tiers intercept repeated requests before they reach your origin server
* **Persistent caching** \- Long-tail content that would normally expire is kept in durable storage, reducing origin fetches for infrequently accessed assets

## Get started

1. [Configure Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
2. [Enable Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/)
3. [Set up Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/performance/caching/#page","headline":"Cache content globally · Cloudflare use cases","description":"Reduce origin load and latency by caching static and dynamic content at 300+ Cloudflare edge locations.","url":"https://developers.cloudflare.com/use-cases/performance/caching/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
