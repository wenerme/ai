---
description: Distribute traffic across multiple servers for reliability and performance.
title: Balance traffic across origins
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Balance traffic across origins

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/performance/load-balancing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If a single origin server handles all your traffic, any failure or overload takes your application offline. Cloudflare's load balancing distributes traffic across multiple origins with health checks and automatic failover.

## Solutions

### Load balancing

Distribute traffic across origins with health checks and failover. [Learn more about load balancing](https://developers.cloudflare.com/load-balancing/).

* **Traffic distribution** \- Spread incoming load across multiple origin servers using weighted or latency-based policies
* **Failover** \- Reroute traffic to healthy origins instantly when a server fails its health check
* **Geographic steering** \- Route users to the nearest or best-performing origin based on latency or geography

### Health checks

Monitor origin server health and availability. [Learn more about health checks](https://developers.cloudflare.com/health-checks/).

* **Health monitoring** \- Continuously probe origins and automatically remove unhealthy servers from rotation

## Get started

1. [Create a load balancer](https://developers.cloudflare.com/load-balancing/get-started/)
2. [Configure health checks](https://developers.cloudflare.com/health-checks/get-started/)
3. [Set up steering policies](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/performance/load-balancing/#page","headline":"Balance traffic across origins · Cloudflare use cases","description":"Distribute traffic across multiple servers for reliability and performance.","url":"https://developers.cloudflare.com/use-cases/performance/load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
