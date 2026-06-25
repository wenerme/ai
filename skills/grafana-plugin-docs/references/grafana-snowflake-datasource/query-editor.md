---
title: "Snowflake query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Snowflake query editor in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Snowflake query editor

This document explains how to use the Snowflake query editor in Grafana.

## Before you begin

- Ensure you have [configured the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/).
- Verify your Snowflake user has appropriate permissions to query the tables you need.

## Access the query editor

To access the Snowflake query editor:

1. Click **Explore** in the left-side menu.
2. Select your Snowflake data source from the drop-down.

The query editor opens, where you can write SQL queries against your Snowflake data.

You can also access the query editor when building a dashboard:

1. Click **Dashboards** in the left-side menu.
2. Click **New** &gt; **New Dashboard**.
3. Click **Add visualization**.
4. Select your Snowflake data source.

## Write a query

The Snowflake query editor uses standard SQL syntax. Enter your SQL query in the editor and click **Run query** (or press `Shift+Enter`) to execute it.

For basic queries, use standard SQL:

SQL [Copy code to clipboard] Copy

```sql
SELECT column1, column2 FROM your_table LIMIT 100;
```

For time-based visualizations, use Grafana macros like `$__timeFilter` and `$__timeGroup` to make your queries respond to the dashboard time range. Refer to [Macros](#macros) for the full reference.

## Query examples

The following examples show common query patterns for different visualization types.

### Table visualization

Most queries in Snowflake are best represented by a table visualization. Any query will display data in a table.

This example returns results for a table visualization:

SQL [Copy code to clipboard] Copy

```sql
SELECT {column_1}, {column_2} FROM {table};
```

### Timeseries visualization

For timeseries or graph visualizations, there are a few requirements:

- A column with a `date` or `datetime` type must be selected.
- The `date` column must be in ascending order (using `ORDER BY column ASC`).
- A numeric column must also be selected.

To create a useful graph, use the `$__timeFilter` and `$__timeGroup` macros.

**Example timeseries query:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(start_time, $__interval) AS time,
  avg(execution_time) AS average_execution_time,
  query_type
FROM
  account_usage.query_history
WHERE
  $__timeFilter(start_time)
GROUP BY
  time, query_type
ORDER BY
  time ASC;
```

## Macros

Macros are special functions that Grafana expands into Snowflake-compatible SQL before sending the query. Use these macros to create dynamic queries that respond to the dashboard time range.

Expand table

| Macro                                         | Description                                                                                                                                                   | Output example                                                                                                                                             |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter(column)`                       | Filters the `column` by the panel time range. Column must have fields without timezones.                                                                      | `CONVERT_TIMEZONE('UTC', 'UTC', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', 'UTC', time) > '2017-07-18T11:15:52Z`                           |
| `$__timeFilter(column, timezone)`             | Filters the `column` by the panel time range and converts from UTC to the specified `timezone`. Column must have fields without timezones.                    | `CONVERT_TIMEZONE('UTC', 'America/New_York', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', 'America/New_York', time) > '2017-07-18T11:15:52Z` |
| `$__timeTzFilter(column)`                     | Filters the `column` by the panel time range. Column should have fields that include timezones.                                                               | `CONVERT_TIMEZONE('UTC', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', time) > '2017-07-18T11:15:52Z`                                         |
| `$__timeTzFilter(column, timezone)`           | Filters the `column` by the panel time range and converts the current timezone to the specified `timezone`. Column should have fields that include timezones. | `CONVERT_TIMEZONE('America/New_York', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('America/New_York', time) > '2017-07-18T11:15:52Z`               |
| `$__timeGroup(column, $__interval)`           | Groups timestamps by the interval so that there is only 1 point for every `$__interval` on the graph.                                                         | `TIME_SLICE(TO_TIMESTAMP(created_ts), 1, 'HOUR', 'START')`                                                                                                 |
| `$__timeGroup(column, $__interval, timezone)` | Groups timestamps by the interval so that there is only 1 point for every `$__interval` on the graph and converts to the given timezone.                      | `TIME_SLICE(TO_TIMESTAMP(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', created_ts)), 1, 'HOUR', 'START')`                                                 |

## Inspect the query

Because Grafana supports macros that Snowflake does not understand directly, the fully rendered query (which can be copied and pasted directly into Snowflake) is visible in the Query Inspector.

To view the full interpolated query:

1. Click the **Query Inspector** button in the panel editor.
2. Select the **Query** tab.
3. View the fully rendered SQL query.

If you need to debug further, check out the **Query History** page in Snowsight. For more information, refer to [Monitor query activity with Query History](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity).

## Visualize data as logs

With the **Logs** format selected in the query, you can visualize data in the Logs viewer in Explore.

### Log query requirements

When querying with **Logs** format, your query should have:

- At least one time column
- At least one string/content column
- Optionally, a third column called **level** to set the log level

Supported log levels and their keywords can be found in the [Grafana logs integration documentation](/docs/grafana/latest/explore/logs-integration/).

If the query returns additional columns, they will be treated as additional fields/detected fields in the logs.

### Log query example

SQL [Copy code to clipboard] Copy

```sql
SELECT
  'hello foo' as "content",
  (timestamp '2021-12-31') as "start_time",
  'warn' as "level"
UNION
SELECT
  'hello bar' as "content",
  (timestamp '2021-12-30 14:12:59') as "start_time",
  'error' as "level"
UNION
SELECT
  'hello baz' as "content",
  (timestamp '2021-12-30') as "start_time",
  'warn' as "level"
UNION
SELECT
  'hello qux' as "content",
  (timestamp '2021-12-29') as "start_time",
  'info' as "level"
UNION
SELECT
  'hello world' as "content",
  (timestamp '2021-12-28') as "start_time",
  'unknown' as "level"
UNION
SELECT
  'hello user' as "content",
  (timestamp '2021-12-27') as "start_time",
  'info' as "level"
```

## Next steps

- Learn how to use [Template variables](/docs/plugins/grafana-snowflake-datasource/latest/template-variables/) in your queries.
