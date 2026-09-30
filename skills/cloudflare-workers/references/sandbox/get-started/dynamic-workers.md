---
description: POST JavaScript to your Worker and read the sandboxed result.
title: Run JavaScript
image: https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/og.png?v=4ac2191cd371fe40
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run JavaScript

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You will POST JavaScript to a Worker and read `{"result":["Ada"]}`.

## Prerequisites

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use a Node version manager like <a href="https://volta.sh/">Volta ↗︎</a> or <a href="https://github.com/nvm-sh/nvm">nvm ↗︎</a> to avoid permission issues and change Node.js versions. <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler</a>, discussed later in this guide, requires a Node version of <code>16.17.0</code> or later.

</details>

## Run JavaScript

1. Create a Worker project:npmyarnpnpm

   ```
   npm create cloudflare@latest -- sandbox-dynamic-worker --category=hello-world --type=hello-world --lang=ts --no-deploy
   ```

   ```
   yarn create cloudflare sandbox-dynamic-worker --category=hello-world --type=hello-world --lang=ts --no-deploy
   ```

   ```
   pnpm create cloudflare@latest sandbox-dynamic-worker --category=hello-world --type=hello-world --lang=ts --no-deploy
   ```


2. Change into the project directory:

   ```sh
   cd sandbox-dynamic-worker
   ```


3. Replace `wrangler.jsonc` to add a Worker Loader binding:

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "sandbox-dynamic-worker",
   	"main": "src/index.ts",
   	// Set this to today's date
   	"compatibility_date": "2026-09-30",
   	"observability": {
   		"enabled": true,
   	},
   	"upload_source_maps": true,
   	"worker_loaders": [
   		{
   			"binding": "LOADER",
   		},
   	],
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "sandbox-dynamic-worker"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-09-30"
   upload_source_maps = true

   [observability]
   enabled = true

   [[worker_loaders]]
   binding = "LOADER"
   ```


4. Generate types for the binding:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```


5. Replace `src/index.ts`. Your Worker reads `code` from the JSON body and runs it in the sandbox:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const { code } = await request.json();

   		const sandbox = env.LOADER.load({
   			compatibilityDate: "2026-09-30",
   			mainModule: "code.js",
   			modules: {
   				"code.js": `
   					import { WorkerEntrypoint } from "cloudflare:workers";

   					export class Code extends WorkerEntrypoint {
   						evaluate() {
   							${code}
   						}
   					}
   				`,
   			},
   			// Block `fetch()` and `connect()`
   			globalOutbound: null,
   			// Stop code that uses more than 50 milliseconds of CPU time
   			limits: { cpuMs: 50 },
   		});

   		const result = await sandbox.getEntrypoint("Code").evaluate();
   		return Response.json({ result });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   import type { WorkerEntrypoint } from "cloudflare:workers";

   type CodeEntrypoint = WorkerEntrypoint & {
   	evaluate(): Promise<unknown>;
   };

   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const { code } = (await request.json()) as { code: string };

   		const sandbox = env.LOADER.load({
   			compatibilityDate: "2026-09-30",
   			mainModule: "code.js",
   			modules: {
   				"code.js": `
   					import { WorkerEntrypoint } from "cloudflare:workers";

   					export class Code extends WorkerEntrypoint {
   						evaluate() {
   							${code}
   						}
   					}
   				`,
   			},
   			// Block `fetch()` and `connect()`
   			globalOutbound: null,
   			// Stop code that uses more than 50 milliseconds of CPU time
   			limits: { cpuMs: 50 },
   		});

   		const result = await sandbox
   			.getEntrypoint<CodeEntrypoint>("Code")
   			.evaluate();
   		return Response.json({ result });
   	},
   };
   ```

   `code` is the body of `evaluate()`, so it needs a `return` statement. Code that waits without using CPU can still hold the request open, so add a timeout before you run code from other people. For an example, refer to [Build an AI code interpreter](https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/).
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


7. POST JavaScript to the URL Wrangler prints. The default is `http://localhost:8787`:

   ```sh
   curl http://localhost:8787 --request POST --json '{
     "code": "const users = [{ name: \"Ada\", role: \"admin\" }, { name: \"Grace\", role: \"user\" }]; return users.filter((u) => u.role === \"admin\").map((u) => u.name);"
   }'
   ```



The response body is `{"result":["Ada"]}`. The Worker ran the JavaScript you sent.

## Next steps

- Let the code call methods that your Worker provides. Refer to [Bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/).
- Run a Linux command. Refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).
- Use the [Loader API](https://developers.cloudflare.com/dynamic-workers/api-reference/) for `load()` and `get()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/#page","headline":"Run JavaScript","description":"POST JavaScript to your Worker and read the sandboxed result.","url":"https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/og.png?v=4ac2191cd371fe40","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
