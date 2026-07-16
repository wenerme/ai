# 越狱 iOS 系统内存限制修改

Jetsam 在 iOS 中负责监控内存并进行 OOM kill。在系统默认配置中，不同类型的进程有不同的内存限制。在 iOS 14 及之前的系统中，Network Extension 的内存限制为 15 MB；而在 iOS 15 及以后，Network Extension 的内存限制增加到了 50 MB。

对于越狱用户，可以修改这个值以允许 Network Extension 使用更多内存。这个配置文件存放在 `/System/Library/LaunchDaemons/com.apple.jetsamproperties.{Model}.plist`。

打开任意一个文件后搜索 `com.apple.networkextension.packet-tunnel` 这个键即可找到 Network Extension 的限制。建议将其修改为 50 到 100 之间的任意数值。`ActiveHardMemoryLimit` 和 `InactiveHardMemoryLimit` 都需要修改。

```xml
<key>com.apple.networkextension.packet-tunnel</key>
<dict>
    <key>ActiveHardMemoryLimit</key>
    <integer>50</integer>
    <key>InactiveHardMemoryLimit</key>
    <integer>50</integer>
    <key>JetsamPriority</key>
    <integer>14</integer>
</dict>
```

- 在操作前务必备份数据。
- 不同手机的 Model 可能各不相同，也可能存在多个类似文件，如果不确定本机匹配的 Model，可以尝试修改所有相关文件。
- 修改后，需重启 iOS 系统才能生效。

您可以在 [github.com/eycorsican/jetsamproperties](https://github.com/eycorsican/jetsamproperties) 项目中获取更多信息。
