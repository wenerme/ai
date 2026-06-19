---
title: Error 530
description: Troubleshoot HTTP 530 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Error 530

## Error 530

This error indicates that Cloudflare is unable to resolve the origin hostname, preventing it from establishing a connection to the origin server.

### Common causes

An HTTP error `530` is returned when Cloudflare is encountering an issue resolving the origin hostname. In this case the body of the response contains an [1XXX error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/) code.

### Resolution

Refer to the specific [1XXX error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/) for troubleshooting information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-530/#page","headline":"Error 530 · Cloudflare Support docs","description":"Troubleshoot HTTP 530 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-530/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-530/","name":"Error 530"}}]}
```
