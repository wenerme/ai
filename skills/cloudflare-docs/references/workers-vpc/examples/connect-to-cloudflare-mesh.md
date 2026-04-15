---
title: Connect Workers to Cloudflare Mesh
description: This example demonstrates how to use a VPC Network binding with Cloudflare Mesh (formerly WARP Connector) to connect to any private service in your account from a Worker — without pre-registering individual hosts or specifying a tunnel UUID.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-vpc/examples/connect-to-cloudflare-mesh.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect Workers to Cloudflare Mesh

This example demonstrates how to use a VPC Network binding with [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (formerly WARP Connector) to connect to any private service in your account from a Worker — without pre-registering individual hosts or specifying a tunnel UUID.

When you bind to [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) using `network_id: "cf1:network"`, your Worker can reach any Mesh node, client device, or subnet route in your account.

## Prerequisites

* A [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) node connected to your private network
* Private services running behind your Mesh node (for example, an internal API, database, or web application)

## 1\. Configure your Worker

Bind your Worker to Cloudflare Mesh using `network_id: "cf1:network"` in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-7227)
* [  wrangler.toml ](#tab-panel-7228)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "mesh-gateway",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-04-15",

  "vpc_networks": [

    {

      "binding": "MESH",

      "network_id": "cf1:network",

      "remote": true

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "mesh-gateway"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-04-15"


[[vpc_networks]]

binding = "MESH"

network_id = "cf1:network"

remote = true


```

Explain Code

With this single binding, your Worker can reach any service across all tunnels and Mesh nodes in your account.

## 2\. Implement the Worker

Use the VPC Network binding to access services by private IP address. Cloudflare Mesh currently supports IP-based routing only.

index.js

```

// Replace with the Mesh IP and port of your private service

const NODE_IP = "10.0.1.50";

const NODE_PORT = 8080;


export default {

  async fetch(request, env, ctx) {

    try {

      const response = await env.MESH.fetch(

        `http://${NODE_IP}:${NODE_PORT}/api/data`,

      );

      return response;

    } catch (error) {

      // fetch() throws if the VPC Network cannot connect to the target

      return new Response("Service unavailable", { status: 503 });

    }

  },

};


```

Explain Code

Unlike [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/), the URL you pass to `fetch()` determines the actual destination. You can reach any IP and port accessible through your Mesh network without creating separate bindings for each service.

## 3\. Deploy and test

Deploy your Worker and verify it can reach your private services:

Terminal window

```

npx wrangler deploy


```

Terminal window

```

# Test accessing the internal user API

curl https://mesh-gateway.workers.dev/api/users


# Test accessing metrics by private IP

curl https://mesh-gateway.workers.dev/api/metrics


```

## Next steps

* Learn more about [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/) configuration options
* Refer to the [Workers Binding API](https://developers.cloudflare.com/workers-vpc/api/) reference
* [Set up Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/) for your account
* Explore [other examples](https://developers.cloudflare.com/workers-vpc/examples/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/examples/connect-to-cloudflare-mesh/","name":"Connect Workers to Cloudflare Mesh"}}]}
```
