---
title: "AppDynamics alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using AppDynamics data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics alerting

The AppDynamics data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on AppDynamics metrics. You can monitor your application environment and receive notifications when specific conditions are met, such as when response times exceed a threshold, error rates spike, or calls per minute drop unexpectedly.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your AppDynamics data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

AppDynamics **Metrics** queries return numeric time-series data natively, so they work directly with Grafana alerting thresholds without requiring special aggregate functions.

**Analytics** (ADQL) queries can also be used for alerting, provided the query returns numeric results. For example, use `count(*)` or `avg(responseTime)` in your ADQL query.

To set up an alerting query:

1. Select a query type using the radio buttons (**Metrics** or **Analytics**).
2. Configure the query to return numeric data.
3. Add a **Reduce** expression to summarize the time series (for example, last value or mean).
4. Add a **Threshold** expression to define the alert condition.

> Note
>
> In the alerting context, the **Use dashboard’s time picker** toggle is hidden. The alert evaluation window is automatically used as the query time range.

## Create an alert rule

To create an alert rule using AppDynamics data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your AppDynamics data source.
   - Select **Metrics** or **Analytics** from the query type radio buttons.
   - For a Metrics query, select the **Application** and **Metric** path you want to monitor.
   - For an Analytics query, enter an ADQL query that returns numeric data.
   - Add a **Reduce** expression to summarize the time series (for example, last value or mean).
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

## Example: Analytics alert

This example uses an ADQL query to alert when the count of slow transactions exceeds a threshold:

1. Create a new alert rule.
2. Select **Analytics** from the query type radio buttons.
3. Enter the following ADQL query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT count(*) FROM transactions WHERE responseTime > 5000
   ```
4. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 50
5. Set evaluation to run every 5 minutes.
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

AppDynamics has API rate limits. Set alert evaluation intervals appropriately to avoid excessive API usage:

- Use longer intervals (5+ minutes) when possible for non-critical alerts.
- Avoid very short intervals (less than 1 minute) when monitoring many metrics.
- Enable query caching in Grafana (available in Grafana Enterprise and Grafana Cloud) to reduce API calls.

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

- **Alert not firing**: Ensure your query returns numeric data and the threshold expression is configured correctly.
- **Evaluation errors**: Check that your metric path is valid and the data source connection is working.
- **Timeouts**: Narrow the time range or select a metric with less data volume.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
