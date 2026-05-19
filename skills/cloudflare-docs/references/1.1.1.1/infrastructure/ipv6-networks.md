---
title: Support for IPv6-only networks
description: Use 1.1.1.1 on IPv6-only networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Support for IPv6-only networks

While network infrastructure is shifting towards IPv6-only networks, providers still need to support IPv4 addresses. Dual-stack networks (networks in which all nodes have both IPv4 and IPv6 connectivity capabilities) can understand both IPv4 and IPv6 packets. However, not all networks are dual-stack, and IPv6-only networks need a translation mechanism to reach IPv4 resources.

1.1.1.1 supports DNS64, a mechanism that synthesizes AAAA records (DNS records that map domain names to IPv6 addresses) from A records (DNS records that map domain names to IPv4 addresses) when no AAAA records exist. This allows IPv6-only clients to receive a usable IPv6 address for destinations that only have an IPv4 address, so the client can still connect through the network's NAT64 gateway.

Note

You should only turn on DNS64 if you are managing or using an IPv6-only network. While the resolver can synthesize IPv6 addresses, it cannot synthesize their record signatures for domains using DNSSEC (DNS Security Extensions, which add cryptographic signatures to DNS records to verify their authenticity). A DNS client that revalidates signatures would reject these synthesized records because they lack valid signatures.

A good tradeoff is to use a secure protocol such as [DNS over TLS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/) or [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) between the client and the resolver to prevent eavesdropping and tampering on the connection to the resolver.

## Configure DNS64

DNS64 is specifically for networks that already have NAT64 (Network Address Translation from IPv6 to IPv4) support. NAT64 translates IPv6 traffic to IPv4 at the network level, while DNS64 provides the corresponding translated addresses through DNS. If you are a network operator who has NAT64, you can test our DNS64 support by updating it to the following IP addresses:

```

2606:4700:4700::64

2606:4700:4700::6400


```

Some devices use separate fields for all eight parts of IPv6 addresses and cannot accept the `::` IPv6 abbreviation syntax. For such fields enter:

```

2606:4700:4700:0:0:0:0:64

2606:4700:4700:0:0:0:0:6400


```

## Test DNS64

After your configuration, visit an IPv4-only address to check if you can reach it over your IPv6-only network. For example, you can visit [https://ipv4.google.com ↗](https://ipv4.google.com). If the page loads, DNS64 and NAT64 are working together to translate your connection.

Visit [http://test-ipv6.com/ ↗](http://test-ipv6.com/) to test if it can detect your IPv6 address. If you receive a `10/10`, your IPv6 is configured correctly.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/infrastructure/","name":"Infrastructure"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/infrastructure/ipv6-networks/","name":"Support for IPv6-only networks"}}]}
```
