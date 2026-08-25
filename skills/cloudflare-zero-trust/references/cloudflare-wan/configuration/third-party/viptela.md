---
description: Connect Cisco SD-WAN to Cloudflare WAN.
title: Cisco SD-WAN
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Cisco SD-WAN

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/viptela/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare partners with Cisco's SD-WAN solution to provide users with an integrated SASE solution. The Cisco SD-WAN appliances (physical and virtual) manage subnets associated with branch offices and cloud instances. Anycast tunnels are set up between these SD-WAN edge devices and Cloudflare to securely route Internet-bound traffic. This tutorial describes how to configure the Cisco Catalyst 8000 Edge Platforms (physical or virtual) in the SD-WAN mode for north-south (Internet-bound) use cases.

## Prerequisites

Before setting up a connection between Cisco SD-WAN and Cloudflare, you must have:

* Purchased Cloudflare WAN (formerly Magic WAN) and Secure Web Gateway.
* Cloudflare provisions Cloudflare WAN and Secure Web Gateway.
* Received two Cloudflare tunnel endpoints (anycast IP address) assigned to Cloudflare WAN.
* Cisco SD-WAN appliances (physical or virtual). This ensures specific Internet-bound traffic from the sites' private networks is routed over the anycast GRE tunnels to Secure Web Gateway to enforce a user's specific web access policies.
* A static IP pair to use with the tunnel endpoints. The static IPs should be `/31` addresses separate from the IPs used in the subnet deployment.
* Release 20.6 Controllers and vEdge Device Builds. You should also pair them with devices that are on at least version Cisco IOS XE SD-WAN 17.6\. Refer to [Cisco documentation ↗](https://www.cisco.com/c/en/us/support/docs/routers/sd-wan/215676-cisco-tac-and-bu-recommended-sd-wan-soft.html) to learn more about Cisco software versions.

Note

The SASE integration between Cisco SD-WAN and Cloudflare SSE was validated with Cisco SD-WAN 20.6.2 version with Catalyst 8kv router. For connectivity, we used GRE tunnels.

## 1\. Create a SIG template on Cisco vManage

Cisco vManage is Cisco's SD-WAN management tool that is used to manage all the SD-WAN appliances in branch offices.

For this example scenario, a generic template for `SIG-Branch` was created.

![Traffic flow diagram for GRE](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=890,height=424,format=webp/_astro/viptela-flow-diagram-gre.BGa0DR7d.png)

_Note: Labels in this image may reflect a previous product name._

To create a Secure Internet Gateway (SIG) using vManage:

1. From **Cisco vManage** under **Configuration**, select **Generic** and **Add Tunnel**.
2. The table below shows the setting fields and their options.

| Setting             | Type/Detail                               |
| ------------------- | ----------------------------------------- |
| **Global Template** | Factory\_Default\_Global\_CISCO\_Template |
| **Cisco Banner**    | Factory\_Default\_Retail\_Banner          |
| **Policy**          | Branch-Local-Policy                       |

**Transport & Management VPN settings**

| Setting                           | Type/Detail                         |
| --------------------------------- | ----------------------------------- |
| **Cisco VPN 0**                   | GCP-Branch-VPN0                     |
| **Cisco Secure Internet Gateway** | Branch-SIG-GRE-Template             |
| **Cisco VPN Interface Ethernet**  | GCP-Branch-Public-Internet-TLOC     |
| **Cisco VPN Interface Ethernet**  | GCP-VPN0-Interface                  |
| **Cisco VPN 512**                 | Default\_AWS\_TGW\_CSR\_VPN512\_V01 |

**Basic Information settings**

| Setting            | Type/Detail                                 |
| ------------------ | ------------------------------------------- |
| **Cisco System**   | Default\_BootStrap\_Cisco\_System\_Template |
| **Cisco Logging**  | Default\_Logging\_Cisco\_V01                |
| **Cisco AAA**      | AWS-Branch-AAA-Template                     |
| **Cisco BFD**      | Default\_BFD\_Cisco-V01                     |
| **Cisco OMP**      | Default\_AWS\_TGW\_CSR\_OMP\_IPv46\_...     |
| **Cisco Security** | Default\_Security\_Cisco\_V01               |

When creating the Feature Template, you can choose values that apply globally or that are device specific. For example, the **Tunnel Source IP Address**, **Interface Name** and fields from **Update Tunnel** are device specific and should be chosen accordingly.

## 2\. Create tunnels in vManage

From vManage, select **Configuration** \> **Templates**. You should see the newly created template where you will update the device values.

Because the template was created to add GRE tunnels, you only need to update the device values. Note that **VPN0** is the default, and the WAN interface used to build the tunnel must be part of **VPN0**.

![Update template fields for GRE tunnel](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=752,height=865,format=webp/_astro/viptela-update-device-template-gre.BQZzlgJi.png)

## 3\. Create tunnels in Cloudflare

Refer to [Configure tunnel endpoints](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/) for more information on creating a GRE tunnel.

![Established GRE tunnel in Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=847,height=299,format=webp/_astro/viptela-gre-tunnel.BI5bFdGE.png)

## 4\. Define static routes

Refer to [Configure static routes](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#create-a-static-route) for more information on configuring your static routes.

![Established GRE static routes in Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=856,height=312,format=webp/_astro/viptela-gre-static-routes.xe2lnYh6.png)

## 5\. Validate traffic flow

In the example below, a request for `neverssl.com` was issued, which has a Cloudflare policy blocking traffic to `neverssl.com`.

On the client VM (192.168.30.3), a blocked response is visible.

![cURL example for a request to neverssl.com](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1136,height=380,format=webp/_astro/viptela-curl-traffic-flow.DiSsMVxM.png)

A matching blocked log line is visible from the Cloudflare logs.

![A blocked log from Gateway Activity Log in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1044,height=1054,format=webp/_astro/viptela-gre-swg-traffic.DD7CHYgi.png)

## Add new tunnels using IPsec

IPsec tunnels to Cloudflare can only be created on Cisco 8000v in the router mode today. Refer to the [Cisco IOS XE](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/cisco-ios-xe/) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/viptela/#page","headline":"Cisco SD-WAN · Cloudflare WAN docs","description":"Connect Cisco SD-WAN to Cloudflare WAN.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/viptela/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
