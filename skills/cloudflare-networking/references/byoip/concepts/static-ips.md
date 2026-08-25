---
description: Assign static IPs from your prefix to specific Cloudflare services.
title: Static IPs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# Static IPs

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/byoip/concepts/static-ips/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you use Cloudflare as a [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), Cloudflare assigns shared [anycast IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) to proxied DNS records by default. These IPs can change at any time. Static IPs give you a set of specifically assigned Cloudflare IP addresses — Cloudflare will not change them without notifying you, and will typically only do so at your request.

Static IPs are useful when you need to allowlist your IPs or communicate them to third parties in advance.

Note

Although BYOIP and static IPs are different offerings, both can be managed using [Address Maps](https://developers.cloudflare.com/byoip/address-maps/).

Static IPs are allocated at the account level but can be assigned to a single zone, meaning multiple zones can share the same static IPs. You can specify which zones are mapped to your static IPs and control when the IPs for your zones change.

## Availability

Static IPs are available as an add-on purchase for Enterprise plans.

## Check Static IPs

You can find your leased Static IPs for CDN Ingress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/concepts/static-ips/#page","headline":"Static IPs · Cloudflare BYOIP docs","description":"Assign static IPs from your prefix to specific Cloudflare services.","url":"https://developers.cloudflare.com/byoip/concepts/static-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
