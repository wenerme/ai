---
title: Error 1009
description: Troubleshoot Cloudflare 1009 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Error 1009

## Errors 1009 Access Denied: Country or region banned

This error indicates that access to the website is denied from your country or region.

### Common causes

The owner of the website (for example, `example.com`) has banned the country or region your IP address from accessing the website.

### Resolution

* If you are a site visitor, contact the site owner and ask them to allow your IP address.
* If you are the site owner, ensure that the reported IP address is allowed under the [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) security feature.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1009/#page","headline":"Error 1009 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1009 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1009/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1009/","name":"Error 1009"}}]}
```
