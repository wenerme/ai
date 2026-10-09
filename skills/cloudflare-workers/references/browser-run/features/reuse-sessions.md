---
description: Improve Browser Run performance by reconnecting to existing browser sessions instead of launching new instances.
title: Reuse sessions
image: https://developers.cloudflare.com/browser-run/features/reuse-sessions/og.png?v=bfde937836ca8543
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Reuse sessions

Last updated Sep 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/features/reuse-sessions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, each Browser Sessions request launches a new browser instance. Reusing sessions eliminates cold-start time and improves performance by reconnecting to an existing browser instead of launching a new one.

This feature applies to Browser Sessions ([Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), and [CDP](https://developers.cloudflare.com/browser-run/cdp/)). [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) handle session lifecycle automatically.

There are two approaches to reusing sessions:

- **Shared browser session** (covered in this page): Connect multiple clients to a running browser. Create a separate browser context for each request to isolate cookies and storage.
- **[Durable Objects](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/)**: Persist a browser for stateful session management. Use this approach to route users to specific sessions or coordinate conflicting operations.

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

For setup, select the following options:

- For *What would you like to start with?*, choose `Hello World example`.
- For *Which template would you like to use?*, choose `Worker only`.
- For *Which language do you want to use?*, choose `TypeScript`.
- For *Do you want to use git for version control?*, choose `Yes`.
- For *Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?*, choose `Yes`.
- For *Do you want to deploy your application?*, choose `No` (we will be making some changes before deploying).

## 2. Install Puppeteer

In your `browser-worker` directory, install Cloudflare's [fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/):

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

Note

Concurrent connections require `@cloudflare/puppeteer` version 1.1.0 or later. For Playwright, they require `@cloudflare/playwright` version 1.3.0 or later. Older versions use the legacy single-connection workflow.

## 3. Configure the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "browser-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-10-09",
	"compatibility_flags": ["nodejs_compat"],
	"browser": {
		"binding": "MYBROWSER",
	},
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "browser-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-10-09"
compatibility_flags = [ "nodejs_compat" ]

[browser]
binding = "MYBROWSER"
```

## 4. Code

The script lists active browser sessions and starts with one selected at random. Multiple clients can connect to the same session concurrently. Each `puppeteer.connect()` call creates an independent Chrome DevTools Protocol (CDP) connection.

Each request creates a browser context to isolate its pages, cookies, and storage. When the request finishes, the script closes the context. It then calls `browser.disconnect()` to close its CDP connection without terminating the shared browser.

A listed session might expire before the connection completes or have no remaining capacity. The script tries the other sessions before launching a new one.

If the browser receives no commands for longer than the idle [limit](https://developers.cloudflare.com/browser-run/limits/), it closes automatically. Send enough requests to keep it alive.

```js
import puppeteer from "@cloudflare/puppeteer";

const MAX_CONCURRENT_CONTEXTS = 4; // adjust according to average workload

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		let reqUrl = url.searchParams.get("url") || "https://example.com";
		reqUrl = new URL(reqUrl).toString(); // normalize

		// Start with a random active session, then try the remaining sessions
		const sessionIds = await this.getSessionIds(env.MYBROWSER);
		let browser;
		let launched = false;
		for (const sessionId of sessionIds) {
			try {
				const candidate = await puppeteer.connect(env.MYBROWSER, sessionId);
				try {
					if (await this.hasCapacity(candidate)) {
						browser = candidate;
						break;
					}
				} finally {
					if (candidate !== browser) {
						await candidate.disconnect();
					}
				}
			} catch (e) {
				// The session may have closed after it was listed
				console.log(`Failed to connect to ${sessionId}. Error ${e}`);
			}
		}
		if (!browser) {
			// No active session was available, so launch a new session
			browser = await puppeteer.launch(env.MYBROWSER);
			launched = true;
		}

		const sessionId = browser.sessionId();
		const context = await browser.createBrowserContext();

		try {
			const page = await context.newPage();
			const response = await page.goto(reqUrl);
			const html = await response.text();

			return new Response(
				`${launched ? "Launched" : "Connected to"} ${sessionId} \n-----\n` +
					html,
				{
					headers: {
						"content-type": "text/plain",
					},
				},
			);
		} finally {
			await context.close();
			await browser.disconnect();
		}
	},

	async hasCapacity(browser) {
		const client = await browser.target().createCDPSession();
		try {
			const { browserContextIds } = await client.send(
				"Target.getBrowserContexts",
			);
			return browserContextIds.length < MAX_CONCURRENT_CONTEXTS;
		} finally {
			await client.detach();
		}
	},

	async getSessionIds(endpoint) {
		const sessions = await puppeteer.sessions(endpoint);
		console.log(`Sessions: ${JSON.stringify(sessions)}`);
		if (sessions.length === 0) {
			return [];
		}

		const startIndex = Math.floor(Math.random() * sessions.length);
		return [
			...sessions.slice(startIndex),
			...sessions.slice(0, startIndex),
		].map((session) => session.sessionId);
	},
};
```

```ts
import puppeteer, {
	type ActiveSession,
	type Browser,
	type BrowserWorker,
} from "@cloudflare/puppeteer";

const MAX_CONCURRENT_CONTEXTS = 4; // adjust according to average workload

interface Env {
	MYBROWSER: Fetcher;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		let reqUrl = url.searchParams.get("url") || "https://example.com";
		reqUrl = new URL(reqUrl).toString(); // normalize

		// Start with a random active session, then try the remaining sessions
		const sessionIds = await this.getSessionIds(env.MYBROWSER);
		let browser;
		let launched = false;
		for (const sessionId of sessionIds) {
			try {
				const candidate = await puppeteer.connect(env.MYBROWSER, sessionId);
				try {
					if (await this.hasCapacity(candidate)) {
						browser = candidate;
						break;
					}
				} finally {
					if (candidate !== browser) {
						await candidate.disconnect();
					}
				}
			} catch (e) {
				// The session may have closed after it was listed
				console.log(`Failed to connect to ${sessionId}. Error ${e}`);
			}
		}
		if (!browser) {
			// No active session was available, so launch a new session
			browser = await puppeteer.launch(env.MYBROWSER);
			launched = true;
		}

		const sessionId = browser.sessionId();
		const context = await browser.createBrowserContext();

		try {
			const page = await context.newPage();
			const response = await page.goto(reqUrl);
			const html = await response!.text();

			return new Response(
				`${launched ? "Launched" : "Connected to"} ${sessionId} \n-----\n` +
					html,
				{
					headers: {
						"content-type": "text/plain",
					},
				},
			);
		} finally {
			await context.close();
			await browser.disconnect();
		}
	},

	async hasCapacity(browser: Browser): Promise<boolean> {
		const client = await browser.target().createCDPSession();
		try {
			const { browserContextIds } = await client.send(
				"Target.getBrowserContexts",
			);
			return browserContextIds.length < MAX_CONCURRENT_CONTEXTS;
		} finally {
			await client.detach();
		}
	},

	async getSessionIds(endpoint: BrowserWorker): Promise<string[]> {
		const sessions: ActiveSession[] = await puppeteer.sessions(endpoint);
		console.log(`Sessions: ${JSON.stringify(sessions)}`);
		if (sessions.length === 0) {
			return [];
		}

		const startIndex = Math.floor(Math.random() * sessions.length);
		return [
			...sessions.slice(startIndex),
			...sessions.slice(0, startIndex),
		].map((session) => session.sessionId);
	},
};
```

Do not call `browser.close()` when other clients share the session. This method terminates the browser and disconnects every client. Browser contexts isolate request state, but they do not coordinate browser-wide operations.

Besides `puppeteer.sessions()`, Puppeteer provides other [session management methods](https://developers.cloudflare.com/browser-run/puppeteer/#session-management).

## 5. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

To test go to the following URL:

```plaintext
<LOCAL_HOST_URL>/?url=https://example.com
```

## 6. Deploy

Run `npx wrangler deploy` to deploy your Worker to the Cloudflare global network and then to go to the following URL:

```plaintext
<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/?url=https://example.com
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/features/reuse-sessions/#page","headline":"Reuse sessions","description":"Improve Browser Run performance by reconnecting to existing browser sessions instead of launching new instances.","url":"https://developers.cloudflare.com/browser-run/features/reuse-sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/browser-run/features/reuse-sessions/og.png?v=bfde937836ca8543","dateModified":"2026-09-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
