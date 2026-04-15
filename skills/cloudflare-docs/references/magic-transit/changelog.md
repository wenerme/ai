---
title: Changelog
description: Review recent changes to Magic Transit.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/magic-transit.xml) 

## 2026-01-30

  
**BGP over GRE and IPsec tunnels**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using IPsec and GRE tunnel on-ramps (beta).

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via IPsec and GRE tunnel on-ramps.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

For configuration details, refer to:

* [Configure BGP routes for Magic WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-routes/#configure-bgp-routes)
* [Configure BGP routes for Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes)

## 2026-01-15

  
**Network Services navigation update**   

The Network Services menu structure in Cloudflare's dashboard has been updated to reflect solutions and capabilities instead of product names. This will make it easier for you to find what you need and better reflects how our services work together.

Your existing configurations will remain the same, and you will have access to all of the same features and functionality.

The changes visible in your dashboard may vary based on the products you use. Overall, changes relate to [Magic Transit ↗](https://developers.cloudflare.com/magic-transit/), [Magic WAN ↗](https://developers.cloudflare.com/magic-wan/), and [Magic Firewall ↗](https://developers.cloudflare.com/cloudflare-network-firewall/).

**Summary of changes:**

* A new **Overview** page provides access to the most common tasks across Magic Transit and Magic WAN.
* Product names have been removed from top-level navigation.
* Magic Transit and Magic WAN configuration is now organized under **Routes** and **Connectors**. For example, you will find IP Prefixes under **Routes**, and your GRE/IPsec Tunnels under **Connectors.**
* Magic Firewall policies are now called **Firewall Policies.**
* Magic WAN Connectors and Connector On-Ramps are now referenced in the dashboard as **Appliances** and **Appliance profiles.** They can be found under **Connectors > Appliances.**
* Network analytics, network health, and real-time analytics are now available under **Insights.**
* Packet Captures are found under **Insights > Diagnostics.**
* You can manage your Sites from **Insights > Network health.**
* You can find Magic Network Monitoring under **Insights > Network flow**.

If you would like to provide feedback, complete [this form ↗](https://forms.gle/htWyjRsTjw1usdis5). You can also find these details in the January 7, 2026 email titled **\[FYI\] Upcoming Network Services Dashboard Navigation Update**.

![Networking Navigation](https://developers.cloudflare.com/_astro/networking-overview-and-navigation.CeMgEFaZ_Z20HKl.webp) 

## 2025-07-30

  
**Magic Transit and Magic WAN health check data is fully compatible with the CMB EU setting.**   

Today, we are excited to announce that all Magic Transit and Magic WAN customers with CMB EU ([Customer Metadata Boundary - Europe](https://developers.cloudflare.com/data-localization/metadata-boundary/)) enabled in their account will be able to access GRE, IPsec, and CNI health check and traffic volume data in the Cloudflare dashboard and via API.

This ensures that all Magic Transit and Magic WAN customers with CMB EU enabled will be able to access all Magic Transit and Magic WAN features.

Specifically, these two GraphQL endpoints are now compatible with CMB EU:

* `magicTransitTunnelHealthChecksAdaptiveGroups`
* `magicTransitTunnelTrafficAdaptiveGroups`

## 2025-06-30

  
**Graceful withdrawal of BYOIP prefixes**   

Magic Transit customers can now configure AS prepending on their BYOIP prefixes advertised at the Cloudflare edge. This allows for smoother traffic migration and minimizes packet loss when changing providers.

AS prepending makes the Cloudflare route less preferred by increasing the AS path length. You can use this to gradually shift traffic away from Cloudflare before withdrawing a prefix, avoiding abrupt routing changes.

Prepending can be configured via the API or through BGP community values when peering with the Magic Transit routing table. For more information, refer to [Advertise prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

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

Refer to [Magic WAN BGP peering](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-routes/#configure-bgp-routes) or [Magic Transit BGP peering](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) to learn more about this feature and how to set it up.

## 2024-10-01

**Early access testing for BGP on CNI 2.0 circuits**

Customers can exchange routes dynamically with their Magic virtual network overlay through Direct CNI or Cloud CNI based connectivity.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/changelog/","name":"Changelog"}}]}
```
