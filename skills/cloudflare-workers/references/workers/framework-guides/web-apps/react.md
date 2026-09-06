---
description: Create a new React + Vite application or deploy an existing one to Cloudflare Workers with Workers Assets.
title: React + Vite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# React + Vite

Last updated Sep 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[React ↗](https://react.dev/) is a framework for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently. You can use React to build a single-page application (SPA), and combine it with a backend API running on Cloudflare Workers to create a full-stack application.

This guide shows you how to deploy a React + Vite application to Cloudflare Workers. You can either create a new project using the `create-cloudflare` CLI (C3) or adapt an existing React + Vite project.

**Start from CLI** \- scaffold a full-stack app with a React SPA, Cloudflare Workers API, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for lightning-fast development.

npmyarnpnpm

```
npm create cloudflare@latest -- my-react-app --framework=react
```

```
yarn create cloudflare my-react-app --framework=react
```

```
pnpm create cloudflare@latest my-react-app --framework=react
```

---

**Or just deploy** \- create a full-stack app using React, a Workers API, and Vite, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/main/react-starter-template)

1. **Create a new project with the create-cloudflare CLI (C3)**
npmyarnpnpm
```
npm create cloudflare@latest -- my-react-app --framework=react
```
```
yarn create cloudflare my-react-app --framework=react
```
```
pnpm create cloudflare@latest my-react-app --framework=react
```
How is this project set up?
The following is a simplified file tree of the project.

  * my-react-app
    * src/
      * App.tsx
    * worker/
      * index.ts
    * index.html
    * vite.config.ts
    * wrangler.jsonc
`wrangler.jsonc` is your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). In this file:

  * `main` points to `worker/index.ts`. This is your Worker, which is going to act as your backend API.
  * `assets.not_found_handling` is set to `single-page-application`, which means that routes that are handled by your React SPA do not go to the Worker, and are thus free.
  * If you want to add bindings to resources on Cloudflare's developer platform, you configure them here. Read more about [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).
`vite.config.ts` is set up to use the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). This runs your Worker in the Cloudflare Workers runtime, ensuring your local development environment is as close to production as possible.
`worker/index.ts` is your backend API, which contains a single endpoint, `/api/`, that returns a text response. At `src/App.tsx`, your React app calls this endpoint to get a message back and displays this.
2. **Develop locally with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)**
After creating your project, run the following command in your project directory to start a local development server.
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
What's happening in local development?
This project uses Vite for local development and build, and thus comes with all of Vite's features, including hot module replacement (HMR).
In addition, `vite.config.ts` is set up to use the Cloudflare Vite plugin. This runs your application in the Cloudflare Workers runtime, just like in production, and enables access to local emulations of bindings.
3. **Deploy your project**
Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including Cloudflare's own [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).
The following command will build and deploy your project. If you are using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.
npmyarnpnpm
```
npm run deploy
```
```
yarn run deploy
```
```
pnpm run deploy
```

If you already have a React + Vite application, you can adapt it to deploy to Cloudflare Workers using the Cloudflare Vite plugin. This approach preserves your existing code while adding the ability to deploy to Cloudflare's edge network with static assets and an optional API Worker.

1. **Navigate to your project directory**
Open your existing React + Vite project in your editor of choice. If you do not have one yet, scaffold a new project with Vite first:
npmyarnpnpm
```
npm create vite@latest -- my-react-app --template react-ts
```
```
yarn create vite my-react-app --template react-ts
```
```
pnpm create vite@latest my-react-app --template react-ts
```
Next, open the `my-react-app` directory in your editor of choice.
2. **Add the Cloudflare Vite plugin**
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
Refer to the [API reference](https://developers.cloudflare.com/workers/vite-plugin/reference/api/) for configuration options.
3. **Add a Wrangler configuration file**
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
4. **Update the `.gitignore` file**
### Update the `.gitignore` file
When developing Workers, additional files are used and/or generated that should not be stored in Git. Add the following lines to your `.gitignore` file:
```txt
.wrangler
.dev.vars*
```
5. **Develop locally**
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
6. **Build and deploy your project**
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

## Add an API Worker to an existing project

If you want to add an API Worker to your existing React + Vite project, follow these additional steps:

1. **Configure TypeScript for your Worker code**
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
2. **Add the Worker entrypoint to your configuration**
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
3. **Add your API Worker**
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
4. **Call the API from the client**
You can now call your API from your React components. For example, in `src/App.tsx`:
```tsx
import { useState } from "react";
function App() {
	const [name, setName] = useState("unknown");
	return (
		<div className="card">
			<button
				onClick={() => {
					fetch("/api/")
						.then((res) => res.json() as Promise<{ name: string }>)
						.then((data) => setName(data.name));
				}}
			>
				Name from API is: {name}
			</button>
		</div>
	);
}
export default App;
```

---

## Asset Routing

If you're using React as a SPA, you will want to set `not_found_handling = "single-page-application"` in your Wrangler configuration file.

By default, Cloudflare first tries to match a request path against a static asset path, which is based on the file structure of the uploaded asset directory. This is either the directory specified by `assets.directory` in your Wrangler config or, in the case of the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), the output directory of the client build. Failing that, we invoke a Worker if one is present. If there is no Worker, or the Worker then uses the asset binding, Cloudflare will fallback to the behaviour set by [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/#routing-behavior).

Refer to the [routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/) for more information about how routing works with static assets, and how to customize this behavior.

## Use bindings with React

Your project can also contain a Worker at `./worker/index.ts`, which you can use as a backend API for your React application. While your React application cannot directly access Workers bindings, it can interact with them through this Worker. You can make [fetch() requests](https://developers.cloudflare.com/workers/runtime-apis/fetch/) from your React application to the Worker, which can then handle the request and use bindings. Learn how to [configure Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

### [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/)

Access to compute, storage, AI and more.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react/#page","headline":"React + Vite · Cloudflare Workers docs","description":"Create a new React + Vite application or deploy an existing one to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["spa"]}
```
