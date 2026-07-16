# 策略组

策略组（`proxy-groups`）是一系列代理（或策略组）的组合。策略组可以像单个代理一样被分流规则引用，并可以指定特殊的策略提高可用性。

- 分流规则可以直接引用代理或策略组，但不能引用远程代理集
- 策略组可以包含多个代理，或者多个远程代理集
- 策略组可以包含另一个策略组
- 不包含任何代理的策略组，会被当作为 `DIRECT` 策略处理
- 支持 `filter` 字段，通过正则表达式过滤节点
- 可以通过 `include-all: true` 引用所有的代理和远程代理集

[![](https://mermaid.ink/svg/pako:eNqNjz0OwjAMha8SeW4ukIEJNiZYvViNaSOaH7kJIqp6dwIqSAxILNbz9-wne4E-WgYDg1Aa1fGEAUOSeHc8K6136qmrHiSWNH87UibeUNWt3pxl-bX07v6xX8HQgWfx5Gw7bsGgFEIe2TOCadKSXBEwrG2OSo7nGnowWQp3UJKlzHtH7ScP5kLT_KEH63KUDa4PpRlbCA?type=png)](https://mermaid.live/edit#pako:eNqNjz0OwjAMha8SeW4ukIEJNiZYvViNaSOaH7kJIqp6dwIqSAxILNbz9-wne4E-WgYDg1Aa1fGEAUOSeHc8K6136qmrHiSWNH87UibeUNWt3pxl-bX07v6xX8HQgWfx5Gw7bsGgFEIe2TOCadKSXBEwrG2OSo7nGnowWQp3UJKlzHtH7ScP5kLT_KEH63KUDa4PpRlbCA)

## 策略类型

> [!NOTE]
> 策略组内代理的排序方式默认为配置文件顺序，可以在「网络设置」页面改为按延迟测试结果排序。

### `url-test`

`url-test` 可以定时对包含的代理执行连通性检查，自动选择延迟最短的服务器，不健康的代理会被跳过。

```yaml
- name: auto
  type: url-test
  proxies:
    - ss1
    - ss2
    - vmess
  interval: 300
```

### `fallback`

`fallback` 可以尽量按照用户书写的服务器顺序，在确保服务器可用的情况下，由上至下自动选择服务器，不健康的代理会被跳过。

```yaml
- name: fallback-auto
  type: fallback
  proxies:
    - ss1
    - ss2
    - vmess
```

### `load-balance`

`load-balance` 能充分利用多个代理的带宽，不健康的代理会被跳过。

```yaml
- name: load-balance
  type: load-balance
  strategy: # consistent-hashing / round-robin
  proxies:
    - ss1
    - ss2
    - vmess
```

一般建议将 `strategy` 设置为 `consistent-hashing`，避免频繁改变 IP 触发服务端的安全策略。

### `select`

`select` 用来允许用户手动选择。

```yaml
- name: select
  type: select
  proxies:
    - ss1
    - ss2
    - vmess
    - auto
```

### `relay`

> [!WARNING]
> `relay`
> 策略组已经不推荐使用，建议使用功能更丰富的[代理链（dialer-proxy）](/proxy-protocols/dialer-proxy)实现代理中继。

代理的转发链，流量将通过一系列的代理转发到达目的地，仅支持转发 TCP 或使用 UDP over TCP 的协议。`relay` 策略组并不受到内部代理延迟测试的结果影响，需要单独指定测试 URL。

```yaml
- name: relay
  type: relay
  benchmark-url: http://www.apple.com # 建议只使用HTTP协议
  benchmark-timeout: 5 # 延迟测试超时，单位：秒
  # 流量: stash <-> http <-> vmess <-> ss1 <-> ss2 <-> 互联网
  proxies:
    - http
    - vmess
    - ss1
    - ss2
```

> [!NOTE]
> 如果 `relay` 策略组内的代理无法直接被访问，可以对这些代理配置
> `benchmark-disabled: true` 禁用 Stash 对它发起单独的延迟测试。

## 额外功能

### 定时执行延迟测试

Stash 默认会每 600 秒为策略组内包含的代理进行延迟测试，如果策略组包含另外一个策略组，则会递归进行测试。

定时执行延迟测试支持修改下述配置：

- `interval`：单位秒，按一定间隔执行延迟测试，默认为 600 秒，设置为负数则不进行延迟测试。
- `lazy`：懒惰模式，如果设置为 `true`，且策略组在过去一段时间没有被使用，Stash 会跳过自动延迟测试以节省资源。

```yaml
proxy-groups:
  - name: my-proxy-group
    type: select
    # ...
    interval: 300 # 每 300s 检查一次
    lazy: true # 在策略组没有被使用时候，不进行延迟测试
```

### 基于网络状态自动切换策略

`select` 类型的策略组可以根据设备的 SSID / 蜂窝数据自动切换策略。

`default` 和 `cellular` 是两个可选的保留策略：

- 当在 Wi-Fi 环境下，没有匹配到任何 SSID 时，会自动切换到 `default` 对应的代理；
- 在蜂窝数据下，会自动切换到 `cellular` 对应的代理；
- 当没有 `default` 或 `cellular` 时候，不会触发任何操作。

> [!NOTE]
> 在 macOS 下使用 `ssid-policy` 时，Stash 需要系统定位服务授权才能读取当前 Wi-Fi SSID。如果策略没有按预期切换，请检查「系统设置」-「隐私与安全性」-「定位服务」中 Stash 的授权状态。

```yaml
- name: ssid-group
  type: select # 类型必须为 select，兼容原版 clash 配置
  proxies:
    - ss1
    - ss2
    - ss3
    - DIRECT
  ssid-policy:
    # 在 SSID 为 office 的 Wi-Fi 中自动切换为 ss1 策略
    # 在 SSID 为 home 的 Wi-Fi 中自动切换为 ss2 策略
    # 在蜂窝数据中自动切换为 ss3 策略
    # 其他的 SSID 默认为 DIRECT
    office: ss1
    home: ss2
    cellular: ss3
    default: DIRECT
```

### 灵活地组合代理

Stash 支持各种方式将多个代理组合成一个策略组。

- 可以通过 `include-all: true` 引用所有的代理和远程代理集
- 不包含任何代理的策略组，会被当作为 `DIRECT` 策略处理。
- 支持 `filter` 字段，通过正则表达式过滤节点

```yaml
proxy-groups:
  - name: my-hongkong-group
    type: select
    include-all: true # 引用所有 proxies & proxy-providers
    filter: 'HK|香港' # 筛选含有 HK 或香港关键字的代理
```
