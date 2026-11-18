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
	"compatibility_date": "2026-11-18",
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
compatibility_date = "2026-11-18"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAMwBGSQFYAbAHYALOOEAuFizbAOcLjT4CRE6fKXCAsACgAwuioQApnewARKAGcY6N1Gi2VJTTwCYhIqOGB7BgAiKBp7AA8AOgArNyjSVCgwR3DImLik1KjLGztHCGwAFToYe384GBgwPgIoW2RkuAA3ODdeBFgIAGpgdFxwe0tLKGBPJBIAbxJnEAQ4MmyAeTJk+14IEgBfAIR0YBIo3jBKXFQwRDqAd0wAa3sENKILGbmDgCoSL0SDAQI17A53iczhcAAJXG53B7IEFgiEIdIWCwJX4kXD2VBwcAHBYWACQvToVF4AXBvAAFgAKBD2ACOIHsbggABoSI4ugBKRZk0m8WyckjoHYkBi8qhdRIAIQASpsAOoAZQAokrEgBzcEKugAOVyDKiZFOjzc7yi-K+wuQyBI6scuEBJGZbI5Bwg6BIEDp9mWq3W2RI212+x5AccgMecB8JB8bg9HM8VGtwtFGYOzI80rjCYOkuSiVQtMZnvZnLtmNJpOZEFWVFTHi+pMOXIsh3t2fFAGlNZqAAoAfWVaq1StHAEEADIASQAaprRwujaOtVZNkbnOqCzJBPbsZgDldeimFZbrQhefEHDQUys1ht7BG9sSyRb0Fb3u23jAEAzs0XT2AuVAutmuApjKR5kpymBwPq9oimKEAICA+yYAynIEPYPJ8oKJL1m4oLvDhhAOARcq1vWAbuIkCFrPqBa4Q4jG+sx9jtocdYUlSNIQPSTKstWEBEQ6Trqv09ixnm6BgCAvgZv6foOOKlAQFmaEkI8UC4AGBYANriAAnAATIIPLiKIMgyNZUi2TytlWSQSgKAAuu2qE5iQgZQLqdIHDKJkiK5cgyMIPLCDICg8rFrnCKZMheXWpKOiQACq1r+oGJC8KszJ2LieGAjQ-ozEGvr5cypVwAECl4renIYfsqxBmwJBKuZ2m+VQP7OKVMpUPYjzLHhDK0T54qiviqAFuIghLSQAKHitJBSN5fa5pQcS4INDgFiNY0HfYDLCqSACyBB0okpzcAy-WPKdergpUlWTSQTqzagqCCgCP2oF29b8okvrquhsS6pNW06RgYBNQW917S9HjNBAZokAA4pdlS2kZgipZJJALvNMbMkmKb1d+v7NRy3i2BKtRUDyzJcDlPjClA80MgAhPRbiJDTN4kAAPqLJD83SDHC+8iTZiN+z2LgEn1tNCn2Ik1zQwABleP4i84mz+BDiDQFQuqhKNSY5nAVL2DrU2kuhdBCmrzvS4Lsu3jKcDxomKK1GiWuElSjIC4kfKJJdACaE4atqTvHLwBD0iQDL2Krat9hrWvoNDF31nr16Qkb-g2OAbr9QcuHzN7Nu4fbiQkJqCCnAg-gACQLPYhw68DatJ8KvHE0qHLgiQAFASBQZwKgDi3vYcBpynYBgKpuVBkbwoR1PwFQKB4GQbY0EFnBxNWIGvAvEm831wk7gQCmZD4pgQboMzUPAkh9hczzUsyxLggfkF1GzNitmNMeHgxRnSiPrWmJB7jUDTgSLIysog8iWGxEAbh-BSGWocWsvVxTwBYr7f2PpPZCyAYkY6w4f4wzShlSocA3gkD6MyRwbg6ToCfhKeaS804cNki2bwAAvX+9ZOoMmyAcKAZ9SDyIADy6X0gGLWjhdQBkUUMIYWdyQUO-vqRi4IlxQFGr8BkSw9IGTpP4GxAYjJQA8jyfygUID+DcUFJxHkjhOz9kWIxmtdS8PQGaIKEAYC4MdM8BAbwPjy2uCAW49xmTyzOMgW03lpoHEyNkE0EQCw62EVwnhEBRzdwcXSHxhx4jdy8RAGpOtsnbXYdSchgTSGaxKRmMpjCLoBMTBHKOCpMpWEHJURIIIMY627vDJqhxkBzLQQU3uKQYC6n7m0qaI96wZSsNcHKhAyC6UDC2cmQZ3ChD9KMCmsSb7VRfriWw79zl5S6cKQZBwumJK8GdIheynRQInnvGegJ56QlqAgTQX9CBuBeCmaqMZlibB3lQ0FB8wIQT2CfGCJBz6AudBPZFmQPgHDgKk841U3j2BgCiwEM9iFnkKuUYCiBzgdKGVQpiP9XrT3ZYw+s3N04FTbqyyl0phrgDAPonO2Q8663gYbY27DwTm0thS9ljsWk6UqJqDcW4dx7gWoIdai0lrZK+blBiPLjHWn5VgBkL0nqfSGCQPVBrNTbl3OqHZaUwEIBbMdLqaYYFmlIrwXg9Mslkl2fxakmrHVZ13rS6emKj44sfCQIYMpFooXSk6TU95XTkCAfS5o5Y-7pxTYBfeh9sVQRTCowcI5xwqgTtOecy5Vzrk3F6o1vq3b1jlZrbW513bFwNqXFVdIgQv1jFPBlmKGq3m7jWtN9bj6PmONaRtzci0Ph4BbRB3M0x20SP3C6-jDER1td08EbLHXOp-K6kgi0zVLUEE7DKMdKD5TtrKUiFNkVWnyrYRWylKaT1TUu0C5BXZVm9F-NwZxwTSwthdDKmASDJBwQcWRSYzyHNnkpM4rRV5gFdo8M5m8KZXP6rpV4G8nm4BeZhp0nUEjhCaPhEgOsrUR29okUCHw2hUEmjrYevIwA5WIsOsUucx2F0nQgsud4o3K2Vie8s-CSDdxbWOeOU5ZyLhXGuT13q9yHEFpewe2ThUMkE0A-R6t5Vjp1gcrwX8hPasLgJqhQn4TWkFfWXioXY3dgsJYdQzBNDaF0DwfgQgxCSHELIRQygSi2AfBUVw0DvDKX8IEbQpAwgRGiBEQg2h0gBDQWVvIGxJTFGsNl8oVQah1EBI0ZoKdlIdBQ1QKYFgFhRGAAmKgo5RjjGyFEFQ+Q8SFDSIcaLMW4vBAS-oZLRg0smGUMwSwQA)

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

- Other [Puppeteer examples](https://developers.cloudflare.com/browser-run/examples/#browser-automation-examples)
- Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
- [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/og.png?v=33efece5ee628220","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
