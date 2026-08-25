---
description: Miniflare supports both the traditional service-worker and the newer modules formats for writing workers. To use the modules format, enable it with:
title: Modules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Modules

Last updated Jan 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/core/modules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [Modules Reference](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/)

## Enabling Modules

Miniflare supports both the traditional `service-worker` and the newer `modules` formats for writing workers. To use the `modules` format, enable it with:

```js
const mf = new Miniflare({
	modules: true,
});
```

You can then use `modules` worker scripts like the following:

```js
export default {
	async fetch(request, env, ctx) {
		// - `request` is the incoming `Request` instance
		// - `env` contains bindings, KV namespaces, Durable Objects, etc
		// - `ctx` contains `waitUntil` and `passThroughOnException` methods
		return new Response("Hello Miniflare!");
	},
	async scheduled(controller, env, ctx) {
		// - `controller` contains `scheduledTime` and `cron` properties
		// - `env` contains bindings, KV namespaces, Durable Objects, etc
		// - `ctx` contains the `waitUntil` method
		console.log("Doing something scheduled...");
	},
};
```

String scripts via the `script` option are supported using the `modules` format, but you cannot import other modules using them. You must use a script file via the `scriptPath` option for this.

## Module Rules

Miniflare supports all module types: `ESModule`, `CommonJS`, `Text`, `Data` and `CompiledWasm`. You can specify additional module resolution rules as follows:

```js
const mf = new Miniflare({
	modulesRules: [
		{ type: "ESModule", include: ["**/*.js"], fallthrough: true },
		{ type: "Text", include: ["**/*.txt"] },
	],
});
```

### Default Rules

The following rules are automatically added to the end of your modules rules list. You can override them by specifying rules matching the same `globs`:

```js
[
	{ type: "ESModule", include: ["**/*.mjs"] },
	{ type: "CommonJS", include: ["**/*.js", "**/*.cjs"] },
];
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/modules/#page","headline":"Modules · Cloudflare Workers docs","description":"Miniflare supports both the traditional service-worker and the newer modules formats for writing workers. To use the modules format, enable it with:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/modules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
