---
description: How Connect with cloudflared works in Zero Trust networking.
title: Connect with cloudflared
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Connect with cloudflared

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

`cloudflared` is a daemon that runs on a host machine in your private network and proxies traffic from Cloudflare to local services. The tunnel created by `cloudflared` is outbound-only, meaning it only handles requests initiated from a user to your private network. Server-initiated requests (from applications behind the tunnel) use the server's default routing table and do not pass through the tunnel.

On the client side, end users connect to Cloudflare's global network using the Cloudflare One Client. The Cloudflare One Client can be rolled out to your entire organization in just a few minutes using your in-house MDM tooling. When users connect to an IP address or hostname made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network and down the corresponding tunnel to the internal service. Traffic to services behind the tunnel will carry the local source IP address of the host machine running the `cloudflared` daemon.

![Diagram displaying connections between a device, Cloudflare, and a private network.](https://developers.cloudflare.com/_astro/private-ips-diagram.BXgaklt9_7ovDi.webp)

To enable remote access to your private network, refer to the following guides:

* [**Connect a private hostname**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/): Route network traffic to an internal application using its hostname.
* [**Connect an IP/CIDR**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/): Route traffic to an internal IP address or CIDR range.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#page","headline":"Connect with cloudflared · Cloudflare One docs","description":"How Connect with cloudflared works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
