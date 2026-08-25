---
description: Handle overlapping IP addresses with virtual networks.
title: Manage overlapping IPs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage overlapping IPs

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/overlapping-ips/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Virtual networks provide routing isolation within your Cloudflare account. Each virtual network maintains its own routing table, allowing you to separate traffic between different environments, partners, or applications.

For example, an organization may have separate "production" and "staging" VPC networks that both use the same private IP range (such as `10.128.0.0/24`). Without virtual networks, Cloudflare cannot distinguish between `10.128.0.1` in production and `10.128.0.1` in staging. By creating two virtual networks, you can deterministically route traffic to the correct environment. Users select which virtual network they want to connect to in the Cloudflare One Client.

For a conceptual overview of virtual networks, including how they work across Cloudflare products, refer to [Virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/).

## Example

This example illustrates best practices for managing overlapping subnets. For this example, assume that you are connecting two different private networks: a production VPC that uses the `10.0.0.0/8` space holistically and a staging VPC that uses the `10.0.1.0/24` space. These networks are served by Tunnel-A and Tunnel-B respectively.

The following table shows the default configuration without a virtual network assigned:

| Routes in Tunnel-A | Virtual network |
| ------------------ | --------------- |
| 10.0.0.0/8         | default         |

| Routes in Tunnel-B | Virtual network |
| ------------------ | --------------- |
| 10.0.1.0/24        | default         |

In the above configuration, all user traffic to `10.0.1.0/24` takes the most specific path and routes to the staging VPC (Tunnel-B). All other `10.0.0.0/8` traffic routes to the production VPC (Tunnel-A). Users would not be able to reach the `10.0.1.0/24` subnet for the network served by Tunnel-A.

To solve this problem, add a `10.0.1.0/24` route to Tunnel-A and assign it the `production` virtual network. Next, assign the `staging` virtual network to `10.0.1.0/24` in Tunnel-B.

| Routes in Tunnel-A | Virtual network |
| ------------------ | --------------- |
| 10.0.0.0/8         | default         |
| 10.0.1.0/24        | production      |

| Routes in Tunnel-B | Virtual network |
| ------------------ | --------------- |
| 10.0.1.0/24        | staging         |

The user can now [toggle between the two virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/#connect-to-a-virtual-network) in their Cloudflare One Client, similar to the concept of switching VPN profiles in a VPN client. When a user selects `production`, they can connect to the entire `10.0.0.0/8` range served by Tunnel-A. When they select `staging`, they can connect to all of `10.0.0.0/8` in Tunnel-A except for `10.0.1.0/24`, which will be served by Tunnel-B.

## Set up virtual networks

For setup instructions, refer to [Create a virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/#create-a-virtual-network).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/overlapping-ips/#page","headline":"Manage overlapping IPs · Cloudflare Learning Paths","description":"Handle overlapping IP addresses with virtual networks.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/overlapping-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
