---
description: Troubleshoot HTTP 412 error responses.
title: Error 412
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 412

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-412/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 412 Precondition Failed

The `412 Precondition Failed` status code indicates that the server denies the request because the resource does not meet the conditions specified by the client.

For more details, refer to [RFC 7232 ↗](https://tools.ietf.org/html/rfc7232).

### Common use cases

One common use case for the `412 Precondition Failed` status code is version control. For example, a client modifying an existing resource may set the `If-Unmodified-Since` header to ensure the resource has not been changed since the client downloaded it for editing. If another client edits the resource after the specified date but before the original client uploads their changes, the server will return a `412` response to prevent overwriting the newer updates.

### Cloudflare-specific information

Cloudflare may serve this response: for more information please refer to [ETag Headers](https://developers.cloudflare.com/cache/reference/etag-headers/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-412/#page","headline":"Error 412 · Cloudflare Support docs","description":"Troubleshoot HTTP 412 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-412/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
