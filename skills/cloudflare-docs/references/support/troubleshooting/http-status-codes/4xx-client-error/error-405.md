---
title: Error 405
description: Troubleshoot HTTP 405 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 405

## 405 Method Not Allowed

The 405 Method Not Allowed status code indicates that the origin server recognizes the requested resource but does not support the HTTP method used in the request.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This error typically occurs when the client uses an unsupported HTTP method to interact with a specific resource. The origin server must include an `Allow` header in the response, which lists the HTTP methods supported for that resource.

For example, attempting a `POST` request on a resource that is unchangeable and only supports `GET` requests will result in a `405` error.

### Cloudflare-specific information

Cloudflare does not directly generate `405` errors. These errors are returned by the origin server when it does not allow the HTTP method used in the request. If you encounter a `405` error, review the configuration of your origin server to ensure the correct methods are enabled for the resource in question.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-405/","name":"Error 405"}}]}
```
