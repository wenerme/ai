---
description: Send Additional Cache Tags using Workers
title: Cache Tags using Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache Tags using Workers

Send Additional Cache Tags using Workers

Last updated Jul 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/cache-tags/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/cache-tags)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		const requestUrl = new URL(request.url);
		const params = requestUrl.searchParams;
		const tags =
			params && params.has("tags") ? params.get("tags").split(",") : [];
		const url = params && params.has("uri") ? params.get("uri") : "";
		if (!url) {
			const errorObject = {
				error: "URL cannot be empty",
			};
			return new Response(JSON.stringify(errorObject), { status: 400 });
		}
		const init = {
			cf: {
				cacheTags: tags,
			},
		};
		return fetch(url, init)
			.then((result) => {
				const cacheStatus = result.headers.get("cf-cache-status");
				const lastModified = result.headers.get("last-modified");
				const response = {
					cache: cacheStatus,
					lastModified: lastModified,
				};
				return new Response(JSON.stringify(response), {
					status: result.status,
				});
			})
			.catch((err) => {
				const errorObject = {
					error: err.message,
				};
				return new Response(JSON.stringify(errorObject), { status: 500 });
			});
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const requestUrl = new URL(request.url);
		const params = requestUrl.searchParams;
		const tags =
			params && params.has("tags") ? params.get("tags").split(",") : [];
		const url = params && params.has("uri") ? params.get("uri") : "";
		if (!url) {
			const errorObject = {
				error: "URL cannot be empty",
			};
			return new Response(JSON.stringify(errorObject), { status: 400 });
		}
		const init = {
			cf: {
				cacheTags: tags,
			},
		};
		return fetch(url, init)
			.then((result) => {
				const cacheStatus = result.headers.get("cf-cache-status");
				const lastModified = result.headers.get("last-modified");
				const response = {
					cache: cacheStatus,
					lastModified: lastModified,
				};
				return new Response(JSON.stringify(response), {
					status: result.status,
				});
			})
			.catch((err) => {
				const errorObject = {
					error: err.message,
				};
				return new Response(JSON.stringify(errorObject), { status: 500 });
			});
	},
} satisfies ExportedHandler;
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.all("*", async (c) => {
	const tags = c.req.query("tags") ? c.req.query("tags").split(",") : [];
	const uri = c.req.query("uri") ? c.req.query("uri") : "";

	if (!uri) {
		return c.json({ error: "URL cannot be empty" }, 400);
	}

	const init = {
		cf: {
			cacheTags: tags,
		},
	};

	const result = await fetch(uri, init);
	const cacheStatus = result.headers.get("cf-cache-status");
	const lastModified = result.headers.get("last-modified");

	const response = {
		cache: cacheStatus,
		lastModified: lastModified,
	};

	return c.json(response, result.status);
});

app.onError((err, c) => {
	return c.json({ error: err.message }, 500);
});

export default app;
```

```py
from workers import WorkerEntrypoint, Response, fetch
from js import URL

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        request_url = URL.new(request.url)
        params = request_url.searchParams
        tags = params["tags"].split(",") if "tags" in params else []
        url = params["uri"] or None

        if url is None:
            return Response.json({"error": "URL cannot be empty"}, status=400)

        result = await fetch(url, cf={"cacheTags": tags})

        cache_status = result.headers["cf-cache-status"]
        last_modified = result.headers["last-modified"]

        return Response.json({"cache": cache_status, "lastModified": last_modified}, status=result.status)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cache-tags/#page","headline":"Cache Tags using Workers · Cloudflare Workers docs","description":"Send Additional Cache Tags using Workers","url":"https://developers.cloudflare.com/workers/examples/cache-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching","JavaScript","TypeScript","Python"]}
```
