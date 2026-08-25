---
description: Learn how to use Cloudflare Workers AI to interact with KV storage, enabling persistent data handling with embedded function calling in a few lines of code.
title: Use KV API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Use KV API

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/kv/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Interact with persistent storage to retrieve or store information enables for powerful use cases.

In this example we show how embedded function calling can interact with other resources on the Cloudflare Developer Platform with a few lines of code.

## Pre-Requisites

For this example to work, you need to provision a [KV](https://developers.cloudflare.com/kv/) namespace first. To do so, follow the [KV - Get started ](https://developers.cloudflare.com/kv/get-started/) guide.

Importantly, your Wrangler file must be updated to include the `KV` binding definition to your respective namespace.

## Worker code

```ts
import { runWithTools } from "@cloudflare/ai-utils";

type Env = {
	AI: Ai;
	KV: KVNamespace;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const updateKvValue = async ({
			key,
			value,
		}: {
			key: string;
			value: string;
		}) => {
			const response = await env.KV.put(key, value);
			return `Successfully updated key-value pair in database: ${response}`;
		};

		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [
					{ role: "system", content: "Put user given values in KV" },
					{ role: "user", content: "Set the value of banana to yellow." },
				],
				tools: [
					{
						name: "KV update",
						description: "Update a key-value pair in the database",
						parameters: {
							type: "object",
							properties: {
								key: {
									type: "string",
									description: "The key to update",
								},
								value: {
									type: "string",
									description: "The value to update",
								},
							},
							required: ["key", "value"],
						},
						function: updateKvValue,
					},
				],
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

## Verify results

To verify the results, run the following command

```sh
npx wrangler kv key get banana --binding KV --local
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/kv/#page","headline":"Use KV API · Cloudflare Workers AI docs","description":"Learn how to use Cloudflare Workers AI to interact with KV storage, enabling persistent data handling with embedded function calling in a few lines of code.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/kv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
