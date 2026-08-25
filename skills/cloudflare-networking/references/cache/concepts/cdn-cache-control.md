---
description: Use CDN-Cache-Control headers to control Cloudflare cache independently.
title: CDN-Cache-Control
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# CDN-Cache-Control

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/concepts/cdn-cache-control/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`CDN-Cache-Control` is a response header field set on the origin to separately control the behavior of CDN caches from other intermediaries that might handle a response. You can set the `CDN-Cache-Control` or `Cloudflare-CDN-Cache-Control` response header using the same directives used with the [Cache-Control](https://developers.cloudflare.com/cache/concepts/cache-control/).

## Header precedence

You have several options available to determine how `CDN-Cache-Control` directives interact with `Cache-Control` directives.

If a [Cache Response Rule](https://developers.cloudflare.com/cache/how-to/cache-response-rules/) sets `Cache-Control` directives using the `set_cache_control` action, those directives take precedence over any origin-set `Cloudflare-CDN-Cache-Control` and `CDN-Cache-Control` headers.

When no Cache Response Rule applies, an origin can:

* Return the `CDN-Cache-Control` response header which Cloudflare evaluates to make caching decisions. `Cache-Control`, if also returned by the origin, is proxied as is and does not affect caching decisions made by Cloudflare. Additionally, `CDN-Cache-Control` is proxied downstream in case there are other CDNs between Cloudflare and the browser.
* Return the `Cloudflare-CDN-Cache-Control` response header. This results in the same behavior as the origin returning `CDN-Cache-Control` except Cloudflare does not proxy `Cloudflare-CDN-Cache-Control` downstream because it’s a header only used to control Cloudflare. This option is beneficial if you want only Cloudflare to have a different caching behavior while all other downstream servers rely on `Cache-Control` or if you do not want Cloudflare to proxy the `CDN-Cache-Control` header downstream.
* Return both `Cloudflare-CDN-Cache-Control` and `CDN-Cache-Control` response headers. In this case, Cloudflare only looks at `Cloudflare-CDN-Cache-Control` when making caching decisions because it is the most specific version of `CDN-Cache-Control` and proxies `CDN-Cache-Control` downstream. Only forwarding `CDN-Cache-Control` in this situation is beneficial if you want Cloudflare to have a different caching behavior than other CDNs downstream.

Additionally, surrogates will not honor `Cache-Control` headers in the response from an origin. For example, if the `Surrogate-Control` header is present within the response, Cloudflare ignores any `Cache-Control` directives, even if the `Surrogate-Control` header does not contain directives.

## Interaction with other Cloudflare features

### Edge Cache TTL cache rule

The [Edge Cache TTL cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) overrides the amount of time an asset is cached on the edge (Cloudflare data centers). This cache rule overrides directives in `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` which manage how long an asset is cached on the edge. You can create this rule in the dashboard in **Caching** \> **Cache Rules**.

### Browser Cache TTL cache rule

The [Browser Cache TTL cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#browser-ttl) overrides the amount of time an asset is cached by browsers/servers downstream of Cloudflare. Browser Cache TTL only modifies the `Cache-Control` response header. This cache rule does not modify `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` response headers.

### Other Origin Response Headers

The origin returns the `Expires` response header which specifies the amount of time before an object is considered stale to the browser. This response header does not affect the caching decision at Cloudflare when `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` is in use.

### Cloudflare Default cache values

In situations where Cloudflare does not receive `Cloudflare-CDN-Cache-Control`, `CDN-Cache-Control`, or `Cache-Control` values, cacheable assets use the general [default values](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/).

## When to use CDN-Cache-Control

### Manage cached assets TTLs

Use `CDN-Cache-Control` when you want to manage cached asset’s TTLs separately for origin caches, CDN caches, and browser caches. The example below shows how you can manage your cached asset’s TTLs using origin-set response headers.

Headers:

* `Cache-Control: max-age=14400, s-maxage=84000`
* `Cloudflare-CDN-Cache-Control: max-age=24400`
* `CDN-Cache-Control: max-age=18000`

Cache behavior:

| Caches               | Cache TTL (seconds) | |  Origin Server Cache | 14400 |
| -------------------- | ------------------- | ---------------------- | ----- |
| Network Shared Cache | 84000               |                        |       |
| Cloudflare Edge      | 24400               |                        |       |
| Other CDNs           | 18000               |                        |       |
| Browser Cache        | 14400               |                        |       |

### Specify when to serve stale content

Use `CDN-Cache-Control` headers in conjunction with `Cache-Control` headers to specify when to serve stale content in the case of error or during revalidation. The example below shows how you might set your headers and directives to apply to CDNs when handling errors.

Headers:

* `Cache-Control: stale-if-error=400`
* `Cloudflare-CDN-Cache-Control: stale-if-error=60`
* `CDN-Cache-Control: stale-if-error=200`

Behavior in response to [5XX error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/):

| Caches          | Stale served (seconds) in response to error | |  Origin Cache Layer/Network Cache/Browser Cache | 400 (if it assumes the directive applies) |
| --------------- | ------------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| Cloudflare Edge | 60                                          |                                                   |                                           |
| Other CDN       | 200                                         |                                                   |                                           |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/concepts/cdn-cache-control/#page","headline":"CDN-Cache-Control · Cloudflare Cache (CDN) docs","description":"Use CDN-Cache-Control headers to control Cloudflare cache independently.","url":"https://developers.cloudflare.com/cache/concepts/cdn-cache-control/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
