---
description: Write integration tests using Wrangler's `unstable_startWorker()` API
title: Wrangler's unstable_startWorker()
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Wrangler's unstable\_startWorker()

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/testing/unstable%5Fstartworker/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Note

For most users, Cloudflare recommends using the Workers Vitest integration. If you have been using `unstable_dev()`, refer to the [Migrate from unstable\_dev() guide](https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/).

Caution

`unstable_startWorker()` is an experimental API subject to breaking changes.

If you do not want to use Vitest, consider using [Wrangler's unstable\_startWorker() API](https://developers.cloudflare.com/workers/wrangler/api/#unstable%5Fstartworker). This API exposes the internals of Wrangler's dev server, and allows you to customise how it runs. Compared to using [Miniflare directly for testing](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/), you can pass in a Wrangler configuration file, and it will automatically load the configuration for you.

This example uses `node:test`, but should apply to any testing framework:

```ts
import assert from "node:assert";
import test, { after, before, describe } from "node:test";
import { unstable_startWorker } from "wrangler";

describe("worker", () => {
	let worker;

	before(async () => {
		worker = await unstable_startWorker({ config: "wrangler.json" });
	});

	test("hello world", async () => {
		assert.strictEqual(
			await (await worker.fetch("http://example.com")).text(),
			"Hello world",
		);
	});

	after(async () => {
		await worker.dispose();
	});
});
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/unstable_startworker/#page","headline":"Wrangler's unstable_startWorker() · Cloudflare Workers docs","description":"Write integration tests using Wrangler's unstable\\_startWorker() API","url":"https://developers.cloudflare.com/workers/testing/unstable_startworker/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
