---
title: Materialize
description: Connect Hyperdrive to a Materialize streaming database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/hyperdrive/examples/connect-to-postgres/postgres-database-providers/materialize.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Materialize

**Last reviewed:**  over 2 years ago 

Connect Hyperdrive to a Materialize streaming database.

This example shows you how to connect Hyperdrive to a [Materialize ↗](https://materialize.com/) database. Materialize is a Postgres-compatible streaming database that can automatically compute real-time results against your streaming data sources.

## 1\. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access to your database.

### Materialize Console

Note

Read the Materialize [Quickstart guide ↗](https://materialize.com/docs/get-started/quickstart/) to set up your first database. The steps below assume you have an existing Materialize database ready to go.

You will need to create a new application user and password for Hyperdrive to connect with:

1. Log in to the [Materialize Console ↗](https://console.materialize.com/).
2. Under the **App Passwords** section, select **Manage app passwords**.
3. Select **New app password** and enter a name, for example, `hyperdrive-user`.
4. Select **Create Password**.
5. Copy the provided password: it will only be shown once.

To retrieve the hostname and database name of your Materialize configuration:

1. Select **Connect** in the sidebar of the Materialize Console.
2. Select **External tools**.
3. Copy the **Host**, **Port** and **Database** settings.

With the username, app password, hostname, port and database name, you can now connect Hyperdrive to your Materialize database.

## 2\. Create a database configuration

To configure Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`) you configured in a previous step.
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `postgres`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```

postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Most database providers will provide a connection string you can directly copy-and-paste directly into Hyperdrive.

* [ Dashboard ](#tab-panel-4793)
* [ Wrangler CLI ](#tab-panel-4794)

To create a Hyperdrive configuration with the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.  
[ Go to **Hyperdrive** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select **Create Configuration**.
3. Fill out the form, including the connection string.
4. Select **Create**.

To create a Hyperdrive configuration with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):

1. Open your terminal and run the following command. Replace `<NAME_OF_HYPERDRIVE_CONFIG>` with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:  
Terminal window  
```  
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"  
```
2. This command outputs a binding for the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):  
   * [  wrangler.jsonc ](#tab-panel-4791)  
   * [  wrangler.toml ](#tab-panel-4792)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "hyperdrive-example",  
  "main": "src/index.ts",  
  // Set this to today's date  
  "compatibility_date": "2026-04-10",  
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
Explain Code  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "hyperdrive-example"  
main = "src/index.ts"  
# Set this to today's date  
compatibility_date = "2026-04-10"  
compatibility_flags = [ "nodejs_compat" ]  
[[hyperdrive]]  
binding = "HYPERDRIVE"  
id = "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"  
```  
Explain Code

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

## 3\. Use Hyperdrive from your Worker

Install the `node-postgres` driver:

 npm  yarn  pnpm  bun 

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

 npm  yarn  pnpm  bun 

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

* [  wrangler.jsonc ](#tab-panel-4795)
* [  wrangler.toml ](#tab-panel-4796)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-04-10",

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<your-hyperdrive-id-here>"

    }

  ]

}


```

Explain Code

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-04-10"


[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<your-hyperdrive-id-here>"


```

Create a new `Client` instance and pass the Hyperdrive `connectionString`:

TypeScript

```

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

Explain Code

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/","name":"Database Providers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/materialize/","name":"Materialize"}}]}
```
