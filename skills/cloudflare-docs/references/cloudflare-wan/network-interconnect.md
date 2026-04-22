---
title: Network Interconnect (CNI)
description: Connect to Cloudflare WAN with Network Interconnect.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/network-interconnect.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Network Interconnect (CNI)

 Cloudflare WAN (formerly Magic WAN) typically connects to Cloudflare through IPsec or GRE tunnels over the public Internet. Cloudflare Network Interconnect (CNI) is an alternative that provides a private, dedicated link — useful when you need lower latency, more consistent throughput, or want to avoid public Internet transit entirely.

Cloudflare Network Interconnect (CNI) provides a private, dedicated connection between your network and Cloudflare — bypassing the public Internet entirely. This is useful when you need consistent latency, higher throughput, or an additional layer of security that public Internet paths cannot guarantee.

With CNI, you get the same Cloudflare network services (firewall, routing, traffic management) applied to your traffic, but over a connection that does not traverse shared Internet infrastructure.

For more information about Network Interconnect, refer to the [Cloudflare Network Interconnect documentation](https://developers.cloudflare.com/network-interconnect/).

Run `traceroute`

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/traceroute/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/network-interconnect/","name":"Network Interconnect (CNI)"}}]}
```
