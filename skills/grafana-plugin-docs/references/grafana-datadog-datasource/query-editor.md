---
title: "Datadog query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the Datadog query editor"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog query editor

Grafana provides a query editor for Datadog, which allows you to create and execute Datadog queries, query APM spans, get monitoring status, retrieve service-level objectives (SLOs), perform arithmetic, and alias the graph’s legend.

## Datadog query editor options

The following are Datadog query types:

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

- **Metric** - Select a metric from the dropdown list.
- **From** - Select an optional tag from the dropdown list.
- **Aggregate** - Select an aggregation from the dropdown list. The default is `average`.
- **Group by** - Click the **+ sign** to select a group by option from the dropdown list. You can select multiple tags.
- **Functions** - Click the **+ sign** to select a function from the dropdown list. You can add multiple functions.
- **Alias by** - Use plain text to add an alias to change titles and headings in a graph’s legend.
- **Alias RegExp** - Use a regular expression to add an alias to change titles and headings in a graph’s legend.

For `Alias By`, use plain text, scoped variables listed as follows, or both.

Expand table

| Scoped variables for metics | Replaced with                                                                                                                                                  |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $\_\_metric                 | metric name                                                                                                                                                    |
| $\_\_display\_name          | metric name                                                                                                                                                    |
| $\_\_expression             | full metric expression                                                                                                                                         |
| $\_\_aggr                   | metric aggregation function (e.g. avg, max, min, sum)                                                                                                          |
| $\_\_scope                  | metric scope (e.g. region, site, env, host)                                                                                                                    |
| $\_\_tag\_name              | corresponding tagName. Applicable only to group by queries. (e.g: when using group by `host` use `$__tag_host` as alias)                                       |
| $\_\_scope\_name            | when there are multiple scope items available, use this alias to extract the specific scope name. (e.g: to extract `host` scope, use `$__scope_host` as alias) |

Expand table

| Scoped variables for (SLOs) | Replaced with                                               |
|-----------------------------|-------------------------------------------------------------|
| $\_\_name                   | name (same as what is selected in the `Objective` dropdown) |
| $\_\_aggr                   | aggregation function (e.g. `avg`, `max`, `min`, `sum`)      |
| $\_\_metric                 | metric name                                                 |
| $\_\_scope                  | scope name                                                  |
| $\_\_numerator              | metric used as the numerator in the SLO calculation         |
| $\_\_denominator            | metric used as the denominator in the SLO calculation       |

### Raw query

A raw query is similar to a regular query, but there is no visual query builder. You create a query directly in the text box. You can also use **Alias by** and **Alias RegExp** like you would in a **Query** type query.

### Arithmetic

**Arithmetic** type queries perform mathematical operations and are considered metrics queries.

- **Expression** - Supported arithmetic operations include `+`, `-`, `*`, `/`, and `()`.

> Note: arithmetic queries are only supported with other datadog metric queries.

Examples:

`#A * 2` doubles the result of query *A*.

`#A / #B` divides the results of query *A* by query *B*.

### Real User Monitoring

Real User monitoring queries, or RUM queries, allow you to query Datadog RUM events. For more information on RUM see [What is Real User Monitoring?](https://docs.datadoghq.com/real_user_monitoring/) RUM queries return a maximum of 1000 recent events. Results are automatically filtered to a dashboard’s time range.

> Note
>
> RUM queries are currently in public preview.

- **Query mode** - There are 2 RUM query modes, Search and Aggregate.

  - **Search** - RUM search queries return RUM events.

    - **Query**- Enter your query following RUM search syntax.
    - **Sort** - Select a sort parameter for querying. Click either **Timestamp DESC** or **Timestamp ASC**.
    - **Limit** - Set a maximum number of events returned. The default is `1000`.
  - **Aggregate** - RUM aggregate queries return aggregated RUM events.

    - **Query**- Enter your query following RUM search syntax.
    - **Compute** - Compute an aggregate. Add an **Aggregation** from the dropdown menu, an optional **Metric** (or use `*` when selecting a `count` aggregation) and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Limit** - The Maximum number of events in the response. The default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

You can use the following aliases when using the RUM query type:

Expand table

| Scoped variables for metics | Replaced with                                                                                         |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| $\_\_metric                 | `$__metric` will replaced by metric name                                                              |
| $\_\_label\_xyz             | replaced with the label xyz where xyz can be any valid label returned by DD. example: `$__label_host` |
| $\_\_no\_labels             | when your alias have `$__no_labels`, grafana won’t attach additional labels to the fields             |

### Logs

Logs queries allow you to query Datadog logs. Results are filtered to a dashboard’s time range automatically.

- **Query mode** - There are 2 Logs query modes, Search and Aggregate.

  - **Search** - Use [log query syntax](https://docs.datadoghq.com/logs/explorer/search_syntax/) to search Datadog logs.

    - **Search query** - Enter you logs search query.
    - **Sort by** - Select either **Timestamp DESC** or **Timestamp ASC** to sort by timestamp and add an optional **Limit** to set a maximum number of logs in the response. The default is `1000`.
  - **Aggregate** - Aggregate logs and/or events into buckets and compute metrics and timeseries.

    - **Compute** - Compute an aggregate. Add an **Aggregation** from the dropdown menu, an optional **Metric** (or use `*` when selecting a `count` aggregation) and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Limit** - The Maximum number of events in the response. The default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

### APM Spans

APM Spans queries allow you to query Datadog APM trace spans. Results are filtered to a dashboard’s time range automatically. Template variables are supported in the spans search query field.

- **Query mode** - There are 2 APM Spans query modes, Search and Aggregate.

  - **Search** - APM Spans search queries return individual span events.

    - **Query** - Enter your query following the [APM span search syntax](https://docs.datadoghq.com/tracing/trace_explorer/query_syntax/).
    - **Sort** - Select a sort parameter for the results. Click either **Timestamp DESC** or **Timestamp ASC**.
    - **Limit** - Set a maximum number of spans returned. The default is `100`.
  - **Aggregate** - APM Spans aggregate queries return aggregated span data.

    - **Query** - Enter your query following the [APM span search syntax](https://docs.datadoghq.com/tracing/trace_explorer/query_syntax/).
    - **Compute** - Compute an aggregate. Add an **Aggregation** from the dropdown menu (`count`, `avg`, `median`, `sum`, `min`, `max`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `cardinality`), an optional **Metric** (or use `*` when selecting a `count` aggregation) and a **Type**, which can be either `Total` or `Time Series`.
    - **Group by** - Add a **Facet** and a **Limit** to your **Group by**. The limit default is `1000`.
    - **Display options** - Add an alias to create a custom name for your results.

You can use the following aliases when using the APM Spans query type:

Expand table

| Scoped variables | Replaced with                                                                                         |
|------------------|-------------------------------------------------------------------------------------------------------|
| $\_\_metric      | replaced by the metric name                                                                           |
| $\_\_label\_xyz  | replaced with the label xyz where xyz can be any valid label returned by DD. example: `$__label_host` |
| $\_\_no\_labels  | when your alias contains `$__no_labels`, Grafana won’t attach additional labels to the fields         |

### Monitor

Alerts in Grafana are called monitors in Datadog. Monitor queries fetch and list data and status information regarding alerts. For more information regarding monitors see [Monitor types](https://docs.datadoghq.com/monitors/monitor_types/). For more information about monitor queries, see [Search Monitors](https://docs.datadoghq.com/monitors/manage/search/).

- **Search type** - Select from 2 monitor query search types, **Individual** or **Group**.

> Note
>
> The **Group mode** search type is in pubic preview.

- **Individual mode** - Search and filter your monitor details.

  - **Result type** - Click the dropdown to select from the following list of results types:

    - **Count by status** - Display the monitor count by status.
    - **Count by type** - Display the monitor count by type.
    - **Count by tags** - Display the monitor count by tag.
    - **Count by mute status** - Display the monitor count by mute status.
    - **Monitors list** - List all of the monitors and their corresponding states and other related details. **List options** include sorting by **Name**, **Status** or **Tags**, **ASC or DESC** order and an **Items per page** limit.
  - **Query**- *Optional*. Add a Datadog monitor filter query. If you specify a filter query, the count or list will return only the monitors that match the query.
- **Group mode** - Similar to an individual monitor search, you can also search and filter your monitor group details. See [Monitors group search](https://docs.datadoghq.com/api/latest/monitors/#monitors-group-search) for underlying API details. This endpoint requires the [`monitors_read`](https://docs.datadoghq.com/api/latest/scopes/#monitors) authorization scope.

  - **Result type** - Click the dropdown to select from the following list of results types:

    - **Count by status** - Display the monitor count by status.
    - **Count by type** - Display the monitor count by type.
    - **Monitors list** - List all of the monitors and their corresponding states and other related details. **List options** include sorting by **Name**, **Status** or **Tags**, **ASC or DESC** order and an **Items per page** limit.
  - **Query**- *Optional*. Add a Datadog monitor filter query. If you specify a filter query, the count or list will return only the monitors that match the query.

**Examples:**

- `status:(alert OR ok OR "no data" OR warn)` lists the monitors with at least one of status `alert`, `ok`, `no data`, or `warn`.
- `status:(alert OR warn) type:metric "cassandra"` lists the metric monitors with `alert` or `warn` status and also related to “cassandra”.
- `id:(7254197 OR 240232)` displays only the status of monitors with ID `7254197` or `240232`.

> Note
>
> For the **Monitors list** option, due to API limits only the top *n* monitors specified by the `items per page` setting are retrieved and displayed.

### Events

Events queries allow you to query the Datadog event stream. For more information on events see [Event Management](https://docs.datadoghq.com/service_management/events/). Events queries return a maximum of `1000` of the most recent results. Results are also automatically filtered to the dashboard’s time range.

> Note
>
> The **Events** query type is in pubic preview.

Filter your results by the following:

- **Sources** - Enter a list of sources to filter in the query.
- **Tags** - Enter the tags to filter in the query.
- **Priority** - Select the priority of events. Options are **All**, **Low** or **Normal**.

### Service Level Objective

Get SLOs, or service level objectives, by setting the **Query type** to **SLO**. SLOs are populated from your Datadog account. For more information see [Service Level objectives](https://docs.datadoghq.com/api/latest/service-level-objectives/) and [Get an SLO’s history](https://docs.datadoghq.com/api/latest/service-level-objectives/?code-lang=ruby#get-an-slos-history).

For monitor type SLO queries, you can optionally expand individual monitor results.

> Note
>
> The SLO **Value** result type is in public preview.

- **Result type** - Select a result type, either **Timeseries** or **Value**.

  - **Timeseries** -
  - **Value** - Displays only the current SLO value.
- **Objective** - Select an objective from the dropdown list.
- **Alias by** - *Available only with the **Timeseries** result type.* Use plain text to add an alias to change titles and headings in a graph’s legend.
- **Alias RegExp** - *Available only with the **Timeseries** result type.* Use a regular expression to add an alias to change titles and headings in a graph’s legend.

## Error messages

When the underlying Datadog API returns non successful status codes, the plugin will throw the error with a corresponding status code. If you are seeing error message such as `429 Too Many Requests`, that indicates you may be hitting Datadog API rate limits.

For more information regarding rate limits see [Rate Limits](https://docs.datadoghq.com/api/latest/rate-limits/#rate-limits) in Datadog’s documentation.
