---
title: Error 1006, 1007, 1008 or 1106
description: Troubleshoot Cloudflare 1006 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 1006, 1007, 1008 or 1106

## Errors 1006, 1007, 1008 or 1106 Access Denied: Your IP address has been banned

This error indicates that access is denied because your IP address has been banned.

### Common causes

A Cloudflare customer blocked traffic from your client or browser.

Note

Error 1006 also occurs in the Cloudflare **Workers** app under the **Preview** tab when a customer uses **[Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)** or any other Cloudflare security feature to block the Google Cloud Platform IPs that the **Preview** tab relies upon.

### Resolution

Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer's security settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1006/","name":"Error 1006, 1007, 1008 or 1106"}}]}
```
