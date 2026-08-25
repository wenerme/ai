---
description: "覆写文件（Override）用于修改托管或订阅配置中的部分字段。介绍声明方式，以及多个覆写文件从上到下的叠加顺序。"
---

# 覆写文件（Override）

覆写文件（Override）允许用户修改配置文件的部分字段，常用于修改托管、订阅的配置内容。Stash 支持同时启用多个覆写文件，配置将按照从上到下的顺序依次覆盖。

最佳实践建议：为便于单独控制开关和分享，建议按功能点划分覆写文件。

## 语法参考

- 覆写文件使用 YAML 格式，文件后缀为 `.stoverride`
- 通常使用 `name` 和 `desc` 字段作为覆写文件的名称和描述，这两个字段仅用于展示
- 覆写文件对配置文件的修改遵循以下规则：
  - 对于简单类型（string、number、boolean）的同名键，直接覆盖原值
  - 对于字典类型的同名键，采用递归键值合并
  - 对于数组类型的同名键，覆写文件的数组会插入到原数组前面
  - 对于字典类型和数组类型的键，若添加注释 `#!replace`，则采用完全覆盖方式合并

> [!WARNING]
> 当前版本暂不支持修改数组中的特定元素，后续版本将提供相关语法支持。

## 常见覆写示例

```yaml
name: '📺 BiliBili: 🔀 Redirect'
desc: |-
  哔哩哔哩：重定向
  中国站CDN自定义
openUrl: 'http://boxjs.com/#/app/BiliBili.Redirect'
author: |-
  VirgilClyne[https://github.com/VirgilClyne]
homepage: 'https://Redirect.BiliUniverse.io'
icon: 'https://github.com/BiliUniverse/Redirect/raw/main/src/assets/icon_rounded.png'
category: '🪐 BiliUniverse'
date: '2024-12-10 07:13:21'
version: '0.2.12'

http:
  force-http-engine:
    - '*.bilivideo.cn:80'
    - '*.bilivideo.com:80'
    - upos-hz-mirrorakam.akamaized.net:80
    - '*:4480'
    - '*:8000'
    - '*:8082'
    - '*.mcdn.bilivideo.cn:9102'
  mitm:
    - '*.bilivideo.cn:443'
    - '*.bilivideo.com:443'
    - '*.mcdn.bilivideo.com:4483'
    - '*.mcdn.bilivideo.cn:4483'
    - '*.mcdn.bilivideo.cn:8082'
    - '*.mcdn.bilivideo.com:8082'
    - 'upos-*-mirrorakam.akamaized.net:443'
  script:
    - match: ^https?:\/\/.+\.bilivideo\.com\/upgcxcode\/
      name: '📺 BiliBili.Redirect.request'
      type: request
    - match: ^https?:\/\/(.+):(8000|8082)\/v1\/resource\/
      name: '📺 BiliBili.Redirect.request'
      type: request
      argument:
    - match: ^https?:\/\/[xy0-9]+\.mcdn\.bilivideo\.(cn|com):(4483|9102)\/upgcxcode\/
      name: '📺 BiliBili.Redirect.request'
      type: request
      argument:
    - match: ^https?:\/\/(.+):4480\/upgcxcode\/
      name: '📺 BiliBili.Redirect.request'
      type: request
      argument:
    - match: ^https?:\/\/upos-(hz|bstar1)-mirrorakam\.akamaized\.net/upgcxcode\/
      name: '📺 BiliBili.Redirect.request'
      type: request
      argument:
script-providers:
  '📺 BiliBili.Redirect.request':
    url: https://github.com/BiliUniverse/Redirect/releases/download/v0.2.12/request.bundle.js
    interval: 86400
```

## 使用 `#!replace` 语法的覆写示例

```yaml {4}
name: 仅使用 CloudFlare DNS
dns:
  # 将完全覆盖原有 default-nameserver
  default-nameserver: #!replace
    - system
    - 223.5.5.5
    - 1.0.0.1
  # 将完全覆盖原有 nameserver
  nameserver: #!replace
    - https://1.0.0.1/dns-query # CF IPv4
    - https://[2606:4700:4700::1111]/dns-query # CF IPv6
```

## 合并示例

原始配置文件 `config.yaml`：

```yaml
dict:
  k1: true
  k2: 1
  k3:
    - 1
    - 2
    - 3
  k4:
    - 1
    - 2
    - 3
```

覆写文件：

```yaml
key: value
dict:
  k3:
    - 0
  k4: #!replace
    - 1
  k5: null
```

合并后结果：

```yaml
key: value
dict:
  k1: true
  k2: 1
  k3:
    - 0
    - 1
    - 2
    - 3
  k4:
    - 1
  k5: null
```
