---
description: "启用 MitM 后即可查看、改写 HTTPS 请求并执行脚本。介绍 CA 证书的生成、导入以及设备信任的完整步骤。"
---

# MitM

如果想对 HTTPS 请求进行查看、改写、执行脚本，必须启用 MitM 功能。在启用 MitM 功能前，你的设备需要信任自行签发的 CA 证书，该 CA 证书可以由用户导入 Stash，或由 Stash 生成。

> [!WARNING]
> 基于数据安全以及私隐的考虑，任何时候你不应该与他人共享证书，或使用互联网上提供的
> CA 证书。

![](/tutorial/mitm-zh.png)

## 使用配置文件配置 MitM

### 配置 CA 证书

```yaml
http:
  # 以 PKCS #12 编码的 CA 证书
  ca: ''
  # 证书密码
  ca-passphrase: ''
  # 开启 MitM 功能的域名列表，需要确保上述 CA 证书已受系统信任
```

### 配置 MitM 列表

```yaml
http:
  # 开启 MitM 功能的域名列表，需要确保上述 CA 证书已受系统信任
  mitm:
    - g.cn
    - '*.google.cn'
    - weather-data.apple.com # 默认只对 443 端口开启
    - weather-data.apple.com:* # 使用通配符对所有端口开启
    - '*.weather-data.apple.com' # 域名中也可以使用通配符
```

至此，MitM 配置完毕。

## 使用图形界面配置 MitM

如果无法在配置文件中添加 CA 证书，可以使用 Stash 的图形界面生成 CA 证书。

### 配置 CA 证书

1、在 Stash 首页，找到 **MitM** ，选择 **\[CA 证书]**；

2、点击 **\[Stash Generated CA]** 生成新的证书；

3、点击 **\[安装 证书]** 安装新证书；

4、 Stash 会自动跳转到 **Safari** 进行证书安装，点击 **\[允许]** 安装新的证书；

5、出现 \[已下载描述文件] ，则代表证书已成功安装；

### 配置 MitM 列表

1、在 Stash 首页，找到 **MitM** ，选择 **\[主机名]**；

2、输入您想添加的域名，如 **\*.google.cn** ，域名中可以使用通配符，点击旁边的 **\[+ 号]，添加到 MitM 列表里；**

### 系统信任证书
