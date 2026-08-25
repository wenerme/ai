---
description: Route traffic to the nearest pool by geographic proximity.
title: Proximity
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Proximity

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/#page","headline":"Proximity steering · Cloudflare Load Balancing docs","description":"Route traffic to the nearest pool by geographic proximity.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
