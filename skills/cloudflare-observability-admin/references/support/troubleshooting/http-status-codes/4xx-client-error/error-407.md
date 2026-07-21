---
description: Troubleshoot HTTP 407 error responses.
title: Error 407
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 407

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## 407 Authentication Required

The `407 Proxy Authentication Required` status code indicates that the client did not provide the necessary authentication credentials to access the requested resource through a proxy server. For more details, refer to [RFC 7235 ↗](https://tools.ietf.org/html/rfc7235).

### Common use cases

This error typically occurs in environments where a proxy server is used as an intermediary between the client and the target server. To resolve this, the client must include the appropriate `Proxy-Authorization` header in the request with valid credentials.

### Cloudflare-specific information

Cloudflare does not generate `407` errors but proxies them from the origin server or an upstream proxy. If a `407` error occurs on a Cloudflare-powered site, review the origin server's proxy configuration to ensure authentication requirements are properly set, and verify that the client is providing the required credentials.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/#page","headline":"Error 407 · Cloudflare Support docs","description":"Troubleshoot HTTP 407 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
