---
description: "Stash 支持由服务提供商管理的配置，可定时更新配置文件，并显示服务剩余流量与过期信息。"
---

# 服务提供商订阅

Stash 支持由服务提供商管理的配置，可以定时更新配置文件，并显示服务剩余流量、过期信息。

## 定时更新配置

在配置文件的**首行**加入如下注释，Stash 会将配置认定为服务提供商管理的配置，该配置会定时从指定的 URL 获取新版本。目前检查更新的间隔为 12 小时，用户可以在设置页面更改这个配置。

```yaml
#SUBSCRIBED https://proxy.service/stash/config
```

## 展示服务信息

服务提供商可以通过 HTTP Response Header 提供服务信息，包括：上行流量、下行流量、流量总量、过期时间。格式为：

```
Subscription-Userinfo: upload=%f; download=%f; total=%f; expire=%f
```

服务信息会被 Stash 解析，并在 App 首页显示。

Stash 会首先采用定时更新配置 URL 中的服务信息，如果没有定时更新 URL，则会使用配置文件中的 `proxy-providers` 中的 `url`，该字段可以在可视化编辑页面设置。

> [!NOTE]
> Stash 会优先使用 HEAD 方法获取服务信息以降低流量消耗。
