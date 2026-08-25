---
description: Route traffic to the pool with the fewest pending requests.
title: Least Outstanding Requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Least Outstanding Requests

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

**Least Outstanding Requests steering** allows you to route traffic to pools that currently have the lowest number of outstanding requests.

This steering policy selects a pool by taking into consideration `random_steering` weights, as well as each pool's number of in-flight requests. Pools with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests steering is best to use if your pools are easily overwhelmed by a spike in concurrent requests. This steering method lends itself to applications that value server health above latency, geographic alignment, or other metrics. It takes into account the [pool's health status](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/), and [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/#page","headline":"Least Outstanding Requests steering - Steering policies · Cloudflare Load Balancing docs","description":"Route traffic to the pool with the fewest pending requests.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
