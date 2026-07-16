# 延迟测试

在 Stash 中，你可以为每个代理指定单独的延迟测试参数，包括：延迟测试目标 URL 和测试的超时时间。

延迟测试超时的代理会被标记为不健康。

```yaml {6-8}
proxies:
  - name: your-proxy
    type: ss
    server: server
    port: 443
    benchmark-url: http://www.apple.com # 建议只使用 HTTP 协议
    benchmark-timeout: 5 # 延迟测试超时时间，单位：秒
    benchmark-disabled: false # 设置为 `true` 时完全禁用延迟测试
```

> [!NOTE]
> 如果一个代理被多个策略组引用，多个策略组会共享这个代理的延迟测试结果。若希望一个代理在不同的策略组使用不同的延迟测试参数，请手动创建多个代理。

## 延迟测试方式

Stash 支持多种方式对代理进行延迟测试，包括：

- `UDP`：使用 UDP 报文进行延迟测试
- `TCP`：使用 TCP 握手进行延迟测试（对基于 UDP 的协议如 QUIC 无效）
- `HTTP HEAD`：默认方式，通过代理发送 HTTP HEAD 请求进行延迟测试
