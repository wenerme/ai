---
title: Least Outstanding Requests
description: Route to the origin with the fewest active requests.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Least Outstanding Requests

**Least Outstanding Requests steering** allows you to route traffic to endpoints that currently have the lowest number of outstanding requests.

This steering policy selects an endpoint by taking into consideration endpoint weights, as well as each endpoint's number of in-flight requests. Endpoints with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests steering is best to use if your endpoints are easily overwhelmed by a spike in concurrent requests. It supports [adaptive routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/) and [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/).

## Configure via the API

Pools

```

{

  "origin_steering": {

    "policy": "least_outstanding_requests"

  }

}


```

Refer to the [API documentation](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/update/) for more information on the pool configuration.

Note

Least Outstanding Requests steering can also be configured on a load balancer as a [global traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/), taking into account outstanding request counts and `random_steering` weights for pools on the load balancer.

## Limitations

Least Outstanding Requests steering can be configured for pools that are part of [DNS-only load balancers](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation form. When endpoint steering logic is applied for a pool on a DNS-only load balancer, all endpoint outstanding request counts are considered to be zero, meaning traffic is served solely based on endpoint weights.

Although it is configurable, it is not recommended to associate pools that use Least Outstanding Requests steering with DNS-only load balancers due to its partial support.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/","name":"Local traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/","name":"Least Outstanding Requests"}}]}
```
