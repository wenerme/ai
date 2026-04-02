---
title: Error 417
description: The 417 Expectation Failed status code indicates that the server could not meet the requirements specified in the Expect header of the client's request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 417

## 417 Expectation Failed

The `417 Expectation Failed` status code indicates that the server could not meet the requirements specified in the `Expect` header of the client's request.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

Some clients use the `Expect` header, such as `Expect: 100-continue`, to verify if the server is ready to receive a large payload, and if the server cannot fulfill this expectation, it returns a 417 response. Similarly, a server may reject a request with this error if the client includes an `Expect` header with unsupported or invalid values.

### Cloudflare-specific information

Cloudflare typically forwards this response from the origin server if it encounters an issue related to unsupported or unfulfilled `Expect` headers in the client's request.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-417/","name":"Error 417"}}]}
```
