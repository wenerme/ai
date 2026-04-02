---
title: Error 415
description: The 415 Unsupported Media Type status code indicates that the server refuses to process the request because the format of the payload is not supported. One way to identify and fix this issue would be to look at the Content-Type or Content-Encoding headers sent in the client's request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 415

## 415 Unsupported Media Type

The `415 Unsupported Media Type` status code indicates that the server refuses to process the request because the format of the payload is not supported. One way to identify and fix this issue would be to look at the `Content-Type` or `Content-Encoding` headers sent in the client's request.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This may be triggered by submitting a file type or format that the server is not configured to handle, such as uploading an unsupported image or document format, may also trigger this error.

### Cloudflare-specific information

Cloudflare typically passes this response from the origin server if it encounters an unsupported media type in the client's request payload.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-415/","name":"Error 415"}}]}
```
