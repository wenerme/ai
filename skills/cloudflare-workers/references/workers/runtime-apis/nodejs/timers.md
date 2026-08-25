---
description: Use the Node.js timers API in Cloudflare Workers to schedule functions with setTimeout, setInterval, and setImmediate.
title: timers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# timers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

Use [node:timers ↗](https://nodejs.org/api/timers.html) APIs to schedule functions to be executed later.

This includes [setTimeout ↗](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args) for calling a function after a delay, [setInterval ↗](https://nodejs.org/api/timers.html#clearintervaltimeout) for calling a function repeatedly, and [setImmediate ↗](https://nodejs.org/api/timers.html#setimmediatecallback-args) for calling a function in the next iteration of the event loop.

```js
import timers from "node:timers";

export default {
	async fetch() {
		console.log("first");
		const { promise: promise1, resolve: resolve1 } = Promise.withResolvers();
		const { promise: promise2, resolve: resolve2 } = Promise.withResolvers();
		timers.setTimeout(() => {
			console.log("last");
			resolve1();
		}, 10);

		timers.setTimeout(() => {
			console.log("next");
			resolve2();
		});

		await Promise.all([promise1, promise2]);

		return new Response("ok");
	},
};
```

```ts
import timers from "node:timers";

export default {
  async fetch(): Promise<Response> {
    console.log("first");
    const { promise: promise1, resolve: resolve1 } = Promise.withResolvers<void>();
    const { promise: promise2, resolve: resolve2 } = Promise.withResolvers<void>();
    timers.setTimeout(() => {
      console.log("last");
      resolve1();
    }, 10);

    timers.setTimeout(() => {
      console.log("next");
      resolve2();
    });

    await Promise.all([promise1, promise2]);

    return new Response("ok");
  }
} satisfies ExportedHandler<Env>;
```

Note

Due to [security-based restrictions on timers](https://developers.cloudflare.com/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading) in Workers, timers are limited to returning the time of the last I/O. This means that while setTimeout, setInterval, and setImmediate will defer your function execution until after other events have run, they will not delay them for the full time specified.

Note

When called from a global level (on [globalThis ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/globalThis)), functions such as `clearTimeout` and `setTimeout` will respect web standards rather than Node.js-specific functionality. For complete Node.js compatibility, you must call functions from the `node:timers` module.

The full `node:timers` API is documented in the [Node.js documentation for node:timers ↗](https://nodejs.org/api/timers.html).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/#page","headline":"timers · Cloudflare Workers docs","description":"Use the Node.js timers API in Cloudflare Workers to schedule functions with setTimeout, setInterval, and setImmediate.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
