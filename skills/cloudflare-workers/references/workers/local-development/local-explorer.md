---
description: Browse and edit local binding data, and invoke scheduled handlers from your browser during development.
title: Local Explorer
image: https://developers.cloudflare.com/workers/local-development/local-explorer/og.png?v=9f29bb63af164bd4
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Local Explorer

Last updated Oct 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/local-development/local-explorer/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Local Explorer is a browser-based interface for viewing and editing the data in your local [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and debugging Worker invocations during development. It is available at `/cdn-cgi/local/explorer` on your local development server.

Instead of running CLI commands or writing throwaway code to inspect local state, you can open Local Explorer in your browser to work with your data, view traces, and search logs. This is useful when you want to seed test data, verify what your Worker wrote, debug a failing request, or run SQL queries against a local [D1](https://developers.cloudflare.com/d1/) database.

Local Explorer works with the [Cloudflare CLI](https://developers.cloudflare.com/cf/) (`cf dev`), [Wrangler](https://developers.cloudflare.com/workers/wrangler/), and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). `cf dev` starts the development server provided by your framework or installed Cloudflare build tool.

## Prerequisites

Use Wrangler 4.118.0 or later, or [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) 1.50.0 or later. For `cf dev`, these requirements apply to the development server it starts. For details, refer to [How `cf` runs your project](https://developers.cloudflare.com/cf/projects/#how-cf-runs-your-project).

## Open Local Explorer

1. Start a local development session:

   In a project configured with [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/), run:

   ```sh
   cf dev
   ```

   npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   npmyarnpnpm

   ```
   npx vite
   ```

   ```
   yarn vite
   ```

   ```
   pnpm vite
   ```

2. Append `/cdn-cgi/local/explorer` to the URL printed by your development server and open it in your browser. For example, use `http://localhost:5173/cdn-cgi/local/explorer` for the default Vite port, or `http://localhost:8787/cdn-cgi/local/explorer` for the default Wrangler port.

Local Explorer is available by default and detects the bindings defined in [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/) or your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) automatically.

## Supported bindings

Local Explorer supports the following binding types:

| Binding | View | Edit |
| --- | --- | --- |
| [KV](https://developers.cloudflare.com/kv/) | Browse keys, view values and metadata | Create, update, and delete key-value pairs |
| [R2](https://developers.cloudflare.com/r2/) | List objects, view metadata | Upload and delete objects |
| [D1](https://developers.cloudflare.com/d1/) | Browse tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/) (SQLite storage) | Browse SQLite tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| [Workflows](https://developers.cloudflare.com/workflows/) | List instances, view status and step history | Trigger new runs, retry failed instances |
| [Email sending](https://developers.cloudflare.com/email-service/observability/local-development/sending/) (`send_email`) | List sent emails, view content and headers | View only |
| [Flagship](https://developers.cloudflare.com/flagship/) | List feature flags, test flag evaluations | Create, update, and delete flags, edit targeting rules and rollouts |

Local Explorer also supports the following Worker triggers:

| Trigger | View | Test |
| --- | --- | --- |
| [Email Routing](https://developers.cloudflare.com/email-service/observability/local-development/routing/) | List received emails, view content, headers, and handler outcomes | Send test emails, resend or edit and resend captured emails |
| [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) | View configured cron schedules and invocation results | Invoke the `scheduled()` handler with configured or ad hoc cron expressions and a chosen scheduled time |

### D1 and Durable Objects SQL Studio

For [D1](https://developers.cloudflare.com/d1/) databases and [Durable Objects](https://developers.cloudflare.com/durable-objects/) that use the [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), Local Explorer includes a SQL Studio. This is the same experience available in the Cloudflare dashboard for deployed D1 databases. It provides both a visual table browser with inline editing and a SQL query editor where you can run arbitrary queries.

## Test Cron Triggers

Local Explorer can send one-off invocations to the [`scheduled()` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) for your Worker. It supports both configured Cron Triggers and ad hoc expressions.

Cron Trigger testing requires Wrangler 4.139.0 or later, or Cloudflare Vite plugin 1.60.0 or later. These requirements also apply to the development server started by `cf dev`.

Your Worker must export a `scheduled()` handler. To test a configured expression, define at least one [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for the active environment. Ad hoc expressions do not require configuration.

1. In Local Explorer, select the Worker you want to test, then select **Cron Triggers** > **Configured Crons**.
2. Under **Scheduled time**, select *Now*. To test another time, select **Add preset** and enter a UTC date and time or epoch milliseconds.
3. Select **Trigger** next to a configured cron expression.
4. Review the outcome, `noRetry()` status, dispatched expression, and scheduled time.
5. (Optional) To test another expression, select **Cron Triggers** > **Ad-Hoc Triggers**. Select **Add trigger**, enter or build an expression, and then select **Trigger**.

Full invocation logs are available in the development session that owns the Worker. That session must have **Observability** turned on.

### Build an ad hoc expression

Under **Ad-Hoc Triggers**, select **Expression** to enter an exact expression. Select **Build expression** to create a common five-field UTC expression. The exact expression shown in the row is always dispatched.

The builder supports minute, hour, day-of-month, and month intervals. It also supports daily, selected-weekday, and monthly schedules. Use these Quartz-like options for more specific schedules:

| Option | Behavior |
| --- | --- |
| `L` | Select the last day or last named weekday |
| `W` | Select the nearest weekday |
| `LW` | Select the last weekday of the month |
| `#` | Select an occurrence of a named weekday |

Step values start at the field minimum and reset at its boundary. Day steps start on day `1`, and month steps start in January. Dates `29` through `31` do not run in months without that date.

Switching to **Build expression** does not replace the current expression. Changing a valid builder field regenerates the expression. To use syntax that the builder does not provide, select **Expression** and enter it directly.

Ad hoc triggers and scheduled time presets are stored in your browser. Local Explorer scopes them to the local project and Worker. They do not change `cloudflare.config.ts`, your Wrangler configuration, or deployed Cron Triggers.

Each invocation is a one-off local test. Local development does not run Cron Triggers automatically.

## Observability

Local Explorer automatically captures traces and logs from every Worker invocation during local development with `cf dev`, `wrangler dev`, or the Cloudflare Vite plugin without modifying your code. You get the same instrumentation as production [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) and [Traces](https://developers.cloudflare.com/workers/observability/traces/), including invocation logs, binding operations, timing, and console output, directly in your browser during development.

### Logs

The **Logs** view captures all `console.*` output from your Worker. Filter by level (error, warn, info, log, debug) or search by text to find specific messages.

### Traces

Each Worker invocation appears as a trace. Select any trace to see every binding operation with timing, status, and error details.

Tracing also captures operations made through [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings), so you can inspect calls from your locally running Worker to deployed resources.

For example, if a request makes two D1 calls and the second one fails, the trace shows you exactly which call succeeded and which errored without adding `console.log()` or try/catch blocks.

![Trace view for POST /api/todos showing two D1 database spans: the first INSERT succeeded, the second failed with error "no such table: audit\_log"](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2048,height=847,format=webp/_astro/local-trace-failed-request.Bf0avznU.png)

## API

Local Explorer exposes an API at `/cdn-cgi/local/explorer/api` that provides programmatic access to the same operations available in the browser interface. The API serves an [OpenAPI specification ↗︎](https://www.openapis.org/) that describes all available endpoints, parameters, and response formats.

The following examples use port `8787`. Replace it with your development server port, such as `5173` for Vite.

To retrieve the OpenAPI spec:

```sh
curl http://localhost:8787/cdn-cgi/local/explorer/api
```

The API includes `POST /cdn-cgi/local/explorer/api/local/scheduled?worker=<WORKER_NAME>` for scheduled invocations. The request targets an exact Worker and accepts a required cron expression and an optional scheduled time. For a request example, refer to [Test Cron Triggers locally](https://developers.cloudflare.com/workers/configuration/cron-triggers/#use-the-local-explorer-api).

### Use with AI agents

The development server prints a hint with the Local Explorer API endpoint when it detects an AI agent. This also works when you start the server with `cf dev`. The agent can fetch the [OpenAPI specification ↗︎](https://www.openapis.org/) from that endpoint to discover all available operations, then make API calls to read or modify local data, query traces and logs, and debug your Worker.

The hint includes the API URL and relevant endpoints:

```txt
This dev session is running in an AI agent.

The Local Explorer API is available at
http://localhost:8787/cdn-cgi/local/explorer/api

...

Debug with traces:
POST /cdn-cgi/local/explorer/api/local/observability/query -- query traces and logs with SQL
```

This can be useful as an alternative to the CLI when you want an agent to:

- Populate test data in your local [KV](https://developers.cloudflare.com/kv/) namespaces or [D1](https://developers.cloudflare.com/d1/) databases
- Inspect the state of a [Durable Object](https://developers.cloudflare.com/durable-objects/) during debugging
- Trigger or retry a [Workflow](https://developers.cloudflare.com/workflows/) run with different input data
- Invoke a `scheduled()` handler with a chosen cron expression and time
- Upload test files to a local [R2](https://developers.cloudflare.com/r2/) bucket
- Find recent requests with errors and drill into failing spans

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/local-development/local-explorer/#page","headline":"Local Explorer","description":"Browse and edit local binding data, and invoke scheduled handlers from your browser during development.","url":"https://developers.cloudflare.com/workers/local-development/local-explorer/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/local-development/local-explorer/og.png?v=9f29bb63af164bd4","dateModified":"2026-10-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
