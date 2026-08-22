---
title: "Azure Monitor Managed Service for Prometheus annotations | Grafana Plugins documentation"
description: "Use the Azure Monitor Managed Service for Prometheus data source to add annotations to Grafana dashboards from PromQL queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Monitor Managed Service for Prometheus annotations

Annotations overlay event markers on dashboard graphs so you can correlate metrics with events such as deployments, alerts, or threshold crossings. The Azure Monitor Managed Service for Prometheus data source supports annotations driven by PromQL queries, the same as the core Grafana Prometheus data source.

For general information about annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

Before you add annotations, ensure you have:

- [Configured the Azure Monitor Managed Service for Prometheus data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).
- A metric in your workspace that represents the events you want to annotate, such as the built-in `ALERTS` metric or a custom event metric.

## Create an annotation query

To add an annotation query to a dashboard:

01. Navigate to the dashboard you want to update and click **Edit**.
02. Click the **Add new element** icon and select **Annotation query**.
03. Enter a name for the annotation query.
04. If you don’t want to use the annotation query right away, clear the **Enabled** checkbox.
05. Select a color for the annotation event markers.
06. Click **Open query editor** to open the **Annotation Query** dialog box.
07. Select the Azure Monitor Managed Service for Prometheus data source from the **Data source** drop-down list.
08. Enter a PromQL expression in the query field.
09. Set the **Min step** to control annotation density. A larger step produces fewer annotations.
10. Configure the field mappings to control what appears in the annotation tooltip.
11. Optional: Click **Test annotation query** to confirm the query works.
12. Click **Close**, then save the dashboard.

## How annotations work

Prometheus annotations work differently from table-based annotations. Instead of querying a table of events, you write a PromQL expression that returns time series data, and Grafana converts the results into annotation events using these rules:

- Grafana runs the PromQL query as a range query over the dashboard’s time window.
- **Every data point returned creates an annotation.** Grafana doesn’t automatically filter zero values. To annotate only specific moments, your PromQL expression must filter the results, for example with a comparison operator such as `> 0` or by querying the `ALERTS` metric.
- Grafana uses the field mapping configuration to determine the title, text, and tags for each annotation.
- If the query returns multiple series, each series produces its own set of annotations.

> Note
>
> Because every returned data point creates an annotation, a query that returns continuous data such as `node_cpu_seconds_total` produces an annotation at every step interval and floods the dashboard. Always use an expression that returns data only at the moments you want to annotate.

## Field mappings

After you enter a PromQL expression, use the field mapping drop-downs to control how query results appear as annotations. Select a returned field from each drop-down, or enter a fixed text value.

Expand table

| Field       | Description                                                                                          | Default behavior                                                                     |
|-------------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Time**    | The timestamp for the annotation.                                                                    | Uses the first time-type field, which is always present.                             |
| **TimeEnd** | An end timestamp for range annotations, which display as a shaded region instead of a vertical line. | Not set, which produces point annotations.                                           |
| **Title**   | Short label displayed on the annotation marker.                                                      | Not set.                                                                             |
| **Text**    | The annotation description displayed when you hover over the marker.                                 | Uses the first string-type field, or the metric or label display name if configured. |
| **Tags**    | Comma-separated tags for the annotation. Use tags to categorize and filter annotations.              | Not set.                                                                             |

## Annotation query examples

The following examples show common annotation patterns. Replace the metric and label names with the ones in your workspace.

### Alert-based annotations

The most reliable way to create annotations is the built-in `ALERTS` metric, which Prometheus generates for all configured alerting rules:

promql [Copy code to clipboard] Copy

```promql
ALERTS{alertstate="firing"}
```

This creates an annotation at every step interval where an alert is firing. The `ALERTS` metric includes labels such as `alertname`, `alertstate` (either `firing` or `pending`), and any labels defined on the alerting rule.

To limit annotations to specific alerts or severity levels:

promql [Copy code to clipboard] Copy

```promql
ALERTS{alertname="HighErrorRate", severity="critical"}
```

Configure the field mappings:

- **Text:** `alertname` to display the alert name on hover.
- **Tags:** `severity` to allow filtering by severity.

### Service restart annotations

Annotate when a process restarts. The `changes()` function detects when a value changes, and `> 0` ensures annotations appear only at the moment of change:

promql [Copy code to clipboard] Copy

```promql
changes(process_start_time_seconds{job="checkout"}[5m]) > 0
```

### Deployment annotations

If you track deployments by pushing a timestamp metric through a `Pushgateway` or a recording rule, annotate when the value changes:

promql [Copy code to clipboard] Copy

```promql
changes(deployment_timestamp_seconds{environment="production"}[10m]) > 0
```

Configure the field mappings:

- **Text:** `environment` to show which environment was deployed.
- **Tags:** `environment`.

### Threshold crossing annotations

Annotate when available node memory drops below 10 percent:

promql [Copy code to clipboard] Copy

```promql
node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes < 0.1
```

> Note
>
> Comparison operators in PromQL act as filters. They return only the data points where the condition is true, so the expression above returns data only when memory is below 10 percent. You don’t need to add an outer `> 0` wrapper.

### Scaling event annotations

Annotate when the number of running pods changes:

promql [Copy code to clipboard] Copy

```promql
changes(kube_deployment_status_replicas{deployment="my-app"}[5m]) > 0
```

### Error spike annotations

Annotate when the HTTP 5xx error ratio exceeds five percent:

promql [Copy code to clipboard] Copy

```promql
sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))
/
sum by (job) (rate(http_requests_total[5m]))
> 0.05
```

## Control annotation density

The **Min step** setting controls how many data points the query returns, which directly affects how many annotations appear. A larger step produces fewer annotations:

- **Min step `1m`:** Up to one annotation per minute, good for short time ranges.
- **Min step `5m`:** Up to one annotation per five minutes, good for day-range dashboards.
- **Min step `1h`:** Up to one annotation per hour, good for week-range dashboards.

If a dashboard shows too many annotation markers, increase the **Min step** or add more specific filters to the query.

## Use template variables in annotations

You can use [template variables](/docs/plugins/grafana-azureprometheus-datasource/latest/template-variables/) in annotation queries to filter annotations based on dashboard variable selections:

promql [Copy code to clipboard] Copy

```promql
ALERTS{alertstate="firing", instance=~"$instance"}
```

Grafana resolves template variables in annotations at query time using the current dashboard variable values.

## Next steps

- If annotations don’t appear or you encounter errors, refer to [Troubleshooting](/docs/plugins/grafana-azureprometheus-datasource/latest/troubleshooting/).
- [Query editor](/docs/plugins/grafana-azureprometheus-datasource/latest/query-editor/)
