---
description: Control response headers and settings for cached content.
title: Cache Response Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cache Response Rules

Last updated Jun 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cache/how-to/cache-response-rules/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cache Response Rules allow you to configure cache settings based on request and response attributes. These rules execute prior to caching in the `http_response_cache_settings` phase, which runs after Cloudflare receives the origin response.

With Cache Response Rules you can:

* Modify `Cache-Control` directives sent by your origin.
* Modify cache tags on responses for targeted [cache purging](https://developers.cloudflare.com/cache/how-to/purge-cache/).
* Strip headers (`ETag`, `Set-Cookie`, `Last-Modified`) from origin responses before caching.

Cache Response Rules apply to both cached and non-cached (dynamic) responses from the origin. For example, you can strip Set-Cookie headers from responses that are not eligible for caching.

Cache Response Rules can be created in the [dashboard](https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-dashboard/), via [API](https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/), or [Terraform](https://developers.cloudflare.com/cache/how-to/cache-response-rules/terraform-example/).

Note

Cache Response Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

## Availability

The following table describes Cache Response Rules availability per plan.

|                 | Free | Pro | Business | Enterprise |
| --------------- | ---- | --- | -------- | ---------- |
| Availability    | Yes  | Yes | Yes      | Yes        |
| Number of rules | 10   | 25  | 50       | 300        |

## Troubleshooting

When troubleshooting Cache Response Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

## Relationship with Cache Rules

Cache Response Rules operate on the origin response, while [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) operate on the incoming request. When settings from both rule types conflict, Cache Response Rules take precedence.

Key differences:

* **Cache eligibility**: Cache Rules remain the only mechanism to decide whether content is eligible for caching. However, Cache Response Rules can make a cacheable asset non-cacheable by setting the `no-store` directive using the `set_cache_control` action.
* **Origin Cache Control (OCC)**: If any rule in the `http_response_cache_settings` phase matches, Cloudflare defaults to Origin Cache Control behavior (`origin_cache_control = true`).
* **CDN-Cache-Control precedence**: `Cache-Control` directives set by Cache Response Rules take precedence over origin-set `Cloudflare-CDN-Cache-Control` and `CDN-Cache-Control` headers. For more information, refer to [CDN-Cache-Control header precedence](https://developers.cloudflare.com/cache/concepts/cdn-cache-control/#header-precedence).
* **Stacking**: Cache Response Rules stack the same way as Cache Rules. When multiple rules specify the same setting, the last matching rule wins.

### Example: OCC precedence over Edge TTL

Consider the following scenario:

1. A Cache Rule sets **Edge TTL** to `override_origin` with a value of `7200` seconds (2 hours).
2. A Cache Response Rule uses `set_cache_control` to set `s-maxage` to `3600` seconds (1 hour) with `cloudflare_only` enabled.
3. The origin responds with `Cache-Control: s-maxage=600`.

In this case, the Cache Response Rule takes precedence. Cloudflare caches the asset for `3600` seconds (1 hour) based on the `s-maxage` directive set by the Cache Response Rule, while visitors still receive the original `s-maxage=600` from the origin because `cloudflare_only` is enabled.

## Difference from Workers and Transform Rules

Workers and [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) execute after the caching decision has been made and cannot influence whether or how a response is cached. Only [Cache Response Rules](https://developers.cloudflare.com/cache/how-to/cache-response-rules/) can modify caching behavior based on origin response headers.

If you need to override `Cache-Control` directives from the origin (for example, remove `private` or add `s-maxage`), use a [Cache Response Rule](https://developers.cloudflare.com/cache/how-to/cache-response-rules/) — not a Worker or Transform Rule.

## Notes

* If you strip last modified then Smart Edge Revalidation will be turned off.
* Cache Response Rules ignore [1xx HTTP response status codes](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/1xx-informational/) as they are treated as informational responses.
* Cache Response Rules can be versioned. Refer to the [Version Management](https://developers.cloudflare.com/version-management/) documentation for more information.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/#page","headline":"Cache Response Rules · Cloudflare Cache (CDN) docs","description":"Control response headers and settings for cached content.","url":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
