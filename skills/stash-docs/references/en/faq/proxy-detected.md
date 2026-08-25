---
description: "Use Tunnel-only proxy mode to keep apps from detecting a proxy environment — useful for apps that refuse to run behind one."
---

# Prevent Detection of Proxy

Some applications may detect whether the system is using proxy software, thereby prohibiting users from using it in a proxy environment. Stash provides "Tunnel Proxy Only" mode to prevent applications from detecting proxy programs. This option disables Stash Proxy, causing all HTTP(S) requests to be processed by Stash Tunnel to improve compatibility with certain applications.

![](/tutorial/proxy-detected-en.png)

1. On the Stash Settings page, select "Network Settings"
2. Turn on "Tunnel Proxy Only"

> [!NOTE]
> Enabling this option will disable Stash HTTP Engine, causing HTTP rewriting to
> fail. To avoid this issue, please refer to [Force HTTP
> Engine](../http-engine/force-http-engine).
