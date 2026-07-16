
## 3.4.0

### 新功能
- 新增图标搜索
- 新增长按 Tailscale 节点选择 Exit Node
- 全新重构的 StashTun ，在 iPhone 17 Pro 测试性能高达 9Gbps ，性能约为之前的 6 倍。
- 新增 Tailscale Web 页面登录认证
- 新增本地覆写可视化编辑
- 优化 Tun 在网络不可用时表现
- 可视化编辑支持编辑 Hysteria2 混淆模式
- 新增本地覆写编辑
- 新增 Tailscale 支持，文档：https://stash.wiki/proxy-protocols/proxy-types#tailscale
- 新增 VLESS-TCP-REALITY 支持
- 新增 Hysteria2 salamander 混淆模式
- 引用 Provider 可以设置请求的 headers
- DNS Nameserver Policy 支持 GEOSITE 匹配，支持设置多个 Nameserver 并发访问
- 支持 TrustTunnel 协议
- Hysteria2 混淆方式新增 gecko 支持

### 优化
- 覆写页面右上角新增操作按钮
- 优化覆写操作流程
- 可视化编辑支持 Tailscale 类型
- 优化快捷组件开关的状态显示
- 优化 TLS 协议可视化编辑器的展示
- 优化整理设置页面分类
- 优化网络变化感知
- 优化 TUIC 可视化编辑
- 可视化编辑中的混淆模式改为选项
- 移除了 gVisor 隧道栈
- 优化 VLESS 可视化编辑交互
- 优化 QUIC 协议的拥塞控制
- 新增 TrustTunnel 和 Hysteria2 Gecko 的可视化编辑
- Tailscale 可视化编辑不再要求 auth-key
- 优化 iCloud 读写事件
- 优化 TrustTunnel 描述
- 全面优化本地化翻译
- 可视化编辑支持 AnyTLS
- 优化 Darwin Tun 兼容性
- 优化 TUIC 兼容性
- 优化 StashLink 资源占用
- 默认使用 Stash DeviceID 作为 Tailscale hostname
- 优化 Private Network CORS 支持
- 优化闲置 HTTP 代理请求
- 优化 Block QUIC 处理
- 优化网络切换时测速策略与内存占用

### 修复
- 修复 iPadOS 部分情况下开始按钮可能被隐藏的问题
- 优化切换覆写可能不生效的情况
- 修复 iOS 27 按钮样式异常
- 修复部分情况下 iCloud 可能导致卡住的问题
- 修复部分情况下代理页面可能无法正确显示的问题
- 优化订阅抓取
- 修复当 iCloud 不可用时，配置文件可能会变成 Default 的问题
- 修复 Hysteria v1 协议传输 UDP 分片问题
- 修复 VLESS UDP 握手时机的问题
- 修复 uTLS 无法启用 skip-cert-verify 的问题
- 修复 IPv6 CNAME 配置可能意外返回 IPv4 记录的问题
- 修复部分情况下 StashLink 测速可能会卡住的问题
- 优化远程资源加载，修复部分情况下资源下载失败可能变成 0 的问题
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
> 发布于 2026 年 6 月 23 日

## 3.3.3

### 新功能
- 新增 VLESS-TCP-REALITY 支持

### 优化
- 优化 Shadowsocks 2022 兼容性

### 修复
- 修复 iPad OS 使用放大字体可能导致开始按钮消失的问题
- 修复 StashLink 测速可能会卡住的问题

> [!NOTE]
> 发布于 2026 年 3 月 31 日

## 3.3.2

### 修复
- 修复使用放大字体的 iPad OS 可能无法显示启动按钮的问题
- 修复可视化编辑器 AnyTLS 可能无法保存的问题
- 优化 TUIC 兼容性

> [!NOTE]
> 发布于 2026 年 3 月 12 日

## 3.3.1

### 修复
- 修复部分情况下 iPad 左侧界面过小的问题
- 修复 iPadOS 26 小窗口模式下设置或工具无法点击的问题

> [!NOTE]
> 发布于 2026 年 2 月 26 日

## 3.3.0

### 新功能
- 新增 dialer-proxy，用于在代理配置中指定上游代理，支持 TCP 与 UDP 中继
- 新增 AnyTLS 支持
- 新增「脚本持久化数据」管理页面
- 新增「GeoSite 浏览器」，添加 GEOSITE 类型规则时可直接通过浏览器选择，无需手动输入
- Providers 支持指定路径，支持通过 payload 初始化文件，并可通过 iCloud 同步
- iPerf 网络带宽测试支持图表展示
- 支持在 iOS 下绑定网卡（Wi-Fi / 蜂窝数据）进行网络请求
- 活跃连接页面支持直接对当前连接添加规则
- Rewrite URL / Header / Body / Mock 拥有独立编辑器

### 优化与改进
- 覆写界面整体优化
- 重构「第三方服务」页面
- 重构 HTTP 引擎，优化在处理多个 Rewrite 场景下的性能
- 优化空白状态页面展示
- 远程设备支持左滑删除
- 远程控制器在远程设备断开后可给出正确提示

### 问题修复
- 修复 iOS 26 下过滤器不显示的问题
- 修复少量多语言描述问题

> [!NOTE]
> 发布于 2026 年 2 月 19 日

## 3.2.4

### 修复
- 修复使用 MacCatalyst 运行 iPadOS Stash 出现异常的问题
- 修复 iPadOS 在使用放大字体时，导航栏显示不正确的问题
- 修复 iPad OS 26 样式异常的问题

> [!NOTE]
> 发布于 2025 年 11 月 19 日

## 3.2.3

### 修复
- 修复使用 MacCatalyst 运行 iPadOS Stash 出现异常的问题
- 修复 iPadOS 在使用放大字体时，导航栏显示不正确的问题

> [!NOTE]
> 发布于 2025 年 11 月 18 日

## 3.2.2

### 优化
- 优化 iOS 26 首页配置文件按钮样式

> [!NOTE]
> 发布于 2025 年 10 月 1 日

## 3.2.1

### 新增
- 新增支持设置 CNAME 为 hosts
- 新增 proxy-hosts，你可以通过配置 proxy-hosts 指定远程服务器所请求的 IP
- HTTP 重写新增 Mock 支持
配置详情请参考：https://stash.wiki/http-engine/rewrite#mock

- 新增 Collapsed Tile
为了使「第三方服务」检测拥有更多的自定义空间，我们新增了 Collapsed Tile，脚本 API 接口与 Tile 相同。Collapsed Tile 将会展示在「第三方服务」和「长按代理 - 代理信息」，我们也为用户提供了示例 Tile，当更新到 Stash 3.2 时将会提示下载示例 Collapsed Tile 。详情请参考 https://stash.wiki/script/tile

- 现在 Stash 在首次安装时，会随机生成一个 API 密钥，所有 API 操作需要设置通过 HTTP 头 Authorization: Bearer `${secret}` 进行身份验证。API密钥可以在「更多设置」中更改。
API密钥会通过用户 iCloud 自动同步，在「工具」-「远程控制器」访问同一 iCloud 下其他 Stash 设备时，会自动填入 API 密钥。

- 新增「网络质量测试」页面，通过 DNS 响应延迟评估当前网络状态。远程控制器也可查看其他设备的网络质量（需远程设备版本 ≥ 3.2.0）
-「检视 HTTP 请求」页面支持显示改写前后的请求详情，便于调试改写是否生效（远程调试需远程设备版本 ≥ 3.2.0）
- 可在代理列表切换排序方式：「按配置文件顺序」或「按可用性测试结果」
- 新增远程控制器长按显示代理信息功能（需远程设备版本 ≥ 3.2.0）
- 全新设计的覆写展示页面
- Transparent Rewrite 支持正则参数
- 新增活跃连接页面筛选
- 新增检视 HTTP 请求页面筛选
- 新增策略组图标本地覆盖
- 新增 YAML 配置文件后台活动刷新
- 「更多设置」新增「重置设置」功能，用于将 Stash 恢复到默认配置

### 优化
- 优化活跃连接界面
- 优化检视 HTTP 请求界面
- 优化检视 DNS 请求界面
- 优化覆写安装流程
- 优化 iPerf
- 优化 QUIC
- 部分页面 UI 优化，新增切换动画（需 iOS 17 及以上）

### 修复
- 修复 WireGuard 与 IPv6 的兼容性问题
- 修复 XUDP IPv6 连接
- 修复 Relay 策略组部分情况下无自动测速的问题
- 修复增强模式下 ping 域名可能返回错误 IP 的问题
- 修复 URL Transparent 改写无法正确识别参数的问题
- 修复 DNS 挟持对非标准 DNS 查询兼容性的问题

> [!NOTE]
> 发布于 2025 年 9 月 28 日

## 3.2.0

### 新增
- 新增支持设置 CNAME 为 hosts
- 新增 proxy-hosts，你可以通过配置 proxy-hosts 指定远程服务器所请求的 IP
- HTTP 重写新增 Mock 支持
配置详情请参考：https://stash.wiki/http-engine/rewrite#mock

- 新增 Collapsed Tile
为了使「第三方服务」检测拥有更多的自定义空间，我们新增了 Collapsed Tile，脚本 API 接口与 Tile 相同。Collapsed Tile 将会展示在「第三方服务」和「长按代理 - 代理信息」，我们也为用户提供了示例 Tile，当更新到 Stash 3.2 时将会提示下载示例 Collapsed Tile 。详情请参考 https://stash.wiki/script/tile

- 现在 Stash 在首次安装时，会随机生成一个 API 密钥，所有 API 操作需要设置通过 HTTP 头 Authorization: Bearer `${secret}` 进行身份验证。API密钥可以在「更多设置」中更改。
API密钥会通过用户 iCloud 自动同步，在「工具」-「远程控制器」访问同一 iCloud 下其他 Stash 设备时，会自动填入 API 密钥。

- 新增「网络质量测试」页面，通过 DNS 响应延迟评估当前网络状态。远程控制器也可查看其他设备的网络质量（需远程设备版本 ≥ 3.2.0）
-「检视 HTTP 请求」页面支持显示改写前后的请求详情，便于调试改写是否生效（远程调试需远程设备版本 ≥ 3.2.0）
- 可在代理列表切换排序方式：「按配置文件顺序」或「按可用性测试结果」
- 新增远程控制器长按显示代理信息功能（需远程设备版本 ≥ 3.2.0）
- 全新设计的覆写展示页面
- Transparent Rewrite 支持正则参数
- 新增活跃连接页面筛选
- 新增检视 HTTP 请求页面筛选
- 新增策略组图标本地覆盖
- 新增 YAML 配置文件后台活动刷新
- 「更多设置」新增「重置设置」功能，用于将 Stash 恢复到默认配置

### 优化
- 优化活跃连接界面
- 优化检视 HTTP 请求界面
- 优化检视 DNS 请求界面
- 优化覆写安装流程
- 优化 iPerf
- 优化 QUIC
- 部分页面 UI 优化，新增切换动画（需 iOS 17 及以上）

### 修复
- 修复 WireGuard 与 IPv6 的兼容性问题
- 修复 XUDP IPv6 连接
- 修复 Relay 策略组部分情况下无自动测速的问题
- 修复增强模式下 ping 域名可能返回错误 IP 的问题
- 修复 URL Transparent 改写无法正确识别参数的问题
- 修复 DNS 挟持对非标准 DNS 查询兼容性的问题

> [!NOTE]
> 发布于 2025 年 6 月 18 日

## 3.1.1

### 新增
- 支持 VLESS XTLS-Vision
- 支持 VLESS XTLS-REALITY
- 远程规则集支持 MRS 格式规则
- Shadowsocks / Shadowsocks2022 支持配置 udp-port
- Shadowsocks / Shadowsocks2022 支持配置 udp-over-tcp v1 / v2
- 支持 VLESS XUDP
- 对于单个代理的延迟测试新增 benchmark-disabled 选项，设置为 true 时完全禁用延迟测试
- 可视化编辑器「代理」支持右滑复制代理
- 支持从其他程序或文件直接导入 stoverride 覆写文件到 Stash

### 优化
- 优化「检视 HTTP 请求」页面
  - 优化长文本的显示
  - 在列表页显示匹配的规则和代理
  - 可以跳转到 HTTP 请求所属连接的详情页面
  - 搜索框会记录上一次的搜索内容
- 优化「活跃连接」页面
  - 支持显示更多协议类型
  - 点击主机名可以跳转到对应 DNS 查询记录页面
- 优化「检视 DNS」页面
- 优化「远程资源」页面
- 优化首页 IP 信息不准确的问题
- 优化脚本 console.log ，现支持打印对象、null 和 undefined
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性

### 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复 VLESS 在网络诊断中显示 bad udp address 异常的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分脚本使用 $httpClient 发送请求可能失败的问题
- 修复部分请求在使用脚本改写异常的问题
- 修复部分远程规则集规则数量统计不准确的问题
- 修复部分 UI 错位
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
- 可视化编辑器「代理」支持右滑复制代理
- 支持从其他程序或文件直接导入 stoverride 覆写文件到 Stash

### 优化
- 优化「检视 HTTP 请求」页面
  - 优化长文本的显示
  - 在列表页显示匹配的规则和代理
  - 可以跳转到 HTTP 请求所属连接的详情页面
  - 搜索框会记录上一次的搜索内容
- 优化「活跃连接」页面
  - 支持显示更多协议类型
  - 点击主机名可以跳转到对应 DNS 查询记录页面
- 优化「检视 DNS」页面
- 优化「远程资源」页面
- 优化首页 IP 信息不准确的问题
- 优化脚本 console.log ，现支持打印对象、null 和 undefined
- 优化大型请求使用脚本改写时的内存占用
- 重构远程规则集，优化性能，节省内存
- 优化 GEOSITE 性能
- 优化 Proxy Group 包含 REJECT-DROP 和 REJECT 类型代理的延迟测试逻辑
- 提升 Stash 内核稳定性

### 修复
- 修复 UDP 可能意外发送 Fake IP 的问题
- 修复部分情况下产生不必要的 DNS 解析的问题
- 修复 VLESS 在网络诊断中显示 bad udp address 异常的问题
- 修复部分包含正则的远程规则集格式化不正确的问题
- 修复部分情况下 VMess UDP 异常的问题
- 修复部分脚本使用 $httpClient 发送请求可能失败的问题
- 修复部分请求在使用脚本改写异常的问题
- 修复部分远程规则集规则数量统计不准确的问题
- 修复部分 UI 错位
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
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
- 可视化编辑：
  - 新增 reject-drop
  - 支持修改 url-rewrite、header-rewrite、body-rewrite
  - 支持修改脚本
- 支持长按复制图标 URL

### 优化
- 大幅优化耗电，尤其时在低负载场景下的功耗
- 优化 QUIC 嗅探
- 优化大量远程资源更新
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化可视化编辑长文本显示
- 优化 ECH 实现

### 修复
- 修复图标第二次导入可能会异常的问题
- 修复可视化编辑排序的问题

> [!NOTE]
> 发布于 2025 年 4 月 2 日

## 3.0.0

### 新增
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
- 连接页现在能展示更详细的 TCP / UDP 协议信息
- DoH 和 DoH3 支持配置 UserAgent
- IP 信息提供商新增 BGP.Tools
- 重写支持读取 zstd 压缩算法
- 可视化编辑：
  - 新增 reject-drop
  - 支持修改 url-rewrite、header-rewrite、body-rewrite
  - 支持修改脚本
- 支持长按复制图标 URL

### 优化
- 大幅优化耗电，尤其时在低负载场景下的功耗
- 优化 QUIC 嗅探
- 优化大量远程资源更新
- 优化 UDP 高并发下的内存使用
- 优化内存池分配策略
- 优化可视化编辑长文本显示
- 优化 ECH 实现

### 修复
- 修复图标第二次导入可能会异常的问题
- 修复可视化编辑排序的问题

> [!NOTE]
> 发布于 2025 年 3 月 30 日

## 2.7.1

新年快乐！

- 修复部分服务提供商配置可能会闪退的问题

> [!NOTE]
> 发布于 2025 年 1 月 1 日

## 2.7.0

新增：
- iOS 18 Control Widget
- 新增 REJECT-DROP 策略
- 新增在 Stash 运行时更新 GEOIP 数据库
- 新增通过可视化编辑器编辑基本重写
- 新增 ip.im IP 信息提供商
- 图标适配 iOS 18 Dark 和 Tinted

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
- 修复部分 UI 列表的意外跳动

> [!NOTE]
> 发布于 2024 年 9 月 7 日

## 2.6.4

### 新增
- 支持 Hysteria 2 端口跳跃特性
- 新增 SSH 协议支持
- 新增 Juicity 协议支持
- Shortcuts 支持 match_geosite 语法
- 当 CA 证书不受信任时，MitM 功能会自动关闭
- 支持在 MitM 设置页面删除已创建的证书
- 新增俄语支持

### 优化
- 优化 QUIC 协议 0-RTT
- 优化脚本 Header 兼容性
- 优化跳过代理 / 路由页面交互
- 优化 App 体积
- 优化 CA 证书逻辑，现在签发的证书有效期为 10 年
- 优化安装 CA 证书交互逻辑

### 修复
- 修复了可视化编辑中拖拽排序时 UI 可能错位的问题
- 修复部分情况下缓存文件占用空间过大的问题

> [!NOTE]
> 发布于 2024 年 8 月 2 日

## 2.6.3

- 优化 WireGuard 连接稳定性
- 优化 Hysteria2 在部份网络下 0-RTT 的兼容性
- 优化运行时 MitM 证书生成过程，减少重复计算、提高性能和节省电源消耗
- 优化使用 underlying-proxy 的 WireGuard，在连接出错时能自动恢复
- 修复 15.4 以下系统脚本无法运行的问题

> [!NOTE]
> 发布于 2024 年 6 月 18 日

## 2.6.2

- 修复部分情况 $persistentStore 可能无法正确保存的问题

> [!NOTE]
> 发布于 2024 年 5 月 29 日

## 2.6.1

### 新增
- Stash 现已优化嗅探，支持在「仅使用 Tunnel 代理」下使用更多的覆写
- 现已支持嗅探 TCP 连接中可能的 HTTP 请求，包括 Method Host URL
- 支持 DNS over HTTP/3
- 支持代理服务器的 Server Certificate Fingerprint Pinning，开启后会在 TLS 握手时验证服务器证书 SHA256 指纹
- 工具新增 Script Hub
- 支持点击策略组图标折叠策略组

### 优化
- 优化脚本性能和内存占用，脚本性能大幅提升
- 优化基于 QUIC 协议的性能
- 优化断开 VPN 连接时的速度

### 修复
- 修复 iPad 上无法扫描 QR Code 的问题
- 修复一个可视化编辑可能的崩溃
- 修复最近引入的一个脚本内存占用延迟释放问题
- 修复脚本 $httpClient 异常处理不正确的问题
- 修复脚本 $persistentStore.write 传入值为 null 或 undefined 时不能保存的问题
- 修复 Today Widget 点击开关后状态可能不刷新的问题
- 修复脚本超时异常的问题
- 修复部份脚本执行失败问题

> [!NOTE]
> 发布于 2024 年 5 月 22 日

## 2.6.0

### 新增
- 支持 iOS 17 Interactive Widget
- 更换 JavaScript 引擎，新引擎支持 WebAPI
- 支持 DNS 查询跟随规则
- 新增支持 classical text 规则集合
- 新增支持一键更新全部覆写
- 新增覆写分类
- 新增覆写图标
- 支持代理「Apple 推送通知」、「Wi-Fi Calling，彩信，短信」、「AirPlay， AirDrop」
- 脚本 $environment 支持 device-model
- 脚本 $httpClient 支持参数 timeout、insecure、auto-cookie、auto-redirect

### 优化
- 优化 UDP 兼容性
- 优化 Script 内存
- 优化覆写预览
- 优化脚本 $httpclient 兼容性，修复与部分服务器的通信可能会异常的问题
- 优化可视化 DNS 编辑，支持从首页进入

### 修复
- 修复 DNS over QUIC 响应超时的问题
- 修正脚本 $argument 参数行为，当未设置 argument 时，$argument 为 undefined
- 修正部分巨型规则匹配可能不准确的问题
- 修复 doq 可能会导致断开的问题
- 修复网络连接不能正确识别来自 Stash 内部的连接的问题
- 修复导入配置可能会没响应的问题
- 修复一处策略组崩溃
- 修复同名覆写无法安装的问题

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
