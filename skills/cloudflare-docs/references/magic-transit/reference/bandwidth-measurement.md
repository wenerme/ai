---
title: Bandwidth measurement
description: How Cloudflare measures Magic Transit tunnel bandwidth.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/reference/bandwidth-measurement.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Bandwidth measurement

Cloudflare measures Magic Transit usage based on the 95th percentile of clean bandwidth for your network. "Clean bandwidth" refers to the egress traffic Cloudflare routes to your network after applying all Distributed Denial of Service ([DDoS](https://developers.cloudflare.com/ddos-protection/)) mitigation and firewall functions. The usage measurement explicitly excludes attack traffic we block at our global network.

To measure 95th percentile bandwidth, Cloudflare records clean bandwidth leaving our global network at five-minute intervals, sorts these measurements in descending order, and discards the top 5% of measurements it recorded. The highest remaining value constitutes the 95th percentile bandwidth measurement for that time period.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/reference/bandwidth-measurement/","name":"Bandwidth measurement"}}]}
```
