---
title: Cloudflare Workers VPC
description: Securely connect your private cloud to Cloudflare to build cross-cloud apps.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-vpc/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cloudflare Workers VPC

Securely connect your private cloud to Cloudflare to build cross-cloud apps.

 Available on Free and Paid plans 

Workers VPC allows you to connect your Workers to your private APIs and services in external clouds (AWS, Azure, GCP, on-premise, etc.) that are not accessible from the public Internet.

With Workers VPC, you can configure a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to establish secure, private connections from your private networks to Cloudflare. Then, you can configure a [VPC Service](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) for each service in the external private network you need to connect to, and use [VPC Service bindings](https://developers.cloudflare.com/workers-vpc/api/) to connect from Workers.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

* [ index.ts ](#tab-panel-9472)
* [ wrangler.jsonc ](#tab-panel-9473)

TypeScript

```

export default {

  async fetch(request, env, ctx) {

    // Access your private API through the service binding

    const response = await env.PRIVATE_API.fetch(

      "http://internal-api.company.local/data",

    );


      // Process the response from your private network

      const data = await response.json();


      return new Response(JSON.stringify(data), {

        headers: { "content-type": "application/json" },

      });

    },


};


```

Explain Code

```

  {

    "$schema": "node_modules/wrangler/config-schema.json",

    "name": "WORKER-NAME",

    "main": "src/index.ts",

    "compatibility_date": "2025-02-04",

    "vpc_services": [

      {

        "binding": "PRIVATE_API",

        "service_id": "ENTER_SERVICE_ID",

        "remote": true

      }

    ]

  }


```

Explain Code

## Use cases

### Access private APIs from Workers applications

Deploy APIs or full-stack applications to Workers that connect to private authentication services, CMS systems, internals APIs, and more. Your Workers applications run globally with optimized access to the backend services of your private network.

### API gateway

Route requests to internal microservices in your private network based on URL paths. Centralize access control and load balancing for multiple private services on Workers.

### Internal tooling, agents, dashboards

Build employee-facing applications and MCP servers that aggregate data from multiple private services. Create unified dashboards, admin panels, and internal tools without exposing backend systems.

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

**[Hyperdrive](https://developers.cloudflare.com/hyperdrive/)** 

Connect to PostgreSQL and MySQL databases from Workers with connection pooling and caching built-in, available to all Workers plans.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}}]}
```
