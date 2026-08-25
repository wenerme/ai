---
description: Use Prisma ORM with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.
title: Prisma ORM
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Prisma ORM

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Prisma ORM ↗](https://www.prisma.io/docs) is a Node.js and TypeScript ORM with a focus on type safety and developer experience. This example demonstrates how to use Prisma ORM with PostgreSQL via Cloudflare Hyperdrive in a Workers application.

## Prerequisites

* A Cloudflare account with Workers access
* A PostgreSQL database (such as [Prisma Postgres ↗](https://www.prisma.io/postgres))
* A [Hyperdrive configuration to your PostgreSQL database](https://developers.cloudflare.com/hyperdrive/get-started/#3-connect-hyperdrive-to-a-database)
* An existing [Worker project](https://developers.cloudflare.com/workers/get-started/guide/)

## 1\. Install Prisma ORM

Install Prisma CLI as a dev dependency:

npmyarnpnpmbun

```
npm i -D prisma
```

```
yarn add -D prisma
```

```
pnpm add -D prisma
```

```
bun add -d prisma
```

Install the `pg` driver and Prisma driver adapter for use with Hyperdrive:

npmyarnpnpmbun

```
npm i pg@>8.13.0 @prisma/adapter-pg
```

```
yarn add pg@>8.13.0 @prisma/adapter-pg
```

```
pnpm add pg@>8.13.0 @prisma/adapter-pg
```

```
bun add pg@>8.13.0 @prisma/adapter-pg
```

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

Add the required Node.js compatibility flags and Hyperdrive binding to your Wrangler configuration file:

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

## 2\. Configure Prisma ORM

### 2.1\. Initialize Prisma

Initialize Prisma in your application:

```sh
npx prisma init
```

This creates a `prisma` folder with a `schema.prisma` file and an `.env` file.

### 2.2\. Define a schema

Define your database schema in the `prisma/schema.prisma` file:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### 2.3\. Set up environment variables

Add your database connection string to the `.env` file created by Prisma:

```txt
DATABASE_URL="postgres://user:password@host:port/database"
```

Add helper scripts to your `package.json`:

```json
"scripts": {
  "migrate": "npx prisma migrate dev",
  "generate": "npx prisma generate --no-engine",
  "studio": "npx prisma studio"
}
```

### 2.4\. Generate Prisma Client

Generate the Prisma client with driver adapter support:

```sh
npm run generate
```

### 2.5\. Run migrations

Generate and apply the database schema:

```sh
npm run migrate
```

When prompted, provide a name for the migration (for example, `init`).

## 3\. Connect Prisma ORM to Hyperdrive

Use your Hyperdrive configuration when using Prisma ORM. Update your `src/index.ts` file:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create Prisma client using driver adapter with Hyperdrive connection string
		const adapter = new PrismaPg({ connectionString: env.HYPERDRIVE.connectionString });
		const prisma = new PrismaClient({ adapter });

		// Sample query to create and fetch users
		const user = await prisma.user.create({
			data: {
				name: "John Doe",
				email: `john.doe.${Date.now()}@example.com`,
			},
		});

		const allUsers = await prisma.user.findMany();

		return Response.json({
			newUser: user,
			allUsers: allUsers,
		});
	},
} satisfies ExportedHandler<Env>;
```

Note

When using Prisma ORM with Hyperdrive, you must use driver adapters to properly utilize the Hyperdrive connection string. The `@prisma/adapter-pg` driver adapter allows Prisma ORM to work with the `pg` driver and Hyperdrive's connection pooling. This approach provides connection pooling at the network level through Hyperdrive, so you don't need Prisma-specific connection pooling extensions like Prisma Accelerate.

## 4\. Deploy your Worker

Deploy your Worker:

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/#page","headline":"Prisma ORM · Cloudflare Hyperdrive docs","description":"Use Prisma ORM with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
