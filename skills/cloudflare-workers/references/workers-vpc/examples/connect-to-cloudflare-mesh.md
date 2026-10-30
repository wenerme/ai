---
description: Use a VPC Network binding with Cloudflare Mesh to reach private services from a Worker.
title: Connect Workers to Cloudflare Mesh
image: https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/og.png?v=651794f3c139db4b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect Workers to Cloudflare Mesh

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses a VPC Network binding with [Cloudflare Mesh](https://developers.cloudflare.com/mesh/) (formerly WARP Connector) to connect through your account's default [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/). It does not require pre-registering individual hosts or specifying a Cloudflare Tunnel UUID.

The `cf1:network` selector uses your account's default virtual network. Your Worker can reach destinations routed through that network, including Mesh nodes, client devices, subnet or hostname routes announced through Cloudflare Tunnel or Cloudflare Mesh, and destinations connected through a [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) on-ramp (GRE, IPsec, or CNI). To select another configured virtual network, refer to [VPC Networks configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/).

## Prerequisites

- A [Cloudflare Mesh](https://developers.cloudflare.com/mesh/) node connected to your private network
- Private services running behind your Mesh node (for example, an internal API, database, or web application)

## 1. Configure your Worker

Bind your Worker to Cloudflare Mesh using `network_id: "cf1:network"` in your Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "mesh-gateway",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-10-30",
	"vpc_networks": [
		{
			"binding": "MESH",
			"network_id": "cf1:network",
			"remote": true
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "mesh-gateway"
main = "src/index.js"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-10-30"

[[vpc_networks]]
binding = "MESH"
network_id = "cf1:network"
remote = true
```

This binding can reach services routed through your account's default virtual network, including services behind Cloudflare Tunnel, Mesh nodes, and Cloudflare WAN on-ramps.

## 2. Implement the Worker

Use the VPC Network binding to access services by private IP address. Cloudflare Mesh currently supports IP-based routing only.

*index.jsjs*

```js
// You can target a Mesh node directly by its Mesh IP or any private IP
// on a subnet route behind the node
const SERVICE_IP = "10.0.1.50";
const SERVICE_PORT = 8080;

export default {
	async fetch(request, env, ctx) {
		try {
			const response = await env.MESH.fetch(
				`http://${SERVICE_IP}:${SERVICE_PORT}/api/data`,
			);
			return response;
		} catch (error) {
			// fetch() throws if the VPC Network cannot connect to the target
			return new Response("Service unavailable", { status: 503 });
		}
	},
};
```

Unlike [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/), the URL you pass to `fetch()` or the address you pass to `connect()` determines the actual destination. You can reach any IP and port accessible through your Mesh network without creating separate bindings for each service.

### TCP connections

You can also use `connect()` to open raw TCP sockets to non-HTTP services through the same binding:

*index.jsjs*

```js
// You can target a Mesh node directly by its Mesh IP or any private IP
// on a subnet route behind the node
const REDIS_IP = "10.0.1.50";
const REDIS_PORT = 6379;

export default {
	async fetch(request, env, ctx) {
		try {
			const socket = await env.MESH.connect(`${REDIS_IP}:${REDIS_PORT}`);

			const writer = socket.writable.getWriter();
			await writer.write(new TextEncoder().encode("PING\r\n"));
			await writer.close();

			return new Response(socket.readable);
		} catch (error) {
			// connect() throws if the VPC Network cannot connect to the target
			return new Response("Service unavailable", { status: 503 });
		}
	},
};
```

## 3. Deploy and test

Deploy your Worker and verify it can reach your private services:

```bash
npx wrangler deploy
```

```bash
# Test accessing the internal user API
curl https://mesh-gateway.workers.dev/api/users

# Test accessing metrics by private IP
curl https://mesh-gateway.workers.dev/api/metrics
```

## Next steps

- Learn more about [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/) configuration options
- Refer to the [Workers Binding API](https://developers.cloudflare.com/workers-vpc/api/) reference
- [Set up Cloudflare Mesh](https://developers.cloudflare.com/mesh/get-started/) for your account
- Explore [other examples](https://developers.cloudflare.com/workers-vpc/examples/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/#page","headline":"Connect Workers to Cloudflare Mesh","description":"Use a VPC Network binding with Cloudflare Mesh to reach private services from a Worker.","url":"https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/","inLanguage":"en","image":"https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/og.png?v=651794f3c139db4b","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
