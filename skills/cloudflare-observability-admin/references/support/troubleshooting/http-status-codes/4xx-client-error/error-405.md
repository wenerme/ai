---
description: Troubleshoot HTTP 405 error responses.
title: Error 405
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 405

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-405/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## 405 Method Not Allowed

The 405 Method Not Allowed status code indicates that the origin server recognizes the requested resource but does not support the HTTP method used in the request.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This error typically occurs when the client uses an unsupported HTTP method to interact with a specific resource. The origin server must include an `Allow` header in the response, which lists the HTTP methods supported for that resource.

For example, attempting a `POST` request on a resource that is unchangeable and only supports `GET` requests will result in a `405` error.

### Cloudflare-specific information

Cloudflare does not directly generate `405` errors. These errors are returned by the origin server when it does not allow the HTTP method used in the request. If you encounter a `405` error, review the configuration of your origin server to ensure the correct methods are enabled for the resource in question.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-405/#page","headline":"Error 405 · Cloudflare Support docs","description":"Troubleshoot HTTP 405 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-405/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
