---
description: "Stash Mac 版本更新日志，记录各版本的新增功能、改进与问题修复。"
---

## 4.2.0

### 新功能
- 完善「最近请求」页面，新增总览、日志、请求头页面
- 增加配置文件可视化编辑器
- 优化激活和反激活流程
- 增加覆写可视化编辑
- 支持通过点击 tailscale 节点发起登录
- 支持在 Dashboard 对连接创建规则
- 优化 Tun 在网络不可用时表现
- 可视化编辑支持编辑 Hysteria2 混淆模式
- 新增本地覆写编辑
- 新增 Tailscale 支持，文档：https://stash.wiki/proxy-protocols/proxy-types#tailscale
- 新增 VLESS-TCP-REALITY 支持
- 新增 Hysteria2 salamander 混淆模式
- 引用 Provider 可以设置请求的 headers
- DNS Nameserver Policy 支持 GEOSITE 匹配，支持设置多个 Nameserver 并发访问
- 支持 TrustTunnel 协议
- PROCESS-NAME 规则支持以 / 结尾时前缀匹配
- Hysteria2 混淆方式新增 gecko 支持
### 优化
- 优化状态栏
- 优化仪表盘页面
- 优化远程控制器
- 优化「最近请求」页面
- 新增状态栏图标被隐藏或者遮挡的提示
- 图标支持 macOS 26 特效
- 统一部分窗口样式
- 优化整理设置页面分类
- 优化网络变化感知
- 新增 Tailscale debug 选项
- 可视化编辑中的混淆模式改为选项
- 移除了 gVisor 隧道栈
- 优化 VLESS 可视化编辑交互
- 优化 QUIC 协议的拥塞控制
- 新增 TrustTunnel 和 Hysteria2 Gecko 的可视化编辑
- Tailscale 可视化编辑不再要求 auth-key
- 优化 iCloud 读写事件
- 优化 TrustTunnel 描述
- 全面优化本地化翻译
- 优化 StashTun DNS 请求处理
- 优化 Darwin Tun 兼容性
- 优化 TUIC 兼容性
- 优化 StashLink 资源占用
- 默认使用 Stash DeviceID 作为 Tailscale hostname
- 优化 Private Network CORS 支持
- 优化闲置 HTTP 代理请求
- 优化 Block QUIC 处理
- 优化网络切换时测速策略与内存占用
### 修复
- 修复状态栏图标部分情况下可能变模糊的问题
- 修复状态栏显示 GB/s 时，UI 异常的问题
- 优化状态栏图标被刘海遮挡的提醒
- 优化macOS 12下设置显示问题
- 优化出栈信息的显示
- 显示远程资源数量
- 允许快速点击复制设备编号
- 优化 Helper 程序的安装流程
- 优化进程名字显示过长的问题
- 内置语言的切换
- 修复部分情况下 iCloud 可能导致卡住的问题
- 修复部分情况下代理页面可能无法正确显示的问题
- 优化订阅抓取
- 修复当 iCloud 不可用时，配置文件可能会变成 Default 的问题
- 修复 StashTun 上传可能出现缓慢的问题
- 修复 StashLink 部分情况下可能闪退的问题
- 修复 Hysteria v1 协议传输 UDP 分片问题
- 修复 VLESS UDP 握手时机的问题
- 修复 uTLS 无法启用 skip-cert-verify 的问题
- 修复 IPv6 CNAME 配置可能意外返回 IPv4 记录的问题
- 修复部分情况下 StashLink 测速可能会卡住的问题
- 优化远程资源加载，修复部分情况下资源下载失败可能变成 0 的问题
- 修复增强模式下 Tailscale 无法使用的问题
- 优化 Shadowsocks 2022 兼容性
- 修复网络切换时 Tailscale 可能会崩溃的问题
- 修复了非法 MRS 资源可能导致崩溃的问题
- 优化 IP --> 域名反查策略
- 隧道流量的嗅探现在可以更早生效
- 优化策略组刷新后迟滞问题
- 修复 WireGuard 发送地址可能不正确的问题
- 修复 VLESS XUDP 发送地址可能不正确的问题
- 修复 HTTP 连通性检查内存延迟回收的问题
- 修复 WireGuard 协议在某些情况下重连不成功的问题

> [!NOTE]
> 发布于 2026 年 7 月 2 日

## 4.1.1

### 优化
- 优化 macOS 12 设置页面
- 优化 Shadowsocks 2022 兼容性
- 支持 VLESS-TCP-Reality
### 修复
- 修复 macOS 12 设置页面可能异常的问题
- 修复 StashLink 测速可能会卡住的问题

> [!NOTE]
> 发布于 2026 年 4 月 1 日

## 4.1.0

🎉 Stash for macOS 4.0 正式发布 · 2026 新年快乐！
• 新功能
- 新增 dialer-proxy，用于在代理配置中指定上游代理，支持 TCP 与 UDP 中继
- 新增 AnyTLS 支持
- Providers 支持指定路径，支持通过 payload 初始化文件，并可通过 iCloud 同步
• 优化与改进
- 重构 HTTP 引擎，优化在处理多个 Rewrite 场景下的性能
• 问题修复
- 修复少量多语言描述问题

> [!NOTE]
> 发布于 2026 年 2 月 21 日

## 4.0.0

🎉 Stash for macOS 4.0 正式发布 · 2026 新年快乐！
- 修复「清理软件」在后台扫描清理 Stash 导致需要重新激活的问题

> [!NOTE]
> 发布于 2026 年 1 月 12 日

## 4.0.0

🎉 Stash for macOS 4.0 正式发布 · 2026 新年快乐！
我们带着全新的 Stash for macOS 4.0 与大家一起迈入 2026！
在这里，Stash 团队向每一位用户致以最诚挚的新年祝福： 愿新的一年，万事顺遂，所想皆成。
Stash for macOS 4.0 带来了全面重构的全新界面，全新的 UI 设计让信息结构更清晰、操作更直观、视觉更现代！
感谢你一直以来对 Stash 的支持与信任。
让我们在 2026 年一起继续前进，
用全新的 Stash，开启新的辉煌。
再次祝你：
2026 新年快乐！ 🥂
- Stash 团队

> [!NOTE]
> 发布于 2026 年 1 月 2 日

## 4.0.0

🎉 Stash for macOS 4.0 正式发布 · 2026 新年快乐！
我们带着全新的 Stash for macOS 4.0 与大家一起迈入 2026！
在这里，Stash 团队向每一位用户致以最诚挚的新年祝福： 愿新的一年，万事顺遂，所想皆成。
Stash for macOS 4.0 带来了全面重构的全新界面，全新的 UI 设计让信息结构更清晰、操作更直观、视觉更现代！
感谢你一直以来对 Stash 的支持与信任。
让我们在 2026 年一起继续前进，
用全新的 Stash，开启新的辉煌。
再次祝你：
2026 新年快乐！ 🥂
- Stash 团队

> [!NOTE]
> 发布于 2025 年 12 月 31 日

## 4.0.0

🎉 Stash for macOS 4.0 正式发布 · 2026 新年快乐！
我们带着全新的 Stash for macOS 4.0 与大家一起迈入 2026！
在这里，Stash 团队向每一位用户致以最诚挚的新年祝福： 愿新的一年，万事顺遂，所想皆成。
Stash for macOS 4.0 带来了全面重构的全新界面，全新的 UI 设计让信息结构更清晰、操作更直观、视觉更现代！
感谢你一直以来对 Stash 的支持与信任。
让我们在 2026 年一起继续前进，
用全新的 Stash，开启新的辉煌。
再次祝你：
2026 新年快乐！ 🥂
- Stash 团队

> [!NOTE]
> 发布于 2025 年 12 月 31 日

## 3.2.0

• 修复
- 修复当用户使用「柠檬清理」或「Clean My Mac」等软件清理后，Stash 反复提示激活或安装帮助程序 Helper 的问题

> [!NOTE]
> 发布于 2025 年 10 月 30 日

## 3.1.0

• 新增
- 在「虚拟网卡模式」选择为「Apple」时，Stash 支持在增强模式和 FakeIP 下返回正确的 Ping 信息，方便开发者使用
- 支持 VLESS XTLS-Vision
- 支持 VLESS XTLS-REALITY
- 远程规则集支持 MRS 格式规则
- Shadowsocks / Shadowsocks2022 支持配置 udp-port
- Shadowsocks / Shadowsocks2022 支持配置 udp-over-tcp v1 / v2
- 支持 VLESS XUDP
- 对于单个代理的延迟测试新增 benchmark-disabled 选项，设置为 true 时完全禁用延迟测试
• 优化
- 优化首页 IP 信息不准确的问题
- 优化脚本 console.log ，现支持打印对象、null 和 undefined
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性
• 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分脚本使用 $httpClient 发送请求可能失败的问题
- 修复仪表盘 UDP 请求 PID 显示不正确的问题
- 修复部分请求在使用脚本改写异常的问题
- 修复部分崩溃

> [!NOTE]
> 发布于 2025 年 5 月 27 日

## 3.1.0

• 新增
- 在「虚拟网卡模式」选择为「Apple」时，Stash 支持在增强模式和 FakeIP 下返回正确的 Ping 信息，方便开发者使用
- 支持 VLESS XTLS-Vision
- 支持 VLESS XTLS-REALITY
- 远程规则集支持 MRS 格式规则
- Shadowsocks / Shadowsocks2022 支持配置 udp-port
- Shadowsocks / Shadowsocks2022 支持配置 udp-over-tcp v1 / v2
- 支持 VLESS XUDP
- 对于单个代理的延迟测试新增 benchmark-disabled 选项，设置为 true 时完全禁用延迟测试
• 优化
- 优化首页 IP 信息不准确的问题
- 优化脚本 console.log ，现支持打印对象、null 和 undefined
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性
• 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分脚本使用 $httpClient 发送请求可能失败的问题
- 修复仪表盘 UDP 请求 PID 显示不正确的问题
- 修复部分请求在使用脚本改写异常的问题
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
> 发布于 2025 年 4 月 29 日

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

## 3.0.0

• 新增
- 支持 ShadowSocks2022 协议
- 支持 ShadowTLS
- 支持 AND、OR、NOT 逻辑规则
- 新增 DOMAIN-WILDCARD 规则
- 新增 DOMAIN-REGEX 规则
- 新增 NETWORK 规则，可选值 tcp, udp
- 新增 PROTOCOL 规则，可选值 TCP, HTTP, HTTPS, UDP, QUIC
- 新增 URL-REGEX 规则
- 新增 USER-AGENT 规则
- 支持策略组图标
- 新增 body-rewrite 重写，支持：
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- 支持嗅探 TLS Client Hello，获取 SNI 域名
- 在发起 UDP 连接时，现在会尝试使用目标代理发起 DNS 查询以确定目的地址的 IP
- 支持嗅探 QUIC / HTTP3
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
• 优化
- 优化 QUIC 嗅探
- 优化「仪表盘」界面
- 优化「仪表盘」交互，当选中连接时，当前连接会被固定
- 优化大量连接时从 Source Address 解析进程信息的性能
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化 ECH 实现
• 修复
- 修复大量连接时（如 BT）「仪表盘」可能出现的性能问题
- 修复「仪表盘」日志无法滚动的问题
- 修复「仪表盘」信息无法复制的问题
- 修复 Chrome 浏览器可能嗅探失败的问题

> [!NOTE]
> 发布于 2025 年 4 月 2 日

## 3.0.0

• 新增
- 支持 ShadowSocks2022 协议
- 支持 ShadowTLS
- 支持 AND、OR、NOT 逻辑规则
- 新增 DOMAIN-WILDCARD 规则
- 新增 DOMAIN-REGEX 规则
- 新增 NETWORK 规则，可选值 tcp, udp
- 新增 PROTOCOL 规则，可选值 TCP, HTTP, HTTPS, UDP, QUIC
- 新增 URL-REGEX 规则
- 新增 USER-AGENT 规则
- 支持策略组图标
- 新增 body-rewrite 重写，支持：
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- 支持嗅探 TLS Client Hello，获取 SNI 域名
- 在发起 UDP 连接时，现在会尝试使用目标代理发起 DNS 查询以确定目的地址的 IP
- 支持嗅探 QUIC / HTTP3
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
• 优化
- 优化 QUIC 嗅探
- 优化「仪表盘」界面
- 优化「仪表盘」交互，当选中连接时，当前连接会被固定
- 优化大量连接时从 Source Address 解析进程信息的性能
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化 ECH 实现
• 修复
- 修复大量连接时（如 BT）「仪表盘」可能出现的性能问题
- 修复「仪表盘」日志无法滚动的问题
- 修复「仪表盘」信息无法复制的问题
- 修复 Chrome 浏览器可能嗅探失败的问题

> [!NOTE]
> 发布于 2025 年 4 月 2 日

## 3.0.0

• 新增
- 支持 ShadowSocks2022 协议
- 支持 ShadowTLS
- 支持 AND、OR、NOT 逻辑规则
- 新增 DOMAIN-WILDCARD 规则
- 新增 DOMAIN-REGEX 规则
- 新增 NETWORK 规则，可选值 tcp, udp
- 新增 PROTOCOL 规则，可选值 TCP, HTTP, HTTPS, UDP, QUIC
- 新增 URL-REGEX 规则
- 新增 USER-AGENT 规则
- 支持策略组图标
- 新增 body-rewrite 重写，支持：
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- 支持嗅探 TLS Client Hello，获取 SNI 域名
- 在发起 UDP 连接时，现在会尝试使用目标代理发起 DNS 查询以确定目的地址的 IP
- 支持嗅探 QUIC / HTTP3
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
• 优化
- 优化 QUIC 嗅探
- 优化「仪表盘」界面
- 优化「仪表盘」交互，当选中连接时，当前连接会被固定
- 优化大量连接时从 Source Address 解析进程信息的性能
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化 ECH 实现
• 修复
- 修复大量连接时（如 BT）「仪表盘」可能出现的性能问题
- 修复「仪表盘」日志无法滚动的问题
- 修复「仪表盘」信息无法复制的问题
- 修复 Chrome 浏览器可能嗅探失败的问题

> [!NOTE]
> 发布于 2025 年 4 月 2 日

## 3.0.0

• 新增
- 支持 ShadowSocks2022 协议
- 支持 ShadowTLS
- 支持 AND、OR、NOT 逻辑规则
- 新增 DOMAIN-WILDCARD 规则
- 新增 DOMAIN-REGEX 规则
- 新增 NETWORK 规则，可选值 tcp, udp
- 新增 PROTOCOL 规则，可选值 TCP, HTTP, HTTPS, UDP, QUIC
- 新增 URL-REGEX 规则
- 新增 USER-AGENT 规则
- 支持策略组图标
- 新增 body-rewrite 重写，支持：
- request-jq, request-replace-regex, request-json-replace, request-json-add, request-json-del
- response-jq, response-replace-regex, response-json-replace, response-json-add, response-json-del
- 支持嗅探 TLS Client Hello，获取 SNI 域名
- 在发起 UDP 连接时，现在会尝试使用目标代理发起 DNS 查询以确定目的地址的 IP
- 支持嗅探 QUIC / HTTP3
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
• 优化
- 优化 QUIC 嗅探
- 优化「仪表盘」界面
- 优化「仪表盘」交互，当选中连接时，当前连接会被固定
- 优化大量连接时从 Source Address 解析进程信息的性能
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化 ECH 实现
• 修复
- 修复大量连接时（如 BT）「仪表盘」可能出现的性能问题
- 修复「仪表盘」日志无法滚动的问题
- 修复「仪表盘」信息无法复制的问题
- 修复 Chrome 浏览器可能嗅探失败的问题

> [!NOTE]
> 发布于 2025 年 4 月 2 日

## 2.7.1

新年快乐！
- 修复部分服务提供商配置可能会闪退的问题

> [!NOTE]
> 发布于 2025 年 1 月 1 日

## 2.7.0

新增：
- 新增 REJECT-DROP 策略
- 新增在 Stash 运行时更新 GEOIP 数据库
- 新增 ip.im IP 信息提供商
优化：
- 更新远程资源时，现在 Stash 将使用 ETag 协商缓存。在资源未变化时，Stash 不会重新下载资源，以节省用户及规则集合提供方的带宽。
- 当设置 server-cert-fingerprint 时，无需配置 skip-cert-verify 为 true
- 优化系统 DNS
修复：
- 修复部分情况下配置文件名称异常的问题

> [!NOTE]
> 发布于 2024 年 10 月 22 日

## 2.6.6

- 优化嗅探
当连接到域名时，Stash 会对所有解析结果同时发起 TCP 握手并使用最快成功的连接。当嗅探到域名时，Stash 会触发一次 DNS 解析以进行上述功能。当域名在公共解析服无解析时，可能会导致连接错误，本次版本提高了与无解析域名的兼容性。
- 优化 QUIC
- 优化 HTTP 引擎对带端口的 Host 的兼容性
- Happy Eyeballs Dual Stack 从实验性功能移动到正式版，开启后会优化 IPv4 与 IPv6 双栈的兼容性
- 支持 Proxy-Providers 中设置 benchmark-url 与 benchmark-timeout

> [!NOTE]
> 发布于 2024 年 9 月 12 日

## 2.6.6

- 优化嗅探
当连接到域名时，Stash 会对所有解析结果同时发起 TCP 握手并使用最快成功的连接。当嗅探到域名时，Stash 会触发一次 DNS 解析以进行上述功能。当域名在公共解析服无解析时，可能会导致连接错误，本次版本提高了与无解析域名的兼容性。
- 优化 QUIC
- 优化 HTTP 引擎对带端口的 Host 的兼容性
- Happy Eyeballs Dual Stack 从实验性功能移动到正式版，开启后会优化 IPv4 与 IPv6 双栈的兼容性
- 支持 Proxy-Providers 中设置 benchmark-url 与 benchmark-timeout

> [!NOTE]
> 发布于 2024 年 9 月 11 日

## 2.6.4

• 新增
- 支持 Hysteria 2 端口跳跃特性
- 新增 SSH 协议支持
- 新增 Juicity 协议支持
- Shortcuts 支持 match_geosite 语法
• 优化
- 优化 QUIC 协议 0-RTT
- 优化脚本 Header 兼容性
- 优化 App 体积
- 优化 CA 证书逻辑，现在签发的证书有效期为 10 年
• 修复
- 修正部分情况下 UI 错位的问题
- 修复部分情况下缓存文件占用空间过大的问题

> [!NOTE]
> 发布于 2024 年 8 月 4 日

## 2.6.3

- 优化 WireGuard 连接稳定性
- 优化 Hysteria2 在部份网络下 0-RTT 的兼容性
- 优化运行时 MitM 证书生成过程，减少重复计算、提高性能和节省电源消耗
- 优化使用 underlying-proxy 的 WireGuard，在连接出错时能自动恢复
- 修复部分系统脚本无法运行的问题

> [!NOTE]
> 发布于 2024 年 6 月 23 日

## 2.6.3

- 优化 WireGuard 连接稳定性
- 优化 Hysteria2 在部份网络下 0-RTT 的兼容性
- 优化运行时 MitM 证书生成过程，减少重复计算、提高性能和节省电源消耗
- 优化使用 underlying-proxy 的 WireGuard，在连接出错时能自动恢复
- 修复部分系统脚本无法运行的问题

> [!NOTE]
> 发布于 2024 年 6 月 18 日

## 2.6.2

• 修复
- 修复部分情况 $persistentStore 可能无法正确保存的问题

> [!NOTE]
> 发布于 2024 年 5 月 29 日

## 2.6.1

• 新增
- Stash 现已优化嗅探，支持在「仅使用 Tunnel 代理」下使用更多的覆写
- 现已支持嗅探 TCP 连接中可能的 HTTP 请求，包括 Method Host URL
- 支持 DNS over HTTP/3
- 支持代理服务器的 Server Certificate Fingerprint Pinning，开启后会在 TLS 握手时验证服务器证书 SHA256 指纹
- 工具新增 Script Hub
• 优化
- 优化基于 QUIC 协议的性能
- 优化内存占用
• 修复
- 修复最近引入的一个脚本内存占用延迟释放问题
- 修复脚本 httpclient 异常处理不正确的问题
- 修复脚本 $persistentStore.write 传入值为 null 或 undefined 时不能保存的问题
- 修复脚本超时异常的问题
- 修复部份脚本执行失败问题

> [!NOTE]
> 发布于 2024 年 5 月 22 日

## 2.6.0

• 新增
- 支持代理根据延迟排序
- 更换 JavaScript 引擎，新引擎支持 WebAPI
- 支持 DNS 查询跟随规则
- 新增支持 classical text 规则集合
- 支持一键安装覆写
- 新增覆写分类
- 支持拖拽覆写排序
- 脚本 $environment 支持 device-model
- 脚本 $httpClient 支持参数 timeout、insecure、auto-cookie、auto-redirect
• 优化
- 优化 UDP 兼容性
- 优化 Script 内存
- 优化覆写预览
- 优化脚本 $httpclient 兼容性，修复与部分服务器的通信可能会异常的问题
• 修复
- 修复 SSID 规则在 macOS 14 失效的问题
- 修复 DNS over QUIC 响应超时的问题
- 修正脚本 $argument 参数行为，当未设置 argument 时，$argument 为 undefined
- 修正部分巨型规则匹配可能不准确的问题
- 修复 doq 可能会导致断开的问题
- 修复网络连接不能正确识别来自 Stash 内部的连接的问题

> [!NOTE]
> 发布于 2024 年 4 月 3 日

## 2.5.6

- 修正并发脚本部分情况下异常的问题
- 优化脚本内存占用
- 脚本 setTimeout() 支持传入参数：
setTimeout(function, delay, param1, param2, /* …, */ paramN)

> [!NOTE]
> 发布于 2023 年 12 月 15 日

## 2.5.4

- 修复一些潜在的崩溃
- 修复部分情况下脚本无法运行的问题

> [!NOTE]
> 发布于 2023 年 12 月 4 日

## 2.5.3

- 修复部分情况下 UDP 可能会崩溃的问题
- 修复定时任务脚本可能会不生效的问题

> [!NOTE]
> 发布于 2023 年 11 月 18 日

## 2.5.2

- 修复 GEOSITE 相关问题
- Stash 现在能够自动屏蔽 MitM 列表中的 QUIC 流量，并让它回退至 HTTP1/2
- 修正了首页信息更新滞后的问题
- 修复 IPv6 环境下路由表可能闪退的问题
- 实验性地引入了 Happy Eyeballs Dual Stack 功能
开启此功能后，IPv6 和 IPv4 将被同等对待。在并发模式下，例如，Stash 会同时对域名的所有 A 记录和 AAAA 记录进行 TCP 握手尝试，并选择最快握手成功的进行连接。

> [!NOTE]
> 发布于 2023 年 11 月 9 日

## 2.4.2

- 优化 JavaScript Core
- 优化 macOS Sonoma 菜单

> [!NOTE]
> 发布于 2023 年 9 月 27 日

## 2.4.0

- 规则支持可视化编辑
- 支持 macOS Sonoma
- 支持 IPv6 Tun
- 优化 iCloud Drive
- 优化从仪表盘连接远程设备

> [!NOTE]
> 发布于 2023 年 9 月 17 日

## 2.4.0

- 规则支持可视化编辑
- 优化 iCloud Drive
- 支持 IPv6 Tun
- 支持 macOS Sonoma

> [!NOTE]
> 发布于 2023 年 9 月 15 日

## 2.2.4

- 修复 macOS Sonoma 菜单崩溃

> [!NOTE]
> 发布于 2023 年 6 月 30 日

## 2.2.4

- 修复在简体中文下覆写预览可能会闪退的问题

> [!NOTE]
> 发布于 2023 年 6 月 27 日

## 2.2.4

- 优化测速和健康检查
- 再次点击启动台的 Stash 图标时会显示控制面板
- 配置文件变更支持实时重新加载
- 优化 iCloud 文件储存
- 全面优化软件性能
- 修复部分情况下无法保存跳过代理的问题
- 修复部分情况下自动测速失效的问题
- 修复部分情况下无法自动更新远程资源的问题
- 错误修复和改进

> [!NOTE]
> 发布于 2023 年 5 月 25 日

## 2.2.3

· 修复
- 再次点击启动台的 Stash 图标时会显示控制面板
- 优化测速和健康检查
- 修复部分情况下无法保存跳过代理的问题

> [!NOTE]
> 发布于 2023 年 5 月 18 日

## 2.2.3

· 修复
- 再次点击启动台的 Stash 图标时会显示控制面板
- 优化测速和健康检查

> [!NOTE]
> 发布于 2023 年 5 月 17 日

## 2.2.1

· 功能
- 新增 GEOSITE 规则类型。
- 脚本 $httpClient 现支持二进制模式。
- $httpClient 现支持通过 HTTP Header 指定出站代理策略。
- 新增 Stash 远程控制器，可通过 Stash iOS / Stash Mac Dashboard 控制其他设备上的 Stash。已保存的远程设备将通过 iCloud 同步。
- 支持 TLS Session Resumption，提升 TLS 握手效率。此功能需服务器端支持，可在连接页面确认是否成功启用。
- 新增 no-track 参数，匹配到此规则的连接将在连接列表中隐藏。
· 改进
- 优化大量 nameserver-policy 场景下的内存占用。
- 提升 HTTP / TLS 嗅探能力。
- 提高 relay 策略组稳定性。
- 优化网络切换下 DNS 缓存刷新策略。
- 提升安装 Override 用户体验。
· 修复
- 解决 override 合并时 emoji 表情被转义的问题。
- 修复一系列下载配置的兼容性问题。

> [!NOTE]
> 发布于 2023 年 4 月 26 日

## 2.2.0

· 功能
- 新增 GEOSITE 规则类型。
- 脚本 $httpClient 现支持二进制模式。
- $httpClient 现支持通过 HTTP Header 指定出站代理策略。
- 新增 Stash 远程控制器，可通过 Stash iOS / Stash Mac Dashboard 控制其他设备上的 Stash。已保存的远程设备将通过 iCloud 同步。
- 支持 TLS Session Resumption，提升 TLS 握手效率。此功能需服务器端支持，可在连接页面确认是否成功启用。
- 新增 no-track 参数，匹配到此规则的连接将在连接列表中隐藏。
· 改进
- 优化大量 nameserver-policy 场景下的内存占用。
- 提升 HTTP / TLS 嗅探能力。
- 提高 relay 策略组稳定性。
- 优化网络切换下 DNS 缓存刷新策略。
- 提升安装 Override 用户体验。
· 修复
- 解决 override 合并时 emoji 表情被转义的问题。
- 修复一系列下载配置的兼容性问题。

> [!NOTE]
> 发布于 2023 年 4 月 26 日

## 2.1.2

- 优化弹出活跃连接窗口时主窗口自动关闭的问题
- 优化活跃连接窗口性能

> [!NOTE]
> 发布于 2023 年 3 月 18 日

## 2.1.2

- 新增设置向导
- 优化仪表盘
- Tun 新增 Apple 和 Google Stack (设置 - 网络设置)
- 菜单显示活跃的客户端
- 优化 Javascript 引擎
- 菜单显示活跃的客户端
- 新增一个对 TUIC 协议断流的 workaround
- 优化与其他 VPN 同时使用的兼容性问题
- 修复证书在部分浏览器下不被信任的问题
- 错误修复和优化

> [!NOTE]
> 发布于 2023 年 3 月 16 日

## 2.1.2

- 新增设置向导
- 优化仪表盘
- Tun 新增 Apple 和 Google Stack (设置 - 网络设置)
- 菜单显示活跃的客户端
- 优化 Javascript 引擎
- 菜单显示活跃的客户端
- 新增一个对 TUIC 协议断流的 workaround
- 优化与其他 VPN 同时使用的兼容性问题
- 错误修复和优化

> [!NOTE]
> 发布于 2023 年 3 月 6 日

## 2.1.0

- 修正部分请求在 Stash HTTP 引擎中的行为
- 仪表盘显示计时
- 仪表盘显示网关模式下的设备名称
- 仪表盘显示网关模式下的设备 IP
- 仪表盘支持搜索名称
- 优化脚本 header 兼容性
- 新增 script 环境变量 $environment.system

> [!NOTE]
> 发布于 2023 年 1 月 5 日

## 2.0.13

- 优化测速
- 修复部分按钮状态不同步的问题

> [!NOTE]
> 发布于 2022 年 12 月 28 日

## 2.0.12

- 一些细节修复和更新
- 控制中心新增策略组 Benchmark
- 控制中心新增实时网速
- 修复仪表板 DNS 无法筛选的问题

> [!NOTE]
> 发布于 2022 年 12 月 26 日

## 2.0.11

- 完善二进制脚本支持
- 脚本支持并发执行
- 调整 QUIC 协议部分实现
- 支持 WireGuard 作为 Layer 4 的代理使用
- 支持指定网卡出口 https://stash.wiki/proxy-protocols/proxy-types#direct-with-specified-interface
- 允许用户通过设置 interval=-1 禁用策略组的连通性检查
- 支持指定端口
- 优化菜单栏图标显示
- 优化菜单测速结果
- 优化 Hysteria 的内存占用，如再遇问题请回报
- 修复部分情况下重载配置不生效的问题
- 修复部分进程乱码的问题
- 修复部分脚本无法运行的问题
- 修复部分情况下增强模式不可用的问题
- 修复某些情况下，DNS 无法恢复的问题
脚本文档：
https://stash.wiki/http-engine/script#配置格式
WireGuard 文档：
https://stash.wiki/proxy-protocols/proxy-types#wireguard
注：WireGuard 并非以高吞吐为设计目标的代理协议，Stash 需要在用户空间完成 Layer 3 与 Layer 4 的转换，其性能损耗会比常见代理协议大。在移动设备上，WireGuard 吞吐量一般会比 Layer4 代理协议低。

> [!NOTE]
> 发布于 2022 年 12 月 21 日

## 2.0.11

- 完善二进制脚本支持
- 脚本支持并发执行
- 调整 QUIC 协议部分实现
- 支持 WireGuard 作为 Layer 4 的代理使用
- 支持指定网卡出口 https://stash.wiki/proxy-protocols/proxy-types#direct-with-specified-interface
- 允许用户通过设置 interval=-1 禁用策略组的连通性检查
- 支持指定端口
- 优化菜单栏图标显示
- 优化菜单测速结果
- 优化 Hysteria 的内存占用，如再遇问题请回报
- 修复部分情况下重载配置不生效的问题
- 修复部分进程乱码的问题
- 修复部分脚本无法运行的问题
- 修复部分情况下增强模式不可用的问题
- 修复某些情况下，DNS 无法恢复的问题
脚本文档：
https://stash.wiki/http-engine/script#配置格式
WireGuard 文档：
https://stash.wiki/proxy-protocols/proxy-types#wireguard
注：WireGuard 并非以高吞吐为设计目标的代理协议，Stash 需要在用户空间完成 Layer 3 与 Layer 4 的转换，其性能损耗会比常见代理协议大。在移动设备上，WireGuard 吞吐量一般会比 Layer4 代理协议低。

> [!NOTE]
> 发布于 2022 年 12 月 21 日

## 2.0.9

• 支持二进制脚本
• 脚本支持并发模式
• 通知支持堆叠
• 优化菜单测速结果

> [!NOTE]
> 发布于 2022 年 11 月 30 日

## 2.0.8

• 完善仪表盘数据
• 完善翻译

> [!NOTE]
> 发布于 2022 年 11 月 24 日

## 2.0.7

• 修复了一处潜在的闪退问题

> [!NOTE]
> 发布于 2022 年 11 月 19 日

## 2.0.6

• 修复了部分内存泄漏
• 修复了部分情况下菜单卡顿的问题
• 修复了部分情况下提示资源不可用的问题
• 修复了 SS V2RAY 插件格式问题

> [!NOTE]
> 发布于 2022 年 11 月 19 日

## 2.0.5

• 修复了部分内存泄漏

> [!NOTE]
> 发布于 2022 年 11 月 17 日

## 2.0.5

• 优化性能
• 修复覆写页面闪退
• 修复远程资源页面闪退
• 修复远程资源无法更新的问题

> [!NOTE]
> 发布于 2022 年 11 月 15 日

## 2.0.4

• 优化测速
• 支持直接在 Stash 安装证书
• 修复 2.0.2 出站模式 UI 问题
• 修复更新闪退的问题
• 一些其他优化和错误修复

> [!NOTE]
> 发布于 2022 年 11 月 14 日

## 2.0.3

• 优化测速
• 支持直接在 Stash 安装证书
• 修复 2.0.2 出站模式 UI 问题
• 一些其他优化和错误修复

> [!NOTE]
> 发布于 2022 年 11 月 14 日

## 2.0.2

• 支持直接在 Stash 安装证书
• 优化测速
• 一些其他优化和错误修复

> [!NOTE]
> 发布于 2022 年 11 月 14 日

## 2.0.1

• 新增跳过代理设置
• 支持修改TLS Client Hello指纹，请参考 https://stash.wiki/features/tls-fingerprint
• 修复 macOS 13 翻译不可用的问题
• 修复在 macOS Hysteria 和增强模式冲突的问题
• 修复部分情况下无法获取进程名
• 修复部分情况下目标 IP 缺失的问题
• 重新实现了 QUIC 底层代码，如遇到问题请回报

> [!NOTE]
> 发布于 2022 年 11 月 10 日

## 2.0.0

> [!NOTE]
> 发布于 2022 年 11 月 6 日

## 1.2.4

• 新增 “从 URL 下载” 安装覆写
• 修复夜间模式切换 UI 错乱的问题
• 修复部分情况下修改配置文件不生效的问题
• 暂时无法通过 UI 编辑规则

> [!NOTE]
> 发布于 2022 年 9 月 16 日

## 1.2.3

• 新增开机启动选项
• Proxy Provider 无法显示的问题
• 修复 Script 无法保存 Storage 的问题
• 修复部分情况下启动卡死的问题
• 暂时无法通过 “从 URL 下载” 安装覆写
• 暂时无法通过 UI 编辑规则

> [!NOTE]
> 发布于 2022 年 9 月 15 日

## 1.2.2

• 修复部分情况下启动后闪退
• 修复全局模式下无法切换代理的问题

> [!NOTE]
> 发布于 2022 年 9 月 14 日

## 1.2.1

> [!NOTE]
> 发布于 2022 年 9 月 13 日

## 1.2.0

> [!NOTE]
> 发布于 2022 年 9 月 12 日

## 1.0

> [!NOTE]
> 发布于 2022 年 9 月 9 日
