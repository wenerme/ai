---
description: "Stash iOS、tvOS 与 Stash Mac 均可为局域网中的其他设备提供代理服务。介绍开启方式与客户端配置方法。"
---

# 为局域网设备提供代理

Stash iOS、Stash tvOS 与 Stash Mac 均支持为局域网设备提供代理服务。

- Stash iOS 支持提供 HTTP 代理和 SOCKS 代理
- Stash tvOS 和 Stash Mac 支持提供 HTTP 代理、SOCKS 代理和透明代理（网关模式）

> [!NOTE]
> 网关模式可以为局域网内设备提供透明代理，也常称为旁路由或增强模式。

## HTTP 代理与 SOCKS 代理

Stash iOS 与 Stash Mac 均默认在 7890 端口提供 HTTP 代理与 SOCKS 代理服务。开启「允许局域网连接」后，局域网设备可通过 7890 端口访问 Stash 提供的代理服务。

例如局域网内 IP 地址为 `192.168.1.10` 的设备运行着 Stash，可通过以下命令为 shell 配置代理：

```bash
export https_proxy=http://192.168.1.10:7890
export http_proxy=http://192.168.1.10:7890
export all_proxy=socks5h://192.168.1.10:7890
```

## 通过个人热点提供代理

在 iPhone/iPad 等设备开启个人热点后，运行 Stash 可为连接至个人热点的设备提供 HTTP 代理或 SOCKS 代理服务，此功能同样需要开启「允许局域网连接」。

## Stash tvOS & Stash Mac 网关模式

- Stash tvOS 仅支持在 [支持 Thread 的 Apple TV](https://support.apple.com/en-hk/HT210213) 上启用透明代理
- Stash Mac 启用透明代理需要开启「增强模式」

假设局域网内 IP 地址为 `192.168.1.10` 的设备运行着 Stash，为局域网设备提供代理需进行如下设置：

1. 将局域网内设备的网关配置为 `192.168.1.10`
2. DNS 设置为 `198.18.0.2`
3. 保持 IP 地址和子网掩码不变

启用网关模式的 Stash 可代理 TCP 和 UDP 流量，并会简单响应 ICMP 的 Echo Reply。

> [!NOTE]
> 若 Apple TV 休眠一段时间后旁路由无响应，请根据 Apple 官方指引排查 Apple TV
> 是否已设置为家居中枢。
