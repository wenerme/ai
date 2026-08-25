---
description: Connect to Cloudflare with private network interconnects.
title: Cloudflare Network Interconnect
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-interconnect/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Network Interconnect

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network-interconnect/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect your network infrastructure directly to Cloudflare

Enterprise-only

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly to Cloudflare — rather than using the public Internet — for a more performant and secure experience. With CNI, you can bring Cloudflare's full suite of network functions to your network edge.

## Benefits

Enterprises use CNI to achieve:

* **Enhanced Performance**: Gain lower latency and more consistent network throughput.
* **Increased Security**: Reduce your network's attack surface by connecting privately and avoiding the public Internet.

## Connection types

Choose the connection type for your infrastructure and operational needs.

|                    | Direct Interconnect                                                                                                     | Partner Interconnect                                                                                       | Cloud Interconnect                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Port type**      | A dedicated physical fiber connection between your network equipment and Cloudflare's hardware in a shared data center. | A virtual connection to Cloudflare established through one of our global connectivity partners.            | A private connection between a customer's cloud environments (for example, Amazon Web Services (AWS), Google Cloud) and Cloudflare.             |
| **Operations**     | You are responsible for procuring and managing the physical cross-connect to Cloudflare's equipment.                    | Your partner manages the connection logistics, often through a software-defined networking portal.         | Cloudflare connects to cloud providers' dedicated services, and customers establish private virtual circuits from their virtual private clouds. |
| **Ideal use case** | For customers collocated with Cloudflare who require maximum control, performance, and reliability.                     | For customers who are not in the same data center as Cloudflare or prefer a managed connectivity solution. | For customers with workloads in public clouds who need secure, reliable connectivity to Cloudflare services.                                    |

## Dataplane

Cloudflare's data centers may support one or more interconnect dataplanes. The dataplane is the type of equipment that terminates your direct connection:

* **Dataplane v1**: A peering connection to a Cloudflare edge data center that supports Generic Routing Encapsulation (GRE) tunnels for connecting with the Cloudflare Virtual Network, with optional GRE-less delivery for Magic Transit Direct Server Return.
* **Dataplane v2**: Is based on the Customer Connectivity Router (CCR), which is specifically designed for customer connectivity. It provides simplified routing without GRE tunneling and supports a 1,500-byte Maximum Transmission Unit (MTU) bidirectionally.

When you review the [available locations](https://developers.cloudflare.com/network-interconnect/static/cni-locations-05-may-2026.pdf) (PDF), you can see which dataplane version(s) are available.

## Product use cases

CNI provides a private point-to-point IP connection with Cloudflare. There are two Dataplanes that come with different technical specifications.

|                                                                                                                                                                                                   | Dataplane v1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Dataplane v2                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Magic Transit Direct Server Return (DSR)**  Distributed Denial of Service (DDoS) protection for all ingress traffic from the Internet to your public network. Send egress traffic via your ISP. | Supported with or without a GRE tunnel established over the interconnect circuit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Supported.                                                                                                                                                                |
| **Magic Transit with Egress**  DDoS protection for all ingress traffic from the Internet to your public network. Send egress traffic via Cloudflare.                                              | Supported with a GRE tunnel established over the interconnect circuit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Supported.                                                                                                                                                                |
| **Cloudflare WAN and Zero Trust**  Build a secure, private network backbone connecting your Zero Trust users and applications with all your sites, data centers, and clouds.                      | Supported with a GRE tunnel established over the interconnect circuit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Supported.                                                                                                                                                                |
| **Peering**  Exchange public routes with a single Cloudflare PoP (Point of Presence).                                                                                                             | Supported.  All customers connecting with the edge data center will exchange public routes at that PoP with AS13335\. Connectivity is established at each individual PoP. Routes for other edge locations in Cloudflare's network may not be available. Routes for customer-advertised prefixes will be available only in the connected PoP.                                                                                                                                                                                                                                                                                  | Not supported.                                                                                                                                                            |
| **Application Security and Performance**  Improve the performance and security of your web applications                                                                                           | **Supported via peering**: Customers can use Argo Smart Routing to direct origin traffic via the edge peering connection when it is determined to be the lowest latency option. Customers must maintain a direct Internet connection which will always be used for a portion of traffic and during failure scenarios. **Supported Via Magic Transit**: Customers may configure any product with an origin server IP address that is protected by Magic Transit. Magic Transit will direct this traffic via the overlay and customer can control interconnect next-hops using the Magic Transit Virtual Network routing table. | When the origin IPs are behind Magic Transit over a CNI v2, all Cloudflare services that work with public origins (like Load Balancer, WAF, Cache) will run over the CNI. |

For more details refer to the [prerequisites section](https://developers.cloudflare.com/network-interconnect/get-started/#prerequisites).

### Designing for high availability

To protect against a single point of failure, it is critical to design your CNI deployment for resilience. For business-critical applications, seek Cloudflare locations that support diversity on the device level. This ensures your connections terminate on physically separate hardware.

Refer to [Service Expectations](https://developers.cloudflare.com/network-interconnect/get-started/#service-expectations) for more information.

---

## Related products

[Magic Transit](https://developers.cloudflare.com/magic-transit/)

Magic Transit is a network security and performance solution that offers Distributed Denial of Service (DDoS) protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

[Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)

Improve security and performance for your entire corporate network, reducing cost and operation complexity.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/network-interconnect/#page","headline":"Overview · Cloudflare Network Interconnect docs","description":"Connect to Cloudflare with private network interconnects.","url":"https://developers.cloudflare.com/network-interconnect/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
