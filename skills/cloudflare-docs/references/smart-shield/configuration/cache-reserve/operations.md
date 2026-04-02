---
title: Cache Reserve operations
description: Operations are performed by Cache Reserve on behalf of the user to write data from the origin to Cache Reserve and to pass that data downstream to other parts of Cloudflare’s network. These operations are managed internally by Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/configuration/cache-reserve/operations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cache Reserve operations

Operations are performed by Cache Reserve on behalf of the user to write data from the origin to Cache Reserve and to pass that data downstream to other parts of Cloudflare’s network. These operations are managed internally by Cloudflare.

#### Class A operations (writes)

Class A operations are performed based on cache misses from Cloudflare’s CDN. When a request cannot be served from cache, it will be fetched from the origin and written to cache reserve as well as our edge caches on the way back to the visitor.

#### Class B operations (reads)

Class B operations are performed when data needs to be fetched from Cache Reserve to respond to a miss in the edge cache.

#### Purge

Asset purges are free operations.

Cache Reserve will be instantly purged along with edge cache when you send a purge by URL request. Refer to [cache configurations](https://developers.cloudflare.com/cache/how-to/purge-cache/) for details.

Other purge methods, such as purge by tag, host, prefix, or purge everything will force an attempt to [revalidate](https://developers.cloudflare.com/cache/concepts/cache-responses/#revalidated) on the subsequent request for the Cache Reserve asset. Note that assets purged this way will still incur storage costs until their retention TTL expires.

Note

Note this differs from the standard CDN's purge by tag, host, or prefix features which force a cache miss, requiring the origin to deliver the asset in full.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/cache-reserve/","name":"Cache Reserve"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/cache-reserve/operations/","name":"Cache Reserve operations"}}]}
```
