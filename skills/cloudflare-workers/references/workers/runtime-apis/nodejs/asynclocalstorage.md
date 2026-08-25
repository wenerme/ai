---
description: Use the Node.js AsyncLocalStorage API in Cloudflare Workers to maintain context across asynchronous operations.
title: AsyncLocalStorage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# AsyncLocalStorage

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

Cloudflare Workers provides an implementation of a subset of the Node.js [AsyncLocalStorage ↗](https://nodejs.org/dist/latest-v18.x/docs/api/async%5Fcontext.html#class-asynclocalstorage) API for creating in-memory stores that remain coherent through asynchronous operations.

## Constructor

```js
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
```

* `new AsyncLocalStorage()` : AsyncLocalStorage
  * Returns a new `AsyncLocalStorage` instance.

## Methods

* `getStore()` : any

  * Returns the current store. If called outside of an asynchronous context initialized by calling `asyncLocalStorage.run()`, it returns `undefined`.
* `run(storeany, callbackfunction, ...argsarguments)` : any

  * Runs a function synchronously within a context and returns its return value. The store is not accessible outside of the callback function. The store is accessible to any asynchronous operations created within the callback. The optional `args` are passed to the callback function. If the callback function throws an error, the error is thrown by `run()` also.
* `exit(callbackfunction, ...argsarguments)` : any

  * Runs a function synchronously outside of a context and returns its return value. This method is equivalent to calling `run()` with the `store` value set to `undefined`.

## Static Methods

* `AsyncLocalStorage.bind(fn)` : function

  * Captures the asynchronous context that is current when `bind()` is called and returns a function that enters that context before calling the passed in function.
* `AsyncLocalStorage.snapshot()` : function

  * Captures the asynchronous context that is current when `snapshot()` is called and returns a function that enters that context before calling a given function.

## Examples

### Fetch Listener

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

export default {
  async fetch(req) {
    return asyncLocalStorage.run(idSeq++, () => {
      // Simulate some async activity...
      await scheduler.wait(1000);
      return new Response(asyncLocalStorage.getStore());
    });
  }
};
```

### Multiple stores

The API supports multiple `AsyncLocalStorage` instances to be used concurrently.

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als1 = new AsyncLocalStorage();
const als2 = new AsyncLocalStorage();

export default {
  async fetch(req) {
    return als1.run(123, () => {
      return als2.run(321, () => {
        // Simulate some async activity...
        await scheduler.wait(1000);
        return new Response(`${als1.getStore()}-${als2.getStore()}`);
      });
    });
  }
};
```

### Unhandled Rejections

When a `Promise` rejects and the rejection is unhandled, the async context propagates to the `'unhandledrejection'` event handler:

```js
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

addEventListener("unhandledrejection", (event) => {
	console.log(asyncLocalStorage.getStore(), "unhandled rejection!");
});

export default {
	async fetch(req) {
		return asyncLocalStorage.run(idSeq++, () => {
			// Cause an unhandled rejection!
			throw new Error("boom");
		});
	},
};
```

### `AsyncLocalStorage.bind()` and `AsyncLocalStorage.snapshot()`

```js
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

function foo() {
	console.log(als.getStore());
}
function bar() {
	console.log(als.getStore());
}

const oneFoo = als.run(123, () => AsyncLocalStorage.bind(foo));
oneFoo(); // prints 123

const snapshot = als.run("abc", () => AsyncLocalStorage.snapshot());
snapshot(foo); // prints 'abc'
snapshot(bar); // prints 'abc'
```

```js
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

class MyResource {
	#runInAsyncScope = AsyncLocalStorage.snapshot();

	doSomething() {
		this.#runInAsyncScope(() => {
			return als.getStore();
		});
	}
}

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

## `AsyncResource`

The [AsyncResource ↗](https://nodejs.org/dist/latest-v18.x/docs/api/async%5Fcontext.html#class-asyncresource) class is a component of Node.js' async context tracking API that allows users to create their own async contexts. Objects that extend from `AsyncResource` are capable of propagating the async context in much the same way as promises.

Note that `AsyncLocalStorage.snapshot()` and `AsyncLocalStorage.bind()` provide a better approach. `AsyncResource` is provided solely for backwards compatibility with Node.js.

### Constructor

```js
import { AsyncResource, AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

class MyResource extends AsyncResource {
	constructor() {
		// The type string is required by Node.js but unused in Workers.
		super("MyResource");
	}

	doSomething() {
		this.runInAsyncScope(() => {
			return als.getStore();
		});
	}
}

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

* `new AsyncResource(typestring, optionsAsyncResourceOptions)` : AsyncResource

  * Returns a new `AsyncResource`. Importantly, while the constructor arguments are required in Node.js' implementation of `AsyncResource`, they are not used in Workers.
* `AsyncResource.bind(fnfunction, typestring, thisArgany)`
  * Binds the given function to the current async context.

### Methods

* `asyncResource.bind(fnfunction, thisArgany)`
  * Binds the given function to the async context associated with this `AsyncResource`.
* `asyncResource.runInAsyncScope(fnfunction, thisArgany, ...argsarguments)`
  * Call the provided function with the given arguments in the async context associated with this `AsyncResource`.

## Caveats

* The `AsyncLocalStorage` implementation provided by Workers intentionally omits support for the [asyncLocalStorage.enterWith() ↗](https://nodejs.org/dist/latest-v18.x/docs/api/async%5Fcontext.html#asynclocalstorageenterwithstore) and [asyncLocalStorage.disable() ↗](https://nodejs.org/dist/latest-v18.x/docs/api/async%5Fcontext.html#asynclocalstoragedisable) methods.
* Workers does not implement the full [async\_hooks ↗](https://nodejs.org/dist/latest-v18.x/docs/api/async%5Fhooks.html) API upon which Node.js' implementation of `AsyncLocalStorage` is built.
* Workers does not implement the ability to create an `AsyncResource` with an explicitly identified trigger context as allowed by Node.js. This means that a new `AsyncResource` will always be bound to the async context in which it was created.
* Thenables (non-Promise objects that expose a `then()` method) are not fully supported when using `AsyncLocalStorage`. When working with thenables, instead use [AsyncLocalStorage.snapshot() ↗](https://nodejs.org/api/async%5Fcontext.html#static-method-asynclocalstoragesnapshot) to capture a snapshot of the current context.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/#page","headline":"AsyncLocalStorage · Cloudflare Workers docs","description":"Use the Node.js AsyncLocalStorage API in Cloudflare Workers to maintain context across asynchronous operations.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
