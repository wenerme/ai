---
description: Access to the default cache is enabled by default:
title: Cache
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [Cache Reference](https://developers.cloudflare.com/workers/runtime-apis/cache)
* [How the Cache works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#cache-api)(note that cache using `fetch` is unsupported)

## Default Cache

Access to the default cache is enabled by default:

```js
addEventListener("fetch", (e) => {
	e.respondWith(caches.default.match("http://miniflare.dev"));
});
```

## Named Caches

You can access a namespaced cache using `open`. Note that you cannot name your cache `default`, trying to do so will throw an error:

```js
await caches.open("cache_name");
```

## Persistence

By default, cached data is stored in memory. It will persist between reloads, but not different `Miniflare` instances. To enable persistence to the file system, specify the cache persistence option:

```js
const mf = new Miniflare({
	cachePersist: true, // Defaults to ./.mf/cache
	cachePersist: "./data", // Custom path
});
```

## Manipulating Outside Workers

For testing, it can be useful to put/match data from cache outside a Worker. You can do this with the `getCaches` method:

```js
import { Miniflare, Response } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request) {
      const url = new URL(request.url);
      const cache = caches.default;
      if(url.pathname === "/put") {
        await cache.put("https://miniflare.dev/", new Response("1", {
          headers: { "Cache-Control": "max-age=3600" },
        }));
      }
      return cache.match("https://miniflare.dev/");
    }
  }
  `,
});
let res = await mf.dispatchFetch("http://localhost:8787/put");
console.log(await res.text()); // 1

const caches = await mf.getCaches(); // Gets the global caches object
const cachedRes = await caches.default.match("https://miniflare.dev/");
console.log(await cachedRes.text()); // 1

await caches.default.put(
	"https://miniflare.dev",
	new Response("2", {
		headers: { "Cache-Control": "max-age=3600" },
	}),
);
res = await mf.dispatchFetch("http://localhost:8787");
console.log(await res.text()); // 2
```

## Purging

You can programmatically purge all entries from a cache using the `purgeCache` method on the `Miniflare` instance. This is useful during development when cached assets need to be cleared without restarting the instance:

```js
const mf = new Miniflare({ /* options */ });

// Purge the default cache and get the number of entries purged
const count = await mf.purgeCache();
console.log(`Purged ${count} entries`);

// Purge a specific named cache
await mf.purgeCache("my-named-cache");
```

## Disabling

Both default and named caches can be disabled with the `disableCache` option. When disabled, the caches will still be available in the sandbox, they just won't cache anything. This may be useful during development:

```js
const mf = new Miniflare({
	cache: false,
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/#page","headline":"Cache · Cloudflare Workers docs","description":"Access to the default cache is enabled by default:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
