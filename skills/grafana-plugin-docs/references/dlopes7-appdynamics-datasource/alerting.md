---
title: "AppDynamics alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using AppDynamics data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics alerting

The AppDynamics data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on AppDynamics metrics. You can monitor your application environment and receive notifications when specific conditions are met, such as when response times exceed a threshold, error rates spike, or calls per minute drop unexpectedly.

## Before you begin

- Ensure you have permission to create alert rules in Grafana.
- Verify your AppDynamics data source is configured and **Save &amp; test** succeeds.
- For Analytics alerts, configure the Analytics API URL, Global Account Name, and Analytics API key. Refer to [Configure the AppDynamics data source](/docs/plugins/dlopes7-appdynamics-datasource/latest/configure/).
- Review [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

Use **Metrics** or **Analytics** queries for Grafana-managed alert rules. Both can return numeric data that works with **Reduce** and **Threshold** expressions.

- **Metrics** - Application performance metrics from the Controller REST API. Values are numeric time series, so you can alert on them directly.
- **Analytics** - ADQL queries that return numeric results, such as `count(*)` or `avg(responseTime)`. Configure Analytics authentication first.

Don’t use **Health**, **Events**, **Tiers**, or **Metric Names** for threshold alerts. Those query types return lists of violations, events, tiers, or metric paths rather than numeric series.

To set up an alerting query:

1. Select **Metrics** or **Analytics** from the query type radio buttons.
2. Configure the query so it returns numeric data.
3. Add a **Reduce** expression to summarize the time series (for example, last value or mean).
4. Add a **Threshold** expression to define the alert condition.

> Note
>
> For **Health**, **Events**, and **Tiers** queries, the **Use dashboard’s time picker** toggle is hidden in the alerting UI. The alert evaluation window is used as the query time range. Metrics and Analytics queries always use that evaluation window.

## Time macros

Dashboard queries interpolate Grafana time macros in the browser. Alert rules run on the Grafana backend, so the plugin replaces `$__from`, `$__to`, `$__fromMs`, and `$__toMs` (brace and unbrace forms) with epoch milliseconds from the evaluation window. The Analytics API also receives that window as `start` and `end` query parameters.

Use the macros in ADQL when you filter on `eventTimestamp` in the query text:

SQL [Copy code to clipboard] Copy

```sql
SELECT count(*) FROM transactions WHERE eventTimestamp >= $__from AND eventTimestamp <= $__to AND responseTime > 5000
```

For the full macro list, refer to [AppDynamics query editor](/docs/plugins/dlopes7-appdynamics-datasource/latest/query-editor/).

## Create an alert rule

To create an alert rule using AppDynamics data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your AppDynamics data source.
   - Select **Metrics** or **Analytics**.
   - For Metrics, select the **Application** and **Metric** path. Use a static application name, not `${variable}` syntax.
   - For Analytics, enter an ADQL query that returns a numeric column.
   - Add a **Reduce** expression to summarize the series (last value or mean).
   - Add a **Threshold** expression to define the alert condition.
5. Configure **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Application response time alert

This example creates an alert that fires when the average response time exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   - Select your application from the **Application** drop-down.
   - Select `Overall Application Performance|Average Response Time (ms)` as the **Metric**.
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 500
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

## Example: Error rate alert

This example alerts when the number of errors per minute exceeds an acceptable level:

1. Create a new alert rule.
2. Configure the query:

   - Select your application from the **Application** drop-down.
   - Select `Overall Application Performance|Errors per Minute` as the **Metric**.
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 10
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

## Example: Calls per minute alert

This example alerts when traffic drops unexpectedly, which may indicate an outage:

1. Create a new alert rule.
2. Configure the query:

   - Select your application from the **Application** drop-down.
   - Select `Overall Application Performance|Calls per Minute` as the **Metric**.
3. Add expressions:

   - **Reduce**: Mean
   - **Threshold**: Is below 100
4. Set evaluation to run every 5 minutes with a 10-minute pending period.
5. Save the rule.

## Example: Stall count alert

This example fires when stalled transactions appear on the application:

1. Create a new alert rule.
2. Select **Metrics**.
3. Configure the query:

   - Select your application from the **Application** drop-down.
   - Select `Overall Application Performance|Stall Count` as the **Metric**.
   - Set **Aggregation** to **Value**.
4. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 0
5. Set evaluation to run every 1 minute with a 5-minute pending period.
6. Save the rule.

## Example: Analytics alert

This example uses ADQL to alert when many slow transactions occur in the evaluation window:

1. Create a new alert rule.
2. Select **Analytics**.
3. Enter the following ADQL query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT count(*) FROM transactions WHERE eventTimestamp >= $__from AND eventTimestamp <= $__to AND responseTime > 5000
   ```
4. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 50
5. Set evaluation to run every 5 minutes.
6. Save the rule.

## Example: Error transactions (Analytics)

This example alerts on error user experience in the evaluation window:

1. Create a new alert rule.
2. Select **Analytics**.
3. Enter the following ADQL query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT count(*) FROM transactions WHERE eventTimestamp >= $__from AND eventTimestamp <= $__to AND userExperience = 'ERROR'
   ```
4. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 10
5. Set evaluation to run every 5 minutes with a 5-minute pending period.
6. Save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with AppDynamics data.

### Test queries before alerting

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your AppDynamics data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

### Consider evaluation intervals

AppDynamics Controllers enforce API rate limits. Set alert evaluation intervals to avoid unnecessary API calls:

- Use 5 minutes or longer for non-critical alerts.
- Avoid intervals shorter than 1 minute when you monitor many metrics.
- Enable query caching in Grafana Cloud or Grafana Enterprise to reduce repeat queries.

### Use Roll-up for last-value Metrics alerts

For Metrics alerts that use **Reduce: Last value**, turn **Roll-up** on so AppDynamics returns a rolled-up point for the evaluation window instead of a dense series. Leave **Roll-up** off when you use **Reduce: Mean** or **Max** over raw points.

### Handle no data conditions

Configure what happens when no data is returned:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an appropriate behavior for the **If no data or all values are null** setting:

   - **Set state to No Data** - Keep the alert in a distinct no-data state.
   - **Set state to Alerting** - Treat no data as an alert condition.
   - **Set state to Normal** - Treat no data as a healthy state.
   - **Keep last state** - Preserve the alert’s previous state.

### Use template variables carefully

Alert rules don’t support template variables. Ensure your alert queries use static values for application names and metric paths rather than `${variable}` syntax.

## Troubleshoot alerting issues

For common alerting issues with the AppDynamics data source, refer to the [Troubleshooting](/docs/plugins/dlopes7-appdynamics-datasource/latest/troubleshooting/) guide.

Common issues include:

- **Alert not firing**: Ensure the query returns numeric data and the threshold expression is configured. For Analytics, confirm the query returns a number such as `count(*)`.
- **Evaluation errors**: Check that the metric path exists and **Save &amp; test** succeeds. For Analytics, confirm the Analytics API URL, Global Account Name, and API key are set.
- **Timeouts**: Use a longer evaluation interval, enable **Roll-up** on Metrics queries, or reduce Analytics **Limit**.
- **Unexpected time window**: Put `$__from` and `$__to` in ADQL filters so the query text matches the evaluation window. The plugin interpolates those macros on the backend for alert rules.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
