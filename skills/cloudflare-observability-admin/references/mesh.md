---
description: Connect services and devices with post-quantum encrypted private networking through Cloudflare.
title: Cloudflare Mesh
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/mesh/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Mesh

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/mesh/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect services and devices with post-quantum encrypted private networking through Cloudflare.

Cloudflare Mesh gives every enrolled server, laptop, and phone a private Mesh IP. Participants can communicate by IP over TCP, UDP, or ICMP, including device-to-device connections that do not require customer-managed networking infrastructure.

Mesh nodes run the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) in headless mode on Linux. They can also advertise routes to make private subnets and hostnames reachable from other Mesh participants.

The Mesh participant table lists nodes and enrolled client devices together. You can search for devices, filter by participant type or status, and open a device's Zero Trust details page. If one participant source fails, participants from the other source remain available while you retry the request.

![The Mesh network map in the Cloudflare dashboard showing nodes and devices connected through Cloudflare](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2070,height=875,format=webp/_astro/mesh-network-map.CED6jNHK.gif)

Note

Cloudflare Mesh was previously known as WARP Connector and peer-to-peer connectivity. Existing WARP Connectors are now called Mesh nodes. Existing deployments continue to work without migration.

For details about how Mesh works, protocol requirements, and Mesh IP assignment, refer to [Concepts](https://developers.cloudflare.com/mesh/concepts/).

## Use cases

- Connect enrolled devices to each other by private IP.
- Provide bidirectional connectivity between servers, cloud networks, and sites.
- Route traffic to devices that cannot run the Cloudflare One Client.
- Preserve long-lived TCP connections for databases, replication, ERP systems, and remote administration.

## Get started

### [Set up Cloudflare Mesh](https://developers.cloudflare.com/mesh/get-started/)

Configure your account and connect your first participant.

### [Understand Mesh](https://developers.cloudflare.com/mesh/concepts/)

Learn how participants, Mesh IPs, routing, and policies work.

### [Explore features](https://developers.cloudflare.com/mesh/features/)

Configure routes and high availability for Mesh nodes.

### [Follow a guide](https://developers.cloudflare.com/mesh/guides/)

Connect client devices or deploy Mesh in containers.

## Mesh vs. Cloudflare Tunnel

Use Mesh when participants need bidirectional private IP connectivity or when a workload requires stable, long-lived connections. Use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) when you want to publish specific applications, hostnames, or IP routes through an outbound-only connector.

For a detailed comparison, refer to [How Cloudflare Mesh works](https://developers.cloudflare.com/mesh/concepts/#mesh-vs-tunnel).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/mesh/#page","headline":"Cloudflare Mesh","description":"Connect services and devices with post-quantum encrypted private networking through Cloudflare.","url":"https://developers.cloudflare.com/mesh/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
