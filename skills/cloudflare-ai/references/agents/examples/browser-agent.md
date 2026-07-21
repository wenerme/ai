---
description: Build an agent that uses Browser Run tools to inspect pages, capture screenshots, scrape rendered content, and debug frontend issues.
title: Browser agent
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

#  Browser agent

Last updated Jun 3, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/agents/examples/browser-agent/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Build an agent that can browse the web, inspect pages, capture screenshots, and debug frontend issues with [Browser Run](https://developers.cloudflare.com/browser-run/) tools.  Beta

Instead of a fixed set of browser actions (click, screenshot, navigate), the LLM writes JavaScript code that runs CDP commands against a live browser session — accessing all domains, commands, events, and types in the protocol.

Two tools are provided:

| Tool             | Description                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| browser\_search  | Query the CDP spec to discover commands, events, and types. The spec is fetched dynamically from the browser's CDP endpoint and cached. |
| browser\_execute | Run CDP commands against a live browser via a cdp helper. Each call opens a fresh browser session, executes the code, and closes it.    |

## When to use browser tools

Browser tools are useful when your agent needs to:

* **Inspect web pages** — DOM structure, computed styles, accessibility tree
* **Debug frontend issues** — network waterfalls, console errors, performance traces
* **Scrape structured data** — extract content from rendered pages
* **Capture screenshots or PDFs** — visual snapshots of web content
* **Profile performance** — Core Web Vitals, JavaScript profiling, memory analysis

For basic page fetches that do not need a rendered DOM, use `fetch()` instead.

## Install

Browser tools require the Agents SDK and `@cloudflare/codemode`:

```sh
npm install agents @cloudflare/codemode ai zod
```

## Quick start

### 1\. Configure bindings

Add the Browser Run (formerly Browser Rendering) and Worker Loader bindings to your wrangler configuration:

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	"browser": {
		"binding": "BROWSER",
	},
	"worker_loaders": [
		{
			"binding": "LOADER",
		},
	],
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]

[browser]
binding = "BROWSER"

[[worker_loaders]]
binding = "LOADER"
```

### 2\. Create browser tools

```js
import { createBrowserTools } from "agents/browser/ai";

const browserTools = createBrowserTools({
	browser: env.BROWSER,
	loader: env.LOADER,
});
```

```ts
import { createBrowserTools } from "agents/browser/ai";

const browserTools = createBrowserTools({
	browser: env.BROWSER,
	loader: env.LOADER,
});
```

To connect to a custom CDP endpoint instead of the Browser Run binding, pass `cdpUrl`.

### 3\. Use with streamText

Pass browser tools alongside your other tools. The `model` can be any AI SDK provider — here using Workers AI:

```js
import { streamText } from "ai";
import { createWorkersAI } from "workers-ai-provider";

const workersai = createWorkersAI({ binding: env.AI });

const result = streamText({
	model: workersai("@cf/zai-org/glm-4.7-flash"),
	system: "You are a helpful assistant that can inspect web pages.",
	messages,
	tools: {
		...browserTools,
		...otherTools,
	},
});
```

```ts
import { streamText } from "ai";
import { createWorkersAI } from "workers-ai-provider";

const workersai = createWorkersAI({ binding: env.AI });

const result = streamText({
	model: workersai("@cf/zai-org/glm-4.7-flash"),
	system: "You are a helpful assistant that can inspect web pages.",
	messages,
	tools: {
		...browserTools,
		...otherTools,
	},
});
```

Both tools accept a `code` parameter containing a JavaScript async arrow function. The sandbox injects globals depending on the tool — `spec` for `browser_search` and `cdp` for `browser_execute`.

When the LLM uses `browser_search`, the code queries the CDP spec via the injected `spec` object:

```js
async () => {
	const s = await spec.get();
	return s.domains
		.find((d) => d.name === "Network")
		.commands.map((c) => ({ method: c.method, description: c.description }));
};
```

When the LLM uses `browser_execute`, the code runs CDP commands via the injected `cdp` helper:

```js
async () => {
	const { targetId } = await cdp.send("Target.createTarget", {
		url: "https://example.com",
	});
	const sessionId = await cdp.attachToTarget(targetId);
	const { root } = await cdp.send("DOM.getDocument", {}, { sessionId });
	const { outerHTML } = await cdp.send(
		"DOM.getOuterHTML",
		{ nodeId: root.nodeId },
		{ sessionId },
	);
	await cdp.send("Target.closeTarget", { targetId });
	return outerHTML;
};
```

## Use with an Agent

The typical pattern is to create browser tools inside an [AIChatAgent](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) message handler, which gives you message persistence and streaming:

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import { createBrowserTools } from "agents/browser/ai";
import { createWorkersAI } from "workers-ai-provider";
import { streamText, convertToModelMessages, stepCountIs } from "ai";

export class MyAgent extends AIChatAgent {
	async onChatMessage() {
		const workersai = createWorkersAI({ binding: this.env.AI });
		const browserTools = createBrowserTools({
			browser: this.env.BROWSER,
			loader: this.env.LOADER,
		});

		const result = streamText({
			model: workersai("@cf/zai-org/glm-4.7-flash"),
			system: "You can browse the web and inspect pages.",
			messages: await convertToModelMessages(this.messages),
			tools: {
				...browserTools,
			},
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { createBrowserTools } from "agents/browser/ai";
import { createWorkersAI } from "workers-ai-provider";
import { streamText, convertToModelMessages, stepCountIs } from "ai";

export class MyAgent extends AIChatAgent<Env> {
	async onChatMessage() {
		const workersai = createWorkersAI({ binding: this.env.AI });
		const browserTools = createBrowserTools({
			browser: this.env.BROWSER,
			loader: this.env.LOADER,
		});

		const result = streamText({
			model: workersai("@cf/zai-org/glm-4.7-flash"),
			system: "You can browse the web and inspect pages.",
			messages: await convertToModelMessages(this.messages),
			tools: {
				...browserTools,
			},
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

## TanStack AI

For TanStack AI, use the `/tanstack-ai` export:

```js
import { createBrowserTools } from "agents/browser/tanstack-ai";
import { chat, workersAIText } from "@tanstack/ai";

const browserTools = createBrowserTools({
	browser: env.BROWSER,
	loader: env.LOADER,
});

const stream = chat({
	adapter: workersAIText(env.AI, "@cf/zai-org/glm-4.7-flash"),
	tools: [...browserTools, ...otherTools],
	messages,
});
```

```ts
import { createBrowserTools } from "agents/browser/tanstack-ai";
import { chat, workersAIText } from "@tanstack/ai";

const browserTools = createBrowserTools({
	browser: env.BROWSER,
	loader: env.LOADER,
});

const stream = chat({
	adapter: workersAIText(env.AI, "@cf/zai-org/glm-4.7-flash"),
	tools: [...browserTools, ...otherTools],
	messages,
});
```

## Execution model

* `browser_search` fetches the live CDP protocol from the browser's `/json/protocol` endpoint and caches it briefly.
* `browser_execute` opens a fresh browser session for each call, exposes a small `cdp` helper API to sandboxed code, and closes the session when execution finishes.
* LLM-generated code runs in a Worker sandbox. CDP traffic stays in the host Worker.

## CDP helper API

Inside `browser_execute`, the following functions are available to the sandboxed code.

### `cdp.send(method, params?, options?)`

Send a CDP command and wait for the response.

| Parameter         | Type    | Description                                                   |
| ----------------- | ------- | ------------------------------------------------------------- |
| method            | string  | CDP method, for example "DOM.getDocument" or "Network.enable" |
| params            | unknown | Method parameters                                             |
| options.timeoutMs | number  | Per-command timeout (default: 10 seconds)                     |
| options.sessionId | string  | Target session ID (required for page-scoped commands)         |

### `cdp.attachToTarget(targetId, options?)`

Attach to a target and get a session ID. Uses `Target.attachToTarget` with `flatten: true`.

| Parameter         | Type   | Description                    |
| ----------------- | ------ | ------------------------------ |
| targetId          | string | The target to attach to        |
| options.timeoutMs | number | Timeout for the attach command |

Returns the `sessionId` string.

### `cdp.getDebugLog(limit?)`

Get recent CDP debug log entries (sends, receives, errors). Defaults to the last 50 entries, max 400.

### `cdp.clearDebugLog()`

Clear the debug log buffer.

## Configuration

### `createBrowserTools(options)`

Returns AI SDK tools (`browser_search` and `browser_execute`).

| Option     | Type                   | Default  | Description                                                    |
| ---------- | ---------------------- | -------- | -------------------------------------------------------------- |
| browser    | Fetcher                | —        | Browser Run binding                                            |
| cdpUrl     | string                 | —        | Optional override for a custom CDP endpoint                    |
| cdpHeaders | Record<string, string> | —        | Headers for CDP URL discovery (for example, Cloudflare Access) |
| loader     | WorkerLoader           | required | Worker Loader binding for sandboxed execution                  |
| timeout    | number                 | 30000    | Execution timeout in milliseconds                              |

Either `browser` or `cdpUrl` must be provided. When both are set, `cdpUrl` takes priority.

### Raw access

For custom integrations, import the building blocks directly:

```js
import {
	CdpSession,
	connectBrowser,
	connectUrl,
	createBrowserToolHandlers,
} from "agents/browser";

// Connect to a custom CDP endpoint
const session = await connectUrl("http://localhost:9222");
const version = await session.send("Browser.getVersion");
session.close();
```

```ts
import {
	CdpSession,
	connectBrowser,
	connectUrl,
	createBrowserToolHandlers,
} from "agents/browser";

// Connect to a custom CDP endpoint
const session = await connectUrl("http://localhost:9222");
const version = await session.send("Browser.getVersion");
session.close();
```

## Local development

Recent Wrangler releases support Browser Run in local development. `npx wrangler dev` provisions the browser automatically, so the same `browser: env.BROWSER` setup works locally and when deployed.

Use `cdpUrl` only when you intentionally want to connect to some other CDP-compatible browser endpoint, such as a tunnel or a manually managed Chrome instance.

## Security considerations

* LLM-generated code runs in **isolated Worker sandboxes** — each execution gets its own Worker instance
* External network access (`fetch`, `connect`) is **blocked** in the sandbox at the runtime level
* CDP commands are dispatched via Workers RPC — the WebSocket lives in the host, not the sandbox
* The CDP spec stays on the server — only query results flow to the LLM
* Responses are truncated to approximately 6,000 tokens to prevent context window overflow

## Current limitations

* **One session per execute call** — each `browser_execute` invocation opens a fresh browser session. Multi-step workflows must be completed within a single code block.
* **No authenticated sessions** — the browser starts without any cookies or login state.
* Requires `@cloudflare/codemode` as a peer dependency.
* Limited to JavaScript execution in the sandbox (no TypeScript syntax).

---

## Using Puppeteer directly

If you prefer to control the browser programmatically without LLM-generated code, you can use Puppeteer with the [Browser Run](https://developers.cloudflare.com/browser-run/) API directly.

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

```js
import puppeteer from "@cloudflare/puppeteer";

export class MyAgent extends Agent {
	async browse(browserInstance, urls) {
		let responses = [];
		for (const url of urls) {
			const browser = await puppeteer.launch(browserInstance);
			const page = await browser.newPage();
			await page.goto(url);

			await page.waitForSelector("body");
			const bodyContent = await page.$eval(
				"body",
				(element) => element.innerHTML,
			);

			let resp = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {
				messages: [
					{
						role: "user",
						content: `Return a JSON object with the product names, prices and URLs from the website content below. <content>${bodyContent}</content>`,
					},
				],
			});

			responses.push(resp);
			await browser.close();
		}

		return responses;
	}
}
```

```ts
import puppeteer from "@cloudflare/puppeteer";

interface Env {
	BROWSER: Fetcher;
	AI: Ai;
}

export class MyAgent extends Agent<Env> {
	async browse(browserInstance: Fetcher, urls: string[]) {
		let responses = [];
		for (const url of urls) {
			const browser = await puppeteer.launch(browserInstance);
			const page = await browser.newPage();
			await page.goto(url);

			await page.waitForSelector("body");
			const bodyContent = await page.$eval(
				"body",
				(element) => element.innerHTML,
			);

			let resp = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {
				messages: [
					{
						role: "user",
						content: `Return a JSON object with the product names, prices and URLs from the website content below. <content>${bodyContent}</content>`,
					},
				],
			});

			responses.push(resp);
			await browser.close();
		}

		return responses;
	}
}
```

Add the browser binding to your wrangler configuration:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
	"browser": {
		"binding": "BROWSER",
	},
}
```

```toml
[ai]
binding = "AI"

[browser]
binding = "BROWSER"
```

## Using Browserbase

You can also use [Browserbase ↗](https://docs.browserbase.com/integrations/cloudflare/typescript) by using the Browserbase API directly from within your Agent.

Once you have your [Browserbase API key ↗](https://docs.browserbase.com/integrations/cloudflare/typescript), you can add it to your Agent by creating a [secret](https://developers.cloudflare.com/workers/configuration/secrets/):

```sh
cd your-agent-project-folder
npx wrangler@latest secret put BROWSERBASE_API_KEY
```

Install the `@cloudflare/puppeteer` package and use it from within your Agent to call the Browserbase API:

 npm  yarn  pnpm  bun

```
npm i @cloudflare/puppeteer
```

```
yarn add @cloudflare/puppeteer
```

```
pnpm add @cloudflare/puppeteer
```

```
bun add @cloudflare/puppeteer
```

```js
import puppeteer from "@cloudflare/puppeteer";

export class MyAgent extends Agent {
	async browse(url) {
		const browser = await puppeteer.connect({
			browserWSEndpoint: `wss://connect.browserbase.com?apiKey=${this.env.BROWSERBASE_API_KEY}`,
		});
		const page = await browser.newPage();
		await page.goto(url);
		const content = await page.content();
		await browser.close();
		return content;
	}
}
```

```ts
import puppeteer from "@cloudflare/puppeteer";

interface Env {
	BROWSERBASE_API_KEY: string;
}

export class MyAgent extends Agent<Env> {
	async browse(url: string) {
		const browser = await puppeteer.connect({
			browserWSEndpoint: `wss://connect.browserbase.com?apiKey=${this.env.BROWSERBASE_API_KEY}`,
		});
		const page = await browser.newPage();
		await page.goto(url);
		const content = await page.content();
		await browser.close();
		return content;
	}
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/examples/browser-agent/#page","headline":"Browser agent · Cloudflare Agents docs","description":"Build an agent that uses Browser Run tools to inspect pages, capture screenshots, scrape rendered content, and debug frontend issues.","url":"https://developers.cloudflare.com/agents/examples/browser-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
