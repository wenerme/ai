---
title: Limitations
description: Protocol-specific limitations for Spectrum applications.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limitations

The following limitations apply to different protocols supported by Spectrum.

## HTTPS

At the moment, HTTPS applications do not support HTTP/3.

## UDP

At the moment, Cloudflare does not support packet fragmentation for UDP packets. If packets are fragmented, they will be dropped at Cloudflare’s edge. Additionally, UDP Spectrum applications are not supported on Magic Transit, BYOIP, Spectrum, and Bindings.

## Minecraft

Minecraft Java Edition is supported but Minecraft Bedrock Edition is not supported.

## Universal SSL

[Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) is not compatible with Cloudflare Spectrum. Use either an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) instead.

## Private Network Load Balancing

When using [Spectrum](https://developers.cloudflare.com/load-balancing/private-network/#on-ramps) as an on-ramp and [Cloudflare WAN](https://developers.cloudflare.com/load-balancing/private-network/#cloudflare-wan) as an off-ramp the [proxy protocol](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) setting in Spectrum is not supported.

## Cloudflare Tunnel

Integrating Spectrum with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is only supported for **HTTP/HTTPS** applications. This is because Spectrum must upstream the request through the [Layer 7 CDN products](https://developers.cloudflare.com/spectrum/reference/layer-7-analytics/#the-overlap-layer-7-traffic-being-proxied-through-spectrum) to reach the Tunnel service.

To correctly route traffic from Spectrum through a Cloudflare Tunnel, you must:

1. Configure your Spectrum application with the type set to **HTTP** or **HTTPS**.
2. Point the Spectrum application's origin to a hostname that is already [routing traffic](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) through your Cloudflare Tunnel (for example, via a [DNS record](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) or [Cloudflare Load Balancer](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/)).

Using a Spectrum application of any other type (for example, TCP) with a Cloudflare Tunnel origin is not supported. Pointing a Spectrum application's origin directly to your Tunnel's subdomain (`<UUID>.cfargotunnel.com`) is also not a valid configuration and will not work.

## Listen on ports configuration

By default, Spectrum is configured to listen on all ports, which can raise concerns for security auditors. However, it is important to note that Spectrum will only proxy connections from edge ports that are specifically configured within Cloudflare.

When a TCP handshake is initiated to any port for a Spectrum IP, the handshake will always be completed. If there is a Spectrum application configured for the port, the connection will be proxied to origin. If no application is configured, the connection is immediately terminated and no origin connection will be opened.

Spectrum will only ever proxy traffic to an origin if there is a Spectrum application configured for that port.

## IP access control

Currently, [custom rules](https://developers.cloudflare.com/waf/custom-rules/) do not work with Spectrum applications. Use [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) to allowlist, block, and challenge traffic for Spectrum applications based on the request's IP address, Autonomous System Number (ASN), or country.

Refer to [Configuration options](https://developers.cloudflare.com/spectrum/reference/configuration-options/#ip-access-rules) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/reference/limitations/","name":"Limitations"}}]}
```
