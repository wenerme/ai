本文介绍如何从 3.3.0 以下的旧版阿里云 CLI 迁移到插件版。
**说明**

本文面向 3.3.0 以下版本的用户。如果 CLI 版本已是 3.3.0 或更高（通过 `aliyun version`查看），你使用的已是插件版，无需迁移。

## 插件版与旧版的区别
3.3.0 是引入插件架构的版本。自该版本起，CLI 通过插件机制执行云产品操作命令。3.3.0 以下的版本称为"旧版"。

旧版是 OpenAPI 透传代理，命令名直接使用 API 名称（如 `DescribeInstances`），参数与 API 参数一致（如 `--RegionId`）。插件版中，每个云产品的命令由独立插件提供。两者执行相同的云产品操作，但命令名、参数名和输出格式存在差异。
**说明**

**兼容性说明**：升级到 3.3.0+ 后，旧版命令语法仍然可用。你可以按自己的节奏逐步将脚本切换到插件版命令，无需一次性全量改写。

### 对比案例

以`DescribeRegions`API为例，插件版命令：

```bash
aliyun ecs describe-regions --accept-language zh-CN
```

旧版命令：

```bash
aliyun ecs DescribeRegions --AcceptLanguage zh-CN
```

上例差异仅在命名风格。但在更复杂的命令中，插件版可能重新设计了参数名，例如部分命令使用 `--biz-region-id` 而非 `--region-id`，与旧版的`--RegionId` 并非简单的大小写转换。迁移时需通过`<command> --help` 或 OpenAPI门户查看插件版的正确参数名。

### 核心差异

| **改进点** | **旧版（\< 3.3.0）** | **插件版（≥ 3.3.0）** |
| --- | --- | --- |
| 帮助信息 | 元数据生成，仅参数名列表 | 插件内置，含取值范围和用法示例 |
| 产品更新 | 等 CLI 主程序整体发版，云产品新特性更新速度较慢 | 插件独立更新，云产品新特性更新速度快 |
| 插件更新 | 升级整个 CLI 主程序 | 单插件独立更新，不影响其他产品 |
| 命令名 | API Action（`DescribeInstances`） | 统一 kebab-case 风格参数（`describe-instances`） |
| 参数名 | API 参数，风格可能不一致（`--RegionId`） | 统一 kebab-case 风格参数（`--region-id`） |

## 确认当前版本
运行如下命令检查版本号，输出版本号 ≥ 3.3.0 即支持插件版命令，低于 3.3.0 需先升级 CLI：

```bash
aliyun version
```

如需确认某个具体命令是否使用插件版，运行 `aliyun <command> <sub-command> --help`：

* **插件版** ：帮助输出包含全局参数段，参数名通常为 kebab-case 风格（如 `--region-id`）。

* **旧版** ：帮助输出仅有参数段，参数名通常为 PascalCase（如 `--RegionId`）。

## 查找新版写法
插件版命令不是旧命令的简单重命名，无法通过大小写转换完成迁移。以下方式可查找旧命令对应的插件版写法。

### 通过 OpenAPI 门户搜索

已知旧版命令名（即 API 名称）时，这是最直接的方式：

1. 打开 [OpenAPI 门户](https://api.aliyun.com/)。

2. 搜索框中输入旧版命令名（如 `DescribeInstances`），搜索结果会列出匹配的 API。

3. 点击目标 API 进入详情页，填写对应参数值，在右边切换到**CLI 示例**标签页。

4. **CLI 风格（新版）** 下方显示插件版命令，**API 原生风格（旧版）**下方显示旧版命令。复制新版命令替换脚本中的旧命令。

**说明**

部分云产品存在多个 API 版本。插件版 CLI 通过 `--api-version` 参数指定调用的 API 版本。在门户对照新旧命令时，注意选择与当前使用版本一致的 API。

### 通过 CLI 主页浏览

[OpenAPI 门户 CLI 主页](https://api.aliyun.com/api-tools/cli)上，可按云产品浏览所有已支持的插件版命令及参数说明。

### 通过 `--help` 发现命令

安装云产品插件后，通过 `--help` 逐级浏览可用命令和参数。例如查看 ECS 插件的所有命令：

```bash
aliyun ecs --help
```

查看具体命令的用法和参数：

```bash
aliyun ecs describe-instances --help
```

### 通过 CLI Skills 查询

访问 [CLI Skills](https://skills.aliyun.com/skills/alibabacloud-cli-guidance) 安装 skill，通过 Agent 用自然语言描述需求，获取对应的插件版命令写法。

## 执行迁移
### 步骤一：升级 CLI

确认当前版本：

```bash
aliyun version
```

如果版本低于 3.3.0，参见[安装和更新阿里云 CLI](https://help.aliyun.com/document_detail/2877426.html)进行升级。升级无需卸载旧版，已有的凭证配置（`~/.aliyun/config.json`）不受影响。

升级后旧版命令仍可执行，现有脚本不受影响。新产品支持、功能更新和安全修复仅在插件版中提供。

### 步骤二：安装插件

安装需要的云产品插件：

```bash
# 安装单个插件
aliyun plugin install --name ecs

# 批量安装多个插件
aliyun plugin install --names ecs oss vpc
```

也可通过环境变量开启自动安装。执行插件版命令时如果对应插件未安装，CLI 自动下载并安装：

```bash
export ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL=true
```

**说明**

`export` 仅对当前 shell 会话有效。要持久化，将上述命令添加到 shell 配置文件中：

* Bash：`~/.bashrc`

* Zsh：`~/.zshrc`

修改后执行 `source ~/.bashrc`（或 `source ~/.zshrc`）使配置生效。

### 步骤三：验证命令

执行一条插件版命令验证是否工作正常：

```bash
aliyun ecs describe-regions
```

返回地域列表 JSON 即表示插件版命令工作正常。

### 步骤四：更新脚本

逐步将脚本中的旧版命令替换为插件版写法：

1. 识别脚本中的旧版命令。特征是第二个参数为 PascalCase（如 `aliyun ecs DescribeInstances`）。

2. 通过 OpenAPI 门户搜索旧命令名，找到对应的插件版写法。

3. 用插件版命令替换旧命令，参数名也需要一并替换。

4. 测试替换后的脚本。

旧版命令在新版中仍可执行，可按优先级分批迁移。
**说明**

JSON 参数值内的字段名不需要转换。这些字段名由 API 定义，与 CLI 参数命名风格无关。

## 特殊场景
### CI/CD 流水线

非交互式环境下，CLI 不会弹出插件安装提示。处理方式：

* 流水线脚本中预先安装插件：

  ```bash
  aliyun plugin install --names ecs oss vpc
  ```

* 或设置环境变量开启自动安装：

  ```bash
  export ALIBABA_CLOUD_CLI_PLUGIN_AUTO_INSTALL=true
  ```

建议将环境变量写入流水线的全局环境配置中（如 Jenkinsfile 的 `environment` 段、GitHub Actions 的 `env` 段），确保每次构建生效。

### 输出解析脚本

插件版命令的 JSON 输出字段可能与旧版有差异。旧版直接返回 API 响应，插件版可能对输出做处理。如果脚本中使用 `jq`、`grep` 等工具解析 CLI 输出，替换命令后需对比验证输出格式。

### 复杂命令迁移

带复杂参数的命令是迁移中最容易出错的场景。

#### 带复杂 JSON 参数的命令

旧版：

```bash
aliyun slb AddBackendServers \
  --LoadBalancerId lb-xxx \
  --BackendServers '[{"ServerId":"i-aaa","Weight":100},{"ServerId":"i-bbb","Weight":80}]'
```

插件版：

```bash
aliyun slb add-backend-servers \
  --load-balancer-id lb-xxx \
  --backend-servers '[{"ServerId":"i-aaa","Weight":100},{"ServerId":"i-bbb","Weight":80}]'
```

#### 多行 heredoc 参数传递

JSON 参数较长时，使用 heredoc 提高可读性：

```bash
aliyun ecs run-instances \
  --region cn-hangzhou \
  --instance-type ecs.g7.large \
  --image-id ubuntu_22_04_x64_20G_alibase_20230China.vhd \
  --security-group-id sg-xxx \
  --vswitch-id vsw-xxx \
  --system-disk "$(cat <<'EOF'
{"Size":40,"Category":"cloud_essd","PerformanceLevel":"PL1"}
EOF
)"
```

#### 管道组合命令

旧版输出 `pipe jq`处理的场景，获取所有运行中实例的 ID 列表：

```bash
aliyun ecs DescribeInstances --RegionId cn-hangzhou \
  | jq -r '.Instances.Instance[] | select(.Status=="Running") | .InstanceId'
```

插件版输出结构可能不同，需根据实际返回调整 `jq` 路径：

```bash
# 插件版：先用 --help 确认输出结构，再调整 jq 表达式
aliyun ecs describe-instances --region cn-hangzhou \
  | jq -r '.Instances.Instance[] | select(.Status=="Running") | .InstanceId'
```

**说明**

迁移管道命令时，先单独执行插件版命令查看完整输出，确认 JSON 结构与预期一致后再调整 `jq/grep` 表达式。

### 旧版帮助查看

安装产品插件后，`aliyun <command> --help` 优先展示插件帮助信息。如需临时查看旧版帮助，设置环境变量：

```bash
export ALIBABA_CLOUD_ORIGINAL_PRODUCT_HELP=true
```

## 常见问题
### 升级后旧版 PascalCase 命令还能用吗？

可以。CLI ≥ 3.3.0 向前兼容。但建议尽快升级到最新版，以便于获取最新的支持。

### 迁移后凭证需要重新配置吗？

不需要。插件版使用与旧版相同的凭证配置（`~/.aliyun/config.json`），升级后所有已配置的 `profile` 和环境变量凭证照常使用。

### 脚本中能否新旧命令混用？

可以。同一脚本中两种风格共存，建议按优先级渐进替换。

### 插件安装失败怎么办？

按以下顺序排查：

1. 检查网络是否可访问 `aliyuncli.alicdn.com`。

2. 确认插件安装目录 `~/.aliyun/plugins/` 有写入权限。

3. 确认 CLI 版本 ≥ 3.3.0（低版本不支持插件功能）。执行 `aliyun version` 检查。

## 相关文档
* [安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)

* [快速安装云产品CLI插件](https://help.aliyun.com/document_detail/3024826.html)
