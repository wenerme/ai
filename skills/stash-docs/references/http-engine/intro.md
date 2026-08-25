---
description: "Stash 内置高效的 HTTP 引擎，可对系统中的 HTTP 请求进行改写、拦截、抓取与重放，并通过 MitM 方式解密 HTTPS 请求。"
---

# Stash HTTP Engine

Stash 内置高效的 HTTP 引擎，允许用户对系统中的 HTTP 请求进行改写、拦截、抓取、重放，以及对 HTTPS 请求通过 MitM 方式进行解密。

## 入站逻辑

系统中并非所有连接都是 HTTP 请求，Stash 会按照以下策略控制连接是否进入 HTTP 引擎。

- 在「仅使用 Tunnel 代理」关闭的情况下，Stash 会向系统声明 HTTP Proxy。进入 HTTP Proxy 的 HTTP 请求会流入 HTTP 引擎处理。
- 对于从 Tunnel 进入，且命中 `force-http-engine` 列表的 TCP 连接，也会流入 HTTP 引擎处理。
- 对于命中 MitM 列表的 HTTPS 请求，也会流入 HTTP 引擎处理，并且 Stash 会根据 SNI 使用配置的根证书生成临时证书，完成 TLS 握手。
- 其他未命中请求会以 TCP 流转发，不进入 HTTP 引擎。
- 暂时不支持处理 HTTP/3 的请求，Stash 会当作普通 UDP 包转发，此时整体吞吐量一般不如基于 TCP 的 HTTP/1 与 HTTP/2 协议。

在遇到 HTTP 改写、脚本不生效时，可以核对上述规则排查。

## 协商与连接管理

Stash HTTP Engine 完整支持解析 HTTP/1.x 与 HTTP/2 协议。

![](https://mermaid.ink/svg/pako:eNo1jsEKwjAQRH9l2XPrB-QmWPDQg7QFD00Pa7O2QZOGJFWk7b8bRS_Dg3kMs2A_KUaBgyc3QllJK-3eOch3-VquECKFsa0_CcemOUFhB225-_bVCs_QnvkCNfsH-w4zNOwNaZUWF2kBJMaRDUsUCRX5m0Rpt-TNTlHkQuk4eRRXugfOkOY41S_bo4h-5r900JTemZ-1vQEAUjzw)

- 对于 HTTP 请求，Stash HTTP Engine 仅支持 HTTP/1.x 协议，不支持 HTTP/2 Cleartext。
- 对于 HTTPS 请求且开启了 MitM，Stash 会尝试与 App 协商升级到 HTTP/2，也会与 Web Server 协商升级到 HTTP/2，L、R 两侧连接是**各自独立无影响**的。
- Stash HTTP Engine 对于 L、R 两侧连接实行**分别管理**，对于 R 侧连接，Stash 会最大限度地复用 TCP 连接，以减少 TCP / TLS 握手的消耗。

## 实践与表现

![](https://mermaid.ink/svg/pako:eNp1j8EKgkAQhl9lmLMaevQWJHToECl0cD1M7qRLucq6FqG-e2sUXeoy_Mz_8TEzYtlKxhgrQ10Nu4PQQq-7LgQ_8Kdtlu1XYRBO0Fvq6zxdJixbSHSlNBdfLJrg3udHPkHK5sameHmiX57_DXrYsGlISXfSKDSAQFtzwwJjFyWZi0ChZ8cNnSTLiVS2NRif6dqzhzTYNn3oEmNrBv5AG0XuveZNzU9wy1Ah)

在实践中，存在：

- 部分 App 不进行 HTTP/2 协商，但 Web Server 支持 HTTP/2 的情况。在 Stash HTTP Engine 通过 MitM 接管后， L 侧会使用 HTTP/1.1 协议，但 R 侧会协商至 HTTP/2。
- 部分 App 即使在 Web Server 支持 HTTP/2 的情况下，仍为每个 HTTPS 请求创建一个 TLS 连接的情况。在 Stash HTTP Engine 通过 MitM 接管后，实际只会创建单条 TCP 连接到 Web Server。

> [!NOTE]
> 在使用中遇到任何兼容性问题，请与我们联系 。
