---
title: Error 1034
description: Troubleshoot Cloudflare 1034 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1034

## Error 1034: Edge IP Restricted

This error indicates that the IP address used for the domain is restricted by Cloudflare's edge validation.

### Common cause

Customers who previously pointed their domains to `1.1.1.1` will now encounter `1034` error. This is due to a new edge validation check in Cloudflare's systems to prevent misconfiguration and/or potential abuse.

### Resolution

Ensure DNS records are pointed to IP addresses you control, and in the case a placeholder IP address is needed for “originless” setups, use the IPv6 reserved address `100::` or the IPv4 reserved address `192.0.2.0`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/","name":"Error 1034"}}]}
```
