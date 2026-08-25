---
description: Use AI Search for retrieval while generating responses with an external model like OpenAI.
title: Bring your own generation model
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Bring your own generation model

Last updated Jul 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, AI Search uses a Workers AI model to generate responses. To use a model outside of Workers AI, use AI Search for `search` and pass the retrieved content to a different model for generation. This guide uses an OpenAI model.

Note

AI Search supports [bringing your own models natively](https://developers.cloudflare.com/ai-search/configuration/models/). You can attach provider keys through AI Gateway and select third-party models directly in your AI Search settings. The example below still works, but the recommended approach is to configure your external model through AI Gateway.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need:

* An AI Search instance that already contains indexed content. To create one and add content, refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/).
* An [OpenAI API key ↗](https://platform.openai.com/api-keys).

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `byo-model` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- byo-model
```

```
yarn create cloudflare byo-model
```

```
pnpm create cloudflare@latest byo-model
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd byo-model
```

## 2\. Install the AI SDK and OpenAI provider

Install the [AI SDK ↗](https://sdk.vercel.ai/) and its OpenAI provider:

npmyarnpnpmbun

```
npm i ai @ai-sdk/openai
```

```
yarn add ai @ai-sdk/openai
```

```
pnpm add ai @ai-sdk/openai
```

```
bun add ai @ai-sdk/openai
```

## 3\. Bind your Worker and set your API key

Add the AI Search binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

Store your OpenAI API key as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/):

```sh
npx wrangler secret put OPENAI_API_KEY
```

For local development, add the key to a `.dev.vars` file in your project root instead:

```txt
OPENAI_API_KEY="<YOUR_OPENAI_API_KEY>"
```

## 4\. Add the code

Update `src/index.ts`. This Worker searches your instance, formats the retrieved chunks, and passes them to OpenAI to generate an answer. Replace `my-instance` with the name of your instance.

```js
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Search for documents in AI Search.
		const searchResult = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: userQuery }],
		});

		if (searchResult.chunks.length === 0) {
			return Response.json({ text: `No data found for query "${userQuery}"` });
		}

		// Join the retrieved chunks into a single string.
		const chunks = searchResult.chunks
			.map((chunk) => `<file name="${chunk.item.key}">${chunk.text}</file>`)
			.join("\n\n");

		// Send the query and retrieved content to OpenAI for the answer.
		const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });
		const generateResult = await generateText({
			model: openai("gpt-4o-mini"),
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant. Answer the user question using the provided files.",
				},
				{ role: "user", content: chunks },
				{ role: "user", content: userQuery },
			],
		});

		return Response.json({ text: generateResult.text });
	},
};
```

```ts
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export interface Env {
	AI_SEARCH: AiSearchNamespace;
	OPENAI_API_KEY: string;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Search for documents in AI Search.
		const searchResult = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: userQuery }],
		});

		if (searchResult.chunks.length === 0) {
			return Response.json({ text: `No data found for query "${userQuery}"` });
		}

		// Join the retrieved chunks into a single string.
		const chunks = searchResult.chunks
			.map((chunk) => `<file name="${chunk.item.key}">${chunk.text}</file>`)
			.join("\n\n");

		// Send the query and retrieved content to OpenAI for the answer.
		const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });
		const generateResult = await generateText({
			model: openai("gpt-4o-mini"),
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant. Answer the user question using the provided files.",
				},
				{ role: "user", content: chunks },
				{ role: "user", content: userQuery },
			],
		});

		return Response.json({ text: generateResult.text });
	},
} satisfies ExportedHandler<Env>;
```

## 5\. Run and deploy

Start a local development server, then query it at `/?query=your+search+terms`:

```sh
npx wrangler dev
```

Log in with your Cloudflare account, then deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler login
npx wrangler deploy
```

## Next steps

### [Models](https://developers.cloudflare.com/ai-search/configuration/models/)

Use third-party models natively through AI Gateway.

### [Search Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Full reference for searching and chatting from a Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/#page","headline":"Bring your own generation model · Cloudflare AI Search docs","description":"Use AI Search for retrieval while generating responses with an external model like OpenAI.","url":"https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
