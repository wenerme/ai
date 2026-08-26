---
description: 'The full list of proxy protocols Stash supports, covering both TCP and UDP proxies along with the configuration fields for each.'
---

# Protocol Types

Stash supports multiple types of proxy protocols, capable of handling TCP/UDP protocols.

Each proxy must include the following parameters:

- `name`: The name of the proxy, which must be unique for each proxy.
- `type`: The type of proxy.

Most proxies also require the following parameters:

- `server`: The server address, which can be a domain name or an IP address.
- `port`: The port.

---

The proxy may support the following parameters:

- `tls`: Boolean value to indicate whether to forward based on TLS.
- `skip-cert-verify`: Boolean value to specify whether to skip certificate verification during the TLS handshake.
- `server-cert-fingerprint`: String value used to verify the SHA256 fingerprint of the server certificate in Hex format during the TLS handshake.
- `sni`: String, specifies the [Server Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) sent during the TLS handshake. If `sni` is empty, it defaults to the `server` field.
- `alpn`: String array specifying the [Application-Layer Protocol Negotiation (ALPN)](https://developer.mozilla.org/en-US/docs/Glossary/ALPN) sent during the TLS handshake.
- `interface-name`: Specifies the network interface to bind exit to; only supported on macOS.

---

In addition, for latency testing of individual proxies, the following parameters can be modified:

- `benchmark-url`: The URL used for latency testing, default is `http://www.apple.com/`.
- `benchmark-timeout`: The timeout for latency testing in seconds, default is 5 seconds.
- `benchmark-disabled`: Set to `true` to completely disable latency testing.

You can find more information on testing proxy latency [here](/proxy-protocols/proxy-benchmark).

---

For protocols based on QUIC, support is available for periodically changing ports to counter ISP throttling on single ports, a method also known as port hopping.

- `ports`: String supporting multiple ports or port ranges, separated by commas, e.g., `443,8443,5000-6000`.
- `hop-interval`: Integer specifying the port hopping interval in seconds, default is 30 seconds.

---

When handling UDP, to maximize compatibility with various protocol behaviors, proxies are only forwarded in the form of IP addresses, unlike TCP which hands over domain resolution to the proxy. Therefore, before initiating a UDP forwarding request, Stash will attempt DNS queries through the proxy to obtain a correct, CDN-optimized DNS resolution, then use that address to forward UDP packets.

Stash uses 1.0.0.1 for DNS queries by default, which can be modified using the following parameter:

- `udp-nameserver`: Array used to specify DNS server addresses, only supports UDP protocol.

Example:

```yaml
name: proxy
type: ss
udp-nameserver: ['8.8.4.4', '8.8.8.8:53']
# ...
```

---

Different types of proxies may require additional parameters, which can be found below.

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

Supported encryption methods (cipher):

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

Shadowsocks and Shadowsocks 2022 can carry UDP traffic over TCP connections. Set `udp-over-tcp` to `true` to enable it, and use `udp-over-tcp-version` to select the protocol version. Version 2 is used by default when the version is omitted.

```yaml
name: ss-uot
type: ss
server: server
port: 443
cipher: chacha20-ietf-poly1305
password: 'password'
udp-over-tcp: true
udp-over-tcp-version: 2 # Supports 1 or 2; defaults to 2
```

When using the `obfs`, `v2ray-plugin`, or `shadow-tls` plugin, UDP traffic is carried over the same plugin transport chain.

### Shadowsocks Plugins

Supported plugins (plugin):

`obfs`: Uses [simple-obfs](https://github.com/shadowsocks/simple-obfs) to obfuscate TCP traffic.

```yaml
plugin: obfs
plugin-opts:
  mode: tls # Obfuscation mode, can choose between http or tls
  host: bing.com # Obfuscation domain, must match the server configuration
```

`v2ray-plugin`: Uses [v2ray-plugin](https://github.com/shadowsocks/v2ray-plugin) to carry traffic over WebSocket.

```yaml
plugin: v2ray-plugin
plugin-opts:
  mode: websocket # Currently QUIC is not supported
  tls: true # wss
  skip-cert-verify: true # Don't verify certificate
  host: bing.com
  path: '/'
  headers: # Custom request headers
    key: value
```

`shadow-tls`: Uses [shadow-tls](https://github.com/ihciah/shadow-tls) to perform real TLS handshake and can utilize certificates from major companies or institutions without needing to issue one yourself.

> [!WARNING]
> Currently only supports Shadow TLS
> [v2](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-en.md) and
> [v3](https://github.com/ihciah/shadow-tls/blob/master/docs/protocol-v3-en.md)
> versions.

```yaml
plugin: shadow-tls
plugin-opts:
  password: CREDENTIAL_EXAMPLE
  host: weather-data.apple.com
  skip-cert-verify: false # Don't verify certificate
  version: 3 # Only supports version 2 and 3
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

Supported encryption methods (cipher) are the same as Shadowsocks.

Supported obfuscation methods (obfs):

- `plain`
- `http_simple`
- `http_post`
- `random_head`
- `tls1.2_ticket_auth`
- `tls1.2_ticket_fastauth`

Supported protocols (protocol):

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

Supported encryption methods (cipher):

- `auto`
- `aes-128-gcm`
- `chacha20-poly1305`
- `none`

Supported transport networks (network):

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

Supported parameters:

- `server`: The Snell server address.
- `port`: The Snell server port.
- `psk`: The pre-shared key. It must match the server.
- `version`: The protocol version, from `1` through `5`. The default is `1`, and it must match the server version.
- `obfs-opts`: Optional simple-obfs settings. `mode` accepts `http` or `tls`. When obfuscation is enabled and `host` is omitted, the default is `bing.com`.

Snell v3 through v5 automatically support UDP forwarding, carrying UDP data over TCP connections.

### V4 and V5

<VersionRequirement ios="3.6" mac="4.3" />

With Snell v4 or v5, set `reuse` to reuse connections:

```yaml
name: snell-v5
type: snell
server: server
port: 443
psk: yourpsk
version: 5
reuse: true
```

`reuse` defaults to `false` and only takes effect with Snell v4 and v5.

## Trojan

```yaml
name: trojan
type: trojan
server: server
port: 443
password: yourpassword
# udp: true
# sni: example.com # Server Name Indication, uses server value if empty
# alpn:
#   - h2
#   - http/1.1
# skip-cert-verify: true
```

Supported transport networks (network):

- `ws`
- `grpc`

## AnyTLS

> AnyTLS is a proxy protocol that attempts to mitigate nested TLS handshake fingerprinting (TLS in TLS).

```yaml
name: anytls
type: anytls
server: server
port: 443
password: yourpassword
```

## TrustTunnel

> TrustTunnel is a modern open-source VPN protocol developed by AdGuard VPN.

Please refer to [here](https://github.com/TrustTunnel/TrustTunnel) for TrustTunnel server deployment.

Stash uses HTTP/2 over TLS by default. When `quic: true` is configured, it switches to HTTP/3 over QUIC.

```yaml
name: trusttunnel
type: trusttunnel
server: server
port: 443
username: user
password: pass
# quic: true # Use HTTP/3 over QUIC; HTTP/2 over TLS is used by default
# sni: example.com # Server Name Indication, uses server value if empty
# alpn:
#   - h2 # Use h3 when quic is true
# skip-cert-verify: true
# server-cert-fingerprint: abcd...
```

Supported parameters:

- `username`: TrustTunnel endpoint authentication username.
- `password`: TrustTunnel endpoint authentication password.
- `quic`: Use HTTP/3 over QUIC when set to `true`; use HTTP/2 over TLS when omitted or set to `false`.
- `alpn`: Optional ALPN override. HTTP/2 mode needs to include `h2`; HTTP/3 mode needs to include `h3`.
- `server-cert-fingerprint`: Optional SHA256 fingerprint of the server certificate in hex format.

## Hysteria

> Hysteria is a feature-rich network tool optimized for harsh network environments (dual acceleration), such as satellite networks, crowded public Wi-Fi, connecting to foreign servers in China, etc. Based on a modified QUIC protocol.

Please refer to [here](https://github.com/HyNetwork/hysteria/wiki/Download-and-Install) for Hysteria server deployment.

```yaml
name: 'hysteria'
type: hysteria
server: server
port: 443
up-speed: 100 # Upload bandwidth in Mbps
down-speed: 100 # Download bandwidth in Mbps
auth-str: your-password
# auth: CREDENTIAL_EXAMPLE # bytes encoded in base64
protocol: '' # udp / wechat-video
obfs: '' # obfs password
sni: example.com # Server Name Indication, uses server value if empty
alpn:
  - hysteria
skip-cert-verify: true
```

Upload and download bandwidth should be specified in Mbps. Please fill in as accurately as possible, as exceeding the actual bandwidth may have negative effects.

External link: [base64 encoding tool](https://www.base64decode.org/).

## Hysteria2

> [!WARNING]
> Please note that Hysteria 2 is completely incompatible with Hysteria 1.x.
> Refer to the [official
> guidance](https://v2.hysteria.network/en/docs/misc/2-vs-1/) for differences
> between the two versions.

Please refer to [here](https://v2.hysteria.network/en/docs/getting-started/Installation/) for Hysteria2 server deployment.

```yaml
name: 'hysteria2'
type: hysteria2
server: server
port: 443
auth: your-password
fast-open: true
obfs: salamander # salamander or gecko
obfs-password: your-obfs-password
sni: example.com # Server Name Indication, uses server value if empty
skip-cert-verify: true
up-speed: 100 # Upload bandwidth (optional, in Mbps)
down-speed: 100 # Download bandwidth (optional, in Mbps)
```

Hysteria2 supports `salamander` and `gecko` obfuscation. To enable obfuscation, select its type with `obfs` and configure `obfs-password` as well.

### Salamander Obfuscation

<VersionRequirement ios="3.4" mac="4.2" />

To use Salamander obfuscation, set `obfs` to `salamander`.

### Gecko Obfuscation

<VersionRequirement ios="3.6" mac="4.3" />

To use Gecko obfuscation, set `obfs` to `gecko`.

## VLESS

XTLS protocol detaches from redundant encryption in TLS environments, providing superior forwarding performance.

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

VLESS Encryption adds an independent authenticated encryption record layer to the VLESS stream with `mlkem768x25519plus`. It does not depend on the underlying TLS layer, so it can be used with a plaintext transport or combined with TLS, Reality, and the existing transports.

Set `encryption` to the complete Encryption value generated by the server:

```yaml
name: vless-encryption
type: vless
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
encryption: 'mlkem768x25519plus.native.1rtt.<server-public-key>'
```

Encryption values begin with `mlkem768x25519plus` and support the `native`, `xorpub`, and `random` modes. A value generated by the server can also contain handshake padding parameters and one or more X25519 or ML-KEM-768 keys. Keep the complete value provided by the server when configuring the node.

VLESS supports the following transports, selected with `network`:

- `tcp`: Carries VLESS directly over TCP and is the default when `network` is omitted.
- `ws`: Carries VLESS over WebSocket and uses `ws-opts` for the path and request headers.
- `h2`: Carries VLESS over HTTP/2 and uses `h2-opts` for the path and host names.
- `http`: Carries VLESS in HTTP requests and uses `http-opts` for the request method, paths, and headers.
- `grpc`: Carries VLESS over gRPC and uses `grpc-opts` for the service name.
- `xhttp`: Carries VLESS over XHTTP and uses `xhttp-opts` for the mode, path, host name, and request headers.

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

#### Using Reality

<VersionRequirement ios="3.6" mac="4.3" />

gRPC can be used with Reality:

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

XHTTP supports the `stream-one`, `stream-up`, and `packet-up` modes. With `auto`, Stash selects a mode based on the current configuration.

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

XHTTP can also be used with `reality-opts`.

#### Separate Download Connection

`download-settings` can specify a separate server and connection parameters for XHTTP downlink traffic. Fields that are not configured inherit the settings of the primary connection.

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

`download-settings` can override `server`, `port`, `path`, `host`, `headers`, `tls`, `sni`, `alpn`, `skip-cert-verify`, `server-cert-fingerprint`, `client-fingerprint`, and `reality-opts`. The `stream-one` mode carries uplink and downlink traffic over the same connection and cannot be used with `download-settings`.

### XTLS Vision

VLESS supports `xtls-rprx-vision` over the TCP transport:

```yaml
network: tcp
flow: xtls-rprx-vision
tls: true
```

`xtls-rprx-vision` can also be combined with VLESS Encryption. In that configuration, the Encryption record layer can provide encryption independently, without enabling TLS at the same time.

## TUIC

TUIC is a lightweight QUIC-based proxy protocol written in Rust and currently supports v4 and v5 versions. You can find more information [here](https://github.com/tuic-protocol/tuic).

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
> Note that Stash client does not support empty ALPN, default ALPN is h3. Add `--alpn h3` parameter on TUIC server.
>
> Choose the appropriate congestion control algorithm on the server with the `--congestion-controller` parameter to fully utilize bandwidth.

## Juicity

[Juicity](https://github.com/juicity/juicity) is a QUIC-based proxy protocol inspired by TUIC.

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

> [Mieru](https://github.com/enfein/mieru) is a secure SOCKS5 / HTTP / HTTPS network proxy that has no distinctive traffic characteristics, is difficult to actively probe, and operates over TCP or UDP.

```yaml
name: mieru
type: mieru
server: mieru.example.com
port: 2012
transport: tcp
username: user
password: password
```

You can also use `port-range` to configure a consecutive range of server listening ports. Stash randomly selects a port from the range for each connection:

```yaml
port-range: '2012-2022'
```

## MASQUE

<VersionRequirement ios="3.6" mac="4.3" />

MASQUE is a standardized proxy mechanism built on HTTP. Stash currently supports the CONNECT-IP mode used by Cloudflare WARP: the client establishes a shared IP tunnel that carries TCP and UDP traffic forwarded through the proxy over HTTP/3 or HTTP/2.

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

The following parameters are supported:

- `server`: MASQUE server address.
- `port`: MASQUE server port.
- `private-key`: Base64-encoded P-256 SEC1 private key DER. Keep it secure and do not share it.
- `public-key`: Base64-encoded P-256 SPKI public key DER for the MASQUE endpoint, used to verify the server identity.
- `ip`: IPv4 address assigned to the tunnel. A CIDR prefix may be included.
- `ipv6`: IPv6 address assigned to the tunnel. A CIDR prefix may be included. At least one of `ip` and `ipv6` is required.
- `dns`: DNS servers used through the MASQUE tunnel. It can be a single IP address or an array of IP addresses. When omitted, IPv4 defaults to `1.1.1.1` and IPv6 defaults to `2606:4700:4700::1111`.
- `network`: Transport for CONNECT-IP. It can be `h3` or `h2` and defaults to `h3`.
- `sni`: Server name used for the TLS handshake. It defaults to `consumer-masque.cloudflareclient.com`.
- `connect-uri`: CONNECT-IP request URI. It must be an absolute HTTPS URL and defaults to `https://cloudflareaccess.com`.
- `mtu`: Tunnel MTU. It can be set from `1280` to `1500` and defaults to `1280`.
- `keepalive`: Connection keepalive interval in seconds. It defaults to `30`.

## WireGuard

[WireGuard](https://www.wireguard.com/) is an efficient Layer 3 VPN, Stash supports using it as a Layer 4 proxy and supports forwarding WireGuard packets through other protocols.

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
> WireGuard is not designed as a high-throughput proxy protocol. Stash needs to
> complete Layer 3 to Layer 4 conversion in user space, which results in more
> performance loss compared to common proxy protocols. On mobile devices,
> WireGuard usually has lower throughput compared to Layer 4 proxy protocols.

## Tailscale

<VersionRequirement ios="3.4" mac="4.2" />

Tailscale nodes can be added directly to Stash as a `type: tailscale` proxy.

Stash currently supports two onboarding flows:

- Provide `auth-key`, and Stash completes the initial onboarding automatically.
- Leave `auth-key` empty, then open the node menu in Stash and complete interactive authentication on the `Tailscale` page.

```yaml
# Method 1: automatic onboarding with auth-key
name: ts-main
type: tailscale
auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
hostname: ts-main
control-url: https://controlplane.tailscale.com
exit-node: exit-gateway.example.ts.net
# auto-route-disabled: false
```

Supported parameters:

- `auth-key`: Optional. A pre-authentication key for initially joining the Tailnet. You can generate one in the Tailscale admin console; see [Auth keys](https://tailscale.com/docs/features/access-control/auth-keys). When provided, Stash completes initial onboarding automatically. When omitted, Stash continues using a saved node identity, while a node that has not been authenticated can log in from the `Tailscale` page. Enable `Reusable` when multiple nodes need to use the same key.
- `hostname`: Optional. The node name reported to the control server. When omitted, Stash uses the device hostname reported by the operating system. If the system does not provide one, the control server assigns the name.
- `control-url`: Optional. The Tailscale control server URL. When omitted, Stash uses the official Tailscale control server. After switching URLs, Stash uses a separate node identity for the new control server and requires authentication for the initial connection.
- `exit-node`: Optional. The preferred exit node at startup. It accepts a Stable ID, MagicDNS/FQDN, hostname, or Tailscale IP. When omitted, Stash automatically selects from peers that are online and available as exit nodes. It also falls back to automatic selection if the specified node is unavailable or cannot be matched uniquely. A selection made on the `Tailscale` page is persisted and takes precedence over this parameter until the default selection is restored.
- `auto-route-disabled`: Optional. Set to `true` to disable automatic Tailnet routing. The default is `false`, which routes the current Tailnet's MagicDNS suffix and peer addresses to this node automatically. You can still route traffic to this node with your own rules when automatic routing is disabled.

If you choose not to provide `auth-key`, the recommended flow is:

1. Import or save the `type: tailscale` node in Stash.
2. Open the proxy list and find the corresponding Tailscale node.
3. Open the node menu and go to the `Tailscale` page.
4. Tap Start Authentication and finish the login flow in the authorization page.
5. Return to Stash and wait for the status to refresh. Once authentication completes, the node can carry traffic normally.

If the node has already been authenticated before, you usually do not need to provide `auth-key` again or repeat the authentication flow.

### Automatic Tailnet routing

<VersionRequirement ios="3.6" mac="4.3" />

By default, a Tailscale node automatically routes its own Tailnet. Once the node is running, Stash sends the following destinations to the corresponding `tailscale` proxy:

- The current Tailnet's MagicDNS suffix.
- The Tailscale IPv4 and IPv6 addresses of peers in the Tailnet.

Automatic routes update with the Tailnet's node information, and addresses of offline peers remain associated with their Tailnet. They are matched before the `rules` in the configuration file, ensuring that these destinations are handled by their own Tailnet. You do not need to write a rule for every domain or node address in the same Tailnet.

To control routing entirely with your own rules, disable automatic routing on the node:

```yaml
proxies:
  - name: ts-main
    type: tailscale
    auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
    auto-route-disabled: true
```

## SSH

Forward TCP traffic through the [Secure Shell Protocol (SSH)](https://en.wikipedia.org/wiki/Secure_Shell), supporting both password and key authentication.

> [!NOTE]
> Since SSH does not support forwarding UDP protocol, Stash cannot forward UDP
> traffic over SSH protocol.

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

By creating a proxy of type `direct`, and specifying `interface-name`, certain traffic can be forced to travel through a specified network interface, useful in situations where VPN and Stash cannot be used simultaneously.

For example, the local OpenVPN uses `utun3`, and traffic with `10.4.8.0/24` should enter `utun3` instead of the default macOS network interface.

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
> Please modify `utun3` according to actual conditions.
>
> You can use `netstat -rn | grep utun3` to query the static routing table of `utun3`.
