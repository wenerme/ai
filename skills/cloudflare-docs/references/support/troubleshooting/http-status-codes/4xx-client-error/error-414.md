---
title: Error 414
description: Troubleshoot HTTP 414 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 414

## 414 URI Too Long

The `414 URI Too Long` status code indicates that the server refuses to process the request because the URI provided by the client is excessively long.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

For example, if a client is attempting a `GET` request with an unusually long URI, such as one containing an excessive number of query parameters, after a `POST`, this could be seen as a security risk and a `414` is generated.

### Cloudflare-specific information

Cloudflare will generate a `414` response if the URI length exceeds 32KB.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-414/","name":"Error 414"}}]}
```
