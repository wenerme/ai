---
description: Use the Node.js streams API in Cloudflare Workers for readable, writable, and transform stream operations.
title: Streams
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Streams

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [Node.js streams API ↗](https://nodejs.org/api/stream.html) is the original API for working with streaming data in JavaScript, predating the [WHATWG ReadableStream standard ↗](https://streams.spec.whatwg.org/). A stream is an abstract interface for working with streaming data in Node.js. Streams can be readable, writable, or both. All streams are instances of [EventEmitter](https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/).

Where possible, you should use the [WHATWG standard "Web Streams" API ↗](https://streams.spec.whatwg.org/), which is [supported in Workers ↗](https://streams.spec.whatwg.org/).

```js
import { Readable, Transform } from "node:stream";

import { text } from "node:stream/consumers";

import { pipeline } from "node:stream/promises";

// A Node.js-style Transform that converts data to uppercase
// and appends a newline to the end of the output.
class MyTransform extends Transform {
	constructor() {
		super({ encoding: "utf8" });
	}
	_transform(chunk, _, cb) {
		this.push(chunk.toString().toUpperCase());
		cb();
	}
	_flush(cb) {
		this.push("\n");
		cb();
	}
}

export default {
	async fetch() {
		const chunks = [
			"hello ",
			"from ",
			"the ",
			"wonderful ",
			"world ",
			"of ",
			"node.js ",
			"streams!",
		];

		function nextChunk(readable) {
			readable.push(chunks.shift());
			if (chunks.length === 0) readable.push(null);
			else queueMicrotask(() => nextChunk(readable));
		}

		// A Node.js-style Readable that emits chunks from the
		// array...
		const readable = new Readable({
			encoding: "utf8",
			read() {
				nextChunk(readable);
			},
		});

		const transform = new MyTransform();
		await pipeline(readable, transform);
		return new Response(await text(transform));
	},
};
```

Refer to the [Node.js documentation for stream ↗](https://nodejs.org/api/stream.html) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/#page","headline":"Streams - Node.js APIs · Cloudflare Workers docs","description":"Use the Node.js streams API in Cloudflare Workers for readable, writable, and transform stream operations.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
