---
description: How Virtual networks works in Zero Trust networking.
title: Virtual networks
image: https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/og.png?v=6b1a554b6918a01a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Virtual networks

Last updated Nov 4, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A virtual network is a private routing domain within your Cloudflare account. It defines which private resources are reachable from the Cloudflare network and keeps traffic separated between different environments, partners, or applications.

Every Cloudflare account has a default virtual network. You can create additional virtual networks to isolate routing between different parts of your infrastructure.

Note

Cloudflare Tunnel and the Cloudflare One Client support multiple virtual networks, and you can assign [Cloudflare Mesh CIDR routes](https://developers.cloudflare.com/mesh/features/routes/) to any virtual network. Cloudflare WAN connections (IPsec, GRE, CNI) currently use only the default virtual network.

## When to use virtual networks

- **Environment separation** — Keep production and staging networks isolated. Traffic destined for `10.0.0.1` in production routes to a different destination than `10.0.0.1` in staging.
- **Partner isolation** — Connect multiple partners to your Cloudflare account without allowing them to reach each other. Each partner gets its own virtual network.
- **Overlapping IP space** — When different networks use the same IP ranges (common with RFC 1918 addresses), virtual networks let you route to the correct destination based on context, not just IP address.
- **Private application connectivity** — Connect Cloudflare Workers or CDN to backends in your private network. The virtual network tells Cloudflare where to route traffic for private IP addresses.
- **Public TCP/UDP to private origins** — Expose a private backend to the Internet for TCP or UDP traffic through a [Spectrum application](https://developers.cloudflare.com/spectrum/get-started/#create-a-spectrum-application-using-a-virtual-network-origin), without requiring a Load Balancer. The virtual network determines which tunnel or WAN connection carries the traffic to your origin.

## How virtual networks work

When traffic enters Cloudflare destined for a private IP address, Cloudflare looks up the route in the virtual network routing table. The virtual network determines:

- Which private destinations are reachable.
- Which connector (tunnel, Mesh node, or WAN connection) carries the traffic.
- How overlapping IP addresses are disambiguated.

Your Cloudflare account

- default
  - `10.0.0.0/8`TunnelLegacy DC
  - `192.168.1.0/24`IPsecBranch office
- production
  - `10.0.0.0/8`TunnelProduction DC
  - `172.16.0.0/16`MeshProduction VPC
- staging
  - `10.0.0.0/8`TunnelStaging DC

The same CIDR (`10.0.0.0/8`) can exist in each virtual network because they are isolated routing domains.

Each virtual network maintains its own routing table. Routes added to one virtual network do not appear in another virtual network routing table. However, if traffic does not match a route in the selected virtual network, Cloudflare may fall back to the default virtual network routing table for WAN routes.

You can add entries to a virtual network routing table through static route configuration or routes learned from BGP peering. Static routes are available for all connection types. BGP peering is available over IPsec/GRE tunnels and CNI (closed beta). For more information on how routes are prioritized within a virtual network, refer to [Traffic steering](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/).

## Virtual networks across Cloudflare

Virtual network support varies by product:

| Product | Virtual network support | Details |
| --- | --- | --- |
| Cloudflare Tunnel | Multiple virtual networks | Assign CIDR routes to a virtual network when configuring your tunnel |
| Cloudflare One Client | Multiple virtual networks | Users land in a virtual network based on policy or client selection |
| Cloudflare Mesh | Multiple virtual networks | Assign CIDR routes to a virtual network when [adding a route](https://developers.cloudflare.com/mesh/features/routes/) |
| Cloudflare WAN | Default only | All IPsec, GRE, and CNI connections use the default virtual network |

## The default virtual network

Every account has a `default` virtual network. If you do not specify a virtual network when creating routes or connections, they are assigned to the default.

For most deployments with a single private network, the default virtual network is all you need. Create additional virtual networks only when you need routing isolation.

Note

Cloudflare WAN connections (IPsec, GRE, CNI) always use the default virtual network.

## For network engineers

If you are familiar with enterprise networking concepts, a virtual network is analogous to a VRF (Virtual Routing and Forwarding):

- Each virtual network maintains its own routing table.
- Routes are isolated between virtual networks.
- The same IP prefix can exist in multiple virtual networks without conflict.
- BGP routes learned on a connection populate only that connection virtual network routing table. BGP peering is supported for IPsec/GRE tunnels and CNI (closed beta).

If you are familiar with cloud networking concepts, a virtual network is analogous to a VPC (Virtual Private Cloud).

## Create and manage virtual networks

To create and configure virtual networks, refer to [Virtual networks (Tunnel configuration)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/).

To configure which routes belong to which virtual network, refer to [Add routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/).

To add static routes or configure BGP peering within the Cloudflare Virtual Network routing table, refer to [Configure routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-routes/).

## Related resources

- [Private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) — Connect your infrastructure to Cloudflare
- [Routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/) — Define IP and hostname routes through your connectors
- [Traffic steering](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/) — Route prioritization, ECMP, and BGP within the Cloudflare Virtual Network

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/#page","headline":"Virtual networks","description":"How Virtual networks works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/og.png?v=6b1a554b6918a01a","dateModified":"2026-11-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
