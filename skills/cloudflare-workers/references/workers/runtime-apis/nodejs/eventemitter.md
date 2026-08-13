---
description: Use the Node.js EventEmitter API in Cloudflare Workers to emit and listen for named events.
title: EventEmitter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# EventEmitter

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

An [EventEmitter ↗](https://nodejs.org/docs/latest/api/events.html#class-eventemitter)is an object that emits named events that cause listeners to be called.

```js
import { EventEmitter } from "node:events";

const emitter = new EventEmitter();
emitter.on("hello", (...args) => {
	console.log(...args); // 1 2 3
});

emitter.emit("hello", 1, 2, 3);
```

The implementation in the Workers runtime supports the entire Node.js `EventEmitter` API. This includes the [captureRejections ↗](https://nodejs.org/docs/latest/api/events.html#capture-rejections-of-promises)option that allows improved handling of async functions as event handlers:

```js
const emitter = new EventEmitter({ captureRejections: true });
emitter.on("hello", async (...args) => {
	throw new Error("boom");
});
emitter.on("error", (err) => {
	// the async promise rejection is emitted here!
});
```

Like Node.js, when an `'error'` event is emitted on an `EventEmitter` and there is no listener for it, the error will be immediately thrown. However, in Node.js it is possible to add a handler on the `process` object for the `'uncaughtException'` event to catch globally uncaught exceptions. The `'uncaughtException'` event, however, is currently not implemented in the Workers runtime. It is strongly recommended to always add an `'error'` listener to any `EventEmitter` instance.

Refer to the [Node.js documentation for EventEmitter ↗](https://nodejs.org/api/events.html#class-eventemitter) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/#page","headline":"EventEmitter · Cloudflare Workers docs","description":"Use the Node.js EventEmitter API in Cloudflare Workers to emit and listen for named events.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
