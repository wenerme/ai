---
title: Changelog
description: Track the latest updates and changes to Load Balancing features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/load-balancing.xml) 

## 2025-10-16

  
**Monitor Groups for Advanced Health Checking With Load Balancing**   

Cloudflare Load Balancing now supports Monitor Groups, a powerful new way to combine multiple health monitors into a single, logical group. This allows you to create sophisticated health checks that more accurately reflect the true availability of your applications by assessing multiple services at once.

With Monitor Groups, you can ensure that all critical components of an application are healthy before sending traffic to an origin pool, enabling smarter failover decisions and greater resilience. This feature is now available via the API for customers with an Enterprise Load Balancing subscription.

#### What you can do:

* **Combine Multiple Monitors**: Group different health monitors (for example, HTTP, TCP) that check various application components, like a primary API gateway and a specific `/login` service.
* **Isolate Monitors for Observation**: Mark a monitor as "monitoring only" to receive alerts and data without it affecting a pool's health status or traffic steering. This is perfect for testing new checks or observing non-critical dependencies.
* **Improve Steering Intelligence**: Latency for Dynamic Steering is automatically averaged across all active monitors in a group, providing a more holistic view of an origin's performance.

This enhancement is ideal for complex, multi-service applications where the health of one component depends on another. By aggregating health signals, Monitor Groups provide a more accurate and comprehensive assessment of your application's true status.

For detailed information and API configuration guides, please visit our [developer documentation](https://developers.cloudflare.com/load-balancing/monitors/monitor-groups) for Monitor Groups.

## 2025-08-15

  
**Steer Traffic by AS Number in Load Balancing Custom Rules**   

You can now create more granular, network-aware Custom Rules in Cloudflare Load Balancing using the Autonomous System Number (ASN) of an incoming request.

This allows you to steer traffic with greater precision based on the network source of a request. For example, you can route traffic from specific Internet Service Providers (ISPs) or enterprise customers to dedicated infrastructure, optimize performance, or enforce compliance by directing certain networks to preferred data centers.

![Create a Load Balancing Custom Rule using AS Num](https://developers.cloudflare.com/_astro/asnum-custom-rule.CtcHu_zj_Z24vRO0.webp) 

To get started, create a [Custom Rule ↗](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) in your Load Balancer and select **AS Num** from the **Field** dropdown.

## 2025-08-06

  
**Improvements to Monitoring Using Zone Settings**   

Cloudflare Load Balancing Monitors support loading and applying settings for a specific zone to monitoring requests to origin endpoints. This feature has been migrated to new infrastructure to improve reliability, performance, and accuracy.

All zone monitors have been tested against the new infrastructure. There should be no change to health monitoring results of currently healthy and active pools. Newly created or re-enabled pools may need validation of their monitor zone settings before being introduced to service, especially regarding correct application of mTLS.

#### What you can expect:

* More reliable application of zone settings to monitoring requests, including  
   * Authenticated Origin Pulls  
   * Aegis Egress IP Pools  
   * Argo Smart Routing  
   * HTTP/2 to Origin
* Improved support and bug fixes for retries, redirects, and proxied origin resolution
* Improved performance and reliability of monitoring requests within the Cloudflare network
* Unrelated CDN or WAF configuration changes should have no risk of impact to pool health

## 2025-06-04

  
**New Account-Level Load Balancing UI and Private Load Balancers**   

We've made two large changes to load balancing:

* Redesigned the user interface, now centralized at the **account level**.
* Introduced [**Private Load Balancers**](https://developers.cloudflare.com/load-balancing/private-network/) to the UI, enabling you to manage traffic for all of your external and internal applications in a single spot.

This update streamlines how you manage load balancers across multiple zones and extends robust traffic management to your private network infrastructure.

![Load Balancing UI](https://developers.cloudflare.com/_astro/account-load-balancing-ui.CoCi7gPb_Z2rDoCY.webp) 

**Key Enhancements:**

* **Account-Level UI Consolidation:**  
   * **Unified Management:** Say goodbye to navigating individual zones for load balancing tasks. You can now view, configure, and monitor all your load balancers across every zone in your account from a single, intuitive interface at the account level.  
   * **Improved Efficiency:** This centralized approach provides a more streamlined workflow, making it faster and easier to manage both your public-facing and internal traffic distribution.
* **Private Network Load Balancing:**  
   * **Secure Internal Application Access:** Create [**Private Load Balancers**](https://developers.cloudflare.com/load-balancing/private-network/) to distribute traffic to applications hosted within your private network, ensuring they are not exposed to the public Internet.  
   * **WARP & Magic WAN Integration:** Effortlessly direct internal traffic from users connected via Cloudflare WARP or through your Magic WAN infrastructure to the appropriate internal endpoint pools.  
   * **Enhanced Security for Internal Resources:** Combine reliable Load Balancing with Zero Trust access controls to ensure your internal services are both performant and only accessible by verified users.
![Private Load Balancers](https://developers.cloudflare.com/_astro/private-load-balancer.yti20m_p_q5zIk.webp) 

## 2025-05-06

  
**UDP and ICMP Monitor Support for Private Load Balancing Endpoints**   

Cloudflare Load Balancing now supports **UDP (Layer 4)** and **ICMP (Layer 3)** health monitors for **private endpoints**. This makes it simple to track the health and availability of internal services that don’t respond to HTTP, TCP, or other protocol probes.

#### What you can do:

* Set up **ICMP ping monitors** to check if your private endpoints are reachable.
* Use **UDP monitors** for lightweight health checks on non-TCP workloads, such as DNS, VoIP, or custom UDP-based services.
* Gain better visibility and uptime guarantees for services running behind **Private Network Load Balancing**, without requiring public IP addresses.

This enhancement is ideal for internal applications that rely on low-level protocols, especially when used in conjunction with [**Cloudflare Tunnel**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), [**WARP**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), and [**Magic WAN**](https://developers.cloudflare.com/cloudflare-wan/) to create a secure and observable private network.

Learn more about [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) or view the full list of [supported health monitor protocols](https://developers.cloudflare.com/load-balancing/monitors/#supported-protocols).

## 2025-04-15

**Introducing Support for Orange-Clouded Origin Resolution**

Newly created Cloudflare Load Balancers will resolve orange-clouded origin addresses, provided the origins belong to the same account and zone as the Load Balancer. Existing Load Balancers will continue using the current resolution method. If ownership validation fails, the new system falls back to the existing behavior and defaults to a gray-clouded (DNS-only) lookup, typically resolving to anycast addresses.

## 2025-03-13

**Update to Load Balancing analytics**

Load Balancing request rates in analytics may decrease for some customers as an improvement is made to our infrastructure. This decrease in Load Balancing analytics does not indicate a decrease in HTTP requests received.

## 2025-02-20

**Zone name added to Load Balancing API responses**

Load Balancing API responses for Load Balancers now include a `zone_name` property, which provides the name of the zone in the response data.

## 2025-02-10

**Fix for Cloudflare Tunnel Consistency**

Fixes to improve the consistency of Cloudflare Tunnel handling within Cloudflare Load Balancers. These changes ensure more reliable and predictable routing, particularly when tunnels are involved.

## 2025-01-24

**Update to Cloudflare Tunnel Steering**

Introduced changes to the resolution of proxied domains that are backed by Cloudflare Tunnels on the same zone. These changes correct how orange-clouded records are steered to Cloudflare Tunnels via Cloudflare Load Balancers.

## 2025-01-16

**Update to Pool Health Monitoring**

We made changes to how we resolve and monitor proxied origins to assess pool health. Our analysis indicates no impact to customer configurations or operations. Contact customer support if you notice any unexpected behavior.

## 2024-12-20

**Load Balancing with the China Network**

You can now enable load balancers to be deployed to the [China Network](https://developers.cloudflare.com/china-network/). Refer to the [documentation](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-china/) for more details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/changelog/","name":"Changelog"}}]}
```
