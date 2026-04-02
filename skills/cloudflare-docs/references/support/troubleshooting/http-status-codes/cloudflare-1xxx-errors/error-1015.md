---
title: Error 1015
description: This error indicates that you are being rate limited by the website.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 1015

## Error 1015: You are being rate limited

This error indicates that you are being rate limited by the website.

### Common cause

The site owner implemented [rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/) that affects your visitor traffic.

Note

_Unable to purge_ is another `1015` error code relating to [Cloudflare cache purge](https://developers.cloudflare.com/cache/how-to/purge-cache). Retry the cache purge and contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) if errors persist.

### Resolution

* If you are a site visitor, contact the site owner to request exclusion of your IP from rate limiting.
* If you are the site owner, review the current rate limiting thresholds and adjust your configuration.
* If a rate limiting rule is blocking requests in a short time period (for example, one second) try increasing the time period to 10 seconds.

Note

If you expect a new Cloudflare Worker to exceed rate limits, refer to the [Workers documentation](https://developers.cloudflare.com/workers/platform/limits/) for guidance.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/","name":"Error 1015"}}]}
```
