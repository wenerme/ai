---
description: Reference for the Worker Loader binding and the WorkerCode object.
title: API reference
image: https://developers.cloudflare.com/dynamic-workers/api-reference/og.png?v=2dc793a98734e022
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# API reference

Last updated Oct 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dynamic-workers/api-reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This page describes the Worker Loader binding API, assuming you have [configured a binding](https://developers.cloudflare.com/dynamic-workers/getting-started/#configure-worker-loader) as `env.LOADER`.

## `load`

`env.LOADER.load(code WorkerCode) WorkerStub`

Loads a Worker from the provided `WorkerCode` and returns a `WorkerStub` which may be used to invoke the Worker.

Unlike `get()`, `load()` does not cache by ID. Each call creates a new Worker.

Use `load()` when the code is always new, such as for one-time AI-generated tool calls.

## `get`

`env.LOADER.get(id string, getCodeCallback () => Promise<WorkerCode>): WorkerStub`

Loads a Worker with the given ID, returning a `WorkerStub` which may be used to invoke the Worker.

The loader caches isolates by ID. When the loader sees an ID for the first time, it creates a new isolate. The isolate may stay warm in memory for subsequent requests. If a later call uses the same ID, the runtime may return the existing isolate instead of creating a new one. However, this is not guaranteed. A later call with the same ID may start a new isolate from scratch.

When the runtime needs to start a new isolate and does not have a cached copy of the code, it invokes `codeCallback` to get the Worker code. This is an async callback, so the application can load the code from remote storage if needed. The callback returns a [`WorkerCode`](#workercode) object.

Because of caching, ensure that the callback always returns exactly the same content for the same ID. If anything about the content changes, you must use a new ID. If the content has not changed, reuse the same ID to take advantage of caching. If the `WorkerCode` is different every time, pass a random ID.

For example, use IDs of the form `<worker-name>:<version-number>`, where the version number increments every time the code changes. Alternatively, compute IDs based on a hash of the code and config so that any change produces a new ID.

`get()` returns a `WorkerStub`, which you can use to send requests to the loaded Worker. The stub is returned synchronously, so you do not have to await it. If the Worker is not loaded yet, requests made to the stub wait for the Worker to load before being delivered. If loading fails, the request throws an exception.

Two requests are never guaranteed to reach the same isolate. Even if you use the same `WorkerStub` to make multiple requests, they could execute in different isolates. The callback passed to `loader.get()` could run any number of times, although it is unusual for it to run more than once.

## `WorkerCode`

This is the structure returned by `getCodeCallback` to represent a worker.

### `compatibilityDate string`

The [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) for the Worker. This has the same meaning as the `compatibility_date` setting in a Wrangler config file.

### `compatibilityFlags string[] Optional`

An optional list of [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags) augmenting the compatibility date. This has the same meaning as the `compatibility_flags` setting in a Wrangler config file.

### `allowExperimental boolean Optional`

If true, experimental compatibility flags are permitted in `compatibilityFlags`. To set this, the Worker calling the loader must itself have the `"experimental"` compatibility flag set. Experimental flags cannot be enabled in production.

### `mainModule string`

The name of the Worker's main module. This must be one of the modules listed in `modules`.

### `modules Record<string, string | Module>`

A dictionary object mapping module names to their string contents. If the module content is a plain string, the module name must have a file extension indicating its type: either `.js` or `.py`.

You can also specify a module's content as an object to set its type independent of the name. The allowed objects are:

- `{js: string}`: A JavaScript module, using ES modules syntax for imports and exports.
- `{cjs: string}`: A CommonJS module, using `require()` syntax for imports.
- `{py: string}`: A [Python module](https://developers.cloudflare.com/workers/languages/python/). Refer to the following warning about startup time.
- `{text: string}`: An importable string value.
- `{data: ArrayBuffer}`: An importable `ArrayBuffer` value.
- `{wasm: ArrayBuffer}`: A compiled WebAssembly (Wasm) module.
- `{json: object}`: An importable object. The value must be JSON-serializable. However, note that value is provided as a parsed object, and is delivered as a parsed object; neither side actually sees the JSON serialization.

Warning

While Dynamic Workers support Python, Python Workers are currently much slower to start than JavaScript Workers. For one-off AI-generated code, we strongly recommend using JavaScript. AI can write either language equally well.

### `globalOutbound ServiceStub | null Optional`

Controls whether the dynamic Worker has access to the network. The global `fetch()` and `connect()` functions (for making HTTP requests and TCP connections, respectively) can be blocked or redirected to isolate the Worker.

If `globalOutbound` is not specified, the default is to inherit the parent's network access, which usually means the dynamic Worker has full access to the public Internet.

If `globalOutbound` is `null`, the dynamic Worker is fully cut off from the network. Both `fetch()` and `connect()` throw exceptions.

You can also set `globalOutbound` to any service binding, including service bindings in the parent Worker's `env` and [loopback bindings from `ctx.exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports).

Using `ctx.exports` is particularly useful because it lets you customize the binding for a specific sandbox by setting the value of `ctx.props` that is passed back to it. The `props` can contain information to identify the specific dynamic Worker that made the request.

For example:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Greeter extends WorkerEntrypoint {
	fetch(request) {
		return new Response(`Hello, ${this.ctx.props.name}!`);
	}
}

export default {
	async fetch(request, env, ctx) {
		let worker = env.LOADER.get("alice", () => {
			return {
				// Redirect the worker's global outbound to send all requests
				// to the `Greeter` class, filling in `ctx.props.name` with
				// the name "Alice", so that it always responds "Hello, Alice!".
				globalOutbound: ctx.exports.Greeter({ props: { name: "Alice" } }),

				// ... code ...
			};
		});

		return worker.getEntrypoint().fetch(request);
	},
};
```

### `env object`

The environment object to provide to the dynamic Worker.

Using this, you can provide custom bindings to the Worker.

`env` is serialized and transferred into the dynamic Worker, where it becomes the value of `env`. It may contain:

- [Structured cloneable types ↗︎](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
- [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings), including [loopback bindings from `ctx.exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports).

The second point is the key to creating custom bindings: you can define a binding with any arbitrary API, by defining a [`WorkerEntrypoint` class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc) implementing an RPC API, and then giving it to the dynamic Worker as a Service Binding.

Moreover, by using `ctx.exports` loopback bindings, you can further customize the bindings for the specific dynamic Worker by setting `ctx.props`, as described for `globalOutbound`.

```js
import { WorkerEntrypoint } from "cloudflare:workers";

// Implement a binding which can be called by the dynamic Worker.
export class Greeter extends WorkerEntrypoint {
	greet() {
		return `Hello, ${this.ctx.props.name}!`;
	}
}

export default {
	async fetch(request, env, ctx) {
		let worker = env.LOADER.get("alice", () => {
			return {
				env: {
					// Provide a binding which has a method greet() which can be called
					// to receive a greeting. The binding knows the Worker's name.
					GREETER: ctx.exports.Greeter({ props: { name: "Alice" } }),
				},

				// ... code ...
			};
		});

		return worker.getEntrypoint().fetch(request);
	},
};
```

### `tails ServiceStub[] Optional`

Specify one or more [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) to observe console logs, errors, and other details about the dynamically-loaded Worker's execution. A tail event is delivered to the Tail Worker when a request to the dynamically-loaded Worker completes. You can implement the Tail Worker as an alternative entrypoint in your parent Worker, referencing it with `ctx.exports`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default {
	async fetch(request, env, ctx) {
		let worker = env.LOADER.get("alice", () => {
			return {
				// Send logs, errors, etc. to `LogTailer`. We pass `name` in the
				// `ctx.props` so that `LogTailer` knows what generated the logs.
				// (You can pass anything you want in `props`.)
				tails: [ctx.exports.LogTailer({ props: { name: "alice" } })],

				// ... code ...
			};
		});

		return worker.getEntrypoint().fetch(request);
	},
};

export class LogTailer extends WorkerEntrypoint {
	async tail(events) {
		let name = this.ctx.props.name;

		// Send the logs off to our log endpoint, specifying the worker name in
		// the URL.
		//
		// Note that `events` will always be an array of size 1 in this scenario,
		// describing the event delivered to the dynamically-loaded Worker.
		await fetch(`https://example.com/submit-logs/${name}`, {
			method: "POST",
			body: JSON.stringify(events),
		});
	}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/api-reference/#page","headline":"API reference","description":"Reference for the Worker Loader binding and the WorkerCode object.","url":"https://developers.cloudflare.com/dynamic-workers/api-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/dynamic-workers/api-reference/og.png?v=2dc793a98734e022","dateModified":"2026-10-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
