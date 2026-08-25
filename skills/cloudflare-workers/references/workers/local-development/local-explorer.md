---
description: Browse and edit local binding data from your browser during development.
title: Local Explorer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Local Explorer

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/local-development/local-explorer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Local Explorer is a browser-based interface for viewing and editing the data in your local [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and debugging Worker invocations during development. It is available at `/cdn-cgi/explorer` on your local development server.

Instead of running CLI commands or writing throwaway code to inspect local state, you can open Local Explorer in your browser to work with your data, view traces, and search logs. This is useful when you want to seed test data, verify what your Worker wrote, debug a failing request, or run SQL queries against a local [D1](https://developers.cloudflare.com/d1/) database.

Local Explorer works with both [Wrangler](https://developers.cloudflare.com/workers/wrangler/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Prerequisites

* Wrangler 4.118.0 or later, or [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) 1.50.0 or later

## Open Local Explorer

1. Start a local development session:
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
2. Open Local Explorer in your browser:

  * **Wrangler**: press `e` in your terminal.
  * **Vite plugin**: navigate directly to `/cdn-cgi/explorer` on your dev server's route and port.

Local Explorer is available by default and detects the bindings defined in your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) automatically.

## Supported bindings

Local Explorer supports the following binding types:

| Binding                                                                                | View                                           | Edit                                        |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| [KV](https://developers.cloudflare.com/kv/)                                            | Browse keys, view values and metadata          | Create, update, and delete key-value pairs  |
| [R2](https://developers.cloudflare.com/r2/)                                            | List objects, view metadata                    | Upload and delete objects                   |
| [D1](https://developers.cloudflare.com/d1/)                                            | Browse tables and rows, run SQL queries        | Insert, update, and delete rows through SQL |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/) (SQLite storage) | Browse SQLite tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| [Workflows](https://developers.cloudflare.com/workflows/)                              | List instances, view status and step history   | Trigger new runs, retry failed instances    |

### D1 and Durable Objects SQL Studio

For [D1](https://developers.cloudflare.com/d1/) databases and [Durable Objects](https://developers.cloudflare.com/durable-objects/) that use the [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), Local Explorer includes a SQL Studio. This is the same experience available in the Cloudflare dashboard for deployed D1 databases. It provides both a visual table browser with inline editing and a SQL query editor where you can run arbitrary queries.

## Observability

Local Explorer automatically captures traces and logs from every Worker invocation during `wrangler dev` without modifying your code. You get the same instrumentation as production [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) and [Traces](https://developers.cloudflare.com/workers/observability/traces/), including invocation logs, binding operations, timing, and console output, directly in your browser during development.

### Logs

The **Logs** view captures all `console.*` output from your Worker. Filter by level (error, warn, info, log, debug) or search by text to find specific messages.

### Traces

Each Worker invocation appears as a trace. Select any trace to see every binding operation with timing, status, and error details.

Tracing also captures operations made through [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings), so you can inspect calls from your locally running Worker to deployed resources.

For example, if a request makes two D1 calls and the second one fails, the trace shows you exactly which call succeeded and which errored without adding `console.log()` or try/catch blocks.

![Trace view for POST /api/todos showing two D1 database spans: the first INSERT succeeded, the second failed with error "no such table: audit_log"](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2048,height=847,format=webp/_astro/local-trace-failed-request.Bf0avznU.png)

## API

Local Explorer exposes an API at `/cdn-cgi/explorer/api` that provides programmatic access to the same operations available in the browser interface. The API serves an [OpenAPI specification ↗](https://www.openapis.org/) that describes all available endpoints, parameters, and response formats.

To retrieve the OpenAPI spec:

```sh
curl http://localhost:8787/cdn-cgi/explorer/api
```

### Use with AI agents

When Wrangler or the Cloudflare Vite plugin detects it is running inside an AI agent, it prints a hint with the Local Explorer API endpoint directly to the terminal. The agent can fetch the [OpenAPI specification ↗](https://www.openapis.org/) from that endpoint to discover all available operations, then make API calls to read or modify local data, query traces and logs, and debug your Worker.

The hint includes the API URL and relevant endpoints:

```txt
This dev session is running in an AI agent.

The Local Explorer API is available at
http://localhost:8787/cdn-cgi/explorer/api

...

Debug with traces:
POST /cdn-cgi/explorer/api/local/observability/query -- query traces and logs with SQL
```

This can be useful as an alternative to the CLI when you want an agent to:

* Populate test data in your local [KV](https://developers.cloudflare.com/kv/) namespaces or [D1](https://developers.cloudflare.com/d1/) databases
* Inspect the state of a [Durable Object](https://developers.cloudflare.com/durable-objects/) during debugging
* Trigger or retry a [Workflow](https://developers.cloudflare.com/workflows/) run with different input data
* Upload test files to a local [R2](https://developers.cloudflare.com/r2/) bucket
* Find recent requests with errors and drill into failing spans

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/local-development/local-explorer/#page","headline":"Local Explorer · Cloudflare Workers docs","description":"Browse and edit local binding data from your browser during development.","url":"https://developers.cloudflare.com/workers/local-development/local-explorer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
