---
title: "Azure Monitor Managed Service for Prometheus template variables | Grafana Plugins documentation"
description: "Use template variables with the Azure Monitor Managed Service for Prometheus data source to create dynamic, reusable Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Monitor Managed Service for Prometheus template variables

Template variables let you create dynamic, reusable dashboards by replacing hard-coded values, such as instance names, namespaces, or job labels, with selectable variables. Grafana displays these variables as drop-down menus at the top of the dashboard, so viewers can change the displayed data without editing queries. The Azure Monitor Managed Service for Prometheus data source supports the same template variable features as the core Grafana Prometheus data source.

## Before you begin

Before you create template variables, ensure you have:

- [Configured the Azure Monitor Managed Service for Prometheus data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).
- A basic understanding of [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The data source supports the following template variable types.

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Text box      | Yes       |
| Constant      | Yes       |
| Data source   | Yes       |
| Interval      | Yes       |
| Filters       | Yes       |

## Create a query variable

Query variables get their values from your workspace. To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the Azure Monitor Managed Service for Prometheus data source.
5. Select a query type and enter the query details.
6. Click **Apply** to save the variable.

## Query variable types

When you select **Query** as the variable type, choose a query type that determines how Grafana populates the drop-down values.

Expand table

| Query type        | Required inputs                     | Description                                                                        |
|-------------------|-------------------------------------|------------------------------------------------------------------------------------|
| **Label names**   | Metric (optional)                   | Returns all label names, optionally filtered to a metric.                          |
| **Label values**  | Label (required), Metric (optional) | Returns values for a label, optionally filtered to a metric.                       |
| **Metrics**       | Metric (optional)                   | Returns metric names that match a regular expression.                              |
| **Query result**  | Query (required)                    | Runs a PromQL query and returns the results as variable values.                    |
| **Series query**  | Metric, Label, or both              | Returns time series that match the specified metric or label selectors.            |
| **Classic query** | Query string                        | *Deprecated.* Legacy syntax using functions such as `label_values(metric, label)`. |

> Note
>
> The **Classic query** type supports functions such as `label_names()`, `label_values(label)`, `label_values(metric, label)`, and `metrics(regex)`. For new variables, use the dedicated query types instead, because the classic syntax is deprecated.

### Query type examples

Populate a drop-down with all `job` label values. Set **Query type** to **Label values**, set **Label** to `job`, and leave **Metric** empty:

- **Query type:** Label values
- **Label:** `job`

Show only the instances that report CPU metrics. Set **Query type** to **Label values**, **Label** to `instance`, and **Metric** to `node_cpu_seconds_total`:

- **Query type:** Label values
- **Label:** `instance`
- **Metric:** `node_cpu_seconds_total`

Populate a drop-down with all metrics whose names contain `node`. Set **Query type** to **Metrics** and enter a regular expression in the **Metric** field:

- **Query type:** Metrics
- **Metric:** `node_.*`

List the top five instances by request rate. Set **Query type** to **Query result** and enter a PromQL query:

promql [Copy code to clipboard] Copy

```promql
query_result(topk(5, sum by (instance) (rate(http_requests_total[$__range]))))
```

Because **Query result** returns full series strings, set **Regex** to `/instance="([^"]+)"/` to extract the instance values, and set **Refresh** to **On time range change** so the results update with the dashboard time range.

### Query options

The query variable editor provides the following options.

Expand table

| Option      | Description                                                                                                                                               |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Regex**   | Optional regular expression that extracts part of each returned value. Use a capture group, such as `/instance="([^"]+)"/`.                               |
| **Sort**    | Sort order for the drop-down values, such as alphabetical or numerical, ascending or descending.                                                          |
| **Refresh** | When Grafana updates the values: **On dashboard load** or **On time range change**. Use **On time range change** for variables that depend on `$__range`. |

### Selection options

- **Multi-value:** Lets viewers select multiple values at once. Grafana joins the selected values with a pipe (`|`) for regular expression matching.
- **Include All option:** Adds an **All** option that selects every value. Combined with multi-value, this produces a regular expression such as `value1|value2|value3`.

> Note
>
> When **Multi-value** or **Include All option** is enabled, use the `=~` regular expression match operator instead of `=` in your label matchers, because the variable value becomes a regular expression pattern.

### Chain variables

You can reference one variable in another variable’s query to create dependent, or cascading, variables. For example, if you have a `job` variable, create an `instance` variable whose values depend on the selected job:

promql [Copy code to clipboard] Copy

```promql
label_values(up{job="$job"}, instance)
```

When you change the `job` variable, Grafana refreshes the `instance` variable to show only the instances for that job.

## Use variables in queries

Reference a variable in a query with one of the following syntaxes.

Expand table

| Syntax        | Example                                                                   | Use case                                                                   |
|---------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `$varname`    | `rate(node_cpu_seconds_total{instance="$instance"}[$__rate_interval])`    | Simple and readable. Can’t be used mid-word.                               |
| `${varname}`  | `rate(node_cpu_seconds_total{instance="${instance}"}[$__rate_interval])`  | Use when the variable is adjacent to other text, such as `${env}-cluster`. |
| `[[varname]]` | `rate(node_cpu_seconds_total{instance="[[instance]]"}[$__rate_interval])` | Legacy syntax, supported for backward compatibility.                       |

When a variable allows multiple values, use the `=~` regular expression match operator so the query matches any selected value:

promql [Copy code to clipboard] Copy

```promql
rate(node_cpu_seconds_total{instance=~"$instance"}[$__rate_interval])
```

## Use the rate interval variable

`$__rate_interval` is a Grafana-specific variable designed for use with `rate()` and `increase()`. It guarantees a range window large enough to capture at least four scrape samples, which prevents gaps or inaccuracies. Always use `$__rate_interval` instead of a fixed interval or `$__interval`:

promql [Copy code to clipboard] Copy

```promql
rate(http_requests_total[$__rate_interval])
```

Grafana calculates `$__rate_interval` as `max($__interval + scrape_interval, 4 * scrape_interval)`, where `scrape_interval` is:

1. The per-query **Min step** setting, if set.
2. Otherwise, the data source **Scrape interval** setting under **Interval behavior** on the [configuration page](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).

To get reliable results, set the data source **Scrape interval** to match the scrape interval of the workspace. If your data uses a longer interval than the default and you leave the setting too low, `$__rate_interval` calculates too small a window and `rate()` can return no data.

> Note
>
> Don’t use `$__rate_interval` in workspace recording rules. The interval depends on the evaluation context, so use a fixed interval such as `[5m]` in recording rules instead.

## Filters variable

The **Filters** variable, formerly called ad hoc filters, lets dashboard viewers add label filters without editing queries.

Grafana applies the filters to every Azure Monitor Managed Service for Prometheus query on the dashboard.

To set up a Filters variable:

1. Create a new variable with **Type: Filters**.
2. Select the Azure Monitor Managed Service for Prometheus data source.
3. Save the dashboard.

A filter bar appears at the top of the dashboard. Viewers add filters by selecting a label, an operator (`=`, `!=`, `=~`, or `!~`), and a value. For example, when a viewer adds the filter `namespace = production`, all queries on the dashboard include `{namespace="production"}` without any query changes.

> Note
>
> Grafana applies Filters to all queries that use the selected data source. You can’t apply them to specific panels only.

## Next steps

- [Query editor](/docs/plugins/grafana-azureprometheus-datasource/latest/query-editor/)
- [Add annotations](/docs/plugins/grafana-azureprometheus-datasource/latest/annotations/)
