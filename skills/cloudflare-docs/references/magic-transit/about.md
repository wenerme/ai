---
title: About
description: How Magic Transit protects your network with BGP and GRE/IPsec tunnels.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/about.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# About

Magic Transit is a network security and performance solution that offers Distributed Denial of Service ([DDoS](https://developers.cloudflare.com/ddos-protection/)) protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

Magic Transit delivers its connectivity, security, and performance benefits by serving as the front door to your IP network. This means it accepts IP packets destined for your network, processes them, and then outputs them to your origin infrastructure.

The Cloudflare network uses [Border Gateway Protocol (BGP) ↗](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) to announce your company's IP address space, extending your network presence globally, and [anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) to ingest your traffic. Today, Cloudflare's anycast global network spans [hundreds of cities worldwide ↗](https://www.cloudflare.com/network/).

Once [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) hit Cloudflare's network, Cloudflare inspects traffic for attacks, filters, steers, accelerates, and sends it to your origin. Magic Transit connects to your origin infrastructure using anycast Generic Routing Encapsulation (GRE) tunnels over the Internet or, with [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect/), through physical or virtual interconnect.

You have two options for your Magic Transit implementation: ingress traffic or ingress and [egress traffic](https://developers.cloudflare.com/magic-transit/reference/egress/). With an egress implementation, you must set up policy-based routing (PBR) or ensure default routing on your end forwards traffic to Cloudflare through tunnels.

flowchart LR
accTitle: Magic Transit
accDescr: Diagram showing how Magic Transit protects traffic on the customer's network.

A(DDoS <br> attack)
B[("Cloudflare global <br> anycast network <br> (DDoS protection + <br> network firewall)")]
C[Customer <br> network]
D((User))
E([BGP <br> announcement])

A --x B
E --- B
B-- Anycast <br> GRE tunnel ---C
B-- Cloudflare <br> Network <br> Interconnect ---C
C-- Egress through <br> Direct Server <br> Return --> D
D -- Ingress --> B

style A stroke: red,fill: red,color: white
style B stroke: orange,fill: orange,color: black
style C stroke: #ADD8E6,fill: #ADD8E6,color: black
style D stroke: blue,fill: blue,color: white
linkStyle 0 stroke-width:3px,stroke:red
linkStyle 1 stroke-width:2px,stroke:orange
linkStyle 2 stroke-width:2px,stroke:#ADD8E6
linkStyle 3 stroke-width:2px,stroke:gray
linkStyle 4 stroke-width:3px,stroke:green

Note

Cloudflare's China Network does not yet support Magic Transit.

For detailed information on Magic Transit architecture, refer to the [Reference section](https://developers.cloudflare.com/magic-transit/reference/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/about/","name":"About"}}]}
```
