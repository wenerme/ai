---
title: Error 416
description: Troubleshoot HTTP 416 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 416

## 416 Range Not Satisfiable

The `416 Range Not Satisfiable` status code indicates that the server cannot fulfill the requested range specified in the `Range` header of the client's request.

For more details, refer to [RFC 7233 ↗](https://datatracker.ietf.org/doc/html/rfc7233).

### Common use cases

This error can happen when a client requests a byte range outside the bounds of the resource, such as a range exceeding the file's total size. It can also happen if the server does not support partial content delivery or if there is a conflict between the requested range and the server's understanding of the resource, often caused by an outdated or invalid cache.

### Cloudflare-specific information

Cloudflare typically serves this response when the origin server rejects a `Range` header request for a resource. This often occurs if the requested range exceeds the size of the file, as indicated in the `Content-Range` header.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-416/","name":"Error 416"}}]}
```
