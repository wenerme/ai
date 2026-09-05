---
description: Run Workers on a recurring schedule using the scheduled() handler and Cron Triggers.
title: Scheduled Handler
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Scheduled Handler

Last updated Sep 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

When a Worker is invoked via a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/), the `scheduled()` handler handles the invocation.

Testing scheduled() handlers in local development

You can test the behavior of your `scheduled()` handler in local development by sending an HTTP request to `/cdn-cgi/local/scheduled` to trigger the handler. Pass `?format=json` to return the structured scheduled handler result.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?format=json"
```

---

## Syntax

```js
export default {
	async scheduled(controller, env, ctx) {
		await doSomeTaskOnASchedule();
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
		await doSomeTaskOnASchedule();
	},
};
```

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller, env, ctx):
        # controller.cron contains the cron pattern that triggered this event
        # controller.scheduledTime contains the scheduled time in ms since epoch
        print(f"Cron triggered: {controller.cron}")
```

### Properties

* `controller.cron` string
  * The value of the [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) that started the `ScheduledEvent`.
* `controller.type` string
  * The type of controller. This will always return `"scheduled"`.
* `controller.scheduledTime` number
  * The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as `new Date(controller.scheduledTime)`.
* `env` object
  * An object containing the bindings associated with your Worker using ES modules format, such as KV namespaces and Durable Objects.
* `ctx` object
  * An object containing the context associated with your Worker using ES modules format. Currently, this object just contains the `waitUntil` function.

### Handle multiple cron triggers

When you configure multiple [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for a single Worker, each trigger invokes the same `scheduled()` handler. Use `controller.cron` to distinguish which schedule fired and run different logic for each.

```jsonc
{
	"triggers": {
		"crons": ["*/5 * * * *", "0 0 * * *"],
	},
}
```

```toml
[triggers]
crons = [ "*/5 * * * *", "0 0 * * *" ]
```

```js
export default {
	async scheduled(controller, env, ctx) {
		switch (controller.cron) {
			case "*/5 * * * *":
				await fetch("https://example.com/api/sync");
				break;
			case "0 0 * * *":
				await env.MY_KV.put("last-cleanup", new Date().toISOString());
				break;
		}
	},
};
```

```ts
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		switch (controller.cron) {
			case "*/5 * * * *":
				await fetch("https://example.com/api/sync");
				break;
			case "0 0 * * *":
				await env.MY_KV.put("last-cleanup", new Date().toISOString());
				break;
		}
	},
} satisfies ExportedHandler<Env>;
```

```python
from workers import WorkerEntrypoint, fetch
from datetime import datetime, timezone

class Default(WorkerEntrypoint):
    async def scheduled(self, controller, env, ctx):
        if controller.cron == "*/5 * * * *":
            await fetch("https://example.com/api/sync")
        elif controller.cron == "0 0 * * *":
            await env.MY_KV.put("last-cleanup", datetime.now(timezone.utc).isoformat())
```

The value of `controller.cron` is the exact cron expression string from your configuration. It must match character-for-character, including spacing.

### Methods

When a Workers script is invoked by a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the `scheduled` function in your Workers Module class. The `ctx` argument represents the context your function runs in, and contains the following methods to control what happens next:

* `ctx.waitUntil(promise)` : void - Use this method to register asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching) that should settle before the invocation completes. The first `ctx.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) Past Events table. Otherwise, it will be reported as a success.

Note

The runtime waits for the promise returned by the `scheduled()` handler to resolve (up to the 15-minute duration limit). You do not need to use `waitUntil()` for the runtime to wait for a single asynchronous task. `waitUntil()` is most useful when you need to run multiple concurrent tasks, or when you want the outcome of a specific promise to be recorded as the Cron Trigger invocation status.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/#page","headline":"Scheduled Handler · Cloudflare Workers docs","description":"Run Workers on a recurring schedule using the scheduled() handler and Cron Triggers.","url":"https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
