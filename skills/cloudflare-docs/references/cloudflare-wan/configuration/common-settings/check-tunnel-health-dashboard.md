---
title: Check tunnel health in the dashboard
description: Check WAN tunnel health in the dashboard.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Check tunnel health in the dashboard

The Cloudflare dashboard monitors the health of all anycast tunnels on your account that route traffic from Cloudflare to your origin network.

The dashboard displays tunnel health as measured from each Cloudflare location where your traffic is likely to land. If the tunnels are healthy on your side, you will see the majority of servers reporting an **up** status. It is normal for a subset of these locations to report tunnel status as degraded or unhealthy, since the Internet is not homogeneous and intermediary path issues between Cloudflare and your network can cause interruptions for specific paths.

Note

To access more than one hour of tunnel health data, you should use the [GraphQL API](https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/).

Not all data centers are relevant to you at all times. You can refer to the **Traffic volume (1 hour)** column to understand if a given data center is receiving traffic for your network, and if its health status is relevant to you.

## Check tunnel health

1. Go to the **Network health** page.
[ Go to **Network health** ](https://dash.cloudflare.com/?to=/:account/networking-insights/health)
1. Select the **Connector health** tab.
2. In this view you can access a list of your tunnels and their current health status. You can also check the amount of health checks passed in the last hour as well as traffic volume for each tunnel.
3. Find the tunnel you want to inspect, select the three dots next to it, and select:  
   * **Create alert**: Opens the [notifications wizard](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/) so you can create specific alerts for that tunnel when specific conditions are met.  
   * **Network Analytics**: Opens the Analytics section of the dash, prefiltered with the tunnel you want to inspect.
4. Alternatively, from the list of tunnels, select the tunnel you want to inspect to access details about it.

## Check tunnel health for a specific tunnel

You can drill down into a specific tunnel to check its health status and other information.

1. Go to the **Network health** page.
[ Go to **Network health** ](https://dash.cloudflare.com/?to=/:account/networking-insights/health)
1. Select the **Connector health** tab.
1. Find and select the tunnel you want to inspect.

The next view displays detailed information about the tunnel, including:

* Status information  
   * Up: More than 80% of health checks pass.  
   * Degraded: More than 40% of health checks pass.  
   * Down: Less than 40% of health checks pass.
* Health checks passed in the last hour
* Traffic volume in the last hour

If you select the three dots in front of the tunnel you want to inspect, you have access to the following tools:

* Packet captures: Collect [packet level data for your traffic](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/)
* Network Analytics: Leverage real-time insights into [network analytics](https://developers.cloudflare.com/cloudflare-wan/analytics/network-analytics/).

Note

Cloudflare WAN customers with [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) enabled for the European Union can access GRE, IPsec, and CNI (Cloudflare Network Interconnect) health check and traffic volume data in the Cloudflare dashboard and through the API. This ensures that customers who need to be General Data Protection Regulation (GDPR) compliant can access all Cloudflare WAN features.

## Cloudflare One Appliance

Cloudflare One Appliance (formerly Magic WAN Connector) also includes a heartbeat function, an additional way of communicating its health status which does not depend on successfully setting up any tunnels. The heartbeat function communicates periodically with Cloudflare through HTTPS and lets Cloudflare know that the Cloudflare One Appliance in question is connected to the Internet and reachable.

Refer to [Heartbeat](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/maintenance/heartbeat/) to learn more.

## Troubleshooting

If you received a tunnel health alert but are unsure whether it affects your traffic, refer to [Troubleshoot connectivity](https://developers.cloudflare.com/cloudflare-wan/troubleshooting/connectivity/) to determine whether the alert is relevant.

If your tunnels show as unhealthy or degraded, refer to [Troubleshoot tunnel health](https://developers.cloudflare.com/cloudflare-wan/troubleshooting/tunnel-health/) for common issues and solutions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/","name":"Check tunnel health in the dashboard"}}]}
```
