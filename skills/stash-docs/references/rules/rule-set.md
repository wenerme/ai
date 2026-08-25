---
description: "规则集合（rule-providers）以较低的资源占用引用大量规则，并支持后台静默更新而无需重新加载 Stash。"
---

# 规则集合

规则集合功能可以在较低资源占用情况下引用大量规则，并支持后台静默更新而无需重新加载 Stash。要使用规则集合，您需要在 `rule-providers` 下完成声明，之后即可在 `rules` 下引用集合。

```yaml
rule-providers:
  proxy-domain:
    behavior: domain # 使用 domain 类规则集可提高匹配效率
    format: yaml # 使用 yaml 格式的规则集
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt
    interval: 86400

  cn-cidr:
    behavior: ipcidr # 使用 ipcidr 类规则集可提高匹配效率
    format: text # 使用 text 格式的规则集
    url: https://cdn.jsdelivr.net/gh/17mon/china_ip_list@master/china_ip_list.txt
    interval: 86400

rules:
  - RULE-SET,proxy-domain,Proxy
  - RULE-SET,cn-cidr,DIRECT,no-resolve # ipcidr 类规则集支持 no-resolve 参数
```

如果远程规则集合需要鉴权，或服务端要求特定的 `Accept`、`User-Agent` 等请求头，可以在 rule provider 中配置 `headers`。该配置会在 Stash 更新远程规则集合时随请求发送。

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

`headers` 中的值可以是单个字符串，也可以是字符串数组，用于发送同名多值请求头：

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

如果 URL 中已经包含用户名和密码，例如 `https://user:password@example.com/rules.yaml`，Stash 会优先使用 URL 中的信息生成 Basic Auth，此时它会覆盖 `headers` 中配置的 `Authorization`。

为便于管理本地缓存，你可以用 `path` 指定规则集合的缓存路径。例如：

```yaml
rule-providers:
  proxy-domain:
    behavior: domain
    format: yaml
    url: https://example.com/rules.yaml
    path: ./rules/proxy-domain.yaml
    interval: 86400
```

Stash 启动时会优先读取 `path` 对应的本地缓存；如果本地缓存不存在或无法解析，后续会从 `url` 下载远程规则集合并写入该路径。远程更新成功后，也会覆盖该本地缓存。

> [!WARNING]
> 为避免路径越权，Stash 会将 `path` 限制在 Stash 管理的资源目录内。

你也可以仅声明 `path`，不填写 `url`，这样规则集合会作为本地静态 provider 使用，不会进行定时更新。例如：

```yaml
rule-providers:
  local-domain:
    behavior: domain
    format: yaml
    path: ./rules/local-domain.yaml
```

Stash 支持多种规则集合格式，不同格式支持不同内容类型，并具有不同的资源占用表现：

| 行为（behavior） | 格式   | 支持内容                  | 示例                                                                                                          | 匹配性能 | 内存占用 |
| ---------------- | ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `domain`         | `yaml` | 域名/域名通配符           | [链接](https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt)                             | 优秀     | 低       |
| `domain`         | `text` | 域名/域名通配符           | [链接](https://fastly.jsdelivr.net/gh/Loyalsoldier/surge-rules@release/proxy.txt)                             | 优秀     | 低       |
| `ipcidr`         | `yaml` | IPv4/IPv6 集合，CIDR 格式 | [链接](https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt)                           | 优秀     | 低       |
| `ipcidr`         | `text` | IPv4/IPv6 集合，CIDR 格式 | [链接](https://fastly.jsdelivr.net/gh/17mon/china_ip_list@master/china_ip_list.txt)                           | 优秀     | 低       |
| `classical`      | `yaml` | 任意规则类型              | [链接](https://fastly.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Clash/Basic/Apple-direct.yaml) | 一般     | 一般     |
| `classical`      | `text` | 任意规则类型              | [链接](https://cdn.jsdelivr.net/gh/Loyalsoldier/surge-rules@release/cncidr.txt)                               | 一般     | 一般     |

> [!NOTE]
> `domain(-text)` 和 `ipcidr(-text)`
> 类型的规则集合针对大量数据进行了专门压缩优化，当规则条目较多时建议优先选用。

> [!NOTE]
> Stash 也支持使用 MRS 格式的规则集合，目前支持 `behavior` 为 `domain` 和
> `ipcidr` 的规则集合。
