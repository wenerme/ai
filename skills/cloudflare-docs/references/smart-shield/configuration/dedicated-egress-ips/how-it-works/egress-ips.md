---
title: Egress IPs
description: How egress IPs are allocated across IPv4 and IPv6 for your account.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/configuration/dedicated-egress-ips/how-it-works/egress-ips.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Egress IPs

When you use Cloudflare [as a reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy), [Cloudflare's global network ↗](https://www.cloudflare.com/network/) sits between client requests and your origin servers.

flowchart LR
        accTitle: Cloudflare as a reverse proxy
        accDescr: Diagram showing Cloudflare's network between clients and the origin server.
        A[Client] <--> B((Cloudflare))<--> C[(Origin server)]

Zooming into what happens as a request routes through Cloudflare, you can consider two parts of the process: ingress and egress.

flowchart LR
        accTitle: Cloudflare as a reverse proxy
        accDescr: Diagram showing Cloudflare's network between clients and the origin server.
        A[Client] --ingress--> B((Cloudflare))--egress--> C[(Origin server)]

Ingress refers to the data center where the client request lands on, based on Internet routing. From there on, the request will be processed according to your Cloudflare configurations and, if needed, a connection to the origin will be initiated via an egress data center.

Traditionally, Cloudflare maintains a very large pool of egress IPs that are used by all Cloudflare customers and are [publicly documented ↗](https://www.cloudflare.com/ips/). With Dedicated CDN Egress IPs, Cloudflare connects to your origin using IPs that are reserved for you.

## BYOIP or Cloudflare-leased

Each dedicated CDN egress IP pool can consist of either IPs from a [BYOIP prefix](https://developers.cloudflare.com/byoip/) or Cloudflare-leased IPs. A single dedicated CDN egress IP pool cannot contain both BYOIPs and leased IPs.

You can find your leased dedicated IPs for CDN egress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

If you are using BYOIP, refer to **BYOIP prefixes** instead.

## IPs allocation

Dedicated CDN Egress IPs support both IPv4 and IPv6 addresses.

IPv6 address ranges are deployed globally, meaning your dedicated IPv6 addresses can be used for connections from Cloudflare to your origin servers across all Cloudflare data centers.

China exception

Dedicated CDN Egress IPs are currently **not** available in the [Cloudflare China Network](https://developers.cloudflare.com/china-network/).

For IPv4 addresses, you should work with your account team to choose the locations where each IP should be deployed. Ideally, your dedicated IPv4 addresses should be placed near your origin servers and adjusted to the amount of traffic expected for each region.

Refer to [connection forwarding](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/connection-forwarding/) to understand how requests are processed when reaching different Cloudflare data centers.

### Connections to your origin

Each Dedicated CDN Egress IP can support 40,000 concurrent connections per origin IP port. For example, if you have one dedicated IP and two origins (A and B), this single IP can support 40,000 concurrent connections to origin A, while simultaneously supporting 40,000 concurrent connections to origin B.

Dedicated CDN Egress IPs also benefit from [connection reuse and coalescing](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/).

GraphQL Analytics API allows you to get visibility over [IPs utilization](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/ips-utilization/).

### Regional Services

If you are using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/), you should take this into consideration when allocating dedicated IPv4 addresses. Traffic will egress from the specified locations as long as you have Dedicated CDN Egress IPs provisioned in those locations.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/","name":"Dedicated CDN Egress IPs"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/how-it-works/","name":"How it works"}},{"@type":"ListItem","position":6,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/how-it-works/egress-ips/","name":"Egress IPs"}}]}
```
