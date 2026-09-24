---
description: Understand what Cloudflare Tunnel is, how it connects private resources to Cloudflare, how routes work, and how to get started.
title: Tunnel fundamentals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Tunnel fundamentals

Last updated Sep 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/tunnel/concepts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A Cloudflare Tunnel is a secure link between Cloudflare's network and your infrastructure, with a stable identity in your Cloudflare account.

Tunnel connections begin inside your network and remain open to Cloudflare, so the resources behind them do not need public IP addresses or open inbound ports. Traffic can reach those resources through the tunnel instead of connecting to them directly over the Internet.

## The connection starts with `cloudflared`

*Connect out to Cloudflare while keeping your resources private.*

`cloudflared` is the daemon that establishes and maintains a tunnel's connections to Cloudflare. It initiates those connections from inside your network, allowing requests and responses to travel in both directions without requiring your origin to expose a public address.

This is the central idea behind Tunnel: Cloudflare does not connect to a public address on your server. `cloudflared` connects to Cloudflare first, and Cloudflare uses those existing connections to reach resources in your network.

Enable tunnelSend request

Your network

cloudflared

Cloudflare

The private network has no inbound connections.

For more information, refer to [Configuration](https://developers.cloudflare.com/tunnel/configuration/).

## Tunnel identity and connectors

*Keep the tunnel you configure separate from the software that runs it.*

When you create a tunnel, Cloudflare gives it a unique ID, like the `#123` in the figure below. Routes and other Cloudflare services use this ID to identify the tunnel.

Each running instance of `cloudflared` is called a connector, and it maintains several network connections to Cloudflare. A tunnel can scale beyond a single connector without changing its routes because every connector shares the same tunnel ID. Each additional connector is called a replica and usually runs on a separate host. If one connector becomes unavailable, Cloudflare can send new traffic through another.

Both connectors live

Stop connector B

Your network

Tunnel #123

Connector A

Connector B

Requests alternate between connector A and connector B under one tunnel identity.

For more information, refer to [Replicas and high availability](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) and [Load balancing](https://developers.cloudflare.com/tunnel/concepts/routing/#load-balancing).

## Quick tunnels

*Reach a local service without an account or configuration.*

The tunnels above are persistent: each has a stable ID and stays in your account until you delete it. A quick tunnel skips that identity. It runs from a single command:

```sh
cloudflared tunnel --url http://localhost:8080
```

Cloudflare assigns a random `trycloudflare.com` address that routes back through the tunnel to your service.

The connection still starts from inside your network, so your machine stays private. What changes is permanence: a quick tunnel exists only while `cloudflared` runs, and its address is different each time. This makes quick tunnels useful for temporary work, such as sharing a development preview or receiving a webhook, and unsuited to production traffic or routes you intend to keep.

Named · live

Quick tunnelStop cloudflared

Cloudflare

your account

Tunnel #123app.example.com

Your network

cloudflared

Tunnel #123 is a record in your account, bound to app.example.com. cloudflared holds the connection.

For more information, refer to [Quick tunnels](https://developers.cloudflare.com/tunnel/get-started/#quick-tunnels-development).

## How traffic reaches a resource

*Connect traffic to resources through the tunnel.*

A connected tunnel does not make a resource reachable on its own. Routing configuration determines which traffic uses the tunnel and which resource that traffic should reach.

- **Published applications** connect public hostnames (for example, `app.example.com`) to services behind the tunnel.
- **Private network routes** direct traffic for private hostnames, IP addresses, or network ranges through the tunnel.
- **Workers VPC** lets Workers reach private services through the tunnel.

One tunnel can carry traffic for multiple resources, even when those resources use different types of routing. When traffic matches the routing configuration, Cloudflare sends it over an available tunnel connection. `cloudflared` receives the traffic and forwards it to a resource it can reach in your network.

The tunnel provides connectivity. Access to each resource is controlled separately.

Enable tunnelConnect hostnameSend request

Cloudflare

Your network

User

cloudflared

Web service

No route or tunnel exists yet.

For more information, refer to [Routing](https://developers.cloudflare.com/tunnel/concepts/routing/), [Private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/), and [Workers VPC](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/).

## Start building

When you are ready to build, choose how you want to use the tunnel.

### [Publish an application](https://developers.cloudflare.com/tunnel/get-started/)

Connect a public hostname to a service in your network.

### [Connect a private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/)

Route traffic from enrolled devices to private resources.

### [Connect Workers VPC](https://developers.cloudflare.com/workers-vpc/get-started/)

Let Workers call services in a private network.

### [Try a quick tunnel](https://developers.cloudflare.com/tunnel/get-started/#quick-tunnels-development)

Share a local service from a single command, without an account or configuration.

## Related resources

- [Configuration](https://developers.cloudflare.com/tunnel/configuration/): replicas, firewall rules, and connection settings.
- [Routing](https://developers.cloudflare.com/tunnel/concepts/routing/): public hostnames, protocols, and load balancing.
- [Observability](https://developers.cloudflare.com/tunnel/observability/): tunnel status, logs, metrics, and notifications.
- [Troubleshooting](https://developers.cloudflare.com/tunnel/troubleshooting/): failures across the request path.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/tunnel/concepts/#page","headline":"Tunnel fundamentals","description":"Understand what Cloudflare Tunnel is, how it connects private resources to Cloudflare, how routes work, and how to get started.","url":"https://developers.cloudflare.com/tunnel/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
