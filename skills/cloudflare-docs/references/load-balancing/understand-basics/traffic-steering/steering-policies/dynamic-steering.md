---
title: Dynamic
description: Route traffic to the fastest pool based on health check latency.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dynamic

**Dynamic steering** uses health monitor data to identify the fastest pool for a given Cloudflare Region or data center.

Dynamic steering creates Round Trip Time (RTT) profiles based on an exponential weighted moving average (EWMA) of RTT to determine the fastest pool. If there is no current RTT data for your pool in a region or colocation center, Cloudflare directs traffic to the pools in failover order.

RTT values are collected each time a health probe request is made and based on the response from the endpoint to the monitor request. When a request is made, Cloudflare inspects the RTT data and uses it to sort pools by their RTT values.

When enabling Dynamic steering the first time for a pool, allow 10 minutes for the change to take effect while Cloudflare builds an RTT profile for that pool.

For TCP health monitors, calculated latency may not reflect the true latency to the endpoint if you are terminating TCP at a cloud provider edge location.

The diagram below shows how Cloudflare would route traffic to the pool with the lowest EWMA among three regions: Eastern North America, Europe, and Australia. In this case, the ENAM pool is selected because it has the lowest RTT.

![Dynamic steering routes traffic to the fastest available pool](https://developers.cloudflare.com/_astro/traffic-steering-2.CEeFHZfg_5RxfF.webp) 

Note

To ensure dynamic steering works as expected, the [Health Monitor Region](https://developers.cloudflare.com/load-balancing/monitors/#health-monitor-regions) must be set to **All Regions**. The Enterprise-only **All Data Centers** option is also a viable alternative.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/","name":"Global traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/","name":"Dynamic"}}]}
```
