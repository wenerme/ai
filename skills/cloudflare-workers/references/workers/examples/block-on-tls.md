---
description: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
title: Block on TLS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Block on TLS

Inspects the incoming request's TLS version and blocks if under TLSv1.2.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/block-on-tls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		try {
			const tlsVersion = request.cf.tlsVersion;
			// Allow only TLS versions 1.2 and 1.3
			if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
				return new Response("Please use TLS version 1.2 or higher.", {
					status: 403,
				});
			}
			return fetch(request);
		} catch (err) {
			console.error(
				"request.cf does not exist in the previewer, only in production",
			);
			return new Response(`Error in workers script ${err.message}`, {
				status: 500,
			});
		}
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		try {
			const tlsVersion = request.cf.tlsVersion;
			// Allow only TLS versions 1.2 and 1.3
			if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
				return new Response("Please use TLS version 1.2 or higher.", {
					status: 403,
				});
			}
			return fetch(request);
		} catch (err) {
			console.error(
				"request.cf does not exist in the previewer, only in production",
			);
			return new Response(`Error in workers script ${err.message}`, {
				status: 500,
			});
		}
	},
} satisfies ExportedHandler;
```

```ts
import { Hono } from "hono";

const app = new Hono();

// Middleware to check TLS version
app.use("*", async (c, next) => {
	// Access the raw request to get the cf object with TLS info
	const request = c.req.raw;
	const tlsVersion = request.cf?.tlsVersion;

	// Allow only TLS versions 1.2 and 1.3
	if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
		return c.text("Please use TLS version 1.2 or higher.", 403);
	}

	await next();

});

app.onError((err, c) => {
		console.error(
			"request.cf does not exist in the previewer, only in production",
		);
		return c.text(`Error in workers script: ${err.message}`, 500);
});

app.get("/", async (c) => {
	return c.text(`TLS Version: ${c.req.raw.cf.tlsVersion}`);
});

export default app;
```

```py
from workers import WorkerEntrypoint, Response, fetch

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        tls_version = request.cf.tlsVersion
        if tls_version not in ("TLSv1.2", "TLSv1.3"):
            return Response("Please use TLS version 1.2 or higher.", status=403)
        return fetch(request)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/block-on-tls/#page","headline":"Block on TLS · Cloudflare Workers docs","description":"Inspects the incoming request's TLS version and blocks if under TLSv1.2.","url":"https://developers.cloudflare.com/workers/examples/block-on-tls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","Middleware","JavaScript","TypeScript","Python"]}
```
