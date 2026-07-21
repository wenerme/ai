---
description: Troubleshoot HTTP 409 error responses.
title: Error 409
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 409

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-409/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## 409 Conflict

The `409 Conflict` status code indicates that the request could not be completed due to a conflict with the current state of the target resource.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This error typically happens with a `PUT` request when multiple clients are attempting to edit the same resource. To solve this issue:

* The server should generate a payload that includes enough information for the client to recognize the source of the conflict.
* Clients should retry the request again after resolving the conflict.

### Cloudflare-specific information

Cloudflare will return a 409 response for a [Error 1001: DNS Resolution Error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-409/#page","headline":"Error 409 · Cloudflare Support docs","description":"Troubleshoot HTTP 409 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-409/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
