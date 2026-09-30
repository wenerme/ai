---
description: Find cf equivalents for Wrangler commands, and map Wrangler configuration, build settings, and environments to cf.
title: Wrangler to cf reference
image: https://developers.cloudflare.com/cf/wrangler/reference/og.png?v=89a02a5f88f20fa3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler to cf reference

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/wrangler/reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`cf migrate` converts a Wrangler project to `cf` for you. It writes `cloudflare.config.ts` from the Wrangler configuration file, adds `cf` to the project, and lists the items that you finish by hand. Start with [Migrate a Wrangler project](https://developers.cloudflare.com/cf/wrangler/migrate/), then use this page to understand what `cf migrate` changed or to finish a conversion by hand.

## Commands

Most Wrangler commands have a `cf` equivalent, although the command name and arguments can differ. For example, Worker versions and deployments are under `cf workers versions` and `cf workers deployments`.

To find the `cf` command for a task, use any of the following:

- **Search**: describe the task to `cf cli search`, then inspect the match with `cf schema`:

  ```sh
  cf cli search "create a D1 database"
  cf schema d1 create
  ```


- **Help**: add `--help` to a command group, such as `cf d1 --help`, to list its commands and options.
- **Coding agent**: ask your agent for the `cf` equivalent of a Wrangler command. To set up your agent, refer to [Use cf with coding agents](https://developers.cloudflare.com/cf/agents/).

Resource commands in `cf` take the identifiers that the Cloudflare API expects, such as a D1 database ID rather than its name. They act on remote resources. `--local` works only for a few resources that local development provides, such as KV keys, D1 through `cf d1 raw`, `cf d1 migrations list`, and `cf d1 migrations apply`, and R2 objects. For the full list, refer to [Local resource data](https://developers.cloudflare.com/cf/projects/#local-resource-data). Commands without a local equivalent, such as `cf d1 query`, return an error.

### Commands not yet supported

`cf` is in beta, and some Wrangler commands are not supported yet. Run these with `npx wrangler` instead of installing Wrangler. Wrangler does not read `cloudflare.config.ts`, so pass the Worker name.

- **`wrangler tail`**: `cf` cannot stream live logs yet. Run:

  ```sh
  npx wrangler tail <WORKER_NAME>
  ```


- **`wrangler secret put`**: `cf` cannot set a single secret yet. Run `npx wrangler secret put <SECRET_NAME> --name <WORKER_NAME>`, or upload secrets with a new Worker version by passing `--secrets-file <PATH>` to `cf deploy` or `cf workers versions create`.

## Configuration fields

`cf migrate` converts Wrangler fields as the following table shows. Worker settings go under `worker` in `cloudflare.config.ts`, and bindings go under `worker.env`. A required item is a follow-up that you resolve by hand, as described in [Resolve follow-up items](https://developers.cloudflare.com/cf/wrangler/migrate/#resolve-follow-up-items).

| Wrangler field | `cloudflare.config.ts` | Notes |
| --- | --- | --- |
| `name` | `worker.name` | — |
| `main` | `worker.entrypoint` | Written as a string path. You can replace it with a `cf-worker` import. |
| `compatibility_date` | `worker.compatibilityDate` | — |
| `compatibility_flags` | `worker.compatibilityFlags` | — |
| `account_id` | `accountId` | Top level |
| `compliance_region` | `complianceRegion` | Top level. `fedramp_high` becomes `fedramp-high`. |
| `vars` | `bindings.text()` or `bindings.json()` | Strings use `text()`. Other values use `json()`. |
| `secrets.required` | `bindings.secret()` | — |
| KV, D1, R2, Hyperdrive, and other bindings | The matching `bindings` builder | Preview resource fields are a required item. |
| `services` | `bindings.worker({ worker })` | A legacy service environment is a required item. |
| `queues.producers` | `bindings.queue({ name })` | — |
| `queues.consumers` | `triggers.queue({ name })` | Consumer settings become camelCase options, such as `maxBatchSize`. |
| Hyperdrive `localConnectionString` | `dev: { connectionString }` on `bindings.hyperdrive()` | — |
| `remote: true` on a binding | `dev: { remote: true }` | — |
| `routes` with `zone_name` | `triggers.fetch({ pattern, zone })` | — |
| `routes` with `zone_id` | `triggers.fetch({ pattern, zone })` | Required item. `zone` accepts a zone name or a zone ID. |
| `routes` with `custom_domain: true` | `worker.domains` | — |
| `triggers.crons` | `triggers.scheduled({ schedule })` | — |
| `durable_objects.bindings` | `bindings.durableObject({ worker, exportName })` | Required item. Review each binding. |
| `migrations` | `worker.exports` | Not converted. Refer to [Convert Durable Object migrations](#convert-durable-object-migrations). |
| `workflows` | `bindings.workflow()` and `exports.workflow()` | Required item. Refer to [Workflows](https://developers.cloudflare.com/cf/projects/cloudflare-config/#declare-exports). |
| `containers` | `defineContainer()` in top-level `containers` | Required item. Refer to [Containers](https://developers.cloudflare.com/cf/projects/cloudflare-config/#attach-a-container). |
| `assets.binding` | `bindings.assets()` | — |
| `assets.html_handling`, `not_found_handling`, `run_worker_first` | `worker.assets` | Keys become camelCase, such as `notFoundHandling`. |
| `assets.directory` | Build settings | Refer to [Build settings](#build-settings). |
| `observability` | `worker.observability` | Keys become camelCase, such as `headSamplingRate`. |
| `limits` | `worker.limits` | Keys become camelCase, such as `cpuMs`. |
| `placement` | `worker.placement` | — |
| `tail_consumers` | `worker.tailConsumers` | — |
| `streaming_tail_consumers` | `worker.tailConsumers` | Each entry gets `streaming: true`. |
| `workers_dev` | `worker.workersDev` | — |
| `preview_urls` | `worker.previewUrls` | — |
| `env.<NAME>` | A `case` in `switch (ctx.mode)` | Refer to [Convert environments to modes](#environments-to-modes). |
| `previews` | A branch on `ctx.isPreview` | Required item. Review the branch. |
| `site` | — | Not supported. Move the site to [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/). |
| D1 `migrations_dir`, `migrations_pattern`, `migrations_table` | — | Pass `--dir`, `--pattern`, and `--table` to `cf d1 migrations apply`. |
| `build`, `minify`, `alias`, and other build fields | Build settings | Refer to [Build settings](#build-settings). |

For every field and builder, refer to [Programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/) and the [Configuration explorer](https://developers.cloudflare.com/cf/projects/config-explorer/).

## Build settings

Build settings do not go in `cloudflare.config.ts`. Where they go depends on the bundler:

| Wrangler field | Vite bundler: `vite.config.ts` | Wrangler bundler: `wrangler.config.ts` |
| --- | --- | --- |
| `alias` | `resolve.alias` | `alias` |
| `define` | `define` | `define` |
| `minify` | `build.minify` | `minify` |
| `upload_source_maps` | `build.sourcemap` in the Worker's Vite environment | `uploadSourceMaps` |
| `assets.directory` | `publicDir` | `assetsDirectory` |
| `build` | Run the command yourself before `cf build` | `build`, with camelCase keys |
| `dev` | `server` options | `dev`, with camelCase keys |
| `rules`, `tsconfig`, `no_bundle`, `find_additional_modules`, `base_dir`, `preserve_file_names` | Not used. Vite handles module resolution and bundling. | camelCase keys, such as `noBundle` and `baseDir` |

With the Wrangler bundler, `cf migrate` writes these settings to `wrangler.config.ts` for you and adds `types: { generate: false }`. With the Vite bundler, it lists the fields in a required item for you to move. `wrangler.config.ts` is experimental and can change during the beta.

## Convert environments to modes

Wrangler environments inherit some top-level fields. `cloudflare.config.ts` does not merge environments. It returns one complete configuration for each mode instead. `cf migrate` writes a `switch (ctx.mode)` statement with one `case` for each environment. For the generated shape, refer to [Environments](https://developers.cloudflare.com/cf/wrangler/migrate/#environments).

Replace `--env <NAME>` with `--mode <NAME>` on project commands, such as `cf dev`, `cf build`, `cf deploy`, `cf workers versions create`, and `cf workers triggers deploy`.

Without `--mode`, the mode depends on the command and the bundler:

| Command | Vite bundler | Wrangler bundler |
| --- | --- | --- |
| `cf dev` | `development` | `undefined` |
| `cf build` and `cf deploy` | `production` | `undefined` |
| API commands, such as `cf d1 list` | `undefined` | `undefined` |

API commands evaluate `cloudflare.config.ts` only to read `accountId` and `complianceRegion`. If `accountId` depends on the mode, a Vite build and an API command can resolve different accounts. Keep `accountId` independent of the mode, or pass the same `--mode` to every command.

For more information, refer to [Modes](https://developers.cloudflare.com/cf/projects/#modes).

## Convert Durable Object migrations

`worker.exports` replaces the ordered `migrations` history. `cf migrate` does not convert it.

On the first deployment that switches from `migrations` to `worker.exports`, declare every class whose namespace is live today. Use `storage: "sqlite"` or `storage: "legacy-kv"` to match its existing storage.

Do not copy the full migration history. Omit rename and delete operations that have already been applied. If you add them, they become stale tombstones that the deployment reports as safe to remove.

Add a tombstone only for a lifecycle change that has not been applied yet:

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#durable-object-tombstones-defineconfig">Link to defineConfig</a>

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



<code>worker</code>Optional<a href="#durable-object-tombstones-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "orders-api", (name reference)</summary>



<code>name</code>Required<a href="#durable-object-tombstones-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#durable-object-tombstones-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "2026-08-24", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#durable-object-tombstones-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#durable-object-tombstones-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#durable-object-tombstones-exports-durableobject-created">Link to durableObject</a>

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



<code>storage</code>Required<a href="#durable-object-tombstones-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

<details>

<summary>OldCounter: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#durable-object-tombstones-exports-durableobject-renamed">Link to durableObject</a>

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



<code>state</code>Required<a href="#durable-object-tombstones-exports-durableobject-renamed-state">Link to state</a>

<code>state: "renamed"</code>

The type definition does not include a description.

</details>

<details>

<summary>renamedTo: "Counter", (renamedTo reference)</summary>



<code>renamedTo</code>Required<a href="#durable-object-tombstones-exports-durableobject-renamed-renamedto">Link to renamedTo</a>

<code>renamedTo: string</code>

The destination class name. Must be a valid JavaScript identifier and must appear as a live (<code>state: "created"</code>) <code>durableObject</code> entry in the same <code>exports</code> map.

</details>

}),

<details>

<summary>UnusedCounter: exports.durableObject({ state: "deleted" }), (durableObject, state reference)</summary>



<code>durableObject</code>Builder<a href="#durable-object-tombstones-exports-durableobject-deleted">Link to durableObject</a>

<code>durableObject(options: DurableObjectDeletedExportOptions): DurableObjectDeletedExport;</code>

Retire a provisioned Durable Object namespace whose class has been removed from code.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>state: "deleted"</code></dt>
<dd></dd>

</dl></details>



<code>state</code>Required<a href="#durable-object-tombstones-exports-durableobject-deleted">Link to state</a>

<code>state: "deleted"</code>

The type definition does not include a description.

</details>

},

},

});

Keep a tombstone until a deployment response reports that it is stale, then remove it. Use `cf deploy`, rather than a version upload, for a version that creates, deletes, renames, or transfers a Durable Object class. You cannot roll back a Durable Object lifecycle change to a version from before the change.

For transfers between Workers and the full list of states, refer to [Manage Durable Object lifecycle](https://developers.cloudflare.com/cf/projects/cloudflare-config/#manage-durable-object-lifecycle).

## Complete example

This example finishes the migration of `orders-api`, the Worker used in [Migrate a Wrangler project](https://developers.cloudflare.com/cf/wrangler/migrate/). It has a D1 database, a queue, a cron trigger, a route, and a Durable Object. After `cf migrate` and the follow-up steps, `cloudflare.config.ts` is:

Select a highlighted line to show its type and description below it.

cloudflare.config.ts

Expand allCopy

import { bindings, defineConfig, exports, triggers } from "cf/config";

import \* as entrypoint from "./src/index.ts" with { type: "cf-worker" };

type Job = { orderId: string };

<details>

<summary>export default defineConfig({ (defineConfig reference)</summary>



<code>defineConfig</code>Function<a href="#orders-api-config-defineconfig">Link to defineConfig</a>

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

<summary>accountId: "&lt;ACCOUNT_ID&gt;", (accountId reference)</summary>



<code>accountId</code>Optional<a href="#orders-api-config-settings-accountid">Link to accountId</a>

<code>accountId?: string</code>

This is the ID of the account associated with your zone. It can also be specified through the <code>CLOUDFLARE_ACCOUNT_ID</code> environment variable.

</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#orders-api-config-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "orders-api", (name reference)</summary>



<code>name</code>Required<a href="#orders-api-config-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#orders-api-config-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "2026-08-24", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#orders-api-config-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>compatibilityFlags: ["nodejs_compat"], (compatibilityFlags reference)</summary>



<code>compatibilityFlags</code>Optional<a href="#orders-api-config-workerconfig-compatibilityflags">Link to compatibilityFlags</a>

<code>compatibilityFlags?: string[]</code>

A list of flags that enable features from upcoming features of the Workers runtime, usually used together with <code>compatibilityDate</code>. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-flags/">https://developers.cloudflare.com/workers/configuration/compatibility-flags/</a>

Default: <code>[]</code>

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#orders-api-config-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>ENVIRONMENT: bindings.text("production"), (text reference)</summary>



<code>text</code>Builder<a href="#orders-api-config-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

<details>

<summary>DB: bindings.d1({ (d1 reference)</summary>



<code>d1</code>Builder<a href="#orders-api-config-bindings-d1-default">Link to d1</a>

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



</details>

<details>

<summary>name: "orders-db", (name reference)</summary>



<code>name</code>Optional<a href="#orders-api-config-bindings-d1-default-name">Link to name</a>

<code>name?: string</code>

The name of this D1 database.

</details>

<details>

<summary>id: "&lt;DATABASE_ID&gt;", (id reference)</summary>



<code>id</code>Optional<a href="#orders-api-config-bindings-d1-default-id">Link to id</a>

<code>id?: string</code>

The UUID of this D1 database (not required).

</details>

}),

<details>

<summary>JOBS: bindings.queue&lt;Job&gt;({ name: "orders-jobs" }), (queue, name reference)</summary>



<code>queue</code>Builder<a href="#orders-api-config-bindings-queue-default">Link to queue</a>

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



<code>name</code>Optional<a href="#orders-api-config-bindings-queue-default">Link to name</a>

<code>name?: string</code>

The name of this Queue.

</details>

<details>

<summary>COUNTERS: bindings.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#orders-api-config-bindings-durableobject-all">Link to durableObject</a>

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

<summary>worker: "orders-api", (worker reference)</summary>



<code>worker</code>Required<a href="#orders-api-config-bindings-durableobject-all-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the Worker that defines the Durable Object class.

</details>

<details>

<summary>exportName: "Counter", (exportName reference)</summary>



<code>exportName</code>Required<a href="#orders-api-config-bindings-durableobject-all-exportname">Link to exportName</a>

<code>exportName: TExportName$1</code>

The exported class name of the Durable Object.

</details>

}),

},

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#orders-api-config-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Counter: exports.durableObject({ storage: "sqlite" }), (durableObject, storage reference)</summary>



<code>durableObject</code>Builder<a href="#orders-api-config-exports-durableobject-created">Link to durableObject</a>

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



<code>storage</code>Required<a href="#orders-api-config-exports-durableobject-created">Link to storage</a>

<code>storage: "sqlite" | "legacy-kv"</code>

Selects the SQLite-backed storage engine (recommended for new classes). Selects the legacy key-value storage engine.

</details>

},

<details>

<summary>triggers: [ (triggers reference)</summary>



<code>triggers</code>Optional<a href="#orders-api-config-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

</details>

<details>

<summary>triggers.fetch({ (fetch reference)</summary>



<code>fetch</code>Builder<a href="#orders-api-config-triggers-fetch-default">Link to fetch</a>

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



<code>pattern</code>Required<a href="#orders-api-config-triggers-fetch-default-pattern">Link to pattern</a>

<code>pattern: string</code>

A route that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a>

</details>

<details>

<summary>zone: "example.com", (zone reference)</summary>



<code>zone</code>Optional<a href="#orders-api-config-triggers-fetch-default-zone">Link to zone</a>

<code>zone?: string</code>

The DNS zone the pattern is attached to. Required when the pattern is ambiguous.

</details>

}),

<details>

<summary>triggers.queue({ name: "orders-jobs", maxBatchSize: 10 }), (queue, name, maxBatchSize reference)</summary>



<code>queue</code>Builder<a href="#orders-api-config-triggers-queue-default">Link to queue</a>

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



<code>name</code>Required<a href="#orders-api-config-triggers-queue-default">Link to name</a>

<code>name: string</code>

The name of the queue from which this consumer should consume.

<code>maxBatchSize</code>Optional<a href="#orders-api-config-triggers-queue-default">Link to maxBatchSize</a>

<code>maxBatchSize?: number</code>

The maximum number of messages per batch.

</details>

<details>

<summary>triggers.scheduled({ schedule: "0 * * * *" }), (scheduled, schedule reference)</summary>



<code>scheduled</code>Builder<a href="#orders-api-config-triggers-scheduled-default">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



<code>schedule</code>Required<a href="#orders-api-config-triggers-scheduled-default">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

],

},

});

Compared with the file that `cf migrate` generates, the finished file:

- Imports the entrypoint with the `cf-worker` attribute instead of a string path, so the Worker module exports are typed.
- Declares the `Counter` class under `exports`, replacing the `migrations` history.
- Types the queue messages with `bindings.queue<Job>()`.
- Has no `TODO(@cloudflare)` comments or `throw` statement.

To see the generated file, refer to [Read the output](https://developers.cloudflare.com/cf/wrangler/migrate/#read-the-output).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/wrangler/reference/#page","headline":"Wrangler to cf reference","description":"Find cf equivalents for Wrangler commands, and map Wrangler configuration, build settings, and environments to cf.","url":"https://developers.cloudflare.com/cf/wrangler/reference/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/wrangler/reference/og.png?v=89a02a5f88f20fa3","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
