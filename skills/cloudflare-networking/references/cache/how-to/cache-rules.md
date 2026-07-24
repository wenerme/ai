---
description: Control what and how Cloudflare caches with Cache Rules.
title: Cache Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache Rules

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Cache Rules to customize cache settings on Cloudflare. Cache Rules allows you to make adjustments to what is eligible to cache, how long it should be cached and where, as well as trigger specific interactions with Cloudflare's cache and other Rules products for matching requests.

Cache Rules can be created in the [dashboard](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/), via [API](https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/) or [Terraform](https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/).

Notes

Cache Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

Rules can be versioned. Refer to the [Version Management](https://developers.cloudflare.com/version-management/) documentation for more information.

## Rules templates

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

## Availability

The following table describes Cache Rules availability per plan.

|                 | Free | Pro | Business | Enterprise |
| --------------- | ---- | --- | -------- | ---------- |
| Availability    | Yes  | Yes | Yes      | Yes        |
| Number of rules | 10   | 25  | 50       | 300        |

## Cache Rules and cache keys

When a Cache Rule sets a [custom cache key](https://developers.cloudflare.com/cache/how-to/cache-keys/), the resulting cache entry is indexed by that key rather than the request URL alone. Depending on what the custom cache key includes, this may affect [single-file purge](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/):

* **Custom cache keys that only change how the query string is handled** (for example, ignoring the query string) generally work with dashboard single-file purge.
* **Custom cache keys that include headers, cookies, or other request properties** will prevent dashboard single-file purge from working, because the dashboard cannot send those values in a purge request.
* **Even without Cache Rules**, Cloudflare's default cache key includes certain request headers. Dashboard single-file purge may not work for resources cached with those headers present.

To purge resources that cannot be cleared via dashboard single-file purge, you have the following options:

* Use the API to [purge by URL](https://developers.cloudflare.com/api/resources/cache/methods/purge/#purge-cached-content-by-url), including all headers, cookies, and query strings that are part of your custom cache key. If any header or cookie is missing from the purge request, it is treated as an empty value in the cache key.
* [Purge by host](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/), which clears all resources for a hostname and is not affected by custom cache keys.
* [Purge by prefix](https://developers.cloudflare.com/cache/how-to/purge-cache/purge%5Fby%5Fprefix/), which purges all resources under a URL path and is not affected by custom cache keys.
* [Purge by tag](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/), which is not affected by custom cache keys.
* [Purge everything](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/), which clears all cached resources for the zone.

For more information, refer to [Cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/) and [Purge cache key resources](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-cache-key/).

## Troubleshooting

When troubleshooting Cache Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/#page","headline":"Cache Rules · Cloudflare Cache (CDN) docs","description":"Control what and how Cloudflare caches with Cache Rules.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
