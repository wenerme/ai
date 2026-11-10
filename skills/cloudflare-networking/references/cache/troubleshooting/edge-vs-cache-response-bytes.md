---
description: "In HTTP request logs, cacheResponseBytes and edgeResponseBytes both count the response body as Cloudflare delivered it to the client. They differ only in which response headers they count:"
title: edgeResponseBytes and cacheResponseBytes discrepancy
image: https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/og.png?v=7cfd5e1933c19659
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# edgeResponseBytes and cacheResponseBytes discrepancy

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In [HTTP request logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/), `cacheResponseBytes` and `edgeResponseBytes` both count the response body as Cloudflare delivered it to the client. They differ only in which response headers they count:

- `cacheResponseBytes`: the response headers Cloudflare received from cache or origin, plus the response body as delivered to the client.
- `edgeResponseBytes`: the response headers sent to the client, after any header modifications, plus the response body as delivered to the client.

Neither field records the body size as received from the origin. If the origin sends a pre-compressed body (for example, `Content-Encoding: gzip` or `br`) and the client accepts that encoding, both fields count the compressed body. If Cloudflare decompresses the body, for example because the client does not accept the encoding or a feature needs to modify the HTML, both fields count the body as delivered: uncompressed, or re-compressed.

Because both fields count the same body, any difference between `edgeResponseBytes` and `cacheResponseBytes` comes from response headers. The header size counted in `cacheResponseBytes` can be larger than the headers your origin sent.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/#page","headline":"edgeResponseBytes and cacheResponseBytes discrepancy","description":"In HTTP request logs, cacheResponseBytes and edgeResponseBytes both count the response body as Cloudflare delivered it to the client. They differ only in which response headers they count:","url":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/","inLanguage":"en","image":"https://developers.cloudflare.com/cache/troubleshooting/edge-vs-cache-response-bytes/og.png?v=7cfd5e1933c19659","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
