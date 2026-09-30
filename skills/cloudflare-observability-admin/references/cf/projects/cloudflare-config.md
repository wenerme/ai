---
description: Configure Workers projects with a typed cloudflare.config.ts file.
title: Programmatic configuration
image: https://developers.cloudflare.com/cf/projects/cloudflare-config/og.png?v=b3958a991af163a7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Programmatic configuration

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/projects/cloudflare-config/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`cloudflare.config.ts` is the typed configuration file for a Workers project. Its default export can define a Worker, Container applications, and account settings. Because the file is a TypeScript module, it can use imports, functions, environment variables, and asynchronous values.

Beta

`cf` is in beta. Commands, configuration, and Build Output can change before the stable release.

Loading `cloudflare.config.ts` requires Node.js 22.18 or later. Bun is not supported: when `cf` runs on Bun, loading the file fails with `cloudflare.config.ts loading is not supported on Bun`. Most `cf` commands load the nearest `cloudflare.config.ts`, including commands that only call the Cloudflare API, so this is the practical minimum for any `cf` command you run inside the project.

Set `"type": "module"` in the project's `package.json`. Without it, Node.js prints a warning each time it loads the file. With `"type": "commonjs"`, loading fails with `Cannot use import statement outside a module`.

## Create the minimum configuration

Import the configuration helpers from `cf/config`. Add `cf` as a development dependency so the project can resolve that import. Projects created with [`cf init`](https://developers.cloudflare.com/cf/get-started/first-worker/) already include it.

npmyarnpnpmbun

```
npm i -D cf
```

```
yarn add -D cf
```

```
pnpm add -D cf
```

```
bun add -d cf
```

A Worker requires `name` and `compatibilityDate`. A Worker that runs code also requires `entrypoint`.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-minimum-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-minimum-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-minimum-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-minimum-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-minimum-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

},

});

The `cf-worker` import attribute lets TypeScript infer the Worker module, binding types, and exported classes.

An assets-only Worker can omit `entrypoint`. Its build implementation must provide the asset source. A deployable build must contain a Worker bundle, static assets, or both.

`cloudflare.config.ts` does not have an `assets.directory` field. In Vite projects, the static assets are the output of Vite's client build, which includes Vite's `publicDir` directory (`public` by default). Projects that build with Wrangler set the directory in a generated `wrangler.config.ts` file. For details, refer to [How cf runs your project](https://developers.cloudflare.com/cf/projects/#how-cf-runs-your-project).

## Understand the default export

Use `defineConfig()` for the default export. The helper returns the value you pass to it and preserves literal values for TypeScript inference.

| Field | Required | Purpose |
| --- | --- | --- |
| `accountId` | No | Sets the default account for `cf` commands |
| `complianceRegion` | No | Selects `public` or `fedramp-high` |
| `worker` | Development and builds | Defines the Worker |
| `containers` | No | Defines Container applications |

`cf` API commands can read an account-only default export. The Cloudflare Vite plugin and Wrangler require `worker` for development and builds.

Use the [configuration explorer](https://developers.cloudflare.com/cf/projects/config-explorer/) to inspect the generated fields, builder methods, and nested options.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig, triggers } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig(({ mode }) =&gt; { (defineConfig, mode reference)</summary>



<code>defineConfig</code>Function<a href="#config-default-export-defineconfig">Link to defineConfig</a>

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



<code>mode</code>Context value<a href="#config-default-export-defineconfig">Link to mode</a>

<code>mode: string | undefined</code>

The mode the config is being evaluated in. Set via the <code>--mode</code> CLI flag. In Vite the mode defaults to <code>development</code> in <code>vite dev</code> and <code>production</code> in <code>vite build</code> (<a href="https://vite.dev/guide/env-and-mode.html#modes">more info</a>). In Wrangler the mode defaults to <code>undefined</code>.

</details>

const isStaging = mode === "staging";

return {

<details>

<summary>accountId: "&lt;ACCOUNT_ID&gt;", (accountId reference)</summary>



<code>accountId</code>Optional<a href="#config-default-export-settings-accountid">Link to accountId</a>

<code>accountId?: string</code>

This is the ID of the account associated with your zone. It can also be specified through the <code>CLOUDFLARE_ACCOUNT_ID</code> environment variable.

</details>

<details>

<summary>complianceRegion: "public", (complianceRegion reference)</summary>



<code>complianceRegion</code>Optional<a href="#config-default-export-settings-complianceregion">Link to complianceRegion</a>

<code>complianceRegion?: "public" | "fedramp-high"</code>

The compliance boundary in which commands should operate. When omitted, this can be supplied through <code>CLOUDFLARE_COMPLIANCE_REGION</code>.

</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-default-export-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: isStaging ? "example-staging" : "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-default-export-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-default-export-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-default-export-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-default-export-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>MESSAGE: bindings.text(isStaging ? "staging" : "production"), (text reference)</summary>



<code>text</code>Builder<a href="#config-default-export-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

},

<details>

<summary>triggers: [triggers.scheduled({ schedule: "0 * * * *" })], (triggers, scheduled, schedule reference)</summary>



<code>triggers</code>Optional<a href="#config-default-export-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

<code>scheduled</code>Builder<a href="#config-default-export-workerconfig-triggers">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



<code>schedule</code>Required<a href="#config-default-export-workerconfig-triggers">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

},

};

});

## Evaluate configuration

`defineConfig()`, `defineWorker()`, and `defineContainer()` each accept an object, a promise, or a function. A function can return an object or a promise.

Functions receive this context:

| Property | Purpose |
| --- | --- |
| `mode` | Identifies the selected mode, which [depends on the command](#select-a-mode) when you omit `--mode` |
| `isPreview` | Is `true` when the configuration is evaluated for a [Worker Preview](https://developers.cloudflare.com/cf/projects/#deploy-a-preview) |

Return one complete configuration for each mode. Programmatic configuration does not merge environment blocks.

## Reuse definitions

Use `defineWorker()` when another configuration file needs to import a Worker definition. Use `defineContainer()` when a Durable Object export and the `containers` array need to reference the same Container.

These helpers do not replace the default export. The default export must still use `defineConfig()`.

## Configure the Worker

The `worker` object supports these fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `name` | Yes | Sets the Worker name |
| `compatibilityDate` | Yes | Selects a Workers runtime compatibility date |
| `entrypoint` | Conditional | Selects the Worker module |
| `assets` | No | Sets runtime request behavior for built assets |
| `cache` | No | Configures Worker cache behavior |
| `compatibilityFlags` | No | Turns on runtime compatibility flags |
| `domains` | No | Publishes the Worker to custom domains |
| `env` | No | Declares bindings and inline values |
| `exports` | No | Configures named Worker, Durable Object, and Workflow exports |
| `limits` | No | Sets CPU and subrequest limits |
| `logpush` | No | Sends trace events to Workers Logpush |
| `observability` | No | Configures logs, traces, and sampling |
| `placement` | No | Configures smart or targeted placement |
| `previewUrls` | No | Controls [version preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) |
| `tailConsumers` | No | Sends events to Tail Workers |
| `triggers` | No | Declares routes, queues, schedules, and sockets |
| `unsafe` | No | Passes unsupported metadata through to deployment |
| `workersDev` | No | Controls the `workers.dev` route |

The `assets` object controls runtime behavior only. It configures HTML handling, not-found handling, and whether matching requests run the Worker first. It does not select the asset source.

Use `domains` for custom domains. Use `triggers.fetch()` for routes.

## Use typed builder values

The `bindings`, `triggers`, and `exports` builders return ordinary configuration objects. Each object has a literal `type` field that identifies its kind.

The `type` field lets TypeScript select the valid options for each kind. For example, a queue trigger accepts batching options, while a scheduled trigger requires a cron expression. The configuration loader uses the same fields for runtime validation.

Use builders instead of writing `type` fields directly. Builders preserve literal values and generic type arguments for Worker type inference.

## Declare bindings

Each key under `worker.env` becomes a binding name in Worker code. The builder method selects the binding's runtime type.

This configuration declares inline values, a D1 database, a Queue, and a secret:

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

type Job = {

id: string;

operation: "index" | "delete";

};

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-bindings-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-bindings-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-bindings-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-bindings-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-bindings-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-bindings-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>API_ORIGIN: bindings.text("https://api.example.com"), (text reference)</summary>



<code>text</code>Builder<a href="#config-bindings-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

<details>

<summary>FEATURES: bindings.json({ search: true }), (json reference)</summary>



<code>json</code>Builder<a href="#config-bindings-bindings-json-default">Link to json</a>

<code>json&lt;T$1 extends Json&gt;(value: T$1): JsonBinding&lt;T$1&gt;;</code>

Inline JSON value made available to the Worker on <code>env</code> under the binding name.

</details>

<details>

<summary>DATABASE: bindings.d1({ name: "application-db" }), (d1, name reference)</summary>



<code>d1</code>Builder<a href="#config-bindings-bindings-d1-default">Link to d1</a>

<code>d1(options?: D1BindingOptions): D1Binding;</code>

Binding to a D1 database. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#d1-databases">https://developers.cloudflare.com/workers/wrangler/configuration/#d1-databases</a>

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>id?: string</code></dt>
<dd>The UUID of this D1 database (not required).</dd>

<dt><code>name?: string</code></dt>
<dd>The name of this D1 database.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



<code>name</code>Optional<a href="#config-bindings-bindings-d1-default">Link to name</a>

<code>name?: string</code>

The name of this D1 database.

</details>

<details>

<summary>JOBS: bindings.queue&lt;Job&gt;({ name: "application-jobs" }), (queue, name reference)</summary>



<code>queue</code>Builder<a href="#config-bindings-bindings-queue-default">Link to queue</a>

<code>queue&lt;TBody = unknown&gt;(options?: QueueBindingOptions): TypedQueueBinding&lt;TBody&gt;;</code>

Producer binding to a Cloudflare Queue. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#queues">https://developers.cloudflare.com/workers/wrangler/configuration/#queues</a>

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>name?: string</code></dt>
<dd>The name of this Queue.</dd>

<dt><code>deliveryDelay?: number</code></dt>
<dd>The number of seconds to wait before delivering a message.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



<code>name</code>Optional<a href="#config-bindings-bindings-queue-default">Link to name</a>

<code>name?: string</code>

The name of this Queue.

</details>

<details>

<summary>API_KEY: bindings.secret(), (secret reference)</summary>



<code>secret</code>Builder<a href="#config-bindings-bindings-secret-default">Link to secret</a>

<code>secret(): SecretBinding;</code>

Declares a secret that is required by your Worker, exposed on <code>env</code> under the binding name. When defined, this binding: - Replaces .dev.vars/.env/process.env inference for type generation - Enables local dev validation with warnings for missing secrets For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property">https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property</a>

</details>

},

},

});

The generated `Env` type contains these runtime types:

| Binding | Inferred runtime type |
| --- | --- |
| `API_ORIGIN` | `"https://api.example.com"` |
| `FEATURES` | `{ search: true }` |
| `DATABASE` | `D1Database` |
| `JOBS` | `Queue<Job>` |
| `API_KEY` | `string` |

Your Worker receives the inferred type through `env`:

*src/index.jsjs*

```js
export default {
	async fetch(_request, env) {
		await env.JOBS.send({
			id: "example-job",
			operation: "index",
		});

		const result = await env.DATABASE.prepare("SELECT 1").first();
		return Response.json({
			origin: env.API_ORIGIN,
			search: env.FEATURES.search,
			result,
		});
	},
};
```

*src/index.tsts*

```ts
export default {
	async fetch(_request, env) {
		await env.JOBS.send({
			id: "example-job",
			operation: "index",
		});

		const result = await env.DATABASE.prepare("SELECT 1").first();
		return Response.json({
			origin: env.API_ORIGIN,
			search: env.FEATURES.search,
			result,
		});
	},
} satisfies ExportedHandler<Env>;
```

The Cloudflare Vite plugin writes `.cloudflare/types/index.d.ts` during development and builds. Outside the Vite workflow, `cf workers types` writes the same file.

TypeScript wildcard patterns skip dot-prefixed directories, so include the generated directory explicitly. The `.ts` extensions in the examples on this page also need `allowImportingTsExtensions`:

*tsconfig.jsonjson*

```json
{
	"compilerOptions": {
		"allowImportingTsExtensions": true,
		"noEmit": true
	},
	"include": ["src", "cloudflare.config.ts", ".cloudflare/types"]
}
```

The builder API includes these methods:

| Area | Builder methods |
| --- | --- |
| Inline values | `text`, `json`, `secret` |
| Storage and data | `d1`, `kv`, `r2`, `hyperdrive`, `analyticsEngineDataset`, `artifacts`, `pipeline` |
| AI and media | `ai`, `aiSearch`, `aiSearchNamespace`, `agentMemory`, `browser`, `images`, `media`, `stream`, `vectorize` |
| Messaging | `queue`, `sendEmail` |
| Worker composition | `assets`, `dispatchNamespace`, `durableObject`, `worker`, `workerLoader`, `workflow` |
| Network and security | `mtlsCertificate`, `rateLimit`, `secretsStoreSecret`, `vpcNetwork`, `vpcService` |
| Platform metadata | `flagship`, `logfwdr`, `versionMetadata` |

Required options differ by binding. TypeScript completion shows the options for each builder.

### Type cross-Worker bindings

`bindings.worker()`, `bindings.durableObject()`, and `bindings.workflow()` accept a Worker name or a Worker definition. Import a Worker definition to validate its export names at compile time.

For example, an API Worker can export its definition:

Select a highlighted line to show its type and description below it.

api/cloudflare.config.ts

Expand allCopy

import { defineConfig, defineWorker, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export const apiWorker = defineWorker({ (defineWorker reference)</summary>



<code>defineWorker</code>Function<a href="#config-cross-worker-api-defineworker">Link to defineWorker</a>

<code>defineWorker&lt;T extends ConfigInput&lt;WorkerConfig&gt;&gt;(config: T): T;</code>

Defines a Worker configuration that you can pass to <code>worker</code> in <code>defineConfig()</code>. Pass a Worker configuration object, a promise that resolves to one, or a function that receives the config context (<code>isPreview</code> and <code>mode</code>) and returns either.

<details>

<summary>Options (18)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The name of your Worker.</dd>

<dt><code>compatibilityDate: string</code></dt>
<dd>A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a></dd>

<dt><code>compatibilityFlags?: string[]</code></dt>
<dd>A list of flags that enable features from upcoming features of the Workers runtime, usually used together with <code>compatibilityDate</code>. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-flags/">https://developers.cloudflare.com/workers/configuration/compatibility-flags/</a></dd>

<dt><code>entrypoint?: string | WorkerModule</code></dt>
<dd>The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.</dd>

<dt><code>assets?: { /** How to handle HTML requests. */ htmlHandling?: "auto-trailing-slash" | "drop-trailing-slash" | "force-trailing-slash" | "none"; /** How to handle requests that do not match an asset. */ notFoundHandling?: "single-page-application" | "404-page" | "none"; /** * Matches will be routed to the User Worker, and matches to negative rules will go to the Asset Worker. * * Can also be `true`, indicating that every request should be routed to the User Worker. */ runWorkerFirst?: string[] | boolean; }</code></dt>
<dd>Specify the directory of static assets to deploy/serve. More details at <a href="https://developers.cloudflare.com/workers/frameworks/">https://developers.cloudflare.com/workers/frameworks/</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#assets">https://developers.cloudflare.com/workers/wrangler/configuration/#assets</a></dd>

<dt><code>domains?: string[]</code></dt>
<dd>Custom domains that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a></dd>

<dt><code>triggers?: Trigger[]</code></dt>
<dd>Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a></dd>

<dt><code>tailConsumers?: Array&lt;{ /** The name of the service tail events will be forwarded to. */ worker: string; /** Whether to stream tail events in real time. */ streaming?: boolean; }&gt;</code></dt>
<dd>A list of Tail Workers that are bound to this Worker. <code>@cloudflare/config</code> unifies regular and streaming tail consumers under a single field; pass <code>streaming: true</code> to forward streaming tail events.</dd>

<dt><code>cache?: { /** If cache is enabled for this Worker. */ enabled: boolean; /** Whether cached assets may be reused across Worker versions. */ crossVersionCache?: boolean; }</code></dt>
<dd>Specify the cache behavior of the Worker.</dd>

<dt><code>placement?: { mode: "off" | "smart"; hint?: string; } | { mode?: "targeted"; region: string; } | { mode?: "targeted"; host: string; } | { mode?: "targeted"; hostname: string; }</code></dt>
<dd>Specify how the Worker should be located to minimize round-trip time. More details: <a href="https://developers.cloudflare.com/workers/platform/smart-placement/">https://developers.cloudflare.com/workers/platform/smart-placement/</a></dd>

<dt><code>limits?: { /** Maximum allowed CPU time for a Worker's invocation in milliseconds. */ cpuMs?: number; /** Maximum allowed number of fetch requests that a Worker's invocation can execute. */ subrequests?: number; }</code></dt>
<dd>Specify limits for runtime behavior. Only supported for the "standard" Usage Model. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#limits">https://developers.cloudflare.com/workers/wrangler/configuration/#limits</a></dd>

<dt><code>logpush?: boolean</code></dt>
<dd>Send Trace Events from this Worker to Workers Logpush. This will not configure a corresponding Logpush job automatically. For more information about Workers Logpush, see: <a href="https://blog.cloudflare.com/logpush-for-workers/">https://blog.cloudflare.com/logpush-for-workers/</a></dd>

<dt><code>observability?: { /** If observability is enabled for this Worker. */ enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** * Whether query strings are removed from request URLs in logs and traces. * * @default false */ redactQueryString?: boolean; /** Real-time Issues settings for this Worker. */ issues?: { /** Whether real-time Issues are enabled. */ enabled?: boolean; }; logs?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** Set to false to disable invocation logs. */ invocationLogs?: boolean; /** * If logs should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations logs emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }; traces?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** * If traces should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations traces emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }; }</code></dt>
<dd>Specify the observability behavior of the Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#observability">https://developers.cloudflare.com/workers/wrangler/configuration/#observability</a></dd>

<dt><code>workersDev?: boolean</code></dt>
<dd>Whether we use <code>&lt;name&gt;.&lt;subdomain&gt;.workers.dev</code> to test and deploy your Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev">https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev</a></dd>

<dt><code>previewUrls?: boolean</code></dt>
<dd>Whether we use <code>&lt;version&gt;-&lt;name&gt;.&lt;subdomain&gt;.workers.dev</code> to serve Preview URLs for your Worker.</dd>

<dt><code>unsafe?: { /** * Arbitrary key/value pairs that will be included in the uploaded metadata. Values specified * here will always be applied to metadata last, so can add new or override existing fields. */ metadata?: Record&lt;string, unknown&gt;; /** * Used for internal capnp uploads for the Workers runtime. */ capnp?: { basePath: string; sourceSchemas: string[]; compiledSchema?: never; } | { basePath?: never; sourceSchemas?: never; compiledSchema: string; }; }</code></dt>
<dd>"Unsafe" tables for runtime features that aren't directly supported by this configuration. Values are forwarded verbatim in the Worker's upload metadata.</dd>

<dt><code>env?: Record&lt;string, Binding&gt;</code></dt>
<dd>Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.</dd>

<dt><code>exports?: Record&lt;string, Export&gt;</code></dt>
<dd>Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.</dd>

</dl></details>



</details>

<details>

<summary>name: "api-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-cross-worker-api-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-cross-worker-api-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-cross-worker-api-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-cross-worker-api-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Admin: exports.worker(), (worker reference)</summary>



<code>worker</code>Builder<a href="#config-cross-worker-api-exports-worker-default">Link to worker</a>

<code>worker(options?: WorkerEntrypointExportOptions): WorkerEntrypointExport;</code>

Declares a WorkerEntrypoint export defined by this Worker.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code></dt>
<dd></dd>

</dl></details>



</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#config-cross-worker-api-exports-durableobject-created">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectCreatedExportOptions&lt;TContainer&gt;): DurableObjectCreatedExport&lt;TContainer&gt;;</code>

Declares a Durable Object class defined by this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>state?: "created"</code></dt>
<dd></dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



<code>storage</code>Required<a href="#config-cross-worker-api-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

},

});

<details>

<summary>export default defineConfig({ worker: apiWorker }); (defineConfig, worker reference)</summary>



<code>defineConfig</code>Function<a href="#config-cross-worker-api-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-cross-worker-api-defineconfig">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

A second Worker can import that definition:

Select a highlighted line to show its type and description below it.

web/cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig } from "cf/config";

import { apiWorker } from "../api/cloudflare.config.ts";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-cross-worker-web-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-cross-worker-web-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "web-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-cross-worker-web-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-cross-worker-web-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-cross-worker-web-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-cross-worker-web-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>API: bindings.worker({ (worker reference)</summary>



<code>worker</code>Builder<a href="#config-cross-worker-web-bindings-worker-default">Link to worker</a>

<code>worker&lt;TWorker$1 extends WorkerReference, TExportName$1 extends WorkerEntrypointExportName&lt;TWorker$1&gt; | undefined = undefined&gt;(options: WorkerBindingOptions&lt;TWorker$1, TExportName$1&gt;): WorkerBinding&lt;TWorker$1, NoInfer&lt;TExportName$1&gt;&gt;;</code>

Service binding (Worker-to-Worker). <code>worker</code> is the name or config of the bound Worker; <code>exportName</code> selects a named <code>WorkerEntrypoint</code> export (defaults to the default export). For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#service-bindings">https://developers.cloudflare.com/workers/wrangler/configuration/#service-bindings</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>worker: TWorker$1</code></dt>
<dd>The name or config of the bound Worker.</dd>

<dt><code>exportName?: TExportName$1</code></dt>
<dd>The named export to bind to (defaults to the default export).</dd>

<dt><code>props?: Record&lt;string, unknown&gt;</code></dt>
<dd>Optional properties that will be made available to the service via <code>ctx.props</code>.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>worker: apiWorker, (worker reference)</summary>



<code>worker</code>Required<a href="#config-cross-worker-web-bindings-worker-default-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the bound Worker.

</details>

<details>

<summary>exportName: "Admin", (exportName reference)</summary>



<code>exportName</code>Optional<a href="#config-cross-worker-web-bindings-worker-default-exportname">Link to exportName</a>

<code>exportName?: TExportName$1</code>

The named export to bind to (defaults to the default export).

</details>

}),

<details>

<summary>COUNTERS: bindings.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-cross-worker-web-bindings-durableobject-all">Link to durableObject</a>

<code>durableObject&lt;TWorker$1 extends WorkerReference, TExportName$1 extends DurableObjectExportName&lt;TWorker$1&gt;&gt;(options: DurableObjectBindingOptions&lt;TWorker$1, TExportName$1&gt;): DurableObjectBinding&lt;TWorker$1, TExportName$1&gt;;</code>

Binding to a Durable Object class. <code>worker</code> is the name or config of the Worker that defines the class; <code>exportName</code> is the exported class name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>worker: TWorker$1</code></dt>
<dd>The name or config of the Worker that defines the Durable Object class.</dd>

<dt><code>exportName: TExportName$1</code></dt>
<dd>The exported class name of the Durable Object.</dd></dl></details>



</details>

<details>

<summary>worker: apiWorker, (worker reference)</summary>



<code>worker</code>Required<a href="#config-cross-worker-web-bindings-durableobject-all-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the Worker that defines the Durable Object class.

</details>

<details>

<summary>exportName: "Counter", (exportName reference)</summary>



<code>exportName</code>Required<a href="#config-cross-worker-web-bindings-durableobject-all-exportname">Link to exportName</a>

<code>exportName: TExportName$1</code>

The exported class name of the Durable Object.

</details>

}),

},

},

});

Import the other configuration file with its `.ts` extension. Node.js loads `cloudflare.config.ts` with its own module resolution, which does not add extensions. An import without the extension fails with a `Cannot find module` error (`ERR_MODULE_NOT_FOUND`). Because API commands also load the nearest configuration file, the error breaks ordinary API commands in that directory too.

TypeScript rejects unknown export names. It also infers the `API` Remote Procedure Call (RPC) methods and the Durable Object stub type from the imported entrypoint.

Use a Worker name when the target definition cannot be imported. TypeScript can validate the binding shape, but it cannot validate the remote export name.

## Declare triggers

Each `triggers` method returns a typed event declaration. Add these values to the `worker.triggers` array.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, triggers } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-triggers-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-triggers-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-triggers-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-triggers-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-triggers-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>triggers: [ (triggers reference)</summary>



<code>triggers</code>Optional<a href="#config-triggers-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

</details>

<details>

<summary>triggers.fetch({ (fetch reference)</summary>



<code>fetch</code>Builder<a href="#config-triggers-triggers-fetch-default">Link to fetch</a>

<code>fetch(options: FetchTriggerOptions): FetchTrigger;</code>

Fetch trigger — a route that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>pattern: string</code></dt>
<dd>A route that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a></dd>

<dt><code>zone?: string</code></dt>
<dd>The DNS zone the pattern is attached to. Required when the pattern is ambiguous.</dd></dl></details>



</details>

<details>

<summary>pattern: "api.example.com/*", (pattern reference)</summary>



<code>pattern</code>Required<a href="#config-triggers-triggers-fetch-default-pattern">Link to pattern</a>

<code>pattern: string</code>

A route that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a>

</details>

<details>

<summary>zone: "example.com", (zone reference)</summary>



<code>zone</code>Optional<a href="#config-triggers-triggers-fetch-default-zone">Link to zone</a>

<code>zone?: string</code>

The DNS zone the pattern is attached to. Required when the pattern is ambiguous.

</details>

}),

<details>

<summary>triggers.queue({ (queue reference)</summary>



<code>queue</code>Builder<a href="#config-triggers-triggers-queue-default">Link to queue</a>

<code>queue(options: QueueConsumerTriggerOptions): QueueConsumerTrigger;</code>

Queue consumer trigger — invokes this Worker when messages arrive on the named queue. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#queues">https://developers.cloudflare.com/workers/wrangler/configuration/#queues</a>

<details>

<summary>Options (8)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The name of the queue from which this consumer should consume.</dd>

<dt><code>deadLetterQueue?: string</code></dt>
<dd>The queue to send messages that failed to be consumed.</dd>

<dt><code>maxBatchSize?: number</code></dt>
<dd>The maximum number of messages per batch.</dd>

<dt><code>maxBatchTimeout?: number</code></dt>
<dd>The maximum number of seconds to wait to fill a batch with messages.</dd>

<dt><code>maxConcurrency?: number | null</code></dt>
<dd>The maximum number of concurrent consumer Worker invocations. Leaving this unset will allow your consumer to scale to the maximum concurrency needed to keep up with the message backlog.</dd>

<dt><code>maxRetries?: number</code></dt>
<dd>The maximum number of retries for each message.</dd>

<dt><code>retryDelay?: number</code></dt>
<dd>The number of seconds to wait before retrying a message.</dd>

<dt><code>visibilityTimeoutMs?: number</code></dt>
<dd>The number of milliseconds to wait for pulled messages to become visible again.</dd></dl></details>



</details>

<details>

<summary>name: "application-jobs", (name reference)</summary>



<code>name</code>Required<a href="#config-triggers-triggers-queue-default-name">Link to name</a>

<code>name: string</code>

The name of the queue from which this consumer should consume.

</details>

<details>

<summary>maxBatchSize: 10, (maxBatchSize reference)</summary>



<code>maxBatchSize</code>Optional<a href="#config-triggers-triggers-queue-default-maxbatchsize">Link to maxBatchSize</a>

<code>maxBatchSize?: number</code>

The maximum number of messages per batch.

</details>

<details>

<summary>maxRetries: 3, (maxRetries reference)</summary>



<code>maxRetries</code>Optional<a href="#config-triggers-triggers-queue-default-maxretries">Link to maxRetries</a>

<code>maxRetries?: number</code>

The maximum number of retries for each message.

</details>

}),

<details>

<summary>triggers.scheduled({ schedule: "0 * * * *" }), (scheduled, schedule reference)</summary>



<code>scheduled</code>Builder<a href="#config-triggers-triggers-scheduled-default">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



<code>schedule</code>Required<a href="#config-triggers-triggers-scheduled-default">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

<details>

<summary>triggers.email({ addresses: ["support@example.com"] }), (email, addresses reference)</summary>



<code>email</code>Builder<a href="#config-triggers-triggers-email-default">Link to email</a>

<code>email(options: EmailTriggerOptions): EmailTrigger;</code>

Email trigger — invokes this Worker for the configured Email Routing addresses.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>addresses: string[]</code></dt>
<dd>Inbound Email Routing addresses handled by this Worker. Each entry is a literal recipient address (e.g. <code>"support@example.com"</code>) or a <code>*@domain</code> catch-all (e.g. <code>"*@example.com"</code>).</dd>

</dl></details>



<code>addresses</code>Required<a href="#config-triggers-triggers-email-default">Link to addresses</a>

<code>addresses: string[]</code>

Inbound Email Routing addresses handled by this Worker. Each entry is a literal recipient address (e.g. <code>"support@example.com"</code>) or a <code>*@domain</code> catch-all (e.g. <code>"*@example.com"</code>).

</details>

<details>

<summary>triggers.connect({ protocol: "tcp", port: 5432 }), (connect, protocol, port reference)</summary>



<code>connect</code>Builder<a href="#config-triggers-triggers-connect-default">Link to connect</a>

<code>connect(options: ConnectTriggerOptions): ConnectTrigger;</code>

Connect trigger — invokes this Worker's <code>connect(socket, env, ctx)</code> handler for raw socket connections received on the configured protocol/port.

<details>

<summary>Options (6)</summary>



<dl>

<dt><code>port: number</code></dt>
<dd>The port to listen on.</dd>

<dt><code>address?: string</code></dt>
<dd>The address to bind to. Defaults to <code>127.0.0.1</code>.</dd>

<dt><code>protocol: "tcp"</code></dt>
<dd></dd>

<dt><code>protocol: "udp"</code></dt>
<dd></dd>

<dt><code>idleTimeoutMs?: number</code></dt>
<dd>The idle timeout in milliseconds after which a peer flow is closed.</dd>

<dt><code>maxPendingBytes?: number</code></dt>
<dd>The maximum number of pending datagram bytes per peer flow.</dd></dl></details>



<code>protocol</code>Required<a href="#config-triggers-triggers-connect-default">Link to protocol</a>

<code>protocol: "tcp" | "udp"</code>

The type definition does not include a description.

<code>port</code>Required<a href="#config-triggers-triggers-connect-default">Link to port</a>

<code>port: number</code>

The port to listen on.

</details>

],

},

});

The builder provides these trigger methods:

| Method | Event |
| --- | --- |
| `fetch` | A route receives HTTP traffic |
| `queue` | A queue delivers messages |
| `scheduled` | A cron schedule runs |
| `email` | Email Routing receives matching email |
| `connect` | TCP or UDP traffic reaches the configured port |

Set `protocol` to `"tcp"` or `"udp"` in `triggers.connect()`. UDP triggers also accept `idleTimeoutMs` and `maxPendingBytes`.

Triggers control which events invoke a Worker. They do not create `env` bindings. TypeScript checks the options for each trigger, while Workers runtime types provide the handler signatures.

## Declare exports

The `worker.exports` map describes how the platform manages module exports. Each key must match the `default` export or a named class exported by the entrypoint.

Use `exports.worker()` to configure a `WorkerEntrypoint`. It accepts an optional per-entrypoint cache setting. Use `exports.durableObject()` to declare a Durable Object class and its lifecycle state. Use `exports.workflow()` to declare a class that extends `WorkflowEntrypoint`.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-exports-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-exports-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-exports-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-exports-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-exports-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-exports-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>default: exports.worker({ cache: { enabled: false } }), (worker, cache, enabled reference)</summary>



<code>worker</code>Builder<a href="#config-exports-exports-worker-default">Link to worker</a>

<code>worker(options?: WorkerEntrypointExportOptions): WorkerEntrypointExport;</code>

Declares a WorkerEntrypoint export defined by this Worker.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code></dt>
<dd></dd>

</dl></details>



<code>cache</code>Optional<a href="#config-exports-exports-worker-default">Link to cache</a>

<code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code>

The type definition does not include a description.

<code>enabled</code>Required<a href="#config-exports-exports-worker-default">Link to enabled</a>

<code>enabled: boolean</code>

Whether cache is enabled for this entrypoint.

</details>

<details>

<summary>Admin: exports.worker({ cache: { enabled: true } }), (worker, cache, enabled reference)</summary>



<code>worker</code>Builder<a href="#config-exports-exports-worker-default-2">Link to worker</a>

<code>worker(options?: WorkerEntrypointExportOptions): WorkerEntrypointExport;</code>

Declares a WorkerEntrypoint export defined by this Worker.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code></dt>
<dd></dd>

</dl></details>



<code>cache</code>Optional<a href="#config-exports-exports-worker-default-2">Link to cache</a>

<code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code>

The type definition does not include a description.

<code>enabled</code>Required<a href="#config-exports-exports-worker-default-2">Link to enabled</a>

<code>enabled: boolean</code>

Whether cache is enabled for this entrypoint.

</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#config-exports-exports-durableobject-created">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectCreatedExportOptions&lt;TContainer&gt;): DurableObjectCreatedExport&lt;TContainer&gt;;</code>

Declares a Durable Object class defined by this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>state?: "created"</code></dt>
<dd></dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



<code>storage</code>Required<a href="#config-exports-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

<details>

<summary>OrderWorkflow: exports.workflow({ (workflow reference)</summary>



<code>workflow</code>Builder<a href="#config-exports-exports-workflow-default">Link to workflow</a>

<code>workflow(options: WorkflowExportOptions): WorkflowExport;</code>

Declares a Workflow defined by this Worker. The export's key must name a class that extends <code>WorkflowEntrypoint</code>. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>

<details>

<summary>Options (5)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The name of the Workflow. It identifies the Workflow's instances and must be unique within the account.</dd>

<dt><code>limits?: { /** Maximum number of steps a single Workflow instance may run. */ steps?: number; }</code></dt>
<dd></dd>

<dt><code>concurrency?: { /** Maximum number of Workflow instances that can run concurrently. */ limit?: number; }</code></dt>
<dd></dd>

<dt><code>schedules?: string | string[]</code></dt>
<dd>Cron schedule(s) that automatically trigger Workflow instances.</dd>

<dt><code>defaultRetention?: { /** How long to retain instances that completed successfully or were terminated. */ successRetention?: number | string; /** How long to retain errored instances. */ errorRetention?: number | string; }</code></dt>
<dd>Default retention for instances of this Workflow, applied when an instance does not set its own retention. Accepts milliseconds or a duration string such as <code>"3 days"</code>.</dd>

</dl></details>



</details>

<details>

<summary>name: "order-workflow", (name reference)</summary>



<code>name</code>Required<a href="#config-exports-exports-workflow-default-name">Link to name</a>

<code>name: string</code>

The name of the Workflow. It identifies the Workflow's instances and must be unique within the account.

</details>

<details>

<summary>limits: { steps: 100 }, (limits, steps reference)</summary>



<code>limits</code>Optional<a href="#config-exports-exports-workflow-default-limits">Link to limits</a>

<code>limits?: { /** Maximum number of steps a single Workflow instance may run. */ steps?: number; }</code>

The type definition does not include a description.

<code>steps</code>Optional<a href="#config-exports-exports-workflow-default-limits">Link to steps</a>

<code>steps?: number</code>

Maximum number of steps a single Workflow instance may run.

</details>

<details>

<summary>defaultRetention: { (defaultRetention reference)</summary>



<code>defaultRetention</code>Optional<a href="#config-exports-exports-workflow-default-defaultretention">Link to defaultRetention</a>

<code>defaultRetention?: { /** How long to retain instances that completed successfully or were terminated. */ successRetention?: number | string; /** How long to retain errored instances. */ errorRetention?: number | string; }</code>

Default retention for instances of this Workflow, applied when an instance does not set its own retention. Accepts milliseconds or a duration string such as <code>"3 days"</code>.

</details>

<details>

<summary>successRetention: "3 days", (successRetention reference)</summary>



<code>successRetention</code>Optional<a href="#config-exports-exports-workflow-default-defaultretention-successretention">Link to successRetention</a>

<code>successRetention?: number | string</code>

How long to retain instances that completed successfully or were terminated.

</details>

<details>

<summary>errorRetention: "7 days", (errorRetention reference)</summary>



<code>errorRetention</code>Optional<a href="#config-exports-exports-workflow-default-defaultretention-errorretention">Link to errorRetention</a>

<code>errorRetention?: number | string</code>

How long to retain errored instances.

</details>

},

}),

},

},

});

The builders describe exported code. They do not create JavaScript exports. The entrypoint must still export `Admin`, `Counter`, and `OrderWorkflow`.

`exports.workflow()` requires a `name`, which must be unique within the account. It also accepts `limits.steps`, `concurrency.limit`, `schedules` for cron schedules that start instances, and `defaultRetention`. Retention values accept milliseconds or a duration string, such as `"3 days"`.

To bind to a Workflow, from the same Worker or another one, use `bindings.workflow()`. It requires the Workflow's `name`, the `worker` that defines it (a Worker name or a Worker definition), and the `exportName` of its class, such as `bindings.workflow({ name: "order-workflow", worker: "example-worker", exportName: "OrderWorkflow" })`.

### Manage Durable Object lifecycle

The `exports` map replaces an ordered Durable Object migration history. Keep live classes in the map. Add temporary tombstones when a class is deleted, renamed, or transferred.

The key of each entry is the Durable Object class name. The `state` field selects the valid lifecycle options:

| State | Purpose |
| --- | --- |
| `created` or omitted | Declares a live class with `sqlite` or `legacy-kv` storage |
| `deleted` | Retires a namespace after its class is removed |
| `renamed` | Renames the key to the live class named by `renamedTo` |
| `expecting-transfer` | Prepares the destination Worker to receive a namespace from `transferFrom` |
| `transferred` | Transfers ownership to the same-account Worker named by `transferredTo` |

Use `sqlite` for new classes. A live or incoming class that uses `sqlite` can attach a Container definition. You cannot attach a Container to a `legacy-kv` class or a tombstone.

#### Distinguish exports from bindings

Exports and bindings serve different purposes:

| Configuration | Purpose |
| --- | --- |
| `exports.Counter` | Declares the class and manages its namespace lifecycle |
| `env.COUNTERS` | Injects a namespace binding under `env.COUNTERS` |
| `ctx.exports.Counter` | Accesses a class exported by the same Worker without an `env` binding |

Live Durable Object exports become typed properties on `ctx.exports`. A Worker does not need an `env` binding to call its own class.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-ctx-exports-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-ctx-exports-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "counter-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-ctx-exports-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-ctx-exports-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-ctx-exports-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>compatibilityFlags: ["enable_ctx_exports"], (compatibilityFlags reference)</summary>



<code>compatibilityFlags</code>Optional<a href="#config-ctx-exports-workerconfig-compatibilityflags">Link to compatibilityFlags</a>

<code>compatibilityFlags?: string[]</code>

A list of flags that enable features from upcoming features of the Workers runtime, usually used together with <code>compatibilityDate</code>. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-flags/">https://developers.cloudflare.com/workers/configuration/compatibility-flags/</a>

Default: <code>[]</code>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-ctx-exports-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#config-ctx-exports-exports-durableobject-created">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectCreatedExportOptions&lt;TContainer&gt;): DurableObjectCreatedExport&lt;TContainer&gt;;</code>

Declares a Durable Object class defined by this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>state?: "created"</code></dt>
<dd></dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



<code>storage</code>Required<a href="#config-ctx-exports-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

},

},

});

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	getValue() {
		return this.ctx.storage.get("value");
	}
}

export default {
	async fetch(_request, _env, ctx) {
		const id = ctx.exports.Counter.idFromName("global");
		const stub = ctx.exports.Counter.get(id);
		return Response.json({ value: await stub.getValue() });
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	getValue() {
		return this.ctx.storage.get<number>("value");
	}
}

export default {
	async fetch(_request, _env, ctx) {
		const id = ctx.exports.Counter.idFromName("global");
		const stub = ctx.exports.Counter.get(id);
		return Response.json({ value: await stub.getValue() });
	},
} satisfies ExportedHandler<Env>;
```

The generated types include live and incoming Durable Object exports. Tombstones do not appear on `ctx.exports`.

#### Rename or delete a class

A rename keeps the old name as a tombstone. The destination name must appear as a live entry in the same map. Remove the old class from the Worker code.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-rename-delete-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-rename-delete-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "counter-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-rename-delete-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-rename-delete-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-rename-delete-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-rename-delete-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#config-rename-delete-exports-durableobject-created">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectCreatedExportOptions&lt;TContainer&gt;): DurableObjectCreatedExport&lt;TContainer&gt;;</code>

Declares a Durable Object class defined by this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>state?: "created"</code></dt>
<dd></dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



<code>storage</code>Required<a href="#config-rename-delete-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

<details>

<summary>OldCounter: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-rename-delete-exports-durableobject-renamed">Link to durableObject</a>

<code>durableObject(options: DurableObjectRenamedExportOptions): DurableObjectRenamedExport;</code>

Rename a provisioned Durable Object namespace's class.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>state: "renamed"</code></dt>
<dd></dd>

<dt><code>renamedTo: string</code></dt>
<dd>The destination class name. Must be a valid JavaScript identifier and must appear as a live (<code>state: "created"</code>) <code>durableObject</code> entry in the same <code>exports</code> map.</dd></dl></details>



</details>

<details>

<summary>state: "renamed", (state reference)</summary>



<code>state</code>Required<a href="#config-rename-delete-exports-durableobject-renamed-state">Link to state</a>

<code>state: "renamed"</code>

The type definition does not include a description.

</details>

<details>

<summary>renamedTo: "Counter", (renamedTo reference)</summary>



<code>renamedTo</code>Required<a href="#config-rename-delete-exports-durableobject-renamed-renamedto">Link to renamedTo</a>

<code>renamedTo: string</code>

The destination class name. Must be a valid JavaScript identifier and must appear as a live (<code>state: "created"</code>) <code>durableObject</code> entry in the same <code>exports</code> map.

</details>

}),

<details>

<summary>UnusedCounter: exports.durableObject({ state: "deleted" }), (durableObject, state reference)</summary>



<code>durableObject</code>Builder<a href="#config-rename-delete-exports-durableobject-deleted">Link to durableObject</a>

<code>durableObject(options: DurableObjectDeletedExportOptions): DurableObjectDeletedExport;</code>

Retire a provisioned Durable Object namespace whose class has been removed from code.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>state: "deleted"</code></dt>
<dd></dd>

</dl></details>



<code>state</code>Required<a href="#config-rename-delete-exports-durableobject-deleted">Link to state</a>

<code>state: "deleted"</code>

The type definition does not include a description.

</details>

},

},

});

Before you delete a namespace, remove every binding to that class. The uploaded Worker must not export a class marked as `deleted`.

Deployment responses identify stale tombstones that are safe to remove. Keep each tombstone until it appears in that response, then remove it from the map. You do not need to retain the complete migration history.

#### Transfer a class between Workers

A namespace transfer uses two deployments. Both Workers must use the same Cloudflare account.

First, deploy the destination Worker with an incoming live entry:

Select a highlighted line to show its type and description below it.

destination/cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-transfer-destination-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-transfer-destination-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "destination-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-transfer-destination-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-transfer-destination-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-transfer-destination-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-transfer-destination-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-transfer-destination-exports-durableobject-expecting-transfer">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectExpectingTransferExportOptions&lt;TContainer&gt;): DurableObjectExpectingTransferExport&lt;TContainer&gt;;</code>

Prepare to receive cross-Worker Durable Object transfer. The source Worker must follow up with a deployment containing a <code>transferred</code> export to commit the transfer.

<details>

<summary>Options (5)</summary>



<dl>

<dt><code>state: "expecting-transfer"</code></dt>
<dd></dd>

<dt><code>transferFrom: string</code></dt>
<dd>The source Worker for the two-phase cross-Worker transfer.</dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



</details>

<details>

<summary>state: "expecting-transfer", (state reference)</summary>



<code>state</code>Required<a href="#config-transfer-destination-exports-durableobject-expecting-transfer-state">Link to state</a>

<code>state: "expecting-transfer"</code>

The type definition does not include a description.

</details>

<details>

<summary>storage: "sqlite", (storage reference)</summary>



<code>storage</code>Required<a href="#config-transfer-destination-exports-durableobject-expecting-transfer-storage">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

<details>

<summary>transferFrom: "source-worker", (transferFrom reference)</summary>



<code>transferFrom</code>Required<a href="#config-transfer-destination-exports-durableobject-expecting-transfer-transferfrom">Link to transferFrom</a>

<code>transferFrom: string</code>

The source Worker for the two-phase cross-Worker transfer.

</details>

}),

},

},

});

Then deploy the source Worker with a transfer tombstone:

Select a highlighted line to show its type and description below it.

source/cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-transfer-source-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-transfer-source-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "source-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-transfer-source-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-transfer-source-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-transfer-source-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-transfer-source-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-transfer-source-exports-durableobject-transferred">Link to durableObject</a>

<code>durableObject(options: DurableObjectTransferredExportOptions): DurableObjectTransferredExport;</code>

Transfer ownership of a Durable Object namespace to another Worker in the same account.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>state: "transferred"</code></dt>
<dd></dd>

<dt><code>transferredTo: string</code></dt>
<dd>The destination Worker. Must reference a Worker in the same account.</dd></dl></details>



</details>

<details>

<summary>state: "transferred", (state reference)</summary>



<code>state</code>Required<a href="#config-transfer-source-exports-durableobject-transferred-state">Link to state</a>

<code>state: "transferred"</code>

The type definition does not include a description.

</details>

<details>

<summary>transferredTo: "destination-worker", (transferredTo reference)</summary>



<code>transferredTo</code>Required<a href="#config-transfer-source-exports-durableobject-transferred-transferredto">Link to transferredTo</a>

<code>transferredTo: string</code>

The destination Worker. Must reference a Worker in the same account.

</details>

}),

},

},

});

Lifecycle changes take effect when a version is deployed, not when it is uploaded. Deploy an export-changing version to 100% of traffic before you split traffic with other versions. The platform rejects split deployments whose versions disagree about `exports`.

### Attach a Container

Define a Container once. Reference it from a Durable Object export and add it to the top-level `containers` array.

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig, defineContainer, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>const imageProcessor = defineContainer({ (defineContainer reference)</summary>



<code>defineContainer</code>Function<a href="#config-container-definecontainer">Link to defineContainer</a>

<code>defineContainer&lt;T extends ConfigInput&lt;ContainerConfig&gt;&gt;(config: T): T;</code>

Defines a Container application that you can list in <code>containers</code> in <code>defineConfig()</code> or attach to a Durable Object export with its <code>container</code> option.

</details>

name: "image-processor",

image: { dockerfile: "./Dockerfile" },

instanceType: "lite",

maxInstances: 1,

});

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#config-container-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#config-container-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "image-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-container-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-container-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-container-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-container-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>ImageProcessor: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-container-exports-durableobject-created">Link to durableObject</a>

<code>durableObject&lt;TContainer extends ContainerDefinition | undefined = undefined&gt;(options: DurableObjectCreatedExportOptions&lt;TContainer&gt;): DurableObjectCreatedExport&lt;TContainer&gt;;</code>

Declares a Durable Object class defined by this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (4)</summary>



<dl>

<dt><code>state?: "created"</code></dt>
<dd></dd>

<dt><code>storage: "sqlite"</code></dt>
<dd>Selects the SQLite-backed storage engine (recommended for new classes).</dd>

<dt><code>container?: TContainer</code></dt>
<dd>Attach a Container application to this Durable Object by config reference.</dd>

<dt><code>storage: "legacy-kv"</code></dt>
<dd>Selects the legacy key-value storage engine.</dd></dl></details>



</details>

<details>

<summary>storage: "sqlite", (storage reference)</summary>



<code>storage</code>Required<a href="#config-container-exports-durableobject-created-storage">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

<details>

<summary>container: imageProcessor, (container reference)</summary>



<code>container</code>Optional<a href="#config-container-exports-durableobject-created-container">Link to container</a>

<code>container?: TContainer</code>

Attach a Container application to this Durable Object by config reference.

</details>

}),

},

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-container-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>IMAGE_PROCESSOR: bindings.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-container-bindings-durableobject-all">Link to durableObject</a>

<code>durableObject&lt;TWorker$1 extends WorkerReference, TExportName$1 extends DurableObjectExportName&lt;TWorker$1&gt;&gt;(options: DurableObjectBindingOptions&lt;TWorker$1, TExportName$1&gt;): DurableObjectBinding&lt;TWorker$1, TExportName$1&gt;;</code>

Binding to a Durable Object class. <code>worker</code> is the name or config of the Worker that defines the class; <code>exportName</code> is the exported class name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>worker: TWorker$1</code></dt>
<dd>The name or config of the Worker that defines the Durable Object class.</dd>

<dt><code>exportName: TExportName$1</code></dt>
<dd>The exported class name of the Durable Object.</dd></dl></details>



</details>

<details>

<summary>worker: "image-worker", (worker reference)</summary>



<code>worker</code>Required<a href="#config-container-bindings-durableobject-all-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the Worker that defines the Durable Object class.

</details>

<details>

<summary>exportName: "ImageProcessor", (exportName reference)</summary>



<code>exportName</code>Required<a href="#config-container-bindings-durableobject-all-exportname">Link to exportName</a>

<code>exportName: TExportName$1</code>

The exported class name of the Durable Object.

</details>

}),

},

},

<details>

<summary>containers: [imageProcessor], (containers reference)</summary>



<code>containers</code>Optional<a href="#config-container-cloudflareconfig-containers">Link to containers</a>

<code>containers?: ConfigInput&lt;ContainerConfig&gt;[]</code>

Container applications defined by this configuration.

</details>

});

Container names must be unique. Each Container can be linked to only one Durable Object export.

`cf deploy` applies supported Container application changes. `cf workers versions create` prepares images for Durable Object-managed Containers, but it does not apply Container applications.

## Set account defaults

Set `accountId` and `complianceRegion` at the top level of the default export. Supported compliance regions are `public` and `fedramp-high`.

`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_COMPLIANCE_REGION` take priority over these values. When neither the environment nor the configuration sets an account, `cf` uses the account it saved on an earlier command, or resolves one from your credentials. For the full order, refer to [Select an account](https://developers.cloudflare.com/cf/get-started/#select-an-account).

`cf` searches from the current directory toward the filesystem root and uses the nearest `cloudflare.config.ts` file.

When an API command reads account defaults, `cf` executes the module and resolves the default export. If the default export is a function, `cf` calls it with `isPreview: false` and the mode passed with `--mode`. Without `--mode`, the mode is `undefined`, while a Vite build of the same project uses `production`. `cf deploy`, `cf workers versions create`, and `cf workers triggers deploy` resolve the account the same way. Without `--mode`, they evaluate the configuration with an `undefined` mode, even when the Vite build used `production`. If `accountId` depends on the mode, pass `--mode` explicitly to every command.

API commands do not evaluate nested `worker` or `containers` factories, and they do not validate Worker fields. Syntax errors, import errors, and top-level runtime errors in the module still break them.

## Select a mode

Pass `--mode <NAME>`, or `-m <NAME>`, to evaluate function-form configuration for a named mode. Project commands also pass the mode to the build:

```sh
cf build --mode staging
cf deploy --mode staging
```

When you omit `--mode`, the default depends on the tool that evaluates the configuration:

| Command | Default mode |
| --- | --- |
| `cf dev` with the Cloudflare Vite plugin | `development` |
| `cf build`, `cf deploy`, and other commands that build with Vite | `production` |
| Commands that build with Wrangler | `undefined` |
| API commands, such as `cf d1 list` | `undefined` |

When `cf` runs a framework's own command, only Vite and Astro accept `--mode`. For other frameworks, the command stops with an error that says the detected command does not currently support `--mode`.

Build Output records the mode in its root `config.json`. To deploy an existing build with `--prebuilt`, pass the recorded mode. For the rule and examples, refer to [Deploy a prebuilt build](https://developers.cloudflare.com/cf/projects/#deploy-a-prebuilt-build).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/projects/cloudflare-config/#page","headline":"Programmatic configuration","description":"Configure Workers projects with a typed cloudflare.config.ts file.","url":"https://developers.cloudflare.com/cf/projects/cloudflare-config/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/projects/cloudflare-config/og.png?v=b3958a991af163a7","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
