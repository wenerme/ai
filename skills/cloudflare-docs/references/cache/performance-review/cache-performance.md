---
title: Cache performance
description: Measure and improve cache performance for your site.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/performance-review/cache-performance.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cache performance

## Optimize cache ratios

Depending on the cache status you receive, you can make modifications to improve your cache ratio. To review the list of cache statuses, refer to [Cloudflare cache responses](https://developers.cloudflare.com/cache/concepts/cache-responses/).

* **Dynamic**: Default response for many file types including HTML. To cache additional content, refer to [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/).
* **Revalidated**: To address an atypical quantity of revalidated content, consider [increasing your Edge Cache TTLs](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl).
* **Expired**: Consider [extending Edge Cache TTLs](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl)) for these resources via a Cache Rule or enable revalidation at your origin.
* **Miss**: Although tricky to optimize, there are a few potential remedies:  
   * [Enable Argo Tiered Caching](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache) to check cache in another Cloudflare data center before checking the origin web server.  
   * [Create a custom cache key](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/custom-cache-key/) for multiple URLs to match the same cached resource, for example by ignoring query string.

## Example reports for troubleshooting cache performance

Several examples of helpful insights into your site performance via Cache Analytics include:

* Not caching HTML.  
   * Identify the issue: Select **Add filter** and select **Cache status equals Dynamic**.  
   * Resolution: Set a Cloudflare Cache Rule to [cache dynamic content](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-everything/).

Warning

This option caches all HTML regardless of the presence of dynamic content. If you use this approach to cache pages containing dynamic content, visitors may receive information not intended for them. To avoid caching dynamic content, you can add a condition to the rule's matching criteria to prevent it from matching that content. Some examples include:

* Checking for the presence of a cookie.
* Negative matching against known dynamic content file paths.
* Negative matching against dynamic content extensions (or lack of an extension).

* Short cache expiration TTL.  
   * Identify the issue: Select **Add filter** and select **Cache status equals Revalidated**.  
   * Resolution: [Increase Cloudflare's Edge Cache TTL via a Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/edge-ttl/).
* Need to enable Tiered Cache or Custom Cache Key  
   * Identify the issue: Select **Add filter** and select **Cache status equals Miss**.  
   * Resolution: [Enable Argo Tiered Caching](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache) or [create a custom cache key](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/custom-cache-key/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/performance-review/","name":"Performance review"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/performance-review/cache-performance/","name":"Cache performance"}}]}
```
