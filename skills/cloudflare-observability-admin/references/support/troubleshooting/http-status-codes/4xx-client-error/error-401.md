---
description: Troubleshoot HTTP 401 error responses.
title: Error 401
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 401

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-401/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 401 Unauthorized

This error indicates that the request was not sent with the proper authentication credentials. The server requires authentication to process the request.

For more details, refer to [RFC 7235 ↗](https://tools.ietf.org/html/rfc7235).

### Common use cases

A `401 Unauthorized` error occurs when the client fails to provide valid authentication credentials. The server responds with at least one challenge in the form of a `WWW-Authenticate` header field, as outlined in [section 4.1 ↗](https://datatracker.ietf.org/doc/html/rfc7235#section-4.1).

If the client resends the request with the same credentials and the challenge remains unchanged, the server may return an entity to assist the client in identifying the correct credentials needed.

### Cloudflare-specific information

When encountering a `401` error while using the Cloudflare API, ensure that you are providing the correct authentication credentials (for example, [API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) or [keys](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/)). Double-check that the credentials are active and properly formatted. If the error persists, refer to the `WWW-Authenticate` header in the response for guidance on resolving the issue.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-401/#page","headline":"Error 401 · Cloudflare Support docs","description":"Troubleshoot HTTP 401 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-401/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
