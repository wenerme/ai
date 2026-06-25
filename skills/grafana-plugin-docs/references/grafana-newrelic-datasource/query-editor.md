---
title: "New Relic query editor | Grafana Enterprise Plugins documentation"
description: "Use the New Relic query editor to query metrics, logs, traces, and NRQL data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# New Relic query editor

This document explains how to use the New Relic query editor to build queries in Grafana.

## Before you begin

- Ensure you have [configured the New Relic data source](/docs/plugins/grafana-newrelic-datasource/latest/configure/).
- Verify your API key has the appropriate permissions for the data you want to query.

## Query types

The query editor supports five query types, selectable from the **Service** switcher at the top of the editor:

- **Metrics** — Query APM metric data for a specific application.
- **Data Explorer** — Build NRQL queries visually without writing raw NRQL.
- **NRQL Editor** — Write raw NRQL queries with code completion.
- **Logs** — Search and view logs stored in New Relic.
- **Traces** — Search for distributed traces or look up a specific trace by ID.

## Metrics

The Metrics query type lets you query APM metric data for a specific application.

Expand table

| Field           | Description                                                                                                                                                                                                      |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Application** | Select the source application. Start typing in the drop-down to search. Use the search icon to browse when you have a large number of applications.                                                              |
| **Metric**      | Select the metric namespace from the cascading drop-down lists. Use the search icon to browse when you have a large number of metrics.                                                                           |
| **Value**       | Select one or more metric values to return.                                                                                                                                                                      |
| **Alias By**    | Customize the series name. You can combine plain text with the variables `$__nr_metric` (the metric name, for example `CPU/User time`) and `$__nr_metric_value` (the metric value, for example `average_value`). |
| **Period**      | Set the aggregation period. Leave empty for automatic period selection.                                                                                                                                          |

> Note
>
> The search icon next to the **Application** and **Metric** selectors returns up to 1000 results. Use the name filter to narrow results if you have more than 1000 applications or metrics. Search is case-sensitive.

If you don’t find an option in the drop-down lists, you can create a custom entry by selecting **Create: (your text)**.

## Data Explorer

Data Explorer lets you build [NRQL](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/) queries visually without writing raw NRQL. The editor generates a NRQL query based on your selections, which you can preview before running.

Expand table

| Field           | Description                                                                                                                                                                                                 |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **From**        | The data type to query (for example, `Transaction`, `SystemSample`). Changing this field resets the rest of the query to defaults.                                                                          |
| **Select**      | One or more aggregations to include in the `SELECT` clause. You can perform arithmetic operations over two aggregated fields. Each item can optionally be filtered using a NRQL `FILTER` expression.        |
| **Where**       | *(Optional)* Raw NRQL filter condition. For example: `appName = 'my-app' AND serverName IN ('server1','server2')`. This field accepts Grafana template variables.                                           |
| **Facet**       | *(Optional)* Separate and group results by attribute values. Use **FACET BY CASES** to group by more complex conditions.                                                                                    |
| **Time Filter** | *(Optional)* Filter data based on a time range. Select **Dashboard time** to use Grafana’s selected time range (default), or choose a fixed time window.                                                    |
| **Format**      | Select `TIMESERIES` or `TABLE`. `TIMESERIES` adds the `TIMESERIES` keyword and returns data aggregated by time period. `TABLE` returns summary data without time aggregation.                               |
| **Interval**    | *(Optional)* When using the `TIMESERIES` format, set the aggregation interval. Options: `AUTO`, `MAX`, or `CUSTOM`. When set to `CUSTOM`, you can specify a duration and unit (seconds, minutes, or hours). |
| **Slide By**    | *(Optional)* When using a custom interval with the `TIMESERIES` format, set a sliding time window range using the `SLIDE BY` clause.                                                                        |

You can preview the generated NRQL query in the **NRQL preview** section. To further customize the query, click **Switch to NRQL Editor** to switch to the raw NRQL editor.

The available aggregation functions in the **Select** field include: `count`, `average`, `sum`, `latest`, `median`, `max`, `min`, `uniqueCount`, and `uniques`.

For more information about NRQL syntax, refer to the [New Relic NRQL documentation](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/).

## NRQL Editor

The NRQL Editor lets you write raw [New Relic Query Language](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/) queries. Code completion displays as you type — highlight an option with the arrow keys and press **Tab** to select it.

Expand table

| Field      | Description                                                                                                                                            |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query**  | The NRQL query to execute. Use `$__timeFilter` to sync results to the dashboard time range.                                                            |
| **Format** | Select `TimeSeries` or `Table`. **TimeSeries** expects the query to include the `TIMESERIES` keyword. **Table** returns data without time aggregation. |

### Macros

The NRQL Editor supports the following macros for dynamic queries.

Expand table

| Macro                                                                       | Description                                                                                                                                                                                                                                           |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFilter`                                                             | Replaced with `SINCE <from> UNTIL <to>` based on the dashboard time range. Include this in every NRQL query to sync results with the dashboard.                                                                                                       |
| `$__timeSeries(time range, corresponding aggregation, default aggregation)` | Dynamically sets the `TIMESERIES` aggregation based on the dashboard time range. For example, `$__timeSeries(60m, 1 MINUTE, MAX)` expands to `TIMESERIES 1 MINUTE` when the dashboard interval is 60 minutes or less, and `TIMESERIES MAX` otherwise. |

### NRQL query examples

Average transaction duration as a time series:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction $__timeFilter TIMESERIES
```

Error rate by application:

SQL [Copy code to clipboard] Copy

```sql
SELECT percentage(count(*), WHERE error IS true) FROM Transaction FACET appName $__timeFilter TIMESERIES
```

95th percentile response time:

SQL [Copy code to clipboard] Copy

```sql
SELECT percentile(duration, 95) FROM Transaction WHERE appName = 'my-app' $__timeFilter TIMESERIES
```

Top 10 slowest transactions (table format):

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration), count(*) FROM Transaction FACET name $__timeFilter LIMIT 10
```

Using the `$__timeSeries` macro for dynamic aggregation:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(cpuPercent) FROM SystemSample $__timeFilter $__timeSeries(60m, 1 MINUTE, MAX)
```

> Note
>
> Always include the `$__timeFilter` macro in your NRQL queries. Without it, query results don’t sync with the dashboard time range.

### COMPARE WITH queries

NRQL queries that use the `COMPARE WITH` clause automatically render comparison data as dotted lines in time-series visualizations, making it easy to compare current data with historical periods.

For example, compare this week’s response time with last week:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction $__timeFilter TIMESERIES COMPARE WITH 1 WEEK AGO
```

### Synthetics queries

You can query New Relic Synthetics data from the `SyntheticCheck` and `SyntheticRequest` tables using the NRQL Editor.

The following example returns the count of all requests by response status:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) FROM SyntheticRequest FACET responseStatus $__timeFilter
```

The following example returns the success rate for all monitors:

SQL [Copy code to clipboard] Copy

```sql
SELECT (
    filter(count(*), WHERE result = 'SUCCESS')
    / filter(count(*), WHERE result IN ('SUCCESS', 'FAILED'))
    * 100
) as 'Success Rate' FROM SyntheticCheck
FACET monitorName $__timeFilter TIMESERIES
```

For more information about Synthetics monitoring queries, refer to [Events reported by synthetic monitoring](https://docs.newrelic.com/docs/telemetry-data-platform/understand-data/event-data/events-reported-synthetic-monitoring/).

## Logs

The Logs query type lets you search and view logs stored in the New Relic `Log` table. Results are displayed in Grafana’s log format and are automatically filtered by the dashboard time range. A maximum of 2000 records are returned per query due to NRQL API limitations.

Expand table

| Field        | Description                                                                                                                     |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Table**    | *(Optional)* The log table to query. Defaults to `Log`. Use this to query a custom log partition table.                         |
| **Query**    | *(Optional)* NRQL filter expression for searching logs. For example: `message LIKE '%ERROR%' AND container_name = 'petclinic'`. |
| **Order By** | Sort order for results. Default: `timestamp DESC`. Change to `timestamp ASC` for chronological order.                           |

> Note
>
> The logs volume panel in Explore can help identify periods with high log volume. If your query returns the maximum 2000 records, narrow the time range to view all relevant logs.

### Log query examples

Search for error logs from a specific container:

[Copy code to clipboard] Copy

```none
message LIKE '%ERROR%' AND container_name = 'petclinic'
```

Filter logs by severity level:

[Copy code to clipboard] Copy

```none
level = 'ERROR' OR level = 'FATAL'
```

Search for logs containing a specific trace ID:

[Copy code to clipboard] Copy

```none
traceId = '951ae3313c093aa3278cbc27c0714c94'
```

If a log row contains a field such as `traceId`, `traceid`, or `trace.id`, the logs panel provides a link to the corresponding trace view.

## Traces

The Traces query type lets you search for distributed traces or look up a specific trace by ID.

The **Query Type** selector determines the mode:

### Search

Search mode lets you find traces by filtering on span attributes.

Expand table

| Field        | Description                                                                                                                              |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Query**    | *(Optional)* NRQL filter expression for searching traces. For example: `parentId IS NULL AND duration > 0.05 AND appName = 'petclinic'`. |
| **Order By** | *(Optional)* Sort order for results. Options: `Timestamp DESC`, `Timestamp ASC`, `Duration DESC`, `Duration ASC`.                        |

### Trace ID

Trace ID mode lets you look up a specific trace by its ID.

Expand table

| Field          | Description                                                                                                               |
|----------------|---------------------------------------------------------------------------------------------------------------------------|
| **Trace ID**   | The trace ID to look up. For example: `951ae3313c093aa3278cbc27c0714c94`.                                                 |
| **Start time** | *(Optional)* The trace start time as an epoch timestamp in milliseconds. Use this to retrieve traces older than one hour. |

For more information about the New Relic tracing API, refer to [Query distributed trace data](https://docs.newrelic.com/docs/distributed-tracing/ui-data/query-distributed-trace-data/).
