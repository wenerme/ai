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
	"compatibility_date": "2026-07-31",
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
compatibility_date = "2026-07-31"
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGYQHYATADZR0iYIBcLFm2Ac4XGnwEjx02VPkBYAFABhdFQgBTK9gAiUAM4x0TqNEsKSqvAWIkVHDA1gwARFA01gAeAHQAVk5hpKhQYLbBoRFRcYlhphZWthDYACp0MNbecDAwYHwEUJbI8XAAbnBOvAiwEADUwOi44NamplDArkgkAN4k9iAIcGTpAPJk8da8ECQAvj4I6MAkYbxglLioYIhVAO6YANbWCElEJhNTOwBUJJ0kMCBatYbM8DkcTgABM4XK43ZAAoEghDJEwmGKfEi4ayoODgHYzEwASE6dCovB8wN4AAsABQIawARxA1icEAANCRbG0AJSzImE3iWVkkdAbEgMTlUNqxABCACVVgB1ADKAFE5bEAObAmV0ABymRpYTIh1uTmeYW5b35yGQJGVtlwvxI9KZLJ2EHQJAgVOs80Wy3SJHWm22HJ9tl+tzgHhIHicLpZrio5v5gpTO3pLnFUZjO1F8ViqEptNdzNZVtRhMJ9IgiyoiZcb0JuzZJl21vTwoA0qrVQAFAD68qVarlg4AggAZACSADVVYOZ3rB2qzKs9fZlTmpIJrejMDszp0EzLTeaEJzojYaAmFksVtYQ1t8USTegzc9m08YBAJ-U2msGcqAddNcATCU9yJVlMDgbVrQFIUIAQEBtkwGlWQIawOS5XkCWrJxAWeDDCBsHCpUrasfWcWIYKWbUc0wmxaM9ejrGbXYqxJMkKQgak6UZcsIDwm07WVbprEjLN0DAEBPBTb0vRsYVKAgNMkJIW4oFwH0cwAbWEABOeQOWEABmKQpFMgBWCyOQswQOQAFmEJyAF1m0QjMSF9KBNSpHYJQMwQAA5HJIMQpBCjkQqkJyOTi8KQsMqQPKrQlbRIABVc1vV9EheEWekrExLDfhob0Jj9T0CvpMq4B8GSsUvVkUO2RY-TYEg5QkdTvKoD97DKiUqGsW55iwmlKK84VBWxVAc2EQRlpIH5d1WkhrM8rtM0oKJcCGmwc1G8bDusGl+UJABZAgqViQ5uBpAbbjOrVgVKKqppIO05tQVBeR+X7UDbatuViT1lWQyJNSm7aNIwMBmpzB79telx6ggI0SAAcSu0pLT0wQ0tEkgZwWiN6TjBMGvfT8WpZdxLBFSoqA5ekuFyjx+SgBaaQAQmopxYlpi8SAAHzFkgBapGiReeWJnEKUbtmsXAppE6sZpk6xYnOGGAAMzw-UX7FWbxIcQaAqE1QIxrjDM4DJax9emwlkLoPlNbdmWhbly8JTgaNYwRSokV13EyVpQXYi5WIroATRHFV1Vd-ZeAIakSBpawNc1rttd19AYcu6tDfPUFTe8CxwCdAadkw6Y-ftzCndiEhVQQQ4EG8AASGZrF2fWQc11P+U4km5RZYESB-P8AL9OBUBsS9rDgTP07AMBFLyv1Tf5aPZ--KBAOA0DLHAnMoJJsxfV4B44wWpuYmcCAEzIbFMD9dAWeh-44OsbmvNpay3Lggbkl1az1ltuNSeLghTnTCEbOmJBrjUEzjiNIqswgcjmExEAThvDWRWrsSsfVhTwAYgHIOHofbC1AbEE6-Z-6w3SplUocAngkC6PSWwTgqToFfiKBaq9M7cMkg2dwAAvAB1Yuo0nSDsKAl9SBKIADyaW0j6XWthNQ+hUX0PoudiTUL-tqWiwI5xQDGp8GkcwtI6SpN4exPo9JQDchyXy-kIDeE8QFVxbk9iu0DnmUxOtNQCPQEaAKEAYAENtPcBATwXixGhCAS41x6QpKOMgS0nkZo7FSOkA0IQcz6zEbw-hEBBx92cVSfxuxoh918RAep+s8k7S4eSKhISKE63KSmSpLDLrBNjNHWOMospmF7KUWIAJMb6z7gjZquxkCLMwcUgeCQYCaiHp06a49qyZTMOcXKhAyCaV9A2CmfpnCBC9IMSmCT741XfpiSwX8rn5V6fyEZOxekpJOedUhhy7SwOnofeevwl6gkqAgVQv9CBOAeAmGqEZ5irH3rQiFx8gIgS2OfCCJAr4gvtNPNFqQXg7DgBk44NUnjWBgOi3488yFHiKsUf8iBjjdNGbQui-83pzy5Sw6sPMs6FU7hyml4oRrgDAEY-O6RC4GyQSbM2XDgRWxttSrlLt2kaVKKqFca4NxbkWoIDaS1lp5N+XlGi-KzHmiFVgGkr1npfT6CQQ1xrVTrk3MqfZ6VIEIAbCdbqSZ4FGkIrwXgDNclEgOdxckOqXW5wPgyueOLT74tvCQPoEoloIQynaVU15HTkFAUy+oxZAFZ3Tb+I+J88VgQTOo3sA5hwKmTuOac85FzLlXL601AbPbVkVTrPWF0vZl2NhXdVVI-jv0jLPZlOLGqXj7vWzNTaz63n2OaFtbdS03h4NbFBPMkyO1iEPS6QSTHRwdX04EnKXVuo-B6kgS1LXLUEK7TK8dKAFUdpKQilM0VmgKpYZW8kqYzwzauwC5APZlndL-JwRxgQy2tpdTKmASDxHwTsBRcYjyAt+HJI4jQN5gA9rcS5O9Ka3IGppR429Xm4HeThu0XUYjBDqNhEg+tbXRz9rEQCLwmhUCmvrMenIwC5XwmOoUBdJ0lxncgyuV5Y2q1Vue4sQiSB93bUOJOY5JyzgXEuH1fqty7CFjekeeSxU0hE6AoxWslWTv1sctwv9RN6pLsJ2honoTmhFdWTiEWE3thMKYZQzBVDqE0DwfgQhRCSBkMIOQggCiWBvCURwcD3DyW8L4dQpAgghHCCEQg6hkg+EwZVrIKxRT5HMHl4oZQKhVF+LUeo6d5ItHQ1QMYJgZhhGADGKgg5BjDHSGEBQ2QsS5CSLsOL8XEv+GS9oNLehMvZeYKYIAA)

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
