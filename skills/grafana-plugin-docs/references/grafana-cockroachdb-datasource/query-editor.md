---
title: "CockroachDB query editor | Grafana Enterprise Plugins documentation"
description: "Use the CockroachDB query editor to build and run queries in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CockroachDB query editor

The CockroachDB query editor lets you build and run SQL queries against your CockroachDB data source. You can use it to explore cluster metrics, analyze application data, and create time series visualizations for your Grafana dashboards.

## Before you begin

- [Configure the CockroachDB data source](/docs/plugins/grafana-cockroachdb-datasource/latest/configure/).
- Verify your CockroachDB user has read access to the tables you want to query.

## Format

The query editor supports two result formats. Select the format above the query editor using the **Format** drop-down.

- **Table:** Returns results as a table. Use this format for stat panels, tables, and bar charts.
- **Time series:** Returns results as time series data. Use this format for time series panels, graphs, and heatmaps. Your query must return a column named `time` containing timestamps.

## Query modes

The query editor supports two modes for creating queries. Use **Builder** mode to assemble queries visually through drop-down menus, or switch to **Code** mode to write raw SQL with autocomplete. Toggle between modes using the button at the top of the query editor.

### Builder mode

Builder mode provides a visual interface for constructing SQL queries without writing raw SQL. Use the drop-down menus to configure the following fields:

- **Table:** The CockroachDB table to query.
- **Column:** One or more columns to return.
- **Aggregation:** An optional aggregation function to apply. Supported functions: `AVG`, `COUNT`, `MAX`, `MIN`, `SUM`.
- **WHERE:** Filter conditions to narrow results.
- **GROUP BY:** Columns to group results by.
- **ORDER BY:** Sort order for results (ascending or descending).
- **LIMIT:** Maximum number of rows to return.

For example, to query average response times grouped by region, select the `requests` table, choose `response_time_ms` as the column with the `AVG` aggregation, add `region` to **GROUP BY**, and set **ORDER BY** to ascending. The builder generates the equivalent SQL:

SQL [Copy code to clipboard] Copy

```sql
SELECT AVG(response_time_ms), "region"
FROM requests
GROUP BY "region"
ORDER BY "region" ASC
```

### Code mode

Code mode provides a raw SQL editor for writing queries directly. The editor includes autocomplete that suggests table and column names as you type. Column names are automatically wrapped in double quotes to handle reserved characters.

> Note
>
> Switching from Builder mode to Code mode preserves your query. Switching from Code mode to Builder mode might not preserve manually written SQL if it can’t be parsed back into the builder fields.

Refer to [Queries in CockroachDB](https://www.cockroachlabs.com/docs/stable/query-data) for more information on CockroachDB SQL syntax.

## Macros

Macros simplify queries by inserting dynamic values based on the dashboard time range. Use macros in Code mode to create queries that automatically adjust to the selected time window.

Expand table

| Macro                   | Description                                                     | Output example                                                     |
|-------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------|
| `$__timeFilter(column)` | Filters the column to the dashboard time range using `BETWEEN`. | `column BETWEEN '2024-05-10T16:00:00Z' AND '2024-05-10T17:00:00Z'` |
| `$__timeFrom(column)`   | Returns the dashboard start time as a quoted timestamp.         | `'2024-05-10T16:00:00Z'`                                           |
| `$__timeTo(column)`     | Returns the dashboard end time as a quoted timestamp.           | `'2024-05-10T17:00:00Z'`                                           |

### Macro example

The following query uses `$__timeFilter` to filter results to the current dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT created_at, temperature
FROM sensor_readings
WHERE $__timeFilter(created_at)
ORDER BY created_at ASC
```

You can also use `$__timeFrom` and `$__timeTo` individually for more complex conditions:

SQL [Copy code to clipboard] Copy

```sql
SELECT created_at, event_type, duration_ms
FROM events
WHERE created_at >= $__timeFrom(created_at)
  AND created_at < $__timeTo(created_at)
  AND duration_ms > 1000
ORDER BY created_at ASC
```

## Query examples

The following examples demonstrate common query patterns for CockroachDB dashboards.

### Time series query

Return a time series of average response times grouped by minute:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  AVG(response_time_ms) AS avg_response_time
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time ASC
```

### Multi-series time series query

Compare metrics across multiple dimensions by including a string column as a series label:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  region,
  AVG(response_time_ms) AS avg_response_time
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time, region
ORDER BY time ASC
```

### Multiple aggregations

Return several summary statistics in a single query:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('hour', created_at) AS time,
  COUNT(*) AS total_requests,
  AVG(response_time_ms) AS avg_response_time,
  MAX(response_time_ms) AS max_response_time
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time ASC
```

### Table query

Return the top 10 tables by row count:

SQL [Copy code to clipboard] Copy

```sql
SELECT table_name, estimated_row_count
FROM crdb_internal.table_row_statistics
ORDER BY estimated_row_count DESC
LIMIT 10
```

### Cluster node status

Monitor the health and activity of CockroachDB cluster nodes:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  node_id,
  address,
  is_available,
  is_live
FROM crdb_internal.gossip_nodes
ORDER BY node_id ASC
```

### Active query monitoring

List currently running queries and their elapsed time:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  query,
  phase,
  (now() - start) AS elapsed,
  application_name
FROM crdb_internal.cluster_queries
WHERE application_name != 'cockroach'
ORDER BY start ASC
```
