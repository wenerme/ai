---
description: Load and run a dynamic Worker.
title: Getting started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting started

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dynamic-workers/getting-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can create a Worker that spins up other Workers, called Dynamic Workers, at runtime to execute code on-demand in a secure, sandboxed environment. You provide the code, choose which bindings the Dynamic Worker can access, and control whether the Dynamic Worker can reach the network.

Dynamic Workers support two loading modes:

* `load(code)` creates a fresh Dynamic Worker for one-time execution.
* `get(id, callback)` caches a Dynamic Worker by ID so it can stay warm across requests.

`load()` is best for one-time code execution, for example when using [Code Mode](https://developers.cloudflare.com/agents/tools/codemode/). `get(id, callback)` is better when the same code will receive subsequent requests, for example when you are building applications.

### Try it out

#### Dynamic Workers Starter

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers)

Use this "hello world" [starter ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers) to get a Worker deployed that can load and execute Dynamic Workers.

#### Dynamic Workers Playground

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers-playground)

You can also deploy the [Dynamic Workers Playground ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers-playground), where you can write or import code, bundle it at runtime with `@cloudflare/worker-bundler`, execute it through a Dynamic Worker, and see real-time responses and execution logs.

## Configure Worker Loader

In order for a Worker to be able to create Dynamic Workers, it needs a Worker Loader binding. Unlike most Workers bindings, this binding doesn't point at any external resource in particular; it simply provides access to the Worker Loader API.

Configure it like so, in your Worker's `wrangler.jsonc`:

```jsonc
{
	"worker_loaders": [
		{
			"binding": "LOADER",
		},
	],
}
```

```toml
[[worker_loaders]]
binding = "LOADER"
```

Your Worker will then have access to the Worker Loader API via `env.LOADER`.

## Run a Dynamic Worker

Use `env.LOADER.load()` to create a Dynamic Worker and run it:

```js
export default {
	async fetch(request, env) {
		// Load a worker.
		const worker = env.LOADER.load({
			compatibilityDate: "2026-08-27",

			mainModule: "src/index.js",
			modules: {
				"src/index.js": `
					export default {
						fetch(request) {
							return new Response("Hello from a dynamic Worker");
						},
					};
				`,
			},

			// Block all outbound network access from the Dynamic Worker.
			globalOutbound: null,
		});

		// Get the Dynamic Worker's `export default` entrypoint.
		// (A Worker can also export separate, named entrypoints.)
		let entrypoint = worker.getEntrypoint();

		// Forward the HTTP request to it.
		return entrypoint.fetch(request);
	},
};
```

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Load a worker.
		const worker = env.LOADER.load({
			compatibilityDate: "$today",

			mainModule: "src/index.js",
			modules: {
				"src/index.js": `
					export default {
						fetch(request) {
							return new Response("Hello from a dynamic Worker");
						},
					};
				`,
			},

			// Block all outbound network access from the Dynamic Worker.
			globalOutbound: null,
		});

		// Get the Dynamic Worker's `export default` entrypoint.
		// (A Worker can also export separate, named entrypoints.)
		let entrypoint = worker.getEntrypoint();

		// Forward the HTTP request to it.
		return entrypoint.fetch(request);
	},
};
```

In this example, `env.LOADER.load()` creates a Dynamic Worker from the code defined in `modules` and returns a stub that represents it.

`worker.getEntrypoint().fetch(request)` sends the incoming request to the Dynamic Worker's `fetch()` handler, which processes it and returns a response.

### Reusing a Dynamic Worker across requests

If you expect to load the exact same Worker more than once, use [get(id, callback)](https://developers.cloudflare.com/dynamic-workers/api-reference/#get) instead of `load()`. The `id` should be a unique string identifying the particular code you intend to load. When the runtime sees the same `id` again, it can reuse the existing Worker instead of creating a new one, if it hasn't been evicted yet.

The callback you provide will only be called if the Worker is not already loaded. This lets you skip loading the code from storage when the Worker is already running.

```js
const worker = env.LOADER.get("hello-v1", async () => {
	// Callback only runs if there is not already a warm
	// instance available.

	// Load code from storage.
	let code = await env.MY_CODE_STORAGE.get("hello-v1");

	// Return the same format as `env.LOADER.load()` accepts.
	return {
		compatibilityDate: "2026-08-27",
		mainModule: "index.js",
		modules: { "index.js": code },
		globalOutbound: null,
	};
});
```

```ts
const worker = env.LOADER.get("hello-v1", async () => {
	// Callback only runs if there is not already a warm
	// instance available.

	// Load code from storage.
	let code = await env.MY_CODE_STORAGE.get("hello-v1");

	// Return the same format as `env.LOADER.load()` accepts.
	return {
		compatibilityDate: "$today",
		mainModule: "index.js",
		modules: { "index.js": code, },
		globalOutbound: null,
	};
});
```

## Supported languages

Dynamic Workers support JavaScript (ES modules and CommonJS), Python, and WebAssembly (Wasm) modules. Pass JavaScript and Python code as strings in the `modules` object. Pass compiled Wasm binaries as `{ wasm: ArrayBuffer }` module objects.

There is no build step, so languages like TypeScript must be compiled to JavaScript before being passed to `load()` or `get()`.

For the full list of supported module types, refer to the [API reference](https://developers.cloudflare.com/dynamic-workers/api-reference/#modules).

### Python Workers

To run Python code in a Dynamic Worker, you must include the `python_workers` compatibility flag. Without this flag, the Dynamic Worker will fail to load the Python runtime.

```js
const worker = env.LOADER.load({
	compatibilityDate: "2026-08-27",
	compatibilityFlags: ["python_workers"],
	mainModule: "worker.py",
	modules: {
		"worker.py": `
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response("Hello from Python!")
    `,
	},
});
```

```ts
const worker = env.LOADER.load({
  compatibilityDate: "$today",
  compatibilityFlags: ["python_workers"],
  mainModule: "worker.py",
  modules: {
    "worker.py": `
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response("Hello from Python!")
    `,
  },
});
```

### Using TypeScript and npm dependencies

If your Dynamic Worker needs TypeScript compilation or npm dependencies, the code must be transpiled and bundled before passing to the Worker Loader.

[@cloudflare/worker-bundler ↗](https://www.npmjs.com/package/@cloudflare/worker-bundler) is a library that handles this for you. Use it to bundle source files into a format that `load()` and `get()` accept:

```js
import { createWorker } from "@cloudflare/worker-bundler";

const worker = env.LOADER.get("my-worker", async () => {
	const { mainModule, modules } = await createWorker({
		files: {
			"src/index.ts": `
				import { Hono } from 'hono';
				const app = new Hono();
				app.get('/', (c) => c.text('Hello from Hono!'));
				export default app;
			`,
			"package.json": JSON.stringify({
				dependencies: { hono: "^4.0.0" },
			}),
		},
	});

	return { mainModule, modules, compatibilityDate: "2026-08-27" };
});
```

```ts
import { createWorker } from "@cloudflare/worker-bundler";

const worker = env.LOADER.get("my-worker", async () => {
	const { mainModule, modules } = await createWorker({
		files: {
			"src/index.ts": `
				import { Hono } from 'hono';
				const app = new Hono();
				app.get('/', (c) => c.text('Hello from Hono!'));
				export default app;
			`,
			"package.json": JSON.stringify({
				dependencies: { hono: "^4.0.0" },
			}),
		},
	});

	return { mainModule, modules, compatibilityDate: "$today" };
});
```

`createWorker()` handles TypeScript compilation, dependency resolution from npm, and bundling. It returns `mainModule` and `modules` ready to pass directly to `load()` or `get()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/getting-started/#page","headline":"Getting started · Cloudflare Dynamic Workers docs","description":"Load and run a dynamic Worker.","url":"https://developers.cloudflare.com/dynamic-workers/getting-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
