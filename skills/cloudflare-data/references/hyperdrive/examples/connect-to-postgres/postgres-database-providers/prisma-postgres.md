---
description: Connect Hyperdrive to a Prisma Postgres database.
title: Prisma Postgres
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Prisma Postgres

Connect Hyperdrive to a Prisma Postgres database.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example shows you how to connect Hyperdrive to a [Prisma Postgres ↗](https://www.prisma.io/postgres) database.

## 1\. Allow Hyperdrive access

You can connect Hyperdrive to any existing Prisma Postgres database by using your existing database connection string.

### Prisma Data Platform

1. Go to the [**Prisma Data Platform Console** ↗](https://console.prisma.io/) and select the project (database) you wish to connect to.
2. Select **Connect to your database** \> **Any client**.
3. Select **Generate database credentials**. Copy the connection string for your Prisma Postgres database.
4. Edit the connection string to make it compatible with Hyperdrive.
* Add the database name after the port. You may remove any query parameters, such as `?sslmode=require`.
* The final string will look like:

```txt
postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name
```

Note

An alternative to the Prisma Data Platform is to use the [create-db ↗](https://www.npmjs.com/package/create-db) package. This package will generate a quick temporary Prisma Postgres database for you to use.

```bash
npx create-db@latest
```

With this connection string, you can now create a Hyperdrive database configuration.

## 2\. Create a database configuration

To configure Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`) you configured in a previous step.
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `postgres`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```txt
postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name
```

Most database providers will provide a connection string you can directly copy-and-paste directly into Hyperdrive.

To create a Hyperdrive configuration with the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.
[Go to **Hyperdrive** ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select **Create Configuration**.
3. Fill out the form, including the connection string.
4. Select **Create**.

To create a Hyperdrive configuration with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):

1. Open your terminal and run the following command. Replace `<NAME_OF_HYPERDRIVE_CONFIG>` with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:
```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```
2. This command outputs a binding for the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):
```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "hyperdrive-example",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Pasted from the output of `wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string=[...]` above.
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"
		}
	]
}
```
```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "hyperdrive-example"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-25"
compatibility_flags = [ "nodejs_compat" ]
[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"
```

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

## 3\. Use Hyperdrive from your Worker

Install the `node-postgres` driver:

npmyarnpnpmbun

```
npm i pg@>8.16.3
```

```
yarn add pg@>8.16.3
```

```
pnpm add pg@>8.16.3
```

```
bun add pg@>8.16.3
```

Note

The minimum version of `node-postgres` required for Hyperdrive is `8.16.3`.

If using TypeScript, install the types package:

npmyarnpnpmbun

```
npm i -D @types/pg
```

```
yarn add -D @types/pg
```

```
pnpm add -D @types/pg
```

```
bun add -d @types/pg
```

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]
# Set this to today's date
compatibility_date = "2026-08-25"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>"
```

Create a new `Client` instance and pass the Hyperdrive `connectionString`:

```ts
// filepath: src/index.ts
import { Client } from "pg";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// Create a new client instance for each request. Hyperdrive maintains the
		// underlying database connection pool, so creating a new client is fast.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			// Connect to the database
			await client.connect();

			// Perform a simple query
			const result = await client.query("SELECT * FROM pg_tables");

			return Response.json({
				success: true,
				result: result.rows,
			});
		} catch (error: any) {
			console.error("Database error:", error.message);

			return new Response("Internal error occurred", { status: 500 });
		}
	},
};
```

## 4\. Configure Hyperdrive maximum connections

Prisma Postgres has limits on the number of direct connections that can be made to the database using Hyperdrive. Refer to [Prisma Postgres limits ↗](https://www.prisma.io/docs/postgres/database/direct-connections?utm%5Fsource=website&utm%5Fmedium=postgres-page#connection-limit).

Note

There are two limits to consider here.

* Origin database's connection limit, set by the origin database provider. This is the maximum number of direct database connections that can be made to the origin database.
* Hyperdrive's origin connection limit, set by Hyperdrive. This is the maximum number of database connections that Hyperdrive can make to your origin database (in this case, Prisma Postgres).

Hyperdrive's origin connection limit should be lower than the Prisma Postgres connection limit, since Hyperdrive's origin connection limit is a soft limit, and Hyperdrive may create more connections if there are network disruptions that prevent existing connections from being used.

1. From the [Cloudflare Hyperdrive dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive), select your newly created Hyperdrive configuration.
2. Go to **Settings**.
3. In **Origin connection limit**, select **Edit Settings**, and set your maximum connections to a number that is lower than your Prisma connection limit.

1. Edit your existing Hyperdrive configuration with the `--origin-connection-limit` parameter:
```bash
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=10
```
Replace `<HYPERDRIVE_ID>` with your Hyperdrive configuration ID and set the connection limit to a number that is less than your Prisma connection limit.
2. Verify the configuration change:
```bash
npx wrangler hyperdrive get <HYPERDRIVE_ID>
```

Note

When connecting to a Prisma Postgres database with Hyperdrive, you should use a driver like [node-postgres (pg)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/) or [Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/) to connect directly to the underlying PostgreSQL database, instead of the Prisma Accelerate extension. Hyperdrive is optimized for database access for Workers, and connects directly to your database to perform global connection pooling and fast query routing.

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/#page","headline":"Prisma Postgres · Cloudflare Hyperdrive docs","description":"Connect Hyperdrive to a Prisma Postgres database.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
