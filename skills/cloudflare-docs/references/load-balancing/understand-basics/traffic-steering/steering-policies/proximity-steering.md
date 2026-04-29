---
title: Proximity
description: Route traffic to the nearest pool by geographic proximity.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proximity

**Proximity steering** routes visitors or internal services to the closest physical data center.

To use proximity steering on a load balancer, you first need to add GPS coordinates to each pool.

## When to add proximity steering

* For new pools, add GPS coordinates when you create a pool.
* For existing pools, add GPS coordinates when [managing pools](https://developers.cloudflare.com/load-balancing/pools/create-pool/#edit-a-pool) or in the **Add Traffic steering** step of [creating a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/).

## How to add proximity steering

To add coordinates when creating or editing a pool:

1. Click the _Configure coordinates for Proximity Steering_ dropdown.
2. Enter the latitude and longitude or drag a marker on the map.
3. Select **Save**.

Warning:

For accurate proximity steering, add GPS coordinates to all pools within the same load balancer.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/","name":"Global traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/","name":"Proximity"}}]}
```
