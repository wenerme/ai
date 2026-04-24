---
title: Workers Binding API
description: API reference for VPC Service and VPC Network bindings in Workers.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-vpc/api/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Workers Binding API

VPC bindings provide a `fetch()` API for accessing private services from your Worker through Cloudflare Tunnel. Both [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) and [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/) expose the same `fetch()` method — the difference is in routing scope.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

## Binding types

### VPC Service

A VPC Service binding routes requests to a specific pre-registered host and port. The [VPC Service configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) always determines the connection target, even if a different URL or host is present in the `fetch()` call.

* The **host** provided in `fetch()` does not control routing. It only populates the `Host` header and, when using `https`, the Server Name Indication (SNI) value.
* The **port** provided in `fetch()` is ignored — the port specified in the VPC Service configuration is always used.

### VPC Network

A VPC Network binding grants access to any service reachable through the bound tunnel or Cloudflare Mesh. The URL passed to `fetch()` determines the actual destination — hostname or IP address and port.

## fetch()

Makes an HTTP request to the private service through the configured tunnel.

JavaScript

```

const response = await env.MY_BINDING.fetch(resource, options);


```

### Parameters

* `resource` (string | URL | Request) — The URL to fetch. Must be an absolute URL including protocol, host, and path (for example, `http://internal-api/api/users`).
* `options` (optional RequestInit) — Standard fetch options including:  
   * `method` — HTTP method (GET, POST, PUT, DELETE, etc.)  
   * `headers` — Request headers  
   * `body` — Request body  
   * `signal` — AbortSignal for request cancellation

Absolute URLs required

VPC binding fetch requests must use absolute URLs including the protocol (`http`/`https`), host, and path. Relative paths are not supported.

### Return value

Returns a `Promise<Response>` that resolves to a [standard Fetch API Response object ↗](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Examples

The following examples apply to both VPC Service and VPC Network bindings.

#### Basic GET request

JavaScript

```

export default {

  async fetch(request, env) {

    const privateRequest = new Request(

      "http://internal-api.company.local/users",

    );

    const response = await env.MY_BINDING.fetch(privateRequest);

    const users = await response.json();


    return new Response(JSON.stringify(users), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

Explain Code

#### POST request with body

JavaScript

```

export default {

  async fetch(request, env) {

    const privateRequest = new Request(

      "http://internal-api.company.local/users",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${env.API_TOKEN}`,

        },

        body: JSON.stringify({

          name: "John Doe",

          email: "john@example.com",

        }),

      },

    );


    const response = await env.MY_BINDING.fetch(privateRequest);


    if (!response.ok) {

      return new Response("Failed to create user", { status: response.status });

    }


    const user = await response.json();

    return new Response(JSON.stringify(user), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

Explain Code

#### Request with HTTPS and IP address

JavaScript

```

export default {

  async fetch(request, env) {

    const privateRequest = new Request("https://10.0.1.50/api/data");

    const response = await env.MY_BINDING.fetch(privateRequest);


    return response;

  },

};


```

## Required roles

To bind a VPC Service or VPC Network in a Worker, your user needs `Connectivity Directory Bind` (or `Connectivity Directory Admin`). Binding directly to a tunnel through a VPC Network binding requires `Connectivity Directory Admin`. For role definitions, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

## Next steps

* Configure [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/)
* Configure [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/)
* Refer to [usage examples](https://developers.cloudflare.com/workers-vpc/examples/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/api/","name":"Workers Binding API"}}]}
```
