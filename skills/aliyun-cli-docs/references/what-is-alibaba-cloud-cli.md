阿里云 CLI（Alibaba Cloud CLI）是一个开源的跨平台命令行工具，用于管理阿里云资源。你可以在终端中完成控制台的几乎所有操作，并将命令组合为脚本实现自动化运维。

## 为什么用 CLI
CLI 采用插件化架构。执行某个云产品的命令时，CLI 可自动下载对应插件：无需预装全部产品的工具包。当前已覆盖 ECS、RDS、OSS、SLB、FC 等 300+ 云产品。

### 脚本化与自动化

控制台需要多次点击的操作，CLI 一条命令即可完成。你可以将命令写入 Shell 脚本，用于批量创建资源、定时清理、CI/CD 流水线等场景。

例如：批量查询所有地域的 ECS 实例：

```bash
for region in cn-hangzhou cn-shanghai cn-beijing; do
  aliyun ecs describe-instances --biz-region-id "$region" --pager
done
```

### 多环境切换

CLI 支持保存多套凭证配置。通过 `--profile` 参数在开发、测试、生产环境间一键切换，无需反复登录：

```bash
aliyun ecs describe-instances --profile dev
aliyun ecs describe-instances --profile prod
```

### 管道与生态协作

CLI 输出标准响应，可直接通过管道与 `jq`、`grep`、`awk` 等工具配合处理。

例如：提取当前地域所有运行中实例的 ID：

```bash
aliyun ecs describe-instances --biz-region-id cn-hangzhou --pager \
  | jq -r '.Instances.Instance[] | select(.Status=="Running") | .InstanceId'
```

### AI Agent 集成

CLI 基于纯文本交互，适合 AI Agent 调用。

CLI 内置 MCP 认证代理（`aliyun mcp-proxy`），用于简化第三方 AI 应用（如 Dify、LangChain）与 OpenAPI MCP Server 的对接。

启动 MCP 代理，启动本地认证代理，AI Agent 应用通过 <http://127.0.0.1:8088> 访问 OpenAPI MCP Server：

```bash
aliyun mcp-proxy --port 8088
```

了解配置详情可参见[使用 aliyun mcp-proxy 代理 OpenAPI MCP Server](https://help.aliyun.com/document_detail/3033648.html)。

## 支持的运行环境
* Linux（Bash、Zsh 等）

* macOS 终端

* Windows（命令提示符、PowerShell）

* 远程环境（SSH 连接 ECS、[使用云命令行](https://help.aliyun.com/document_detail/102374.html)）

## 版本信息
查看本地已安装版本，最新版本见 [GitHub Releases](https://github.com/aliyun/aliyun-cli/releases/latest)：

```bash
aliyun version
```

**说明**

3.3.0 之前的版本已停止维护，不再提供功能更新和问题修复。如需升级，请参见[从旧版迁移到插件版 CLI](https://help.aliyun.com/document_detail/3032942.html)。

阿里云 CLI 源码托管在 [GitHub aliyun-cli 仓库](https://github.com/aliyun/aliyun-cli)。如有问题或建议，可通过 [GitHub Issues](https://github.com/aliyun/aliyun-cli/issues/new) 提交反馈。

## 相关文档
* [支持CLI的云产品](https://help.aliyun.com/document_detail/2990927.html)

* [安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)
