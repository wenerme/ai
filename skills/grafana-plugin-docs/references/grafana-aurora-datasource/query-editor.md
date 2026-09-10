---
title: "Amazon Aurora query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Amazon Aurora query editor, including data frame formats, macros, and alerting support."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Aurora query editor

This document explains how to use the Amazon Aurora query editor to query your Aurora cluster with SQL.

## Before you begin

- Ensure you have [configured the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/).
- Verify your database user has read access to the tables you want to query.

## Write a query

The query editor provides an SQL code editor with syntax highlighting. Write standard SQL for your cluster’s engine: PostgreSQL syntax for PostgreSQL-compatible clusters and MySQL syntax for MySQL-compatible clusters. The editor applies your changes when you click outside of it.

New queries start with the following default query, which you can replace with your own:

SQL [Copy code to clipboard] Copy

```sql
select now() as time, 1 as testvalue
```

> Caution
>
> The plugin doesn’t restrict queries to read-only statements. Grafana recommends connecting with a read-only database user or the cluster reader endpoint to prevent writes to your database.

## Table versus time series format

As with other SQL data sources in Grafana, you can control how the plugin shapes your query results using the **Format data frames as** drop-down, which offers **Table** (the default) and **Time Series** options.

With **Table**, the plugin returns your rows as they come back from the database. If you render a table-formatted query with a time series visualization, string columns such as `city` and `neighborhood` collapse into a single time series. This is often the desired behavior, particularly with the table visualization.

With **Time Series**, the plugin turns each string column into a label and renders a separate series for each combination of label values, such as one series per city and neighborhood combination. Use this format when you want to compare groups in the same panel.

When you use Explore, Grafana automatically renders your data with the appropriate table or time series visualization when you change the format. In dashboards, you control the visualization for each panel.

To learn more, refer to the [Grafana documentation on time series formats](/developers/dataplane/timeseries).

## Macros

The query editor supports macros that Grafana expands before sending the query to your database. Macros simplify working with the dashboard time range and interval.

Expand table

| Macro                   | Description                                                               | Example expansion                                                   |
|-------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------|
| `$__timeFilter(column)` | Filters the column to the dashboard time range.                           | `time >= '2026-07-16T00:00:00Z' AND time <= '2026-07-23T00:00:00Z'` |
| `$__timeFrom(column)`   | Filters the column to values after the start of the dashboard time range. | `time >= '2026-07-16T00:00:00Z'`                                    |
| `$__timeTo(column)`     | Filters the column to values before the end of the dashboard time range.  | `time <= '2026-07-23T00:00:00Z'`                                    |
| `$__interval`           | The suggested interval for the current panel.                             | `10m`                                                               |
| `$__interval_ms`        | The suggested interval for the current panel, in milliseconds.            | `600000`                                                            |

For example, the following query returns only rows within the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
select * from test_table where $__timeFilter(recorded_at)
```

You can also combine macros:

SQL [Copy code to clipboard] Copy

```sql
select * from test_table where $__timeFrom(recorded_at) and $__timeTo(recorded_at)
```

The macros come from the [Grafana plugin SDK SQL utilities](https://github.com/grafana/grafana-plugin-sdk-go/blob/main/data/sqlutil/macros.go). If you have a suggestion for a macro unique to the Amazon Aurora data source, reach out to Grafana Support.

## Query examples

The following examples use a `weather_readings` table with `recorded_at`, `city`, `neighborhood`, and `temperature` columns. Adapt them to your own schema.

### Graph a value over time

To graph a time series, return a time column and one or more numeric columns, scoped to the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
select recorded_at as time, temperature
from weather_readings
where $__timeFilter(recorded_at)
order by recorded_at
```

### Group into time buckets

The plugin doesn’t provide a time-grouping macro, so use your engine’s date functions to bucket rows into intervals. On PostgreSQL-compatible clusters, use `date_trunc`:

SQL [Copy code to clipboard] Copy

```sql
select
  date_trunc('hour', recorded_at) as time,
  city,
  avg(temperature) as avg_temperature
from weather_readings
where $__timeFilter(recorded_at)
group by 1, city
order by 1
```

On MySQL-compatible clusters, round the Unix timestamp instead:

SQL [Copy code to clipboard] Copy

```sql
select
  from_unixtime(floor(unix_timestamp(recorded_at) / 3600) * 3600) as time,
  city,
  avg(temperature) as avg_temperature
from weather_readings
where $__timeFilter(recorded_at)
group by 1, 2
order by 1
```

With **Format data frames as** set to **Time Series**, these queries render one series per city.

### Show the latest rows in a table

To show recent raw data in a table panel, sort by time and limit the result set:

SQL [Copy code to clipboard] Copy

```sql
select recorded_at, city, neighborhood, temperature
from weather_readings
where $__timeFilter(recorded_at)
order by recorded_at desc
limit 100
```

Set **Format data frames as** to **Table** for this query.

## Query caching

If an administrator has enabled [query caching](/docs/plugins/grafana-aurora-datasource/latest/configure/#query-caching) for the data source, Grafana serves repeated queries from the cache instead of running them against your cluster. You can override the cache duration for an individual panel: in the panel editor, expand **Query options** and enter a **Cache TTL** in milliseconds.

## Alerting

The Amazon Aurora data source supports Grafana Alerting. You can create alert rules based on any Aurora query, but template variables don’t work in alert rule queries. Refer to [Amazon Aurora alerting](/docs/plugins/grafana-aurora-datasource/latest/alerting/) for details.

## Next steps

- [Use template variables](/docs/plugins/grafana-aurora-datasource/latest/template-variables/)
- [Set up alerting](/docs/plugins/grafana-aurora-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)
