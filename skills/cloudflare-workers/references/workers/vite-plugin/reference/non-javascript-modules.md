---
description: Additional module types that can be imported in your Worker
title: Non-JavaScript modules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Non-JavaScript modules

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

In addition to TypeScript and JavaScript, the following module types are automatically configured to be importable in your Worker code.

| Module extension    | Imported type      |
| ------------------- | ------------------ |
| .txt                | string             |
| .html               | string             |
| .sql                | string             |
| .bin                | ArrayBuffer        |
| .wasm, .wasm?module | WebAssembly.Module |

For example, with the following import, `text` will be a string containing the contents of `example.txt`:

```js
import text from "./example.txt";
```

This is also the basis for importing Wasm, as in the following example:

```ts
import wasm from "./example.wasm";

// Instantiate Wasm modules in the module scope
const instance = await WebAssembly.instantiate(wasm);

export default {
	fetch() {
		const result = instance.exports.exported_func();

		return new Response(result);
	},
};
```

Note

Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/#page","headline":"Non-JavaScript modules · Cloudflare Workers docs","description":"Additional module types that can be imported in your Worker","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
