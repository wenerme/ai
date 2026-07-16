# 无法收到部分应用的推送通知

部分海外应用在中国大陆网络下可能无法收到推送通知，但切换到非大陆网络出口后可以恢复。这通常不是应用本身的通知权限问题，而是中国大陆的 APNs 服务无法向设备推送部分海外应用的通知。

APNs 是 iOS 系统用于接收应用推送通知的服务。让 APNs 相关流量走代理，是为了让设备通过非大陆网络访问可正常工作的 APNs 路径。在 Wi-Fi 网络下，可以添加 APNs 相关域名和 Apple 官方列出的 APNs 网络范围，让这些流量走代理。下面示例假设策略组名为 `PROXY`，请按实际配置替换为自己的策略组名。

这些地址段来自 Apple 官方文档：[If your Apple devices aren't getting Apple push notifications](https://support.apple.com/en-us/102266)。

```yaml
rules:
  - DOMAIN-SUFFIX,push.apple.com,PROXY
  - DOMAIN-SUFFIX,akadns.net,PROXY
  - DOMAIN-KEYWORD,apple.com.edgekey.net,PROXY
  - IP-CIDR,17.249.0.0/16,PROXY,no-resolve
  - IP-CIDR,17.252.0.0/16,PROXY,no-resolve
  - IP-CIDR,17.57.144.0/22,PROXY,no-resolve
  - IP-CIDR,17.188.128.0/18,PROXY,no-resolve
  - IP-CIDR,17.188.20.0/23,PROXY,no-resolve
  - IP-CIDR6,2620:149:a44::/48,PROXY,no-resolve
  - IP-CIDR6,2403:300:a42::/48,PROXY,no-resolve
  - IP-CIDR6,2403:300:a51::/48,PROXY,no-resolve
  - IP-CIDR6,2a01:b740:a42::/48,PROXY,no-resolve
```

添加规则后，建议开关一次飞行模式，断开并重建所有网络连接后再测试推送通知。

> [!NOTE]
> Apple 官方文档中提到，APNs 会使用负载均衡，企业网络可以放行整个
> `17.0.0.0/8`。但作为代理分流规则，建议只使用 Apple
> 列出的 APNs 网络范围，避免把过大的 Apple 地址段全部送入代理。

在移动数据网络下，仅添加规则可能仍会间歇性失效。此时需要开启 Stash 中 Apple 推送通知（APNs）相关的系统级代理选项。

开启系统级 APNs 或所有网络相关的代理能力后，推送通知会依赖代理链路。如果代理不可用，所有应用的推送通知都可能失效。

此外，这类系统级网络代理能力可能影响个人热点、CarPlay 等依赖本地网络或系统网络路径的功能。如遇到个人热点无法使用、CarPlay 无法连接等问题，可以先临时关闭相关选项确认是否与代理有关。
