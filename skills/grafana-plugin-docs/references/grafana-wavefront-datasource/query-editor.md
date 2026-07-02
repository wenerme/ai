---
title: "Wavefront query editor | Grafana Enterprise Plugins documentation"
description: "Build queries with the Wavefront data source query editor in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Wavefront query editor

This document explains how to use the Wavefront query editor to retrieve metrics and events from your Wavefront tenant.

## Before you begin

- [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/).
- Verify that your Wavefront API token has permission to read the metrics and events you want to query.

## Key concepts

If you’re new to Wavefront, these terms are used throughout the query editor:

Expand table

| Term       | Description                                                                                  |
|------------|----------------------------------------------------------------------------------------------|
| **Metric** | A named time series in Wavefront, for example `sample.cpu.loadavg.1m`.                       |
| **Source** | The system that reported the metric. Also referred to as a host.                             |
| **Tag**    | A key-value pair that describes a metric or a source, for example `env=prod`.                |
| **WQL**    | Wavefront Query Language, used to compose metric queries in Wavefront.                       |
| **PromQL** | Prometheus Query Language. Wavefront also accepts PromQL queries and translates them to WQL. |
| **Event**  | A timestamped record in Wavefront, such as an alert firing or a deployment marker.           |

## Query modes

The Wavefront query editor has three modes, selected with the **Query Mode** control at the top of the editor:

- **Query Builder:** A guided form for building metric queries without writing WQL.
- **Raw Query:** A free-form editor for writing WQL, PromQL, or Hybrid queries.
- **Events:** A mode for listing Wavefront events within the dashboard time range.

## Query Builder

Use **Query Builder** to compose a metric query field-by-field. The builder has four fields: **Metric**, **Aggregate**, **Filters**, and **Functions**.

### Metric

Use the **Metric** drop-down to select the metric to query. The drop-down is a typeahead that’s backed by Wavefront’s autocomplete API: as you type, the data source returns matching namespace segments and metric names from your tenant. For example, typing `sample.` lists namespaces that start with `sample.`, and typing `sample.cpu.` narrows further. Select a name that doesn’t end with a dot to choose a leaf metric.

After you select a metric, the available filter keys and filter values are automatically populated for that metric.

### Aggregate

Use the **Aggregate** drop-down to apply an aggregation across reporting sources. The drop-down offers:

- `mean`
- `median`
- `min`
- `max`
- `first`
- `last`
- `count`
- `sum`

The drop-down is clearable and also accepts a template variable reference, for example `$aggregation`.

### Filters

Use the **Filters** row to narrow the query to specific sources, tags, or values.

- Click the **+** button to add a filter.
- Select a **Key** and a **Value** from the drop-downs. Filter options are populated from the selected metric. You can also type a custom value, for example to enter a regular expression or template variable.
- Click the trash can icon to remove a filter.
- When multiple filters are applied, a conjunction appears between each pair. The conjunction defaults to `and`. Click it to toggle between `and` and `or`.

### Functions

Use the **Functions** row to apply additional aggregation, grouping, or calculations on the metric response. Functions are organized into categories that mirror the Wavefront function catalog:

Expand table

| Category         | Functions                                                                                                              |
|------------------|------------------------------------------------------------------------------------------------------------------------|
| **Aggregate**    | `min`, `max`, `sum`, `avg`, `count`, `variance`, `percentile`                                                          |
| **RawAggregate** | `rawmin`, `rawmax`, `rawsum`, `rawavg`, `rawcount`, `rawvariance`, `rawpercentile`                                     |
| **Filter**       | `highpass`, `lowpass`, `topk`, `bottomk`, `between`                                                                    |
| **Derivative**   | `rate`, `deriv`                                                                                                        |
| **Time**         | `at`, `lag`, `align`, `downsample`                                                                                     |
| **MovingWindow** | `msum`, `mavg`, `mmedian`, `mmin`, `mmax`, `mcount`, `mvar`, `mpercentile`, `integrate`, `flapping`, `any`, `all`      |
| **Rounding**     | `round`, `ceil`, `floor`                                                                                               |
| **Math**         | `sqrt`, `exp`, `log`, `log10`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sinh`, `cosh`, `tanh`, `abs`, `normalize` |
| **Interpolate**  | `default`, `last`, `next`, `interpolate`                                                                               |

To add a function, click the **+** button and select a category, then select a function from that category. Depending on the function, configure parameters such as group-by fields, alignment intervals, moving-window sizes, or scalar arguments. Hover over a parameter label for a tooltip that describes the parameter.

Chain multiple functions to build up more complex queries. Functions execute from the outside in, so the order you add them matters.

### Example: builder-to-WQL mapping

The following builder selections:

- **Metric:** `sample.cpu.loadavg.1m`
- **Aggregate:** `mean`
- **Filters:** `env=prod`
- **Functions:** `mavg` with a window of `5m`

Send a Wavefront query similar to:

SQL [Copy code to clipboard] Copy

```sql
mavg('5m',ts(sample.cpu.loadavg.1m,env=prod))
```

The selected aggregate is sent separately as the request’s summarization value:

text [Copy code to clipboard] Copy

```text
summarization=mean
```

> Tip
>
> To see the WQL that a builder query generates, switch the **Query Mode** from **Query Builder** to **Raw Query**. The **Query** field is pre-filled with the WQL the builder produced, which is useful for learning WQL or for fine-tuning a query the builder can’t express.

## Raw Query

Use **Raw Query** when you want to write queries by hand. The editor has two fields: **Query** and **Query Type**.

### Query

Enter your query in the **Query** code editor. The editor uses SQL-style syntax highlighting.

### Query Type

Use the **Query Type** drop-down to choose how Wavefront interprets the query:

Expand table

| Query type | Description                                                                                 |
|------------|---------------------------------------------------------------------------------------------|
| **Hybrid** | Wavefront attempts to detect and run the query as either WQL or PromQL.                     |
| **WQL**    | The query is sent as Wavefront Query Language.                                              |
| **PromQL** | The query is sent as Prometheus Query Language and translated to WQL on the Wavefront side. |

The **Query Type** selector is clearable. When it’s cleared, the data source sends the query without a type hint, and Wavefront treats the query as Hybrid.

> Caution
>
> If your query contains URL-escaped characters (for example, `%20` or `%3D`), the editor displays an error. Replace escaped sequences with their literal characters before running the query.

### WQL query examples

Average CPU load across production hosts:

SQL [Copy code to clipboard] Copy

```sql
avg(ts("sample.cpu.loadavg.1m", env="prod"))
```

Sum of requests per namespace using a group-by aggregation:

SQL [Copy code to clipboard] Copy

```sql
sum(ts("http.requests.count"), namespace)
```

Five-minute moving average, grouped by host:

SQL [Copy code to clipboard] Copy

```sql
mavg(5m, avg(ts("sample.cpu.usage"), sources))
```

Per-second rate from a counter metric:

SQL [Copy code to clipboard] Copy

```sql
rate(ts("sample.requests.total"))
```

Align samples to a one-minute bucket before aggregating:

SQL [Copy code to clipboard] Copy

```sql
align(1m, mean, ts("sample.memory.used"))
```

Ratio of two series for a success rate:

SQL [Copy code to clipboard] Copy

```sql
100 * sum(ts("http.requests.success")) / sum(ts("http.requests.total"))
```

Reference a dashboard variable inside a query:

SQL [Copy code to clipboard] Copy

```sql
avg(ts("sample.cpu.loadavg.1m", env="$environment"))
```

### PromQL query examples

Request rate over the last five minutes:

SQL [Copy code to clipboard] Copy

```sql
rate(http_requests_total{env="prod"}[5m])
```

95th percentile latency across services:

SQL [Copy code to clipboard] Copy

```sql
histogram_quantile(0.95, sum by (le, service) (rate(http_request_duration_seconds_bucket[5m])))
```

### Hybrid query examples

Let Wavefront pick the interpreter. Useful when you’re pasting queries from different sources:

SQL [Copy code to clipboard] Copy

```sql
sum(rate(http_requests_total[1m]))
```

## Events

Use **Events** mode to list Wavefront events within the dashboard time range. Events mode has one field, **Limit**, which controls the maximum number of events returned. The default is `100`.

The response contains one row per event with fields for the event name, start and end time, type, subtype, severity, and details. When you display the events on a time-series panel, the events appear as points you can use to correlate with metric series.

Events mode is useful for:

- Plotting deploy markers, alert transitions, or other operational events as [annotations](/docs/plugins/grafana-wavefront-datasource/latest/annotations/).
- Building event tables next to metric panels for incident investigation.
- Counting events in a stat panel to quickly see how many alerts or deploys happened in a time range.

## Ad hoc filters

The Wavefront data source supports [ad hoc filters](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters) for **Query Builder** queries. Ad hoc filters apply to every metric query on the dashboard without editing the queries themselves.

To use ad hoc filters, create two template variables:

1. Create a helper variable named `metriclink`. The helper tells the data source which metric to list filter keys and values for. The variable can be:

   - A **Custom** variable with a list of metrics, or
   - A **Query** variable of type **Metrics**.

   The name must be exactly `metriclink`. You can hide the helper variable from the dashboard UI.
2. Create a second variable of type **Ad hoc filters** and select the Wavefront data source. Leave the query fields empty; filter options are discovered from the metric in `metriclink`.

Ad hoc filters are appended to each **Query Builder** query at runtime. Ad hoc filters do not apply to **Raw Query** or **Events** queries.

## Use cases

The following scenarios are common starting points for Wavefront queries:

- **Monitor Kubernetes resource usage:** Combine `sample.kubernetes.pod.cpu.usage_rate` with the **Aggregate** `sum` and a `namespace` filter to track pod-level CPU trends. The bundled Kubernetes dashboards are good starting points.
- **Correlate deploys with metrics:** Use **Events** mode as an annotation source so deploy events from Wavefront appear on your Grafana panels.
- **Track tenant ingestion:** Query `~wavefront.points.*` metrics to watch ingestion rate and throttling. The **Wavefront Usage: Ingestion** dashboard includes these queries.

## Format the legend with Display name

The Wavefront data source uses Grafana’s standard **Display name** field option to rewrite legend keys. Use **Display name** when you want to rename or shorten a series based on its name, labels, or values.

For details, refer to [Standard field options](/docs/grafana/latest/panels-visualizations/configure-standard-options/#display-name).

## Next steps

- Build dynamic dashboards with [Wavefront template variables](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/).
- Annotate panels with [Wavefront events](/docs/plugins/grafana-wavefront-datasource/latest/annotations/).
- Create alert rules from Wavefront queries with [Alerting with the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/alerting/).
