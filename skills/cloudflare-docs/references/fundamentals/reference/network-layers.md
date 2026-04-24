---
title: Network Layers
description: Map Cloudflare products to OSI model layers, from Layer 7 application services to Layer 1 physical connections.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/reference/network-layers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Network Layers

Below is a list of the different layers that makes up the [open systems interconnection (OSI) model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) and the associated Cloudflare products.

Note

The list of related products is representative but not comprehensive.

| Network layer        | Protocol and related products                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7 Application layer  | **HTTP, DNS** [Authoritative DNS](https://developers.cloudflare.com/dns), [Bot Management](https://developers.cloudflare.com/bots), [CDN](https://developers.cloudflare.com/cache/), [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/), [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) (outbound only), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), [Load Balancing](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/), [Stream](https://developers.cloudflare.com/stream/), [WAF](https://developers.cloudflare.com/waf/) |
| 6 Presentation layer |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 5 Session layer      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 4 Transport layer    | **TCP/UDP** [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/), [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) (outbound only), [Load Balancing](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/), [Spectrum](https://developers.cloudflare.com/spectrum/)                                                                                                                                                                                                                                                                                                                                                       |
| 3 Network layer      | **IP, GRE, any packet/protocol** [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/), [Magic Transit](https://developers.cloudflare.com/magic-transit), [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2 Datalink layer     | **Direct connection** [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1 Physical layer     | **Direct connection** [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/network-layers/","name":"Network Layers"}}]}
```
