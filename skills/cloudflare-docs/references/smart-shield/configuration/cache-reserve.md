---
title: Cache Reserve
description: Persist cached content in R2 storage to eliminate cache evictions and origin fetches.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache Reserve

Availability

Available with Smart Shield Advanced.

Cache Reserve is a large, persistent data store [implemented on top of R2](https://developers.cloudflare.com/r2/). By pushing a single button in the dashboard, your website's cacheable content will be written to Cache Reserve.

In the same way that Tiered Cache builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate upper-tier cache, that will reserve storage space for your assets for as long as you want. This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

Smart Shield Advanced includes 2 TB of storage for Cache Reserve.

## Asset eligibility

Not all assets are eligible for Cache Reserve. To be admitted into Cache Reserve, assets must:

* Be cacheable, according to Cloudflare's standard [cacheability factors](https://developers.cloudflare.com/cache/).
* Have a freshness time-to-live (TTL) of at least 10 hours (set by any means such as Cache-Control / [CDN-Cache-Control](https://developers.cloudflare.com/cache/concepts/cache-control/) origin response headers, [Edge Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl), [Cache TTL By Status](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code/), or [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)),
* Have a Content-Length response header.
* When using [Image transformations](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/), original files are eligible for Cache Reserve, but resized file variants are not eligible because transformations happen after Cache Reserve in the response flow.

## Limits

* Cache Reserve file limits are the same as [R2 limits](https://developers.cloudflare.com/r2/platform/limits/). Note that [CDN cache limits](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#customization-options-and-limits) still apply. Assets larger than standard limits will not be stored in the standard CDN cache, so these assets will incur Cache Reserve operations costs far more frequently.
* Origin Range requests are not supported at this time from Cache Reserve.
* [Vary for images](https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/) is currently not compatible with Cache Reserve.
* Requests to [R2 public buckets linked to a zone's domain](https://developers.cloudflare.com/r2/buckets/public-buckets/) will not use Cache Reserve. Enabling Cache Reserve for the connected zone will use Cache Reserve only for requests not destined for the R2 bucket.
* Cache Reserve makes requests for uncompressed content directly from the origin. Unlike the standard Cloudflare CDN, Cache Reserve does not include the `Accept-Encoding: gzip` header when sending requests to the origin.
* Cache Reserve is bypassed when using the Cloudflare [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) setup.

## Delete data

You can remove all data stored in Cache Reserve. In most cases, deletion takes around 24 hours to be completed.

1. Select the three dots next to Cache Reserve in your Smart Shield configurations.
2. Choose **View details** to open the Cache Reserve sidebar.
3. Make sure to pause Cache Reserve.
4. Select **Delete data** and then **Save**.
5. Select **Delete** again in the dialog to confirm.

Note

If you want to purge your cache instead, refer to [cache configurations](https://developers.cloudflare.com/cache/how-to/purge-cache/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/cache-reserve/","name":"Cache Reserve"}}]}
```
