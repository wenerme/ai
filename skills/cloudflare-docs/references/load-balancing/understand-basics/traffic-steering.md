---
title: Traffic steering
description: Control how traffic is distributed across pools and origins.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Traffic steering

When requests come to your load balancer, it distributes them across your pools and endpoints according to three factors:

1. [Pool and endpoint health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/): Traffic decisions start with which pools and endpoints are available and should receive traffic.
2. [Global traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/): Policies set on your [load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/) that route traffic to attached and available pools.
3. [Local traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/): These are policies set on each [pool](https://developers.cloudflare.com/load-balancing/pools/) that route traffic to available endpoints within the pool.

When a pool or endpoint becomes unhealthy, your load balancer and pools redistribute traffic according to these same policies.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}}]}
```
