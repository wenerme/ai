---
description: Troubleshoot HTTP 417 error responses.
title: Error 417
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 417

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-417/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 417 Expectation Failed

The `417 Expectation Failed` status code indicates that the server could not meet the requirements specified in the `Expect` header of the client's request.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

Some clients use the `Expect` header, such as `Expect: 100-continue`, to verify if the server is ready to receive a large payload, and if the server cannot fulfill this expectation, it returns a 417 response. Similarly, a server may reject a request with this error if the client includes an `Expect` header with unsupported or invalid values.

### Cloudflare-specific information

Cloudflare typically forwards this response from the origin server if it encounters an issue related to unsupported or unfulfilled `Expect` headers in the client's request.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-417/#page","headline":"Error 417 · Cloudflare Support docs","description":"Troubleshoot HTTP 417 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-417/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
