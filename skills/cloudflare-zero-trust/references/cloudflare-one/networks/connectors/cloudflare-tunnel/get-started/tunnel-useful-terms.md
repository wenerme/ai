---
description: Reference information for Useful terms in Zero Trust networking.
title: Useful terms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Useful terms

Last updated Jun 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review terminology for Cloudflare Tunnels.

## Tunnel

A tunnel is a secure, outbound-only pathway you can establish between your origin and Cloudflare's global network. Each tunnel you create will be assigned a [name](#tunnel-name) and a [UUID](#tunnel-uuid).

## Tunnel UUID

A tunnel UUID is an alphanumeric, unique ID assigned to a tunnel. The tunnel UUID can be used whenever you need to reference a specific tunnel.

## Tunnel name

A tunnel name is a unique, user-friendly identifier that you choose for a tunnel. Since a tunnel can proxy traffic to multiple services, tunnel names do not need to be hostnames. For example, you can assign your tunnel a name that represents your application/network, a particular server, or the cloud environment where it runs.

## Connector

The connector, referred to as `cloudflared`, establishes connectivity from your origin server to the Cloudflare global network. Each `cloudflared` instance creates four long-lived connections to at least two distinct data centers within Cloudflare's global network. This built-in redundancy means that if an individual connection, server, or data center goes down, your origin remains available.

## Replica

A replica is an additional instance of `cloudflared` running the same tunnel on a different host. You can create and configure a tunnel once, then run it through multiple replicas for redundancy. DNS records and Cloudflare Load Balancers continue to point to the tunnel (`UUID.cfargotunnel.com`), while Cloudflare distributes traffic across the available replicas. There is no guarantee about which replica will be chosen — Cloudflare routes to the geographically closest one. Replicas are typically deployed to keep a tunnel available if a host running `cloudflared` goes offline.

## Remotely-managed tunnel

A remotely-managed tunnel is a [tunnel](#tunnel) that was created in the Cloudflare dashboard under **Networking** \> **Tunnels**. Tunnel configuration is stored in Cloudflare, which allows you to manage the tunnel from the dashboard or using the [API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/subresources/configurations/methods/get/).

[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)

## Locally-managed tunnel

A locally-managed tunnel is a [tunnel](#tunnel) that was created by running `cloudflared tunnel create <NAME>` on the command line. Tunnel configuration is stored in your local [cloudflared directory](#default-cloudflared-directory). For terminology specific to locally-managed tunnels, refer to the [Locally-managed tunnel glossary](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/).

## Quick tunnels

Quick tunnels, when run, will generate a URL that consists of a random subdomain of the website `trycloudflare.com`, and point traffic to localhost on port `8080`. If you have a web service running at that address, users who visit the generated subdomain will be able to visit your web service through Cloudflare's network. Refer to [TryCloudflare](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/) for more information on how to run quick tunnels.

## Virtual networks

A [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) is a software abstraction that allows you to logically segregate resources on your private network. Virtual networks are especially useful for exposing resources which have overlapping IP routes. To connect to a resource, end users would select a virtual network in their Cloudflare One Client settings before entering the destination IP.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#page","headline":"Useful terms · Cloudflare One docs","description":"Reference information for Useful terms in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
