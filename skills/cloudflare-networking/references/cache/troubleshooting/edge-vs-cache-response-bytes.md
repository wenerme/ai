---
description: In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.
title: edgeResponseBytes and cacheResponseBytes discrepancy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

#  edgeResponseBytes and cacheResponseBytes discrepancy

Last updated Jun 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

In [HTTP request logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/), `cacheResponseBytes` reflects the uncompressed response size from cache or origin. `edgeResponseBytes` reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, `edgeResponseBytes` is typically smaller than `cacheResponseBytes`.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/#page","headline":"edgeResponseBytes and cacheResponseBytes discrepancy · Cloudflare Cache (CDN) docs","description":"In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.","url":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
