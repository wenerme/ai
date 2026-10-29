---
description: Connect Hyperdrive to ClickHouse Managed Postgres using a direct PostgreSQL connection and verified TLS.
title: ClickHouse Managed Postgres
image: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/clickhouse-managed-postgres/og.png?v=6e07e2fd2b363ca6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# ClickHouse Managed Postgres

Connect Hyperdrive to ClickHouse Managed Postgres.

Last updated Oct 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/clickhouse-managed-postgres/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This example connects Hyperdrive to a [ClickHouse Managed Postgres ↗︎](https://clickhouse.com/cloud/postgres) database in ClickHouse Cloud. ClickHouse Managed Postgres is a managed PostgreSQL service with local NVMe storage and built-in ClickHouse integration for analytics.

Note

ClickHouse documents the platform availability and current product status of ClickHouse Managed Postgres. For details, refer to the [ClickHouse Managed Postgres documentation ↗︎](https://clickhouse.com/docs/products/managed-postgres/).

## Prerequisites

Before you begin, you need:

- An existing ClickHouse Managed Postgres instance.
- A Workers project. Refer to [Get started](https://developers.cloudflare.com/workers/get-started/guide/) to create one.
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `4.9.0` or later, authenticated with your Cloudflare account.

## 1. Get your connection details

1. In the [ClickHouse Cloud console ↗︎](https://console.clickhouse.cloud/), select your Postgres instance and open the **Connect** menu.
2. Select **Directly** to use the direct PostgreSQL endpoint. Hyperdrive provides [connection pooling](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/).
3. Copy the hostname, port, database name, username, and password. Use a database role with the permissions your application needs.
4. In **Settings**, download the certificate authority (CA) certificate for this instance. Save it locally as `postgres-ca.pem`.

For more information, refer to [ClickHouse Managed Postgres connection details ↗︎](https://clickhouse.com/docs/products/managed-postgres/connection).

Your database must accept connections from Hyperdrive. If you restrict inbound connections by IP address, allow the [Cloudflare IP address ranges](https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/).

## 2. Create a database configuration

Use the instance CA to verify the database server with Transport Layer Security (TLS). The CA certificate is specific to your Postgres instance.

1. Upload the CA certificate to your Cloudflare account:npmyarnpnpm

   ```
   npx wrangler cert upload certificate-authority --ca-cert postgres-ca.pem --name clickhouse-postgres-ca
   ```

   ```
   yarn wrangler cert upload certificate-authority --ca-cert postgres-ca.pem --name clickhouse-postgres-ca
   ```

   ```
   pnpm wrangler cert upload certificate-authority --ca-cert postgres-ca.pem --name clickhouse-postgres-ca
   ```

2. Copy the certificate ID from the command output. Create a Hyperdrive configuration using that ID and your database connection details:npmyarnpnpm

   ```
   npx wrangler hyperdrive create clickhouse-postgres --origin-host '<HOSTNAME>' --origin-port '<PORT>' --database '<DATABASE_NAME>' --origin-scheme postgres --origin-user '<USERNAME>' --origin-password '<PASSWORD>' --ca-certificate-id '<CA_CERTIFICATE_ID>' --sslmode verify-full --caching-disabled
   ```

   ```
   yarn wrangler hyperdrive create clickhouse-postgres --origin-host '<HOSTNAME>' --origin-port '<PORT>' --database '<DATABASE_NAME>' --origin-scheme postgres --origin-user '<USERNAME>' --origin-password '<PASSWORD>' --ca-certificate-id '<CA_CERTIFICATE_ID>' --sslmode verify-full --caching-disabled
   ```

   ```
   pnpm wrangler hyperdrive create clickhouse-postgres --origin-host '<HOSTNAME>' --origin-port '<PORT>' --database '<DATABASE_NAME>' --origin-scheme postgres --origin-user '<USERNAME>' --origin-password '<PASSWORD>' --ca-certificate-id '<CA_CERTIFICATE_ID>' --sslmode verify-full --caching-disabled
   ```

   Replace each placeholder with your values. Use the direct endpoint port, which defaults to `5432`. Keep the password and command output private.
3. Copy the Hyperdrive configuration ID from the output. Use this ID for the Worker binding in the next section.

The `verify-full` mode validates the certificate and database hostname. Hyperdrive checks the connection when you create the configuration. For certificate configuration details, refer to [SSL/TLS certificates](https://developers.cloudflare.com/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/).

This example turns off query caching so reads reach Postgres. Connection pooling still applies. For workloads that can tolerate cached results, refer to [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/).

## 3. Use Hyperdrive from your Worker

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
	"compatibility_date": "2026-10-28",
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
compatibility_date = "2026-10-28"

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

To test the connection through Hyperdrive, [deploy your Worker](https://developers.cloudflare.com/workers/get-started/guide/) and request its URL. A successful response contains `success: true` and the query results.

## Next steps

- Configure [local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/).
- Review [supported PostgreSQL features](https://developers.cloudflare.com/hyperdrive/reference/supported-databases-and-features/).
- Diagnose connection errors with [Troubleshoot and debug](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/clickhouse-managed-postgres/#page","headline":"ClickHouse Managed Postgres","description":"Connect Hyperdrive to ClickHouse Managed Postgres using a direct PostgreSQL connection and verified TLS.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/clickhouse-managed-postgres/","inLanguage":"en","image":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/clickhouse-managed-postgres/og.png?v=6e07e2fd2b363ca6","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
