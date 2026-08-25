---
description: Optimize caching to reduce origin load.
title: Optimize caching
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize caching

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The more content is cached, the fewer requests go back to your origin server (whether due to legitimate or illegitimate traffic).

A few ways to optimize Cloudflare caching include:

* Creating [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to customize the cache properties of specific HTTP requests.
* Enabling the [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) feature, which dramatically increases cache hit ratios.
* Reviewing our other various [configuration options](https://developers.cloudflare.com/cache/get-started/), which may vary based on your plan and application setup.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/#page","headline":"Optimize caching · Cloudflare Learning Paths","description":"Optimize caching to reduce origin load.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
