---
description: Keep each tenant's data isolated in AI Search using a separate instance per tenant or a shared instance with metadata filtering.
title: Multitenancy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Multitenancy

Last updated Jul 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In a multi-tenant application, each tenant must only ever see their own data. AI Search supports two ways to isolate search per tenant: give each tenant its own instance, or share one instance and filter by tenant at query time.

## Choose an approach

| Approach                                                                                         | How it isolates                                                      | Choose it when                                                         |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Instance per tenant](#option-1-one-instance-per-tenant) (recommended)                           | Each tenant gets a separate instance with its own storage and index  | You need strong isolation, or you create and delete tenants at runtime |
| [Shared instance with filtering](#option-2-shared-instance-with-metadata-filtering-on-retrieval) | One instance holds every tenant; a metadata filter scopes each query | You have many small tenants and want the simplest setup                |

## Prerequisites

Both approaches use a Cloudflare Worker. Create the project first, then follow the option you chose.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `tenant-search` by running:

npmyarnpnpm

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

[Tenant A](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[Tenant B](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[Tenant C](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

[env.AI\_SEARCH.get(id)Worker](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

namespace: tenants

[AI Search instancetenant-a](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[AI Search instancetenant-b](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)[AI Search instancetenant-c](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)

Note

AI Search limits the number of [instances per account](https://developers.cloudflare.com/ai-search/platform/limits-pricing/#limits). If you have more tenants than that limit, or run into any other AI Search limit, reach out through the [Limit Increase Request Form ↗](https://forms.gle/wnizxrEUW33Y15CT8) and we can help.

Add the namespace binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

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

```toml
[[ai_search_namespaces]]
binding = "TENANTS"
namespace = "default"
remote = true
```

The `remote` option lets `wrangler dev` proxy requests to your deployed instances, since AI Search does not run locally.

### Built-in storage

Each tenant's instance holds documents that you upload directly to it, with no external data source.

Update `src/index.ts`. This Worker identifies the tenant from a request header, then creates, populates, searches, and deletes that tenant's instance.

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

Start a local development server:

```sh
npx wrangler dev
```

Then onboard a tenant, upload a document to their instance, search it, and offboard. The `x-tenant-id` header scopes every request to that tenant's instance:

```sh
# Create an isolated instance for tenant "acme"
curl -X POST http://localhost:8787/onboard -H "x-tenant-id: acme"

# Upload a document to acme's instance
curl -X POST http://localhost:8787/upload -H "x-tenant-id: acme" -F "file=@./handbook.pdf"

# Search acme's instance
curl "http://localhost:8787/search?q=vacation+policy" -H "x-tenant-id: acme"

# Delete acme's instance and all of its data
curl -X DELETE http://localhost:8787/offboard -H "x-tenant-id: acme"
```

AI Search indexes uploads asynchronously, so wait a moment after uploading before you search.

### R2

If your tenants' data already lives in [R2](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/), back each tenant's instance with R2 instead of uploading documents to built-in storage. Change the `/onboard` route from the [built-in storage](#built-in-storage) example to create an R2-backed instance. How you configure it depends on how the data is organized.

Note

Creating an `r2`\-backed instance from a binding requires a [service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/). Cloudflare registers one for your account automatically the first time you create an R2-backed instance through the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/) or [Wrangler](https://developers.cloudflare.com/ai-search/get-started/wrangler/), and reuses it afterward.

**A bucket per tenant:** if each tenant's data is already in its own bucket, point the instance at that whole bucket:

```ts
const instance = await env.TENANTS.create({
	id: `tenant-${tenantId}`,
	type: "r2",
	source: `tenant-${tenantId}-bucket`,
});
```

**A shared bucket:** if every tenant's data lives in one bucket, organized by folder:

* my-bucket
  * customers/
    * acme/
    * globex/

Scope each instance to that tenant's folder with [path filtering](https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/), so it only ever indexes and searches that tenant's objects:

```ts
const instance = await env.TENANTS.create({
	id: `tenant-${tenantId}`,
	type: "r2",
	source: "my-bucket",
	source_params: {
		include_items: [`/customers/${tenantId}/**`],
	},
});
```

With either layout, AI Search indexes each tenant's objects on the next [sync](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/). Add documents by writing them to R2 rather than uploading through the Worker, and keep the search and offboard routes from the built-in storage example: each instance only ever returns its own tenant's results, and deleting an instance removes its search index while leaving the R2 objects untouched.

To try it, run `npx wrangler dev` and use the same `onboard`, `search`, and `offboard` requests as [built-in storage](#built-in-storage). Skip the upload step, since AI Search indexes each tenant's objects directly from R2.

## Option 2: Shared instance with metadata filtering on retrieval

Use a single AI Search instance and organize content by tenant using folder paths. This approach works with both [R2 buckets](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) and [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/). Apply [metadata filters](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) at query time so each tenant only retrieves their own documents.

This option searches an existing instance, so create one named `shared-instance` and add your content first. Refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/).

Add the instance binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

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

```toml
[[ai_search]]
binding = "SHARED_INSTANCE"
instance_name = "shared-instance"
remote = true
```

Organize your content by tenant using unique folder paths:

* customer-a
  * logs/
  * contracts/
* customer-b
  * contracts/

Update `src/index.ts` to filter by the tenant's folder at query time:

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

Start a local development server:

```sh
npx wrangler dev
```

Send a request as each tenant. The Worker scopes the search to that tenant's folder, so the results never overlap:

```sh
curl http://localhost:8787/ -H "x-tenant-id: customer-a"
curl http://localhost:8787/ -H "x-tenant-id: customer-b"
```

## Deploy

Log in with your Cloudflare account, then deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler login
npx wrangler deploy
```

## Next steps

### [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/)

Group instances and manage them dynamically from a binding.

### [Filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/)

Filter search results by metadata attributes at query time.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/#page","headline":"Multitenancy · Cloudflare AI Search docs","description":"Keep each tenant's data isolated in AI Search using a separate instance per tenant or a shared instance with metadata filtering.","url":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
