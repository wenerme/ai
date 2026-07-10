---
title: "Amazon Redshift alerting | Grafana Plugins documentation"
description: "Create Grafana alert rules using the Amazon Redshift data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Redshift alerting

You can use the Amazon Redshift data source to create Grafana alert rules that evaluate SQL queries and trigger notifications when conditions are met. This lets you monitor your Redshift data for anomalies, thresholds, or specific conditions without manually watching dashboards.

For general information about Grafana alerting, refer to [Grafana alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the Amazon Redshift data source](/docs/plugins/grafana-redshift-datasource/latest/configure/).
- Verify that your IAM identity has the required permissions for async query execution, including `redshift-data:ListStatements` and `redshift-data:CancelStatement`.
- Familiarize yourself with [Grafana alert rules](/docs/grafana/latest/alerting/alerting-rules/).

## Create an alert rule

To create an alert rule using a Redshift query:

1. Click **Alerting** in the left-side menu.
2. Click **Alert rules**.
3. Click **New alert rule**.
4. Enter a name for the alert rule.
5. Select the Amazon Redshift data source.
6. Write an SQL query that returns numeric data.
7. Define the alert condition using expressions (for example, reduce the query result to a single value and set a threshold).
8. Configure labels, notifications, and other alert settings.
9. Click **Save rule and exit**.

## Alert query requirements

Alert queries must meet the following requirements:

- The query must return at least one numeric column. Grafana evaluates numeric values against the alert condition.
- Use the `$__timeFilter` macro to restrict results to the evaluation time window.
- Keep queries efficient. Alert rules are evaluated at regular intervals, and slow queries can delay alert evaluation.
- Do not use template variables in alert queries. Grafana alerting does not support template variable interpolation. Use hard-coded values instead.

### Example alert query

The following query returns the average query duration over the evaluation period:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  avg(elapsed) / 1000000 AS avg_duration_seconds
FROM
  stl_query
WHERE
  $__timeFilter(starttime)
```

You can apply a threshold condition (for example, alert when `avg_duration_seconds` exceeds 30) using the expression builder in the alert rule editor.

### Example alert with groups

To receive separate alerts per category, include a grouping column:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(starttime, '5m'),
  avg(elapsed) / 1000000 AS avg_duration_seconds,
  query_group
FROM
  stl_query
WHERE
  $__timeFilter(starttime)
GROUP BY
  1, query_group
ORDER BY
  1 ASC
```

### Example alert on application data

To alert when the number of failed transactions exceeds a threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  count(*) AS failed_transactions
FROM
  public.transactions
WHERE
  $__timeFilter(created_at) AND status = 'failed'
```

Set a threshold condition to fire when `failed_transactions` exceeds your acceptable limit.

## Considerations

Keep the following in mind when using Redshift queries in alert rules:

- **Async execution:** Redshift queries run asynchronously through the Data API. This can add latency to alert evaluations compared to real-time data sources.
- **Query caching:** If you have [async query caching](/docs/plugins/grafana-redshift-datasource/latest/#async-query-cache) enabled, cached results may be used during alert evaluation. Ensure your cache TTL is appropriate for your alerting requirements.
- **Cost:** Each alert evaluation runs a query against Redshift. Set evaluation intervals that balance responsiveness with query costs.
- **Permissions:** The IAM identity used by the data source must have permissions for all tables and schemas referenced in alert queries.
