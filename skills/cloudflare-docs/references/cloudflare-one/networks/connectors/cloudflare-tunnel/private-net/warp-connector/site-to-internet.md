---
title: Connect private network to Internet
description: This guide covers how to connect a private network to the Internet using WARP Connector. In this example, we will create a WARP Connector for subnet 10.0.0.0/24 and install it on 10.0.0.1.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Private networks ](https://developers.cloudflare.com/search/?tags=Private%20networks) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/site-to-internet.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect private network to Internet

This guide covers how to connect a private network to the Internet using WARP Connector. In this example, we will create a WARP Connector for subnet `10.0.0.0/24` and install it on `10.0.0.1`.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
        device1["Device
        10.0.0.2"]-->router1["WARP Connector
        10.0.0.1"]
      end
      router1-->C((Cloudflare))-->I{Internet}

## Prerequisites

* A Linux host [1](#user-content-fn-1) on the subnet
* Verify that your firewall allows inbound/outbound traffic over the [WARP IP addresses, ports, and domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).

## 1\. Install a WARP Connector

To install WARP Connector on a host machine:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. For the tunnel type, select **WARP Connector**.
4. You will be prompted to turn on [**Allow all Cloudflare One traffic to reach enrolled devices**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-all-cloudflare-one-traffic-to-reach-enrolled-devices) and [**Assign a unique IP address to each device**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) if they are currently turned off. These settings allow Cloudflare to assign a unique CGNAT IP to each device and route traffic between them.
5. Give the tunnel any name (for example, `Subnet-10.0.0.0/24`) and select **Create tunnel**.
6. Select the operating system of your host machine.
7. On your host machine, open a terminal window and run the commands shown in Cloudflare One. Those commands will install the WARP Connector, enable IP forwarding on the host, and connect WARP Connector to your Zero Trust organization.  
Remote SSH connections  
If you are managing the deployment remotely over SSH, your connection may drop when you install the WARP Connector. Because the WARP connector immediately starts forwarding traffic to Cloudflare, the remote SSH server's traffic will now route via Cloudflare instead of via the server's public IP. To work around the issue:  
   * **Option 1**: Create a [device profile](#2-recommended-create-a-device-profile) for WARP Connector, temporarily set its [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) to **Include IPs and domains**, and add `100.96.0.0/12` to the Split Tunnels Include list. This prevents public Internet traffic from routing through Cloudflare, keeping your SSH connection intact.  
   * **Option 2**: Connect your local machine to Zero Trust (for example, via the Cloudflare One Client) and SSH directly to the remote server's private IP. Traffic to this IP must route through the WARP tunnel.
8. (Optional) Configure IP forwarding:  
Enable IP forwarding to persist after reboot  
Terminal window  
```  
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-warp-svc.conf  
sudo sysctl -p /etc/sysctl.d/99-warp-svc.conf  
```  
Configure IP forwarding with iptables  
If you are setting up WARP Connector on a host with iptables enabled, make sure that your iptables FORWARD chain includes rules to accept the desired traffic. For testing and troubleshooting purposes, you can set the default policy for the WARP interface to ACCEPT:  
Terminal window  
```  
iptables -A FORWARD -i CloudflareWARP -j ACCEPT  
iptables -A FORWARD -o CloudflareWARP -j ACCEPT  
```
9. To verify that the WARP Connector is connected to Cloudflare:  
Terminal window  
```  
$ warp-cli status  
Status update: Connected  
```  
Troubleshoot connection  
If the Cloudflare One Client is disconnected, try the following troubleshooting strategies:  
   * Run `warp-cli connect`.  
   * If your private network uses a firewall to restrict Internet traffic, ensure that it allows the [WARP ports and IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).  
   * Review your [WARP daemon logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) for information about why the connection is failing.

WARP Connector software is now installed but not yet routing traffic.

## 2\. (Recommended) Create a device profile

A dedicated [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) allows you to manage the WARP Connector host machine separately from Cloudflare One Client user devices. WARP Connector hosts are registered to your Zero Trust organization with the email address `warp_connector@<your-team-name>.cloudflareaccess.com`. To set up a device profile for WARP Connector:

1. [Create a new profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/#create-a-new-profile) that matches on the following expression:  
| Selector   | Operator | Value                                                 |  
| ---------- | -------- | ----------------------------------------------------- |  
| User email | is       | warp\_connector@<your-team-name>.cloudflareaccess.com |
2. In the profile settings, ensure that **Service mode** is set to **Traffic and DNS mode**.

Note

`warp_connector@<your-team-name>.cloudflareaccess.com` will only match WARP Connectors deployed with WARP client version `2024.9.346.0` and above. WARP Connectors deployed using the legacy workflow will use the generic email for service token registrations (`non-identity@<your-team-name>.cloudflareaccess.com`).

## 3\. Route traffic from subnet to WARP Connector

The WARP Connector host will automatically forward DNS and network traffic to Cloudflare. Depending on where you installed the WARP Connector, you may need to configure other devices on the subnet to route outbound requests through WARP Connector.

### Option 1: Default gateway

If you installed WARP Connector on your router, no additional configuration is necessary. All traffic will use the router as the default gateway.

![Default gateway routing configuration](https://developers.cloudflare.com/_astro/default-gateway.BVYB18Ze_ZeUgg6.webp) 

### Option 2: Alternate gateway

If you have access to the router but installed WARP Connector on another machine, you can configure the router to forward traffic to the WARP Connector. This typically involves adding a static route for the destination IPs that you want to connect to through Cloudflare. Refer to your router documentation for specific instructions on how to add an IP route.

![Alternate gateway routing configuration](https://developers.cloudflare.com/_astro/alternate-gateway.qFF4NOVp_XNrmp.webp) 

#### Add IP route to router

For example, for all traffic from the subnet to egress through WARP Connector, add a rule on the router that routes `0.0.0.0` to the WARP Connector host machine (`10.0.0.100`).

When a device on the subnet sends a request, the router will first redirect the traffic to the WARP Connector host. WARP Connector encrypts the traffic, changes its destination IP to the [WARP ingress IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip), and sends it back to the router. The router will now forward this encrypted traffic to Cloudflare.

Note

Ensure that your routing rules do not forward the [WARP ingress IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip) back to the WARP Connector.

#### Configure DNS resolver on router

To forward DNS traffic from the subnet to Cloudflare Gateway, your router should point DNS queries to the shared IP addresses for the Gateway DNS resolver:

* `172.64.36.1`
* `172.64.36.2`

You will also need to [add an IP route](#add-ip-route-to-router) which routes these Gateway resolver IPs to the WARP Connector host machine.

### Option 3: Intermediate gateway

If you do not have access to the router, you will need to configure each device on the subnet to egress through the WARP Connector machine instead of the default gateway.

![Intermediate gateway routing configuration](https://developers.cloudflare.com/_astro/intermediate-gateway.RihbfwSx_Zkwag8.webp) 

#### Add IP route to devices

You can configure all traffic on a device to egress through WARP Connector with its local source IP. All traffic will be filtered by your Gateway network policies.

* [ Linux ](#tab-panel-3526)
* [ macOS ](#tab-panel-3527)
* [ Windows ](#tab-panel-3528)

Terminal window

```

sudo ip route add default via <WARP-CONNECTOR-IP> dev eth0 metric 101


```

Ensure that the `metric` value is lower than other default gateways.

Terminal window

```

sudo route -n change default <WARP-CONNECTOR-IP> -interface en0


```

Terminal window

```

route /p add 0.0.0.0 mask 0.0.0.0 <WARP-CONNECTOR-IP> metric 101


```

Ensure that the `metric` value is lower than other default gateways.

To validate subnet routing, [check your routing table](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#routing-table) and ensure that traffic is routing through the `CloudflareWARP` [virtual interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface).

#### Configure DNS resolver on devices

To filter DNS traffic with Cloudflare Gateway, the DNS resolver on your device should point to the shared IP addresses for the Gateway DNS resolver IPs:

* `172.64.36.1`
* `172.64.36.2`

You will also need to [add an IP route](#add-ip-route-to-devices) which routes these Gateway resolver IPs to the WARP Connector host machine.

## 4\. Test the WARP Connector

You can now test if traffic from your subnet routes through Cloudflare. For example,

1. On the `10.0.0.2` device, run `curl --ipv4 www.google.com`.
2. Check your [Gateway DNS logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) for queries from `warp_connector@<your-team-name>.cloudflareaccess.com`. Logs may take a few minutes to populate.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
        device1["Device
        10.0.0.2"]--Request-->router1["WARP Connector
        10.0.0.1"]
      end
      router1-->C((Cloudflare))-->I{Internet}

## Footnotes

1. Check the [system requirements](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux). Package dependencies are the following: `curl`, `gpg`, `iptables`, `iptables-persistent`, `lsb-core`, and `sudo`.  
[↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/","name":"WARP Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/site-to-internet/","name":"Connect private network to Internet"}}]}
```
