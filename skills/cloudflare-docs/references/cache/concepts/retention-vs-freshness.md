---
title: Retention vs Freshness (TTL)
description: In the context of Cloudflare CDN (Content Delivery Network), retention and freshness refer to two separate but related concepts. For an object in cache, freshness is how long it should be considered valid without consulting its source, while retention refers to how long it stays in cache before being removed.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/concepts/retention-vs-freshness.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Retention vs Freshness (TTL)

In the context of Cloudflare CDN (Content Delivery Network), retention and freshness refer to two separate but related concepts. For an object in cache, freshness is how long it should be considered valid without consulting its source, while retention refers to how long it stays in cache before being removed.

## Retention

When a file or resource is requested from a website, Cloudflare caches it to avoid having to ask the origin server for it again the next time it is requested, reducing latency and improving delivery speed. But if an object in cache does not get requested again, eventually it will be removed to make room for newer, more popular objects. This process is called eviction and is a standard part of cache management. When the cache wants to store a new object but does not have room, it uses an algorithm called Least Recently Used, or LRU, to nominate an object to evict and replace it with the new one. An object’s cache retention period refers to the duration the object is stored in Cloudflare’s cache before being evicted. It is worth noting that an object’s retention period is a function of its relative popularity and the size of Cloudflare’s caches, and therefore is not configurable.

## Freshness (TTL)

The time window that an object should be considered safe for a cache to use is dictated by its freshness, also known as Time to Live (TTL). If an object has a TTL of five minutes that means that, starting from the moment the cache first receives the object, for the next five minutes the cache can use that object without checking with the origin again. After five minutes have passed, if Cloudflare gets another request for that object, we cannot use what is stored in the cache without first checking the origin to see if the object is still valid. Those first five minutes in this object’s case are its freshness period. There are a few ways to configure TTLs for resources served through Cloudflare’s Content Delivery Network:

* Include [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/) or [CDN Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/) directives, like `max-age` or `s-maxage`, in the origin cache-control response header.
* Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) or [Workers](https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers/).

If an object in cache is no longer fresh, Cloudflare revalidates it with the origin. When [stale-while-revalidate](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation) is set, revalidation happens asynchronously at expiry — visitors continue to be served from cache while Cloudflare fetches a fresh copy in the background. Without this directive, incoming requests wait for the origin to respond before receiving content. The origin can either confirm the cached object is still valid (refreshing its TTL) or return a new version to replace it. Refer to [Revalidation](https://developers.cloudflare.com/cache/concepts/revalidation/) for details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/concepts/retention-vs-freshness/","name":"Retention vs Freshness (TTL)"}}]}
```
