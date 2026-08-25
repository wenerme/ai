---
description: Definitions for terms used across Cloudflare WAN documentation.
title: Glossary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Glossary

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/glossary/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review the definitions for terms used across Cloudflare WAN (formerly Magic WAN) documentation.

| Term                          | Definition                                                                                                                                                                                                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anycast                       | Anycast is a network addressing and routing method in which incoming requests can be routed to a variety of different locations. Anycast typically routes incoming traffic to the nearest data center with the capacity to process the request efficiently.                                     |
| data packet                   | A data packet is a unit of data consisting of user and control information. Information in a network is broken down into packets, that might follow different paths to their final destination.                                                                                                 |
| equal-cost multi-path routing | A technique that uses hashes calculated from packet data to determine the route chosen.                                                                                                                                                                                                         |
| GRE tunnel                    | Stands for generic routing encapsulation. It is a protocol wrapping one data packet within another type of data packet. This is useful for enabling protocols that are not normally supported by a network.                                                                                     |
| ICMP                          | Internet Control Message Protocol (ICMP) is used by network devices to send error messages and other operational information. ICMP is useful for diagnostic purposes, for example.                                                                                                              |
| Internet key exchange (IKE)   | The protocol Cloudflare uses to create the IPsec tunnel between Cloudflare WAN and the customer's device.                                                                                                                                                                                       |
| IPsec tunnel                  | Stands for Internet Protocol secure. It is a group of protocols for securing connections between devices, by encrypting IP packets.                                                                                                                                                             |
| maximum segment size (MSS)    | MSS limits the size of packets, or small chunks of data, that travel across a network, such as the Internet.                                                                                                                                                                                    |
| on-ramp                       | Refers to a way of connecting a business network to Cloudflare. Examples of on-ramps, or ways to connect to Cloudflare, are Anycast GRE tunnels, Anycast IPsec tunnels, Cloudflare Network Interconnect (CNI), Cloudflare Tunnel, and WARP.                                                     |
| static route                  | A fixed configuration to route traffic through Anycast tunnels from Cloudflare global network to the customer's locations.                                                                                                                                                                      |
| subnet                        | Also known as subnetwork. It refers to a network that is part of another network.                                                                                                                                                                                                               |
| traffic steering              | Cloudflare evaluates your route's health and steers traffic according to priorities defined by you and / or tunnel health.                                                                                                                                                                      |
| tunnel health-check           | A probe sent by Cloudflare to check for tunnel health. If a tunnel is not considered healthy, Cloudflare reroutes traffic to one that is considered healthy.                                                                                                                                    |
| WAN                           | Stands for Wide Area Network. It refers to a computer network that connects groups of computers over large distances. WANs are often used by businesses to connect their office networks. The objective is to make each of the local area networks (LANs) be remotely connected and accessible. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/glossary/#page","headline":"Glossary · Cloudflare WAN docs","description":"Definitions for terms used across Cloudflare WAN documentation.","url":"https://developers.cloudflare.com/cloudflare-wan/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
