---
description: Track the latest updates and changes to Cloudflare Spectrum.
title: Changelog
image: https://developers.cloudflare.com/spectrum/changelog/og.png?v=5372b6d8d4830cdf
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/spectrum.xml)

## 2026-11-19


**Redesigned Spectrum dashboard**

The Spectrum pages in the Cloudflare dashboard have been redesigned. Your existing applications and their settings do not change.

The **Spectrum Applications** page lists each application's type, edge port, origin, and edge IP type, with the last minute of connections, ingress, and egress. You can search the list and sort it by column.

Creating or editing an application now opens a full page instead of a modal, with settings grouped into **Application Configuration**, **Origin Configuration**, and **Advanced Options**. To edit an application, select its hostname, or select the three dots next to it > **Edit**.

You can now create and edit applications that use [static IPs](https://developers.cloudflare.com/spectrum/about/static-ip/) or [BYOIP](https://developers.cloudflare.com/spectrum/about/byoip/) addresses in the dashboard. Under **Edge IP Type**, select **Dedicated IPs**. Leave **Subdomain** blank to create an application on the zone apex.

New TCP and UDP applications created in the dashboard now have **IP Access Rules** turned off by default, which matches the API default. To enforce IP Access rules for an application, turn on **IP Access Rules** under **Advanced Options**. Existing applications keep their current setting.

To create your first application, refer to [Get started with Spectrum](https://developers.cloudflare.com/spectrum/get-started/).

To share feedback on the redesigned dashboard, complete [this form ↗︎](https://forms.gle/BW9RoXZpgx7B5HZC6).

## 2026-11-19


**Inbound TCP and gRPC for Workers and Containers now in public beta**

Inbound TCP connections to Workers and bidirectional gRPC in Containers are now in public beta.

Worker-origin Spectrum applications are available on Pro and Business zones, and on Enterprise zones with Spectrum Enterprise enabled. Without Spectrum Enterprise, Pro and Business zones support one Worker-origin application per zone, on one TCP port.

```
flowchart LR
    Client[TCP client] <--> Spectrum
    Spectrum <--> Worker["Worker connect()<br/>Handle or forward bytes"]
    Worker <--> DO["Durable Object<br/>connect()"]
    DO <--> Container["Container<br/>gRPC or other TCP server"]

```

#### Forward a Worker socket to a Durable Object

Spectrum sends public TCP connections to your Worker's `connect()` handler. The Worker opens a socket to the `GrpcContainer` Durable Object and pipes bytes in both directions:

*src/index.jsjs*

```js
export default {
	async connect(socket, env) {
		const container = env.GRPC_CONTAINER.getByName("grpc-demo");
		const durableObjectSocket = container.connect("grpc-container:50051", {
			allowHalfOpen: true,
			secureTransport: "off",
		});

		try {
			await durableObjectSocket.opened;
			await Promise.all([
				socket.readable.pipeTo(durableObjectSocket.writable),
				durableObjectSocket.readable.pipeTo(socket.writable),
			]);
		} finally {
			await Promise.allSettled([socket.close(), durableObjectSocket.close()]);
		}
	},
};
```

*src/index.tsts*

```ts
export default {
	async connect(socket: Socket, env: Env): Promise<void> {
		const container = env.GRPC_CONTAINER.getByName("grpc-demo");
		const durableObjectSocket = container.connect("grpc-container:50051", {
			allowHalfOpen: true,
			secureTransport: "off",
		});

		try {
			await durableObjectSocket.opened;
			await Promise.all([
				socket.readable.pipeTo(durableObjectSocket.writable),
				durableObjectSocket.readable.pipeTo(socket.writable),
			]);
		} finally {
			await Promise.allSettled([socket.close(), durableObjectSocket.close()]);
		}
	},
} satisfies ExportedHandler<Env>;
```

#### Forward the Durable Object socket to its Container

The Durable Object receives the connection in its own `connect()` handler. Once its Container is running, `getTcpPort(50051).connect()` opens a socket to the gRPC server inside it:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";

export class GrpcContainer extends DurableObject {
	async connect(socket) {
		const containerSocket = this.ctx.container
			.getTcpPort(50051)
			.connect("10.0.0.1:50051", {
				allowHalfOpen: true,
				secureTransport: "off",
			});

		try {
			await containerSocket.opened;
			await Promise.all([
				socket.readable.pipeTo(containerSocket.writable),
				containerSocket.readable.pipeTo(socket.writable),
			]);
		} finally {
			await Promise.allSettled([socket.close(), containerSocket.close()]);
		}
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";

export class GrpcContainer extends DurableObject<Env> {
	async connect(socket: Socket): Promise<void> {
		const containerSocket = this.ctx
			.container!.getTcpPort(50051)
			.connect("10.0.0.1:50051", {
				allowHalfOpen: true,
				secureTransport: "off",
			});

		try {
			await containerSocket.opened;
			await Promise.all([
				socket.readable.pipeTo(containerSocket.writable),
				containerSocket.readable.pipeTo(socket.writable),
			]);
		} finally {
			await Promise.allSettled([socket.close(), containerSocket.close()]);
		}
	}
}
```

`allowHalfOpen: true` preserves TCP half-closes. The Worker and Durable Object forward encrypted bytes; the Container terminates TLS and handles HTTP/2 and gRPC.

#### Run bidirectional gRPC in the Container

Run an existing gRPC server in any language, including services for real-time voice applications. This Node.js snippet shows the streaming handler and service registration. It sends a greeting, echoes incoming messages, and sends a final response when the client finishes:

*container/server.jsjs*

```js
const path = require("node:path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const definition = protoLoader.loadSync(
	path.resolve(__dirname, "../proto/bytes.proto"),
);
const proto = grpc.loadPackageDefinition(definition).cloudflare.grpcdemo;

function chat(call) {
	let count = 0;
	call.write({
		payload: Buffer.from("hello from the container gRPC server\n"),
	});
	call.on("data", ({ payload }) => {
		count += 1;
		call.write({
			payload: Buffer.concat([
				Buffer.from(`container echo ${count}: `),
				payload,
			]),
		});
	});
	call.on("end", () => {
		call.write({
			payload: Buffer.from("goodbye from the container gRPC server\n"),
		});
		call.end();
	});
	call.on("error", (error) => console.error("gRPC stream error", error));
}

const server = new grpc.Server();
server.addService(proto.ByteStream.service, { Chat: chat });
```

Follow the [complete gRPC example](https://developers.cloudflare.com/containers/examples/bidirectional-grpc/) for the protobuf definition, bindings, Spectrum routing, Secrets Store TLS credentials, and Container startup and readiness checks.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/spectrum/changelog/#page","headline":"Changelog","description":"Track the latest updates and changes to Cloudflare Spectrum.","url":"https://developers.cloudflare.com/spectrum/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/spectrum/changelog/og.png?v=5372b6d8d4830cdf","dateModified":"2026-11-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
