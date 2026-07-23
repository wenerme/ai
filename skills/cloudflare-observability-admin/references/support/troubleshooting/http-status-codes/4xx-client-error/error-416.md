---
description: Troubleshoot HTTP 416 error responses.
title: Error 416
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 416

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 416 Range Not Satisfiable

The `416 Range Not Satisfiable` status code indicates that the server cannot fulfill the requested range specified in the `Range` header of the client's request.

For more details, refer to [RFC 7233 ↗](https://datatracker.ietf.org/doc/html/rfc7233).

### Common use cases

This error can happen when a client requests a byte range outside the bounds of the resource, such as a range exceeding the file's total size. It can also happen if the server does not support partial content delivery or if there is a conflict between the requested range and the server's understanding of the resource, often caused by an outdated or invalid cache.

### Cloudflare-specific information

Cloudflare typically serves this response when the origin server rejects a `Range` header request for a resource. This often occurs if the requested range exceeds the size of the file, as indicated in the `Content-Range` header.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/#page","headline":"Error 416 · Cloudflare Support docs","description":"Troubleshoot HTTP 416 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
