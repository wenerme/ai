---
description: Use the Node.js process module in Cloudflare Workers for environment variables, event handling, and runtime information.
title: process
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# process

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [process ↗](https://nodejs.org/docs/latest/api/process.html) module in Node.js provides a number of useful APIs related to the current process.

Initially Workers only supported `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform` and `features` on process, which was then updated with the [enable\_nodejs\_process\_v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-process-v2-implementation) flag to include most Node.js process features.

Refer to the [Node.js documentation for process ↗](https://nodejs.org/docs/latest/api/process.html) for more information.

Workers-specific implementation details apply when adapting Node.js process support for a serverless environment, which are described in more detail below.

## `process.env`

In the Node.js implementation of `process.env`, the `env` object is a copy of the environment variables at the time the process was started. In the Workers implementation, there is no process-level environment, so by default `env` is an empty object. You can still set and get values from `env`, and those will be globally persistent for all Workers running in the same isolate and context (for example, the same Workers entry point).

Note

If you use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) or the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), `process.env.NODE_ENV` is statically replaced at build time and is not a runtime value. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/#node%5Fenv) for more information.

When [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled and the [nodejs\_compat\_populate\_process\_env](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-auto-populating-processenv) compatibility flag is set (enabled by default for compatibility dates on or after 2025-04-01), `process.env` will contain any [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/), [secrets](https://developers.cloudflare.com/workers/configuration/secrets/), or [version metadata](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) metadata that has been configured on your Worker.

Setting any value on `process.env` will coerce that value into a string.

### Alternative: Import `env` from `cloudflare:workers`

Instead of using `process.env`, you can [import env from cloudflare:workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) to access environment variables and all other bindings from anywhere in your code.

```js
import * as process from "node:process";

export default {
	fetch(req, env) {
		// Set process.env.FOO to the value of env.FOO if process.env.FOO is not already set
		// and env.FOO is a string.
		process.env.FOO ??= (() => {
			if (typeof env.FOO === "string") {
				return env.FOO;
			}
		})();
	},
};
```

It is strongly recommended that you _do not_ replace the entire `process.env` object with the cloudflare `env` object. Doing so will cause you to lose any environment variables that were set previously and will cause unexpected behavior for other Workers running in the same isolate. Specifically, it would cause inconsistency with the `process.env` object when accessed via named imports.

```js
import * as process from "node:process";
import { env } from "node:process";

process.env === env; // true! they are the same object
process.env = {}; // replace the object! Do not do this!
process.env === env; // false! they are no longer the same object

// From this point forward, any changes to process.env will not be reflected in env,
// and vice versa!
```

## `process.nextTick()`

The Workers implementation of `process.nextTick()` is a wrapper for the standard Web Platform API [queueMicrotask() ↗](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask).

```js
import { env, nextTick } from "node:process";

env["FOO"] = "bar";
console.log(env["FOO"]); // Prints: bar

nextTick(() => {
	console.log("next tick");
});
```

## Stdio

[process.stdout ↗](https://nodejs.org/docs/latest/api/process.html#processstdout), [process.stderr ↗](https://nodejs.org/docs/latest/api/process.html#processstderr) and [process.stdin ↗](https://nodejs.org/docs/latest/api/process.html#processstdin) are supported as streams. `stdin` is treated as an empty readable stream. `stdout` and `stderr` are non-TTY writable streams, which output to normal logging output only with `stdout: ` and `stderr: ` prefixing.

The line buffer works by storing writes to stdout or stderr until either a newline character `\n` is encountered or until the next microtask, when the log is then flushed to the output.

This ensures compatibility with inspector and structured logging outputs.

## Current Working Directory

[process.cwd() ↗](https://nodejs.org/docs/latest/api/process.html#processcwd) is the _current working directory_, used as the default path for all filesystem operations, and is initialized to `/bundle`.

[process.chdir() ↗](https://nodejs.org/docs/latest/api/process.html#processchdirdirectory) allows modifying the `cwd` and is respected by FS operations when using `enable_nodejs_fs_module`.

## Hrtime

While [process.hrtime ↗](https://nodejs.org/docs/latest/api/process.html#processhrtimetime) high-resolution timer is available, it provides an inaccurate timer for compatibility only.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/#page","headline":"process · Cloudflare Workers docs","description":"Use the Node.js process module in Cloudflare Workers for environment variables, event handling, and runtime information.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
