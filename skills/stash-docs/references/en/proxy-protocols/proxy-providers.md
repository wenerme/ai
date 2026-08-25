---
description: "A remote proxy provider updates its proxy list from a URL in the background, so the configuration file does not have to be edited by hand."
---

# Remote Proxy Set

Proxies declared directly in the configuration file cannot be automatically updated in the background. We recommend using remote proxy sets (proxy-provider), which can automatically update the strategy group from the URL in the background.

To use remote proxy sets, they must be defined under `proxy-providers` and referenced in `proxy-groups`.

```yaml
proxy-providers:
  provider-a:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
    interval: 3600
    filter: 'example'

  provider-b:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
    interval: 3600

proxy-groups:
  - name: auto
    type: url-test
    interval: 300
    use:
      - provider-a # reference to provider-a
      - provider-b # reference to provider-b
```

If a remote proxy set requires authentication, or if the server expects specific
request headers such as `Accept` or `User-Agent`, configure `headers` on the
proxy provider. Stash sends these headers when updating the remote proxy set.

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    interval: 3600
    headers:
      Authorization: Bearer your-token
      Accept: application/yaml
      User-Agent: Stash
```

Values under `headers` can be either a single string or an array of strings for
multi-value request headers:

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    interval: 3600
    headers:
      Accept:
        - application/yaml
        - text/plain
```

If the URL already contains a username and password, such as
`https://user:password@example.com/provider.yaml`, Stash uses the URL credentials
to generate Basic Auth. In that case, it overrides `Authorization` configured in
`headers`.

To make local cache management easier, you can use `path` to specify the cache
path for a remote proxy set. For example:

```yaml
proxy-providers:
  provider-a:
    url: https://example.com/provider.yaml
    path: ./providers/provider-a.yaml
    interval: 3600
```

When Stash starts, it first reads the local cache at `path`. If the local cache
does not exist or cannot be parsed, Stash downloads the remote proxy set from
`url` and writes it to that path later. A successful remote update also
overwrites the local cache.

> [!WARNING]
> To prevent path traversal, Stash limits `path` to the resource directory
> managed by Stash.

You can also declare only `path` without `url`. In that case, the proxy set is
used as a local static provider and is not updated periodically. For example:

```yaml
proxy-providers:
  local-provider:
    path: ./providers/local.yaml
```

A valid remote proxy set must contain the `proxies` field:

```yaml
proxies:
  - name: 'ss1'
    type: ss
    server: server
    port: 443
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
  - name: 'ss2'
    type: ss
    server: server
    port: 443
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
```

Proxy nodes in a remote proxy set can use [`dialer-proxy`](/en/proxy-protocols/dialer-proxy#dialer-proxies-in-remote-proxy-sets) to specify an upstream proxy.

Remote proxy sets support filtering proxy names using regular expressions through the `filter` field. When the remote proxy set is empty, it defaults to `DIRECT`.

### Shortcut for Using Remote Proxy Sets

Stash also supports using `use-url` to quickly reference remote proxy sets in strategy groups. In this case, update time and name cannot be specified.

```yaml
proxy-groups:
  - name: auto
    type: url-test
    interval: 300
    use-url:
      - https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
```
