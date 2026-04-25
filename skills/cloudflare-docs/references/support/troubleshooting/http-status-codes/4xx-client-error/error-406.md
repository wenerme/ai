---
title: Error 406
description: Troubleshoot HTTP 406 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 406

## 406 Not Acceptable

The `406 Not Acceptable` status code indicates that the requested resource is not available in a format that adheres to the content negotiation headers specified by the client (for example, `Accept-Charset` or `Accept-Language`).

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

For example, if a client requests content in a specific language or character set that the server does not support, this error will be generated. To avoid returning a `406` error, the server can instead serve the less preferred method to the client's User-Agent, rather than rejecting the request.

### Cloudflare-specific information

Cloudflare does not generate `406` errors directly but can proxy these responses from the origin server. If content negotiation issues occur, they are typically related to configurations at the origin server, such as language or character set settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-406/","name":"Error 406"}}]}
```
