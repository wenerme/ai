---
description: Specify Durable Objects to add to your environment as follows:
title: Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable Objects

Last updated Jan 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [Durable Objects Reference](https://developers.cloudflare.com/durable-objects/api/)
* [Using Durable Objects](https://developers.cloudflare.com/durable-objects/)

## Objects

Specify Durable Objects to add to your environment as follows:

```js
const mf = new Miniflare({
	modules: true,
	script: `
  export class Object1 {
    async fetch(request) {
      ...
    }
  }
  export default {
    fetch(request) {
      ...
    }
  }
  `,
	durableObjects: {
		// Note Object1 is exported from main (string) script
		OBJECT1: "Object1",
	},
});
```

## Persistence

By default, Durable Object data is stored in memory. It will persist between reloads, but not different `Miniflare` instances. To enable persistence to the file system, specify the Durable Object persistence option:

```js
const mf = new Miniflare({
	durableObjectsPersist: true, // Defaults to ./.mf/do
	durableObjectsPersist: "./data", // Custom path
});
```

## Manipulating Outside Workers

For testing, it can be useful to make requests to your Durable Objects from outside a worker. You can do this with the `getDurableObjectNamespace` method.

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	durableObjects: { TEST_OBJECT: "TestObject" },
	script: `
  export class TestObject {
    constructor(state) {
      this.storage = state.storage;
    }

    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/put") await this.storage.put("key", 1);
      return new Response((await this.storage.get("key")).toString());
    }
  }

  export default {
    async fetch(request, env) {
      const stub = env.TEST_OBJECT.getByName("test");
      return stub.fetch(request);
    }
  }
  `,
});

const ns = await mf.getDurableObjectNamespace("TEST_OBJECT");
const stub = ns.getByName("test");
const doRes = await stub.fetch("http://localhost:8787/put");
console.log(await doRes.text()); // "1"

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // "1"
```

## Using a Class Exported by Another Script

Miniflare supports the `script_name` option for accessing Durable Objects exported by other scripts. This requires mounting the other worker as described in [🔌 Multiple Workers](https://developers.cloudflare.com/workers/testing/miniflare/core/multiple-workers).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/#page","headline":"Durable Objects · Cloudflare Workers docs","description":"Specify Durable Objects to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
