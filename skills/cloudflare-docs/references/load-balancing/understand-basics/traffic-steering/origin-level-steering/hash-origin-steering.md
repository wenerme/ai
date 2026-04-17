---
title: Hash
description: Distribute requests using hash-based origin steering.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Hash

**Hash steering** guides Cloudflare to send requests to endpoints based on a combination of [endpoint weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) and previous requests from that IP address. Ensures requests from the same IP address will hit the same endpoint, but actual traffic distribution may differ from endpoint weights.

## Limitation when using Workers

Hash Steering relies on the `x-forwarded-for` header to determine the originating IP address of a request. However, when a [Cloudflare Worker](https://developers.cloudflare.com/workers/) is used in front of a load balancer, this can affect how Hash Steering functions.

When a request originates from a browser, it lacks an `x-forwarded-for` header, but if a Worker proxies the request to a load balancer, the header is populated with the Worker's IP instead of the original client IP. Since the Worker's IP — often a Cloudflare public IP — can change between requests, Hash Steering may direct the same client's requests to different endpoints, leading to inconsistent traffic routing.

### Workaround

To ensure Hash Steering works correctly when using a Worker in front of a Load Balancer, manually set the `x-forwarded-for` header in the Worker to the client's original IP address. By manually setting `x-forwarded-for` to `CF-Connecting-IP`, Hash Steering will function as expected, ensuring traffic consistency for end users.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/","name":"Local traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering/","name":"Hash"}}]}
```
