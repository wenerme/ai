---
description: How Spectrum Layer 4 traffic can appear in Layer 7 analytics dashboards.
title: Why Spectrum-enabled hostnames might appear in Layer 7 Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Why Spectrum-enabled hostnames might appear in Layer 7 Analytics

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/reference/layer-7-analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Even when you have Spectrum enabled to handle Layer 4 traffic (for example, TCP/UDP connections), you may still notice traffic in your Layer 7 (L7) analytics dashboard. This is due to the way Cloudflare's Layer 7 CDNand Spectrum handle customer identity differently.

## How Spectrum identifies a user (Layer 4)

In Spectrum, the identity of the customer hostname is based on the Cloudflare IP address that the client uses to connect to the edge. Here is the typical process:

1. Spectrum sets up a DNS hostname in the customer's zone that points to its Spectrum edge IP, and links this edge IP and port to the customer's configuration.
2. The client performs a DNS lookup on the Spectrum hostname, retrieves the Spectrum edge IP, and connects to that IP and port.
3. Spectrum uses this edge IP and port to match the connection to the customer's configuration, identifying the customer.

This process focuses on Layer 4 associating a hostname and customer configuration around IP addresses and ports.

## How the CDN identifies a user (Layer 7)

1. The customer sets up a DNS hostname in their zone that directs traffic to their origin server.
2. The client performs a DNS lookup on the CDN hostname, and the DNS server responds with a CDN edge IP. In contrast to Spectrum, the CDN edge IP is primarily used for traffic management rather than customer identity, as multiple customers can share the same CDN edge IP.

For the CDN, identifying the customer relies heavily on resolving hostnames during the TLS handshake (SNI) and the HTTP request (`Host` header). Notably, the CDN is designed to accept any hostname that matches the customer's zone (for example, `*.example.com`), even if there is no specific Layer 7 DNS match. This means that even Spectrum or Load Balancer hostnames will be accepted as valid under `*.example.com`.

## The overlap: Layer 7 traffic being proxied through Spectrum

Because the CDN is designed to accept any hostname under your zone (for example, `spectrum.example.com`), HTTP traffic that should first be proxied by Spectrum, or even HTTP traffic meant for a Layer-4-only Spectrum app, may sometimes be processed directly by the Layer 7 CDN system. The process is the following:

1. The client connects to a Layer 7 CDN edge IP while using the hostname of a Spectrum application (for example, `spectrum.example.com`) during both the TLS handshake and the HTTP request. Essentially, this means the client is attempting to access `spectrum.example.com` on an incorrect IP.
2. The CDN accepts this hostname as part of the customer zone during both the TLS and HTTP phases because it is designed to recognize any hostname under `*.example.com`. As a result, the request passes through the CDN under the zone's identity.
3. However, when the CDN attempts to connect to the origin server, it performs an internal DNS lookup of the HTTP hostname, which resolves to the Spectrum IP (from `spectrum.example.com` to the Spectrum edge IP). Consequently, the CDN establishes an origin connection to Spectrum, loading its configuration and forwarding the request to the Spectrum origin.

This means traffic for this hostname undergoes the standard Layer 7 CDN products, including Analytics and logs.

## Blocking unwanted L7 traffic

If you want to prevent traffic for Layer-4-only Spectrum hostnames from being proxied through Layer 7 to your origin (including unwanted scans or requests), we recommend implementing a Layer 7 WAF (Web Application Firewall) rule. This rule can block traffic directed at specific hostnames or ports, ensuring that only legitimate traffic reaches your Spectrum service.

For example, you can create a WAF rule to block requests to `spectrum.example.com` unless they originate from a Spectrum IP or a customer's Spectrum BYOIP. The traffic will still be logged in Layer 7 Analytics, including WAF Security Events, but this prevents it from arriving at the wrong address and looping through the CDN a second time.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/layer-7-analytics/#page","headline":"Why Spectrum-enabled hostnames might appear in Layer 7 Analytics · Cloudflare Spectrum docs","description":"How Spectrum Layer 4 traffic can appear in Layer 7 analytics dashboards.","url":"https://developers.cloudflare.com/spectrum/reference/layer-7-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
