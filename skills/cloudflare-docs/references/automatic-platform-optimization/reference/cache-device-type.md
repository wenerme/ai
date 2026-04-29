---
title: Cache by device type
description: Serve different cached content to mobile, tablet, and desktop visitors.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers) 

# Cache by device type

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/automatic-platform-optimization/reference/cache-device-type/","name":"Cache by device type"}}]}
```
