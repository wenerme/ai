---
title: "Wavefront template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables to build dynamic dashboards with the Wavefront data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Wavefront template variables

Use template variables to build dynamic, reusable dashboards with the Wavefront data source. For general information about template variables in Grafana, refer to [Variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

- [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/).
- Create a dashboard where you want to use variables.

## Supported variable types

Expand table

| Variable type  | Supported |
|----------------|-----------|
| Query          | Yes       |
| Custom         | Yes       |
| Text box       | Yes       |
| Constant       | Yes       |
| Data source    | Yes       |
| Interval       | Yes       |
| Ad hoc filters | Yes       |

For ad hoc filter setup, refer to [Ad hoc filters](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/#ad-hoc-filters) on the query editor page.

## Query variable types

Wavefront query variables have a **Query Type**, a **Query** expression, and (for the `Tag Values` type) a **Tag** field. All query types require a non-empty **Query**; an empty query returns `invalid query`.

Expand table

| Query Type (UI label)       | Required fields    | Returns                                                                                |
|-----------------------------|--------------------|----------------------------------------------------------------------------------------|
| **Metrics**                 | **Query**          | Metric names matching the query.                                                       |
| **Hosts / Sources**         | **Query**          | Source (host) names reporting a metric that matches the query.                         |
| **Host Tags / Source Tags** | **Query**          | Source tag keys reported by any source for metrics matching the query.                 |
| **Matching Host Tags**      | **Query**          | Source tag keys that apply to the specific sources returned by the query.              |
| **Tag Names**               | **Query**          | Metric (point) tag keys for metrics matching the query.                                |
| **Tag Values**              | **Query**, **Tag** | Values for the metric tag specified in **Tag**, across metrics matching the **Query**. |

### The Query expression

The data source sends the **Query** field to Wavefront’s key lookup API after variable interpolation. Enter a metric pattern or expression that Wavefront can use to find matching metrics, sources, or tags, including:

- A metric name, for example `sample.cpu.loadavg.1m`.
- A wildcard metric pattern, for example `sample.cpu.*`.
- The `~` prefix for internal or demo metrics, for example `~sample.cpu.*`.
- A pattern combined with tag filters, for example `sample.cpu.*, env="prod"`.

The field’s placeholder, `~sample.cpu.*`, is a safe default because it targets the built-in Wavefront sample metrics.

### Template variables in the Query field

You can reference other dashboard variables in the **Query** and **Tag** fields. The data source interpolates them before calling the Wavefront API, which makes it easy to build dependent variables:

text [Copy code to clipboard] Copy

```text
~kubernetes.$cluster.pod.cpu.usage_rate
```

When a variable has multiple values selected, the plugin expands `key=$var` into `(v1 or v2)` so Wavefront receives a valid filter. You don’t need to configure a special variable format.

### Legacy query formats

Variables created before plugin v2.0.0 used string-based queries such as `metrics: ts(...)` or `sources: cpu.*`. The plugin automatically migrates those queries when they load:

Expand table

| Legacy prefix         | Migrated query type                     |
|-----------------------|-----------------------------------------|
| `metrics:`            | `metrics`                               |
| `sources:`            | `hosts`                                 |
| `sourceTags:`         | `hostTags`                              |
| `matchingSourceTags:` | `matchingHostTags`                      |
| `tagNames:`           | `tagNames`                              |
| `tagValues(<tag>):`   | `tagValues` with **Tag** set to `<tag>` |

You don’t need to edit migrated variables unless you want to use the newer UI fields.

## Create a query variable

To create a Wavefront query variable:

1. Open your dashboard and click the gear icon to open dashboard settings.
2. Select **Variables** and click **Add variable**.
3. Set **Select variable type** to **Query**.
4. Set **Data source** to your Wavefront data source.
5. In the query editor, set **Query Type** to one of the types listed in the preceding table.
6. Enter a **Query** expression. For **Tag Values**, also fill in the **Tag** field.
7. Optionally enable **Multi-value** or **Include All option** to let users select multiple values.
8. Click **Run query** to preview results.
9. Click **Apply** to save the variable.

## Query examples

List all sample CPU metrics:

- **Query Type:** Metrics
- **Query:** `~sample.cpu.*`

List all sources reporting CPU metrics:

- **Query Type:** Hosts / Sources
- **Query:** `~sample.cpu.*`

List the source tag keys available on sources reporting CPU metrics:

- **Query Type:** Host Tags / Source Tags
- **Query:** `~sample.cpu.*`

List the tag keys that apply to the subset of sources matched by a WQL expression:

- **Query Type:** Matching Host Tags
- **Query:** `~sample.cpu.*`

List the metric (point) tag keys attached to Kubernetes pod CPU metrics:

- **Query Type:** Tag Names
- **Query:** `kubernetes.pod_container.cpu.usage_rate`

List the values of the `env` metric tag across all CPU metrics:

- **Query Type:** Tag Values
- **Query:** `~sample.cpu.*`
- **Tag:** `env`

Scope tag values to a single environment by referencing another variable (dependent variable pattern):

- **Query Type:** Tag Values
- **Query:** `~sample.cpu.*, env="$environment"`
- **Tag:** `host`

List the services reporting HTTP request metrics:

- **Query Type:** Tag Values
- **Query:** `http.requests.total`
- **Tag:** `service`

## Use variables in queries

Reference variables in queries using `$variable` or `${variable}` syntax. For details, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

### In Query Builder

Select a variable from the filter **Value** drop-down, or type `$variable` into a filter **Value** field. For example, setting **Key** to `env` and **Value** to `$environment` filters the query to the environment selected in the variable drop-down.

You can also reference a variable in the **Metric** or **Aggregate** fields by typing `$variable` as the value.

### In Raw Query

Interpolate variables directly into WQL or PromQL expressions.

WQL:

SQL [Copy code to clipboard] Copy

```sql
avg(ts("sample.cpu.loadavg.1m", env="$environment"))
```

SQL [Copy code to clipboard] Copy

```sql
mavg(5m, sum(rate(ts("http.requests.total", service="$service"))))
```

PromQL:

SQL [Copy code to clipboard] Copy

```sql
rate(http_requests_total{env="$environment"}[5m])
```

## Multi-value and Include All behavior

The Wavefront data source handles multi-value and **Include All** variables automatically in both query modes.

- **In Query Builder:** When a filter value is `$variable` and the variable has multiple values selected, the data source expands it into `(v1 or v2 or v3)` and sends the resulting WQL to Wavefront. Use multi-value variables in filters without additional configuration.
- **In Raw Query (WQL):** When a query contains `key=$variable` and the variable has multiple values selected, the data source expands the variable value into `(v1 or v2 or v3)`. For example, with a multi-value variable `$namespace`:

  SQL [Copy code to clipboard] Copy

  ```sql
  avg(ts("kubernetes.pod.cpu.usage_rate", cluster="grafana" and namespace_name=$namespace))
  ```

  expands to:

  SQL [Copy code to clipboard] Copy

  ```sql
  avg(ts("kubernetes.pod.cpu.usage_rate", cluster="grafana" and namespace_name=(prod or stage)))
  ```
- **In Raw Query (PromQL):** PromQL uses regular-expression matching. Use the `regex` [format option](/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options) to expand a multi-value variable into a regex:

  SQL [Copy code to clipboard] Copy

  ```sql
  rate(http_requests_total{service=~"${service:regex}"}[5m])
  ```

To inspect the final expanded query, open the panel’s query inspector and review the **Request** tab.

## Next steps

- [Build queries with the Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/).
- [Create alert rules from Wavefront queries](/docs/plugins/grafana-wavefront-datasource/latest/alerting/).
- [Annotate panels with Wavefront events](/docs/plugins/grafana-wavefront-datasource/latest/annotations/).
