阿里云 CLI 支持通过环境变量配置凭证、区域、行为选项等运行参数。在 CI/CD 管道、容器环境或自动化脚本中，环境变量是传递凭证和运行配置的首选方式。本文汇总所有支持的环境变量，明确优先级关系，帮助你快速定位所需配置项。

## 优先级说明
阿里云 CLI 读取配置时，按以下优先级从高到低生效：

1. 命令行参数（如 `--profile`、`--region`）

2. 配置文件（`~/.aliyun/config.json`）

3. 环境变量

更多信息请参见[理解命令行参数](https://help.aliyun.com/document_detail/110340.html)。

## 凭证与身份
通过环境变量配置 AccessKey、STS Token、OIDC（OpenID Connect）、RAM 角色等凭证信息，无需在配置文件中明文存储密钥。

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_ACCESS_KEY_ID` | AccessKey ID。 |
| `ALIBABA_CLOUD_ACCESS_KEY_SECRET` | AccessKey Secret。 |
| `ALIBABA_CLOUD_SECURITY_TOKEN` | STS 临时安全令牌。与 AccessKey ID 和 AccessKey Secret 配合使用。 |
| `ALIBABA_CLOUD_CREDENTIALS_URI` | CredentialsURI 模式的凭证服务地址。无别名。 |
| `ALIBABA_CLOUD_OIDC_PROVIDER_ARN` | OIDC 身份提供商的 ARN（Alibaba Cloud Resource Name）。 |
| `ALIBABA_CLOUD_OIDC_TOKEN_FILE` | OIDC Token 文件路径。 |
| `ALIBABA_CLOUD_ROLE_ARN` | RAM 角色 ARN，适用于 RamRoleArn 和 ChainableRamRoleArn 认证模式。 |
| `ALIBABA_CLOUD_EXTERNAL_ID` | 外部 ID，用于跨账号角色扮演场景。 |
| `ALIBABA_CLOUD_SSO_CLIENT_ID` | Cloud SSO OIDC 客户端 ID。设置后覆盖 CLI 内置的默认客户端 ID。 |

关于各凭证类型的配置方法和适用场景，请参见[配置凭证](https://help.aliyun.com/document_detail/121193.html)。

### 配置选择

控制 CLI 使用哪个配置（Profile）。

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_PROFILE` | 指定使用的配置名称，等同于 `--profile` 参数。 |
| `ALIBABA_CLOUD_IGNORE_PROFILE` | 设为 `TRUE`（必须全大写，区分大小写）时，CLI 忽略配置文件中的 Profile，仅使用环境变量提供的凭证。 |

## 区域与接入点

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_REGION_ID` | 默认区域 ID，例如 `cn-hangzhou`。 |
| `ALIBABA_CLOUD_ENDPOINT` | 自定义 API 接入点地址。设置后 CLI 直接使用该地址发送请求，不再自动解析接入点。 |
| `ALIBABA_CLOUD_ENDPOINT_TYPE` | 接入点类型。例如设为 `vpc` 使用 VPC 内网接入点，留空或不设置使用公网接入点。 |

## 插件管理
控制插件的自动安装行为、存储位置和下载源。

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL` | 设为 `true` 时，CLI 在调用插件命令时自动安装缺失的插件。 |
| `ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL_ENABLE_PRE` | 设为 `true` 时，允许自动安装预发布版本的插件。 |
| `ALIBABA_CLOUD_CLI_PLUGINS_DIR` | 自定义插件安装目录。默认为 `\~/.aliyun/plugins/`。 |
| `ALIBABA_CLOUD_CLI_PLUGIN_NO_CACHE` | 设为 `true` 或 `1` 时，绕过插件索引缓存，每次从远端获取最新索引。 |
| `ALIBABA_CLOUD_CLI_PLUGIN_SOURCE_BASE` | 自定义插件下载源的基础 URL。适用于内网环境或私有镜像场景。 |

## 网络、超时与语言
CLI 从当前 Profile 中解析以下设置后自动传递给插件子进程。如需调整超时和重试策略，建议通过 `aliyun configure` 命令或直接编辑配置文件。

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_READ_TIMEOUT` | I/O 读超时，单位为秒。 |
| `ALIBABA_CLOUD_CONNECT_TIMEOUT` | 连接超时，单位为秒。 |
| `ALIBABA_CLOUD_RETRY_COUNT` | 请求失败时的重试次数。 |
| `ALIBABA_CLOUD_LANGUAGE` | CLI 语言设置。可选值为 `en`（英文）或 `zh`（中文）。 |
