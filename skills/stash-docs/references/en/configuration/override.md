---
description: "Override files modify individual fields in a managed or subscribed configuration. Covers how to declare them and the top-to-bottom order in which multiple overrides apply."
---

# Override

Override allows users to modify certain fields in configuration files, commonly used to modify the content of managed or subscribed configurations. Stash allows multiple override files to be enabled simultaneously, and they will override the original configuration from top to bottom.

A best practice is to divide override files based on individual feature points for easier control and sharing.

## Syntax Reference

- Override files use the YAML format with the file extension `.stoverride`.
- Typically, the `name` and `desc` fields are used as the name and description of the override file, and these two fields are only used for display purposes.
- The override file modifies the configuration file according to the following rules:
  - For simple types with the same key, such as string, number, boolean, they will be directly overridden.
  - For dictionary types with the same key, they will be merged recursively according to the key.
  - For array types with the same key, the array in the override file will be inserted at the beginning of the configuration file array.
  - If a line comment `#!replace` is added after a dictionary or array key, it will be merged using the override method.

> [!WARNING]
> Modifying elements in an array is not currently supported, and other syntax
> will be provided for modification in the future.

## Common Override Example

```yaml
name: '📺 BiliBili: 🔀 Redirect'
desc: |-
  BiliBili: Redirect
  Custom CDN for China site
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

## Override Example Using `#!replace` Syntax

```yaml {4}
name: Use Only CloudFlare DNS
dns:
  # This will completely replace the original default-nameserver
  default-nameserver: #!replace
    - system
    - 223.5.5.5
    - 1.0.0.1
  # This will completely replace the original nameserver
  nameserver: #!replace
    - https://1.0.0.1/dns-query # CF IPv4
    - https://[2606:4700:4700::1111]/dns-query # CF IPv6
```

## Merge Example

Original configuration file `config.yaml`:

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

Override file:

```yaml
key: value
dict:
  k3:
    - 0
  k4: #!replace
    - 1
  k5: null
```

Merged result:

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
