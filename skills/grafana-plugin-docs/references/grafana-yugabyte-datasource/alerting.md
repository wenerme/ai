---
title: "Yugabyte alerting | Grafana Plugins documentation"
description: "Set up Grafana Alerting with the Yugabyte data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Yugabyte alerting

The Yugabyte data source supports Grafana Alerting, which lets you define alert rules that evaluate SQL queries against YugabyteDB and trigger notifications when conditions are met. For general information about Grafana Alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the Yugabyte data source](/docs/plugins/grafana-yugabyte-datasource/latest/configure/).
- Understand [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert rules evaluate query results to determine whether a condition is met. Yugabyte alert queries have the following requirements:

- **Numeric results:** The query must return at least one numeric column for Grafana to evaluate against a threshold or condition.
- **Reduce to a single value:** Add a **Reduce** expression to collapse a time series into a single number that the alert condition can evaluate.
- **Time filtering:** Use the `$__timeFilter(column)` macro so the query only evaluates data within the alert’s evaluation window.
- **One series per alert instance:** If the query returns multiple series, for example by adding a `GROUP BY service` column, Grafana creates a separate alert instance for each series. Return a single series unless you intend to alert on each series independently.

You can combine multiple queries (A, B, C) with Reduce and Math expressions to build complex alert conditions. Refer to [Queries and conditions](/docs/grafana/latest/alerting/fundamentals/alert-rules/queries-conditions/) for details.

## Create an alert rule

To create an alert rule using the Yugabyte data source:

1. Navigate to **Alerting** &gt; **Alert rules** in the left-side menu.
2. Click **New alert rule**.
3. Select the **Yugabyte** data source.
4. Enter a SQL query that returns a numeric result.
5. Add a **Reduce** expression to aggregate the query result, for example **Last** or **Mean**.
6. Add a **Threshold** expression to define the alert condition, for example “is above 90”.
7. Set the evaluation interval and pending period.
8. Configure notification settings, including contact points and notification policies.
9. Click **Save rule and exit**.

## Alert query examples

The following examples show SQL queries suitable for alert rules.

### Alert on error count

This query returns the number of errors over time for a specific service:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  count(*) AS errors
FROM logs
WHERE level = 'error' AND $__timeFilter(created_at)
GROUP BY time
ORDER BY time
```

Configure a **Reduce** expression with **Last** to get the most recent value, then add a **Threshold** expression set to “is above 100”.

### Alert on average response time

This query returns average response time, which is useful for detecting latency degradation:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  avg(response_time) AS avg_response_time
FROM requests
WHERE service = 'checkout' AND $__timeFilter(created_at)
GROUP BY time
ORDER BY time
```

Configure a **Reduce** expression with **Mean**, then add a **Threshold** expression set to “is above 2000”.

### Combine multiple queries

You can use multiple queries to compare values. For example, to alert when the error rate exceeds a percentage of total requests:

**Query A** – error count:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  count(*) AS errors
FROM logs
WHERE level = 'error' AND $__timeFilter(created_at)
GROUP BY time
ORDER BY time
```

**Query B** – total request count:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  count(*) AS requests
FROM logs
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time
```

Add **Reduce** expressions for each query using **Last**, then add a **Math** expression with the formula `$A / $B * 100` to calculate the error percentage. Add a **Threshold** expression set to “is above 5” to alert when errors exceed 5% of requests.

## Next steps

- Refer to the full [Grafana Alerting documentation](/docs/grafana/latest/alerting/) for details on alert conditions, notification policies, and contact points.
- Learn how to write queries in the [Yugabyte query editor](/docs/plugins/grafana-yugabyte-datasource/latest/query-editor/).
- [Troubleshoot Yugabyte data source issues](/docs/plugins/grafana-yugabyte-datasource/latest/troubleshooting/) if alerts aren’t firing as expected.
