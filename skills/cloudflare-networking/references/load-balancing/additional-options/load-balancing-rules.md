---
description: Customize load balancing behavior with custom rules.
title: Custom load balancing rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom load balancing rules

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Custom load balancing rules let you customize the behavior of your load balancer based on the characteristics of a request.

For example, you can use URL-based routing, or create a rule that selects a pool based on the URI path of an HTTP request.

## How custom rules work

As with [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), each load balancing custom rule is a combination of two elements: an [expression](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/) and an [action](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/). Expressions define the criteria for an HTTP request to trigger an action. The action tells Cloudflare how to handle the request.

You can [create Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/create-rules/) whenever you create or edit a load balancer in **Load Balancing**.

When building expressions for Load Balancing rules, refer to [Supported fields and operators](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/) for definitions and usage.

## Availability

By default, non-Enterprise customers have **one** Load Balancing rule **per load balancer hostname**. For more rules, upgrade to [Enterprise ↗](https://www.cloudflare.com/enterprise/).

## Limitations

At the moment, you cannot use Load Balancing rules with [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/about/load-balancer/).

Custom load balancing rules are incompatible with [Geo steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/). As a result, any custom rule applied to Geo-steered load balancers will not function as expected.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/#page","headline":"Custom rules · Cloudflare Load Balancing docs","description":"Customize load balancing behavior with custom rules.","url":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
