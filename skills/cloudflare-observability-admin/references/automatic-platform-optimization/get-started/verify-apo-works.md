---
description: When APO is working, three headers are present:  CF-Cache-Status, cf-apo-via,cf-edge-cache. APO works correctly when the headers exactly match the headers below.
title: Verify APO works
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify APO works

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/get-started/verify-apo-works/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can check whether or not APO is working by verifying APO headers are present. When APO is working, three headers are present: `CF-Cache-Status`, `cf-apo-via`, `cf-edge-cache`.

1. Visit [Uptrends.com ↗](https://www.uptrends.com/tools/http-response-header-check).
2. In the text field, enter the URL for your WordPress homepage including the `https://www.`.
3. Select **Start test**. The **Response Headers** table displays.
4. Locate the three header responses and their description. APO is working correctly when the headers exactly match the headers below.
* `CF-Cache-Status` | `HIT`
  * The `cf-cache-status` header displays if the asset is served from the cache or was considered dynamic and served from the origin.
* `cf-apo-via` | `tcache`
  * The `cf-apo-via` header returns the APO status for the given request.
* `cf-edge-cache` | `cache, platform=wordpress`
  * The `cf-edge-cache` headers confirms the WordPress plugin is installed and enabled.

In a terminal, use the following cURL. The header `'accept: text/html'` is important.

```sh
curl -svo /dev/null -A "CF" 'https://example.com/' -H 'accept: text/html' 2>&1 | grep 'cf-cache-status\|cf-edge\|cf-apo-via'
```

```sh
< cf-cache-status: HIT
< cf-apo-via: cache
< cf-edge-cache: cache,platform=wordpress
```

As always, `cf-cache-status` displays if the asset hit the cache or was considered dynamic and served from the origin.

* `cf-apo-via` | `tcache`
  * The `cf-apo-via` header returns the APO status for the given request.
* `cf-edge-cache` | `cache, platform=wordpress`
  * The `cf-edge-cache` headers confirms the WordPress plugin is installed and enabled.

## Verify the APO integration and WordPress integration work

Open your WordPress site and publish a change. When the integration is working, the page is cached with `cf-cache-status: HIT` and `cf-apo-via: tcache`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/get-started/verify-apo-works/#page","headline":"Verify APO works · Cloudflare Automatic Platform Optimization docs","description":"When APO is working, three headers are present:  CF-Cache-Status, cf-apo-via,cf-edge-cache. APO works correctly when the headers exactly match the headers below.","url":"https://developers.cloudflare.com/automatic-platform-optimization/get-started/verify-apo-works/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WordPress","Headers"]}
```
