---
title: Cloudflare Tunnel
description: Cloudflare WAN (formerly Magic WAN) can work together with Cloudflare Tunnel to provide easy access between your networks and applications.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Tunnel

Cloudflare WAN (formerly Magic WAN) can work together with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to provide easy access between your networks and applications.

By default, [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) proxies and filters TCP, UDP, and ICMP traffic routed through IPsec/GRE tunnels and destined to routes behind Cloudflare Tunnel.

## Route evaluation and precedence

Cloudflare evaluates [private network routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) together across the Cloudflare Tunnel and Cloudflare Virtual Network routing tables. If traffic matches either a Cloudflare Tunnel route (in any virtual network) or a Cloudflare Virtual Network route, the matched route determines the next hop.

When a destination IP matches both a Cloudflare Tunnel private network route and a Cloudflare Virtual Network route, Cloudflare Tunnel takes precedence. This happens whenever a `cloudflared` tunnel Classless Inter-Domain Routing (CIDR) matches a packet, regardless of prefix length. For example, a `cloudflared` tunnel with prefix `10.1.2.0/24` takes precedence over a static route configured to `10.1.2.4/32`, and Cloudflare sends packets over the tunnel instead of a GRE tunnel.

For complex deployments where you need overlapping routes in both Cloudflare Tunnel and Cloudflare Virtual Network, consult your Solutions Engineering team for guidance.

For more information about private network routes with `cloudflared`, refer to [Connect with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/).

## Test `cloudflared` tunnel integration

To verify that a `cloudflared` tunnel works correctly with your Cloudflare WAN connection:

1. From a host behind your customer premises equipment, open a browser.
2. Browse to an IP address or hostname that is reachable through a Cloudflare Tunnel private network route, such as the example destination `10.1.2.3`.
3. Confirm that the application loads as expected. If it does, Cloudflare Tunnel is handling the traffic as configured.

Run `traceroute`

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/manually/how-to/traceroute/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/","name":"Cloudflare One integration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/","name":"Cloudflare Tunnel"}}]}
```
