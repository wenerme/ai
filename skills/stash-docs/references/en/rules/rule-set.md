---
description: "Rule sets (rule-providers) reference large rule lists with low resource use and update silently in the background without reloading Stash."
---

# Rule Sets

The rule set feature allows referencing a large number of rules with low resource consumption and supports silent updates in the background without reloading Stash. To use rule sets, you need to declare them under `rule-providers`, and then reference the sets under `rules`.

```yaml
rule-providers:
  proxy-domain:
    behavior: domain # Using domain-type rule sets can improve matching efficiency
    format: yaml # Use YAML format for rule sets
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt
    interval: 86400

  cn-cidr:
    behavior: ipcidr # Using ipcidr-type rule sets can improve matching efficiency
    format: text # Use text format for rule sets
    url: https://cdn.jsdelivr.net/gh/17mon/china_ip_list@master/china_ip_list.txt
    interval: 86400

rules:
  - RULE-SET,proxy-domain,Proxy
  - RULE-SET,cn-cidr,DIRECT,no-resolve # ipcidr-type rule sets support the no-resolve parameter
```

If a remote rule set requires authentication, or if the server expects specific
request headers such as `Accept` or `User-Agent`, configure `headers` on the
rule provider. Stash sends these headers when updating the remote rule set.

```yaml
rule-providers:
  proxy-domain:
    behavior: domain
    format: yaml
    url: https://example.com/rules.yaml
    interval: 86400
    headers:
      Authorization: Bearer your-token
      Accept: application/yaml
```

Values under `headers` can be either a single string or an array of strings for
multi-value request headers:

```yaml
rule-providers:
  proxy-domain:
    behavior: domain
    format: yaml
    url: https://example.com/rules.yaml
    interval: 86400
    headers:
      Accept:
        - application/yaml
        - text/plain
```

If the URL already contains a username and password, such as
`https://user:password@example.com/rules.yaml`, Stash uses the URL credentials to
generate Basic Auth. In that case, it overrides `Authorization` configured in
`headers`.

To make local cache management easier, you can use `path` to specify the cache
path for a rule set. For example:

```yaml
rule-providers:
  proxy-domain:
    behavior: domain
    format: yaml
    url: https://example.com/rules.yaml
    path: ./rules/proxy-domain.yaml
    interval: 86400
```

When Stash starts, it first reads the local cache at `path`. If the local cache
does not exist or cannot be parsed, Stash downloads the remote rule set from
`url` and writes it to that path later. A successful remote update also
overwrites the local cache.

> [!WARNING]
> To prevent path traversal, Stash limits `path` to the resource directory
> managed by Stash.

You can also declare only `path` without `url`. In that case, the rule set is
used as a local static provider and is not updated periodically. For example:

```yaml
rule-providers:
  local-domain:
    behavior: domain
    format: yaml
    path: ./rules/local-domain.yaml
```

Stash supports various rule set formats, each supporting different content types and exhibiting different resource usage:

| Behavior    | Format | Supported Content                  | Example                                                                                                       | Matching Performance | Memory Usage |
| ----------- | ------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ------------ |
| `domain`    | `yaml` | Domains/Domain Wildcards           | [Link](https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt)                             | Excellent            | Low          |
| `domain`    | `text` | Domains/Domain Wildcards           | [Link](https://fastly.jsdelivr.net/gh/Loyalsoldier/surge-rules@release/proxy.txt)                             | Excellent            | Low          |
| `ipcidr`    | `yaml` | IPv4/IPv6 collections, CIDR format | [Link](https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt)                           | Excellent            | Low          |
| `ipcidr`    | `text` | IPv4/IPv6 collections, CIDR format | [Link](https://fastly.jsdelivr.net/gh/17mon/china_ip_list@master/china_ip_list.txt)                           | Excellent            | Low          |
| `classical` | `yaml` | Any rule type                      | [Link](https://fastly.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Clash/Basic/Apple-direct.yaml) | Average              | Average      |
| `classical` | `text` | Any rule type                      | [Link](https://cdn.jsdelivr.net/gh/Loyalsoldier/surge-rules@release/cncidr.txt)                               | Average              | Average      |

> [!NOTE]
> Rule sets of type `domain(-text)` and `ipcidr(-text)` are specially compressed
> and optimized for a large amount of data. It is recommended to prioritize
> these when there are a lot of rule entries.

> [!NOTE]
> Stash also supports using MRS format rule sets, currently supporting rule sets
> with `behavior` as `domain` and `ipcidr`.
