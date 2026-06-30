---
title: "DynamoDB alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana Alerting with the DynamoDB data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB alerting

The DynamoDB data source supports Grafana Alerting, which lets you define alert rules that evaluate PartiQL queries and trigger notifications when conditions are met. For general information about Grafana Alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/).
- Understand [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert rules evaluate query results to determine whether a condition is met. DynamoDB alert queries have the following requirements:

- **Numeric results:** The query must return at least one numeric column for Grafana to evaluate against a threshold or condition.
- **Time-series format:** For time-based alert conditions, alias a datetime column `AS time` so the plugin formats the result as a time series.

You can combine multiple queries (A, B, C) with Reduce and Math expressions to build complex alert conditions. Refer to [Expression queries](/docs/grafana/latest/alerting/fundamentals/alert-rules/queries-conditions/) for details.

> Caution
>
> Alert queries run repeatedly on the configured evaluation interval. A `SELECT` without a partition key in the `WHERE` clause results in a full table scan on every evaluation, which can rapidly consume read capacity and cause throttling. Always include a partition key filter in alert queries.

> Note
>
> The DynamoDB data source doesn’t support time-range macros such as `$__timeFilter`. Alert queries must include explicit time filters or rely on DynamoDB’s data model to return only recent data. For details on timestamp formats and workarounds, refer to [Dynamic time filtering doesn’t work](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#dynamic-time-filtering-doesnt-work).

## Create an alert rule

To create an alert rule using the DynamoDB data source:

1. Navigate to **Alerting** &gt; **Alert rules** in the left-side menu.
2. Click **New alert rule**.
3. Select the **DynamoDB** data source.
4. Enter a PartiQL query that returns a numeric result.
5. Add a **Reduce** expression to aggregate the query result (for example, **Last** or **Mean**).
6. Add a **Threshold** expression to define the alert condition (for example, “is above 90”).
7. Set the evaluation interval and pending period.
8. Configure notification settings (contact points and notification policies).
9. Click **Save rule and exit**.

## Alert query examples

The following examples show PartiQL queries suitable for alert rules.

### Alert on error count

This query returns error counts over time for a specific application:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, errorCount
FROM "application-metrics"
WHERE appId = 'my-app' AND metricType = 'errors'
ORDER BY timestamp DESC
```

Configure a **Reduce** expression with **Last** to get the most recent value, then add a **Threshold** expression set to “is above 100”.

### Alert on response time

This query returns average response time, useful for detecting latency degradation:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, avg(responseTime) AS avg_response_time
FROM "api-metrics"
WHERE serviceId = 'checkout'
GROUP BY timestamp
ORDER BY timestamp
```

Configure a **Reduce** expression with **Mean**, then add a **Threshold** expression set to “is above 2000”.

### Alert on low inventory

This query checks for products with stock below a threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT productId, stockCount
FROM "inventory"
WHERE warehouseId = 'warehouse-1' AND stockCount < 10
```

Since this isn’t a time-series query, configure a **Reduce** expression with **Min** on the `stockCount` field, then add a **Threshold** expression set to “is below 5”.

### Alert using multiple queries

You can use multiple queries to compare values. For example, to alert when error rate exceeds a percentage of total requests:

**Query A** – error count:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, errorCount
FROM "application-metrics"
WHERE appId = 'my-app' AND metricType = 'errors'
ORDER BY timestamp DESC
```

**Query B** – total request count:

SQL [Copy code to clipboard] Copy

```sql
SELECT timestamp AS time, requestCount
FROM "application-metrics"
WHERE appId = 'my-app' AND metricType = 'requests'
ORDER BY timestamp DESC
```

Add **Reduce** expressions for each query using **Last**, then add a **Math** expression with the formula `$A / $B * 100` to calculate the error percentage. Add a **Threshold** expression set to “is above 5” to alert when errors exceed 5%.

## Next steps

- Refer to the full [Grafana Alerting documentation](/docs/grafana/latest/alerting/) for details on alert conditions, notification policies, and contact points.
- Learn how to write queries in the [DynamoDB query editor](/docs/plugins/grafana-dynamodb-datasource/latest/query-editor/).
- [Troubleshoot DynamoDB data source issues](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/) if alerts aren’t firing as expected.
