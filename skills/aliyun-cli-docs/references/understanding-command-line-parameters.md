阿里云 CLI 命令行参数分为控制 CLI 行为的全局参数和传递给子命令的业务参数。本文介绍如何查看可用参数、书写各类型参数值，以及使用自动补全功能。

## **前提条件**
* 已安装阿里云 CLI 3.3.0 或更高版本。安装方法，请参见[安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)。如当前版本低于 3.3.0，请参见[从旧版迁移到插件版 CLI](https://help.aliyun.com/document_detail/3032942.html)完成迁移。

* 确保阿里云 CLI 已配置凭证。配置方法，请参见[配置与管理身份凭证](https://help.aliyun.com/document_detail/121193.html)。

## 参数类型
CLI 命令由命令、子命令和参数（parameters）组成：

```bash
aliyun <command> <sub-command> [parameters]
```

参数分为两类：

* **全局参数**：控制 CLI 自身行为，如地域选择、输出格式、分页查询等。适用于所有命令。

* **业务参数**：传递给子命令的请求字段，不同操作的业务参数不同。

如下示例中，`--help`为全局参数，`--biz-region-id`为业务参数：

```bash
aliyun ecs describe-instances --help
aliyun ecs describe-instances --biz-region-id cn-hangzhou
```

### 全局参数

以下参数适用于所有插件命令，包括指定地域、分页查询、启用预演模式等：

| **参数** | **类型** | **作用** |
| --- | --- | --- |
| `--region` | string | 指定地域 ID，如`cn-hangzhou`。覆盖配置中的默认地域。 |
| `--endpoint` | string | 指定 API 接入点地址，通常无需手动设置。 |
| `--cli-query` | string | 使用 JMESPath 表达式过滤输出结果。 |
| `--pager` / `--all-pages` | list | 自动合并分页 API 的所有页面结果。`--all-pages`是`--pager`的别名。 |
| `--cli-dry-run` | bool | 预演模式：执行参数校验并打印请求内容，不实际发送请求。插件式命令使用此参数替代旧版`--dryrun`。 |
| `--cli-ai-mode` | bool | AI 辅助模式，启用后会在本次 API 请求的 User-Agent 中加入AI标识。 |
| `--log-level` | string | 设置日志输出级别，用于调试和排查问题。可选项：`DEBUG` / `INFO` / `WARN` / `ERROR` |
| `-q` / `--quiet` | bool | 静默模式：不输出 API 返回结果。适用于脚本和 CI/CD 场景。 |
| `-h` / `--help` | bool | 显示帮助信息。 |

**说明**

`--cli-dry-run`与`--pager`和`--quiet`互斥，不能同时使用（预演模式不发送实际请求）。

### 业务参数

业务参数是传递给子命令的请求字段，不同操作的业务参数不同。

```bash
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-dry-run
```

业务参数的数据类型由 API 定义，常见类型包括：

* **String**：字符串，如实例 ID、名称。

* **Integer**：整数，如页码、数量。

* **Boolean** ：布尔值，`true`或`false`。

* **Array / JSON**：数组或 JSON 对象，如磁盘 ID 列表、标签对象。

**内置命令支持参数获取方式**
内置命令集成在阿里云 CLI 核心程序中，无需额外安装插件即可直接使用。

**适用场景**

* **CLI 自身管理**：执行配置凭证、管理插件、查看帮助等与 CLI 运行环境相关的操作。

* **核心集成工具** ：调用已嵌入 CLI 核心的云产品工具命令，如 `ossutil`、`otsutil` 等。

* **旧版命令兼容**：在未安装对应插件，或阿里云 CLI 版本低于 3.3.0 时，使用旧版 CLI 命令。

**常用操作**

* **查看所有内置命令** ：执行 `aliyun --help`，在输出结果的 `Commands` 段落中获取完整列表。

* **查询命令参数** ：执行 `aliyun <command> --help`（如 `aliyun configure --help`）。该帮助信息是确认参数可用性的唯一依据。

## 发现参数
可通过 CLI 帮助信息和在线 OpenAPI 门户查看命令支持的参数。

### 使用 CLI 帮助信息

在命令后添加`--help`，查看该命令支持的所有参数及其说明。根据命令类型不同，帮助信息的格式有所差异。

#### **内置命令**

内置命令集成在阿里云 CLI 核心程序中，无需额外安装插件即可直接使用，如`configure`。内置命令帮助信息显示子命令或特定选项：

```bash
aliyun configure --help
```

帮助信息输出：

```bash
configure credential and settings

Usage:
  aliyun configure --mode {AK|RamRoleArn|EcsRamRole|OIDC|External|CredentialsURI|ChainableRamRoleArn|CloudSSO|OAuth} --profile <profileName> [--config-path <configPath>]

Commands:
  get             print configuration values
  set             set config in non interactive mode
  list            list all config profile
  delete          delete the specified profile
  switch          switch default profile
  safety-policy   manage safety policy and human-in-the-loop rules
  ai-mode         manage global AI mode and User-Agent for API calls
  plugin-settings manage global plugin system settings
```

#### **插件命令**

云产品插件命令的帮助信息显示参数名（kebab-case 风格），包含参数类型和默认值说明：

```bash
aliyun ecs describe-instances --help
```

帮助信息输出：

```bash
Description: Queries a list of instances and their details based on specified conditions

API Version: 2014-05-26

Usage:
  aliyun ecs describe-instances [parameters]

Parameters:
  --biz-region-id                string (required), The ID of the region where the
                                 instance resides. You can call https://help.aliyun.
                                 com/document_detail/25609.html to query the latest
                                 list of Alibaba Cloud regions
  --additional-attributes        list, The list of other instance attributes
                                 format: --additional-attributes value1 value2 value3
  --device-available             bool, > This parameter is in invitational preview
                                 and is not available for use
......

Global Flags:
  --cli-ai-mode             bool, For this run, enable AI-mode
  --cli-dry-run             bool, Enable dry-run mode: print request details
                            without sending the actual API call
  --cli-query               string, Use `--cli-query <jmespath>` to filter
                            output with JMESPath expression
  --endpoint                string, Override service endpoint (e.g., --endpoint
                            https://ecs.cn-hangzhou.aliyuncs.com)
......

Examples:
  aliyun ecs describe-instances --biz-region-id example-value
  aliyun ecs describe-instances --biz-region-id example-value --vpc-id example-value
```

**旧版CLI命令（OpenAPI风格）**
旧版CLI命令的帮助信息显示参数名（通常为PascalCase 风格），参数信息来自 API 元数据：

```bash
aliyun ecs DescribeInstances --help
```

帮助信息输出：

```bash
Product: Ecs (Elastic Compute Service)

Parameters:
  --RegionId String  Required

  The region ID of the instance. You can call the [DescribeRegions](~~25609~~) operation to query the most recent region list.

  --AdditionalAttributes.n RepeatList Optional

  The additional instance attributes.
......
```

### 使用 OpenAPI 门户

阿里云 OpenAPI 门户支持在线调试 API 并自动生成 CLI 命令示例。具体操作，请参见[生成并调用命令](https://help.aliyun.com/document_detail/110848.html)。

## 参数值
参数值的传入方式因数据类型和操作系统环境而异。

### 常见类型参数值

| **数据类型** | **格式** | **示例** |
| --- | --- | --- |
| Integer | 直接传入数值，无需引号 | `--page-size 10` |
| String | 不含特殊字符时直接传入，含特殊字符时用引号括起 | `--instance-id i-bp1234\*\*\*\*` |
| Boolean | 打开或关闭某一选项的标志。例如，出现`--dry-run`就是开启，不出现就是关闭。 | `--dry-run` |
| String 列表 | 多个值用逗号分隔，整体用引号括起 | `--image-id 'm-bp1\*\*\*\*,m-bp2\*\*\*\*'` |
| JSON 数组 | JSON 格式字符串，外层用引号括起 | `--disk-ids '\["d-bp1\*\*\*\*","d-bp2\*\*\*\*"\]'` |
| 日期 | ISO 8601 格式：`YYYY-MM-DDThh:mm:ssZ` | `--start-time 2024-11-28T15:00:00Z` |

不同操作系统和终端环境对引号的处理方式不同。传入含特殊字符的参数值时，按以下规则选择引号：

| **环境** | **通常引号** | **--body 选项引号** |
| --- | --- | --- |
| Linux / macOS | 单引号`''` | 双引号`""` |
| Windows 命令提示符 | 双引号`""` | 双引号`""` |
| Windows PowerShell | 单引号`''` | 单引号`''` |

### JSON 参数值

部分命令参数要求传入 JSON 格式的值。外层引号和内部引号的选择因操作系统而异。

#### **JSON 数组**

* Linux / macOS：外层单引号，内部双引号。

  ```bash
  aliyun ecs describe-disks --disk-ids '["d-bp1****","d-bp2****","d-bp3****"]' --biz-region-id cn-hangzhou
  ```

* Windows（命令提示符及 PowerShell）：外层双引号，内部单引号。

  ```shell
  aliyun ecs describe-disks --disk-ids "['d-bp1****','d-bp2****','d-bp3****']" --biz-region-id cn-hangzhou
  ```

#### **JSON 对象**

当参数值为 JSON 对象时，各 JSON 对象用大括号`{}`包含，对象内的键值用冒号`:`分隔。

* Linux / macOS：

  ```bash
  aliyun slb add-backend-servers --load-balancer-id lb-bp1**** --backend-servers '[{"ServerId":"i-bp1****"},{"ServerId":"i-bp2****"}]'
  ```

* Windows（命令提示符及 PowerShell）：

  ```shell
  aliyun slb add-backend-servers --load-balancer-id lb-bp1**** --backend-servers "[{'ServerId':'i-bp1****'},{'ServerId':'i-bp2****'}]"
  ```

### 含特殊字符的参数值

#### **参数值以横线（-）开头**

当参数值以`-`开头时，CLI 可能将其误判为另一个参数名：

```bash
aliyun ecs AuthorizeSecurityGroup --SecurityGroupId 'sg-bp67acfmxazb4p****' --Permissions.1.PortRange "-1/-1" --method POST --force
```

将参数名和参数值用等号连接即可解决：

```bash
aliyun ecs AuthorizeSecurityGroup --SecurityGroupId 'sg-bp67acfmxazb4p****' --Permissions.1.PortRange=-1/-1 --method POST --force
```

#### **Shell 特殊字符**

参数值包含 Shell 特殊字符（`$`、`````、`\`、空格等）时，必须用引号括起。Linux / macOS 中使用单引号可以防止 Shell 解析特殊字符；Windows 命令提示符中使用双引号。

```shell
# Linux/macOS/PowerShell
aliyun ecs describe-images --image-name 'Example Image'
# Windows CMD
aliyun ecs describe-images --image-name "Example Image"

# Linux/macOS
aliyun xxx --param '$literal_dollar'
```

### 从文件加载参数值

当参数值内容较长（如证书、大段 JSON）时，从本地文件加载参数值更为方便。

#### **--body-file（RESTful 调用）**

RESTful 风格 API 调用中，使用`--body-file`从本地文件加载 HTTP 请求体。

```shell
aliyun cs PUT /clusters/c1234****/nodepools/np5678**** --body-file request.json
```

#### **Shell 命令替换与 Here-Doc**

也可以使用 Shell 的命令替换（`$(cat ...)`）或 Here-Doc 将文件内容传入`--body`参数：

```shell
# 命令替换
aliyun cs PUT /clusters/c1234****/nodepools/np5678**** --body "$(cat request.json)"

# Here-Doc（适合脚本内联构造 JSON）
aliyun cs PUT /clusters/c1234****/nodepools/np5678**** --body "$(cat <<EOF
{
  "nodepool_info": {
    "name": "default-nodepool",
    "resource_group_id": "rg-acfmyvw****"
  }
}
EOF
)"
```

**说明**

Shell 命令替换与 Here-Doc仅适用于 bash 或 zsh 环境。Windows 环境请使用`--body-file`。

## 命令自动补全
阿里云 CLI 支持命令自动补全功能，启用后按 Tab 键可自动补全产品名、操作名和参数名。
**说明**

自动补全仅支持 Linux 和 macOS 系统的 bash 或 zsh 环境。自动补全覆盖产品名、操作名和参数名，不覆盖参数值。

执行以下命令启用自动补全：

```bash
aliyun auto-completion
```

启用后，执行以下命令使配置立即生效（或重新打开终端）：

```bash
# bash
source ~/.bash_profile

# zsh
source ~/.zshrc
```

验证自动补全是否生效：输入`aliyun `后按 Tab 键，如果有候选命令列表（如`configure`），则表示自动补全已启用。

如需关闭自动补全，执行：

```bash
aliyun auto-completion --uninstall
```

## 常见问题
### --help显示 Optional 的参数是否一定可以不传？

不一定。部分命令存在互斥参数（即二选一），此类参数单独均为非必填，但至少需指定其中一个，否则将报错。具体必填规则请以对应产品的 API 文档为准。

## 相关文档
* [过滤且表格化输出结果](https://help.aliyun.com/document_detail/122111.html)
