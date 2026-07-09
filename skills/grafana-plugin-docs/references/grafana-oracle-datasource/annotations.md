---
title: "Oracle annotations | Grafana Enterprise Plugins documentation"
description: "Add Oracle data source annotations to Grafana dashboards to mark events on graphs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle annotations

Annotations allow you to mark points on a graph with events from your Oracle database. Use annotations to overlay deployment times, incidents, or other significant events on your time-series visualizations.

For general information on Grafana annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/).
- Verify your Oracle user has `SELECT` permissions on the tables containing event data.

## Create an annotation query

To add Oracle annotations to a dashboard:

1. Open your dashboard and click the gear icon to access **Dashboard settings**.
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Select the Oracle data source.
5. Write a SQL query that returns the required columns.
6. Click **Save dashboard**.

## Required columns

Your annotation query must return columns with specific names that Grafana recognizes. Use the `AS` keyword to alias your columns appropriately.

Expand table

| Column name | Type                     | Required | Description                                                                          |
|-------------|--------------------------|----------|--------------------------------------------------------------------------------------|
| `time`      | `datetime` or Unix epoch | Yes      | The timestamp for the annotation.                                                    |
| `timeEnd`   | `datetime` or Unix epoch | No       | End time for region annotations (creates a shaded range instead of a vertical line). |
| `text`      | `varchar`                | Yes      | The annotation text displayed on hover.                                              |
| `tags`      | `varchar`                | No       | Comma-separated tags for filtering annotations.                                      |

## Example queries

### Event markers from an audit table

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  event_description AS text,
  event_type AS tags
FROM audit_events
WHERE $__timeFilter(event_time)
ORDER BY event_time
```

### Deployment annotations

SQL [Copy code to clipboard] Copy

```sql
SELECT
  deploy_time AS time,
  'Deployed ' || version || ' to ' || environment AS text,
  'deployment,' || environment AS tags
FROM deployments
WHERE $__timeFilter(deploy_time)
ORDER BY deploy_time
```

### Threshold crossing events

SQL [Copy code to clipboard] Copy

```sql
SELECT
  check_time AS time,
  metric_name || ' exceeded threshold: ' || TO_CHAR(metric_value) AS text,
  'threshold,' || metric_name AS tags
FROM threshold_violations
WHERE $__timeFilter(check_time)
ORDER BY check_time
```

### Region annotations (start and end time)

Use `timeEnd` to create shaded regions that span a time range, such as maintenance windows or incidents:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  start_time AS time,
  end_time AS timeEnd,
  'Maintenance: ' || description AS text,
  'maintenance,' || system_name AS tags
FROM maintenance_windows
WHERE $__timeFilter(start_time)
ORDER BY start_time
```

## Use macros in annotations

You can use the same macros available in the query editor within annotation queries. The `$__timeFilter` macro is particularly important to scope annotations to the dashboard time range:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  message AS text,
  category AS tags
FROM system_events
WHERE $__timeFilter(event_time)
  AND severity = 'CRITICAL'
ORDER BY event_time
```

Template variables are also supported in annotation queries, allowing you to filter annotations dynamically:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  message AS text,
  category AS tags
FROM system_events
WHERE $__timeFilter(event_time)
  AND hostname = '$hostname'
ORDER BY event_time
```

## Next steps

- [Oracle query editor](/docs/plugins/grafana-oracle-datasource/latest/query-editor/) for the full macro reference.
- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for more annotation options.
