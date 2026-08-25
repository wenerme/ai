---
description: Learn about account-level load balancing in this guide.
title: Account-level load balancing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Account-level load balancing

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/load-balancing/planning/multiple-zones/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to set up load balancing for multiple hostnames or domains within your account, your approach would depend on the requirements for each hostname.

## Shared configurations

If you want to share a load balancing configuration across multiple hostnames, you can use the same load balancer through `CNAME` routing.

1. When you [set up](https://developers.cloudflare.com/learning-paths/load-balancing/setup/) the load balancer, create the load balancer on a new hostname (`lb.example.com`).
2. When you are ready to [route production traffic](https://developers.cloudflare.com/learning-paths/load-balancing/setup/production-traffic/), [create](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` record on a hostname that points to the load balancer created in step 1 (`lb.example.com`).
3. Repeat steps 1 and 2 with all other hostnames.

Note

You could also achieve the same goal or create more advanced routing decisions by setting up DNS Overrides within [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) on each hostname that override the hostname to `lb.example.com`.

## Unique configurations

If each zone needs unique load balancer configurations (failover order, routing), you should create separate load balancers. Since pools and monitors are configured at the account level, even different load balancers can share the same pools and monitors.

For simpler routing, create a load balancer on each hostname.

For more advanced routing, create multiple load balancers and then set up [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) to route traffic to each load balancer based on specific characteristics of the request.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/multiple-zones/#page","headline":"Account-level load balancing · Cloudflare Learning Paths","description":"Learn about account-level load balancing in this guide.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/multiple-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
