---
title: Connect to a private database
description: This example demonstrates how to query a private PostgreSQL database from a Worker using Workers VPC and Hyperdrive. The Worker connects to a database that is not exposed to the public Internet, with Hyperdrive providing connection pooling and query acceleration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to a private database

This example demonstrates how to query a private PostgreSQL database from a Worker using [Workers VPC](https://developers.cloudflare.com/workers-vpc/) and [Hyperdrive](https://developers.cloudflare.com/hyperdrive/). The Worker connects to a database that is not exposed to the public Internet, with Hyperdrive providing connection pooling and query acceleration.

## Prerequisites

* A PostgreSQL database running in your private network (for example, on port 5432)
* A [Cloudflare Tunnel](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/) connected to the private network where your database runs
* A Cloudflare account with Workers VPC access

## 1\. Set up a Cloudflare Tunnel

If you do not already have a tunnel running in the same network as your database, create one.

1. Go to the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc/tunnels) and select the **Tunnels** tab.
2. Select **Create** to create a tunnel.
3. Enter a name for your tunnel and select **Save tunnel**.
4. Choose your operating system and architecture. The dashboard will provide installation instructions.
5. Follow the provided commands to download, install, and run `cloudflared` with your unique token.

The tunnel must be able to reach your database host and port from within the private network. For full tunnel documentation, refer to [Cloudflare Tunnel for Workers VPC](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/).

## 2\. Create a TCP VPC Service

Create a VPC Service of type `tcp` that points to your database:

Terminal window

```

npx wrangler vpc service create my-postgres-db \

  --type tcp \

  --tcp-port 5432 \

  --app-protocol postgresql \

  --tunnel-id <YOUR_TUNNEL_ID> \

  --ipv4 <YOUR_DATABASE_IP>


```

Replace `<YOUR_TUNNEL_ID>` with the tunnel ID from step 1 and `<YOUR_DATABASE_IP>` with the private IP address of your database (for example, `10.0.0.5`).

The command returns a service ID. Save this value for the next step.

Note

If your database uses a self-signed certificate, add `--cert-verification-mode verify_ca` to the command above. Refer to [TLS certificate verification mode](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#tls-certificate-verification-mode) for all options.

## 3\. Create a Hyperdrive configuration

Use the `--service-id` flag to point Hyperdrive at the VPC Service you created:

Terminal window

```

npx wrangler hyperdrive create my-vpc-database \

  --service-id <YOUR_VPC_SERVICE_ID> \

  --database <DATABASE_NAME> \

  --user <DATABASE_USER> \

  --password <DATABASE_PASSWORD> \

  --scheme postgresql


```

Replace `<YOUR_VPC_SERVICE_ID>` with the service ID from step 2, and provide your database name, user, and password.

The command outputs a Hyperdrive configuration ID. Copy this for the next step.

## 4\. Bind Hyperdrive to a Worker

You must create a binding in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Worker to connect to your Hyperdrive configuration. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like Hyperdrive, on the Cloudflare developer platform.

To bind your Hyperdrive configuration to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-10168)
* [  wrangler.toml ](#tab-panel-10169)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<YOUR_DATABASE_ID>" // the ID associated with the Hyperdrive you just created

    }

  ]

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<YOUR_DATABASE_ID>"


```

Specifically:

* The value (string) you set for the `binding` (binding name) will be used to reference this database in your Worker. In this tutorial, name your binding `HYPERDRIVE`.
* The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "hyperdrive"` or `binding = "productionDB"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>`.

If you wish to use a local database during development, you can add a `localConnectionString` to your Hyperdrive configuration with the connection string of your database:

* [  wrangler.jsonc ](#tab-panel-10170)
* [  wrangler.toml ](#tab-panel-10171)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<YOUR_DATABASE_ID>", // the ID associated with the Hyperdrive you just created

      "localConnectionString": "<LOCAL_DATABASE_CONNECTION_URI>"

    }

  ]

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<YOUR_DATABASE_ID>"

localConnectionString = "<LOCAL_DATABASE_CONNECTION_URI>"


```

Note

Learn more about setting up [Hyperdrive for local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/).

## 5\. Query the database

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

* [  wrangler.jsonc ](#tab-panel-10172)
* [  wrangler.toml ](#tab-panel-10173)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-05-28",

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<your-hyperdrive-id-here>"

    }

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-05-28"


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

## 6\. Deploy and test

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Send a request to verify the connection:

Terminal window

```

curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev


```

A successful response returns a JSON array of rows from your database.

## Next steps

* Learn more about [how Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)
* Configure [query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/) for Hyperdrive
* Review [VPC Service configuration options](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) including TLS certificate verification
* Explore [other examples](https://developers.cloudflare.com/workers-vpc/examples/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/examples/private-database/","name":"Connect to a private database"}}]}
```
