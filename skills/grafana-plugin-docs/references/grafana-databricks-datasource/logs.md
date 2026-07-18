---
title: "Databricks data source logs | Grafana Enterprise Plugins documentation"
description: "This document describes how to visualize Databricks query results as logs in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Databricks data source logs

The Databricks data source supports the Grafana logs visualization. You can query log-style tables in Databricks, such as audit logs, application logs, or pipeline event tables, and display the results in the [Logs panel](/docs/grafana/latest/panels-visualizations/visualizations/logs/).

## Shape a query for the logs visualization

To render results as logs, your query must return:

- A time column. Use a `datetime` or `timestamp` column, ideally aliased as `time`. Grafana uses this column to order log lines.
- A message column. Return a string column that holds the log line text. Grafana displays this as the log message.

Any additional columns are available as detected fields that you can filter and display alongside each log line.

## Common log table sources

Many Databricks tables work well with the logs visualization. The following are common sources and the columns to map:

Expand table

| Source                                           | Time column          | Message column   | Useful detected fields                              |
|--------------------------------------------------|----------------------|------------------|-----------------------------------------------------|
| Unity Catalog audit logs (`system.access.audit`) | `event_time`         | `action_name`    | `service_name`, `user_identity`, `request_params`   |
| Query history (`system.query.history`)           | `start_time`         | `statement_text` | `statement_type`, `execution_status`, `executed_by` |
| Delta Live Tables event log                      | `timestamp`          | `message`        | `event_type`, `level`, `details`                    |
| Your own application or audit tables             | A `timestamp` column | A message string | Any dimension columns, such as `service` or `host`  |

Alias your chosen columns to `time` and a message column, and include any other columns you want to surface as detected fields.

## Example query

The following query returns recent application log entries within the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  message,
  level,
  service
FROM main.logs.application_events
WHERE $__timeFilter(event_time)
ORDER BY event_time DESC
LIMIT 1000
```

This query returns one log line per row, ordered with the most recent entries first. The `level` and `service` columns appear as detected fields in the Logs panel, so you can filter by log level or service.

> Note
>
> The `$__timeFilter` macro restricts results to the dashboard’s selected time range. Refer to [Macros](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#macros) for the full list of supported macros.

## Color log lines by level

If your result set includes a column named `level`, the Logs panel and Explore use it to color-code each line by severity. Grafana recognizes common level names, such as `critical`, `error` (or `err`), `warning` (or `warn`), `info`, `debug`, and `trace`. Map your source severity values to these names so the coloring is applied. Values that don’t match are shown without level coloring.

The following query normalizes a `severity` column to a `level` column and filters to errors and warnings:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  message,
  lower(severity) AS level,
  service
FROM main.logs.application_events
WHERE $__timeFilter(event_time)
  AND lower(severity) IN ('error', 'warning')
ORDER BY event_time DESC
LIMIT 500
```

You can also drive the filter from a [template variable](/docs/plugins/grafana-databricks-datasource/latest/template-variables/) so dashboard users choose which levels to display, for example `AND lower(severity) IN (${level:singlequote})`.

## Display results in the Logs panel

To view your query results as logs:

1. Add or edit a dashboard panel that uses the Databricks data source.
2. Enter a query that returns a time column and a message column.
3. In the visualization picker, select **Logs**.

The Logs panel renders each row as a log line, ordered by the time column. Use the panel options to control the display:

- **Time** shows or hides the timestamp for each line.
- **Unique labels** and **Wrap lines** adjust how detected fields and long messages are displayed.
- **Order** sets whether the newest or oldest log lines appear first.

Any columns other than the time and message columns appear as detected fields that you can show alongside each line. For details, refer to [Logs panel](/docs/grafana/latest/panels-visualizations/visualizations/logs/).

> Note
>
> The Databricks data source returns query results in table or time series format, so [Explore](/docs/grafana/latest/explore/) displays them in the table view rather than the logs view. To visualize Databricks data as logs, use the Logs panel in a dashboard.

## Build a color-coded error log panel

Combine the previous steps to create a panel that shows recent errors and warnings, colored by severity:

1. Create a panel that uses the Databricks data source and select the **Logs** visualization.
2. Enter the following query, which returns `time`, `message`, and a normalized `level` column.
3. Run the query.

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  message,
  lower(severity) AS level,
  service
FROM main.logs.application_events
WHERE $__timeFilter(event_time)
  AND lower(severity) IN ('error', 'warning')
ORDER BY event_time DESC
LIMIT 500
```

The Logs panel orders lines newest-first, colors each line by the `level` value, and exposes `service` as a detected field that you can show next to each line.
