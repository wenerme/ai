---
description: Create a React SPA with an API Worker using the Vite plugin
title: Tutorial - React SPA with an API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Tutorial - React SPA with an API

Last updated Sep 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/tutorial/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial takes you through the steps needed to adapt a Vite project to use the Cloudflare Vite plugin. Much of the content can also be applied to adapting existing Vite projects and to front-end frameworks other than React.

Note

If you want to start a new app with a template already set up with Vite, React and the Cloudflare Vite plugin, refer to the [React framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/). To create a standalone Worker, refer to [Get started](https://developers.cloudflare.com/workers/vite-plugin/get-started/).

## Introduction

In this tutorial, you will create a React SPA that can be deployed as a Worker with static assets. You will then add an API Worker that can be accessed from the front-end code. You will develop, build, and preview the application using Vite before finally deploying to Cloudflare.

## Set up and configure the React SPA

### Scaffold a Vite project

Start by creating a React TypeScript project with Vite.

npmyarnpnpm

```
npm create vite@latest -- cloudflare-vite-tutorial --template react-ts
```

```
yarn create vite cloudflare-vite-tutorial --template react-ts
```

```
pnpm create vite@latest cloudflare-vite-tutorial --template react-ts
```

Next, open the `cloudflare-vite-tutorial` directory in your editor of choice.

### Add the Cloudflare dependencies

npmyarnpnpmbun

```
npm i -D @cloudflare/vite-plugin wrangler
```

```
yarn add -D @cloudflare/vite-plugin wrangler
```

```
pnpm add -D @cloudflare/vite-plugin wrangler
```

```
bun add -d @cloudflare/vite-plugin wrangler
```

### Add the Cloudflare Vite plugin to your project

In your `vite.config.ts`, add the Cloudflare Vite plugin after your framework plugin:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [react(), cloudflare()],
});
```

The Cloudflare Vite plugin does not require any configuration by default and will look for a `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` in the root of your application.

### Create your Worker config file

Create a `wrangler.jsonc` file in the root of your project:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  // Set this to today's date
  "compatibility_date": "2026-09-05",
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

```toml
name = "my-app"
# Set this to today's date
compatibility_date = "2026-09-05"

[assets]
not_found_handling = "single-page-application"
```

The [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) value has been set to `single-page-application`. This means that all not-found requests will serve the `index.html` file, which is required for React Router and other client-side routing solutions.

With the Cloudflare plugin, the `assets` routing configuration is used in place of Vite's default behavior. This ensures that your application's [routing configuration](https://developers.cloudflare.com/workers/static-assets/routing/) works the same way while developing as it does when deployed to production.

The [directory](https://developers.cloudflare.com/workers/static-assets/binding/#directory) field is not used when configuring assets with Vite. The `directory` in the output configuration will automatically point to the client build output. Refer to [Static Assets](https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/) for more information.

Note

When using the Cloudflare Vite plugin, the Worker config (for example, `wrangler.jsonc`) that you provide is the input configuration file. A separate output `wrangler.json` file is created when you run `vite build`. This output file is a snapshot of your configuration at the time of the build and is modified to reference your build artifacts. It is the configuration that is used for preview and deployment.

### Update the `.gitignore` file

When developing Workers, additional files are used and/or generated that should not be stored in Git. Add the following lines to your `.gitignore` file:

```txt
.wrangler
.dev.vars*
```

### Run the development server

Run your framework's development command to start the Vite development server and verify that your application is working as expected.

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

For a purely front-end application, you could now build, preview, and deploy your application. The following sections will show you how to go further and add an API Worker.

## Add an API Worker

### Add Workers TypeScript types

npmyarnpnpmbun

```
npm i -D @cloudflare/workers-types
```

```
yarn add -D @cloudflare/workers-types
```

```
pnpm add -D @cloudflare/workers-types
```

```
bun add -d @cloudflare/workers-types
```

Create a `tsconfig.worker.json` that extends your Node TypeScript configuration and adds the Workers types:

```jsonc
{
	"extends": "./tsconfig.node.json",
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.worker.tsbuildinfo",
		"types": ["@cloudflare/workers-types/2023-07-01", "vite/client"],
	},
	"include": ["worker"],
}
```

Then add a reference to this new configuration in your root `tsconfig.json`:

```jsonc
{
	"files": [],
	"references": [
		{ "path": "./tsconfig.app.json" },
		{ "path": "./tsconfig.node.json" },
		{ "path": "./tsconfig.worker.json" },
	],
}
```

### Add the Worker entrypoint to your configuration

Update your Wrangler configuration file to add a `main` field that points to your Worker entrypoint:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  // Set this to today's date
  "compatibility_date": "2026-09-05",
  "main": "./worker/index.ts",
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

```toml
name = "my-app"
# Set this to today's date
compatibility_date = "2026-09-05"
main = "./worker/index.ts"

[assets]
not_found_handling = "single-page-application"
```

The `main` field specifies the entry file for your Worker code.

### Add your API Worker

Create a `worker/index.ts` file with the following contents:

```ts
export default {
	fetch(request) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare",
			});
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler;
```

The Worker defined in the preceding code block will be invoked for any non-navigation request that does not match a static asset. It returns a JSON response if the `pathname` starts with `/api/` and otherwise returns a `404` response.

Note

For top-level navigation requests, browsers send a `Sec-Fetch-Mode: navigate` header. If this is present and the URL does not match a static asset, the `not_found_handling` behavior will be invoked rather than the Worker. This implicit routing is the default behavior.

If you would instead like to define the routes that invoke your Worker explicitly, you can provide an array of route patterns to [run\_worker\_first](https://developers.cloudflare.com/workers/static-assets/binding/#run%5Fworker%5Ffirst). This opts out of interpreting the `Sec-Fetch-Mode` header.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "cloudflare-vite-tutorial",
  // Set this to today's date
  "compatibility_date": "2026-09-05",
  "main": "./worker/index.ts",
  "assets": {
    "not_found_handling": "single-page-application",
    "run_worker_first": [
      "/api/*"
    ]
  }
}
```

```toml
name = "cloudflare-vite-tutorial"
# Set this to today's date
compatibility_date = "2026-09-05"
main = "./worker/index.ts"

[assets]
not_found_handling = "single-page-application"
run_worker_first = ["/api/*"]
```

### Call the API from the client

Edit `src/App.tsx` so that it includes an additional button that calls the API and sets some state:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button
					onClick={() => setCount((count) => count + 1)}
					aria-label="increment"
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div className="card">
				<button
					onClick={() => {
						fetch("/api/")
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name));
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</button>
				<p>
					Edit <code>api/index.ts</code> to change the name
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
```

Now, if you click the button, it will display 'Name from API is: Cloudflare'.

Increment the counter to update the application state in the browser. Next, edit `api/index.ts` by changing the `name` it returns to `'Cloudflare Workers'`. If you click the button again, it will display the new `name` while preserving the previously set counter value.

With Vite and the Cloudflare plugin, you can iterate on the client and server parts of your app together, without losing UI state between edits.

### Build your application

Run the build command to build your application.

npmyarnpnpm

```
npm run build
```

```
yarn run build
```

```
pnpm run build
```

The `dist` directory will contain your client build output in the `client` subdirectory and your Worker code alongside the output `wrangler.json` configuration file.

### Preview your application

Run the preview command to validate that your application runs as expected.

npmyarnpnpm

```
npm run preview
```

```
yarn run preview
```

```
pnpm run preview
```

This command will run your build output locally in the Workers runtime, closely matching its behavior in production.

### Deploy to Cloudflare

Run the deploy command to deploy your application to Cloudflare.

npmyarnpnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

This command will automatically use the output `wrangler.json` that was included in the build output.

## Next steps

In this tutorial, we created an SPA that could be deployed as a Worker with static assets. We then added an API Worker that could be accessed from the front-end code. Finally, we deployed both the client and server-side parts of the application to Cloudflare.

Possible next steps include:

* Adding a binding to another Cloudflare service such as a [KV namespace](https://developers.cloudflare.com/kv/) or [D1 database](https://developers.cloudflare.com/d1/)
* Expanding the API to include additional routes
* Using a library, such as [Hono ↗](https://hono.dev/) or [tRPC ↗](https://trpc.io/), in your API Worker

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/tutorial/#page","headline":"Tutorial - React SPA with an API · Cloudflare Workers docs","description":"Create a React SPA with an API Worker using the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/tutorial/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
