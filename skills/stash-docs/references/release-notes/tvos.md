---
description: "Stash tvOS 版本更新日志，记录各版本的新增功能、改进与问题修复。"
---

## 3.3.3

### 新功能
- 新增 VLESS-TCP-REALITY 支持

### 优化
- 优化 Shadowsocks 2022 兼容性

### 修复
- 修复 StashLink 测速可能会卡住的问题

> [!NOTE]
> 发布于 2026 年 3 月 31 日

## 3.3.0

### 新功能
- 新增 dialer-proxy，用于在代理配置中指定上游代理，支持 TCP 与 UDP 中继
- 新增 AnyTLS 支持

### 问题修复
- 修复少量多语言描述问题

> [!NOTE]
> 发布于 2026 年 2 月 19 日

## 3.2.4

### 修复
- 修复首次启动 App 时，策略组可能无法正确显示的问题

> [!NOTE]
> 发布于 2025 年 12 月 3 日

## 3.2.0

### 新增
- 新增支持设置 CNAME 为 hosts
- 新增 proxy-hosts，你可以通过配置 proxy-hosts 指定远程服务器所请求的 IP
- HTTP 重写新增 Mock 支持
配置详情请参考：https://stash.wiki/http-engine/rewrite#mock

- 现在 Stash 在首次安装时，会随机生成一个 API 密钥，所有 API 操作需要设置通过 HTTP 头 Authorization: Bearer `${secret}` 进行身份验证。
API密钥会通过用户 iCloud 自动同步，在远程控制器访问同一 iCloud 下其他 Stash 设备时，会自动填入 API 密钥。

- Transparent Rewrite 支持正则参数

### 优化
- 优化 QUIC

### 修复
- 修复 WireGuard 与 IPv6 的兼容性问题
- 修复 XUDP IPv6 连接
- 修复 Relay 策略组部分情况下无自动测速的问题
- 修复增强模式下 ping 域名可能返回错误 IP 的问题
- 修复 URL Transparent 改写无法正确识别参数的问题
- 修复 DNS 挟持对非标准 DNS 查询兼容性的问题

> [!NOTE]
> 发布于 2025 年 9 月 27 日

## 3.1.1

### 新增
- 支持 VLESS XTLS-Vision
- 支持 VLESS XTLS-REALITY
- 远程规则集支持 MRS 格式规则
- Shadowsocks / Shadowsocks2022 支持配置 udp-port
- Shadowsocks / Shadowsocks2022 支持配置 udp-over-tcp v1 / v2
- 支持 VLESS XUDP
- 对于单个代理的延迟测试新增 benchmark-disabled 选项，设置为 true 时完全禁用延迟测试

### 优化
- 优化首页 IP 信息不准确的问题
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性

### 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分请求在使用脚本改写异常的问题
- 修复部分远程规则集规则数量统计不准确的问题
- 修复浅色样式下字体颜色
- 修复部分崩溃

> [!NOTE]
> 发布于 2025 年 5 月 27 日

## 3.1.0

### 新增
- 支持 VLESS XTLS-Vision
- 支持 VLESS XTLS-REALITY
- 远程规则集支持 MRS 格式规则
- Shadowsocks / Shadowsocks2022 支持配置 udp-port
- Shadowsocks / Shadowsocks2022 支持配置 udp-over-tcp v1 / v2
- 支持 VLESS XUDP
- 对于单个代理的延迟测试新增 benchmark-disabled 选项，设置为 true 时完全禁用延迟测试

### 优化
- 优化首页 IP 信息不准确的问题
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性

### 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分请求在使用脚本改写异常的问题
- 修复部分远程规则集规则数量统计不准确的问题
- 修复浅色样式下字体颜色
- 修复部分崩溃

> [!NOTE]
> 发布于 2025 年 5 月 26 日

## 3.0.2

- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复 HTTP 引擎与部分服务器的兼容性问题
- 修复 Reject 可能错误地发起 DNS 请求的问题

- 更新社交媒体账户信息：
X (Twitter)： @StashAppDev / https://x.com/StashAppDev
讨论组： @StashFans / https://t.me/StashFans
频道： @StashFeed / https://t.me/StashFeed

> [!NOTE]
> 发布于 2025 年 4 月 17 日

## 3.0.1

### 新增
- 全新的 tvOS 导航栏
- 全新的策略组页面
- 支持 ShadowSocks2022 协议
- 支持 ShadowTLS
- 支持 AND、OR、NOT 逻辑规则
- 新增 DOMAIN-WILDCARD 规则
- 新增 DOMAIN-REGEX 规则
- 新增 NETWORK 规则，可选值 tcp, udp
- 新增 PROTOCOL 规则，可选值 TCP, HTTP, HTTPS, UDP, QUIC
- 新增 URL-REGEX 规则
- 新增 USER-AGENT 规则
- 新增 body-rewrite 重写，支持：
  - request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
  - response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- 支持嗅探 TLS Client Hello，获取 SNI 域名
- 在发起 UDP 连接时，现在会尝试使用目标代理发起 DNS 查询以确定目的地址的 IP
- 支持嗅探 QUIC / HTTP3
- 现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- 重写支持读取 zstd 压缩算法

### 优化
- 优化 QUIC 嗅探
- 优化大量远程资源更新
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化 ECH 实现
- 优化软件稳定性

> [!NOTE]
> 发布于 2025 年 3 月 31 日

## 2.7.1

新年快乐！

- 修复部分服务提供商配置可能会闪退的问题

> [!NOTE]
> 发布于 2025 年 1 月 1 日

## 2.7.0

新增：
- 新增 REJECT-DROP 策略
- 新增在 Stash 运行时更新 GEOIP 数据库

优化：
- 更新远程资源时，现在 Stash 将使用 ETag 协商缓存。在资源未变化时，Stash 不会重新下载资源，以节省用户及规则集合提供方的带宽。
- 当设置 server-cert-fingerprint 时，无需配置 skip-cert-verify 为 true
- 优化多语言翻译
- 优化系统 DNS

修复：
- 修复部分情况下配置文件名称异常的问题

> [!NOTE]
> 发布于 2024 年 10 月 21 日

## 2.6.6

- 修复 2.6.5 版本 YAML 空格可能导致配置文件识别错误的问题
- 优化 QUIC

> [!NOTE]
> 发布于 2024 年 9 月 11 日

## 2.6.5

- 优化嗅探
当连接到域名时，Stash 会对所有解析结果同时发起 TCP 握手并使用最快成功的连接。当嗅探到域名时，Stash 会触发一次 DNS 解析以进行上述功能。当域名在公共解析服无解析时，可能会导致连接错误，本次版本提高了与无解析域名的兼容性。

- 优化 HTTP 引擎对带端口的 Host 的兼容性
- Happy Eyeballs Dual Stack 从实验性功能移动到正式版，开启后会优化 IPv4 与 IPv6 双栈的兼容性
- 支持 Proxy-Providers 中设置 benchmark-url 与 benchmark-timeout

> [!NOTE]
> 发布于 2024 年 9 月 7 日

## 2.6.4

### 新增
- 支持 Hysteria 2 端口跳跃特性
- 新增 SSH 协议支持
- 新增 Juicity 协议支持
- Shortcuts 支持 match_geosite 语法
- 新增俄语支持

### 优化
- 优化 QUIC 协议 0-RTT
- 优化 App 体积

> [!NOTE]
> 发布于 2024 年 8 月 2 日

## 2.6.3

- 优化 WireGuard 连接稳定性
- 优化 Hysteria2 在部份网络下 0-RTT 的兼容性
- 优化运行时 MitM 证书生成过程，减少重复计算、提高性能和节省电源消耗
- 优化使用 underlying-proxy 的 WireGuard，在连接出错时能自动恢复

> [!NOTE]
> 发布于 2024 年 6 月 18 日

## 2.6.1

### 新增
- Stash 现已优化嗅探，支持在「仅使用 Tunnel 代理」下使用更多的覆写
- 现已支持嗅探 TCP 连接中可能的 HTTP 请求，包括 Method Host URL
- 支持 DNS over HTTP/3
- 支持代理服务器的 Server Certificate Fingerprint Pinning，开启后会在 TLS 握手时验证服务器证书 SHA256 指纹
- 内置 Script Hub
- 支持折叠策略组

### 优化
- 优化基于 QUIC 协议的性能
- 优化断开 VPN 连接时的速度

### 修复
- 修复最近引入的一个脚本内存占用延迟释放问题
- 修复脚本 $persistentStore.write 传入值为 null 或 undefined 时不能保存的问题
- 修复脚本超时异常的问题
- 修复部份脚本执行失败问题

> [!NOTE]
> 发布于 2024 年 5 月 22 日

## 2.6.0

### 新增
- 支持 DNS 查询跟随规则
- 新增支持 classical text 规则集合
- 脚本 $environment 支持 device-model
- 脚本 $httpClient 支持参数 timeout、insecure、auto-cookie、auto-redirect

### 优化
- 优化 UDP 兼容性
- 优化 Script 内存
- 优化脚本 $httpclient 兼容性，修复与部分服务器的通信可能会异常的问题

### 修复
- 修复 DNS over QUIC 响应超时的问题
- 修正脚本 $argument 参数行为，当未设置 argument 时，$argument 为 undefined
- 修正部分巨型规则匹配可能不准确的问题
- 修复 doq 可能会导致断开的问题
- 修复网络连接不能正确识别来自 Stash 内部的连接的问题

> [!NOTE]
> 发布于 2024 年 4 月 2 日

## 2.5.6

- 修复部分情况下，按钮开关状态不正确的问题
- 修复部分转换后的脚本无法安装的问题
- 修正并发脚本部分情况下异常的问题
- 优化脚本内存占用
- 脚本 setTimeout() 支持传入参数：
setTimeout(function, delay, param1, param2, /* …, */ paramN)

> [!NOTE]
> 发布于 2023 年 12 月 15 日
