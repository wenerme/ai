---
description: How Magic Transit protects your network with BGP and GRE/IPsec tunnels.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/about/#page","headline":"About Magic Transit · Cloudflare Magic Transit docs","description":"How Magic Transit protects your network with BGP and GRE/IPsec tunnels.","url":"https://developers.cloudflare.com/magic-transit/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
