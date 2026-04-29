---
title: How Workers interact with Cache Rules
description: How Workers interact with Cache Rules execution.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Workers interact with Cache Rules

Your Workers script can override [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) behavior, whether it is applied to a zone using Cloudflare or a zone that is not proxied through Cloudflare.

For example, if there is a cache rule configured to bypass cache for `example.com/foo`, but your Workers script sets `cacheEverything: true`, the script's setting will take precedence, and the request will be cached. The same applies if the request is made to a non-Cloudflare zone — the Worker's `cacheEverything` setting will still override.

## Precedence order

Cache behavior is determined by the following order of precedence:

1. [Workers](https://developers.cloudflare.com/workers/) script settings
2. [Cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
3. [Page rules](https://developers.cloudflare.com/rules/page-rules/)

Cache rules override page rule settings, and Workers scripts override cache rules. Among rules at the same level, the one with the highest specificity takes priority.

## Compatibility flags

This override behavior is controlled by [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/):

* For the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/): `request_cf_overrides_cache_rules`
* For the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/): `cache_api_request_cf_overrides_cache_rules`

These flags must be enabled to allow Workers scripts to override cache rules.

### Compatibility date behavior

Whether these flags are enabled by default depends on your Worker's compatibility date:

* **Fetch API (`request_cf_overrides_cache_rules`)**  
   * Enabled by default for compatibility dates **on or after 2025-04-02**.
* **Cache API (`cache_api_request_cf_overrides_cache_rules`)**  
   * Enabled by default for compatibility dates **on or after 2025-05-19**.  
   * **Important:** For `cache_api_request_cf_overrides_cache_rules` to be recognized, you must also enable `cache_api_compat_flags`.  
         * `cache_api_compat_flags` enables the compatibility flag functionality for Workers. If `cache_api_compat_flags` is not set, then no compatibility flags — even if configured — will be recognized by the Cache API.  
         * `cache_api_compat_flags` is enabled by default for compatibility dates **on or after 2025-04-19**.

If your Worker has an earlier compatibility date than the ones listed above, the corresponding flags must be manually enabled; otherwise, cache behavior will follow the original cache rules instead of the Worker's settings.

### Example (Older compatibility date)

If a cache rule is configured to bypass cache for `example.com/foo`, and a Worker with a compatibility date of `2025-04-02` or earlier tries to set `cacheEverything: true`, the cache rule will take effect, and the response will not be cached.

Likewise, if using the Cache API without `cache_api_compat_flags` enabled, even if you enable `cache_api_request_cf_overrides_cache_rules`, the Cache API will not take effect.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/workers-cache-rules/","name":"How Workers interact with Cache Rules"}}]}
```
