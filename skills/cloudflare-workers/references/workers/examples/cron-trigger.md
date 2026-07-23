---
description: Set a Cron Trigger for your Worker.
title: Setting Cron Triggers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Setting Cron Triggers

Set a Cron Trigger for your Worker.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/cron-trigger/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async scheduled(controller, env, ctx) {
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
		console.log("cron processed");
	},
};
```

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def scheduled(self, controller, env, ctx):
  			print("cron processed")
```

```ts
import { Hono } from "hono";

interface Env {}

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// Regular routes for normal HTTP requests
app.get("/", (c) => c.text("Hello World!"));

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
		console.log("cron processed");

		// You could also perform actions like:
		// - Fetching data from external APIs
		// - Updating KV or Durable Object storage
		// - Running maintenance tasks
		// - Sending notifications
	},
};
```

## Set Cron Triggers in Wrangler

Refer to [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for more information on how to add a Cron Trigger.

If you are deploying with Wrangler, set the cron syntax (once per hour as shown below) by adding this to your Wrangler file:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "worker",
	// ...
	"triggers": {
		"crons": [
			"0 * * * *"
		]
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "worker"

[triggers]
crons = [ "0 * * * *" ]
```

You also can set a different Cron Trigger for each [environment](https://developers.cloudflare.com/workers/wrangler/environments/) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). You need to put the `[triggers]` table under your chosen environment. For example:

```jsonc
{
	"env": {
		"dev": {
			"triggers": {
				"crons": [
					"0 * * * *"
				]
			}
		}
	}
}
```

```toml
[env.dev.triggers]
crons = [ "0 * * * *" ]
```

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev). This will expose a `/__scheduled` (or `/cdn-cgi/handler/scheduled` for Python Workers) route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
npx wrangler dev --test-scheduled

curl "http://localhost:8787/__scheduled?cron=0+*+*+*+*"

curl "http://localhost:8787/cdn-cgi/handler/scheduled?cron=*+*+*+*+*" # Python Workers
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cron-trigger/#page","headline":"Setting Cron Triggers · Cloudflare Workers docs","description":"Set a Cron Trigger for your Worker.","url":"https://developers.cloudflare.com/workers/examples/cron-trigger/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript"]}
```
