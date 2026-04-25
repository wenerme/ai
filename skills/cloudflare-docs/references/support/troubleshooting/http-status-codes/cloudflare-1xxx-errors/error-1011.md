---
title: Error 1011
description: Troubleshoot Cloudflare 1011 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1011

## Error 1011: Access Denied (Hotlinking Denied)

This error indicates that access to the resource is denied due to hotlinking protection.

### Common cause

A request is made for a resource that uses [Cloudflare hotlink protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/).

### Resolution

Notify the website owner of the blocking. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database ↗](https://lookup.icann.org/).

Note

Since the website owner performed the blocking, Cloudflare support cannot override a customer's security settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1011/","name":"Error 1011"}}]}
```
