---
description: Create an AI Search instance that indexes your website, then add a search bar, chat bubble, and search modal to your React site with the UI snippet components.
title: Add search to your website
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Add search to your website

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial creates an AI Search instance that indexes your website, then adds a working search bar, chat bubble, and search modal to your site's frontend. It uses the [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/), pre-built web components that connect to your instance's public endpoint, so you add search with only a few lines of frontend code.

**What you will build:** An AI Search instance that indexes your website, and a search bar, chat bubble, and search modal added to your site's frontend that query that content.

![The AI Search modal opened over a site, showing a search input, keyboard navigation hints, and a Powered by Cloudflare AI Search label.](https://developers.cloudflare.com/_astro/ui-snippet-search-modal.nSXbvcsi_1H402.webp)

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

This tutorial adds search to an existing React app. If you are starting a new project, scaffold one first with the [React framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/), then follow the next steps. The snippets are framework-agnostic web components, so the same approach works in other frameworks or plain HTML, as shown in [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/).

## 1\. Create an AI Search instance

Create an instance with the [Wrangler CLI](https://developers.cloudflare.com/ai-search/wrangler-commands/). To index a website you own, connect it as a data source so AI Search crawls and indexes it automatically:

npmyarnpnpm

```
npx wrangler ai-search create my-search --type web-crawler --source <YOUR_DOMAIN>
```

```
yarn wrangler ai-search create my-search --type web-crawler --source <YOUR_DOMAIN>
```

```
pnpm wrangler ai-search create my-search --type web-crawler --source <YOUR_DOMAIN>
```

Replace `<YOUR_DOMAIN>` with a domain [onboarded to your Cloudflare account](https://developers.cloudflare.com/ai-search/configuration/data-source/website/). To create an instance without a data source and upload files yourself instead, run `npx wrangler ai-search create my-search --type builtin` and add content from the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/#upload-content).

Check indexing progress:

npmyarnpnpm

```
npx wrangler ai-search stats my-search
```

```
yarn wrangler ai-search stats my-search
```

```
pnpm wrangler ai-search stats my-search
```

Once indexing completes, you can test a query from the command line:

npmyarnpnpm

```
npx wrangler ai-search search my-search --query 'What is this site about?'
```

```
yarn wrangler ai-search search my-search --query 'What is this site about?'
```

```
pnpm wrangler ai-search search my-search --query 'What is this site about?'
```

## 2\. Enable the public endpoint

The UI snippets connect to your instance through its public endpoint.

1. Go to **AI Search** in the Cloudflare dashboard.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your `my-search` instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint ID from the URL, `https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/`. You will use it in the next steps.

## 3\. Install the snippet library

In your website's project, install the [AI Search UI snippet library](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/):

npmyarnpnpmbun

```
npm i @cloudflare/ai-search-snippet
```

```
yarn add @cloudflare/ai-search-snippet
```

```
pnpm add @cloudflare/ai-search-snippet
```

```
bun add @cloudflare/ai-search-snippet
```

## 4\. Add the search components

Import the snippet library in one of your components and add the tags where you want search to appear. Importing the package once registers the components with the browser. The following example adds a search bar, a floating chat bubble, and a search modal that opens with `Cmd/Ctrl+K` to the app's root component. Replace `<PUBLIC_ENDPOINT_ID>` with your public endpoint ID from step two.

```tsx
import type { CSSProperties } from "react";
import "@cloudflare/ai-search-snippet";

export default function App() {
	return (
		<div>
			<search-bar-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				placeholder="Search..."
				max-results={50}
				max-render-results={10}
				show-url="true"
				show-date="true"
			/>
			<chat-bubble-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				style={
					{
						"--search-snippet-primary-color": "#F6821F",
					} as CSSProperties
				}
			/>
			<search-modal-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				placeholder="Search documentation..."
				shortcut="k"
				show-url="true"
				show-date="true"
			/>
		</div>
	);
}
```

### Add TypeScript declarations for the custom elements

The snippet package ships type definitions for its classes, but it does not tell TypeScript that `<search-bar-snippet>` and the other tags are valid JSX elements. The Vite development server does not type-check, so the app runs without this step, but adding a declaration file keeps `.tsx` type checks and editors from reporting errors on the custom tags.

Create a declaration file such as `src/ai-search-snippet.d.ts`:

```ts
import type { HTMLAttributes } from "react";

// Register the snippet web components as valid JSX elements. The index
// signature allows their custom attributes (such as api-url and placeholder).
type SnippetElement = HTMLAttributes<HTMLElement> & {
	[attribute: string]: unknown;
};

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"search-bar-snippet": SnippetElement;
			"chat-bubble-snippet": SnippetElement;
			"search-modal-snippet": SnippetElement;
		}
	}
}
```

This types the tags loosely so any attribute is allowed. For stricter, per-component types, refer to the [React demo declarations ↗](https://github.com/cloudflare/ai-search-snippet/blob/main/apps/demo-react/index.d.ts) in the snippet repository.

## 5\. Allow your local origin

The public endpoint uses CORS to control which sites can call it. Add the origin your site runs on during local development so the browser can reach the endpoint. A Vite app runs on `http://localhost:5173`.

1. In your AI Search instance, go to **Settings** \> **Public Endpoint**.
2. Under **Authorized hosts**, add your local origin, for example `http://localhost:5173`.
3. Select **Save**.

## 6\. Test it

Start your development server:

npmyarnpnpm

```
npm run dev
```

```
yarn run dev
```

```
pnpm run dev
```

Open your site in the browser (a Vite app runs on `http://localhost:5173`). Type in the search bar to see results in a dropdown, select the chat bubble in the corner to ask a question, or press `Cmd/Ctrl+K` to open the search modal. For the full set of components, attributes, and theming options, refer to [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/).

## 7\. Go to production

The snippets work anywhere your site is served. When you deploy your site to its production domain, return to **Settings** \> **Public Endpoint** and add that origin to **Authorized hosts** (as in step five), so the browser can reach the endpoint in production.

## Next steps

### [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/)

All snippet components, attributes, and CSS theming options.

### [Wrangler commands](https://developers.cloudflare.com/ai-search/wrangler-commands/)

Manage AI Search instances from the command line.

### [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)

Rate limiting, CORS, and tool description for the public endpoint.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/#page","headline":"Add search to your website · Cloudflare AI Search docs","description":"Create an AI Search instance that indexes your website, then add a search bar, chat bubble, and search modal to your React site with the UI snippet components.","url":"https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
