---
title: Page Rule integration with APO
description: Page Rules that control APO caching behavior for specific URL patterns.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/automatic-platform-optimization/reference/page-rule-integration.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Page Rule integration with APO

The following Page Rules can control APO. Any changes to caching via Page Rules require purging the cache for the changes to take effect.

Warning

Consider using [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) instead to control APO due to their enhanced configurability.

* **Cache Level: Bypass** — APO bypasses pages with response header `cf-apo-via: origin,page-rules`
* **Cache Level: Ignore Query String** — APO ignores all query strings when serving from Cache.
* **Cache Level: Cache Everything** — APO caches pages with all query strings.  
Warning  
Automatic page purge via the WordPress plugin won’t clean all cached pages, only pages without query strings. Cached responses will be returned even with request header `cache-control: no-cache`.
* **Bypass Cache on Cookie (Business and Enterprise plans only)** — APO applies custom bypass cookies in addition to the default list.
* **Edge Cache TTL** — APO applies custom Edge TTL instead of 30 days. This page rule is helpful for pages that can generate CAPTCHAs or nonces.
* **Browser Cache TTL** — APO applies custom Browser TTL.
* `CDN-Cache-Control` and `Cloudflare-CDN-Cache-Control` – Enables users to have detailed control over cache TTLs without using a page rule. For more information on the `CDN-Cache-Control` and `Cloudflare-CDN-Cache-Control` headers, refer to [CDN-Cache-Control](https://developers.cloudflare.com/cache/concepts/cache-control/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/automatic-platform-optimization/reference/page-rule-integration/","name":"Page Rule integration with APO"}}]}
```
