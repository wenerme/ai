---
title: Cloudflare BYOIP
description: Get Cloudflare's security and performance while using your own IPs.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare BYOIP

Get Cloudflare's security and performance while using your own IPs.

 Enterprise-only 

Considering [how Cloudflare works as a reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), for some customers it may be important to maintain this functionality while also keeping their website or application associated with their own public IP space (instead of Cloudflare's[1](#user-content-fn-1)).

With Bring Your Own IP (BYOIP), Cloudflare announces your IPs in all our locations. Use your IPs with [Magic Transit](https://developers.cloudflare.com/magic-transit/), [Spectrum](https://developers.cloudflare.com/spectrum/), [CDN services](https://developers.cloudflare.com/cache/), or Gateway [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) and [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/).

Learn how to [get started](https://developers.cloudflare.com/byoip/get-started/).

---

## Features

###  Service bindings 

Control whether traffic destined for a given IP address is routed to Magic Transit, CDN, or Spectrum.

[ Use Service bindings ](https://developers.cloudflare.com/byoip/service-bindings/) 

###  Address maps 

Specify which IP addresses should be mapped to DNS records when they are proxied through Cloudflare.

[ Use Address maps ](https://developers.cloudflare.com/byoip/address-maps/) 

---

## More resources

[RPKI blog post](https://blog.cloudflare.com/rpki/) 

An overview of BGP, RPKI, and other important aspects of Internet routing.

[Reference Architectures](https://developers.cloudflare.com/reference-architecture/) 

Explore how you can leverage Cloudflare's platform to create solutions based on your business needs.

## Footnotes

1. Without BYOIP, when your domain's records are `proxied`, Cloudflare responds with a Cloudflare-owned [anycast IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}}]}
```
