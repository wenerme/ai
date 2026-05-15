---
title: Error 1015
description: Troubleshoot Cloudflare 1015 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 1015

## Error 1015: You are being rate limited

The website you are trying to visit has received too many requests and has temporarily blocked you from accessing it.

### Common cause

The website owner has configured rate limiting rules that restrict how many requests a visitor can make to their site in a given time period. When you exceed this limit, Cloudflare returns a `1015` error.

### Resolution

**If you are a site visitor:**

* Wait for a period of time, then try accessing the website again later. Do not repeatedly try to access the website within a short period of time, as this may extend the block.
* If you are still blocked or need help, contact the website owner or the website's support team directly for help. Cloudflare does not control which visitors are rate limited, the website owner sets these rules.

**If you are the site owner:**

* Review your current [rate limiting thresholds](https://developers.cloudflare.com/waf/rate-limiting-rules/) and adjust your configuration.
* If a rate limiting rule is blocking requests in a short time period (for example, one second), try increasing the time period to 10 seconds.

Note

_Unable to purge_ is another `1015` error code relating to [Cloudflare cache purge](https://developers.cloudflare.com/cache/how-to/purge-cache). Retry the cache purge and contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) if errors persist.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/","name":"Error 1015"}}]}
```
