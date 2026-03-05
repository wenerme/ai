# SQL 分析语法

CLS 支持对日志数据进行 SQL 聚合分析。

> **前提**: Topic 必须开启"统计分析"功能，否则返回空结果 (`Analysis: false`)。

## 语法格式

```
<CQL过滤> | SELECT <聚合函数> ... GROUP BY ... ORDER BY ... LIMIT ...
```

CQL 部分作为数据过滤条件，`|` 后面是标准 SQL 聚合语句。

## 常用分析

### PV/UV 按时间统计

```sql
* | SELECT histogram(cast(__TIMESTAMP__ as timestamp), interval 1 minute) as time,
    count(*) as pv, count(distinct remote_addr) as uv
  GROUP BY time ORDER BY time desc LIMIT 10000
```

### 错误率分析

```sql
* | SELECT date_trunc('minute', __TIMESTAMP__) as time,
    round(sum(case when status >= 500 then 1.00 else 0.00 end) / cast(count(*) as double) * 100, 3) as "5XX_rate"
  GROUP BY time ORDER BY time LIMIT 10000
```

### 按维度统计

```sql
* | SELECT histogram(cast(__TIMESTAMP__ as timestamp), interval 1 minute) as time,
    service_name, count(*) as cnt
  GROUP BY time, service_name ORDER BY time desc LIMIT 10000
```

### TOP N 分析

```sql
* | SELECT remote_addr, count(*) as cnt
  GROUP BY remote_addr ORDER BY cnt desc LIMIT 20
```

### 分位数统计

```sql
* | SELECT approx_percentile(latency, 0.50) as p50,
    approx_percentile(latency, 0.95) as p95,
    approx_percentile(latency, 0.99) as p99
```

## 常用函数

| 类别 | 函数 |
|------|------|
| 时间 | `histogram(timestamp, interval)`, `date_trunc('minute', timestamp)`, `cast(__TIMESTAMP__ as timestamp)` |
| 聚合 | `count(*)`, `count(distinct field)`, `sum()`, `avg()`, `min()`, `max()` |
| 近似 | `approx_percentile(field, quantile)`, `approx_distinct(field)` |
| 条件 | `case when ... then ... else ... end`, `cast(... as double)`, `round(value, N)` |
| 字符串 | `concat()`, `substr()`, `length()`, `regexp_like()` |
| 间隔 | `interval 1 minute`, `interval 5 minute`, `interval 1 hour`, `interval 1 day` |

## 注意事项

- 使用 `__TIMESTAMP__` 访问日志时间戳
- 时间运算需要 `cast(__TIMESTAMP__ as timestamp)` 转换类型
- 数值计算注意类型转换: `cast(count(*) as double)` 避免整数除法
- `LIMIT` 最大 10000，超过会被截断
- SQL 分析结果是聚合数据，不返回原始日志
