---
title: "Looker alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using Looker data in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker alerting

The Looker data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), so you can create alert rules based on data from your Looker instance and receive notifications when specific conditions are met.

## Before you begin

Before you create an alert rule, ensure you have:

- The appropriate permissions to create alert rules in Grafana.
- A [configured](/docs/plugins/grafana-looker-datasource/latest/configure/) and working Looker data source.
- Familiarity with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert queries must return numeric data that Grafana can evaluate against a threshold. Your Looker query must:

- Return at least one numeric field, such as a measure or numeric dimension, for the alert condition. The data source returns numeric LookML fields as number-typed columns and date and time dimensions as time-typed columns, so Grafana can evaluate and reduce them.
- Return data within the evaluation time range. Use the `$__timeFilter(<field>)` macro to scope the query to the evaluation window.

You can use either the **LookML** query type or the **Run Look** query type for alerting, as long as the result includes a numeric field.

Reference fields by their fully qualified LookML names, such as `orders.count` or `orders.created_time`, both in the query and when you configure the reduce and threshold expressions.

Queries that return only text or non-numeric data can’t be used directly for alerting. Include at least one measure or numeric dimension in the result.

> Note
>
> The `$__timeFilter()`, `$__timeFrom()`, and `$__timeTo()` macros are applied differently depending on the query mode. In **LookML JSON** mode, you can use a macro anywhere in the query body. In **LookML Builder** mode, you can use macros only in the **Filter Expression** field. The **Run Look** query type doesn’t support macros, so scope the saved Look in Looker instead. For macro details, refer to the [Looker query editor](/docs/plugins/grafana-looker-datasource/latest/query-editor/#macros).

## Create an alert rule

To create an alert rule using Looker data:

1. Go to **Alerts &amp; IRM** &gt; **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your Looker data source.
   - Build a Looker query that returns a numeric field. Use `$__timeFilter()` to scope the query to the evaluation range.
   - Select **Advanced options** to reveal the **Expressions** section.
   - Add a **Reduce** expression if your query returns multiple values, to produce a single value per series.
   - Add a **Threshold** expression to define the alert condition.
5. Add labels and annotations to provide context for notifications.
6. Configure the **Set evaluation behavior** section:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval to control how often Grafana checks the alert.
   - Set the pending period to control how long the condition must be true before the alert fires.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Measure threshold alert

This example creates an alert that fires when a LookML measure crosses a threshold.

1. Create an alert rule and select your Looker data source.
2. Use the **LookML** query type in **JSON** mode with a query body similar to the following:

   JSON [Copy code to clipboard] Copy

   ```json
   {
     "model": "ecommerce",
     "view": "orders",
     "fields": ["orders.created_time", "orders.count"],
     "filter_expression": "$__timeFilter(orders.created_time)",
     "sorts": ["orders.created_time"]
   }
   ```
3. Add expressions:

   - **Reduce**: Last value, to get the most recent data point.
   - **Threshold**: Is above your desired order count.
4. Set the evaluation to run every 5 minutes with a 10-minute pending period.
5. Save the rule.

## Example: Builder mode with a filter expression

This example builds the same alert with the visual builder instead of raw JSON, which is the default query mode.

1. Create an alert rule and select your Looker data source.
2. Use the **LookML** query type in **Builder** mode:

   - Select the **Model**, such as `ecommerce`.
   - Select the **Explore Name**, such as `orders`.
   - In **Dimensions &amp; Measures**, add a date dimension and a measure, such as `orders.created_time` and `orders.count`.
   - In the **Filter Expression** field, enter `$__timeFilter(orders.created_time)` to scope the query to the evaluation window.
3. Add expressions:

   - **Reduce**: Last value.
   - **Threshold**: Is above your desired order count.
4. Set the evaluation interval and save the rule.

## Example: Reuse a saved Look

If you already have a Look that returns a numeric result, use it directly for alerting.

1. Create an alert rule and select your Looker data source.
2. Use the **Run Look** query type and enter the **Look ID** of a Look that returns a numeric field.
3. Add a **Reduce** expression to produce a single value, then a **Threshold** expression for the alert condition.
4. Set the evaluation interval and save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with Looker data.

### Use appropriate evaluation intervals

Set the alert evaluation interval based on how frequently your Looker data updates. Avoid very short intervals that can cause evaluation timeouts, and use `$__timeFilter()` to scope queries to the evaluation window.

### Reduce multiple values

When your query returns multiple data points or series, use the **Reduce** expression to produce a single value for the threshold, such as **Last**, **Mean**, **Max**, **Min**, or **Sum**.

### Handle no data conditions

Configure what happens when no data is returned. In the alert rule, find **Configure no data and error handling** and choose an action such as **No Data**, **Alerting**, **OK**, or **Keep Last State**.

### Test queries in Explore first

Before you create an alert, verify the query in [Explore](/docs/grafana/latest/explore/). Confirm the result includes at least one numeric field and returns values in the expected range for your threshold.

## Troubleshooting

If your alerts aren’t working as expected:

- **No data returned:** Verify the query runs successfully in Explore and returns data for the evaluation time range.
- **Query timeout:** Simplify the query or increase the evaluation interval.
- **Unexpected values:** Confirm the query returns a numeric field for the threshold.
- **Alert never fires:** Ensure the **Reduce** expression matches your data shape.

For additional troubleshooting, refer to [Troubleshoot Looker data source issues](/docs/plugins/grafana-looker-datasource/latest/troubleshooting/).

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
