---
title: Least Outstanding Requests
description: Route traffic to the pool with the fewest pending requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Least Outstanding Requests

**Least Outstanding Requests steering** allows you to route traffic to pools that currently have the lowest number of outstanding requests.

This steering policy selects a pool by taking into consideration `random_steering` weights, as well as each pool's number of in-flight requests. Pools with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests steering is best to use if your pools are easily overwhelmed by a spike in concurrent requests. This steering method lends itself to applications that value server health above latency, geographic alignment, or other metrics. It takes into account the [pool's health status](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/), and [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/).

## Configure via the API

Load Balancers

```

{

  "steering_policy": "least_outstanding_requests"

}


```

Refer to the [API documentation](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/update/) for more information on the load balancer configuration.

Note

Least Outstanding Requests steering can also be configured on a pool as a [local traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/), taking into account outstanding request counts and weights for endpoints within the pool.

## Limitations

Least Outstanding Requests steering can be configured for [DNS-only load balancers](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation form. For DNS-only load balancers, all pool outstanding request counts are considered to be zero, meaning traffic is served solely based on `random_steering` weights.

Although it is configurable, it is not recommended to use Least Outstanding Requests steering for DNS-only load balancers due to its partial support.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/","name":"Global traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/","name":"Least Outstanding Requests"}}]}
```
