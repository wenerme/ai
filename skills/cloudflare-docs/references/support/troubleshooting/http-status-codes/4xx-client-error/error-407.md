---
title: Error 407
description: Troubleshoot HTTP 407 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 407

## 407 Authentication Required

The `407 Proxy Authentication Required` status code indicates that the client did not provide the necessary authentication credentials to access the requested resource through a proxy server. For more details, refer to [RFC 7235 ↗](https://tools.ietf.org/html/rfc7235).

### Common use cases

This error typically occurs in environments where a proxy server is used as an intermediary between the client and the target server. To resolve this, the client must include the appropriate `Proxy-Authorization` header in the request with valid credentials.

### Cloudflare-specific information

Cloudflare does not generate `407` errors but proxies them from the origin server or an upstream proxy. If a `407` error occurs on a Cloudflare-powered site, review the origin server's proxy configuration to ensure authentication requirements are properly set, and verify that the client is providing the required credentials.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-407/","name":"Error 407"}}]}
```
