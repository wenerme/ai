---
description: Running a container on a schedule using Cron Triggers
title: Cron Container
image: https://developers.cloudflare.com/containers/examples/cron/og.png?v=a275c8790d876c29
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cron Container

Running a container on a schedule using Cron Triggers

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/cron/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To launch a container on a schedule, you can use a Workers [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

Use a cron expression in your Wrangler config to specify the schedule:

```jsonc
{
	"name": "cron-container",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-09-30",
	"observability": {
		"enabled": true
	},
	"triggers": {
		"crons": [
			"*/2 * * * *" // Run every 2 minutes
		]
	},
	"containers": [
		{
			"class_name": "CronContainer",
			"image": "./Dockerfile"
		}
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "CronContainer",
				"name": "CRON_CONTAINER"
			}
		]
	},
	"exports": {
		"CronContainer": {
			"type": "durable-object",
			"storage": "sqlite"
		}
	}
}
```

```toml
name = "cron-container"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-30"

[observability]
enabled = true

[triggers]
crons = [ "*/2 * * * *" ]

[[containers]]
class_name = "CronContainer"
image = "./Dockerfile"

[[durable_objects.bindings]]
class_name = "CronContainer"
name = "CRON_CONTAINER"

[exports.CronContainer]
type = "durable-object"
storage = "sqlite"
```

Call the Container from the Worker's `scheduled()` handler. The container image runs the task on startup and exits when finished. Await `monitor()` to observe completion or failure.

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class CronContainer extends DurableObject {
	currentRun;

	run(startTime) {
		this.currentRun ??= this.runOnce(startTime).finally(() => {
			this.currentRun = undefined;
		});
		return this.currentRun;
	}

	async runOnce(startTime) {
		const container = this.ctx.container;
		if (!container.running) {
			console.log("Starting scheduled task:", startTime);
			container.start();
		}
		await container.monitor();
	}
}

export default {
	async fetch() {
		return new Response("This Worker runs a scheduled Container task.");
	},

	async scheduled(controller, env) {
		await env.CRON_CONTAINER.getByName("cron").run(
			new Date(controller.scheduledTime).toISOString(),
		);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
	CRON_CONTAINER: DurableObjectNamespace<CronContainer>;
}

export class CronContainer extends DurableObject<Env> {
	private currentRun: Promise<void> | undefined;

	run(startTime: string): Promise<void> {
		this.currentRun ??= this.runOnce(startTime).finally(() => {
			this.currentRun = undefined;
		});
		return this.currentRun;
	}

	private async runOnce(startTime: string): Promise<void> {
		const container = this.ctx.container!;
		if (!container.running) {
			console.log("Starting scheduled task:", startTime);
			container.start();
		}
		await container.monitor();
	}
}

export default {
	async fetch(): Promise<Response> {
		return new Response("This Worker runs a scheduled Container task.");
	},

	async scheduled(controller: ScheduledController, env: Env): Promise<void> {
		await env.CRON_CONTAINER
			.getByName("cron")
			.run(new Date(controller.scheduledTime).toISOString());
	},
};
```

*src/index.jsjs*

```js
import { Container, getContainer } from "@cloudflare/containers";

export class CronContainer extends Container {
	sleepAfter = "10s";

	onStart() {
		console.log("Starting container");
	}

	onStop() {
		console.log("Container stopped");
	}
}

export default {
	async fetch() {
		return new Response(
			"This Worker runs a cron job to execute a container on a schedule.",
		);
	},

	async scheduled(controller, env) {
		const container = getContainer(env.CRON_CONTAINER);
		await container.start({
			envVars: {
				MESSAGE: `Start Time: ${new Date(controller.scheduledTime).toISOString()}`,
			},
		});
	},
};
```

*src/index.tsts*

```ts
import { Container, getContainer } from "@cloudflare/containers";

export class CronContainer extends Container {
  sleepAfter = '10s';

  override onStart() {
    console.log('Starting container');
  }

  override onStop() {
    console.log('Container stopped');
  }
}

export default {
	async fetch(): Promise<Response> {
		return new Response("This Worker runs a cron job to execute a container on a schedule.");
	},

	async scheduled(
		controller: ScheduledController,
		env: { CRON_CONTAINER: DurableObjectNamespace<CronContainer> },
	): Promise<void> {
		const container = getContainer(env.CRON_CONTAINER);
		await container.start({
			envVars: {
				MESSAGE: `Start Time: ${new Date(controller.scheduledTime).toISOString()}`,
			},
		});
	},
};
```

For a full Container class example, see the [Cron Container Template ↗︎](https://github.com/mikenomitch/cron-container/tree/main).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/cron/#page","headline":"Cron Container","description":"Running a container on a schedule using Cron Triggers","url":"https://developers.cloudflare.com/containers/examples/cron/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/cron/og.png?v=a275c8790d876c29","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
