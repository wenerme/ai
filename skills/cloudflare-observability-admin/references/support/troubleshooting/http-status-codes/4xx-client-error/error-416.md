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

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 416 Range Not Satisfiable

The `416 Range Not Satisfiable` status code indicates that the server cannot fulfill the byte range specified in the request's `Range` header.

For more details, refer to [RFC 9110 ↗](https://www.rfc-editor.org/rfc/rfc9110.html#name-416-range-not-satisfiable).

### Common use cases

This error can occur when every requested byte range falls outside the selected resource. It can also occur when the server does not support the requested range unit.

A `416` response to a byte-range request should include a `Content-Range` header. The header uses `bytes */<LENGTH>`, where `<LENGTH>` is the current resource length.

### Cloudflare-specific information

Cloudflare can return a `416` response when the origin rejects a range request. Cloudflare can also generate this response when a cached resource cannot satisfy the requested range.

Cloudflare does not cache `416` responses returned by an origin server. This applies even when the response includes explicit cache directives or a matching Cache Rule sets a [Status Code TTL](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code/) for `416`. This behavior prevents one unsatisfiable range request from affecting later requests for the same URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/#page","headline":"Error 416 · Cloudflare Support docs","description":"Troubleshoot HTTP 416 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-416/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
