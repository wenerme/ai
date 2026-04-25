---
title: Form expressions
description: Write expressions for Network Firewall rules.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Form expressions

Rules are written as using the Cloudflare Rules language - a domain-specific language (DSL) intended to mimic Wireshark semantics. For more information, refer to the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) documentation.

To start with a simple case, review below how you would match a source IP:

```

ip.src == 192.0.2.0


```

Expressions can be more complex by joining multiple clauses via a logical operator:

```

ip.src == 192.0.2.1 && (tcp.flags.push || tcp.flags.reset)


```

## Capabilities

You can use Cloudflare Network Firewall (formerly Magic Firewall) to skip or block packets based on source or destination IP, source or destination port, protocol, packet length, or bit field match.

## Restrictions

Wirefilter comparisons support CIDR notation, but only inside sets. For example:

```

ip.src == 192.0.2.0/24  # bad

ip.src in { 192.0.2.0/24 }  # good


```

Expressions have a complexity limit that is easily reached when many joined or nested clauses are in the expression. Here's an example:

```

(tcp.dstport == 1000 || tcp.dstport == 1001) && (tcp.dstport == 1002 || tcp.dstport == 1003) && (tcp.dstport == 1004 || tcp.dstport == 1005) && (tcp.dstport == 1006 || tcp.dstport == 1007) && (tcp.dstport == 1008 || tcp.dstport == 1009) && (tcp.dstport == 1010 || tcp.dstport == 1011) && (tcp.dstport == 1012 || tcp.dstport == 1013) && (tcp.dstport == 1014 || tcp.dstport == 1015) && (tcp.dstport == 1016 || tcp.dstport == 1017)


```

If the limit is reached, the response will have a `400` status code and an error message of `ruleset exceeds complexity constraints`. Split the expression into multiple rules and try again.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/how-to/form-expressions/","name":"Form expressions"}}]}
```
