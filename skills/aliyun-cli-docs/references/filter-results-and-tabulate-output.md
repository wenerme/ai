阿里云 CLI 命令的返回结果为 JSON 格式。通过 `--cli-query` 选项可使用 JMESPath 表达式提取特定字段（输出仍为 JSON），通过 `--output` 选项可将结果转为表格显示。两者也可组合使用：先过滤，再表格化。
**说明**

使用本文中的命令前，需要先安装并配置阿里云 CLI。具体操作，请参见[安装CLI（Linux）](https://help.aliyun.com/document_detail/121541.html) 和[配置凭证](https://help.aliyun.com/document_detail/121193.html)。

## 使用 --cli-query 过滤 JSON 输出
`--cli-query` 选项接受 [JMESPath](http://jmespath.org/) 表达式，过滤 API 返回的 JSON 结果。输出仍为 JSON 格式，适合在脚本中使用或通过 `jq` 等工具进一步处理。

基本语法：

```shell
aliyun <product> <operation> --cli-query "<JMESPath表达式>"
```

以下示例均基于 ECS describe-instances 的返回结果，演示常见过滤用法。

### 示例一：提取单个字段列表

提取所有实例的 `InstanceId`。

```shell
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-query "Instances.Instance[].InstanceId"
```

返回结果示例：

```json
[
  "i-1234567891234567****",
  "i-abcdefghijklmnop****"
]
```

### 示例二：提取多个字段

同时提取 `InstanceId` 和 `Status` 两个字段。

```shell
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-query "Instances.Instance[].[InstanceId,Status]"
```

返回结果示例：

```json
[
  [
    "i-1234567891234567****",
    "Stopped"
  ],
  [
    "i-abcdefghijklmnop****",
    "Running"
  ]
]
```

### 示例三：条件过滤

仅返回状态为 `Running` 的实例 ID。

```shell
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-query "Instances.Instance[?Status=='Running'].InstanceId"
```

返回结果示例：

```json
[
  "i-abcdefghijklmnop****"
]
```

### 示例四：重塑输出结构

使用 JMESPath 的多选哈希表达式，将返回结果重新组织为自定义键名的对象数组。

```shell
aliyun ecs describe-instances --biz-region-id cn-hangzhou --cli-query "Instances.Instance[].{id:InstanceId,status:Status}"
```

返回结果示例：

```json
[
  {
    "id": "i-1234567891234567****",
    "status": "Stopped"
  },
  {
    "id": "i-abcdefghijklmnop****",
    "status": "Running"
  }
]
```

**说明**

以上示例仅覆盖常用语法。JMESPath 还支持管道表达式、内置函数等高级功能，完整语法请参见 [JMESPath Tutorial](http://jmespath.org/tutorial.html)。

如果 `--cli-query` 返回 `null`，请检查表达式中的字段名是否与 API 返回的 JSON 键名完全一致（区分大小写）。

## 选型指引
根据使用场景选择合适的选项：

| **场景** | **适用选项** | **说明** |
| --- | --- | --- |
| 在脚本中提取特定值 | `--cli-query` | 输出为 JSON，方便 `jq` 等工具继续处理 |
| 在终端中快速浏览数据 | `--output` | 表格形式更易读 |
| 先过滤数据再表格化显示 | 两者组合使用 | `--cli-query` 先过滤或重塑数据，`--output` 再转为表格。参见下方过滤示例中的示例四。 |

## --output 选项字段说明
阿里云 CLI 提供 `--output` 选项，用于提取返回结果中的指定字段并以表格形式输出。

`--output` 选项包含以下字段：

| **字段名** | **描述** | **示例值** |
| --- | --- | --- |
| cols | 表格列名。 使用 `--output` 选项时需要以 `cols="\<column1\>,\<column2\>"` 形式确定表格与数据的映射关系。多个列名之间使用逗号 `,` 隔开。 - 若 JSON 数据为 `object` 键值对类型，该字段需要与数据对应键名保持一致。 ; - 若 JSON 数据为 `array` 数组类型，该字段可自定义显示名称，同时需要手动添加数组元素索引。列名与索引之间使用冒号 `:` 隔开。 | - `object` 类型：cols="InstanceId,Status" ; - `array` 类型：cols="name:0,type:1" |
| rows | 表格行数据的来源路径，使用 JMESPath 语法指定 JSON 结果中的数据位置。 | rows="Instances.Instance\[\]" |
| num | 开启行号显示。 设置为 `true` 时，阿里云 CLI 在表格左侧新增行号列，起始行号为 `0`（非 1）。默认值为 `false`。 | num="true" |

## 过滤示例
### 示例场景

阿里云产品的查询接口会返回 JSON 结构化数据，不方便阅读。

1. 以查询所有 ECS 实例信息为例，执行如下命令。

   ```shell
   aliyun ecs describe-instances --biz-region-id cn-hangzhou
   ```

2. 系统显示类似如下输出结果（部分省略）。

   ```json
   {
     "PageNumber": 1,
     "TotalCount": 2,
     "PageSize": 10,
     "RequestId": "2B76ECBD-A296-407E-BE17-7E668A609DDA",
     "Instances": {
       "Instance": [
         {
           "ImageId": "ubuntu_16_0402_64_20G_alibase_20171227.vhd",
           "InstanceTypeFamily": "ecs.xn4",
           "VlanId": "",
           "InstanceId": "i-1234567891234567****",
           "Status": "Stopped",
           "SecurityGroupIds": {
             "SecurityGroupId": [
               "sg-bp12345678912345****",
               "sg-bp98765432198765****"
             ]
           }
         },
         {
           "ImageId": "ubuntu_16_0402_64_20G_alibase_20171227.vhd",
           "InstanceTypeFamily": "ecs.xn4",
           "VlanId": "",
           "InstanceId": "i-abcdefghijklmnop****",
           "Status": "Running",
           "SecurityGroupIds": {
             "SecurityGroupId": [
               "sg-bp1abcdefghijklm****",
               "sg-bp1zyxwvutsrqpon****"
             ]
           }
         }
       ]
     }
   }
   ```

### 示例一

1. 执行如下命令，过滤示例场景返回结果中的字段 `RequestId`。该字段作为根元素，无需指定 `rows` 字段。

   ```shell
   aliyun ecs describe-instances --biz-region-id cn-hangzhou --output cols=RequestId
   ```

2. 系统显示类似如下输出结果。

   ```text
   RequestId
   ---------
   2B76ECBD-A296-407E-BE17-7E668A609DDA
   ```

### 示例二

1. 执行如下命令，过滤示例场景返回结果中的字段 `InstanceId` 以及 `Status`。这两个字段所在的 JMESPath 路径为 `Instances.Instance[]`，因此指定 `rows="Instances.Instance[]"`。具体 JMESPath 书写方法，请参见 [JMESPath Tutorial](http://jmespath.org/tutorial.html)。

   ```shell
   aliyun ecs describe-instances --biz-region-id cn-hangzhou --output cols="InstanceId,Status" rows="Instances.Instance[]"
   ```

2. 系统显示类似如下输出结果。

   ```text
   InstanceId             | Status
   ----------             | ------
   i-12345678912345678123 | Stopped
   i-abcdefghijklmnopqrst | Running
   ```

3. 如果需要输出行号，则指定 `num=true`，系统显示类似如下输出结果。

   ```text
   Num | InstanceId             | Status
   --- | ----------             | ------
   0   | i-12345678912345678123 | Stopped
   1   | i-abcdefghijklmnopqrst | Running
   ```

### 示例三

1. 执行如下命令，过滤示例场景返回结果中的数组类型字段 `SecurityGroupId` 的具体元素。数组所在的 JMESPath 路径为 `Instances.Instance[].SecurityGroupIds.SecurityGroupId`。

   ```shell
   aliyun ecs describe-instances --biz-region-id cn-hangzhou --output cols="sg1:0,sg2:1" rows="Instances.Instance[].SecurityGroupIds.SecurityGroupId"
   ```

2. 系统显示类似如下输出结果。

   ```text
   sg1                     | sg2
   ---                     | ---
   sg-bp11234567891234**** | sg-bp19876543219876****
   sg-bp1abcdefghijklm**** | sg-bp1zyxwvutsrqpon****
   ```
