---
description: Troubleshoot HTTP 408 error responses.
title: Error 408
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 408

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-408/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 408 Request Timeout

The `408 Request Timeout` status code indicates that the origin server did not receive the complete request within a reasonable time frame and does not wish to continue waiting for the connection. This response is not commonly used, as servers often prefer to use the "close" connection option to terminate idle connections

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This error typically occurs when a client fails to send a complete request within the server's timeout period. Common scenarios include slow network connections, server overload or client-side delays to complete the request.

### Cloudflare-specific information

If a `408` error occurs on a Cloudflare-powered site, it is most often being proxied from the origin. In these cases, it is essential to review the origin server's timeout settings and ensure that the server is not overloaded. Additionally, verify that the client's Internet connection is stable and that the request is being sent promptly.

Cloudflare may return a `408` error response if public client requests to our network exceed certain internally-defined timeouts. These timeouts are configured as a protective measure and cannot be changed.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-408/#page","headline":"Error 408 · Cloudflare Support docs","description":"Troubleshoot HTTP 408 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-408/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
