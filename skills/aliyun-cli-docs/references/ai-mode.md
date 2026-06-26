AI 模式（AI Mode）是阿里云 CLI 3.3.3推出的一项标识功能。启用后，CLI 会在所有 API 请求的 User-Agent 中追加 AI 标识段，用于服务端识别请求来源为 AI Agent。

## 功能介绍
AI 模式启用后，CLI 发出的每个 API 请求的 User-Agent 中会追加如下格式的 AI 标识段：

```bash
AlibabaCloud-AIMode/enabled AlibabaCloud-Agent-Skills
```

其中：

* `AlibabaCloud-AIMode/enabled` 是固定前缀，标识 AI 模式已激活。

* `AlibabaCloud-Agent-Skills` 是默认的技能标识段，可自定义为其他值。

AI 标识段的主要作用：

* 服务端可基于 User-Agent 区分 AI Agent 请求和人工操作。

* 支持按 Agent 身份进行审计、限流和统计分析。

**说明**

AI 模式仅影响 User-Agent 标识，不改变 API 调用行为和权限。

## 管理 AI 模式
AI 模式通过 `aliyun configure ai-mode` 命令族管理。

### 查看当前配置

执行以下命令查看 AI 模式的当前配置：

```bash
aliyun configure ai-mode show
```

输出示例：

```json
{
  "enabled": true,
  "user_agent": "",
  "effective_user_agent": "AlibabaCloud-Agent-Skills",
  "request_user_agent_suffix": "AlibabaCloud-AIMode/enabled AlibabaCloud-Agent-Skills",
  "config_file": "/home/user/.aliyun/ai-mode.json"
}
```

字段说明：

| **字段** | **说明** |
| --- | --- |
| `enabled` | AI 模式是否启用。 |
| `user_agent` | 自定义的 User-Agent 技能标识段。为空表示使用默认值。 |
| `effective_user_agent` | 实际生效的技能标识段。自定义值或默认值 `AlibabaCloud-Agent-Skills`。 |
| `request_user_agent_suffix` | 追加到请求 User-Agent 中的完整后缀。 |
| `config_file` | 配置文件路径。 |

### 启用和禁用

执行以下命令启用或禁用 AI 模式：

```bash
# 启用 AI 模式
aliyun configure ai-mode enable

# 禁用 AI 模式
aliyun configure ai-mode disable
```

### 自定义 User-Agent 技能标识段

默认的技能标识段是 `AlibabaCloud-Agent-Skills`。如果需要区分不同的 AI Agent，可以自定义该值：

```bash
# 设置自定义技能标识段
aliyun configure ai-mode set-user-agent --user-agent "MyAgent/1.0"

# 恢复默认值
aliyun configure ai-mode reset-user-agent
```

自定义后，请求的 User-Agent 后缀变为：

```bash
AlibabaCloud-AIMode/enabled MyAgent/1.0
```

## 单命令覆盖
在调用 OpenAPI 时，可以使用命令行标志覆盖全局 AI 模式设置，仅对当前命令生效：

| **标志** | **效果** |
| --- | --- |
| `--cli-ai-mode` | 仅本次命令启用 AI 模式（即使全局未开启）。 |
| `--no-cli-ai-mode` | 仅本次命令关闭 AI 模式（即使全局已开启）。 |

如果同时使用两个标志，`--no-cli-ai-mode` 优先级更高。

示例：

```bash
# 全局未开启 AI 模式，但本次调用追加 AI 标识
aliyun ecs DescribeInstances --cli-ai-mode

# 全局已开启 AI 模式，但本次调用不追加
aliyun ecs DescribeInstances --no-cli-ai-mode
```

## 环境变量
CLI 通过以下环境变量向插件子进程传递 AI 模式状态：

| **环境变量** | **说明** |
| --- | --- |
| `ALIBABA_CLOUD_CLI_AI_MODE` | 值为 `1` 表示 AI 模式已激活。 |
| `ALIBABA_CLOUD_CLI_AI_USER_AGENT` | AI 模式下追加的完整 User-Agent 后缀。例如 `AlibabaCloud-AIMode/enabled AlibabaCloud-Agent-Skills`。 |

**说明**

这两个环境变量由 CLI 主程序在启动插件子进程时自动注入，无需手动设置。如需控制 AI 模式，请通过 `configure ai-mode` 命令或 `--cli-ai-mode` 标志操作。

## 配置文件
如需手动查看或备份AI 模式的配置文件，可在以下路径找到：

| **操作系统** | **存储路径** |
| --- | --- |
| Linux / macOS | `\~/.aliyun/ai-mode.json` |
| Windows | `C:\\Users\\\<USER_NAME\>\\.aliyun\\ai-mode.json` |

文件格式示例：

```json
{
  "enabled": true,
  "user_agent": "MyAgent/1.0"
}
```

字段说明：

| **字段** | **类型** | **说明** |
| --- | --- | --- |
| `enabled` | boolean | 是否启用 AI 模式。默认为 `false`。 |
| `user_agent` | string | 自定义 User-Agent 技能标识段。为空时使用默认值 `AlibabaCloud-Agent-Skills`。 |

**说明**

如果配置文件不存在，AI 模式默认为禁用状态。建议通过 `aliyun configure ai-mode` 命令管理配置，不要手动编辑配置文件。

## 优先级
AI 模式的生效优先级从高到低如下：

1. 命令行标志（`--cli-ai-mode` / `--no-cli-ai-mode`）

2. 配置文件（`ai-mode.json`）

当同时存在命令行标志和配置文件设置时，命令行标志优先。如果同时指定了 `--cli-ai-mode` 和 `--no-cli-ai-mode`，以 `--no-cli-ai-mode` 为准。

## 生效范围
AI 模式的 User-Agent 标识在以下场景生效：

* **OpenAPI 调用** ：通过命令发起的 RPC 和 RESTful 请求，`User-Agent` 中会追加 AI 标识段。

* **插件命令** ：CLI 通过环境变量（`ALIBABA_CLOUD_CLI_AI_MODE` 和 `ALIBABA_CLOUD_CLI_AI_USER_AGENT`）向插件子进程传递 AI 模式状态。插件可据此在自身请求中追加对应标识。

## 附录：子命令参考
以下是 `aliyun configure ai-mode` 下的所有子命令：

| **子命令** | **说明** |
| --- | --- |
| `show` | 查看当前 AI 模式配置。 |
| `enable` | 全局启用 AI 模式。 |
| `disable` | 全局禁用 AI 模式。 |
| `set-user-agent --user-agent \<value\>` | 设置自定义 User-Agent 技能标识段。 |
| `reset-user-agent` | 将技能标识段恢复为默认值 `AlibabaCloud-Agent-Skills`。 |
| `set-ossutil --ossutil \<json\>` | 设置 ossutil 插件专用配置（JSON 格式字符串）。 |
| `reset-ossutil` | 清除 ossutil 插件专用配置。 |
