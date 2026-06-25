---
title: "CockroachDB alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alerting with the CockroachDB data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CockroachDB alerting

The CockroachDB data source supports Grafana alerting, which lets you define alert rules that evaluate CockroachDB queries on a schedule and send notifications when conditions are met. Use alerting to monitor application performance, detect anomalies in your data, or track CockroachDB cluster health.

## Before you begin

- [Configure the CockroachDB data source](/docs/plugins/grafana-cockroachdb-datasource/latest/configure/).
- Familiarize yourself with [Grafana alerting](/docs/grafana/latest/alerting/).
- Set up at least one [contact point](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) to receive notifications.

## Create an alert rule

To create an alert rule using a CockroachDB query:

01. Navigate to **Alerting** &gt; **Alert rules**.
02. Click **New alert rule**.
03. Give the rule a descriptive name.
04. Select the CockroachDB data source.
05. Write a query that returns numeric data (refer to [Query requirements](#query-requirements)).
06. Add a **Reduce** expression to aggregate the query results (for example, **Last** or **Mean**).
07. Add a **Threshold** expression to define the alert condition (for example, “is above 500”).
08. Set the evaluation interval and pending period under **Set evaluation behavior**.
09. Configure labels, notification policies, and contact points.
10. Click **Save rule and exit**.

For detailed instructions, refer to [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Query requirements

Alert queries have specific requirements that differ from regular dashboard queries.

- **Return numeric data:** Alert conditions evaluate numeric values. Your query must return at least one numeric column.
- **Time series format:** Return a `time` column and one or more numeric value columns. Grafana uses the time column to align data with the evaluation window.
- **Use macros for time filtering:** Use `$__timeFilter` to scope your query to the alert evaluation window. Without this macro, your query might scan more data than necessary or return results outside the evaluation range.
- **Avoid `LIMIT`:** Alert queries should return all rows within the time range so the reduce expression can aggregate them correctly.

## Alert query examples

The following examples show common alert query patterns for CockroachDB.

### High response time

Alert when the average response time exceeds a threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  AVG(response_time_ms) AS avg_response_time
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time ASC
```

Use a **Reduce** expression set to **Last** and a **Threshold** expression set to “is above” your target latency (for example, 500ms).

### Error rate spike

Alert when the percentage of failed requests exceeds a threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  date_trunc('minute', created_at) AS time,
  (COUNT(*) FILTER (WHERE status_code >= 500)::float / COUNT(*)::float) * 100 AS error_rate
FROM requests
WHERE $__timeFilter(created_at)
GROUP BY time
ORDER BY time ASC
```

Use a **Threshold** expression set to “is above” your acceptable error rate (for example, 5%).

### Row count growth

Alert when a table’s row count exceeds a capacity threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  now() AS time,
  estimated_row_count AS row_count
FROM crdb_internal.table_row_statistics
WHERE name = 'events'
```

Use a **Threshold** expression set to “is above” your maximum row count.

### Slow queries

Alert when there are active queries running longer than a specified duration:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  now() AS time,
  COUNT(*) AS slow_query_count
FROM crdb_internal.cluster_queries
WHERE (now() - start) > interval '30 seconds'
AND application_name != 'cockroach'
```

Use a **Threshold** expression set to “is above 0” to alert whenever any slow query is detected.

### Connection pool saturation

Alert when the number of active connections approaches the configured maximum:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  now() AS time,
  active_count AS active_connections
FROM crdb_internal.node_sessions_summary
```

## Tips for CockroachDB alerts

- **Keep queries lightweight.** Alert queries run on a schedule (for example, every 60 seconds). Avoid expensive joins or full table scans that could impact cluster performance.
- **Use appropriate evaluation intervals.** Match the evaluation interval to your use case. Real-time alerting might use 30-second intervals, while capacity alerts can check every 5-10 minutes.
- **Set a pending period.** Use the **Pending period** setting to avoid false positives from brief spikes. For example, setting a 5-minute pending period means the condition must be true for 5 consecutive evaluations before the alert fires.
- **Test queries in Explore first.** Use [Explore](/docs/grafana/latest/explore/) to verify your query returns the expected format and values before creating an alert rule.
