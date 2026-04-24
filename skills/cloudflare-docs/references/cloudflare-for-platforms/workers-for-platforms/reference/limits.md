---
title: Limits
description: Review Workers for Platforms limits for scripts, Durable Objects, cache, tags, and API rate limits.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/workers-for-platforms/reference/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limits

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.

## `cf` object

The [cf object](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) contains Cloudflare-specific properties of a request. This field is not accessible in [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers) by default because some fields in this object are sensitive and can be used to manipulate Cloudflare features (for example, `cacheKey`, `resolveOverride`, `scrapeShield`.)

To access the `cf` object, you need to enable [trusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/#trusted-mode) for your namespace. Only enable this if you control all Worker code in the namespace.

## Durable Object namespace limits

Workers for Platforms do not have a limit for the number of Durable Object namespaces.

## Cache API

For isolation, `caches.default` is disabled for namespaced scripts. To learn more about the cache, refer to [How the cache Works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/ukpeZVLWLnKeixDu7). If the limit can be increased, Cloudflare will contact you with next steps.

## Gradual Deployments

[Gradual Deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) is not supported yet for user Workers. Changes made to user Workers create a new version that deployed all-at-once to 100% of traffic.

## API Rate Limits

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/reference/limits/","name":"Limits"}}]}
```
