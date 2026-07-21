---
description: Get Cloudflare's security and performance while using your own IPs.
title: Cloudflare BYOIP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cloudflare BYOIP

Last updated Apr 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/byoip/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Get Cloudflare's security and performance while using your own IPs.

 Enterprise-only

When you use Cloudflare as a [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), Cloudflare responds to DNS queries for proxied records with Cloudflare-owned IP addresses[1](#user-content-fn-1). For some organizations, it is important to keep their website or application associated with IP addresses they already own rather than using Cloudflare's.

With Bring Your Own IP (BYOIP), Cloudflare announces your IP prefixes in all our locations. Use your IPs with [Magic Transit](https://developers.cloudflare.com/magic-transit/), [Spectrum](https://developers.cloudflare.com/spectrum/), [CDN services](https://developers.cloudflare.com/cache/), or Gateway [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) and [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/).

Learn how to [get started](https://developers.cloudflare.com/byoip/get-started/).

---

## Features

[Service bindings](https://developers.cloudflare.com/byoip/service-bindings/)

Control whether traffic destined for a given IP address is routed to Magic Transit, CDN, or Spectrum.

 Use Service bindings

[Address maps](https://developers.cloudflare.com/byoip/address-maps/)

Specify which IP addresses should be mapped to DNS records when they are proxied through Cloudflare.

 Use Address maps

---

## More resources

### [ RPKI blog post ](https://blog.cloudflare.com/rpki/)

An overview of BGP, RPKI, and other important aspects of Internet routing.

### [ Reference Architectures ](https://developers.cloudflare.com/reference-architecture/)

Explore how you can leverage Cloudflare's platform to create solutions based on your business needs.

## Footnotes

1. Without BYOIP, when your domain's records are `proxied`, Cloudflare responds with a Cloudflare-owned [anycast IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/byoip/#page","headline":"Bringing Your Own IPs to Cloudflare · Cloudflare BYOIP docs","description":"Get Cloudflare's security and performance while using your own IPs.","url":"https://developers.cloudflare.com/byoip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
