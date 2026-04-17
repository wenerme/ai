---
title: About
description: How APO caches dynamic WordPress content at the Cloudflare edge.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/automatic-platform-optimization/about/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# About

With Automatic Platform Optimization (APO), Cloudflare serves your entire site from our edge network, ensuring customers see improved performance when visiting your site. Cloudflare typically only caches static content, but with APO, we can also cache dynamic content — like HTML — to serve the entire site from the cache. This process removes round trips from the origin to drastically improve time to first byte (TTFB) along with other site performance metrics. In addition to caching dynamic content, APO caches third-party scripts to further reduce the number of requests that leave Cloudflare's edge network.

With APO, you can manage your WordPress site as normal. Whenever you update content in WordPress, Cloudflare updates content on our edge to prevent serving stale content when you use Cloudflare's WordPress plugin. Additionally, for logged-in or administrator users, we bypass the cache to ensure that private content is not cached and served to other visitors. Find more about [what APO can do for you. ↗](https://www.youtube.com/watch?v=DWANhxoDxFI?feature=youtu.be)

## Limitations

Automatic Platform Optimization is not compatible with Enterprise [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) when a subdomain, for example, `www` is in a different zone to the apex domain.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/about/","name":"About"}}]}
```
