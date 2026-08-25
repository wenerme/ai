---
description: Troubleshoot HTTP 407 error responses.
title: Error 407
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 407

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 407 Authentication Required

The `407 Proxy Authentication Required` status code indicates that the client did not provide the necessary authentication credentials to access the requested resource through a proxy server. For more details, refer to [RFC 7235 ↗](https://tools.ietf.org/html/rfc7235).

### Common use cases

This error typically occurs in environments where a proxy server is used as an intermediary between the client and the target server. To resolve this, the client must include the appropriate `Proxy-Authorization` header in the request with valid credentials.

### Cloudflare-specific information

Cloudflare does not generate `407` errors but proxies them from the origin server or an upstream proxy. If a `407` error occurs on a Cloudflare-powered site, review the origin server's proxy configuration to ensure authentication requirements are properly set, and verify that the client is providing the required credentials.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/#page","headline":"Error 407 · Cloudflare Support docs","description":"Troubleshoot HTTP 407 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-407/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
