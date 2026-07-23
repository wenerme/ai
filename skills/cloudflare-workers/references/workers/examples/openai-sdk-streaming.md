---
description: Use the OpenAI v4 SDK to stream responses from OpenAI.
title: Stream OpenAI API Responses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream OpenAI API Responses

Use the OpenAI v4 SDK to stream responses from OpenAI.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/openai-sdk-streaming/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/openai-sdk-streaming)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

In order to run this code, you must install the OpenAI SDK by running `npm i openai`.

Note

For analytics, caching, rate limiting, and more, you can also send requests like this through Cloudflare's [AI Gateway](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/).

```ts
import OpenAI from "openai";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});

		// Create a TransformStream to handle streaming data
		let { readable, writable } = new TransformStream();
		let writer = writable.getWriter();
		const textEncoder = new TextEncoder();

		ctx.waitUntil(
			(async () => {
				const stream = await openai.chat.completions.create({
					model: "gpt-4o-mini",
					messages: [{ role: "user", content: "Tell me a story" }],
					stream: true,
				});

				// loop over the data as it is streamed and write to the writeable
				for await (const part of stream) {
					writer.write(
						textEncoder.encode(part.choices[0]?.delta?.content || ""),
					);
				}
				writer.close();
			})(),
		);

		// Send the readable back to the browser
		return new Response(readable);
	},
} satisfies ExportedHandler<Env>;
```

```ts
import { Hono } from "hono";
import { streamText } from "hono/streaming";
import OpenAI from "openai";

interface Env {
	OPENAI_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get("*", async (c) => {
	const openai = new OpenAI({
		apiKey: c.env.OPENAI_API_KEY,
	});

	const chatStream = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [{ role: "user", content: "Tell me a story" }],
		stream: true,
	});

	return streamText(c, async (stream) => {
		for await (const message of chatStream) {
			await stream.write(message.choices[0].delta.content || "");
		}
		stream.close();
	});
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/openai-sdk-streaming/#page","headline":"Stream OpenAI API Responses · Cloudflare Workers docs","description":"Use the OpenAI v4 SDK to stream responses from OpenAI.","url":"https://developers.cloudflare.com/workers/examples/openai-sdk-streaming/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","JavaScript","TypeScript"]}
```
