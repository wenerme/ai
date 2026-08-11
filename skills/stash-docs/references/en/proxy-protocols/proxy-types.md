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
udp: true # Requires v3 and above server
version: 3
# obfs-opts:
# mode: http # or tls
# host: bing.com
```

Snell UDP requires support from v3 or above server versions.

Supported obfuscation modes (obfs-opts.mode):

- http
- tls

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
obfs: salamander
obfs-password: your-obfs-password
sni: example.com # Server Name Indication, uses server value if empty
skip-cert-verify: true
up-speed: 100 # Upload bandwidth (optional, in Mbps)
down-speed: 100 # Download bandwidth (optional, in Mbps)
```

When salamander obfuscation is enabled, set both `obfs: salamander` and `obfs-password`.

## VLESS

XTLS protocol detaches from redundant encryption in TLS environments, providing superior forwarding performance.

```yaml
name: vless
type: vless
server: server
port: 443
uuid: d0529668-8835-11ec-a8a3-0242ac120002
# flow: xtls-rprx-direct
# skip-cert-verify: true
# network: h2
# tls: true
# client-fingerprint: chrome
# ws-opts:
#   path: /path
#   headers:
#     Host: v2ray.com
# grpc-opts:
#   grpc-service-name: "example"
# h2-opts:
#   host:
#     - http.example.com
#     - http-alt.example.com
#   path: /
# reality-opts:
#   public-key:
#   short-id:
```

Supported XTLS modes (flow):

- `xtls-rprx-origin`
- `xtls-rprx-direct`
- `xtls-rprx-splice`
- `xtls-rprx-vision`

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

## MASQUE

<VersionRequirement ios="3.6" mac="4.4" />

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

Tailscale nodes can be added directly to Stash as a `type: tailscale` proxy.

Stash currently supports two onboarding flows:

- Provide `auth-key`, and Stash completes the initial onboarding automatically.
- Leave `auth-key` empty, then open the node menu in Stash, go to the `Tailscale Authentication` page, and start interactive authentication explicitly.

```yaml
# Method 1: automatic onboarding with auth-key
name: ts-main
type: tailscale
auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
hostname: ts-main
control-url: https://controlplane.tailscale.com
ephemeral: false
exit-node: exit-gateway.example.ts.net
```

Supported parameters:

- `auth-key`: Optional. The Tailscale pre-authentication key. You can generate it from the Tailscale admin console. See the official documentation: [Auth keys](https://tailscale.com/docs/features/access-control/auth-keys). If this field is present, Stash completes the initial onboarding automatically. If it is omitted, you can start interactive authentication from the `Tailscale Authentication` page in Stash instead. If you plan to use the same `auth-key` on multiple devices, enable `Reusable` instead of `One-off`, otherwise the key cannot be reused for onboarding on other devices.
- `hostname`: The machine name of the node. It may contain only lowercase letters, digits, and `-`. If left empty, Stash uses the Stash Device ID as the `hostname`.
- `control-url`: Custom control plane URL. In most cases, you can leave this unset and use the default Tailscale control plane.
- `ephemeral`: Whether to use an ephemeral node. According to the official Tailscale documentation, [Ephemeral nodes](https://tailscale.com/docs/features/ephemeral-nodes) are automatically removed from the network after being offline for some time, and they receive a new IP address when created again. When enabling this option and expecting automatic onboarding, use an ephemeral auth key.
- `exit-node`: Optional. Prefer a specific exit node. Stash accepts the exit node Stable ID, MagicDNS/FQDN, hostname, or Tailscale IP. If the specified node is currently unavailable, Stash falls back to another currently available exit node automatically. Leaving it empty or omitting it uses the same automatic selection behavior.

If you choose not to provide `auth-key`, the recommended flow is:

1. Import or save the `type: tailscale` node in Stash.
2. Open the proxy list and find the corresponding Tailscale node.
3. Open the node menu and go to the `Tailscale Authentication` page.
4. Tap Start Authentication and finish the login flow in the authorization page.
5. Return to Stash and wait for the status to refresh. Once authentication completes, the node can carry traffic normally.

If the node has already been authenticated before, you usually do not need to provide `auth-key` again or repeat the authentication flow.

Like other proxy protocols, `tailscale` is just another selectable proxy node. Traffic only goes through it when you route traffic to this node through rules, proxy groups, or other routing methods.

You can route traffic to resources in your Tailscale network like this:

```yaml
proxies:
  - name: ts-main
    type: tailscale
    # Choose one: provide auth-key for automatic onboarding, or complete authentication once from the authentication page
    auth-key: TAILSCALE_AUTH_KEY_EXAMPLE

rules:
  - DOMAIN,app.example.ts.net,ts-main
  - IP-CIDR,100.64.0.0/10,ts-main,no-resolve
```

Notes:

- If neither `auth-key` nor interactive authentication is available yet, the node cannot carry traffic before onboarding completes.
- If the node has already been authenticated before, you usually do not need to authenticate again.
- Due to Tailscale limitations, `auth-key` usage is affected by Key Expiry. Please enable `Expiry disabled` for the corresponding Stash device on the Machines page in the Tailscale admin console to prevent the node from expiring later.
- If `exit-node` is omitted, Stash automatically selects an available exit node. If no exit node is available, no exit node is selected.
- If `exit-node` cannot be uniquely resolved or the target is currently unavailable, Stash falls back to automatic selection instead of failing permanently.
- If the target device is not authorized, waiting for machine approval, or the control plane requires login, finish the required flow on the `Tailscale Authentication` page first.

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
