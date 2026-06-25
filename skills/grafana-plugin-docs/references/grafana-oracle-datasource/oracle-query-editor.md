---
title: "Oracle query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the Oracle query editor for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle query editor

Grafana provides a query editor for Oracle, where you can create and execute SQL queries. For general information on Grafana query editors, refer to [Query editors](/docs/grafana/latest/panels-visualizations/query-transform-data/#query-editors/). For general information on querying data sources in Grafana, refer to [Query and transform data](//docs/grafana/latest/panels-visualizations/query-transform-data/).

The Oracle query editor is located on the [Explore page](/docs/grafana/latest/explore/). You can also access the Oracle query editor from a dashboard panel. Click the ellipsis in the upper right of the panel and select **Edit**.

## Query editor options

Create Oracle queries directly in the query editor window. The **Format as** option allows you to query Oracle and return results as **Time series** data or as a **Table**. Click **Show Help** to see a sample query, a list of macros, and other useful information to help you write SQL queries.

## Query as time series

When formatting data as a time series, the query must include a `time` column containing either a SQL `datetime` value or a numeric data type representing [UNIX epoch time](https://www.epoch101.com/) in seconds. Grafana interprets `date` and `timestamp` columns without an explicit timezone as [UTC time](https://www.timeanddate.com/time/aboututc.html). Any column except `time` and `metric` is treated as a `value` column. You can return a column named `metric` that is used as the metric name for the value column.

Example query with `metric` column:

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

### Query as table

Setting the **Format as** query option to `Table` allows you to create any type of SQL query. The table panel automatically shows the results of whatever columns and rows your query returns. You can change or customize the name of a Table panel column by using the SQL `AS` command.

### Macros

You can add macros to your queries to simplify the syntax and enable dynamic elements, such as date range filters.

Expand table

| Macro example                                | Description                                                                                                                                                                                                                                    |
|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__time(dateColumn)`                        | Replaces the value with an expression to convert to a UNIX timestamp and renames the column to `time_sec`. Example: UNIX\_TIMESTAMP(dateColumn) AS time\_sec.                                                                                  |
| `$__timeEpoch(dateColumn)`                   | Replaces the value with an expression to convert to a UNIX Epoch timestamp and renames the column to `time_sec`. Example: UNIX\_TIMESTAMP(dateColumn) AS time\_sec.                                                                            |
| `$__timeFilter(dateColumn)`                  | Replaces the value of a time range filter using the specified column name. Example: dateColumn BETWEEN FROM\_UNIXTIME(1494410783) AND FROM\_UNIXTIME(1494410983)                                                                               |
| `$__timeFrom()`                              | Replaces the value with the start of the currently active time selection. Example: FROM\_UNIXTIME(1494410783)_                                                                                                                                 |
| `$__timeTo()`                                | Replaces the value with the end of the currently active time selection. Example: FROM\_UNIXTIME(1494410983)                                                                                                                                    |
| `$__timeGroup(dateColumn,'5m')`              | Replaces the value with an expression suitable for use in a `GROUP BY` clause.                                                                                                                                                                 |
| `$__timeGroup(dateColumn,‘5m’[, fillvalue])` | Replaces the value with an expression that can be used in a `GROUP BY` clause. Providing a fillValue of NULL or floating value will automatically fill empty series in timerange with that value. Example: $\_\_timeGroup{createdAt, ‘1m’, 0}. |
| `$__timeGroup(dateColumn,'5m', 0)`           | Same as the `$__timeGroup(dateColumn,'5m')` macro, but includes a fill parameter to ensure missing points in the series are added by Grafana, using 0 as the default value. **This applies only to time series queries.**                      |
| `$__timeGroup(dateColumn,'5m', NULL)`        | Same as the `$__timeGroup(dateColumn,'5m', 0)` but `NULL` is used as the value for missing points. **This applies only to time series queries.**                                                                                               |
| `$__timeGroup(dateColumn,'5m', previous)`    | Same as the `$__timeGroup(dateColumn,'5m', previous)` macro, but uses the previous value in the series as the fill value. If no previous value exists,`NULL` will be used. **This applies only to time series queries.**                       |
| `$__timeGroupTZ(dateColumn,'5m')`            | Replaces the value with an expression suitable for use in a `GROUP BY` clause. Similar to $\_\_timeGroup except, the macro will not do any date conversation and will attempt to keep timezones.                                               |
| `$__unixEpochFilter(dateColumn)`             | Replaces the value by a time range filter using the specified column name with times represented as a UNIX timestamp. Example: dateColumn &gt; 1494410783 AND dateColumn &lt; 1494497183                                                       |
| `$__unixEpochFrom()`                         | Replaces the value with the start of the currently active time selection as a UNIX timestamp. Example: 1494410783                                                                                                                              |
| `$__unixEpochTo()`                           | Replaces the value with the end of the currently active time selection as a UNIX timestamp. Example: 1494497183                                                                                                                                |

The Oracle data source supports notation using curly braces `{}`. Use this notation when queries are required inside parameters.

> Note
>
> Use one notation type per query. If the query requires braces, all macros in the query will need to use braces.

Examples:

SQL [Copy code to clipboard] Copy

```sql
$__timeGroup{dateColumn,'5m'}
$__timeGroup{SYS_DATE_UTC(SDATE),'5m'}
$__timeGroup{FROM_TZ(CAST(SDATE as timestamp), 'UTC'), '1h'}
```

### Timezone-aware macros

The Oracle data source provides timezone-aware macros that preserve the timezone information in your queries. These macros are particularly useful when working with data across different time zones.

#### $\_\_timeGroupTZ

The `$__timeGroupTZ` macro is similar to `$__timeGroup` but preserves timezone information in your queries. This is useful when you need to group data while maintaining the original timezone context.

Syntax:

SQL [Copy code to clipboard] Copy

```sql
$__timeGroupTZ(dateColumn, interval[, fillValue])
```

Parameters:

- `dateColumn`: The column containing the timestamp to group by
- `interval`: The time interval to group by (e.g., ‘5m’, ‘1h’, ‘1d’)
- `fillValue` (optional): Value to use for filling gaps in time series data

Examples:

SQL [Copy code to clipboard] Copy

```sql
-- Basic usage with 5-minute intervals
SELECT
  $__timeGroupTZ(timestamp_column, '5m') as time,
  metric_name as metric,
  value
FROM your_table
WHERE $__timeFilterTZ(timestamp_column)
GROUP BY $__timeGroupTZ(timestamp_column, '5m'), metric_name
ORDER BY time

-- Using with fill value
SELECT
  $__timeGroupTZ(timestamp_column, '1h', 0) as time,
  metric_name as metric,
  value
FROM your_table
WHERE $__timeFilterTZ(timestamp_column)
GROUP BY $__timeGroupTZ(timestamp_column, '1h', 0), metric_name
ORDER BY time

-- Using with complex timestamp expressions
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
> When using timezone-aware macros, make sure to use the corresponding timezone-aware filter macro (`$__timeFilterTZ`) in your WHERE clause to maintain timezone consistency throughout the query.
