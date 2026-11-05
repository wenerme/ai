---
description: "Deploy multiple `cloudflared` replicas for high availability and automatic failover across your infrastructure.\n"
title: Tunnel availability and failover
image: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/og.png?v=e13dd91cf9dbb9b4
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Tunnel availability and failover

Last updated Nov 4, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Our lightweight and open-source connector, [`cloudflared` ↗︎](https://github.com/cloudflare/cloudflared), was built to be highly available without any additional configuration requirements. When you run a tunnel, `cloudflared` establishes four outbound-only connections between the origin server and the Cloudflare network. These four connections are made to four different servers spread across at least two distinct data centers. This model ensures high availability and mitigates the risk of individual connection failures. This means in event a single connection, server, or data center goes offline, your resources will remain available.

## `cloudflared` replicas

You can deploy additional instances of `cloudflared` for availability and failover. These instances are called replicas. Each replica establishes four new connections to Cloudflare, providing additional points of ingress to your origin. All replicas point to the same tunnel, so if a single host running `cloudflared` goes down, the remaining replicas continue to serve traffic.

Cloudflare network

Forwards each request to the geographically closest replica

4 outbound connections per replica

Your network

- cloudflared

  Replica 1 on `host-a`tunnel-01
- cloudflared

  Replica 2 on `host-b`tunnel-01

Application

Replicas do not support traffic steering (such as round-robin or hash-based routing). When a request arrives at Cloudflare, it is forwarded to the geographically closest replica. If that connection fails, Cloudflare retries with other replicas, but there is no guarantee about which one is chosen. If you need intelligent traffic distribution, use [Cloudflare Load Balancers](#cloudflare-load-balancers) instead.

### When to use `cloudflared` replicas

- To provide additional points of availability for a single tunnel.
- To allocate failover nodes within your network.
- To update the configuration of a tunnel [without downtime](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/#update-with-multiple-cloudflared-instances).

For setup instructions, refer to [Deploy cloudflared replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/).

## Cloudflare Load Balancers

[Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) proactively steers traffic away from unhealthy origins and intelligently distributes the traffic load based on your choice of [steering algorithms](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/). Unlike [`cloudflared` replicas](#cloudflared-replicas) which all use the same tunnel, a typical load balancer setup requires creating multiple tunnels. Most customers will create one tunnel per data center and one load balancer pool per tunnel.

- Internet
- Cloudflare One Client
- Cloudflare WAN

[Cloudflare Load Balancer](https://developers.cloudflare.com/load-balancing/)

Steers traffic to healthy tunnels, with one pool per tunnel

- Data center 1Tunnel 1

  `cloudflared` forwards traffic to your app servers
  - App server
  - App server
- Data center 2Tunnel 2

  `cloudflared` forwards traffic to your app servers
  - App server
  - App server

### When to use load balancers

- To intelligently steer traffic based on latency, geolocation, or other signals.
- To implement failover logic if a tunnel reaches an inactive state.
- To get a [health alert](https://developers.cloudflare.com/notifications/notification-available/#load-balancing) when a tunnel reaches an inactive state.
- To distribute traffic more evenly across your Cloudflare Tunnel-accessible origins or endpoints.

For setup instructions, refer to [Public load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/) or [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) depending on your [use case](#types-of-load-balancers).

### Types of load balancers

There are two types of load balancers that you can use with Cloudflare Tunnel endpoints:

- [Public load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/) steer traffic from the Internet to applications published on a Cloudflare domain. Use this method if your service is served by Cloudflare Tunnel via a [published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application).
- [Private load balancers](https://developers.cloudflare.com/load-balancing/private-network/) steer traffic from Cloudflare One Clients, Cloudflare WAN, and other on-ramps to an internal IP on your private network. Use this method if your service is connected to Cloudflare Tunnel via a [CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/). To keep each user on the same endpoint, use [hash steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering/#private-load-balancers) or [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#private-load-balancers).

Note

[Private hostname routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) are not currently compatible with Load Balancing. If your service is connected via a hostname route, use `cloudflared` [replicas](#cloudflared-replicas) for high availability.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#page","headline":"Tunnel availability and failover","description":"Deploy multiple cloudflared replicas for high availability and automatic failover across your infrastructure.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/og.png?v=e13dd91cf9dbb9b4","dateModified":"2026-11-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
