---
title: Glossary
description: Definitions for terms used across Cloudflare WAN documentation.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Glossary

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/glossary/","name":"Glossary"}}]}
```
