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

Lease static IPs so that you can use a set of specifically assigned Cloudflare IPs. If you need to allowlist your IPs or to communicate your IPs to third parties, allocating static IPs to your account allows you to know them ahead of time.

Cloudflare will not change static IP addresses without notifying you, and will typically only do so at your request.

Note

Although BYOIP and static IPs are different offerings, both can be managed using [Address Maps](https://developers.cloudflare.com/byoip/address-maps/).

Static IPs are allocated to the account, but can be assigned to a single zone. This means that you can place multiple zones on the same static IPs. You can also specify which zones are mapped to your static IPs and control when the IPs for your zones change.

## Availability

Static IPs are available as an add-on purchase for Enterprise plans.

## Check Static IPs

You can find your leased Static IPs for CDN Ingress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/static-ips/","name":"Static IPs"}}]}
```
