---
description: Connect Hyperdrive to an AWS RDS database instance.
title: AWS RDS and Aurora
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# AWS RDS and Aurora

Connect Hyperdrive to an AWS RDS or AWS Aurora MySQL database instance.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/aws-rds-aurora/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example shows you how to connect Hyperdrive to an Amazon Relational Database Service (Amazon RDS) or Amazon Aurora MySQL database instance.

## 1\. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access.

Note

To allow Hyperdrive to connect to your database, you must allow Cloudflare IPs to be able to access your database. You can either allow-list all IP address ranges (0.0.0.0 - 255.255.255.255) or restrict your IP access control list to the [IP ranges used by Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/).

Alternatively, you can connect to your databases over in your private network using [Cloudflare Tunnels](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/).

### AWS Console

When creating or modifying an instance in the AWS console:

1. Configure a **database cluster** and other settings you wish to customize.
2. Under **Settings** \> **Credential settings**, note down the **Master username** and **Master password** (Aurora only).
3. Under the **Connectivity** header, ensure **Public access** is set to **Yes**.
4. Select an **Existing VPC security group** that allows public Internet access from `0.0.0.0/0` to the port your database instance is configured to listen on (default: `3306` for MySQL instances).
5. Select **Create database**.

Caution

You must ensure that the [VPC security group ↗](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html) associated with your database allows public IPv4 access to your database port.

Refer to AWS' [database server rules ↗](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#sg-rules-db-server) for details on how to configure rules specific to your RDS database.

### Retrieve the database endpoint (Aurora)

To retrieve the database endpoint (hostname) for Hyperdrive to connect to:

1. Go to **Databases** view under **RDS** in the AWS console.
2. Select the database you want Hyperdrive to connect to.
3. Under the **Endpoints** header, note down the **Endpoint name** with the type `Writer` and the **Port**.

### Retrieve the database endpoint (RDS MySQL)

For regular RDS instances (non-Aurora), you will need to fetch the endpoint and port of the database:

1. Go to **Databases** view under **RDS** in the AWS console.
2. Select the database you want Hyperdrive to connect to.
3. Under the **Connectivity & security** header, note down the **Endpoint** and the **Port**.

The endpoint will resemble `YOUR_DATABASE_NAME.cpuo5rlli58m.AWS_REGION.rds.amazonaws.com`, and the port will default to `3306`.

Support for MySQL-compatible providers

Support for AWS Aurora MySQL databases is coming soon. Join our early preview support by reaching out to us in the [Hyperdrive Discord channel ↗](https://discord.cloudflare.com/).

## 2\. Create your user

Once your database is created, you will need to create a user for Hyperdrive to connect as. Although you can use the **Master username** configured during initial database creation, best practice is to create a less privileged user.

To create a new user, log in to the database and use the `CREATE USER` command:

```sh
# Log in to the database
mysql -h ENDPOINT_NAME -P PORT -u MASTER_USERNAME -p database_name
```

Run the following SQL statements:

```sql
-- Create a role for Hyperdrive
CREATE ROLE hyperdrive;

-- Allow Hyperdrive to connect
GRANT USAGE ON mysql_db.* TO hyperdrive;

-- Grant database privileges to the hyperdrive role
GRANT ALL PRIVILEGES ON mysql_db.* to hyperdrive;

-- Create a specific user for Hyperdrive to log in as
CREATE USER 'hyperdrive_user'@'%' IDENTIFIED WITH caching_sha2_password BY 'sufficientlyRandomPassword';

-- Grant this new user the hyperdrive role privileges
GRANT hyperdrive to 'hyperdrive_user'@'%';
```

Refer to AWS' [documentation on user roles in MySQL ↗](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.MySQL.CommonDBATasks.privilege-model.html) for more details.

With a database user, password, database endpoint (hostname and port), and database name, you can now set up Hyperdrive.

## 3\. Create a database configuration

To configure Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`) you configured in a previous step.
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `mysql`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```txt
mysql://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name
```

Most database providers will provide a connection string you can copy-and-paste directly into Hyperdrive.

To create a Hyperdrive configuration with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/), open your terminal and run the following command.

* Replace <NAME\_OF\_HYPERDRIVE\_CONFIG> with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or,
* Replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

This command outputs a binding for the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

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

## 3\. Use Hyperdrive from your Worker

Install the [mysql2 ↗](https://github.com/sidorares/node-mysql2) driver:

npmyarnpnpmbun

```
npm i mysql2@>3.13.0
```

```
yarn add mysql2@>3.13.0
```

```
pnpm add mysql2@>3.13.0
```

```
bun add mysql2@>3.13.0
```

Note

`mysql2` v3.13.0 or later is required

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

Create a new `connection` instance and pass the Hyperdrive parameters:

```ts
// mysql2 v3.13.0 or later is required
import { createConnection } from "mysql2/promise";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new connection on each request. Hyperdrive maintains the underlying
		// database connection pool, so creating a new connection is fast.
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,

			// Required to enable mysql2 compatibility for Workers
			disableEval: true,
		});

		try {
			// Sample query
			const [results, fields] = await connection.query("SHOW tables;");

			// Return result rows as JSON
			return Response.json({ results, fields });
		} catch (e) {
			console.error(e);
			return Response.json(
				{ error: e instanceof Error ? e.message : e },
				{ status: 500 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

Note

The minimum version of `mysql2` required for Hyperdrive is `3.13.0`.

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/aws-rds-aurora/#page","headline":"AWS RDS and Aurora · Cloudflare Hyperdrive docs","description":"Connect Hyperdrive to an AWS RDS database instance.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/aws-rds-aurora/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
