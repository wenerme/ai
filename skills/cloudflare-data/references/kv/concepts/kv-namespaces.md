---
description: A KV namespace is a key-value database replicated across Cloudflare's global network.
title: KV namespaces
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# KV namespaces

Last updated Jul 31, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/kv/concepts/kv-namespaces/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A KV namespace is a key-value database replicated to Cloudflare’s global network.

Bind your KV namespaces through Wrangler or via the Cloudflare dashboard.

Note

KV namespace IDs are public and bound to your account.

## Jurisdictions

Namespaces can optionally be restricted to a jurisdiction to durably store data only within a specific region. This feature is currently in private beta. Refer to [Data location](https://developers.cloudflare.com/kv/reference/data-location/) for more information.

## Bind your KV namespace through Wrangler

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

* `binding` `string`required

  * The binding name used to refer to the KV namespace.
* `id` `string`required

  * The ID of the KV namespace.
* `preview_id` `string`optional

  * The ID of the KV namespace used during `wrangler dev`.

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

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your **Worker**.
3. Select **Settings** \> **Bindings**.
4. Select **Add**.
5. Select **KV Namespace**.
6. Enter your desired variable name (the name of the binding).
7. Select the KV namespace you wish to bind the Worker to.
8. Select **Deploy**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/#page","headline":"KV namespaces · Cloudflare Workers KV docs","description":"A KV namespace is a key-value database replicated across Cloudflare's global network.","url":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-31","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
