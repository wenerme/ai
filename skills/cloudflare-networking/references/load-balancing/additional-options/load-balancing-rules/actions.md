---
description: Actions available in custom load balancing rules.
title: Actions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Actions

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Add **actions** to customize how your load balancer responds to certain HTTP requests.

Each load balancing rule includes one or more actions.

## Supported Actions

This table lists the actions available for Load Balancing rules. For a walkthrough, refer to [Create Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/create-rules/).

| Action           | Options             | Description                                                                                                                                                                                             |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Fixed response_ | _N/A_               | Respond to the request with an HTTP status code and an optional message.                                                                                                                                |
| _Override_       | _Session affinity_  | Set the [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) for the request. You can customize cookie behavior and session time-to-live (TTL).     |
| _Override_       | _Load balancer TTL_ | Customize the load balancer session time-to-live (TTL).                                                                                                                                                 |
| _Override_       | _Steering policy_   | Update the [steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) associated with your load balancer.                                |
| _Override_       | _Fallback pool_     | Update the [fallback pools](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#off---failover) associated with your load balancer. |
| _Override_       | _Pools_             | Update the [pools](https://developers.cloudflare.com/load-balancing/pools/) associated with your load balancer.                                                                                         |
| _Override_       | _Region pools_      | Update the [region pools](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/) associated with your load balancer.                      |
| _Override_       | _Terminates_        | Stop processing Load Balancing rules and apply the current load balancing logic to the request.                                                                                                         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/#page","headline":"Load Balancing actions · Cloudflare Load Balancing docs","description":"Actions available in custom load balancing rules.","url":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
