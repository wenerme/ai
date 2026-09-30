---
description: POST a command to your Worker and read stdout from Linux.
title: Run a Linux command
image: https://developers.cloudflare.com/sandbox/get-started/og.png?v=af1e982b53ac49c7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a Linux command

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You will POST `uname -a` to a Worker and read stdout that contains `Linux`.

## Prerequisites

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use a Node version manager like <a href="https://volta.sh/">Volta ↗︎</a> or <a href="https://github.com/nvm-sh/nvm">nvm ↗︎</a> to avoid permission issues and change Node.js versions. <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler</a>, discussed later in this guide, requires a Node version of <code>16.17.0</code> or later.

</details>

## Run a command in Linux

1. Create a Worker project:npmyarnpnpm

   ```
   npm create cloudflare@latest -- sandbox-linux --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```

   ```
   yarn create cloudflare sandbox-linux --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```

   ```
   pnpm create cloudflare@latest sandbox-linux --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```


2. Change into the project directory:

   ```sh
   cd sandbox-linux
   ```


3. Replace `wrangler.jsonc` so a Durable Object can start a container:

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "sandbox-linux",
   	"main": "src/index.ts",
   	// Set this to today's date
   	"compatibility_date": "2026-09-30",
   	"observability": {
   		"enabled": true,
   	},
   	"upload_source_maps": true,
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   		},
   	],
   	"durable_objects": {
   		"bindings": [
   			{
   				"class_name": "MyContainer",
   				"name": "MY_CONTAINER",
   			},
   		],
   	},
   	"exports": {
   		"MyContainer": {
   			"type": "durable-object",
   			"storage": "sqlite",
   		},
   	},
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "sandbox-linux"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-09-30"
   upload_source_maps = true

   [observability]
   enabled = true

   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [[durable_objects.bindings]]
   class_name = "MyContainer"
   name = "MY_CONTAINER"

   [exports.MyContainer]
   type = "durable-object"
   storage = "sqlite"
   ```


4. Replace `src/index.ts`. The Worker reads `argv` from the JSON body and runs it in Linux:

   *src/index.jsjs*



   ```js
   import { DurableObject } from "cloudflare:workers";

   export class MyContainer extends DurableObject {
   	async exec(argv) {
   		const container = this.ctx.container;
   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		if (!container.running) {
   			container.start({
   				// Debian Trixie with Node.js 24
   				image: "cloudflare/debian-trixie",
   				// Keep the instance running so it can accept commands
   				entrypoint: ["sleep", "infinity"],
   				// Block commands in the sandbox from reaching the Internet
   				enableInternet: false,
   			});
   		}

   		const process = await container.exec(argv);
   		const output = await process.output();
   		return {
   			stdout: new TextDecoder().decode(output.stdout),
   			exitCode: output.exitCode,
   		};
   	}
   }

   export default {
   	async fetch(request, env) {
   		const { argv } = await request.json();
   		const sandbox = env.MY_CONTAINER.getByName("sandbox");
   		return Response.json(await sandbox.exec(argv));
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   import { DurableObject } from "cloudflare:workers";

   export class MyContainer extends DurableObject<Env> {
   	async exec(argv: string[]) {
   		const container = this.ctx.container;
   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		if (!container.running) {
   			container.start({
   				// Debian Trixie with Node.js 24
   				image: "cloudflare/debian-trixie",
   				// Keep the instance running so it can accept commands
   				entrypoint: ["sleep", "infinity"],
   				// Block commands in the sandbox from reaching the Internet
   				enableInternet: false,
   			});
   		}

   		const process = await container.exec(argv);
   		const output = await process.output();
   		return {
   			stdout: new TextDecoder().decode(output.stdout),
   			exitCode: output.exitCode,
   		};
   	}
   }

   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const { argv } = (await request.json()) as { argv: string[] };
   		const sandbox = env.MY_CONTAINER.getByName("sandbox");
   		return Response.json(await sandbox.exec(argv));
   	},
   };
   ```


5. Generate types for the binding. Wrangler reads the `MyContainer` class from `src/index.ts` to type `env.MY_CONTAINER`:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```


6. Run `wrangler dev`:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   `wrangler dev` runs the instance in [Docker ↗︎](https://www.docker.com/) on your machine, so Docker must be running. Running `cloudflare/debian-trixie` locally needs Wrangler 4.141.0 or later.
7. POST a command to the URL Wrangler prints. The default is `http://localhost:8787`:

   ```sh
   curl http://localhost:8787 --request POST --json '{"argv":["uname","-a"]}'
   ```



The JSON body includes `"exitCode":0`. `stdout` contains `Linux`. The Worker started a Linux VM and ran the command you sent.

## Next steps

- Run another process in the instance. Refer to [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec).
- Deploy your Worker. Refer to [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/). A deploy does not replace a running instance. Refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#deploys-keep-instances-running).
- Run JavaScript. Refer to [Run JavaScript](https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/).
- Use the [Durable Object container API](https://developers.cloudflare.com/containers/api/durable-object-container/) for `start()` and `exec()`.
- Start a project from the [minimal sandbox template ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/minimal). It adds a `Dockerfile`, a sandbox for each name in the URL, and file reads and writes with `@cloudflare/sandbox`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/get-started/#page","headline":"Run a Linux command","description":"POST a command to your Worker and read stdout from Linux.","url":"https://developers.cloudflare.com/sandbox/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/get-started/og.png?v=af1e982b53ac49c7","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
