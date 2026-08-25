---
description: API reference for VPC Service and VPC Network bindings in Workers.
title: Workers Binding API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers Binding API

Last updated Jun 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-vpc/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

VPC bindings provide APIs for accessing private services from your Worker. Both [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) and [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/) expose a `fetch()` method for HTTP traffic. VPC Networks also expose a `connect()` method for raw TCP connections. The difference between binding types is in routing scope, not in API surface.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

## Binding types

### VPC Service

A VPC Service binding routes requests to a specific pre-registered host and port. The [VPC Service configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) always determines the connection target, even if a different URL or host is present in the `fetch()` call.

* The **host** provided in `fetch()` does not control routing. It only populates the `Host` header and, when using `https`, the Server Name Indication (SNI) value.
* The **port** provided in `fetch()` is ignored — the port specified in the VPC Service configuration is always used.

### VPC Network

A VPC Network binding grants access to any service reachable through the bound Cloudflare Tunnel or through Cloudflare Mesh — including subnet and hostname routes announced through Cloudflare Tunnel or Mesh, and destinations connected through Cloudflare WAN on-ramps (GRE, IPsec, or CNI). The URL passed to `fetch()` or the address passed to `connect()` determines the actual destination — hostname or IP address and port.

## fetch()

Makes an HTTP request to the private service through the bound Cloudflare Tunnel or Cloudflare Mesh. Available on both VPC Service and VPC Network bindings.

```js
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

```js
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

#### POST request with body

```js
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

#### Request with HTTPS and IP address

```js
export default {
	async fetch(request, env) {
		const privateRequest = new Request("https://10.0.1.50/api/data");
		const response = await env.MY_BINDING.fetch(privateRequest);

		return response;
	},
};
```

## connect()

Opens a raw TCP connection to a private destination through the bound Cloudflare Tunnel or Cloudflare Mesh. Available on VPC Network bindings only.

```js
const socket = await env.MY_BINDING.connect(address);
```

### Parameters

* `address` (string | SocketAddress) — The destination to connect to. Pass a string in `"host:port"` format (for example, `"10.0.1.50:6379"`) or a [SocketAddress](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socketaddress/) object with `hostname` and `port`.

### Return value

Returns a `Promise<Socket>` that resolves to a [Socket](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socket/) with `readable` and `writable` streams. If `connect()` cannot establish the connection, it throws an exception.

Note

`connect()` over VPC Networks currently supports plaintext TCP only.

### Examples

#### Connect to a private Redis instance

```js
export default {
	async fetch(request, env) {
		const socket = await env.MY_BINDING.connect("10.0.1.50:6379");

		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("PING\r\n"));
		await writer.close();

		return new Response(socket.readable);
	},
};
```

#### Connect using a SocketAddress object

```js
export default {
	async fetch(request, env) {
		const socket = await env.MY_BINDING.connect({
			hostname: "10.0.1.50",
			port: 6379,
		});

		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("PING\r\n"));
		await writer.close();

		return new Response(socket.readable);
	},
};
```

## Required roles

To bind a VPC Service or VPC Network in a Worker, your user needs `Connectivity Directory Bind` (or `Connectivity Directory Admin`). Binding directly to a Cloudflare Tunnel through a VPC Network binding requires `Connectivity Directory Admin`. For role definitions, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

## Next steps

* Configure [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/)
* Configure [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/)
* Refer to [usage examples](https://developers.cloudflare.com/workers-vpc/examples/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-vpc/api/#page","headline":"Workers Binding API · Cloudflare Workers VPC","description":"API reference for VPC Service and VPC Network bindings in Workers.","url":"https://developers.cloudflare.com/workers-vpc/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
