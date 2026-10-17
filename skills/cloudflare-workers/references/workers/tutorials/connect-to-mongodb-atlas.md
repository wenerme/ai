---
description: This tutorial explains how to connect to a MongoDB database with Cloudflare Workers. The Workers application you create in this tutorial will query a movies database in MongoDB.
title: Connect to a MongoDB database with Cloudflare Workers
image: https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/og.png?v=cdb0c521bc47671d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to a MongoDB database with Cloudflare Workers

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In this tutorial, you will learn how to create a Cloudflare Workers application and connect it to a MongoDB database using the native Node.js driver. You will start with a direct connection from a Worker, then use a [Durable Object](https://developers.cloudflare.com/durable-objects/) to persist connections and reduce latency.

Note

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) does not support MongoDB. Hyperdrive only supports PostgreSQL and MySQL wire protocols. To reduce connection latency with MongoDB, use a Durable Object as shown in this tutorial.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm` ↗︎](https://docs.npmjs.com/getting-started).
3. Install [`Node.js` ↗︎](https://nodejs.org/en/). Use a Node version manager like [Volta ↗︎](https://volta.sh/) or [nvm ↗︎](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions.
4. Make sure you have access to a MongoDB database. You can use [MongoDB Atlas ↗︎](https://www.mongodb.com/atlas), a self-hosted MongoDB instance, or any other MongoDB-compatible host.

## 1. Create a Worker application

First, use the [`create-cloudflare` CLI ↗︎](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker application. To do this, open a terminal window and run the following command:

npmyarnpnpm

```
npm create cloudflare@latest -- mongodb-tutorial
```

```
yarn create cloudflare mongodb-tutorial
```

```
pnpm create cloudflare@latest mongodb-tutorial
```

This will prompt you to install the [`create-cloudflare` ↗︎](https://www.npmjs.com/package/create-cloudflare) package and lead you through a setup wizard.

For setup, select the following options:

- For *What would you like to start with?*, choose `Hello World example`.
- For *Which template would you like to use?*, choose `Worker only`.
- For *Which language do you want to use?*, choose `TypeScript`.
- For *Do you want to use git for version control?*, choose `Yes`.
- For *Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?*, choose `Yes`.
- For *Do you want to deploy your application?*, choose `No` (we will be making some changes before deploying).

If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed. If you deploy, you can still modify your Worker code and deploy again at the end of this tutorial.

Now, move into the newly created directory:

```sh
cd mongodb-tutorial
```

## 2. Enable Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for the MongoDB driver, and needs to be configured for your Workers project.

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

## 3. Add the MongoDB connection library

To connect to a MongoDB database, you will need the `mongodb` library. In your Worker application directory, run the following command to install the library:

npmyarnpnpmbun

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

Note

Make sure you are using `mongodb` version `6.15.0` or higher.

## 4. Configure the connection to the MongoDB database

Set your MongoDB connection string as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) so that it is not stored as plain text. Use [`wrangler secret put`](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) with the example variable name `MONGODB_URI`:

```sh
npx wrangler secret put MONGODB_URI
```

Set your `MONGODB_URI` secret locally in a `.env` file as documented in [Local Development with Secrets](https://developers.cloudflare.com/workers/configuration/secrets/):

*.envtoml*

```toml
MONGODB_URI="<ENTER YOUR MONGODB CONNECTION STRING>"
```

## 5. Connect to the MongoDB database in the Worker

Open your Worker's main file (for example, `src/index.ts`) and import the `MongoClient` class from the `mongodb` library:

```typescript
import { MongoClient } from "mongodb";
```

In the `fetch` event handler, create a new `MongoClient` instance and connect to the MongoDB database.

```typescript
// create a new MongoClient instance using the connection string
const client = new MongoClient(env.MONGODB_URI);
// connect to the MongoDB database
await client.connect();
```

## 6. Interact with the movies database

To demonstrate how to interact with the movies database, you will fetch a document from the `movies` collection by querying the collection when a request is received.

Note

If you are following along with MongoDB Atlas, you can use the `sample_mflix` sample dataset. To load this data, open the Atlas console, navigate to your cluster, and select **Load Sample Dataset**.

Replace the existing code in your `src/index.ts` file with the following code:

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

This code establishes a connection to the MongoDB database within your Worker application and queries the `movies` collection, returning the result as a JSON response.

## 7. Deploy your Worker

Run the following command to deploy your Worker:

```sh
npx wrangler deploy
```

After deploying, you can interact with your MongoDB database using your Cloudflare Worker. Whenever a request is made to your Worker's URL, it will fetch data from the `movies` collection and return it as a JSON response.

## 8. Use a Durable Object to accelerate queries

Each Worker invocation creates a new TCP and TLS connection to MongoDB. For low-traffic use cases, this is acceptable. For latency-sensitive applications, place the `MongoClient` inside a [Durable Object](https://developers.cloudflare.com/durable-objects/) to persist the connection between requests.

Create a new file for the Durable Object class:

*src/MongoDBConnection.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
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
		await this.client.connect();
		return this.client
			.db("sample_mflix")
			.collection("movies")
			.findOne(
				{ title: "The Room" },
				{ projection: { _id: 0, title: 1, imdb: 1 } },
			);
	}
}
```

*src/MongoDBConnection.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { MongoClient } from "mongodb";

interface Env {
	MONGODB_URI: string;
}

export class MongoDBConnection extends DurableObject<Env> {
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
		await this.client.connect();
		return this.client
			.db("sample_mflix")
			.collection("movies")
			.findOne(
				{ title: "The Room" },
				{ projection: { _id: 0, title: 1, imdb: 1 } },
			);
	}
}
```

Update your Worker entry point to route requests to the Durable Object:

*src/index.jsjs*

```js
import { MongoDBConnection } from "./MongoDBConnection";

export default {
	async fetch(request, env) {
		const id = env.MONGODB_CONNECTION.idFromName("mongodb-connection");
		const stub = env.MONGODB_CONNECTION.get(id, { locationHint: "enam" });
		const movie = await stub.getMovie();
		return Response.json({ movie });
	},
};

export { MongoDBConnection };
```

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
		const movie = await stub.getMovie();
		return Response.json({ movie });
	},
} satisfies ExportedHandler<Env>;

export { MongoDBConnection };
```

Use the `locationHint` option to place the Durable Object close to your MongoDB cluster.

Configure the Durable Object binding and migration in your Wrangler file:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "mongodb-tutorial",
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
name = "mongodb-tutorial"
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

## 9. Redeploy your Worker

Run the following command to deploy your Worker:

```sh
npx wrangler deploy
```

Your Worker application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`, using a Durable Object to persist MongoDB connections. This reduces query latency from \~300 ms on cold requests to \~35 ms on warm requests.

Durable Object considerations

- The connection is reused only while the Durable Object stays in memory. After a minute or two without requests, the Durable Object is evicted and its connection is dropped. The next request re-establishes the connection and pays the cold start cost again. This is expected behavior — there is no shutdown hook to close the connection manually, and none is needed.
- Run all database logic inside the Durable Object. You cannot return `MongoClient`, `Db`, or `Collection` objects to the calling Worker over RPC.
- A single Durable Object instance handles roughly 1,000 requests per second. To scale beyond this, distribute requests across multiple instances.

## Next steps

To build more with databases and Workers, refer to [Tutorials](https://developers.cloudflare.com/workers/tutorials) and explore the [Databases documentation](https://developers.cloudflare.com/workers/databases).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord ↗︎](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/#page","headline":"Connect to a MongoDB database with Cloudflare Workers","description":"This tutorial explains how to connect to a MongoDB database with Cloudflare Workers. The Workers application you create in this tutorial will query a movies database in MongoDB.","url":"https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/og.png?v=cdb0c521bc47671d","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MongoDB","TypeScript","NoSQL"]}
```
