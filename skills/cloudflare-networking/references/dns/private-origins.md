---
description: Connect Cloudflare's application services to your private network by proxying public hostnames to private origins.
title: Cloudflare Services for Private Origins
image: https://developers.cloudflare.com/dns/private-origins/og.png?v=66c53ac76302871d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Services for Private Origins

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/private-origins/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Proxy HTTP/HTTPS traffic from public hostnames to origins in your private network.

Connect Cloudflare's application services to origins in your private network. Traffic reaches the origin over your existing Cloudflare One connectivity: Cloudflare WAN (IPsec, GRE, or CNI), Cloudflare Tunnel, or Cloudflare Mesh. The CDN, WAF, Cache, and other proxied features apply to this traffic the same way they apply to traffic destined for public origins.

To get started, check the [prerequisites](#prerequisites), follow the setup guide for your connectivity type, then create a DNS record with [private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/) enabled.

---

## Prerequisites

- **Private Origins** is available for your account. Contact your account team to enable it.
- **Cloudflare One connectivity** to the network where your origin lives: Cloudflare WAN (IPsec, GRE, or CNI), Cloudflare Tunnel, or Cloudflare Mesh.
- **A route to the origin in your default virtual network.** Private network routing does not support selecting another virtual network.
- **For Cloudflare WAN and Cloudflare Mesh only:**
  - [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing) is available for your account. Contact your account team to enable it. This applies to new and existing accounts.
  - Return routes in your private network for the [Cloudflare source IP ranges](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/): `100.64.0.0/12` for IPv4 (default, configurable) and `2606:4700:cf1:5000::/64` for IPv6.

Cloudflare Tunnel does not need Unified Routing or return routes. Your origin sees the host running `cloudflared` as the source.

## Limitations

- Argo Smart Routing is not supported for private origins.
- [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) are not supported for private origins. The source IPs your origin sees are the [Cloudflare source IP ranges](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).
- Origin health checks require [Load Balancing](https://developers.cloudflare.com/load-balancing/). Configurations without Load Balancing do not get origin health visibility.
- Traffic uses your default virtual network. Selecting another virtual network is not supported.
- Zero Trust network session logs are not available for this traffic.
- [Spectrum](https://developers.cloudflare.com/spectrum/) private origins are in beta. Proxy Protocol is not delivered over private networks yet.

Caution

With Tiered Cache enabled, cacheable requests that miss cache can fail with HTTP `403` at the upper tier when the origin is reached over Cloudflare WAN. The origin is never contacted. Dynamic requests are not affected. As a workaround, create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) that bypasses cache for the affected hostnames.

Private network connectivity also works beyond HTTP. [Spectrum](https://developers.cloudflare.com/spectrum/) (beta) can sit in front of TCP and UDP services on private IPs, and [Workers VPC](https://developers.cloudflare.com/workers-vpc/) bindings let Workers reach private origins directly.

---

## Resources

- [Set up a private origin via Cloudflare WAN](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-wan/)
- [Set up a private origin via Cloudflare Tunnel](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-tunnel/)
- [Set up a private origin via Cloudflare Mesh](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/)
- [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/)
- [Troubleshooting](https://developers.cloudflare.com/dns/private-origins/troubleshooting/)

---

## Related products

[Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)

Connect your private network to Cloudflare with IPsec, GRE, or CNI.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)

Connect individual hosts and networks to Cloudflare with `cloudflared`.

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)

Connect devices and sites to Cloudflare with the Mesh client.

[Spectrum](https://developers.cloudflare.com/spectrum/)

Proxy TCP and UDP traffic to services on private IPs.

[Workers VPC](https://developers.cloudflare.com/workers-vpc/)

Let Workers reach private origins directly through bindings.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/dns/private-origins/#page","headline":"Cloudflare Services for Private Origins","description":"Connect Cloudflare's application services to your private network by proxying public hostnames to private origins.","url":"https://developers.cloudflare.com/dns/private-origins/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/private-origins/og.png?v=66c53ac76302871d","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
