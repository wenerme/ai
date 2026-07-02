---
title: "Alerting with the Wavefront data source | Grafana Enterprise Plugins documentation"
description: "Create Grafana-managed alert rules from Wavefront data source queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alerting with the Wavefront data source

The Wavefront data source supports [Grafana-managed alert rules](/docs/grafana/latest/alerting/fundamentals/alert-rules/). You can use any Wavefront metric query - built with **Query Builder** or written as **Raw Query** (WQL, PromQL, or Hybrid) - as the query for an alert rule.

> Note
>
> The Wavefront data source participates in Grafana-managed alerting only. It does not implement the Prometheus Ruler API, so data-source-managed alert rules aren’t supported. Create and manage all Wavefront alert rules through Grafana’s alerting UI or API.

> Caution
>
> Alert rules don’t have a dashboard context, so they can’t use dashboard template variables, including ad hoc filters and the `$metriclink` helper variable. Write each alert rule’s query with literal metric names, tag values, and filter expressions.

## Before you begin

- [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/).
- Verify the data source is healthy. On the data source configuration page, click **Save &amp; test** and confirm you see **Status: OK**.
- Make sure your Wavefront API token has permission to read the metrics you plan to alert on.
- Review the Grafana [alerting overview](/docs/grafana/latest/alerting/) if you’re new to Grafana alert rules.

## Supported query types

The alert query editor accepts any metric query that the Wavefront data source supports:

Expand table

| Query type             | Notes                                                                                                                                          |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query Builder**      | Compose a metric query without writing WQL. Useful when you want a simple threshold on a single metric.                                        |
| **Raw Query (WQL)**    | Write Wavefront Query Language directly. Use when you need aggregations, moving windows, or calculations that aren’t available in the builder. |
| **Raw Query (PromQL)** | Write PromQL that Wavefront translates to WQL. Useful when you’re porting rules from a Prometheus-based system.                                |
| **Raw Query (Hybrid)** | Let Wavefront pick between WQL and PromQL.                                                                                                     |

**Events** queries aren’t valid alert rule queries because alert rules need numeric series to threshold against. Use events as [annotations](/docs/plugins/grafana-wavefront-datasource/latest/annotations/) instead.

## Create an alert rule

To create a Grafana-managed alert rule from a Wavefront query:

1. In Grafana, go to **Alerts &amp; IRM** &gt; **Alerting** &gt; **Alert rules** and click **+ New alert rule**.
2. Enter a descriptive **Name** for the rule.
3. Under **Define query and alert condition**, set the data source for query `A` to your Wavefront data source.
4. Build the query you want to alert on:

   - To use the guided editor, leave **Query Mode** set to **Query Builder** and choose a **Metric**, **Aggregate**, and any **Filters** or **Functions**.
   - To write WQL or PromQL directly, switch **Query Mode** to **Raw Query** and enter the query. For more details, refer to the [Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/).
5. Add an expression to reduce the query result to a single number. The default **Reduce** expression with **Last** is a good starting point. Add a **Threshold** expression to set the firing condition.
6. Under **Set evaluation behavior**, choose a folder and an evaluation group, and set the evaluation interval and pending period.
7. Add annotations and labels to describe the alert and route it to the right notification policy.
8. Click **Save rule and exit**.

For the full alert rule workflow, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example alert queries

The following Raw Query expressions are common starting points for alert rules.

High CPU load on any production host:

SQL [Copy code to clipboard] Copy

```sql
max(ts("sample.cpu.loadavg.1m", env="prod"))
```

Low free memory as a percentage of total:

SQL [Copy code to clipboard] Copy

```sql
100 * sum(ts("sample.memory.free")) / sum(ts("sample.memory.total"))
```

Five-minute error rate per service:

SQL [Copy code to clipboard] Copy

```sql
mavg(5m, sum(rate(ts("http.requests.errors")), service))
```

Ingestion dropping below an expected floor:

SQL [Copy code to clipboard] Copy

```sql
sum(rate(ts("~wavefront.points.2878.received")))
```

PromQL request error ratio:

SQL [Copy code to clipboard] Copy

```sql
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
```

## Best practices

- **Align samples for stable evaluation.** Wavefront queries can return data on irregular intervals. Use `align()` in WQL or a `[duration]` range in PromQL to produce a regular time series for the **Reduce** expression. For example, `align(1m, mean, ts("sample.cpu.usage"))`.
- **Avoid unbounded series.** Alert rules evaluate every series the query returns. Use `Filters` or WQL tag filters to limit the result to the series you actually want to alert on. Very wide queries can slow evaluation and generate noisy alerts.
- **Use moving-window functions to smooth out spikes.** Functions like `mavg`, `mmedian`, and `mpercentile` reduce flapping on noisy metrics.
- **Validate before saving.** Click **Preview** in the alert editor to confirm the query returns data and the threshold fires as expected.
- **Write queries with literal values.** Alert rules can’t read dashboard template variables. If you’re porting a query from a dashboard panel, replace every `$variable` reference with the actual metric name, tag value, or filter expression before saving the alert rule.

## Troubleshooting

- **No data:** If the alert rule transitions to **No Data**, check that the query returns series in the dashboard time range. For common causes and fixes, refer to [Troubleshoot the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/troubleshooting/).
- **Error:** Expand the alert rule’s evaluation history for the Wavefront error message. Token, timeout, and URL errors are covered in the troubleshooting guide.
- **Unexpected series:** Use **Preview** in the alert editor to see exactly which series the query returns, then tighten filters or aggregations as needed.

## Next steps

- Learn more in the [Grafana alerting documentation](/docs/grafana/latest/alerting/).
- Build queries with the [Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/).
- Annotate panels with [Wavefront events](/docs/plugins/grafana-wavefront-datasource/latest/annotations/) for richer incident context.
