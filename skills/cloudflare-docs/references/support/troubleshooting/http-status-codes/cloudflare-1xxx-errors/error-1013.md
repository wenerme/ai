---
title: Error 1013
description: Troubleshoot Cloudflare 1013 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1013

## Error 1013: HTTP hostname and TLS SNI hostname mismatch

This error indicates a mismatch between the HTTP hostname and the TLS SNI hostname.

### Common cause

The hostname sent by the client or browser via Server Name Indication (SNI) does not match the request host header.

### Resolution

Error `1013` is commonly caused by the following:

* Your local browser setting the incorrect SNI host header, or
* A network proxying SSL traffic caused a mismatch between SNI and the Host header of the request.

Test for an SNI mismatch via an online tool, such as [SSL Shopper ↗](https://www.sslshopper.com/ssl-checker.html).

Provide Cloudflare Support the following information:

* A [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) captured while duplicating the error.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1013/","name":"Error 1013"}}]}
```
