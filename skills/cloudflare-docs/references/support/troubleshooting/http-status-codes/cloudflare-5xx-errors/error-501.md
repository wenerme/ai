---
title: Error 501
description: Troubleshoot HTTP 501 error responses.
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

# Error 501

## Error 501: not implemented

Cloudflare Workers returns a `501` error when a request uses an HTTP method that is not supported by the Workers Runtime.

### Common causes

* A client sent a request to a Workers script using a custom or non-standard HTTP method (methods outside of `GET`, `POST`, `PUT`, etc.).
* A typo in the HTTP method (for example, `POT` instead of `POST`).

### Resolution

* Update the client to use a valid, standard [HTTP request method ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-501/","name":"Error 501"}}]}
```
