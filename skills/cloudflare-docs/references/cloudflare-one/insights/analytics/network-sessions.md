---
title: Network session analytics
description: Reference information for Network session analytics in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/analytics/network-sessions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Network session analytics

The Network session analytics dashboard provides visibility into your Cloudflare One traffic patterns. This dashboard helps you understand how traffic flows through your network, including on-ramps (entry points like WARP or Magic Tunnel) and off-ramps (destinations like Internet or Cloudflare Tunnel).

The dashboard is based on the [Zero Trust network sessions Logpush dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/). For definitions on any field, refer to the dataset schema documentation.

To review Network session analytics:

1. In [Cloudflare One ↗](https://dash.cloudflare.com), go to **Insights** \> **Dashboards**.
2. Select **Network session analytics**.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Use cases

The Network session analytics dashboard helps you:

* **Understand traffic patterns**: Visualize how traffic flows through your network infrastructure.
* **Monitor bandwidth usage**: Track upload, download, and total bytes transferred across your network.
* **Identify connection issues**: Analyze connection close reasons to troubleshoot network problems.
* **Track user and device activity**: Monitor unique users and devices accessing your network.

## Provided analytics

### Summary metrics

* **Session count**: Total number of network sessions
* **Bytes total**: Total bytes transferred (upload + download)
* **Unique users**: Number of distinct users

### Traffic by location

* **World map**: Geographic visualization of network traffic by the Cloudflare data center (or colocation) of the ingress and egress
* **Location list**: Top Cloudflare data center (or colocation) locations of the ingress and egress by session count with accompanying graph
* **Change**: Shows the total change across ingress and egress for each location

### Top analytics

* **Top protocols**: Most used network protocols (TCP, UDP, ICMP, ICMPv6)
* **Top connection close reasons**: Common reasons for session termination  
   * Client closed  
   * Origin closed  
   * Client idle timeout  
   * Client error  
   * Unknown  
   * Client TLS error  
   * Origin unreachable  
   * Too many new sessions for user  
   * Origin TLS error  
   * Origin unroutable

## Related resources

* [Zero Trust network sessions Logpush dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/): View detailed logs for individual network sessions.
* [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/): Configure policies that apply to network traffic.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/network-sessions/","name":"Network session analytics"}}]}
```
