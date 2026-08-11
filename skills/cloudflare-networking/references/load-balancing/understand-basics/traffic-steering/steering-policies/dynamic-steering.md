---
description: Route traffic to the fastest pool based on health check latency.
title: Dynamic
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

**Dynamic steering** uses health monitor data to identify the fastest pool for a given Cloudflare Region or data center.

Dynamic steering creates Round Trip Time (RTT) profiles based on an exponential weighted moving average (EWMA) of RTT to determine the fastest pool. If there is no current RTT data for your pool in a region or colocation center, Cloudflare directs traffic to the pools in failover order.

RTT values are collected each time a health probe request is made and based on the response from the endpoint to the monitor request. When a request is made, Cloudflare inspects the RTT data and uses it to sort pools by their RTT values.

When enabling Dynamic steering the first time for a pool, allow 10 minutes for the change to take effect while Cloudflare builds an RTT profile for that pool.

For TCP health monitors, calculated latency may not reflect the true latency to the endpoint if you are terminating TCP at a cloud provider edge location.

The diagram below shows how Cloudflare would route traffic to the pool with the lowest EWMA among three regions: Eastern North America, Europe, and Australia. In this case, the ENAM pool is selected because it has the lowest RTT.

![Dynamic steering routes traffic to the fastest available pool](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=960,height=973,format=webp/_astro/traffic-steering-2.CEeFHZfg.png)

Note

To ensure dynamic steering works as expected, the [Health Monitor Region](https://developers.cloudflare.com/load-balancing/monitors/#health-monitor-regions) must be set to **All Regions**. The Enterprise-only **All Data Centers** option is also a viable alternative.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/#page","headline":"Dynamic steering · Cloudflare Load Balancing docs","description":"Route traffic to the fastest pool based on health check latency.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
