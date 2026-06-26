当您需要通过命令行管理特定云产品时，可安装对应的 CLI 插件。每个插件对应一个云产品，支持按需安装、独立更新，CLI 主程序保持轻量。所有插件统一使用短横线（kebab-case）命名风格，并自动处理参数序列化，简化调用体验。

## 前提条件
1. 已安装阿里云 CLI 3.3.0 或更高版本。安装方法，请参见[安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)。

2. 确保阿里云 CLI 已配置凭证。配置方法，请参见[配置与管理身份凭证](https://help.aliyun.com/document_detail/121193.html)。

## 快速开始
以安装 `ecs` 插件为例，介绍安装插件并查询地域列表的流程。

```bash
# 安装插件（以 ecs 插件为例）
aliyun plugin install --name ecs

# 调用 API 查询地域列表
aliyun ecs describe-regions --accept-language zh-CN
```

可通过 `aliyun ecs --help` 查看 ecs 插件支持的所有命令。后续章节将介绍插件命名规则、安装管理、参数用法和进阶特性。

## 插件概述
插件将各云产品的 API 调用能力封装为独立的可执行程序，由 CLI 主程序统一调度。主要特性如下：

* **按需安装**：仅安装所需云产品插件，减少 CLI 体积。

* **独立更新**：插件独立发布版本，无需升级 CLI 主程序。

* **统一命名** ：命令和参数使用短横线命名，例如 `describe-instances`、`--accept-language`。

* **参数简化**：自动处理底层参数序列化，统一使用键值对格式输入。

* **完整帮助** ：通过 `--help` 查看参数类型、描述和是否必填。

插件安装在 `~/.aliyun/plugins` 目录下，清单记录在 `manifest.json` 文件中。

### 插件命名规则

插件命名格式为 `aliyun-cli-<产品 Code>`，产品 Code 与阿里云 OpenAPI 一致，示例如下：

| **插件名称** | **产品 Code** | **对应云产品** |
| --- | --- | --- |
| `aliyun-cli-ecs` | `ecs` | 云服务器 ECS |
| `aliyun-cli-fc` | `fc` | 函数计算 FC |
| `aliyun-cli-rds` | `rds` | 云数据库 RDS |

安装、卸载和更新时，使用插件全称（例如 `aliyun-cli-ecs`）或产品 Code（例如 `ecs`），不区分大小写。

## 安装插件
### 确认产品是否支持 CLI

可通过如下方式确认产品是否支持 CLI：

* **在线查询（推荐）** ：访问 [CLI 中心](https://api.aliyun.com/api-tools/cli)，可按分类浏览、关键词搜索，查看产品列表、调用示例。

* **命令行查询**：在 CLI 中列出所有可用插件，或按关键词搜索：

  * 查看远程索引中所有可用的插件：

    ```bash
    aliyun plugin list-remote
    ```

  * 输出示例：

    ```bash
    Total plugins available: 316

    Name                                     Latest Version  Preview  Status         Local Version  Description
    ----                                     --------------  -------  ------         -------------  -----------
    aliyun-cli-ecs                           0.1.0           No       Installed      0.1.0          Aliyun CLI plugin for Elastic Compute Service operations.
    aliyun-cli-fc                            0.1.0           No       Installed      0.1.0          Aliyun CLI plugin for Function Compute 3.0 operations.
    aliyun-cli-acc                           0.1.0           No       Not installed  -              Aliyun CLI plugin for acs operations.
    ```

### 搜索插件

要查找特定命令所属的插件，可使用搜索功能（支持前缀匹配）：

```bash
# 搜索包含 ecs 的插件
aliyun plugin search ecs
# 搜索 ecs 产品下以 describe 开头的命令
aliyun plugin search "ecs describe"
```

**说明**

* CLI 插件遵循语义化版本规范（SemVer）。0.x.x 为实验性版本，不保证兼容性；1.0.0 及以上为稳定版本，同一主版本号内保持向后兼容，主版本号递增可能存在非兼容变更。

* 远程索引默认缓存 1 小时。如需强制刷新，设置环境变量 `ALIBABA_CLOUD_CLI_PLUGIN_NO_CACHE=true`。

### 执行安装

`plugin install` 支持两种指定插件的方式：使用 `--name` 标志（如 `aliyun plugin install --name ecs`）或直接传入名称作为位置参数（如 `aliyun plugin install ecs`），效果相同。`--name` 标志是 v3.3.14 新增的显式写法。

执行以下命令安装插件：

```bash
aliyun plugin install --name ecs
```

安装完成后，通过 `aliyun plugin list` 确认结果。

```bash
Name                Version             Description
----                -------             -----------
aliyun-cli-ecs      0.1.0               Aliyun CLI plugin for Elastic Compute Service operations.
aliyun-cli-fc       0.1.0               Aliyun CLI plugin for Function Compute 3.0 operations.
```

针对不同安装场景，可使用以下标志：

| **标志** | **示例命令** | **说明** |
| --- | --- | --- |
| `--name` | `aliyun plugin install --name ecs` | 安装单个插件，仅接受一个名称（v3.3.14+） |
| `--names` | `aliyun plugin install --names ecs rds vpc` | 批量安装多个插件，名称以空格分隔，与 `--name` 互斥 |
| `--version` | `aliyun plugin install --name fc --version 1.0.0` | 安装指定版本，不指定则安装最新稳定版 |
| `--enable-pre` | `aliyun plugin install --name fc --enable-pre` | 允许安装预发布版本 |
| `--package` | `aliyun plugin install --package /path/to/ecs-plugin.zip` | 从本地文件（.zip/.tar.gz/.tgz）或 URL 安装，适用于离线或特定局域网环境 |
| `--source-base` | `aliyun plugin install --name ecs --source-base https://mirror.example.com/cli-plugins` | 自定义插件源地址（单次生效） |

以下为三种典型安装方式的示例：

```bash
# 方式 1：按名称安装单个插件
aliyun plugin install --name ecs

# 方式 2：批量安装多个插件
aliyun plugin install --names ecs rds vpc

# 方式 3：从本地包安装（适用于离线或内网环境）
aliyun plugin install --package /path/to/ecs-plugin.zip
# 也支持从 URL 安装
aliyun plugin install --package https://internal-mirror.example.com/plugins/ecs-plugin.tar.gz
```

**说明**

CLI 自动检测操作系统和架构（例如 `darwin-arm64`、`linux-amd64`），下载匹配的插件包。批量安装时，单个插件失败不影响其余插件。部分插件要求最低 CLI 版本，不满足时会提示升级。

## 查看插件详情
安装插件后，可通过 `aliyun plugin list` 查看已安装插件的概要列表。如需查看某个插件的详细信息（如版本号、安装路径、支持的 API 版本列表等），执行以下命令：

```bash
# 查看指定插件的详细信息
aliyun plugin show --name ecs
```

输出包含：插件名称、当前版本、安装路径、支持的 API 版本列表等。

## 使用插件
产品插件统一使用短横线（kebab-case）命名。CLI 自动将当前 Profile 中配置的凭证（AccessKey、STS Token 等）、地域和超时设置传递给产品插件。

`--profile` 和 `--region` 等选项对插件命令同样生效，无需单独配置。命令格式：

```bash
aliyun <产品Code> <命令> [--参数名 值 ...]
```

### 使用示例

#### **查看插件帮助信息**

使用 `aliyun <产品 Code> --help` 或 `aliyun <产品 Code> <命令> --help` 获取帮助信息。例如查看 `ecs` 所有支持的命令：

```bash
aliyun ecs --help
```

查看 `ecs` 插件下特定命令的参数详情：

```bash
aliyun ecs describe-regions --help
```

输出示例：

```bash
......
  --accept-language         string, 根据汉语、英语和日语筛选返回结果。更多详情，请参见[RFC
                            7231](https://tools.ietf.org/html/rfc7231)。取值范围：
                            - zh-CN：简体中文。
                            - zh-TW：繁体中文。
                            - en-US：英文。
                            - ja：日文。
                            - fr：法语。
                            - de：德语。
                            - ko：韩语。
                            默认值：zh-CN
  --instance-charge-type    string, 实例的计费方式，更多信息，请参见https://help.aliyun.
                            com/document_detail/25398.html。取值范围：
                            - PrePaid：包年包月。此时，请确认自己的账号支持余额支付或者信用支付，
                            否则将报错InvalidPayMethod。
                            - PostPaid：按量付费。
                            - SpotWithPriceLimit：设置上限价格。
                            - SpotAsPriceGo：系统自动出价，最高按量付费价格。
                            默认值：PostPaid
......
```

帮助信息展示每个参数的类型、描述和是否必填。

#### 查询地域列表

执行以下命令查询地域列表：

```bash
aliyun ecs describe-regions --accept-language zh-CN
```

查询输出示例：

```bash
{
  "Regions": {
     "Region": [
{
   "LocalName": "华北1（青岛）",
   "RegionEndpoint": "ecs.cn-qingdao.aliyuncs.com",
   "RegionId": "cn-qingdao"
		},
{
   "LocalName": "华北2（北京）",
   "RegionEndpoint": "ecs.cn-beijing.aliyuncs.com",
   "RegionId": "cn-beijing"
},
......
```

### 进阶用法

#### **结构化参数输入**

插件自动处理底层参数序列化。无论 API 使用何种参数风格（例如 repeatList、flat、json），均使用相同的输入方式：

* 数组参数：当参数（例如 `attribute-name`）为数组时，可重复使用特定参数。

  ```bash
  aliyun ecs describe-account-attributes\
        --biz-region-id cn-hangzhou\
        --attribute-name max-security-groups\
        --attribute-name instance-network-type
  ```

* 对象参数：当参数（例如 `tag`）为对象时，使用 `key=value` 格式。

  ```bash
  aliyun ecs describe-instances --biz-region-id cn-hangzhou\
         --tag key=env value=prod
  ```

#### **多版本 API**

部分云产品存在多个 API 版本。通过 `aliyun plugin list` 查看已安装插件，描述中包含 `multi-version` 关键字的插件支持多版本。

例如：

```bash
Name                Version             Description
----                -------             -----------
aliyun-cli-ecs      0.1.0               Aliyun CLI plugin for Elastic Compute Service operations.
aliyun-cli-ess      0.1.0               Aliyun CLI plugin for Auto Scaling operations with multi-version API support.
aliyun-cli-fc       0.1.0               Aliyun CLI plugin for Function Compute 3.0 operations.
```

对于支持多 API 版本的插件，可使用 `--api-version` 参数指定 API 版本：

* 使用默认 API 版本

  ```bash
  aliyun ess describe-scaling-groups --biz-region-id cn-hangzhou
  ```

* 使用 `--api-version` 指定 API 版本

  ```bash
  aliyun ess describe-scaling-groups --api-version 2022-02-22 --biz-region-id cn-hangzhou
  ```

* 查看支持的 API 版本列表

  ```bash
  aliyun ess list-api-versions
  ```

如需固定使用某个特定版本，可通过环境变量设置默认值，避免每次指定 `--api-version`。格式为 `ALIBABA_CLOUD_<PRODUCT_CODE>_API_VERSION`，其中 `<PRODUCT_CODE>` 为产品 Code 大写形式。

例如：

```bash
# 添加环境变量并生效
echo 'export ALIBABA_CLOUD_ESS_API_VERSION=2022-02-22' >> ~/.bashrc
source ~/.bashrc
```

设置后直接执行命令即使用该版本。命令中显式指定 `--api-version` 时，优先级高于环境变量。

## 更新和卸载插件
### 更新插件

更新指定插件：

```bash
aliyun plugin update --name ecs
```

更新所有已安装的插件：

```bash
aliyun plugin update
```

如果插件已是最新版本，CLI 会提示无需更新。要更新到预发布版本，添加 `--enable-pre` 参数。

操作完成后，通过 `aliyun plugin list` 确认结果。

### 卸载插件

执行以下命令卸载不再需要的插件：

```bash
aliyun plugin uninstall --name ecs
```

卸载完成后，通过 `aliyun plugin list` 确认插件已移除。

## 配置自动安装插件
执行云产品命令时，如果所需插件未安装，CLI 可根据配置自动安装。建议在非交互式环境（如 CI/CD、脚本）或经常使用不同云产品时启用，以避免执行中断或反复手动安装插件。

### 启用方式

通过命令启用：

```bash
aliyun configure set --auto-plugin-install true
```

或通过环境变量启用（以 Linux 为例）：

```bash
# 添加环境变量并生效
echo 'export ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL=true' >> ~/.bashrc
source ~/.bashrc
```

配置后执行 `aliyun configure get` 验证。

如需允许自动安装预发布版本：

```bash
aliyun configure set --auto-plugin-install-enable-pre true
```

或通过环境变量启用（以 Linux 为例）：

```bash
# 添加环境变量并生效
echo 'export ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL_ENABLE_PRE=true' >> ~/.bashrc
source ~/.bashrc
```

### 安装策略

CLI 根据运行环境选择不同策略：

| **场景** | **行为** |
| --- | --- |
| 已启用自动安装 | 自动安装插件并继续执行命令 |
| 交互式终端且未启用自动安装 | 提示确认是否安装 |
| 非交互式环境（脚本、管道） | 仅输出安装提示，不自动安装 |

自动安装输出示例：

```bash
# 未安装 ecs 插件的情况下执行
aliyun ecs describe-regions --accept-language zh-CN
# 自动安装过程输出
Plugin 'aliyun-cli-ecs' is required for command 'ecs describe-regions' but not installed.
Auto-installing plugin 'aliyun-cli-ecs' (including pre-release versions)...
Downloading aliyun-cli-ecs 0.1.0...
Plugin aliyun-cli-ecs 0.1.0 installed successfully!
......
```

交互式环境未开启自动安装输出示例：

```bash
# 未安装 ecs 插件的情况下执行
aliyun ecs describe-regions --accept-language zh-CN
# 交互式安装过程输出
Plugin 'aliyun-cli-ecs' is required for command 'ecs describe-regions' but not installed.
Tip: Run 'aliyun configure set --auto-plugin-install true' to skip this prompt.
Do you want to install it? [Y/n]: y
Installing plugin 'aliyun-cli-ecs' (including pre-release versions)...
Downloading aliyun-cli-ecs 0.1.0...
Plugin aliyun-cli-ecs 0.1.0 installed successfully!
......
```

## 插件全局设置
如果企业内网无法直接访问公网插件源，或需要统一管理插件下载地址，可通过 `configure plugin-settings` 子命令进行全局设置。设置保存在 `~/.aliyun/plugin-settings.json` 文件中。

### 查看当前设置

执行以下命令查看当前插件全局设置：

```bash
aliyun configure plugin-settings show
```

### 设置自定义插件源

执行以下命令设置自定义插件源地址（适用于企业内网部署）：

```bash
aliyun configure plugin-settings set --source-base https://internal-mirror.example.com/cli-plugins
```

设置完成后，执行以下命令确认设置已生效：

```bash
aliyun configure plugin-settings show
```

### 清除自定义设置

执行以下命令清除自定义设置，恢复默认插件源：

```bash
aliyun configure plugin-settings clear
```

## 附录
### 插件命令列表

| **命令** | **说明** |
| --- | --- |
| `aliyun plugin list` | 列出已安装插件 |
| `aliyun plugin list-remote` | 列出远程可用插件 |
| `aliyun plugin show --name \<名称\>` | 查看指定插件的详细信息 |
| `aliyun plugin search \<命令名\>` | 搜索命令对应的插件 |
| `aliyun plugin install (--name \<名称\> \\| --names \<名称 1\> \[\<名称 2\> ...\]) \[--version \<版本\>\] \[--enable-pre\] \[--package \<路径或 URL\>\] \[--source-base \<URL\>\]` | 安装插件 |
| `aliyun plugin update \[--name \<名称\>\] \[--enable-pre\]` | 更新插件 |
| `aliyun plugin uninstall --name \<名称\>` | 卸载插件 |
| `aliyun configure plugin-settings show` | 查看插件全局设置 |
| `aliyun configure plugin-settings set --source-base \<URL\>` | 设置自定义插件源地址 |
| `aliyun configure plugin-settings clear` | 清除自定义插件设置，恢复默认源 |

### 插件环境变量列表

以下环境变量用于控制插件行为：

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_CLI_PLUGINS_DIR` | 自定义插件目录，默认为 `\~/.aliyun/plugins` |
| `ALIBABA_CLOUD_CLI_PLUGIN_NO_CACHE` | 设为 `true` 禁用远程索引缓存（默认缓存 1 小时） |
| `ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL` | 设为 `true` 启用自动安装（命令未找到时自动安装对应插件） |
| `ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL_ENABLE_PRE` | 设为 `true` 自动安装时允许预发布版本 |
| `ALIBABA_CLOUD_CLI_PLUGIN_SOURCE_BASE` | 自定义插件源地址（效果同 `--source-base` 和 `configure plugin-settings set --source-base`） |
| `ALIBABA_CLOUD_\<PRODUCT_CODE\>_API_VERSION` | 设置产品插件默认 API 版本，例如：`ALIBABA_CLOUD_ESS_API_VERSION=2022-02-22` |
| `ALIBABA_CLOUD_CLI_MAX_LINE_LENGTH` | 调节参数 help 信息的单行输出长度 |

## 常见问题
#### **插件安装提示"no stable version available"**

此提示表示该插件仅提供预发布版本。要安装预发布版本，在安装命令中添加 `--enable-pre` 参数：

```bash
aliyun plugin install --name <插件名> --enable-pre
```
