---
description: "Stash's built-in DNS service queries multiple servers at once and takes the fastest response. Covers the supported DNS protocols and how to configure them."
---

# Built-in DNS Service

## Custom Upstream DNS Servers

Stash supports configuring multiple DNS servers simultaneously. When making queries, Stash will send concurrent requests to all servers and use the fastest response. Stash supports the following DNS protocols:

- Use the system-provided DNS: `system`
- DNS over UDP: `8.8.8.8` or `udp://8.8.8.8`
- DNS over TCP: `tcp://8.8.8.8`
- [DNS over TLS](https://www.rfc-editor.org/rfc/rfc7858): `tls://8.8.8.8:853`
- [DNS over HTTPS](https://www.rfc-editor.org/rfc/rfc8484): `https://1.1.1.1/dns-query`
- DNS over HTTP/3: `'https://1.1.1.1/dns-query#h3=true'`
- [DNS over QUIC](https://www.rfc-editor.org/rfc/rfc9250): `quic://dns.adguard.com:853`

Stash uses the LRU algorithm for local caching of DNS queries. When the local cache expires, Stash continues using the cached result while silently refreshing the record in the background, reducing latency caused by DNS cache expiration.

### DNS over HTTP/3

DNS over HTTP/3 carries DoH requests over QUIC. It uses the same URL format as regular DNS over HTTPS; append `#h3=true` to select HTTP/3. This fragment does not become part of the DNS query path.

```yaml
dns:
  nameserver:
    - 'https://1.1.1.1/dns-query#h3=true'
```

The complete address must be quoted; otherwise, YAML treats `#h3=true` as a comment.

### Encrypted DNS bootstrap

<VersionRequirement ios="3.6" mac="4.3" />

`default-nameserver` can use encrypted DNS to resolve the hostnames of other DNS servers. Except for `system`, the server address must use an IP.

```yaml
dns:
  default-nameserver:
    - 'https://1.1.1.1/dns-query#h3=true'
```

## Proxy Server Domain Resolution

<VersionRequirement ios="3.6" mac="4.3" />

`proxy-server-nameserver` specifies the DNS servers used to resolve proxy server domain names. It uses an independent DNS query path that never follows proxy rules, preventing recursive queries while connecting to a proxy server.

```yaml
dns:
  proxy-server-nameserver:
    - 223.5.5.5
    - https://dns.alidns.com/dns-query
```

`proxy-server-nameserver` supports the same DNS protocols as `nameserver`. When multiple servers are configured, Stash queries them in parallel and uses the first successful response.

## Domain-based Custom DNS Service

`nameserver-policy` allows using specific DNS servers for specified domain names
or domain sets. It supports exact domains, wildcard domains, and geosite sets in
the `geosite:<name>` form.

```yaml
dns:
  # Use separate DNS servers for specific domain names
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

The value of `nameserver-policy` can be either a single DNS server or an array of
DNS servers. When multiple DNS servers are configured, Stash queries them in
parallel and uses the first successful response.

When a domain matches multiple policies, precedence is exact domain > wildcard
domain > geosite. If multiple geosite policies match, Stash uses the first match
in configuration order.

## Custom Hosts

```yaml
# Support wildcard domain names (e.g., *.clash.dev, *.foo.*.example.com)
# Non-wildcard domain names take precedence over wildcard domain names (e.g., foo.example.com > *.example.com > .example.com)
# Note: The effect of +.foo.com is equivalent to .foo.com and foo.com
hosts:
  '*.clash.dev': 127.0.0.1
  '.dev': 127.0.0.1
  'alpha.clash.dev': ::1
```

## DNS Query Follow Rules

By default, Stash sends DNS queries directly without passing through any proxy rules. When the `follow-rule` option is enabled, Stash will forward DNS queries based on proxy rules.

> [!WARNING]
> In most cases, there is no need to enable this configuration. When DNS queries are forwarded by the proxy, it may disrupt the CDN global optimization strategy of cloud service providers, leading to slow loading of static resources. DNS query requests entering the Stash network engine may also cause a slight increase in latency.
>
> Please enable this configuration only when necessary.

> [!WARNING]
> Since connecting to proxy servers may require DNS resolution, there may be recursive query issues after DNS queries are forwarded by the proxy. Before enabling this configuration, please ensure that one of the following conditions is met:
>
> - The proxy address for forwarding DNS requests is an IP address, not a domain name
> - The DNS server address is an IP address, not a domain name
> - Use `proxy-server-nameserver` to provide independent DNS resolution for proxy server domain names
