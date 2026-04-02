---
title: Connect with WARP Connector (optional)
description: WARP Connector uses the same underlying technology as the Cloudflare One Client. The software is installed on a Linux server or virtual machine in your private network and requires you to make routing updates to machines or networks behind WARP Connector. WARP Connector supports bidirectional proxy of traffic: it can proxy traffic initiated from a user running WARP into a private network (same as cloudflared), but it can also enable traffic from a network to be on-ramped to Cloudflare for either public or private destinations. You can also use WARP Connector to create mesh network connectivity so that any device either running the Cloudflare One Client, or behind a WARP Connector, can communicate using the CGNat virtual IP addresses assigned to each device.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/replace-vpn/connect-private-network/warp-connector.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect with WARP Connector (optional)

WARP Connector uses the same underlying technology as the Cloudflare One Client. The software is installed on a Linux server or virtual machine in your private network and requires you to make routing updates to machines or networks behind WARP Connector. WARP Connector supports bidirectional proxy of traffic: it can proxy traffic initiated from a user running WARP into a private network (same as `cloudflared`), but it can also enable traffic from a network to be on-ramped to Cloudflare for either public or private destinations. You can also use WARP Connector to create mesh network connectivity so that any device either running the Cloudflare One Client, or behind a WARP Connector, can communicate using the CGNat virtual IP addresses assigned to each device.

For most customers, [cloudflared](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflared/) should be the primary connectivity method for end-users to connect to services in your private network. WARP Connector is the preferred method for mesh or other software-defined networking — most of which require bidirectional connectivity — or when organizations do not want to make changes to their underlying network routing infrastructure.

## Set up WARP Connector

To connect your private network using WARP Connector, refer to [Set up WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/","name":"Connect your private network"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/warp-connector/","name":"Connect with WARP Connector (optional)"}}]}
```
