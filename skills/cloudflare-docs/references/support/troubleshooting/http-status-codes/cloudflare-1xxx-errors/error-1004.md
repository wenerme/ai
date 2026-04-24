---
title: Error 1004
description: Troubleshoot Cloudflare 1004 error code.
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

# Error 1004

## Error 1004: Host Not Configured to Serve Web Traffic

This error indicates that the host is not configured to serve web traffic.

### Common causes

* Cloudflare staff disabled proxying for the domain due to abuse or terms of service violations.
* DNS changes have not yet propagated or the site owner's DNS A records point to [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

### Resolution

If the issue persists beyond five minutes, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1004/","name":"Error 1004"}}]}
```
