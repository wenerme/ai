---
description: Route Bluesky Jetstream events into multiple R2 Data Catalog tables using a single Pipelines stream and multiple SQL statements.
title: Fan out a stream to multiple Iceberg tables
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Fan out a stream to multiple Iceberg tables

Consume the Bluesky Jetstream firehose in a Durable Object, ingest it into a single Pipelines stream, and use one pipeline with multiple SQL statements to route events into separate R2 Data Catalog tables by type.

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/examples/bluesky-firehose-fanout/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, you will consume the public [Bluesky Jetstream ↗](https://github.com/bluesky-social/jetstream) firehose, a live WebSocket stream of every post, like, repost, follow, and block on the network, and land it in [R2 Data Catalog](https://developers.cloudflare.com/r2-data-catalog/) as queryable Apache Iceberg tables.

You will learn a core Pipelines pattern: send every event to one stream, then use a single pipeline with multiple SQL statements to route ("fan out") that stream into several destination tables, one per event type, without running a separate pipeline for each.

flowchart TD
    A[Bluesky Jetstream WebSocket] --> B[Durable Object]
    B -->|send| C[bsky_events_stream]
    C --> D[bsky_pipeline]
    D --> E[bsky_post]
    D --> F[bsky_like]
    D --> G[bsky_repost]
    D --> H[bsky_follow]
    D --> I[bsky_block]

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You will also need an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with **Admin Read & Write** permissions, which includes R2 Data Catalog and R2 SQL access. You will pass this token to each sink. No Bluesky account or API key is required, as Jetstream is public and unauthenticated.

## 1\. Create a new Worker project

Create a new Worker project by running the following command:

npmyarnpnpm

```
npm create cloudflare@latest -- bluesky-pipeline
```

```
yarn create cloudflare bluesky-pipeline
```

```
pnpm create cloudflare@latest bluesky-pipeline
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Change into your new project directory:

```sh
cd bluesky-pipeline
```

The `pipelines` commands used later require Wrangler v4 or later. If your project was scaffolded with an older version, update it now:

npmyarnpnpmbun

```
npm i -D wrangler@latest
```

```
yarn add -D wrangler@latest
```

```
pnpm add -D wrangler@latest
```

```
bun add -d wrangler@latest
```

## 2\. Define the stream schema

A stream has a single schema. Because every event type flows through the same stream, the schema is the union of the fields you want across all types. Each routing statement later selects only the columns relevant to its destination.

Create a `schema.json` file in the root of your project:

```json
{
	"fields": [
		{ "name": "event_id", "type": "string", "required": true },
		{ "name": "event_type", "type": "string", "required": true },
		{ "name": "did", "type": "string", "required": false },
		{ "name": "operation", "type": "string", "required": false },
		{ "name": "event_time", "type": "timestamp", "required": false },
		{ "name": "created_at", "type": "string", "required": false },
		{ "name": "text", "type": "string", "required": false },
		{ "name": "langs", "type": "string", "required": false },
		{ "name": "subject_uri", "type": "string", "required": false },
		{ "name": "subject_did", "type": "string", "required": false }
	]
}
```

## 3\. Create an R2 bucket and enable R2 Data Catalog

Your sinks write to Iceberg tables in [R2 Data Catalog](https://developers.cloudflare.com/r2-data-catalog/), so you need a bucket with the catalog enabled.

Create an R2 bucket named `bluesky-pipeline`:

npmyarnpnpm

```
npx wrangler r2 bucket create bluesky-pipeline
```

```
yarn wrangler r2 bucket create bluesky-pipeline
```

```
pnpm wrangler r2 bucket create bluesky-pipeline
```

Enable R2 Data Catalog on the bucket:

npmyarnpnpm

```
npx wrangler r2 bucket catalog enable bluesky-pipeline
```

```
yarn wrangler r2 bucket catalog enable bluesky-pipeline
```

```
pnpm wrangler r2 bucket catalog enable bluesky-pipeline
```

When you run this command, note the **Warehouse name**. You will need it to query your data with R2 SQL.

## 4\. Create the stream, sinks, and pipeline

First, create the stream from your schema file:

npmyarnpnpm

```
npx wrangler pipelines streams create bsky_events_stream --schema-file schema.json
```

```
yarn wrangler pipelines streams create bsky_events_stream --schema-file schema.json
```

```
pnpm wrangler pipelines streams create bsky_events_stream --schema-file schema.json
```

Note the **stream ID** in the output. You will use it to configure the Worker binding in the next step.

Next, create one [sink](https://developers.cloudflare.com/pipelines/sinks/) per destination table. Each sink writes to its own Iceberg table in R2 Data Catalog. Replace `YOUR_CATALOG_TOKEN` with your R2 API token.

```sh
for t in post like repost follow block; do
  npx wrangler pipelines sinks create bsky_${t}_sink \
    --type r2-data-catalog \
    --bucket bluesky-pipeline \
    --namespace bluesky \
    --table bsky_${t} \
    --catalog-token YOUR_CATALOG_TOKEN \
    --roll-interval 60
done
```

Now create one pipeline whose SQL contains multiple `INSERT` statements, one per route. Each statement filters the stream by `event_type` and projects only the columns that matter for its table.

Create a `fanout.sql` file:

```sql
INSERT INTO bsky_post_sink
  SELECT event_id, did, operation, event_time, created_at, text, langs
  FROM bsky_events_stream WHERE event_type = 'post';

INSERT INTO bsky_like_sink
  SELECT event_id, did, operation, event_time, created_at, subject_uri
  FROM bsky_events_stream WHERE event_type = 'like';

INSERT INTO bsky_repost_sink
  SELECT event_id, did, operation, event_time, created_at, subject_uri
  FROM bsky_events_stream WHERE event_type = 'repost';

INSERT INTO bsky_follow_sink
  SELECT event_id, did, operation, event_time, created_at, subject_did
  FROM bsky_events_stream WHERE event_type = 'follow';

INSERT INTO bsky_block_sink
  SELECT event_id, did, operation, event_time, created_at, subject_did
  FROM bsky_events_stream WHERE event_type = 'block';
```

Create the pipeline from the file:

npmyarnpnpm

```
npx wrangler pipelines create bsky_pipeline --sql-file fanout.sql
```

```
yarn wrangler pipelines create bsky_pipeline --sql-file fanout.sql
```

```
pnpm wrangler pipelines create bsky_pipeline --sql-file fanout.sql
```

One pipeline writes to five tables. To add a new event type later, add one sink and one `INSERT` statement. Pipeline SQL cannot be modified after creation, so you delete and recreate the pipeline to change it. To learn more, refer to [Route one stream to multiple tables](https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/#route-one-stream-to-multiple-tables).

## 5\. Bind the stream to your Worker

Add the stream binding, a Durable Object to hold the WebSocket connection, and a [cron trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) to keep the consumer alive. Replace `<STREAM_ID>` with the stream ID from step 4.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "bluesky-pipeline",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-08-25",
  "pipelines": [
    {
      "binding": "BSKY_STREAM",
      "stream": "<STREAM_ID>"
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "JETSTREAM",
        "class_name": "JetstreamConsumer"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": [
        "JetstreamConsumer"
      ]
    }
  ],
  "triggers": {
    "crons": [
      "*/2 * * * *"
    ]
  }
}
```

```toml
name = "bluesky-pipeline"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-25"

[[pipelines]]
binding = "BSKY_STREAM"
stream = "<STREAM_ID>"

[[durable_objects.bindings]]
name = "JETSTREAM"
class_name = "JetstreamConsumer"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["JetstreamConsumer"]

[triggers]
crons = ["*/2 * * * *"]
```

## 6\. Consume the firehose in a Durable Object

A [Durable Object](https://developers.cloudflare.com/durable-objects/) is the right home for a long-lived WebSocket. It stays resident while the socket is open, and an [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/) reconnects it if the connection drops. Buffer incoming events and `send()` them to the stream in batches to stay under the 5 MB per request limit. Persist the Jetstream `time_us` cursor so a reconnect resumes without gaps.

Replace the contents of `src/index.ts` with the following:

```js
import { DurableObject } from "cloudflare:workers";

// Jetstream collection -> our short event_type. Only these are kept.
const COLLECTION_TO_TYPE = {
	"app.bsky.feed.post": "post",
	"app.bsky.feed.like": "like",
	"app.bsky.feed.repost": "repost",
	"app.bsky.graph.follow": "follow",
	"app.bsky.graph.block": "block",
};
const WANTED = Object.keys(COLLECTION_TO_TYPE);
const JETSTREAM_URL = "https://jetstream2.us-east.bsky.network/subscribe";
const FLUSH_MAX = 500; // rows per send()
const FLUSH_MS = 1000; // flush at least once per second
const RECONNECT_MS = 15000;

// Flatten one Jetstream message into a unified stream row, or null to skip.
function toRow(ev) {
	if (ev?.kind !== "commit" || !ev.commit) return null;
	const c = ev.commit;
	const event_type = COLLECTION_TO_TYPE[c.collection];
	if (!event_type) return null;
	const r = c.record ?? {};
	const subject = r.subject;
	return {
		event_id: `${ev.did}/${c.collection}/${c.rkey}`,
		event_type,
		did: ev.did ?? null,
		operation: c.operation ?? null,
		event_time:
			typeof ev.time_us === "number"
				? new Date(ev.time_us / 1000).toISOString()
				: null,
		created_at: typeof r.createdAt === "string" ? r.createdAt : null,
		text: event_type === "post" && typeof r.text === "string" ? r.text : null,
		langs:
			event_type === "post" && Array.isArray(r.langs)
				? r.langs.join(",")
				: null,
		subject_uri: typeof subject === "object" ? (subject?.uri ?? null) : null,
		subject_did: typeof subject === "string" ? subject : null,
	};
}

export class JetstreamConsumer extends DurableObject {
	ws = null;
	buf = [];
	lastFlush = 0;
	cursor = null;
	flushing = false;

	// Arm the reconnect watchdog first, then connect (idempotent).
	async start() {
		await this.ctx.storage.setAlarm(Date.now() + RECONNECT_MS);
		await this.ensureConnected();
		return { connected: this.ws !== null };
	}

	async ensureConnected() {
		if (this.ws) return;
		this.cursor ??= (await this.ctx.storage.get("cursor")) ?? null;

		const params = new URLSearchParams();
		for (const c of WANTED) params.append("wantedCollections", c);
		if (this.cursor) params.set("cursor", String(this.cursor));

		const resp = await fetch(`${JETSTREAM_URL}?${params}`, {
			headers: { Upgrade: "websocket" },
		});
		const ws = resp.webSocket;
		if (!ws) throw new Error(`Jetstream handshake failed: ${resp.status}`);
		ws.accept();
		this.ws = ws;

		ws.addEventListener("message", (e) => this.onMessage(e));
		ws.addEventListener("close", () => (this.ws = null));
		ws.addEventListener("error", () => (this.ws = null));
	}

	onMessage(e) {
		let ev;
		try {
			ev = JSON.parse(e.data);
		} catch {
			return;
		}
		if (typeof ev.time_us === "number") this.cursor = ev.time_us;
		const row = toRow(ev);
		if (row) this.buf.push(row);
		if (
			this.buf.length >= FLUSH_MAX ||
			Date.now() - this.lastFlush >= FLUSH_MS
		) {
			void this.flush();
		}
	}

	// Serialize sends: flush one batch at a time, advancing the cursor on success.
	async flush() {
		if (this.flushing) return;
		this.flushing = true;
		try {
			while (this.buf.length > 0) {
				this.lastFlush = Date.now();
				const batch = this.buf.splice(0, this.buf.length);
				const batchCursor = this.cursor;
				try {
					await this.env.BSKY_STREAM.send(batch);
					await this.ctx.storage.put("cursor", batchCursor);
				} catch (err) {
					this.buf.unshift(...batch);
					console.error("send failed, will retry", err);
					return;
				}
			}
		} finally {
			this.flushing = false;
		}
	}

	// Watchdog: reconnect if dropped, flush stragglers, always reschedule.
	async alarm() {
		try {
			await this.ensureConnected();
			await this.flush();
		} catch (err) {
			console.error("alarm error", err);
		} finally {
			await this.ctx.storage.setAlarm(Date.now() + RECONNECT_MS);
		}
	}
}

export default {
	async fetch(_req, env) {
		const stub = env.JETSTREAM.get(env.JETSTREAM.idFromName("singleton"));
		return Response.json(await stub.start());
	},
	async scheduled(_event, env) {
		const stub = env.JETSTREAM.get(env.JETSTREAM.idFromName("singleton"));
		await stub.start();
	},
};
```

```ts
import { DurableObject } from "cloudflare:workers";
import type { Pipeline } from "cloudflare:pipelines";

interface Env {
	BSKY_STREAM: Pipeline;
	JETSTREAM: DurableObjectNamespace<JetstreamConsumer>;
}

// Jetstream collection -> our short event_type. Only these are kept.
const COLLECTION_TO_TYPE: Record<string, string> = {
	"app.bsky.feed.post": "post",
	"app.bsky.feed.like": "like",
	"app.bsky.feed.repost": "repost",
	"app.bsky.graph.follow": "follow",
	"app.bsky.graph.block": "block",
};
const WANTED = Object.keys(COLLECTION_TO_TYPE);
const JETSTREAM_URL = "https://jetstream2.us-east.bsky.network/subscribe";
const FLUSH_MAX = 500; // rows per send()
const FLUSH_MS = 1000; // flush at least once per second
const RECONNECT_MS = 15000;

// Flatten one Jetstream message into a unified stream row, or null to skip.
function toRow(ev: any) {
	if (ev?.kind !== "commit" || !ev.commit) return null;
	const c = ev.commit;
	const event_type = COLLECTION_TO_TYPE[c.collection];
	if (!event_type) return null;
	const r = c.record ?? {};
	const subject = r.subject;
	return {
		event_id: `${ev.did}/${c.collection}/${c.rkey}`,
		event_type,
		did: ev.did ?? null,
		operation: c.operation ?? null,
		event_time:
			typeof ev.time_us === "number"
				? new Date(ev.time_us / 1000).toISOString()
				: null,
		created_at: typeof r.createdAt === "string" ? r.createdAt : null,
		text: event_type === "post" && typeof r.text === "string" ? r.text : null,
		langs:
			event_type === "post" && Array.isArray(r.langs)
				? r.langs.join(",")
				: null,
		subject_uri: typeof subject === "object" ? (subject?.uri ?? null) : null,
		subject_did: typeof subject === "string" ? subject : null,
	};
}

export class JetstreamConsumer extends DurableObject<Env> {
	private ws: WebSocket | null = null;
	private buf: Record<string, unknown>[] = [];
	private lastFlush = 0;
	private cursor: number | null = null;
	private flushing = false;

	// Arm the reconnect watchdog first, then connect (idempotent).
	async start() {
		await this.ctx.storage.setAlarm(Date.now() + RECONNECT_MS);
		await this.ensureConnected();
		return { connected: this.ws !== null };
	}

	private async ensureConnected() {
		if (this.ws) return;
		this.cursor ??= (await this.ctx.storage.get<number>("cursor")) ?? null;

		const params = new URLSearchParams();
		for (const c of WANTED) params.append("wantedCollections", c);
		if (this.cursor) params.set("cursor", String(this.cursor));

		const resp = await fetch(`${JETSTREAM_URL}?${params}`, {
			headers: { Upgrade: "websocket" },
		});
		const ws = resp.webSocket;
		if (!ws) throw new Error(`Jetstream handshake failed: ${resp.status}`);
		ws.accept();
		this.ws = ws;

		ws.addEventListener("message", (e) => this.onMessage(e));
		ws.addEventListener("close", () => (this.ws = null));
		ws.addEventListener("error", () => (this.ws = null));
	}

	private onMessage(e: MessageEvent) {
		let ev: any;
		try {
			ev = JSON.parse(e.data as string);
		} catch {
			return;
		}
		if (typeof ev.time_us === "number") this.cursor = ev.time_us;
		const row = toRow(ev);
		if (row) this.buf.push(row);
		if (
			this.buf.length >= FLUSH_MAX ||
			Date.now() - this.lastFlush >= FLUSH_MS
		) {
			void this.flush();
		}
	}

	// Serialize sends: flush one batch at a time, advancing the cursor on success.
	private async flush() {
		if (this.flushing) return;
		this.flushing = true;
		try {
			while (this.buf.length > 0) {
				this.lastFlush = Date.now();
				const batch = this.buf.splice(0, this.buf.length);
				const batchCursor = this.cursor;
				try {
					await this.env.BSKY_STREAM.send(batch);
					await this.ctx.storage.put("cursor", batchCursor);
				} catch (err) {
					this.buf.unshift(...batch);
					console.error("send failed, will retry", err);
					return;
				}
			}
		} finally {
			this.flushing = false;
		}
	}

	// Watchdog: reconnect if dropped, flush stragglers, always reschedule.
	async alarm() {
		try {
			await this.ensureConnected();
			await this.flush();
		} catch (err) {
			console.error("alarm error", err);
		} finally {
			await this.ctx.storage.setAlarm(Date.now() + RECONNECT_MS);
		}
	}
}

export default {
	async fetch(_req, env): Promise<Response> {
		const stub = env.JETSTREAM.get(env.JETSTREAM.idFromName("singleton"));
		return Response.json(await stub.start());
	},
	async scheduled(_event, env): Promise<void> {
		const stub = env.JETSTREAM.get(env.JETSTREAM.idFromName("singleton"));
		await stub.start();
	},
} satisfies ExportedHandler<Env>;
```

Generate types for your bindings:

npmyarnpnpm

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

## 7\. Deploy and start the consumer

Deploy the Worker:

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

Open the Worker URL once to start the firehose. The cron trigger keeps it running:

```sh
curl https://bluesky-pipeline.YOUR_SUBDOMAIN.workers.dev
```

The command returns:

```txt
{ "connected": true }
```

Tail the logs to watch it work:

npmyarnpnpm

```
npx wrangler tail
```

```
yarn wrangler tail
```

```
pnpm wrangler tail
```

## 8\. Query the tables with R2 SQL

The first data lands a few minutes after the first events arrive, while the pipeline warms up.

Set your R2 SQL token, then query each table. Replace `YOUR_WAREHOUSE_NAME` with the warehouse name you noted in step 3.

```sh
export WRANGLER_R2_SQL_AUTH_TOKEN=YOUR_CATALOG_TOKEN

npx wrangler r2 sql query "YOUR_WAREHOUSE_NAME" \
  "SELECT COUNT(*) FROM bluesky.bsky_like"

npx wrangler r2 sql query "YOUR_WAREHOUSE_NAME" \
  "SELECT text, langs FROM bluesky.bsky_post WHERE langs LIKE '%en%' LIMIT 10"
```

Each table contains only its event type, projected to the relevant columns. The single pipeline did all the routing.

## Conclusion

You consumed a high-velocity public WebSocket firehose with a Durable Object, ingested it into one Pipelines stream, and used a single pipeline with multiple SQL statements to fan the stream out into five Iceberg tables by event type.

This one-stream-to-many-tables pattern generalizes to any tagged event source: clickstreams (by `event_type`), logs (by `service` or `status`), or IoT telemetry (by `device_class`). To extend it, add a sink and a matching `INSERT ... WHERE` statement.

To learn more about the SQL used here, refer to [SELECT statements](https://developers.cloudflare.com/pipelines/sql-reference/select-statements/) and [Manage pipelines](https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/examples/bluesky-firehose-fanout/#page","headline":"Fan out a stream to multiple Iceberg tables · Cloudflare Pipelines Docs","description":"Route Bluesky Jetstream events into multiple R2 Data Catalog tables using a single Pipelines stream and multiple SQL statements.","url":"https://developers.cloudflare.com/pipelines/examples/bluesky-firehose-fanout/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
```
