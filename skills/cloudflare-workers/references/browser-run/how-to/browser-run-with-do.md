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
	"compatibility_date": "2026-07-22",
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
compatibility_date = "2026-07-22"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAGxjRARgCsATkkAmYQC4WLNsA5wuNPgJHjRUuYuEBYAFABhdFQgBTO9gAiUAM4x0bqNFvKSGngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWUMCeSCQA3iTOIAhwZNkA8mTJ9rwQJAC+AQjowCRRvGCUuKhgiHUA7pgA1vYIaUQWM3MHAFQkXokGAgRr2BzvE5nC4AASuNzuD2QILBEIQ6QsFgSvxIuHsqDg4AOCwsAEhenQqLwAuDeAALAAUCHsAEcQPY3BAADQkRxdACUizJpN4tk5JHQOxIDF5VC6iQAQgAlTYAdQAygBRJWJADm4IVdAAcrkGVEyKdHm53lF+V9hchkCR1Y5cICSMy2RyDhB0CQIHT7MtVutsiRtrt9jyA45AY84D4SD43B6OZ4qNbhaKMwdmR5pXGEwdJclEqhaYzPezOXbMaTScyIKsqKmPF9SYcuRZDvbs+KANKazUABQA+sq1VqlaOAIIAGQAkgA1TWjhdG0daqybI3OdUF0SCe3YzAHK69FMKy3WhC8+IOGgplZrDb2CN7Ylki3oK3vdtvGAIBnZounsBcqBdbNcBTGUjzJTlMDgfV7RFMUIAQEB9kwBlOQIeweT5QUSXrNxQXeHDCAcAi5VresA3cRIELWfUC1whxGN9Zj7HbQ46wpKkaQgekmVZasICIh0nXVfp7FjPN0DAEBfAzf0-QccVKAgLM0JIR4oFwAMCwAbUkWQFEEHlJAAZiMSzpBsnkbIskgABZJBcgBddtUJzEhAygXU6QOGUTJEZyAHZxB5MQXJ5UQXOc4RZFELy61JR0SAAVWtf1AxIXhVmZOxcTwwEaH9GYg19fLmVKuAAgUvFb05DD9lWIM2BIJUFG03yqB-ZxSplKh7EeZY8IZWifPFUV8VQAtJEEJaSABQ8VpIaRvL7XNKDiXBBocAsRrGg77AZYVSQAWQIOlElObgGX6x5Tr1cFKkqyaSCdWbUFQQUAR+1Au3rflEl9dV0NiXVJq2nSMDAJqC3uvaXo8ZoIDNEgAHFLsqW0jMEVLJJIBd5pjZkkxTerv1-ZqOW8WwJVqKgeWZLgcp8YUoHmhkAEJ6LcRIaZvEgAB9RZIfm6QY4X3kSdxShG-Z7FwSaJPraaFPsRJrmhgADK8fxF5xNn8CHEGgKhdVCUakxzOAqXsPWptJdC6CFDXXelwXZdvGU4HjRMUVqNEdcJKlGQFxI+USS6AE0Jw1bUXeOXgCHpEgGXsdWNb7LWdfQaGLvrA3r0hE3-BscA3X6g5cPmX27dwx3EhITUEFOBB-AAEgWexDj14GNZT4VeOJpUOXBEgAKAkCgzgVAHFvew4AztOwDAVTcqDE3hSjmfgKgUDwMg2xoILODiasQNeBeJN5sbhJ3AgFMyHxTAg3QZmoeBJD7C5nmUsZZlwQPyC6jZmw2zGhPDwYozpRENrTEg9xqAZwJFkFWUQeRLDYiANw-hpDLUOLWXq4p4AsX9oHH03shYgMSMdYcf8YZpQypUOAbwSB9GZI4NwdJ0AvwlPNFeGcuGyRbN4AAXv-esnUGTZAOFAC+pBFEAB5dL6QDDrRwuoAzKKGEMHO5IqG-31IxcES4oCjV+AyJYekDJ0n8HYgMRkoAeR5P5QKEB-AeKCi4jyRwXYByLCY7Wup+HoDNEFCAMB8GOmeAgN4HxEjwhALce4zJklnGQLaby00DiZGyCaCIBY9aiJ4XwiAo5e5OLpH4w48Re4+IgHUvWuTtqcOpJQ4J5DtZlIzBU5hF0gmJijjHBUmUrCDkqIkEEGM9a93hk1Q4yAFkYKKf3FIMBdSDw6VNMe9YMpWGuDlQgZBdKBhbOTIM7hQh+lGBTeJd9qpv1xLYT+ly8o9OFMMg4PTknHLOiQg5ToYFTwPnPQEi9IS1AQBoH+hA3AvBTNVGMyxNh7xoeCo+YEIJ7DPjBEgl9gXOinqizIHwDhwHSecaqbx7AwDRYCOepCzyFXKMBRA5wukjJoUxP+r1Z6cuYfWbmmcCod3ZdS6Uw1wBgEMXnbIBd9aIONqbTh4JLbWypZy52bSdKVE1BuLcO49wLUEOtRaS1ck-NygxPlpjrSCqwAyF6T1PpDBIAao1mpty7nVHstKECEAtmOl1NMcCzSkV4LwemOSyT7P4tSbVzqc773pbPbFJ88WPhIEMGUi0ULpSdJqe8rpyAgMZc0csADM5psAofY+uKoIpjUYOEc44VRJ2nPOZcq51ybh9Sa-1Ht6wKu1rrc6ntS5G3LmqukQI36xhnky7FDVby9zrRmxtp9HzHGtM21uJaHw8Ctsg7maYHaJEHhdQJxio72t6eCDlzrXU-ndSQRaFqlqCBdhlOOlB8oO1lKRCmqKrT5VsErZSlNp7ppXaBcg7sqzeh-m4M44JpZWwuhlTAJBkh4IOPIpMZ4AWAiUmcVo68wDu0eBc7eFMbn9V0q8LeLzcBvOw06TqCRwhNHwiQPWNqo6+0SKBD4bQqCTT1qPXkYAcrEVHWKfOE7i7TqQRXO8MaVYqzPeWQRJBe5trHInKcs5FwrjXN631e5DiC2vcPXJoqGTCZAYYzWiqJ16yOV4H+IndXFyEzQkT8JrTCvrLxcL8buwWEsGoZgGgtA6B4PwIQYgJAyHkEoEotgHwVFcLA7wyl-CBC0KQMIERogREIFodIAQMHlbyBsSUxRrA5fKFUGodRASNGaGnZSHQ0NUCmBYBYURgAJioKOUY4xshRGUPkPEhQ0iHFi3FhLwQkt6FS4YYwmXhDMEsEAA)

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
