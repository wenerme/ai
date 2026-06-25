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

SQL [Copy code to clipboard] Copy

```sql
SELECT
  TABSCHEMA AS SCHEMA,
  TABNAME AS TABLE_NAME,
  TYPE AS OBJECT_TYPE
FROM SYSIBM.SYSTABLES
WHERE TYPE = 'T'
ORDER BY TABSCHEMA, TABNAME
```

## Time series format

Use the Time series format to visualize data over time in graphs. Your query must return:

- A column named `time` (or aliased as `time`) containing timestamp values
- One or more numeric columns for the values to plot

### Example: Time series with generated data

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

## Annotations

You can use IBM Db2 queries to create annotations on your dashboards. Annotations mark points in time with events or notes.

To create an annotation query:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Click **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Select your IBM Db2 data source.
5. Enter a SQL query that returns the required columns.

### Annotation query requirements

Your query should return the following columns:

Expand table

| Column | Required | Description                         |
|--------|----------|-------------------------------------|
| `time` | Yes      | Timestamp for the annotation.       |
| `text` | No       | Text to display in the annotation.  |
| `tags` | No       | Comma-separated tags for filtering. |

### Example: Annotation query

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  event_description AS text,
  event_category AS tags
FROM events
ORDER BY event_time
```

## Alerting

The IBM Db2 data source supports Grafana Alerting. You can create alert rules based on your Db2 queries.

For more information, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).
