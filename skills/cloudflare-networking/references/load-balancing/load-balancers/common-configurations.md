---
description: Common load balancer configurations for active-active and failover.
title: Common configurations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Common configurations

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Consider the following sections to understand how to achieve some commonly used load balancer configurations.

This page assumes you understand the Cloudflare [Load Balancing components](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/) and how to create and edit each of them.

## Active - Passive Failover

An **active-passive failover** sends traffic to the endpoints in your active pool until a failure threshold (configurable) is reached. At the point of failure, your load balancer then redirects traffic to the passive pool.

This setup ensures uninterrupted service and helps with planned outages, but it might lead to slower traffic overall.

To set up a load balancer with **active-passive failover**:

1. Create a load balancer with two pools (`primary` and `secondary`).
2. In the list of pools, set the following order:
  1. `primary`
  2. `secondary`
3. For **Traffic Steering**, select [**Off**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#off---failover).

With this setup, your load balancer will direct all traffic to `primary` until `primary` has fewer available endpoints than specified in its **Health Threshold**. Only then will your load balancer direct traffic to `secondary`.

In the event that all pools are marked down, Cloudflare uses the **fallback pool**, which is the option of last resort for successfully sending traffic to an endpoint. Since the fallback pool is a last resort, its health is not taken into account, and Cloudflare reports its status as **No Health**. You can select the fallback pool via the API or in the Cloudflare dashboard. For more on working with fallback pools, refer to [Pool-level steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/).

## Active - Active Failover

An **active-active failover** distributes traffic to endpoints in the same pool until the pool reaches its failure threshold (configurable). At the point of failure, your load balancer would then re-direct traffic to the **fallback pool**.

This setup speeds up overall requests, but is more vulnerable to planned or unplanned outages.

To set up a load balancer with **active-active failover**, either:

* Create a load balancer with a single pool (`primary`) with multiple endpoints (`endpoint-1` and `endpoint-2`) and set the same [**Weight**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) for each endpoint.
* Create a load balancer with two pools (`primary` and `secondary`) and — for [**Traffic Steering**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) — select any option except for **Off**.

Note

For more background reading on server failover and common configurations, refer to [our Learning Center ↗](https://www.cloudflare.com/learning/performance/what-is-server-failover/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/#page","headline":"Common configurations · Cloudflare Load Balancing docs","description":"Common load balancer configurations for active-active and failover.","url":"https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
