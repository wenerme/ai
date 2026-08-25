---
description: Vitest configuration specific to the Workers integration.
title: Configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Workers Vitest integration provides additional configuration on top of Vitest's usual options using the `cloudflareTest()` Vite plugin.

An example configuration would be:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: {
				configPath: "./wrangler.jsonc",
			},
		}),
	],
});
```

Caution

Custom Vitest `environment`s or `runner`s are not supported when using the Workers Vitest integration.

## APIs

The following APIs are exported from the `@cloudflare/vitest-plugin` package.

### `cloudflareTest(options)`

A Vite plugin that configures Vitest to use the Workers integration with the correct module resolution settings, and provides type checking for [CloudflareTestOptions](#cloudflaretestoptions). Add this to the `plugins` array in your Vitest config alongside [defineConfig() ↗](https://vitest.dev/config/file.html) from Vitest.

It also accepts an optionally-`async` function returning `options`.

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			// Refer to CloudflareTestOptions...
		}),
	],
});
```

### `buildPagesASSETSBinding(assetsPath)`

Exported from `@cloudflare/vitest-plugin/config`. Creates a Pages ASSETS binding that serves files inside the `assetsPath`. This is required if you use `createPagesEventContext()` to test your **Pages Functions**. Refer to the [Pages recipe](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes) for a full example.

```ts
import path from "node:path";
import { buildPagesASSETSBinding, cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(async () => {
			const assetsPath = path.join(__dirname, "public");

			return {
				miniflare: {
					serviceBindings: {
						ASSETS: await buildPagesASSETSBinding(assetsPath),
					},
				},
			};
		}),
	],
});
```

### `readD1Migrations(migrationsPath)`

Exported from `@cloudflare/vitest-plugin/config`. Reads all [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/) stored at `migrationsPath` and returns them ordered by migration number. Each migration will have its contents split into an array of individual SQL queries. Call the [applyD1Migrations()](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/#d1) function inside a test or [setup file ↗](https://vitest.dev/config/#setupfiles) to apply migrations. Refer to the [D1 recipe ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1) for an example project using migrations.

```ts
import path from "node:path";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(async () => {
			const migrationsPath = path.join(__dirname, "migrations");
			const migrations = await readD1Migrations(migrationsPath);

			return {
				miniflare: {
					// Add a test-only binding for migrations, so we can apply them in a setup file
					bindings: { TEST_MIGRATIONS: migrations },
				},
			};
		}),
	],
	test: {
		setupFiles: ["./test/apply-migrations.ts"],
	},
});
```

## `CloudflareTestOptions`

Options passed directly to `cloudflareTest()`.

* `main`: string optional

  * Entry point to Worker run in the same isolate/context as tests. This option is required to use Durable Objects without an explicit `scriptName` if classes are defined in the same Worker. This file goes through Vite transforms and can be TypeScript. Note that `import module from "<path-to-main>"` inside tests gives exactly the same `module` instance as is used internally for `exports` and Durable Object bindings. If `wrangler.configPath` is defined and this option is not, it will be read from the `main` field in that configuration file.
* `miniflare`: `SourcelessWorkerOptions & { workers?: WorkerOptions\[]; }` optional

  * Use this to provide configuration information that is typically stored within the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), such as [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), [compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/), and [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/). The `WorkerOptions` interface is defined [here ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions). Use the `main` option above to configure the entry point, instead of the Miniflare `script`, `scriptPath`, or `modules` options.

    * If no `compatibility_date` is provided, then the test will use the latest locally available date.
  * If your project makes use of multiple Workers, you can configure auxiliary Workers that run in the same `workerd` process as your tests and can be bound to. Auxiliary Workers are configured using the `workers` array, containing regular Miniflare [WorkerOptions ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) objects. Note that unlike the `main` Worker, auxiliary Workers:

    * Cannot have TypeScript entrypoints. You must compile auxiliary Workers to JavaScript first. You can use the [wrangler deploy --dry-run --outdir dist](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) command for this.
    * Use regular Workers module resolution semantics. Refer to the [Isolation and concurrency](https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/#modules) page for more information.
    * Cannot access the [cloudflare:test](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/) module.
    * Do not require specific compatibility dates or flags.
    * Can be written with the [Service Worker syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#service-worker-syntax).
    * Are not affected by global mocks defined in your tests.
* `wrangler`: `{ configPath?: string; environment?: string; }` optional

  * Path to [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to load `main`, [compatibility settings](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) and [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) from. These options will be merged with the `miniflare` option above, with `miniflare` values taking precedence. For example, if your Wrangler configuration defined a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) named `SERVICE` to a Worker named `service`, but you included `serviceBindings: { SERVICE(request) { return new Response("body"); } }` in the `miniflare` option, all requests to `SERVICE` in tests would return `body`. Note `configPath` accepts both `.toml` and `.json` files.
  * The environment option can be used to specify the [Wrangler environment](https://developers.cloudflare.com/workers/wrangler/environments/) to pick up bindings and variables from.

## Dynamic configuration with `inject`

You can pass an `async` function to `cloudflareTest()` that receives an `inject` function. This allows you to define `miniflare` configuration based on injected values from [globalSetup ↗](https://vitest.dev/config/#globalsetup) scripts. Use this if you have a value in your configuration that is dynamically generated and only known at runtime of your tests. For example, a global setup script might start an upstream server on a random port. This port could be `provide()`d and then `inject()`ed in the configuration for an external service binding or [Hyperdrive](https://developers.cloudflare.com/hyperdrive/). Refer to the [Hyperdrive recipe ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/hyperdrive) for an example project using this provide/inject approach.

Illustrative example

```ts
// env.d.ts
declare module "vitest" {
	interface ProvidedContext {
		port: number;
	}
}

// global-setup.ts
import type { GlobalSetupContext } from "vitest/node";
export default function ({ provide }: GlobalSetupContext) {
	// Runs inside Node.js, could start server here...
	provide("port", 1337);
	return () => {
		/* ...then teardown here */
	};
}

// vitest.config.ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest(({ inject }) => ({
			miniflare: {
				hyperdrives: {
					DATABASE: `postgres://user:pass@example.com:${inject("port")}/db`,
				},
			},
		})),
	],
	test: {
		globalSetup: ["./global-setup.ts"],
	},
});
```

## `SourcelessWorkerOptions`

Sourceless `WorkerOptions` type without `script`, `scriptPath`, or `modules` properties. Refer to the Miniflare [WorkerOptions ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) type for more details.

```ts
type SourcelessWorkerOptions = Omit<
	WorkerOptions,
	"script" | "scriptPath" | "modules" | "modulesRoot"
>;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/#page","headline":"Configuration · Cloudflare Workers docs","description":"Vitest configuration specific to the Workers integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
