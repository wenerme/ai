---
description: Map Cloudflare products to OSI model layers, from Layer 7 application services to Layer 1 physical connections.
title: Network Layers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

#  Network Layers

Last updated Apr 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/fundamentals/reference/network-layers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/network-layers/#page","headline":"Network Layers · Cloudflare Fundamentals docs","description":"Map Cloudflare products to OSI model layers, from Layer 7 application services to Layer 1 physical connections.","url":"https://developers.cloudflare.com/fundamentals/reference/network-layers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
