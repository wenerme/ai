---
title: Durable Object Container
description: Access and manage containers associated with a Durable Object, including start, stop, and interaction methods.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/durable-objects/api/container.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Durable Object Container

## Description

When using a [Container-enabled Durable Object](https://developers.cloudflare.com/containers), you can access the Durable Object's associated container via the `container` object which is on the `ctx` property. This allows you to start, stop, and interact with the container.

Note

It is likely preferable to use the official `Container` class, which provides helper methods and a more idiomatic API for working with containers on top of Durable Objects.

* [  JavaScript ](#tab-panel-6772)
* [  TypeScript ](#tab-panel-6773)

index.js

```

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);


    // boot the container when starting the DO

    this.ctx.blockConcurrencyWhile(async () => {

      this.ctx.container.start();

    });

  }

}


```

Explain Code

index.ts

```

export class MyDurableObject extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);


      // boot the container when starting the DO

      this.ctx.blockConcurrencyWhile(async () => {

        this.ctx.container.start();

    });

    }


}


```

Explain Code

## Attributes

### `running`

`running` returns `true` if the container is currently running. It does not ensure that the container has fully started and ready to accept requests.

JavaScript

```

  this.ctx.container.running;


```

## Methods

### `start`

`start` boots a container. This method does not block until the container is fully started. You may want to confirm the container is ready to accept requests before using it.

JavaScript

```

this.ctx.container.start({

  env: {

    FOO: "bar",

  },

  enableInternet: false,

  entrypoint: ["node", "server.js"],

});


```

#### Parameters

* `options` (optional): An object with the following properties:  
   * `env`: An object containing environment variables to pass to the container. This is useful for passing configuration values or secrets to the container.  
   * `entrypoint`: An array of strings representing the command to run in the container.  
   * `enableInternet`: A boolean indicating whether to enable internet access for the container.

#### Return values

* None.

### `destroy`

`destroy` stops the container and optionally returns a custom error message to the `monitor()` error callback.

JavaScript

```

this.ctx.container.destroy("Manually Destroyed");


```

#### Parameters

* `error` (optional): A string that will be sent to the error handler of the `monitor` method. This is useful for logging or debugging purposes.

#### Return values

* A promise that returns once the container is destroyed.

### `signal`

`signal` sends an IPC signal to the container, such as SIGKILL or SIGTERM. This is useful for stopping the container gracefully or forcefully.

JavaScript

```

const SIGTERM = 15;

this.ctx.container.signal(SIGTERM);


```

#### Parameters

* `signal`: a number representing the signal to send to the container. This is typically a POSIX signal number, such as SIGTERM (15) or SIGKILL (9).

#### Return values

* None.

### `getTcpPort`

`getTcpPort` returns a TCP port from the container. This can be used to communicate with the container over TCP and HTTP.

JavaScript

```

const port = this.ctx.container.getTcpPort(8080);

const res = await port.fetch("http://container/set-state", {

  body: initialState,

  method: "POST",

});


```

JavaScript

```

const conn = this.ctx.container.getTcpPort(8080).connect("10.0.0.1:8080");

await conn.opened;


try {

  if (request.body) {

    await request.body.pipeTo(conn.writable);

  }

  return new Response(conn.readable);

} catch (err) {

  console.error("Request body piping failed:", err);

  return new Response("Failed to proxy request body", { status: 502 });

}


```

Explain Code

#### Parameters

* `port` (number): a TCP port number to use for communication with the container.

#### Return values

* `TcpPort`: a `TcpPort` object representing the TCP port. This object can be used to send requests to the container over TCP and HTTP.

### `monitor`

`monitor` returns a promise that resolves when a container exits and errors if a container errors. This is useful for setting up callbacks to handle container status changes in your Workers code.

JavaScript

```

class MyContainer extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

    function onContainerExit() {

      console.log("Container exited");

    }


    // the "err" value can be customized by the destroy() method

    async function onContainerError(err) {

      console.log("Container errored", err);

    }


    this.ctx.container.start();

    this.ctx.container.monitor().then(onContainerExit).catch(onContainerError);

  }

}


```

Explain Code

#### Parameters

* None

#### Return values

* A promise that resolves when the container exits.

### `interceptOutboundHttp`

`interceptOutboundHttp` routes outbound HTTP requests matching a hostname, hostname glob, IP address, IP:port, or CIDR range through a `WorkerEntrypoint`. Can be called before or after starting the container. Open connections pick up the new handler without being dropped.

JavaScript

```

const worker = this.ctx.exports.MyWorker({ props: { message: "hello" } });


// Match a specific hostname

this.ctx.container.interceptOutboundHttp("api.example.com", worker);


// Match a hostname glob pattern

this.ctx.container.interceptOutboundHttp("*.example.com", worker);


// Match an IP:port

await this.ctx.container.interceptOutboundHttp("15.0.0.1:80", worker);


// Match a CIDR range (IPv4 and IPv6)

await this.ctx.container.interceptOutboundHttp("123.123.123.123/23", worker);


```

Explain Code

#### Parameters

* `target` (string): A hostname, hostname glob (for example, `*.example.com`), IP address, IP:port, or CIDR range to match.
* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle matching requests.

#### Return values

* None.

### `interceptAllOutboundHttp`

`interceptAllOutboundHttp` routes all outbound HTTP requests from the container through a `WorkerEntrypoint`, regardless of destination.

JavaScript

```

await this.ctx.container.interceptAllOutboundHttp(worker);


```

#### Parameters

* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle all outbound HTTP requests.

#### Return values

* A promise that resolves once the intercept rule is installed.

### `interceptOutboundHttps`

`interceptOutboundHttps` routes outbound HTTPS requests matching a hostname or hostname glob through a `WorkerEntrypoint`. Works the same way as `interceptOutboundHttp` but for HTTPS traffic. The container must trust the CA certificate at `/etc/cloudflare/certs/cloudflare-containers-ca.crt` for HTTPS interception to work.

Supports glob patterns where `*` matches any sequence of characters.

JavaScript

```

const worker = this.ctx.exports.MyWorker({ props: {} });


// Match a specific hostname

this.ctx.container.interceptOutboundHttps("api.example.com", worker);


// Match a hostname glob pattern

this.ctx.container.interceptOutboundHttps("*.example.com", worker);


// Intercept all HTTPS traffic

this.ctx.container.interceptOutboundHttps("*", worker);


```

Explain Code

#### Parameters

* `target` (string): A hostname or hostname glob pattern to match. Use `*` to intercept all HTTPS traffic.
* `worker` (WorkerEntrypoint): A `WorkerEntrypoint` instance to handle matching requests.

#### Return values

* None.

## Related resources

* [Containers](https://developers.cloudflare.com/containers)
* [Get Started With Containers](https://developers.cloudflare.com/containers/get-started)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/container/","name":"Durable Object Container"}}]}
```
