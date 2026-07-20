---
title: Error 1004
description: Troubleshoot Cloudflare 1004 error code.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Error 1004

## Error 1004: Host Not Configured to Serve Web Traffic

This error indicates that the host is not configured to serve web traffic.

### Common causes

* Cloudflare staff disabled proxying for the domain due to abuse or terms of service violations.
* DNS changes have not yet propagated or the site owner's DNS A records point to [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

### Resolution

If the issue persists beyond five minutes, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1004/#page","headline":"Error 1004 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1004 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1004/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1004/","name":"Error 1004"}}]}
```
