---
title: "Dynatrace alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using Dynatrace data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alerting

The Dynatrace data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on Dynatrace metrics, problems, and other data. You can monitor your Dynatrace environment and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your Dynatrace data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

The following Dynatrace query types work well with Grafana Alerting:

Expand table

| Query type | Use case                                       | Notes                                                                        |
|------------|------------------------------------------------|------------------------------------------------------------------------------|
| Metrics    | Threshold-based alerts on numeric data         | Best suited for alerting; returns time-series data that Grafana can evaluate |
| Problems   | Alert on problem counts or detect new problems | Use with count aggregations                                                  |
| SLO        | Alert when SLO error budgets are at risk       | Monitor service level objectives                                             |
| USQL       | Alert on user session metrics                  | Ensure query returns numeric data                                            |

> Note
>
> Alert queries must return numeric data that Grafana can evaluate against a threshold. Queries that return only text or non-numeric data cannot be used directly for alerting.

## Create an alert rule

To create an alert rule using Dynatrace data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your Dynatrace data source.
   - Configure your query (for example, a Metrics query for CPU usage).
   - Add a **Reduce** expression if your query returns multiple series.
   - Add a **Threshold** expression to define the alert condition.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: CPU usage alert

This example creates an alert that fires when CPU usage exceeds 80%:

1. Create a new alert rule.
2. Configure the query:

   - **Query type**: Metrics
   - **Metric**: `builtin:host.cpu.usage`
   - **Aggregation**: `avg`
3. Add expressions:

   - **Reduce**: Last value (to get the most recent data point)
   - **Threshold**: Is above 80
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

## Example: Problem count alert

This example alerts when new problems are detected:

1. Create a new alert rule.
2. Configure the query:

   - **Query type**: Problems or Problems V2
   - **Status**: OPEN
3. Add expressions:

   - **Reduce**: Count (to get the number of open problems)
   - **Threshold**: Is above 0
4. Set evaluation to run every 5 minutes.
5. Save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with Dynatrace data.

### Use appropriate query intervals

- Set the alert evaluation interval to be greater than or equal to the minimum data resolution from Dynatrace.
- Avoid very short intervals (less than 1 minute) as they may cause evaluation timeouts.

### Reduce multiple series

When your Dynatrace query returns multiple time series (for example, CPU usage per host), use the **Reduce** expression to aggregate them:

- **Last**: Use the most recent value
- **Mean**: Average across all series
- **Max/Min**: Use the highest or lowest value
- **Sum**: Total across all series

### Handle no data conditions

Configure what happens when no data is returned:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an appropriate action:

   - **No Data**: Keep the alert in its current state
   - **Alerting**: Treat no data as an alert condition
   - **OK**: Treat no data as a healthy state

### Test queries before alerting

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your Dynatrace data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

## Troubleshooting

For common alerting issues with the Dynatrace data source, refer to [Alerting issues](/docs/plugins/grafana-dynatrace-datasource/latest/troubleshoot/#alerting-issues) in the troubleshooting guide.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
