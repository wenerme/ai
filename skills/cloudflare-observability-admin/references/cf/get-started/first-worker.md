---
description: Create a Workers project with cf init, develop it locally, and deploy it with the Cloudflare CLI.
title: Deploy your first Worker
image: https://developers.cloudflare.com/cf/get-started/first-worker/og.png?v=77bcce5f2775c97f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy your first Worker

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/get-started/first-worker/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide creates a [Worker](https://developers.cloudflare.com/workers/) with `cf init`, runs it on your machine, and deploys it to your Cloudflare account.

## Before you begin

[Install `cf`](https://developers.cloudflare.com/cf/get-started/) and check the [requirements](https://developers.cloudflare.com/cf/get-started/#requirements). You do not need to sign in until you deploy.

## 1. Create a project

Create a project in a new directory:

```sh
cf init my-worker
```

`cf init` asks which package manager to use, creates the project in `my-worker`, installs its dependencies, and generates types for its bindings. If you leave out the directory, `cf init` asks for one.

Apart from `node_modules` and the lockfile from the install, `cf init` creates these files:

- my-worker/
  - .cloudflare/
    - types/
      - index.d.ts
  - src/
    - index.ts
  - .gitignore
  - cloudflare.config.ts
  - package.json
  - tsconfig.json
  - vite.config.ts

- `src/index.ts` is the Worker.
- `cloudflare.config.ts` describes the Worker in TypeScript.
- `vite.config.ts` adds the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), which runs your code in the Workers runtime during development and builds it for deployment.
- `package.json` has `dev`, `build`, and `deploy` scripts that run the matching `cf` commands. It lists `cf` and the Vite plugin 2.0 beta ( `@cloudflare/vite-plugin@beta`), which `cf` uses, but not Wrangler.
- `.cloudflare/types/index.d.ts` holds generated binding and runtime types. The Vite plugin updates it when you run `cf dev` or `cf build`. The generated `.gitignore` excludes `.cloudflare/`.

The Worker reads a `WORLD` binding and returns a greeting:

*src/index.jsjs*

```js
import { env } from "cloudflare:workers";

export default {
	fetch() {
		return new Response(`Hello ${env.WORLD}!`);
	},
};
```

*src/index.tsts*

```ts
import { env } from "cloudflare:workers";

export default {
	fetch() {
		return new Response(`Hello ${env.WORLD}!`);
	},
} satisfies ExportedHandler;
```

`cloudflare.config.ts` names the Worker, points to its entrypoint, and declares the `WORLD` text binding. The annotations explain each field and builder:

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#first-worker-config-defineconfig">Link to defineConfig</a>

<code>defineConfig&lt;T extends ConfigInput&lt;CloudflareConfig&gt;&gt;(config: T): T;</code>

Defines the default export of <code>cloudflare.config.ts</code>. Pass a configuration object, a promise that resolves to one, or a function that receives the config context (<code>isPreview</code> and <code>mode</code>) and returns either.

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>accountId?: string</code></dt>
<dd>This is the ID of the account associated with your zone. It can also be specified through the <code>CLOUDFLARE_ACCOUNT_ID</code> environment variable.</dd>

<dt><code>complianceRegion?: "public" | "fedramp-high"</code></dt>
<dd>The compliance boundary in which commands should operate. When omitted, this can be supplied through <code>CLOUDFLARE_COMPLIANCE_REGION</code>.</dd>

<dt><code>worker?: ConfigInput&lt;WorkerConfig&gt;</code></dt>
<dd>The Worker defined by this configuration.</dd>

<dt><code>containers?: ConfigInput&lt;ContainerConfig&gt;[]</code></dt>
<dd>Container applications defined by this configuration.</dd></dl></details>



</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#first-worker-config-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "my-worker", (name reference)</summary>



<code>name</code>Required<a href="#first-worker-config-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#first-worker-config-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#first-worker-config-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#first-worker-config-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>WORLD: bindings.text("World"), (text reference)</summary>



<code>text</code>Builder<a href="#first-worker-config-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

},

},

});

`cf init` sets `compatibilityDate` to a fixed, recent date that ships with your version of `cf`. The `cf-worker` import attribute points the configuration at your Worker module. `cf` reads the module path from it and does not load or run your Worker code.

## 2. Develop locally

Start the development server:

```sh
cd my-worker
cf dev
```

Open the local URL that `cf dev` prints, by default `http://localhost:5173/`. The Worker responds with `Hello World!`.

Change the response in `src/index.ts`, save the file, and refresh the page. The development server picks up the change without a restart.

In this project, `cf dev` does not accept options such as `--port`. To change the port, set `server.port` in `vite.config.ts`.

## 3. Deploy

1. If you have not signed in yet, sign in:

   ```sh
   cf auth login
   ```


2. Deploy the Worker:

   ```sh
   cf deploy
   ```

   `cf deploy` builds the project, uploads the Worker, deploys it to your account, and prints the result. If you can access more than one account, `cf` asks which one to use. To learn how to set a default, refer to [Select an account](https://developers.cloudflare.com/cf/get-started/#select-an-account).

To check the build without deploying, run `cf deploy --dry-run`. A dry run makes no API requests, so it works before you sign in.

## Create a project without prompts

In a script or CI job, `cf init` cannot ask questions, so pass the directory. Choose the package manager with `--package-manager`, which accepts `npm`, `pnpm`, `yarn`, or `bun`. Without it, `cf init` uses npm, unless you ran `cf` through another package manager:

```sh
cf init my-worker --package-manager npm
```

To skip the installation, add `--no-install`. Then run your package manager's install command in the project before you run `cf dev`.

## Start from an existing project

`cf` can also set up an existing app. In the project directory, install its dependencies, then run `cf init .`:

```sh
cf init .
```

`cf` detects the framework and shows the settings it found, including the Worker name, framework, build command, and output directory. After you confirm, `cf` changes the project. For a Vite app, it:

- Installs `cf` and `@cloudflare/vite-plugin` as development dependencies.
- Adds the Cloudflare plugin to `vite.config.ts`, or creates the file.
- Creates `cloudflare.config.ts`, with observability turned on.
- Adds a `deploy` script that runs `cf deploy`.
- Adds `.wrangler`, `.dev.vars*`, and `.env*` entries to `.gitignore`. In a Git repository without a `.gitignore` file, it creates one.

`cf` does not add `.cloudflare/`, where it writes builds and generated types, to `.gitignore`. Add it yourself:

```sh
echo ".cloudflare/" >> .gitignore
```

`cf build` and `cf deploy` run the framework's build command, such as `vite build`, not the `build` script in `package.json`. To keep extra build steps, refer to [How cf runs your project](https://developers.cloudflare.com/cf/projects/#how-cf-runs-your-project).

If you skip `cf init .`, then `cf dev`, `cf build`, and `cf deploy` run the same setup the first time you use them. In CI, they apply the changes without asking, so run `cf init .` locally and commit the result first. For details, refer to [Automatic configuration](https://developers.cloudflare.com/cf/projects/#automatic-configuration).

Plain Vite apps work with this flow. `cf` also detects other frameworks, such as Astro, React Router, and SvelteKit, but detection does not mean the project builds. For example, Astro 6 and later does not build with `cf` during the beta.

Wrangler projects

Do not run `cf init .`, `cf dev`, `cf build`, or `cf deploy` in a project that has a `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` file. The automatic setup ignores the Wrangler configuration and can produce a Worker that does not match it. To convert a Wrangler project, use `cf migrate` instead. Refer to [Migrate a Wrangler project](https://developers.cloudflare.com/cf/wrangler/migrate/).

## Next steps

- Add storage, queues, or other resources with [bindings](https://developers.cloudflare.com/cf/projects/cloudflare-config/#declare-bindings).
- Route traffic to your Worker with [triggers](https://developers.cloudflare.com/cf/projects/cloudflare-config/#declare-triggers).
- Learn how `cf` develops, builds, and deploys projects in [Develop, build, and deploy](https://developers.cloudflare.com/cf/projects/).
- Explore every configuration option in the [configuration explorer](https://developers.cloudflare.com/cf/projects/config-explorer/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/get-started/first-worker/#page","headline":"Deploy your first Worker","description":"Create a Workers project with cf init, develop it locally, and deploy it with the Cloudflare CLI.","url":"https://developers.cloudflare.com/cf/get-started/first-worker/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/get-started/first-worker/og.png?v=77bcce5f2775c97f","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
