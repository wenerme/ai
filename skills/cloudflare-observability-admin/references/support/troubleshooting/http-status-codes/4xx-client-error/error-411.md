---
description: Troubleshoot HTTP 411 error responses.
title: Error 411
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 411

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-411/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 411 Length Required

The `411 Length Required` status code indicates that the client did not specify the `Content-Length` of the request body in the headers, and this information is required to obtain the resource. The client may resend the request after adding the required header field.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This status code can occur in various scenarios, such as when a client sends an API request without the required `Content-Length` header, when uploading a file where the server needs the header to allocate resources, or when proxies or legacy systems enforce strict HTTP compliance. In each case, the server or intermediary requires the `Content-Length` header to process the request properly.

### Cloudflare-specific information

Cloudflare does not generate `411` for customer websites, we only proxy the request from the origin server. If you encounter a `411` error on a Cloudflare-powered site, the issue lies with the origin server. In such cases, contact your hosting provider for assistance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-411/#page","headline":"Error 411 · Cloudflare Support docs","description":"Troubleshoot HTTP 411 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-411/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
