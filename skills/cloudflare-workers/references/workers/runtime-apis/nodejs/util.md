---
description: Use the Node.js util module in Workers for promisify, callbackify, types, and MIMEType support.
title: util
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# util

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

## promisify/callbackify

The `promisify` and `callbackify` APIs in Node.js provide a means of bridging between a Promise-based programming model and a callback-based model.

The `promisify` method allows taking a Node.js-style callback function and converting it into a Promise-returning async function:

```js
import { promisify } from "node:util";

function foo(args, callback) {
	try {
		callback(null, 1);
	} catch (err) {
		// Errors are emitted to the callback via the first argument.
		callback(err);
	}
}

const promisifiedFoo = promisify(foo);
await promisifiedFoo(args);
```

Similarly to `promisify`, `callbackify` converts a Promise-returning async function into a Node.js-style callback function:

```js
import { callbackify } from 'node:util';

async function foo(args) {
  throw new Error('boom');
}

const callbackifiedFoo = callbackify(foo);

callbackifiedFoo(args, (err, value) => {
  if (err) throw err;
});
```

`callbackify` and `promisify` make it easy to handle all of the challenges that come with bridging between callbacks and promises.

Refer to the [Node.js documentation for callbackify ↗](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utilcallbackifyoriginal) and [Node.js documentation for promisify ↗](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utilpromisifyoriginal) for more information.

## util.types

The `util.types` API provides a reliable and efficient way of checking that values are instances of various built-in types.

```js
import { types } from "node:util";

types.isAnyArrayBuffer(new ArrayBuffer()); // Returns true
types.isAnyArrayBuffer(new SharedArrayBuffer()); // Returns true
types.isArrayBufferView(new Int8Array()); // true
types.isArrayBufferView(Buffer.from("hello world")); // true
types.isArrayBufferView(new DataView(new ArrayBuffer(16))); // true
types.isArrayBufferView(new ArrayBuffer()); // false
function foo() {
	types.isArgumentsObject(arguments); // Returns true
}
types.isAsyncFunction(function foo() {}); // Returns false
types.isAsyncFunction(async function foo() {}); // Returns true
// .. and so on
```

Caution

The Workers implementation currently does not provide implementations of the `util.types.isExternal()`, `util.types.isProxy()`, `util.types.isKeyObject()`, or `util.type.isWebAssemblyCompiledModule()` APIs.

For more about `util.types`, refer to the [Node.js documentation for util.types ↗](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utiltypes).

## util.MIMEType

`util.MIMEType` provides convenience methods that allow you to more easily work with and manipulate [MIME types ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics%5Fof%5FHTTP/MIME%5Ftypes). For example:

```js
import { MIMEType } from "node:util";

const myMIME = new MIMEType("text/javascript;key=value");

console.log(myMIME.type);
// Prints: text

console.log(myMIME.essence);
// Prints: text/javascript

console.log(myMIME.subtype);
// Prints: javascript

console.log(String(myMIME));
// Prints: application/javascript;key=value
```

For more about `util.MIMEType`, refer to the [Node.js documentation for util.MIMEType ↗](https://nodejs.org/api/util.html#class-utilmimetype).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/#page","headline":"util · Cloudflare Workers docs","description":"Use the Node.js util module in Workers for promisify, callbackify, types, and MIMEType support.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
