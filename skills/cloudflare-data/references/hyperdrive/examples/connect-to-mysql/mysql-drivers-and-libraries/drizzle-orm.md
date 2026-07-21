---
description: Use Drizzle ORM with Hyperdrive to query MySQL databases from Cloudflare Workers.
title: Drizzle ORM
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

#  Drizzle ORM

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/drizzle-orm/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Drizzle ORM ↗](https://orm.drizzle.team/) is a lightweight TypeScript ORM with a focus on type safety. This example demonstrates how to use Drizzle ORM with MySQL via Cloudflare Hyperdrive in a Workers application.

## Prerequisites

* A Cloudflare account with Workers access
* A MySQL database
* A [Hyperdrive configuration to your MySQL database](https://developers.cloudflare.com/hyperdrive/get-started/#3-connect-hyperdrive-to-a-database)

## 1\. Install Drizzle

Install the Drizzle ORM and its dependencies such as the [mysql2 ↗](https://github.com/sidorares/node-mysql2) driver:

```sh
# mysql2 v3.13.0 or later is required
npm i drizzle-orm mysql2 dotenv
npm i -D drizzle-kit tsx @types/node
```

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-07-21",
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
compatibility_date = "2026-07-21"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>"
```

## 2\. Configure Drizzle

### 2.1\. Define a schema

With Drizzle ORM, we define the schema in TypeScript rather than writing raw SQL.

1. Create a folder `/db/` in `/src/`.
2. Create a `schema.ts` file.
3. In `schema.ts`, define a `users` table as shown below.
```ts
// src/schema.ts
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
export const users = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at").defaultNow(),
});
```

### 2.2\. Connect Drizzle ORM to the database with Hyperdrive

Use your the credentials of your Hyperdrive configuration for your database when using the Drizzle ORM.

Populate your `index.ts` file as shown below.

```ts
// src/index.ts

import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { users } from "./db/schema";

export interface Env {
	HYPERDRIVE: Hyperdrive;
  }

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a connection using the mysql2 driver with the Hyperdrive credentials (only accessible from your Worker).
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,

			// Required to enable mysql2 compatibility for Workers
			disableEval: true,
		});

		// Create the Drizzle client with the mysql2 driver connection
		const db = drizzle(connection);

		// Sample query to get all users
		const allUsers = await db.select().from(users);

		return Response.json(allUsers);
	},
} satisfies ExportedHandler<Env>;
```

### 2.3\. Configure Drizzle-Kit for migrations (optional)

Note

You need to set up the tables in your database so that Drizzle ORM can make queries that work.

If you have already set it up (for example, if another user has applied the schema to your database), or if you are starting to use Drizzle ORM and the schema matches what already exists in your database, then you do not need to run the migration.

You can generate and run SQL migrations on your database based on your schema using Drizzle Kit CLI. Refer to [Drizzle ORM docs ↗](https://orm.drizzle.team/docs/get-started/mysql-new) for additional guidance.

1. Create a `.env` file in the root folder of your project, and add your database connection string. The Drizzle Kit CLI will use this connection string to create and apply the migrations.
```toml
# .env
# Replace with your direct database connection string
DATABASE_URL='mysql://user:password@db-host.cloud/database-name'
```
2. Create a `drizzle.config.ts` file in the root folder of your project to configure Drizzle Kit and add the following content:
```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
out: './drizzle',
schema: './src/db/schema.ts',
dialect: 'mysql',
dbCredentials: {
url: process.env.DATABASE_URL!,
  },
});
```
3. Generate the migration file for your database according to your schema files and apply the migrations to your database.
```bash
npx drizzle-kit generate
```
```bash
No config path provided, using default 'drizzle.config.ts'
Reading config file 'drizzle.config.ts'
Reading schema files:
/src/db/schema.ts
1 tables
users 4 columns 0 indexes 0 fks
[✓] Your SQL migration file ➜ drizzle/0000_daffy_rhodey.sql 🚀
```
```bash
npx drizzle-kit migrate
```
```bash
No config path provided, using default 'drizzle.config.ts'
Reading config file 'drizzle.config.ts'
```

## 3\. Deploy your Worker

Deploy your Worker.

```bash
npx wrangler deploy
```

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/drizzle-orm/#page","headline":"Drizzle ORM · Cloudflare Hyperdrive docs","description":"Use Drizzle ORM with Hyperdrive to query MySQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/drizzle-orm/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
