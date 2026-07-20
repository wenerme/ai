---
title: Create a simple search engine
description: Build a simple search engine using the AI Search Workers binding and the search method.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Create a simple search engine

This guide builds a search engine that returns the file names matching a query, using the `search()` method on the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/). You can adapt it to use the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/) instead.

For the best results with this pattern:

* Disable query rewriting so the original user query is matched directly.
* Configure your AI Search instance with small chunk sizes (256 tokens is usually enough).

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need an AI Search instance that already contains indexed content. To create one and add content, refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/).

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `search-engine` by running:

 npm  yarn  pnpm

```
npm create cloudflare@latest -- search-engine
```

```
yarn create cloudflare search-engine
```

```
pnpm create cloudflare@latest search-engine
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd search-engine
```

## 2\. Bind your Worker to AI Search

Add the following to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-7263)
* [  wrangler.toml ](#tab-panel-7264)

**JSONC**

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

**TOML**

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

This binds the `default` [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) to `env.AI_SEARCH`. The `remote` option lets `wrangler dev` proxy requests to your deployed instance, since AI Search does not run locally.

## 3\. Add the search code

Update `src/index.ts`. This Worker reads a query from the URL, searches your instance, and returns the file name of each matching chunk. Replace `my-instance` with the name of your instance.

* [  JavaScript ](#tab-panel-7265)
* [  TypeScript ](#tab-panel-7266)

**src/index.js**

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    const searchResult = await env.AI_SEARCH.get("my-instance").search({
      messages: [{ role: "user", content: userQuery }],
    });


    return Response.json({
      files: searchResult.chunks.map((chunk) => chunk.item.key),
    });
  },
};
```

**src/index.ts**

```ts
export interface Env {
  AI_SEARCH: AiSearchNamespace;
}


export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    const searchResult = await env.AI_SEARCH.get("my-instance").search({
      messages: [{ role: "user", content: userQuery }],
    });


    return Response.json({
      files: searchResult.chunks.map((chunk) => chunk.item.key),
    });
  },
} satisfies ExportedHandler<Env>;
```

## 4\. Run and deploy

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

[ Search Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) Full reference for searching and chatting from a Worker.

[ Query rewriting ](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/) Control whether AI Search rewrites the query before searching.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/simple-search-engine/#page","headline":"Create a simple search engine · Cloudflare AI Search docs","description":"Build a simple search engine using the AI Search Workers binding and the search method.","url":"https://developers.cloudflare.com/ai-search/how-to/simple-search-engine/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/simple-search-engine/","name":"Create a simple search engine"}}]}
```
