---
description: "Stash's built-in DNS service queries multiple servers at once and takes the fastest response. Covers the supported DNS protocols and how to configure them."
---

# Built-in DNS Service

## Custom Upstream DNS Servers

Stash supports configuring multiple DNS servers simultaneously. When making queries, Stash will send concurrent requests to all servers and use the fastest response. Stash supports the following DNS protocols:

- Use the system-provided DNS: `system`
- DNS over UDP: `8.8.8.8` or `udp://8.8.8.8`
- DNS over TCP: `tcp://8.8.8.8`
- [DNS over TLS](https://www.rfc-editor.org/rfc/rfc7858): `tls://8.8.8.8:853` or `dot://8.8.8.8:853`
- [DNS over HTTPS](https://www.rfc-editor.org/rfc/rfc8484): `https://1.1.1.1/dns-query` or `doh://1.1.1.1/dns-query`
- DNS over HTTP/3: `http3://1.1.1.1/dns-query` or `doh3://1.1.1.1/dns-query`
- [DNS over QUIC](https://www.rfc-editor.org/rfc/rfc9250): `quic://dns.adguard.com:853` or `doq://dns.adguard.com:853`

`default-nameserver` will be used to resolve domain names for DNS services, and only IP addresses of DNS servers are supported.

```yaml
dns:
  # The DNS servers listed below will be used to resolve domain names for DNS services
  # Only fill in the IP addresses of DNS servers
  default-nameserver:
    - 223.5.5.5
    - 114.114.114.114
  # DNS services supporting UDP / TCP / DoT / DoH / DoQ protocols, with specific connection port numbers if needed.
  # All DNS requests will be sent directly to the servers without going through any proxies.
  # Stash will reply to DNS requests with the first obtained resolution record
  nameserver:
    # It is not recommended to configure more than 2 DNS servers as it may increase system power consumption
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
    - quic://dns.adguard.com:853
    - doq://test.dns.nextdns.io:853
    - system # Use iOS system DNS

  # Skip certificate verification to resolve some compatibility issues https://help.nextdns.io/t/g9hdkjz
  skip-cert-verify: true

  # DNS queries follow proxy rules
  follow-rule: false
```

Stash uses the LRU algorithm for local caching of DNS queries. When the local cache expires, Stash will continue to use the cached result and silently update the records in the background, effectively reducing the request delay caused by DNS cache expiration.

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
