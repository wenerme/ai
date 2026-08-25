---
description: "配置 force-http-engine 让来自 Tunnel 的 TCP 连接同样经由 HTTP 引擎处理，以便使用改写与脚本功能。"
---

# Force HTTP Engine

默认地，所有经由 HTTP Proxy 的请求会由 HTTP 引擎处理，以使用改写、脚本等功能。若希望来自 Tunnel 的 TCP 连接经由 HTTP 引擎处理，需要配置 `force-http-engine`。

```yaml
http:
  # 强制使用 Stash 引擎以 HTTP 协议处理 TCP 连接
  # 捕获后的连接可以使用高级功能，例如重写和脚本
  force-http-engine:
    - '*:80'
    - '*:4480' # BiliBili CDN
    - '*:9102' # BiliBili CDN
```

> [!WARNING]
> 无法解析的请求会被 HTTP 引擎以 Bad Request 响应拒绝。
