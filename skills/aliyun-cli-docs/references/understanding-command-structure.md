阿里云 CLI 采用统一的插件化命令结构。本文介绍命令各组成部分的含义，以及如何通过` --help `快速查看可用命令和参数。

## 前提条件
1. 已安装阿里云 CLI 3.3.0 或更高版本。安装方法，请参见[安装/更新 CLI](https://help.aliyun.com/document_detail/121541.html)。

2. 确保阿里云 CLI 已配置凭证。配置方法，请参见[配置与管理身份凭证](https://help.aliyun.com/document_detail/121193.html)。

## 命令格式
### 插件版CLI命令格式

插件版阿里云 CLI 的通用命令结构如下：

```shell
aliyun <command> <sub-command> [parameters]
```

各部分说明：

* `command`：顶级命令，可以是以下两类：

  * 全局命令（无需安装插件）。例如：

    * `configure`（配置凭证和默认参数）。

    * `plugin`（管理插件）。

    * `upgrade`（升级 CLI 主程序）。

    所有全局命令可通过 `aliyun --help` 查看。
  * 云产品插件名。例如 `aliyun-cli-ecs`、`aliyun-cli-oss`、`aliyun-cli-cs`、`aliyun-cli-fc` 等。

* `sub-command`：子命令（SubCommand），指定要执行的具体操作。

  * 当顶级命令为全局命令时，可通过 `aliyun <command> --help` 查看具体参数或子命令。

  * 当顶级命令为云产品插件时，子命令采用 kebab-case 命名。例如 `describe-instances`、`create-bucket`。

* `parameters`：命令参数，用于控制阿里云 CLI 的行为或指定 API 参数。更多参数格式信息，请参见[理解命令行参数](https://help.aliyun.com/document_detail/110340.html)。

  * 业务参数：以 `--` 开头，例如 `--instance-id i-xxx`。

  * 全局参数：影响整个命令行为的通用参数，例如 `--region cn-hangzhou`、`--profile prod`等。

#### **最小可执行示例**

以下命令查询当前账号可访问的地域列表，无需额外参数即可执行：

```shell
aliyun ecs describe-regions
```

#### **插件按需加载**

CLI 插件是独立分发的云产品命令集合，支持按需自动安装：

* 查看已安装插件：

  ```shell
  aliyun plugin list
  ```

* 首次执行时自动安装（CLI ≥ 3.3.0 默认行为）：

  ```shell
  # 若 ecs 插件未安装，CLI 提示下载并缓存
  aliyun ecs describe-instances
  ```

* 手动安装指定插件：

  ```shell
  aliyun plugin install --names ecs
  ```

更多插件管理操作，请参见[管理 CLI 插件](https://help.aliyun.com/document_detail/3024826.html)。

### 旧版CLI命令格式（OpenAPI 风格）

**重要**

阿里云 CLI 自 3.3.0 版本起引入了插件版命令（短横线风格，如 `aliyun ecs describe-regions`），替代了此前的旧版驼峰命令（如 `aliyun ecs DescribeRegions`）。为确保功能完整性与长期稳定性，强烈建议将现有脚本及日常操作迁移至插件版命令。

阿里云云产品 OpenAPI 分为 RPC 和 ROA 两种风格类型，大部分产品使用 RPC 风格。不同风格接口的调用方式不同，使用旧版 OpenAPI 风格命令前需先判断接口类型。一般情况下，每个产品内所有接口的调用风格是统一的，且每个接口仅支持特定的一种风格。更多关于 RPC 风格和 ROA 风格的信息，请参见[OpenAPI 风格](https://help.aliyun.com/document_detail/2618403.html)。

#### **RPC 风格命令结构**

当顶级命令为云产品 Code 且为 RPC 风格时，子命令通常为 OpenAPI 名称。命令结构如下：

```shell
aliyun <ProductCode> <APIName> [Parameters]
```

示例：查询可用地域列表。

```shell
aliyun ecs DescribeRegions
```

#### **ROA 风格命令结构**

ROA 风格 OpenAPI 需要额外指定请求方式 `Method` 和访问路径 `PathPattern`。命令结构如下：

```bash
aliyun <ProductCode> <Method> <PathPattern> [RequestBody] [Parameters]
```

以下示例为您展示如何调用容器服务 Kubernetes 版`DescribeClustersForRegion`接口，查询杭州地域下的ACK专有集群。更多信息，请参见[查询指定地域的集群列表](https://help.aliyun.com/document_detail/2858150.html)。

```bash
aliyun cs GET /regions/cn-hangzhou/clusters --cluster_type Kubernetes
```

ROA 风格 OpenAPI 的帮助信息会额外显示请求方式 Method 和访问路径 PathPattern，便于确认调用格式。

#### **判断 OpenAPI 风格**

可通过以下方式判断接口使用的 OpenAPI 风格：

* 通过`aliyun <command>`后追加 `--help` 参数获取产品可用 OpenAPI 列表。RPC 风格 OpenAPI 的帮助信息显示接口简述，ROA 风格则显示访问路径 `PathPattern`。如：

  ```bash
  # RPC风格
  aliyun ecs --help
  ```

* 在`aliyun <command> <sub-command>`后追加 `--help` 查看参数详情。ROA 风格 OpenAPI 的帮助信息会额外显示接口的请求方式 `Method` 和访问路径 `PathPattern`。如：

  ```bash
  # ROA风格
  aliyun cs AttachInstances --help
  ```

**说明**

自 CLI 3.3.0 起，安装云产品插件后，命令级 `aliyun <command> --help` 将默认展示插件的帮助信息。如需查看原版帮助，请设置环境变量 `ALIBABA_CLOUD_ORIGINAL_PRODUCT_HELP=true`。子命令级 `aliyun <command> <sub-command> --help` 行为保持不变。

## 使用命令帮助信息
阿里云 CLI 提供三级 `--help` 下钻能力。通过在插件名（如 `ecs`）或子命令后追加 `--help` 参数，可以查看可用子命令列表和参数详情。

### 展示全局命令和支持的插件

```shell
aliyun --help
```

### 展示所有子命令

```shell
aliyun ecs --help
```

### 展示参数详情

展示指定子命令的参数列表、是否必填、数据类型、默认值和示例：

```shell
aliyun ecs describe-instances --help
```

### 帮助信息的关键标记

| **标记** | **说明** |
| --- | --- |
| `\[Required\]` | 必填参数 |
| 类型标注 | 参数数据类型，例如 String、Integer、Boolean、Array、JSON |
| 默认值 | 例如 `--output json`（默认为 json） |
| 示例片段 | 通常位于 help 末尾，展示典型调用方式 |

## 常见问题
### 执行命令报错 "Command not found"

该错误表示对应的云产品插件未安装。CLI ≥ 3.3.0 支持首次执行时自动安装。如因网络限制自动安装失败，可手动运行以下命令安装插件：

```shell
aliyun plugin install --names ecs
```

### 如何查看子命令支持的参数

运行 `aliyun <command> <sub-command> --help` 查看完整参数列表。

## 相关文档
* [快速安装云产品CLI插件](https://help.aliyun.com/document_detail/3024826.html)
