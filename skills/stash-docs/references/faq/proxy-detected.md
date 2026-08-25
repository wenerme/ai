---
description: "使用「仅使用 Tunnel 代理」模式防止应用程序检测到代理环境，适用于会拒绝在代理下运行的应用。"
---

# 防止代理被检测

部分应用程序可能会检测系统是否使用代理软件，从而禁止用户在代理环境下使用。Stash 提供了「仅使用 Tunnel 代理」模式来防止应用程序检测代理程序，该选项将禁用 Stash Proxy，使得所有 HTTP(S) 请求亦会交由 Stash Tunnel 进行处理，以改善和某些应用的兼容性问题。

![](/tutorial/proxy-detected-zh.png)

1. 在 Stash 的设置页面，选择「网络设置」
2. 打开「仅使用 Tunnel 代理」

> [!NOTE]
> 开启这个选项会使得 Stash HTTP Engine 失效 ，导致 HTTP
> 改写功能失效。避免该问题，请参考 [Force HTTP
> Engine](../http-engine/force-http-engine)。
