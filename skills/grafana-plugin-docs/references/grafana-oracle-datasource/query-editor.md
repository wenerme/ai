---
title: "Oracle query editor | Grafana Enterprise Plugins documentation"
description: "Use the Oracle query editor to write SQL queries and visualize data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle query editor

The Oracle query editor allows you to write raw SQL queries and visualize the results in Grafana panels. You can access the query editor from a dashboard panel in edit mode or from the [Explore](/docs/grafana/latest/explore/) page.

For general information on Grafana query editors, refer to [Query and transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/).

## Before you begin

- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/).
- Verify your Oracle user has `SELECT` permissions on the tables you want to query.

## Query editor options

The query editor provides the following options:

Expand table

| Option        | Description                                                           |
|---------------|-----------------------------------------------------------------------|
| **Format as** | Choose **Time series** or **Table** output format.                    |
| **Show Help** | Display inline documentation with a sample query and macro reference. |

Template variables are suggested automatically in the Monaco editor autocomplete when you type `$` or `${`.

## Query as time series

When formatting data as time series, the query must include a `time` column containing either a SQL `datetime`/`timestamp` value or a numeric value representing Unix epoch time in seconds.

Grafana interprets `date` and `timestamp` columns without an explicit timezone as UTC.

Any column except `time` and `metric` is treated as a value column. Return a column named `metric` to use its value as the series name.

### Example time-series query

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(time_date_time, '5m') AS time,
  MIN(value_double),
  'MIN' as metric
FROM test_data
WHERE $__timeFilter(time_date_time)
GROUP BY $__timeGroup(time_date_time, '5m')
ORDER BY time
```

## Query as table

Set **Format as** to **Table** to return results as a table. Any SQL query is valid in table format. Use the SQL `AS` keyword to rename columns in the output.

SQL [Copy code to clipboard] Copy

```sql
SELECT hostname, cpu_usage, memory_usage
FROM system_metrics
WHERE ROWNUM <= 100
```

## Macros

Macros simplify queries by providing dynamic elements such as time range filters. The Oracle data source expands macros into Oracle-specific SQL before executing the query.

Expand table

| Macro                                        | Description                                                                                          | Expands to                                                                                           |
|----------------------------------------------|------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `$__time(column)`                            | Alias the column as `time`.                                                                          | `column AS time`                                                                                     |
| `$__timeEpoch(column)`                       | Convert a date/timestamp column to epoch milliseconds, aliased as `time`.                            | `(column - TO_TIMESTAMP(...)) * 24*60*60*1000 AS time`                                               |
| `$__timeFilter(column)`                      | Filter by the dashboard time range.                                                                  | `column BETWEEN TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS') AND TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS')` |
| `$__timeFilterTZ(column)`                    | Time range filter with timezone awareness. Functionally equivalent to `$__timeFilter`.               | `column BETWEEN TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS') AND TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS')` |
| `$__timeFrom()`                              | Start of the dashboard time range.                                                                   | `TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS')`                                                            |
| `$__timeTo()`                                | End of the dashboard time range.                                                                     | `TO_DATE('...', 'YYYY-mm-dd HH24:MI:SS')`                                                            |
| `$__timeGroup(column, 'interval'[, fill])`   | Group timestamps into intervals for `GROUP BY` clauses. Optional fill value for missing data points. | `TO_DATE` + epoch arithmetic expression                                                              |
| `$__timeGroupTZ(column, 'interval'[, fill])` | Timezone-aware time grouping that preserves timezone context using `CAST` and `EXTRACT`.             | `TRUNC(CAST(... AS TIMESTAMP WITH TIME ZONE)) + NUMTODSINTERVAL(...)`                                |
| `$__unixEpochFilter(column)`                 | Filter by time range using millisecond epoch values.                                                 | `column >= <epoch_ms> AND column <= <epoch_ms>`                                                      |
| `$__unixEpochFrom()`                         | Start of the time range as a Unix epoch in milliseconds.                                             | `<epoch_ms>`                                                                                         |
| `$__unixEpochTo()`                           | End of the time range as a Unix epoch in milliseconds.                                               | `<epoch_ms>`                                                                                         |

> Note
>
> All time macros (`$__timeFrom()`, `$__timeTo()`, `$__timeFilter()`) return values in the timezone configured on the data source (default UTC), regardless of the dashboard or browser timezone setting. If your Oracle data is stored in a local timezone, use `$__timeFilterTZ` / `$__timeGroupTZ` or convert explicitly in your query.

### Convert time macros to a local timezone

If you need to compare macro output against columns stored in a non-UTC timezone, use Oracle’s `FROM_TZ` and `AT TIME ZONE` to convert:

SQL [Copy code to clipboard] Copy

```sql
SELECT *
FROM events
WHERE event_time BETWEEN
  FROM_TZ(CAST($__timeFrom() AS TIMESTAMP), 'UTC') AT TIME ZONE 'America/New_York'
  AND
  FROM_TZ(CAST($__timeTo() AS TIMESTAMP), 'UTC') AT TIME ZONE 'America/New_York'
```

Alternatively, convert your stored column to UTC for comparison:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__time(event_time),
  value
FROM events
WHERE FROM_TZ(CAST(event_time AS TIMESTAMP), 'America/New_York') AT TIME ZONE 'UTC'
  BETWEEN $__timeFrom() AND $__timeTo()
```

### Fill modes

The `$__timeGroup` and `$__timeGroupTZ` macros accept an optional fill parameter to handle missing data points in time-series queries:

Expand table

| Fill value                 | Behavior                                                                           |
|----------------------------|------------------------------------------------------------------------------------|
| `NULL`                     | Fill gaps with `NULL` values.                                                      |
| `previous`                 | Use the previous value in the series. If no previous value exists, `NULL` is used. |
| Numeric (for example, `0`) | Fill gaps with the specified number.                                               |

Example with fill:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(created_at, '1h', 0) AS time,
  COUNT(*) as count
FROM events
WHERE $__timeFilter(created_at)
GROUP BY $__timeGroup(created_at, '1h', 0)
ORDER BY time
```

### Brace notation

The Oracle data source supports brace notation `$__macro{...}` as an alternative to parentheses. Use brace notation when your macro arguments contain parentheses or complex expressions.

> Note
>
> Use one notation style per query. If any macro in the query uses braces, all macros in that query must also use braces.

Examples:

SQL [Copy code to clipboard] Copy

```sql
$__timeGroup{dateColumn, '5m'}
$__timeGroup{SYS_DATE_UTC(SDATE), '5m'}
$__timeGroup{FROM_TZ(CAST(SDATE as timestamp), 'UTC'), '1h'}
```

## Timezone-aware macros

The timezone-aware macros (`$__timeGroupTZ` and `$__timeFilterTZ`) preserve timezone information in your queries. Use these macros when working with data across different time zones or when the data source timezone differs from UTC.

### Example with timezone-aware macros

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroupTZ(timestamp_column, '5m') as time,
  metric_name as metric,
  AVG(value) as value
FROM measurements
WHERE $__timeFilterTZ(timestamp_column)
GROUP BY $__timeGroupTZ(timestamp_column, '5m'), metric_name
ORDER BY time
```

### Complex timestamp expressions

Use brace notation for expressions that involve casting or timezone conversion:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroupTZ{FROM_TZ(CAST(SDATE as timestamp), 'UTC'), '1h'} as time,
  metric_name as metric,
  value
FROM your_table
WHERE $__timeFilterTZ{FROM_TZ(CAST(SDATE as timestamp), 'UTC')}
GROUP BY $__timeGroupTZ{FROM_TZ(CAST(SDATE as timestamp), 'UTC'), '1h'}, metric_name
ORDER BY time
```

> Note
>
> When using timezone-aware macros, use `$__timeFilterTZ` in the `WHERE` clause to maintain timezone consistency throughout the query.

## Query examples

### Monitor CPU usage over time

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(sample_time, '5m') AS time,
  hostname as metric,
  AVG(cpu_percent) as value
FROM system_metrics
WHERE $__timeFilter(sample_time)
GROUP BY $__timeGroup(sample_time, '5m'), hostname
ORDER BY time
```

### Count events per hour with gap filling

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(event_time, '1h', 0) AS time,
  event_type as metric,
  COUNT(*) as count
FROM audit_log
WHERE $__timeFilter(event_time)
GROUP BY $__timeGroup(event_time, '1h', 0), event_type
ORDER BY time
```

### Table query with row limit

SQL [Copy code to clipboard] Copy

```sql
SELECT
  session_id,
  username,
  program,
  status,
  last_call_et as idle_seconds
FROM v$session
WHERE status = 'ACTIVE'
  AND ROWNUM <= 50
ORDER BY last_call_et DESC
```

## Supported data types

The plugin supports standard Oracle data types and converts them to Grafana DataFrame types automatically.

Expand table

| Oracle type                     | Grafana type | Notes                                            |
|---------------------------------|--------------|--------------------------------------------------|
| `NUMBER`, `INTEGER`, `FLOAT`    | Numeric      | Standard numeric types.                          |
| `BINARY_FLOAT` (`IBFloat`)      | Float32      | Oracle-specific binary floating point.           |
| `BINARY_DOUBLE` (`IBDouble`)    | Float64      | Oracle-specific binary double.                   |
| `VARCHAR2`, `CHAR`, `NVARCHAR2` | String       | Standard text types.                             |
| `DATE`, `TIMESTAMP`             | Time         | Use as the `time` column in time-series queries. |
| `TIMESTAMP WITH TIME ZONE`      | Time         | Timezone information is preserved.               |
| `INTERVAL YEAR TO MONTH`        | Int64        | Converted to total months.                       |
| `INTERVAL DAY TO SECOND`        | Int64        | Converted to total seconds.                      |

The following types are **not directly supported** and require conversion in your SQL query:

Expand table

| Oracle type         | Required conversion                              |
|---------------------|--------------------------------------------------|
| `LONG` / `LONG RAW` | `CAST(column AS VARCHAR2(4000))`                 |
| `CLOB` / `NCLOB`    | `DBMS_LOB.SUBSTR(column, 4000, 1)`               |
| `BLOB`              | Extract metadata: `DBMS_LOB.GETLENGTH(column)`   |
| `XMLType`           | `XMLSERIALIZE(CONTENT column AS VARCHAR2(4000))` |
| `RAW`               | `RAWTOHEX(column)`                               |

## Query limits

Be aware of these limits when writing queries:

Expand table

| Limit             | Default        | Configurable                                                           |
|-------------------|----------------|------------------------------------------------------------------------|
| **Row limit**     | 1,000,000 rows | Yes—set **Row Limit** in data source settings.                         |
| **Response size** | 16 MB          | Yes—set `GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE` (max 512 MB). |
| **Query timeout** | 120 seconds    | Yes—set **Dataproxy Timeout** in data source settings.                 |

> Caution
>
> Large result sets consume significant memory on the Grafana server. Use aggregation, time filtering, and `ROWNUM` limits to keep queries efficient.

## Use Explore for ad-hoc queries

[Explore](/docs/grafana/latest/explore/) lets you run Oracle queries without creating a dashboard. This is useful for:

- **Investigating incidents:** Quickly check database state, session counts, or recent errors without building a panel.
- **Developing queries:** Iterate on SQL and verify output before adding it to a dashboard.
- **Comparing time ranges:** Use the split view to compare metrics across two time periods side by side.

To use Explore with Oracle:

1. Navigate to **Explore** in the left-side menu.
2. Select your Oracle data source from the data source dropdown.
3. Write your SQL query in the editor.
4. Click **Run query** or press `Shift+Enter`.

Explore supports both **Table** and **Time series** format, which you select from the **Format as** dropdown. Use Table format when exploring raw data, and Time series when you want to visualize trends.

> Note
>
> Queries in Explore use the same macros, limits, and timeout settings as dashboard queries.

## Common query examples

These real-world examples show typical Oracle monitoring and business metric queries. Adapt the schema and column names to match your environment.

### Database performance monitoring

**Active sessions over time:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(sample_time, '1m') AS time,
  COUNT(*) AS active_sessions
FROM V$ACTIVE_SESSION_HISTORY
WHERE $__timeFilter(sample_time)
GROUP BY $__timeGroup(sample_time, '1m')
ORDER BY time
```

**System statistics (CPU usage, I/O):**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(begin_time, '5m') AS time,
  metric_name AS metric,
  ROUND(average, 2) AS value
FROM V$SYSMETRIC_HISTORY
WHERE $__timeFilter(begin_time)
  AND metric_name IN ('CPU Usage Per Sec', 'Physical Reads Per Sec', 'Physical Writes Per Sec')
GROUP BY $__timeGroup(begin_time, '5m'), metric_name, ROUND(average, 2)
ORDER BY time
```

### Storage monitoring

**Tablespace usage:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  tablespace_name AS metric,
  ROUND(used_percent, 2) AS "Usage %"
FROM DBA_TABLESPACE_USAGE_METRICS
ORDER BY used_percent DESC
```

**Tablespace growth over time** (requires AWR or custom logging):

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(snap_time, '1d') AS time,
  tablespace_name AS metric,
  ROUND(used_mb, 2) AS value
FROM custom_tablespace_log
WHERE $__timeFilter(snap_time)
GROUP BY $__timeGroup(snap_time, '1d'), tablespace_name, ROUND(used_mb, 2)
ORDER BY time
```

### Session and connection monitoring

**Current sessions by status:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  status,
  COUNT(*) AS count
FROM V$SESSION
WHERE username IS NOT NULL
GROUP BY status
```

**Wait events (top 10):**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event AS metric,
  total_waits AS value
FROM V$SYSTEM_EVENT
WHERE wait_class != 'Idle'
ORDER BY total_waits DESC
FETCH FIRST 10 ROWS ONLY
```

### Business metrics

**Order volume over time:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(order_date, '1h') AS time,
  COUNT(*) AS orders,
  SUM(total_amount) AS revenue
FROM orders
WHERE $__timeFilter(order_date)
GROUP BY $__timeGroup(order_date, '1h')
ORDER BY time
```

**SLA compliance (response time percentiles):**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(request_time, '5m') AS time,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_ms) AS p95_ms,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY response_ms) AS p99_ms
FROM api_requests
WHERE $__timeFilter(request_time)
GROUP BY $__timeGroup(request_time, '5m')
ORDER BY time
```

> Note
>
> Queries against `V$` and `DBA_` views require the appropriate privileges. Refer to [Create a least-privilege database user](/docs/plugins/grafana-oracle-datasource/latest/configure/#create-a-least-privilege-database-user) for permission setup.

## Next steps

- [Use template variables](/docs/plugins/grafana-oracle-datasource/latest/template-variables/) to create dynamic dashboards.
- [Set up alerting](/docs/plugins/grafana-oracle-datasource/latest/alerting/) based on Oracle queries.
- [Create annotations](/docs/plugins/grafana-oracle-datasource/latest/annotations/) to mark events on your time-series panels.
