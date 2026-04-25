---
title: Error page types
description: Types of error pages you can customize with custom error rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error page types

| Page type                                 | Description                                                                                                                                                                                                                                                                                                         | API identifier     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| WAF block                                 | The page displayed when visitors are blocked by a [Web Application Firewall](https://developers.cloudflare.com/waf/) rule. This page returns a 403 status code.                                                                                                                                                     | waf\_block         |
| IP/Country block                          | The page displayed when a request originates from a [blocked IP address or country](https://developers.cloudflare.com/waf/tools/ip-access-rules/). This page returns a 403 status code.                                                                                                                             | ip\_block          |
| IP/Country challenge                      | Presents a challenge to visitors from specified IP addresses or countries. This page returns a 403 status code. For more information, refer to [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).                                                                                     | country\_challenge |
| 500 class errors                          | 500 class error pages are displayed when a web server is unable to process a request. For more information, refer to [Cloudflare 5xx errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/).                                                                   | 500\_errors        |
| 1000 class errors                         | 1000 class error pages are displayed when a domain’s configuration, security settings, or origin setup prevents Cloudflare from completing a request. For more information, refer to [Cloudflare 1xxx errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/). | 1000\_errors       |
| Managed challenge / I'm Under Attack Mode | Presents different types of challenges to a visitor depending on the nature of their request and your security settings. This page returns a 403 status code. For more information, refer to [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/).                      | managed\_challenge |
| Rate limiting block                       | Displayed to visitors when they have been blocked by a [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/). This page returns a 429 status code.                                                                                                                                       | ratelimit\_block   |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/custom-errors/","name":"Custom Errors"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/custom-errors/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/custom-errors/reference/error-page-types/","name":"Error page types"}}]}
```
