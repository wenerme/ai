---
description: Load balance traffic across WAN tunnel endpoints.
title: Load Balancing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Load Balancing

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/load-balancing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your network has multiple paths to the same destination — for example, redundant tunnels to a data center — you can use Cloudflare Load Balancing to distribute traffic across those paths. This prevents any single path from becoming a bottleneck and allows traffic to fail over automatically if a path goes down.

Cloudflare WAN (formerly Magic WAN) uses Private Network Load Balancing, which balances traffic across your private network endpoints. It supports both on-ramping (traffic entering Cloudflare's network) and off-ramping (traffic exiting to your sites).

Refer to [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) for more information about the feature and how to set it up. Before using this feature, [enable Load Balancing](https://developers.cloudflare.com/load-balancing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/load-balancing/#page","headline":"Load Balancing · Cloudflare WAN docs","description":"Load balance traffic across WAN tunnel endpoints.","url":"https://developers.cloudflare.com/cloudflare-wan/load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
