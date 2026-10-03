---
description: Running a container on a schedule using Cron Triggers
title: Cron container
image: https://developers.cloudflare.com/containers/examples/cron/og.png?v=8aa941b4f4fd1c08
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cron container

Running a container on a schedule using Cron Triggers

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/examples/cron/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run a short container task every two minutes with a Workers [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/). The task prints its scheduled time, then exits.

## Configure the schedule

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "cron-container",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-10-02",
  "observability": {
    "enabled": true
  },
  "triggers": {
    "crons": [
      "*/2 * * * *"
    ]
  },
  "containers": [
    {
      "class_name": "CronContainer",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile"
        }
      }
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "CRON_CONTAINER",
        "class_name": "CronContainer"
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
compatibility_date = "2026-10-02"

[observability]
enabled = true

[triggers]
crons = ["*/2 * * * *"]

[[containers]]
class_name = "CronContainer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
name = "CRON_CONTAINER"
class_name = "CronContainer"

[exports.CronContainer]
type = "durable-object"
storage = "sqlite"
```

## Start and await the task

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
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: { MESSAGE: `Scheduled time: ${startTime}` },
			});
		}
		await container.monitor();
	}
}

export default {
	fetch() {
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
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: { MESSAGE: `Scheduled time: ${startTime}` },
			});
		}
		await container.monitor();
	}
}

export default {
	fetch(): Response {
		return new Response("This Worker runs a scheduled Container task.");
	},
	async scheduled(controller: ScheduledController, env: Env): Promise<void> {
		await env.CRON_CONTAINER.getByName("cron").run(
			new Date(controller.scheduledTime).toISOString(),
		);
	},
} satisfies ExportedHandler<Env>;
```

All triggers use the same Durable Object. If a run is still active, another trigger waits for that run instead of starting a second task. This example does not queue overlapping runs or guarantee exactly-once execution. Make tasks idempotent when they modify external data.

`monitor()` reports completion or failure, not HTTP readiness. Keep this task short enough to finish within the [Cron Trigger execution limits](https://developers.cloudflare.com/workers/platform/limits/#duration).

## Define the task

*Dockerfiledockerfile*

```dockerfile
FROM alpine:3.20
CMD ["sh", "-c", "printf '%s\\n' \"$MESSAGE\""]
```

## Test the schedule locally

Start a Docker-compatible engine and use Wrangler 4.136.0 or later.

npmyarnpnpmbun

```
npm i -D wrangler
```

```
yarn add -D wrangler
```

```
pnpm add -D wrangler
```

```
bun add -d wrangler
```

npmyarnpnpm

```
npx wrangler dev --test-scheduled
```

```
yarn wrangler dev --test-scheduled
```

```
pnpm wrangler dev --test-scheduled
```

In another terminal, trigger the scheduled handler:

```sh
curl 'http://localhost:8787/__scheduled?cron=*/2+*+*+*+*'
```

Check the container logs for the scheduled time. After deployment, Cron Triggers invoke the handler automatically.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/cron/#page","headline":"Cron container","description":"Running a container on a schedule using Cron Triggers","url":"https://developers.cloudflare.com/containers/examples/cron/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/examples/cron/og.png?v=8aa941b4f4fd1c08","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
