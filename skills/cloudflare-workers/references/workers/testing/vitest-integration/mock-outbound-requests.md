---
description: Mock outbound HTTP and WebSocket requests when testing Workers with the Vitest plugin.
title: Mock outbound requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Mock outbound requests

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use [@msw/cloudflare ↗](https://github.com/mswjs/cloudflare) to mock outbound HTTP and WebSocket requests with `@cloudflare/vitest-plugin`. The integration supports unit tests that call your Worker's exported handler and integration tests that call `exports.default.fetch()`.

## Install dependencies

Install Mock Service Worker (MSW) version 2.14 or later and the Cloudflare integration:

npmyarnpnpmbun

```
npm i -D msw@^2.14.0 @msw/cloudflare
```

```
yarn add -D msw@^2.14.0 @msw/cloudflare
```

```
pnpm add -D msw@^2.14.0 @msw/cloudflare
```

```
bun add -d msw@^2.14.0 @msw/cloudflare
```

## Create a network mock

Create a shared network mock for your tests:

```js
import { setupNetwork } from "@msw/cloudflare";

export const network = setupNetwork();
```

```ts
import { setupNetwork } from "@msw/cloudflare";

export const network = setupNetwork();
```

In a Vitest setup file, start the mock before tests, reset handlers after each test, and stop it after tests finish:

```js
import { afterAll, afterEach, beforeAll } from "vitest";
import { network } from "./network";

beforeAll(() => network.enable());
afterEach(() => network.resetHandlers());
afterAll(() => network.disable());
```

```ts
import { afterAll, afterEach, beforeAll } from "vitest";
import { network } from "./network";

beforeAll(() => network.enable());
afterEach(() => network.resetHandlers());
afterAll(() => network.disable());
```

Add the setup file to the `setupFiles` array in your Vitest configuration.

## Mock an HTTP request

Use `network.use()` and MSW request handlers to return a response for an outbound request. This example tests a Worker that requests a greeting from an external API:

```js
export default {
	async fetch() {
		return fetch("https://api.example.com/greeting");
	},
};
```

```ts
export default {
	async fetch(): Promise<Response> {
		return fetch("https://api.example.com/greeting");
	},
} satisfies ExportedHandler;
```

```js
import {
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
import { env } from "cloudflare:workers";
import { http, HttpResponse } from "msw";
import { expect, it } from "vitest";
import worker from "../src";
import { network } from "./network";

it("mocks an outbound request", async () => {
	network.use(
		http.get("https://api.example.com/greeting", () => {
			return HttpResponse.json({ message: "Hello" });
		}),
	);

	const ctx = createExecutionContext();
	const response = await worker.fetch(
		new Request("https://example.com"),
		env,
		ctx,
	);
	await waitOnExecutionContext(ctx);
	expect(await response.json()).toEqual({ message: "Hello" });
});
```

```ts
import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { http, HttpResponse } from "msw";
import { expect, it } from "vitest";
import worker from "../src";
import { network } from "./network";

it("mocks an outbound request", async () => {
	network.use(
		http.get("https://api.example.com/greeting", () => {
			return HttpResponse.json({ message: "Hello" });
		}),
	);

	const ctx = createExecutionContext();
	const response = await worker.fetch(
		new Request("https://example.com"),
		env,
		ctx,
	);
	await waitOnExecutionContext(ctx);
	expect(await response.json()).toEqual({ message: "Hello" });
});
```

## Mock an outbound WebSocket

Use MSW's `ws.link()` API to mock a WebSocket connection created by your Worker. The [request-mocking fixture ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/request-mocking) includes HTTP, `exports.default.fetch()`, and WebSocket examples.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/#page","headline":"Mock outbound requests · Cloudflare Workers docs","description":"Mock outbound HTTP and WebSocket requests when testing Workers with the Vitest plugin.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
