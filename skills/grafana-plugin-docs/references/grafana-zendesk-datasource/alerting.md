---
title: "Zendesk data source alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alert rules that use the Zendesk data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zendesk data source alerting

You can use the Zendesk data source in [Grafana Alerting](/docs/grafana/latest/alerting/) to trigger alerts based on your Zendesk data. The Zendesk data source doesn’t have an alerting-specific query type. Instead, you build a query with the [Zendesk query editor](/docs/plugins/grafana-zendesk-datasource/latest/query-editor/) and use its result as the input to an alert rule.

## Before you begin

Before you create an alert rule, ensure you have:

- Configured the [Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/).
- A query that returns a numeric value. Alert rules evaluate to a number, so the query must reduce to a single numeric value. The `Count tickets` query type is a good fit because it returns an approximate ticket count.

## Choose a query for alerting

Grafana Alerting evaluates a query to a single number, so the query type you choose matters:

- **Count tickets** is the best fit. It returns a single numeric value that you can threshold directly.
- **Search**, **Show all users**, and similar query types return tables of rows that contain text and timestamps. Grafana Alerting can’t evaluate this multi-row data directly, and it may report `input data must be a wide series but got type long`. Reduce the result to a single number with an expression before you use it as an alert condition.

## Create an alert rule

To create an alert rule that uses the Zendesk data source:

1. Navigate to **Alerting** &gt; **Alert rules** and click **New alert rule**.
2. Enter a name for the rule.
3. In the query section, select the Zendesk data source.
4. Build a query that returns a numeric value, such as the **Count tickets** query type.
5. Enable **Advanced options** to show the **Expressions** section, then add an expression to reduce or threshold the query result if needed and set the alert condition.
6. Add labels and notifications.
7. Set the evaluation behavior, including how often the rule is evaluated and for how long the condition must be true before it fires.
8. Click **Save rule and exit**.

For detailed instructions on building alert rules, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Alert on open ticket volume

You can alert when the number of tickets in your account crosses a threshold:

1. Create a new alert rule and select the Zendesk data source.
2. Select the **Count tickets** query type to return the current ticket count.
3. Enable **Advanced options**, then add a threshold expression that fires when the count is above your chosen limit.
4. Configure notifications to route the alert to the appropriate contact point.

> Note
>
> The `Count tickets` query returns an approximate count. If the count exceeds 100,000, Zendesk updates it every 24 hours, so use it for trend-based alerting rather than exact real-time thresholds.

## Considerations

Keep the following in mind when you alert on Zendesk data:

- **Numeric results only:** Alert queries must reduce to a single numeric value. Queries that return tables of tickets or users need a reduce expression before they can be used as an alert condition.
- **Debug with the query inspector:** If an alert can’t use a query that looks numeric, open the query in a panel and check the field type in the query inspector. Grafana treats JSON numbers as numeric automatically, but a value returned by the Zendesk API as a string isn’t numeric until you convert it.
- **API rate limits:** Frequent rule evaluations increase the number of Zendesk API requests. Set an evaluation interval that balances timeliness with the [Zendesk API rate limits](https://developer.zendesk.com/api-reference/introduction/rate-limits/).
- **Data freshness:** Some Zendesk endpoints, such as ticket counts, return cached or approximate values. Account for this when you choose thresholds and evaluation windows.

## Next steps

- Learn more about [Grafana Alerting](/docs/grafana/latest/alerting/).
- Configure [contact points](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) to route notifications.
