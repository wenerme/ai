---
title: Dedicated CDN Egress IPs
description: Use reserved egress IP addresses for origin allowlisting and increased security.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Dedicated CDN Egress IPs

Enterprise customers can leverage dedicated egress[1](#user-content-fn-1) IPs for layer 7 [WAF](https://developers.cloudflare.com/waf/) and CDN services, as well as [Spectrum](https://developers.cloudflare.com/spectrum/). The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

Note

If you are interested in using Smart Shield Advanced with Dedicated CDN Egress IPs, reach out to your account team.

Dedicated CDN Egress IPs was formerly known as Cloudflare Aegis ([release blog post ↗](https://blog.cloudflare.com/cloudflare-aegis/)).

## Benefits

With Dedicated CDN Egress IPs, you can:

* Lock down your network firewall to only allow traffic from your dedicated IPs.
* Use [Cloudflare Access and CNI](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/other-products/#access-and-cni) to secure your applications without installing software or customizing code on your server.
* Ensure only authorized [Workers](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/other-products/#workers) can access your origin services.

## Scope

You can assign Dedicated CDN Egress IPs to single or multiple Cloudflare zones, and across different Cloudflare accounts.

Dedicated CDN Egress IPs are included within [BGP advertisement over CNI](https://developers.cloudflare.com/network-interconnect/).

Each dedicated egress pool can consist of either IPs from a [BYOIP prefix](https://developers.cloudflare.com/byoip/) or Cloudflare-leased IPs. A single dedicated egress pool cannot contain both BYOIPs and leased IPs. Also, a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

## Resources

* [ How it works ](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/)
* [ Setup ](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/setup/)
* [ IPs utilization ](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/ips-utilization/)
* [ Use with other Cloudflare products ](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/other-products/)

## Footnotes

1. From Cloudflare to your origin. Refer to [how it works](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/egress-ips/) for details. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/","name":"Dedicated CDN Egress IPs"}}]}
```
