---
description: Understand anycast routing to non-local data centers.
title: Cloudflare traffic not being sent to the geographically closest data center
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare traffic not being sent to the geographically closest data center

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Due to the way routing on [Cloudflare's Anycast network ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) works, requests may be sent to data center locations that are not necessarily the closest geographically. We are continuously adding capacity to our global network and enhancing our automated traffic engineering systems to intelligently manage congestion and other network events. While we always strive to provide the best possible performance by serving traffic from the closest location, our top priority is reliability.

In instances where performance and reliability are in conflict, our systems are designed to prioritize a stable connection over a local one.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/#page","headline":"Cloudflare traffic not being sent to the geographically closest data center · Cloudflare Support docs","description":"Understand anycast routing to non-local data centers.","url":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
