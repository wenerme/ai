---
description: Use the Node.js Buffer API in Cloudflare Workers to manipulate binary data with encoding and decoding support.
title: Buffer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Buffer

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [Buffer ↗](https://nodejs.org/docs/latest/api/buffer.html) API in Node.js is one of the most commonly used Node.js APIs for manipulating binary data. Every `Buffer` instance extends from the standard [Uint8Array ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Uint8Array) class, but adds a range of unique capabilities such as built-in base64 and hex encoding/decoding, byte-order manipulation, and encoding-aware substring searching.

```js
import { Buffer } from "node:buffer";

const buf = Buffer.from("hello world", "utf8");

console.log(buf.toString("hex"));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString("base64"));
// Prints: aGVsbG8gd29ybGQ=
```

A Buffer extends from `Uint8Array`. Therefore, it can be used in any Workers API that currently accepts `Uint8Array`, such as creating a new Response:

```js
const response = new Response(Buffer.from("hello world"));
```

You can also use the `Buffer` API when interacting with streams:

```js
const writable = getWritableStreamSomehow();
const writer = writable.getWriter();
writer.write(Buffer.from("hello world"));
```

One key difference between the Workers implementation of `Buffer` and the Node.js implementation is that some methods of creating a `Buffer` in Node.js will allocate those from a global memory pool as a performance optimization. The Workers implementation does not use a memory pool and all `Buffer` instances are allocated independently.

Further, in Node.js it is possible to allocate a `Buffer` with uninitialized memory using the `Buffer.allocUnsafe()` method. This is not supported in Workers and `Buffer`instances are always initialized so that the `Buffer` is always filled with null bytes (`0x00`) when allocated.

Refer to the [Node.js documentation for Buffer ↗](https://nodejs.org/dist/latest-v19.x/docs/api/buffer.html) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/#page","headline":"Buffer · Cloudflare Workers docs","description":"Use the Node.js Buffer API in Cloudflare Workers to manipulate binary data with encoding and decoding support.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
