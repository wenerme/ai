---
title: Support for IPv6-only networks
description: Use 1.1.1.1 on IPv6-only networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Tags

[ IPv6 ](https://developers.cloudflare.com/search/?tags=IPv6) 

# Support for IPv6-only networks

While network infrastructure is shifting towards IPv6-only networks, providers still need to support IPv4 addresses. Dual-stack networks are networks in which all nodes have both IPv4 and IPv6 connectivity capabilities, and can therefore understand both IPv4 and IPv6 packets.

1.1.1.1 supports DNS64, a mechanism that synthesizes AAAA records from A records when no AAAA records exist. DNS64 allows configuring a DNS resolver to synthesize IPv6 addresses from IPv4 answers.

Note

You should only enable DNS64 if you are managing or using an IPv6-only network. While the resolver can synthesize IPv6 addresses, it cannot synthesize their record signatures for domains using DNSSEC, so a DNS client that is able to revalidate signatures would reject these extra records without signatures.

A good tradeoff is to use a secure protocol such as DNS over TLS, or DNS over HTTPS between the client and the resolver to prevent tampering.

## Configure DNS64

DNS64 is specifically for networks that already have NAT64 support. If you are a network operator who has NAT64, you can test our DNS64 support by updating it to the following IP addresses:

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

After your configuration, visit an IPv4 only address to check if you can reach it. For example, you can visit [https://ipv4.google.com ↗](https://ipv4.google.com).

Visit [http://test-ipv6.com/ ↗](http://test-ipv6.com/) to test if it can detect your IPv6 address. If you receive a `10/10`, your IPv6 is configured correctly.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/infrastructure/","name":"Infrastructure"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/infrastructure/ipv6-networks/","name":"Support for IPv6-only networks"}}]}
```
