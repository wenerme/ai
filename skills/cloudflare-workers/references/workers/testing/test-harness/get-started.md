---
description: Write your first integration test for a Cloudflare Worker with createTestHarness.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/test-harness/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows how to write a basic integration test for a Worker with `createTestHarness()`. The example uses Vitest as the test runner and exercises a Worker built with Wrangler.

## Prerequisites

You need:

* A Worker project with a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)
* A Node.js test runner such as [Vitest ↗](https://vitest.dev/)
* `wrangler` installed as a development dependency

## Create a test harness

Import `createTestHarness()` from `wrangler`. Point the test harness at your Worker configuration file.

```js
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

## Manage the test harness lifecycle

For simplicity, we will reuse a single server for the test suite and reset it after each test. You can also start a new server for each test if the tests do not share the same configuration.

```js
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(async () => {
	// Start the server before all tests
	await server.listen();
});

afterEach(async () => {
	// Recreates storage and restores the original Worker options after each test
	await server.reset();
});

afterAll(async () => {
	// Close the server after all tests
	await server.close();
});
```

```ts
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(async () => {
	// Start the server before all tests
	await server.listen();
});

afterEach(async () => {
	// Recreates storage and restores the original Worker options after each test
	await server.reset();
});

afterAll(async () => {
	// Close the server after all tests
	await server.close();
});
```

## Write your first test

Use the [helpers](https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/) provided by the test harness to interact with the Worker and assert its behavior. For example, you can call `server.fetch()` to send a request to the Worker and assert against its response.

```js
import { test } from "vitest";

test("responds", async ({ expect }) => {
	const response = await server.fetch("/");
	expect(await response.text()).toBe("Hello World");
});
```

```ts
import { test } from "vitest";

test("responds", async ({ expect }) => {
	const response = await server.fetch("/");
	expect(await response.text()).toBe("Hello World");
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/test-harness/get-started/#page","headline":"Get started · Cloudflare Workers docs","description":"Write your first integration test for a Cloudflare Worker with createTestHarness.","url":"https://developers.cloudflare.com/workers/testing/test-harness/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
