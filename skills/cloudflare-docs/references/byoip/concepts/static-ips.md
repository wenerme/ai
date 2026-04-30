---
title: Static IPs
description: Assign static IPs from your prefix to specific Cloudflare services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Static IPs

When you use Cloudflare as a [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), Cloudflare assigns shared [anycast IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) to proxied DNS records by default. These IPs can change at any time. Static IPs give you a set of specifically assigned Cloudflare IP addresses — Cloudflare will not change them without notifying you, and will typically only do so at your request.

Static IPs are useful when you need to allowlist your IPs or communicate them to third parties in advance.

Note

Although BYOIP and static IPs are different offerings, both can be managed using [Address Maps](https://developers.cloudflare.com/byoip/address-maps/).

Static IPs are allocated at the account level but can be assigned to a single zone, meaning multiple zones can share the same static IPs. You can specify which zones are mapped to your static IPs and control when the IPs for your zones change.

## Availability

Static IPs are available as an add-on purchase for Enterprise plans.

## Check Static IPs

You can find your leased Static IPs for CDN Ingress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/static-ips/","name":"Static IPs"}}]}
```
