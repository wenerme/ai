---
title: Handle outbound traffic
description: Intercept and handle outbound HTTP from containers using Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/platform-details/outbound-traffic.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Handle outbound traffic

Outbound Workers are Workers that handle HTTP requests made by your container. They act as programmable egress proxies, running on the same machine as the container with access to all Workers bindings.

Use outbound Workers to route requests to Workers functions and their bindings (KV, R2, Durable Objects, etc.)

## Defining outbound handlers

Use `outbound` to intercept outbound HTTP traffic regardless of destination:

JavaScript

```

import { Container, ContainerProxy } from "@cloudflare/containers";

export { ContainerProxy };


export class MyContainer extends Container {}


MyContainer.outbound = async (request, env, ctx) => {

  if (request.method !== "GET") {

    console.log(`Blocked ${request.method} to ${request.url}`);

    return new Response("Method Not Allowed", { status: 405 });

  }

  return fetch(request);

};


```

TLS support coming soon

Containers currently only intercept HTTP traffic. HTTPS interception is coming soon. This will enable using Workers as a transparent proxy for credential injection.

Even though this is just using HTTP, traffic to Workers is secure and runs on the same machine as the Container. If needed, you can also upgrade requests to TLS from the Worker itself.

Use `outboundByHost` to map specific domain names or IP addresses to handler functions:

JavaScript

```

import { Container, ContainerProxy } from "@cloudflare/containers";

export { ContainerProxy };


export class MyContainer extends Container {}


MyContainer.outboundByHost = {

  "my.worker": async (request, env, ctx) => {

    // Run arbitrary Workers logic from this hostname

    return await someWorkersFunction(request.body);

  },

};


```

The container calls `http://my.worker` and the handler runs entirely inside the Workers runtime, outside of the container sandbox.

If you define both, `outboundByHost` handlers take precedence over the catch-all `outbound` handler.

## Use Workers bindings in handlers

Outbound handlers have access to your Worker's bindings. Route container traffic to internal platform resources without changing application code.

JavaScript

```

export class MyContainer extends Container {}


MyContainer.outboundByHost = {

  "my.kv": async (request, env, ctx) => {

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    const value = await env.KV.get(key);

    return new Response(value);

  },

  "my.r2": async (request, env, ctx) => {

    const url = new URL(request.url);

    // Scope access to this container's ID

    const path = `${ctx.containerId}${url.pathname}`;

    const object = await env.R2.get(path);

    return new Response(object?.body ?? null, { status: object ? 200 : 404 });

  },

};


```

The container calls `http://my.kv/some-key` and the outbound handler resolves it using the KV binding.

## Access Durable Object state

The `ctx` argument exposes `containerId`, which lets you interact with the container's own Durable Object from an outbound handler.

JavaScript

```

"get-state.do": async (request, env, ctx) => {

  const id = env.MY_CONTAINER.idFromString(ctx.containerId);

  const stub = env.MY_CONTAINER.get(id);

  // Assumes getStateForKey is defined on your DO

  return stub.getStateForKey(request.body);

},


```

Note

You can also use `containerId` to apply different rules per container instance — for example, to look up per-instance configuration from KV.

## Change policies at runtime

Use `outboundHandlers` to define named handlers, then assign them to specific hosts at runtime using `setOutboundByHost()`. You can also apply a handler globally with `setOutboundHandler()`.

JavaScript

```

export class MyContainer extends Container {}


MyContainer.outboundHandlers = {

  kvAccess: async (request, env, ctx) => {

    const key = new URL(request.url).pathname.slice(1);

    const value = await env.KV.get(key);

    return new Response(value ?? "", { status: value ? 200 : 404 });

  },

};


```

Apply handlers to hosts programmatically from your Worker:

JavaScript

```

async setUpContainer(req, env) {

  const container = await env.MY_CONTAINER.getByName("my-instance");


  // Give the container access to KV on a specific host during setup

  await container.setOutboundByHost("my.kv", "kvAccess");

  await container.exec("node setup.js");


  // Remove access once setup is complete

  await container.removeOutboundByHost("my.kv");

}


```

## Low-level API

To configure outbound interception directly on `ctx.container`, use `interceptOutboundHttp` for a specific IP or CIDR range, or `interceptAllOutboundHttp` for all traffic. Both accept a `WorkerEntrypoint`.

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class MyOutboundWorker extends WorkerEntrypoint {

  fetch(request) {

    // Inspect, modify, or deny the request before passing it on

    return fetch(request);

  }

}


// Inside your Container DurableObject

this.ctx.container.start({ enableInternet: false });

const worker = this.ctx.exports.MyOutboundWorker({ props: {} });

await this.ctx.container.interceptAllOutboundHttp(worker);


```

You can call these methods before or after starting the container, and even while connections are open. In-flight TCP connections pick up the new handler automatically — no connections are dropped.

JavaScript

```

// Intercept a specific CIDR range

await this.ctx.container.interceptOutboundHttp("203.0.113.0/24", worker);

// Intercept by hostname

this.ctx.container.interceptOutboundHttp("foo.com", worker);


// Update the handler while the container is running

const updated = this.ctx.exports.MyOutboundWorker({

  props: { phase: "post-install" },

});

await this.ctx.container.interceptOutboundHttp("203.0.113.0/24", updated);


```

The `Container` class will call these methods automatically when using the various functions shown above.

## Local development

`wrangler dev` supports outbound interception. A sidecar process is spawned inside the container's network namespace. It applies `TPROXY` rules to route matching traffic to the local Workerd instance, mirroring production behavior.

Warning

Hostnames that do not resolve via DNS do not work in local development yet. These hostnames do work in production. This limitation will be corrected in a future update.

## Related resources

* [Control outbound traffic (Sandboxes)](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) — Sandbox SDK API for outbound handlers
* [Environment variables and secrets](https://developers.cloudflare.com/containers/platform-details/environment-variables/) — Configure secrets and environment variables
* [Durable Object interface](https://developers.cloudflare.com/durable-objects/api/container/) — Full `ctx.container` API reference

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/outbound-traffic/","name":"Handle outbound traffic"}}]}
```
