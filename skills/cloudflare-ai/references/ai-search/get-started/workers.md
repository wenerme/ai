---
description: Create, populate, and query an AI Search instance from a Cloudflare Worker.
title: Workers binding
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers binding

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/get-started/workers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide walks you through creating and querying an AI Search instance from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the Workers Binding. The Workers Binding uses a runtime [API](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) that runs inside a Worker and calls AI Search without managing API tokens.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `ai-search-tutorial` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- ai-search-tutorial
```

```
yarn create cloudflare ai-search-tutorial
```

```
pnpm create cloudflare@latest ai-search-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd ai-search-tutorial
```

## 2\. Connect your Worker to AI Search

Create a binding between your Worker and your AI Search instance. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Worker to interact with resources on the Cloudflare Developer Platform.

Add the following to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

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

This binds the `default` namespace to `env.AI_SEARCH`. Instances that you create without specifying a namespace belong to the `default` namespace. The `remote` option lets `wrangler dev` proxy requests to your deployed instance, since AI Search does not run locally. For all binding options, refer to the [Workers binding reference](https://developers.cloudflare.com/ai-search/api/search/workers-binding/).

## 3\. Create and query AI Search from your Worker

Update the `src/index.ts` file in your `ai-search-tutorial` directory with the following code. It exposes two routes: `/setup` creates an instance named `my-instance` and indexes a sample document, and the default route queries it.

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Visit /setup once to create an instance and index a sample document.
		if (url.pathname === "/setup") {
			const instance = await env.AI_SEARCH.create({ id: "my-instance" });
			const item = await instance.items.uploadAndPoll(
				"getting-started.md",
				"AI Search indexes uploaded content for retrieval.",
			);
			return Response.json({ created: "my-instance", status: item.status });
		}

		// Query the instance.
		const query = url.searchParams.get("q") ?? "What does AI Search do?";

		const results = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: query }],
			ai_search_options: {
				retrieval: { max_num_results: 3 },
			},
		});

		return Response.json(results.chunks);
	},
};
```

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		// Visit /setup once to create an instance and index a sample document.
		if (url.pathname === "/setup") {
			const instance = await env.AI_SEARCH.create({ id: "my-instance" });
			const item = await instance.items.uploadAndPoll(
				"getting-started.md",
				"AI Search indexes uploaded content for retrieval.",
			);
			return Response.json({ created: "my-instance", status: item.status });
		}

		// Query the instance.
		const query = url.searchParams.get("q") ?? "What does AI Search do?";

		const results = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: query }],
			ai_search_options: {
				retrieval: { max_num_results: 3 },
			},
		});

		return Response.json(results.chunks);
	},
} satisfies ExportedHandler<Env>;
```

## 4\. Develop locally

Start a local development server:

```sh
npx wrangler dev
```

Wrangler gives you a URL (usually `localhost:8787`). Visit `/setup` once to create your instance and index the sample document, then query it at `/?q=your+search+terms`.

## 5\. Deploy your Worker

Log in with your Cloudflare account:

```sh
npx wrangler login
```

Deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler deploy
```

```txt
https://ai-search-tutorial.<YOUR_SUBDOMAIN>.workers.dev
```

## Next steps

### [Search Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Full reference for searching and chatting from a Worker.

### [Items Workers binding](https://developers.cloudflare.com/ai-search/api/items/workers-binding/)

Upload, list, and manage documents from a Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/get-started/workers/#page","headline":"Workers binding · Cloudflare AI Search docs","description":"Create, populate, and query an AI Search instance from a Cloudflare Worker.","url":"https://developers.cloudflare.com/ai-search/get-started/workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
