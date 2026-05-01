---
title: Global Acceleration
description: Simplify global asset deployment in China with connectivity from CMI, CBC Tech, and JD Cloud.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/china-network/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Global Acceleration

Note

Global Acceleration is a service offering that can be an add-on to China Network and also extends Zero Trust services into China.

Organizations that serve content or connect employees in Mainland China face connectivity challenges due to China's network infrastructure and regulatory requirements. Global Acceleration is a suite of connectivity offerings that address these challenges by providing optimized network paths into and out of China. Global Acceleration is provided by Cloudflare's partners including China Mobile International (CMI), CBC Tech, and JD Cloud.

Chapters

* ![Introduction](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=17s)  
 **Introduction** 17s
* ![Dynamic content outside of Mainland China](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=38s)  
 **Dynamic content outside of Mainland China** 38s
* ![Access to global services](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=103s)  
 **Access to global services** 1m43s
* ![Private network connectivity](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=174s)  
 **Private network connectivity** 2m54s
* ![Summary](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=223s)  
 **Summary** 3m43s

Global Acceleration can support the following scenarios:

| Service                                                                                 | Scenario                                                                                           |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [CDN Global Acceleration](#cdn-global-acceleration)                                     | Improved performance for dynamic content (API responses, personalized pages) on China Network CDN. |
| [Cloudflare One Client Global Acceleration](#cloudflare-one-client-global-acceleration) | Cloudflare One Client used in Mainland China.                                                      |
| [Cloudflare WAN Global Acceleration](#cloudflare-wan-global-acceleration)               | Cloudflare WAN used in Mainland China.                                                             |
| [ICP](#icp-services)                                                                    | China Network prerequisite.                                                                        |
| [MLPS](#mlps-services)                                                                  | China cybersecurity compliance certification.                                                      |
| [Travel SIM](#travel-sim)                                                               | Temporary Cloudflare One Client access for employees traveling to Mainland China.                  |

## CDN Global Acceleration

CDN Global Acceleration provides stable and reliable connections for dynamic content — such as API responses and personalized pages — entering and exiting China, improving performance for users within the country.

## Cloudflare One Client Global Acceleration

Cloudflare One Client Global Acceleration (formerly WARP Global Acceleration) enables [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) access within China, allowing remote employees to maintain secure and consistent connections.

## Cloudflare WAN Global Acceleration

Cloudflare WAN Global Acceleration (formerly Magic WAN Global Acceleration) enables [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) access within China, allowing in-office employees to maintain secure and reliable connectivity.

## ICP services

The Internet Content Provider (ICP) service simplifies the process of acquiring an [ICP filing or license](https://developers.cloudflare.com/china-network/concepts/icp/) for your domains. An ICP is a regulatory requirement for all websites operating in Mainland China.

## MLPS services

The Multi-Level Protection Scheme (MLPS) service add-on streamlines the process of obtaining MLPS Level 3 certification, a China cybersecurity compliance standard required for certain applications handling sensitive data.

## Travel SIM

Travel SIM offers temporary, seamless Cloudflare One Client access for individual employees traveling to China, ensuring uninterrupted connectivity during their visit.

---

## General process

### 1\. Validate prerequisites

Ensure that you have a Cloudflare [Enterprise plan ↗](https://www.cloudflare.com/plans/enterprise/) and [China Network](https://developers.cloudflare.com/china-network/), if you want CDN Global Acceleration. Cloudflare One Client and Cloudflare WAN entitlements are required for Cloudflare One Client Connection or Cloudflare WAN Global Acceleration.

### 2\. Sign contract

Contact your Cloudflare account team. They will assist you with contracting with us, or our local China partners, depending on the service.

### 3\. Deploy Global Acceleration

Our local China partners will assist you to deploy Global Acceleration.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/china-network/","name":"China Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/china-network/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/china-network/concepts/global-acceleration/","name":"Global Acceleration"}}]}
```
