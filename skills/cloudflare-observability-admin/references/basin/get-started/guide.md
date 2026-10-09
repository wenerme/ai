---
description: Record Worker requests with Basin Pipelines, store them in Basin Catalog, and count requests by path with Basin SQL.
title: CLI
image: https://developers.cloudflare.com/basin/get-started/guide/og.png?v=fc90943fcbbb8163
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin/get-started/guide/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build a request analytics pipeline with Wrangler.

Record requests to a Cloudflare Worker with Basin Pipelines, store them as an Apache Iceberg table in Basin Catalog, and count requests by path with Basin SQL.

`Worker → Basin Pipelines → Basin Catalog → Basin SQL`

## Prerequisites

- A Cloudflare account with Workers Paid and R2 enabled. Refer to [Basin Pipelines pricing](https://developers.cloudflare.com/basin-pipelines/platform/pricing/) and [Basin SQL pricing](https://developers.cloudflare.com/basin-sql/platform/pricing/) for availability and usage details.
- [Node.js and npm ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). The Worker starter installs Wrangler for you.
- An [R2 Account API token](https://developers.cloudflare.com/r2/api/tokens/) with **Admin Read & Write** permission. Create it from **R2 object storage** > **Overview** > **Manage API tokens**. Keep the token private. The setup command requests it, and Basin SQL uses the same token.

## Create and query request data

1. Create a JavaScript Hello World Worker with [C3 ↗︎](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare):npmyarnpnpm

   ```
   npm create cloudflare@latest -- hello-world-pipeline --type=hello-world --lang=js --no-deploy --no-git --accept-defaults
   ```

   ```
   yarn create cloudflare hello-world-pipeline --type=hello-world --lang=js --no-deploy --no-git --accept-defaults
   ```

   ```
   pnpm create cloudflare@latest hello-world-pipeline --type=hello-world --lang=js --no-deploy --no-git --accept-defaults
   ```

   Go to the project directory:

   ```sh
   cd hello-world-pipeline
   ```

   The starter creates `src/index.js` and `wrangler.jsonc`. If Wrangler requests authentication during the next step, log in:npmyarnpnpm

   ```
   npx wrangler login
   ```

   ```
   yarn wrangler login
   ```

   ```
   pnpm wrangler login
   ```

2. Create a stream, sink, and pipeline with the interactive setup:npmyarnpnpm

   ```
   npx wrangler basin pipelines setup --name request_events
   ```

   ```
   yarn wrangler basin pipelines setup --name request_events
   ```

   ```
   pnpm wrangler basin pipelines setup --name request_events
   ```

   In the setup prompts:
   - Turn off the HTTP endpoint. This Worker sends events through a binding.
   - Build the schema interactively with one required `string` field named `path`.
   - Select **Data Catalog (Iceberg)** and **Advanced**. Enter a unique R2 bucket name, such as `request-events-<UNIQUE_SUFFIX>`. Use namespace `default` and table `request_events`.
   - Enter your R2 Account API token. Accept the default compression and 100 MB file size, then set the roll interval to 60 seconds.
   - Confirm resource creation and select **Simple ingestion** for the pipeline SQL.

   Save the bucket name and the **stream ID** shown in the setup output. The Worker binding uses the stream ID, not the pipeline ID. If you missed it, list the streams and find `request_events_stream`:npmyarnpnpm

   ```
   npx wrangler basin pipelines streams list
   ```

   ```
   yarn wrangler basin pipelines streams list
   ```

   ```
   pnpm wrangler basin pipelines streams list
   ```

3. Add a `pipelines` property inside the root object of `wrangler.jsonc`. Replace `<STREAM_ID>` with the stream ID from setup, and keep the other generated properties:

   ```jsonc
   {
     "pipelines": [
       {
         "binding": "EVENTS",
         "stream": "<STREAM_ID>"
       }
     ]
   }
   ```

   ```toml
   [[pipelines]]
   binding = "EVENTS"
   stream = "<STREAM_ID>"
   ```

   In `src/index.js`, add one line before the existing response. The Worker still returns `Hello World!`:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env, ctx) {
   		await env.EVENTS.send([{ path: new URL(request.url).pathname }]);
   		return new Response("Hello World!");
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
     async fetch(request, env, ctx) {
       await env.EVENTS.send([{ path: new URL(request.url).pathname }]);
       return new Response("Hello World!");
     },
   };
   ```

   The binding handles ingestion authentication. Do not add your R2 API token to the Worker or `wrangler.jsonc`.
4. Deploy the Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   Open the URL printed by Wrangler at `/` and `/example`. Both paths display `Hello World!`, and each request records its path. Refresh `/` to record another request.
5. Get the warehouse name associated with your R2 bucket:npmyarnpnpm

   ```
   npx wrangler basin catalog get <YOUR_BUCKET>
   ```

   ```
   yarn wrangler basin catalog get <YOUR_BUCKET>
   ```

   ```
   pnpm wrangler basin catalog get <YOUR_BUCKET>
   ```

   Set the token in your terminal session, then count requests by path:

   ```sh
   export WRANGLER_BASIN_SQL_AUTH_TOKEN="<YOUR_R2_ACCOUNT_API_TOKEN>"
   ```

   npmyarnpnpm

   ```
   npx wrangler basin sql query "<WAREHOUSE_NAME>" "SELECT path, COUNT(*) AS requests FROM default.request_events GROUP BY path ORDER BY requests DESC"
   ```

   ```
   yarn wrangler basin sql query "<WAREHOUSE_NAME>" "SELECT path, COUNT(*) AS requests FROM default.request_events GROUP BY path ORDER BY requests DESC"
   ```

   ```
   pnpm wrangler basin sql query "<WAREHOUSE_NAME>" "SELECT path, COUNT(*) AS requests FROM default.request_events GROUP BY path ORDER BY requests DESC"
   ```

   Replace `<WAREHOUSE_NAME>` with the value from the catalog command. The results should include `/` and `/example` with request counts. Other paths, such as `/favicon.ico`, may also appear. If the table is not found or returns no rows, wait a few minutes for the first file to be written, then run the query again.

## Next steps

Add a timestamp, request method, or country to the events after your first query works. For more detail, refer to [Basin Pipelines getting started](https://developers.cloudflare.com/basin-pipelines/getting-started/), [Basin Catalog getting started](https://developers.cloudflare.com/basin-catalog/get-started/), [Basin SQL getting started](https://developers.cloudflare.com/basin-sql/get-started/), and [Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin/get-started/guide/#page","headline":"CLI","description":"Record Worker requests with Basin Pipelines, store them in Basin Catalog, and count requests by path with Basin SQL.","url":"https://developers.cloudflare.com/basin/get-started/guide/","inLanguage":"en","image":"https://developers.cloudflare.com/basin/get-started/guide/og.png?v=fc90943fcbbb8163","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
