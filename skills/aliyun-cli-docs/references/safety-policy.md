安全策略（safety policy）是阿里云 CLI 的客户端操作防护机制。启用后，CLI 在执行命令前按规则匹配操作，允许、拒绝匹配的操作，或要求人工确认后才执行。

## 功能介绍
安全策略定义了一组规则，每条规则由 pattern（匹配模式）和 action（动作类型）组成：

* `allow`（允许）：显式放行操作，跳过后续规则检查。用于在宽泛的 deny/confirm 规则之前为特定操作创建豁免。

* `deny`（拒绝）：直接拒绝操作，不发送 API 请求。

* `confirm`（确认）：在交互式终端中弹出确认提示，输入 `yes` 后才继续执行。

安全策略同时适用于 OpenAPI 调用（RPC 和 RESTful）和插件命令，是 CLI 全局生效的客户端安全能力。安全策略与服务端 RAM（Resource Access Management）访问控制互补，不替代服务端权限管理。

### 典型场景

* **AI Agent 安全护栏**：当 AI Agent 通过 CLI 执行云资源操作时，安全策略可拦截高危操作（如 Delete 类），要求人工确认或直接拒绝。这是HITL（human-in-the-loop）机制在 AI Agent 场景中的实践。

* **运维防误操作**：为团队的 CLI 环境配置默认规则，防止误执行删除、停止等高危操作。

## 前提条件
* 已安装阿里云 CLI v3.3.14 及以上版本。执行以下命令查看当前版本：

  ```bash
  aliyun version
  ```

* 已完成 CLI 凭证配置。如未配置，执行以下命令进行初始化：

  ```bash
  aliyun configure
  ```

## 管理安全策略
安全策略通过 `aliyun configure safety-policy` 命令族管理。

### 查看当前策略

执行以下命令查看安全策略的完整配置（JSON 格式输出）：

```bash
aliyun configure safety-policy show
```

输出示例：

```json
{
  "enabled": false,
  "rules": []
}
```

### 启用和禁用

```bash
# 启用安全策略
aliyun configure safety-policy enable

# 禁用安全策略
aliyun configure safety-policy disable
```

执行 `aliyun configure safety-policy show` 验证 `enabled` 字段为 `true`。

### 添加规则

命令格式：

```bash
aliyun configure safety-policy add --pattern <pattern> --action <deny|confirm>
```

示例：拒绝所有产品的 Delete 类操作：

```bash
aliyun configure safety-policy add --pattern '*:Delete*' --action deny
```

示例：对 ECS 的 Update 类操作要求人工确认：

```bash
aliyun configure safety-policy add --pattern 'ecs:Update*' --action confirm
```

执行 `aliyun configure safety-policy list` 验证规则已生效。
**说明**

如果添加的 `--pattern` 与已有规则相同，该规则的 action 会被更新，不会重复添加。
**说明**

`aliyun configure safety-policy add` 命令当前仅接受 `deny`、`confirm`、`forbid` 三个 action 值。要使用 `allow` 规则，通过环境变量 `ALIBABA_CLOUD_SAFETY_POLICY_RULES` 设置或直接编辑配置文件。

### 删除规则

通过 `--pattern` 指定要删除的规则：

```bash
aliyun configure safety-policy remove --pattern '*:Delete*'
```

### 查看规则列表

执行以下命令查看所有规则（格式化输出）：

```bash
aliyun configure safety-policy list
```

输出示例：

```text
Safety policy: 已启用
Config file: /home/user/.aliyun/safety-policy.json

Rules:
  1. *:Delete* -> deny
  2. ecs:Update* -> confirm
```

## 规则语法
### pattern 格式

规则的 `--pattern` 参数采用 `产品名:操作名` 格式，支持 `*` 通配符（匹配任意字符序列）。匹配时不区分大小写，即 `*:Delete*`、`*:DELETE*`、`*:delete*` 的匹配范围完全相同。

真正的区分在于匹配目标不同。CLI 根据调用类型构建不同的命令标识符：

| **调用类型** | **匹配目标格式** | **示例** |
| --- | --- | --- |
| RPC API | `产品:API名称` | `ecs:DeleteInstance` |
| RESTful API | `产品:HTTP方法/路径` | `cs:DELETE/clusters` |
| 插件命令 | `产品:子命令` | `fc:delete-function` |

常用 pattern 示例：

| **pattern 示例** | **匹配范围** |
| --- | --- |
| `\*:Delete\*` | 所有产品中名称包含 Delete 的操作（不区分大小写） |
| `ecs:delete-instance` | 仅 ECS 的 delete-instance 操作 |
| `ecs:Update\*` | ECS 的所有 Update 开头的操作 |
| `\*:\*` | 所有产品的所有操作 |

**说明**

在 Shell 中执行命令时，pattern 值建议使用单引号包裹（如 `'*:Delete*'`），避免 Shell 对 `*` 进行通配符展开。

### action 值

| **action** | **行为** |
| --- | --- |
| `allow` | 显式放行操作。在 first-match-wins 规则系统中，将 allow 规则排在宽泛的 deny 或 confirm 规则之前，可为特定操作创建豁免。 |
| `deny` | 直接拒绝操作，返回错误信息，不发送 API 请求。 |
| `confirm` | 在交互式终端中弹出确认提示，输入 `yes` 后才执行操作。 |

`forbid` 是 `confirm` 的别名，运行时行为完全相同。

如果没有规则匹配到当前操作，默认允许执行（等同于隐式 allow）。显式 allow 规则的主要用途是在宽泛的 deny/confirm 规则之前为特定操作创建白名单豁免。

### 匹配优先级

规则按添加顺序从上到下逐条匹配，采用首条匹配优先（first-match-wins）策略：第一条匹配的规则生效，后续规则不再检查。如果没有规则匹配，默认允许执行。

例如，同时存在以下两条规则时：

1. `ecs:Delete*` → confirm

2. `*:Delete*` → deny

执行 `aliyun ecs delete-instance` 时，匹配到第 1 条规则（`ecs:Delete*`），执行 `confirm` 动作，而不是第 2 条的 `deny`。

利用 allow 创建豁免规则：

1. `ecs:Describe*` → allow

2. `ecs:*` → deny

执行 `aliyun ecs DescribeInstances` 时匹配到第 1 条 allow 规则，操作正常执行；执行 `aliyun ecs DeleteInstance` 时匹配第 2 条，被拒绝。
**重要**

规则顺序很重要。添加规则时需注意排列顺序，确保更具体的规则排在更通用的规则之前。

## 非交互模式和 AI Agent 场景
### --yes 标志

命令中指定 `--yes`（或 `-y`）标志时，`confirm` 类规则会被自动跳过（视为已确认）。`deny` 类规则不受影响，仍然拒绝执行。

```bash
# confirm 类规则被跳过，直接执行
aliyun ecs update-instance --InstanceId i-bp1xxxxx --yes

# deny 类规则不受影响，仍然拒绝
aliyun ecs delete-instance --InstanceId i-bp1xxxxx --yes
# 输出：ERROR: operation blocked by safety policy: ecs delete-instance (rule: *:Delete*)
```

### 非交互式终端行为

CLI 通过检测标准输入是否为终端设备来判断当前环境。在非交互式环境（如脚本、CI/CD 管道、AI Agent）中，如果操作匹配到 `confirm` 类规则且未指定 `--yes`，CLI 返回以下错误信息：

```text
安全策略要求确认以下操作：ecs update-instance
当前为非交互环境，无法自动确认。若调用方为智能体，请先向用户说明并征得同意；
用户同意后（可在对话中回复 yes 或「确认」），再使用 --yes 重新执行同一命令。
```

### AI Agent 推荐做法

在 AI Agent 通过 CLI 操作云资源的场景中，按以下步骤配置和使用安全策略：

1. **配置安全策略** ：对高危操作设置 `deny`（完全禁止），对需要确认的操作设置 `confirm`。

2. **处理 confirm 提示** ：Agent 遇到 `confirm` 拦截时，向用户展示要执行的操作内容并征求同意。

3. **重新执行** ：用户同意后，Agent 使用 `--yes` 标志重新执行该命令。

示例配置：禁止 Agent 执行 Delete 类操作，Update 类操作需要人工确认：

```bash
aliyun configure safety-policy enable
aliyun configure safety-policy add --pattern '*:Delete*' --action deny
aliyun configure safety-policy add --pattern '*:Update*' --action confirm
```

## 环境变量
除命令行配置外，还可以通过环境变量控制安全策略。环境变量的优先级高于配置文件。

| **环境变量** | **说明** | **示例** |
| --- | --- | --- |
| `ALIBABA_CLOUD_SAFETY_POLICY_ENABLED` | 覆盖配置文件中的 `enabled` 值。接受 `true`、`false`、`1`、`0`。 | `export ALIBABA_CLOUD_SAFETY_POLICY_ENABLED=true` |
| `ALIBABA_CLOUD_SAFETY_POLICY_RULES` | 覆盖配置文件中的规则列表。格式为 `pattern=action`，多条规则以英文逗号分隔。设置后，配置文件中的规则被完全替换（不是合并）。设为空字符串可清空所有规则。格式无效时保留文件中的规则。 | `export ALIBABA_CLOUD_SAFETY_POLICY_RULES="ecs:Describe\*=allow,\*:Delete\*=deny,ecs:Update\*=confirm"` |
| `ALIBABA_CLOUD_SAFETY_SKIP_CONFIRM` | 设为 `1` 或 `true` 时，跳过确认提示，等同于 `--yes`。 | `export ALIBABA_CLOUD_SAFETY_SKIP_CONFIRM=1` |

**重要**

设置 `ALIBABA_CLOUD_SAFETY_POLICY_RULES` 环境变量后，配置文件中的规则被完全替换，而非合并。

## 配置文件
安全策略的配置保存在 `~/.aliyun/safety-policy.json` 文件中。如果指定了 `--config-path` 选项，`safety-policy.json` 文件位于该自定义目录下。

文件格式示例：

```json
{
  "enabled": true,
  "rules": [
    {
      "pattern": "ecs:Describe*",
      "action": "allow"
    },
    {
      "pattern": "*:Delete*",
      "action": "deny"
    },
    {
      "pattern": "ecs:Update*",
      "action": "confirm"
    }
  ]
}
```

* 如果配置文件不存在，安全策略默认禁用，规则列表为空。首次执行 `enable` 或 `add` 命令时自动创建该文件。

**说明**

安全策略采用失败开放（fail-open）机制：如果策略文件加载失败（如文件损坏），CLI 跳过安全检查，不会阻断命令执行。
