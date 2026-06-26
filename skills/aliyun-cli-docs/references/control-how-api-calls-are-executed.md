使用阿里云 CLI 调用 API 时，你可能需要一次性拉取所有分页数据、等待资源创建完成再继续、或者先验证命令是否正确而不实际执行。本文介绍实现这三种场景的全局参数及其配置方法。

## 选择合适的参数
三者都是全局参数，作用于单次 API 调用。根据场景选择：

| **场景** | **参数** |
| --- | --- |
| 列表 API 只返回一页，要拿全部数据 | `--pager` |
| 创建资源后等待状态就绪 | `--waiter` |
| 验证命令正确性，不实际执行 | `--cli-dry-run` |

### 互斥规则

* `--pager`和 `--waiter`不能同时使用。同时指定时 CLI 报错：`ERROR: flag --pager is exclusive with --waiter`。

* `--cli-dry-run`可与`--pager`或 `--waiter`共存，但请求不会发出，因此分页和轮询均不会执行。

## 自动聚合所有分页（`--pager`）
### 基本用法

在任何支持分页的 List/Describe 类 API 后追加 `--pager`，CLI 自动逐页调用并合并为单次输出返回。

```bash
aliyun ecs describe-instances --biz-region-id cn-hangzhou --pager
```

### 两种分页聚合模式

CLI 自动判断使用哪种模式，无需手动指定。

* **PageNumber****模式** ：API 返回中含 `PageNumber` + `PageSize` + `TotalCount` 字段，CLI 递增页码直到取完所有页。

* **NextToken****模式** ：API 返回中含 `NextToken` 字段，CLI 将上次返回的 `NextToken` 值作为下次请求参数，直到 `NextToken` 为空字符串。

**说明**

若响应中存在 `NextToken` 字段且值非空，则使用 `NextToken` 模式，否则使用 `PageNumber` 模式。

### 字段映射

以下子参数全部为非必填。仅当 API 使用非默认字段名返回数据时才需要指定：告诉 CLI 该 API 用什么字段名表示分页信息。大多数 API 直接加`--pager`参数即可。

| **子参数** | **默认值** | **何时需要指定** |
| --- | --- | --- |
| `path` | （无） | 响应中数据数组路径非顶层时（如`Vpcs.Vpc\[\]`） |
| `PageNumber` | PageNumber | API 用其他字段名表示页码时 |
| `PageSize` | PageSize | API 用其他字段名表示每页大小时 |
| `TotalCount` | TotalCount | API 用其他字段名表示总记录数时 |
| `NextToken` | NextToken | API 用其他字段名表示翻页标记时 |

语法：`--pager key=value key=value`，多个子参数空格分隔。`value` 是 API 响应中的实际字段名，不是具体数值。例如 `PageNumber=CurrentPage`表示该 API 用 `CurrentPage` 字段表示页码，而不是指定从某一页开始。

### 指定字段映射示例

API 的数据在 `Vpcs.Vpc[]`路径下：

```bash
aliyun vpc describe-vpcs --biz-region-id cn-hangzhou --pager path=Vpcs.Vpc[]
```

API 用 `Token` 而非 `NextToken`（`xxx`、`list-yyy`为占位命令）：

```bash
aliyun xxx list-yyy --biz-region-id cn-hangzhou --pager NextToken=Token
```

## 等待资源状态就绪（`--waiter`）
### 基本用法

CLI 重复调用当前命令，用`expr`表达式从每次响应中取值，当取到的值等于`to`时停止轮询并返回最后一次响应。未指定`timeout`和`interval`时，CLI 默认每 5 秒查询一次，最多等待 180 秒（3 分钟）。

```bash
aliyun ecs describe-instances \
  --biz-region-id cn-hangzhou \
  --instance-ids '["i-bp1xxxxx"]' \
  --waiter expr='Instances.Instance[0].Status' to=Running
```

### 子参数

| **子参数** | **必填** | **默认值** | **取值范围** | **说明** |
| --- | --- | --- | --- | --- |
| `expr` | 是 | --- | --- | 通过 [JMESPath](http://jmespath.org/) 表达式指定 JSON 响应中要轮询的字段。 |
| `to` | 是 | --- | --- | 目标值。当`expr`的求值结果与该值匹配时，停止轮询并返回数据。 |
| `timeout` | 否 | 180 | 1\~600（秒） | 轮询的最大等待时间。超过该时间仍未匹配目标值时，CLI 报错并退出。 |
| `interval` | 否 | 5 | 2\~10（秒） | 两次轮询之间的时间间隔。 |

* `expr`指向的字段必须是字符串类型。如果 API 响应中该字段是数字或 JSON 布尔值（`true/false`），CLI 立即报错。

* `to`的值始终按字符串比较。数字状态写`to=1`（不是`to=1.0`）；如果 API 以字符串形式返回布尔值（如 `"true"`），写`to=true`。

* 轮询过程中如果 API 调用返回 HTTP 错误，CLI 立即停止轮询并输出错误信息，不会继续重试。

* 超过 `timeout` 时间仍未匹配目标值时，CLI 以非零退出码退出，`stderr` 输出格式如下：

  ```bash
  wait 'Instances.Instance[0].Status' to 'Running' timeout(180seconds), last='Pending'
  ```

  其中`last`为最后一次轮询取到的实际值。

### 控制轮询频率

缩短轮询间隔（最多等待 30 秒，每 2 秒查询一次）：

```bash
aliyun ecs describe-instances \
  --biz-region-id cn-hangzhou \
  --instance-ids '["i-bp1xxxxx"]' \
  --waiter expr='Instances.Instance[0].Status' to=Running timeout=30 interval=2
```

延长等待时间，适用于启动较慢的资源（等待 10 分钟，每 10 秒查一次）：

```bash
aliyun ecs describe-instances \
  --biz-region-id cn-hangzhou \
  --instance-ids '["i-bp1xxxxx"]' \
  --waiter expr='Instances.Instance[0].Status' to=Running timeout=600 interval=10
```

## 验证命令但不执行（`--cli-dry-run`）
### 基本用法

布尔开关，加上即生效，无需赋值。CLI 构造完整请求，打印请求详情但不发送到服务端。

```bash
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-dry-run
```

### 输出内容

输出包含：HTTP 方法、`Endpoint`、`API Action`、`Query Parameters`。据此可确认 `endpoint` 是否正确、参数序列化是否符合预期。

示例输出：

```bash
============================================================
DRY-RUN MODE: Request Details (No actual API call)
============================================================
Method: POST
URL:
Endpoint: ecs.cn-hangzhou.aliyuncs.com
API Version: 2014-05-26
API Action: DescribeInstances
Protocol: HTTPS
Style: RPC
Query Parameters:
RegionId: cn-hangzhou
============================================================
Request NOT sent (dry-run mode)
============================================================
{
   "message": "dry-run mode - no request sent"
}
```

### 典型场景

* 敏感操作执行前预览（如`delete-instance`、`stop-instance`），确认参数正确后再去掉`--cli-dry-run`实际执行。

* CI/CD 流水线中验证命令拼装正确性（不消耗资源、不产生费用）。

## 自动化场景：异步操作完整流程
场景：创建 VPC → 等待状态可用 → 获取全部 VPC 列表。接下来演示三个参数如何配合完成一个完整的异步操作。

### 步骤 1：用--cli-dry-run验证创建命令

```bash
aliyun vpc create-vpc \
    --biz-region-id cn-hangzhou \
    --cidr-block 172.16.0.0/12 \
    --vpc-name test-vpc \
    --cli-dry-run
```

确认 `Endpoint`、参数序列化无误后，去掉 `--cli-dry-run` 实际执行。

### 步骤 2：执行创建并提取 VPC ID

```bash
VPC_ID=$(aliyun vpc create-vpc \
    --biz-region-id cn-hangzhou \
    --cidr-block 172.16.0.0/12 \
    --vpc-name test-vpc \
    --cli-query 'VpcId')
```

`--cli-query`从响应中提取 VPC ID。

### 步骤 3：用--waiter等待实例就绪

CLI 每 5 秒查询一次，直到状态变为 `Available` 或超过 300 秒超时：

```bash
aliyun vpc describe-vpcs \
    --biz-region-id cn-hangzhou \
    --vpc-id "$VPC_ID" \
    --waiter expr='Vpcs.Vpc[0].Status' to=Available timeout=60
```

### 步骤 4：用--pager获取全部 VPC

VPC 较多时不加 `--pager`只返回第一页，可能看不到。因此使用`--pager`确认新建的 VPC 已出现在列表中：

```bash
aliyun vpc describe-vpcs --biz-region-id cn-hangzhou --pager
```

### 步骤 5：删除 VPC （可选）

删除刚才创建的 VPC：

```bash
aliyun vpc delete-vpc --vpc-id $VPC_ID
```

## 常见问题
### `--pager` 和 `--waiter` 能同时用吗？

不能。两者互斥，CLI 报错：`ERROR: flag --pager is exclusive with --waiter`。如需先等资源就绪再获取全量列表，应分为两条命令执行。

## 相关文档
* [安全策略（Safety policy）](https://help.aliyun.com/document_detail/3033456.html)

* [在CLI发出的API请求中增加AI标识](https://help.aliyun.com/document_detail/3033499.html)
