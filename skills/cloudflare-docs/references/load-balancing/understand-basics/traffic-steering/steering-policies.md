---
title: Global traffic steering
description: Policies that control how traffic is distributed across pools.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/understand-basics/traffic-steering/steering-policies/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Global traffic steering

Global traffic steering policies decide how a load balancer routes traffic to attached and healthy pools.

  
* [ Standard ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/)
* [ Geo ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/)
* [ Dynamic ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/)
* [ Proximity ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/)
* [ Least Outstanding Requests ](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/)

## EDNS Client Subnet (ECS) support

 EDNS Client Subnet (ECS)  support provides customers with more control over location-based steering during gray-clouded DNS resolutions and can be used for proximity or geo (country) steering.

Customers can configure their load balancer using the `location_strategy` parameter, which includes the properties `prefer_ecs` and `mode`.

`prefer_ecs` determines whether the ECS geolocation should be preferred as the authoritative location.

| Type        | Description                                                                            |
| ----------- | -------------------------------------------------------------------------------------- |
| "always"    | Always prefers ECS.                                                                    |
| "never"     | Never prefers ECS.                                                                     |
| "proximity" | Prefers ECS only when steering\_policy="proximity".                                    |
| "geo"       | Prefers ECS only when steering\_policy="geo" and only supports country-level steering. |

`mode` determines the authoritative location when ECS is not preferred, does not exist in the request, or its geolocation lookup is unsuccessful.

| Type           | Description                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| "pop"          | Uses the Cloudflare PoP location.                                                                                       |
| "resolver\_ip" | Uses the DNS resolver geolocation data. If the geolocation lookup is unsuccessful, it uses the Cloudflare PoP location. |

Note

ECS support applies to DNS-only load balancers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/","name":"Global traffic steering"}}]}
```
