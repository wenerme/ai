---
description: Use the Browser Run /content endpoint to fetch a single web page's rendered HTML, then upload it to an AI Search instance's built-in storage so AI Search indexes it for search.
title: Fetch and index single web pages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch and index single web pages

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide builds a Worker that fetches a single web page's rendered HTML with the [Browser Run](https://developers.cloudflare.com/browser-run/) [/content endpoint](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/) and uploads it to an [AI Search](https://developers.cloudflare.com/ai-search/) instance's [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) using the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/). AI Search then indexes the page so it is searchable, the same as any other uploaded document. The Worker also exposes a `/search` endpoint that queries the indexed pages, so one service both indexes and searches.

## When to use this pattern

Use this pattern to index one page, or a small hand-picked set of pages, on demand. To crawl and continuously index an entire site, use the AI Search [website data source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) instead.

Both Browser Run and the AI Search instance are reached through bindings, so a single Worker can fetch a page and index it without a public endpoint in between.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need an AI Search instance to upload to. To create one, refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/). This guide uploads to the instance's built-in storage, so the instance does not need an external data source.

## 1\. Create a Worker project

Create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `fetch-and-index` by running:

npmyarnpnpm

```
npm create cloudflare@latest -- fetch-and-index
```

```
yarn create cloudflare fetch-and-index
```

```
pnpm create cloudflare@latest fetch-and-index
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your application directory:

```sh
cd fetch-and-index
```

## 2\. Configure Wrangler

Add both bindings to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/): a [browser binding](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings) for Browser Run and an [AI Search namespace binding](https://developers.cloudflare.com/ai-search/api/items/workers-binding/) for uploads. The `/content` endpoint runs through the browser binding, so you do not need to install Puppeteer or any other package.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "fetch-and-index",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-08-25",
  "browser": {
    "binding": "BROWSER",
    "remote": true
  },
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
name = "fetch-and-index"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-25"

[browser]
binding = "BROWSER"
remote = true

[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

The browser binding's `quickAction` method requires a compatibility date of `2026-03-24` or later, and is not supported in local development without remote mode. Setting `remote = true` on the browser binding enables remote mode for `wrangler dev`. The `remote` option on the AI Search binding proxies uploads to your deployed instance, since AI Search does not run locally.

## 3\. Add the Worker code

Update `src/index.ts`. This Worker has two routes: a request with a `?url=` parameter fetches that page's rendered HTML and indexes it, and a request to `/search?q=` queries the indexed content. Replace `my-instance` with the name of your instance.

```js
// The instance that indexes the fetched page.
const INSTANCE_ID = "my-instance";

// Build a stable item key that ends in .html, so AI Search converts the HTML
// to Markdown before indexing it.
function itemKey(pageUrl) {
	const slug = `${pageUrl.hostname}${pageUrl.pathname}`
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return `${slug || "index"}.html`;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Search route: query the indexed content and return the matching chunks.
		if (url.pathname === "/search") {
			const query = url.searchParams.get("q");
			if (!query) {
				return new Response("Add a ?q= query parameter", { status: 400 });
			}
			const results = await env.AI_SEARCH.get(INSTANCE_ID).search({ query });
			return Response.json({
				query: results.search_query,
				results: results.chunks.map((chunk) => ({
					key: chunk.item.key,
					score: chunk.score,
					text: chunk.text,
				})),
			});
		}

		// Index route: fetch a URL's rendered HTML and index it.
		const target = url.searchParams.get("url");
		if (!target) {
			return new Response(
				"Add a ?url= parameter to index a page, or use /search?q= to search",
				{ status: 400 },
			);
		}

		const pageUrl = new URL(target);

		// Fetch the fully rendered HTML with the Browser Run /content endpoint.
		// networkidle2 waits until the page has no more than two network
		// connections for at least 500 ms, giving client-side JavaScript time
		// to render the content.
		const response = await env.BROWSER.quickAction("content", {
			url: pageUrl.toString(),
			gotoOptions: {
				waitUntil: "networkidle2",
				timeout: 30000,
			},
		});

		if (!response.ok) {
			const detail = (await response.text()).slice(0, 500);
			return new Response(
				`Browser Run failed with ${response.status}: ${detail}`,
				{ status: 502 },
			);
		}

		// The /content endpoint returns a JSON envelope with the rendered HTML
		// in the result field.
		const data = await response.json();

		if (!data.success || typeof data.result !== "string") {
			return new Response("Browser Run returned an unsuccessful response", {
				status: 502,
			});
		}

		const html = data.result;

		// Upload the rendered HTML to built-in storage. uploadAndPoll waits until
		// the page is indexed and searchable.
		const item = await env.AI_SEARCH.get(INSTANCE_ID).items.uploadAndPoll(
			itemKey(pageUrl),
			html,
			{ timeoutMs: 60_000 },
		);

		return Response.json({ key: item.key, status: item.status });
	},
};
```

```ts
export interface Env {
	BROWSER: BrowserRun;
	AI_SEARCH: AiSearchNamespace;
}

// The instance that indexes the fetched page.
const INSTANCE_ID = "my-instance";

// Build a stable item key that ends in .html, so AI Search converts the HTML
// to Markdown before indexing it.
function itemKey(pageUrl: URL): string {
	const slug = `${pageUrl.hostname}${pageUrl.pathname}`
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return `${slug || "index"}.html`;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		// Search route: query the indexed content and return the matching chunks.
		if (url.pathname === "/search") {
			const query = url.searchParams.get("q");
			if (!query) {
				return new Response("Add a ?q= query parameter", { status: 400 });
			}
			const results = await env.AI_SEARCH.get(INSTANCE_ID).search({ query });
			return Response.json({
				query: results.search_query,
				results: results.chunks.map((chunk) => ({
					key: chunk.item.key,
					score: chunk.score,
					text: chunk.text,
				})),
			});
		}

		// Index route: fetch a URL's rendered HTML and index it.
		const target = url.searchParams.get("url");
		if (!target) {
			return new Response(
				"Add a ?url= parameter to index a page, or use /search?q= to search",
				{ status: 400 },
			);
		}

		const pageUrl = new URL(target);

		// Fetch the fully rendered HTML with the Browser Run /content endpoint.
		// networkidle2 waits until the page has no more than two network
		// connections for at least 500 ms, giving client-side JavaScript time
		// to render the content.
		const response = await env.BROWSER.quickAction("content", {
			url: pageUrl.toString(),
			gotoOptions: {
				waitUntil: "networkidle2",
				timeout: 30000,
			},
		});

		if (!response.ok) {
			const detail = (await response.text()).slice(0, 500);
			return new Response(
				`Browser Run failed with ${response.status}: ${detail}`,
				{ status: 502 },
			);
		}

		// The /content endpoint returns a JSON envelope with the rendered HTML
		// in the result field.
		const data = (await response.json()) as {
			success: boolean;
			result?: string;
		};

		if (!data.success || typeof data.result !== "string") {
			return new Response("Browser Run returned an unsuccessful response", {
				status: 502,
			});
		}

		const html = data.result;

		// Upload the rendered HTML to built-in storage. uploadAndPoll waits until
		// the page is indexed and searchable.
		const item = await env.AI_SEARCH.get(INSTANCE_ID).items.uploadAndPoll(
			itemKey(pageUrl),
			html,
			{ timeoutMs: 60_000 },
		);

		return Response.json({ key: item.key, status: item.status });
	},
} satisfies ExportedHandler<Env>;
```

The `.html` item key tells AI Search to run the content through [Markdown conversion](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/), which strips boilerplate such as the header and footer before indexing.

Caution

Fetch only URLs you trust. A Worker that fetches arbitrary user-supplied URLs can become an open proxy. Consider restricting the accepted hostnames to an allowlist. Uploaded content is also limited to 4 MB per item.

## 4\. Attach metadata for filtering

This step is optional. Because this Worker controls the upload, you can enrich each page with structured [metadata](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/), such as its title and section, and then [filter searches](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) by those fields. This is something the built-in crawler cannot do on its own.

First, define the custom metadata fields on your instance. If you are creating the instance now, pass them to `create`:

```sh
npx wrangler ai-search create my-instance --type builtin --custom-metadata title:text --custom-metadata section:text
```

To add fields to an existing instance, use the dashboard under **Settings**, or the [update()](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/#update) binding method. An instance supports up to five custom fields, and each field can be a `text`, `number`, `boolean`, or `datetime` type. Changing the schema re-indexes existing documents.

Next, use the Browser Run [/json endpoint](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/) to extract those fields from the same page. It runs through the same browser binding and returns structured JSON that matches a schema you provide. In the `fetch` handler from step 3, after you have the rendered `html` and before the upload, add:

```ts
// Extract structured metadata from the page with the /json endpoint.
// response_format constrains the model to the fields you defined above.
// Treat extraction as best-effort: if it fails, index the page without metadata.
const metadata: Record<string, string> = {};
try {
	const jsonResponse = await env.BROWSER.quickAction("json", {
		url: pageUrl.toString(),
		prompt: "Extract the page title and its top-level section.",
		response_format: {
			type: "json_schema",
			json_schema: {
				type: "object",
				properties: {
					title: { type: "string" },
					section: { type: "string" },
				},
				required: ["title"],
			},
		},
	});

	const extracted = (await jsonResponse.json()) as {
		result?: Record<string, unknown>;
	};

	// Metadata values must be strings, so coerce each value and drop empty ones.
	for (const [key, value] of Object.entries(extracted.result ?? {})) {
		if (value) metadata[key] = String(value);
	}
} catch {
	// Ignore extraction errors and index the page without metadata.
}
```

Then pass `metadata` in the upload options:

```ts
const item = await env.AI_SEARCH.get(INSTANCE_ID).items.uploadAndPoll(
	itemKey(pageUrl),
	html,
	{ timeoutMs: 60_000, metadata },
);
```

Once indexed, you can restrict queries to pages in a given section, for example. Refer to [Filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) for the query syntax.

## 5\. Run and deploy

Start a local development server. Because `remote = true` is set on the browser binding, `wrangler dev` runs the `/content` endpoint in remote mode:

```sh
npx wrangler dev
```

Index a page by passing its URL:

```sh
curl "http://localhost:8787/?url=https://example.com/"
```

The response contains the item key and its status (`completed` once indexed):

```json
{ "key": "example-com.html", "status": "completed" }
```

Then query the indexed content through the same Worker's `/search` endpoint:

```sh
curl "http://localhost:8787/search?q=what+is+this+domain+for"
```

```json
{
	"query": "what is this domain for",
	"results": [
		{
			"key": "example-com.html",
			"score": 0.75,
			"text": "# Example Domain\nThis domain is for use in documentation examples..."
		}
	]
}
```

Log in with your Cloudflare account, then deploy your Worker to make it accessible on the Internet:

```sh
npx wrangler login
npx wrangler deploy
```

## Next steps

### [Browser Run /content endpoint](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/)

Fetch the fully rendered HTML of a page after JavaScript runs, with options for load behavior and blocking.

### [Items Workers binding](https://developers.cloudflare.com/ai-search/api/items/workers-binding/)

Full reference for uploading, listing, and deleting documents in built-in storage.

### [Website data source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/)

Crawl and index a domain you own automatically, following its sitemap.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/#page","headline":"Fetch and index single web pages · Cloudflare AI Search docs","description":"Use the Browser Run /content endpoint to fetch a single web page's rendered HTML, then upload it to an AI Search instance's built-in storage so AI Search indexes it for search.","url":"https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
