---
description: "Stash 内置 DNS 服务，支持同时配置多个服务器并采用最快响应的结果。介绍支持的 DNS 协议与配置方式。"
---

# 内置 DNS 服务

## 自定义上游 DNS 服务器

Stash 支持同时配置多个 DNS 服务器。在进行查询时，Stash 会并发请求所有服务器，并采用最快响应的结果。Stash 支持以下 DNS 协议：

- 使用系统提供的 DNS：`system`
- DNS over UDP：`8.8.8.8` 或 `udp://8.8.8.8`
- DNS over TCP：`tcp://8.8.8.8`
- [DNS over TLS](https://www.rfc-editor.org/rfc/rfc7858)：`tls://8.8.8.8:853`
- [DNS over HTTPS](https://www.rfc-editor.org/rfc/rfc8484)：`https://1.1.1.1/dns-query`
- DNS over HTTP/3：`'https://1.1.1.1/dns-query#h3=true'`
- [DNS over QUIC](https://www.rfc-editor.org/rfc/rfc9250)：`quic://dns.adguard.com:853`

Stash 会对 DNS 查询使用 LRU 算法进行本地缓存。当本地缓存过期时，Stash 会继续沿用缓存结果，并在后台静默更新记录，这会有效降低 DNS 缓存过期引发的请求延迟。

### DNS over HTTP/3

DNS over HTTP/3 使用 QUIC 传输 DoH 请求。它与普通 DNS over HTTPS 使用相同的 URL 格式，在末尾添加 `#h3=true` 即可指定使用 HTTP/3；该片段不会成为 DNS 查询路径的一部分。

```yaml
dns:
  nameserver:
    - 'https://1.1.1.1/dns-query#h3=true'
```

配置时必须用引号包裹完整地址，否则 YAML 会将 `#h3=true` 识别为注释。

### 加密 DNS Bootstrap

<VersionRequirement ios="3.6" mac="4.3" />

`default-nameserver` 可以使用加密 DNS 解析其他 DNS 服务器的域名。除 `system` 外，服务器地址必须使用 IP。

```yaml
dns:
  default-nameserver:
    - 'https://1.1.1.1/dns-query#h3=true'
```

## 代理服务器域名解析

<VersionRequirement ios="3.6" mac="4.3" />

`proxy-server-nameserver` 用于指定解析代理服务器域名的 DNS 服务器。该配置使用独立的 DNS 查询链路，不会跟随代理规则，可避免连接代理服务器时产生递归查询。

```yaml
dns:
  proxy-server-nameserver:
    - 223.5.5.5
    - https://dns.alidns.com/dns-query
```

`proxy-server-nameserver` 支持与 `nameserver` 相同的 DNS 协议。配置多个服务器时，Stash 会并发查询并采用最先成功返回的结果。

## 基于域名的自定义 DNS 服务

`nameserver-policy` 可以对指定域名或域名集合使用特定的 DNS 服务器。它支持精确域名、通配域名，以及 `geosite:<name>` 形式的 geosite 集合。

```yaml
dns:
  # 对部分域名使用单独的 DNS 服务器
  nameserver-policy:
    'www.baidu.com': 114.114.114.114
    '+.internal.crop.com': system
    '*.example.com':
      - https://dns.alidns.com/dns-query
      - https://doh.pub/dns-query
    'geosite:cn':
      - 223.5.5.5
      - 119.29.29.29
```

`nameserver-policy` 的值可以是单个 DNS 服务器，也可以是 DNS 服务器数组。配置多个 DNS 服务器时，Stash 会并发查询并采用最先成功返回的结果。

当同一个域名同时命中多条 policy 时，优先级为：精确域名 > 通配域名 > geosite。若同时命中多个 geosite policy，则使用配置顺序中最先命中的一条。

## 自定义 Hosts

```yaml
# 支持通配符域名 (例如: *.clash.dev, *.foo.*.example.com )
# 不使用通配符的域名优先级高于使用通配符的域名 (例如: foo.example.com > *.example.com > .example.com )
# 注意: +.foo.com 的效果等同于 .foo.com 和 foo.com
hosts:
  '*.clash.dev': 127.0.0.1
  '.dev': 127.0.0.1
  'alpha.clash.dev': '::1'
```

## DNS 查询跟随规则

默认情况下，Stash 发出的 DNS 查询均会直接出站，而不经由任何代理规则转发。开启 `follow-rule` 选项后，Stash 会根据代理规则进行 DNS 查询的转发。

> [!WARNING]
> 绝大部分场景下，不需要开启此配置。DNS 查询由代理转发后，可能会破坏云服务商的 CDN 全球优化策略，导致静态资源加载缓慢。DNS 查询请求进入 Stash 网络引擎，也会导致轻微的延迟上升。
>
> 请仅在必要时开启此配置。

> [!WARNING]
> 由于连接代理服务器可能需要进行 DNS 解析，DNS 查询由代理转发后，会存在递归查询的问题。开启此配置前请确保满足以下其中一项条件：
>
> - 转发 DNS 请求的代理地址为 IP 地址，而不是域名
> - DNS 服务器地址为 IP 地址，而不是域名
> - 使用 `proxy-server-nameserver` 为代理服务器域名配置独立的 DNS 解析
