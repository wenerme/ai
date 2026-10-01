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

> Tip
>
> You can also use [Grafana Assistant](/docs/grafana/latest/ai/assistant/) to build and run Snowflake SQL queries from natural language. Mention your Snowflake data source with the `@` symbol in your prompt to get started.

You can also access the query editor when building a dashboard:

1. Click **Dashboards** in the left-side menu.
2. Click **New** &gt; **New Dashboard**.
3. Click **Add visualization**.
4. Select your Snowflake data source.

## Write a query

The Snowflake query editor uses standard SQL syntax. Enter your SQL query in the editor. To run it while editing, press `Ctrl/Cmd+S` or select the run (play) icon above the editor.

For basic queries, use standard SQL:

SQL [Copy code to clipboard] Copy

```sql
SELECT column1, column2 FROM your_table LIMIT 100;
```

For time-based visualizations, use Grafana macros such as `$__timeFilter` and `$__timeGroup` to make your queries respond to the dashboard time range. Refer to [Macros](#macros) for the full reference.

> Tip
>
> As you type in the editor, it suggests the `$__timeFilter` and `$__timeGroup` macros and any dashboard template variables.

### Set the query format

Use the **Format as** drop-down in the query editor to tell Grafana how to interpret the query results:

- **Time Series** - Returns time-based data for graph and time series panels.
- **Table** - Returns rows and columns for table panels.
- **Logs** - Returns log lines for the Logs viewer in Explore.

## Query examples

The following examples show common query patterns for different visualization types.

### Table visualization

Most queries in Snowflake are best represented by a table visualization. Any query displays data in a table.

This example returns results for a table visualization:

SQL [Copy code to clipboard] Copy

```sql
SELECT query_type, warehouse_name, total_elapsed_time
FROM snowflake.account_usage.query_history
LIMIT 100;
```

### Time series visualization

For time series or graph visualizations, there are a few requirements:

- A column with a `date` or `datetime` type must be selected.
- The `date` column must be in ascending order (using `ORDER BY column ASC`).
- A numeric column must also be selected.

To create a useful graph, use the `$__timeFilter` and `$__timeGroup` macros.

**Example time series query:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(start_time, $__interval) AS time,
  avg(execution_time) AS average_execution_time,
  query_type
FROM
  snowflake.account_usage.query_history
WHERE
  $__timeFilter(start_time)
GROUP BY
  time, query_type
ORDER BY
  time ASC;
```

The `snowflake.account_usage` examples require the `ACCOUNTADMIN` role, or a role granted the `IMPORTED PRIVILEGES` privilege on the `SNOWFLAKE` database.

### Time series with a timezone-aware column

When your time column stores a timezone (`TIMESTAMP_TZ` or `TIMESTAMP_LTZ`), use `$__timeTzFilter` instead of `$__timeFilter`:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(event_time, $__interval) AS time,
  count(*) AS event_count
FROM
  your_database.your_schema.events
WHERE
  $__timeTzFilter(event_time)
GROUP BY
  time
ORDER BY
  time ASC;
```

### Filter with a template variable

Use [template variables](/docs/plugins/grafana-snowflake-datasource/latest/template-variables/) to make queries respond to dashboard drop-downs. This example filters by a `warehouse` variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(start_time, $__interval) AS time,
  avg(execution_time) AS average_execution_time
FROM
  snowflake.account_usage.query_history
WHERE
  $__timeFilter(start_time)
  AND warehouse_name = '$warehouse'
GROUP BY
  time
ORDER BY
  time ASC;
```

## Macros

Macros are special functions that Grafana expands into Snowflake-compatible SQL before sending the query. Use these macros to create dynamic queries that respond to the dashboard time range.

Expand table

| Macro                                         | Description                                                                                                                              | Output example                                                                                                                                              |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter(column)`                       | Filters `column` by the panel time range. Use for columns stored without a timezone, such as `TIMESTAMP_NTZ`.                            | `CONVERT_TIMEZONE('UTC', 'UTC', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', 'UTC', time) > '2017-07-18T11:15:52Z'`                           |
| `$__timeFilter(column, timezone)`             | Filters `column` by the panel time range and converts from UTC to the specified `timezone`. Use for columns stored without a timezone.   | `CONVERT_TIMEZONE('UTC', 'America/New_York', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', 'America/New_York', time) > '2017-07-18T11:15:52Z'` |
| `$__timeTzFilter(column)`                     | Filters `column` by the panel time range. Use for columns stored with a timezone, such as `TIMESTAMP_TZ` or `TIMESTAMP_LTZ`.             | `CONVERT_TIMEZONE('UTC', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('UTC', time) > '2017-07-18T11:15:52Z'`                                         |
| `$__timeTzFilter(column, timezone)`           | Filters `column` by the panel time range and converts to the specified `timezone`. Use for columns stored with a timezone.               | `CONVERT_TIMEZONE('America/New_York', time) < '2017-07-18T11:15:52Z' AND CONVERT_TIMEZONE('America/New_York', time) > '2017-07-18T11:15:52Z'`               |
| `$__timeGroup(column, $__interval)`           | Groups timestamps by the interval so that there is only 1 point for every `$__interval` on the graph.                                    | `TIME_SLICE(TO_TIMESTAMP(created_ts), 1, 'HOUR', 'START')`                                                                                                  |
| `$__timeGroup(column, $__interval, timezone)` | Groups timestamps by the interval so that there is only 1 point for every `$__interval` on the graph and converts to the given timezone. | `TIME_SLICE(TO_TIMESTAMP(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', created_ts)), 1, 'HOUR', 'START')`                                                  |

The `$__timeGroup` macro accepts standard Grafana interval values, including day units such as `1d`.

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

If the query returns additional columns, they’re treated as additional detected fields in the logs.

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
