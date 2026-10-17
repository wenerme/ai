---
description: Connect Cloudflare Workers to MongoDB using the native Node.js driver or Mongoose.
title: MongoDB
image: https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/og.png?v=456970d4b9f269d4
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# MongoDB

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[MongoDB ↗︎](https://www.mongodb.com/) is a document-oriented database. You can run MongoDB yourself, use [MongoDB Atlas ↗︎](https://www.mongodb.com/atlas) (a fully managed cloud service), or use any other MongoDB-compatible host.

Note

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) does not support MongoDB. Hyperdrive only supports PostgreSQL and MySQL wire protocols. To reduce connection latency, use a [Durable Object](https://developers.cloudflare.com/durable-objects/) to persist connections between requests, as shown below.

Use this approach for low-traffic use cases where a \~300 ms connection overhead per request is acceptable. Each Worker invocation creates a new TCP and TLS connection to your MongoDB cluster.

## Set up a direct connection

To connect to MongoDB directly from a Worker:

1. You need an existing MongoDB cluster and connection string. If you do not have one, [create an Atlas cluster ↗︎](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/) and copy your connection string from the Atlas console.
2. Enable Node.js compatibility for your Worker:

   For compatibility dates of `2026-08-04` or later, Workers and Pages projects enable both `nodejs_compat` and `nodejs_compat_v2` by default. Built-in runtime APIs and polyfills are available without additional configuration. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date.

   If your compatibility date is before `2026-08-04`, add the [`nodejs_compat`](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in:

   ```jsonc
   {
   	"compatibility_flags": [
   		"nodejs_compat"
   	]
   }
   ```

   ```toml
   compatibility_flags = [ "nodejs_compat" ]
   ```

   To turn off [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) completely for a compatibility date of `2026-08-04` or later, remove the positive flags if present. Then add both `no_nodejs_compat` and `no_nodejs_compat_v2`. For configuration examples, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).
3. Install the MongoDB Node.js driver:npmyarnpnpmbun

   ```
   npm i mongodb
   ```

   ```
   yarn add mongodb
   ```

   ```
   pnpm add mongodb
   ```

   ```
   bun add mongodb
   ```

4. Add your MongoDB connection string as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) to your Worker:

   ```sh
   npx wrangler secret put MONGODB_URI
   # When prompted, paste your MongoDB connection string
   ```

5. The following example shows how to query a MongoDB database from a Worker:

   *src/index.jsjs*



   ```js
   import { MongoClient } from "mongodb";

   export default {
   	async fetch(request, env, ctx) {
   		const client = new MongoClient(env.MONGODB_URI);
   		await client.connect();

   		const movie = await client
   			.db("sample_mflix")
   			.collection("movies")
   			.findOne(
   				{ title: "The Room" },
   				{ projection: { _id: 0, title: 1, imdb: 1 } },
   			);

   		return Response.json({ movie });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   import { MongoClient } from "mongodb";

   export interface Env {
   	MONGODB_URI: string;
   }

   export default {
   	async fetch(request, env, ctx): Promise<Response> {
   		const client = new MongoClient(env.MONGODB_URI);
   		await client.connect();

   		const movie = await client
   			.db("sample_mflix")
   			.collection("movies")
   			.findOne(
   				{ title: "The Room" },
   				{ projection: { _id: 0, title: 1, imdb: 1 } },
   			);

   		return Response.json({ movie });
   	},
   	} satisfies ExportedHandler<Env>;
   ```

   The MongoDB driver uses the `node:net` and `node:tls` modules, which are available in Workers when `nodejs_compat` is enabled with a compatibility date of `2025-03-20` or later.
6. Deploy your Worker:

   ```sh
   npx wrangler deploy
   ```

Use this approach for latency-sensitive applications. Workers cannot reuse I/O objects across requests, so connection pooling does not work in a plain Worker. Placing the `MongoClient` inside a [Durable Object](https://developers.cloudflare.com/durable-objects/) persists the connection between requests, reducing query latency from \~300 ms to \~35 ms on warm requests.

## Set up a connection using a Durable Object

To connect to MongoDB using a Durable Object:

1. You need an existing MongoDB cluster and connection string. If you do not have one, [create an Atlas cluster ↗︎](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/) and copy your connection string from the Atlas console.
2. Enable Node.js compatibility for your Worker:

   For compatibility dates of `2026-08-04` or later, Workers and Pages projects enable both `nodejs_compat` and `nodejs_compat_v2` by default. Built-in runtime APIs and polyfills are available without additional configuration. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date.

   If your compatibility date is before `2026-08-04`, add the [`nodejs_compat`](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in:

   ```jsonc
   {
   	"compatibility_flags": [
   		"nodejs_compat"
   	]
   }
   ```

   ```toml
   compatibility_flags = [ "nodejs_compat" ]
   ```

   To turn off [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) completely for a compatibility date of `2026-08-04` or later, remove the positive flags if present. Then add both `no_nodejs_compat` and `no_nodejs_compat_v2`. For configuration examples, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).
3. Install the MongoDB Node.js driver:npmyarnpnpmbun

   ```
   npm i mongodb
   ```

   ```
   yarn add mongodb
   ```

   ```
   pnpm add mongodb
   ```

   ```
   bun add mongodb
   ```

4. Add your MongoDB connection string as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) to your Worker:

   ```sh
   npx wrangler secret put MONGODB_URI
   # When prompted, paste your MongoDB connection string
   ```

5. Create a Durable Object class that holds the `MongoClient` instance:

   *src/MongoDBConnection.jsjs*



   ```js
   import { DurableObject, DurableObjectState } from "cloudflare:workers";
   import { MongoClient } from "mongodb";

   export class MongoDBConnection extends DurableObject {
   	client;

   	constructor(state, env) {
   		super(state, env);
   		this.client = new MongoClient(env.MONGODB_URI, {
   			maxPoolSize: 1,
   			minPoolSize: 0,
   			serverSelectionTimeoutMS: 5000,
   			maxIdleTimeMS: 20_000,
   		});
   	}

   	async getMovie() {
   		const start = Date.now();
   		await this.client.connect();
   		const movie = await this.client
   			.db("sample_mflix")
   			.collection("movies")
   			.findOne(
   				{ title: "The Room" },
   				{ projection: { _id: 0, title: 1, imdb: 1 } },
   			);
   		return { movie, queryTime: Date.now() - start };
   	}
   }
   ```

   *src/MongoDBConnection.tsts*



   ```ts
   import { DurableObject, DurableObjectState } from "cloudflare:workers";
   import { MongoClient } from "mongodb";

   interface Env {
   	MONGODB_URI: string;
   }

   export class MongoDBConnection extends DurableObject {
   	private client: MongoClient;

   	constructor(state: DurableObjectState, env: Env) {
   		super(state, env);
   		this.client = new MongoClient(env.MONGODB_URI, {
   			maxPoolSize: 1,
   			minPoolSize: 0,
   			serverSelectionTimeoutMS: 5000,
   			maxIdleTimeMS: 20_000,
   		});
   	}

   	async getMovie() {
   		const start = Date.now();
   		await this.client.connect();
   		const movie = await this.client
   			.db("sample_mflix")
   			.collection("movies")
   			.findOne(
   				{ title: "The Room" },
   				{ projection: { _id: 0, title: 1, imdb: 1 } },
   			);
   		return { movie, queryTime: Date.now() - start };
   	}
   }
   ```

   Creating the `MongoClient` in the constructor and calling `connect()` in the request handler allows the Durable Object to reuse an existing connection across requests.
6. Update your Worker entry point to route requests to the Durable Object:

   *src/index.tsts*



   ```ts
   import { MongoDBConnection } from "./MongoDBConnection";

   interface Env {
   	MONGODB_URI: string;
   	MONGODB_CONNECTION: DurableObjectNamespace<MongoDBConnection>;
   }

   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const id = env.MONGODB_CONNECTION.idFromName("mongodb-connection");
   		const stub = env.MONGODB_CONNECTION.get(id, { locationHint: "enam" });
   		const result = await stub.getMovie();
   		return Response.json(result);
   	},
   } satisfies ExportedHandler<Env>;

   export { MongoDBConnection };
   ```

   Use the `locationHint` option to place the Durable Object close to your MongoDB cluster. Available hints include `wnam`, `enam`, `sam`, `weur`, `eeur`, `apac`, `oc`, `afr`, and `me`. Match the hint to the region of your MongoDB cluster.
7. Configure the Durable Object binding and migration in your Wrangler file:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "workers-mongodb-demo",
     "main": "src/index.ts",
     // Set this to today's date
     "compatibility_date": "2026-10-17",
     "compatibility_flags": [
       "nodejs_compat"
     ],
     "durable_objects": {
       "bindings": [
         {
           "name": "MONGODB_CONNECTION",
           "class_name": "MongoDBConnection"
         }
       ]
     },
     "migrations": [
       {
         "tag": "v1",
         "new_classes": [
           "MongoDBConnection"
         ]
       }
     ]
   }
   ```

   ```toml
   name = "workers-mongodb-demo"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-10-17"
   compatibility_flags = ["nodejs_compat"]

   [[durable_objects.bindings]]
   name = "MONGODB_CONNECTION"
   class_name = "MongoDBConnection"

   [[migrations]]
   tag = "v1"
   new_classes = ["MongoDBConnection"]
   ```

8. Deploy your Worker:

   ```sh
   npx wrangler deploy
   ```

## Durable Object lifecycle considerations

- The Durable Object evicts after roughly 70–140 seconds of no incoming requests. The next request pays the cold start cost again.
- TCP connections do not survive hibernation.
- You cannot pass `MongoClient`, `Db`, or `Collection` objects back to the calling Worker via RPC. Run all database logic inside the Durable Object.
- A single Durable Object instance has a soft limit of roughly 1,000 requests per second.

## Use Mongoose

[Mongoose ↗︎](https://mongoosejs.com/) version 9 and later works on Workers with Node.js compatibility enabled. Earlier versions loaded the browser bundle instead of the Node.js entry point and required a manual patch to the `package.json` exports map. This is no longer necessary.

The following example shows a Mongoose Durable Object:

*src/MongoDBConnection.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import mongoose, { Schema, Model } from "mongoose";

const movieSchema = new Schema({
	title: String,
	imdb: { rating: Number, votes: Number, id: Number },
});

export class MongoDBConnection extends DurableObject {
	Movie;

	constructor(state, env) {
		super(state, env);
		this.Movie = mongoose.model("Movie", movieSchema, "movies");
	}

	async getMovie() {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(this.env.MONGODB_URI, { dbName: "sample_mflix" });
		}

		return this.Movie.findOne(
			{ title: "The Room" },
			{ _id: 0, title: 1, imdb: 1 },
		).lean();
	}
}
```

*src/MongoDBConnection.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import mongoose, { Schema, Model } from "mongoose";

interface Env {
	MONGODB_URI: string;
}

const movieSchema = new Schema({
	title: String,
	imdb: { rating: Number, votes: Number, id: Number },
});

export class MongoDBConnection extends DurableObject<Env> {
	private Movie: Model<any>;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.Movie = mongoose.model("Movie", movieSchema, "movies");
	}

	async getMovie() {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(this.env.MONGODB_URI, { dbName: "sample_mflix" });
		}

		return this.Movie.findOne(
			{ title: "The Room" },
			{ _id: 0, title: 1, imdb: 1 },
		).lean();
	}
}
```

## Next steps

- Learn more about [Durable Objects](https://developers.cloudflare.com/durable-objects/).
- Review the [MongoDB Node.js driver documentation ↗︎](https://www.mongodb.com/docs/drivers/node/current/).
- Explore [other storage options](https://developers.cloudflare.com/workers/platform/storage-options/) for Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/#page","headline":"MongoDB","description":"Connect Cloudflare Workers to MongoDB using the native Node.js driver or Mongoose.","url":"https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/og.png?v=456970d4b9f269d4","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
