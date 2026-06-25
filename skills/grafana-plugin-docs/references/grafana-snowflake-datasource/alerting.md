---
title: "Snowflake alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using Snowflake data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alerting

The Snowflake data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on Snowflake data. You can monitor your data warehouse and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your Snowflake data source is [configured](/docs/plugins/grafana-snowflake-datasource/latest/configure/) and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert queries must return numeric data that Grafana can evaluate against a threshold. Ensure your SQL query:

- Returns at least one numeric column for the alert condition
- Includes a time column if you want time-series evaluation
- Returns data within the evaluation time range

> Note
>
> Queries that return only text or non-numeric data cannot be used directly for alerting.

## Create an alert rule

To create an alert rule using Snowflake data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your Snowflake data source.
   - Write a SQL query that returns numeric data.
   - Add a **Reduce** expression if your query returns multiple series.
   - Add a **Threshold** expression to define the alert condition.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Warehouse credit usage alert

This example creates an alert that fires when warehouse credit usage exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     end_time AS time,
     credits_used
   FROM snowflake.account_usage.warehouse_metering_history
   WHERE warehouse_name = 'COMPUTE_WH'
     AND $__timeFilter(end_time)
   ORDER BY end_time
   ```
3. Add expressions:

   - **Reduce**: Last value (to get the most recent data point)
   - **Threshold**: Is above 10 (or your desired credit limit)
4. Set evaluation to run every 5 minutes with a 10-minute pending period.
5. Save the rule.

## Example: Query performance alert

This example alerts when queries take longer than expected:

1. Create a new alert rule.
2. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     end_time AS time,
     AVG(total_elapsed_time) / 1000 AS avg_query_time_seconds
   FROM snowflake.account_usage.query_history
   WHERE $__timeFilter(end_time)
     AND execution_status = 'SUCCESS'
   GROUP BY end_time
   ORDER BY end_time
   ```
3. Add expressions:

   - **Reduce**: Mean (average across all data points)
   - **Threshold**: Is above 30 (seconds)
4. Set evaluation to run every 5 minutes.
5. Save the rule.

## Example: Data freshness alert

This example alerts when data hasn’t been updated within the expected timeframe:

1. Create a new alert rule.
2. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     CURRENT_TIMESTAMP() AS time,
     DATEDIFF('minute', MAX(updated_at), CURRENT_TIMESTAMP()) AS minutes_since_update
   FROM your_database.your_schema.your_table
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 60 (minutes)
4. Set evaluation to run every 10 minutes.
5. Save the rule.

## Example: Failed query count alert

This example alerts when the number of failed queries exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT
     DATE_TRUNC('hour', end_time) AS time,
     COUNT(*) AS failed_query_count
   FROM snowflake.account_usage.query_history
   WHERE $__timeFilter(end_time)
     AND execution_status = 'FAIL'
   GROUP BY DATE_TRUNC('hour', end_time)
   ORDER BY time
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 5
4. Set evaluation to run every 15 minutes.
5. Save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with Snowflake data.

### Use appropriate query intervals

- Set the alert evaluation interval based on how frequently your data updates.
- For queries against `account_usage` views, note that data may have a latency of up to 45 minutes.
- Avoid very short intervals (less than 1 minute) as they may cause evaluation timeouts.

### Reduce multiple series

When your Snowflake query returns multiple time series (for example, metrics per warehouse), use the **Reduce** expression to aggregate them:

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
2. Select your Snowflake data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

### Consider query costs

Alerting queries run at regular intervals. To minimize Snowflake compute costs:

- Use efficient queries that leverage clustering and partitioning.
- Consider using smaller warehouses for alerting queries.
- Use aggregate functions to reduce data scanned.
- Take advantage of Snowflake’s result caching where possible.

## Troubleshooting

If your alerts are not working as expected:

- **No data returned**: Verify the query runs successfully in Explore and returns data for the evaluation time range.
- **Query timeout**: Increase the query timeout in data source settings or optimize your query.
- **Unexpected values**: Check that your query returns the correct data type (numeric for thresholds).

For additional troubleshooting, refer to [Troubleshooting](/docs/plugins/grafana-snowflake-datasource/latest/troubleshooting/).

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
