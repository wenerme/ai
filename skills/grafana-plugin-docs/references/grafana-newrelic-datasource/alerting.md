---
title: "New Relic alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana Alerting with the New Relic data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# New Relic alerting

The New Relic data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on New Relic data. You can monitor your applications, infrastructure, and custom metrics and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your New Relic data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Supported query types for alerting

The following query types work with Grafana Alerting:

Expand table

| Query type        | Use case                                          | Notes                                                                        |
|-------------------|---------------------------------------------------|------------------------------------------------------------------------------|
| **Metrics**       | Threshold-based alerts on APM metric data         | Returns time-series data that Grafana can evaluate against thresholds.       |
| **Data Explorer** | Alerts on any NRQL-queryable data, built visually | Generates NRQL queries that return numeric time-series data.                 |
| **NRQL Editor**   | Alerts using custom NRQL queries                  | The most flexible option. Ensure the query returns numeric time-series data. |

> Note
>
> Alert queries must return numeric data that Grafana can evaluate against a threshold. The **Logs** and **Traces** query types aren’t suitable for threshold-based alerting because they return non-numeric data.

> Warning
>
> When using the **NRQL Editor** or **Data Explorer** for alerting, set the **Format** to `Table` and omit the `TIMESERIES` keyword from your query. The time-series format may produce frames that Grafana Alerting can’t evaluate, resulting in `input data must be a wide series` errors.

## Create an alert rule

To create an alert rule using New Relic data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your **New Relic** data source.
   - Configure your query (for example, a NRQL query for average response time).
   - Set the **alert condition**: the **When** input defines the reducer function, and the last input defines the threshold.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Alert examples

The following examples show common alert patterns using different query types.

### Error rate alert (NRQL Editor)

Alert when the application error rate exceeds 5%:

1. Create a new alert rule.
2. Select the **NRQL Editor** query type, set **Format** to `Table`, and enter:

   SQL [Copy code to clipboard] Copy

   ```sql
   SELECT percentage(count(*), WHERE error IS true) FROM Transaction WHERE appName = 'my-app' $__timeFilter
   ```
3. Set the **alert condition**: set **When** to `Last` and the threshold to **Is above 5**.
4. Set evaluation to run every 1 minute with a 5-minute pending period.
5. Save the rule.

### Response time alert (NRQL Editor)

Alert when average response time exceeds 2 seconds:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction WHERE appName = 'my-app' $__timeFilter
```

Set **Format** to `Table`. Set the alert condition threshold to **Is above 2**.

### Throughput drop alert (NRQL Editor)

Alert when request throughput drops below a minimum threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT rate(count(*), 1 minute) FROM Transaction WHERE appName = 'my-app' $__timeFilter
```

Set **Format** to `Table`. Set the alert condition threshold to **Is below 100**.

### Apdex score alert (NRQL Editor)

Alert when the Apdex score falls below an acceptable level:

SQL [Copy code to clipboard] Copy

```sql
SELECT apdex(duration, 0.5) FROM Transaction WHERE appName = 'my-app' $__timeFilter
```

Set **Format** to `Table`. Set the alert condition threshold to **Is below 0.85**.

## Best practices

Follow these recommendations to create reliable alerts with New Relic data.

### Include the time filter macro

Always include `$__timeFilter` in NRQL alert queries so the query evaluates data within the alert evaluation window:

SQL [Copy code to clipboard] Copy

```sql
SELECT average(duration) FROM Transaction WHERE appName = 'my-app' $__timeFilter
```

### Reduce multiple series

When your query returns multiple time series (for example, queries with `FACET`), configure the **When** reducer in the alert condition to aggregate them into a single value:

- **Last** — Use the most recent value.
- **Mean** — Average across all series.
- **Max/Min** — Use the highest or lowest value.
- **Sum** — Total across all series.

For complex multi-query setups, switch to **Advanced** mode and add separate Reduce and Threshold expressions.

### Test queries before creating alerts

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your New Relic data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

### Handle no data and error conditions

Configure what happens when no data is returned or when a query error occurs:

1. In the alert rule, find **Configure no data and error handling**.
2. For **Alert state if no data or all values are null**, choose an appropriate action:

   - **No Data** — Set the alert state to `No Data`.
   - **Alerting** — Treat no data as an active alert.
   - **OK** — Treat no data as a healthy state.

> Tip
>
> New Relic queries can return no data if the application has no recent traffic. Use the **OK** option for low-traffic applications to avoid false alerts.

## Troubleshoot alerting issues

For common alerting issues with the New Relic data source, refer to [Alerting issues](/docs/plugins/grafana-newrelic-datasource/latest/troubleshooting/#alerting-issues) in the troubleshooting guide.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
