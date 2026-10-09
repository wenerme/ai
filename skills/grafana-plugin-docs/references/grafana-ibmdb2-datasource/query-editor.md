---
title: "IBM Db2 query editor | Grafana Enterprise Plugins documentation"
description: "Use the IBM Db2 query editor to run SQL queries against your database"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 query editor

The IBM Db2 data source provides a SQL query editor that supports full SQL syntax. Use it to run queries against your IBM Db2 database and visualize the results in Grafana.

## Before you begin

Before using the query editor, ensure you have [configured the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/).

## Query editor interface

The query editor includes the following elements:

Expand table

| Element         | Description                                                                                  |
|-----------------|----------------------------------------------------------------------------------------------|
| **SQL editor**  | A code editor for writing SQL queries with syntax highlighting and line numbers.             |
| **Play button** | Click the green play icon in the top-left corner to run your query.                          |
| **Format as**   | Select how query results are formatted: **Time series** or **Table**. Defaults to **Table**. |

You can also press **Ctrl+S** (or **Cmd+S** on Mac) to save and run your query.

## Result formats

The query editor supports two result formats:

- **Time series:** For time-based data visualization in graphs and charts.
- **Table:** For displaying data in a tabular format.

Select the format using the **Format as** drop-down below the query editor.

> Note
>
> If you don’t set **Format as** before you run a query, the editor picks a format the first time you save or run it. If the query text contains `as time`, the editor selects **Time series**. Otherwise, it selects **Table**. After the format is set, either manually or automatically, the editor keeps your selection.

## Table format

Use the Table format to display query results as rows and columns. This is the default format.

### Example: Count tables

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(*) FROM SYSCAT.TABLES FETCH FIRST 1 ROW ONLY
```

### Example: Query employee data

This example queries the `EMPLOYEE` table from the Db2 SAMPLE database:

SQL [Copy code to clipboard] Copy

```sql
SELECT EMPNO, FIRSTNME, LASTNAME, JOB, SALARY
FROM EMPLOYEE
ORDER BY SALARY DESC
FETCH FIRST 10 ROWS ONLY
```

### Example: Count tables and views

SQL [Copy code to clipboard] Copy

```sql
SELECT 'TABLE' AS OBJECT_TYPE, COUNT(NAME) AS COUNT
FROM SYSIBM.SYSTABLES
WHERE TYPE = 'T'
UNION
SELECT 'VIEW' AS OBJECT_TYPE, COUNT(NAME) AS COUNT
FROM SYSIBM.SYSTABLES
WHERE TYPE = 'V'
ORDER BY 1
```

### Example: List all tables

The `SYSCAT.TABLES` catalog view exposes the `TABSCHEMA` and `TABNAME` columns:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  TABSCHEMA AS SCHEMA,
  TABNAME AS TABLE_NAME,
  TYPE AS OBJECT_TYPE
FROM SYSCAT.TABLES
WHERE TYPE = 'T'
ORDER BY TABSCHEMA, TABNAME
```

## Time series format

Use the Time series format to visualize data over time in graphs. When **Format as** is set to **Time series**, your query must return:

- A `TIMESTAMP` column aliased as `time`
- One or more numeric columns for the values to plot. Each numeric column becomes a separate series.

Order the results by the time column so points render in chronological order. The plugin runs your SQL as written and returns the raw result set. It doesn’t validate column names or types, so a query that doesn’t meet these requirements still runs but fails to render in the panel. For information about data type conversions, refer to [Troubleshoot IBM Db2 data source issues](/docs/plugins/grafana-ibmdb2-datasource/latest/troubleshooting/).

### Example: Time series from a table

Plot a numeric column over time from your own table. The following examples use placeholder table names. Replace them with your own schema:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  reading_time AS time,
  temperature AS value
FROM sensor_readings
WHERE reading_time >= CURRENT_TIMESTAMP - 6 HOURS
ORDER BY reading_time
```

### Example: Aggregate into time buckets

Group rows into hourly buckets and count them. `DATE_TRUNC` requires IBM Db2 11.1 or later:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  DATE_TRUNC('HOUR', event_time) AS time,
  COUNT(*) AS value
FROM events
WHERE event_time >= CURRENT_TIMESTAMP - 24 HOURS
GROUP BY DATE_TRUNC('HOUR', event_time)
ORDER BY time
```

### Example: Time series with generated data

Use this query to test time series rendering without a table. It generates three points from `SYSIBM.SYSDUMMY1`:

SQL [Copy code to clipboard] Copy

```sql
WITH time_series AS (
  SELECT
    CURRENT_TIMESTAMP AS time,
    10.5 AS value
  FROM SYSIBM.SYSDUMMY1
  UNION ALL
  SELECT
    CURRENT_TIMESTAMP - 1 MINUTE AS time,
    15.3 AS value
  FROM SYSIBM.SYSDUMMY1
  UNION ALL
  SELECT
    CURRENT_TIMESTAMP - 2 MINUTES AS time,
    8.7 AS value
  FROM SYSIBM.SYSDUMMY1
)
SELECT time, value FROM time_series
ORDER BY time
```

## SQL macros

The IBM Db2 data source doesn’t support Grafana SQL macros such as `$__timeFilter` or `$__timeGroup`. Write time filters and grouping with standard Db2 SQL. To make queries dynamic, use [template variables](/docs/plugins/grafana-ibmdb2-datasource/latest/template-variables/).

## Annotations

You can use IBM Db2 queries to create annotations on your dashboards. For more information, refer to [Annotations](/docs/plugins/grafana-ibmdb2-datasource/latest/annotations/).

## Alerting

The IBM Db2 data source supports Grafana Alerting. For more information, refer to [Alerting](/docs/plugins/grafana-ibmdb2-datasource/latest/alerting/).
