---
title: Error 412
description: The 412 Precondition Failed status code indicates that the server denies the request because the resource does not meet the conditions specified by the client.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 412

## 412 Precondition Failed

The `412 Precondition Failed` status code indicates that the server denies the request because the resource does not meet the conditions specified by the client.

For more details, refer to [RFC 7232 ↗](https://tools.ietf.org/html/rfc7232).

### Common use cases

One common use case for the `412 Precondition Failed` status code is version control. For example, a client modifying an existing resource may set the `If-Unmodified-Since` header to ensure the resource has not been changed since the client downloaded it for editing. If another client edits the resource after the specified date but before the original client uploads their changes, the server will return a `412` response to prevent overwriting the newer updates.

### Cloudflare-specific information

Cloudflare may serve this response: for more information please refer to [ETag Headers](https://developers.cloudflare.com/cache/reference/etag-headers/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-412/","name":"Error 412"}}]}
```
