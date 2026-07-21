---
title: edgeResponseBytes and cacheResponseBytes discrepancy
description: In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# edgeResponseBytes and cacheResponseBytes discrepancy

In [HTTP request logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/), `cacheResponseBytes` reflects the uncompressed response size from cache or origin. `edgeResponseBytes` reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, `edgeResponseBytes` is typically smaller than `cacheResponseBytes`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/#page","headline":"edgeResponseBytes and cacheResponseBytes discrepancy · Cloudflare Cache (CDN) docs","description":"In HTTP request logs, cacheResponseBytes reflects the uncompressed response size from cache or origin. edgeResponseBytes reflects the final compressed response size sent to the client. Because Cloudflare applies compression (gzip, Brotli) before delivering to the client, edgeResponseBytes is typically smaller than cacheResponseBytes.","url":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/troubleshooting/edge-vs-cache-response-bytes/","name":"edgeResponseBytes and cacheResponseBytes discrepancy"}}]}
```
