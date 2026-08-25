---
description: Write integration tests using Wrangler's `unstable_startWorker()` API
title: Wrangler's unstable_startWorker()
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler's unstable\_startWorker()

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/unstable%5Fstartworker/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution

`unstable_startWorker()` is deprecated. Cloudflare recommends using the [createTestHarness()](https://developers.cloudflare.com/workers/testing/test-harness/) API, which provides a harness specifically designed for integration testing.

The [unstable\_startWorker()](https://developers.cloudflare.com/workers/wrangler/api/#unstable%5Fstartworker) API exposes the internals of the Wrangler dev server, and allows you to customize how it runs. Compared to using [Miniflare directly for testing](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/), you can pass in a Wrangler configuration file, and it will automatically load the configuration for you.

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/unstable_startworker/#page","headline":"Wrangler's unstable_startWorker() · Cloudflare Workers docs","description":"Write integration tests using Wrangler's unstable\\_startWorker() API","url":"https://developers.cloudflare.com/workers/testing/unstable_startworker/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
