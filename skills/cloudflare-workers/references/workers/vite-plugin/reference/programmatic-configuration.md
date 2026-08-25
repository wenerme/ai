---
description: Configure Workers programmatically using the Vite plugin
title: Programmatic configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Programmatic configuration

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Wrangler configuration file is optional when using the Cloudflare Vite plugin. Without one, the plugin uses default values. You can customize Worker configuration programmatically with the `config` option. This is useful when the Cloudflare plugin runs inside another plugin or framework.

Note

Programmatic configuration is primarily designed for use by frameworks and plugin developers. Users should normally use Wrangler config files instead. Configuration set via the `config` option will not be included when running `wrangler types` or resource based Wrangler CLI commands such as `wrangler kv` or `wrangler d1`.

## Default configuration

Without a configuration file, the plugin generates sensible defaults for an assets-only Worker. The `name` comes from `package.json` or the project directory name. The `compatibility_date` uses the latest date supported by your installed Miniflare version.

## The `config` option

The `config` option offers three ways to programmatically configure your Worker. You can set any property from the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), though some options are [ignored or replaced by Vite equivalents](https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/#redundant-fields-in-the-wrangler-config-file).

Note

You cannot define [Cloudflare environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/) via `config`, as they are resolved before this option is applied.

### Configuration object

Set `config` to an object to provide values that merge with defaults and Wrangler config file settings:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: {
				compatibility_date: "2025-01-01",
				vars: {
					API_URL: "https://api.example.com",
				},
			},
		}),
	],
});
```

These values merge with Wrangler config file values, with the `config` values taking precedence.

### Dynamic configuration function

Use a function when configuration depends on existing config values or external data, or if you need to compute or conditionally set values:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: (userConfig) => ({
				vars: {
					WORKER_NAME: userConfig.name,
					BUILD_TIME: new Date().toISOString(),
				},
			}),
		}),
	],
});
```

The function receives the current configuration (defaults or loaded config file). Return an object with values to merge.

### In-place editing

A `config` function can mutate the config object directly instead of returning overrides. This is useful for deleting properties or removing array items:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: (userConfig) => {
				// Replace all existing compatibility flags
				userConfig.compatibility_flags = ["nodejs_compat"];
			},
		}),
	],
});
```

Note

When editing in place, do not return a value from the function.

## Auxiliary Workers

Auxiliary Workers also support the `config` option, enabling multi-Worker architectures without config files.

Define auxiliary Workers without config files using `config` inside the `auxiliaryWorkers` array:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: {
				name: "entry-worker",
				main: "./src/entry.ts",
				compatibility_date: "2025-01-01",
				services: [{ binding: "API", service: "api-worker" }],
			},
			auxiliaryWorkers: [
				{
					config: {
						name: "api-worker",
						main: "./src/api.ts",
						compatibility_date: "2025-01-01",
					},
				},
			],
		}),
	],
});
```

### Configuration overrides

Combine a config file with `config` to override specific values:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			configPath: "./wrangler.jsonc",
			auxiliaryWorkers: [
				{
					configPath: "./workers/api/wrangler.jsonc",
					config: {
						vars: {
							ENDPOINT: "https://api.example.com/v2",
						},
					},
				},
			],
		}),
	],
});
```

### Configuration inheritance

Auxiliary Workers receive the resolved entry Worker config in the second parameter to the `config` function. This makes it straightforward to inherit configuration from the entry Worker in auxiliary Workers.

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			auxiliaryWorkers: [
				{
					config: (_, { entryWorkerConfig }) => ({
						name: "auxiliary-worker",
						main: "./src/auxiliary-worker.ts",
						// Inherit compatibility settings from entry Worker
						compatibility_date: entryWorkerConfig.compatibility_date,
						compatibility_flags: entryWorkerConfig.compatibility_flags,
					}),
				},
			],
		}),
	],
});
```

## Configuration merging behavior

The `config` option uses [defu ↗](https://github.com/unjs/defu) for merging configuration objects.

* Object properties are recursively merged
* Arrays are concatenated (`config` values first, then existing values)
* Primitive values from `config` override existing values
* `undefined` values in `config` do not override existing values

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/#page","headline":"Programmatic configuration · Cloudflare Workers docs","description":"Configure Workers programmatically using the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
