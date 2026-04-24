---
title: Error 411
description: Troubleshoot HTTP 411 error responses.
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

# Error 411

## 411 Length Required

The `411 Length Required` status code indicates that the client did not specify the `Content-Length` of the request body in the headers, and this information is required to obtain the resource. The client may resend the request after adding the required header field.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This status code can occur in various scenarios, such as when a client sends an API request without the required `Content-Length` header, when uploading a file where the server needs the header to allocate resources, or when proxies or legacy systems enforce strict HTTP compliance. In each case, the server or intermediary requires the `Content-Length` header to process the request properly.

### Cloudflare-specific information

Cloudflare does not generate `411` for customer websites, we only proxy the request from the origin server. If you encounter a `411` error on a Cloudflare-powered site, the issue lies with the origin server. In such cases, contact your hosting provider for assistance.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-411/","name":"Error 411"}}]}
```
