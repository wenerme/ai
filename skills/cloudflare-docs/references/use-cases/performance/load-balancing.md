---
title: Balance traffic across origins
description: Distribute traffic across multiple servers for reliability and performance.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/performance/load-balancing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Balance traffic across origins

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/performance/load-balancing/","name":"Balance traffic across origins"}}]}
```
