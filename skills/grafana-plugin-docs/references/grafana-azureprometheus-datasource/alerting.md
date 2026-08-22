---
title: "Azure Monitor Managed Service for Prometheus alerting | Grafana Plugins documentation"
description: "Set up alerting with the Azure Monitor Managed Service for Prometheus data source, including Grafana-managed and workspace-managed rules."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Monitor Managed Service for Prometheus alerting

The Azure Monitor Managed Service for Prometheus data source works with Grafana Alerting. You can create Grafana-managed alert rules that query your workspace, and you can manage alerting and recording rules stored in the workspace from the Grafana Alerting UI.

## Before you begin

Before you set up alerting, ensure you have:

- [Configured the Azure Monitor Managed Service for Prometheus data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/).
- Azure credentials with permission to query the workspace, and permission to read and write Prometheus rule groups if you manage workspace rules from Grafana.
- The appropriate Grafana role. Reading workspace rules requires the **Viewer** role. Creating, editing, or deleting them requires the **Editor** role.

## Alert approaches

The data source supports two complementary alerting approaches.

Expand table

| Approach                        | Where rules run  | Best for                                                                                |
|---------------------------------|------------------|-----------------------------------------------------------------------------------------|
| **Grafana-managed alert rules** | In Grafana       | A single alerting experience across data sources, expressions, and notification images. |
| **Workspace-managed rules**     | In Azure Monitor | Rules that run close to the data and stay available independently of Grafana.           |

### Grafana-managed alert rules

Grafana-managed alert rules run in Grafana and can query your Azure Monitor workspace as their data source. Grafana evaluates the rule, manages its state, and routes notifications. Use this approach when you want a single alerting experience across all your data sources, including expressions, images in notifications, and rules that query multiple data sources.

To create a Grafana-managed alert rule, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/). Set the rule’s query to a PromQL expression that returns a numeric value, then add a threshold condition.

> Note
>
> Grafana-managed alert rules require credentials that work without a signed-in user. If the data source uses **Current User** authentication, configure [fallback service credentials](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/#current-user) so rule evaluation has an identity.

#### Alert query examples

The following examples return a single value per series that you compare against a threshold in the rule condition. Replace the metric and label names with the ones in your workspace.

Alert when the ratio of HTTP 5xx errors exceeds five percent over the last five minutes:

promql [Copy code to clipboard] Copy

```promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

Set the condition to `IS ABOVE 0.05`.

Alert when 95th percentile request latency exceeds one second:

promql [Copy code to clipboard] Copy

```promql
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))
```

Set the condition to `IS ABOVE 1`.

Alert when a scrape target is down:

promql [Copy code to clipboard] Copy

```promql
up{job="api"} == 0
```

Set the condition to `IS ABOVE 0` so the rule fires while any matching target reports as down.

Alert when node memory usage exceeds 90 percent:

promql [Copy code to clipboard] Copy

```promql
100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)
```

Set the condition to `IS ABOVE 90`.

Alert when a container restarts more than three times in the last 15 minutes:

promql [Copy code to clipboard] Copy

```promql
sum by (pod) (increase(kube_pod_container_status_restarts_total[15m]))
```

Set the condition to `IS ABOVE 3`.

### Workspace-managed rules

The data source can also read and write the recording and alerting rules stored in your Azure Monitor workspace. These rules are evaluated by Azure Monitor, not by Grafana. Use this approach when you want your rules to run close to the data and remain available independently of Grafana.

The data source manages two kinds of rules:

- **Recording rules:** Pre-compute frequently used or expensive expressions and store the results as new time series for faster queries.
- **Alerting rules:** Evaluate a condition and fire when the condition holds for the configured duration.

To manage these rules from Grafana, enable **Manage alerts via Alerting UI** on the data source [configuration page](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/). When enabled, the rules appear in the Grafana Alerting UI, where you can view and edit them.

The data source reaches the workspace ruler through the `/rules` and `/config/v1/rules` paths under the **Prometheus server URL** you configure, so you don’t need to set a separate ruler URL. If the rules fail to load with an **Unable to fetch alert rules** error, refer to [Troubleshooting](/docs/plugins/grafana-azureprometheus-datasource/latest/troubleshooting/).

Managing rules in the workspace requires an identity with permission to read and write Prometheus rule groups on the Azure Monitor workspace, in addition to query access.

#### Recording rule example

A recording rule stores the result of an expression as a new metric so dashboards and alerts can read the precomputed series. The following rule group records the per-job HTTP request rate:

YAML [Copy code to clipboard] Copy

```yaml
groups:
  - name: http_recording
    rules:
      - record: job:http_requests:rate5m
        expr: sum by (job) (rate(http_requests_total[5m]))
```

Query the recorded metric like any other series:

promql [Copy code to clipboard] Copy

```promql
job:http_requests:rate5m
```

#### Alerting rule example

An alerting rule fires when its expression stays true for the `for` duration. The following rule group alerts when the HTTP 5xx error ratio exceeds five percent for ten minutes:

YAML [Copy code to clipboard] Copy

```yaml
groups:
  - name: http_alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m]))
          > 0.05
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: High HTTP 5xx error rate
          description: More than 5% of requests are failing.
```

> Note
>
> Workspace-managed rules require Prometheus rule groups in your Azure Monitor workspace. In Azure Monitor, rule groups are typically defined as Azure resources. For more information, refer to the [Azure Monitor Prometheus rule groups documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/prometheus-rule-groups).

## Next steps

- [Configure the data source](/docs/plugins/grafana-azureprometheus-datasource/latest/configure/)
- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
