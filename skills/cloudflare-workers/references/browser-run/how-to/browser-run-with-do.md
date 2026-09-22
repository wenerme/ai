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

Last updated Apr 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By following this guide, you will create a Worker that uses the Browser Run API along with [Durable Objects](https://developers.cloudflare.com/durable-objects/) to take screenshots from web pages and store them in [R2](https://developers.cloudflare.com/r2/).

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use a Node version manager like <a href="https://volta.sh/">Volta ↗</a> or <a href="https://github.com/nvm-sh/nvm">nvm ↗</a> to avoid permission issues and change Node.js versions. <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler</a>, discussed later in this guide, requires a Node version of <code>16.17.0</code> or later.

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
	// Set this to today's date
	"compatibility_date": "2026-09-22",
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
compatibility_date = "2026-09-22"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmUQFYAnGIAsgsQDYJALhYs2wDnC40+AkeKmyFEgLAAoAMLoqEAKY3sAESgBnGOhdRo1pSXV4CYhIqOGBbBgAiKBpbAA8AOgArFwjSVCgwe1DwqJiE5IjzKxt7CGwAFToYW184GBgwPgIoa2REuAA3OBdeBFgIAGpgdFxwW3NzKGB3JBIAbxJHEAQ4MkyAeTJE214IEgBfPwR0YBII3jBKXFQwRBqAd0wAa1sEFKIzKZm9gCoSbpIMBA9VsdleRxOZwAAhcrjc7sggSCwQhUmYzHFviRcLZUHBwHs5mYAJDdOhUXh+UG8AAWAAoELYAI4gWwuCAAGhI9g6AEp5iTibxrOySOgtiQGNyqB14gAhABK6wA6gBlACiCviAHNQXK6AA5bJ0iJkY73FyvCK8j6C5DIEiq+y4f4kRkstl7CDoEgQGm2RbLVaZEibba7Ll++z-e5wLwkLwuN1s9xUS2C4VpvaMtySmNxvbixLxVDU+nu1nsm3o4nExkQZZUZNuD7E-Ycsz7W2Z0UAaXV6oACgB9RUqjUK4cAQQAMgBJABq6uHc4Nw41FnWBscqrz8kEtsxmD2F26Sbl5stCG5sTsNCTSxWa1sYZ2hJJZvQFterZeMAgU6NB0thzlQTqZrgSZSgeJLspgcC6raQoihACAgLsmB0uyBC2FyPL8kStYuMCrxYYQdh4TK1a1n6rjxHBKy6nm2F2PR3qMbYrb7DWZIUlSEC0gyzKVhABF2g6qq9LY0Y5ugYAgN4aa+j6diipQEAZihJD3FAuB+nmADaACMEgAEyCFyRnCPI8iWWI1lctZFkkNIRnSAAuq2yFZiQ-pQNqNJ7FKxmCAAHM5ADs8ihVyoXyNIXLxc5oUSPInk1sS9okAAqpavr+iQvDLIyNjYjh-w0L6UwBt6hWMuVcB+HJOLXuyaG7MsAZsCQCqmZpPlUF+jjlVKVC2Pciw4XS1HeaKwq4qgeZGYIK0kH8+5rSQYheT22aUDEuDDXYeZjRNR22HSgrEgAsgQNLxMc3B0oN9znTqoLlNV00kA682oKg-J-H9qAdrWvLxN6qqodE2rTTtWkYGALV5o9B1vW4jQQCaJAAOLXeU1oGYI6XiSQc6LVGjIJkmjWft+rVsp41hitUVBcoyXB5V4gpQItdIAIS0S48R01eJAAD7iyQgs0nRouvPErjFGNuy2Lg01ibWs1ybY8SXLDAAGF5fmLjjrL4UOINAVDasE40JlmcAUrYBszcSqF0AKWvu7Lwvy9eUpwLG8ZItUKJ6-iFL0kL8Q8vE10AJpjmqmpu4cvAELSJB0rYmtaz2Ot6+gsNXbWRuXuCZu+FY4AuoNezYbM-sO9hzvxCQ6oIMcCC+AAJHMtj7AboNa2ngrcaTCpsqCJB-gBQEBnAqB2NethwFnGdgGAyn5QGZuCjHc+AVAwGgeB1iQXmMGkxY-q8E8CaLc3cSuBASZkLimABugrMw4CCG2B5nzGWcsK4IF5FdesjY7YTSnm4EUF0IjG3piQW41As54gyGrCIXIFgsRAC4XwYhVr7GrP1UU8AmKB2Dl6X2IswHxFOoOABcMMpZXKHAF4JAeiMnsC4Gk6A35ikWmvLOPDpJNk8AAL0AbWbqdJMh7CgFfUgyiAA82ldJ+j1vYbUfpVEDAGHnUkND-66noqCBcUBxrfDpAsHSekaS+AcX6AyUB3Jcj8gFCAvgvGBTce5A4bsg4FjMbrbUgj0AmkChAGAhD7SPAQC8N48RYQgGuLcRkqSTjIGtF5Waex0iZCNGEPMBtxF8IERAYc-cXE0gCfsWI-c-EQAaQbfJu1uGUmoaEyhusKlpiqawq6IT4wxzjnKbKFh+zlHiECLGBt+6IxavsZASysElMHkkGA2ph5dJmhPWsWULCXDyoQMg2l-RNkpgGVwwQfTDCpokh+tUP7YmsN-a5BU+mClGXsPpqTTkXTIUch0cCZ5HwXv8Ze4JqgIHUH-QgLgnhJlqlGRY6wD50MhSfECYEdgXygiQa+oLHQz3RekN4ew4CZNOLVF4tgYAYv+AvchJ5iqlEAogU4PSxl0IYgA9689uWsNrLzbORUu6ctpZKUa4AwDGILpkIuhtkGm3Ntw0E1tbY0u5a7DpWlyjqjXBuLcO4lqCE2stFa+S-n5TogK8xlphVYDpG9F630BgkCNSa9Um5tyqgORlKBCAmynR6imBBJpiK8F4IzPJJJDm8UpLq11edD6Mvnris+BL7wkAGFKZaSFMoOnVLeZ05AwHMsaKWIB2cM3-mPqffFEEkwaP7EOUcSoU6TlnIuZcq51x+rNYGr2tYlW631pdb25cTaVw1TSAEH9oxzxZbipq15+4Nqzc28+95DiWlbe3Mtd4eA21QbzFMTt4jDyusE0xMdHX9NBFy117qvyepIMtK1K1BBuyygnSghUnbSmIlTdFFpCrWBVopams9M1ruAuQT2FZPR-xcCcUEssbZXSypgEgiQCF7EUQmE8QL-gKROM0TeYBPb3CubvKmdzBraWeDvN5uAPm4YdN1OIoQGi4RIAbO1Md-bxGAm8FoVBpoG3HtyMAeVCLjpFIXKdpdZ0oKrjeONas1YXtLMIkg-cO0jmThOac84lwrl9f6nc+xha3tHvk8VdJRNgOMdrZVU6DYnI8H-MT+rS4iboWJ2ElpRW1m4pFxNnYzDmFUMwdQmhtA8H4EIUQwhJAyDkIoIo1g7xlGcPAzwilfD+E0KQEIYRIhhEIJoVIfgsFVZyGscUhRLD5dKBUKoNR-j1EaBnRSbQMNUAmGYOYERgBxioMOYYoxMgRCULkHE+QUj7HiwlpLgQUu6HSwYbLxhmDmCAA)

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

## 6. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

## 7. Deploy

Run [`npx wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

- Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)
- Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/)
- [Using R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/#page","headline":"Deploy a Browser Run Worker with Durable Objects","description":"Use the Browser Run API along with Durable Objects to take screenshots from web pages and store them in R2.","url":"https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
