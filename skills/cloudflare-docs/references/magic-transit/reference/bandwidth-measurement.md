---
title: Bandwidth measurement
description: How Cloudflare measures Magic Transit tunnel bandwidth.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bandwidth measurement

Cloudflare measures Magic Transit usage based on the 95th percentile of clean bandwidth for your network. "Clean bandwidth" refers to the egress traffic Cloudflare routes to your network after applying all Distributed Denial of Service ([DDoS](https://developers.cloudflare.com/ddos-protection/)) mitigation and firewall functions. The usage measurement explicitly excludes attack traffic we block at our global network.

To measure 95th percentile bandwidth, Cloudflare records clean bandwidth leaving our global network at five-minute intervals, sorts these measurements in descending order, and discards the top 5% of measurements it recorded. The highest remaining value constitutes the 95th percentile bandwidth measurement for that time period.

## Cloudflare-originated traffic

Clean bandwidth includes all egress traffic Cloudflare routes to your network through Magic Transit tunnels and interconnects. This includes traffic that originated from the public Internet, as well as response traffic from services within the Cloudflare network (such as Cloudflare CDN) destined to your servers.

For example, if you have onboarded `10.0.0.0/20` to Magic Transit and are advertising it from the Cloudflare edge, but have also advertised a more specific `10.0.1.0/24` via your ISP, the following applies:

* **Internet traffic** to `10.0.1.0/24` reaches you via your ISP because the global Internet routing table uses Longest Prefix Match.
* **Cloudflare-originated traffic** to `10.0.1.0/24` is routed through your Magic Transit tunnels and interconnects because Cloudflare keeps that traffic inside its own network when the covering /20 prefix is advertised from Cloudflare. This traffic counts toward your bandwidth usage.

**To avoid this:** If you do not want Cloudflare-originated traffic flowing through your Magic Transit tunnel, withdraw the covering prefix from Cloudflare. The traffic will then egress to the Internet and follow standard Internet routing (including your more specific ISP routes).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/reference/bandwidth-measurement/","name":"Bandwidth measurement"}}]}
```
