---
description: How APO caches dynamic WordPress content at the Cloudflare edge.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Automatic Platform Optimization (APO), Cloudflare serves your entire site from our edge network, ensuring customers see improved performance when visiting your site. Cloudflare typically only caches static content, but with APO, we can also cache dynamic content — like HTML — to serve the entire site from the cache. This process removes round trips from the origin to drastically improve time to first byte (TTFB) along with other site performance metrics. In addition to caching dynamic content, APO caches third-party scripts to further reduce the number of requests that leave Cloudflare's edge network.

With APO, you can manage your WordPress site as normal. Whenever you update content in WordPress, Cloudflare updates content on our edge to prevent serving stale content when you use Cloudflare's WordPress plugin. Additionally, for logged-in or administrator users, we bypass the cache to ensure that private content is not cached and served to other visitors. Find more about [what APO can do for you. ↗](https://www.youtube.com/watch?v=DWANhxoDxFI?feature=youtu.be)

## Limitations

Automatic Platform Optimization is not compatible with Enterprise [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) when a subdomain, for example, `www` is in a different zone to the apex domain.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/about/#page","headline":"About · Cloudflare Automatic Platform Optimization docs","description":"How APO caches dynamic WordPress content at the Cloudflare edge.","url":"https://developers.cloudflare.com/automatic-platform-optimization/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
