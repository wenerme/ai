---
description: Set up and deploy your first Cloudflare Worker using Wrangler, the command-line interface.
title: CLI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI

Last updated Aug 25, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/get-started/guide/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Set up and deploy your first Worker with Wrangler, the Cloudflare Developer Platform CLI.

This guide will instruct you through setting up and deploying your first Worker.

## Prerequisites

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use a Node version manager like <a href="https://volta.sh/">Volta ↗︎</a> or <a href="https://github.com/nvm-sh/nvm">nvm ↗︎</a> to avoid permission issues and change Node.js versions. <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler</a>, discussed later in this guide, requires a Node version of <code>16.17.0</code> or later.

</details>

## 1. Create a new Worker project

Open a terminal window and run C3 to create your Worker project. [C3 (`create-cloudflare-cli`) ↗︎](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

npmyarnpnpm

```
npm create cloudflare@latest -- my-first-worker
```

```
yarn create cloudflare my-first-worker
```

```
pnpm create cloudflare@latest my-first-worker
```

For setup, select the following options:

- For *What would you like to start with?*, choose `Hello World example`.
- For *Which template would you like to use?*, choose `Worker only`.
- For *Which language do you want to use?*, choose `JavaScript`.
- For *Do you want to use git for version control?*, choose `Yes`.
- For *Do you want to deploy your application?*, choose `No` (we will be making some changes before deploying).

Now, you have a new project set up. Move into that project folder.

```sh
cd my-first-worker
```

<details>

<summary>

What files did C3 create?

</summary>

In your project directory, C3 will have generated the following:

- <code>wrangler.jsonc</code>: Your <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration">Wrangler</a> configuration file.
- <code>index.js</code> (in <code>/src</code>): A minimal <code>'Hello World!'</code> Worker written in <a href="https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/">ES module</a> syntax.
- <code>package.json</code>: A minimal Node dependencies configuration file.
- <code>package-lock.json</code>: Refer to <a href="https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json"><code>npm</code> documentation on <code>package-lock.json</code> ↗︎</a>.
- <code>node_modules</code>: Refer to <a href="https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules"><code>npm</code> documentation <code>node_modules</code> ↗︎</a>.

</details>

<details>

<summary>

What if I already have a project in a git repository?

</summary>

In addition to creating new projects from C3 templates, C3 also supports creating new projects from existing Git repositories. To create a new project from an existing Git repository, open your terminal and run:

```sh
npm create cloudflare@latest -- --template <SOURCE>
```

<code>&lt;SOURCE&gt;</code> may be any of the following:

- <code>user/repo</code> (GitHub)
- <code>git@github.com:user/repo</code>
- <code>https://github.com/user/repo</code>
- <code>user/repo/some-template</code> (subdirectories)
- <code>user/repo#canary</code> (branches)
- <code>user/repo#1234abcd</code> (commit hash)
- <code>bitbucket:user/repo</code> (Bitbucket)
- <code>gitlab:user/repo</code> (GitLab)

Your existing template folder must contain the following files, at a minimum, to meet the requirements for Cloudflare Workers:

- <code>package.json</code>
- <code>wrangler.jsonc</code> <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration">See sample Wrangler configuration</a>
- <code>src/</code> containing a worker script referenced from <code>wrangler.jsonc</code>

</details>

## 2. Develop with Wrangler CLI

C3 installs [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the Workers command-line interface, in Workers projects by default. Wrangler lets you to [create](https://developers.cloudflare.com/workers/wrangler/commands/general/#init), [test](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev), and [deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) your Workers projects.

After you have created your first Worker, run the [`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to preview your Worker locally during development.

```sh
npx wrangler dev
```

If you have never used Wrangler before, it will open your web browser so you can login to your Cloudflare account.

Go to [http://localhost:8787 ↗︎](http://localhost:8787) to view your Worker.

<details>

<summary>

Browser issues?

</summary>

If you have issues with this step or you do not have access to a browser interface, refer to the <a href="https://developers.cloudflare.com/workers/wrangler/commands/general/#login"><code>wrangler login</code></a> documentation.

</details>

## 3. Write code

With your new project generated and running, you can begin to write and edit your code.

Find the `src/index.js` file. `index.js` will be populated with the code below:

*Original index.jsjs*

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello World!");
	},
};
```

<details>

<summary>

Code explanation

</summary>

This code block consists of a few different parts.

*Updated index.jsjs*

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello World!");
	},
};
```

<code>export default</code> is JavaScript syntax required for defining <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports">JavaScript modules ↗︎</a>. Your Worker has to have a default export of an object, with properties corresponding to the events your Worker should handle.

*index.jsjs*

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello World!");
	},
};
```

This <a href="https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/"><code>fetch()</code> handler</a> will be called when your Worker receives an HTTP request. You can define additional event handlers in the exported object to respond to different types of events. For example, add a <a href="https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/"><code>scheduled()</code> handler</a> to respond to Worker invocations via a <a href="https://developers.cloudflare.com/workers/configuration/cron-triggers/">Cron Trigger</a>.

Additionally, the <code>fetch</code> handler will always be passed three parameters: <a href="https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/"><code>request</code>, <code>env</code> and <code>context</code></a>.

*index.jsjs*

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello World!");
	},
};
```

The Workers runtime expects <code>fetch</code> handlers to return a <code>Response</code> object or a Promise which resolves with a <code>Response</code> object. In this example, you will return a new <code>Response</code> with the string <code>"Hello World!"</code>.

</details>

Replace the content in your current `index.js` file with the content below, which changes the text output.

*index.jsjs*

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello Worker!");
	},
};
```

Then, save the file and reload the page. Your Worker's output will have changed to the new text.

<details>

<summary>

No visible changes?

</summary>

If the output for your Worker does not change, make sure that:

1. You saved the changes to <code>index.js</code>.
2. You have <code>wrangler dev</code> running.
3. You reloaded your browser.

</details>

## 4. Deploy your project

Deploy your Worker via Wrangler to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

```sh
npx wrangler deploy
```

If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

<details>

<summary>

Seeing 523 errors?

</summary>

If you see <a href="https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/"><code>523</code> errors</a> when pushing your <code>*.workers.dev</code> subdomain for the first time, wait a minute or so and the errors will resolve themselves.

</details>

## Next steps

To do more:

- Push your project to a GitHub or GitLab repository then [connect to builds](https://developers.cloudflare.com/workers/ci-cd/builds/#get-started) to enable automatic builds and deployments.
- Visit the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) for simpler editing.
- Review our [Examples](https://developers.cloudflare.com/workers/examples/) and [Tutorials](https://developers.cloudflare.com/workers/tutorials/) for inspiration.
- Set up [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to allow your Worker to interact with other resources and unlock new functionality.
- Learn how to [test and debug](https://developers.cloudflare.com/workers/testing/) your Workers.
- Read about [Workers limits and pricing](https://developers.cloudflare.com/workers/platform/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/get-started/guide/#page","headline":"CLI","description":"Set up and deploy your first Cloudflare Worker using Wrangler, the command-line interface.","url":"https://developers.cloudflare.com/workers/get-started/guide/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
