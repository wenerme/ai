---
title: Network Analytics
description: Analyze Magic Transit traffic with Network Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network Analytics

[Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) provides real-time insights into Magic Transit traffic that enters and leaves Cloudflare's network through GRE or IPsec tunnels.

Data is aggregated into time intervals that vary based on the selected zoom level. For example, a daily view shows 24-hour averages, which can flatten short-term traffic spikes. As a result, longer time intervals display lower peak bandwidth values compared to more granular views like five-minute intervals.

For details, refer to the [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) documentation.

## Network traffic data filters

With Magic Transit, you can account for traffic flows that enter Cloudflare's network, are blocked by DDoS rules or Cloudflare Network Firewall, and leave Cloudflare's network. This insight lets you track the total packets and bytes that traverse Cloudflare's network and are ultimately destined for your network. It also provides increased insight into traffic flows that are unaccounted for.

The complete list of filters includes:

* A list of your top tunnels by traffic volume.
* Traffic source and destination by traffic type, on-ramps and off-ramps, IP addresses, and ports.
* Destination IP ranges and ASNs.
* Protocols and packet sizes.
* Samples of all GRE or IPsec tunnel traffic entering or leaving Cloudflare's network.
* Mitigations applied (such as DDoS and Cloudflare Network Firewall) to traffic entering Cloudflare's network.

For instructions, refer to [Access tunnel traffic analytics](#access-tunnel-traffic-analytics).

## Access tunnel traffic analytics

1. Go to the **Network Analytics** page.
[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics) 
1. In the **All Traffic** tab, scroll to **Top Insights** to access network traffic filters. By default, the dashboard displays five items, but you can display up to 25 items at once. To change the number of items, select the drop-down menu.
2. (Optional) Hover over a traffic type. You can then filter for that traffic or exclude it from the results.
3. To adjust the scope of information, scroll to **All traffic** \> **Add filter**.
4. In the **New filter** popover, select the data type from the left drop-down menu, an operator from the middle drop-down menu, and an action from the right drop-down menu. For example:  
```  
<DESTINATION_TUNNELS> | _equals_ | <NAME_OF_YOUR_TUNNEL>  
```  
This lets you examine traffic from specific Source tunnels and/or Destination tunnels.

## Feature notes

* For Magic Transit, `Non-Tunnel traffic` often represents traffic from the public Internet or traffic via [CNIs](https://developers.cloudflare.com/network-interconnect/).

The label `Non-Tunnel traffic` is a placeholder, and Cloudflare will apply more specific labels to this category of traffic in the future.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/analytics/","name":"Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/analytics/network-analytics/","name":"Network Analytics"}}]}
```
