---
title: Error 451
description: Troubleshoot HTTP 451 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Error 451

## 451 Unavailable For Legal Reason

The `451` status code indicates that the server cannot deliver the requested resource due to legal actions or restrictions.

For more details, refer to [RFC 7725 ↗](https://tools.ietf.org/html/rfc7725).

### Common use cases

This occurs when access to a resource is blocked due to court orders, copyright claims, or other legal demands. Typically search engines (for example, Google) and ISP (for example, ATT) are the ones affected by this response code, rather than the origin server itself. The server should include an explanation in the response body, detailing the legal demand or reason for the restriction.

### Cloudflare-specific information

Cloudflare may pass through a `451` response from the origin server if the requested resource is legally restricted.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-451/#page","headline":"Error 451 · Cloudflare Support docs","description":"Troubleshoot HTTP 451 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-451/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-451/","name":"Error 451"}}]}
```
