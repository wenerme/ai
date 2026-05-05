---
title: Network diagram
description: Visual overview of Smart Shield features and their role in origin protection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network diagram

The diagram below shows how requests flow through the Cloudflare network when Smart Shield is active, and where each feature applies along that path.

![Network diagram of requests being processed with all Smart Shield features](https://developers.cloudflare.com/_astro/network-diagram.PeUYDGK__Z2qTCdR.webp) 

Requests from visitors first reach a nearby lower-tier data center. For static (cacheable) content, the lower-tier checks its local cache. On a cache miss, the request moves to an upper-tier data center — selected by [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/) based on lowest latency to your origin. If [Regional Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/) is configured, a regional hub is checked before the upper-tier. Persistent storage through [Cache Reserve](https://developers.cloudflare.com/smart-shield/configuration/cache-reserve/) provides a final cache layer before requesting content from your origin.

For dynamic (non-cacheable) requests, [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/) finds the fastest network path to your origin. Between Cloudflare's upper-tier data centers and your origin, [connection reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/) packages multiple requests into a single connection, reducing the total number of connections your origin handles.

[Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/) run from multiple data centers to monitor whether your origin is online and responsive. [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) provide reserved IP addresses for traffic from Cloudflare to your origin, allowing you to restrict your origin firewall to a small allowlist.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/concepts/network-diagram/","name":"Network diagram"}}]}
```
