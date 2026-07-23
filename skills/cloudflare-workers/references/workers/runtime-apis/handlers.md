---
description: Methods, such as `fetch()`, on Workers that can receive and process external inputs.
title: Handlers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Handlers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/handlers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Handlers are methods on Workers that can receive and process external inputs, and can be invoked from outside your Worker. For example, the `fetch()` handler receives an HTTP request, and can return a response:

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

The following handlers are available within Workers:

* [Alarm Handler](https://developers.cloudflare.com/durable-objects/api/alarms/)
* [Email Handler](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/)
* [Fetch Handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/)
* [Queue Handler](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer)
* [Scheduled Handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)
* [Tail Handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/tail/)

## Handlers in Python Workers

When you [write Workers in Python](https://developers.cloudflare.com/workers/languages/python/), handlers are placed in a class named `Default` that extends the [WorkerEntrypoint class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/) (which you can import from the `workers` SDK module).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/handlers/#page","headline":"Handlers · Cloudflare Workers docs","description":"Methods, such as fetch(), on Workers that can receive and process external inputs.","url":"https://developers.cloudflare.com/workers/runtime-apis/handlers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
