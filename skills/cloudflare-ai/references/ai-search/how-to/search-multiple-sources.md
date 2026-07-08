---
title: Search multiple sources at once
description: Search a shared knowledge base and a tenant-specific one in a single query, and identify which instance each result came from.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Search multiple sources at once

AI Search can query several instances in one request, merge the results, and tag each result with the instance it came from. This guide uses that to search two knowledge bases together: a shared **general** knowledge base that every user can search, plus a **tenant-specific** knowledge base that holds one customer's private content. A single query returns relevant content from both.

Keeping each tenant's content in its own instance is the recommended way to isolate tenants (refer to [Multi-tenant search isolation](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/)). Searching across instances then lets you combine a tenant's instance with shared content at query time, so you do not have to copy the shared content into every tenant's instance.

**What you will build:** A Worker that searches a shared `general-knowledge` instance and a per-tenant instance together, then groups the results by their source.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

The instances you search across must belong to the same [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/). This guide creates them for you.

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `multi-source-search` by running:

 npm  yarn  pnpm

```
npm create cloudflare@latest -- multi-source-search
```

```
yarn create cloudflare multi-source-search
```

```
pnpm create cloudflare@latest multi-source-search
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd multi-source-search
```

## 2\. Configure Wrangler

Add an [AI Search namespace binding](https://developers.cloudflare.com/ai-search/concepts/namespaces/) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). Searching across instances is a method on the namespace binding, so a single binding can reach every instance in the namespace.

* [  wrangler.jsonc ](#tab-panel-6991)
* [  wrangler.toml ](#tab-panel-6992)

**JSONC**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "multi-source-search",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-08",
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
name = "multi-source-search"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-08"


[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

The `remote` option lets `wrangler dev` proxy requests to your deployed instances, since AI Search does not run locally.

## 3\. Add the Worker code

Update `src/index.ts`. This Worker identifies the tenant from a request header, then searches the shared instance and that tenant's instance in one call. Each returned chunk carries an `instance_id`, so the Worker can group results by source.

* [  JavaScript ](#tab-panel-6993)
* [  TypeScript ](#tab-panel-6994)

**src/index.js**

```js
// The shared instance that every tenant can search.
const GENERAL_INSTANCE = "general-knowledge";
// Each tenant also has its own instance, holding only that tenant's content.
const tenantInstance = (tenantId) => `tenant-${tenantId}`;


// Seed content, so each instance returns something on the first query. In a
// real app you would provision instances and their content ahead of time.
const GENERAL_DOC = `# Support hours
Support is available Monday to Friday, 9am to 5pm UTC for all customers.`;
const TENANT_DOC = `# Your plan
This account is on the Enterprise plan with a dedicated success manager.`;


export default {
  async fetch(request, env) {
    // Identify the tenant and read the query.
    const tenantId = request.headers.get("x-tenant-id");
    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }
    const query = new URL(request.url).searchParams.get("q");
    if (!query) {
      return new Response("Add a ?q= query parameter", { status: 400 });
    }


    // One-time setup for this demo: create both instances and seed each.
    await ensureInstance(
      env,
      GENERAL_INSTANCE,
      "support-hours.md",
      GENERAL_DOC,
    );
    await ensureInstance(env, tenantInstance(tenantId), "plan.md", TENANT_DOC);


    // Search the shared instance and this tenant's instance in one call.
    // AI Search fans out to both, merges the results, and tags each chunk
    // with the instance_id it came from. You can pass 1 to 10 instance IDs.
    const results = await env.AI_SEARCH.search({
      query,
      ai_search_options: {
        instance_ids: [GENERAL_INSTANCE, tenantInstance(tenantId)],
      },
    });


    // Use the instance_id tag to separate shared results from tenant results.
    const fromGeneral = results.chunks.filter(
      (chunk) => chunk.instance_id === GENERAL_INSTANCE,
    );
    const fromTenant = results.chunks.filter(
      (chunk) => chunk.instance_id === tenantInstance(tenantId),
    );


    return Response.json({
      query: results.search_query,
      general: fromGeneral.map((chunk) => ({
        key: chunk.item.key,
        text: chunk.text,
      })),
      tenant: fromTenant.map((chunk) => ({
        key: chunk.item.key,
        text: chunk.text,
      })),
      // If one instance fails, the other still returns. Failures land here.
      errors: results.errors,
    });
  },
};


// Create an instance with built-in storage and seed one document. Safe to call
// on every request: create() throws if the instance already exists, so the
// try/catch skips setup once it is in place.
async function ensureInstance(env, id, key, content) {
  try {
    await env.AI_SEARCH.create({ id });
    await env.AI_SEARCH.get(id).items.uploadAndPoll(key, content, {
      timeoutMs: 60_000,
    });
  } catch {
    // The instance already exists and has been seeded.
  }
}
```

**src/index.ts**

```ts
export interface Env {
  AI_SEARCH: AiSearchNamespace;
}


// The shared instance that every tenant can search.
const GENERAL_INSTANCE = "general-knowledge";
// Each tenant also has its own instance, holding only that tenant's content.
const tenantInstance = (tenantId: string) => `tenant-${tenantId}`;


// Seed content, so each instance returns something on the first query. In a
// real app you would provision instances and their content ahead of time.
const GENERAL_DOC = `# Support hours
Support is available Monday to Friday, 9am to 5pm UTC for all customers.`;
const TENANT_DOC = `# Your plan
This account is on the Enterprise plan with a dedicated success manager.`;


export default {
  async fetch(request, env): Promise<Response> {
    // Identify the tenant and read the query.
    const tenantId = request.headers.get("x-tenant-id");
    if (!tenantId) {
      return new Response("Missing x-tenant-id header", { status: 400 });
    }
    const query = new URL(request.url).searchParams.get("q");
    if (!query) {
      return new Response("Add a ?q= query parameter", { status: 400 });
    }


    // One-time setup for this demo: create both instances and seed each.
    await ensureInstance(
      env,
      GENERAL_INSTANCE,
      "support-hours.md",
      GENERAL_DOC,
    );
    await ensureInstance(env, tenantInstance(tenantId), "plan.md", TENANT_DOC);


    // Search the shared instance and this tenant's instance in one call.
    // AI Search fans out to both, merges the results, and tags each chunk
    // with the instance_id it came from. You can pass 1 to 10 instance IDs.
    const results = await env.AI_SEARCH.search({
      query,
      ai_search_options: {
        instance_ids: [GENERAL_INSTANCE, tenantInstance(tenantId)],
      },
    });


    // Use the instance_id tag to separate shared results from tenant results.
    const fromGeneral = results.chunks.filter(
      (chunk) => chunk.instance_id === GENERAL_INSTANCE,
    );
    const fromTenant = results.chunks.filter(
      (chunk) => chunk.instance_id === tenantInstance(tenantId),
    );


    return Response.json({
      query: results.search_query,
      general: fromGeneral.map((chunk) => ({
        key: chunk.item.key,
        text: chunk.text,
      })),
      tenant: fromTenant.map((chunk) => ({
        key: chunk.item.key,
        text: chunk.text,
      })),
      // If one instance fails, the other still returns. Failures land here.
      errors: results.errors,
    });
  },
} satisfies ExportedHandler<Env>;


// Create an instance with built-in storage and seed one document. Safe to call
// on every request: create() throws if the instance already exists, so the
// try/catch skips setup once it is in place.
async function ensureInstance(
  env: Env,
  id: string,
  key: string,
  content: string,
) {
  try {
    await env.AI_SEARCH.create({ id });
    await env.AI_SEARCH.get(id).items.uploadAndPoll(key, content, {
      timeoutMs: 60_000,
    });
  } catch {
    // The instance already exists and has been seeded.
  }
}
```

`env.AI_SEARCH.search()` is the namespace-level search. It differs from `env.AI_SEARCH.get(id).search()`, which searches a single instance. Passing `instance_ids` fans the query out across those instances and returns one merged, ranked list of chunks. Because every chunk includes an `instance_id`, you always know whether a result came from the shared instance or the tenant's instance.

If one instance fails, for example because the ID does not exist, the others still return, and the failure is reported in `errors` instead of throwing. This makes a missing tenant instance a partial result rather than a hard error.

## 4\. Run it

Start a local development server:

```sh
npx wrangler dev
```

Send a request with a tenant header and a query. The first request takes a moment because it creates and seeds the instances:

```sh
curl "http://localhost:8787/?q=support+hours+and+my+plan" -H "x-tenant-id: acme"
```

The response separates results from the shared instance and the tenant instance:

```json
{
  "query": "support hours and my plan",
  "general": [
    {
      "key": "support-hours.md",
      "text": "# Support hours\nSupport is available..."
    }
  ],
  "tenant": [
    {
      "key": "plan.md",
      "text": "# Your plan\nThis account is on the Enterprise plan..."
    }
  ]
}
```

When every instance succeeds, the response has no `errors` field. If an instance fails, an `errors` array lists the failures while the other instances' results are still returned.

## 5\. Generate an answer over both instances

To return a single written answer grounded in both instances instead of raw chunks, use `chatCompletions` with the same `instance_ids`. It retrieves from every listed instance, then generates one response from the combined context:

**TypeScript**

```ts
const completion = await env.AI_SEARCH.chatCompletions({
  query,
  ai_search_options: {
    instance_ids: [GENERAL_INSTANCE, tenantInstance(tenantId)],
  },
});


// The generated answer, grounded in both the shared and tenant content.
const answer = completion.choices[0]?.message.content;
```

The response also includes the retrieved `chunks` (each tagged with its `instance_id`) so you can cite sources, and an `errors` array for any instance that failed.

## 6\. Deploy

Log in with your Cloudflare account, then deploy your Worker:

```sh
npx wrangler login
npx wrangler deploy
```

## Next steps

[ Multi-tenant search isolation ](https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/) Give each tenant its own instance, or share one instance with metadata filtering.

[ Namespaces ](https://developers.cloudflare.com/ai-search/concepts/namespaces/) How instances are grouped, and how the namespace binding addresses them.

[ Search Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) Full reference for single-instance and multi-instance search and chat.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/#page","headline":"Search multiple sources at once · Cloudflare AI Search docs","description":"Search a shared knowledge base and a tenant-specific one in a single query, and identify which instance each result came from.","url":"https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/search-multiple-sources/","name":"Search multiple sources at once"}}]}
```
