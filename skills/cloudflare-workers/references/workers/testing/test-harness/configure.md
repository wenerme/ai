---
description: Configure Workers, test values, and lifecycle options for createTestHarness.
title: Configure the test harness
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure the test harness

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/test-harness/configure/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`createTestHarness()` runs one or more Workers in a single local server. Each Worker can come from a Wrangler project or a Vite project that uses the Cloudflare Vite plugin.

## Configure Worker projects

Point each entry in the `workers` array to the Wrangler configuration file for a project:

```js
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

For Workers built by the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), run `vite build` first so tests use the production build output:

npmyarnpnpm

```
npx vite build
```

```
yarn vite build
```

```
pnpm vite build
```

The generated Wrangler configuration works like any other `configPath`. Each Worker is configured independently, so one harness can run both project types:

```js
const server = createTestHarness({
	workers: [
		// Wrangler project
		{ configPath: "./workers/api/wrangler.jsonc" },
		// Vite project (built output from the Cloudflare Vite plugin)
		{ configPath: "./dist/web_worker/wrangler.json" },
	],
});
```

```ts
const server = createTestHarness({
	workers: [
		// Wrangler project
		{ configPath: "./workers/api/wrangler.jsonc" },
		// Vite project (built output from the Cloudflare Vite plugin)
		{ configPath: "./dist/web_worker/wrangler.json" },
	],
});
```

## Select a Wrangler environment

By default, the test harness loads the top-level Wrangler configuration. Set `env` if you want to load a specific environment from the configuration.

```js
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc", env: "test" }],
});
```

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc", env: "test" }],
});
```

## Override variables and secrets

You can override `vars` and `secrets` for each Worker in the harness if you want to avoid creating a separate Wrangler environment for testing.

```js
const server = createTestHarness({
	workers: [
		{
			configPath: "./wrangler.jsonc",
			vars: { API_HOST: "http://identity.example.com" },
			secrets: { API_TOKEN: "test-token" },
		},
	],
});
```

```ts
const server = createTestHarness({
	workers: [
		{
			configPath: "./wrangler.jsonc",
			vars: { API_HOST: "http://identity.example.com" },
			secrets: { API_TOKEN: "test-token" },
		},
	],
});
```

## Configure the harness after setup

If part of the Worker configuration depends on the test setup, you can call `createTestHarness()` without options and configure the harness with `server.update()` before starting the server.

```js
const server = createTestHarness();
let upstream;

beforeAll(async () => {
	upstream = await startLocalApi();

	await server.update({
		workers: [
			{
				configPath: "./wrangler.jsonc",
				vars: { API_HOST: upstream.url },
			},
		],
	});

	await server.listen();
});

afterAll(async () => {
	await server.close();
	await upstream.close();
});
```

```ts
const server = createTestHarness();
let upstream: { url: string; close(): Promise<void> };

beforeAll(async () => {
	upstream = await startLocalApi();

	await server.update({
		workers: [
			{
				configPath: "./wrangler.jsonc",
				vars: { API_HOST: upstream.url },
			},
		],
	});

	await server.listen();
});

afterAll(async () => {
	await server.close();
	await upstream.close();
});
```

## Reset the harness between tests

When reusing a server across tests, call `server.reset()` after each test. It recreates local storage and restores Workers to the options used when the current session started.

```js
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

afterEach(async () => {
	await server.reset();
});
```

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

afterEach(async () => {
	await server.reset();
});
```

After a reset, apply any required schema migrations and seed data again. For examples, refer to [Prepare test state](https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/).

## Print debug output when tests fail

`server.debug()` prints the server timeline and captured Workers runtime logs. Call it when a test throws an exception or fails and you need more information to debug it.

The following example uses a cleanup hook from Vitest:

```js
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

afterEach(({ task }) => {
	if (task.result?.state === "fail") {
		server.debug();
	}
});
```

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

afterEach(({ task }) => {
	if (task.result?.state === "fail") {
		server.debug();
	}
});
```

## Specify types for Worker handles

`server.getWorker()` accepts types for the Worker environment and module exports. You can define these types manually. But to keep them aligned with your Worker, you can generate the env type from the Wrangler configuration and derive the exports from its source module.

Give each Worker a distinct environment interface so the generated declarations can be used together:

npmyarnpnpm

```
npx wrangler types ./workers/api/worker-configuration.d.ts --config ./workers/api/wrangler.jsonc --env-interface ApiEnv
```

```
yarn wrangler types ./workers/api/worker-configuration.d.ts --config ./workers/api/wrangler.jsonc --env-interface ApiEnv
```

```
pnpm wrangler types ./workers/api/worker-configuration.d.ts --config ./workers/api/wrangler.jsonc --env-interface ApiEnv
```

Repeat this command for each Worker and include the generated files in the TypeScript configuration for your tests:

```json
{
	"include": ["./workers/*/worker-configuration.d.ts", "./tests/**/*.ts"]
}
```

Pass the generated environment interface to `server.getWorker()`. Use `typeof import()` to derive the Worker exports from its source module:

```js
const apiWorker = server.getWorker("api-worker");
```

```ts
const apiWorker = server.getWorker<
	ApiEnv,
	typeof import("../workers/api/index")
>("api-worker");
```

In this example, `ApiEnv` comes from `worker-configuration.d.ts`. The module type includes the default export and its RPC methods. Re-run [wrangler types](https://developers.cloudflare.com/workers/languages/typescript/#generate-types) when the Worker configuration changes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/test-harness/configure/#page","headline":"Configure the test harness · Cloudflare Workers docs","description":"Configure Workers, test values, and lifecycle options for createTestHarness.","url":"https://developers.cloudflare.com/workers/testing/test-harness/configure/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
