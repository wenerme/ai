---
description: Connect cloud networks using provider-specific configuration guides.
title: Cloud networking
image: https://developers.cloudflare.com/cloudflare-wan/reference/cloud-networking/og.png?v=3387503b786d52e8
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud networking

Last updated Nov 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-wan/reference/cloud-networking/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect your cloud networks to [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) using Internet Protocol Security (IPsec) tunnels or Cloud Interconnect. Use Border Gateway Protocol (BGP) to exchange routes dynamically, or configure static routes.

## Choose a connection

Choose a connection based on your network requirements:

| Connection | Transport | Configuration |
| --- | --- | --- |
| IPsec tunnels | Encrypted tunnels over the public Internet | Configure your cloud provider's virtual private network (VPN) gateway and matching Cloudflare WAN tunnels. |
| Cloud Interconnect | Private connectivity through [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect/) | Connect through your cloud provider's interconnect service. Contact your account team to start provisioning. |

## Find a provider guide

The guides describe specific configurations, not every supported routing option:

| Cloud provider | IPsec configuration | Routing in the guide |
| --- | --- | --- |
| Alibaba Cloud | [VPN Gateway](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/alibaba-cloud/) | Static routes |
| Amazon Web Services (AWS) | [Transit Gateway](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/aws/) | BGP with redundant tunnels, including a Terraform reference deployment |
| Google Cloud | [Cloud VPN](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/google/) | Static routes with Classic VPN |
| Microsoft Azure | [VPN Gateway](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/azure/azure-vpn-gateway/) | Static routes |
| Microsoft Azure | [Virtual WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/azure/azure-virtual-wan/) | Static routes |
| Oracle Cloud | [Site-to-Site VPN](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/oracle/) | Static routes |

For private connectivity, use the following Cloud Interconnect guides:

| Cloud provider | Configuration | Requirements |
| --- | --- | --- |
| AWS | [Direct Connect (beta)](https://developers.cloudflare.com/network-interconnect/get-started/#aws-direct-connect-beta) | Dedicated Direct Connect. Hosted Direct Connect is not supported. |
| Google Cloud | [Cloud Interconnect](https://developers.cloudflare.com/network-interconnect/get-started/#google-cloud-interconnect) | Follow the [routing requirements](https://developers.cloudflare.com/network-interconnect/get-started/#gcp-next-steps) after provisioning the connection. |

## Configure routing

[BGP over IPsec](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes) requires [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing). Your cloud gateway must initiate the BGP session toward Cloudflare.

BGP over CNI with Dataplane v2 is in closed beta and unavailable to new customers. Refer to [Configure BGP for an interconnect](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#set-up-bgp-for-an-interconnect) for its requirements.

The Google Cloud Interconnect guide uses static routes toward Google Cloud. Cloudflare ignores routes advertised by Google Cloud Router in that configuration.

For configurations that use static routes, refer to [Configure static routes](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-static-routes).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/reference/cloud-networking/#page","headline":"Cloud networking","description":"Connect cloud networks using provider-specific configuration guides.","url":"https://developers.cloudflare.com/cloudflare-wan/reference/cloud-networking/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-wan/reference/cloud-networking/og.png?v=3387503b786d52e8","dateModified":"2026-11-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
