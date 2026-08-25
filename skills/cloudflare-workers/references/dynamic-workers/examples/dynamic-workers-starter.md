---
description: A starter template for deploying a Worker that loads and runs Dynamic Workers.
title: Dynamic Workers Starter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic Workers Starter

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-starter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A [starter template ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers) for deploying a Worker that loads and runs [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/).

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers)

## What it does

This template demonstrates how to use the [Worker Loader API](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) to execute code at runtime. The host Worker exposes an `/api/run` endpoint that accepts code from the frontend, loads it into a sandboxed Dynamic Worker, and returns the result.

Use this pattern for AI agents that need to execute a snippet of code to complete an action.

## Configuration

Add a `worker_loaders` binding to your Wrangler file:

```jsonc
{
	"worker_loaders": [
		{
			"binding": "LOADER"
		}
	]
}
```

```toml
[[worker_loaders]]
binding = "LOADER"
```

## Loading and executing a Dynamic Worker

In this example:

* `env.LOADER.load()` creates a one-off dynamic isolate
* `globalOutbound: null` blocks all outbound network access from the Dynamic Worker

```js
export default {
	async fetch(request, env) {
		const { code } = await request.json();

		const worker = env.LOADER.load({
			compatibilityDate: "2026-05-01",
			mainModule: "worker.js",
			modules: {
				"worker.js": code,
			},
			// Block all outbound network access
			globalOutbound: null,
		});

		const result = await worker.getEntrypoint().fetch(request);
		return result;
	},
};
```

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const { code } = await request.json();

		const worker = env.LOADER.load({
			compatibilityDate: "2026-05-01",
			mainModule: "worker.js",
			modules: {
				"worker.js": code,
			},
			// Block all outbound network access
			globalOutbound: null,
		});

		const result = await worker.getEntrypoint().fetch(request);
		return result;
	},
} satisfies ExportedHandler;
```

## Running locally

```sh
npm install
npm run dev
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-starter/#page","headline":"Dynamic Workers Starter · Cloudflare Dynamic Workers docs","description":"A starter template for deploying a Worker that loads and runs Dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-starter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript"]}
```
