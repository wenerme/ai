---
description: Install @cloudflare/sandbox@next and run your first process handle in a sandbox.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page uses `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. Prefer this path for new projects. For today's stable package, refer to [Getting started](https://developers.cloudflare.com/sandbox/get-started/).

## 1\. Install the preview package

In a Workers project that already uses Sandbox, or a new project from the Sandbox template:

npmyarnpnpmbun

```
npm i @cloudflare/sandbox@next
```

```
yarn add @cloudflare/sandbox@next
```

```
pnpm add @cloudflare/sandbox@next
```

```
bun add @cloudflare/sandbox@next
```

Build and deploy the Worker **and** the sandbox container image from the same preview line.

## 2\. Export your Sandbox class

```js
import { Sandbox } from "@cloudflare/sandbox";

export { Sandbox };
```

```ts
import { Sandbox } from "@cloudflare/sandbox";

export { Sandbox };
```

Keep your `wrangler` Durable Object binding and container configuration. Preview-specific transport variables are not required.

## 3\. Run a process

`exec()` starts a program from **argv** — an array of the executable path or name, then its arguments. It waits until the sandbox can start the process, then returns a **process handle**. It does **not** wait for the process to exit.

Collect results with handle methods such as `output()`, or stream with `logs()`.

```js
import { getSandbox, proxyToSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

export default {
	async fetch(request, env) {
		const proxy = await proxyToSandbox(request, env);
		if (proxy) return proxy;

		const sandbox = getSandbox(env.Sandbox, "preview-demo");
		const process = await sandbox.exec(["python3", "-c", "print(2 + 2)"]);
		const output = await process.output({ encoding: "utf8" });

		return Response.json({
			id: process.id,
			pid: process.pid,
			stdout: output.stdout,
			exitCode: output.exitCode,
		});
	},
};
```

```ts
import { getSandbox, proxyToSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

type Env = {
	Sandbox: DurableObjectNamespace<import("@cloudflare/sandbox").Sandbox>;
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const proxy = await proxyToSandbox(request, env);
		if (proxy) return proxy;

		const sandbox = getSandbox(env.Sandbox, "preview-demo");
		const process = await sandbox.exec(["python3", "-c", "print(2 + 2)"]);
		const output = await process.output({ encoding: "utf8" });

		return Response.json({
			id: process.id,
			pid: process.pid,
			stdout: output.stdout,
			exitCode: output.exitCode,
		});
	},
};
```

Each argv entry is one argument to the process. The SDK does **not** run a shell and does **not** shell-escape argv. Spaces and special characters in an entry stay inside that argument.

Shell syntax (`&&`, pipes, redirects, globs) needs an explicit shell, with the script as its own argument:

```js
const process = await sandbox.exec([
	"/bin/bash",
	"-lc",
	"echo hello && uname -a",
]);
const { stdout } = await process.output({ encoding: "utf8" });
```

```ts
const process = await sandbox.exec([
	"/bin/bash",
	"-lc",
	"echo hello && uname -a",
]);
const { stdout } = await process.output({ encoding: "utf8" });
```

## 4\. How this differs from the stable package

* `await sandbox.exec(...)` creates a process. It does **not** wait for exit. Use `output()`, `waitForExit()`, or other handle methods for completion.
* Each `exec()` is independent. A `cd` or `export` in one call is not remembered in the next.
* Pass `cwd` and `env` on each `exec()` when you need them, or use `setEnvVars` for sandbox-wide values. Refer to [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/).
* A process runs only in the **current container** for that sandbox. After the container stops or is replaced, start a new process. Model: [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/).
* Before production traffic, learn which failures are safe to retry: [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/).

## Next

* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) — sandbox ID, container, stop, and replace
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) — `exec()`, handles, and continuing work across requests
* [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/) — retries, interrupted calls, and stale handles
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) — update an existing stable app
* [API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/) — processes, terminals, and errors
* [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) — interactive PTY and browser connections
* [Extensions](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/get-started/#page","headline":"Get started · Cloudflare Sandbox SDK docs","description":"Install @cloudflare/sandbox@next and run your first process handle in a sandbox.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
