---
description: Troubleshoot Cloudflare 1040 error code.
title: Error 1040
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1040

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1040/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1040: Invalid request rewrite (header modification not allowed)

This error indicates that an attempt was made to modify a restricted HTTP header.

### Common cause

You are trying to modify an HTTP header that Request Header Transform Rules cannot change.

### Resolution

Make sure you are not trying to modify one of the [reserved HTTP request headers](https://developers.cloudflare.com/rules/transform/request-header-modification/#important-remarks).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1040/#page","headline":"Error 1040 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1040 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1040/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
