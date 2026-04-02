---
title: Peer-to-peer connectivity
description: With Cloudflare Zero Trust, you can create a private network between any two or more devices running the Cloudflare One Client. This means that you can have a private network between your phone and laptop without ever needing to be connected to the same physical network. If you already have an existing Zero Trust deployment, you can also enable this feature to add device-to-device connectivity to your private network with the press of a button. This will allow you to connect to any service that relies on TCP, UDP, or ICMP-based protocols through Cloudflare's network.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Private networks ](https://developers.cloudflare.com/search/?tags=Private%20networks) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/peer-to-peer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Peer-to-peer connectivity

With Cloudflare Zero Trust, you can create a private network between any two or more devices running the Cloudflare One Client. This means that you can have a private network between your phone and laptop without ever needing to be connected to the same physical network. If you already have an existing Zero Trust deployment, you can also enable this feature to add device-to-device connectivity to your private network with the press of a button. This will allow you to connect to any service that relies on TCP, UDP, or ICMP-based protocols through Cloudflare's network.

Users in your organization can reach these services by enrolling into your organization's Zero Trust account. Once enrolled, each device is assigned a [virtual IP address](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/) which will allow users or systems to address these devices directly. Administrators will then be able to build Zero Trust policies to determine who within your organization can reach those virtual IPs.

This guide covers how to:

* Enable Peer-to-peer connectivity to establish a private network between your devices.
* Manage Split Tunnel preferences for the Cloudflare One Client to determine what traffic should be routed to the Cloudflare global network.
* Create Zero Trust security policies to restrict access.
* Connect to virtual IP spaces from Cloudflare One Client devices without any client-side configuration changes.

## Prerequisites

* [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your devices.
* [Define device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/).
* [Enroll your devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in your Zero Trust organization.

## Enable Peer-to-peer

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Team & Resources** \> **Devices** \> **Management**.
2. Select **Peer to peer connectivity**.
3. Turn on [**Allow all Cloudflare One traffic to reach enrolled devices**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices).
4. Go to **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles** and select the device group that needs Peer-to-peer connectivity.
5. In your device profile, configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that traffic to your [device IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/) goes through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode). For example, if your devices use the default `100.96.0.0/12` range:  
   * **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.  
   * **Include mode**: Add `100.96.0.0/12` to your Split Tunnels list.

This will instruct WARP to begin proxying any traffic destined for a `100.96.0.0/12` IP address to Cloudflare for routing and policy enforcement.

## Connect via the Cloudflare One Client

Once enrolled, your users and services will be able to connect to the virtual IPs configured for TCP, UDP, or ICMP-based traffic. You can optionally create [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to define the users and devices that can access the `100.96.0.0/12` IP space.

## Troubleshooting

### Check your firewall

Verify that your local firewall allows traffic from the WARP CGNAT IPs (or your [custom device IP subnet](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/)). For example, Windows Firewall blocks inbound traffic from `100.96.0.0/12` by default. On Windows devices, you will need to add a firewall rule that allows incoming requests from `100.96.0.0/12` for the desired protocols and/or ports.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/peer-to-peer/","name":"Peer-to-peer connectivity"}}]}
```
