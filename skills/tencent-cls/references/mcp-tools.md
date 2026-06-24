# CLS MCP 工具参考

通过 MCP 工具访问 CLS 日志服务。

## search

搜索日志，支持 CQL 语法。

| 参数 | 说明 | 默认 |
|------|------|------|
| `topic` | Topic 名称 (必需) | — |
| `topics` | 多个 topic，逗号分隔 (可选) | — |
| `query` | CQL 查询 | `*` |
| `from` / `to` | 时间范围 | `-1h` / `now` |
| `limit` | 返回数量 (最大 1000) | 100 |
| `sort` | `asc` / `desc` | `desc` |
| `format` | `json` (完整) / `toon` (紧凑) | — |
| `context` | 分页游标 | — |

```json
{
  "topic": "my-app-logs",
  "query": "level:\"ERROR\" AND service:\"api\"",
  "from": "-6h",
  "limit": 50
}
```

---

## cluster_logs

使用 Drain3 算法聚类相似日志，用于发现错误模式和异常。

| 参数 | 说明 | 默认 |
|------|------|------|
| `topic` | Topic 名称 (必需) | — |
| `query` | CQL 过滤 | `*` |
| `field` | 聚类字段 | `msg` |
| `from` / `to` | 时间范围 | `-1h` / `now` |
| `limit` | 采样数量 (10-1000) | 500 |
| `simTh` | 相似度阈值 (0.1-1.0) | 0.4 |
| `maxClusters` | 最大聚类数 | 100 |

```json
{
  "topic": "my-app-logs",
  "query": "level:\"ERROR\"",
  "field": "msg",
  "from": "-3d",
  "limit": 200
}
```

**响应格式**:

```json
{
  "totalLogs": 200,
  "clusterCount": 5,
  "clusters": [
    { "template": "connection timeout to <*> after <*>ms", "count": 87 },
    { "template": "failed to parse request body: <*>", "count": 43 }
  ]
}
```

---

## log_context

获取单条日志的前后上下文。使用搜索结果中的 `_pkgId`, `_pkgLogId`, `_time` 定位。

| 参数 | 说明 | 默认 |
|------|------|------|
| `topic` | Topic 名称 (必需) | — |
| `time` | 日志时间戳 (必需) | — |
| `pkgId` | 使用搜索结果的 `_pkgId` (必需) | — |
| `pkgLogId` | 使用搜索结果的 `_pkgLogId` (必需) | — |
| `prevLogs` / `nextLogs` | 前后日志数 (最大 100) | 10 |
| `query` | 可选 CQL 过滤 | — |

```json
{
  "topic": "my-app-logs",
  "time": "1709200000000",
  "pkgId": "1A2B3C4D5E",
  "pkgLogId": "0",
  "prevLogs": 10,
  "nextLogs": 10
}
```

**典型用法**: 先用 `search` 找到目标日志，从结果中提取 `_pkgId`、`_pkgLogId`、`_time`，再调用 `log_context` 查看上下文。

---

## histogram

按时间桶统计日志数量分布，用于发现流量趋势和异常时段。

| 参数 | 说明 | 默认 |
|------|------|------|
| `topic` | Topic 名称 (必需) | — |
| `query` | CQL 过滤 | `*` |
| `from` / `to` | 时间范围 | `-1h` / `now` |
| `buckets` | 时间桶数量 (10-200) | 50 |

```json
{
  "topic": "my-app-logs",
  "query": "level:\"ERROR\"",
  "from": "-24h",
  "buckets": 24
}
```

**响应格式**:

```json
{
  "total": 1234,
  "interval": 3600000,
  "data": [
    { "count": 45, "startTime": 1709200000000 },
    { "count": 123, "startTime": 1709203600000 }
  ]
}
```

---

## MCP CLI

**安装**: `bunx @wener/mcp-cli` 或 `npx @wener/mcp-cli`
**CLS Server**: provided by `@wener/mcps` (MCP as a Service)

**配置文件**: `.mcp-cli.local.json`（项目目录或工作目录）

```bash
mcp-cli servers                    # 列出可用服务器
mcp-cli tools [server]             # 列出工具
mcp-cli info <server>/<tool>       # 查看工具 schema
mcp-cli call <server>/<tool> '{}'  # 调用工具
```

### CLS 服务配置示例

```json
{
  "servers": {
    "my-cls": {
      "type": "tencent-cls",
      "headers": {
        "X-CLS-REGION": "ap-shanghai",
        "X-CLS-SECRET-ID": "<your-secret-id>",
        "X-CLS-SECRET-KEY": "<your-secret-key>"
      }
    }
  }
}
```

海外区域需要额外配置 `X-CLS-ENDPOINT`:

```json
{
  "X-CLS-REGION": "na-siliconvalley",
  "X-CLS-ENDPOINT": "cls.intl.tencentcloudapi.com",
  "X-CLS-SECRET-ID": "<your-secret-id>",
  "X-CLS-SECRET-KEY": "<your-secret-key>"
}
```

### 常见 Region

| Region | 说明 |
|--------|------|
| `ap-shanghai` | 上海 |
| `ap-guangzhou` | 广州 |
| `ap-beijing` | 北京 |
| `ap-singapore` | 新加坡 |
| `na-siliconvalley` | 硅谷 |
| `ap-tokyo` | 东京 |

> 海外 Region 需设置 `X-CLS-ENDPOINT: cls.intl.tencentcloudapi.com`
