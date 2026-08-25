---
description: In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.
title: edgeResponseBytes and cacheResponseBytes discrepancy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# edgeResponseBytes and cacheResponseBytes discrepancy

Last updated Jun 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In [HTTP request logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/), `cacheResponseBytes` reflects the uncompressed response size from cache or origin. `edgeResponseBytes` reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, `edgeResponseBytes` is typically smaller than `cacheResponseBytes`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/#page","headline":"edgeResponseBytes and cacheResponseBytes discrepancy · Cloudflare Cache (CDN) docs","description":"In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.","url":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
