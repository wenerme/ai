---
description: "主机名映射功能可将域名解析到指定 IP 地址，或将 A 域名的解析映射为 B 域名的解析。介绍 hosts 字段的写法。"
---

# 主机名映射

Stash 内置了主机名映射功能，允许用户将域名解析到指定的 IP 地址，或者是将 A 域名的解析映射为 B 域名的解析。

```yaml
hosts:
  +.stash.dev: 127.0.0.1
  one.one.one.one: [1.0.0.1, 1.1.1.1]
  manual.stash.ws: stash.wiki

proxy-hosts:
  api.twitter.com: 2606:4700:4700::1001
```

主机名映射支持使用通配符域名，例如 `+.stash.dev` 等价于 `*.stash.dev` 与 `stash.dev`，不使用通配符的域名优先级高于使用通配符的域名。

一个域名可以映射到多个 IP 地址，在实际使用中，Stash 会随机选择一个 IP 地址进行连接。

域名解析也可以指向另一个域名，效果等同于使用 CNAME 记录。Stash 会在解析时自动将其转换为 IP 地址。

`hosts` 在本地 DNS 解析，DIRECT 策略中生效；`proxy-hosts` 仅在向代理服务器转发时生效。
