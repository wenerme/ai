---
title: Analytics
description: Use Magic Transit analytics to monitor network performance and troubleshoot potential issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Analytics

Use these options to gather information at the start of your troubleshooting workflow. Then, use more detailed network data collection and analysis to identify the root cause.

* Analyze network traffic over time in [Network Analytics](#network-analytics)
* Perform more detailed troubleshooting with:  
   * [Traceroutes](#traceroutes)  
   * [Packet captures](#packet-captures)

## Network Analytics

Network Analytics provides detailed analytics on your Magic Transit traffic over time. You can filter data by traffic characteristics and review traffic trends over time.

For details, refer to [Magic Transit Network Analytics](https://developers.cloudflare.com/magic-transit/analytics/network-analytics/).

## Traceroutes

Traceroutes provide a hop-by-hop breakdown of the Internet path network traffic follows from Cloudflare's network to your network.

For details, refer to [Traceroutes](https://developers.cloudflare.com/magic-transit/analytics/traceroutes/).

## Packet captures

Packet captures allow you to analyze the raw packet data your network sends to and receives from Cloudflare's network.

For details, refer to [packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/).

## Query analytics with GraphQL

GraphQL Analytics provides a GraphQL API to query raw JSON data for your Magic Transit traffic analytics. You can ingest this data into a Security Information and Event Management (SIEM) tool or another platform for further analysis.

* [Querying Magic Transit tunnel bandwidth analytics with GraphQL](https://developers.cloudflare.com/magic-transit/analytics/query-bandwidth/)
* [Querying Magic Transit tunnel health check results with GraphQL](https://developers.cloudflare.com/magic-transit/analytics/query-tunnel-health/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/analytics/","name":"Analytics"}}]}
```
