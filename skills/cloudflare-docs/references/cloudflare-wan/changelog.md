---
title: Changelog
description: Review recent changes to Cloudflare WAN (formerly Magic WAN).
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/cloudflare-wan.xml) 

## 2025-09-11

  
**DNS filtering for private network onramps**   

[Magic WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#dns-filtering) users can now securely route their DNS traffic to the Gateway resolver without exposing traffic to the public Internet.

Routing DNS traffic to the Gateway resolver allows DNS resolution and filtering for traffic coming from private networks while preserving source internal IP visibility. This ensures Magic WAN users have full integration with our Cloudflare One features, including [Internal DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns) and [hostname-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

To configure DNS filtering, change your Magic WAN or WARP Connector DNS settings to use Cloudflare's shared resolver IPs, `172.64.36.1` and `172.64.36.2`. Once you configure DNS resolution and filtering, you can use _Source Internal IP_ as a traffic selector in your [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for routing private DNS traffic to your [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-02-14

**Sites feature available to all Magic WAN customers**

All Magic WAN customers now have full access to the Magic WAN sites feature. Customers can configure a Magic WAN site either with or without a Magic WAN connector.

## 2024-12-17

**Magic WAN Connector configurable health checks**

Health check rate on Magic WAN Connector IPsec tunnels are now configurable.

## 2024-12-17

**BGP support for Cloudflare Network Interconnect (CNI)**

Magic WAN customers can now establish BGP peering over Direct CNI circuits. Customers can now dynamically exchange routes and path availability status between their router device and the Magic WAN table.

## 2024-12-12

**LAN Policy improvements for the Magic WAN Connector**

Magic WAN Connector LAN Policy now supports unidirectional traffic flows and port-ranges.

## 2024-10-01

**Early access testing for BGP on CNI 2.0 circuits**

Customers can exchange routes dynamically with their Magic virtual network overlay via Direct CNI or Cloud CNI based connectivity.

## 2024-09-27

**Magic WAN Connector sends Cloudflare One Client traffic to Internet**

All Magic WAN Connectors now route Cloudflare One Client traffic directly to the Internet, bypassing IPsec tunneling, to prevent double encapsulation of Cloudflare One Client traffic.

## 2024-07-17

**Updates to High Availability on the Magic WAN Connector**

The High Availability feature on Magic WAN Connector now supports additional failover conditions, DHCP lease syncing, and staggered upgrades.

## 2024-06-23

**ICMP support for traffic sourced from private IPs**

Magic WAN will now support ICMP traffic sourced from private IPs going to the Internet via Gateway.

## 2024-06-05

**Application based prioritization**

The Magic WAN Connector can now prioritize traffic on a per-application basis.

## 2024-05-31

**virtual IP addresses**

Customers using Gateway to filter traffic to Magic WAN destinations will now see traffic from Cloudflare egressing with the Cloudflare One Client virtual IP addresses (CGNAT range), rather than public Cloudflare IP addresses. This simplifies configuration and improves visibility for customers.

## 2024-01-23

**Network segmentation**

You can define policies in your Connector to either allow traffic to flow between your LANs without it leaving your local premises or to forward it via the Cloudflare network where you can add additional security features.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/changelog/","name":"Changelog"}}]}
```
