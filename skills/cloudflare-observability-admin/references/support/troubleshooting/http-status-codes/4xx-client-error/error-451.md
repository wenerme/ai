---
description: Troubleshoot HTTP 451 error responses.
title: Error 451
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 451

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-451/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 451 Unavailable For Legal Reason

The `451` status code indicates that the server cannot deliver the requested resource due to legal actions or restrictions.

For more details, refer to [RFC 7725 ↗](https://tools.ietf.org/html/rfc7725).

### Common use cases

This occurs when access to a resource is blocked due to court orders, copyright claims, or other legal demands. Typically search engines (for example, Google) and ISP (for example, ATT) are the ones affected by this response code, rather than the origin server itself. The server should include an explanation in the response body, detailing the legal demand or reason for the restriction.

### Cloudflare-specific information

Cloudflare may pass through a `451` response from the origin server if the requested resource is legally restricted.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-451/#page","headline":"Error 451 · Cloudflare Support docs","description":"Troubleshoot HTTP 451 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-451/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
