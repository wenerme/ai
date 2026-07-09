---
title: "Oracle alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana Alerting with Oracle data source queries."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle alerting

The Oracle data source supports Grafana Alerting. You can create alert rules that evaluate SQL queries on a schedule and trigger notifications when conditions are met.

For general information on Grafana Alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/).
- Verify your Oracle user has `SELECT` permissions on the tables used in alert queries.
- Ensure the **Dataproxy Timeout** setting is high enough for your alert queries to complete within the evaluation interval.

## Create an alert rule

To create an alert rule using an Oracle query:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Select the Oracle data source.
4. Write a SQL query that returns time-series data with a numeric value column.
5. Configure the alert condition (for example, when the value exceeds a threshold).
6. Set the evaluation interval and pending period.
7. Configure notification channels.
8. Click **Save rule**.

## Supported alert query patterns

Alert queries must return time-series format data. The following patterns work with Grafana Alerting.

### Threshold alert

Monitor a single numeric metric and alert when it crosses a threshold:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(sample_time, '1m') AS time,
  AVG(cpu_percent) as value
FROM system_metrics
WHERE $__timeFilter(sample_time)
GROUP BY $__timeGroup(sample_time, '1m')
ORDER BY time
```

### Multi-series alert

Use the `metric` column to evaluate multiple series independently:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(sample_time, '5m') AS time,
  hostname as metric,
  MAX(disk_usage_percent) as value
FROM disk_metrics
WHERE $__timeFilter(sample_time)
GROUP BY $__timeGroup(sample_time, '5m'), hostname
ORDER BY time
```

### No-data detection

Alert when expected data stops arriving by using a count query with a zero fill:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroup(event_time, '5m', 0) AS time,
  COUNT(*) as value
FROM heartbeat_events
WHERE $__timeFilter(event_time)
GROUP BY $__timeGroup(event_time, '5m', 0)
ORDER BY time
```

### Timezone-aware alert

Use `$__timeGroupTZ` and `$__timeFilterTZ` when your Oracle server stores timestamps in a non-UTC timezone:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  $__timeGroupTZ(event_time, '5m') AS time,
  AVG(response_time_ms) as value
FROM api_metrics
WHERE $__timeFilterTZ(event_time)
GROUP BY $__timeGroupTZ(event_time, '5m')
ORDER BY time
```

## How alert evaluation works

Grafana evaluates alert queries on the server side, not in the browser. The Grafana server connects directly to Oracle using the configured credentials and runs the query on the evaluation schedule you define. This means:

- The Oracle user credentials must be valid and accessible from the Grafana server at all times.
- Network connectivity between the Grafana server and Oracle must be reliable.
- Query performance matters, slow queries can cause missed evaluation cycles.

## Limitations

- **Grafana Cloud:** TNSNames and Kerberos authentication are not supported. Use TCP connection with basic authentication and [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) for private databases.
- **Query timeout:** Alert evaluations must complete within the configured **Dataproxy Timeout** (default 120 seconds). If alert queries are timing out, increase this value in the data source configuration.
- **Table format:** Alert rules require time-series format queries. Table format queries don’t work with alert conditions.
- **Row limit:** The **Row Limit** setting (default 1,000,000) applies to alert queries. Ensure your alert queries return fewer rows than the configured limit.

## Troubleshoot alert evaluation

If alert rules aren’t evaluating as expected:

1. **No data:** Verify the query returns data for the evaluation time range. Test the query in Explore with the same time range.
2. **Timeout errors:** Increase the **Dataproxy Timeout** setting or optimize the query to execute faster.
3. **Permission errors:** Confirm the Oracle user has `SELECT` permissions on all tables referenced in the alert query.
4. **Format errors:** Ensure the query uses time-series format with a valid `time` column and numeric value column.

For additional troubleshooting, refer to [Troubleshoot Oracle data source issues](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/).
