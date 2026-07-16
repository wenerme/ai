# Hostname Mapping

Stash comes with built-in hostname mapping capabilities, allowing users to resolve domain names to specific IP addresses or map the resolution of domain A to that of domain B.

```yaml
hosts:
  +.stash.dev: 127.0.0.1
  one.one.one.one: [1.0.0.1, 1.1.1.1]
  manual.stash.ws: stash.wiki

proxy-hosts:
  api.twitter.com: 2606:4700:4700::1001
```

Hostname mapping supports wildcard domains. For instance, `+.stash.dev` is equivalent to `*.stash.dev` and `stash.dev`. Domains without wildcards have a higher priority than those with wildcards.

A domain can be mapped to multiple IP addresses. In actual use, Stash will randomly select one IP address to connect.

Domain resolution can also point to another domain, which is equivalent to using a CNAME record. Stash will automatically convert it to an IP address during resolution.

`hosts` are effective in local DNS resolution and in the DIRECT strategy; `proxy-hosts` are only effective when forwarding to the proxy server.
