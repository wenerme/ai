---
title: Cache content globally
description: Reduce origin load and latency by caching static and dynamic content at 300+ Cloudflare edge locations.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/performance/caching.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cache content globally

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/performance/caching/","name":"Cache content globally"}}]}
```
