---
title: Changelog
description: Review recent changes to Cloudflare Network Interconnect.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network-interconnect/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/network-interconnect.xml) 

## 2026-03-24

  
**Interconnects moved to Connectors**   

The top-level **Interconnects** page in the Cloudflare dashboard has been removed. Interconnects are now located under **Connectors** \> **Interconnects**.

Your existing configurations and functionality remain the same.

## 2025-06-20

  
**CNI maintenance alerts**   

Customers using Cloudflare Network Interconnect with the v1 dataplane can now subscribe to maintenance alert emails. These alerts notify you of planned maintenance windows that may affect your CNI circuits.

For more information, refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

## 2024-12-17

  
**Establish BGP peering over Direct CNI circuits**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using a Direct CNI on-ramp.

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via CNI.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

Refer to [Magic WAN BGP peering](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes) or [Magic Transit BGP peering](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) to learn more about this feature and how to set it up.

## 2024-10-01

**Early access testing for BGP on Direct CNI circuits**

Customers can exchange routes dynamically with their Magic virtual network overlay via Direct CNI or Cloud CNI based connectivity.

## 2024-09-02

**Interconnect portal displays all available locations in a list**

Customers can now see all available Direct CNI locations when searching for a Cloudflare site in the Interconnects interface.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-interconnect/","name":"Network Interconnect"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-interconnect/changelog/","name":"Changelog"}}]}
```
