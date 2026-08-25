---
description: Use 1.1.1.1 on IPv6-only networks.
title: Support for IPv6-only networks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Support for IPv6-only networks

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/infrastructure/ipv6-networks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

While network infrastructure is shifting towards IPv6-only networks, providers still need to support IPv4 addresses. Dual-stack networks (networks in which all nodes have both IPv4 and IPv6 connectivity capabilities) can understand both IPv4 and IPv6 packets. However, not all networks are dual-stack, and IPv6-only networks need a translation mechanism to reach IPv4 resources.

1.1.1.1 supports DNS64, a mechanism that synthesizes AAAA records (DNS records that map domain names to IPv6 addresses) from A records (DNS records that map domain names to IPv4 addresses) when no AAAA records exist. This allows IPv6-only clients to receive a usable IPv6 address for destinations that only have an IPv4 address, so the client can still connect through the network's NAT64 gateway.

Note

You should only turn on DNS64 if you are managing or using an IPv6-only network. While the resolver can synthesize IPv6 addresses, it cannot synthesize their record signatures for domains using DNSSEC (DNS Security Extensions, which add cryptographic signatures to DNS records to verify their authenticity). A DNS client that revalidates signatures would reject these synthesized records because they lack valid signatures.

A good tradeoff is to use a secure protocol such as [DNS over TLS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/) or [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) between the client and the resolver to prevent eavesdropping and tampering on the connection to the resolver.

## Configure DNS64

DNS64 is specifically for networks that already have NAT64 (Network Address Translation from IPv6 to IPv4) support. NAT64 translates IPv6 traffic to IPv4 at the network level, while DNS64 provides the corresponding translated addresses through DNS. If you are a network operator who has NAT64, you can test our DNS64 support by updating it to the following IP addresses:

```txt
2606:4700:4700::64
2606:4700:4700::6400
```

Some devices use separate fields for all eight parts of IPv6 addresses and cannot accept the `::` IPv6 abbreviation syntax. For such fields enter:

```txt
2606:4700:4700:0:0:0:0:64
2606:4700:4700:0:0:0:0:6400
```

## Test DNS64

After your configuration, visit an IPv4-only address to check if you can reach it over your IPv6-only network. For example, you can visit [https://ipv4.google.com ↗](https://ipv4.google.com). If the page loads, DNS64 and NAT64 are working together to translate your connection.

Visit [http://test-ipv6.com/ ↗](http://test-ipv6.com/) to test if it can detect your IPv6 address. If you receive a `10/10`, your IPv6 is configured correctly.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/infrastructure/ipv6-networks/#page","headline":"Support for IPv6-only networks · Cloudflare 1.1.1.1 docs","description":"Use 1.1.1.1 on IPv6-only networks.","url":"https://developers.cloudflare.com/1.1.1.1/infrastructure/ipv6-networks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPv6"]}
```
