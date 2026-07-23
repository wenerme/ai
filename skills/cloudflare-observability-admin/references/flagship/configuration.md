---
description: Add and configure a Flagship binding in your Wrangler configuration file to evaluate feature flags in a Worker.
title: Configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To use Flagship in a Cloudflare Worker, add a Flagship binding to your Wrangler configuration file. The binding gives your Worker access to `env.FLAGS`, which provides methods to evaluate feature flags.

## Add the binding

Add the `flagship` block to your Wrangler configuration file with a binding name and your app ID.

```jsonc
{
	"flagship": [
		{
			"binding": "FLAGS",
			"app_id": "<APP_ID>",
		},
	],
}
```

```toml
[[flagship]]
binding = "FLAGS"
app_id = "<APP_ID>"
```

Replace `<APP_ID>` with the app ID from your Flagship app. If you have not created an app yet, refer to the [Get started guide](https://developers.cloudflare.com/flagship/get-started/#create-an-app-and-a-flag). The `binding` field sets the name you use to access Flagship in your Worker code (for example, `env.FLAGS`).

## Bind to multiple apps

A single Worker can bind to multiple Flagship apps. Use the array form to define more than one binding:

```jsonc
{
	"flagship": [
		{
			"binding": "FLAGS",
			"app_id": "<APP_ID_1>",
		},
		{
			"binding": "EXPERIMENT_FLAGS",
			"app_id": "<APP_ID_2>",
		},
	],
}
```

```toml
[[flagship]]
binding = "FLAGS"
app_id = "<APP_ID_1>"

[[flagship]]
binding = "EXPERIMENT_FLAGS"
app_id = "<APP_ID_2>"
```

Each binding is available as a separate property on the `env` object (for example, `env.FLAGS` and `env.EXPERIMENT_FLAGS`).

## Generate types

After adding the binding, run `npx wrangler types` to generate TypeScript types. This creates the `Env` interface with each binding typed as `Flagship`.

```ts
interface Env {
	FLAGS: Flagship;
	EXPERIMENT_FLAGS: Flagship;
}
```

## Use the binding

Call evaluation methods on `env.FLAGS` to resolve flag values at runtime. Each method accepts a flag key, a default value, and an optional evaluation context.

```js
export default {
	async fetch(request, env) {
		const isEnabled = await env.FLAGS.getBooleanValue("my-feature", false, {
			userId: "user-42",
		});

		return new Response(isEnabled ? "Feature is on" : "Feature is off");
	},
};
```

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const isEnabled = await env.FLAGS.getBooleanValue("my-feature", false, {
			userId: "user-42",
		});

		return new Response(isEnabled ? "Feature is on" : "Feature is off");
	},
};
```

Refer to the [binding API reference](https://developers.cloudflare.com/flagship/binding/) for the full list of methods.

## Local development

Flagship bindings work with `wrangler dev`. Local Workers use the live Flagship app configured by `app_id`. There is no local flag store. Make sure your local Wrangler configuration points to a valid Flagship app before testing evaluations.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/configuration/#page","headline":"Configuration · Cloudflare Flagship docs","description":"Add and configure a Flagship binding in your Wrangler configuration file to evaluate feature flags in a Worker.","url":"https://developers.cloudflare.com/flagship/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
