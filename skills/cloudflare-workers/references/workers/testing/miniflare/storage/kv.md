---
description: Specify KV namespaces to add to your environment as follows:
title: KV
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# KV

Last updated Jan 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [KV Reference](https://developers.cloudflare.com/kv/api/)

## Namespaces

Specify KV namespaces to add to your environment as follows:

```js
const mf = new Miniflare({
	kvNamespaces: ["TEST_NAMESPACE1", "TEST_NAMESPACE2"],
});
```

You can now access KV namespaces in your workers:

```js
export default {
	async fetch(request, env) {
		return new Response(await env.TEST_NAMESPACE1.get("key"));
	},
};
```

Miniflare supports all KV operations and data types.

## Manipulating Outside Workers

For testing, it can be useful to put/get data from KV outside a worker. You can do this with the `getKVNamespace` method:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      const value = parseInt(await env.TEST_NAMESPACE.get("count")) + 1;
      await env.TEST_NAMESPACE.put("count", value.toString());
      return new Response(value.toString());
    },
  }
  `,
	kvNamespaces: ["TEST_NAMESPACE"],
});

const ns = await mf.getKVNamespace("TEST_NAMESPACE");
await ns.put("count", "1");

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // 2
console.log(await ns.get("count")); // 2
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/#page","headline":"KV · Cloudflare Workers docs","description":"Specify KV namespaces to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
