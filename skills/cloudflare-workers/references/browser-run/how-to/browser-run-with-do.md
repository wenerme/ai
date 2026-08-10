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
	"compatibility_date": "2026-08-10",
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
compatibility_date = "2026-08-10"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmACwjRARmGCA7AE4ArAC4WLNsA5wuNPgIkTpcpQFgAUAGF0VCAFMb2ACJQAzjHQuo0a8pIa8BMQkVHDAtgwARFA0tgAeAHQAVi4RpKhQYPah4VExCckR5lY29hDYACp0MLa+cDAwYHwEUNbIiXAAbnAuvAiwEADUwOi44Lbm5lDA7kgkAN4kjiAIcGSZAPJkiba8ECQAvn4I6MAkEbxglLioYIg1AO6YANa2CClEZlMzewBUJN0kGAgeq2OyvI4nM4AAQuVxud2QQJBYIQqTMZji3xIuFsqDg4D2czMAEhunQqLw-KDeAALAAUCFsAEcQLYXBAADQkewdACU8xJxN41nZJHQWxIDG5VA68QAQgAldYAdQAygBRBXxADmoLldAActk6REyMd7i5XhFeR9BchkCRVfZcP8SIyWWy9hB0CQIDTbItlqtMiRNttdly-fZ-vc4F4SF4XG62e4qJbBcK03tGW5JTG43txYl4qhqfT3az2Tb0cTiYyIMsqMm3B9ifsOWZ9rbM6KANLq9UABQA+oqVRqFcOAIIAGQAkgA1dXDucG4caizrA2OVV5gBsgltmMwewu3STcvNloQ3NidhoSaWKzWtjDO0JJLN6Atr1bLxgEBTo0HS2HOVBOpmuBJlKh4kuymBwLqtpCiKEAICAuyYHS7IELYXI8vyRK1i4wKvNhhB2PhMrVrWfquPE8ErLqeY4XYDHekxtitvsNZkhSVIQLSDLMpWECEXaDqqr0tjRjm6BgCA3hpr6Pp2KKlAQBmqEkPcUC4H6eYANqSPIABMghctIe57pZijCDZJD2RZJBSKIAC6rYoVmJD+lA2o0nsUrGYIAAczmyHuIVciFe6iFysXOSF8h7h5NbEvaJAAKqWr6-okLwyyMjY2K4f8NC+lMAbevljKlXAfjyTiN7suhuzLAGbAkAqplad5VDfo4pVSlQtj3IsuF0jRXmisKuKoHmkiCEtJB-AeK0kIonk9tmlAxLgg12HmI1jQdth0oKxIALIEDS8THNwdL9fcp06qC5SVZNJAOrNqCoPyfw-agHa1ry8TeqqaHRNqk1bdpGBgE1eb3XtL1uI0EAmiQADil3lNahmCKlEkkHO81RoyCZJvVX4-s1bKeNYYrVFQXKMlwOVeIKUDzXSACEdEuPENPXiQAA+oskPzNL0cLrzxK4xQjbsti4JN4m1tN8m2PElzQwABpe34i446y+BDiDQFQ2rBKNCZZnAFK2HrU3EmhdAChrrvS4Lss3lKcCxvGSLVCiOv4hS9IC-EPLxJdACaY5qpqLuHLwBC0iQdK2OrGs9lrOvoNDF21gbV7gibvhWOALr9XsOGzL7ds4Y78QkOqCDHAgvgACRzLY+x68DGsp4KPHEwqbKgiQ-6AcBAZwKgdg3rYcAZ2nYBgCpuUBibgpRzPQFQCBYEQdYUF5rBxMWP6vBPAm82N3ErgQEmZC4pgAboMzUOAohthczzKWMsy4IF5BdesjYbZjQnm4EUZ0IiG1piQW41AM54gyCrCIXIFisRAC4Xwihlr7GrL1UU8BmL+0Dl6b2QsQHxGOoOP+MM0oZXKHAF4JAeiMnsC4Gk6AX5inmivDOXCZJNk8AAL3-rWTqdJMh7CgBfUgiiAA8Ok9J+h1vYbUfplEDAGDnUkVDf66gYqCBcUBRrfDpAsXS+kaS+DsX6QyUA3Jcl8v5CAvgPEBRcW5A4LsA4FhMdrbU-D0AmgChAGA+D7SPAQC8N48RYQgGuLcRkySTjIGtJ5aaex0iZCNGEPMetRE8L4RAYcvcnE0j8fsWIvcfEQDqXrXJ21OGUkocE8h2sylpgqcwi6QT4xRxjnKTKFh+zlHiECDGete7wyavsZACyMFFP7kkGA2pB4dKmmPWsGULCXByoQMgOl-RNnJgGVwwQfTDApvEu+1U37YmsJ-S5eUemCmGXsHpyTjlnRIQch0MCp4Hznv8Re4JqgIA0D-QgLgnhJmqlGRY6w940PBUfUC4Edhn2giQS+wLHRT1RekN4ew4DpNONVF4tgYBov+HPUhp5CqlCAogU4XSRk0MYn-V6s9OXMNrNzTOBUO7supZKYa4AwCGLzpkAu+tEHG1Npw0EltrZUs5c7Np2lyjqjXBuLcO4FqCHWotJauSfm5Xony0xlpBVYDpC9J6n0BgkANUa9Um5tyqj2WlCBCAmzHS6imOBJoSK8F4PTHJJJ9l8UpNq51Od970tntik+eKHwkAGFKRayF0oOnVHeZ05AQGMsaKWABmc00AUPsfXFkEkxqP7EOUcSok6TlnIuZcq51w+pNf6j2tYFXa11udT2pcjblzVTSAEb9owzyZdihqN5e51ozY20+D5DiWmba3Et94eBW2QdzFMDt4iDwuoE4xUd7W9NBBy51rrvzupIItC1S1BAuwynHSg+UHbShIhTVFFp8rWCVkpSm0900rpAuQd2FZPQ-xcCcUE0srYXQypgEgiQ8F7HkQmU8AL-iKROM0deYB3b3AudvCmNz+o6WeFvF5uA3nYYdJ1OIoQGh4RIHrG1UdfbxBAm8FoVBJp61HtyMAOUiKjpFPnCdxdp1IIrreGNKsVZntLIIkgvc20jkThOac84lwrm9b6nc+xBbXuHrk0VdJhMgMMZrRVE69ZHI8D-ETuri5CZoSJ2ElphW1h4uF+NnYzDmDUMwDQWgdA8H4EIMQhgZAKEUEUaw94yjOFgZ4JSvh-BaFICEMIkQwiEC0KkPwGDys5DWOKQolgculAqFUGo-x6iNDTkpNoaGqATDMHMCIwA4xUGHMMUYmQIjKFyDifIKR9ixbiwlwISW9CpfEGIIwmXmDmCAA)

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
