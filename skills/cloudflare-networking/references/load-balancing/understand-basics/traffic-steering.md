---
description: Control how traffic is distributed across pools and origins.
title: Traffic steering
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

#  Traffic steering

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

When requests come to your load balancer, it distributes them across your pools and endpoints according to three factors:

1. [Pool and endpoint health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/): Traffic decisions start with which pools and endpoints are available and should receive traffic.
2. [Global traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/): Policies set on your [load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/) that route traffic to attached and available pools.
3. [Local traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/): These are policies set on each [pool](https://developers.cloudflare.com/load-balancing/pools/) that route traffic to available endpoints within the pool.

When a pool or endpoint becomes unhealthy, your load balancer and pools redistribute traffic according to these same policies.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/#page","headline":"Traffic steering · Cloudflare Load Balancing docs","description":"Control how traffic is distributed across pools and origins.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
