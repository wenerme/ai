---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: A KV namespace is a key-value database replicated across Cloudflare's global network.
title: KV namespaces
image: https://developers.cloudflare.com/kv/concepts/kv-namespaces/og.png?v=0441733e87a547ed
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# KV namespaces

A KV namespace is a key-value database replicated to Cloudflare’s global network.

Bind your KV namespaces in your Worker configuration file or via the Cloudflare dashboard.

Note

KV namespace IDs are public and bound to your account.

## Jurisdictions

Namespaces can optionally be restricted to a jurisdiction to durably store data only within a specific region. Refer to [Data location](https://developers.cloudflare.com/kv/reference/data-location/) for more information.

## Bind your KV namespace in configuration

The following content appears twice: first for the Cloudflare CLI (`cf`), then for Wrangler. Use `cf` for new projects. In an existing project, use the CLI that the project already uses.

Cloudflare CLI

To bind KV namespaces to your Worker in [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/), add a property to `worker.env` using `bindings.kv()`. The property key is the binding name used to refer to the KV namespace in your Worker:

- `id` `string` required
  - The ID of the KV namespace.
- `dev` `object` optional
  - Local development options. Set `dev: { remote: true }` to connect to the remote KV namespace during `cf dev`.

`cloudflare.config.ts` does not have a `preview_id` field. During `cf dev`, bindings use local storage by default unless you set `dev: { remote: true }`. To use a different namespace `id` for [Worker Previews](https://developers.cloudflare.com/cf/projects/#deploy-a-preview) or modes, pass a function to `defineConfig(({ mode, isPreview }) => ...)`.

Example:

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "my-worker",
		entrypoint,
		compatibilityDate: "<COMPATIBILITY_DATE>",
		env: {
			TEST_NAMESPACE: bindings.kv({ id: "<TEST_ID>" }),
		},
	},
});
```

Wrangler

To bind KV namespaces to your Worker in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), assign an array of objects with the following properties to the `kv_namespaces` key:

- `binding` `string` required
  - The binding name used to refer to the KV namespace.
- `id` `string` required
  - The ID of the KV namespace.
- `preview_id` `string` optional
  - The ID of the KV namespace used during `wrangler dev`.

Example:

```jsonc
{
	"kv_namespaces": [
		{
			"binding": "<TEST_NAMESPACE>",
			"id": "<TEST_ID>"
		}
	]
}
```

```toml
[[kv_namespaces]]
binding = "<TEST_NAMESPACE>"
id = "<TEST_ID>"
```

## Bind your KV namespace via the dashboard

To bind the namespace to your Worker in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your **Worker**.
3. Select **Settings** > **Bindings**.
4. Select **Add**.
5. Select **KV Namespace**.
6. Enter your desired variable name (the name of the binding).
7. Select the KV namespace you wish to bind the Worker to.
8. Select **Deploy**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/#page","headline":"KV namespaces","description":"A KV namespace is a key-value database replicated across Cloudflare's global network.","url":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/","inLanguage":"en","image":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/og.png?v=0441733e87a547ed","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
