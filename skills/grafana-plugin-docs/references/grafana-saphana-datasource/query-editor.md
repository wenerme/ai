---
title: "SAP HANA query editor | Grafana Enterprise Plugins documentation"
description: "Use the SAP HANA query editor in Grafana to query your SAP HANA database."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SAP HANA query editor

Grafana provides a query editor for the SAP HANA data source, which is located on the [Explore page](/docs/grafana/latest/explore/). You can also access the SAP HANA query editor from a dashboard panel. Click the menu in the upper right of the panel and select **Edit**.

This document explains querying specific to the SAP HANA data source. For general documentation on querying data sources in Grafana, refer to [Query and transform data](/docs/grafana/latest/panels-visualizations/query-transform-data/).

## Key concepts

If you’re new to SAP HANA, the following are key terms used in this documentation:

Expand table

| Term            | Description                                                                              |
|-----------------|------------------------------------------------------------------------------------------|
| **Schema**      | A container for database objects like tables and views.                                  |
| **Time series** | Data points indexed in time order, typically used for graphs.                            |
| **Table data**  | Structured data returned in rows and columns.                                            |
| **Macro**       | A placeholder that Grafana expands into a SQL expression based on the dashboard context. |

## Query editor features

The SAP HANA query editor provides the following features:

- **SQL query editor:** Enter any HANA SQL queries directly.
- **Syntax highlighting:** SQL syntax is highlighted for readability.
- **Auto-completion:** Grafana macros and template variables are auto-completed as you type.
- **Format options:** Format query results as time series, table, or logs.
- **Keyboard shortcut:** Press **Ctrl+S** (or **Cmd+S** on Mac) to re-run the query while editing.

## Create a query

To create a query:

1. Select the **SAP HANA** data source.
2. Enter your SQL query in the query editor.
3. Select the **Format** option:

   - **Time series:** For visualizing data in graph panels.
   - **Table:** For displaying data in table panels.
   - **Logs:** For viewing data in the Logs panel in Explore.
4. Click **Run query** to execute.

### Time series queries

For time series visualizations, your query must return at least one time column and one numeric value column. The time column should be named `time` or use a timestamp data type.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
SELECT ts AS time, temperature AS value
FROM weather
WHERE $__timeFilter(ts)
ORDER BY ts ASC
```

### Table queries

For table visualizations, your query can return any columns. The results display in a tabular format.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
SELECT username, city, age
FROM users
WHERE city = 'London'
```

## Macros

Macros are placeholders that Grafana expands into SQL expressions based on the dashboard time range and other context. The query editor auto-completes supported macros.

### Available macros

Expand table

| Macro                                                              | Description                                                                                           |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `$__timeFilter(<time_column>)`                                     | Applies Grafana’s time range to the specified column. Applicable to date/timestamp/long time columns. |
| `$__timeFilter(<time_column>,<format>)`                            | Same as above, but specify the format of the time column stored in the database.                      |
| `$__timeFilter(<time_column>,"epoch",<format>)`                    | Use when your time column is in epoch format. Format can be `s`, `ms`, or `ns`.                       |
| `$__fromTimeFilter(<time_column>)`                                 | Returns time condition based on Grafana’s **From** time.                                              |
| `$__fromTimeFilter(<time_column>,<comparison_predicate>)`          | Same as above, but specify the comparison predicate.                                                  |
| `$__fromTimeFilter(<time_column>,<format>)`                        | Same as above, but specify the format of the time column.                                             |
| `$__fromTimeFilter(<time_column>,<format>,<comparison_predicate>)` | Specify both format and comparison predicate.                                                         |
| `$__toTimeFilter(<time_column>)`                                   | Returns time condition based on Grafana’s **To** time.                                                |
| `$__toTimeFilter(<time_column>,<comparison_predicate>)`            | Same as above, but specify the comparison predicate.                                                  |
| `$__toTimeFilter(<time_column>,<format>)`                          | Same as above, but specify the format of the time column.                                             |
| `$__toTimeFilter(<time_column>,<format>,<comparison_predicate>)`   | Specify both format and comparison predicate.                                                         |
| `$__timeGroup(<time_column>,<interval>)`                           | Groups time into interval buckets. Expands to `SERIES_ROUND()`.                                       |
| `$__timeGroup(<time_column>,<interval>,<round_mode>)`              | Same as above, with an optional rounding mode (e.g., `ROUND_HALF_UP`).                                |
| `$__fromTimeStamp()`                                               | Expands to the **From** timestamp. Example: `timestamp'2023-01-11T00:02:03Z'`                         |
| `$__toTimeStamp()`                                                 | Expands to the **To** timestamp. Example: `timestamp'2023-01-12T00:02:03Z'`                           |
| `$__interval`                                                      | Grafana’s calculated interval based on the time range and panel width. Example: `1h`, `5m`.           |
| `$__intervalSeconds`                                               | The interval in seconds. Example: `3600` for a 1-hour interval.                                       |
| `$__intervalMs`                                                    | The interval in milliseconds. Example: `3600000` for a 1-hour interval.                               |

### $\_\_timeFilter macro

The `$__timeFilter(<time_column>)` macro applies the dashboard time range to a column.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
-- Query with macro
SELECT ts, temperature FROM weather WHERE $__timeFilter(ts)

-- Expands to
SELECT ts, temperature FROM weather WHERE "ts" > '2021-02-24T12:52:48Z' AND "ts" < '2021-03-24T12:52:48Z'
```

### $\_\_timeFilter with custom format

If your time column is stored in a custom format, specify the format as the second argument.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
-- Time column in YYYYMMDDHH24MISS format (e.g., 20210421162012)
SELECT TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') AS METRIC_TIME, "VALUE"
FROM "SCH"."TBL"
WHERE $__timeFilter("TS","YYYYMMDDHH24MISS")

-- Time column in YYYY-MON-DD format (e.g., 2021-JAN-15)
SELECT TO_TIMESTAMP("TS",'YYYY-MON-DD') AS METRIC_TIME, "VALUE"
FROM "SCH"."TBL"
WHERE $__timeFilter("TS","YYYY-MON-DD")
```

### $\_\_timeFilter with epoch timestamps

For epoch timestamps, use the `"epoch"` format with a precision specifier.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
-- Epoch seconds (e.g., 1257894000)
SELECT ADD_SECONDS('1970-01-01', "TIMESTAMP") AS "METRIC_TIME", "VALUE"
FROM "SCH"."TBL"
WHERE $__timeFilter("TIMESTAMP","epoch","s")

-- Epoch milliseconds (e.g., 1257894000000)
SELECT ADD_SECONDS('1970-01-01', "TIMESTAMP"/1000) AS "METRIC_TIME", "VALUE"
FROM "SCH"."TBL"
WHERE $__timeFilter("TIMESTAMP","epoch","ms")

-- Epoch nanoseconds (e.g., 1257894000000000000)
SELECT ADD_SECONDS('1970-01-01', "TIMESTAMP"/1000000000) AS "METRIC_TIME", "VALUE"
FROM "SCH"."TBL"
WHERE $__timeFilter("TIMESTAMP","epoch","ns")
```

You can also use shorthand notation:

SQL [Copy code to clipboard] Copy

```sql
-- These are equivalent
$__timeFilter("TIMESTAMP","epoch","ms")
$__timeFilter("TIMESTAMP","epoch_ms")
```

### $\_\_fromTimeFilter and $\_\_toTimeFilter macros

These macros return conditions based on Grafana’s **From** or **To** time.

**Parameters:**

- `<time_column>`: The time field name.
- `<format>`: Optional. Format of the time column. Can be `epoch_s`, `epoch_ms`, `epoch_ns`, or a custom format like `YYYY-MM-DD`.
- `<comparison_predicate>`: Optional. Comparison operator. Default is `>` for `$__fromTimeFilter` and `<` for `$__toTimeFilter`. Can be `=`, `!=`, `<>`, `<`, `<=`, `>`, or `>=`.

**Examples:**

SQL [Copy code to clipboard] Copy

```sql
$__fromTimeFilter("TS")                         -- "TS" > '2014-11-12T11:45:26Z'
$__fromTimeFilter("TS",">=")                    -- "TS" >= '2014-11-12T11:45:26Z'
$__fromTimeFilter("TS","epoch_ms")              -- ADD_SECONDS('1970-01-01', ("TS" / 1000)) > '2014-11-12T11:45:26Z'
$__fromTimeFilter("TS","YYYYMMDDHH24MISS",">=") -- TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') >= '2014-11-12T11:45:26Z'
$__toTimeFilter("TS")                           -- "TS" < '2015-11-12T11:45:26Z'
```

### $\_\_fromTimeStamp and $\_\_toTimeStamp macros

These macros return SAP HANA timestamp literals for the dashboard’s **From** and **To** times.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
-- Use timestamps directly in expressions
SELECT * FROM "events"
WHERE "event_time" BETWEEN $__fromTimeStamp() AND $__toTimeStamp()

-- Expands to
SELECT * FROM "events"
WHERE "event_time" BETWEEN timestamp'2014-11-12T11:45:26Z' AND timestamp'2015-11-12T11:45:26Z'
```

### $\_\_timeGroup macro

The `$__timeGroup(<time_column>,<interval>)` macro groups time into interval buckets using SAP HANA’s `SERIES_ROUND` function.

You can also specify an optional third argument for the rounding mode:

`$__timeGroup(<time_column>,<interval>,<round_mode>)`

The round mode is passed directly to SAP HANA’s `SERIES_ROUND` function. Common values include `ROUND_HALF_UP`, `ROUND_HALF_DOWN`, `ROUND_UP`, `ROUND_DOWN`, `ROUND_CEILING`, and `ROUND_FLOOR`.

**Example with rounding mode:**

SQL [Copy code to clipboard] Copy

```sql
-- Round timestamps down to the nearest hour
SELECT $__timeGroup(timestamp, 1h, ROUND_DOWN), avg("value") as "value"
FROM "salesdata"
WHERE $__timeFilter("timestamp")
GROUP BY $__timeGroup(timestamp, 1h, ROUND_DOWN)
```

**Valid intervals:**

Expand table

| Interval | Duration                                      |
|----------|-----------------------------------------------|
| `ms`     | MILLISECOND (converted to fractional seconds) |
| `s`      | SECOND                                        |
| `m`      | MINUTE                                        |
| `h`      | HOUR                                          |
| `d`      | DAY                                           |
| `M`      | MONTH                                         |
| `y`      | YEAR                                          |

**Example:**

SQL [Copy code to clipboard] Copy

```sql
-- Query with macro
SELECT $__timeGroup(timestamp,1h), "user", sum("value") as "value"
FROM "salesdata"
WHERE $__timeFilter("timestamp")
GROUP BY $__timeGroup(timestamp,1h), "user"
ORDER BY $__timeGroup(timestamp,1h) ASC

-- Expands to
SELECT SERIES_ROUND("timestamp", 'INTERVAL 1 HOUR') as "timestamp", "user", sum("value") as "value"
FROM "salesdata"
WHERE "timestamp" > '2020-01-01T00:00:00Z' AND "timestamp" < '2020-01-01T23:00:00Z'
GROUP BY SERIES_ROUND("timestamp", 'INTERVAL 1 HOUR'), "user"
ORDER BY "timestamp" ASC
```

> Note
>
> When using GROUP BY with the `$__timeGroup` macro, ensure your SELECT and ORDER BY fields use the same expression as your GROUP BY field. Otherwise, HANA may not recognize the query.

#### Use dynamic intervals

Instead of hardcoding the interval, use `$__interval` to let Grafana calculate the interval based on the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT $__timeGroup(timestamp, $__interval), sum("value") as "value"
FROM "salesdata"
WHERE $__timeFilter("timestamp")
GROUP BY $__timeGroup(timestamp, $__interval)
ORDER BY $__timeGroup(timestamp, $__interval) ASC
```

For more information about global variables, refer to [Global variables](/docs/grafana/latest/dashboards/variables/add-template-variables/#global-variables).

#### Use interval values in calculations

Use `$__intervalSeconds` or `$__intervalMs` when you need the interval as a number for calculations:

SQL [Copy code to clipboard] Copy

```sql
-- Calculate rate per second using the interval
SELECT $__timeGroup(timestamp, $__interval),
       sum("bytes") / $__intervalSeconds as "bytes_per_second"
FROM "network_traffic"
WHERE $__timeFilter("timestamp")
GROUP BY $__timeGroup(timestamp, $__interval)
```

### Macro examples

The following examples show macro expansions when the dashboard has `2014-11-12T11:45:26.371Z` as the **From** time and `2015-11-12T11:45:26.371Z` as the **To** time.

Expand table

| Macro                                             | Expands to                                                                                                                          |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter("TS")`                             | `"TS" > '2014-11-12T11:45:26Z' AND "TS" < '2015-11-12T11:45:26Z'`                                                                   |
| `$__timeFilter("TS","YYYYMMDDHH24MISS")`          | `TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') > '2014-11-12T11:45:26Z' AND TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') < '2015-11-12T11:45:26Z'` |
| `$__timeFilter("TS","epoch_ms")`                  | `"TS" > '1415792726000' AND "TS" < '1447328726000'`                                                                                 |
| `$__timeFilter("TS","epoch_ns")`                  | `"TS" > '1415792726000000000' AND "TS" < '1447328726000000000'`                                                                     |
| `$__fromTimeFilter("TS")`                         | `"TS" > '2014-11-12T11:45:26Z'`                                                                                                     |
| `$__fromTimeFilter("TS","epoch")`                 | `ADD_SECONDS( '1970-01-01', "TS" ) > '2014-11-12T11:45:26Z'`                                                                        |
| `$__fromTimeFilter("TS","epoch_s")`               | `ADD_SECONDS( '1970-01-01', "TS" ) > '2014-11-12T11:45:26Z'`                                                                        |
| `$__fromTimeFilter("TS","epoch_ms")`              | `ADD_SECONDS( '1970-01-01', ("TS" / 1000)) > '2014-11-12T11:45:26Z'`                                                                |
| `$__fromTimeFilter("TS","epoch_ns")`              | `ADD_SECONDS( '1970-01-01', ("TS" / 1000000000)) > '2014-11-12T11:45:26Z'`                                                          |
| `$__fromTimeFilter("TS","YYYYMMDDHH24MISS")`      | `TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') > '2014-11-12T11:45:26Z'`                                                                    |
| `$__fromTimeFilter("TS",">=")`                    | `"TS" >= '2014-11-12T11:45:26Z'`                                                                                                    |
| `$__fromTimeFilter("TS","epoch_ms",">=")`         | `ADD_SECONDS( '1970-01-01', ("TS" / 1000)) >= '2014-11-12T11:45:26Z'`                                                               |
| `$__fromTimeFilter("TS","YYYYMMDDHH24MISS",">=")` | `TO_TIMESTAMP("TS",'YYYYMMDDHH24MISS') >= '2014-11-12T11:45:26Z'`                                                                   |
| `$__toTimeFilter("TS")`                           | `"TS" < '2015-11-12T11:45:26Z'`                                                                                                     |
| `$__timeGroup("TS","1h")`                         | `SERIES_ROUND("TS", 'INTERVAL 1 HOUR')`                                                                                             |
| `$__timeGroup("TS","$__interval")`                | `SERIES_ROUND("TS", 'INTERVAL 6 HOUR')`                                                                                             |

## Visualize data as logs

To visualize data in the **Logs** viewer in Explore, select the **Logs** format for your query.

### Requirements

Your log query must include:

- At least one **time column** (timestamp)
- At least one **string column** for the log content

Optionally, you can include a **level** column to set the log level for each row. For supported log levels and their keywords, refer to [Logs in Explore](/docs/grafana/latest/explore/logs-integration/).

Any additional columns in your query are treated as additional fields or detected fields in the logs.

### Example log query

SQL [Copy code to clipboard] Copy

```sql
SELECT 'hello foo' AS "content", timestamp'2021-12-31 23:59:59' AS "start_time", 'warn'  AS "level" FROM DUMMY UNION
SELECT 'hello bar' AS "content", timestamp'2021-12-30 14:12:59' AS "start_time", 'error' AS "level" FROM DUMMY UNION
SELECT 'hello baz' AS "content", timestamp'2021-12-30 23:59:59' AS "start_time", 'warn' AS "level" FROM DUMMY UNION
SELECT 'hello qux' AS "content", timestamp'2021-12-29 23:59:59' AS "start_time", 'info' AS "level" FROM DUMMY UNION
SELECT 'hello quux' AS "content", timestamp'2021-12-28 23:59:59' AS "start_time", 'unknown' AS "level" FROM DUMMY UNION
SELECT 'hello quuz' AS "content", timestamp'2021-12-27 23:59:59' AS "start_time", 'info' AS "level" FROM DUMMY;
```

## Additional resources

- [SAP HANA SQL Reference](https://help.sap.com/viewer/4fe29514fd584807ac9f2a04f6754767/2.0.05/en-US/209f5020751910148fd8fe88aa4d79d9.html)
- [SAP HANA SERIES\_ROUND Function](https://help.sap.com/viewer/7c78579ce9b14a669c1f3295b0d8ca16/Cloud/en-US/435ec476ab494ad6b8409f22abec13fe.html)
- [SAP HANA Series Data Reference](https://help.sap.com/viewer/b2f4bdf7b83f4444bfab5564e9ff6aee/2.0.00/en-US/7795e7d4bb3547c180bbd8c97e6d1497.html)
