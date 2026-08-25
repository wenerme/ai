---
description: "Stash Mac 反复提示安装帮助程序（Helper）的原因与解决方法。帮助程序用于以管理员权限设置系统代理。"
---

# 无法安装 Stash Mac 帮助程序 (Helper)

部分用户可能会遇到反复提示需要安装帮助程序 (Helper) 的情况。Stash 需要使用管理员权限安装一个帮助程序，否则 Stash 将无法设置系统代理。

> [!WARNING]
> 部分杀毒软件或清理软件可能会导致 Stash Helper
> 无法正常运行，请确保没有使用这一类软件阻止或清理 Stash Mac 。

## macOS 13 Ventura

在 macOS 13 苹果引入了新的后台权限管理，如错误配置此项会引起 Stash Helper 无法正常运行。

- 在 Mac 的「系统设置」 - 「通用」 - 「登陆项」 - 「允许在后台」，请确保 `Stash` 或 `Stash Networks Limited` 等开关为启用状态。

## 修复步骤

如执行上述操作后依然无法安装 Stash Helper ，请尝试参照以下步骤修复：

1. 打开终端 (Terminal)。

2. 运行以下命令移除 Helper （需输入系统密码并按回车键）。

```sh
sudo rm -rf /Library/PrivilegedHelperTools/ws.stash.app.mac.daemon.helper
```

3. 运行以下命令启用 Helper （需输入系统密码并按回车键）。

```sh
sudo /bin/launchctl load -w /Library/LaunchDaemons/ws.stash.app.mac.daemon.helper.plist
```

如提示 `service already loaded` 或 `Operation already in progress` ，无需理会。

4. 重启电脑。

5. 打开 Stash ，重新安装帮助程序（需输入系统密码）。

至此，您的 Stash Helper 已修复。如果仍然不能正常工作，请与 info@stash.ws 联系。
