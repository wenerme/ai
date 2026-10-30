---
description: Learn how Cloudflare Mesh connects participants, assigns private IPs, routes traffic, and differs from Cloudflare Tunnel.
title: How Cloudflare Mesh works
image: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/concepts/og.png?v=2a359dd570f8095e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# How Cloudflare Mesh works

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/concepts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Mesh is a private network for services and devices in your Cloudflare account. It gives each enrolled participant a private address and carries traffic between participants through Cloudflare.

Participants can be Linux servers, laptops, phones, or desktops. They communicate over TCP, UDP, or Internet Control Message Protocol (ICMP) without public IP addresses or services exposed to the public Internet. Host firewalls on each participant still control which Mesh traffic it accepts.

## The connection starts with the Cloudflare One Client

*Connect each participant to Cloudflare with the same client.*

Every participant runs the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), which keeps an encrypted connection to Cloudflare open for Mesh traffic. A **Mesh node** runs the client in headless mode on a Linux server, virtual machine, or container. A **client device** runs the same software with a user interface on a laptop, phone, or desktop.

Cloudflare assigns each participant a Mesh IP from `100.96.0.0/12`, a [carrier-grade NAT range ↗︎](https://datatracker.ietf.org/doc/html/rfc6598) that avoids common private ranges such as `10.0.0.0/8`. Other Cloudflare One documentation calls these [device IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/), and you can configure a custom subnet if the default conflicts with your network.

Any participant can start traffic to another participant's Mesh IP, so device-to-device, device-to-server, and server-to-server connections all work. Client-to-client connectivity does not require a Mesh node.

Not connected

Connect node

Your account's Mesh network

Mesh node

Client device

Cloudflare100.96.0.1100.96.0.10

Not connected

All traffic passes through Cloudflare, so [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/), [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/), and identity controls can govern each connection. Connectivity and access are separate: a participant can be online while policy blocks its traffic.

For setup instructions, refer to [Get started](https://developers.cloudflare.com/mesh/get-started/).

## Routes extend Mesh to private networks

*Reach resources that cannot run the Cloudflare One Client.*

A Mesh node is directly reachable through its own Mesh IP. A route makes resources behind that node reachable as well.

- **CIDR routes** send traffic for an IPv4 or IPv6 range through a node.
- **Hostname routes** send traffic for a private or public hostname through a node.

No matching route

Add routeSend request

Client

Cloudflare

Mesh node

Database · 10.0.0.50No matching route

No matching route

Return traffic must also route through the Mesh node. For more information, refer to [Routes](https://developers.cloudflare.com/mesh/features/routes/).

## Node identity and high availability

*Keep routed networks available when a node host fails.*

A Mesh node has a stable identity in your Cloudflare account. Multiple Linux hosts can register as replicas of that node and advertise the same routes. One replica is active while the others stay on standby. If the active replica disconnects, Cloudflare promotes a standby for traffic to the advertised CIDR routes.

Replica A active

Stop AAdd BSend request

Mesh node #123

Client

Cloudflare

Replica A

Replica BActiveNot added

Database · 10.0.0.50

Replica A active

High availability protects routed prefixes, not direct access to a replica's Mesh IP. For more information, refer to [High availability](https://developers.cloudflare.com/mesh/features/high-availability/).

## Protocol requirement

Mesh uses the [MASQUE](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) protocol by default. Hostname routes, IPv6 CIDR routes, and high availability require MASQUE. If a Mesh node device profile uses WireGuard, only direct participant connectivity and IPv4 CIDR routes work.

## Mesh vs. Cloudflare Tunnel

Mesh and [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) both connect private infrastructure to Cloudflare. They use different connection models:

|  | Cloudflare Mesh | Cloudflare Tunnel |
| --- | --- | --- |
| **Connection model** | Participants can initiate traffic in either direction | Clients connect to resources behind `cloudflared` |
| **Addressing** | Every participant receives a Mesh IP | Resources use published hostnames or private routes |
| **Connector** | Cloudflare One Client | `cloudflared` |
| **Primary use** | Private connectivity between devices, servers, and networks | Publishing applications or routing to private resources |

Use Mesh when participants need private IP connectivity in either direction, including long-lived connections such as database replication and remote administration. Use Tunnel to publish specific applications or route clients to resources behind an outbound-only connector.

<details>

<summary>

Coming from another mesh networking product?

</summary>

Common concepts map to Cloudflare Mesh as follows:

| Other products | Cloudflare Mesh |
| --- | --- |
| Mesh network or tailnet | Your Cloudflare account Mesh network |
| Node or peer | Mesh node or client device |
| Subnet router | Mesh node with a <a href="https://developers.cloudflare.com/mesh/features/routes/">CIDR route</a> |
| Access control list | <a href="https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/">Gateway network policies</a> and <a href="https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/">device posture</a> |
| Admin console | <a href="https://dash.cloudflare.com/?to=/:account/mesh">Cloudflare dashboard ↗︎</a> under **Networking** &gt; **Mesh** |

Unlike peer-to-peer products, Mesh traffic passes through Cloudflare. You manage policies, posture, and identity with Cloudflare One.

</details>

## Start building

Choose the participant or network you want to connect.

### [Set up Cloudflare Mesh](https://developers.cloudflare.com/mesh/get-started/)

Configure your account and connect your first participant.

### [Connect two devices](https://developers.cloudflare.com/mesh/guides/connect-client-devices/)

Add laptops, phones, and headless user devices.

### [Add routes](https://developers.cloudflare.com/mesh/features/routes/)

Reach private subnets and hostnames through a Mesh node.

### [Connect from Workers](https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/)

Let Workers call services on your Mesh network.

## Related resources

- [Run Mesh in containers](https://developers.cloudflare.com/mesh/guides/run-mesh-in-containers/): deploy a node with Docker or Kubernetes.
- [Tips and best practices](https://developers.cloudflare.com/mesh/best-practices/): plan routes, updates, and cloud deployments.
- [Reserved IP addresses](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/): review ranges reserved by Cloudflare One.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/concepts/#page","headline":"How Cloudflare Mesh works","description":"Learn how Cloudflare Mesh connects participants, assigns private IPs, routes traffic, and differs from Cloudflare Tunnel.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/concepts/og.png?v=2a359dd570f8095e","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
