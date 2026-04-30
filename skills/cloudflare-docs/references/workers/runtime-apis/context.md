---
title: Context (ctx)
description: The Context API in Cloudflare Workers, including props, exports, waitUntil and passThroughOnException.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Context (ctx)

The Context API provides methods to manage the lifecycle of your Worker or Durable Object.

Context is exposed via the following places:

* As the third parameter in all [handlers](https://developers.cloudflare.com/workers/runtime-apis/handlers/), including the [fetch() handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/). (`fetch(request, env, ctx)`)
* As a class property of the [WorkerEntrypoint class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc) (`this.ctx`)

Note that the Context API is available strictly in stateless contexts, that is, not [Durable Objects](https://developers.cloudflare.com/durable-objects/). However, Durable Objects have a different object, the [Durable Object State](https://developers.cloudflare.com/durable-objects/api/state/), which is available as `this.ctx` inside a Durable Object class, and provides some of the same functionality as the Context API.

## `props`

`ctx.props` provides a way to pass additional configuration to a worker based on the context in which it was invoked. For example, when your Worker is called by another Worker, `ctx.props` can provide information about the calling worker.

For example, imagine that you are configuring a Worker called "frontend-worker", which must talk to another Worker called "doc-worker" in order to manipulate documents. You might configure "frontend-worker" with a [Service Binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings) like:

* [  wrangler.jsonc ](#tab-panel-9081)
* [  wrangler.toml ](#tab-panel-9082)

JSONC

```

{

  "services": [

    {

      "binding": "DOC_SERVICE",

      "service": "doc-worker",

      "entrypoint": "DocServiceApi",

      "props": {

        "clientId": "frontend-worker",

        "permissions": [

          "read",

          "write"

        ]

      }

    }

  ]

}


```

TOML

```

[[services]]

binding = "DOC_SERVICE"

service = "doc-worker"

entrypoint = "DocServiceApi"


  [services.props]

  clientId = "frontend-worker"

  permissions = [ "read", "write" ]


```

Now frontend-worker can make calls to doc-worker with code like `env.DOC_SERVICE.getDoc(id)`. This will make a [Remote Procedure Call](https://developers.cloudflare.com/workers/runtime-apis/rpc/) invoking the method `getDoc()` of the class `DocServiceApi`, a [WorkerEntrypoint class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc) exported by doc-worker.

The configuration contains a `props` value. This in an arbitrary JSON value. When the `DOC_SERVICE` binding is used, the `DocServiceApi` instance receiving the call will be able to access this `props` value as `this.ctx.props`. Here, we've configured `props` to specify that the call comes from frontend-worker, and that it should be allowed to read and write documents. However, the contents of `props` can be anything you want.

The Workers platform is designed to ensure that `ctx.props` can only be set by someone who has permission to edit and deploy the worker to which it is being delivered. This means that you can trust that the content of `ctx.props` is authentic. There is no need to use secret keys or cryptographic signatures in a `ctx.props` value.

`ctx.props` can also be used to configure an RPC interface to represent a _specific_ resource, thus creating a "custom binding". For example, we could configure a Service Binding to our "doc-worker" which grants access only to a specific document:

* [  wrangler.jsonc ](#tab-panel-9083)
* [  wrangler.toml ](#tab-panel-9084)

JSONC

```

{

  "services": [

    {

      "binding": "FOO_DOCUMENT",

      "service": "doc-worker",

      "entrypoint": "DocumentApi",

      "props": {

        "docId": "e366592caec1d88dff724f74136b58b5",

        "permissions": [

          "read",

          "write"

        ]

      }

    }

  ]

}


```

TOML

```

[[services]]

binding = "FOO_DOCUMENT"

service = "doc-worker"

entrypoint = "DocumentApi"


  [services.props]

  docId = "e366592caec1d88dff724f74136b58b5"

  permissions = [ "read", "write" ]


```

Here, we've placed a `docId` property in `ctx.props`. The `DocumentApi` class could be designed to provide an API to the specific document identified by `ctx.props.docId`, and enforcing the given permissions.

## `exports`

Compatibility flag required

To use `ctx.exports`, you must use [the enable\_ctx\_exports compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags#enable-ctxexports).

`ctx.exports` provides automatically-configured "loopback" bindings for all of your top-level exports.

* For each top-level export that `extends WorkerEntrypoint` (or simply implements a fetch handler), `ctx.exports` automatically contains a [Service Binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings).
* For each top-level export that `extends DurableObject` (and which has been configured with storage via a [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/)), `ctx.exports` automatically contains a [Durable Object namespace binding](https://developers.cloudflare.com/durable-objects/api/namespace/).

For example:

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class Greeter extends WorkerEntrypoint {

  greet(name) {

    return `Hello, ${name}!`;

  }

}


export default {

  async fetch(request, env, ctx) {

    let greeting = await ctx.exports.Greeter.greet("World");

    return new Response(greeting);

  },

};


```

In this example, the default fetch handler calls the `Greeter` class over RPC, like how you'd use a Service Binding. However, there is no external configuration required. `ctx.exports` is populated _automatically_ from your top-level imports.

### Specifying `ctx.props` when using `ctx.exports`

Loopback Service Bindings in `ctx.exports` have an extra capability that regular Service Bindings do not: the caller can specify the value of `ctx.props` that should be delivered to the callee.

* [  JavaScript ](#tab-panel-9079)
* [  TypeScript ](#tab-panel-9080)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class Greeter extends WorkerEntrypoint {

  greet(name) {

    return `${this.ctx.props.greeting}, ${name}!`;

  }

}


export default {

  async fetch(request, env, ctx) {

    // Make a custom greeter that uses the greeting "Welcome".

    let greeter = ctx.exports.Greeter({ props: { greeting: "Welcome" } });


    // Greet the world. Returns "Welcome, World!"

    let greeting = await greeter.greet("World");


    return new Response(greeting);

  },

};


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


type Props = {

  greeting: string;

};


export class Greeter extends WorkerEntrypoint<Env, Props> {

  greet(name) {

    return `${this.ctx.props.greeting}, ${name}!`;

  }

}


export default {

  async fetch(request, env, ctx) {

    // Make a custom greeter that uses the greeting "Welcome".

    let greeter = ctx.exports.Greeter({ props: { greeting: "Welcome" } });


    // Greet the world. Returns "Welcome, World!"

    let greeting = await greeter.greet("World");


    return new Response(greeting);

  },

} satisfies ExportedHandler<Env>;


```

Specifying props dynamically is permitted in this case because the caller is the same Worker, and thus can be presumed to be trusted to specify any props. The ability to customize props is particularly useful when the resulting binding is to be passed to another Worker over RPC or used in the `env` of a [dynamically-loaded worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/).

Note that `props` values specified in this way are allowed to contain any "persistently" serializable type. This includes all basic [structured clonable data types ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm). It also includes Service Bindings themselves: you can place a Service Binding into the `props` of another Service Binding.

### TypeScript types for `ctx.exports` and `ctx.props`

If using TypeScript, you should use [the wrangler types command](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) to auto-generate types for your project. The generated types will ensure `ctx.exports` is typed correctly.

When declaring an entrypoint class that accepts `props`, make sure to declare it as `extends WorkerEntrypoint<Env, Props>`, where `Props` is the type of `ctx.props`. See the example above.

## `waitUntil`

`ctx.waitUntil()` extends the lifetime of your Worker, allowing you to perform work without blocking returning a response, and that may continue after a response is returned. It accepts a `Promise`, which the Workers runtime will continue executing, even after a response has been returned by the Worker's [handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/).

`waitUntil` is commonly used to:

* Fire off events to external analytics providers. (note that when you use [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/), you do not need to use `waitUntil`)
* Put items into cache using the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)

`waitUntil` has a 30-second time limit

The Worker's lifetime is extended for up to 30 seconds after the response is sent or the client disconnects. This time limit is shared across all `waitUntil()` calls within the same request — if any Promises have not settled after 30 seconds, they are cancelled. When `waitUntil` tasks are cancelled, the following warning will be logged to [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) and any attached [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/): `waitUntil() tasks did not complete within the allowed time after invocation end and have been cancelled.`

If you need to guarantee that work completes successfully, you should send messages to a [Queue](https://developers.cloudflare.com/queues/) and process them in a separate consumer Worker. Queues provide reliable delivery and automatic retries, ensuring your work is not lost.

Alternatives to waitUntil

If you are using `waitUntil()` to emit logs or exceptions, we recommend using [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) instead. Even if your Worker throws an uncaught exception, the Tail Worker will execute, ensuring that you can emit logs or exceptions regardless of the Worker's invocation status.

[Cloudflare Queues](https://developers.cloudflare.com/queues/) is purpose-built for performing work out-of-band, without blocking returning a response back to the client Worker.

You can call `waitUntil()` multiple times. Similar to `Promise.allSettled`, even if a promise passed to one `waitUntil` call is rejected, promises passed to other `waitUntil()` calls will still continue to execute.

For example:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Forward / proxy original request

    let res = await fetch(request);


    // Add custom header(s)

    res = new Response(res.body, res);

    res.headers.set("x-foo", "bar");


    // Cache the response

    // NOTE: Does NOT block / wait

    ctx.waitUntil(caches.default.put(request, res.clone()));


    // Done

    return res;

  },

};


```

## `passThroughOnException`

Reuse of body

The Workers Runtime uses streaming for request and response bodies. It does not buffer the body. Hence, if an exception occurs after the body has been consumed, `passThroughOnException()` cannot send the body again.

If this causes issues, we recommend cloning the request body and handling exceptions in code. This will protect against uncaught code exceptions. However some exception times such as exceed CPU or memory limits will not be mitigated.

The `passThroughOnException` method allows a Worker to [fail open ↗](https://community.microfocus.com/cyberres/b/sws-22/posts/security-fundamentals-part-1-fail-open-vs-fail-closed), and pass a request through to an origin server when a Worker throws an unhandled exception. This can be useful when using Workers as a layer in front of an existing service, allowing the service behind the Worker to handle any unexpected error cases that arise in your Worker.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Proxy to origin on unhandled/uncaught exceptions

    ctx.passThroughOnException();

    throw new Error("Oops");

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/context/","name":"Context (ctx)"}}]}
```
