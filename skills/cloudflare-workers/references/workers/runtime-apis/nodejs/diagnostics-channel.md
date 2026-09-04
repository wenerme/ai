---
description: Use the Node.js diagnostics_channel API in Cloudflare Workers for low-overhead diagnostic event reporting.
title: Diagnostics Channel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Diagnostics Channel

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [diagnostics\_channel ↗](https://nodejs.org/dist/latest-v20.x/docs/api/diagnostics%5Fchannel.html) module provides an API to create named channels to report arbitrary message data for diagnostics purposes. The API is essentially a simple event pub/sub model that is specifically designed to support low-overhead diagnostics reporting.

```js
import {
	channel,
	hasSubscribers,
	subscribe,
	unsubscribe,
	tracingChannel,
} from "node:diagnostics_channel";

// For publishing messages to a channel, acquire a channel object:
const myChannel = channel("my-channel");

// Any JS value can be published to a channel.
myChannel.publish({ foo: "bar" });

// For receiving messages on a channel, use subscribe:

subscribe("my-channel", (message) => {
	console.log(message);
});
```

All `Channel` instances are singletons per each Isolate/context (for example, the same entry point). Subscribers are always invoked synchronously and in the order they were registered, much like an `EventTarget` or Node.js `EventEmitter` class.

## Integration with Tail Workers

When using [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/), all messages published to any channel will be forwarded also to the [Tail Worker](https://developers.cloudflare.com/workers/observability/logs/tail-workers/). Within the Tail Worker, the diagnostic channel messages can be accessed via the `diagnosticsChannelEvents` property:

```js
export default {
	async tail(events) {
		for (const event of events) {
			for (const messageData of event.diagnosticsChannelEvents) {
				console.log(
					messageData.timestamp,
					messageData.channel,
					messageData.message,
				);
			}
		}
	},
};
```

Note that message published to the tail worker is passed through the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm) (same mechanism as the [structuredClone() ↗](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API) so only values that can be successfully cloned are supported.

## `TracingChannel`

Per the Node.js documentation, "[TracingChannel ↗](https://nodejs.org/api/diagnostics%5Fchannel.html#class-tracingchannel) is a collection of \[Channels\] which together express a single traceable action. `TracingChannel` is used to formalize and simplify the process of producing events for tracing application flow."

```js
import { tracingChannel } from "node:diagnostics_channel";
import { AsyncLocalStorage } from "node:async_hooks";

const channels = tracingChannel("my-channel");
const requestId = new AsyncLocalStorage();
channels.start.bindStore(requestId);

channels.subscribe({
	start(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle start message
	},
	end(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle end message
	},
	asyncStart(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle asyncStart message
	},
	asyncEnd(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle asyncEnd message
	},
	error(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle error message
	},
});

// The subscriber handlers will be invoked while tracing the execution of the async
// function passed into `channel.tracePromise`...
channel.tracePromise(
	async () => {
		// Perform some asynchronous work...
	},
	{ requestId: "123" },
);
```

Refer to the [Node.js documentation for diagnostics\_channel ↗](https://nodejs.org/dist/latest-v20.x/docs/api/diagnostics%5Fchannel.html) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/#page","headline":"Diagnostics Channel · Cloudflare Workers docs","description":"Use the Node.js diagnostics_channel API in Cloudflare Workers for low-overhead diagnostic event reporting.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
