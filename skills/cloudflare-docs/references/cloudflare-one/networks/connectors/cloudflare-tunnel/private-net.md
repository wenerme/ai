---
title: Private networks
description: With Cloudflare Zero Trust, you can connect private networks and the services running in those networks to Cloudflare's global network. This involves installing a connector on the private network, and then setting up routes which define the IP addresses available in that environment. Unlike published applications, private network routes can expose both HTTP and non-HTTP resources.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Private networks ](https://developers.cloudflare.com/search/?tags=Private%20networks) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Private networks

With Cloudflare Zero Trust, you can connect private networks and the services running in those networks to Cloudflare's global network. This involves installing a [connector](#connectors) on the private network, and then [setting up routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2b-connect-a-network) which define the IP addresses available in that environment. Unlike [published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), private network routes can expose both HTTP and non-HTTP resources.

To reach private network IPs, end users must connect their device to Cloudflare and enroll in your Zero Trust organization. The most common method is to install the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on their device, or you can onboard their network traffic to Cloudflare using our [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/) or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-tunnel/).

Administrators can optionally set [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to control access to services based on user identity and device posture.

## Connectors

Here are the different ways you can connect your private network to Cloudflare:

* [**Cloudflare Tunnel (cloudflared)**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) installs on a server in your private network and creates a secure, outbound-only tunnel to Cloudflare. `cloudflared` only proxies traffic initiated from a user to a server. Any service or application running behind the tunnel will use the server's default routing table for server-initiated connectivity.
* [**Cloudflare One Client**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/peer-to-peer/) installs on a user device and can be used to establish peer-to-peer connectivity through Cloudflare's network. Each device is assigned a [virtual IP address](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/), allowing enrolled devices to reach services on other enrolled devices.
* [**WARP Connector**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/) installs on a Linux server in your private network to establish site-to-site, bidirectional, and mesh networking connectivity. The WARP Connector acts as a subnet router to relay client-initiated and server-initiated traffic between all devices on a private network and Cloudflare.
* [**Cloudflare WAN**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/) connects entire network locations to Cloudflare using anycast GRE or IPsec tunnels configured on your existing networking equipment.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}}]}
```
