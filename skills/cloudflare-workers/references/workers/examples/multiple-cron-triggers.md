---
description: Set multiple Cron Triggers on three different schedules.
title: Multiple Cron Triggers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Multiple Cron Triggers

Set multiple Cron Triggers on three different schedules.

Last updated Sep 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/multiple-cron-triggers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async scheduled(event, env, ctx) {
		// Write code for updating your API
		switch (event.cron) {
			case "*/3 * * * *":
				// Every three minutes
				await updateAPI();
				break;
			case "*/10 * * * *":
				// Every ten minutes
				await updateAPI2();
				break;
			case "*/45 * * * *":
				// Every forty-five minutes
				await updateAPI3();
				break;
		}
		console.log("cron processed");
	},
};
```

```ts
interface Env {}
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		// Write code for updating your API
		switch (controller.cron) {
			case "*/3 * * * *":
				// Every three minutes
				await updateAPI();
				break;
			case "*/10 * * * *":
				// Every ten minutes
				await updateAPI2();
				break;
			case "*/45 * * * *":
				// Every forty-five minutes
				await updateAPI3();
				break;
		}
		console.log("cron processed");
	},
};
```

```ts
import { Hono } from "hono";

interface Env {}

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// Regular routes for normal HTTP requests
app.get("/", (c) => c.text("Multiple Cron Trigger Example"));

// Export both the app and a scheduled function
export default {
	// The Hono app handles regular HTTP requests
	fetch: app.fetch,

	// The scheduled function handles Cron triggers
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		// Check which cron schedule triggered this execution
		switch (controller.cron) {
			case "*/3 * * * *":
				// Every three minutes
				await updateAPI();
				break;
			case "*/10 * * * *":
				// Every ten minutes
				await updateAPI2();
				break;
			case "*/45 * * * *":
				// Every forty-five minutes
				await updateAPI3();
				break;
		}
		console.log("cron processed");
	},
};
```

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev). This will expose a `/cdn-cgi/local/scheduled` route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
npx wrangler dev --test-scheduled

curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*" # Python Workers
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/#page","headline":"Multiple Cron Triggers · Cloudflare Workers docs","description":"Set multiple Cron Triggers on three different schedules.","url":"https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript"]}
```
