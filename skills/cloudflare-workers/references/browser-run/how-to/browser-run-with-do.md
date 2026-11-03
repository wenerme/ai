---
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
title: Deploy a Browser Run Worker with Durable Objects
image: https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/og.png?v=33efece5ee628220
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a Browser Run Worker with Durable Objects

Last updated Oct 31, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By following this guide, you will create a Worker that uses the Browser Run API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use <a href="https://viteplus.dev/guide/env">Vite+ (<code>vp env</code>) ↗︎</a> to install and manage Node.js versions.

For supported Node.js versions, refer to the <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/#install-wrangler">Wrangler system requirements</a>.

</details>

## 1. Create a Worker project

[Cloudflare Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. Your Worker application is a container to interact with a headless browser to do actions, such as taking screenshots.

Create a new Worker project named `browser-worker` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- browser-worker
```

```
yarn create cloudflare browser-worker
```

```
pnpm create cloudflare@latest browser-worker
```

## 2. Install Puppeteer

In your `browser-worker` directory, install Cloudflare’s [fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/):

npmyarnpnpmbun

```
npm i -D @cloudflare/puppeteer
```

```
yarn add -D @cloudflare/puppeteer
```

```
pnpm add -D @cloudflare/puppeteer
```

```
bun add -d @cloudflare/puppeteer
```

## 3. Create a R2 bucket

Create two R2 buckets, one for production, and one for development.

Note that bucket names must be lowercase and can only contain dashes.

```sh
wrangler r2 bucket create screenshots
wrangler r2 bucket create screenshots-test
```

To check that your buckets were created, run:

```sh
wrangler r2 bucket list
```

After running the `list` command, you will see all bucket names, including the ones you have just created.

## 4. Configure your Wrangler configuration file

Configure your `browser-worker` project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding a browser [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and a [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag). Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF and more.

Update your Wrangler configuration file with the Browser Run API binding, the R2 bucket you created and a Durable Object:

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "rendering-api-demo",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"account_id": "<ACCOUNT_ID>",
	// Browser Run API binding
	"browser": {
		"binding": "MYBROWSER",
	},
	// Bind an R2 Bucket
	"r2_buckets": [
		{
			"binding": "BUCKET",
			"bucket_name": "screenshots",
			"preview_bucket_name": "screenshots-test",
		},
	],
	// Binding to a Durable Object
	"durable_objects": {
		"bindings": [
			{
				"name": "BROWSER",
				"class_name": "Browser",
			},
		],
	},
	"migrations": [
		{
			"tag": "v1", // Should be unique for each entry
			"new_sqlite_classes": [
				// Array of new classes
				"Browser",
			],
		},
	],
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "rendering-api-demo"
main = "src/index.js"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-11-03"
compatibility_flags = [ "nodejs_compat" ]
account_id = "<ACCOUNT_ID>"

[browser]
binding = "MYBROWSER"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "screenshots"
preview_bucket_name = "screenshots-test"

[[durable_objects.bindings]]
name = "BROWSER"
class_name = "Browser"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "Browser" ]
```

## 5. Code

The code below uses Durable Object to instantiate a browser using Puppeteer. It then opens a series of web pages with different resolutions, takes a screenshot of each, and uploads it to R2.

The Durable Object keeps a browser session open for 60 seconds after last use. If a browser session is open, any requests will re-use the existing session rather than creating a new one. Update your Worker code by copy and pasting the following:

```js
import { DurableObject } from "cloudflare:workers";
import * as puppeteer from "@cloudflare/puppeteer";

export default {
	async fetch(request, env) {
		const obj = env.BROWSER.getByName("browser");

		// Send a request to the Durable Object, then await its response
		const resp = await obj.fetch(request);

		return resp;
	},
};

const KEEP_BROWSER_ALIVE_IN_SECONDS = 60;

export class Browser extends DurableObject {
	browser;
	keptAliveInSeconds = 0;
	storage;

	constructor(state, env) {
		super(state, env);
		this.storage = state.storage;
	}

	async fetch(request) {
		// Screen resolutions to test out
		const width = [1920, 1366, 1536, 360, 414];
		const height = [1080, 768, 864, 640, 896];

		// Use the current date and time to create a folder structure for R2
		const nowDate = new Date();
		const coeff = 1000 * 60 * 5;
		const roundedDate = new Date(
			Math.round(nowDate.getTime() / coeff) * coeff,
		).toString();
		const folder = roundedDate.split(" GMT")[0];

		// If there is a browser session open, re-use it
		if (!this.browser || !this.browser.connected) {
			console.log(`Browser DO: Starting new instance`);
			try {
				this.browser = await puppeteer.launch(this.env.MYBROWSER);
			} catch (e) {
				console.log(
					`Browser DO: Could not start browser instance. Error: ${e}`,
				);
			}
		}

		// Reset keptAlive after each call to the DO
		this.keptAliveInSeconds = 0;

		// Check if browser exists before opening page
		if (!this.browser)
			return new Response("Browser launch failed", { status: 500 });

		const page = await this.browser.newPage();

		// Take screenshots of each screen size
		for (let i = 0; i < width.length; i++) {
			await page.setViewport({ width: width[i], height: height[i] });
			await page.goto("https://workers.cloudflare.com/");
			const fileName = `screenshot_${width[i]}x${height[i]}`;
			const sc = await page.screenshot();

			await this.env.BUCKET.put(`${folder}/${fileName}.jpg`, sc);
		}

		// Close tab when there is no more work to be done on the page
		await page.close();

		// Reset keptAlive after performing tasks to the DO
		this.keptAliveInSeconds = 0;

		// Set the first alarm to keep DO alive
		const currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
			console.log(`Browser DO: setting alarm`);
			const TEN_SECONDS = 10 * 1000;
			await this.storage.setAlarm(Date.now() + TEN_SECONDS);
		}

		return new Response("success");
	}

	async alarm() {
		this.keptAliveInSeconds += 10;

		// Extend browser DO life
		if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {
			console.log(
				`Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`,
			);
			await this.storage.setAlarm(Date.now() + 10 * 1000);
			// You can ensure the ws connection is kept alive by requesting something
			// or just let it close automatically when there is no work to be done
			// for example, `await this.browser.version()`
		} else {
			console.log(
				`Browser DO: exceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}s.`,
			);
			if (this.browser) {
				console.log(`Closing browser.`);
				await this.browser.close();
			}
		}
	}
}
```

[Run Worker in Playground](https://workers.cloudflare.com/playground#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-7pxTf+feh9sUQSTCo-sQ5RxKgTpOWci5lyrnXF6o1vq3a1jlZrbW513bFwNqXFVNIAQv2jFPBlmKGrXm7jWtN9bj73kOJaRtzci13h4BbRB3MUx23iP3C6-jDER1td00EbLHXOq-K6kgi0zVLUEE7DKMdKD5TttKYiFNkUWnytYRWilKaT1TUu4C5BXYVk9F-FwJxQTSwthdDKmASCJBwXsWRCYTyHNngpE4zRV5gFdvcM5m8KZXP6tpZ4G8nm4BeZhh0nU4ihAaLhEgOsrUR29vEYCbwWhUEmjrYe3IwA5UIsOkUucx2F0nQgsuN4o3K2Vie0s-CSDdxbSOeOE5pzziXCuT13qdz7EFpewe2ThV0kE0A-R6t5Vjp1gcjwX8hPasLgJqhQnYSWkFbWbioXY2djMOYVQzB1CaG0DwfgQgxCSBkPIRQwgijWDvGUZw0DPCKV8P4TQpAQhhEiGEQgmhUh+DQWVnIaxxSFEsNl0oFQqg1H+PURoKdFJtBQ1QCYZg5gRGAHGKgw5hijEyBEJQuQcT5BSPsaLMW4uBAS7oZLBg0vGGEMwcwQA)

```ts
import { DurableObject } from "cloudflare:workers";
import * as puppeteer from "@cloudflare/puppeteer";

interface Env {
	MYBROWSER: Fetcher;
	BUCKET: R2Bucket;
	BROWSER: DurableObjectNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const obj = env.BROWSER.getByName("browser");

		// Send a request to the Durable Object, then await its response
		const resp = await obj.fetch(request);

		return resp;
	},
} satisfies ExportedHandler<Env>;

const KEEP_BROWSER_ALIVE_IN_SECONDS = 60;

export class Browser extends DurableObject<Env> {
	private browser?: puppeteer.Browser;
	private keptAliveInSeconds: number = 0;
	private storage: DurableObjectStorage;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.storage = state.storage;
	}

	async fetch(request: Request): Promise<Response> {
		// Screen resolutions to test out
		const width: number[] = [1920, 1366, 1536, 360, 414];
		const height: number[] = [1080, 768, 864, 640, 896];

		// Use the current date and time to create a folder structure for R2
		const nowDate = new Date();
		const coeff = 1000 * 60 * 5;
		const roundedDate = new Date(
			Math.round(nowDate.getTime() / coeff) * coeff,
		).toString();
		const folder = roundedDate.split(" GMT")[0];

		// If there is a browser session open, re-use it
		if (!this.browser || !this.browser.connected) {
			console.log(`Browser DO: Starting new instance`);
			try {
				this.browser = await puppeteer.launch(this.env.MYBROWSER);
			} catch (e) {
				console.log(
					`Browser DO: Could not start browser instance. Error: ${e}`,
				);
			}
		}

		// Reset keptAlive after each call to the DO
		this.keptAliveInSeconds = 0;

		// Check if browser exists before opening page
		if (!this.browser)
			return new Response("Browser launch failed", { status: 500 });

		const page = await this.browser.newPage();

		// Take screenshots of each screen size
		for (let i = 0; i < width.length; i++) {
			await page.setViewport({ width: width[i], height: height[i] });
			await page.goto("https://workers.cloudflare.com/");
			const fileName = `screenshot_${width[i]}x${height[i]}`;
			const sc = await page.screenshot();

			await this.env.BUCKET.put(`${folder}/${fileName}.jpg`, sc);
		}

		// Close tab when there is no more work to be done on the page
		await page.close();

		// Reset keptAlive after performing tasks to the DO
		this.keptAliveInSeconds = 0;

		// Set the first alarm to keep DO alive
		const currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
			console.log(`Browser DO: setting alarm`);
			const TEN_SECONDS = 10 * 1000;
			await this.storage.setAlarm(Date.now() + TEN_SECONDS);
		}

		return new Response("success");
	}

	async alarm(): Promise<void> {
		this.keptAliveInSeconds += 10;

		// Extend browser DO life
		if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {
			console.log(
				`Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`,
			);
			await this.storage.setAlarm(Date.now() + 10 * 1000);
			// You can ensure the ws connection is kept alive by requesting something
			// or just let it close automatically when there is no work to be done
			// for example, `await this.browser.version()`
		} else {
			console.log(
				`Browser DO: exceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}s.`,
			);
			if (this.browser) {
				console.log(`Closing browser.`);
				await this.browser.close();
			}
		}
	}
}
```

## 6. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

## 7. Deploy

Run [`npx wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

- Other [Puppeteer examples ↗︎](https://github.com/cloudflare/puppeteer/tree/main/examples)
- Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
- [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/og.png?v=33efece5ee628220","dateModified":"2026-10-31","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
