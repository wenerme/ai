---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Bind different Workers KV namespaces to the same Worker across staging and production environments.
title: Environments
image: https://developers.cloudflare.com/kv/reference/environments/og.png?v=414cfc55b31e25fc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Environments

In [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/), environments are modeled as [modes](https://developers.cloudflare.com/cf/projects/cloudflare-config/#evaluate-configuration). This is useful when your Worker code refers to a single KV binding like `MY_KV`, and you want that binding to point to different KV namespaces for staging and production.

Store your staging and production namespace IDs in a separate module (for example, `kv-namespaces.ts`):

*kv-namespaces.tsts*

```ts
export const prodNamespaceId = "<PROD_NAMESPACE_ID>";
export const stagingNamespaceId = "<STAGING_NAMESPACE_ID>";
```

Then pass a function to `defineConfig(({ mode }) => ...)` and return a complete configuration for each mode, binding `MY_KV` to the namespace ID for that mode:

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };
import { prodNamespaceId, stagingNamespaceId } from "./kv-namespaces.ts";

export default defineConfig(({ mode }) => {
	const isProduction = mode === "production";

	return {
		worker: {
			name: isProduction ? "my-worker" : "my-worker-staging",
			entrypoint,
			compatibilityDate: "<COMPATIBILITY_DATE>",
			env: {
				MY_KV: bindings.kv({
					id: isProduction ? prodNamespaceId : stagingNamespaceId,
				}),
			},
		},
	};
});
```

Using the same binding name for two different KV namespaces keeps your Worker code readable.

Run `cf dev --mode staging` or `cf deploy --mode staging` so `env.MY_KV.get("KEY")` reads from `stagingNamespaceId`. Run `cf deploy --mode production` so `env.MY_KV.get("KEY")` reads from `prodNamespaceId`.

To read or write keys from the terminal with `cf kv keys`, pass `--namespace-id` directly. Because each namespace ID is unique, `--namespace-id` targets the exact staging or production namespace without a `--mode` or `--binding` lookup:

```sh
cf kv keys put "<KEY>" --namespace-id <STAGING_NAMESPACE_ID> --body "<VALUE>"
```

`cf kv keys` commands act on your remote KV namespace by default. Pass `--local` to target local development state instead.

You can also vary routes and Worker settings per mode in `cloudflare.config.ts`:

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig, triggers } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };
import { prodNamespaceId, stagingNamespaceId } from "./kv-namespaces.ts";

export default defineConfig(({ mode }) => {
	const isProduction = mode === "production";

	return {
		accountId: "<ACCOUNT_ID>",
		worker: {
			name: isProduction ? "my-worker" : "my-worker-staging",
			entrypoint,
			compatibilityDate: "<COMPATIBILITY_DATE>",
			workersDev: false,
			triggers: [
				triggers.fetch({
					pattern: isProduction
						? "example.com/*"
						: "staging.example.com/*",
					zone: "example.com",
				}),
			],
			env: {
				MY_KV: bindings.kv({
					id: isProduction ? prodNamespaceId : stagingNamespaceId,
				}),
			},
		},
	};
});
```

To read a value from the production KV namespace from the terminal:

```sh
cf kv keys get "<KEY>" --namespace-id <PROD_NAMESPACE_ID> --text
```

To supply a separate KV namespace for [Worker Previews](https://developers.cloudflare.com/cf/projects/#deploy-a-preview), inspect `isPreview` alongside `mode` in `defineConfig(({ mode, isPreview }) => ...)`.

KV namespaces can be bound to different namespaces per [Wrangler environment](https://developers.cloudflare.com/workers/wrangler/environments/). This is useful when you have code in your Worker that refers to a KV binding like `MY_KV`, and you want that binding to point to different KV namespaces (for example, one for staging and one for production).

The following example in your Wrangler configuration file shows how to configure two environments with two different KV namespaces that share the same binding name:

```jsonc
{
	"env": {
		"staging": {
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "e29b263ab50e42ce9b637fa8370175e8"
				}
			]
		},
		"production": {
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "a825455ce00f4f7282403da85269f8ea"
				}
			]
		}
	}
}
```

```toml
[[env.staging.kv_namespaces]]
binding = "MY_KV"
id = "e29b263ab50e42ce9b637fa8370175e8"

[[env.production.kv_namespaces]]
binding = "MY_KV"
id = "a825455ce00f4f7282403da85269f8ea"
```

Using the same binding name for two different KV namespaces keeps your Worker code readable.

In the `staging` environment, `env.MY_KV.get("KEY")` reads from namespace ID `e29b263ab50e42ce9b637fa8370175e8`. In the `production` environment, `env.MY_KV.get("KEY")` reads from namespace ID `a825455ce00f4f7282403da85269f8ea`.

To insert a value into a `staging` KV namespace, run:

npmyarnpnpm

```
npx wrangler kv key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
```

```
yarn wrangler kv key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
```

```
pnpm wrangler kv key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
```

Since `--namespace-id` is always unique (unlike binding names), you do not need to specify an `--env` argument:

npmyarnpnpm

```
npx wrangler kv key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"
```

```
yarn wrangler kv key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"
```

```
pnpm wrangler kv key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"
```

Caution

Since version 3.60.0, Wrangler KV commands support the `kv ...` syntax. If you are using versions of Wrangler below 3.60.0, the command follows the `kv:...` syntax. For more information on the `kv:...` syntax deprecation, refer to [KV CLI commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations).

Most `wrangler kv` subcommands allow you to specify an environment with the optional `--env` flag.

Specifying an environment with the optional `--env` flag lets you deploy Workers running the same code with different KV namespaces.

For example, you can use separate staging and production KV namespaces in your Wrangler configuration file:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"account_id": "<account id here>",
	"route": "staging.example.com/*",
	"workers_dev": false,
	"kv_namespaces": [
		{
			"binding": "MY_KV",
			"id": "06779da6940b431db6e566b4846d64db"
		}
	],
	"env": {
		"production": {
			"route": "example.com/*",
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "07bc1f3d1f2a4fd8a45a7e026e2681c6"
				}
			]
		}
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
account_id = "<account id here>"
route = "staging.example.com/*"
workers_dev = false

[[kv_namespaces]]
binding = "MY_KV"
id = "06779da6940b431db6e566b4846d64db"

[env.production]
route = "example.com/*"

  [[env.production.kv_namespaces]]
  binding = "MY_KV"
  id = "07bc1f3d1f2a4fd8a45a7e026e2681c6"
```

With this configuration, you can specify `--env production` when you want to perform a KV action on the KV namespace `MY_KV` under `env.production`.

For example, you can get a value from the production KV instance with:

npmyarnpnpm

```
npx wrangler kv key get --binding "MY_KV" --env=production "<KEY>"
```

```
yarn wrangler kv key get --binding "MY_KV" --env=production "<KEY>"
```

```
pnpm wrangler kv key get --binding "MY_KV" --env=production "<KEY>"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/environments/#page","headline":"Environments","description":"Bind different Workers KV namespaces to the same Worker across staging and production environments.","url":"https://developers.cloudflare.com/kv/reference/environments/","inLanguage":"en","image":"https://developers.cloudflare.com/kv/reference/environments/og.png?v=414cfc55b31e25fc","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
