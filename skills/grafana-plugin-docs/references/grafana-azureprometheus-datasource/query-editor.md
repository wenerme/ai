---
title: "Azure Monitor Managed Service for Prometheus query editor | Grafana Plugins documentation"
description: "Use the Azure Monitor Managed Service for Prometheus query editor in Grafana to build PromQL queries with the builder and code modes."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Monitor Managed Service for Prometheus query editor

The Azure Monitor Managed Service for Prometheus query editor lets you write PromQL queries against your Azure Monitor workspace. It’s the same editor as the core Grafana Prometheus data source, with a visual query builder, a code editor with autocomplete and syntax highlighting, and configurable output formats for different visualizations.

You can access the query editor from the [Explore page](/docs/grafana/latest/explore/) or from any dashboard panel by clicking the panel title and selecting **Edit**. For more information about PromQL, refer to [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/).

## Before you begin

Before you write queries, ensure you have:

- [Configured the Azure Monitor Managed Service for Prometheus data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).
- Verified that your Azure credentials have permission to query the workspace.

## Key concepts

If you’re new to Prometheus, these terms are used throughout this document:

Expand table

| Term                 | Description                                                                          |
|----------------------|--------------------------------------------------------------------------------------|
| **PromQL**           | The Prometheus Query Language, used to select and aggregate time series data.        |
| **Instant query**    | Returns a single value per series at the end of the time range.                      |
| **Range query**      | Returns a series of values over the dashboard time range.                            |
| **Metrics explorer** | A Builder mode tool that lists all metrics with their type and description.          |
| **Metrics browser**  | A Code mode tool that helps you search metrics, select labels, and build a selector. |

## Query editor modes

The query editor has two modes that you switch between with the toggle in the upper-right of the editor. Grafana synchronizes both modes, so you can switch between them, and it warns you if it detects an issue with the query during the switch.

### Builder mode

Builder mode is a visual, guided way to build queries without writing PromQL by hand. It’s best if you have limited experience with PromQL.

Builder mode includes the following components:

- **Kick start your query:** Choose from predefined operation patterns, grouped into rate, histogram, and binary query starters. Grafana inserts the pattern so you can adapt it to your metrics.
- **Explain:** Toggle on to display a step-by-step, plain-language description of every query component and operation.
- **Metric:** Select a metric from the drop-down, which is populated from the selected time range. Type to search and filter, or click the book icon to open the **Metrics explorer**.
- **Label filters:** Use the `+` and `x` buttons to add and remove label filters that narrow the result set.
- **+ Operations:** Add operations such as `rate`, `sum`, or `histogram_quantile`. The editor groups operations into aggregations, range functions, functions, binary operations, trigonometric functions, and time functions.

### Code mode

Code mode lets you write raw PromQL with autocomplete, syntax highlighting, and the metrics browser. Use code mode for complex queries or when you already know PromQL.

To open the **Metrics browser**, click the arrow next to **Metrics browser** in the query field. From there you can:

1. Select a metric to narrow the available labels.
2. Select one or more labels.
3. Select values for each label to tighten the query scope.
4. Choose an action:

   - **Use query:** Insert the selector into the editor.
   - **Use as rate query:** Insert the selector wrapped in `rate(...[$__rate_interval])`.
   - **Validate selector:** Verify the selector and show the number of matching series.
   - **Clear:** Reset your selections.

## Query options

Expand **Options** in the query editor to configure how Grafana runs and displays the query. These options are available in both modes.

Expand table

| Option        | Description                                                                                                                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Legend**    | Controls the time series name in the legend. Use **Auto** to show only labels unique to each series, **Verbose** to show all labels, or **Custom** to define a template such as `{{label_name}}`. |
| **Format**    | Sets the result format: **Time series** (default), **Table**, or **Heatmap**.                                                                                                                     |
| **Type**      | Sets the query type: **Both** (default), **Range**, or **Instant**.                                                                                                                               |
| **Min step**  | The lower bound for the query step and `$__interval`. Match this to your scrape interval.                                                                                                         |
| **Exemplars** | Toggles whether to show exemplars alongside the query results.                                                                                                                                    |

> Note
>
> Exemplars aren’t available with the **Instant** query type.

## Macros

Use macros in your queries to reference the dashboard time range and interval. Grafana replaces the macro with the computed value at query time.

Expand table

| Macro                 | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `$__interval`         | The interval Grafana calculates from the time range and panel width.                          |
| `$__interval_ms`      | The interval in milliseconds.                                                                 |
| `$__range`            | The full dashboard time range, for example `1h`.                                              |
| `$__range_s`          | The dashboard time range in seconds.                                                          |
| `$__range_ms`         | The dashboard time range in milliseconds.                                                     |
| `$__rate_interval`    | An interval tuned for `rate` functions that’s always at least four times the scrape interval. |
| `$__rate_interval_ms` | The rate interval in milliseconds.                                                            |

## Query examples

The following examples show common PromQL queries you can run against your workspace. Replace the metric and label names with the ones in your workspace.

### Rates and throughput

Use the `rate` function with `$__rate_interval` to chart per-second rates from counters.

Calculate the per-second rate of HTTP requests:

promql [Copy code to clipboard] Copy

```promql
rate(http_requests_total[$__rate_interval])
```

Calculate total requests per second across all instances of a service:

promql [Copy code to clipboard] Copy

```promql
sum(rate(http_requests_total{job="api"}[$__rate_interval]))
```

### Aggregations

Use aggregation operators such as `sum`, `avg`, and `max` with `by` to group results.

Aggregate CPU usage by instance:

promql [Copy code to clipboard] Copy

```promql
sum by (instance) (rate(node_cpu_seconds_total{mode!="idle"}[$__rate_interval]))
```

Find the top five pods by memory usage:

promql [Copy code to clipboard] Copy

```promql
topk(5, sum by (pod) (container_memory_working_set_bytes))
```

### Error rates and ratios

Divide a filtered rate by a total rate to compute an error percentage.

Calculate the percentage of HTTP 5xx responses:

promql [Copy code to clipboard] Copy

```promql
sum(rate(http_requests_total{status=~"5.."}[$__rate_interval]))
/
sum(rate(http_requests_total[$__rate_interval]))
* 100
```

For this query, set **Legend** to a custom value such as `Error rate %` and **Type** to **Range**.

### Latency percentiles

Use `histogram_quantile` with a `_bucket` metric to chart latency percentiles.

Calculate the 95th percentile request latency:

promql [Copy code to clipboard] Copy

```promql
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[$__rate_interval])))
```

In Builder mode, select `http_request_duration_seconds_bucket`, add **Range functions &gt; Rate**, add **Aggregations &gt; Sum** with the `by` label set to `le`, then add **Functions &gt; Histogram quantile** with the value `0.95`.

### Resource utilization

Combine metrics to express utilization as a percentage.

Calculate memory utilization per node as a percentage:

promql [Copy code to clipboard] Copy

```promql
100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)
```

Show which targets are currently down:

promql [Copy code to clipboard] Copy

```promql
up == 0
```

### Multi-query expressions

Use multiple queries and a math expression to calculate derived values without a single complex PromQL statement. For example, to calculate the percentage of available memory, add two queries and one expression.

Query A, total memory:

promql [Copy code to clipboard] Copy

```promql
node_memory_MemTotal_bytes
```

Query B, available memory:

promql [Copy code to clipboard] Copy

```promql
node_memory_MemAvailable_bytes
```

Expression C, percentage available. Click **+ Expression**, select **Math**, and enter:

text [Copy code to clipboard] Copy

```text
$B / $A * 100
```

Set queries A and B to **Type: Instant**, hide them from the visualization with the eye icon, and display only expression C.

### Use a template variable in a query

Reference a [template variable](/docs/plugins/grafana-azureprometheus-datasource/latest/template-variables/) to make a query interactive. For example, filter by a selected `instance` value:

promql [Copy code to clipboard] Copy

```promql
rate(node_cpu_seconds_total{instance=~"$instance"}[$__rate_interval])
```

> Note
>
> Alert queries don’t support template variables such as `$instance`. Use fixed label values when you write queries intended for [alert rules](/docs/plugins/grafana-azureprometheus-datasource/latest/alerting/).

## Query high-cardinality data

Azure Monitor workspaces can hold metrics with many unique label combinations. High-cardinality queries over long time ranges can time out or exceed limits. To query them effectively:

- **Aggregate first, then filter.** Use `sum()`, `avg()`, or `count()` to reduce the number of series before other operations. For example, `sum(rate(metric[$__rate_interval])) by (job)` is far cheaper than querying every individual series.
- **Scope with template variables.** Select a specific `namespace`, `cluster`, or `job` rather than querying all labels at once.
- **Increase Min step for overview panels.** For panels that show trends over days or weeks, set a higher **Min step**, such as `5m` or `15m`, to reduce the number of data points requested.
- **Use recording rules for repeated queries.** Pre-compute expensive expressions that a panel runs on every load.

## Use the query inspector

The query inspector helps you debug queries that return unexpected results or no data. Click **Query inspector** below the query editor, then review:

- **Query:** The exact request sent to the workspace, including the evaluated PromQL, time range, and step. Use this to confirm that template variables resolved correctly.
- **Data:** The raw response. If it’s empty, the query matched no series.
- **Stats:** Request timing and response size.

## Use cases

Use cases help you understand what’s possible and provide starting points for your own dashboards:

- **Monitor container workloads:** Track CPU, memory, and restart counts for Kubernetes and Azure Kubernetes Service (AKS) workloads that send metrics to your workspace.
- **Track service-level indicators:** Build error-rate and latency panels from request metrics to power service-level objective dashboards.
- **Capacity planning:** Aggregate resource usage over long time ranges to spot trends and plan scaling.

## Next steps

- [Use template variables](/docs/plugins/grafana-azureprometheus-datasource/latest/template-variables/)
- [Add annotations](/docs/plugins/grafana-azureprometheus-datasource/latest/annotations/)
- [Set up alerting](/docs/plugins/grafana-azureprometheus-datasource/latest/alerting/)
