---
description: A set of programmatic APIs that can be integrated with local Cloudflare Workers-related workflows.
title: API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# API

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Wrangler offers APIs to programmatically interact with your Cloudflare Workers.

* [createTestHarness](#createtestharness) \- Start one or more Workers for integration tests in any Node.js test runner.
* [experimental\_generateTypes](#experimental%5Fgeneratetypes) \- Generate TypeScript type definitions from your Worker configuration.
* [unstable\_startWorker](#unstable%5Fstartworker) \- Start a server for running integration tests against your Worker.
* [unstable\_dev](#unstable%5Fdev) \- Start a server for running either end-to-end (e2e) or integration tests against your Worker.
* [getPlatformProxy](#getplatformproxy) \- Get proxies and values for emulating the Cloudflare Workers platform in a Node.js process.

## `createTestHarness`

`createTestHarness()` starts one or more Workers for integration tests from any Node.js test runner. It runs production build output from Wrangler configuration files, Vite-generated configuration files, or inline Wrangler configuration objects. The API wraps Miniflare and provides methods for dispatching requests and scheduled events.

For setup guidance and examples, refer to [Integration test harness](https://developers.cloudflare.com/workers/testing/test-harness/).

### Syntax

```js
import { createTestHarness } from "wrangler";

const server = createTestHarness(options);
```

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness(options);
```

### Parameters

* `options` `object` optional

  * Test harness options. If you call `createTestHarness()` without options, call `server.update(options)` before `server.listen()`.

    * `root` `string` optional
      Base directory used to resolve relative Worker configuration paths. Defaults to `process.cwd()`.
    * `workers` `WorkerInput[]`
      Workers to run in the test server. The first Worker is the primary Worker.

Each `WorkerInput` can load a Worker from a Wrangler configuration file:

```js
const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});
```

```ts
const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});
```

Configuration file inputs support these fields:

* `configPath` `string | URL`
  * Path to a Wrangler configuration file. Relative paths resolve from `root`.
* `env` `string` optional
  * Wrangler environment to load from the configuration file.
* `vars` `Record<string, Json>` optional
  * Test-only variables that override variables from the Wrangler configuration file.
* `secrets` `Record<string, string>` optional
  * Test-only secrets that override values loaded from `.dev.vars` and `.env` files.
* `bindingOverrides` `Record<string, string>` optional
  * Test-only service binding overrides. Keys are binding names in this Worker's environment. Values are Worker names in this test harness.

Each `WorkerInput` can also use `config` to provide an inline Wrangler configuration object:

```js
const server = createTestHarness({
	workers: [
		{
			config: {
				name: "api-worker",
				main: "src/api.ts",
				compatibility_date: "YYYY-MM-DD",
			},
		},
	],
});
```

```ts
const server = createTestHarness({
	workers: [
		{
			config: {
				name: "api-worker",
				main: "src/api.ts",
				compatibility_date: "YYYY-MM-DD",
			},
		},
	],
});
```

### Return type

`createTestHarness()` returns a `TestHarness` object with these methods:

* `listen()` `Promise<{ url: URL }>`
  * Starts the server and returns its current URL. Repeated calls return the same session until the server is closed or reset.
* `fetch(input, init)` `Promise<Response>`
  * Dispatches a fetch request through the server. Relative URLs resolve against the current server URL. Absolute URLs follow the configured Worker routes and fall back to the primary Worker.
* `getWorker(name?)` `WorkerHandle`
  * Returns a handle for dispatching events directly to a Worker. When no name is provided, this returns the primary Worker.
* `getLogs()` `WorkerdStructuredLog[]`
  * Returns captured Workers runtime logs since the current server session started or `clearLogs()` was last called.
* `clearLogs()` `void`
  * Clears captured Workers runtime logs.
* `debug()` `void`
  * Prints a diagnostic timeline for this test server, including server events and captured Workers runtime logs. This is useful in a test runner failure or cleanup hook.
* `update(optionsOrUpdater)` `Promise<void>`
  * Updates the server configuration with a `TestHarnessOptions` object or a function that receives the current options and returns the next options. If the server has not started yet, this configures the options used by `listen()`. If the server is running, this reloads the running Workers. Updating the number of Workers in a running server is not supported.
* `reset()` `Promise<void>`
  * Restores the server to the options used when the current session first started. Storage is recreated, and the server URL may change after reset.
* `close()` `Promise<void>`
  * Stops the server and releases all runtime resources.

`getWorker(name?)` returns a `WorkerHandle` object with these methods:

* `fetch(input, init)` `Promise<Response>`
  * Dispatches a fetch event directly to this Worker.
* `scheduled(options)` `Promise<{ outcome: "ok" | "canceled" | "exception"; noRetry: boolean }>`
  * Dispatches a scheduled event directly to this Worker.
* `getEnv()` `Promise<Env>`
  * Returns the full environment object configured for this Worker, including variables, secrets, and bindings.
* `getExport()` `Promise<Service<Module['default']>>`
  * Returns the default Worker export, including RPC methods.
* `applyD1Migrations(bindingName)` `Promise<void>`
  * Applies local D1 migration files that have not already run to a D1 binding on this Worker.
* `getDurableObjectStorage(classNameOrBindingName, options)` `Promise<DurableObjectStorageHandle>`
  * Returns SQL storage access for a Durable Object instance.
* `introspectWorkflow(bindingName)` `Promise<WorkflowIntrospector>`
  * Creates an introspector for Workflow instances created after this method is called.
* `introspectWorkflowInstance(bindingName, instanceId)` `Promise<WorkflowInstanceIntrospector>`
  * Creates an introspector for a specific Workflow instance.

### Usage

This example uses the Node.js built-in test runner:

```js
import assert from "node:assert/strict";
import { after, afterEach, before, describe, test } from "node:test";
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});

const apiWorker = server.getWorker("api-worker");

describe("Worker", () => {
	before(async () => {
		await server.listen();
	});

	afterEach(async () => {
		await server.reset();
	});

	after(async () => {
		await server.close();
	});

	test("dispatches through configured routes", async () => {
		const response = await server.fetch("http://example.com/users/123");
		assert.equal(response.status, 200);
	});

	test("calls a specific Worker directly", async () => {
		const response = await apiWorker.fetch(
			"http://api.example.com/v1/users/123",
		);
		assert.equal(response.status, 200);
	});

	test("triggers a scheduled handler", async () => {
		const result = await apiWorker.scheduled({
			cron: "0 0 * * *",
			scheduledTime: new Date(),
		});
		assert.equal(result.outcome, "ok");
	});
});
```

```ts
import assert from "node:assert/strict";
import { after, afterEach, before, describe, test } from "node:test";
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [
		{ configPath: "./wrangler.web.jsonc" },
		{ configPath: "./wrangler.api.jsonc" },
	],
});

const apiWorker = server.getWorker("api-worker");

describe("Worker", () => {
	before(async () => {
		await server.listen();
	});

	afterEach(async () => {
		await server.reset();
	});

	after(async () => {
		await server.close();
	});

	test("dispatches through configured routes", async () => {
		const response = await server.fetch("http://example.com/users/123");
		assert.equal(response.status, 200);
	});

	test("calls a specific Worker directly", async () => {
		const response = await apiWorker.fetch(
			"http://api.example.com/v1/users/123",
		);
		assert.equal(response.status, 200);
	});

	test("triggers a scheduled handler", async () => {
		const result = await apiWorker.scheduled({
			cron: "0 0 * * *",
			scheduledTime: new Date(),
		});
		assert.equal(result.outcome, "ok");
	});
});
```

## `experimental_generateTypes`

Generate TypeScript type definitions from your Worker configuration. This API uses the same core logic as the `wrangler types` CLI command, so outputs stay aligned between the CLI and programmatic API.

Unlike the CLI command, `experimental_generateTypes` does not write to disk automatically. Instead, it returns the generated type content as structured strings for you to handle as needed.

Note

The `experimental_generateTypes()` function has an `experimental_` prefix because the API is experimental and may change in the future.

### Syntax

```ts
import { experimental_generateTypes } from "wrangler";

const result = await experimental_generateTypes(options);
```

### Parameters

* `options` `object` optional

  * Optional options object mirroring the `wrangler types` CLI flags:

    * `config` `string | string[]`
      Path to the Wrangler configuration file to use. Can be an array for multi-config type resolution.
    * `env` `string`
      Name of the Wrangler environment to generate types for.
    * `envFile` `string[]`
      Paths to `.env` files to load when inferring local variables and secrets.
    * `envInterface` `string`
      Name of the generated environment interface. Defaults to `Env`.
    * `includeEnv` `boolean`
      Whether to include environment and bindings types in the output. Defaults to `true`.
    * `includeRuntime` `boolean`
      Whether to include runtime types in the output. Defaults to `true`.
    * `path` `string`
      Path to the declaration file for generated types. Defaults to `worker-configuration.d.ts`.
    * `strictVars` `boolean`
      Whether to generate strict literal and union types for variables. Defaults to `true`.

### Return Type

`experimental_generateTypes()` returns a `Promise` resolving to an object containing the following fields:

* `content` `string`

  * Combined formatted output containing all generated sections, including headers and both env and runtime types.
* `env` `string | null`

  * Generated environment and bindings types, or `null` when env types are excluded.
* `path` `string`

  * Target declaration file path associated with this generation run.
* `runtime` `string | null`

  * Generated runtime types, or `null` when runtime types are excluded.

### Usage

You can use `experimental_generateTypes` to generate types programmatically and write them to disk yourself, or pass them to other tools:

```ts
import { experimental_generateTypes } from "wrangler";
import * as fs from "node:fs";

const result = await experimental_generateTypes({
	config: "wrangler.json",
	includeRuntime: true,
	includeEnv: true,
});

// Write the combined content to the path specified in options
fs.writeFileSync(result.path, result.content, "utf-8");
```

To generate only env types without runtime types:

```ts
const result = await experimental_generateTypes({
	includeRuntime: false,
});
```

To generate types for a specific environment with a custom interface name:

```ts
const result = await experimental_generateTypes({
	env: "staging",
	envInterface: "StagingEnv",
	path: "./types/staging.d.ts",
});
```

## `unstable_startWorker`

Caution

`unstable_startWorker()` is deprecated. Cloudflare recommends [createTestHarness()](#createtestharness) for integration testing. To start a development server programmatically, use the Vite [createServer() ↗](https://vite.dev/guide/api-javascript.html#createserver) API with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

This API exposes the internals of Wrangler's dev server, and allows you to customise how it runs. For example, you could use `unstable_startWorker()` to run integration tests against your Worker. This example uses `node:test`, but should apply to any testing framework:

```js
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

## `unstable_dev`

Caution

`unstable_dev()` is deprecated. Cloudflare recommends [createTestHarness()](#createtestharness) for integration testing. To start a development server programmatically, use the Vite [createServer() ↗](https://vite.dev/guide/api-javascript.html#createserver) API with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

Start an HTTP server for testing your Worker.

Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

By default, `unstable_dev` will perform integration tests against a local server. If you wish to perform an e2e test against a preview Worker, pass `local: false` in the `options` object when calling the `unstable_dev()` function. Note that e2e tests can be significantly slower than integration tests.

### Constructor

```js
const worker = await unstable_dev(script, options);
```

### Parameters

* `script` `string`

  * A string containing a path to your Worker script, relative to your Worker project's root directory.
* `options` `object` optional

  * Optional options object containing `wrangler dev` configuration settings.
  * Include an `experimental` object inside `options` to access experimental features such as `disableExperimentalWarning`.
    * Set `disableExperimentalWarning` to `true` to disable Wrangler's warning about using `unstable_` prefixed APIs.

### Return Type

`unstable_dev()` returns an object containing the following methods:

* `fetch()` `Promise<Response>`

  * Send a request to your Worker. Returns a Promise that resolves with a [Response](https://developers.cloudflare.com/workers/runtime-apis/response) object.
  * Refer to [Fetch](https://developers.cloudflare.com/workers/runtime-apis/fetch/).
* `stop()` `Promise<void>`

  * Shuts down the dev server.

### Usage

When initiating each test suite, use a `beforeAll()` function to start `unstable_dev()`. The `beforeAll()` function is used to minimize overhead: starting the dev server takes a few hundred milliseconds, starting and stopping for each individual test adds up quickly, slowing your tests down.

In each test case, call `await worker.fetch()`, and check that the response is what you expect.

To wrap up a test suite, call `await worker.stop()` in an `afterAll` function.

#### Single Worker example

```js
const { unstable_dev } = require("wrangler");

describe("Worker", () => {
	let worker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.js", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});
});
```

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});
});
```

#### Multi-Worker example

You can test Workers that call other Workers. In the below example, we refer to the Worker that calls other Workers as the parent Worker, and the Worker being called as a child Worker.

If you shut down the child Worker prematurely, the parent Worker will not know the child Worker exists and your tests will fail.

```js
import { unstable_dev } from "wrangler";

describe("multi-worker testing", () => {
	let childWorker;
	let parentWorker;

	beforeAll(async () => {
		childWorker = await unstable_dev("src/child-worker.js", {
			config: "src/child-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
		parentWorker = await unstable_dev("src/parent-worker.js", {
			config: "src/parent-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await childWorker.stop();
		await parentWorker.stop();
	});

	it("childWorker should return Hello World itself", async () => {
		const resp = await childWorker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it("parentWorker should return Hello World by invoking the child worker", async () => {
		const resp = await parentWorker.fetch();
		const parsedResp = await resp.text();
		expect(parsedResp).toEqual("Parent worker sees: Hello World!");
	});
});
```

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("multi-worker testing", () => {
	let childWorker: UnstableDevWorker;
	let parentWorker: UnstableDevWorker;

	beforeAll(async () => {
		childWorker = await unstable_dev("src/child-worker.js", {
			config: "src/child-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
		parentWorker = await unstable_dev("src/parent-worker.js", {
			config: "src/parent-wrangler.toml",
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await childWorker.stop();
		await parentWorker.stop();
	});

	it("childWorker should return Hello World itself", async () => {
		const resp = await childWorker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it("parentWorker should return Hello World by invoking the child worker", async () => {
		const resp = await parentWorker.fetch();
		const parsedResp = await resp.text();
		expect(parsedResp).toEqual("Parent worker sees: Hello World!");
	});
});
```

## `getPlatformProxy`

The `getPlatformProxy` function provides a way to obtain an object containing proxies (to **local** `workerd` bindings) and emulations of Cloudflare Workers specific values, allowing the emulation of such in a Node.js process.

Caution

`getPlatformProxy` is, by design, to be used exclusively in Node.js applications. `getPlatformProxy` cannot be run inside the Workers runtime.

One general use case for getting a platform proxy is for emulating bindings in applications targeting Workers, but running outside the Workers runtime (for example, framework local development servers running in Node.js), or for testing purposes (for example, ensuring code properly interacts with a type of binding).

Note

Binding proxies provided by this function are a best effort emulation of the real production bindings. Although they are designed to be as close as possible to the real thing, there might be slight differences and inconsistencies between the two.

### Syntax

```js
const platform = await getPlatformProxy(options);
```

### Parameters

* `options` `object` optional
  * Optional options object containing preferences for the bindings:
    * `environment` string
      The environment to use.
    * `configPath` string
      The path to the config file to use.
      If no path is specified, the default behavior is to search from the current directory up the filesystem for a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to use.

**Note:** this field is optional but if a path is specified it must point to a valid file on the filesystem.
    * `persist` boolean | `{ path: string }`
      Indicates if and where to persist the bindings data. If `true` or `undefined`, defaults to the same location used by Wrangler, so data can be shared between it and the caller. If `false`, no data is persisted to or read from the filesystem.

**Note:** If you use `wrangler`'s `--persist-to` option, note that this option adds a subdirectory called `v3` under the hood while `getPlatformProxy`'s `persist` does not. For example, if you run `wrangler dev --persist-to ./my-directory`, to reuse the same location using `getPlatformProxy`, you will have to specify: `persist: { path: "./my-directory/v3" }`.
    * `remoteBindings` boolean optional (default: \`true\`)
      Whether or not [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings) should be enabled.

### Return Type

`getPlatformProxy()` returns a `Promise` resolving to an object containing the following fields.

* `env` `Record<string, unknown>`

  * Object containing proxies to bindings that can be used in the same way as production bindings. This matches the shape of the `env` object passed as the second argument to modules-format workers. These proxy to binding implementations run inside `workerd`.
  * TypeScript Tip: `getPlatformProxy<Env>()` is a generic function. You can pass the shape of the bindings record as a type argument to get proper types without `unknown` values.
* `cf` IncomingRequestCfProperties read-only

  * Mock of the `Request`'s `cf` property, containing data similar to what you would see in production.
* `ctx` object

  * Mock object containing implementations of the [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) and [passThroughOnException](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception) functions that do nothing.
* `caches` object

  * Emulation of the [Workers caches runtime API](https://developers.cloudflare.com/workers/runtime-apis/cache/).
  * For the time being, all cache operations do nothing. A more accurate emulation will be made available soon.
* `dispose()` () => `Promise<void>`

  * Terminates the underlying `workerd` process.
  * Call this after the platform proxy is no longer required by the program. If you are running a long running process (such as a dev server) that can indefinitely make use of the proxy, you do not need to call this function.

### Usage

The `getPlatformProxy` function uses bindings found in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). For example, if you have an [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) configuration set up in the Wrangler configuration file:

```jsonc
{
	"vars": {
		"MY_VARIABLE": "test"
	}
}
```

```toml
[vars]
MY_VARIABLE = "test"
```

You can access the bindings by importing `getPlatformProxy` like this:

```js
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();
```

To access the value of the `MY_VARIABLE` binding add the following to your code:

```js
console.log(`MY_VARIABLE = ${env.MY_VARIABLE}`);
```

This will print the following output: `MY_VARIABLE = test`.

### Supported bindings

All supported bindings found in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) are available to you via `env`.

The bindings supported by `getPlatformProxy` are:

* [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/)
* [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/)
* [KV namespace bindings](https://developers.cloudflare.com/kv/api/)
* [R2 bucket bindings](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
* [Queue bindings](https://developers.cloudflare.com/queues/configuration/javascript-apis/)
* [D1 database bindings](https://developers.cloudflare.com/d1/worker-api/)
* [Hyperdrive bindings](https://developers.cloudflare.com/hyperdrive)
Hyperdrive values are simple passthrough ones
Values provided by hyperdrive bindings such as `connectionString` and `host` do not have a valid meaning outside of a `workerd` process. This means that Hyperdrive proxies return passthrough values, which are values corresponding to the database connection provided by the user. Otherwise, it would return values which would be unusable from within node.js.
* [Workers AI bindings](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai)
Workers AI local development usage charges
Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.
* [Durable Object bindings](https://developers.cloudflare.com/durable-objects/api/)

  * To use a Durable Object binding with `getPlatformProxy`, always specify a [script\_name](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects).
  For example, you might have the following binding in a Wrangler configuration file read by `getPlatformProxy`.
  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "MyDurableObject",
          "class_name": "MyDurableObject",
          "script_name": "external-do-worker"
        }
      ]
    }
  }
  ```
  ```toml
  [[durable_objects.bindings]]
  name = "MyDurableObject"
  class_name = "MyDurableObject"
  script_name = "external-do-worker"
  ```
  You will need to declare your Durable Object `"MyDurableObject"` in another Worker, called `external-do-worker` in this example.
  ```ts
  export class MyDurableObject extends DurableObject {
  	// Your DO code goes here
  }
  export default {
  	fetch() {
  		// Doesn't have to do anything, but a DO cannot be the default export
  		return new Response("Hello, world!");
  	},
  };
  ```
  That Worker also needs a Wrangler configuration file that looks like this:
  ```jsonc
  {
  	"name": "external-do-worker",
  	"main": "src/index.ts",
  	"compatibility_date": "XXXX-XX-XX"
  }
  ```
  ```toml
  name = "external-do-worker"
  main = "src/index.ts"
  compatibility_date = "XXXX-XX-XX"
  ```
  If you are not using RPC with your Durable Object, you can run a separate Wrangler dev session alongside your framework development server.
  Otherwise, you can build your application and run both Workers in the same Wrangler dev session.
  If you are using Pages run:
  npmyarnpnpm
  ```
  npx wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```
  ```
  yarn wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```
  ```
  pnpm wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```
  If you are using Workers with Assets run:
  npmyarnpnpm
  ```
  npx wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```
  ```
  yarn wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```
  ```
  pnpm wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc
  ```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/api/#page","headline":"API · Cloudflare Workers docs","description":"A set of programmatic APIs that can be integrated with local Cloudflare Workers-related workflows.","url":"https://developers.cloudflare.com/workers/wrangler/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
