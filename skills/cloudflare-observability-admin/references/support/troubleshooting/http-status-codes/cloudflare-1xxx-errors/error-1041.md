---
description: Troubleshoot Cloudflare 1041 error code.
title: Error 1041
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1041

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1041: Invalid request rewrite (invalid header value)

This error indicates that the header value is not valid.

### Common causes

The added/modified header value is too long or it contains characters that are not allowed.

### Resolution

* Use a shorter value or expression to define the header value.
* Remove the characters that are not allowed. Refet to [Format of HTTP request header names and values](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/) in Developer Docs for more information on the allowed characters.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/#page","headline":"Error 1041 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1041 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
