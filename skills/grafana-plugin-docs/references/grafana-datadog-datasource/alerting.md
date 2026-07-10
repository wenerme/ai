---
title: "Datadog alerting | Grafana Enterprise Plugins documentation"
description: "This document describes how to use Grafana alerting with the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog alerting

The Datadog data source supports Grafana-managed alert rules. You can create alert rules from Datadog queries and have Grafana evaluate them on a schedule, independently of Datadog monitors.

For an introduction to Grafana alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Supported query types

Grafana evaluates alert rules on the backend. All Datadog query types run on the Grafana backend, so you can use any of them in an alert rule:

- **Query**
- **Raw query**
- **Arithmetic**
- **RUM**
- **Logs**
- **APM Spans**
- **Monitor**
- **Events**
- **SLO**

> Note
>
> Alert rules require a query that returns numeric data that Grafana can evaluate against a threshold. Reduce non-numeric results, such as logs or event search results, to a numeric value with an aggregation or a Grafana expression before the alert condition. For example, use a **Count by Status** monitor query or an aggregate logs query rather than a search query that returns individual events.

## Choose a query type for alerting

The query type you choose depends on what you want to alert on:

- To alert on log volume or patterns, use the **Logs** query type in **Aggregate** mode. Aggregate mode returns numeric data that Grafana can evaluate. The **Search** mode returns individual log events as a table, which alert rules can’t evaluate against a threshold. The same applies to the **RUM** and **APM Spans** query types: use **Aggregate** mode, not **Search** mode.
- To alert on the status of monitors that already exist in Datadog, use the **Monitor** query type with the **Count by Status** result type, rather than recreating the monitor logic in Grafana.

### Result format

Grafana alert rules evaluate numeric data, not tables of raw events. For the aggregate query types (**Logs**, **RUM**, and **APM Spans**), set the result format with the **Type** field:

- Set **Type** to **Time Series** and add a **Reduce** expression to collapse the series to a single value, such as **Last** or **Sum**.
- Or set **Type** to **Total** to return a single value directly, which you can threshold without a reduce step.

Avoid query configurations that return individual events or a table, because alert rules can’t compare them against a threshold.

## Create an alert rule

To create an alert rule from a Datadog query, complete the following steps:

1. Create a query in a dashboard panel or in **Explore** and confirm that it returns the expected data.
2. Click **Alerting** &gt; **Alert rules** in the left-side menu.
3. Click **New alert rule**.
4. Enter a name for the rule.
5. Under **Define query and alert condition**, select your Datadog data source.
6. Build the Datadog query that produces the data you want to alert on.
7. Add an **Expression** to reduce the query to a single value, then set the alert condition and threshold.
8. Set the evaluation behavior, including the evaluation group and pending period.
9. Add labels and notifications, then click **Save rule and exit**.

For detailed instructions, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example alerts

The following examples show common alerting use cases. Each example uses a Datadog query, a Grafana expression to reduce the result to a single number, and a threshold condition.

### Alert on a metric threshold

Use this pattern to alert when a metric, such as CPU usage, crosses a threshold. For example, fire an alert when average CPU usage per host exceeds 80%.

1. Add a **Query** type query. Set **Metric** to `system.cpu.user`, set **Aggregate** to `avg by`, and set **Group by** to `host`.
2. Add a **Reduce** expression that takes the **Last** value of the query.
3. Add a **Threshold** expression on the reduced value with the condition **IS ABOVE** `80`.
4. Set the reduce or threshold expression as the alert condition.

### Alert on monitor status

Use this pattern to alert when one or more Datadog monitors enter a given state. For example, fire an alert when any monitor is in the `alert` state.

1. Add a **Monitor** type query. Set **Result type** to **Count by Status**.
2. Add a **Threshold** expression on the `alert` status count with the condition **IS ABOVE** `0`.
3. Set the threshold expression as the alert condition.

### Alert on log volume

Use this pattern to alert when the number of matching logs crosses a threshold. For example, fire an alert when there are more than 100 error logs in the evaluation window.

1. Add a **Logs** type query and set **Query mode** to **Aggregate**.
2. In the **Search query** field, enter `status:error`.
3. Under **Compute**, set the **Aggregation** to `Count` and the **Type** to `Total`.
4. Add a **Threshold** expression on the count with the condition **IS ABOVE** `100`.
5. Set the threshold expression as the alert condition.

## Send alert notifications

Grafana alerting handles notifications through contact points and notification policies, independently of the Datadog data source. Datadog-based alerts route to the same destinations as any other Grafana alert.

- To configure where alerts are sent, refer to [Configure contact points](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) and [Configure notification policies](/docs/grafana/latest/alerting/configure-notifications/create-notification-policy/).
- To route alerts to on-call responders and integrate with tools such as ServiceNow, refer to [Grafana IRM](/docs/grafana-cloud/alerting-and-irm/irm/). You can also send notifications to ServiceNow through a [webhook contact point](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/integrations/webhook-notifier/).

## Rate limits and alert evaluations

Each alert rule evaluation sends one or more requests to the Datadog API. Frequent evaluations across many rules can contribute to Datadog API rate limits.

To reduce the risk of hitting rate limits during alert evaluations:

- Increase the evaluation interval for alert rules that don’t require frequent checks.
- Enable the **API rate limit threshold** in the data source configuration to block requests before reaching the hard limit. For more information, refer to [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/).
- Reduce the number of rules that query the same metrics.

If alert evaluations fail with a `429 Too Many Requests` error, you’re hitting Datadog API rate limits. For more information, refer to [Troubleshoot the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/).
