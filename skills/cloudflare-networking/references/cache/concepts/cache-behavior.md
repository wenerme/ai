---
description: How Cloudflare handles HEAD requests and Set-Cookie headers.
title: Head Requests and Set-Cookie Headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Head Requests and Set-Cookie Headers

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/concepts/cache-behavior/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This page describes how Cloudflare's cache system behaves in interaction with:

* `HEAD` requests
* `Set-Cookie` response headers

## Interaction of `HEAD` requests with Cache

Cloudflare converts `HEAD` requests to `GET` requests for [cacheable requests](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

When you make a `HEAD` request for a cacheable resource and Cloudflare does not have that resource in the edge cache, a cache miss happens. Cloudflare will send a `GET` request to your origin, cache the full response and return the response headers only. Make sure the origin server is set up to handle `GET` requests, even if only `HEAD` requests are expected, so that compatibility with this behavior is ensured.

## Interaction of `Set-Cookie` response header with Cache

For non-cacheable requests, `Set-Cookie` is always preserved. For cacheable requests, there are three possible behaviors:

* `Set-Cookie` is returned from origin and the default cache level is used. If [origin cache control](https://developers.cloudflare.com/cache/concepts/cache-control/) is not enabled, Cloudflare removes the `Set-Cookie` and caches the asset. If origin cache control is enabled, Cloudflare does not cache the asset and preserves the `Set-Cookie`. A cache status of `BYPASS` is returned.
* `Set-Cookie` is returned from origin and the cache level is set to `Cache Everything` in Page Rules, or `Eligible for cache` in Cache Rules. In this case, Cloudflare preserves the `Set-Cookie` but does not cache the asset. A cache `MISS` will be returned every time.
* `Set-Cookie` is returned from origin, the cache level is set to `Cache Everything` in Page Rules, or `Eligible for cache` in Cache Rules, and edge cache TTL is explicitly set using either the "Ignore cache-control header and use this TTL" or "Status code TTL" setting. In this case, Cloudflare removes the `Set-Cookie` and the asset is cached.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/concepts/cache-behavior/#page","headline":"Head Requests and Set-Cookie Headers · Cloudflare Cache (CDN) docs","description":"How Cloudflare handles HEAD requests and Set-Cookie headers.","url":"https://developers.cloudflare.com/cache/concepts/cache-behavior/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Cookies"]}
```
