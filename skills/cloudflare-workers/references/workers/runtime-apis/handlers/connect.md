---
description: Handle inbound TCP connections forwarded to a Worker using the connect() handler.
title: Connect Handler
image: https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/og.png?v=abda5a093025e70d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect Handler

Last updated Oct 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

Export a `connect()` handler to let a Worker accept an inbound TCP connection and read and write raw bytes on it. The handler receives a [`Socket`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socket) object, the same type returned by [`connect()` from `cloudflare:sockets`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) for outbound connections.

A Worker receives a connection in its `connect()` handler when another Worker forwards a TCP connection to it over a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/), by calling `connect()` on the binding:

```js
// Worker A forwards a TCP connection to Worker B over a service binding
export default {
	async fetch(request, env) {
		const socket = env.BACKEND.connect("example.com:1234");
		// Read from and write to socket.readable / socket.writable
		return new Response(socket.readable);
	},
};
```

Note

Direct inbound TCP connections from the public Internet, for example by using the HTTP `CONNECT` method against a Worker's public URL, are not supported at present. A `connect()` handler only receives connections forwarded from another Worker over a service binding.

## Syntax

```js
export default {
	async connect(socket, env, ctx) {
		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("hello"));
		await writer.close();
	},
};
```

```ts
interface Env {}

export default {
	async connect(socket: Socket, env: Env, ctx: ExecutionContext) {
		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("hello"));
		await writer.close();
	},
} satisfies ExportedHandler<Env>;
```

You can also implement `connect()` as a method on a [`WorkerEntrypoint`](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/) class, which lets a single Worker expose a `connect()` handler alongside other RPC methods:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Backend extends WorkerEntrypoint {
	async connect(socket) {
		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("hello"));
		await writer.close();
	}
}
```

### Parameters

- `socket` Socket
  - The inbound [`Socket`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socket) used to read and write raw bytes on the connection.
  - [`socket.opened`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socket) resolves with a [`SocketInfo`](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socketinfo) object. On a `connect()` handler, `localAddress` is set to the address the caller passed to `connect()` on the service binding.
- `env` object
  - The [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) available to the Worker.
- `ctx` object
  - The context associated with the Worker, containing [`waitUntil()`](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) and [`passThroughOnException()`](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception).

A Worker that does not export a `connect()` handler rejects any connection forwarded to it.

## Related resources

- [TCP sockets](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) — Create outbound TCP connections and work with the `Socket` API.
- [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) — Call one Worker from another, including forwarding TCP connections with `connect()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/#page","headline":"Connect Handler","description":"Handle inbound TCP connections forwarded to a Worker using the connect() handler.","url":"https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/og.png?v=abda5a093025e70d","dateModified":"2026-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
