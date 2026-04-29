---
title: Transport modes
description: Configure how Sandbox SDK communicates between Durable Objects and containers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Transport modes

Configure how the Sandbox SDK communicates with containers using transport modes.

## Overview

The Sandbox SDK supports two transport modes for communication between the Durable Object and the container:

* **HTTP transport** (default) - Each SDK operation makes a separate HTTP request to the container.
* **WebSocket transport** \- All SDK operations are multiplexed over a single persistent WebSocket connection.

## When to use WebSocket transport

Use WebSocket transport when your Worker or Durable Object makes many SDK operations per request. This avoids hitting [subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

### Subrequest limits

Cloudflare Workers have subrequest limits that apply when making requests to external services, including container API calls:

* **Workers Free**: 50 subrequests per request
* **Workers Paid**: 1,000 subrequests per request

With HTTP transport (default), each SDK operation (`exec()`, `readFile()`, `writeFile()`, etc.) consumes one subrequest. Applications that perform many sandbox operations in a single request can hit these limits.

### How WebSocket transport helps

WebSocket transport establishes a single persistent connection to the container and multiplexes all SDK operations over it. The WebSocket upgrade counts as **one subrequest** regardless of how many operations you perform afterwards.

**Example with HTTP transport (4 subrequests):**

TypeScript

```

await sandbox.exec("python setup.py");

await sandbox.writeFile("/app/config.json", config);

await sandbox.exec("python process.py");

const result = await sandbox.readFile("/app/output.txt");


```

**Same code with WebSocket transport (1 subrequest):**

TypeScript

```

// Identical code - transport is configured via environment variable

await sandbox.exec("python setup.py");

await sandbox.writeFile("/app/config.json", config);

await sandbox.exec("python process.py");

const result = await sandbox.readFile("/app/output.txt");


```

## Configuration

Set the `SANDBOX_TRANSPORT` environment variable in your Worker's configuration. The SDK reads this from the Worker environment bindings (not from inside the container).

### HTTP transport (default)

HTTP transport is the default and requires no additional configuration.

### WebSocket transport

Enable WebSocket transport by adding `SANDBOX_TRANSPORT` to your Worker's `vars`:

* [  wrangler.jsonc ](#tab-panel-7583)
* [  wrangler.toml ](#tab-panel-7584)

JSONC

```

{

  "name": "my-sandbox-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-29",

  "vars": {

    "SANDBOX_TRANSPORT": "websocket"

  },

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Sandbox",

        "name": "Sandbox",

      },

    ],

  },

}


```

Explain Code

TOML

```

name = "my-sandbox-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-29"


[vars]

SANDBOX_TRANSPORT = "websocket"


[[containers]]

class_name = "Sandbox"

image = "./Dockerfile"


[[durable_objects.bindings]]

class_name = "Sandbox"

name = "Sandbox"


```

Explain Code

No application code changes are needed. The SDK automatically uses the configured transport for all operations.

## Transport behavior

### Connection lifecycle

**HTTP transport:**

* Creates a new HTTP request for each SDK operation
* No persistent connection
* Each request is independent and stateless

**WebSocket transport:**

* Establishes a WebSocket connection on the first SDK operation
* Maintains the persistent connection for all subsequent operations
* Connection is closed when the sandbox sleeps or is evicted
* Automatically reconnects if the connection drops

### Streaming support

Both transports support streaming operations (like `exec()` with real-time output):

* **HTTP transport** \- Uses Server-Sent Events (SSE)
* **WebSocket transport** \- Uses WebSocket streaming messages

Your code remains identical regardless of transport mode.

### Error handling

Both transports provide identical error handling behavior. The SDK automatically retries on transient errors (like 503 responses) with exponential backoff.

WebSocket-specific behavior:

* Connection failures trigger automatic reconnection
* The SDK transparently handles WebSocket disconnections
* In-flight operations are not lost during reconnection

## Choosing a transport

| Scenario                                    | Recommended transport |
| ------------------------------------------- | --------------------- |
| Many SDK operations per request             | WebSocket             |
| Running inside Workers or Durable Objects   | WebSocket             |
| Approaching subrequest limits               | WebSocket             |
| Simple, infrequent sandbox usage            | HTTP (default)        |
| Debugging or inspecting individual requests | HTTP (default)        |

Default is sufficient for most use cases

HTTP transport works well for most applications. Only switch to WebSocket transport if you are hitting subrequest limits or performing many rapid sandbox operations per request.

## Migration guide

Switching between transports requires no code changes.

### Switch from HTTP to WebSocket

Add `SANDBOX_TRANSPORT` to your `wrangler.jsonc`:

* [  wrangler.jsonc ](#tab-panel-7579)
* [  wrangler.toml ](#tab-panel-7580)

JSONC

```

{

  "vars": {

    "SANDBOX_TRANSPORT": "websocket"

  },

}


```

TOML

```

[vars]

SANDBOX_TRANSPORT = "websocket"


```

Then deploy:

Terminal window

```

npx wrangler deploy


```

### Switch from WebSocket to HTTP

Remove the `SANDBOX_TRANSPORT` variable (or set it to `"http"`):

* [  wrangler.jsonc ](#tab-panel-7581)
* [  wrangler.toml ](#tab-panel-7582)

JSONC

```

{

  "vars": {

    // Remove SANDBOX_TRANSPORT or set to "http"

  },

}


```

TOML

```

vars = { }


```

## Related resources

* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Complete Worker configuration
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Passing configuration to sandboxes
* [Workers subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests) \- Understanding subrequest limits
* [Architecture](https://developers.cloudflare.com/sandbox/concepts/architecture/) \- How Sandbox SDK components communicate

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/configuration/transport/","name":"Transport modes"}}]}
```
