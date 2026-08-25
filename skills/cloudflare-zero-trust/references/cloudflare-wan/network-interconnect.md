---
description: Connect to Cloudflare WAN with Network Interconnect.
title: Network Interconnect (CNI)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Network Interconnect (CNI)

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/network-interconnect/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare WAN (formerly Magic WAN) typically connects to Cloudflare through IPsec or GRE tunnels over the public Internet. Cloudflare Network Interconnect (CNI) is an alternative that provides a private, dedicated link — useful when you need lower latency, more consistent throughput, or want to avoid public Internet transit entirely.

Cloudflare Network Interconnect (CNI) provides a private, dedicated connection between your network and Cloudflare — bypassing the public Internet entirely. This is useful when you need consistent latency, higher throughput, or an additional layer of security that public Internet paths cannot guarantee.

With CNI, you get the same Cloudflare network services (firewall, routing, traffic management) applied to your traffic, but over a connection that does not traverse shared Internet infrastructure.

For more information about Network Interconnect, refer to the [Cloudflare Network Interconnect documentation](https://developers.cloudflare.com/network-interconnect/).

Run <code>traceroute</code>

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/traceroute/) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/network-interconnect/#page","headline":"Network Interconnect and Cloudflare WAN · Cloudflare WAN docs","description":"Connect to Cloudflare WAN with Network Interconnect.","url":"https://developers.cloudflare.com/cloudflare-wan/network-interconnect/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
