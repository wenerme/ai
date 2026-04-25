---
title: Error 1040
description: Troubleshoot Cloudflare 1040 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1040

## Error 1040: Invalid request rewrite (header modification not allowed)

This error indicates that an attempt was made to modify a restricted HTTP header.

### Common cause

You are trying to modify an HTTP header that Request Header Transform Rules cannot change.

### Resolution

Make sure you are not trying to modify one of the [reserved HTTP request headers](https://developers.cloudflare.com/rules/transform/request-header-modification/#important-remarks).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1040/","name":"Error 1040"}}]}
```
