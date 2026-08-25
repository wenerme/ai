---
description: Run Python, JavaScript, or TypeScript in a sandbox with the interpreter extension on @cloudflare/sandbox@next.
title: Code interpreter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Code interpreter

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page uses the interpreter extension on `@cloudflare/sandbox@next`. On today's stable package, interpreter methods live on `Sandbox` — refer to [Use code interpreter](https://developers.cloudflare.com/sandbox/guides/code-execution/).

On `@next`, the code interpreter is an opt-in extension, not methods on bare `Sandbox`. Method names match the stable interpreter. You attach once, then call `sandbox.interpreter.*`. `runCode` returns plain serializable data across the Worker and Durable Object boundary.

Signatures and types: [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/).

## Attach

```js
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox {
	interpreter = withInterpreter(this);
}
```

```ts
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
	interpreter = withInterpreter(this);
}
```

Export that class from your Worker. The sidecar provisions on first use.

## Image

| Language                | Image                                                    |
| ----------------------- | -------------------------------------------------------- |
| JavaScript / TypeScript | Default sandbox image (or any variant with a JS runtime) |
| Python                  | **\-python** image variant                               |

Use the same preview Worker package and container image line. Refer to [Dockerfile](https://developers.cloudflare.com/sandbox/configuration/dockerfile/).

## Run code

A **context** keeps variables and imports until you delete it or the container is replaced.

```js
const sandbox = getSandbox(env.Sandbox, "user-123");

const context = await sandbox.interpreter.createCodeContext({
	language: "python",
	cwd: "/workspace",
});

await sandbox.interpreter.runCode("x = 2", { context });
const result = await sandbox.interpreter.runCode("x * 21", { context });

if (result.error) {
	console.error(result.error.name, result.error.message);
} else {
	console.log(result.results, result.logs.stdout);
}
```

```ts
const sandbox = getSandbox(env.Sandbox, "user-123");

const context = await sandbox.interpreter.createCodeContext({
	language: "python",
	cwd: "/workspace",
});

await sandbox.interpreter.runCode("x = 2", { context });
const result = await sandbox.interpreter.runCode("x * 21", { context });

if (result.error) {
	console.error(result.error.name, result.error.message);
} else {
	console.log(result.results, result.logs.stdout);
}
```

If you omit `context`, `runCode` uses a default context for the language (default language: `python`). Languages: `python`, `javascript`, `typescript`.

For result fields, streaming (`runCodeStream`), and list/delete context methods, refer to the [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/).

Contexts exist only in the **current container**. After stop or replace, create new ones. Refer to [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/).

## Related

* [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/)
* [Extensions](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)
* Stable guide: [Use code interpreter](https://developers.cloudflare.com/sandbox/guides/code-execution/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/#page","headline":"Code interpreter · Cloudflare Sandbox SDK docs","description":"Run Python, JavaScript, or TypeScript in a sandbox with the interpreter extension on @cloudflare/sandbox@next.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
