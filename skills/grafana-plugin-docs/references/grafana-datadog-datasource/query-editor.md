---
title: "Datadog query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the Datadog query editor"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog query editor

The Datadog query editor lets you build and run queries against Datadog. You can query metrics, logs, APM trace spans, RUM events, the event stream, and monitor status, retrieve service-level objectives (SLOs), perform arithmetic across queries, and customize the legend with aliases.

To build a query, select a query type from the **Query type** selector, then complete the fields for that type.

## Datadog query editor options

The query editor supports the following query types:

- [Query](#query)
- [Raw query](#raw-query)
- [Arithmetic](#arithmetic)
- [RUM (Real User Monitoring)](#real-user-monitoring)
- [Logs](#logs)
- [APM Spans](#apm-spans)
- [Monitor](#monitor)
- [Events](#events)
- [SLO (Service Level Objective)](#service-level-objective)

### Query

Use the **Query** query type to get metrics. Use the visual query builder to construct your query.

- **Metric** - Select a metric from the drop-down list.
- **From** - Select an optional tag from the drop-down list.
- **Aggregate** - Select how to aggregate the series. Options are `avg by`, `max by`, `min by`, `sum by`, the built-in percentiles `p50 by`, `p75 by`, `p90 by`, `p95 by`, and `p99 by`, or `other percentile...` to enter a custom percentile in the **P** field. Percentile aggregations apply only to `distribution` metrics.
- **Group by** - Click the **+** icon to select a tag to group by from the drop-down list. You can group by multiple tags.
- **Functions** - Click the **+** icon to select a function from the drop-down list. You can add multiple functions.
- **Alias by** - Use plain text to add an alias to change titles and headings in a graph’s legend.
- **Alias RegExp** - Use a regular expression to add an alias to change titles and headings in a graph’s legend.

For `Alias By`, use plain text, scoped variables listed as follows, or both.

Expand table

| Scoped variables for metrics | Replaced with                                                                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $\_\_metric                  | metric name                                                                                                                                                            |
| $\_\_display\_name           | metric name                                                                                                                                                            |
| $\_\_expression              | full metric expression                                                                                                                                                 |
| $\_\_aggr                    | metric aggregation function (for example, `avg`, `max`, `min`, `sum`)                                                                                                  |
| $\_\_scope                   | metric scope (for example, `region`, `site`, `env`, `host`)                                                                                                            |
| $\_\_tag\_name               | corresponding `tag_name`. Applicable only to group by queries. (for example, when using group by `host` use `$__tag_host` as alias)                                    |
| $\_\_scope\_name             | when there are multiple scope items available, use this alias to extract the specific scope name. (for example, to extract `host` scope, use `$__scope_host` as alias) |

Expand table

| Scoped variables for (SLOs) | Replaced with                                                  |
|-----------------------------|----------------------------------------------------------------|
| $\_\_name                   | name (same as what is selected in the `Objective` drop-down)   |
| $\_\_aggr                   | aggregation function (for example, `avg`, `max`, `min`, `sum`) |
| $\_\_metric                 | metric name                                                    |
| $\_\_scope                  | scope name                                                     |
| $\_\_numerator              | metric used as the numerator in the SLO calculation            |
| $\_\_denominator            | metric used as the denominator in the SLO calculation          |

### Raw query

A raw query is similar to a regular query, but there is no visual query builder. You create a query directly in the text box. You can also use **Alias by** and **Alias RegExp** like you would in a **Query** type query.

### Arithmetic

**Arithmetic** type queries perform mathematical operations and are considered metrics queries.

- **Expression** - Supported arithmetic operations include `+`, `-`, `*`, `/`, and `()`.

> Note
>
> Arithmetic queries are only supported with other Datadog metric queries.

Examples:

`#A * 2` doubles the result of query *A*.

`#A / #B` divides the results of query *A* by query *B*.

### Real User Monitoring

Real User monitoring queries, or RUM queries, allow you to query Datadog RUM events. For more information on RUM, refer to [What is Real User Monitoring?](https://docs.datadoghq.com/real_user_monitoring/) RUM queries return a maximum of 1000 recent events. Results are automatically filtered to a dashboard’s time range.

> Note
>
> RUM queries are currently in public preview.

- **Query mode** - There are 2 RUM query modes, Search and Aggregate.

  - **Search** - RUM search queries return RUM events.

    - **Query** - Enter your query following RUM search syntax.
    - **Sort** - Sort the returned events by timestamp in ascending or descending order.
    - **Limit** - Set the maximum number of events returned. The default is `1000`.
  - **Aggregate** - RUM aggregate queries return aggregated RUM events.

    - **Query** - Enter your query following RUM search syntax.
    - **Compute** - Compute an aggregate. Add an **Aggregation** from the drop-down menu, an optional **Metric** (or use `*` when selecting a `Count` aggregation), and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Limit** - The maximum number of events in the response. The default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

You can use the following aliases when using the RUM query type:

Expand table

| Scoped variables for metrics | Replaced with                                                                                                      |
|------------------------------|--------------------------------------------------------------------------------------------------------------------|
| $\_\_metric                  | `$__metric` is replaced by the metric name                                                                         |
| $\_\_label\_xyz              | replaced with the label `xyz` where `xyz` can be any valid label returned by Datadog. For example, `$__label_host` |
| $\_\_no\_labels              | when your alias contains `$__no_labels`, Grafana won’t attach additional labels to the fields                      |

### Logs

Logs queries allow you to query Datadog logs. Results are filtered to a dashboard’s time range automatically.

- **Search query** - Use [log query syntax](https://docs.datadoghq.com/logs/explorer/search_syntax/) to search Datadog logs.
- **Storage tier** - Select the storage tier to query. Options are `indexes`, `online-archives`, or `flex`. The default is `indexes`.
- **Query mode** - There are 2 Logs query modes, Search and Aggregate.

  - **Search** - Search queries return individual log events.

    - **Sort by** - Sort the returned logs by timestamp in ascending or descending order.
    - **Limit** - Set the maximum number of logs in the response. The default is `1000`.
  - **Aggregate** - Aggregate logs into buckets and compute metrics and time series.

    - **Index** - Enter a comma-separated list of indexes to query.
    - **Compute** - Compute an aggregate. Add an **Aggregation** from the drop-down menu, an optional **Metric** (or use `*` when selecting a `count` aggregation), and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

### APM Spans

APM Spans queries allow you to query Datadog APM trace spans. Results are filtered to a dashboard’s time range automatically. Template variables are supported in the spans search query field.

- **Query mode** - There are 2 APM Spans query modes, Search and Aggregate.

  - **Search** - APM Spans search queries return individual span events.

    - **Query** - Enter your query following the [APM span search syntax](https://docs.datadoghq.com/tracing/trace_explorer/query_syntax/).
    - **Sort** - Sort the returned spans by timestamp in ascending or descending order.
    - **Limit** - Set the maximum number of spans returned. The default is `100`.
  - **Aggregate** - APM Spans aggregate queries return aggregated span data.

    - **Query** - Enter your query following the [APM span search syntax](https://docs.datadoghq.com/tracing/trace_explorer/query_syntax/).
    - **Compute** - Compute an aggregate. Add an **Aggregation** from the drop-down menu (`count`, `avg`, `median`, `sum`, `min`, `max`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `cardinality`), an optional **Metric** (or use `*` when selecting a `count` aggregation), and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

You can use the following aliases when using the APM Spans query type:

Expand table

| Scoped variables | Replaced with                                                                                                      |
|------------------|--------------------------------------------------------------------------------------------------------------------|
| $\_\_metric      | replaced by the metric name                                                                                        |
| $\_\_label\_xyz  | replaced with the label `xyz` where `xyz` can be any valid label returned by Datadog. For example, `$__label_host` |
| $\_\_no\_labels  | when your alias contains `$__no_labels`, Grafana won’t attach additional labels to the fields                      |

### Monitor

Alerts in Grafana are called monitors in Datadog. Monitor queries fetch and list data and status information regarding alerts. For more information about monitors, refer to [Monitor types](https://docs.datadoghq.com/monitors/monitor_types/). For more information about monitor queries, refer to [Search Monitors](https://docs.datadoghq.com/monitors/manage/search/).

- **Search type** - Select from 2 monitor query search types, **Individual** or **Group**.

> Note
>
> The **Group mode** search type is in public preview.

- **Individual mode** - Search and filter your monitor details.

  - **Result type** - Select one of the following result types from the drop-down:

    - **Count by Status** - Display the monitor count by status.
    - **Count by Type** - Display the monitor count by type.
    - **Count by Tag** - Display the monitor count by tag.
    - **Count by Mute status** - Display the monitor count by mute status.
    - **Monitors list** - List all monitors with their states and related details. When you select this result type, **List options** appear: sort by **Name**, **Status**, or **Tags**, in **ASC** or **DESC** order, and set an **Items per page** limit. The default is `100`.
  - **Query** - *Optional*. Add a Datadog monitor filter query. If you specify a filter query, the count or list returns only the monitors that match the query.
- **Group mode** - Similar to an individual monitor search, you can also search and filter your monitor group details. Refer to [Monitors group search](https://docs.datadoghq.com/api/latest/monitors/#monitors-group-search) for underlying API details. This endpoint requires the [`monitors_read`](https://docs.datadoghq.com/api/latest/scopes/#monitors) authorization scope.

  - **Result type** - Select one of the following result types from the drop-down:

    - **Count by Status** - Display the monitor count by status.
    - **Count by Type** - Display the monitor count by type.
    - **Monitors list** - List all monitors with their states and related details. When you select this result type, **List options** appear: sort by **Name**, **Status**, or **Tags**, in **ASC** or **DESC** order, and set an **Items per page** limit. The default is `100`.
  - **Query** - *Optional*. Add a Datadog monitor filter query. If you specify a filter query, the count or list returns only the monitors that match the query.

**Examples:**

- `status:(alert OR ok OR "no data" OR warn)` lists the monitors with at least one of status `alert`, `ok`, `no data`, or `warn`.
- `status:(alert OR warn) type:metric "cassandra"` lists the metric monitors with `alert` or `warn` status and also related to `cassandra`.
- `id:(7254197 OR 240232)` displays only the status of monitors with ID `7254197` or `240232`.

> Note
>
> For the **Monitors list** option, due to API limits only the top *n* monitors specified by the `items per page` setting are retrieved and displayed.

### Events

Events queries allow you to query the Datadog event stream. For more information on events, refer to [Event Management](https://docs.datadoghq.com/service_management/events/). Events queries return a maximum of `1000` of the most recent results. Results are also automatically filtered to the dashboard’s time range.

> Note
>
> The **Events** query type is in public preview.

Filter your results by the following:

- **Sources** - Enter a list of sources to filter in the query.
- **Tags** - Enter the tags to filter in the query.
- **Priority** - Select the priority of events. Options are **All**, **Low** or **Normal**.

### Service Level Objective

Get SLOs, or service level objectives, by setting the **Query type** to **SLO**. SLOs are populated from your Datadog account. For more information, refer to [Service Level Objectives](https://docs.datadoghq.com/api/latest/service-level-objectives/) and [Get an SLO history](https://docs.datadoghq.com/api/latest/service-level-objectives/?code-lang=ruby#get-an-slos-history).

> Note
>
> The SLO **Value** result type is in public preview.

- **Result type** - Select a result type, either **Timeseries** or **Value**.

  - **Timeseries** - Displays the SLO value over time as a time series.
  - **Value** - Displays only the current SLO value.
- **Objective** - Select an objective from the drop-down list.
- **Display** - *Available only for monitor-based SLOs.* Choose how to expand monitor results: **Overall** shows the combined SLO, **Individual Monitors** shows each underlying monitor, and **Both** shows both. The default is **Both**.
- **Alias by** - *Available only with the **Timeseries** result type.* Use plain text to add an alias to change titles and headings in a graph’s legend.
- **Alias RegExp** - *Available only with the **Timeseries** result type.* Use a regular expression to add an alias to change titles and headings in a graph’s legend.

## Query examples

The following examples show how to build common queries with the query editor.

### Average CPU usage by host

Use the **Query** type to chart a metric grouped by a tag:

1. Set **Query type** to **Query**.
2. In **Metric**, select `system.cpu.user`.
3. In **Aggregate**, select `avg by`.
4. In **Group by**, select `host`.
5. *Optional.* In **Alias by**, enter `$__tag_host` to label each series with its host name.

The panel displays one time series for each host.

### Error log volume by service

Use the **Logs** type in **Aggregate** mode to chart log counts over time:

1. Set **Query type** to **Logs**.
2. Set **Query mode** to **Aggregate**.
3. In **Search query**, enter `status:error`.
4. Under **Compute**, set **Aggregation** to `count`, **Metric** to `*`, and **Type** to `Time Series`.
5. Under **Group by**, set **Facet** to `service` and **Limit** to `10`.

The panel displays a time series of error counts for each service. This format also works for [Alerting](/docs/plugins/grafana-datadog-datasource/latest/alerting/).

### Count of monitors in an alert state

Use the **Monitor** type to count monitors by status:

1. Set **Query type** to **Monitor**.
2. Set **Search type** to **Individual**.
3. Set **Result type** to **Count by Status**.
4. *Optional.* In **Query**, enter `status:alert` to count only the monitors that are currently alerting.

The panel displays the monitor count, and each value links back to the monitor manager in Datadog. For more information, refer to [Data links](#data-links).

### Metric query with a custom rollup

Use the **Raw query** type to request a specific time granularity:

1. Set **Query type** to **Raw query**.
2. In the query text box, enter `avg:system.cpu.user{*}.rollup(avg, 60)`.

Datadog returns the metric at a 60-second rollup with the average aggregation. For more information, refer to [Time granularity and data rollup](#time-granularity-and-data-rollup).

## Data links

The Datadog data source adds data links to **Monitor** query results. A data link, labeled **Open in DataDog**, opens the relevant monitor in Datadog in a new browser tab:

- For the **Count by Status**, **Count by Type**, **Count by Tag**, and **Count by Mute status** result types, the link opens the monitor manager in Datadog, filtered by the selected status, type, tag, or mute state.
- For the **Monitors list** result type, the link opens the individual monitor by ID.

To follow a data link, click a value in a Monitor query result and select **Open in DataDog**. To turn off data links for all query results, enable **Disable data links** in the data source configuration. For more information, refer to [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/).

## Known limitations

The Datadog data source has the following known limitations.

### Time granularity and data rollup

For **Query**, **Raw query**, and **Arithmetic** queries, Datadog controls the time granularity. The plugin sends your query and time range to the Datadog `/api/v1/query` endpoint, which automatically selects a rollup interval based on the time window. Longer time ranges return coarser intervals, and Grafana can’t override the interval that Datadog chooses.

As a result:

- The granularity in Grafana can differ from the same query in the Datadog UI, because the Datadog UI might request a different rollup.
- The panel **Max data points** and **Min interval** settings don’t change the rollup for these query types. Datadog determines the number of points from the time range.

To request a specific granularity, add the [`rollup()` function](https://docs.datadoghq.com/dashboards/functions/rollup/) to your query, the same as you would in Datadog. For example, `avg:system.cpu.user{*}.rollup(avg, 60)` requests a 60-second rollup with the average aggregation. Datadog enforces a maximum number of points per query, so over a long time range it might still apply a coarser interval than the one you request.

## Error messages

When the underlying Datadog API returns unsuccessful status codes, the plugin throws the error with a corresponding status code. If you see an error message such as `429 Too Many Requests`, that indicates you may be hitting Datadog API rate limits.

For more information about rate limits, refer to [Rate Limits](https://docs.datadoghq.com/api/latest/rate-limits/#rate-limits) in the Datadog documentation.
