---
title: "SAP HANA alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using SAP HANA data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alerting

The SAP HANA data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on SAP HANA data. You can monitor your database metrics and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your SAP HANA data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

SAP HANA queries work well with Grafana Alerting when they return time-series data that can be evaluated against thresholds.

Expand table

| Query type           | Use case                               | Notes                                                                        |
|----------------------|----------------------------------------|------------------------------------------------------------------------------|
| Time series          | Threshold-based alerts on numeric data | Best suited for alerting; returns time-series data that Grafana can evaluate |
| Table with timestamp | Alert on aggregated values             | Convert to time series using the SAP HANA `TO_TIMESTAMP()` function          |

> Note
>
> Alert queries must return numeric data that Grafana can evaluate against a threshold. Queries that return only text or non-numeric data cannot be used directly for alerting.

## Create an alert rule

To create an alert rule using SAP HANA data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your SAP HANA data source.
   - Configure your query (for example, a time series query for temperature readings).
   - Add a **Reduce** expression if your query returns multiple series.
   - Add a **Threshold** expression to define the alert condition.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Temperature threshold alert

This example creates an alert that fires when temperature exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT ts AS time, temperature AS value
   FROM weather
   WHERE $__timeFilter(ts)
   ORDER BY ts ASC
   ```
3. Add expressions:

   - **Reduce:** Last value (to get the most recent data point)
   - **Threshold:** Is above 30
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

## Alert on non-timeseries data

If you need to set up alerts on data that doesn’t have a natural time column, use SAP HANA’s `TO_TIMESTAMP()` function with Grafana’s `${__to:date}` variable to convert your query into a single-point time series.

### Query format

SQL [Copy code to clipboard] Copy

```sql
SELECT TO_TIMESTAMP('${__to:date}'), <METRIC> FROM <TABLE> WHERE <YOUR CONDITIONS>
```

### Example: User count alert

In this example, a table has fields `username`, `age`, `city`, and `role`, but no time field. You want to receive an alert when the number of users with the `dev` role is less than 3.

SQL [Copy code to clipboard] Copy

```sql
SELECT TO_TIMESTAMP('${__to:date}'), count(*) as "count" FROM (
   SELECT 'John' AS "username", 32 AS "age", 'Chennai' as "city", 'dev' as "role" FROM dummy
   UNION ALL SELECT 'Jacob' AS "username", 32 AS "age", 'London' as "city", 'accountant' as "role" FROM dummy
   UNION ALL SELECT 'Ali' AS "username", 42 AS "age", 'Delhi' as "city", 'admin' as "role" FROM dummy
   UNION ALL SELECT 'Raja' AS "username", 12 AS "age", 'New York' as "city", 'ceo' as "role" FROM dummy
   UNION ALL SELECT 'Sara' AS "username", 35 AS "age", 'Cape Town' as "city", 'dev' as "role" FROM dummy
   UNION ALL SELECT 'Ricky' AS "username", 25 AS "age", 'London' as "city", 'accountant' as "role" FROM dummy
   UNION ALL SELECT 'Angelina' AS "username", 31 AS "age", 'London' as "city", 'cxo' as "role" FROM dummy
) WHERE "role" = 'dev'
```

Configure the alert threshold to fire when the count is below 3.

## Best practices

Follow these recommendations to create reliable and efficient alerts with SAP HANA data.

### Use appropriate query intervals

- Set the alert evaluation interval to be greater than or equal to the minimum data resolution from SAP HANA.
- Avoid very short intervals (less than 1 minute) as they may cause evaluation timeouts or excessive database load.

### Reduce multiple series

When your SAP HANA query returns multiple time series (for example, temperature per sensor), use the **Reduce** expression to aggregate them:

- **Last:** Use the most recent value
- **Mean:** Average across all series
- **Max/Min:** Use the highest or lowest value
- **Sum:** Total across all series

### Handle no data conditions

Configure what happens when no data is returned:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an appropriate action:

   - **No Data:** Keep the alert in its current state
   - **Alerting:** Treat no data as an alert condition
   - **OK:** Treat no data as a healthy state

### Test your queries first

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your SAP HANA data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

## Troubleshooting

For common alerting issues with the SAP HANA data source, refer to [Query errors](/docs/plugins/grafana-saphana-datasource/latest/troubleshooting/#query-errors) in the troubleshooting guide.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
