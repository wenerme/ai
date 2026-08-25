---
description: "The iOS Network Extension is capped at 15 MB / 50 MB of memory. How to write an efficient configuration file so iOS does not terminate Stash for exceeding it."
---

# Writing Efficient Configuration Files

Due to the memory limitations of iOS Network Extension, which restricts usage to 15 MB in iOS 14 and 50 MB in iOS 15+, having an unreasonable configuration file may cause Stash to be closed by iOS. Here are some suggestions to help you write efficient configuration files.

## Configure Reasonable DNS Servers

Stash will query all DNS servers simultaneously and cache the DNS query results using the LRU algorithm. On mobile devices, configuring 1 to 2 DNS servers should meet your needs.

- Using DoH, DoT, DoQ consumes more resources and generally has higher latency compared to traditional UDP-based queries.
- Stash uses Fake IP to avoid local DNS queries for requests that need to go through a proxy. For users in China, domestic DNS servers are recommended. Configuring foreign DNS services such as 8.8.8.8 / 1.1.1.1 does not provide practical benefits.

## Use Rule Sets

For scenarios requiring a large number of rules such as ad blocking, traffic routing based on IP geolocation, etc., using `domain / ipcidr` [rule sets](/rules/rule-set) can reduce memory usage and improve matching speed.

> [!WARNING]
> It is not recommended to use a large number of `classical` rule sets. These
> rules can only be matched sequentially, which significantly increases
> matching time and Stash's memory usage.

## Disable QUIC When Forwarding Through a Proxy

HTTP3 / QUIC is based on UDP, and UDP forwarding is less efficient in some proxy protocols. You can disable QUIC with [Script Shortcuts](/rules/rule-types#script):

```yaml
script:
  shortcuts:
    quic: network == 'udp' and dst_port == 443

rules:
  - GEOIP,CN,DIRECT
  - SCRIPT,quic,REJECT
  - MATCH,PROXY
```
