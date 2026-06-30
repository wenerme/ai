---
title: "DynamoDB query editor | Grafana Enterprise Plugins documentation"
description: "Use the DynamoDB query editor to write PartiQL queries in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB query editor

This document explains how to use the DynamoDB query editor to query your DynamoDB tables using [PartiQL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html), a SQL-compatible query language supported by DynamoDB.

## Before you begin

- [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/).
- Verify your IAM identity has `dynamodb:PartiQLSelect` permission on the tables you want to query.

## Key concepts

If you’re new to DynamoDB or PartiQL, here are key terms used in this documentation:

Expand table

| Term               | Description                                                                                                                                                                                                                 |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **PartiQL**        | A SQL-compatible query language supported by DynamoDB for reading and writing data. DynamoDB supports a [subset of PartiQL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.statements.html). |
| **DynamoDB table** | A collection of items (rows) in DynamoDB, each identified by a primary key.                                                                                                                                                 |
| **Time alias**     | Aliasing a column `AS time` in your query tells the plugin to treat the results as time-series data.                                                                                                                        |

## Query editor overview

The DynamoDB query editor provides a full-featured code editor for writing PartiQL statements. The editor includes syntax highlighting and line numbers.

To run a query, press `Ctrl+S` (or `Cmd+S` on macOS) or click the play button in the top-left corner of the editor.

## Result formats

The query editor automatically detects the result format based on your query:

Expand table

| Format          | Detected when                                                          | Use case                                                      |
|-----------------|------------------------------------------------------------------------|---------------------------------------------------------------|
| **Table**       | The query doesn’t include `AS time`                                    | Displaying data in table panels or stat panels.               |
| **Time series** | The query contains the substring `as time` anywhere (case-insensitive) | Displaying data in time-series visualizations such as graphs. |

## Create a query

You can create table queries for raw data display or time-series queries for graphing data over time. Table names in PartiQL must be enclosed in double quotes (for example, `"my-table"`).

> Caution
>
> A `SELECT` statement without a partition key in the `WHERE` clause results in a full table scan, which can consume significant read capacity and cause throttling. Always include a partition key filter when querying large tables. Refer to the [PartiQL select statement reference](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html) for details.

### Table queries

Table queries return data in a tabular format suitable for table panels, stat panels, and other non-time-series visualizations.

To create a table query:

1. Select the **DynamoDB** data source.
2. Enter a PartiQL `SELECT` statement in the editor.
3. Press `Ctrl+S` or click the play button to run the query.

Example:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "my-table"
```

To select specific attributes:

SQL [Copy code to clipboard] Copy

```sql
SELECT orderId, customerName, orderTotal FROM "orders"
```

### Time-series queries

To display data as a time series, alias a datetime column `AS time` in your query. The plugin uses this column as the timestamp for each data point. Grafana interprets timestamp values without an explicit time zone as UTC.

> Caution
>
> The DynamoDB data source doesn’t support time-range macros such as `$__from`, `$__to`, or `$__timeFilter`. You must use explicit values in time-based `WHERE` clauses. Additionally, ensure the timestamp column’s data type in DynamoDB matches the comparison format in your query. For example, a numeric epoch value stored as a string type causes lexicographic comparison instead of numeric, leading to incorrect results. Refer to [Troubleshooting](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#dynamic-time-filtering-doesnt-work) for more details.

> Note
>
> The format detection uses a simple substring match for `as time` in the query text. Avoid using the phrase `as time` in string literals or other contexts unless you intend time-series formatting.

To create a time-series query:

1. Select the **DynamoDB** data source.
2. Write a PartiQL query that aliases a datetime column `AS time`.
3. Press `Ctrl+S` or click the play button to run the query.

Example:

SQL [Copy code to clipboard] Copy

```sql
SELECT log_time AS time, cpu_usage FROM "server-metrics"
```

### Multi-line time series

To create multi-line time series, your query must return at least three fields in the following order:

1. A datetime field aliased `AS time`.
2. A field to group by (this becomes the series label).
3. One or more metric value fields.

Example:

SQL [Copy code to clipboard] Copy

```sql
SELECT log_time AS time, machine_group, avg(disk_free) AS avg_disk_free
FROM "server-logs"
GROUP BY machine_group, log_time
ORDER BY log_time
```

This query produces one time-series line per unique `machine_group` value.

## Query examples

The following examples demonstrate common query patterns with DynamoDB.

### Retrieve all items from a table

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "my-table"
```

### Filter by partition key

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders" WHERE customerId = 'C001'
```

### Aggregate metrics over time

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, avg(temperature) AS avg_temp
FROM "sensor-data"
WHERE sensorId = 'S100'
GROUP BY timestamp
ORDER BY timestamp
```

### Count items by category

SQL [Copy code to clipboard] Copy

```sql
SELECT category, count(*) AS total FROM "products" GROUP BY category
```

### Query a secondary index

Use dot notation to query a global secondary index:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM "orders"."customerIndex" WHERE customerId = 'C001'
```

### Filter with multiple conditions

SQL [Copy code to clipboard] Copy

```sql
SELECT orderId, orderTotal, status
FROM "orders"
WHERE customerId = 'C001' AND status IN ('pending', 'shipped')
```

## Known limitations

- Querying data from nested maps isn’t supported and returns null values.
- Any column except `time` is treated as a value column in time-series queries.

## Next steps

- Refer to the [PartiQL reference for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html) for the full query language syntax.
- [Use template variables](/docs/plugins/grafana-dynamodb-datasource/latest/template-variables/) in your queries.
- [Set up alerting](/docs/plugins/grafana-dynamodb-datasource/latest/alerting/) based on DynamoDB data.
- [Add annotations](/docs/plugins/grafana-dynamodb-datasource/latest/annotations/) to your dashboards.
