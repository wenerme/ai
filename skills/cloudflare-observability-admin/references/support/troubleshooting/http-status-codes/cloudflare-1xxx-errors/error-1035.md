---
description: Troubleshoot Cloudflare 1035 error code.
title: Error 1035
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1035

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1035/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1035: Invalid request rewrite (invalid URI path)

This error indicates an invalid URI path in a request rewrite.

### Common cause

The value or expression of your rewritten URI path is not valid.

This error also occurs when the destination of the URL rewrite is a path under `/cdn-cgi/`.

### Resolution

Make sure that the rewritten URI path is not empty and it starts with a `/` (slash) character.

For example, the following URI path rewrite expression is not valid:

`concat(lower(ip.src.country), http.request.uri.path)`

To fix the expression above, add a `/` prefix:

`concat("/", lower(ip.src.country), http.request.uri.path)`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1035/#page","headline":"Error 1035 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1035 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1035/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
