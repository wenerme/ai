---
description: Securely connect your private cloud to Cloudflare to build cross-cloud apps.
title: Cloudflare Workers VPC
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Workers VPC

Last updated Jun 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-vpc/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Securely connect your private cloud to Cloudflare to build cross-cloud apps.

Available on Free and Paid plans

Workers VPC allows you to connect your Workers to your private APIs, services, and databases in external clouds (AWS, Azure, GCP, on-premise, and others) that are not accessible from the public Internet.

**[VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/)** let you bind to a specific host and port in your private network. Connect a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to your infrastructure, register each target as a VPC Service, and use the [binding API](https://developers.cloudflare.com/workers-vpc/api/) from your Worker. VPC Services support HTTP and TCP (TCP databases through [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)).

**[VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/)** give Workers broader access — bind to an entire [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) network, or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) on-ramp (GRE, IPsec, CNI) without pre-registering individual hosts. The URL or address you pass at runtime determines the destination. VPC Networks support HTTP via `fetch()` and raw TCP via [connect()](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) for non-HTTP services like Redis, MQTT, and custom protocols. The same binding can also egress to public Internet destinations through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/), with your Zero Trust policies and logs applied.

[Worker](https://developers.cloudflare.com/workers/)

Bind via [vpc\_services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/)or[vpc\_networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/)

[Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/)

Reach private applications or networks through `cloudflared`

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)

Reach the full account through `cf1:network`

[Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)

Reach destinations through GRE, IPsec, or CNI on-ramps

[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)

Mesh and WAN traffic flows through Gateway, with policies enforced and traffic [logged](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/).

[DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)[HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)[Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)

Private services

APIs, databases, hosts in your network — reachable via any on-ramp

Public Internet

Reachable via Mesh or WAN

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

```ts
export default {
	async fetch(request, env, ctx) {
		// Access your private API through the service binding
		const response = await env.PRIVATE_API.fetch(
			"http://internal-api.company.local/data",
		);

    	// Process the response from your private network
    	const data = await response.json();

    	return new Response(JSON.stringify(data), {
    		headers: { "content-type": "application/json" },
    	});
    },

};
```

```json
	{
		"$schema": "node_modules/wrangler/config-schema.json",
		"name": "WORKER-NAME",
		"main": "src/index.ts",
		"compatibility_date": "2025-02-04",
		"vpc_services": [
			{
				"binding": "PRIVATE_API",
				"service_id": "ENTER_SERVICE_ID",
				"remote": true
			}
		]
	}
```

## Use cases

### Access private APIs from Workers applications

Deploy APIs or full-stack applications to Workers that connect to private authentication services, CMS systems, internals APIs, and more. Your Workers applications run globally with optimized access to the backend services of your private network.

### API gateway

Route requests to internal microservices in your private network based on URL paths. Centralize access control and load balancing for multiple private services on Workers.

### Internal tooling, agents, dashboards

Build employee-facing applications and MCP servers that aggregate data from multiple private services. Create unified dashboards, admin panels, and internal tools without exposing backend systems.

### Apply Zero Trust controls to Worker egress

Route public Internet traffic from your Workers through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) so existing DNS, HTTP, Network, and egress policies — and the corresponding logs — apply to programmatic compute the same way they apply to your workforce. Stop a Worker from reaching unwanted destinations without writing custom proxy logic.

## Related products

[Workers](https://developers.cloudflare.com/workers/)

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/)

Connect to PostgreSQL and MySQL databases from Workers with connection pooling and caching built-in, available to all Workers plans.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers-vpc/#page","headline":"Overview · Cloudflare Workers VPC","description":"Securely connect your private cloud to Cloudflare to build cross-cloud apps.","url":"https://developers.cloudflare.com/workers-vpc/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
