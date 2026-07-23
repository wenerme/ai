---
description: Serve different cached content to mobile, tablet, and desktop visitors.
title: Cache by device type
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache by device type

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

APO cache by device type provides all of the same benefits of Cloudflare's cache while targeting visitors with content appropriate to their device. Cloudflare evaluates the `User-Agent` header in the HTTP request to identify the device type. Cloudflare then identifies each device type with a case insensitive match to the regex below:

* **Mobile**: `(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera mini|avantgo|mobilesafari|docomo|kaios)`
* **Tablet**: `(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))`
* **Desktop**: Everything else not matched above.

To enable caching by device type, enable the setting from the Cloudflare dashboard's APO card or from the WordPress plugin version 4.4.0 or later.

Once enabled, Cloudflare sends a `CF-Device-Type` HTTP header to your origin with a value of either `mobile`, `tablet`, `desktop` for every request to specify the visitor’s device type. If your origin responds with the appropriate content for that device type, Cloudflare only caches the resource for that specific device type.

Note

Changing Cache By Device Type setting will invalidate Cache.

The Cloudflare for WordPress plugin automatically purges all cache variations for updated pages.

Cloudflare recommends that you use plugins that support cache by device type, which you may have to enable on the plugin. You will still need to test your plugins to make sure they behave as expected.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/#page","headline":"Cache by device type · Cloudflare Automatic Platform Optimization docs","description":"Serve different cached content to mobile, tablet, and desktop visitors.","url":"https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
