---
description: Handle incoming HTTP requests in Cloudflare Workers using the fetch() handler and return responses.
title: Fetch Handler
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Fetch Handler

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Background

Incoming HTTP requests to a Worker are passed to the `fetch()` handler as a [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object. To respond to the request with a response, return a [Response](https://developers.cloudflare.com/workers/runtime-apis/response/) object:

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

Note

The Workers runtime does not support `XMLHttpRequest` (XHR). Learn the difference between `XMLHttpRequest` and `fetch()` in the [MDN ↗](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) documentation.

### Parameters

* `request` Request

  * The incoming HTTP request.
* `env` object

  * The [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) available to the Worker. As long as the [environment](https://developers.cloudflare.com/workers/wrangler/environments/) has not changed, the same object (equal by identity) may be passed to multiple requests. You can also [import env from cloudflare:workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) to access bindings from anywhere in your code.
* `ctx.waitUntil(promisePromise)` : void

  * Refer to [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil).
* `ctx.passThroughOnException()` : void

  * Refer to [passThroughOnException](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/#page","headline":"Fetch Handler · Cloudflare Workers docs","description":"Handle incoming HTTP requests in Cloudflare Workers using the fetch() handler and return responses.","url":"https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
