---
description: Configure how Sandbox SDK communicates between Durable Objects and containers.
title: Transport modes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

#  Transport modes

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/sandbox/configuration/transport/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Configure how the Sandbox SDK communicates with containers using transport modes.

## Overview

The Sandbox SDK supports three transport modes for communication between the Durable Object and the container:

* **HTTP transport** (default) - Each SDK operation makes a separate HTTP request to the container.
* **NEW: RPC transport** \- All SDK operations are multiplexed over a single persistent WebSocket connection. Will replace HTTP as the default transport in future. Available since 0.9.1.
* **Deprecated: WebSocket transport** \- All SDK operations are multiplexed over a single persistent WebSocket. Superseded by RPC transport which uses an improved protocol.

## When to use RPC transport

Use the RPC transport when your Worker or Durable Object makes many SDK operations per request. This avoids hitting [subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

### Subrequest limits

Cloudflare Workers have subrequest limits that apply when making requests to external services, including container API calls:

* **Workers Free**: 50 subrequests per request
* **Workers Paid**: 1,000 subrequests per request

With HTTP transport (default), each SDK operation (`exec()`, `readFile()`, `writeFile()`, etc.) consumes one subrequest. Applications that perform many sandbox operations in a single request can hit these limits.

### How RPC transport helps

RPC transport establishes a single persistent connection to the container and multiplexes all SDK operations over it. The WebSocket upgrade counts as **one subrequest** regardless of how many operations you perform afterwards.

**Example with HTTP transport (4 subrequests):**

```typescript
await sandbox.exec("python setup.py");
await sandbox.writeFile("/app/config.json", config);
await sandbox.exec("python process.py");
const result = await sandbox.readFile("/app/output.txt");
```

**Same code with RPC transport (1 subrequest):**

```typescript
// Identical code - transport is configured via environment variable
await sandbox.exec("python setup.py");
await sandbox.writeFile("/app/config.json", config);
await sandbox.exec("python process.py");
const result = await sandbox.readFile("/app/output.txt");
```

RPC transport also removes the [32 MiB limitation](https://developers.cloudflare.com/workers/runtime-apis/rpc/#limitations) that the HTTP transport has. Pass a `ReadableStream` instance to the `writeFile()` method.

```js
const req = await fetch("https://example.com/archive.tar.gz");
await sandbox.writeFile("/archive.tar.gz", req.body);
```

## Configuration

Set the `SANDBOX_TRANSPORT` environment variable in your Worker's configuration. The SDK reads this from the Worker environment bindings (not from inside the container).

### HTTP transport (default)

HTTP transport is the default and requires no additional configuration.

### RPC transport

Enable RPC transport by adding `SANDBOX_TRANSPORT` to your Worker's `vars`:

```jsonc
{
	"name": "my-sandbox-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-07-21",
	"vars": {
		"SANDBOX_TRANSPORT": "rpc"
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

```toml
name = "my-sandbox-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-21"

[vars]
SANDBOX_TRANSPORT = "rpc"

[[containers]]
class_name = "Sandbox"
image = "./Dockerfile"

[[durable_objects.bindings]]
class_name = "Sandbox"
name = "Sandbox"
```

No application code changes are needed. The SDK automatically uses the configured transport for all operations.

## Transport behavior

### Connection lifecycle

**HTTP transport:**

* Creates a new HTTP request for each SDK operation
* No persistent connection
* Each request is independent and stateless

**RPC transport:**

* Establishes a WebSocket connection on the first SDK operation
* Maintains the persistent connection for all subsequent operations
* Connection is closed when the sandbox sleeps or is evicted
* Automatically reconnects if the connection drops

### Streaming support

All transports support streaming operations (like `exec()` with real-time output):

* **HTTP transport** \- Uses Server-Sent Events (SSE)
* **RPC transport** \- Uses WebSocket streaming messages

Your code remains identical regardless of transport mode.

### Error handling

All transports provide identical error handling behavior. The SDK automatically retries on transient errors (like 503 responses) with exponential backoff.

WebSocket-specific behavior:

* Connection failures trigger automatic reconnection
* The SDK transparently handles WebSocket disconnections
* In-flight operations are not lost during reconnection

## Choosing a transport

We expect the RPC transport to replace the default HTTP transport in a future release. New functionality may support only the RPC transport. Switching to use it now will avoid migrations in the future.

## Migration guide

Switching between transports requires no code changes.

### Switch from HTTP to RPC

Requires staged deployment

Using the `rpc` transport requires version 0.9.1 or newer. If you are using an older version of the Sandbox SDK upgrade and deploy your application with the newer `@cloudflare/sandbox` and image first. Otherwise there will be issues with newer SDK clients attempting to connect to older sandboxes that do not support the new transport.

Add `SANDBOX_TRANSPORT` to your `wrangler.jsonc`:

```jsonc
{
	"vars": {
		"SANDBOX_TRANSPORT": "rpc"
	},
}
```

```toml
[vars]
SANDBOX_TRANSPORT = "rpc"
```

Then deploy:

```bash
npx wrangler deploy
```

### Switch from RPC to HTTP

Remove the `SANDBOX_TRANSPORT` variable (or set it to `"http"`):

```jsonc
{
	"vars": {
		// Remove SANDBOX_TRANSPORT or set to "http"
	},
}
```

```toml
vars = { }
```

### Switch from deprecated WebSocket to RPC

Requires staged deployment

Using the `rpc` transport requires version 0.9.1 or newer. If you are using an older version of the Sandbox SDK upgrade and deploy your application with the newer `@cloudflare/sandbox` and image first. Otherwise there will be issues with newer SDK clients attempting to connect to older sandboxes that do not support the new transport.

Set the `SANDBOX_TRANSPORT` variable to `"rpc"`:

```jsonc
{
	"vars": {
		"SANDBOX_TRANSPORT": "rpc"
	},
}
```

```toml
[vars]
SANDBOX_TRANSPORT = "rpc"
```

## Related resources

* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Complete Worker configuration
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Passing configuration to sandboxes
* [Workers subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests) \- Understanding subrequest limits
* [Architecture](https://developers.cloudflare.com/sandbox/concepts/architecture/) \- How Sandbox SDK components communicate

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/configuration/transport/#page","headline":"Transport modes · Cloudflare Sandbox SDK docs","description":"Configure how Sandbox SDK communicates between Durable Objects and containers.","url":"https://developers.cloudflare.com/sandbox/configuration/transport/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
