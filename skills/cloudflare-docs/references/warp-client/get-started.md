---
title: Get started
description: Install the Cloudflare WARP client on your devices.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/warp-client/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Looking for Zero Trust?

This documentation is for the consumer version of WARP (1.1.1.1 with WARP). If you are using WARP for Zero Trust security, refer to the [Cloudflare One Client documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/).

Before installing and setting up the WARP client, ensure that your device meets the following system requirements:

## Android

| **OS version** | 5.0+ |
| -------------- | ---- |

[Download for Android ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone)

## iOS

| **OS version** | iOS 11+ |
| -------------- | ------- |

[Download for iOS ↗](https://apps.apple.com/us/app/id1423538627)

## Linux

| **OS version**             | CentOS 8, RHEL 8, RHEL 9 [1](#user-content-fn-1), Debian 12, Debian 13, Fedora 34, Fedora 35, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                |
| **HD space**               | 75 MB                                                                                                                            |
| **Memory**                 | 35 MB                                                                                                                            |
| **Network interface type** | Wi-Fi or LAN                                                                                                                     |
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                   |

## Footnotes

1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)
2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)

[Download for Linux ↗](https://pkg.cloudflareclient.com/)

## macOS

| **OS version**             | Sonoma 14.0+, Sequoia 15.1+ (15.0.x is not supported), Tahoe 26.0+ |
| -------------------------- | ------------------------------------------------------------------ |
| **Processor**              | Intel or M series                                                  |
| **HD space**               | 75 MB                                                              |
| **Memory**                 | 35 MB                                                              |
| **Network interface type** | Wi-Fi or LAN                                                       |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                     |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

[Download for macOS ↗](https://downloads.cloudflareclient.com/v1/download/macos/ga)

## Windows

| **OS version**             | Windows 10 LTSC, Windows 11, Windows 365 Cloud PC running Windows 11 |
| -------------------------- | -------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                    |
| **.NET Framework version** | 4.7.2 or later                                                       |
| **HD space**               | 184 MB                                                               |
| **Memory**                 | 3 MB                                                                 |
| **Network interface type** | Wi-Fi or LAN                                                         |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                       |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

[Download for Windows ↗](https://downloads.cloudflareclient.com/v1/download/windows/ga)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/warp-client/","name":"WARP Client"}},{"@type":"ListItem","position":3,"item":{"@id":"/warp-client/get-started/","name":"Get started"}}]}
```
