---
description: Send data to streams via Worker bindings or HTTP endpoints
title: Writing to streams
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Writing to streams

Last updated Jun 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/streams/writing-to-streams/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Send events to streams using [Worker bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) or HTTP endpoints for client-side applications and external systems.

## Send via Workers

Worker bindings provide a secure way to send data to streams from [Workers](https://developers.cloudflare.com/workers/) without managing API tokens or credentials.

### Configure pipeline binding

Add a pipeline binding to your Wrangler file that points to your stream:

```jsonc
{
	"pipelines": [
		{
			"binding": "STREAM",
			"stream": "<STREAM_ID>"
		}
	]
}
```

```toml
[[pipelines]]
binding = "STREAM"
stream = "<STREAM_ID>"
```

Note

The `pipeline` field in the `pipelines` binding configuration has been renamed to `stream`. Existing configurations that use `pipeline` will continue to work, but Wrangler will display a deprecation warning. Update your configuration to use `stream` instead.

### Workers API

The pipeline binding exposes a method for sending data to your stream:

#### `send(records)`

Sends an array of JSON-serializable records to the stream. Returns a Promise that resolves when records are confirmed as ingested.

```js
export default {
	async fetch(request, env, ctx) {
		const events = await request.json();

		await env.STREAM.send(events);

		return new Response("Events sent");
	},
};
```

```typescript
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const events = await request.json<Record<string, unknown>[]>();

		await env.STREAM.send(events);

		return new Response("Events sent");
	},
} satisfies ExportedHandler<Env>;
```

### Typed pipeline bindings

When a stream has a defined schema, running `wrangler types` generates schema-specific TypeScript types for your pipeline bindings. Instead of the generic `Pipeline<PipelineRecord>`, your bindings get a named record type with full autocomplete and compile-time type checking. Refer to the [wrangler types documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) to learn more.

#### Generated types

After running `wrangler types`, the generated `worker-configuration.d.ts` file contains a named record type inside the `Cloudflare` namespace. The type name is derived from the stream name (not the binding name), converted to PascalCase with a `Record` suffix.

Below is an example of what generated types look like in `worker-configuration.d.ts` for a stream named `ecommerce_stream`:

```typescript
declare namespace Cloudflare {
	type EcommerceStreamRecord = {
		user_id: string;
		event_type: string;
		product_id?: string;
		amount?: number;
	};
	interface Env {
		STREAM: import("cloudflare:pipelines").Pipeline<Cloudflare.EcommerceStreamRecord>;
	}
}
```

#### Fallback behavior

`wrangler types` falls back to the generic `Pipeline<PipelineRecord>` type in the following scenarios:

* **Not authenticated**: Run `wrangler login` to enable typed pipeline bindings.
* **Stream not found**: The stream ID in your Wrangler configuration does not match an existing stream.
* **Unstructured stream**: The stream was created without a schema.

## Send via HTTP

Each stream provides an optional HTTP endpoint for ingesting data from external applications, browsers, or any system that can make HTTP requests.

### Endpoint format

HTTP endpoints follow this format:

```txt
https://{stream-id}.ingest.cloudflare.com
```

Find your stream's endpoint URL in the Cloudflare dashboard under **Pipelines** \> **Streams** or using the Wrangler CLI with either the stream ID or stream name:

```bash
npx wrangler pipelines streams get <STREAM_NAME_OR_ID>
```

### Making requests

Send events as JSON arrays via POST requests:

```bash
curl -X POST https://{stream-id}.ingest.cloudflare.com \
  -H "Content-Type: application/json" \
  -d '[
    {
      "user_id": "12345",
      "event_type": "purchase",
      "product_id": "widget-001",
      "amount": 29.99
    }
  ]'
```

### Authentication

When authentication is enabled for your stream, include the API token in the `Authorization` header:

```bash
curl -X POST https://{stream-id}.ingest.cloudflare.com \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '[{"event": "test"}]'
```

The API token must have **Workers Pipeline Send** permission. To learn more, refer to the [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) documentation.

## Schema validation

Streams handle validation differently based on their configuration:

* **Structured streams**: Events must match the defined schema fields and types.
* **Unstructured streams**: Accept any valid JSON structure. Data is stored in a single `value` column.

For structured streams, ensure your events match the schema definition. Invalid events will be accepted but dropped, so validate your data before sending to avoid dropped events. When using Worker bindings, run `wrangler types` to generate [typed pipeline bindings](#typed-pipeline-bindings) that catch schema violations at compile time. You can also query the [user error metrics](https://developers.cloudflare.com/pipelines/observability/metrics/#user-error-metrics) to monitor dropped events and diagnose schema validation issues.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/streams/writing-to-streams/#page","headline":"Writing to streams · Cloudflare Pipelines Docs","description":"Send data to streams via Worker bindings or HTTP endpoints","url":"https://developers.cloudflare.com/pipelines/streams/writing-to-streams/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
