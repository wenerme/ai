---
title: Error 401
description: Troubleshoot HTTP 401 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 401

## 401 Unauthorized

This error indicates that the request was not sent with the proper authentication credentials. The server requires authentication to process the request.

For more details, refer to [RFC 7235 ↗](https://tools.ietf.org/html/rfc7235).

### Common use cases

A `401 Unauthorized` error occurs when the client fails to provide valid authentication credentials. The server responds with at least one challenge in the form of a `WWW-Authenticate` header field, as outlined in [section 4.1 ↗](https://datatracker.ietf.org/doc/html/rfc7235#section-4.1).

If the client resends the request with the same credentials and the challenge remains unchanged, the server may return an entity to assist the client in identifying the correct credentials needed.

### Cloudflare-specific information

When encountering a `401` error while using the Cloudflare API, ensure that you are providing the correct authentication credentials (for example, [API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) or [keys](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/)). Double-check that the credentials are active and properly formatted. If the error persists, refer to the `WWW-Authenticate` header in the response for guidance on resolving the issue.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-401/","name":"Error 401"}}]}
```
