---
title: Rate limits
description: Some specific API calls have their own limits and are documented separately, such as the following:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/api/reference/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rate limits

## API token limits

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

## Rate limiting headers

The following headers are returned when calling REST APIs:

* `Ratelimit`: List of service limit items, composed of the limit name, the remaining quota (`r`) and the time next window resets (`t`). For example: `"default";r=50;t=30`
* `Ratelimit-Policy`: List of quota policy items, composed of the policy name, the total quota (`q`) and the time window the quota applies to (`w`). For example: `"burst";q=100;w=60`
* `retry-after`: The number of seconds, rounded up, until more capacity is available. Note, this header is only returned when the request has exceeded the rate limit.

[Cloudflare's SDKs](https://developers.cloudflare.com/fundamentals/api/reference/sdks/) will also automatically work with the headers and back off in response to rate limits.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/reference/limits/","name":"Rate limits"}}]}
```
