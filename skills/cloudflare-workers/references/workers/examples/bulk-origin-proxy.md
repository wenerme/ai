---
description: Resolve requests to your domain to a set of proxy third-party origin URLs.
title: Bulk origin override
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk origin override

Resolve requests to your domain to a set of proxy third-party origin URLs.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		/**
		 * An object with different URLs to fetch
		 * @param {Object} ORIGINS
		 */
		const ORIGINS = {
			"starwarsapi.yourdomain.com": "swapi.dev",
			"google.yourdomain.com": "www.google.com",
		};

		const url = new URL(request.url);

		// Check if incoming hostname is a key in the ORIGINS object
		if (url.hostname in ORIGINS) {
			const target = ORIGINS[url.hostname];
			url.hostname = target;
			// If it is, proxy request to that third party origin
			return fetch(url.toString(), request);
		}
		// Otherwise, process request as normal
		return fetch(request);
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		/**
		 * An object with different URLs to fetch
		 * @param {Object} ORIGINS
		 */
		const ORIGINS = {
			"starwarsapi.yourdomain.com": "swapi.dev",
			"google.yourdomain.com": "www.google.com",
		};

		const url = new URL(request.url);

		// Check if incoming hostname is a key in the ORIGINS object
		if (url.hostname in ORIGINS) {
			const target = ORIGINS[url.hostname];
			url.hostname = target;
			// If it is, proxy request to that third party origin
			return fetch(url.toString(), request);
		}
		// Otherwise, process request as normal
		return fetch(request);
	},
} satisfies ExportedHandler;
```

```ts
import { Hono } from "hono";
import { proxy } from "hono/proxy";

// An object with different URLs to fetch
const ORIGINS: Record<string, string> = {
	"starwarsapi.yourdomain.com": "swapi.dev",
	"google.yourdomain.com": "www.google.com",
};

const app = new Hono();

app.all("*", async (c) => {
	const url = new URL(c.req.url);

	// Check if incoming hostname is a key in the ORIGINS object
	if (url.hostname in ORIGINS) {
		const target = ORIGINS[url.hostname];
		url.hostname = target;

		// If it is, proxy request to that third party origin
		return proxy(url, c.req.raw);
	}

	// Otherwise, process request as normal
	return proxy(c.req.raw);
});

export default app;
```

```py
from workers import WorkerEntrypoint
from js import fetch, URL

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # A dict with different URLs to fetch
        ORIGINS = {
          "starwarsapi.yourdomain.com": "swapi.dev",
          "google.yourdomain.com": "www.google.com",
        }

        url = URL.new(request.url)

        # Check if incoming hostname is a key in the ORIGINS object
        if url.hostname in ORIGINS:
            url.hostname = ORIGINS[url.hostname]
            # If it is, proxy request to that third party origin
            return fetch(url.toString(), request)

        # Otherwise, process request as normal
        return fetch(request)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/#page","headline":"Bulk origin override · Cloudflare Workers docs","description":"Resolve requests to your domain to a set of proxy third-party origin URLs.","url":"https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript","Python"]}
```
