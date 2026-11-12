---
title: "Datadog alerting | Grafana Enterprise Plugins documentation"
description: "This document describes how to use Grafana alerting with the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog alerting

The Datadog data source supports Grafana-managed alert rules. You can create alert rules from Datadog queries and have Grafana evaluate them on a schedule, independently of Datadog monitors.

For an introduction to Grafana alerting, refer to [Alerting](https://grafana.com/docs/grafana/latest/alerting/).

## Supported query types

Grafana evaluates alert rules on the backend. Every Datadog query type runs on the backend, but Grafana can only alert on a **numeric** value. Use a query that returns a number, or a time series that you reduce to a number, before you set the alert condition.

Expand table

| Query type                       | Use for alerting                                                                                                                                                                                                         |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query**, **Raw Query**         | Yes. Reduce grouped or time-series results to a single value per series.                                                                                                                                                 |
| **Arithmetic**                   | Not in a standard alert rule. Grafana alerting sends each query in a separate request, so cross-query references such as `#A / #B` aren’t resolved. Use a single **Raw Query** or a Grafana **Math** expression instead. |
| **Logs**, **RUM**, **APM Spans** | Yes, in **Aggregate** mode. Don’t use **Search** mode.                                                                                                                                                                   |
| **Monitor**                      | Yes, with a count result type such as **Count by Status**. Don’t use **Monitors list**.                                                                                                                                  |
| **SLO**                          | Yes. Prefer **Value** so you get a single SLI number. **Timeseries** needs a **Reduce** expression.                                                                                                                      |
| **Events**                       | No. Events queries return a table of events, not a number.                                                                                                                                                               |

## Choose a query type for alerting

The query type you choose depends on what you want to alert on:

- To alert on a metric threshold, use **Query** or **Raw Query**.
- To alert on a ratio of two metrics, such as errors divided by requests, use a single **Raw Query** that divides them (`sum:errors{*} / sum:requests{*}`) or a Grafana **Math** expression that references two queries (`$A / $B`). Don’t use an **Arithmetic** query in an alert rule: Grafana alerting sends each query separately, so its `#A`/`#B` references aren’t resolved.
- To alert on log, RUM, or span volume, use **Logs**, **RUM**, or **APM Spans** in **Aggregate** mode. **Search** mode returns individual events as a table, which alert rules can’t evaluate against a threshold.
- To alert on monitors that already exist in Datadog, use **Monitor** with **Count by Status**, rather than recreating the monitor logic in Grafana.
- To alert when an SLO drops below its target, use **SLO** with the **Value** result type.

### Result format

Grafana alert rules evaluate numeric data, not tables of raw events.

For **Logs**, **RUM**, and **APM Spans** aggregate queries, set the result format with the **Type** field:

- Set **Type** to **Time Series** and add a **Reduce** expression to collapse the series to a single value, such as **Last** or **Sum**.
- Or set **Type** to **Total** to return a single value directly, which you can threshold without a reduce step.

For **SLO**, set **Result type** to **Value** to return a single SLI number. For **Monitor**, filter the query so the count represents the status you care about, such as `status:alert`. **Count by Status** returns a table of status names and counts, not a field named `alert`.

## Create an alert rule

To create an alert rule from a Datadog query, complete the following steps:

1. Create a query in a dashboard panel or in **Explore** and confirm that it returns the expected numeric data.
2. Click **Alerting** &gt; **Alert rules** in the left-side menu.
3. Click **New alert rule**.
4. Enter a name for the rule.
5. Under **Define query and alert condition**, select your Datadog data source.
6. Build the Datadog query that produces the data you want to alert on.
7. If the query returns a time series or multiple series, add a **Reduce** expression to convert each series to a single value. Then add a **Threshold** expression for the alert condition.
8. Set the evaluation behavior, including the evaluation group and pending period.
9. Add labels and notifications, then click **Save rule and exit**.

For detailed instructions, refer to [Configure Grafana-managed alert rules](https://grafana.com/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example alerts

The following examples show common alerting use cases. Each example uses a Datadog query that returns a number Grafana can threshold. Some queries need a **Reduce** expression. Others already return a single value.

### Alert on a metric threshold

Use this pattern to alert when a metric, such as CPU usage, crosses a threshold. For example, fire an alert when average CPU usage per host exceeds 80%.

1. Add a **Query** type query. Set **Metric** to `system.cpu.user`, set **Aggregate** to `avg by`, and set **Group by** to `host`.
2. Add a **Reduce** expression that takes the **Last** value of the query.
3. Add a **Threshold** expression on the reduced value with the condition **Is above** `80`.
4. Set the reduce or threshold expression as the alert condition.

Because the query groups by `host`, Grafana evaluates the threshold for each series. One rule can fire a separate alert instance for every host that exceeds 80%.

### Alert on monitor status

Use this pattern to alert when one or more Datadog monitors enter a given state. For example, fire an alert when any monitor is in the `alert` state.

**Count by Status** returns a table with **Status** and **Count** columns. Filter the Datadog query so the count includes only the status you want to alert on.

1. Add a **Monitor** type query. Set **Search type** to **Individual** and **Result type** to **Count by Status**.
2. In **Query**, enter `status:alert`.
3. Add a **Threshold** expression on **Count** with the condition **Is above** `0`.
4. Set the threshold expression as the alert condition.

> Note
>
> When no monitors match the query, the result has zero rows, which Grafana treats as No Data rather than a count of `0`. By default, a No Data result fires a `DatasourceNoData` alert even though nothing is wrong. If you want the rule to stay in the normal state when no monitors match, set **Alert state if no data or all values are null** to **Normal** in the rule’s evaluation behavior.

### Alert on log volume

Use this pattern to alert when the number of matching logs crosses a threshold. For example, fire an alert when there are more than 100 error logs in the evaluation window.

1. Add a **Logs** type query and set **Query mode** to **Aggregate**.
2. In **Search query**, enter `status:error`.
3. Under **Compute**, set **Aggregation** to **Count**, **Metric** to `*`, and **Type** to **Total**.
4. Add a **Threshold** expression on the count with the condition **Is above** `100`.
5. Set the threshold expression as the alert condition.

The **Total** type returns a single number, so you don’t need a **Reduce** expression. The same **Aggregate** plus **Total** pattern works for **RUM** and **APM Spans**.

### Alert on SLO value

Use this pattern to alert when a Datadog SLO drops below its target. For example, fire an alert when the SLI value is below `99`.

> Note
>
> The SLO **Value** result type is in public preview.

Datadog returns the SLI as a percentage from 0 to 100. Confirm the value in **Explore** before you set the threshold.

1. Add an **SLO** type query.
2. Set **Result type** to **Value**.
3. Select an **Objective**.
4. If the SLO is monitor-based, set **Display** to **Overall** so the query returns a single SLI value.
5. Add a **Threshold** expression on the SLI value with the condition **Is below** `99`.
6. Set the threshold expression as the alert condition.

### Alert on a metric ratio

Use this pattern to alert on a ratio of two metrics, such as errors divided by requests.

Don’t use an **Arithmetic** query for this in an alert rule. Grafana alerting evaluates each query in a separate request, so an Arithmetic query’s `#A`/`#B` references aren’t resolved, and Datadog receives the expression literally. Use one of the following approaches instead.

**Option 1: A single Raw Query**

1. Add a **Raw Query** type query that divides the two metrics, such as `sum:errors{*} / sum:requests{*}`.
2. Add a **Reduce** expression that takes the **Last** value of the query.
3. Add a **Threshold** expression on the reduced value with the condition **Is above** `0.05`, which is 5%.
4. Set the reduce or threshold expression as the alert condition.

**Option 2: A Grafana Math expression**

1. Add a **Query** or **Raw Query** as query **A** that returns the error count.
2. Add a second **Query** or **Raw Query** as query **B** that returns the request count.
3. Add a **Math** expression with the formula `$A / $B`.
4. Add a **Reduce** expression that takes the **Last** value of the Math expression.
5. Add a **Threshold** expression on the reduced value with the condition **Is above** `0.05`, which is 5%.
6. Set the threshold expression as the alert condition.

## Send alert notifications

Grafana alerting handles notifications through contact points and notification policies, independently of the Datadog data source. Datadog-based alerts use the same destinations as any other Grafana alert.

- To configure alert destinations, refer to [Configure contact points](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) and [Configure notification policies](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/create-notification-policy/).
- To route alerts to on-call responders and integrate with tools such as ServiceNow, refer to [Grafana IRM](https://grafana.com/docs/grafana-cloud/alerting-and-irm/irm/). You can also send notifications to ServiceNow through a [webhook contact point](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/integrations/webhook-notifier/).

## Rate limits and alert evaluations

Each alert rule evaluation sends one or more requests to the Datadog API. Frequent evaluations across many rules can contribute to Datadog API rate limits.

To reduce the risk of hitting rate limits during alert evaluations:

- Increase the evaluation interval for alert rules that don’t require frequent checks.
- Enable the **API rate limit threshold** in the data source configuration to block requests before reaching the hard limit. For more information, refer to [Configure the Datadog data source](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/configure/).
- Reduce the number of rules that query the same metrics.

If alert evaluations fail with a `429 Too Many Requests` error, you’re hitting Datadog API rate limits. For more information, refer to [Troubleshoot the Datadog data source](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/).
