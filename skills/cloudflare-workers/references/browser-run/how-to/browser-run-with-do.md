---
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
title: Deploy a Browser Run Worker with Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a Browser Run Worker with Durable Objects

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

By following this guide, you will create a Worker that uses the Browser Run API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

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

## 2\. Install Puppeteer

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

## 3\. Create a R2 bucket

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

## 4\. Configure your Wrangler configuration file

Configure your `browser-worker` project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding a browser [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and a [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag). Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF and more.

Update your Wrangler configuration file with the Browser Run API binding, the R2 bucket you created and a Durable Object:

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "rendering-api-demo",
	"main": "src/index.js",
	// Set this to today's date
	"compatibility_date": "2026-07-24",
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
# Set this to today's date
compatibility_date = "2026-07-24"
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

## 5\. Code

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
		if (!this.browser || !this.browser.isConnected()) {
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWAKwA2UaIDso4YNEBOAFwsWbYBzhcafASIlTZ8pQFgAUAGF0VCAFNb2ACJQAzjHSuo0G8pIa8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLCyhgDyQSAG8SJxAEODIsgHkyJLteCBIAX38EdGASSN4wSlxUMERagHdMAGs7BFSic2nZ-YAqEh6JBgIAadnsb2Op3OAAFLtdbvdkMDQeCEGlzOZ4j8SLg7Kg4OB9vNzABIHp0Ki8fxg3gACwAFAg7ABHEB2VwQAA0JAcnQAlAtSSTeDYOSR0NsSAweVROgkAEIAJQ2AHUAMoAUUVCQA5mD5XQAHI5emRMgnB6uN6RPmfIXIZAkNUOXAAkhM1ns-YQdAkCC0uxLFZrLIkLY7Pbc-0OAEPODeEjeVzu9keKhWoUi9P7JnuKWx+P7CVJBKoGkMj1sjm2jEkklMiArKgp9yfEkHTnmA52rNigDSGo1AAUAPpK1WaxUjgCCABkAJIANQ1I-nhpHmssG0NTjV+fEgjtWMw+0uPWT8otVoQPLi9hoyeWq3WdnDuyJpPN6EtbzbrxgEDTk0nR2POVDOlmuDJtKh6khymBwHqdrCqKEAICAeyYPSHIEHY3K8gKxJ1q4IJvNhhD2Phso1nW-puAk8GrHq+Y4fYDE+kxdhtgctbkpS1IQHSjIslWECEfajpqn0dgxrm6BgCAPjpn6vr2GKlAQJmqEkA8UC4P6+YANoAIyKAATII3LGQAzOI4hWaItncrZlkkMIxnCAAum2KHZiQAZQDqtL7NKJmCAAHK50jiOF3LheIwjcglrnhYo4jebWJIOiQACqVp+gGJC8CsTK2DiuEAjQfrTIGPpFUyFVwP48m4jeHLoXsKyBmwJCKmZWl+VQ35OBV0pUHYDxLLh9I0b5YoiniqD5sZgirSQ-wHutJCiD5vY5pQsS4CN9j5uNk3HXY9JCiSACyBC0gkJzcPSQ0PBdupghUNUzSQjoLagqACv8-2oJ2dZ8gkPpqmhMQ6jNu3aRgYCtfmT2He97hNBApokAA4jdFQ2oZggZRJJDzkt0ZMomyZNV+P5teyXg2OKNRUNyTJcPl3hClAS30gAhHRrgJPT14kAAPhLJBC7S9Fi28CRuCU417HYuAzeJdZzfJdgJFccMAAaXt+4tOBsfjQ4g0BUDqIQTYm2ZwJSdiG7NJJoXQgrax7csiwrN7SnAcYJsiNSovrBKUgywsJLyCQ3QAmuO6pau7Ry8AQdIkPSdha9rva6-r6Bw9ddbG1eELm341jgK6Q37DhcwB47OEuwkJAaggJwIH4AAk8x2Achtg9r6dCjxZOKuyYIkP+gHAYGcCoPYN52HA2eZ2AYAqQVgbm0Ksfz0BUAgWBEE2FB+awWTlgBrwzyJktLfxG4EDJmQeKYIG6Bs7DQKITsLzfmst5aVwQHya6DYmz20mtPdwopLqRBNgzEgdxqDZ3xJkdWkRuSLFYiAVwfhRBrQODWAaYp4DMSDiHb0ftRbgISGdIcgD4aZWyhUOArwSC9CZA4VwtJ0Dv3FEtde2deEyWbF4AAXkAusPV6RZH2FAa+pAVEAB4dJ6X9PrBwOp-RqMGIMfOZJaEAL1AxMEi4oATR+PSRYul9K0j8I4-0hkoCeW5AFIKEA-DeOCu4zyhx3bB0LOYvWOohHoFNMFCAMAiEOieAgV47wEhwhADcO4TI0mnGQDaHyc19gZCyMacI+ZDYSP4YIiAI4B6uNpIEg4cQB7+IgI0w2BS9o8KpDQsJVC9aVPTNUth11QkJljvHeUOVLADgqAkYE2NDYDyRq1A4yBlnYNKUPZIMAdQj26bNSedZsqWCuPlQgZAdIBmbFTQMbgQi+hGNTJJj86qfxxDYH+NzCr9KFGM-Y-S0lnMuuQ45jp4Gz2PovAEK8IQ1AQBof+hBXDPGTHVaMSwNiH3oVC0+oFwK7EvtBEgN8wVOlnhijI7x9hwCyWcOqrw7AwExQCReFDTwlTKEBRAZxenjPoYxQBH0F48rYXWPmOdirdy5XSqUY1wBgBMYXLIxcjYoLNhbHhYIbZ21pTyt2nTtIVA1OuTc25dzLUEFtFaq0Cn-IKvRQVFirQiqwPSd6r0fqDBIMa01Gotw7jVIczK0CEDNjOr1VMiDTQkV4LwJm+TSRHL4lSPVbr85HyZQvPF59CUPhIIMaUK1kJZUdBqO8LpyDgJZU0MswCc6ZoAifM+BLILJk0QOYcY5lSpynHOJcK41wbn9eaoN3s6zKr1gbK6PsK6myrpq2kgJP4xnnqyvFzUbwD0bdmltF8HxHCtG2ju5b7w8FtmgvmqZnYJBHtdEJZjY5OoGWCblbqPXfi9SQFa1rVqCHdtlROlAirOxlCRamGLLRFRsKrJSNM55ZvXSBcgXtKxen-q4U4YI5a22utlTAJAkiEP2EoxMp5gUAkUqcFoW8wBeweNcve1N7lDR0i8Xe7zcCfLw46Hq8QwiNDwiQQ29rY4BwSCBd4rQqAzUNhPHkYB8pEQnaKIu06y5ztQdXW88b1bq0vWWERJAB6dtHCnScM4FzLlXH6gNu4DgizvWPApEr6RifASYnWKrp2G1OZ4f+4mDVl1E-Q8TcIrRirrDxKLSauzmAsGoZgGgtA6B4PwIQYhJAyDkAoRQxQbD3nKC4BBXglJ+ACFoUgoRwhRHCIQLQaR-DYOq7kdYEoihWAK2USo1RagAgaE0TOSl2iYaoJMcw8xIjAHjFQEcIwxhZEiMoPIuICipAOAlxLyWgipb0Blww2WTCKGYBYIAA)

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
		if (!this.browser || !this.browser.isConnected()) {
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

## 6\. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

## 7\. Deploy

Run [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

* Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)
* Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
* [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects · Cloudflare Browser Run docs","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
