---
title: Connect two or more private networks
description: This guide covers how to connect two independent subnets with WARP Connector. Each subnet must run its own WARP Connector on a Linux host. Installing on your router is the simplest setup, but if you do not have access to the router, you may choose any other machine on the subnet.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Private networks ](https://developers.cloudflare.com/search/?tags=Private%20networks) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/site-to-site.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect two or more private networks

This guide covers how to connect two independent subnets with WARP Connector. Each subnet must run its own WARP Connector on a Linux host. Installing on your router is the simplest setup, but if you do not have access to the router, you may choose any other machine on the subnet.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
      router1["WARP Connector #1
        10.0.0.1"]
      end
      subgraph subnet2[Subnet 192.168.1.0/24]
        router2["WARP Connector #2
        192.168.1.97"]
      end
      router1<-->C((Cloudflare))<-->router2

In this example, we will create a WARP Connector for subnet `10.0.0.0/24` and install it on `10.0.0.1`. We will then create a second WARP Connector for subnet `192.168.1.0/24` and install it on `192.168.1.97`.

## Prerequisites

* A Linux host [1](#user-content-fn-1) on each subnet.
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

## 3\. Route traffic between WARP Connector and Cloudflare

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Networks** \> **Routes**.
2. Select **Add a route**.
3. In **CIDR**, enter the private IPv4 address range that you wish to route through this WARP Connector (for example, `10.0.0.0/24`). WARP Connector does not currently support IPv6 routes.  
Note  
If you do not already have a private network range, you can choose a subnet from one of these [pre-defined CIDRs ↗](https://datatracker.ietf.org/doc/html/rfc1918#section-3).
4. For **Tunnel**, select the name of your WARP Connector (_Subnet-10.0.0.0/24_).
5. Select **Create**.
6. In your WARP Connector device profile, [configure Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that traffic to your private network CIDR (`10.0.0.0/24`) routes through the WARP tunnel. For example, if you are using **Exclude** mode, delete `10.0.0.0/8` from Split Tunnels and re-add the following IPs: `10.0.1.0/24`, `10.0.2.0/23`, `10.0.4.0/22`, `10.0.8.0/21`, `10.0.16.0/20`, `10.0.32.0/19`, `10.0.64.0/18`, `10.0.128.0/17`, `10.1.0.0/16`, `10.2.0.0/15`, `10.4.0.0/14`, `10.8.0.0/13`, `10.16.0.0/12`, `10.32.0.0/11`, `10.64.0.0/10`, `10.128.0.0/9`

The WARP Connector will now forward inbound requests to devices on the subnet.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
      router1["WARP Connector #1
        10.0.0.1"]
			device["Device
        10.0.0.2"]
      end

      C((Cloudflare))--Requests to 10.0.0.2--> router1 --> device

### DNS filtering

If you would like to filter private DNS queries using Cloudflare Gateway, check [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) and ensure that the following IPs route through WARP Connector:

* Internal DNS resolver IP
* Initial resolved IP CGNAT range:  
   * **IPv4**: `100.80.0.0/16`  
   * **IPv6**: `2606:4700:0cf1:4000::/64`

When you resolve DNS queries from WARP Connector through Gateway, Gateway will log the queries with the private source IP. You can use the private source IP to create [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for queries intended for [internal DNS records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns).

## 4\. Route traffic from subnet to WARP Connector

The WARP Connector host will automatically forward DNS and network traffic to Cloudflare. Depending on where you installed the WARP Connector, you may need to configure other devices on the subnet to route outbound requests through WARP Connector.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
      router1["WARP Connector #1
        10.0.0.1"]
			device["Device
        10.0.0.2"]
      end

      device --Requests to
			192.168.1.0/24 --> router1 --> C((Cloudflare))

### Option 1: Default gateway

If you installed WARP Connector on your router, no additional configuration is necessary. All traffic will use the router as the default gateway.

![Default gateway routing configuration](https://developers.cloudflare.com/_astro/default-gateway.BVYB18Ze_ZeUgg6.webp) 

### Option 2: Alternate gateway

If you have access to the router but installed WARP Connector on another machine, you can configure the router to forward traffic to the WARP Connector. This typically involves adding a static route for the destination IPs that you want to connect to through Cloudflare. Refer to your router documentation for specific instructions on how to add an IP route.

![Alternate gateway routing configuration](https://developers.cloudflare.com/_astro/alternate-gateway.qFF4NOVp_XNrmp.webp) 

#### Add IP route to router

For example, for devices on subnet `10.0.0.0/24` to reach applications behind subnet `192.168.1.0/24`, add a rule on the router that routes `192.168.1.0/24` to the WARP Connector host machine (`10.0.0.100`).

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

* [ Linux ](#tab-panel-3516)
* [ macOS ](#tab-panel-3517)
* [ Windows ](#tab-panel-3518)

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

Alternatively, you can configure only certain routes to egress through WARP Connector. For example, you may only want to filter traffic destined to internal applications and devices, but allow public Internet traffic to bypass Cloudflare.

* [ Linux ](#tab-panel-3513)
* [ macOS ](#tab-panel-3514)
* [ Windows ](#tab-panel-3515)

Terminal window

```

sudo ip route add <DESTINATION-IP> via <WARP-CONNECTOR-IP> dev eth0


```

Terminal window

```

sudo route -n add -net <DESTINATION-IP> <WARP-CONNECTOR-IP>


```

Terminal window

```

route /p add <DESTINATION-IP> mask 255.255.255.255 <WARP-CONNECTOR-IP>


```

To validate subnet routing, [check your routing table](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#routing-table) and ensure that traffic is routing through the `CloudflareWARP` [virtual interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface).

#### Configure DNS resolver on devices

To filter DNS traffic with Cloudflare Gateway, the DNS resolver on your device should point to the shared IP addresses for the Gateway DNS resolver IPs:

* `172.64.36.1`
* `172.64.36.2`

You will also need to [add an IP route](#add-ip-route-to-devices) which routes these Gateway resolver IPs to the WARP Connector host machine.

## 5\. Install another WARP Connector

Repeat steps 1, 3, and 4 above to install an additional WARP Connector on subnet `192.168.1.0/24`. The device profile created in Step 2 will apply to all WARP Connectors.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
      router1["WARP Connector #1
        10.0.0.1"]
      end
      subgraph subnet2[Subnet 192.168.1.0/24]
        router2["WARP Connector #2
        192.168.1.97"]
      end
      router1<-->C((Cloudflare))<-->router2

## 6\. Test the WARP Connector

You can now test the connection between the two subnets. To test connections to the WARP Connector host, on the `10.0.0.2` device run `ping 192.168.1.97`. To connect to a device behind WARP connector, run `ping 192.168.1.100`.

    flowchart LR
      subgraph subnet1[Subnet 10.0.0.0/24]
        device1["Device
        10.0.0.2"]--"ping
        192.168.1.100"-->router1["WARP Connector #1
        10.0.0.1"]
      end
      subgraph subnet2[Subnet 192.168.1.0/24]
        router2["WARP Connector #2
        192.168.1.97"]-->device2["Device
        192.168.1.100"]
      end
      router1-->C((Cloudflare))-->router2

Note

If you are testing with curl using private hostnames, add the `--ipv4` flag to your curl commands.

Your [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/gateway-logs/) will show traffic associated with the email `warp_connector@<your-team-name>.cloudflareaccess.com`.

## Footnotes

1. Check the [system requirements](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux). Package dependencies are the following: `curl`, `gpg`, `iptables`, `iptables-persistent`, `lsb-core`, and `sudo`.  
[↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/","name":"WARP Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/site-to-site/","name":"Connect two or more private networks"}}]}
```
