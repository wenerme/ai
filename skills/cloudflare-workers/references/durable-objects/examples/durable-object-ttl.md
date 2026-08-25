---
description: Use the Durable Objects Alarms API to implement a Time To Live (TTL) for Durable Object instances.
title: Durable Object Time To Live
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable Object Time To Live

Implement a Time To Live (TTL) for Durable Object instances.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A common feature request for Durable Objects is a Time To Live (TTL) for Durable Object instances. Durable Objects give developers the tools to implement a custom TTL in only a few lines of code. This example demonstrates how to implement a TTL making use of `alarms`. While this TTL will be extended upon every new request to the Durable Object, this can be customized based on a particular use case.

Be careful when calling \`setAlarm\` in the Durable Object class constructor

In this example the TTL is extended upon every new fetch request to the Durable Object. It might be tempting to instead extend the TTL in the constructor of the Durable Object. This is not advised because the Durable Object's constructor will be called before invoking the alarm handler if the alarm wakes the Durable Object up from hibernation. This approach will naively result in the constructor continually extending the TTL without running the alarm handler. If you must call `setAlarm` in the Durable Object class constructor be sure to check that there is no alarm previously set.

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class MyDurableObject extends DurableObject {
  // Time To Live (TTL) in milliseconds
  timeToLiveMs = 1000;

  constructor(ctx, env) {
    super(ctx, env);
  }

  async fetch(_request) {
    // Extend the TTL immediately following every fetch request to a Durable Object.
    await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);
    ...
   }

  async alarm() {
    await this.ctx.storage.deleteAll();
  }
}

// Worker
export default {
  async fetch(request, env) {
    const stub = env.MY_DURABLE_OBJECT.getByName("foo");
    return await stub.fetch(request);
  },
};
```

```ts
import { DurableObject } from "cloudflare:workers";

export interface Env {
  MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
}

// Durable Object
export class MyDurableObject extends DurableObject {
  // Time To Live (TTL) in milliseconds
  timeToLiveMs = 1000;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async fetch(_request: Request) {
    // Extend the TTL immediately following every fetch request to a Durable Object.
    await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);
    ...
   }

  async alarm() {
    await this.ctx.storage.deleteAll();
  }
}

// Worker
export default {
  async fetch(request, env) {
    const stub = env.MY_DURABLE_OBJECT.getByName("foo");
    return await stub.fetch(request);
  },
} satisfies ExportedHandler<Env>;
```

```py
from workers import DurableObject, Response, WorkerEntrypoint
import time

# Durable Object
class MyDurableObject(DurableObject):
	# Time To Live (TTL) in milliseconds
	timeToLiveMs = 1000

	def __init__(self, ctx, env):
		super().__init__(ctx, env)

	async def fetch(self, _request):
		# Extend the TTL immediately following every fetch request to a Durable Object.
		await self.ctx.storage.setAlarm(int(time.time() * 1000) + self.timeToLiveMs)
		...

	async def alarm(self):
		await self.ctx.storage.deleteAll()

# Worker
class Default(WorkerEntrypoint):
	async def fetch(self, request):
		stub = self.env.MY_DURABLE_OBJECT.getByName("foo")
		return await stub.fetch(request)
```

To test and deploy this example, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "durable-object-ttl",
	"main": "src/index.ts",
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				"class_name": "MyDurableObject"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"MyDurableObject"
			]
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "durable-object-ttl"
main = "src/index.ts"

[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyDurableObject" ]
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/#page","headline":"Durable Object Time To Live · Cloudflare Durable Objects docs","description":"Use the Durable Objects Alarms API to implement a Time To Live (TTL) for Durable Object instances.","url":"https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
