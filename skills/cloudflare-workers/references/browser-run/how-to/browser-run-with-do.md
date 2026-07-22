---
description: Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.
title: Deploy a Browser Run Worker with Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

#  Deploy a Browser Run Worker with Durable Objects

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

By following this guide, you will create a Worker that uses the Browser Run API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

[Cloudflare Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. Your Worker application is a container to interact with a headless browser to do actions, such as taking screenshots.

Create a new Worker project named `browser-worker` by running:

 npm  yarn  pnpm

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

 npm  yarn  pnpm  bun

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

[ Run Worker in Playground ](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGAJwAmAKwA2ABzjBM2QC4WLNsA5wuNPgJESlCpQFgAUAGF0VCAFMb2ACJQAzjHQuo0a8pIa8BMQkVHDAtgwARFA0tgAeAHQAVi4RpKhQYPah4VExCckR5lY29hDYACp0MLa+cDAwYHwEUNbIiXAAbnAuvAiwEADUwOi44Lbm5lDA7kgkAN4kjiAIcGSZAPJkiba8ECQAvn4I6MAkEbxglLioYIg1AO6YANa2CClEZlMzewBUJN0kGAgeq2OyvI4nM4AAQuVxud2QQJBYIQqTMZji3xIuFsqDg4D2czMAEhunQqLw-KDeAALAAUCFsAEcQLYXBAADQkewdACU8xJxN41nZJHQWxIDG5VA68QAQgAldYAdQAygBRBXxADmoLldAActk6REyMd7i5XhFeR9BchkCRVfZcP8SIyWWy9hB0CQIDTbItlqtMiRNttdly-fZ-vc4F4SF4XG62e4qJbBcK03tGW5JTG43txYl4qhqfT3az2Tb0cTiYyIMsqMm3B9ifsOWZ9rbM6KANLq9UABQA+oqVRqFcOAIIAGQAkgA1dXDucG4caizrA2OVV56SCW2YzB7C7dJNy82WhDc2J2GhJpYrNa2MM7Qkks3oC2vVsvGAQKdGg6Ww5yoJ1M1wJMpQPEl2UwOBdVtIURQgBAQF2TA6XZAhbC5Hl+SJWsXGBV4sMIOw8Jlataz9Vx4jglZdTzbC7Ho71GNsVt9hrMkKSpCBaQZZlKwgAi7QdVVelsaMc3QMAQG8NNfR9OxRUoCAMxQkh7igXA-TzABtMQFC5YQAGZpGkUzJAsrkLMELkABZhEcgBdVtkKzEh-SgbUaT2KUjMEWQHJIAB2OQuVkaRHK5GLQtkURpHcmtiXtEgAFVLV9f0SF4ZZGRsbEcP+GhfSmANvTyxkSrgPw5Jxa92TQ3ZlgDNgSAVcRNK8qgv0cEqpSoWx7kWHC6WozzRWFXFUDzYRBEWkg-n3ZaSEkDye2zSgYlwAa7DzYbRv22w6UFYkAFkCBpeJjm4Ok+vuE6dVBcoKomkgHRm1BUH5P5vtQDta15eJvVVVDom1CbNq0jAwEavM7t2563EaCATRIABxC7ymtAzBBS8SSDnOao0ZBMkzqz9vyatlPGsMVqioLlGS4bKvEFKA5rpABCWiXHiamrxIAAfEWSD5mk6KF154lcYpht2WxcAmsTaymuTbHiS4oYAAwvL9hccdZfHBxBoCobVghGhMszgClbF1ybiVQugBXVl2pYFmXrylOBY3jJFqhRbX8Qpel+fiHl4gugBNMc1U1Z3Dl4AhaRIOlbDV9We017X0Ch87a31y9wWN3wrHAF0+r2bDZh923sId+ISHVBBjgQXwABI5lsfZdaB9Xk8FbiiYVNlQRIP8AKAgM4FQOxr1sOB09TsAwGUnKA2NwVI+nwCoGA0DwOsSC8xgomLH9XgngTOaG7iVwICTMhcUwAN0CZyHAQQ2xOe5yW0tS4IF5OdesjZrajXHm4EUp0IgGxpiQW41B054gyMrCIXIFgsRAC4Xwkglr7GrD1UU8AmJ+wDl6L2gtgHxCOoOX+0NUrpXKHAF4JAeiMnsC4Gk6Bn5ijmsvdOnDpJNk8AALz-rWDqdJMh7CgOfUgCiAA82ldJ+m1vYbUfolEDAGNnUklCf66noqCBcUARrfDpAsHSekaS+FsX6AyUBXJch8n5CAvh3H+Wca5A4zt-YFmMVrbUfD0Amn8hAGAeD7SPAQC8N48RYQgGuLcRkSSTjIGtB5Kaex0iZCNGEPMusRHcN4RAYcPdHE0l8fsWIPdvEQFqbrHJW0OGUgoUEshWtSlpnKUw86gT4yR2jnKDKFh+zlHiECdGuse5w0avsZA8z0GFL7kkGA2oB7tMmqPWs6ULCXGyoQMg2l-RNjJgGVwwQfTDHJnE2+VVX7YmsB-C5uVumCiGXsbpSSjmnWIfsh00DJ771nv8Be4JqgIA0N-QgLgnhJiqlGRY6xd7ULBYfECYEdinygiQC+QLHSTxRekN4ew4BpNOFVF4tgYCov+LPEhJ4CqlEAogU4nThnUIYr-F6M8OVMNrFzDO+V25sqpZKIa4AwAGNzpkfOesEFGxNhw0EFsraUo5U7VpWlyjqjXBuLcO55qCDWgtRaOTvk5TorykxloBVYDpM9R6H0BgkH1Ya9Um5tyql2alcBCAmxHU6imWBJpiK8F4HTbJJI9m8UpFqp12c950pnli4+uL7wkAGFKBaSE0oOnVLeZ05BgEMsaKWf+GdU3-gPkfHFEEkyqP7EOUcSpE6TlnIuZcq51zeuNX692tZ5Vax1mdD2JdDZl1VTSAEr9ozT0ZVi+q14e61vTQ2k+95DiWibS3Ytd4eCWyQVzFM9t4gD3OgEoxkc7U9NBOyp1LqvxupIAtc1i1BDO3SrHSgeV7bSmIuTFFFo8rWEVopCmU803LuAuQN2FZPTfxcCcUEUtLbnXSpgEgiRcF7DkQmE8-z-gKROM0NeYA3b3HOVvcm1y+raWeJvZ5uBXlYYdB1OIoQGi4RILra1kcfbxGAm8FoVAJq6xHtyMA2VCIjpFHncdRcp2IPLjeaNytlantLAIkgPdW0jgThOac84lwri9T6nc+wBZXqHjkkVdIhPAIMRrBV47daHI8N-YTOqi6CeocJ2ElohW1m4mFuNnYzDmDUMwDQWgdA8H4EIYyRhFByCKNYO8ZRnAwM8IpXw-gtCkBCGESIYRCBaFSH4dBpWchrHFIUSwWXSgVCqDUf49RGip0Um0VDVAJhmDmBEYAcYqDDmGKMTIERlC5BxPkFI+wYuxfi4ERLegUuGDkMYOQzBzBAA)

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects · Cloudflare Browser Run docs","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
