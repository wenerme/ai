---
title: Encrypt network flow data
description: Encrypt the network flowData sent from your router to Cloudflare by routing your network traffic through a device running the Cloudflare One Client.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Encrypt network flow data

**Last reviewed:**  over 1 year ago 

You can encrypt the network flow data sent from your router to Cloudflare by [routing ↗](https://www.cloudflare.com/learning/network-layer/what-is-routing/) your network flow traffic through a device running the Cloudflare One Client. Encrypted network flow traffic is then forwarded from the Cloudflare One Client device to Cloudflare's network flow endpoints.

To learn more about the Cloudflare One Client, and to install it on Linux, macOS, or Windows, refer to the [Cloudflare One Client documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/).

## 1\. Configure your devices

Follow the instructions in the [Network Flow (formerly Magic Network Monitoring) API](https://developers.cloudflare.com/api/resources/magic%5Fnetwork%5Fmonitoring/subresources/configs/methods/edit/) to configure your devices.

The `warp_devices` array at the account level is a list of WARP devices through which you can send encrypted flows. Each WARP device must have:

* The Cloudflare One Client UUID. You can obtain the UUID in the UI or through the following command:  
Terminal window  
```  
warp-cli registration show  
```
* A name.
* A `router_ip` that belongs to one of your configured router IP addresses.

For example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic Network Monitoring Admin`
* `Magic Network Monitoring Config Write`

Update account configuration fields

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config" \

  --request PATCH \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "warp_devices": [

        {

            "id": "<YOUR_WARP_DEVICE_UNIQUE_IDENTIFIER>",

            "name": "<NAME_OF_WARP_DEVICE>",

            "router_ip": "YOUR_ROUTER_IP"

        }

    ]

  }'


```

## 2\. Route Network Flow traffic through the Cloudflare One Client

Depending on where you installed the Cloudflare One Client, you may need to configure other devices on the subnet to route traffic through the Cloudflare One Client. If you have access to your router and it runs a version/OS supported by the Cloudflare One Client, Cloudflare recommends [Option 1](#option-1-default-gateway). This also applies if you use a software-based flow exporter (such as `softflowd`) instead of a physical router to collect and export flows.

### Option 1: Default gateway

If you installed the Cloudflare One Client on your router or machine collector (a computer, virtual machine, or server that collects flow information), no additional configuration is necessary. All traffic uses the router as the default gateway. Configure your flow export to send data to IP address `162.159.65.1` and port `2055` for NetFlow, or `162.159.65.1` and port `6343` for sFlow.

### Option 2: Alternate gateway

If you have access to the router but installed the Cloudflare One Client on another machine, you can configure the router to export flow traffic to the machine running the Cloudflare One Client. To do this:

1. Set the machine's IP address as the export destination on the router.
2. Configure the export port on the router to match the listening port on the Cloudflare One Client machine.
3. Redirect traffic that arrives at your machine running the Cloudflare One Client to the following Cloudflare destination IPs and ports:  
   * **For NetFlow**: IP address `162.159.65.1` and port `2055`.  
   * **For sFlow**: IP `162.159.65.1` and port `6343`.  
   For example, if WARP is running on a machine in your network with the IP `10.10.10.10`, and you configured it to accept traffic on port `2055` or `6343`, you need to configure your flow export-capable router to send data to `10.10.10.10` and port `2055` or `6343`.

In the machine running the Cloudflare One Client, you can redirect this traffic to Cloudflare using a proxy or redirect tool of your choice. Options include:

* Using `socat`, listen on the desired port for UDP traffic. Then, proxy that traffic to Network Flow's destination and port.  
   * `socat UDP-LISTEN:2055,reuseaddr,fork UDP:162.159.65.1:2055`  
   * `socat UDP-LISTEN:6343,reuseaddr,fork UDP:162.159.65.1:6343`
* Using any other proxy or port forwarding tool, such as `netcat`, `uredir` or `iptables`.

## 3\. (Optional) Configure split tunnels

If you do not want all traffic on your device to route through the Cloudflare One Client, [configure split tunnels/proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) to either only allow Network Flow traffic towards `162.159.65.1` or exclude everything else.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/tutorials/encrypt-network-flow-data/","name":"Encrypt network flow data"}}]}
```
