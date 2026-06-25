---
title: "Sumo Logic alerting | Grafana Enterprise Plugins documentation"
description: "Set up Grafana alerting with the Sumo Logic data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sumo Logic alerting

Grafana alerting lets you define rules that continuously evaluate your Sumo Logic data and send notifications when conditions are met. For example, you can create a rule that fires when CPU usage exceeds a threshold or when error rates spike beyond normal levels. The Sumo Logic data source supports alerting through its backend query implementation, which allows Grafana to evaluate queries server-side on a schedule.

For general information about Grafana alerting, refer to [Alerting](/docs/grafana/latest/alerting/).

## Before you begin

- [Configure the Sumo Logic data source](/docs/plugins/grafana-sumologic-datasource/latest/configure/).
- Familiarize yourself with [Grafana alert rules](/docs/grafana/latest/alerting/alerting-rules/).
- Ensure you have configured at least one [contact point](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) for notifications.

## Supported query types

Alert rules require queries that return numeric data so Grafana can evaluate them against threshold conditions.

- **Metrics queries:** Fully supported. Metrics queries return numeric time-series data.
- **Aggregated logs queries:** Supported. Logs queries that use aggregation operators (such as `count`, `sum`, or `avg`) return numeric results that can be evaluated by alert rules.
- **Raw logs queries:** Not supported. Non-aggregated log searches return log messages rather than numeric data, which Grafana can’t evaluate as alert conditions.

## Create an alert rule

To create an alert rule using the Sumo Logic data source:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for the alert rule.
4. Select the Sumo Logic data source.
5. Write a query that returns numeric data. Use either a metrics query or an aggregated logs query.
6. Configure the alert condition by selecting a reducer (for example, **Last**) and setting a threshold.
7. Set the evaluation interval and pending period.
8. Configure notification policies and contact points as needed.
9. Click **Save rule**.

For more details on configuring alert rules, refer to [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Alert rule query examples

The following examples show queries suitable for alert rules.

### Metrics query examples

Alert when average CPU idle time drops below a threshold:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | avg by host
```

Monitor memory usage across hosts:

SQL [Copy code to clipboard] Copy

```sql
metric=mem_used_percent | max by host
```

Track the rate of HTTP errors:

SQL [Copy code to clipboard] Copy

```sql
metric=http_errors | rate increasing | sum
```

Monitor disk usage:

SQL [Copy code to clipboard] Copy

```sql
metric=disk_used_percent mount_point=/ | max by host
```

Detect network latency spikes:

SQL [Copy code to clipboard] Copy

```sql
metric=http_response_time | avg by service | where _value > 500
```

### Aggregated logs query examples

Alert when error count exceeds a threshold:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app "ERROR" | count
```

Monitor failed login attempts:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=auth action=login status=failure | count by _sourceHost
```

Track 5xx HTTP response rates:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/web status_code >= 500 | count
```

Alert on high average response times from parsed log fields:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/api | parse "duration=*ms" as duration | avg(duration)
```

Monitor queue depth from application logs:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/worker | parse "queue_size=*" as queue_size | max(queue_size) by queue_name
```

Detect unusual volumes of specific log patterns:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app "OutOfMemoryError" | count by _sourceHost
```
