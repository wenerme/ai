---
title: Error 1041
description: Troubleshoot Cloudflare 1041 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Error 1041

## Error 1041: Invalid request rewrite (invalid header value)

This error indicates that the header value is not valid.

### Common causes

The added/modified header value is too long or it contains characters that are not allowed.

### Resolution

* Use a shorter value or expression to define the header value.
* Remove the characters that are not allowed. Refet to [Format of HTTP request header names and values](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/) in Developer Docs for more information on the allowed characters.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/#page","headline":"Error 1041 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1041 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1041/","name":"Error 1041"}}]}
```
