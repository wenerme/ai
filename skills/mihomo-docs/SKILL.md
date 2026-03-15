---
name: mihomo-docs
description: "mihomo (Clash Meta) 文档 — 高性能代理内核，支持 VMess/VLESS/Trojan/Hysteria2/Shadowsocks/WireGuard/TUIC/SSH/MASQUE/AnyTLS 等协议。覆盖完整 YAML 配置参考：通用设置、DNS（hosts/策略路由/图解）、入站（TUN/混合端口/监听器）、代理节点、代理组（选择/URL测速/负载均衡/故障转移/链式中继）、规则/子规则、规则提供者、代理提供者、嗅探、NTP、隧道、实验性功能；新手指南（DNS/出站/路由/语法）；部署（服务安装/客户端/Web面板）；REST API。USE THIS SKILL WHEN the user asks about mihomo/Clash Meta configuration, proxy protocols, DNS routing, TUN mode, proxy groups, rules, or deployment."
version: 0.1.0
---

# mihomo (Clash Meta) 文档

[mihomo](https://github.com/MetaCubeX/mihomo) 官方文档 — 基于 Go 的高性能网络代理内核（原 Clash Meta）。

CRITICAL: grep `references/` for keywords before answering.

## 参考索引 (119 docs, 中文+英文)

### 通用配置
- `references/config/index.md` — 配置文件结构总览
- `references/config/general.md` — 通用设置（端口、模式、日志等）
- `references/config/experimental.md` — 实验性功能

### DNS 配置
- `references/config/dns/index.md` — DNS 配置
- `references/config/dns/hosts.md` — Hosts 映射
- `references/config/dns/type.md` — DNS 类型
- `references/config/dns/diagram.md` — DNS 流程图解

### 入站配置
- `references/config/inbound/port.md` — 端口配置
- `references/config/inbound/tun.md` — TUN 模式
- `references/config/inbound/listeners/` — 监听器（HTTP/SOCKS/Mixed/Redirect/TProxy/TUN/SS/Trojan/VMess/VLESS/Hysteria2/TUIC 等）

### 代理协议 (20+ 协议)
- `references/config/proxies/` — VMess, VLESS, Trojan, SS, SSR, Hysteria, Hysteria2, TUIC, WireGuard, SSH, HTTP, SOCKS, Snell, MASQUE, AnyTLS, Sudoku, TrustTunnel, Direct, DNS
- `references/config/proxies/tls.md` — TLS 配置
- `references/config/proxies/transport.md` — 传输层配置
- `references/config/proxies/dialer-proxy.md` — 链式代理

### 代理组
- `references/config/proxy-groups/select.md` — 手动选择
- `references/config/proxy-groups/url-test.md` — URL 测速自动选择
- `references/config/proxy-groups/fallback.md` — 故障转移
- `references/config/proxy-groups/load-balance.md` — 负载均衡
- `references/config/proxy-groups/relay.md` — 链式中继

### 规则
- `references/config/rules/index.md` — 规则配置
- `references/config/sub-rule.md` — 子规则
- `references/config/rule-providers/` — 规则提供者
- `references/config/proxy-providers/` — 代理提供者

### 其他配置
- `references/config/sniff/` — 协议嗅探
- `references/config/ntp/` — NTP 时间同步
- `references/config/tunnels.md` — 隧道配置

### 新手指南
- `references/handbook/dns.md` — DNS 配置指南
- `references/handbook/out.md` — 出站配置指南
- `references/handbook/route.md` — 路由配置指南
- `references/handbook/syntax.md` — YAML 语法指南

### 部署与启动
- `references/startup/` — 安装部署、系统服务、客户端配置、Web 面板

### API
- `references/api/index.md` — REST API 参考

### 示例
- `references/example/conf.md` — 完整配置示例
