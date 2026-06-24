# CQL 搜索语法

CLS Query Language (CQL) 用于搜索和过滤日志。

## 语法总览

| 语法 | 说明 |
|------|------|
| `key:"value"` | 键值搜索（**字符串必须加引号**） |
| `key:123` | 数值搜索（数值不需要引号） |
| `value` | 全文搜索 |
| `AND` / `OR` / `NOT` | 逻辑操作 (不区分大小写) |
| `()` | 分组 |
| `" "` | 精确短语搜索 |
| `*` | 通配符 (不能作为前缀) |
| `> >= < <=` | 数值范围 |
| `key:*` | 字段存在 |
| `key:""` | 字段为空/不存在 |

> **CRITICAL**: 字符串值必须用引号: `mode:"remote"` ✅ / `mode:remote` ❌

AND 优先级高于 OR，建议使用括号明确。

## 示例

```
# 精确匹配
trace_id:"49a5f9454b3fc0274d63b9eac304c96d"
level:"ERROR"
status:"200"

# 全文搜索
"connection timeout"

# 逻辑操作
level:"ERROR" AND pid:1234
level:("ERROR" OR "WARNING")
level:"ERROR" AND NOT pid:1234

# 范围查询
status:>400
latency:>1.5
response_time:>=100 AND response_time:<=500

# 通配符
host:www.test*.com
model:*flux*

# 字段存在/不存在
url:*
error_code:""

# 组合查询
(level:"ERROR" OR level:"WARN") AND service:"api-gateway" AND NOT msg:"health check"
```

## 时间格式

| 格式 | 示例 |
|------|------|
| 简单相对 | `-1h`, `-30m`, `-1d`, `-7d` |
| now 语法 | `now`, `now-1h`, `now/d` (当天开始) |
| ISO8601 | `2024-01-15T10:30:00Z` |

## 日志解析失败

当日志格式不匹配 topic 的解析规则时，会产生 `LogParseFailure` 字段：

```
LogParseFailure:*              # 查找所有解析失败的日志
LogParseFailure:"ALB adapter"  # 包含特定文本的解析失败
```

## 注意事项

- Boolean 类型字段在 CLS 中是字符串，需要引号: `stream:"true"` 不是 `stream:true`
- 数值类型字段不需要引号: `status:200`, `latency:>1000`
- 通配符 `*` 不能作为前缀使用（如 `*test` 无效）
- 嵌套字段用点号访问: `metadata.region:"us-east-1"`
