---
description: Protocol-specific limitations for Spectrum applications.
title: Limitations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Limitations

Last updated Jun 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/reference/limitations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following limitations apply to different protocols supported by Spectrum.

## HTTPS

At the moment, HTTPS applications do not support HTTP/3.

## UDP

Cloudflare does not support packet fragmentation for UDP packets. If packets are fragmented, they will be dropped at Cloudflare’s edge.

Spectrum UDP applications are supported with [BYOIP](https://developers.cloudflare.com/spectrum/about/byoip/), including [CDN and Spectrum service bindings](https://developers.cloudflare.com/byoip/service-bindings/cdn-and-spectrum/). They are not currently supported with [Magic Transit service bindings](https://developers.cloudflare.com/byoip/service-bindings/).

## Minecraft

Minecraft Java Edition is supported but Minecraft Bedrock Edition is not supported.

## Universal SSL

[Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) is not compatible with Cloudflare Spectrum. Use either an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) instead.

## Private Network Load Balancing

When using [Spectrum](https://developers.cloudflare.com/load-balancing/private-network/#on-ramps) as an on-ramp into Private Network Load Balancing, the [proxy protocol](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) setting in Spectrum is not supported. This applies regardless of the [off-ramp](https://developers.cloudflare.com/load-balancing/private-network/) used to reach your private origin, including Cloudflare WAN and Cloudflare Tunnel.

## Cloudflare Tunnel

Integrating Spectrum with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is only supported for **HTTP/HTTPS** applications. This is because Spectrum must upstream the request through the [Layer 7 CDN products](https://developers.cloudflare.com/spectrum/reference/layer-7-analytics/#the-overlap-layer-7-traffic-being-proxied-through-spectrum) to reach the Tunnel service.

To correctly route traffic from Spectrum through a Cloudflare Tunnel, you must:

1. Configure your Spectrum application with the type set to **HTTP** or **HTTPS**.
2. Point the Spectrum application's origin to a hostname that is already [routing traffic](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) through your Cloudflare Tunnel (for example, via a [DNS record](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) or [Cloudflare Load Balancer](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/)).

Using a Spectrum application of any other type (for example, TCP) with a Cloudflare Tunnel origin directly is not supported. Pointing a Spectrum application's origin directly to your Tunnel's subdomain (`<UUID>.cfargotunnel.com`) is also not a valid configuration and will not work.

Alternative L4 routing

To route non-HTTP (TCP or UDP) traffic from a public Spectrum application to a private endpoint via Cloudflare Tunnel, configure a [Cloudflare Load Balancer with Private Network Load Balancing (LTM)](https://developers.cloudflare.com/load-balancing/private-network/) in between.

By defining private IP addresses as origins inside your Load Balancer pool and associating them with your tunnel's Virtual Network ID (`virtual_network_id`), the Load Balancer will receive the L4 traffic from Spectrum and route it to your private origin over the Cloudflare Tunnel.

## Listen on ports configuration

By default, Spectrum is configured to listen on all ports, which can raise concerns for security auditors. However, it is important to note that Spectrum will only proxy connections from edge ports that are specifically configured within Cloudflare.

When a TCP handshake is initiated to any port for a Spectrum IP, the handshake will always be completed. If there is a Spectrum application configured for the port, the connection will be proxied to origin. If no application is configured, the connection is immediately terminated and no origin connection will be opened.

Spectrum will only ever proxy traffic to an origin if there is a Spectrum application configured for that port.

## IP access control

Currently, [custom rules](https://developers.cloudflare.com/waf/custom-rules/) do not work with Spectrum applications. Use [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) to allowlist, block, and challenge traffic for Spectrum applications based on the request's IP address, Autonomous System Number (ASN), or country.

Refer to [Configuration options](https://developers.cloudflare.com/spectrum/reference/configuration-options/#ip-access-rules) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/limitations/#page","headline":"Limitations · Cloudflare Spectrum docs","description":"Protocol-specific limitations for Spectrum applications.","url":"https://developers.cloudflare.com/spectrum/reference/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
