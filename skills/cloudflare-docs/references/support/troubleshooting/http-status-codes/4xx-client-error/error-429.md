---
title: Error 429
description: The 429 Too Many Requests status code indicates that the client has sent too many requests in a specified amount of time, as determined by the server's rate-limiting rules. The server may include a Retry-After header in the response to specify when the client can try again.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 429

## 429 Too Many Requests

The `429 Too Many Requests` status code indicates that the client has sent too many requests in a specified amount of time, as determined by the server's rate-limiting rules. The server may include a `Retry-After` header in the response to specify when the client can try again.

For more details, refer to [RFC 6585 ↗](https://tools.ietf.org/html/rfc6585).

### Common use cases

Servers use this status code to prevent excessive API requests from overloading the system. For example, a client making repeated API calls within a short time frame may trigger a 429 response. Websites or services may impose rate limits to manage traffic spikes or prevent abuse, temporarily blocking excessive requests from users.

### Cloudflare-specific information

#### Cloudflare API limits

| Type                              | Limit                               |
| --------------------------------- | ----------------------------------- |
| Client API per user/account token | 1200/5 minutes                      |
| Client API per IP                 | 200/second                          |
| GraphQL                           | Varies by query cost. Max 320/5 min |
| User API token quota              | 50                                  |
| Account API token quota           | 500                                 |

Note

The global rate limit for the Cloudflare API is 1,200 requests per five minute period per user, and applies cumulatively regardless of whether the request is made via the dashboard, API key, or API token.

If you exceed this limit, all API calls for the next five minutes will be blocked, receiving a `HTTP 429 - Too Many Requests` response.

Some specific API calls have their own limits and are documented separately, such as the following:

* [Cache Purge APIs](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits)
* [GraphQL APIs](https://developers.cloudflare.com/analytics/graphql-api/limits/)
* [Rulesets APIs](https://developers.cloudflare.com/ruleset-engine/rulesets-api/#limits)
* [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/#rate-limiting-for-lists-api-requests)
* [Gateway Lists API](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/#api-rate-limit)

Enterprise customers can also [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to raise the Client API per user, GraphQL, or API token limits to a higher value.

#### R2 managed public buckets

Cloudflare applies rate limiting to requests for R2 managed public buckets accessed via `r2.dev`. This helps protect customers from abuse and overuse of public buckets. For details, refer to [Rate limiting on managed public buckets through r2.dev](https://developers.cloudflare.com/r2/platform/limits/#rate-limiting-on-managed-public-buckets-through-r2dev).

#### Website end users

Cloudflare will generate a `429` response when a request is being [rate limited ↗](https://www.cloudflare.com/rate-limiting/). If visitors to your site encounter this error, it will be visible in the [Rate Limiting Analytics](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/#analytics) dashboard.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-429/","name":"Error 429"}}]}
```
