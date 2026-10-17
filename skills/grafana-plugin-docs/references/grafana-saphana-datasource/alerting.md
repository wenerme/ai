---
title: "SAP HANA alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using SAP HANA data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SAP HANA alerting

The SAP HANA data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on SAP HANA data. You can monitor your database metrics and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your SAP HANA data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

SAP HANA queries work well with Grafana Alerting when they return numeric data that can be evaluated against a threshold.

Expand table

| Query type                 | Use case                                            | Notes                                                                                                                                                                                            |
|----------------------------|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Time series                | Threshold-based alerts on numeric metrics over time | Best suited for alerting. Return a time column and one or more numeric columns. Add a **Reduce** expression to collapse each series to a single value.                                           |
| Table                      | Alerts on the latest numeric value                  | When the query returns no time column, Grafana creates one alert instance per row and turns string columns into labels. Return a single numeric column so the threshold has a value to evaluate. |
| Data without a time column | Alerts on aggregates that have no timestamp         | Wrap the query with the `$__toTimeStamp()` macro to produce a single-point series. Refer to [Alert on non-time-series data](#alert-on-non-time-series-data).                                     |

> Note
>
> Alert queries must return numeric data that Grafana can evaluate against a threshold. Queries that return only text or non-numeric data cannot be used directly for alerting.

### How time macros behave in alert rules

When an alert rule runs, the query executes over the rule’s evaluation time window rather than a dashboard time range. Backend time macros such as `$__timeFilter`, `$__timeGroup`, `$__fromTimeStamp`, and `$__toTimeStamp` expand using that evaluation window, so you can reuse most of the macros you use in dashboard panels.

> Warning
>
> The `$__interval` macro and the Grafana global variables `${__from}` and `${__to}` are resolved by the browser when a dashboard panel renders, not during alert evaluation. In alert rules, `$__interval` defaults to `1s`, which expands to an invalid `SERIES_ROUND` interval, and the global variables aren’t expanded at all. Use a fixed interval such as `1m` in `$__timeGroup`, and use the `$__fromTimeStamp()` or `$__toTimeStamp()` macros instead of `${__from}` or `${__to}`.

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
   SELECT "ts" AS "time", "temperature" AS "value"
   FROM "weather"
   WHERE $__timeFilter(ts)
   ORDER BY "ts" ASC
   ```
3. Add expressions:

   - **Reduce:** Last value (to get the most recent data point)
   - **Threshold:** Is above 30
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

## Example: Aggregated metric alert

This example aggregates raw data into time buckets with `$__timeGroup` and alerts on the average value per interval. Use this pattern when your table stores many rows per evaluation window and you want to alert on an aggregate rather than individual rows. Use a fixed interval such as `1m` rather than `$__interval`, which isn’t resolved during alert evaluation.

1. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT $__timeGroup("timestamp", 1m) AS "time",
          AVG("response_time_ms") AS "avg_response_time"
   FROM "app_metrics"
   WHERE $__timeFilter("timestamp")
   GROUP BY $__timeGroup("timestamp", 1m)
   ORDER BY $__timeGroup("timestamp", 1m) ASC
   ```
2. Add expressions:

   - **Reduce:** Mean (to average across the evaluation window)
   - **Threshold:** Is above your target latency, for example 500
3. Save the rule.

## Example: Multi-series alert with reduce

This example returns one series per host by including a string column alongside the numeric value. Grafana evaluates the threshold against each series independently, so a single rule can alert on many hosts.

1. Configure the query:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT $__timeGroup("timestamp", 1m) AS "time",
          "host" AS "metric",
          MAX("cpu_percent") AS "cpu_percent"
   FROM "host_metrics"
   WHERE $__timeFilter("timestamp")
   GROUP BY $__timeGroup("timestamp", 1m), "host"
   ORDER BY $__timeGroup("timestamp", 1m) ASC
   ```
2. Add expressions:

   - **Reduce:** Last value (to get the most recent value for each host)
   - **Threshold:** Is above 90
3. Save the rule.

The alert produces a separate alert instance for each host that breaches the threshold.

## Alert on non-time-series data

If you need to set up alerts on data that doesn’t have a natural time column, use the `$__toTimeStamp()` macro to add a constant timestamp column and convert your query into a single-point time series. Unlike the Grafana `${__to:date}` variable, which is resolved only when a dashboard panel renders, `$__toTimeStamp()` is expanded by the backend during alert evaluation.

### Query format

SQL [Copy code to clipboard] Copy

```sql
SELECT $__toTimeStamp() AS "time", <METRIC> FROM <TABLE> WHERE <YOUR CONDITIONS>
```

### Example: User count alert

In this example, a table has fields `username`, `age`, `city`, and `role`, but no time field. You want to receive an alert when the number of users with the `dev` role is less than 3.

SQL [Copy code to clipboard] Copy

```sql
SELECT $__toTimeStamp() AS "time", count(*) as "count" FROM (
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

When your SAP HANA query returns multiple time series (for example, temperature per sensor), use the **Reduce** expression to aggregate them. For a complete query, refer to [Example: Multi-series alert with reduce](#example-multi-series-alert-with-reduce).

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
