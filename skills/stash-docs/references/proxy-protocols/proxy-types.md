---
description: 'Stash 支持的代理协议类型完整列表，涵盖 TCP 与 UDP 代理，以及各协议的配置字段说明。'
---

# 协议类型

Stash 支持多种类型的代理协议，可以代理 TCP / UDP 协议。

每个代理都必须包含以下参数：

- `name`：代理名称，每个代理的名称是唯一的。
- `type`：代理类型。

大多数代理还需要以下参数：

- `server`：服务器地址，可以是域名或 IP 地址。
- `port`：端口。

---

代理可能支持以下参数：

- `tls`：布尔值，是否基于 TLS 转发。
- `skip-cert-verify`：布尔值，在 TLS 握手时是否忽略证书验证。
- `server-cert-fingerprint`：字符串，在 TLS 握手时验证服务器证书的 SHA256 指纹，以 Hex 编码。
- `sni`：字符串，在 TLS 握手时发送的 [Server Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication)。若 `sni` 为空，默认为 `server` 字段。
- `alpn`：字符串数组，TLS 握手时发送的 [Application-Layer Protocol Negotiation (ALPN)](https://developer.mozilla.org/en-US/docs/Glossary/ALPN)。
- `interface-name`：绑定网卡出口，仅在 macOS 支持。

---

此外，对于单个代理的延迟测试，支持修改以下参数：

- `benchmark-url`：延迟测试使用的 URL，默认为 `http://www.apple.com/`。
- `benchmark-timeout`：延迟测试超时，单位为秒，默认为 5 秒。
- `benchmark-disabled`：设置为 `true` 时完全禁用延迟测试。

你可以访问[这里](/proxy-protocols/proxy-benchmark)找到更多关于测试代理延迟的信息。

---

对于基于 QUIC 的协议，支持定期更改端口以应对 ISP 针对单个端口的限速，这一方法又称为端口跳跃。

- `ports`：字符串，支持多个端口或端口范围，以逗号分隔，例如 `443,8443,5000-6000`。
- `hop-interval`：整数，端口跳跃间隔，单位为秒，默认为 30 秒。

---

在处理 UDP 时，为了最大程度地兼容各种协议的行为，只会向代理以 IP 地址的形式转发，而不会像 TCP 一样将域名解析交由代理处理。因此在发起 UDP 转发请求前，Stash 会尝试通过代理发起 DNS 查询，以获取正确的、符合 CDN 优化的 DNS 解析，再以此地址转发 UDP 包。

Stash 默认使用 1.0.0.1 进行 DNS 查询，你可以通过以下参数修改：

- `udp-nameserver`：数组，用于指定 DNS 服务器地址，仅支持 UDP 协议。

例如：

```yaml
name: proxy
type: ss
udp-nameserver: ['8.8.4.4', '8.8.8.8:53']
# ...
```

---

不同类型的代理还需要指定一些参数，可以参考下文。

## Shadowsocks / Shadowsocks2022

```yaml
name: ss1
type: ss
server: server
port: 443
cipher: chacha20-ietf-poly1305
password: 'password'
udp: true
plugin: null
plugin-opts:
  mode:
  host:
```

支持以下加密方式（cipher）：

- `aes-128-gcm`
- `aes-192-gcm`
- `aes-256-gcm`
- `aes-128-cfb`
- `aes-192-cfb`
- `aes-256-cfb`
- `aes-128-ctr`
- `aes-192-ctr`
- `aes-256-ctr`
- `rc4-md5`
- `chacha20`
- `chacha20-ietf`
- `xchacha20`
- `chacha20-ietf-poly1305`
- `xchacha20-ietf-poly1305`
- `2022-blake3-aes-128-gcm`
- `2022-blake3-aes-256-gcm`

### UDP over TCP

<VersionRequirement ios="3.1.1" mac="3.1" />

Shadowsocks 和 Shadowsocks 2022 可以通过 TCP 连接承载 UDP 流量。启用时将 `udp-over-tcp` 设置为 `true`，并通过 `udp-over-tcp-version` 选择协议版本。未配置版本时默认使用 v2。

```yaml
name: ss-uot
type: ss
server: server
port: 443
cipher: chacha20-ietf-poly1305
password: 'password'
udp-over-tcp: true
udp-over-tcp-version: 2 # 支持 1 或 2，默认为 2
```

使用 `obfs`、`v2ray-plugin` 或 `shadow-tls` 插件时，UDP 流量也会通过同一条插件传输链路承载。

### Shadowsocks 插件

支持以下插件（plugin）：

`obfs`：使用 [simple-obfs](https://github.com/shadowsocks/simple-obfs) 混淆 TCP 流量。

```yaml
plugin: obfs
plugin-opts:
  mode: tls # 混淆模式，可以选择 http 或 tls
  host: bing.com # 混淆域名，需要和服务器配置保持一致
```

`v2ray-plugin`：使用 [v2ray-plugin](https://github.com/shadowsocks/v2ray-plugin) 将流量承载在 WebSocket 上。

```yaml
plugin: v2ray-plugin
plugin-opts:
  mode: websocket # 暂时不支持 QUIC 协议
  tls: true # wss
  skip-cert-verify: true # 不验证证书
  host: bing.com
  path: '/'
  headers: # 自定义请求头
    key: value
```

`shadow-tls`：使用 [shadow-tls](https://github.com/ihciah/shadow-tls) 进行真实 TLS 握手的同时，可以直接使用某些大公司或机构的证书，而不需要自行签发。

> [!WARNING]
> 目前仅支持 Shadow TLS 的
> [v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-zh.md) 和
> [v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-zh.md)
> 版本。

```yaml
plugin: shadow-tls
plugin-opts:
  password: CREDENTIAL_EXAMPLE
  host: weather-data.apple.com
  skip-cert-verify: false # 不验证证书
  version: 3 # 只支持 2 和 3
```

## ShadowsocksR

```yaml
name: ssr
type: ssr
server: server
port: 443
cipher: chacha20-ietf
password: 'password'
obfs: ''
protocol: ''
obfs-param: ''
protocol-param: ''
```

支持的加密方式（cipher）与 Shadowsocks 相同。

支持的混淆方式（obfs）：

- `plain`
- `http_simple`
- `http_post`
- `random_head`
- `tls1.2_ticket_auth`
- `tls1.2_ticket_fastauth`

支持的协议（protocol）：

- `origin`
- `auth_sha1_v4`
- `auth_aes128_md5`
- `auth_aes128_sha1`
- `auth_chain_a auth_chain_b`

## SOCKS5

```yaml
name: socks
type: socks5
server: server
port: 443
# username: username
# password: password
# tls: true
# skip-cert-verify: true
# udp: true
```

## HTTP

```yaml
name: http
type: http
server: server
port: 443
headers:
  key: value
tls: true # https
skip-cert-verify: true
# username: username
# password: password
```

## VMess

```yaml
name: vmess
type: vmess
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
cipher: auto
alterId: 64
network:
```

支持加密方式（cipher）：

- `auto`
- `aes-128-gcm`
- `chacha20-poly1305`
- `none`

支持的承载网络（network）：

- `ws`
- `h2`
- `http`
- `grpc`

```yaml
network: ws
ws-opts:
  path: /path
  headers:
    Host: v2ray.com
  max-early-data: 2048
  early-data-header-name: Sec-WebSocket-Protocol
```

```yaml
network: h2
tls: true
h2-opts:
  host:
    - http.example.com
    - http-alt.example.com
  path: /
```

## Snell

```yaml
name: snell
type: snell
server: server
port: 443
psk: yourpsk
version: 3
obfs-opts:
  mode: http
  host: bing.com
```

支持以下参数：

- `server`：Snell 服务器地址。
- `port`：Snell 服务器端口。
- `psk`：预共享密钥，必须与服务端一致。
- `version`：协议版本，支持 `1` 至 `5`，默认为 `1`。该值必须与服务端版本一致。
- `obfs-opts`：可选的 simple-obfs 设置。`mode` 支持 `http` 和 `tls`；启用混淆但省略 `host` 时，默认使用 `bing.com`。

Snell v3 至 v5 自动支持 UDP 转发，UDP 数据通过 TCP 连接承载。

### V4 与 V5

<VersionRequirement ios="3.6" mac="4.3" />

使用 Snell v4 或 v5 时，可以通过 `reuse` 复用连接：

```yaml
name: snell-v5
type: snell
server: server
port: 443
psk: yourpsk
version: 5
reuse: true
```

`reuse` 默认为 `false`，仅在 Snell v4 和 v5 中生效。

## Trojan

```yaml
name: trojan
type: trojan
server: server
port: 443
password: yourpassword
# udp: true
# sni: example.com # Server Name Indication，如果空会使用 server 中的值
# alpn:
#   - h2
#   - http/1.1
# skip-cert-verify: true
```

支持的承载网络（network）：

- `ws`
- `grpc`

## AnyTLS

> AnyTLS 是一个试图缓解嵌套的 TLS 握手指纹(TLS in TLS) 问题的代理协议。

```yaml
name: anytls
type: anytls
server: server
port: 443
password: yourpassword
```

## TrustTunnel

> TrustTunnel 是一个现代开源的 VPN 协议，由 AdGuard VPN 开发。

TrustTunnel 服务端部署请[参考这里](https://github.com/TrustTunnel/TrustTunnel)。

Stash 默认使用 HTTP/2 over TLS，配置 `quic: true` 时会切换到 HTTP/3 over QUIC。

```yaml
name: trusttunnel
type: trusttunnel
server: server
port: 443
username: user
password: pass
# quic: true # 使用 HTTP/3 over QUIC；默认使用 HTTP/2 over TLS
# sni: example.com # Server Name Indication，如果空会使用 server 中的值
# alpn:
#   - h2 # quic 为 true 时使用 h3
# skip-cert-verify: true
# server-cert-fingerprint: abcd...
```

支持以下参数：

- `username`：TrustTunnel endpoint 认证用户名。
- `password`：TrustTunnel endpoint 认证密码。
- `quic`：设为 `true` 时使用 HTTP/3 over QUIC；省略或设为 `false` 时使用
  HTTP/2 over TLS。
- `alpn`：可选的 ALPN 覆盖配置。HTTP/2 模式需要包含 `h2`；HTTP/3 模式需要包含
  `h3`。
- `server-cert-fingerprint`：可选的服务端证书 SHA256 指纹，使用 Hex 格式。

## Hysteria

> Hysteria 是一个功能丰富的，专为恶劣网络环境进行优化的网络工具（双边加速），比如卫星网络、拥挤的公共 Wi-Fi、在中国连接国外服务器等。基于修改版的 QUIC 协议。

Hysteria 服务端部署请[参考这里](https://github.com/HyNetwork/hysteria/wiki/%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)。

```yaml
name: 'hysteria'
type: hysteria
server: server
port: 443
up-speed: 100 # 上传带宽（单位：Mbps）
down-speed: 100 # 下载带宽（单位：Mbps）
auth-str: your-password
# auth: CREDENTIAL_EXAMPLE # bytes encoded in base64
protocol: '' # udp / wechat-video
obfs: '' # obfs password
sni: example.com # Server Name Indication，如果空会使用 server 中的值
alpn:
  - hysteria
skip-cert-verify: true
```

上传、下载带宽单位为 Mbps，请尽量正确填写，超出实际带宽会有反效果。

外部链接：[base64 在线编码工具](https://www.base64decode.org/)。

## Hysteria2

> [!WARNING]
> 请注意，Hysteria 2 与 Hysteria 1.x
> 完全不兼容，两者差异请参考[官方说明](https://v2.hysteria.network/zh/docs/misc/2-vs-1/)。

Hysteria2 服务端部署请[参考这里](https://v2.hysteria.network/zh/docs/getting-started/Installation/)。

```yaml
name: 'hysteria2'
type: hysteria2
server: server
port: 443
auth: your-password
fast-open: true
obfs: salamander # salamander 或 gecko
obfs-password: your-obfs-password
sni: example.com # Server Name Indication，如果空会使用 server 中的值
skip-cert-verify: true
up-speed: 100 # 上传带宽（可选，单位：Mbps）
down-speed: 100 # 下载带宽（可选，单位：Mbps）
```

Hysteria2 支持 `salamander` 和 `gecko` 混淆。启用混淆时，需要通过 `obfs` 选择类型，并同时配置 `obfs-password`。

### Salamander 混淆

<VersionRequirement ios="3.4" mac="4.2" />

使用 Salamander 混淆时，将 `obfs` 设置为 `salamander`。

### Gecko 混淆

<VersionRequirement ios="3.6" mac="4.3" />

使用 Gecko 混淆时，将 `obfs` 设置为 `gecko`。

## VLESS

XTLS 协议在 TLS 环境下摆脱冗余加密，提供更优秀的转发性能。

```yaml
name: vless
type: vless
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
# flow: xtls-rprx-vision
# skip-cert-verify: true
# tls: true
# client-fingerprint: chrome
# reality-opts:
#   public-key:
#   short-id:
```

### VLESS Encryption

<VersionRequirement ios="3.6" mac="4.3" />

VLESS Encryption 使用 `mlkem768x25519plus` 为 VLESS 数据流增加独立的认证加密记录层。它不依赖底层 TLS，可以直接用于明文承载，也可以与 TLS、Reality 及现有承载网络组合使用。

将服务端生成的完整 Encryption 值填写到 `encryption` 字段：

```yaml
name: vless-encryption
type: vless
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
encryption: 'mlkem768x25519plus.native.1rtt.<server-public-key>'
```

Encryption 值以 `mlkem768x25519plus` 开头，支持 `native`、`xorpub` 和 `random` 三种模式。服务端生成的值还可以包含握手填充参数及一个或多个 X25519、ML-KEM-768 密钥；使用时应保留服务端提供的完整内容。

VLESS 支持以下承载网络，通过 `network` 指定：

- `tcp`：直接通过 TCP 承载，也是未配置 `network` 时的默认值。
- `ws`：通过 WebSocket 承载，使用 `ws-opts` 配置路径和请求头。
- `h2`：通过 HTTP/2 承载，使用 `h2-opts` 配置路径和主机名。
- `http`：通过 HTTP 请求承载，使用 `http-opts` 配置请求方法、路径和请求头。
- `grpc`：通过 gRPC 承载，使用 `grpc-opts` 配置服务名称。
- `xhttp`：通过 XHTTP 承载，使用 `xhttp-opts` 配置传输模式、路径、主机名和请求头。

### WebSocket

```yaml
network: ws
ws-opts:
  path: /path
  headers:
    Host: vless.example.com
```

### HTTP/2

```yaml
network: h2
h2-opts:
  path: /path
  host:
    - vless.example.com
```

### HTTP

```yaml
network: http
http-opts:
  method: GET
  path:
    - /path
  headers:
    Host:
      - vless.example.com
```

### gRPC

```yaml
network: grpc
tls: true
grpc-opts:
  grpc-service-name: example
```

#### 配合 Reality 使用

<VersionRequirement ios="3.6" mac="4.3" />

gRPC 可以与 Reality 配合使用：

```yaml
network: grpc
tls: true
grpc-opts:
  grpc-service-name: example
reality-opts:
  public-key: <public-key>
  short-id: <short-id>
```

### XHTTP

<VersionRequirement ios="3.6" mac="4.3" />

XHTTP 支持 `stream-one`、`stream-up` 和 `packet-up` 三种传输模式。使用 `auto` 时，Stash 会根据当前配置自动选择模式。

```yaml
network: xhttp
tls: true
xhttp-opts:
  mode: auto
  path: /path
  host: vless.example.com
  headers:
    User-Agent: Mozilla/5.0
```

XHTTP 也可以与 `reality-opts` 配合使用。

#### 独立下行连接

`download-settings` 可以为 XHTTP 下行流量指定独立的服务器和连接参数。未配置的字段会沿用主连接的设置。

```yaml
network: xhttp
tls: true
xhttp-opts:
  mode: packet-up
  path: /upload
  host: upload.example.com
  download-settings:
    server: download.example.com
    port: 443
    path: /download
    host: download.example.com
    headers:
      User-Agent: Mozilla/5.0
```

`download-settings` 支持覆盖 `server`、`port`、`path`、`host`、`headers`、`tls`、`sni`、`alpn`、`skip-cert-verify`、`server-cert-fingerprint`、`client-fingerprint` 和 `reality-opts`。`stream-one` 模式使用同一条连接传输上下行流量，不能与 `download-settings` 同时使用。

### XTLS Vision

VLESS 支持在 TCP 承载上使用 `xtls-rprx-vision`：

```yaml
network: tcp
flow: xtls-rprx-vision
tls: true
```

`xtls-rprx-vision` 也可以与 VLESS Encryption 组合使用。此时 Encryption 记录层可以独立提供加密，无需同时启用 TLS。

## TUIC

TUIC 是一个轻量的基于 QUIC 的代理协议，由 Rust 语言编写，目前支持 v4 和 v5 版本。你可以在[这里](https://github.com/tuic-protocol/tuic)找到更多信息。

```yaml
name: tuic-v5
type: tuic
server: server
port: 443
version: 5
uuid: d0529668-8835-11ec-a8a3-0242ac120002 # for v5
password: your_password # for v5
skip-cert-verify: true
sni: ''
alpn:
  - h3
```

```yaml
name: tuic-v4
type: tuic
server: server
port: 443
version: 4
token: 'your_token' # for v4
skip-cert-verify: true
sni: ''
alpn:
  - h3
```

> [!NOTE]
> 需要注意的是，Stash 客户端不支持 ALPN 为空，默认的 ALPN 为 h3。请在 TUIC 服务端加上 `--alpn h3` 参数。
>
> 请在服务端选择适合的拥塞控制算法 `--congestion-controller` 参数以充分利用带宽。

## Juicity

[Juicity](https://github.com/juicity/juicity) 是一个基于 QUIC 的代理协议，受到 TUIC 的启发。

```yaml
name: juicity
type: juicity
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
password: your_password
skip-cert-verify: true
sni: ''
alpn:
  - h3
```

## Mieru

<VersionRequirement ios="3.6" mac="4.3" />

> [Mieru](https://github.com/enfein/mieru) 是一款安全的、无流量特征、难以主动探测的，基于 TCP 或 UDP 协议的 SOCKS5 / HTTP / HTTPS 网络代理软件。

```yaml
name: mieru
type: mieru
server: mieru.example.com
port: 2012
transport: tcp
username: user
password: password
```

也可以使用 `port-range` 配置服务端监听的连续端口范围。Stash 会在每次连接时从范围中随机选择一个端口：

```yaml
port-range: '2012-2022'
```

## MASQUE

<VersionRequirement ios="3.6" mac="4.3" />

MASQUE 是一种基于 HTTP 的标准化代理机制。Stash 当前支持 Cloudflare WARP 使用的 CONNECT-IP 模式：客户端会建立一条共享的 IP 隧道，通过 HTTP/3 或 HTTP/2 承载经该代理转发的 TCP 和 UDP 流量。

```yaml
name: WARP-MASQUE
type: masque
server: 162.159.198.1
port: 443
private-key: EXAMPLE_PRIVATE_KEY
public-key: 'BASE64_ENCODED_P256_SPKI_PUBLIC_KEY'
ip: 172.16.0.2/32
# ipv6: '2606:4700:110:84c0::2/128'
# dns: [1.1.1.1, '2606:4700:4700::1111']
# network: h3
# sni: consumer-masque.cloudflareclient.com
# connect-uri: https://cloudflareaccess.com
# mtu: 1280
# keepalive: 30
```

支持以下参数：

- `server`：MASQUE 服务器地址。
- `port`：MASQUE 服务器端口。
- `private-key`：以 Base64 编码的 P-256 SEC1 私钥 DER。请妥善保管，不要分享给其他人。
- `public-key`：以 Base64 编码的 MASQUE 端点 P-256 SPKI 公钥 DER，用于验证服务器身份。
- `ip`：分配给隧道的 IPv4 地址。可以包含 CIDR 前缀。
- `ipv6`：分配给隧道的 IPv6 地址。可以包含 CIDR 前缀。`ip` 与 `ipv6` 至少需要填写一个。
- `dns`：通过 MASQUE 隧道使用的 DNS 服务器，可以填写单个 IP 地址或 IP 地址数组。省略时，IPv4 默认使用 `1.1.1.1`，IPv6 默认使用 `2606:4700:4700::1111`。
- `network`：承载 CONNECT-IP 的网络，可选 `h3` 或 `h2`，默认为 `h3`。
- `sni`：TLS 握手使用的服务器名称，默认为 `consumer-masque.cloudflareclient.com`。
- `connect-uri`：CONNECT-IP 请求地址，必须是完整的 HTTPS URL，默认为 `https://cloudflareaccess.com`。
- `mtu`：隧道 MTU，可设置为 `1280` 至 `1500`，默认为 `1280`。
- `keepalive`：连接保活间隔，单位为秒，默认为 `30`。

## WireGuard

[WireGuard](https://www.wireguard.com/) 是一个高效的 Layer 3 的 VPN，Stash 支持将其作为 Layer 4 的代理使用，并支持通过其他协议转发 WireGuard 数据包。

```yaml
name: wireguard
type: wireguard
server: server # domain is supported
port: 51820
ip: 10.8.4.8
# ipv6: fe80::e6bf:faff:fea0:9fae # optional
private-key: EXAMPLE_PRIVATE_KEY # client private key
public-key: 0ag+C+rINHBnvLJLUyJeYkMWvIAkBjQPPObicuBUn1U= # peer public key
# preshared-key: # optional
dns: [1.0.0.1, 223.6.6.6] # optional
# mtu: 1420 # optional
# reserved: [0, 0, 0] # optional
# keepalive: 45 # optional
```

> [!NOTE]
> WireGuard 并非以高吞吐为设计目标的代理协议，Stash 需要在用户空间完成 Layer 3
> 与 Layer 4 的转换，其性能损耗会比常见代理协议大。在移动设备上，WireGuard
> 吞吐量一般会比 Layer 4 代理协议低。

## Tailscale

<VersionRequirement ios="3.4" mac="4.2" />

Tailscale 节点可以直接作为一个 `type: tailscale` 代理加入 Stash。

目前支持两种接入方式：

- 填写 `auth-key`，由 Stash 自动完成首次接入。
- 不填写 `auth-key`，在 Stash 的代理列表中打开对应节点菜单，进入 `Tailscale` 页面完成交互认证。

```yaml
# 方式一：使用 auth-key 自动接入
name: ts-main
type: tailscale
auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
hostname: ts-main
control-url: https://controlplane.tailscale.com
exit-node: exit-gateway.example.ts.net
# auto-route-disabled: false
```

支持以下参数：

- `auth-key`：可选。用于首次接入 Tailnet 的预认证密钥，可以在 Tailscale 管理后台生成，具体可参考官方文档 [Auth keys](https://tailscale.com/docs/features/access-control/auth-keys)。填写后，Stash 会自动完成首次接入；省略时，Stash 会继续使用已保存的节点身份，尚未认证的节点也可以通过 `Tailscale` 页面完成登录。如果多个节点需要使用同一个密钥，请在生成密钥时开启 `Reusable`。
- `hostname`：可选。向控制服务器报告的节点名称。省略时，Stash 会使用系统报告的设备主机名；如果系统未提供主机名，则由控制服务器命名。
- `control-url`：可选。Tailscale 控制服务器地址。省略时使用 Tailscale 官方控制服务器。切换地址后，Stash 会使用新控制服务器对应的独立节点身份，首次接入时需要重新认证。
- `exit-node`：可选。启动时优先使用的出口节点，支持填写 Stable ID、MagicDNS/FQDN、hostname 或 Tailscale IP。省略时，Stash 会从当前在线且可作为出口节点的 Peer 中自动选择；指定的节点不可用或无法唯一匹配时，也会回退到自动选择。在 `Tailscale` 页面作出的选择会持久保存并优先于此参数，恢复默认选择后才会重新使用配置值或自动选择。
- `auto-route-disabled`：可选。设为 `true` 时关闭自动 Tailnet 路由；默认值为 `false`，Stash 会自动将当前 Tailnet 的 MagicDNS 后缀和 Peer 地址路由到该节点。关闭后仍可通过自己的规则将流量交给该节点。

如果你选择不填写 `auth-key`，推荐的使用流程如下：

1. 在 Stash 中导入或保存该 `type: tailscale` 节点配置。
2. 打开代理列表，找到对应 Tailscale 节点。
3. 打开节点菜单，进入 `Tailscale` 页面。
4. 点击开始认证，打开授权页面完成登录。
5. 返回 Stash 后等待状态刷新；认证完成后，该节点即可正常承载流量。

如果该节点已经完成过认证，通常不需要再次填写 `auth-key` 或重新完成认证。

### 自动 Tailnet 路由

<VersionRequirement ios="3.6" mac="4.3" />

Tailscale 节点默认会自动路由其所属 Tailnet。节点运行后，Stash 会将以下目标交给对应的 `tailscale` 代理：

- 当前 Tailnet 的 MagicDNS 域名后缀。
- Tailnet 中各个 Peer 的 Tailscale IPv4 和 IPv6 地址。

自动路由会随 Tailnet 的节点信息更新，离线 Peer 的地址也会继续归属原 Tailnet。它会优先于配置文件中的 `rules` 进行匹配，保证这些目标由其所属 Tailnet 处理。因此，访问同一 Tailnet 内的域名或节点地址时，无需再为每个目标编写规则。

如果你希望完全使用自己的规则控制路由，可以在对应节点上关闭自动路由：

```yaml
proxies:
  - name: ts-main
    type: tailscale
    auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
    auto-route-disabled: true
```

## SSH

通过 [Secure Shell Protocol (SSH)](https://en.wikipedia.org/wiki/Secure_Shell) 转发 TCP 流量，支持密码和密钥认证。

> [!NOTE]
> 由于 SSH 本身不支持转发 UDP 协议，Stash 无法通过 SSH 协议转发 UDP 流量。

```yaml
name: ssh
type: ssh
server: server # domain is supported
port: 22
user: root
password: password
private-key: EXAMPLE_PRIVATE_KEY
private-key-passphrase: your-passphrase # optional
```

## DIRECT with Specified Interface

通过新建类型为 `direct` 的代理，并指定 `interface-name` 可以强制某些流量通过指定网卡，常用于解决 VPN 与 Stash 无法同时使用的情况。

例如，本机上的 OpenVPN 使用了 `utun3`，并且希望 `10.4.8.0/24` 的流量都进入 `utun3` 而不是 macOS 的默认网卡。

```yaml
name: my-corp-vpn
type: direct
interface-name: utun3
```

```yaml
rules:
  - IP-CIDR,10.4.8.0/24,my-corp-vpn
```

> [!NOTE]
> 上述 `utun3` 请根据实际情况更改。
>
> 你可以使用 `netstat -rn | grep utun3` 查询 `utun3` 的静态路由表。
