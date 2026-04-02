---
title: Cloudflare crawlers
description: Cloudflare may crawl or make HTTP requests to your site to make sure its protected and performing properly.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/reference/cloudflare-site-crawling.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare crawlers

Cloudflare may crawl or make HTTP requests to your site to make sure its protected and performing properly.

## Crawling situations

### Specific products

Cloudflare will crawl your site when you have specific products enabled:

* [**Always Online**](https://developers.cloudflare.com/cache/how-to/always-online/)  
   * _User-Agent_: `Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online)`
* [**Health checks**](https://developers.cloudflare.com/health-checks/)  
   * _User-Agent_: `Mozilla/5.0 (compatible; Cloudflare-Healthchecks/1.0; +https://www.cloudflare.com/; healthcheck-id: <HEALTHCHECK_ID>)`  
   * `HEALTHCHECK_ID` is a 16-character string associated with the health check ID.
* [**Load balancing monitors**](https://developers.cloudflare.com/load-balancing/monitors/)  
   * _User-Agent_: `Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: <POOL_ID>)`  
   * `POOL_ID` is a 16-character string associated with the load balancing pool ID being monitored.
* [**Prefetch URLs**](https://developers.cloudflare.com/speed/optimization/content/prefetch-urls/)  
   * _User-Agent_: `Mozilla/5.0 (compatible; CloudFlare-Prefetch/0.1; +http://www.cloudflare.com/)`
* [**SSL/TLS recommender**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-recommender/)  
   * _User-Agent_: `Cloudflare-SSLDetector`  
   * This crawler ignores your `robots.txt` file unless there are rules explicitly targeting the user agent.
* [**Security Insights**](https://developers.cloudflare.com/security-center/security-insights/review-insights/)  
   * _User-Agent_: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 (compatible; +https://developers.cloudflare.com/security-center/)`

### Other situations

Cloudflare will also crawl your site in other, specific situations:

* **Speed tests**  
   * _User-Agent_: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 PTST/190628.140653`  
   * _Triggered when_: You launch a speed test from within [the Cloudflare dashboard](https://developers.cloudflare.com/speed/observatory/run-speed-test/).
* **Support diagnostics**:  
   * _User-Agent_: `Cloudflare-diagnostics`  
   * _Triggered when_: Cloudflare Support Engineers perform error checks and by continuous monitoring used to raise intelligent alerts in the Cloudflare dashboard.
* **Custom Hostname validation**:  
   * _User-Agent_: `Cloudflare Custom Hostname Verification`  
   * _Triggered when_: You choose to validate a custom hostname with an [HTTP ownership token](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/#http-tokens).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/cloudflare-site-crawling/","name":"Cloudflare crawlers"}}]}
```
