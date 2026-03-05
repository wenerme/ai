---
name: tencent-cls
description: "Use when querying or analyzing Tencent Cloud CLS (Cloud Log Service) logs: writing CQL search queries, performing SQL analysis on log data, using CLS MCP tools (search, cluster_logs, log_context, histogram), or troubleshooting CLS query issues. Triggers on CLS, CQL, log search, log analysis, tencent cloud logs, topic query."
allowed-tools: Bash(mcp-cli:*)
---

# Tencent CLS Guide

腾讯云日志服务 (CLS) 查询与分析指南。

## Rules

- String values in CQL MUST be quoted: `level:"ERROR"` not `level:ERROR`
- ALWAYS specify topic when searching — CLS requires a topic context
- SQL analysis only works when topic has "统计分析" enabled; empty result may mean `Analysis: false`
- Use `cast(__TIMESTAMP__ as timestamp)` for time operations in SQL analysis

## CQL 快速参考

```
key:"value"              # 键值搜索（字符串必须加引号）
key:123                  # 数值搜索
value                    # 全文搜索
level:"ERROR" AND pid:1  # 逻辑与
status:>400              # 范围查询
host:*test*              # 通配符
field:*                  # 字段存在
NOT key:"value"          # 排除
```

> AND 优先级高于 OR，建议用括号明确：`(A OR B) AND C`

## MCP 工具速查

| 工具 | 用途 | 关键参数 |
|------|------|----------|
| `search` | 搜索日志 | `topic`, `query`, `from`, `limit`, `format` |
| `cluster_logs` | 聚类相似日志 | `topic`, `query`, `field`, `simTh` |
| `log_context` | 获取日志上下文 | `topic`, `time`, `pkgId`, `pkgLogId` |
| `histogram` | 时间分布统计 | `topic`, `query`, `from`, `buckets` |

```bash
# 搜索日志
mcp-cli call <cls-server>/search '{"topic":"my-topic","query":"level:\"ERROR\"","from":"-6h","limit":50}'

# 聚类分析
mcp-cli call <cls-server>/cluster_logs '{"topic":"my-topic","query":"level:\"ERROR\"","from":"-3d"}'

# 日志上下文
mcp-cli call <cls-server>/log_context '{"topic":"my-topic","time":"...","pkgId":"...","pkgLogId":"..."}'

# 时间分布
mcp-cli call <cls-server>/histogram '{"topic":"my-topic","from":"-24h","buckets":24}'
```

## SQL 分析

```sql
-- 格式: <CQL过滤> | SELECT ...
* | SELECT count(*) as total, count(distinct remote_addr) as uv
  GROUP BY date_trunc('minute', __TIMESTAMP__)
  ORDER BY time LIMIT 10000
```

## References

- [references/cql-syntax.md](references/cql-syntax.md) — CQL 搜索语法详解、时间格式、日志解析失败排查
- [references/sql-analysis.md](references/sql-analysis.md) — SQL 分析语法、常用函数、分析示例
- [references/mcp-tools.md](references/mcp-tools.md) — CLS MCP 工具完整参数、响应格式、CLI 配置
