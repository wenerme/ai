---
title: Cloudflare Magic Transit
description: Protect your network infrastructure from DDoS attacks with Magic Transit.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Magic Transit

Secure your network and improve performance at Cloudflare scale.

 Enterprise-only 

Magic Transit is a network security and performance solution that offers Distributed Denial of Service (DDoS) protection, traffic acceleration, and more for on-premises, cloud-hosted, and hybrid networks.

* **DDoS mitigation and protection**: Instead of relying on local infrastructure that large DDoS attacks can overwhelm, Magic Transit uses the [global Cloudflare Network ↗](https://www.cloudflare.com/network/) to ingest and mitigate attacks close to their source.
* **Traffic acceleration**: Magic Transit takes advantage of the Cloudflare global network to reduce latency and ensure that requests always have a data center nearby.

Learn more [about how Magic Transit works](https://developers.cloudflare.com/magic-transit/about/) and how to [get started](https://developers.cloudflare.com/magic-transit/get-started/).

---

## Features

###  Tunnel health checks 

Magic Transit sends health check probes to monitor network status and the health of specific network components.

[ Learn about health checks ](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) 

###  Traffic steering 

Magic Transit steers traffic along tunnel routes based on priorities you define during the onboarding process.

[ Learn about traffic steering ](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/) 

###  Cloudflare IPs 

Use Cloudflare-owned IP addresses if you want to protect a smaller network and do not meet Magic Transit's `/24` prefix length requirements.

[ Use Cloudflare IPs ](https://developers.cloudflare.com/magic-transit/cloudflare-ips/) 

###  BGP peering (beta) 

Use BGP peering between your networks and Cloudflare to automate adding or removing networks and subnets, and take advantage of failure detection and session recovery features.

[ Use BGP peering (beta) ](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) 

---

## Related products

**[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)** 

Cloudflare Network Firewall is a firewall-as-a-service (FWaaS) delivered from the Cloudflare global network to protect office networks and cloud infrastructure with advanced, scalable protection.

**[Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)** 

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare instead of using the public Internet for a more reliable and secure experience.

**[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)** 

Cloudflare DDoS protection secures websites, applications, and entire networks without compromising legitimate traffic performance.

**[Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/)** 

Get Cloudflare's security and performance while using your own IPs. With Bring Your Own IP (BYOIP), Cloudflare announces your IPs in all Cloudflare locations.

---

## More resources

[Data Center Protection](https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/) 

Follow a guided learning path to set up Magic Transit, configure DDoS protection, and go live with your network.

[Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/) 

Deep dive into the key architecture, functionalities, and network deployment options of Cloudflare Magic Transit.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}}]}
```
