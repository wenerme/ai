---
description: "iOS Network Extension 有 15 MB / 50 MB 的内存限制。介绍如何编写高效的配置文件，避免 Stash 因超出内存被系统关闭。"
---

# 编写高效的配置文件

由于 iOS Network Extension 在 iOS 14 限制使用 15 MB 内存，在 iOS 15+ 限制使用 50 MB 内存，不合理的配置文件可能会导致 Stash 被 iOS 关闭。以下是一些建议，帮助您编写高效的配置文件。

## 配置合理的 DNS 服务器

Stash 会同时向所有配置的 DNS 服务器发起查询，并通过 LRU 算法缓存 DNS 查询结果。在移动设备上，建议配置 1 到 2 个 DNS 服务器即可满足需求。

- 使用 DoH、DoT、DoQ 协议比传统基于 UDP 的查询更消耗系统资源，且延迟通常更高
- Stash 会使用 Fake IP 来避免需要代理的请求进行本地 DNS 查询。对于中国用户，建议使用国内 DNS 服务器，配置 8.8.8.8 / 1.1.1.1 等国外 DNS 服务不会带来实际收益

## 使用规则集合

对于去广告、按 IP 地理信息分流等需要大量规则的场景，建议使用 `domain` 或 `ipcidr` 类型的[规则集合](/rules/rule-set)，这能有效降低内存占用并提高匹配速度。

> [!WARNING]
> 不建议使用大量 `classical`
> 类型的规则集合。此类规则只能进行顺序匹配，会显著增加匹配耗时和 Stash
> 的内存占用。

## 通过代理转发时禁用 QUIC 协议

HTTP3/QUIC 协议基于 UDP，在某些代理协议中 UDP 转发效率较低。您可以通过 [Script Shortcuts](/rules/rule-types#script) 来禁用 QUIC 协议：

```yaml
script:
  shortcuts:
    quic: network == 'udp' and dst_port == 443

rules:
  - GEOIP,CN,DIRECT
  - SCRIPT,quic,REJECT
  - MATCH,PROXY
```
