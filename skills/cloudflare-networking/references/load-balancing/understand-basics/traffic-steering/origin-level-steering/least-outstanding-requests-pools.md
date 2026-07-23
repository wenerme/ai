---
description: Route to the origin with the fewest active requests.
title: Least Outstanding Requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Least Outstanding Requests

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

**Least Outstanding Requests steering** allows you to route traffic to endpoints that currently have the lowest number of outstanding requests.

This steering policy selects an endpoint by taking into consideration endpoint weights, as well as each endpoint's number of in-flight requests. Endpoints with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests steering is best to use if your endpoints are easily overwhelmed by a spike in concurrent requests. It supports [adaptive routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/) and [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/#page","headline":"Least Outstanding Requests steering - Endpoint-level steering · Cloudflare Load Balancing docs","description":"Route to the origin with the fewest active requests.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
