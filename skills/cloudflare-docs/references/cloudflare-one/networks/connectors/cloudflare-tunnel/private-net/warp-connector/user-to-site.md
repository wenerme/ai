---
title: Connect private network to Cloudflare One Clients
description: This guide covers how to connect Cloudflare One Client user devices to a private network behind WARP Connector. In this example, we will create a WARP Connector for subnet 10.0.0.0/24 and install it on 10.0.0.1.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Private networks ](https://developers.cloudflare.com/search/?tags=Private%20networks) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/user-to-site.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect private network to Cloudflare One Clients

This guide covers how to connect Cloudflare One Client user devices to a private network behind WARP Connector. In this example, we will create a WARP Connector for subnet `10.0.0.0/24` and install it on `10.0.0.1`.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
				router1["WARP Connector
        10.0.0.1"]--> device1["Device
        10.0.0.2"]
      router1["WARP Connector
        10.0.0.1"]
      end
      W[Cloudflare One Client]-->C((Cloudflare))-->router1

## Prerequisites

* A Linux host [1](#user-content-fn-1) on the subnet.
* For WARP Connector to connect to Cloudflare services, your firewall should allow inbound/outbound traffic for the [WARP IP addresses, ports, and domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
* For Cloudflare One Clients to connect to your subnet, your firewall should allow inbound traffic from your [device IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/).

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

## 3\. Route device IPs through Cloudflare

Cloudflare One Clients and WARP Connectors are accessed using their [device IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/). Therefore, traffic to your device IPs must route through Cloudflare on both the WARP Connector host and Cloudflare One Client devices.

1. In your WARP Connector device profile, go to [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).
2. In your device profile, configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that traffic to your [device IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/) goes through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode). For example, if your devices use the default `100.96.0.0/12` range:  
   * **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.  
   * **Include mode**: Add `100.96.0.0/12` to your Split Tunnels list.
3. Repeat the previous steps for all Cloudflare One Client device profiles.

## 4\. Route traffic from subnet to WARP Connector

Depending on where you installed the WARP Connector, you may need to configure other devices on the subnet to route requests through WARP Connector.

### Option 1: Default gateway

If you installed WARP Connector on your router, no additional configuration is necessary. All traffic will use the router as the default gateway.

![Default gateway routing configuration](https://developers.cloudflare.com/_astro/default-gateway.BVYB18Ze_ZeUgg6.webp) 

### Option 2: Alternate gateway

If you have access to the router but installed WARP Connector on another machine, you can configure the router to forward traffic to the WARP Connector. This typically involves adding a static route for the destination IPs that you want to connect to through Cloudflare. Refer to your router documentation for specific instructions on how to add an IP route.

![Alternate gateway routing configuration](https://developers.cloudflare.com/_astro/alternate-gateway.qFF4NOVp_XNrmp.webp) 

#### Add IP route to router

`100.96.0.0/12` is the default CIDR for all user devices running the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). On your router, add a rule that routes the destination IP `100.96.0.0/12` to the WARP Connector host machine (`10.0.0.100`).

When a device on the subnet sends a request, the router will first redirect the traffic to the WARP Connector host. WARP Connector encrypts the traffic, changes its destination IP to the [WARP ingress IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip), and sends it back to the router. The router will now forward this encrypted traffic to Cloudflare.

Note

Ensure that your routing rules do not forward the [WARP ingress IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip) back to the WARP Connector.

### Option 3: Intermediate gateway

If you do not have access to the router, you will need to configure each device on the subnet to egress through the WARP Connector machine instead of the default gateway.

![Intermediate gateway routing configuration](https://developers.cloudflare.com/_astro/intermediate-gateway.RihbfwSx_Zkwag8.webp) 

#### Add IP route to devices

To route all CGNAT IP traffic through WARP Connector:

* [ Linux ](#tab-panel-3521)
* [ macOS ](#tab-panel-3522)
* [ Windows ](#tab-panel-3523)

Terminal window

```

sudo ip route add 100.96.0.0/12 via <WARP-CONNECTOR-IP> dev eth0


```

Terminal window

```

sudo route -n add -net 100.96.0.0/12 <WARP-CONNECTOR-IP>


```

Terminal window

```

route /p add 100.96.0.0/12 mask 255.255.255.255 <WARP-CONNECTOR-IP>


```

To validate subnet routing, [check your routing table](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#routing-table) and ensure that traffic is routing through the `CloudflareWARP` [virtual interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface).

## 5\. Test the WARP Connector

You can now send a request from a Cloudflare One Client user device to your subnet. To test connections to the WARP Connector host, on the Cloudflare One Client device run `ping 10.0.0.1`. To connect to a device behind WARP connector, run `ping 10.0.0.2`.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
				router1["WARP Connector
        10.0.0.1"]--> device1["Device
        10.0.0.2"]
      router1["WARP Connector
        10.0.0.1"]
      end
      W[Cloudflare One Client]--ping 10.0.0.2 -->C((Cloudflare))-->router1

## Footnotes

1. Check the [system requirements](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux). Package dependencies are the following: `curl`, `gpg`, `iptables`, `iptables-persistent`, `lsb-core`, and `sudo`.  
[↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/","name":"WARP Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/user-to-site/","name":"Connect private network to Cloudflare One Clients"}}]}
```
