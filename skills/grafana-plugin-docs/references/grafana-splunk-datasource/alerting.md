---
title: "Splunk alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana Alerting with the Splunk data source to get notified when query results meet defined conditions."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk alerting

The Splunk data source supports Grafana Alerting, which lets you define alert rules based on SPL query results and receive notifications when conditions are met. Alert evaluation runs entirely on the backend, so queries must be written in raw SPL.

## Before you begin

- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/).
- Understand [Grafana Alerting](/docs/grafana/latest/alerting/).

## Create an alert rule

To create an alert rule based on a Splunk query:

1. Navigate to **Alerting** &gt; **Alert rules** in the left-side menu.
2. Click **New alert rule**.
3. Select the Splunk data source.
4. Enter a raw SPL query that returns numeric time-series data. For example:

   spl [Copy code to clipboard] Copy

   ```spl
   index=os sourcetype=cpu | timechart span=1m avg(pctSystem) as cpu_usage
   ```
5. Define the alert condition (for example, “when cpu\_usage is above 90”).
6. Set the evaluation interval and pending period.
7. Configure a contact point and notification policy.
8. Click **Save rule and exit**.

For detailed instructions, refer to [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Query requirements

Alert rules require queries that return numeric, time-series data. Keep the following in mind:

- **Use raw SPL.** Alert evaluation runs on the backend, which executes the `query` field directly. The visual query builder assembles SPL on the frontend and isn’t available during backend alert evaluation. Always write alert queries using the raw SPL editor.
- **Return numeric aggregations.** Use commands like `timechart`, `stats`, or `eventstats` to produce numeric results.
- **Include a time field.** Ensure the query returns a `_time` field (or the custom time field configured in the data source settings) for proper time-series evaluation.
- **Avoid raw events.** Alert rules can’t evaluate unstructured log text. Aggregate or summarize data before evaluation.

## Alert query examples

The following examples demonstrate common alerting use cases with the Splunk data source.

### Monitor error rates

Alert when the error rate exceeds a threshold:

spl [Copy code to clipboard] Copy

```spl
index=main log_level=ERROR | timechart span=5m count as error_count
```

Set the condition to trigger when `error_count` exceeds your threshold.

### Monitor system performance

Alert on high CPU usage:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=cpu | timechart span=1m avg(pctSystem) as system_cpu
```

Set the condition to trigger when `system_cpu` exceeds 90.

### Monitor disk usage

Alert when disk space drops below a threshold:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=df | timechart span=5m avg(PercentUsedSpace) by mount | where mount="/data"
```

### Monitor search job failures

Alert when Splunk search jobs fail:

spl [Copy code to clipboard] Copy

```spl
index=_internal sourcetype=scheduler status=failed | timechart span=5m count as failed_jobs
```

### Multi-dimensional alert

Create per-host alerts by splitting on a field:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=cpu | timechart span=5m avg(pctSystem) as cpu_usage by host
```

Each host creates a separate alert instance, allowing you to track which specific hosts exceed the threshold.

## Data source settings that affect alerting

Alert evaluation runs on the backend and respects the following data source settings:

Expand table

| Setting                      | Default  | Alert impact                                                                                             |
|------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| **Timeout**                  | 30s      | Maximum time for the Splunk HTTP request. Alert evaluation fails if the query exceeds this value.        |
| **Results limit**            | 10,000   | Caps the number of rows returned. Ensure this is high enough to capture all relevant data.               |
| **Timestamp field**          | `_time`  | The field used for time-series framing. Must match the time field in your query results.                 |
| **Internal field filtering** | Disabled | When enabled, filters out Splunk internal fields (fields starting with `_` except `_time`) from results. |

> Note
>
> Frontend-only settings such as **Min poll interval**, **Max poll interval**, **Data links**, and **Display mode** don’t apply during alert evaluation because alerts bypass the frontend.

## Considerations

Keep the following in mind when using Grafana Alerting with the Splunk data source.

### Async queries and preview mode

If **Async queries** or **Preview mode** is enabled on the data source, these settings are applied during alert evaluation. However, alert evaluation makes a single backend call per evaluation interval. If the Splunk search job doesn’t complete within that call, the backend returns an incomplete result and the alert may evaluate as **no data**.

For data sources used primarily for alerting, consider disabling **Async queries** and **Preview mode** to ensure queries run synchronously and return complete results.

### Timeouts

The default plugin timeout is 30 seconds. Complex SPL queries on large indexes may exceed this during alert evaluation. Additionally, Splunk’s `auto_cancel` setting (also 30 seconds by default) can cancel idle search jobs.

If alert queries are timing out, increase the **Timeout** value in the data source configuration and verify your Splunk instance’s `auto_cancel` setting.

### Evaluation frequency

Frequent evaluations with complex SPL queries can increase load on your Splunk instance. Use efficient queries with appropriate `span` values and evaluation intervals to balance alert responsiveness with Splunk resource usage.

### Template variables

Grafana substitutes template variables before sending queries to the backend for alert evaluation. However, alert rules that depend on dashboard-scoped variables may not behave as expected because alerts evaluate outside the dashboard context. Use static values or Grafana Alerting-compatible variable substitution in alert queries.

For more information on Grafana Alerting, refer to [Alerting](/docs/grafana/latest/alerting/).
