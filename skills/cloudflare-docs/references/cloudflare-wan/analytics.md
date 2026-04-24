---
title: Analytics
description: Use Cloudflare WAN analytics to monitor site performance and troubleshoot issues.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/analytics/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Analytics

Use Cloudflare WAN (formerly Magic WAN) analytics to monitor site performance and troubleshoot issues.

Use these options to gather information at the start of your troubleshooting workflow. Then, use more detailed network data collection and analysis to identify the root cause.

* View your entire network at a glance in [Network overview](#network-overview)
* Analyze network traffic over time in [Network Analytics](#network-analytics)
* Perform more detailed troubleshooting with:  
   * [Traceroutes](#traceroutes)  
   * [Packet captures](#packet-captures)

## Network overview

Network overview shows the connectivity status and traffic analytics for all Cloudflare WAN sites. Use it when you receive an alert, start troubleshooting, or perform routine monitoring.

For details, refer to [Network overview](https://developers.cloudflare.com/cloudflare-wan/analytics/site-analytics/).

## Network Analytics

Network Analytics provides detailed analytics on your Cloudflare WAN traffic over time. You can filter data by traffic characteristics and review traffic trends over time.

For details, refer to [Cloudflare WAN Network Analytics](https://developers.cloudflare.com/cloudflare-wan/analytics/network-analytics/).

## Traceroutes

Traceroutes provide a hop-by-hop breakdown of the Internet path network traffic follows from Cloudflare's network to your network.

For details, refer to [Traceroutes](https://developers.cloudflare.com/cloudflare-wan/analytics/traceroutes/).

## Packet captures

Packet captures allow you to analyze the raw packet data your network sends to and receives from Cloudflare's network.

For details, refer to [packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/).

## Query analytics with GraphQL

GraphQL Analytics provides a GraphQL API to query raw JSON data for your Cloudflare WAN traffic analytics. You can ingest this data into a Security Information and Event Management (SIEM) tool or another platform for further analysis.

* [Querying Cloudflare WAN tunnel bandwidth analytics with GraphQL](https://developers.cloudflare.com/cloudflare-wan/analytics/query-bandwidth/)
* [Querying Cloudflare WAN tunnel health check results with GraphQL](https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/analytics/","name":"Analytics"}}]}
```
