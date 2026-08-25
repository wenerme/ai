---
description: Use Cloudflare as the primary DNS with zone transfers to secondaries.
title: Cloudflare as Primary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare as Primary

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With outgoing zone transfers, you can use Cloudflare as your primary DNS provider and configure one or more peer DNS servers as secondary DNS providers.

When you [make edits](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) to Cloudflare DNS, those DNS records will be transferred from Cloudflare to your secondary provider via zone transfer using [AXFR ↗](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR ↗](https://datatracker.ietf.org/doc/html/rfc1995)

![With Cloudflare as your primary provider in a multi-provider setup, Cloudflare periodically transfers records to your secondary DNS provider.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1618,height=830,format=webp/_astro/cloudflare-as-primary.CS_-J48n.png)

## How to

* [Set up outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/)

## Availability

Outgoing zone transfers are available to Enterprise customers who are currently using Cloudflare as their [authoritative DNS provider](https://developers.cloudflare.com/dns/zone-setups/full-setup/). For more details on activation and pricing, contact your account team.

## Notes

If you use [Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/), only proxied Load Balancer DNS records will be transferred.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/#page","headline":"Cloudflare as Primary · Cloudflare DNS docs","description":"Use Cloudflare as the primary DNS with zone transfers to secondaries.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
