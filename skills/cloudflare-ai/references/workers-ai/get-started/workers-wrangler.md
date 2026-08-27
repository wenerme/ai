---
description: Deploy your first Cloudflare Workers AI project using the CLI.
title: Workers Bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers Bindings

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide will instruct you through setting up and deploying your first Workers AI project. You will use [Workers](https://developers.cloudflare.com/workers/), a Workers AI binding, and a large language model (LLM) to deploy your first AI-powered application on the Cloudflare global network.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

You will create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `hello-ai` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- hello-ai
```

```
yarn create cloudflare hello-ai
```

```
pnpm create cloudflare@latest hello-ai
```

Running `npm create cloudflare@latest` will prompt you to install the [create-cloudflare package ↗](https://www.npmjs.com/package/create-cloudflare), and lead you through setup. C3 will also install [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the Cloudflare Developer Platform CLI.

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new `hello-ai` directory. Your new `hello-ai` directory will include:

* A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file.

Go to your application directory:

```sh
cd hello-ai
```

## 2\. Connect your Worker to Workers AI

You must create an AI binding for your Worker to connect to Workers AI. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform.

To bind Workers AI to your Worker, add the following to the end of your Wrangler file:

```jsonc
{
	"ai": {
		"binding": "AI"
	}
}
```

```toml
[ai]
binding = "AI"
```

Your binding is [available in your Worker code](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#bindings-in-es-modules-format) on [env.AI](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/).

You can also bind Workers AI to a Pages Function. For more information, refer to [Functions Bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai).

## 3\. Run an inference task in your Worker

You are now ready to run an inference task in your Worker. In this case, you will use an LLM, [gemma-4-26b-a4b-it](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/), to answer a question.

Update the `index.ts` file in your `hello-ai` application directory with the following code:

```js
export default {
	async fetch(request, env) {
		const response = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
			messages: [
				{
					role: "system",
					content: "You are a helpful assistant.",
				},
				{
					role: "user",
					content: "What is the origin of the phrase Hello, World",
				},
			],
			chat_template_kwargs: {
				enable_thinking: false,
			},
		});

		return Response.json(response);
	},
};
```

```ts
export interface Env {
	// If you set another name in the Wrangler config file as the value for 'binding',
	// replace "AI" with the variable name you defined.
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
			messages: [
				{
					role: "system",
					content: "You are a helpful assistant.",
				},
				{
					role: "user",
					content: "What is the origin of the phrase Hello, World",
				},
			],
			chat_template_kwargs: {
				enable_thinking: false,
			},
		});

		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

Up to this point, you have created an AI binding for your Worker and configured your Worker to execute the Gemma 4 26B A4B model with reasoning disabled. You can now test your project locally before you deploy globally.

## 4\. Develop locally with Wrangler

While in your project directory, test Workers AI locally by running [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev):

```sh
npx wrangler dev
```

Workers AI local development usage charges

Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

You will be prompted to log in after you run `wrangler dev`. When you run `npx wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you go to the URL Wrangler provides, the response will have a shape similar to the following example:

```json
{
	"id": "<generated id>",
	"object": "chat.completion",
	"created": 0,
	"model": "@cf/google/gemma-4-26b-a4b-it",
	"choices": [
		{
			"index": 0,
			"message": {
				"role": "assistant",
				"content": "<generated response>",
				"refusal": null
			},
			"finish_reason": "stop",
			"logprobs": null
		}
	]
}
```

## 5\. Deploy your AI Worker

Before deploying your AI Worker globally, log in with your Cloudflare account by running:

```sh
npx wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
npx wrangler deploy
```

```sh
https://hello-ai.<YOUR_SUBDOMAIN>.workers.dev
```

Your Worker will be deployed to your custom [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) subdomain. You can now visit the URL to run your AI Worker.

By finishing this tutorial, you have created a Worker, connected it to Workers AI through an AI binding, and run an inference task using the Gemma 4 26B A4B model.

## Related resources

* [Cloudflare Developers community on Discord ↗](https://discord.cloudflare.com) \- Submit feature requests, report bugs, and share your feedback directly with the Cloudflare team by joining the Cloudflare Discord server.
* [Models](https://developers.cloudflare.com/workers-ai/models/) \- Browse the Workers AI models catalog.
* [AI SDK](https://developers.cloudflare.com/workers-ai/configuration/ai-sdk) \- Learn how to integrate with an AI model.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/#page","headline":"Get started - Workers and Wrangler · Cloudflare Workers AI docs","description":"Deploy your first Cloudflare Workers AI project using the CLI.","url":"https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
