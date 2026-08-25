---
description: Specify Queue producers to add to your environment as follows:
title: Queues
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Queues

Last updated Jan 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/core/queues/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [Queues Reference](https://developers.cloudflare.com/queues/)

## Producers

Specify Queue producers to add to your environment as follows:

```js
const mf = new Miniflare({
	queueProducers: { MY_QUEUE: "my-queue" },
	queueProducers: ["MY_QUEUE"], // If binding and queue names are the same
});
```

## Consumers

Specify Workers to consume messages from your Queues as follows:

```js
const mf = new Miniflare({
	queueConsumers: {
		"my-queue": {
			maxBatchSize: 5, // default: 5
			maxBatchTimeout: 1 /* second(s) */, // default: 1
			maxRetries: 2, // default: 2
			deadLetterQueue: "my-dead-letter-queue", // default: none
		},
	},
	queueConsumers: ["my-queue"], // If using default consumer options
});
```

## Manipulating Outside Workers

For testing, it can be valuable to interact with Queues outside a Worker. You can do this by using the `workers` option to run multiple Workers in the same instance:

```js
const mf = new Miniflare({
	workers: [
		{
			name: "a",
			modules: true,
			script: `
			export default {
				async fetch(request, env, ctx) {
					await env.QUEUE.send(await request.text());
				}
			}
			`,
			queueProducers: { QUEUE: "my-queue" },
		},
		{
			name: "b",
			modules: true,
			script: `
			export default {
				async queue(batch, env, ctx) {
					console.log(batch);
				}
			}
			`,
			queueConsumers: { "my-queue": { maxBatchTimeout: 1 } },
		},
	],
});

const queue = await mf.getQueueProducer("QUEUE", "a"); // Get from worker "a"
await queue.send("message"); // Logs "message" 1 second later
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/queues/#page","headline":"Queues · Cloudflare Workers docs","description":"Specify Queue producers to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/queues/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
