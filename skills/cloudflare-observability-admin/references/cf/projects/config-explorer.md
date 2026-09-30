---
description: See how cloudflare.config.ts describes each part of an application, and what each typed field means.
title: Configuration explorer
image: https://developers.cloudflare.com/cf/projects/config-explorer/og.png?v=8877be631a13b653
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration explorer

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/projects/config-explorer/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`cloudflare.config.ts` is a TypeScript file, so every field has a type and a description. Use the configuration explorer to see how the file describes the main parts of an application: project settings, the Worker, bindings, triggers, and exports.

Select a category, then select a highlighted field to see its type, description, default value, and accepted options. Editors with TypeScript support show the same information in autocomplete and hover text as you write the file, and type checking flags values that do not match.

To learn how to structure a project's configuration, refer to [Programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/). To return different configuration for each environment, refer to [Modes](https://developers.cloudflare.com/cf/projects/#modes).

Select a highlighted line to show its type and description below it.

Generated from `@cloudflare/config`0.20.0

defineConfig6 optionsWorker18 optionsBindings35 optionsTriggers5 optionsExports7 options

Expand allCopy

### defineConfig

import { defineConfig } from "cf/config";

import \* as entrypoint from "./src/index" with { type: "cf-worker" };

<details>

<summary>export default defineConfig(({ isPreview, mode }) =&gt; ({ (isPreview, mode reference)</summary>



<code>isPreview</code>Context value<a href="#config-reference-config-configcontext-ispreview">Link to isPreview</a>

<code>isPreview: boolean</code>

Whether the config is being evaluated for a Preview build.

<code>mode</code>Context value<a href="#config-reference-config-configcontext-ispreview">Link to mode</a>

<code>mode: string | undefined</code>

The mode the config is being evaluated in. Set via the <code>--mode</code> CLI flag. In Vite the mode defaults to <code>development</code> in <code>vite dev</code> and <code>production</code> in <code>vite build</code> (<a href="https://vite.dev/guide/env-and-mode.html#modes">more info</a>). In Wrangler the mode defaults to <code>undefined</code>.

</details>

<details>

<summary>accountId: "&lt;ACCOUNT_ID&gt;", (accountId reference)</summary>



<code>accountId</code>Optional<a href="#config-reference-config-settings-accountid">Link to accountId</a>

<code>accountId?: string</code>

This is the ID of the account associated with your zone. It can also be specified through the <code>CLOUDFLARE_ACCOUNT_ID</code> environment variable.

</details>

<details>

<summary>complianceRegion: mode === "fedramp" ? "fedramp-high" : "public", (complianceRegion reference)</summary>



<code>complianceRegion</code>Optional<a href="#config-reference-config-settings-complianceregion">Link to complianceRegion</a>

<code>complianceRegion?: "public" | "fedramp-high"</code>

The compliance boundary in which commands should operate. When omitted, this can be supplied through <code>CLOUDFLARE_COMPLIANCE_REGION</code>.

</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-reference-config-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: isPreview ? "example-preview" : "example-worker", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-config-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-reference-config-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-reference-config-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

},

<details>

<summary>containers: [], (containers reference)</summary>



<code>containers</code>Optional<a href="#config-reference-config-cloudflareconfig-containers">Link to containers</a>

<code>containers?: ConfigInput&lt;ContainerConfig&gt;[]</code>

Container applications defined by this configuration.

</details>

}));

### Worker

import { bindings, defineConfig, exports, triggers } from "cf/config";

import \* as entrypoint from "./src/index" with { type: "cf-worker" };

<details>

<summary>export default defineConfig(({ mode }) =&gt; ({ (mode reference)</summary>



<code>mode</code>Context value<a href="#config-reference-worker-configcontext-mode">Link to mode</a>

<code>mode: string | undefined</code>

The mode the config is being evaluated in. Set via the <code>--mode</code> CLI flag. In Vite the mode defaults to <code>development</code> in <code>vite dev</code> and <code>production</code> in <code>vite build</code> (<a href="https://vite.dev/guide/env-and-mode.html#modes">more info</a>). In Wrangler the mode defaults to <code>undefined</code>.

</details>

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-reference-worker-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: mode === "staging" ? "images-staging" : "images", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-worker-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-reference-worker-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>compatibilityFlags: ["nodejs_compat"], (compatibilityFlags reference)</summary>



<code>compatibilityFlags</code>Optional<a href="#config-reference-worker-workerconfig-compatibilityflags">Link to compatibilityFlags</a>

<code>compatibilityFlags?: string[]</code>

A list of flags that enable features from upcoming features of the Workers runtime, usually used together with <code>compatibilityDate</code>. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-flags/">https://developers.cloudflare.com/workers/configuration/compatibility-flags/</a>

Default: <code>[]</code>

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-reference-worker-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>assets: { (assets reference)</summary>



<code>assets</code>Optional<a href="#config-reference-worker-workerconfig-assets">Link to assets</a>

<code>assets?: { /** How to handle HTML requests. */ htmlHandling?: "auto-trailing-slash" | "drop-trailing-slash" | "force-trailing-slash" | "none"; /** How to handle requests that do not match an asset. */ notFoundHandling?: "single-page-application" | "404-page" | "none"; /** * Matches will be routed to the User Worker, and matches to negative rules will go to the Asset Worker. * * Can also be `true`, indicating that every request should be routed to the User Worker. */ runWorkerFirst?: string[] | boolean; }</code>

Specify the directory of static assets to deploy/serve. More details at <a href="https://developers.cloudflare.com/workers/frameworks/">https://developers.cloudflare.com/workers/frameworks/</a> For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#assets">https://developers.cloudflare.com/workers/wrangler/configuration/#assets</a>

</details>

<details>

<summary>htmlHandling: "auto-trailing-slash", (htmlHandling reference)</summary>



<code>htmlHandling</code>Optional<a href="#config-reference-worker-workerconfig-assets-htmlhandling">Link to htmlHandling</a>

<code>htmlHandling?: "auto-trailing-slash" | "drop-trailing-slash" | "force-trailing-slash" | "none"</code>

How to handle HTML requests.

</details>

},

<details>

<summary>domains: ["images.example.com"], (domains reference)</summary>



<code>domains</code>Optional<a href="#config-reference-worker-workerconfig-domains">Link to domains</a>

<code>domains?: string[]</code>

Custom domains that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a>

</details>

<details>

<summary>triggers: [ (triggers reference)</summary>



<code>triggers</code>Optional<a href="#config-reference-worker-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

</details>

<details>

<summary>triggers.scheduled({ (scheduled reference)</summary>



<code>scheduled</code>Builder<a href="#config-reference-worker-triggers-scheduled-default">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



</details>

<details>

<summary>schedule: "0 * * * *", (schedule reference)</summary>



<code>schedule</code>Required<a href="#config-reference-worker-triggers-scheduled-default-schedule">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

}),

],

<details>

<summary>tailConsumers: [ (tailConsumers reference)</summary>



<code>tailConsumers</code>Optional<a href="#config-reference-worker-workerconfig-tailconsumers">Link to tailConsumers</a>

<code>tailConsumers?: Array&lt;{ /** The name of the service tail events will be forwarded to. */ worker: string; /** Whether to stream tail events in real time. */ streaming?: boolean; }&gt;</code>

A list of Tail Workers that are bound to this Worker. <code>@cloudflare/config</code> unifies regular and streaming tail consumers under a single field; pass <code>streaming: true</code> to forward streaming tail events.

Default: <code>[]</code>

</details>

{

<details>

<summary>worker: "log-sink", (worker reference)</summary>



<code>worker</code>Required<a href="#config-reference-worker-workerconfig-tailconsumers-worker">Link to worker</a>

<code>worker: string</code>

The name of the service tail events will be forwarded to.

</details>

<details>

<summary>streaming: true, (streaming reference)</summary>



<code>streaming</code>Optional<a href="#config-reference-worker-workerconfig-tailconsumers-streaming">Link to streaming</a>

<code>streaming?: boolean</code>

Whether to stream tail events in real time.

</details>

},

],

<details>

<summary>cache: { (cache reference)</summary>



<code>cache</code>Optional<a href="#config-reference-worker-workerconfig-cache">Link to cache</a>

<code>cache?: { /** If cache is enabled for this Worker. */ enabled: boolean; /** Whether cached assets may be reused across Worker versions. */ crossVersionCache?: boolean; }</code>

Specify the cache behavior of the Worker.

</details>

<details>

<summary>enabled: true, (enabled reference)</summary>



<code>enabled</code>Required<a href="#config-reference-worker-workerconfig-cache-enabled">Link to enabled</a>

<code>enabled: boolean</code>

If cache is enabled for this Worker.

</details>

<details>

<summary>crossVersionCache: true, (crossVersionCache reference)</summary>



<code>crossVersionCache</code>Optional<a href="#config-reference-worker-workerconfig-cache-crossversioncache">Link to crossVersionCache</a>

<code>crossVersionCache?: boolean</code>

Whether cached assets may be reused across Worker versions.

</details>

},

<details>

<summary>placement: { (placement reference)</summary>



<code>placement</code>Optional<a href="#config-reference-worker-workerconfig-placement">Link to placement</a>

<code>placement?: { mode: "off" | "smart"; hint?: string; } | { mode?: "targeted"; region: string; } | { mode?: "targeted"; host: string; } | { mode?: "targeted"; hostname: string; }</code>

Specify how the Worker should be located to minimize round-trip time. More details: <a href="https://developers.cloudflare.com/workers/platform/smart-placement/">https://developers.cloudflare.com/workers/platform/smart-placement/</a>

</details>

<details>

<summary>mode: "smart", (mode reference)</summary>



<code>mode</code>Required<a href="#config-reference-worker-workerconfig-placement-mode">Link to mode</a>

<code>mode: "off" | "smart"</code>

The type definition does not include a description.

</details>

},

<details>

<summary>limits: { (limits reference)</summary>



<code>limits</code>Optional<a href="#config-reference-worker-workerconfig-limits">Link to limits</a>

<code>limits?: { /** Maximum allowed CPU time for a Worker's invocation in milliseconds. */ cpuMs?: number; /** Maximum allowed number of fetch requests that a Worker's invocation can execute. */ subrequests?: number; }</code>

Specify limits for runtime behavior. Only supported for the "standard" Usage Model. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#limits">https://developers.cloudflare.com/workers/wrangler/configuration/#limits</a>

</details>

<details>

<summary>cpuMs: 50, (cpuMs reference)</summary>



<code>cpuMs</code>Optional<a href="#config-reference-worker-workerconfig-limits-cpums">Link to cpuMs</a>

<code>cpuMs?: number</code>

Maximum allowed CPU time for a Worker's invocation in milliseconds.

</details>

<details>

<summary>subrequests: 100, (subrequests reference)</summary>



<code>subrequests</code>Optional<a href="#config-reference-worker-workerconfig-limits-subrequests">Link to subrequests</a>

<code>subrequests?: number</code>

Maximum allowed number of fetch requests that a Worker's invocation can execute.

</details>

},

<details>

<summary>logpush: true, (logpush reference)</summary>



<code>logpush</code>Optional<a href="#config-reference-worker-workerconfig-logpush">Link to logpush</a>

<code>logpush?: boolean</code>

Send Trace Events from this Worker to Workers Logpush. This will not configure a corresponding Logpush job automatically. For more information about Workers Logpush, see: <a href="https://blog.cloudflare.com/logpush-for-workers/">https://blog.cloudflare.com/logpush-for-workers/</a>

</details>

<details>

<summary>observability: { (observability reference)</summary>



<code>observability</code>Optional<a href="#config-reference-worker-workerconfig-observability">Link to observability</a>

<code>observability?: { /** If observability is enabled for this Worker. */ enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** * Whether query strings are removed from request URLs in logs and traces. * * @default false */ redactQueryString?: boolean; /** Real-time Issues settings for this Worker. */ issues?: { /** Whether real-time Issues are enabled. */ enabled?: boolean; }; logs?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** Set to false to disable invocation logs. */ invocationLogs?: boolean; /** * If logs should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations logs emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }; traces?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** * If traces should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations traces emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }; }</code>

Specify the observability behavior of the Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#observability">https://developers.cloudflare.com/workers/wrangler/configuration/#observability</a>

</details>

<details>

<summary>enabled: true, (enabled reference)</summary>



<code>enabled</code>Optional<a href="#config-reference-worker-workerconfig-observability-enabled">Link to enabled</a>

<code>enabled?: boolean</code>

If observability is enabled for this Worker.

</details>

<details>

<summary>logs: { (logs reference)</summary>



<code>logs</code>Optional<a href="#config-reference-worker-workerconfig-observability-logs">Link to logs</a>

<code>logs?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** Set to false to disable invocation logs. */ invocationLogs?: boolean; /** * If logs should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations logs emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }</code>

The type definition does not include a description.

</details>

<details>

<summary>persist: true, (persist reference)</summary>



<code>persist</code>Optional<a href="#config-reference-worker-workerconfig-observability-logs-persist">Link to persist</a>

<code>persist?: boolean</code>

If logs should be persisted to the Cloudflare observability platform where they can be queried in the dashboard.

Default: <code>true</code>

</details>

},

<details>

<summary>traces: { (traces reference)</summary>



<code>traces</code>Optional<a href="#config-reference-worker-workerconfig-observability-traces">Link to traces</a>

<code>traces?: { enabled?: boolean; /** The sampling rate. */ headSamplingRate?: number; /** * If traces should be persisted to the Cloudflare observability platform where they can be queried in the dashboard. * * @default true */ persist?: boolean; /** * What destinations traces emitted from the Worker should be sent to. * * @default [] */ destinations?: string[]; }</code>

The type definition does not include a description.

</details>

<details>

<summary>persist: true, (persist reference)</summary>



<code>persist</code>Optional<a href="#config-reference-worker-workerconfig-observability-traces-persist">Link to persist</a>

<code>persist?: boolean</code>

If traces should be persisted to the Cloudflare observability platform where they can be queried in the dashboard.

Default: <code>true</code>

</details>

},

},

<details>

<summary>workersDev: false, (workersDev reference)</summary>



<code>workersDev</code>Optional<a href="#config-reference-worker-workerconfig-workersdev">Link to workersDev</a>

<code>workersDev?: boolean</code>

Whether we use <code>&lt;name&gt;.&lt;subdomain&gt;.workers.dev</code> to test and deploy your Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev">https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev</a>

Default: <code>true</code>

</details>

<details>

<summary>previewUrls: true, (previewUrls reference)</summary>



<code>previewUrls</code>Optional<a href="#config-reference-worker-workerconfig-previewurls">Link to previewUrls</a>

<code>previewUrls?: boolean</code>

Whether we use <code>&lt;version&gt;-&lt;name&gt;.&lt;subdomain&gt;.workers.dev</code> to serve Preview URLs for your Worker.

Default: <code>false</code>

</details>

<details>

<summary>unsafe: { (unsafe reference)</summary>



<code>unsafe</code>Optional<a href="#config-reference-worker-workerconfig-unsafe">Link to unsafe</a>

<code>unsafe?: { /** * Arbitrary key/value pairs that will be included in the uploaded metadata. Values specified * here will always be applied to metadata last, so can add new or override existing fields. */ metadata?: Record&lt;string, unknown&gt;; /** * Used for internal capnp uploads for the Workers runtime. */ capnp?: { basePath: string; sourceSchemas: string[]; compiledSchema?: never; } | { basePath?: never; sourceSchemas?: never; compiledSchema: string; }; }</code>

"Unsafe" tables for runtime features that aren't directly supported by this configuration. Values are forwarded verbatim in the Worker's upload metadata.

Default: <code>{}</code>

</details>

<details>

<summary>metadata: { build: "docs-example" }, (metadata reference)</summary>



<code>metadata</code>Optional<a href="#config-reference-worker-workerconfig-unsafe-metadata">Link to metadata</a>

<code>metadata?: Record&lt;string, unknown&gt;</code>

Arbitrary key/value pairs that will be included in the uploaded metadata. Values specified here will always be applied to metadata last, so can add new or override existing fields.

</details>

},

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-reference-worker-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>API_ORIGIN: bindings.text("https://api.example.com"), (text reference)</summary>



<code>text</code>Builder<a href="#config-reference-worker-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

<details>

<summary>DATABASE: bindings.d1({ (d1 reference)</summary>



<code>d1</code>Builder<a href="#config-reference-worker-bindings-d1-default">Link to d1</a>

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

<summary>name: "images-db", (name reference)</summary>



<code>name</code>Optional<a href="#config-reference-worker-bindings-d1-default-name">Link to name</a>

<code>name?: string</code>

The name of this D1 database.

</details>

}),

<details>

<summary>IMAGES: bindings.r2({ (r2 reference)</summary>



<code>r2</code>Builder<a href="#config-reference-worker-bindings-r2-default">Link to r2</a>

<code>r2(options?: R2BindingOptions): R2Binding;</code>

Binding to an R2 bucket. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets">https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets</a>

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>name?: string</code></dt>
<dd>The name of this R2 bucket at the edge.</dd>

<dt><code>jurisdiction?: string</code></dt>
<dd>The jurisdiction that the bucket exists in. Default if not present.</dd>

<dt><code>dev?: BindingDevOptions &amp; { /** EXPERIMENTAL: credentials for the local S3-compatible endpoint. */ experimentalS3Credentials?: { accessKeyId: string; secretAccessKey: string; }; }</code></dt>
<dd>Settings that only apply to local development.</dd></dl></details>



</details>

<details>

<summary>name: "source-images", (name reference)</summary>



<code>name</code>Optional<a href="#config-reference-worker-bindings-r2-default-name">Link to name</a>

<code>name?: string</code>

The name of this R2 bucket at the edge.

</details>

}),

},

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-reference-worker-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>Admin: exports.worker({ (worker reference)</summary>



<code>worker</code>Builder<a href="#config-reference-worker-exports-worker-default">Link to worker</a>

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

<summary>cache: { (cache reference)</summary>



<code>cache</code>Optional<a href="#config-reference-worker-exports-worker-default-cache">Link to cache</a>

<code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code>

The type definition does not include a description.

</details>

<details>

<summary>enabled: true, (enabled reference)</summary>



<code>enabled</code>Required<a href="#config-reference-worker-exports-worker-default-cache-enabled">Link to enabled</a>

<code>enabled: boolean</code>

Whether cache is enabled for this entrypoint.

</details>

},

}),

<details>

<summary>Counter: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-worker-exports-durableobject-created">Link to durableObject</a>

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



<code>storage</code>Required<a href="#config-reference-worker-exports-durableobject-created-storage">Link to storage</a>

<code>storage: "sqlite"</code>

Selects the SQLite-backed storage engine (recommended for new classes).

</details>

}),

},

},

}));

### Bindings

import { bindings, defineConfig } from "cf/config";

import \* as entrypoint from "./src/index" with { type: "cf-worker" };

export default defineConfig({

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-reference-bindings-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "binding-showcase", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-bindings-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-reference-bindings-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-reference-bindings-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>env: { (env reference)</summary>



<code>env</code>Optional<a href="#config-reference-bindings-workerconfig-env">Link to env</a>

<code>env?: Record&lt;string, Binding&gt;</code>

Bindings exposed on the Worker's <code>env</code> object. Construct entries with <code>bindings.kv(...)</code>, <code>bindings.r2(...)</code>, etc.

</details>

<details>

<summary>MY_AGENT_MEMORY: bindings.agentMemory({ (agentMemory reference)</summary>



<code>agentMemory</code>Builder<a href="#config-reference-bindings-bindings-agentmemory-default">Link to agentMemory</a>

<code>agentMemory(options: AgentMemoryBindingOptions): AgentMemoryBinding;</code>

Agent Memory namespace binding. Each binding is scoped to a namespace and allows agents to persist and recall memory.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>namespace: string</code></dt>
<dd>The user-chosen namespace name. Must exist in Cloudflare at deploy time.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>namespace: "my-namespace", (namespace reference)</summary>



<code>namespace</code>Required<a href="#config-reference-bindings-bindings-agentmemory-default-namespace">Link to namespace</a>

<code>namespace: string</code>

The user-chosen namespace name. Must exist in Cloudflare at deploy time.

</details>

}),

<details>

<summary>MY_AI: bindings.ai(), (ai reference)</summary>



<code>ai</code>Builder<a href="#config-reference-bindings-bindings-ai-default">Link to ai</a>

<code>ai&lt;TAiModelList extends AiModelListType = AiModels&gt;(options?: AiBindingOptions): TypedAiBinding&lt;TAiModelList&gt;;</code>

Binding to the Workers AI project. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#workers-ai">https://developers.cloudflare.com/workers/wrangler/configuration/#workers-ai</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_AI_SEARCH: bindings.aiSearch({ (aiSearch reference)</summary>



<code>aiSearch</code>Builder<a href="#config-reference-bindings-bindings-aisearch-default">Link to aiSearch</a>

<code>aiSearch(options: AiSearchBindingOptions): AiSearchBinding;</code>

AI Search instance binding. Each binding is bound directly to a single pre-existing instance within the "default" namespace.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The user-chosen instance name. Must exist in Cloudflare at deploy time.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>name: "my-resource", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-bindings-bindings-aisearch-default-name">Link to name</a>

<code>name: string</code>

The user-chosen instance name. Must exist in Cloudflare at deploy time.

</details>

}),

<details>

<summary>MY_AI_SEARCH_NAMESPACE: bindings.aiSearchNamespace({ (aiSearchNamespace reference)</summary>



<code>aiSearchNamespace</code>Builder<a href="#config-reference-bindings-bindings-aisearchnamespace-default">Link to aiSearchNamespace</a>

<code>aiSearchNamespace(options: AiSearchNamespaceBindingOptions): AiSearchNamespaceBinding;</code>

AI Search namespace binding. Each binding is scoped to a namespace and allows dynamic instance CRUD within it.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>namespace: string</code></dt>
<dd>The user-chosen namespace name. Must exist in Cloudflare at deploy time.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>namespace: "my-namespace", (namespace reference)</summary>



<code>namespace</code>Required<a href="#config-reference-bindings-bindings-aisearchnamespace-default-namespace">Link to namespace</a>

<code>namespace: string</code>

The user-chosen namespace name. Must exist in Cloudflare at deploy time.

</details>

}),

<details>

<summary>MY_ANALYTICS_ENGINE_DATASET: bindings.analyticsEngineDataset(), (analyticsEngineDataset reference)</summary>



<code>analyticsEngineDataset</code>Builder<a href="#config-reference-bindings-bindings-analyticsenginedataset-default">Link to analyticsEngineDataset</a>

<code>analyticsEngineDataset(options?: AnalyticsEngineDatasetBindingOptions): AnalyticsEngineDatasetBinding;</code>

Binding to an Analytics Engine dataset. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#analytics-engine-datasets">https://developers.cloudflare.com/workers/wrangler/configuration/#analytics-engine-datasets</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>name?: string</code></dt>
<dd>The name of this dataset to write to.</dd></dl></details>



</details>

<details>

<summary>MY_ARTIFACTS: bindings.artifacts({ (artifacts reference)</summary>



<code>artifacts</code>Builder<a href="#config-reference-bindings-bindings-artifacts-default">Link to artifacts</a>

<code>artifacts(options: ArtifactsBindingOptions): ArtifactsBinding;</code>

Binding to an Artifacts instance. Artifacts provides git-compatible file storage on Cloudflare Workers.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>namespace: string</code></dt>
<dd>The namespace to use.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>namespace: "my-namespace", (namespace reference)</summary>



<code>namespace</code>Required<a href="#config-reference-bindings-bindings-artifacts-default-namespace">Link to namespace</a>

<code>namespace: string</code>

The namespace to use.

</details>

}),

<details>

<summary>MY_ASSETS: bindings.assets(), (assets reference)</summary>



<code>assets</code>Builder<a href="#config-reference-bindings-bindings-assets-default">Link to assets</a>

<code>assets(): AssetsBinding;</code>

Binding to the Worker's static assets. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#assets">https://developers.cloudflare.com/workers/wrangler/configuration/#assets</a>

</details>

<details>

<summary>MY_BROWSER: bindings.browser(), (browser reference)</summary>



<code>browser</code>Builder<a href="#config-reference-bindings-bindings-browser-default">Link to browser</a>

<code>browser(options?: BrowserBindingOptions): BrowserBinding;</code>

Binding to a headless browser usable from the Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#browser-rendering">https://developers.cloudflare.com/workers/wrangler/configuration/#browser-rendering</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_D1: bindings.d1(), (d1 reference)</summary>



<code>d1</code>Builder<a href="#config-reference-bindings-bindings-d1-default">Link to d1</a>

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

<summary>MY_DISPATCH_NAMESPACE: bindings.dispatchNamespace(), (dispatchNamespace reference)</summary>



<code>dispatchNamespace</code>Builder<a href="#config-reference-bindings-bindings-dispatchnamespace-default">Link to dispatchNamespace</a>

<code>dispatchNamespace(options?: DispatchNamespaceBindingOptions): DispatchNamespaceBinding;</code>

Binding to a Workers for Platforms dispatch namespace. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#dispatch-namespace-bindings-workers-for-platforms">https://developers.cloudflare.com/workers/wrangler/configuration/#dispatch-namespace-bindings-workers-for-platforms</a>

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>namespace?: string</code></dt>
<dd>The namespace to bind to.</dd>

<dt><code>outbound?: { /** Name of the Worker handling the outbound requests. */ worker: string; /** (Optional) List of parameter names, for sending context from your dispatch Worker to the outbound handler. */ parameters?: string[]; }</code></dt>
<dd>Details about the outbound Worker which will handle outbound requests from your namespace.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_DURABLE_OBJECT: bindings.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-bindings-bindings-durableobject-all">Link to durableObject</a>

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

<summary>worker: "my-worker", (worker reference)</summary>



<code>worker</code>Required<a href="#config-reference-bindings-bindings-durableobject-all-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the Worker that defines the Durable Object class.

</details>

<details>

<summary>exportName: "MyDurableObject", (exportName reference)</summary>



<code>exportName</code>Required<a href="#config-reference-bindings-bindings-durableobject-all-exportname">Link to exportName</a>

<code>exportName: TExportName$1</code>

The exported class name of the Durable Object.

</details>

}),

<details>

<summary>MY_FLAGSHIP: bindings.flagship(), (flagship reference)</summary>



<code>flagship</code>Builder<a href="#config-reference-bindings-bindings-flagship-default">Link to flagship</a>

<code>flagship(options?: FlagshipBindingOptions): FlagshipBinding;</code>

Binding to a Flagship feature-flag service.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>id?: string</code></dt>
<dd>The Flagship app ID to bind to.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_HYPERDRIVE: bindings.hyperdrive({ (hyperdrive reference)</summary>



<code>hyperdrive</code>Builder<a href="#config-reference-bindings-bindings-hyperdrive-default">Link to hyperdrive</a>

<code>hyperdrive(options: HyperdriveBindingOptions): HyperdriveBinding;</code>

Binding to a Hyperdrive configuration. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#hyperdrive">https://developers.cloudflare.com/workers/wrangler/configuration/#hyperdrive</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>id: string</code></dt>
<dd>The ID of the Hyperdrive configuration.</dd>

<dt><code>dev?: { /** The database connection string used during local development. */ connectionString?: string; }</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>id: "resource-id", (id reference)</summary>



<code>id</code>Required<a href="#config-reference-bindings-bindings-hyperdrive-default-id">Link to id</a>

<code>id: string</code>

The ID of the Hyperdrive configuration.

</details>

}),

<details>

<summary>MY_IMAGES: bindings.images(), (images reference)</summary>



<code>images</code>Builder<a href="#config-reference-bindings-bindings-images-default">Link to images</a>

<code>images(options?: ImagesBindingOptions): ImagesBinding$1;</code>

Binding to Cloudflare Images. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#images">https://developers.cloudflare.com/workers/wrangler/configuration/#images</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_JSON: bindings.json({ feature: true }), (json reference)</summary>



<code>json</code>Builder<a href="#config-reference-bindings-bindings-json-default">Link to json</a>

<code>json&lt;T$1 extends Json&gt;(value: T$1): JsonBinding&lt;T$1&gt;;</code>

Inline JSON value made available to the Worker on <code>env</code> under the binding name.

</details>

<details>

<summary>MY_KV: bindings.kv(), (kv reference)</summary>



<code>kv</code>Builder<a href="#config-reference-bindings-bindings-kv-default">Link to kv</a>

<code>kv&lt;TKey extends string = string&gt;(options?: KvBindingOptions): TypedKvBinding&lt;TKey&gt;;</code>

Binding to a Workers KV namespace. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#kv-namespaces">https://developers.cloudflare.com/workers/wrangler/configuration/#kv-namespaces</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>id?: string</code></dt>
<dd>The ID of the KV namespace.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_LOGFWDR: bindings.logfwdr({ (logfwdr reference)</summary>



<code>logfwdr</code>Builder<a href="#config-reference-bindings-bindings-logfwdr-default">Link to logfwdr</a>

<code>logfwdr(options: LogfwdrBindingOptions): LogfwdrBinding;</code>

Binding for forwarding logs to logfwdr.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>destination: string</code></dt>
<dd>The destination for this logged message.</dd></dl></details>



</details>

<details>

<summary>destination: "my-destination", (destination reference)</summary>



<code>destination</code>Required<a href="#config-reference-bindings-bindings-logfwdr-default-destination">Link to destination</a>

<code>destination: string</code>

The destination for this logged message.

</details>

}),

<details>

<summary>MY_MEDIA: bindings.media(), (media reference)</summary>



<code>media</code>Builder<a href="#config-reference-bindings-bindings-media-default">Link to media</a>

<code>media(options?: MediaBindingOptions): MediaBinding$1;</code>

Binding to Cloudflare Media Transformations.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_MTLS_CERTIFICATE: bindings.mtlsCertificate({ (mtlsCertificate reference)</summary>



<code>mtlsCertificate</code>Builder<a href="#config-reference-bindings-bindings-mtlscertificate-default">Link to mtlsCertificate</a>

<code>mtlsCertificate(options: MtlsCertificateBindingOptions): MtlsCertificateBinding;</code>

Binding to an uploaded mTLS certificate. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#mtls-certificates">https://developers.cloudflare.com/workers/wrangler/configuration/#mtls-certificates</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>id: string</code></dt>
<dd>The UUID of the uploaded mTLS certificate.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>id: "resource-id", (id reference)</summary>



<code>id</code>Required<a href="#config-reference-bindings-bindings-mtlscertificate-default-id">Link to id</a>

<code>id: string</code>

The UUID of the uploaded mTLS certificate.

</details>

}),

<details>

<summary>MY_PIPELINE: bindings.pipeline({ (pipeline reference)</summary>



<code>pipeline</code>Builder<a href="#config-reference-bindings-bindings-pipeline-default">Link to pipeline</a>

<code>pipeline&lt;TRecord extends PipelineRecord = PipelineRecord&gt;(options: PipelineBindingOptions): TypedPipelineBinding&lt;TRecord&gt;;</code>

Binding to a Cloudflare Pipeline.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>Name of the Pipeline to bind.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>name: "my-resource", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-bindings-bindings-pipeline-default-name">Link to name</a>

<code>name: string</code>

Name of the Pipeline to bind.

</details>

}),

<details>

<summary>MY_QUEUE: bindings.queue(), (queue reference)</summary>



<code>queue</code>Builder<a href="#config-reference-bindings-bindings-queue-default">Link to queue</a>

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



</details>

<details>

<summary>MY_R2: bindings.r2(), (r2 reference)</summary>



<code>r2</code>Builder<a href="#config-reference-bindings-bindings-r2-default">Link to r2</a>

<code>r2(options?: R2BindingOptions): R2Binding;</code>

Binding to an R2 bucket. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets">https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets</a>

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>name?: string</code></dt>
<dd>The name of this R2 bucket at the edge.</dd>

<dt><code>jurisdiction?: string</code></dt>
<dd>The jurisdiction that the bucket exists in. Default if not present.</dd>

<dt><code>dev?: BindingDevOptions &amp; { /** EXPERIMENTAL: credentials for the local S3-compatible endpoint. */ experimentalS3Credentials?: { accessKeyId: string; secretAccessKey: string; }; }</code></dt>
<dd>Settings that only apply to local development.</dd></dl></details>



</details>

<details>

<summary>MY_RATE_LIMIT: bindings.rateLimit({ (rateLimit reference)</summary>



<code>rateLimit</code>Builder<a href="#config-reference-bindings-bindings-ratelimit-default">Link to rateLimit</a>

<code>rateLimit(options: RateLimitBindingOptions): RateLimitBinding;</code>

Binding to a rate limiter.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>namespace: string</code></dt>
<dd>The namespace ID for this rate limiter.</dd>

<dt><code>simple: { /** The maximum number of requests allowed in the time period. */ limit: number; /** The time period in seconds (10 for ten seconds, 60 for one minute). */ period: 10 | 60; }</code></dt>
<dd>Simple rate limiting configuration.</dd></dl></details>



</details>

<details>

<summary>namespace: "my-namespace", (namespace reference)</summary>



<code>namespace</code>Required<a href="#config-reference-bindings-bindings-ratelimit-default-namespace">Link to namespace</a>

<code>namespace: string</code>

The namespace ID for this rate limiter.

</details>

<details>

<summary>simple: { (simple reference)</summary>



<code>simple</code>Required<a href="#config-reference-bindings-bindings-ratelimit-default-simple">Link to simple</a>

<code>simple: { /** The maximum number of requests allowed in the time period. */ limit: number; /** The time period in seconds (10 for ten seconds, 60 for one minute). */ period: 10 | 60; }</code>

Simple rate limiting configuration.

</details>

<details>

<summary>limit: 1, (limit reference)</summary>



<code>limit</code>Required<a href="#config-reference-bindings-bindings-ratelimit-default-simple-limit">Link to limit</a>

<code>limit: number</code>

The maximum number of requests allowed in the time period.

</details>

<details>

<summary>period: 10, (period reference)</summary>



<code>period</code>Required<a href="#config-reference-bindings-bindings-ratelimit-default-simple-period">Link to period</a>

<code>period: 10 | 60</code>

The time period in seconds (10 for ten seconds, 60 for one minute).

</details>

},

}),

<details>

<summary>MY_SECRET: bindings.secret(), (secret reference)</summary>



<code>secret</code>Builder<a href="#config-reference-bindings-bindings-secret-default">Link to secret</a>

<code>secret(): SecretBinding;</code>

Declares a secret that is required by your Worker, exposed on <code>env</code> under the binding name. When defined, this binding: - Replaces .dev.vars/.env/process.env inference for type generation - Enables local dev validation with warnings for missing secrets For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property">https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property</a>

</details>

<details>

<summary>MY_SECRETS_STORE_SECRET: bindings.secretsStoreSecret({ (secretsStoreSecret reference)</summary>



<code>secretsStoreSecret</code>Builder<a href="#config-reference-bindings-bindings-secretsstoresecret-default">Link to secretsStoreSecret</a>

<code>secretsStoreSecret(options: SecretsStoreSecretBindingOptions): SecretsStoreSecretBinding;</code>

Binding to a Secrets Store secret.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>storeId: string</code></dt>
<dd>ID of the secret store.</dd>

<dt><code>secretName: string</code></dt>
<dd>Name of the secret.</dd></dl></details>



</details>

<details>

<summary>storeId: "store-id", (storeId reference)</summary>



<code>storeId</code>Required<a href="#config-reference-bindings-bindings-secretsstoresecret-default-storeid">Link to storeId</a>

<code>storeId: string</code>

ID of the secret store.

</details>

<details>

<summary>secretName: "my-secret", (secretName reference)</summary>



<code>secretName</code>Required<a href="#config-reference-bindings-bindings-secretsstoresecret-default-secretname">Link to secretName</a>

<code>secretName: string</code>

Name of the secret.

</details>

}),

<details>

<summary>MY_SEND_EMAIL: bindings.sendEmail({ (sendEmail reference)</summary>



<code>sendEmail</code>Builder<a href="#config-reference-bindings-bindings-sendemail-default">Link to sendEmail</a>

<code>sendEmail(options?: SendEmailBindingOptions): SendEmailBinding;</code>

Binding for sending email from inside the Worker. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#email-bindings">https://developers.cloudflare.com/workers/wrangler/configuration/#email-bindings</a>

<details>

<summary>Options (6)</summary>



<dl>

<dt><code>destinationAddress: string</code></dt>
<dd>If this binding should be restricted to a specific verified address.</dd>

<dt><code>allowedDestinationAddresses?: never</code></dt>
<dd></dd>

<dt><code>destinationAddress?: never</code></dt>
<dd></dd>

<dt><code>allowedDestinationAddresses: string[]</code></dt>
<dd>If this binding should be restricted to a set of verified addresses.</dd>

<dt><code>allowedSenderAddresses?: string[]</code></dt>
<dd>If this binding should be restricted to a set of sender addresses.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>destinationAddress: "value", (destinationAddress reference)</summary>



<code>destinationAddress</code>Required<a href="#config-reference-bindings-bindings-sendemail-default-destinationaddress">Link to destinationAddress</a>

<code>destinationAddress: string</code>

If this binding should be restricted to a specific verified address.

</details>

}),

<details>

<summary>MY_STREAM: bindings.stream(), (stream reference)</summary>



<code>stream</code>Builder<a href="#config-reference-bindings-bindings-stream-default">Link to stream</a>

<code>stream(options?: StreamBindingOptions): StreamBinding$1;</code>

Binding to Cloudflare Stream.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>MY_TEXT: bindings.text("production"), (text reference)</summary>



<code>text</code>Builder<a href="#config-reference-bindings-bindings-text-default">Link to text</a>

<code>text&lt;T$1 extends string&gt;(value: T$1): TextBinding&lt;T$1&gt;;</code>

Inline string value made available to the Worker on <code>env</code> under the binding name. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables">https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables</a>

</details>

<details>

<summary>MY_VECTORIZE: bindings.vectorize({ (vectorize reference)</summary>



<code>vectorize</code>Builder<a href="#config-reference-bindings-bindings-vectorize-default">Link to vectorize</a>

<code>vectorize(options: VectorizeBindingOptions): VectorizeBinding;</code>

Binding to a Vectorize index. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes">https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes</a>

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The name of the Vectorize index.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>name: "my-resource", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-bindings-bindings-vectorize-default-name">Link to name</a>

<code>name: string</code>

The name of the Vectorize index.

</details>

}),

<details>

<summary>MY_VERSION_METADATA: bindings.versionMetadata(), (versionMetadata reference)</summary>



<code>versionMetadata</code>Builder<a href="#config-reference-bindings-bindings-versionmetadata-default">Link to versionMetadata</a>

<code>versionMetadata(): VersionMetadataBinding;</code>

Binding to the Worker version's metadata.

</details>

<details>

<summary>MY_VPC_NETWORK: bindings.vpcNetwork({ (vpcNetwork reference)</summary>



<code>vpcNetwork</code>Builder<a href="#config-reference-bindings-bindings-vpcnetwork-default">Link to vpcNetwork</a>

<code>vpcNetwork(options: VpcNetworkBindingOptions): VpcNetworkBinding;</code>

Binding to a VPC network.

<details>

<summary>Options (5)</summary>



<dl>

<dt><code>tunnelId: string</code></dt>
<dd>The tunnel ID of the Cloudflare Tunnel to route traffic through. Mutually exclusive with <code>networkId</code>.</dd>

<dt><code>networkId?: never</code></dt>
<dd></dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd>

<dt><code>tunnelId?: never</code></dt>
<dd></dd>

<dt><code>networkId: string</code></dt>
<dd>The network ID to route traffic through. Mutually exclusive with <code>tunnelId</code>.</dd>

</dl></details>



</details>

<details>

<summary>tunnelId: "tunnel-id", (tunnelId reference)</summary>



<code>tunnelId</code>Required<a href="#config-reference-bindings-bindings-vpcnetwork-default-tunnelid">Link to tunnelId</a>

<code>tunnelId: string</code>

The tunnel ID of the Cloudflare Tunnel to route traffic through. Mutually exclusive with <code>networkId</code>.

</details>

}),

<details>

<summary>MY_VPC_SERVICE: bindings.vpcService({ (vpcService reference)</summary>



<code>vpcService</code>Builder<a href="#config-reference-bindings-bindings-vpcservice-default">Link to vpcService</a>

<code>vpcService(options: VpcServiceBindingOptions): VpcServiceBinding;</code>

Binding to a VPC service.

<details>

<summary>Options (2)</summary>



<dl>

<dt><code>id: string</code></dt>
<dd>The service ID of the VPC connectivity service.</dd>

<dt><code>dev?: BindingDevOptions</code></dt>
<dd>Options that only apply during local development.</dd></dl></details>



</details>

<details>

<summary>id: "resource-id", (id reference)</summary>



<code>id</code>Required<a href="#config-reference-bindings-bindings-vpcservice-default-id">Link to id</a>

<code>id: string</code>

The service ID of the VPC connectivity service.

</details>

}),

<details>

<summary>MY_WORKER: bindings.worker({ (worker reference)</summary>



<code>worker</code>Builder<a href="#config-reference-bindings-bindings-worker-default">Link to worker</a>

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

<summary>worker: "my-worker", (worker reference)</summary>



<code>worker</code>Required<a href="#config-reference-bindings-bindings-worker-default-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the bound Worker.

</details>

}),

<details>

<summary>MY_WORKER_LOADER: bindings.workerLoader(), (workerLoader reference)</summary>



<code>workerLoader</code>Builder<a href="#config-reference-bindings-bindings-workerloader-default">Link to workerLoader</a>

<code>workerLoader(): WorkerLoaderBinding;</code>

Binding to a Worker Loader.

</details>

<details>

<summary>MY_WORKFLOW: bindings.workflow({ (workflow reference)</summary>



<code>workflow</code>Builder<a href="#config-reference-bindings-bindings-workflow-default">Link to workflow</a>

<code>workflow&lt;TWorker$1 extends WorkerReference, TExportName$1 extends WorkflowExportName&lt;TWorker$1&gt;&gt;(options: WorkflowBindingOptions&lt;TWorker$1, TExportName$1&gt;): WorkflowBinding&lt;TWorker$1, NoInfer&lt;TExportName$1&gt;&gt;;</code>

Create a Workflow binding. <code>worker</code> may be a Worker config reference or a Worker name. <code>exportName</code> must be a valid <code>WorkflowEntrypoint</code> export for the given Worker.

<details>

<summary>Options (3)</summary>



<dl>

<dt><code>name: string</code></dt>
<dd>The name of the Workflow.</dd>

<dt><code>worker: TWorker$1</code></dt>
<dd>The name or config of the Worker that defines the Workflow.</dd>

<dt><code>exportName: TExportName$1</code></dt>
<dd>The exported class name of the Workflow.</dd></dl></details>



</details>

<details>

<summary>name: "my-resource", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-bindings-bindings-workflow-default-name">Link to name</a>

<code>name: string</code>

The name of the Workflow.

</details>

<details>

<summary>worker: "my-worker", (worker reference)</summary>



<code>worker</code>Required<a href="#config-reference-bindings-bindings-workflow-default-worker">Link to worker</a>

<code>worker: TWorker$1</code>

The name or config of the Worker that defines the Workflow.

</details>

<details>

<summary>exportName: "MyWorkflow", (exportName reference)</summary>



<code>exportName</code>Required<a href="#config-reference-bindings-bindings-workflow-default-exportname">Link to exportName</a>

<code>exportName: TExportName$1</code>

The exported class name of the Workflow.

</details>

}),

},

},

});

### Triggers

import { defineConfig, triggers } from "cf/config";

import \* as entrypoint from "./src/index" with { type: "cf-worker" };

export default defineConfig({

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-reference-triggers-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "trigger-showcase", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-triggers-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-reference-triggers-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-reference-triggers-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>triggers: [ (triggers reference)</summary>



<code>triggers</code>Optional<a href="#config-reference-triggers-workerconfig-triggers">Link to triggers</a>

<code>triggers?: Trigger[]</code>

Event triggers — fetch routes, queue consumers, cron schedules, Email Routing addresses, and raw sockets — that invoke this Worker. Construct entries with <code>triggers.fetch(...)</code>, <code>triggers.queue(...)</code>, <code>triggers.scheduled(...)</code>, <code>triggers.email(...)</code>, or <code>triggers.connect(...)</code>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#triggers">https://developers.cloudflare.com/workers/wrangler/configuration/#triggers</a>

</details>

<details>

<summary>triggers.fetch({ (fetch reference)</summary>



<code>fetch</code>Builder<a href="#config-reference-triggers-triggers-fetch-default">Link to fetch</a>

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

<summary>pattern: "example.com/*", (pattern reference)</summary>



<code>pattern</code>Required<a href="#config-reference-triggers-triggers-fetch-default-pattern">Link to pattern</a>

<code>pattern: string</code>

A route that your Worker should be published to. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes">https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes</a>

</details>

<details>

<summary>zone: "example.com", (zone reference)</summary>



<code>zone</code>Optional<a href="#config-reference-triggers-triggers-fetch-default-zone">Link to zone</a>

<code>zone?: string</code>

The DNS zone the pattern is attached to. Required when the pattern is ambiguous.

</details>

}),

<details>

<summary>triggers.queue({ (queue reference)</summary>



<code>queue</code>Builder<a href="#config-reference-triggers-triggers-queue-default">Link to queue</a>

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

<summary>name: "jobs", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-triggers-triggers-queue-default-name">Link to name</a>

<code>name: string</code>

The name of the queue from which this consumer should consume.

</details>

<details>

<summary>maxBatchSize: 20, (maxBatchSize reference)</summary>



<code>maxBatchSize</code>Optional<a href="#config-reference-triggers-triggers-queue-default-maxbatchsize">Link to maxBatchSize</a>

<code>maxBatchSize?: number</code>

The maximum number of messages per batch.

</details>

}),

<details>

<summary>triggers.scheduled({ (scheduled reference)</summary>



<code>scheduled</code>Builder<a href="#config-reference-triggers-triggers-scheduled-default">Link to scheduled</a>

<code>scheduled(options: ScheduledTriggerOptions): ScheduledTrigger;</code>

Scheduled (cron) trigger — invokes this Worker on the given schedules. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>schedule: string</code></dt>
<dd>A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a></dd>

</dl></details>



</details>

<details>

<summary>schedule: "0 * * * *", (schedule reference)</summary>



<code>schedule</code>Required<a href="#config-reference-triggers-triggers-scheduled-default-schedule">Link to schedule</a>

<code>schedule: string</code>

A "cron" definition to trigger a Worker's "scheduled" function. Lets you call Workers periodically, much like a cron job. More details here <a href="https://developers.cloudflare.com/workers/platform/cron-triggers">https://developers.cloudflare.com/workers/platform/cron-triggers</a>

</details>

}),

<details>

<summary>triggers.email({ (email reference)</summary>



<code>email</code>Builder<a href="#config-reference-triggers-triggers-email-default">Link to email</a>

<code>email(options: EmailTriggerOptions): EmailTrigger;</code>

Email trigger — invokes this Worker for the configured Email Routing addresses.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>addresses: string[]</code></dt>
<dd>Inbound Email Routing addresses handled by this Worker. Each entry is a literal recipient address (e.g. <code>"support@example.com"</code>) or a <code>*@domain</code> catch-all (e.g. <code>"*@example.com"</code>).</dd>

</dl></details>



</details>

<details>

<summary>addresses: ["support@example.com"], (addresses reference)</summary>



<code>addresses</code>Required<a href="#config-reference-triggers-triggers-email-default-addresses">Link to addresses</a>

<code>addresses: string[]</code>

Inbound Email Routing addresses handled by this Worker. Each entry is a literal recipient address (e.g. <code>"support@example.com"</code>) or a <code>*@domain</code> catch-all (e.g. <code>"*@example.com"</code>).

</details>

}),

<details>

<summary>triggers.connect({ (connect reference)</summary>



<code>connect</code>Builder<a href="#config-reference-triggers-triggers-connect-default">Link to connect</a>

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



</details>

<details>

<summary>protocol: "tcp", (protocol reference)</summary>



<code>protocol</code>Required<a href="#config-reference-triggers-triggers-connect-default-protocol">Link to protocol</a>

<code>protocol: "tcp"</code>

The type definition does not include a description.

</details>

<details>

<summary>port: 5432, (port reference)</summary>



<code>port</code>Required<a href="#config-reference-triggers-triggers-connect-default-port">Link to port</a>

<code>port: number</code>

The port to listen on.

</details>

}),

],

},

});

### Exports

import { defineConfig, exports } from "cf/config";

import \* as entrypoint from "./src/index" with { type: "cf-worker" };

export default defineConfig({

<details>

<summary>worker: { (worker reference)</summary>



<code>worker</code>Optional<a href="#config-reference-exports-cloudflareconfig-worker">Link to worker</a>

<code>worker?: ConfigInput&lt;WorkerConfig&gt;</code>

The Worker defined by this configuration.

</details>

<details>

<summary>name: "export-showcase", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-exports-workerconfig-name">Link to name</a>

<code>name: string</code>

The name of your Worker.

</details>

<details>

<summary>entrypoint, (entrypoint reference)</summary>



<code>entrypoint</code>Optional<a href="#config-reference-exports-workerconfig-entrypoint">Link to entrypoint</a>

<code>entrypoint?: string | WorkerModule</code>

The entrypoint module that will be executed. May be either a path string (e.g. <code>"./src/index.ts"</code>) or a module namespace imported with the <code>cf-worker</code> import attribute.

</details>

<details>

<summary>compatibilityDate: "&lt;COMPATIBILITY_DATE&gt;", (compatibilityDate reference)</summary>



<code>compatibilityDate</code>Required<a href="#config-reference-exports-workerconfig-compatibilitydate">Link to compatibilityDate</a>

<code>compatibilityDate: string</code>

A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used. More details at <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates">https://developers.cloudflare.com/workers/configuration/compatibility-dates</a>

</details>

<details>

<summary>exports: { (exports reference)</summary>



<code>exports</code>Optional<a href="#config-reference-exports-workerconfig-exports">Link to exports</a>

<code>exports?: Record&lt;string, Export&gt;</code>

Configuration for named exports declared by the Worker. Each entry's key is the exported class name; the value configures the export. - Construct entries with <code>exports.durableObject(...)</code>. - Declares Durable Object classes exported from this Worker. For more information about Durable Objects, see the documentation at <a href="https://developers.cloudflare.com/workers/learning/using-durable-objects">https://developers.cloudflare.com/workers/learning/using-durable-objects</a>. For reference, see <a href="https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects">https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects</a>. - Construct entries with <code>exports.workflow(...)</code>. - Declares Workflows defined by this Worker. For more information about Workflows, see the documentation at <a href="https://developers.cloudflare.com/workflows/">https://developers.cloudflare.com/workflows/</a>.

</details>

<details>

<summary>LiveClass: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-exports-exports-durableobject-created">Link to durableObject</a>

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



<code>storage</code>Required<a href="#config-reference-exports-exports-durableobject-created-storage">Link to storage</a>

<code>storage: "sqlite"</code>

Selects the SQLite-backed storage engine (recommended for new classes).

</details>

}),

<details>

<summary>RemovedClass: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-exports-exports-durableobject-deleted">Link to durableObject</a>

<code>durableObject(options: DurableObjectDeletedExportOptions): DurableObjectDeletedExport;</code>

Retire a provisioned Durable Object namespace whose class has been removed from code.

<details>

<summary>Options (1)</summary>



<dl>

<dt><code>state: "deleted"</code></dt>
<dd></dd>

</dl></details>



</details>

<details>

<summary>state: "deleted", (state reference)</summary>



<code>state</code>Required<a href="#config-reference-exports-exports-durableobject-deleted-state">Link to state</a>

<code>state: "deleted"</code>

The type definition does not include a description.

</details>

}),

<details>

<summary>OldClass: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-exports-exports-durableobject-renamed">Link to durableObject</a>

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



<code>state</code>Required<a href="#config-reference-exports-exports-durableobject-renamed-state">Link to state</a>

<code>state: "renamed"</code>

The type definition does not include a description.

</details>

<details>

<summary>renamedTo: "NewClass", (renamedTo reference)</summary>



<code>renamedTo</code>Required<a href="#config-reference-exports-exports-durableobject-renamed-renamedto">Link to renamedTo</a>

<code>renamedTo: string</code>

The destination class name. Must be a valid JavaScript identifier and must appear as a live (<code>state: "created"</code>) <code>durableObject</code> entry in the same <code>exports</code> map.

</details>

}),

<details>

<summary>OutgoingClass: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-exports-exports-durableobject-transferred">Link to durableObject</a>

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



<code>state</code>Required<a href="#config-reference-exports-exports-durableobject-transferred-state">Link to state</a>

<code>state: "transferred"</code>

The type definition does not include a description.

</details>

<details>

<summary>transferredTo: "target-worker", (transferredTo reference)</summary>



<code>transferredTo</code>Required<a href="#config-reference-exports-exports-durableobject-transferred-transferredto">Link to transferredTo</a>

<code>transferredTo: string</code>

The destination Worker. Must reference a Worker in the same account.

</details>

}),

<details>

<summary>IncomingClass: exports.durableObject({ (durableObject reference)</summary>



<code>durableObject</code>Builder<a href="#config-reference-exports-exports-durableobject-expecting-transfer">Link to durableObject</a>

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



<code>state</code>Required<a href="#config-reference-exports-exports-durableobject-expecting-transfer-state">Link to state</a>

<code>state: "expecting-transfer"</code>

The type definition does not include a description.

</details>

<details>

<summary>storage: "sqlite", (storage reference)</summary>



<code>storage</code>Required<a href="#config-reference-exports-exports-durableobject-expecting-transfer-storage">Link to storage</a>

<code>storage: "sqlite"</code>

Selects the SQLite-backed storage engine (recommended for new classes).

</details>

<details>

<summary>transferFrom: "source-worker", (transferFrom reference)</summary>



<code>transferFrom</code>Required<a href="#config-reference-exports-exports-durableobject-expecting-transfer-transferfrom">Link to transferFrom</a>

<code>transferFrom: string</code>

The source Worker for the two-phase cross-Worker transfer.

</details>

}),

<details>

<summary>ApiEntrypoint: exports.worker({ (worker reference)</summary>



<code>worker</code>Builder<a href="#config-reference-exports-exports-worker-default">Link to worker</a>

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

<summary>cache: { (cache reference)</summary>



<code>cache</code>Optional<a href="#config-reference-exports-exports-worker-default-cache">Link to cache</a>

<code>cache?: { /** Whether cache is enabled for this entrypoint. */ enabled: boolean; }</code>

The type definition does not include a description.

</details>

<details>

<summary>enabled: true, (enabled reference)</summary>



<code>enabled</code>Required<a href="#config-reference-exports-exports-worker-default-cache-enabled">Link to enabled</a>

<code>enabled: boolean</code>

Whether cache is enabled for this entrypoint.

</details>

},

}),

<details>

<summary>CheckoutWorkflow: exports.workflow({ (workflow reference)</summary>



<code>workflow</code>Builder<a href="#config-reference-exports-exports-workflow-default">Link to workflow</a>

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

<summary>name: "checkout-workflow", (name reference)</summary>



<code>name</code>Required<a href="#config-reference-exports-exports-workflow-default-name">Link to name</a>

<code>name: string</code>

The name of the Workflow. It identifies the Workflow's instances and must be unique within the account.

</details>

<details>

<summary>limits: { (limits reference)</summary>



<code>limits</code>Optional<a href="#config-reference-exports-exports-workflow-default-limits">Link to limits</a>

<code>limits?: { /** Maximum number of steps a single Workflow instance may run. */ steps?: number; }</code>

The type definition does not include a description.

</details>

<details>

<summary>steps: 100, (steps reference)</summary>



<code>steps</code>Optional<a href="#config-reference-exports-exports-workflow-default-limits-steps">Link to steps</a>

<code>steps?: number</code>

Maximum number of steps a single Workflow instance may run.

</details>

},

}),

},

},

});

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/projects/config-explorer/#page","headline":"Configuration explorer","description":"See how cloudflare.config.ts describes each part of an application, and what each typed field means.","url":"https://developers.cloudflare.com/cf/projects/config-explorer/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/projects/config-explorer/og.png?v=8877be631a13b653","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
