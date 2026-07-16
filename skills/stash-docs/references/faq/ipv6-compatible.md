# IPv6 兼容性

在绝大多数情况下，您无需手动启用 IPv6。Stash 会根据 iOS / macOS 系统返回的 IPv4 / IPv6 状态，自动选择最佳的连接策略。当 IPv4 / IPv6 都可用时，Stash 会同时向 IPv4 / IPv6 发起 TCP 握手，并选择第一个成功握手的连接进行后续数据传输。

在代理服务器支持 IPv6 的情况下，由于 Stash 使用 Fake IP 机制，通常会尽可能地向代理服务器转发域名而不是 IP 请求。此时 IPv4 / IPv6 的选择取决于代理服务器。

由于 Fake IP 机制的存在，Stash Tunnel 的大部分情况下会接受 Fake IP 的路由，并由 Stash 将 Fake IP 反查域名，**Stash Tunnel 默认仅启用 IPv4**。对于大多数 HTTP(S) 请求，即使直接输入 IPv6 地址，由于存在 HTTP 代理，请求并不会经过 Stash Tunnel。在上述两种机制下，Stash 默认支持：

- 通过域名访问仅支持 IPv6 的服务器
- 直接通过 IP 访问仅支持 IPv6 的网站

对于直接通过 IPv6 访问且经由 Stash Tunnel 的情况（如 SSH、FTP 等），需要开启「网络设置 - 启用 Tunnel IPv6 路由」。**请注意，在网络环境不支持 IPv6 的情况下开启该功能，可能会导致兼容性问题。**
