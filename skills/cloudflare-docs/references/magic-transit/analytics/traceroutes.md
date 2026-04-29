---
title: Traceroutes
description: Run traceroutes across your Magic Transit network.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traceroutes

You can run traceroutes to analyze the hop-by-hop Internet path and latency between Cloudflare's network and your network.

To run a traceroute from a specific Cloudflare data center to your network:

1. Go to the **Network health** page.
[ Go to **Network health** ](https://dash.cloudflare.com/?to=/:account/networking-insights/health)
1. Select **Connector health**.
2. Select the tunnel for the traceroute.
3. Select the three dots > **Traceroute details**.

You can access detailed data from the traceroute, including:

* Time to live (TTL) and host
* Autonomous system (AS) number
* [Packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) sent in the traceroute
* Average, minimum, and maximum latency
* Standard deviation of latency

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/analytics/","name":"Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/analytics/traceroutes/","name":"Traceroutes"}}]}
```
