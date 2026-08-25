---
description: Use the Node.js assert module in Cloudflare Workers for testing assertions and value comparisons.
title: assert
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# assert

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:assert ↗](https://nodejs.org/docs/latest/api/assert.html) module in Node.js provides a number of useful assertions that are useful when building tests.

```js
import { strictEqual, deepStrictEqual, ok, doesNotReject } from "node:assert";

strictEqual(1, 1); // ok!
strictEqual(1, "1"); // fails! throws AssertionError

deepStrictEqual({ a: { b: 1 } }, { a: { b: 1 } }); // ok!
deepStrictEqual({ a: { b: 1 } }, { a: { b: 2 } }); // fails! throws AssertionError

ok(true); // ok!
ok(false); // fails! throws AssertionError

await doesNotReject(async () => {}); // ok!
await doesNotReject(async () => {
	throw new Error("boom");
}); // fails! throws AssertionError
```

Note

In the Workers implementation of `assert`, all assertions run in, what Node.js calls, the strict assertion mode. In strict assertion mode, non-strict methods behave like their corresponding strict methods. For example, `deepEqual()` will behave like `deepStrictEqual()`.

Refer to the [Node.js documentation for assert ↗](https://nodejs.org/dist/latest-v19.x/docs/api/assert.html) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/#page","headline":"assert · Cloudflare Workers docs","description":"Use the Node.js assert module in Cloudflare Workers for testing assertions and value comparisons.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
