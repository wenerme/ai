---
description: How the presence of a Worker script influences static asset routing and the related configuration options.
title: Worker script
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Worker script

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you have both static assets and a Worker script configured, Cloudflare will first attempt to serve static assets if one matches the incoming request. You can read more about how we match assets in the [HTML handling docs](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

If an appropriate static asset if not found, Cloudflare will invoke your Worker script.

This allows you to easily combine together these two features to create powerful applications (e.g. a [full-stack application](https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/), or a [Single Page Application (SPA)](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) or [Static Site Generation (SSG) application](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/) with an API).

## Cloudflare Access context

Note

When a Worker has Static Assets, the internal assets router does not pass `ctx.access` to the user Worker. Access still protects the Worker and its assets, but `ctx.access` is unavailable to the user Worker. For more information, refer to [ctx.access limitations](https://developers.cloudflare.com/workers/configuration/cloudflare-access/#ctxaccess-limitations).

## Run your Worker script first

You can configure the [assets.run\_worker\_first setting](https://developers.cloudflare.com/workers/static-assets/binding/#run%5Fworker%5Ffirst) to control when your Worker script runs relative to static asset serving. This gives you more control over exactly how and when those assets are served and can be used to implement "middleware" for requests.

Caution

If you are using [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) in combination with `assets.run_worker_first`, you may find that placement decisions are not optimized correctly as, currently, the entire Worker script is placed as a single unit. This may not accurately reflect the desired "split" in behavior of edge-first vs. smart-placed compute for your application. This is a limitation that we are currently working to resolve.

### Run Worker before each request

If you need to always run your Worker script before serving static assets (for example, you wish to log requests, perform some authentication checks, use [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/), or otherwise transform assets before serving), set `run_worker_first` to `true`:

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"main": "./worker/index.ts",
	"assets": {
		"directory": "./dist/",
		"binding": "ASSETS",
		"run_worker_first": true
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-08-25"
main = "./worker/index.ts"

[assets]
directory = "./dist/"
binding = "ASSETS"
run_worker_first = true
```

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	async fetch(request) {
		// You can perform checks before fetching assets
		const user = await checkIfRequestIsAuthenticated(request);

		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		// You can then just fetch the assets as normal, or you could pass in a custom Request object here if you wanted to fetch some other specific asset
		const assetResponse = await this.env.ASSETS.fetch(request);

		// You can return static asset response as-is, or you can transform them with something like HTMLRewriter
		return new HTMLRewriter()
			.on("#user", {
				element(element) {
					element.setInnerContent(JSON.stringify({ name: user.name }));
				},
			})
			.transform(assetResponse);
	}
}
```

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request) {
		// You can perform checks before fetching assets
		const user = await checkIfRequestIsAuthenticated(request);

		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		// You can then just fetch the assets as normal, or you could pass in a custom Request object here if you wanted to fetch some other specific asset
		const assetResponse = await this.env.ASSETS.fetch(request);

		// You can return static asset response as-is, or you can transform them with something like HTMLRewriter
		return new HTMLRewriter()
			.on("#user", {
				element(element) {
					element.setInnerContent(JSON.stringify({ name: user.name }));
				},
			})
			.transform(assetResponse);
	}
}
```

### Run Worker first for selective paths

You can also configure selective Worker-first routing using an array of route patterns, often paired with the [single-page-application setting](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/#advanced-routing-control). This allows you to run the Worker first only for specific routes while letting other requests follow the default asset-first behavior:

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"main": "./worker/index.ts",
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "single-page-application",
		"binding": "ASSETS",
		"run_worker_first": ["/oauth/callback"]
	}
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-08-25"
main = "./worker/index.ts"

[assets]
directory = "./dist/"
not_found_handling = "single-page-application"
binding = "ASSETS"
run_worker_first = [ "/oauth/callback" ]
```

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	async fetch(request) {
		// The only thing this Worker script does is handle an OAuth callback.
		// All other requests either serve an asset that matches or serve the index.html fallback, without ever hitting this code.
		const url = new URL(request.url);
		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");

		const accessToken = await exchangeCodeForToken(code, state);
		const sessionIdentifier = await storeTokenAndGenerateSession(accessToken);

		// Redirect back to the index, but set a cookie that the front-end will use.
		return new Response(null, {
			headers: {
				Location: "/",
				"Set-Cookie": `session_token=${sessionIdentifier}; HttpOnly; Secure; SameSite=Lax; Path=/`,
			},
		});
	}
}
```

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request) {
		// The only thing this Worker script does is handle an OAuth callback.
		// All other requests either serve an asset that matches or serve the index.html fallback, without ever hitting this code.
		const url = new URL(request.url);
		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");

		const accessToken = await exchangeCodeForToken(code, state);
		const sessionIdentifier = await storeTokenAndGenerateSession(accessToken);

		// Redirect back to the index, but set a cookie that the front-end will use.
		return new Response(null, {
			headers: {
				Location: "/",
				"Set-Cookie": `session_token=${sessionIdentifier}; HttpOnly; Secure; SameSite=Lax; Path=/`,
			},
		});
	}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/worker-script/#page","headline":"Worker script · Cloudflare Workers docs","description":"How the presence of a Worker script influences static asset routing and the related configuration options.","url":"https://developers.cloudflare.com/workers/static-assets/routing/worker-script/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
