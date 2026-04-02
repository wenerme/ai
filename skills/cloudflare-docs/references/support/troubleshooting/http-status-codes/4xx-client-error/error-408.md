---
title: Error 408
description: The 408 Request Timeout status code indicates that the origin server did not receive the complete request within a reasonable time frame and does not wish to continue waiting for the connection. This response is not commonly used, as servers often prefer to use the &#34;close&#34; connection option to terminate idle connections
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 408

## 408 Request Timeout

The `408 Request Timeout` status code indicates that the origin server did not receive the complete request within a reasonable time frame and does not wish to continue waiting for the connection. This response is not commonly used, as servers often prefer to use the "close" connection option to terminate idle connections

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This error typically occurs when a client fails to send a complete request within the server's timeout period. Common scenarios include slow network connections, server overload or client-side delays to complete the request.

### Cloudflare-specific information

If a `408` error occurs on a Cloudflare-powered site, it is most often being proxied from the origin. In these cases, it is essential to review the origin server's timeout settings and ensure that the server is not overloaded. Additionally, verify that the client's Internet connection is stable and that the request is being sent promptly.

Cloudflare may return a `408` error response if public client requests to our network exceed certain internally-defined timeouts. These timeouts are configured as a protective measure and cannot be changed.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-408/","name":"Error 408"}}]}
```
