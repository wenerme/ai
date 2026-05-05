---
title: Cloudflare Smart Shield
description: Use Smart Shield to protect your origin server, improve content availability, and reduce network latency.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Smart Shield

Protect your origin server, reduce load, and improve content delivery performance.

Every request that reaches your origin server costs resources — bandwidth, compute, and connections. When traffic spikes or your content is requested from many locations simultaneously, your origin can become a bottleneck. Smart Shield is a bundle of origin protection and performance features that reduce the number of requests and connections between Cloudflare's network and your origin server.

Smart Shield includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/), which organizes Cloudflare data centers into upper-tier and lower-tier groups so that only upper-tier data centers contact your origin for uncached content. Combined with [connection reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/), which packages multiple requests into a single connection to your origin, Smart Shield reduces both the volume of origin requests and the number of open connections.

Depending on your [package tier](https://developers.cloudflare.com/smart-shield/get-started/#packages-and-availability), Smart Shield can also include:

* [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/) — routes traffic through the fastest network paths to reduce latency.
* [Regional Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/) — adds a regional cache layer between lower-tier and upper-tier data centers for geographic data locality.
* [Cache Reserve](https://developers.cloudflare.com/smart-shield/configuration/cache-reserve/) — persistent cache storage that reduces cache misses for infrequently accessed content.
* [Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/) — monitors your origin server availability (Pro plans and above).
* [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) — reserved IP addresses for origin allowlisting (Enterprise).

For a visual overview of how these features work together, refer to the [network diagram](https://developers.cloudflare.com/smart-shield/concepts/network-diagram/).

Learn how to [get started](https://developers.cloudflare.com/smart-shield/get-started/).

---

## Related products

**[Cache](https://developers.cloudflare.com/cache/)** 

Cache stores copies of frequently accessed content (such as images, videos, or webpages) in geographically distributed data centers that are located closer to end users than origin servers, improving website performance.

**[Observatory](https://developers.cloudflare.com/speed/observatory/)** 

Observatory uses synthetic tests and real user data to assess the performance of your website, producing different metrics and insights. Cloudflare then uses this analysis to recommend optimizations that best address your performance issues.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}}]}
```
