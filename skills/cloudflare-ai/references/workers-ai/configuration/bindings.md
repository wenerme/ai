---
description: Create an AI binding to connect your Cloudflare Worker to Workers AI.
title: Workers Bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Workers Bindings

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/configuration/bindings/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Workers

[Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones.

To use Workers AI with Workers, you must create a Workers AI [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Bindings allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform. You create bindings on the Cloudflare dashboard or by updating your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/).

To bind Workers AI to your Worker, add the following to the end of your Wrangler file:

```jsonc
{
	"ai": {
		"binding": "AI" // i.e. available in your Worker on env.AI
	}
}
```

```toml
[ai]
binding = "AI"
```

## Pages Functions

[Pages Functions](https://developers.cloudflare.com/pages/functions/) allow you to build full-stack applications with Cloudflare Pages by executing code on the Cloudflare network. Functions are Workers under the hood.

To configure a Workers AI binding in your Pages Function, you must use the Cloudflare dashboard. Refer to [Workers AI bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) for instructions.

## Methods

### async env.AI.run()

`async env.AI.run()` runs a model. Takes a model as the first parameter, and an object as the second parameter.

```javascript
const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

**Parameters**

* `model` ` string `required

  * The model to run.

**Supported options**

  * `stream` ` boolean `optional
    * Returns a stream of results as they are available.

```javascript
const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "What is the origin of the phrase 'Hello, World'",
    stream: true
});

return new Response(answer, {
    headers: { "content-type": "text/event-stream" }
});
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/bindings/#page","headline":"Workers Bindings · Cloudflare Workers AI docs","description":"Create an AI binding to connect your Cloudflare Worker to Workers AI.","url":"https://developers.cloudflare.com/workers-ai/configuration/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
