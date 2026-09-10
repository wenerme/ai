---
title: "Amazon Aurora alerting | Grafana Enterprise Plugins documentation"
description: "Create Grafana alert rules using the Amazon Aurora data source, including query requirements, examples, and considerations."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Aurora alerting

You can use the Amazon Aurora data source to create Grafana alert rules that evaluate SQL queries and trigger notifications when conditions are met. This lets you monitor your Aurora data for anomalies, thresholds, or specific conditions without manually watching dashboards.

For general information about Grafana alerting, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/).
- Verify that your database user has read access to the tables referenced in alert queries.
- Familiarize yourself with [Grafana alert rules](/docs/grafana/latest/alerting/alerting-rules/).

## Create an alert rule

To create an alert rule using an Aurora query:

1. Click **Alerting** in the left-side menu. In Grafana Cloud, it’s under **Alerts &amp; IRM**.
2. Click **Alert rules**.
3. Click **New alert rule**.
4. Enter a name for the alert rule.
5. Select your Amazon Aurora data source.
6. Write an SQL query that returns numeric data.
7. Define the alert condition using expressions. For example, reduce the query result to a single value and set a threshold.
8. Configure labels, notifications, and other alert settings.
9. Click **Save rule and exit**.

## Alert query requirements

Alert queries must meet the following requirements:

- The query must return at least one numeric column. Grafana evaluates numeric values against the alert condition.
- Use the `$__timeFilter` macro to restrict results to the evaluation time window.
- Keep queries efficient. Alert rules evaluate at regular intervals, and slow queries can delay alert evaluation.
- Don’t use template variables in alert queries. Grafana Alerting doesn’t support template variable interpolation. Use hard-coded values instead.

### Example threshold alert

The following query returns the average temperature over the evaluation window:

SQL [Copy code to clipboard] Copy

```sql
select avg(temperature) as avg_temperature
from weather_readings
where $__timeFilter(recorded_at)
```

Apply a threshold condition in the expression builder, for example to fire when `avg_temperature` exceeds 35.

### Example alert per group

To receive a separate alert instance per category, include a grouping column and set **Format data frames as** to **Table**. Grafana treats string columns as labels, so each city becomes its own alert instance:

SQL [Copy code to clipboard] Copy

```sql
select city, avg(temperature) as avg_temperature
from weather_readings
where $__timeFilter(recorded_at)
group by city
```

### Example data freshness alert

To alert when a table stops receiving data, count recent rows and fire when the count drops to zero:

SQL [Copy code to clipboard] Copy

```sql
select count(*) as reading_count
from weather_readings
where $__timeFilter(recorded_at)
```

Set the condition to fire when `reading_count` is below 1.

## Considerations

Keep the following in mind when using Aurora queries in alert rules:

- **Database load:** Each alert evaluation runs a query directly against your cluster. Set evaluation intervals that balance responsiveness with database load, and consider pointing the data source at the [reader endpoint](/docs/plugins/grafana-aurora-datasource/latest/configure/#database-settings) so evaluations don’t affect your writer instance.
- **Authentication token refresh:** RDS authentication tokens expire after 15 minutes. When a token expires, the plugin generates a new one and retries the query once, which can occasionally add latency to an evaluation.
- **Permissions:** The database user configured in the data source must have read access to all tables and schemas referenced in alert queries.

## Next steps

- [Amazon Aurora query editor](/docs/plugins/grafana-aurora-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)
