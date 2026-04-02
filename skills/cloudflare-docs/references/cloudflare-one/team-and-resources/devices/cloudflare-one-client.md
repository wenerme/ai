---
title: Cloudflare One Client
description: The Cloudflare One Client (formerly WARP) securely and privately sends traffic from your devices to Cloudflare's global network, where Cloudflare Gateway can apply advanced web filtering. The Cloudflare One Client also enables you to use posture checks in Access and Gateway policies so that you can check a device's health before it connects to corporate applications.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/team-and-resources/devices/cloudflare-one-client/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare One Client

## About the Cloudflare One Client

The Cloudflare One Client (formerly WARP) securely and privately sends traffic from your devices to Cloudflare's global network, where [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) can apply advanced web filtering. The Cloudflare One Client also enables you to use [posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) in Access and Gateway policies so that you can check a device's health before it connects to corporate applications.

## How the Cloudflare One Client works

The Cloudflare One Client is a device client that builds proxy tunnels using either Wireguard or MASQUE, and builds a DNS proxy using DNS-over-HTTPS. The Cloudflare One Client supports all major operating systems, all common forms of endpoint management tooling, and has a robust series of management parameters and profiles to accurately scope the needs of a diverse user base.

The Cloudflare One Client consists of:

* Graphical User Interface (GUI): Control panel that allows end users to view the client's [status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) and perform actions such as connecting or disconnecting.
* WARP daemon (or service): Core background component responsible for establishing secure tunnels (using WireGuard or MASQUE) and handling all client functionality on your device.

For more information on how the Cloudflare One Client routes traffic, refer to the [client architecture page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/) and watch the video below.

Chapters

* ![Introduction and WARP GUI Basics](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction and WARP GUI Basics** 0s
* ![Consumer vs. Corporate WARP](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=57s)  
 **Consumer vs. Corporate WARP** 57s
* ![Device Profiles Explained](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=95s)  
 **Device Profiles Explained** 1m35s
* ![WARP Operating Modes](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=132s)  
 **WARP Operating Modes** 2m12s
* ![Split Tunneling](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=224s)  
 **Split Tunneling** 3m44s
* ![Conclusion](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=296s)  
 **Conclusion** 4m56s

## Installation details

The GUI and daemon (or service) have different names and are stored in the following locations:

Windows 

| Windows              |                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Service / Daemon** | C:\\Program Files\\Cloudflare\\Cloudflare WARP\\warp-svc.exe                                                  |
| **GUI application**  | C:\\Program Files\\Cloudflare\\Cloudflare WARP\\Cloudflare WARP.exe                                           |
| **Logs Location**    | DaemonC:\\ProgramData\\Cloudflare\\GUI LogsC:\\Users\\<USER>.WARP\\AppData\\Localor%LOCALAPPDATA%\\Cloudflare |

macOS 

| macOS                |                                                                                   |
| -------------------- | --------------------------------------------------------------------------------- |
| **Service / Daemon** | /Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP               |
| **GUI application**  | /Applications/Cloudflare WARP.app/Contents/MacOS/Cloudflare WARP                  |
| **Logs Location**    | Daemon/Library/Application Support/Cloudflare/GUI Logs\~/Library/Logs/Cloudflare/ |

Linux 

| Linux                |                                                   |
| -------------------- | ------------------------------------------------- |
| **Service / Daemon** | /bin/warp-svc                                     |
| **GUI application**  | /bin/warp-taskbar                                 |
| **Logs Location**    | /var/log/cloudflare-warp//var/lib/cloudflare-warp |

Along with the Cloudflare One Client GUI and daemon, `warp-cli` and `warp-diag` are also [installed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) on the machine and added to the system path for use from any terminal session.

[warp-diag](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) is a command-line diagnostics tool that collects logs, configuration details, and connectivity data from the Cloudflare One Client to help troubleshoot issues.

`warp-cli` is the command-line interface (CLI) for managing and configuring the Cloudflare One Client, allowing users to connect, disconnect, and adjust settings programmatically.

## Key benefits of using the Cloudflare One Client

Deploying the Cloudflare One Client significantly enhances your organization's security and visibility within Cloudflare Zero Trust:

* **Unified security policies everywhere**: With the Cloudflare One Client deployed in the Traffic and DNS mode, [Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) are not location-dependent — they can be enforced anywhere.
* **Advanced web filtering and threat protection**: Activate Gateway features for your device traffic, including:  
   * [Anti-Virus scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/)  
   * [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)  
   * [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#isolate)  
   * [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)
* **Application and device-specific insights**: With the Cloudflare One Client installed on your corporate devices, you can view detailed application and user-level activity on the [Zero Trust Shadow IT Discovery](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) page, while also monitoring device and network performance with [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) to proactively detect and resolve issues.
* **Device posture checks**: The Cloudflare One Client provides advanced Zero Trust protection by making it possible to check for [device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/). By setting up device posture checks, you can build Access or Gateway policies that check for a device's location, disk encryption status, OS version, and more.
* **Secure private and infrastructure access**: The Cloudflare One Client lets devices connect to [private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) over Cloudflare Tunnel and is required for [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/), enabling secure SSH with short-lived certificates and detailed logging.

## Client modes

The Cloudflare One Client offers flexible [operating modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) to suit your specific needs. The client can control device traffic as a full proxy, manage only DNS traffic as a DNS proxy, or both. The Cloudflare One Client is the most common method for sending user device traffic through Cloudflare Gateway for filtering and decryption.

## Next steps

* Review the [first-time setup](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/) guide to [install](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and [deploy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) the Cloudflare One Client on your corporate devices.
* Review possible [client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) and [settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) to best suit your organization's needs.
* Explore [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to enforce advanced DNS, network, HTTP, and egress policies with the Cloudflare One Client.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}}]}
```
