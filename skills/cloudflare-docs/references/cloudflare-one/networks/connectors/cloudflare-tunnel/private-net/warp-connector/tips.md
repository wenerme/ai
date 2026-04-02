---
title: Tips and best practices
description: This page covers operational guidance for managing WARP Connector deployments, including how to update the connector, configure cloud provider settings, and troubleshoot common networking issues.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/tips.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Tips and best practices

This page covers operational guidance for managing WARP Connector deployments, including how to update the connector, configure cloud provider settings, and troubleshoot common networking issues.

## Update WARP Connector

Updating WARP Connector requires updating the `cloudflare-warp` package on your Linux host. During the update, the WARP Connector will briefly disconnect, which will interrupt traffic currently being routed through it.

* [ Debian/Ubuntu ](#tab-panel-3519)
* [ RedHat/CentOS ](#tab-panel-3520)

1. Check your current WARP Connector version:  
Terminal window  
```  
warp-cli --version  
```
2. (Optional) Check the latest version available in the package repository:  
Terminal window  
```  
sudo apt-cache policy cloudflare-warp  
```
3. Update the package list and upgrade the `cloudflare-warp` package:  
Terminal window  
```  
sudo apt-get update && sudo apt-get install --only-upgrade cloudflare-warp  
```

1. Check your current WARP Connector version:  
Terminal window  
```  
warp-cli --version  
```
2. (Optional) Check the latest version available in the package repository:  
Terminal window  
```  
sudo yum info cloudflare-warp  
```
3. Update the `cloudflare-warp` package:  
Terminal window  
```  
sudo yum update cloudflare-warp  
```

1. Verify that WARP Connector is running the new version:  
Terminal window  
```  
warp-cli --version  
```
2. Verify that WARP Connector has reconnected to Cloudflare:  
Terminal window  
```  
warp-cli status  
```  
You should see `Status update: Connected` in the output.

## VPC deployments

When setting up WARP Connector on a virtual private cloud (VPC), you may need to configure additional settings in the cloud service provider.

### GCP

For Google Cloud Project (GCP) deployments, [enable IP forwarding ↗](https://cloud.google.com/vpc/docs/using-routes#canipforward) on the VM instance where you installed WARP Connector.

### AWS

For Amazon Web Services (AWS) deployments:

* Stop [source/destination checking ↗](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html) on the EC2 instance where you installed WARP Connector.
* In your [subnet route table ↗](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-route-tables.html), route all IPv4 traffic to the EC2 instance where you installed WARP Connector. For example:  
| Destination | Target                |  
| ----------- | --------------------- |  
| 0.0.0.0/0   | eni-11223344556677889 |

## Source IPs for Cloudflare services

When Cloudflare services such as [Load Balancing](https://developers.cloudflare.com/load-balancing/) send traffic to your private network through WARP Connector, the traffic originates from a configurable IP range (default `100.64.0.0/12`). You may need to [configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/manually/how-to/configure-cloudflare-source-ips/) to avoid IP conflicts or align with your IP address management plan.

## WARP Connector with cloudflared

WARP Connector and [cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) can run together on the same Linux host. This configuration is useful when you want to use WARP Connector as a gateway for your private network, while also using the `cloudflared` daemon to expose specific applications.

By design, WARP Connector captures all outbound traffic and routes it through Cloudflare's network. This prevents `cloudflared` from making its own [required outbound connections](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/#required-for-tunnel-operation) to Cloudflare, causing the tunnel to fail with connection timeouts.

To allow `cloudflared` to connect, use [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) to explicitly exclude the [Cloudflare Tunnel destinations](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/) from the WARP tunnel. For example, if you are using Split Tunnels in **Exclude** mode, add the following hostnames (or their corresponding IP ranges) to your Split Tunnel exclusion list:

* `region1.v2.argotunnel.com`
* `region2.v2.argotunnel.com`
* `us-region1.v2.argotunnel.com` (US region only)
* `us-region2.v2.argotunnel.com` (US region only)
* `fed-region1.v2.argotunnel.com` (FedRAMP High only)
* `fed-region2.v2.argotunnel.com` (FedRAMP High only)

Note

Split Tunnels is the only supported method of running both connectors on one machine. Due to its low-level integration with the kernel networking stack, WARP Connector will override any routing configurations made by commands such as `ip route add` and `iptables`.

## MTU, MSS, and packet fragmentation

To ensure reliable network performance, it is important to understand the requirements for [Maximum Transmission Unit (MTU) ↗](https://www.cloudflare.com/learning/network-layer/what-is-mtu/) and [Maximum Segment Size (MSS) ↗](https://www.cloudflare.com/learning/network-layer/what-is-mss/) when using WARP Connector. An incorrect configuration can lead to performance degradation or packet loss.

WARP Connector uses encapsulation to route traffic, which adds extra headers and bytes to each [packet ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/). This is especially critical for traffic from your private network (on-ramped via WARP Connector) to a remote Cloudflare One Client. This traffic flow is encapsulated twice:

1. By the WARP Connector on your Linux host.
2. Again by Cloudflare before being delivered to the off-ramp.

This final encapsulation adds overhead. If a device on your private network sends a packet that is already near the maximum size (1,460 bytes or more), this final encapsulation will create a packet larger than 1,500 bytes, which will be dropped.

Generally, this does not cause issues for TCP traffic and modern applications that use [Path MTU Discovery (PMTUD) ↗](https://www.cloudflare.com/learning/network-layer/what-is-mtu/). When they send a large packet with the `do not fragment` (DF) bit set, the WARP Connector's Linux host will correctly send an ICMP `Fragmentation Needed` message back to the source device. The source device then learns to send smaller packets.

However, this may cause issues for legacy applications (like some video streaming or monitoring tools) that may not perform [Path MTU Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/). Instead, they send large packets (e.g., more than 1,280 bytes) with the `do not fragment` (DF) bit unset (`DF=0`).

In this situation, WARP Connector host receives this large packet (for example, 1,460 bytes), then fragments the packet to fit its [tunnel MTU](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface). These fragments are then reassembled at a Cloudflare data center back into the original 1,460-byte packet. Cloudflare then tries to encapsulate this 1,460-byte packet to send to the Cloudflare One Client, pushing it over 1,500 bytes and causing it to be dropped. Cloudflare does not currently support fragmenting these outgoing encapsulated packets.

### Recommendations

To ensure reliable connectivity for all traffic types, especially legacy UDP applications, the most effective solution is to configure the MTU on your source devices (such as servers, cameras, or other devices on your private network) to 1,280 bytes.

This ensures the original packet is small enough to be encapsulated and delivered without being fragmented or dropped.

For TCP-only applications, you can alternatively apply an [MSS clamping ↗](https://www.cloudflare.com/learning/network-layer/what-is-mss/) on your router (an intermediary network device). A value of 1,240 bytes (1,280 bytes MTU - 20-byte IP header - 20-byte TCP header) is recommended to align with the WARP Connector's [tunnel MTU](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/","name":"WARP Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/tips/","name":"Tips and best practices"}}]}
```
