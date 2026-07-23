---
description: Page Rules that control APO caching behavior for specific URL patterns.
title: Page Rule integration with APO
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Page Rule integration with APO

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/reference/page-rule-integration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following Page Rules can control APO. Any changes to caching via Page Rules require purging the cache for the changes to take effect.

Caution

Consider using [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) instead to control APO due to their enhanced configurability.

* **Cache Level: Bypass** — APO bypasses pages with response header `cf-apo-via: origin,page-rules`
* **Cache Level: Ignore Query String** — APO ignores all query strings when serving from Cache.
* **Cache Level: Cache Everything** — APO caches pages with all query strings.
Caution
Automatic page purge via the WordPress plugin won’t clean all cached pages, only pages without query strings. Cached responses will be returned even with request header `cache-control: no-cache`.
* **Bypass Cache on Cookie (Business and Enterprise plans only)** — APO applies custom bypass cookies in addition to the default list.
* **Edge Cache TTL** — APO applies custom Edge TTL instead of 30 days. This page rule is helpful for pages that can generate CAPTCHAs or nonces.
* **Browser Cache TTL** — APO applies custom Browser TTL.
* `CDN-Cache-Control` and `Cloudflare-CDN-Cache-Control` – Enables users to have detailed control over cache TTLs without using a page rule. For more information on the `CDN-Cache-Control` and `Cloudflare-CDN-Cache-Control` headers, refer to [CDN-Cache-Control](https://developers.cloudflare.com/cache/concepts/cache-control/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/reference/page-rule-integration/#page","headline":"Page Rule integration with APO · Cloudflare Automatic Platform Optimization docs","description":"Page Rules that control APO caching behavior for specific URL patterns.","url":"https://developers.cloudflare.com/automatic-platform-optimization/reference/page-rule-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
