---
title: "Honeycomb alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alert rules using Honeycomb queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Honeycomb alerting

The Honeycomb data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), so you can create alert rules from any Honeycomb query type. The data source uses the standard Grafana Alerting interface with no additional configuration.

## Before you begin

- Ensure your Honeycomb data source is [configured](/docs/plugins/grafana-honeycomb-datasource/latest/configure/) and working.
- Confirm you have permissions to create alert rules in Grafana.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Grafana evaluates an alert condition against a single number, so an alert query must return numeric time series data. For Honeycomb, this means:

- Set **Returned data** to **series (default)** so the query returns a `time` field and one numeric value field for each calculation. The aggregated **result** shape has no timestamp and can’t be evaluated over time.
- Use a numeric **Visualization** such as `COUNT`, `AVG`, `SUM`, `MAX`, `P95`, or `COUNT_DATAPOINTS`.
- Reduce the series to a single value with a **Reduce** expression when the query returns multiple series, for example when you group by a column.

> Note
>
> Honeycomb queries use the alert rule’s evaluation time range automatically. In a Raw query, don’t set `start_time`, `end_time`, or `time_range`, so the alert evaluation window controls the data range.

## Create an alert rule

To create an alert rule using Honeycomb data:

1. Go to **Alerts &amp; IRM** &gt; **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for the alert rule.
4. In the **Define query and alert condition** section:

   - Select your Honeycomb data source.
   - Build a query with **Returned data** set to **series (default)**.
   - Toggle **Advanced options** on so **Reduce** and **Threshold** expressions are visible.
   - Add a **Reduce** expression to convert the series to a single value.
   - Add a **Threshold** expression to define the alert condition.
5. In **Set folder and labels**, select or create a folder and optionally add labels.
6. Configure **Set evaluation behavior**:

   - Select or create an evaluation group.
   - Set the evaluation interval and the pending period.
7. Add annotations to provide context for notifications.
8. Click **Save rule**.

For detailed instructions, refer to [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Error rate threshold

Alert when the number of error events exceeds a threshold.

1. Create a new alert rule and select your Honeycomb data source.
2. Build the query with the **Metrics** query type:

   - Set **Returned data** to **series (default)**.
   - Set **Visualization** to `COUNT`.
   - Add a **Where** filter of `error = true`.
3. Toggle **Advanced options** on, then add expressions:

   - **Reduce**: Last value.
   - **Threshold**: Is above `100`.
4. Set the evaluation interval to `1m`.
5. Save the rule.

The equivalent Raw query is:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [{ "op": "COUNT" }],
  "filters": [
    { "column": "error", "op": "=", "value": true }
  ]
}
```

## Example: Latency regression

Alert when the 95th percentile of request duration exceeds a threshold.

1. Create a new alert rule and select your Honeycomb data source.
2. Build the query with the **Metrics** query type:

   - Set **Returned data** to **series (default)**.
   - Set **Visualization** to `P95` on the `duration_ms` column.
3. Toggle **Advanced options** on, then add expressions:

   - **Reduce**: Mean.
   - **Threshold**: Is above `500`.
4. Set the evaluation interval to `1m`.
5. Save the rule.

The equivalent Raw query is:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [
    { "op": "P95", "column": "duration_ms" }
  ]
}
```

## Example: Per-service error rate

Alert on errors for each service by grouping the query and reducing each series.

1. Create a new alert rule and select your Honeycomb data source.
2. Build the query with the **Metrics** query type:

   - Set **Returned data** to **series (default)**.
   - Set **Visualization** to `COUNT`.
   - Add a **Where** filter of `error = true`.
   - Add a **Group by** of `service.name`.
3. Toggle **Advanced options** on, then add expressions:

   - **Reduce**: Last value. Grafana evaluates the threshold for each series, so a single rule can alert on any service that breaches it.
   - **Threshold**: Is above `50`.
4. Set the evaluation interval to `1m`.
5. Save the rule.

The equivalent Raw query is:

JSON [Copy code to clipboard] Copy

```json
{
  "calculations": [{ "op": "COUNT" }],
  "filters": [
    { "column": "error", "op": "=", "value": true }
  ],
  "breakdowns": ["service.name"]
}
```

## Best practices

Follow these recommendations to create reliable Honeycomb alerts.

### Test queries in Explore first

Before you create an alert, confirm the query returns the expected series.

1. Go to **Explore**.
2. Select your Honeycomb data source.
3. Run the query with **Returned data** set to **series (default)**.
4. Confirm the result includes a `time` field and a numeric value field in the expected range.

### Reduce multiple series

When a query groups by a column, it returns one series per group. Use the **Reduce** expression to convert each series to a single value:

- **Last**: Use the most recent value.
- **Mean**: Average across the evaluation window.
- **Max** or **Min**: Use the highest or lowest value.

### Account for the data retention window

The data source limits how far back it queries with the **Time Window (days)** setting. Keep alert evaluation windows within the configured retention limit so evaluations don’t return clipped data. Refer to [Configure the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings).

### Handle no data conditions

Configure what happens when a query returns no data:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an action such as **No Data**, **Alerting**, **OK**, or **Keep Last State**.

## Troubleshooting

If your alerts don’t work as expected:

- **No data returned:** Verify the query runs in Explore and returns data for the evaluation time range. Confirm **Returned data** is set to **series (default)**.
- **Alert never fires:** Confirm the **Reduce** expression matches your data shape and that the **Threshold** direction and value are correct.
- **Clipped data:** Check that the evaluation window is within the **Time Window (days)** retention limit.

For more troubleshooting, refer to [Troubleshoot Honeycomb data source issues](/docs/plugins/grafana-honeycomb-datasource/latest/troubleshooting/).

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Configure Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
