---
description: Distribute requests randomly across origins.
title: Random
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Random

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/random-origin-steering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

**Random steering** sends requests to endpoints purely based on [endpoint weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights). Distributes traffic more accurately, but may cause requests from the same IP to hit different endpoints.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/random-origin-steering/#page","headline":"Random steering · Cloudflare Load Balancing docs","description":"Distribute requests randomly across origins.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/random-origin-steering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
