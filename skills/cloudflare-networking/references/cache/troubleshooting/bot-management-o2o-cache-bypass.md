---
title: Bot Management cookie causes cache bypass in O2O setups
description: In Orange-to-Orange (O2O) setups — where a SaaS provider uses Cloudflare for SaaS and their customer also has their own Cloudflare zone — the __cf_bm Bot Management cookie returned from the origin-facing Cloudflare zone can cause the eyeball-facing zone to bypass cache. This occurs because the Set-Cookie header in the response triggers Cloudflare's default behavior of not caching responses with Set-Cookie.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Bot Management cookie causes cache bypass in O2O setups

In [Orange-to-Orange (O2O)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) setups — where a SaaS provider uses [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) and their customer also has their own Cloudflare zone — the `__cf_bm` Bot Management cookie returned from the origin-facing Cloudflare zone can cause the eyeball-facing zone to bypass cache. This occurs because the `Set-Cookie` header in the response triggers Cloudflare's default behavior of not caching responses with `Set-Cookie`.

If you are seeing unexpectedly low cache hit rates in an O2O setup with Bot Management enabled, this may be the cause.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/bot-management-o2o-cache-bypass/#page","headline":"Bot Management cookie causes cache bypass in O2O setups · Cloudflare Cache (CDN) docs","description":"In Orange-to-Orange (O2O) setups — where a SaaS provider uses Cloudflare for SaaS and their customer also has their own Cloudflare zone — the __cf_bm Bot Management cookie returned from the origin-facing Cloudflare zone can cause the eyeball-facing zone to bypass cache. This occurs because the Set-Cookie header in the response triggers Cloudflare's default behavior of not caching responses with Set-Cookie.","url":"https://developers.cloudflare.com/cache/troubleshooting/bot-management-o2o-cache-bypass/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/troubleshooting/bot-management-o2o-cache-bypass/","name":"Bot Management cookie causes cache bypass in O2O setups"}}]}
```
