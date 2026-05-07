---
title: Cloudflare WAN
description: Connect and secure your network locations with Cloudflare WAN.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare WAN

Connect and secure your entire corporate network through Cloudflare, replacing MPLS circuits and hub-and-spoke routing with cloud-native networking.

 Enterprise-only 

Cloudflare WAN (formerly Magic WAN) connects your data centers, offices, and cloud resources through Cloudflare's global network. Instead of backhauling traffic through a central data center or maintaining dedicated MPLS circuits at every site, your traffic routes through the nearest Cloudflare data center where security policies apply inline.

Cloudflare WAN provides secure, performant [routing ↗](https://www.cloudflare.com/learning/network-layer/what-is-routing/) for your entire corporate network. [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) integrates with Cloudflare WAN, enabling you to enforce network firewall policies at Cloudflare's global network, across traffic from any entity within your network.

You connect your sites to Cloudflare through on-ramps — tunnels or direct connections from your network to Cloudflare. Cloudflare WAN supports any device that uses anycast GRE or IPsec tunnels. To make it easier to onboard your cloud resources, you can use [Multi-Cloud Networking](https://developers.cloudflare.com/cloudflare-wan/configuration/multi-cloud-networking/), which automates creating on-ramps from your cloud networks. Refer to [On-ramps](https://developers.cloudflare.com/cloudflare-wan/on-ramps/) for a full list of supported on-ramps.

Refer to [WAN transformation](https://developers.cloudflare.com/cloudflare-wan/wan-transformation/) to compare approaches and plan your migration, or go straight to [get started](https://developers.cloudflare.com/cloudflare-wan/get-started/).

## Cloudflare WAN and Cloudflare One

Cloudflare WAN is a standalone WAN-as-a-Service (WANaaS) product. It provides site-to-site connectivity over Cloudflare's global network, with packet-level security through [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/). Cloudflare WAN supports IPsec tunnels, GRE tunnels, [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/), and the [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/) for connecting your sites.

[Cloudflare One](https://developers.cloudflare.com/cloudflare-one/) is the full SASE (Secure Access Service Edge) platform. It extends Cloudflare WAN with identity-aware security services:

* **[Cloudflare One Client (WARP)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)** — deploys on user devices to route traffic through Cloudflare with identity context.
* **[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)** — creates outbound-only connections from your infrastructure to Cloudflare, with no inbound ports required.
* **[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)** — applies secure web gateway (SWG) policies to filter and inspect Internet-bound traffic.
* **[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/)** — enforces Zero Trust Network Access (ZTNA) policies based on user identity, device posture, and context.

If your requirements are limited to site-to-site connectivity and network-layer security, Cloudflare WAN provides what you need. When you need user-level security policies, identity-based access controls, or secure Internet egress, you can add Cloudflare One capabilities to your existing deployment.

Cloudflare One builds on the same network infrastructure as Cloudflare WAN, so there is no migration required.

For more information about Cloudflare One, refer to the [Cloudflare One documentation](https://developers.cloudflare.com/cloudflare-one/).

---

## Features

###  Connect your network automatically 

Use Cloudflare One Appliance to automatically connect and steer any IP traffic.

[ Use Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/) 

###  Connect your network manually 

Set up Cloudflare WAN with your existing routers and firewalls. If you do not have Cloudflare One Appliance, start here to configure IPsec or GRE tunnels from a third-party device.

[ Use a third-party device ](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/) 

###  Automatic cloud on-ramps 

 Automate resource discovery, and reduce management burden when connecting to your public cloud. 

[ Automate your cloud on-ramps ](https://developers.cloudflare.com/cloudflare-wan/configuration/multi-cloud-networking/) 

###  Zero Trust integration 

Learn how you can use Cloudflare WAN with other Cloudflare Zero Trust products.

[ Integrate with other Zero Trust products ](https://developers.cloudflare.com/cloudflare-wan/zero-trust/) 

###  BGP peering (beta) 

Use Border Gateway Protocol (BGP) peering between your networks and Cloudflare to automatically announce and withdraw routes as your network changes, rather than managing static routes manually.

[ Use BGP peering (beta) ](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes) 

###  WAN transformation 

Replace MPLS circuits and hub-and-spoke routing with cloud-native networking. Compare WAN approaches and plan an incremental migration.

[ Plan your migration ](https://developers.cloudflare.com/cloudflare-wan/wan-transformation/) 

###  Virtual networks 

 Understand how virtual networks provide routing isolation within your Cloudflare account, keeping traffic separated between environments, partners, or applications. 

[ Learn about virtual networks ](https://developers.cloudflare.com/cloudflare-wan/reference/virtual-networks/) 

---

## Related products

**[Cloudflare One](https://developers.cloudflare.com/cloudflare-one/)**  Cloudflare One is the full SASE platform. It extends Cloudflare WAN with identity-based access controls, secure web gateway policies, and user-level security for remote and hybrid workers. 

**[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)** 

Cloudflare Network Firewall is a firewall-as-a-service (FWaaS) that filters traffic at layers 3 and 4 across Cloudflare's global network. Included with Cloudflare WAN.

**[Multi-Cloud Networking](https://developers.cloudflare.com/multi-cloud-networking/)**  Simplify and automate cloud resource discovery, and reduce your management burden when connecting to your public cloud. 

**[Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)** 

Cloudflare Network Interconnect (CNI) provides a private, dedicated connection between your network and Cloudflare instead of routing over the public Internet. Use CNI when you need lower latency or more consistent performance than tunnel-based connectivity.

**[Load Balancing](https://developers.cloudflare.com/load-balancing/)** 

Cloudflare Load Balancing distributes traffic across your endpoints, which reduces endpoint strain and latency and improves the experience for end users.

---

## More resources

[Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/sase/) 

Explore the architecture of Cloudflare One as a SASE platform, including how Cloudflare WAN handles connectivity, routing, and security.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}}]}
```
