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
	"compatibility_date": "2026-07-23",
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
compatibility_date = "2026-07-23"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOACyCA7BIBMAZgBsE2QFYAXCxZtgHOFxp8BI8VLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrKyhgLyQSAG8SFxAEODIcgHkyFIdeCBIAX0CEdGASaN4wSlxUMER6gHdMAGsHBHSiS1n5w4AqEh9EgwEBNByOD6nc6XAAC11u90eyFB4MhCAylksiT+JFwDlQcHAh0WlgAkH06FReIEIbwABYACgQDgAjiAHO4IAAaEhOboASiW5LJvDsXJI6F2JAYfKo3SSACEAEpbADqAGUAKLKpIAcwhiroADk8ozomQzk93B9ogLviLkMgSBqnLggSQWezOYcIOgSBB6Q4VmsNjkSDs9gdeYGnECnnBfCRfO5PZyvFQbSKxZnDizPDL44nDlKUklUHSmV6OVz7ViyWSWRA1lQ055vmSjtzLEcHTmJQBpLVagAKAH0VertcqxwBBAAyAEkAGpaseL41j7XWLbGlwawvyQQOnGYQ7XPqpxVWm0IPkJRw0VOrdabByR-Yk8mW9DWj4d94YAgWcWm6BxFyoV0c1wVNZWPckuUwOADQdUVxQgBAQAOTBGS5AgHF5fkhVJBt3DBD5cMIRxCPlOsG0DDwkkQ9YDULPDHCYv0WIcDsjnrSlqVpCAGWZNkawgYjHWdDUBgcON83QMAQD8TMA39RwJUoCBs3QkgnigXBA0LABtABGYRpEEXlTIUeRrOUBReQUKySFEUzRAAXQ7NDcxIIMoD1elDllMzBAADhciR5DC3kwvkUReXilywuEeQvPrMknRIABVG0AyDEheDWFl7DxfCgRoANZmDP1CpZcq4ECRT8TvLlMIONZgzYEhlWkHTfKoX8XHK2UqAcJ4Vnwxk6J8iUxQJVBC1MwQVpIQEjzWkhlG8-s80oeJcGGxxCzGiajocRkRTJABZAh6SSM5uEZQannO-UISqarppIZ15tQVAhUBP7UG7BsBSSP0NQwuI9WmnbdIwMAWsLR6DrezwWggc0SAAcWuqo7WMwR0qkkhF0W2MWWTVNGp-P9Ws5Hw7ElOoqF5FkuDy3wRSgRbGQAQgY9wkjp28SAAH3FkhBfpRjRY+JIPDKMaDgcXBpskhtZsUhwkhuWGAANr1-MWXC2AIocQaAqD1MJxuTXM4GpBwDZmskMLoYUtfd2Xhflu9ZTgBMk1ROp0T1olqSZIWkn5JJroATUnTUdTdk5eAIBkSEZBxNa1-sdb19BYauhsjZvKEzYCWxwHdQbDjwhZ-YdvDnaSEgtQQM4EACAASRYHCOA3Qa1tORT40nlU5CESEA4DQODOBUEcO8HDgLOM7AMA1Py4MzZFGO55AqAwIgqC7Bgwt4NJ6wg14V5k0W5vEg8CBUzIAlMGDdBWZhkFkIcDzPmMs5YVwQAKK6TYWx2wmlPTw4oLrRGNvTEgDxqBZ0JNkNW0ReTLHYiAdwARlCrSOHWfqEp4CsUDsHX0vsRZgKSKdEcAC4YZSylUOA7wSD9BZE4dw9J0Bv0lItNeWceFyVbD4AAXoAhs3VGQ5EOFAK+pBlEAB49IGUDHrJwepAyqOGMMPOFIaH-wNExCEy4oDjT+IyZY+lDL0gCA4wMxkoAeV5P5QKEAAheKCm4jyxw3ZB2LGY3WepBHoHNEFCAMBCFOheAgd4nwkgIhAHcB4LJUnnGQHabys1DhZByKaSIhYDbiL4QIiAY5+4uPpAEo4CR+5+IgA0g2+TdrcJpNQ0JlDdYVMzFU1hV0QlJhjnHRU2VrBDiqEkUEWMDb90Ri1I4yAllYJKYPVIMA9TDy6TNCeDYsrWBuHlQgZA9JBlbJTYMHgwj+jGFTRJD9aofzxHYb+1yCp9JFKMw4fTUmnIumQo5zo4EzyPgvIEy8oR1AQFoP+hB3CvFTLVWMKwtgHzoZCk+4FIL7AvrBEg19QUuhnuirInxDhwEyRcWq7wHAwAxUCBe5DzzFQqCBRAFweljLocxAB7157ctYQ2Xm2cipd05bSmUo1wBgGMQXHIRdDbINNubbhEJra2xpdy12HTdJVC1Jubcu59xLUEJtZaK18l-PyoxAV5ibTCqwIyN6L1vrDBIEak1Wodx7g1AcjKUCECtlOj1dMCDzRkV4LwRmeTySHIEjSXVrq86H0ZfPXFZ8CVPhIMMWUy1UKZWdFqB8bpyBgOZS0CsQDs4ZqAsfU++LoKpg0UOUcE5VQpxnAuFca4Nxbj9WawNXsGxKt1vrS63ty4m0rhq+kwIP5xjniy3FTU7z9wbVm5t58nwnBtK29uZbHw8Btqg3m6YnZJGHldYJpiY6Ov6RCLlrr3W-k9SQZaVqVqCDdllBOlBCpOzlGRKm6LrSFTsCrFS1NZ6ZrXWBcgntqw+j-u4c4EJZY2yullTAJAUgEMOIo5M54gVAmUucNom8wCeyeFc3eVM7mDT0m8HebzcAfNw86bqiQIjNAIiQA2dqY7+ySGBT47QqDTQNuPPkYA8okXHeKQuU7S6zpQVXe8ca1ZqwvRWYRJB+4dvHMnacc4lyrnXL6-1+4jjC1vaPfJ4rGSibAcY7Wyqp0GxOd4P+Yn9WlxE3QsTCIbSiobHxSLiaeyWCsBoZgWgdB6B4PwIQYhJAyAUEoZQpQ7CPkqG4eBPgVIBCCDoUg4RIgxEiIQHQGRAhYKq-kTYUoSg2HyxUaotR6hAiaC0DOKlOgYaoNMSwixojAETFQMcYwJg5GiKoAo+IijpCOPFhLSWQgpYMOl4wWWzDKGYFYIAA)

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
