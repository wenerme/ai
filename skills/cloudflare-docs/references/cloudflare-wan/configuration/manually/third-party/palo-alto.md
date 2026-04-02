---
title: Palo Alto Networks NGFW
description: This tutorial includes the steps required to configure IPsec tunnels to connect a Palo Alto Networks Next-Generation Firewall (NGFW) to Cloudflare WAN (formerly Magic WAN) through a Layer 3 deployment.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/manually/third-party/palo-alto.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Palo Alto Networks NGFW

This tutorial includes the steps required to configure IPsec tunnels to connect a Palo Alto Networks Next-Generation Firewall (NGFW) to Cloudflare WAN (formerly Magic WAN) through a Layer 3 deployment.

## Software version tested

* PAN-OS 9.1.14-h4

## Use Cases

* **Cloudflare WAN**: Connecting two or more locations with [RFC-1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) private non-routable address space.
* **Cloudflare WAN with Cloudflare Zero Trust (Gateway egress)**: Same as Cloudflare WAN, with the addition of outbound Internet access from Cloudflare WAN protected sites egressing the Cloudflare edge network.

## Prerequisites

This tutorial assumes you have a standalone NGFW with two network interfaces:

* One in a trust security zone (`Trust_L3_Zone`) with an [RFC-1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) non-Internet routable IP address (internal network);
* And the other in an untrust security zone (`Untrust_L3_Zone`) with a legally routable IP address (Internet facing).

Additionally, there must be a default gateway set on the Virtual Router (default) pointing to the router of your Internet service provider(s).

## Environment

The following IP addresses are used throughout this tutorial. Any legally routable IP addresses have been replaced with IPv4 Address Blocks Reserved for Documentation ([RFC5737 ↗](https://datatracker.ietf.org/doc/html/rfc5737)) addresses within the `203.0.113.0/24` subnet.

| Description                            | Address                          | Address                    |
| -------------------------------------- | -------------------------------- | -------------------------- |
| NGFW external interface                | 203.0.113.254/24                 |                            |
| NGFW internal interface                | 10.1.100.254/24                  |                            |
| Local trust subnet (LAN)               | 10.1.100.0/24                    |                            |
| NGFW tunnel interface 01               | 10.252.2.26/31 (Cloudflare side) | 10.252.2.27/31 (NGFW side) |
| NGFW tunnel interface 02               | 10.252.2.28/31 (Cloudflare side) | 10.252.2.29/31 (NGFW side) |
| Cloudflare WAN anycast IP              | 162.159.66.164                   | 172.64.242.164             |
| Cloudflare WAN health check anycast IP | 172.64.240.253                   | 172.64.240.254             |
| VLAN0010 - remote Cloudflare WAN site  | 10.1.10.0/24                     |                            |
| VLAN0020 - remote Cloudflare WAN site  | 10.1.20.0/24                     |                            |

## Cloudflare WAN

### IPsec tunnels

Use the Cloudflare dashboard or API to [configure two IPsec Tunnels](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/#add-tunnels). The settings mentioned in [Add IPsec tunnels](#add-ipsec-tunnels) below are used for the IPsec tunnels referenced throughout the remainder of this guide.

These are the target IP addresses for bidirectional tunnel health checks:

* `172.64.240.253`: Use with the primary IPsec tunnel.
* `172.64.240.254`: Use with the secondary IPsec tunnel.

Warning

You need to [configure bidirectional health checks](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/#add-tunnels) with Cloudflare WAN. The settings must include custom target IP addresses for each tunnel. Additionally, Cloudflare recommends that you lower the rate at which health check probes are sent.

#### Add IPsec tunnels

1. Follow the [Add tunnels](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/) instructions to create the required IPsec tunnels with the following options:  
   * **Tunnel name**: `SFO_IPSEC_TUN01`  
   * **Interface address**: `10.252.2.96/31`  
   * **Customer endpoint**: `203.0.113.254`  
   * **Cloudflare endpoint**: `162.159.66.164`  
   * **Health check rate**: _Low_ (default value is _Medium_)  
   * **Health check type**: _Reply_  
   * **Health check target**: _Custom_ (default is _Default_)  
   * **Target address**: `172.64.240.253`
2. Select **Add pre-shared key later** \> **Add tunnels**.
3. Repeat the process to create a second IPsec tunnel with the following options:  
   * **Tunnel name**: `SFO_IPSEC_TUN02`  
   * **Interface address**: `10.252.2.98/31`  
   * **Customer endpoint**: `203.0.113.254`  
   * **Cloudflare endpoint**: `172.64.242.164`  
   * **Health check rate**: _Low_ (default value is _Medium_)  
   * **Health check type**: _Reply_  
   * **Health check target**: _Custom_ (default is _Default_)  
   * **Target address**: `172.64.240.254`

#### Generate Pre-shared keys

When you create IPsec tunnels with the option **Add pre-shared key later**, the Cloudflare dashboard will show you a warning indicator:

![IPsec Tunnels - No PSK](https://developers.cloudflare.com/_astro/03_magic_ipsec_tun_no_psk.BtN-GBSa_2lxHtq.webp) 
1. Select **Edit** to edit the properties of each tunnel.
2. Select **Generate a new pre-shared key** \> **Update and generate pre-shared key**.![Generate a new pre-shared key for each of your IPsec tunnels](https://developers.cloudflare.com/_astro/04_magic_ipsec_tun_01_gen_psk.DmjWjXn7_2fx8p8.webp)
3. Copy the pre-shared key value for each of your IPsec tunnels, and save these values somewhere safe. Then, select **Done**.![Take note of your pre-shared key, and keep it in a safe place](https://developers.cloudflare.com/_astro/05_magic_ipsec_tun_01_show_psk.hKhA9tvM_1qBLn8.webp)

#### IPsec identifier - FQDN (Fully Qualified Domain Name)

After creating your IPsec tunnels, the Cloudflare dashboard will list them under the **Tunnels** tab. Select the arrow (**\>**) on each of your IPsec tunnel to collect the FQDN ID value from each of them. The FQDN ID value will be required when configuring IKE Phase 1 on the Palo Alto Networks Next-Generation Firewall.

![Take note of the FQDN ID value for each of your IPsec tunnels](https://developers.cloudflare.com/_astro/08_magic_ipsec_tun_01_fqdn.C7qdzNJI_1AvSsS.webp) 

### Static routes

If you refer to the [Environment section](#environment), you will notice there is one subnet within `Trust_L3_Zone`: `10.1.100.0/24`.

Create a [static route](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-routes/#create-a-static-route) for each of the two IPsec tunnels configured in the previous section, with the following settings (settings not mentioned here can be left with their default settings):

#### Tunnel 01

* **Description**: `SFO_VLAN100_01`
* **Prefix**: `10.1.100.0/24`
* **Tunnel/Next hop**: `SFO_IPSEC_TUN01`

#### Tunnel 02

* **Description**: `SFO_VLAN100_02`
* **Prefix**: `10.1.100.0/24`
* **Tunnel/Next hop**: `SFO_IPSEC_TUN02`
![Add static routes for each of the IPsec tunnels you created in the previous step](https://developers.cloudflare.com/_astro/10_magic_ipsec_static_routes.CJCRbqXL_KPXqA.webp) 

## Palo Alto Networks Next-Generation Firewall

### Tags

While [Tags are optional ↗](https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/policy/use-tags-to-group-and-visually-distinguish-objects/create-and-apply-tags), they can greatly improve object and policy visibility. The following color scheme was implemented in this configuration:

| Tag                  | Color  |
| -------------------- | ------ |
| Trust\_L3\_Zone      | Green  |
| Untrust\_L3\_Zone    | Red    |
| Cloudflare\_L3\_Zone | Orange |

Use the Palo Alto Networks Next-Generation Firewall command line to set the tags:

Terminal window

```

set tag Trust_L3_Zone color color2

set tag Untrust_L3_Zone color color1

set tag Cloudflare_L3_Zone color color6


```

### Objects

The use of **Address** and **Address Group** objects wherever possible is strongly encouraged. These objects ensure that configuration elements that reference them are defined accurately and consistently.

Any configuration changes should be applied to the objects and will automatically be applied throughout the remainder of the configuration.

#### Address Objects

Note

Any objects without a netmask specified are `/32`.

| Name                             | Type       | Address          | Tags                 |
| -------------------------------- | ---------- | ---------------- | -------------------- |
| CF\_Health\_Check\_Anycast\_01   | IP Netmask | 172.64.240.253   | Cloudflare\_L3\_Zone |
| CF\_Health\_Check\_Anycast\_02   | IP Netmask | 172.64.240.254   | Cloudflare\_L3\_Zone |
| CF\_Magic\_WAN\_Anycast\_01      | IP Netmask | 162.159.66.164   | Cloudflare\_L3\_Zone |
| CF\_Magic\_WAN\_Anycast\_02      | IP Netmask | 172.64.242.164   | Cloudflare\_L3\_Zone |
| CF\_MWAN\_IPsec\_VTI\_01\_Local  | IP Netmask | 10.252.2.27/31   | Cloudflare\_L3\_Zone |
| CF\_MWAN\_IPsec\_VTI\_01\_Remote | IP Netmask | 10.252.2.26      | Cloudflare\_L3\_Zone |
| CF\_MWAN\_IPsec\_VTI\_02\_Local  | IP Netmask | 10.252.2.29/31   | Cloudflare\_L3\_Zone |
| CF\_MWAN\_IPsec\_VTI\_02\_Remote | IP Netmask | 10.252.2.28      | Cloudflare\_L3\_Zone |
| CF\_WARP\_Client\_Prefix         | IP Netmask | 100.96.0.0/12    | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_01             | IP Netmask | 173.245.48.0/20  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_02             | IP Netmask | 103.21.244.0/22  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_03             | IP Netmask | 103.22.200.0/22  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_04             | IP Netmask | 103.31.4.0/22    | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_05             | IP Netmask | 141.101.64.0/18  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_06             | IP Netmask | 108.162.192.0/18 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_07             | IP Netmask | 190.93.240.0/20  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_08             | IP Netmask | 188.114.96.0/20  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_09             | IP Netmask | 197.234.240.0/22 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_10             | IP Netmask | 198.41.128.0/17  | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_11             | IP Netmask | 162.158.0.0/15   | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_12             | IP Netmask | 104.16.0.0/13    | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_13             | IP Netmask | 104.24.0.0/14    | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_14             | IP Netmask | 172.64.0.0/13    | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_15             | IP Netmask | 131.0.72.0/22    | Cloudflare\_L3\_Zone |
| Internet\_L3\_203-0-113-254--24  | IP Netmask | 203.0.113.254/24 | Untrust\_L3\_Zone    |
| VLAN0010\_10-1-10-0--24          | IP Netmask | 10.1.10.0/24     | Cloudflare\_L3\_Zone |
| VLAN0020\_10-1-20-0--24          | IP Netmask | 10.1.20.0/24     | Cloudflare\_L3\_Zone |
| VLAN0100\_10-1-100-0--24         | IP Netmask | 10.1.100.0/24    | Trust\_L3\_Zone      |
| VLAN0100\_L3\_10-1-100-254--24   | IP Netmask | 10.1.10.254/24   | Trust\_L3\_Zone      |

Use the Palo Alto Networks Next-Generation Firewall command line to set the objects:

Terminal window

```

set address CF_Health_Check_Anycast_01 ip-netmask 172.64.240.253

set address CF_Health_Check_Anycast_01 tag Cloudflare_L3_Zone

set address CF_Health_Check_Anycast_02 ip-netmask 172.64.240.254

set address CF_Health_Check_Anycast_02 tag Cloudflare_L3_Zone

set address CF_Magic_WAN_Anycast_01 ip-netmask 162.159.66.164

set address CF_Magic_WAN_Anycast_01 tag Cloudflare_L3_Zone

set address CF_Magic_WAN_Anycast_02 ip-netmask 172.64.242.164

set address CF_Magic_WAN_Anycast_02 tag Cloudflare_L3_Zone

set address CF_MWAN_IPsec_VTI_01_Local ip-netmask 10.252.2.27/31

set address CF_MWAN_IPsec_VTI_01_Local tag Cloudflare_L3_Zone

set address CF_MWAN_IPsec_VTI_02_Local ip-netmask 10.252.2.29/31

set address CF_MWAN_IPsec_VTI_02_Local tag Cloudflare_L3_Zone

set address CF_MWAN_IPsec_VTI_01_Remote ip-netmask 10.252.2.26

set address CF_MWAN_IPsec_VTI_01_Remote tag Cloudflare_L3_Zone

set address CF_MWAN_IPsec_VTI_02_Remote ip-netmask 10.252.2.28

set address CF_MWAN_IPsec_VTI_02_Remote tag Cloudflare_L3_Zone

set address CF_WARP_Client_Prefix ip-netmask 100.96.0.0/12

set address CF_WARP_Client_Prefix tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_01 ip-netmask 173.245.48.0/20

set address Cloudflare_IPv4_01 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_02 ip-netmask 103.21.244.0/22

set address Cloudflare_IPv4_02 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_03 ip-netmask 103.22.200.0/22

set address Cloudflare_IPv4_03 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_04 ip-netmask 103.31.4.0/22

set address Cloudflare_IPv4_04 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_05 ip-netmask 141.101.64.0/18

set address Cloudflare_IPv4_05 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_06 ip-netmask 108.162.192.0/18

set address Cloudflare_IPv4_06 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_07 ip-netmask 190.93.240.0/20

set address Cloudflare_IPv4_07 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_08 ip-netmask 188.114.96.0/20

set address Cloudflare_IPv4_08 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_09 ip-netmask 197.234.240.0/22

set address Cloudflare_IPv4_09 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_10 ip-netmask 198.41.128.0/17

set address Cloudflare_IPv4_10 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_11 ip-netmask 162.158.0.0/15

set address Cloudflare_IPv4_11 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_12 ip-netmask 104.16.0.0/13

set address Cloudflare_IPv4_12 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_13 ip-netmask 104.24.0.0/14

set address Cloudflare_IPv4_13 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_14 ip-netmask 172.64.0.0/13

set address Cloudflare_IPv4_14 tag Cloudflare_L3_Zone

set address Cloudflare_IPv4_15 ip-netmask 131.0.72.0/22

set address Cloudflare_IPv4_15 tag Cloudflare_L3_Zone

set address Internet_L3_203-0-113-254--24 ip-netmask 203.0.113.254/24

set address Internet_L3_203-0-113-254--24 tag Untrust_L3_Zone

set address VLAN0010_10-1-10-0--24 ip-netmask 10.1.10.0/24

set address VLAN0010_10-1-10-0--24 tag Trust_L3_Zone

set address VLAN0020_10-1-20-0--24 ip-netmask 10.1.20.0/24

set address VLAN0020_10-1-20-0--24 tag Trust_L3_Zone

set address VLAN0100_10-1-100-0--24 ip-netmask 10.1.100.0/24

set address VLAN0100_10-1-100-0--24 tag Trust_L3_Zone

set address VLAN0100_L3_10-1-100-254--24 ip-netmask 10.1.100.254/24

set address VLAN0100_L3_10-1-100-254--24 tag Trust_L3_Zone


```

#### Address Group object

The **Address Group** object used in this configuration provides a single object representation of the entire Cloudflare IPv4 public address space.

| Name                          | Type   | Addresses            | Tags                 |
| ----------------------------- | ------ | -------------------- | -------------------- |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_01 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_02 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_03 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_04 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_05 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_06 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_07 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_08 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_09 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_10 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_11 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_12 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_13 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_14 | Cloudflare\_L3\_Zone |
| Cloudflare\_IPv4\_Static\_Grp | Static | Cloudflare\_IPv4\_15 | Cloudflare\_L3\_Zone |

Use the Palo Alto Networks Next-Generation Firewall command line to set the address group object:

Terminal window

```

set address-group Cloudflare_IPv4_Static_Grp static [ Cloudflare_IPv4_01 Cloudflare_IPv4_02 Cloudflare_IPv4_03 Cloudflare_IPv4_04 Cloudflare_IPv4_05 Cloudflare_IPv4_06 Cloudflare_IPv4_07 Cloudflare_IPv4_08 Cloudflare_IPv4_09 Cloudflare_IPv4_10 Cloudflare_IPv4_11 Cloudflare_IPv4_12 Cloudflare_IPv4_13 Cloudflare_IPv4_14 Cloudflare_IPv4_15 ]

set address-group Cloudflare_IPv4_Static_Grp tag Cloudflare_L3_Zone


```

Note

While not covered by this tutorial, it is also possible to use External Dynamic Lists to automatically obtain the most current list of Cloudflare IPv4 addresses by periodically polling [https://www.cloudflare.com/ips-v4 ↗](https://www.cloudflare.com/ips-v4).

### Interface Mgmt - Network Profiles

**Interface Mgmt** profiles control what traffic is allowed _to_ the firewall, as opposed to _through_ the firewall.

Adding an Interface Mgmt profile to the tunnel interfaces will provide the ability to ping the Virtual Tunnel Interface on your firewall(s).

#### Set up via dashboard

You can define an Interface Management Profile to allow ping from the dashboard:

1. Go to **Network Profiles** \> **Interface Mgmt**.
2. In the **Network** tab select **Add**.
3. Create profiles to allow Ping, and in the **Network Services** group select **Ping**.
![Interface Mgmt Profile](https://developers.cloudflare.com/_astro/01_int_mgmt_prof.YUAT08zt_Z7N5GI.webp) ![Interface Mgmt Profile](https://developers.cloudflare.com/_astro/02_int_mgmt_prof.Ciz0_Zwm_14ryxx.webp) 

#### Set up via command line

You can also use the command line to allow ping:

Terminal window

```

set network profiles interface-management-profile Allow_Ping userid-service no

set network profiles interface-management-profile Allow_Ping ping yes


```

### Network Interfaces

Palo Alto Networks Next-Generation Firewall (NGFW) is configured with two Ethernet interfaces:

| Interface   | Interface Type | IP Address       | Virtual Router |
| ----------- | -------------- | ---------------- | -------------- |
| ethernet1/1 | Layer3         | 10.1.100.254/24  | default        |
| ethernet1/2 | Layer3         | 203.0.113.254/24 | default        |

#### Set up via dashboard

Follow the guidance on the images below to set up the Ethernet interfaces through the dashboard.

##### ethernet1/1: `Trust_L3_Zone`

| Name             | Option                                         | Value            |
| ---------------- | ---------------------------------------------- | ---------------- |
| **ethernet1/1**  | Interface Type                                 | _Layer3_         |
| Netflow Profile  | _None_                                         |                  |
| **Config tab**   | Virtual Router                                 | _default_        |
| Security Zone    | _Trust\_L3\_Zone_                              |                  |
| **IPv4 tab**     | Type                                           | **Static**       |
| IP               | VLAN0100\_L3\_10-1-100-254--24  address object |                  |
| **Advanced tab** | Management Profile                             | _Mgmt\_Services_ |

![Set up ethernet1/1 on the dashboard](https://developers.cloudflare.com/_astro/01_ethernet-1-1_page1.1VA7M8cP_Z154zOT.webp)![Set up ethernet1/1 on the dashboard](https://developers.cloudflare.com/_astro/02_ethernet-1-1_page2.7jxa3xfp_Z1r8zz8.webp)![Set up ethernet1/1 on the dashboard](https://developers.cloudflare.com/_astro/03_ethernet-1-1_page3.CokR1vvm_Z1HtrOu.webp) 

##### ethernet1/2: `Untrust_L3_Zone`

| Name                | Option                                          | Value         |
| ------------------- | ----------------------------------------------- | ------------- |
| **ethernet1/2**     | Interface Type                                  | _Layer3_      |
| Netflow Profile     | _None_                                          |               |
| **Config tab**      | Virtual Router                                  | _default_     |
| Security Zone       | _Untrust\_L3\_Zone_                             |               |
| **IPv4 tab**        | Type                                            | **Static**    |
| IP                  | Internet\_L3\_203-0-113-254--24  address object |               |
| **Advanced tab**    | Management Profile                              | _Allow\_Ping_ |
| MTU                 | 576 - 1500                                      |               |
| Adjust TCP MSS      | **Enable**                                      |               |
| IPv4 MSS Adjustment | 64                                              |               |

![Set up ethernet1/2 on the dashboard](https://developers.cloudflare.com/_astro/04_ethernet-1-2_page1.By0-oLRS_Z1UB6d4.webp)![Set up ethernet1/2 on the dashboard](https://developers.cloudflare.com/_astro/05_ethernet-1-2_page2.BUQ0TYrt_Zft4wI.webp)![Set up ethernet1/2 on the dashboard](https://developers.cloudflare.com/_astro/06_ethernet-1-2_page3.lN-Y3jvL_Z2tjp9s.webp) 

After setting up your Ethernet interfaces, they should show up on the overview page:

![Ethernet Interfaces - Overview](https://developers.cloudflare.com/_astro/07_ethernet_interfaces_overview.B03fT-27_Z779Wx.webp) 

#### Set up via command line

You can also use the command line to set up the Ethernet interfaces.

Terminal window

```

set network interface ethernet ethernet1/1 layer3 ndp-proxy enabled no

set network interface ethernet ethernet1/1 layer3 lldp enable no

set network interface ethernet ethernet1/1 layer3 ip VLAN0100_L3_10-1-100-254--24

set network interface ethernet ethernet1/1 layer3 interface-management-profile Mgmt_Services

set network interface ethernet ethernet1/2 layer3 ndp-proxy enabled no

set network interface ethernet ethernet1/2 layer3 lldp enable no

set network interface ethernet ethernet1/2 layer3 ip Internet_L3_203-0-113-254--24

set network interface ethernet ethernet1/2 layer3 interface-management-profile Allow_Ping

set network interface ethernet ethernet1/2 layer3 adjust-tcp-mss enable yes

set network interface ethernet ethernet1/2 layer3 adjust-tcp-mss ipv4-mss-adjustment 64


```

### Tunnel interfaces

Establishing IPsec tunnels to Cloudflare WAN requires two tunnel interfaces - one to each of the two Cloudflare anycast IP addresses. You also have to ensure that `Allow_Ping` is bound to both tunnel adapters in **Advanced** \> **Management Profile**.

Review the images below for more information.

Note

MTU is set to `1450`. This value may need to be adjusted for optimal performance on your network.

#### Set up via dashboard

##### tunnel.1 - `Cloudflare_L3_Zone`

| Name             | Option                 | Value                                           |
| ---------------- | ---------------------- | ----------------------------------------------- |
| **tunnel.1**     | Netflow Profile        | _None_                                          |
| **Config tab**   | Virtual Router         | _default_                                       |
| Security Zone    | _Cloudflare\_L3\_Zone_ |                                                 |
| **IPv4 tab**     | IP                     | CF\_MWAN\_IPsec\_VTI\_01\_Local  address object |
| **Advanced tab** | Management Profile     | _Allow\_Ping_                                   |
| MTU              | 1450                   |                                                 |

![Set up tunnel 1](https://developers.cloudflare.com/_astro/01_tunnel_1_page1.CeB5lZ8G_yQXPK.webp)![Set up tunnel 1](https://developers.cloudflare.com/_astro/02_tunnel_1_page2.DTmX2oQG_Z2ksJCd.webp)![Set up tunnel 1](https://developers.cloudflare.com/_astro/03_tunnel_1_page3.B-KN29cx_Z2ihYDg.webp) 

_Note: Labels in these images may reflect previous product names._

##### tunnel.2 - `Cloudflare_L3_Zone`

| Name             | Option                 | Value                                           |
| ---------------- | ---------------------- | ----------------------------------------------- |
| **tunnel.2**     | Netflow Profile        | _None_                                          |
| **Config tab**   | Virtual Router         | _default_                                       |
| Security Zone    | _Cloudflare\_L3\_Zone_ |                                                 |
| **IPv4 tab**     | IP                     | CF\_MWAN\_IPsec\_VTI\_02\_Local  address object |
| **Advanced tab** | Management Profile     | _Allow\_Ping_                                   |
| MTU              | 1450                   |                                                 |

![Set up tunnel 2](https://developers.cloudflare.com/_astro/04_tunnel_2_page1.ChXQsll2_1WrarA.webp)![Set up tunnel 2](https://developers.cloudflare.com/_astro/05_tunnel_2_page2.5MNYKPA6_h3HVh.webp)![Set up tunnel 2](https://developers.cloudflare.com/_astro/06_tunnel_2_page3.Dv0L63U8_oD2il.webp) 

_Note: Labels in these images may reflect previous product names._

After setting up your Tunnel interfaces, they should show up on the overview page:

![Tunnel Interfaces - Overview](https://developers.cloudflare.com/_astro/07_tunnel_interfaces_overview.CNcfvGAr_Z1QczKG.webp) 

_Note: Labels in this image may reflect previous product names._

#### Set up via command line

You can also set up your tunnels in the command line:

Terminal window

```

set network interface tunnel units tunnel.1 ip CF_MWAN_IPsec_VTI_01_Local

set network interface tunnel units tunnel.1 mtu 1450

set network interface tunnel units tunnel.1 interface-management-profile Allow_Ping

set network interface tunnel units tunnel.2 ip CF_MWAN_IPsec_VTI_02_Local

set network interface tunnel units tunnel.2 mtu 1450

set network interface tunnel units tunnel.2 interface-management-profile Allow_Ping


```

### Zones

The Palo Alto Networks Next-Generation Firewall (NGFW) used to create this tutorial includes the following zones and corresponding network interfaces:

| Zone                 | Interface   | Interface |
| -------------------- | ----------- | --------- |
| Trust\_L3\_Zone      | ethernet1/1 |           |
| Untrust\_L3\_Zone    | ethernet1/2 |           |
| Cloudflare\_L3\_Zone | tunnel.1    | tunnel.2  |

The tunnel interfaces are placed in a separate zone to facilitate the configuration of more granular security policies. The use of any other zone for the tunnel interfaces will require adapting the configuration accordingly.

Note

Any Cloudflare WAN protected networks that are not local should be considered part of the `Cloudflare_L3_Zone`.

#### Set up via dashboard

##### `Trust_L3_zone`

| Name                    | Option          | Value  |
| ----------------------- | --------------- | ------ |
| Trust\_L3\_zone         | Log setting     | _None_ |
| Type                    | _Layer3_        |        |
| Interfaces              | **ethernet1/1** |        |
| Zone Protection Profile | _None_          |        |

![The Palo Alto interface showing the Trust_L3_Zone](https://developers.cloudflare.com/_astro/01_trust_zone.CtMShlqH_ZGNl59.webp) 

##### `Untrust_L3_zone`

| Name                    | Option                | Value  |
| ----------------------- | --------------------- | ------ |
| Untrust\_L3\_zone       | Log setting           | _None_ |
| Type                    | _Layer3_              |        |
| Interfaces              | **ethernet1/2**       |        |
| Zone Protection Profile | _Untrust\_Zone\_Prof_ |        |

![The Palo Alto interface showing the Untrust_L3_Zone](https://developers.cloudflare.com/_astro/02_untrust_zone.BFBnvKrn_1oFKpo.webp) 

##### `Cloudflare_L3_zone`

| Name                    | Option                    | Value  |
| ----------------------- | ------------------------- | ------ |
| Cloudflare\_L3\_zone    | Log setting               | _None_ |
| Type                    | _Layer3_                  |        |
| Interfaces              | **tunnel.1** **tunnel.2** |        |
| Zone Protection Profile | _None_                    |        |

![The Palo Alto interface showing the Cloudflare_L3_Zone](https://developers.cloudflare.com/_astro/03_cloudflare_zone.UclPW1ul_Z2aSUNf.webp)![The Palo Alto interface showing the Tunnel Interfaces overview section](https://developers.cloudflare.com/_astro/04_zones_overview.CePNdHuU_1BvENx.webp) 

#### Set up via command line

You can also use the command line to associate zones and interfaces:

Terminal window

```

set zone Trust_L3_Zone network layer3 ethernet1/1

set zone Untrust_L3_Zone network layer3 ethernet1/2

set zone Cloudflare_L3_Zone network layer3 [ tunnel.1 tunnel.2 ]


```

### Apply Changes

This would be a good time to save and commit the configuration changes made so far. Once complete, make sure you test basic connectivity to and from the firewall.

### IKE crypto profile Phase 1

Add a new IKE crypto profile to support the required parameters for Phase 1.

Multiple DH groups and authentication settings are defined in the desired order. Palo Alto Networks Next-Generation Firewall (NGFW) will automatically negotiate the optimal settings based on specified values.

#### Set up via dashboard

| Name                          | Option                           | Value       |
| ----------------------------- | -------------------------------- | ----------- |
| CF\_IKE\_Crypto\_CBC          | DH Group                         | **group20** |
| Authentication                | **sha512** **sha384** **sha256** |             |
| Encryption                    | **aes-256-cbc**                  |             |
| Key Lifetime                  | 24 hours                         |             |
| IKEv2 Authentication Multiple | 0                                |             |

#### Set up via command line

You can also set up the crypto profile for Phase 1 via the command line:

Terminal window

```

set network ike crypto-profiles ike-crypto-profiles CF_IKE_Crypto_CBC hash [ sha512 sha384 sha256 ]

set network ike crypto-profiles ike-crypto-profiles CF_IKE_Crypto_CBC dh-group [ group20 ]

set network ike crypto-profiles ike-crypto-profiles CF_IKE_Crypto_CBC encryption aes-256-cbc

set network ike crypto-profiles ike-crypto-profiles CF_IKE_Crypto_CBC lifetime hours 24

set network ike crypto-profiles ike-crypto-profiles CF_IKE_Crypto_CBC authentication-multiple 0


```

### IPsec crypto profile Phase 2

Add a new IPsec crypto profile to support the required parameters for Phase 2.

Multiple Authentication settings are defined in the desired order. Palo Alto Networks Next-Generation Firewall (NGFW) will automatically negotiate the optimal settings based on specified values.

#### Set up via dashboard

| Name                   | Option              | Value           |
| ---------------------- | ------------------- | --------------- |
| CF\_IPsec\_Crypto\_CBC | Encryption          | **aes-256-cbc** |
| Authentication         | **sha256** **sha1** |                 |
| DH Group               | **group20**         |                 |
| Lifetime               | 8 hours             |                 |

#### Set up via command line

You can also set up the IPsec crypto profile for Phase 2 via the command line:

Terminal window

```

set network ike crypto-profiles ipsec-crypto-profiles CF_IPsec_Crypto_CBC esp authentication [ sha256 sha1 ]

set network ike crypto-profiles ipsec-crypto-profiles CF_IPsec_Crypto_CBC esp encryption aes-256-cbc

set network ike crypto-profiles ipsec-crypto-profiles CF_IPsec_Crypto_CBC lifetime hours 8

set network ike crypto-profiles ipsec-crypto-profiles CF_IPsec_Crypto_CBC dh-group group20


```

### IKE Gateways

Note

Any other settings not specified should be left at their default values. Any deviation may lead to undesirable behavior and are not supported.

Define two IKE Gateways to establish the two IPsec tunnels to Cloudflare. Make sure to define the following values:

#### Set up via dashboard

##### Tunnel 1 settings: `CF_Magic_WAN_IKE_01`

Note

Make sure you select `CF_IKE_Crypto_CBC` as the IKE Crypto profile.

| Tab                  | Option                                                                                                                                                                                                                  | Value                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **General tab**      | Name                                                                                                                                                                                                                    | CF\_Magic\_WAN\_IKE\_01 |
| Version              | _IKEv2 only mode_.  Make sure both IKE Gateways are based only on this setting.                                                                                                                                         |                         |
| Local IP Address     | Internet\_L3\_203-0-113-254--24                                                                                                                                                                                         |                         |
| Peer address         | CF\_Magic\_WAN\_Anycast\_01                                                                                                                                                                                             |                         |
| Pre-Shared Key       | This value can be obtained from the Cloudflare dashboard - value is unique per tunnel.                                                                                                                                  |                         |
| Local Identification | _FQDN (hostname)_.  You can obtain this value from the Cloudflare Dashboard - value is unique per tunnel.                                                                                                               |                         |
| Peer Identification  | _None_                                                                                                                                                                                                                  |                         |
| **Advanced tab**     | IKE Crypto Profile                                                                                                                                                                                                      | _CF\_IKE\_Crypto\_CBC_  |
| Liveness Check       | The default value (five seconds) is sufficient. This setting is used to periodically determine if there are any underlying connectivity issues that may adversely affect the creation of Phase 1 Security Associations. |                         |

![IKE gateway settings for tunnel 1](https://developers.cloudflare.com/_astro/03_ike_gw01_page1.DTZw4kT3_Z1bEX0v.webp)![IKE gateway settings for tunnel 1](https://developers.cloudflare.com/_astro/04_ike_gw01_page2.CP3dTmKi_Zxjl6j.webp) 

_Note: Labels in these images may reflect previous product names._

##### Tunnel 2 settings: `CF_Magic_WAN_IKE_02`

Note

Make sure you select `CF_IKE_Crypto_CBC` as the IKE Crypto profile.

| Tab                  | Option                                                                                                                                                                                                                  | Value                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **General tab**      | Name                                                                                                                                                                                                                    | CF\_Magic\_WAN\_IKE\_02 |
| Version              | _IKEv2 only mode_.  Make sure both IKE Gateways are based only on this setting.                                                                                                                                         |                         |
| Local IP Address     | Internet\_L3\_203-0-113-254--24                                                                                                                                                                                         |                         |
| Peer address         | CF\_Magic\_WAN\_Anycast\_02                                                                                                                                                                                             |                         |
| Pre-Shared Key       | This value can be obtained from the Cloudflare dashboard - value is unique per tunnel.                                                                                                                                  |                         |
| Local Identification | _FQDN (hostname)_.  You can obtain this value from the Cloudflare Dashboard - value is unique per tunnel.                                                                                                               |                         |
| Peer Identification  | _None_                                                                                                                                                                                                                  |                         |
| **Advanced tab**     | IKE crypto profile                                                                                                                                                                                                      | _CF\_IKE\_Crypto\_CBC_  |
| Liveness Check       | The default value (five seconds) is sufficient. This setting is used to periodically determine if there are any underlying connectivity issues that may adversely affect the creation of Phase 1 Security Associations. |                         |

![IKE gateway settings for tunnel 2](https://developers.cloudflare.com/_astro/05_ike_gw02_page1.DhdWpbT6_Z2g6tgq.webp)![IKE gateway settings for tunnel 2](https://developers.cloudflare.com/_astro/06_ike_gw02_page2.B0Jsctzf_gPWNe.webp) 

_Note: Labels in these images may reflect previous product names._

#### Set up via command line

##### Tunnel 1 settings: `CF_Magic_WAN_IKE_01`

Terminal window

```

set network ike gateway CF_Magic_WAN_IKE_01 protocol ikev1 dpd enable yes

set network ike gateway CF_Magic_WAN_IKE_01 protocol ikev2 dpd enable yes

set network ike gateway CF_Magic_WAN_IKE_01 protocol ikev2 ike-crypto-profile CF_IKE_Crypto_CBC

set network ike gateway CF_Magic_WAN_IKE_01 protocol version ikev2

set network ike gateway CF_Magic_WAN_IKE_01 local-address ip Internet_L3_203-0-113-254--24

set network ike gateway CF_Magic_WAN_IKE_01 local-address interface ethernet1/2

set network ike gateway CF_Magic_WAN_IKE_01 protocol-common nat-traversal enable no

set network ike gateway CF_Magic_WAN_IKE_01 protocol-common fragmentation enable no

set network ike gateway CF_Magic_WAN_IKE_01 peer-address ip CF_Magic_WAN_Anycast_01

set network ike gateway CF_Magic_WAN_IKE_01 authentication pre-shared-key key -AQ==Xdcd9ir5o5xhjuIH---------------------HsRoVf+M0TTG4ja3EzulN37zMOwGs

set network ike gateway CF_Magic_WAN_IKE_01 local-id id 28de99ee57424ee0a1591384193982fa.33145236.ipsec.cloudflare.com

set network ike gateway CF_Magic_WAN_IKE_01 local-id type fqdn

set network ike gateway CF_Magic_WAN_IKE_01 disabled no


```

##### Tunnel 2 settings: `CF_Magic_WAN_IKE_02`

Terminal window

```

set network ike gateway CF_Magic_WAN_IKE_02 protocol ikev1 dpd enable yes

set network ike gateway CF_Magic_WAN_IKE_02 protocol ikev2 dpd enable yes

set network ike gateway CF_Magic_WAN_IKE_02 protocol ikev2 ike-crypto-profile CF_IKE_Crypto_CBC

set network ike gateway CF_Magic_WAN_IKE_02 protocol version ikev2

set network ike gateway CF_Magic_WAN_IKE_02 local-address ip Internet_L3_203-0-113-254--24

set network ike gateway CF_Magic_WAN_IKE_02 local-address interface ethernet1/2

set network ike gateway CF_Magic_WAN_IKE_02 protocol-common nat-traversal enable no

set network ike gateway CF_Magic_WAN_IKE_02 protocol-common fragmentation enable no

set network ike gateway CF_Magic_WAN_IKE_02 peer-address ip CF_Magic_WAN_Anycast_02

set network ike gateway CF_Magic_WAN_IKE_02 authentication pre-shared-key key -AQ==rvwEulxx7wLBl---------------------swSeJPXxxM2cfPbt7q4HZZGZZ8

set network ike gateway CF_Magic_WAN_IKE_02 local-id id b87322b0915b47158667bf1653990e66.33145236.ipsec.cloudflare.com

set network ike gateway CF_Magic_WAN_IKE_02 local-id type fqdn

set network ike gateway CF_Magic_WAN_IKE_02 disabled no


```

### IPsec Tunnels

With the IKE Gateways defined, the next step is to configure two IPsec Tunnels - one corresponding to each of the two IKE Gateways configured in the previous section.

#### Prerequisites

There are a few prerequisites you should be aware of before continuing:

* Do not configure Proxy IDs. Cloudflare WAN IPsec tunnels are based on the route-based VPN model. Proxy IDs are used with policy-based VPNs.
* Disable Replay Protection, under the Advanced Options.
* Disable Tunnel Monitor. It can cause undesirable results. Tunnel Monitor is a Palo Alto Networks proprietary feature that assumes there are Palo Alto Networks Next-Generation Firewall devices on both sides of the IPsec tunnel. Also, Tunnel Monitor is intended for use with IPsec tunnels based on IKEv1 (Cloudflare WAN IPsec tunnels are based on IKEv2).

#### Set up via dashboard

##### Tunnel 1 settings: `CF_Magic_WAN_IPsec_01`

| Name                      | Option                    | Value    |
| ------------------------- | ------------------------- | -------- |
| CF\_Magic\_WAN\_IPsec\_01 | Tunnel interface          | tunnel.1 |
| IKE Gateway               | _CF\_Magic\_WAN\_IKE\_01_ |          |
| IPsec crypto profile      | _CF\_IKE\_Crypto\_CBC_    |          |
| Enable Replay Protection  | **Disable**               |          |

![Set up the IPsec tunnel](https://developers.cloudflare.com/_astro/07_ipsec_tun01_page1.CGxYzIX1_1nDF9d.webp)![Set up the IPsec tunnel](https://developers.cloudflare.com/_astro/08_ipsec_tun01_page2.BlnyIOG4_ZP354o.webp) 

_Note: Labels in these images may reflect previous product names._

##### Tunnel 2 settings: `CF_Magic_WAN_IPsec_02`

| Name                      | Option                    | Value    |
| ------------------------- | ------------------------- | -------- |
| CF\_Magic\_WAN\_IPsec\_02 | Tunnel interface          | tunnel.2 |
| IKE Gateway               | _CF\_Magic\_WAN\_IKE\_02_ |          |
| IPsec crypto profile      | _CF\_IKE\_Crypto\_CBC_    |          |
| Enable Replay Protection  | **Disable**               |          |

![Set up the IPsec tunnel](https://developers.cloudflare.com/_astro/09_ipsec_tun02_page1.BcU-8MkR_2iEie3.webp)![Set up the IPsec tunnel](https://developers.cloudflare.com/_astro/10_ipsec_tun02_page2.DjeZ2TKf_Z1Y3Imj.webp) 

_Note: Labels in these images may reflect previous product names._

#### Set up via command line

##### Tunnel 1 settings: `CF_Magic_WAN_IPsec_01`

Terminal window

```

set network tunnel ipsec CF_Magic_WAN_IPsec_01 auto-key ike-gateway CF_Magic_WAN_IKE_01

set network tunnel ipsec CF_Magic_WAN_IPsec_01 auto-key ipsec-crypto-profile CF_IPsec_Crypto_CBC

set network tunnel ipsec CF_Magic_WAN_IPsec_01 tunnel-monitor destination-ip 10.252.2.26

set network tunnel ipsec CF_Magic_WAN_IPsec_01 tunnel-monitor tunnel-monitor-profile default

set network tunnel ipsec CF_Magic_WAN_IPsec_01 tunnel-interface tunnel.1

set network tunnel ipsec CF_Magic_WAN_IPsec_01 anti-replay no

set network tunnel ipsec CF_Magic_WAN_IPsec_01 disabled no


```

##### Tunnel 2 settings: `CF_Magic_WAN_IPsec_02`

Terminal window

```

set network tunnel ipsec CF_Magic_WAN_IPsec_02 auto-key ike-gateway CF_Magic_WAN_IKE_02

set network tunnel ipsec CF_Magic_WAN_IPsec_02 auto-key ipsec-crypto-profile CF_IPsec_Crypto_CBC

set network tunnel ipsec CF_Magic_WAN_IPsec_02 tunnel-monitor destination-ip 10.252.2.28

set network tunnel ipsec CF_Magic_WAN_IPsec_02 tunnel-monitor tunnel-monitor-profile default

set network tunnel ipsec CF_Magic_WAN_IPsec_02 tunnel-interface tunnel.2

set network tunnel ipsec CF_Magic_WAN_IPsec_02 anti-replay no

set network tunnel ipsec CF_Magic_WAN_IPsec_02 disabled no


```

### Apply Changes

This would be a good time to save and commit the configuration changes made thus far. Once complete, make sure you test basic connectivity across the IPsec tunnels.

### IPsec tunnel connectivity tests

This is a good time to ensure the IPsec tunnels are established and to validate basic connectivity.

Note

Tunnel health checks will not function until security policies and policy-based forwarding are configured. This series of tests is focused on testing IPsec connectivity exclusively.

#### Verify IKE Phase 1 Communications

The first step is to verify IKE Phase 1 completed successfully:

##### Syntax

Terminal window

```

show vpn ike-sa gateway [value]


```

##### Example for `CF_Magic_WAN_IKE_01`

Terminal window

```

admin@panvm03> show vpn ike-sa gateway CF_Magic_WAN_IKE_01


There is no IKEv1 phase-1 SA found.


There is no IKEv1 phase-2 SA found.


IKEv2 SAs

Gateway ID      Peer-Address           Gateway Name           Role SN       Algorithm             Established     Expiration      Xt Child  ST


----------      ------------           ------------           ---- --       ---------             -----------     ----------      -- -----  --


2               162.159.66.164         CF_Magic_WAN_IKE_01    Init 67       PSK/DH20/A256/SHA256  Jun.04 21:09:13 Jun.05 05:09:13 0  1      Established


IKEv2 IPsec Child SAs

Gateway Name           TnID     Tunnel                    ID       Parent   Role SPI(in)  SPI(out) MsgID    ST


------------           ----     ------                    --       ------   ---- -------  -------- -----    --


CF_Magic_WAN_IKE_01    2        CF_Magic_WAN_IPsec_01     322550   67       Init FCAEE176 1EF41BA9 000007B4 Mature


Show IKEv2 SA: Total 2 gateways found. 1 ike sa found.


```

##### Example for `CF_Magic_WAN_IKE_02`

Terminal window

```

admin@panvm03> show vpn ike-sa gateway CF_Magic_WAN_IKE_02


There is no IKEv1 phase-1 SA found.


There is no IKEv1 phase-2 SA found.


IKEv2 SAs

Gateway ID      Peer-Address           Gateway Name           Role SN       Algorithm             Established     Expiration      Xt Child  ST


----------      ------------           ------------           ---- --       ---------             -----------     ----------      -- -----  --


3               172.64.242.164         CF_Magic_WAN_IKE_02    Init 66       PSK/DH20/A256/SHA256  Jun.04 20:37:42 Jun.05 04:37:42 0  2      Established


IKEv2 IPsec Child SAs

Gateway Name           TnID     Tunnel                    ID       Parent   Role SPI(in)  SPI(out) MsgID    ST


------------           ----     ------                    --       ------   ---- -------  -------- -----    --


CF_Magic_WAN_IKE_02    3        CF_Magic_WAN_IPsec_02     323145   66       Init B6EDA356 43F71BC5 00000A52 Mature


Show IKEv2 SA: Total 2 gateways found. 1 ike sa found.


```

#### Troubleshooting IKE Phase 1 Communications

Cloudflare WAN IPsec tunnels expect the customer device will initiate the IPsec tunnels. The tunnels may not establish if there is no traffic that would traverse the tunnel under normal conditions. In this case, it may be necessary to force IKE Phase 1.

##### Syntax

Terminal window

```

test vpn ike-sa gateway [value]


```

##### Example for `CF_Magic_WAN_IKE_01`

Terminal window

```

admin@panvm03> test vpn ike-sa gateway CF_Magic_WAN_IKE_01


Start time: Jun.05 00:30:29

Initiate 1 IKE SA.


```

##### Example for `CF_Magic_WAN_IKE_02`

Terminal window

```

admin@panvm03> test vpn ike-sa gateway CF_Magic_WAN_IKE_02


Start time: Jun.05 00:30:33

Initiate 1 IKE SA.


```

Repeat these commands for the respective tunnel to ensure the IKE SA(s) display as expected.

#### Verify IPsec Phase 2 Communications

To ensure the IPsec tunnels are established, ping the remote Virtual Tunnel Interface (Cloudflare side) from the command line on the Palo Alto Networks Next-Generation Firewall. Ensure you specify the source IP address of the ping from the local side of the Virtual Tunnel Interface:

##### Syntax

Terminal window

```

show vpn ipsec-sa tunnel [value]


```

##### Example for `CF_Magic_WAN_IPsec_01`

Terminal window

```

admin@panvm03> show vpn ipsec-sa tunnel CF_Magic_WAN_IPsec_01


GwID/client IP  TnID   Peer-Address           Tunnel(Gateway)                                Algorithm          SPI(in)  SPI(out) life(Sec/KB)             remain-time(Sec)


--------------  ----   ------------           ---------------                                ---------          -------  -------- ------------             ----------------


2               2      162.159.66.164         CF_Magic_WAN_IPsec_01(CF_Magic_WAN_IKE_01)     ESP/A256/SHA256    B5D09AB8 9FA69407 3600/Unlimited           3445


Show IPsec SA: Total 1 tunnels found. 1 ipsec sa found.


```

##### Example for `CF_Magic_WAN_IPsec_02`

Terminal window

```

admin@panvm03> show vpn ipsec-sa tunnel CF_Magic_WAN_IPsec_02


GwID/client IP  TnID   Peer-Address           Tunnel(Gateway)                                Algorithm          SPI(in)  SPI(out) life(Sec/KB)             remain-time(Sec)


--------------  ----   ------------           ---------------                                ---------          -------  -------- ------------             ----------------


3               3      172.64.242.164         CF_Magic_WAN_IPsec_02(CF_Magic_WAN_IKE_02)     ESP/A256/SHA256    CAEA6F09 EC6ACC7A 3600/Unlimited           3361


Show IPsec SA: Total 1 tunnels found. 1 ipsec sa found.


```

#### Troubleshooting IPsec Phase 2 Communications

Cloudflare WAN IPsec tunnels expect the customer device will initiate the IPsec tunnels. The tunnels may not establish if there is no traffic that would traverse the tunnel under normal conditions. In this case, it may be necessary to force IPsec Phase 2\. This is typically unnecessary as once IKE Phase 1 negotiates successfully, IPsec Phase 2 automatically establishes the tunnel. The test is still worth performing.

##### Syntax

Terminal window

```

test vpn ipsec-sa tunnel [value]


```

##### Example for `CF_Magic_WAN_IPsec_01`

Terminal window

```

admin@panvm03> test vpn ipsec-sa tunnel CF_Magic_WAN_IPsec_01


Start time: Jun.05 00:37:50

Initiate 1 IPsec SA for tunnel CF_Magic_WAN_IPsec_01.


```

##### Example for `CF_Magic_WAN_IPsec_02`

Terminal window

```

admin@panvm03> test vpn ipsec-sa tunnel CF_Magic_WAN_IPsec_02


Start time: Jun.05 00:38:52

Initiate 1 IPsec SA for tunnel CF_Magic_WAN_IPsec_02.


```

Repeat these commands for the respective tunnel to ensure the IPsec SA(s) display as expected.

#### Ping Remote Virtual Tunnel interfaces

Use ping to source traffic from the IP address of the Virtual Tunnel interface on Palo Alto Networks Next-Generation Firewall (NGFW) to the IP address of the Virtual Tunnel Interface on the Cloudflare side of the IPsec tunnel.

Note

The interface address is defined with a `/31` netmask. There have been isolated cases where NGFW exhibited issues when using ping to verify connectivity between the local and remote Virtual Tunnel interfaces. This behavior can vary depending on the version of PAN-OS installed on the firewall. If you encounter this issue, either switch to a `/30` netmask, or contact Palo Alto Networks support for assistance.

##### Syntax

Terminal window

```

ping source [value src IP] host [value dst IP]


```

##### Example for Tunnel 1

Terminal window

```

admin@panvm03> ping source 10.252.2.27 host 10.252.2.26

PING 10.252.2.26 (10.252.2.26) from 10.252.2.27 : 56(84) bytes of data.

64 bytes from 10.252.2.26: icmp_seq=1 ttl=64 time=2.71 ms

64 bytes from 10.252.2.26: icmp_seq=2 ttl=64 time=2.03 ms

64 bytes from 10.252.2.26: icmp_seq=3 ttl=64 time=1.98 ms

64 bytes from 10.252.2.26: icmp_seq=4 ttl=64 time=1.98 ms

^C

--- 10.252.2.26 ping statistics ---

4 packets transmitted, 4 received, 0% packet loss, time 3002ms

rtt min/avg/max/mdev = 1.980/2.180/2.719/0.312 ms


```

##### Example for Tunnel 2

Terminal window

```

admin@panvm03> ping source 10.252.2.29 host 10.252.2.28

PING 10.252.2.28 (10.252.2.28) from 10.252.2.29 : 56(84) bytes of data.

64 bytes from 10.252.2.28: icmp_seq=1 ttl=64 time=2.90 ms

64 bytes from 10.252.2.28: icmp_seq=2 ttl=64 time=1.92 ms

64 bytes from 10.252.2.28: icmp_seq=3 ttl=64 time=1.76 ms

64 bytes from 10.252.2.28: icmp_seq=4 ttl=64 time=1.97 ms

^C

--- 10.252.2.28 ping statistics ---

4 packets transmitted, 4 received, 0% packet loss, time 3003ms

rtt min/avg/max/mdev = 1.765/2.141/2.900/0.446 ms


```

### Virtual Router

While we will leverage policy-based forwarding to implement policy-based routing, it is still a good idea to configure routing on the Virtual Router.

Cloudflare WAN implements [equal-cost multi-path (ECMP) routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#equal-cost-multi-path-routing) to steer traffic across IPsec tunnels. The default behavior is to load balance traffic equally across both tunnels.

Note

ECMP is disabled on the Palo Alto Networks Next-Generation Firewall by default. Enabling ECMP will force the Virtual Router to restart. While a restart of the Virtual Router is much faster than restarting the entire firewall, it is still recommended that you make this change during a scheduled maintenance window.

#### Enable ECMP

First, ensure the General tab displays both the Ethernet and tunnel interfaces. If any of the interfaces are not displayed, either use **Add** to specify the missing interface(s), or visit the Interfaces menu to ensure the relevant Virtual Router is selected.

![Make sure the Ethernet and tunnel interfaces show up in Virtual Router](https://developers.cloudflare.com/_astro/01_virtual_router_interfaces.CKKz8rSw_1Cr1Wv.webp) 
1. Open the **Router settings** for the default Virtual Router and select the **ECMP** tab.
2. Select the checkboxes next to **Enable**, **Symmetric Return**, and **Strict Source Path** (all three checkboxes should be selected).
3. Under **Load Balance**, change the **Method** from _IP Modulo_ to _Weighted Round Robin_ and add both tunnel interfaces. Ensure the weights match the weights defined in Cloudflare WAN static routes (reference the Cloudflare Dashboard).
![Make sure all checkboxes are selected](https://developers.cloudflare.com/_astro/02_virtual_router_ecmp.Dg9F5MXo_nAyRm.webp) 

You can also use the command line to make these changes:

Terminal window

```

set network virtual-router default ecmp algorithm weighted-round-robin interface tunnel.1 weight 100

set network virtual-router default ecmp algorithm weighted-round-robin interface tunnel.2 weight 100

set network virtual-router default ecmp enable yes

set network virtual-router default ecmp symmetric-return yes

set network virtual-router default ecmp strict-source-path yes


```

#### Add static routes

Add two static routes for each Cloudflare WAN protected network - one for each of the two tunnel interfaces.

Note

Palo Alto Networks Next-Generation Firewall will not allow for configuring two routes to the same destination with equal metrics - even if they reference different interfaces and ECMP is enabled. The examples provided here use Metric 10 for the route via interface tunnel.1 and Metric 11 for the route via interface tunnel.2.

The environment used for this tutorial assumes two Cloudflare WAN protected networks:

* **VLAN0010**: `10.1.10.0/24`
* **VLAN0020**: `10.1.20.0/24`

##### VLAN0010 (`10.1.10.0/24`) via tunnel.1

| Name                               | Option        | Value                     |
| ---------------------------------- | ------------- | ------------------------- |
| Magic\_WAN\_VLAN0010\_Tun01        | Destination   | _VLAN0010\_10-1-10-0--24_ |
| Interface                          | _tunnel.1_    |                           |
| Next hop                           | _IP Address_  |                           |
| _CF\_MWAN\_IPsec\_VTI\_01\_Remote_ |               |                           |
| Metric                             | 10            |                           |
| Route Table                        | _Unicast_     |                           |
| BFD Profile                        | _Disable BFD_ |                           |

![Static Route - VLAN0010 \(10.1.10.0/24 via tunnel.1\)](https://developers.cloudflare.com/_astro/03_virtual_router_static_vlan0010_tun01.BeoPOPsP_1Calyn.webp) 

_Note: Labels in this image may reflect previous product names._

##### VLAN0010 (`10.1.10.0/24`) via tunnel.2

| Name                               | Option        | Value                     |
| ---------------------------------- | ------------- | ------------------------- |
| Magic\_WAN\_VLAN0010\_Tun02        | Destination   | _VLAN0010\_10-1-10-0--24_ |
| Interface                          | _tunnel.2_    |                           |
| Next hop                           | _IP Address_  |                           |
| _CF\_MWAN\_IPsec\_VTI\_02\_Remote_ |               |                           |
| Metric                             | 11            |                           |
| Route Table                        | _Unicast_     |                           |
| BFD Profile                        | _Disable BFD_ |                           |

![Static Route - VLAN0010 \(10.1.10.0/24 via tunnel.2\)](https://developers.cloudflare.com/_astro/04_virtual_router_static_vlan0010_tun02.BfU79pNf_Z3ofGI.webp) 

_Note: Labels in this image may reflect previous product names._

##### VLAN0020 (`10.1.20.0/24`) via tunnel.1

| Name                               | Option        | Value                     |
| ---------------------------------- | ------------- | ------------------------- |
| Magic\_WAN\_VLAN0020\_Tun01        | Destination   | _VLAN0020\_10-1-20-0--24_ |
| Interface                          | _tunnel.1_    |                           |
| Next hop                           | _IP Address_  |                           |
| _CF\_MWAN\_IPsec\_VTI\_01\_Remote_ |               |                           |
| Metric                             | 10            |                           |
| Route Table                        | _Unicast_     |                           |
| BFD Profile                        | _Disable BFD_ |                           |

![Static Route - VLAN0020 \(10.1.20.0/24 via tunnel.1\)](https://developers.cloudflare.com/_astro/05_virtual_router_static_vlan0020_tun01.u8FPv6T8_ZejdkV.webp) 

_Note: Labels in this image may reflect previous product names._

##### VLAN0020 (`10.1.20.0/24`) via tunnel.2

| Name                               | Option        | Value                     |
| ---------------------------------- | ------------- | ------------------------- |
| Magic\_WAN\_VLAN0020\_Tun02        | Destination   | _VLAN0020\_10-1-20-0--24_ |
| Interface                          | _tunnel.2_    |                           |
| Next hop                           | _IP Address_  |                           |
| _CF\_MWAN\_IPsec\_VTI\_02\_Remote_ |               |                           |
| Metric                             | 11            |                           |
| Route Table                        | _Unicast_     |                           |
| BFD Profile                        | _Disable BFD_ |                           |

![Static Route - VLAN0020 \(10.1.20.0/24 via tunnel.1\)](https://developers.cloudflare.com/_astro/06_virtual_router_static_vlan0020_tun02.BnhXyIho_Zt5M4r.webp) 

_Note: Labels in this image may reflect previous product names._

You can also configure these settings via command line:

##### VLAN0010 - `10.1.10.0/24`

Terminal window

```

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 nexthop ip-address CF_MWAN_IPsec_VTI_01_Remote

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 bfd profile None

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 interface tunnel.1

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 metric 10

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 destination VLAN0010_10-1-10-0--24

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun01 route-table unicast

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 nexthop ip-address CF_MWAN_IPsec_VTI_02_Remote

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 bfd profile None

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 interface tunnel.2

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 metric 11

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 destination VLAN0010_10-1-10-0--24

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0010_Tun02 route-table unicast


```

##### VLAN0020 - `10.1.20.0/24`

Terminal window

```

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 nexthop ip-address CF_MWAN_IPsec_VTI_01_Remote

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 bfd profile None

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 interface tunnel.1

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 metric 10

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 destination VLAN0020_10-1-20-0--24

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun01 route-table unicast

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 nexthop ip-address CF_MWAN_IPsec_VTI_02_Remote

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 bfd profile None

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 interface tunnel.2

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 metric 11

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 destination VLAN0020_10-1-20-0--24

set network virtual-router default routing-table ip static-route Magic_WAN_VLAN0020_Tun02 route-table unicast


```

### Health checks

Cloudflare crafts ICMP probes which are sent through the IPsec tunnels from random servers across Cloudflare's global anycast network. These ICMP probes are unique because an ICMP reply packet is sent (as opposed to an ICMP Request).

Note

The construct of the security policies may seem counter-intuitive - this is due to the use of ICMP reply probes. As long as you adhere to the recommended policies in this documentation, the bi-directional health checks will work as expected.

Cloudflare WAN customers must configure IPsec tunnels to use custom anycast IP addresses for the health check endpoints:

* **CF\_Health\_Check\_Anycast\_01**: `172.64.240.253`
* **CF\_Health\_Check\_Anycast\_02**: `172.64.240.254`

#### Security Policy - Tunnel health checks

You must define a rule to allow the ICMP reply probes as Palo Alto Networks Next-Generation Firewall's default behavior will drop the health checks.

Note

Cloudflare health checks are sent from random servers across Cloudflare's global network and can originate from any addresses within the Cloudflare IPv4 address space represented by the `Cloudflare_IPv4_Static_Grp`.

##### Setup via dashboard

| Name                             | Option                                                                | Value                    |
| -------------------------------- | --------------------------------------------------------------------- | ------------------------ |
| Cloudflare\_Tunnel\_Bidirect\_HC | Rule Type                                                             | _universal (default)_    |
| Description                      | Permit bidirectional HCs                                              |                          |
| Group Rules By Tag               | _None_                                                                |                          |
| **Source tab**                   | Source Zone                                                           | **Cloudflare\_L3\_Zone** |
| Source Address                   | **CF\_Health\_Check\_Anycast\_01** **CF\_Health\_Check\_Anycast\_02** |                          |
| **Destination tab**              | Destination Zone                                                      | **Cloudflare\_L3\_Zone** |
| Destination Address              | **Cloudflare\_IPv4\_Static\_Grp**                                     |                          |
| **Application tab**              | Applications                                                          | **icmp** **ping**        |
| **Actions tab**                  | Action                                                                | _Allow_                  |
| Log Setting                      | **Log at Session End**                                                |                          |
| Profile type                     | _None_                                                                |                          |
| Schedule                         | _None_                                                                |                          |
| QoS Marking                      | _None_                                                                |                          |

![Bidirectional Health Check Rule - General](https://developers.cloudflare.com/_astro/01_bidirect_hc_general.Jesbnt_L_Q9NUT.webp)![Bidirectional Health Check Rule - Source](https://developers.cloudflare.com/_astro/02_bidirect_hc_source.D5_oto5__Z1ioKLo.webp)![Bidirectional Health Check Rule - Destination](https://developers.cloudflare.com/_astro/03_bidirect_hc_dest.fLuLEdbu_Z19DddG.webp)![Bidirectional Health Check Rule - Apps](https://developers.cloudflare.com/_astro/04_bidirect_hc_apps.BS9-zTeJ_1mAeiY.webp)![Bidirectional Health Check Rule - Service/URL Category](https://developers.cloudflare.com/_astro/05_bidirect_hc_service-url.BO7RsvHM_Zqv6wi.webp)![Bidirectional Health Check Rule - Action](https://developers.cloudflare.com/_astro/06_bidirect_hc_action.BepoEJ0K_ZTzWTs.webp) 

##### Setup via command line

Terminal window

```

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC to Cloudflare_L3_Zone

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC from Cloudflare_L3_Zone

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC source [ CF_Health_Check_Anycast_01 CF_Health_Check_Anycast_02 ]

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC destination Cloudflare_IPv4_Static_Grp

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC source-user any

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC category any

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC application [ icmp ping ]

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC service application-default

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC hip-profiles any

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC action allow

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC rule-type universal

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC description "Permit bidirectional HCs"

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC disabled no

set rulebase security rules Cloudflare_Tunnel_Bidirect_HC log-end yes


```

Note

Logging is enabled on the rule to permit health checks. While the amount of bandwidth consumed by health checks is negligible, the flows generate a significant number of log entries. You may want to disable logging on this rule once in production, and only enable it if any troubleshooting becomes necessary.

#### Policy-based forwarding - tunnel health checks

Traffic matching the Security Rule defined in the last step must be routed symmetrically across the tunnel the ingress traffic was received through. Two policy-based forwarding rules ensure the traffic is routed accordingly.

Ensure have the following:

* **Source Zone**: `Cloudflare_L3_Zone`
* **Source Addresses**: `CF_Health_Check_Anycast_01` and `CF_Health_Check_Anycast_02`
* **Destination Zone**: `Cloudflare_L3_Zone`
* **Destination Addresses**: `Cloudflare_IPv4_Static_Grp`
* **Application**: `icmp` and `ping`

##### Set up via dashboard tunnel.1

| Name                                    | Option                             | Value                             |
| --------------------------------------- | ---------------------------------- | --------------------------------- |
| PBF\_Cloudflare\_Health\_Check\_01      | Tags                               | _Cloudflare\_L3\_Zone_            |
| Group Rules By Tag                      | _None_                             |                                   |
| **Source tab**                          | Type                               | _Zone_                            |
| Zone                                    | **Cloudflare\_L3\_Zone**           |                                   |
| Source Address                          | **CF\_Health\_Check\_Anycast\_01** |                                   |
| **Destination/Application/Service tab** | Destination Address                | **Cloudflare\_IPv4\_Static\_Grp** |
| **Forwarding tab**                      | Action                             | _Forward_                         |
| Egress interface                        | _tunnel.1_                         |                                   |
| Next Hop                                | _IP Address_                       |                                   |
| _CF\_MWAN\_IPsec\_VTI\_01\_Remote_      |                                    |                                   |

![Bidirectional Health Checks via tunnel.1 - General](https://developers.cloudflare.com/_astro/01_pbf_hc_01_general.BvF5tM5Y_ZrKTzp.webp)![Bidirectional Health Checks via tunnel.1 - Source](https://developers.cloudflare.com/_astro/02_pbf_hc_01_source.sLm5lJYK_ZWCy90.webp)![Bidirectional Health Checks via tunnel.1 - Destination](https://developers.cloudflare.com/_astro/03_pbf_hc_01_dest-app-service.B7G6nLZp_1tWOKI.webp)![Bidirectional Health Checks via tunnel.1 - Forwarding](https://developers.cloudflare.com/_astro/04_pbf_hc_01_forwarding.Ceb7zhxs_7kEf4.webp) 

_Note: Labels in these images may reflect previous product names._

##### Set up via dashboard tunnel.2

| Name                                    | Option                             | Value                             |
| --------------------------------------- | ---------------------------------- | --------------------------------- |
| PBF\_Cloudflare\_Health\_Check\_02      | Tags                               | _Cloudflare\_L3\_Zone_            |
| Group Rules By Tag                      | _None_                             |                                   |
| **Source tab**                          | Type                               | _Zone_                            |
| Zone                                    | **Cloudflare\_L3\_Zone**           |                                   |
| Source Address                          | **CF\_Health\_Check\_Anycast\_02** |                                   |
| **Destination/Application/service tab** | Destination Address                | **Cloudflare\_IPv4\_Static\_Grp** |
| **Forwarding tab**                      | Action                             | _Forward_                         |
| Egress interface                        | _tunnel.2_                         |                                   |
| Next Hop                                | _IP Address_                       |                                   |
| _CF\_MWAN\_IPsec\_VTI\_02\_Remote_      |                                    |                                   |

![Bidirectional Health Checks via tunnel.2 - General](https://developers.cloudflare.com/_astro/05_pbf_hc_02_general.VE6FLgMw_ZIgot.webp)![Bidirectional Health Checks via tunnel.2 - Source](https://developers.cloudflare.com/_astro/06_pbf_hc_02_source.CAlZ5-Oc_hTFAa.webp)![Bidirectional Health Checks via tunnel.2 - Destination](https://developers.cloudflare.com/_astro/07_pbf_hc_02_dest-app-service.Bijf-cAH_1GrKrQ.webp)![Bidirectional Health Checks via tunnel.2 - Forwarding](https://developers.cloudflare.com/_astro/08_pbf_hc_02_forwarding.DQQYjV92_1UQ18B.webp) 

_Note: Labels in these images may reflect previous product names._

##### Set up via command line tunnel.1

Terminal window

```

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 action forward nexthop ip-address CF_MWAN_IPsec_VTI_01_Remote

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 action forward egress-interface tunnel.1

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 from zone Cloudflare_L3_Zone

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 source CF_Health_Check_Anycast_01

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 destination Cloudflare_IPv4_Static_Grp

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 source-user any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 application any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 service any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_01 tag Cloudflare_L3_Zone


```

##### Set up via command line tunnel.2

Terminal window

```

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 action forward nexthop ip-address CF_MWAN_IPsec_VTI_02_Remote

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 action forward egress-interface tunnel.2

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 from zone Cloudflare_L3_Zone

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 source CF_Health_Check_Anycast_02

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 destination Cloudflare_IPv4_Static_Grp

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 source-user any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 application any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 service any

set rulebase pbf rules PBF_Cloudflare_Healthcheck_02 tag Cloudflare_L3_Zone


```

### Troubleshooting tunnel health checks

#### Security Policy

Use the Traffic log viewer to ensure that the health check traffic is allowed. Start by adding a rule to filter the logs based on the name of the Security Policy rule permitting the applicable traffic.

##### Filter by rule name

Terminal window

```

rule eq Cloudflare_Tunnel_Bidirect_HC


```

![Bidirectional health check logging - Filter by rule name](https://developers.cloudflare.com/_astro/02_logging_tunnel_hc_filter_rulename.CpyoLiq5_w993I.webp) 

If you do not see any traffic matching the filter, replace the filter with one that displays log entries based on the addresses associated with the `CF_Health_Check_Anycast_01` and `CF_Health_Check_Anycast_02` Address objects.

##### Filter by health check anycast IPs

Terminal window

```

( addr.src in 172.64.240.253 ) or ( addr.src in 172.64.240.254 )


```

![Bidirectional health check logging - filter by health check anycast IPs](https://developers.cloudflare.com/_astro/01_logging_tunnel_hc_filter_ip.DY1yUwDH_ZSjJTW.webp) 

#### Policy-based forwarding

Troubleshooting policy-based forwarding can be a bit challenging. The ideal way to determine if traffic is flowing through the intended path is to select the detailed view for a log entry.

1. Select the magnifying glass next to one of the log entries with source IP address `172.64.240.253`.
2. Traffic originating from `CF_Health_Check_Anycast_01` (`172.64.240.253`) should ingress and egress interface tunnel.1.
![Bidirectional Health Check Logging - tunnel.1](https://developers.cloudflare.com/_astro/03_logging_tunnel_hc_tun01.aWSnG56V_1gq0ww.webp) 
1. Select the magnifying glass next to one of the log entries with source IP address `172.64.240.254`.
2. Traffic originating from `CF_Health_Check_Anycast_02` (`172.64.240.254`) should ingress and egress interface tunnel.2.
![Bidirectional Health Check Logging - tunnel.2](https://developers.cloudflare.com/_astro/04_logging_tunnel_hc_tun02.D1f2hkGw_1UGyXq.webp) 

If the traffic is not ingressing/egressing the same interface, you likely have an issue with the policy-based forwarding rule(s) not matching.

### Security Policies - Production Traffic

As mentioned earlier, this tutorial includes examples for two different use-cases:

* **Cloudflare WAN**: permit traffic between two or more locations with [RFC-1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) private non-routable address space.
* **Cloudflare WAN with Cloudflare Zero Trust (Gateway egress)**: same as Cloudflare WAN with the addition of outbound Internet access from Cloudflare WAN protected sites egressing the Cloudflare edge network.

#### Cloudflare WAN only

Rules must be defined to facilitate traffic from the trust network to the Cloudflare WAN protected sites. While it may be possible to define one rule for traffic in both directions, this example includes two rules:

* From Trust to Cloudflare WAN protected sites.
* From Cloudflare WAN protected sites to Trust.

##### Trust to Cloudflare WAN dashboard

| Name                                     | Option                                                  | Value                    |
| ---------------------------------------- | ------------------------------------------------------- | ------------------------ |
| Trust\_to\_Cloudflare\_Magic\_WAN\_Allow | Rule Type                                               | _universal (default)_    |
| Group Rules by Tag                       | _None_                                                  |                          |
| **Source tab**                           | Source Zone                                             | **Trust\_L3\_Zone**      |
| Source Address                           | **VLAN0100\_10-1-100-0--24**                            |                          |
| **Destination tab**                      | Destination Zone                                        | **Cloudflare\_L3\_Zone** |
| Destination Address                      | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** |                          |
| **Actions tab**                          | Action                                                  | _Allow_                  |
| Log Setting                              | **Log at Session End**                                  |                          |
| Profile type                             | _None_                                                  |                          |
| Schedule                                 | _None_                                                  |                          |
| QoS Marking                              | _None_                                                  |                          |

![Trust to Cloudflare WAN - General](https://developers.cloudflare.com/_astro/07_trust_to_mwan_general.34vAITJy_ZNNbXO.webp)![Trust to Cloudflare WAN - Source](https://developers.cloudflare.com/_astro/08_trust_to_mwan_source.BpuRH05s_wBJUt.webp)![Trust to Cloudflare WAN - Destination](https://developers.cloudflare.com/_astro/09_trust_to_mwan_dest.De2xwcdy_Z1OrDuF.webp)![Trust to Cloudflare WAN - Applications](https://developers.cloudflare.com/_astro/10_trust_to_mwan_apps.DQXUeCED_2316fU.webp)![Trust to Cloudflare WAN - Services/URL Categories](https://developers.cloudflare.com/_astro/11_trust_to_mwan_service-url.DHjD72HI_Z1316k3.webp)![Trust to Cloudflare WAN - Action](https://developers.cloudflare.com/_astro/12_trust_to_mwan_action.DDnplEF5_1AoKqz.webp) 

_Note: Labels in these images may reflect previous product names._

##### Trust to Cloudflare WAN command line

Terminal window

```

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow to Cloudflare_L3_Zone

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow from Trust_L3_Zone

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow source VLAN0100_10-1-100-0--24

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow source-user any

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow category any

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow application any

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow service application-default

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow hip-profiles any

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow action allow

set rulebase security rules Trust_to_Cloudflare_Magic_WAN_Allow rule-type universal


```

##### Cloudflare WAN to Trust dashboard

| Name                                     | Option                                                  | Value                    |
| ---------------------------------------- | ------------------------------------------------------- | ------------------------ |
| Cloudflare\_Magic\_WAN\_to\_Trust\_Allow | Rule Type                                               | _universal (default)_    |
| Group Rules by Tag                       | _None_                                                  |                          |
| Source tab                               | Source Zone                                             | **Cloudflare\_L3\_Zone** |
| Source Address                           | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** |                          |
| Destination tab                          | Destination Zone                                        | **Trust\_L3\_Zone**      |
| Destination Address                      | **VLAN0100\_10-1-100-0--24**                            |                          |
| Actions tab                              | Action                                                  | _Allow_                  |
| Log Setting                              | **Log at Session End**                                  |                          |
| Profile type                             | _None_                                                  |                          |
| Schedule                                 | _None_                                                  |                          |
| QoS Marking                              | _None_                                                  |                          |

![Cloudflare WAN to Trust - General](https://developers.cloudflare.com/_astro/13_mwan_to_trust_general.CLIPMgLb_1UTERY.webp)![Cloudflare WAN to Trust - Source](https://developers.cloudflare.com/_astro/14_mwan_to_trust_source.GRgD0hWh_Z1lp03q.webp)![Cloudflare WAN to Trust - Destination](https://developers.cloudflare.com/_astro/15_mwan_to_trust_dest.1rnkUqIF_Z134g59.webp)![Cloudflare WAN to Trust - Applications](https://developers.cloudflare.com/_astro/16_mwan_to_trust_apps.BktgyY-4_1nRk0a.webp)![Cloudflare WAN to Trust - Services/URL Categories](https://developers.cloudflare.com/_astro/17_mwan_to_trust_service-url.bKUMWAET_Z1kBXhm.webp)![Cloudflare WAN to Trust - Action](https://developers.cloudflare.com/_astro/18_mwan_to_trust_action.FJTlsp2v_1PHOm.webp) 

_Note: Labels in these images may reflect previous product names._

##### Cloudflare WAN to Trust command line

Terminal window

```

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow to Trust_L3_Zone

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow from Cloudflare_L3_Zone

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow source [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow destination VLAN0100_10-1-100-0--24

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow source-user any

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow category any

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow application any

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow service application-default

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow hip-profiles any

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow action allow

set rulebase security rules Cloudflare_Magic_WAN_to_Trust_Allow rule-type universal


```

### Policy-based forwarding - production traffic

Whether traffic ingresses or egresses Palo Alto Networks Next-Generation Firewall, it is important to ensure that traffic is routed symmetrically. This is accomplished through the use of policy-based forwarding.

Policy-based forwarding rules are only required for egress traffic.

Any traffic destined for Cloudflare WAN protected sites or Cloudflare WAN protected sites with Gateway egress must be routed across the IPsec tunnels.

Note

Security rules match traffic flows based on source and destination zone. Policy-based forwarding rules are applied per interface. Therefore, two policy-based forwarding rules are required for every one security rule - one for tunnel.1 and one for tunnel.2.

#### Dashboard policy-based forwarding - Cloudflare WAN production traffic via tunnel.1

| Name                                    | Option                       | Value                                                   |
| --------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| PBF\_Magic\_WAN\_Sites\_01              | Group Rules by Tag           | _None_                                                  |
| **Source tab**                          | Type                         | _Zone_                                                  |
| Zone                                    | **Trust\_L3\_Zone**          |                                                         |
| Source Address                          | **VLAN0100\_10-1-100-0--24** |                                                         |
| **Destination/Application/Service tab** | Destination Address          | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** |
| **Forwarding tab**                      | Action                       | _Forward_                                               |
| Egress Interface                        | _tunnel.1_                   |                                                         |
| Next hop                                | _IP Address_                 |                                                         |
| _CF\_MWAN\_IPsec\_VTI\_01\_Remote_      |                              |                                                         |

![PBF: Trust to Cloudflare WAN via tunnel.1 - General](https://developers.cloudflare.com/_astro/09_pbf_mwan_sites_tun01_general.B9Ui-2D4_Z23als0.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Source](https://developers.cloudflare.com/_astro/10_pbf_mwan_sites_tun01_source.C7svyFEp_Z2hmmLi.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Destinations](https://developers.cloudflare.com/_astro/11_pbf_mwan_sites_tun01_dest-app-service.BVIzYk7i_Z1b6biD.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Forwarding](https://developers.cloudflare.com/_astro/12_pbf_mwan_sites_tun01_forwarding.BgfRalCp_Z4YMz5.webp) 

_Note: Labels in these images may reflect previous product names._

#### Command line policy-based forwarding - Cloudflare WAN production traffic via tunnel.1

Terminal window

```

set rulebase pbf rules PBF_Magic_WAN_Sites_01 action forward nexthop ip-address CF_MWAN_IPsec_VTI_01_Remote

set rulebase pbf rules PBF_Magic_WAN_Sites_01 action forward egress-interface tunnel.1

set rulebase pbf rules PBF_Magic_WAN_Sites_01 from zone Trust_L3_Zone

set rulebase pbf rules PBF_Magic_WAN_Sites_01 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_Magic_WAN_Sites_01 source VLAN0100_10-1-100-0--24

set rulebase pbf rules PBF_Magic_WAN_Sites_01 destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase pbf rules PBF_Magic_WAN_Sites_01 source-user any

set rulebase pbf rules PBF_Magic_WAN_Sites_01 application any

set rulebase pbf rules PBF_Magic_WAN_Sites_01 service any

set rulebase pbf rules PBF_Magic_WAN_Sites_01 disabled no

set rulebase pbf rules PBF_Magic_WAN_Sites_01 negate-destination no


```

#### Dashboard policy-based forwarding - Cloudflare WAN production traffic via tunnel.2

| Name                                    | Option                       | Value                                                   |
| --------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| PBF\_Magic\_WAN\_sites\_02              | Group Rules by Tag           | _None_                                                  |
| **Source tab**                          | Type                         | _Zone_                                                  |
| Zone                                    | **Trust\_L3\_Zone**          |                                                         |
| Source Address                          | **VLAN0100\_10-1-100-0--24** |                                                         |
| **Destination/Application/Service tab** | Destination Address          | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** |
| **Forwarding tab**                      | Action                       | _Forward_                                               |
| Egress Interface                        | _tunnel.2_                   |                                                         |
| Next hop                                | _IP Address_                 |                                                         |
| _CF\_MWAN\_IPsec\_VTI\_02\_Remote_      |                              |                                                         |

![PBF: Trust to Cloudflare WAN via tunnel.2 - General](https://developers.cloudflare.com/_astro/13_pbf_mwan_sites_tun02_general.CStSssKo_Z1fkdLn.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Source](https://developers.cloudflare.com/_astro/14_pbf_mwan_sites_tun02_source.ATjxgSnK_Z1Ps5Nq.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Destinations](https://developers.cloudflare.com/_astro/15_pbf_mwan_sites_tun02_dest-app-service.CM_mCD4L_Z1nulwE.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Forwarding](https://developers.cloudflare.com/_astro/16_pbf_mwan_sites_tun02_forwarding.DMjVsrud_1A7Vnv.webp) 

_Note: Labels in these images may reflect previous product names._

#### Command line policy-based forwarding - tunnel.2

Terminal window

```

set rulebase pbf rules PBF_Magic_WAN_Sites_02 action forward nexthop ip-address CF_MWAN_IPsec_VTI_02_Remote

set rulebase pbf rules PBF_Magic_WAN_Sites_02 action forward egress-interface tunnel.2

set rulebase pbf rules PBF_Magic_WAN_Sites_02 from zone Trust_L3_Zone

set rulebase pbf rules PBF_Magic_WAN_Sites_02 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_Magic_WAN_Sites_02 source VLAN0100_10-1-100-0--24

set rulebase pbf rules PBF_Magic_WAN_Sites_02 destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase pbf rules PBF_Magic_WAN_Sites_02 source-user any

set rulebase pbf rules PBF_Magic_WAN_Sites_02 application any

set rulebase pbf rules PBF_Magic_WAN_Sites_02 service any

set rulebase pbf rules PBF_Magic_WAN_Sites_02 disabled no

set rulebase pbf rules PBF_Magic_WAN_Sites_02 negate-destination no


```

## Cloudflare WAN with Cloudflare Zero Trust (Gateway egress)

This section covers adding in support for the use of Cloudflare Gateway. Adding Cloudflare Gateway allows you to set up policies to inspect outbound traffic to the Internet through DNS, network, HTTP and egress filtering.

This use case can be supported in one of two ways:

* **Option 1**  
   * **Security Rule**: Extend the scope of the `Trust_to_Cloudflare_Magic_WAN_Allow` rule to allow any destination address.  
   * **Policy-Based Forwarding**: Extend the scope of `PBF_Magic_WAN_Sites_01` and `PBF_Magic_WAN_Sites_02` to allow any destination address.
* **Option 2**  
   * **Security Rule**: Add a new rule below `Trust_to_Cloudflare_Magic_WAN_Allow` called `Trust_to_MWAN_Gateway_Egress_Allow` to allow traffic to any destination address except for the Cloudflare WAN protected sites (using the Negate option).  
   * **Policy-Based Forwarding**: Add a new rule below `PBF_Magic_WAN_Sites_01` and `PBF_Magic_WAN_Sites_02` to allow any destination address except for the Cloudflare WAN protected sites (using the Negate option).

The following examples are based on Option 2.

Note

This example assumes the security rules and policy-based forwarding rules from the previous sections have been configured and are directly above the rules configured in this section.

Also, traffic from Trust to the Internet would typically be defined as `Trust_L3_Zone` to `Untrust_L3_Zone`. However, since egress Internet traffic will be routed through the IPsec tunnels, the rule must reference `Trust_L3_Zone` to `Cloudflare_L3_Zone`.

### Security Rule: Trust to Gateway Egress

#### Dashboard

| Name                                    | Option                                                             | Value                    |
| --------------------------------------- | ------------------------------------------------------------------ | ------------------------ |
| Trust\_to\_MWAN\_Gateway\_Egress\_Allow | Rule Type                                                          | _universal (default)_    |
| Group Rules By Tag                      | _None_                                                             |                          |
| **Source tab**                          | Source Zone                                                        | **Trust\_L3\_Zone**      |
| **Destination tab**                     | Destination Zone                                                   | **Cloudflare\_L3\_Zone** |
| Destination Address                     | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** **Negate** |                          |
| **Actions tab**                         | Action                                                             | _Allow_                  |
| Log Setting                             | **Log at Session End**                                             |                          |
| Profile Type                            | _None_                                                             |                          |
| Schedule                                | _None_                                                             |                          |
| QoS Marking                             | _None_                                                             |                          |

![Trust to Cloudflare WAN Egress - General](https://developers.cloudflare.com/_astro/01_trust_mwan_egress_general.Biz7B17n_11qRm5.webp)![Trust to Cloudflare WAN Egress - Source](https://developers.cloudflare.com/_astro/02_trust_mwan_egress_source.B7t96mux_Z282zjA.webp)![Trust to Cloudflare WAN Egress - Destination](https://developers.cloudflare.com/_astro/03__trust_mwan_egress_destination.BrBr5PhZ_2aUXls.webp)![Trust to Cloudflare WAN Egress - Applications](https://developers.cloudflare.com/_astro/04_trust_mwan_egress_apps.GpW02LW6_fWcwd.webp)![Trust to Cloudflare WAN Egress - Services/URL Categories](https://developers.cloudflare.com/_astro/05_trust_mwan_egress_service-url.CkJbZtLv_Z1VMf9R.webp)![Trust to Cloudflare WAN Egress - Action](https://developers.cloudflare.com/_astro/06_trust_mwan_egress_actions.D64ZOSoI_2rLCSo.webp) 

_Note: Labels in these images may reflect previous product names._

#### Command line

Terminal window

```

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow to Cloudflare_L3_Zone

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow from Trust_L3_Zone

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow source any

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow source-user any

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow category any

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow application any

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow service application-default

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow hip-profiles any

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow action allow

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow rule-type universal

set rulebase security rules Trust_to_MWAN_Gateway_Egress_Allow negate-destination yes


```

### Policy-based forwarding: Trust to Gateway egress via tunnel.1

#### Dashboard

| Name                                    | Option              | Value                                                              |
| --------------------------------------- | ------------------- | ------------------------------------------------------------------ |
| PBF\_MWAN\_Egress01                     | Group Rules By Tag  | _None_                                                             |
| **Source tab**                          | Source Zone         | **Trust\_L3\_Zone**                                                |
| **Destination/Application/Service tab** | Destination Address | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** **Negate** |
| **Forwarding tab**                      | Action              | _Forward_                                                          |
| Egress Interface                        | _tunnel.1_          |                                                                    |
| Next Hop                                | _IP Address_        |                                                                    |
| _CF\_MWAN\_IPsec\_VTI\_01\_Remote_      |                     |                                                                    |

![PBF: Trust to Cloudflare WAN Egress via tunnel.1 - General](https://developers.cloudflare.com/_astro/07_pbf_trust_mwan_egress_tun01_general.DanIxwjJ_Zs7iND.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Source](https://developers.cloudflare.com/_astro/02_trust_mwan_egress_source.B7t96mux_Z282zjA.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Destinations](https://developers.cloudflare.com/_astro/09_pbf_trust_mwan_egress_tun01_dest.D3-eCYMo_ZeUCxK.webp)![PBF: Trust to Cloudflare WAN via tunnel.1 - Forwarding](https://developers.cloudflare.com/_astro/10_pbf_trust_mwan_egress_tun01_forward.w-i02GXK_Z1S7PIz.webp) 

_Note: Labels in these images may reflect previous product names._

#### Command line

Terminal window

```

set rulebase pbf rules PBF_MWAN_Egress_01 action forward nexthop ip-address CF_MWAN_IPsec_VTI_01_Remote

set rulebase pbf rules PBF_MWAN_Egress_01 action forward egress-interface tunnel.1

set rulebase pbf rules PBF_MWAN_Egress_01 from zone Trust_L3_Zone

set rulebase pbf rules PBF_MWAN_Egress_01 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_MWAN_Egress_01 source VLAN0100_10-1-100-0--24

set rulebase pbf rules PBF_MWAN_Egress_01 destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase pbf rules PBF_MWAN_Egress_01 source-user any

set rulebase pbf rules PBF_MWAN_Egress_01 application any

set rulebase pbf rules PBF_MWAN_Egress_01 service any

set rulebase pbf rules PBF_MWAN_Egress_01 disabled no

set rulebase pbf rules PBF_MWAN_Egress_01 negate-destination yes


```

### Policy-based forwarding: Trust to Gateway egress via tunnel.2

#### Dashboard

| Name                                    | Option                       | Value                                                              |
| --------------------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| PBF\_MWAN\_Egress02                     | Group Rules By Tag           | _None_                                                             |
| **Source tab**                          | Source Zone                  | **Trust\_L3\_Zone**                                                |
| Source Address                          | **VLAN0100\_10-1-100-0--24** |                                                                    |
| **Destination/Application/Service tab** | Destination Address          | **VLAN0010\_10-1-10-0--24** **VLAN0020\_10-1-20-0--24** **Negate** |
| **Forwarding tab**                      | Action                       | _Forward_                                                          |
| Egress Interface                        | _tunnel.2_                   |                                                                    |
| Next Hop                                | _IP Address_                 |                                                                    |
| _CF\_MWAN\_IPsec\_VTI\_02\_Remote_      |                              |                                                                    |

![PBF: Trust to Cloudflare WAN Egress via tunnel.2 - General](https://developers.cloudflare.com/_astro/11_pbf_trust_mwan_egress_tun02_general.D8ffa0E__t9Amx.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Source](https://developers.cloudflare.com/_astro/12_pbf_trust_mwan_egress_tun02_source.UqvzUgLo_Z2aI4f8.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Destinations](https://developers.cloudflare.com/_astro/13_pbf_trust_mwan_egress_tun02_dest.DYJd_Nm6_Z1QmhP2.webp)![PBF: Trust to Cloudflare WAN via tunnel.2 - Forwarding](https://developers.cloudflare.com/_astro/14_pbf_trust_mwan_egress_tun02_forward.CDTxDSWp_FRp7j.webp) 

_Note: Labels in these images may reflect previous product names._

#### Command line

Terminal window

```

set rulebase pbf rules PBF_MWAN_Egress_02 action forward nexthop ip-address CF_MWAN_IPsec_VTI_02_Remote

set rulebase pbf rules PBF_MWAN_Egress_02 action forward egress-interface tunnel.2

set rulebase pbf rules PBF_MWAN_Egress_02 from zone Trust_L3_Zone

set rulebase pbf rules PBF_MWAN_Egress_02 enforce-symmetric-return enabled no

set rulebase pbf rules PBF_MWAN_Egress_02 source VLAN0100_10-1-100-0--24

set rulebase pbf rules PBF_MWAN_Egress_02 destination [ VLAN0010_10-1-10-0--24 VLAN0020_10-1-20-0--24 ]

set rulebase pbf rules PBF_MWAN_Egress_02 source-user any

set rulebase pbf rules PBF_MWAN_Egress_02 application any

set rulebase pbf rules PBF_MWAN_Egress_02 service any

set rulebase pbf rules PBF_MWAN_Egress_02 disabled no

set rulebase pbf rules PBF_MWAN_Egress_02 negate-destination yes


```

## Troubleshooting

Cloudflare recommends you consult [PAN-OS 9.1 Administrators Guide - Interpret VPN Error Messages ↗](https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/vpns/set-up-site-to-site-vpn/interpret-vpn-error-messages) and [PAN-OS 10.2 Administrators Guide - Interpret VPN Error Messages ↗](https://docs.paloaltonetworks.com/pan-os/10-2/pan-os-admin/vpns/set-up-site-to-site-vpn/interpret-vpn-error-messages) for general troubleshooting.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/manually/","name":"Manual configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/manually/third-party/","name":"Third-party integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-wan/configuration/manually/third-party/palo-alto/","name":"Palo Alto Networks NGFW"}}]}
```
