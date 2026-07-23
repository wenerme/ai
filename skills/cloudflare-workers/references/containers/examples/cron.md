---
description: Running a container on a schedule using Cron Triggers
title: Cron Container
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cron Container

Running a container on a schedule using Cron Triggers

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/examples/cron/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To launch a container on a schedule, you can use a Workers [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

For a full example, see the [Cron Container Template ↗](https://github.com/mikenomitch/cron-container/tree/main).

Use a cron expression in your Wrangler config to specify the schedule:

```jsonc
{
	"name": "cron-container",
	"main": "src/index.ts",
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
	"migrations": [
		{
			"new_sqlite_classes": ["CronContainer"],
			"tag": "v1"
		}
	]
}
```

```toml
name = "cron-container"
main = "src/index.ts"

[triggers]
crons = [ "*/2 * * * *" ]

[[containers]]
class_name = "CronContainer"
image = "./Dockerfile"

[[durable_objects.bindings]]
class_name = "CronContainer"
name = "CRON_CONTAINER"

[[migrations]]
new_sqlite_classes = [ "CronContainer" ]
tag = "v1"
```

Then in your Worker, call your Container from the "scheduled" handler:

```ts
import { Container, getContainer } from '@cloudflare/containers';

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

  async scheduled(_controller: any, env: { CRON_CONTAINER: DurableObjectNamespace<CronContainer> }) {
    let container = getContainer(env.CRON_CONTAINER);
    await container.start({
      envVars: {
				MESSAGE: "Start Time: " + new Date().toISOString(),
      }
    })
  },
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/cron/#page","headline":"Cron Container · Cloudflare Containers docs","description":"Running a container on a schedule using Cron Triggers","url":"https://developers.cloudflare.com/containers/examples/cron/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
