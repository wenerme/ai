---
title: Multi-tenant search isolation
description: Keep each tenant's data isolated in AI Search using a separate instance per tenant or a shared instance with metadata filtering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Multi-tenant search isolation

In a multi-tenant application, each tenant must only ever see their own data. AI Search supports two ways to isolate search per tenant: give each tenant its own instance, or share one instance and filter by tenant at query time.

## Choose an approach

| Approach                                                                            | How it isolates                                                      | Choose it when                                                         |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Instance per tenant](#option-1-one-instance-per-tenant) (recommended)              | Each tenant gets a separate instance with its own storage and index  | You need strong isolation, or you create and delete tenants at runtime |
| [Shared instance with filtering](#option-2-shared-instance-with-metadata-filtering) | One instance holds every tenant; a metadata filter scopes each query | You have many small tenants and want the simplest setup                |

## Prerequisites

Both approaches use a Cloudflare Worker. Create the project first, then follow the option you chose.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `tenant-search` by running:

 npm  yarn  pnpm

```
npm create cloudflare@latest -- tenant-search
```

```
yarn create cloudflare tenant-search
```

```
pnpm create cloudflare@latest tenant-search
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd tenant-search
```

## Option 1: One instance per tenant

This is the **recommended** approach. Each tenant gets a separate instance with its own storage and search index, so one tenant can never retrieve another tenant's documents.

Create an isolated AI Search instance for each tenant at runtime using the [namespace binding](https://developers.cloudflare.com/ai-search/concepts/namespaces/).

Note

AI Search limits the number of [instances per account](https://developers.cloudflare.com/ai-search/platform/limits-pricing/#limits). If you have more tenants than that limit, request an increase with the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8).

Add the namespace binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-6983)
* [  wrangler.toml ](#tab-panel-6984)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "TENANTS",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

**TOML**

```toml
[[ai_search_namespaces]]
binding = "TENANTS"
namespace = "default"
remote = true
```

The `remote` option lets `wrangler dev` proxy requests to your deployed instances, since AI Search does not run locally.

Update `src/index.ts`. This Worker identifies the tenant from a request header, then creates, populates, searches, and deletes that tenant's instance.

* [  JavaScript ](#tab-panel-6989)
* [  TypeScript ](#tab-panel-6990)

**src/index.js**

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);


    // Identify the tenant from the request header.
    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }


    // Create a new instance for the tenant.
    if (url.pathname === "/onboard" && request.method === "POST") {
      const instance = await env.TENANTS.create({
        id: `tenant-${tenantId}`,
      });
      return Response.json({ success: true, instance: await instance.info() });
    }


    // Upload a document to the tenant's instance.
    if (url.pathname === "/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file");


      const item = await env.TENANTS.get(`tenant-${tenantId}`).items.upload(
        file.name,
        await file.arrayBuffer(),
      );
      return Response.json({ success: true, item });
    }


    // Search the tenant's instance. Search is isolated to their instance.
    if (url.pathname === "/search") {
      const query = url.searchParams.get("q") || "";


      const results = await env.TENANTS.get(`tenant-${tenantId}`).search({
        messages: [{ role: "user", content: query }],
      });
      return Response.json(results);
    }


    // Delete the tenant's instance and all its data.
    if (url.pathname === "/offboard" && request.method === "DELETE") {
      await env.TENANTS.delete(`tenant-${tenantId}`);
      return Response.json({ success: true });
    }


    return new Response("Not found", { status: 404 });
  },
};
```

**src/index.ts**

```ts
export type Env = {
  TENANTS: AiSearchNamespace;
};


export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);


    // Identify the tenant from the request header.
    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }


    // Create a new instance for the tenant.
    if (url.pathname === "/onboard" && request.method === "POST") {
      const instance = await env.TENANTS.create({
        id: `tenant-${tenantId}`,
      });
      return Response.json({ success: true, instance: await instance.info() });
    }


    // Upload a document to the tenant's instance.
    if (url.pathname === "/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file") as File;


      const item = await env.TENANTS.get(`tenant-${tenantId}`).items.upload(
        file.name,
        await file.arrayBuffer(),
      );
      return Response.json({ success: true, item });
    }


    // Search the tenant's instance. Search is isolated to their instance.
    if (url.pathname === "/search") {
      const query = url.searchParams.get("q") || "";


      const results = await env.TENANTS.get(`tenant-${tenantId}`).search({
        messages: [{ role: "user", content: query }],
      });
      return Response.json(results);
    }


    // Delete the tenant's instance and all its data.
    if (url.pathname === "/offboard" && request.method === "DELETE") {
      await env.TENANTS.delete(`tenant-${tenantId}`);
      return Response.json({ success: true });
    }


    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
```

## Option 2: Shared instance with metadata filtering

Use a single AI Search instance and organize content by tenant using folder paths. This approach works with both [R2 buckets](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) and [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/). Apply [metadata filters](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) at query time so each tenant only retrieves their own documents.

This option searches an existing instance, so create one named `shared-instance` and add your content first. Refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/).

Add the instance binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-6985)
* [  wrangler.toml ](#tab-panel-6986)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search": [
    {
      "binding": "SHARED_INSTANCE",
      "instance_name": "shared-instance",
      "remote": true
    }
  ]
}
```

**TOML**

```toml
[[ai_search]]
binding = "SHARED_INSTANCE"
instance_name = "shared-instance"
remote = true
```

Organize your content by tenant using unique folder paths:

* Directorycustomer-a
  * Directorylogs/
    * …
  * Directorycontracts/
    * …
* Directorycustomer-b
  * Directorycontracts/
    * …

Update `src/index.ts` to filter by the tenant's folder at query time:

* [  JavaScript ](#tab-panel-6987)
* [  TypeScript ](#tab-panel-6988)

**src/index.js**

```js
export default {
  async fetch(request, env) {
    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }


    // Filter results to only return documents from this tenant's folder.
    const results = await env.SHARED_INSTANCE.search({
      messages: [{ role: "user", content: "When did I sign my agreement?" }],
      ai_search_options: {
        retrieval: {
          filters: {
            folder: { $gte: `${tenantId}/`, $lt: `${tenantId}0` },
          },
        },
      },
    });


    return Response.json(results);
  },
};
```

**src/index.ts**

```ts
export type Env = {
  SHARED_INSTANCE: AiSearchInstance;
};


export default {
  async fetch(request, env): Promise<Response> {
    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }


    // Filter results to only return documents from this tenant's folder.
    const results = await env.SHARED_INSTANCE.search({
      messages: [{ role: "user", content: "When did I sign my agreement?" }],
      ai_search_options: {
        retrieval: {
          filters: {
            folder: { $gte: `${tenantId}/`, $lt: `${tenantId}0` },
          },
        },
      },
    });


    return Response.json(results);
  },
} satisfies ExportedHandler<Env>;
```

This example uses a ["starts with" filter](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/#starts-with-filter-for-folders) to match all files under the tenant's folder, including subfolders.

## Run and deploy

Once you have added one of the options above, start a local development server:

```sh
npx wrangler dev
```

Log in with your Cloudflare account, then deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler login
npx wrangler deploy
```

## Next steps

[ Namespaces ](https://developers.cloudflare.com/ai-search/concepts/namespaces/) Group instances and manage them dynamically from a binding.

[ Filtering ](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) Filter search results by metadata attributes at query time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/#page","headline":"Multi-tenant search isolation · Cloudflare AI Search docs","description":"Keep each tenant's data isolated in AI Search using a separate instance per tenant or a shared instance with metadata filtering.","url":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/per-tenant-search/","name":"Multi-tenant search isolation"}}]}
```
