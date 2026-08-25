---
description: Seed local storage and replace dependencies in createTestHarness tests.
title: Prepare test state
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Prepare test state

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

An integration test may need data in local storage before it runs. It may also depend on external services that you do not want to call during the test. Use the test harness to prepare this state and replace those dependencies.

## Access configured bindings

`worker.getEnv()` returns the variables, secrets, and bindings configured for a Worker. You can [specify types](https://developers.cloudflare.com/workers/testing/test-harness/configure/#specify-types-for-worker-handles) for `server.getWorker()` so these values are typed. Then use the returned storage bindings to seed data directly from a test:

```js
const apiWorker = server.getWorker("api-worker");
const env = await apiWorker.getEnv();

await env.USERS.put("123", JSON.stringify({ name: "Ada" }));
```

```ts
const apiWorker = server.getWorker<ApiEnv>("api-worker");
const env = await apiWorker.getEnv();

await env.USERS.put("123", JSON.stringify({ name: "Ada" }));
```

## Apply D1 migrations

Use `worker.applyD1Migrations(bindingName)` to read the migration settings for a D1 binding from the Wrangler configuration. It uses the configured `migrations_dir` and `migrations_pattern`. Without these options, it reads `.sql` files from the `migrations` directory relative to the configuration file.

Call it after storage is reset to apply migrations that have not already run. Then access the database with `worker.getEnv()` and seed the required rows.

```js
const apiWorker = server.getWorker("api-worker");

beforeEach(async () => {
	await apiWorker.applyD1Migrations("DATABASE");

	const env = await apiWorker.getEnv();
	await env.DATABASE.prepare(
		"INSERT INTO daily_reports (date, user_ids) VALUES (?, ?)",
	)
		.bind("2026-05-29", JSON.stringify(["123", "456"]))
		.run();
});
```

```ts
const apiWorker = server.getWorker<ApiEnv>("api-worker");

beforeEach(async () => {
	await apiWorker.applyD1Migrations("DATABASE");

	const env = await apiWorker.getEnv();
	await env.DATABASE.prepare(
		"INSERT INTO daily_reports (date, user_ids) VALUES (?, ?)",
	)
		.bind("2026-05-29", JSON.stringify(["123", "456"]))
		.run();
});
```

## Prepare Durable Object storage

`worker.getDurableObjectStorage()` gives you access to the storage of a SQLite-backed Durable Object instance. Pass its binding name or exported class name. Then select the instance by name or ID.

The returned handle executes SQL inside the Durable Object. Use it to seed an instance before a test or inspect its state after the Worker runs.

```js
const worker = server.getWorker("api-worker");
const storage = await worker.getDurableObjectStorage("COUNTER", {
	name: "user-123",
});

await storage.exec(
	"INSERT INTO counters (id, value) VALUES (?, ?)",
	"user-123",
	0,
);

await worker.fetch("/counter/user-123");

const rows = await storage.exec(
	"SELECT value FROM counters WHERE id = ?",
	"user-123",
);
expect(rows).toEqual([{ value: 1 }]);
```

```ts
const worker = server.getWorker<ApiEnv>("api-worker");
const storage = await worker.getDurableObjectStorage("COUNTER", {
	name: "user-123",
});

await storage.exec(
	"INSERT INTO counters (id, value) VALUES (?, ?)",
	"user-123",
	0,
);

await worker.fetch("/counter/user-123");

const rows = await storage.exec<{ value: number }>(
	"SELECT value FROM counters WHERE id = ?",
	"user-123",
);
expect(rows).toEqual([{ value: 1 }]);
```

## Mock outbound requests

The test harness proxies outbound `fetch()` requests from your Workers through the `globalThis.fetch()` function in your Node environment. This allows you to intercept these requests and return a predictable response in your tests.

Here is an example using `vi.spyOn()` to mock a single request. But you can also use [Mock Service Worker (MSW)](https://developers.cloudflare.com/workers/testing/test-harness/integrations/#mock-service-worker) to intercept these requests based on your preferences.

```js
import { afterEach, test, vi } from "vitest";

afterEach(() => {
	vi.restoreAllMocks();
});

test("loads a user profile", async ({ expect }) => {
	vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
		const request = new Request(input, init);

		if (request.url === "http://identity.example.com/profile/123") {
			return Response.json({ id: "123", name: "Ada" });
		}

		throw new Error(`Unexpected request: ${request.method} ${request.url}`);
	});

	const worker = server.getWorker();
	const response = await worker.fetch("/users/123");
	expect(await response.json()).toEqual({ id: "123", name: "Ada" });
});
```

```ts
import { afterEach, test, vi } from "vitest";

afterEach(() => {
	vi.restoreAllMocks();
});

test("loads a user profile", async ({ expect }) => {
	vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
		const request = new Request(input, init);

		if (request.url === "http://identity.example.com/profile/123") {
			return Response.json({ id: "123", name: "Ada" });
		}

		throw new Error(`Unexpected request: ${request.method} ${request.url}`);
	});

	const worker = server.getWorker();
	const response = await worker.fetch("/users/123");
	expect(await response.json()).toEqual({ id: "123", name: "Ada" });
});
```

## Mock bindings with test Workers

Use `bindingOverrides` when you want to control the behavior of a binding. It routes the binding to a test Worker running inside the harness. For example, a test Worker can replace the Browser Rendering binding and return a known screenshot without starting a browser.

The test Worker can also expose JSRPC methods that configure its behavior. Use `worker.getExport()` to access the default export from your test.

```js
const server = createTestHarness({
	workers: [
		{
			configPath: "./workers/web/wrangler.jsonc",
			bindingOverrides: { BROWSER: "mock-browser" },
		},
		// The test Worker (mock-browser) that replaces the Browser Rendering binding
		{ configPath: "./workers/mock-browser/wrangler.jsonc" },
	],
});

// Access the test Worker to configure its behavior or assert its state.
const mockBrowser = await server.getWorker("mock-browser").getExport();

// Configure the screenshot to be returned through the overridden binding.
await mockBrowser.setScreenshot([137, 80, 78, 71]);

const response = await server.fetch("/reports/2026-05-29.png");
expect(await response.bytes()).toEqual(Uint8Array.from([137, 80, 78, 71]));
```

```ts
const server = createTestHarness({
	workers: [
		{
			configPath: "./workers/web/wrangler.jsonc",
			bindingOverrides: { BROWSER: "mock-browser" },
		},
		// The test Worker (mock-browser) that replaces the Browser Rendering binding
		{ configPath: "./workers/mock-browser/wrangler.jsonc" },
	],
});

// Access the test Worker to configure its behavior or assert its state.
const mockBrowser = await server
	.getWorker<unknown, typeof import("../workers/mock-browser")>("mock-browser")
	.getExport();

// Configure the screenshot to be returned through the overridden binding.
await mockBrowser.setScreenshot([137, 80, 78, 71]);

const response = await server.fetch("/reports/2026-05-29.png");
expect(await response.bytes()).toEqual(Uint8Array.from([137, 80, 78, 71]));
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/#page","headline":"Prepare test state · Cloudflare Workers docs","description":"Seed local storage and replace dependencies in createTestHarness tests.","url":"https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
