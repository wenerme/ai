---
description: In IP address management, service binding refers to the association of IPs to specific Cloudflare services. Review the available options and the API endpoints to set up service bindings.
title: IP address service bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# IP address service bindings

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/byoip/service-bindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In the context of BYOIP, service bindings map traffic destined for IP addresses to the Cloudflare service it should be routed through - such as Magic Transit, CDN, or Spectrum. A default binding covering the entire prefix is required when you first [onboard](https://developers.cloudflare.com/byoip/get-started/#2-create-service-bindings), and additional bindings can be created at any time to route specific IP addresses or CIDR ranges to a different service.

For example, you could set Magic Transit as the default service for Layer 3 DDoS protection across the entire prefix, while directing specific IPs to the CDN for Layer 7 processing. Refer to [Scope](#scope) for the available combinations.

Note

**API-only**: Service binding operations are currently only available via API. You can find all endpoints and their specifications in the [Cloudflare API documentation](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/). For detailed guidance, refer to the sections and tutorials linked below.

**Time to propagate**: Service bindings take four to six hours to propagate across Cloudflare's global network after being created or deleted. Services for the IP addresses in scope are likely disrupted during this window.

## Scope

Customers using BYOIP with Magic Transit, [CDN services](https://developers.cloudflare.com/cache/), or [Spectrum](https://developers.cloudflare.com/spectrum/) can leverage the [service binding API endpoints](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service%5Fbindings/) to selectively route traffic through the CDN [1](#user-content-fn-1) or Spectrum [2](#user-content-fn-2) pipelines on a per-IP address basis. This means:

* You can upgrade individual IPs within a Magic Transit prefix to either a CDN IP or a Spectrum IP. For example, if you have a Magic Transit prefix `203.0.113.0/24`, you can upgrade `203.0.113.1` to CDN and `203.0.113.2` to Spectrum.
* You can upgrade individual IPs within a CDN prefix to a Spectrum IP. For example, if you have a CDN prefix `203.0.113.0/24`, you can upgrade `203.0.113.1` to Spectrum.
* You can upgrade individual IPs within a Spectrum prefix to a CDN IP. For example, if you have a Spectrum prefix `203.0.113.0/24`, you can upgrade `203.0.113.1` to CDN.

Refer to [Magic Transit with CDN](https://developers.cloudflare.com/byoip/service-bindings/magic-transit-with-cdn/) or [CDN and Spectrum](https://developers.cloudflare.com/byoip/service-bindings/cdn-and-spectrum/) for detailed guidance.

Caution

Magic Transit customers must ensure that their contract includes CDN and/or Spectrum according to their needs.

### CDN (Cache)

When a service binding of type `CDN` is applied, once the change has propagated across Cloudflare's global network (four to six hours), any HTTP requests are directed into the CDN pipeline for Layer 7 processing.

### Spectrum

When a service binding of type `Spectrum` is applied, once the change has propagated across Cloudflare's global network (four to six hours), any TCP/HTTP requests are directed into the Spectrum pipeline for Layer 4 or Layer 7 processing.

UDP applications

Spectrum UDP applications are supported with BYOIP, including [CDN and Spectrum service bindings](https://developers.cloudflare.com/byoip/service-bindings/cdn-and-spectrum/). However, they are [not currently supported with Magic Transit service bindings](https://developers.cloudflare.com/spectrum/reference/limitations/#udp).

### Magic Transit

Note

Magic Transit can only be used as default binding, spanning across your entire prefix. You can then add CDN or Spectrum for smaller subnets but not the other way around.

The entire BYOIP prefix is primarily announced for Magic Transit, providing layer 3 DDoS protection and acceleration. Traffic not explicitly bound to CDN will flow through Magic Transit.

Also, traffic egressing to an IP in the prefix will always go to Magic Transit, even if there is an overlapping binding for CDN or Spectrum. This allows customers who want to use the same IP as ingress IP and as origin IP to do so.

flowchart LR
        accTitle: Cloudflare as a reverse proxy
        accDescr: Diagram showing Cloudflare's network between clients and the origin server.
        A[Client] --ingress--> B((Cloudflare))--egress--> C[(Origin server)]

When adding a service binding for a given IP address, it must be either a CDN service binding or a Spectrum service binding. It is not possible (or necessary) to bind both services.

### CDN egress

[Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) (formerly known as Aegis) is only available for Enterprise. If you are interested, reach out to your account team. Also note that a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

## Tutorials

* [Use BYOIP with Magic Transit and CDN](https://developers.cloudflare.com/byoip/service-bindings/magic-transit-with-cdn/)
* [Use BYOIP with CDN and Spectrum](https://developers.cloudflare.com/byoip/service-bindings/cdn-and-spectrum/)

## Footnotes

1. Layer 7 HTTP-based [↩](#user-content-fnref-1)
2. Layer 4 or Layer 7 HTTP with custom ports [↩](#user-content-fnref-2)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/service-bindings/#page","headline":"IP address service bindings · Cloudflare BYOIP docs","description":"In IP address management, service binding refers to the association of IPs to specific Cloudflare services. Review the available options and the API endpoints to set up service bindings.","url":"https://developers.cloudflare.com/byoip/service-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
```
