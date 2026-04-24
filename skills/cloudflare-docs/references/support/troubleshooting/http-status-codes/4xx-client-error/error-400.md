---
title: Error 400
description: Troubleshoot HTTP 400 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

# Error 400

## 400 Bad Request

This error indicates that the client sent a request to the server that could not be understood or processed due to issues with the request itself.

For more information, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

A `400 Bad Request` error occurs due to client-side issues, such as malformed request syntax, invalid request content, message framing problems, or deceptive request routing. For example:

* If the request contains a special character that is not properly [URL Encoded (or percent-encoded) ↗](https://en.wikipedia.org/wiki/Percent-encoding), an `HTTP Error 400` will be returned.
* If the request contains both `Content Length` and `Transfer Encoding` chunked, these two framing methods contradict each other. `Content Length` declares a fixed size body, while chunked encoding declares a streamed body with no known size. [RFC 7230 section 3.3.3 ↗](https://datatracker.ietf.org/doc/html/rfc7230#section-3.3.3) states that when `Transfer Encoding` is present, the `Content Length` header must be ignored and a request that includes both is considered malformed. This creates ambiguity in body framing and can enable request smuggling if different systems parse the boundary differently. Cloudflare follows the RFC and an `HTTP Error 400` will be returned.

### Cloudflare-specific information

If you encounter an HTTP error while using the [Cloudflare API](https://developers.cloudflare.com/api/), make sure that you are using the correct syntax, parameters, and body for your API call.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-400/","name":"Error 400"}}]}
```
