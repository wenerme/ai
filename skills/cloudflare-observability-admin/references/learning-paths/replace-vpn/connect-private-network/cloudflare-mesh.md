---
description: Connect your network using Cloudflare Mesh.
title: Connect with Cloudflare Mesh
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect with Cloudflare Mesh

Last updated Apr 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (formerly WARP Connector) connects your private networks to Cloudflare using the Cloudflare One Client (`warp-cli`) running in headless mode on a Linux server. Every enrolled device and node receives a private Mesh IP and can communicate with any other participant over TCP, UDP, or ICMP.

Mesh supports bidirectional traffic — devices can reach servers, servers can reach devices, and networks can reach other networks. This makes it the recommended approach for replacing a VPN, as it covers both user-to-network and network-to-network connectivity.

## Set up Cloudflare Mesh

To connect your private network using Cloudflare Mesh, refer to [Get started with Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/).

The setup wizard in the dashboard configures enrollment, device profiles, and connectivity settings automatically. Once a node is online, add [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) to make the subnet behind it reachable from any enrolled device.

## When to use Mesh

* Replacing a VPN for remote access to private networks
* Bidirectional connectivity (VoIP, SIP, Active Directory, SCCM, DevOps pipelines)
* Long-lived TCP connections sensitive to interruptions (SAP, database replication, ERP systems, RDP sessions)
* Site-to-site networking between offices, data centers, or cloud VPCs
* Client-to-client connectivity (two laptops reaching each other by private IP)
* Any L3/L4 workload where source IP preservation matters

## Best practices

* Enable [high availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) for production nodes with CIDR routes.
* Use [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to control which users and devices can reach specific resources.
* Refer to [Tips and best practices](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/tips/) for cloud VPC configuration and running alongside Cloudflare Tunnel.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/#page","headline":"Connect with Cloudflare Mesh · Cloudflare Learning Paths","description":"Connect your network using Cloudflare Mesh.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
