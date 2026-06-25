---
title: "CockroachDB annotations | Grafana Enterprise Plugins documentation"
description: "Add CockroachDB annotation queries to Grafana dashboards"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CockroachDB annotations

Annotations let you overlay event data from CockroachDB on your Grafana dashboard panels. They appear as vertical lines or shaded regions on time series visualizations, giving you context about what happened at a specific point in time. Use annotations to correlate metrics with events like deployments, incidents, configuration changes, or schema migrations.

## Before you begin

- [Configure the CockroachDB data source](/docs/plugins/grafana-cockroachdb-datasource/latest/configure/).
- Familiarize yourself with [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Create an annotation query

To add a CockroachDB annotation query to a dashboard:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Give the annotation a descriptive name (for example, “Deployments” or “Incidents”).
4. Select the CockroachDB data source.
5. Enter a SQL query that returns the required columns (refer to [Annotation query format](#annotation-query-format)).
6. Optionally, set a color to distinguish this annotation from others.
7. Click **Apply**.

Annotations from the query appear on all time series panels in the dashboard. You can toggle them on and off using the annotation controls at the top of the dashboard.

## Annotation query format

Annotation queries must return specific columns for Grafana to render them correctly.

Expand table

| Column      | Required | Description                                                                                                    |
|-------------|----------|----------------------------------------------------------------------------------------------------------------|
| **time**    | Yes      | A timestamp that determines where the annotation appears on the time axis.                                     |
| **timeEnd** | No       | A second timestamp that creates a shaded region between `time` and `timeEnd`. Useful for events with duration. |
| **text**    | Yes      | The annotation text displayed when hovering over the annotation marker.                                        |
| **tags**    | No       | A comma-separated string of tags for filtering annotations in the dashboard.                                   |

> Note
>
> Always include `$__timeFilter` in your annotation query’s `WHERE` clause. Without it, the query returns all annotations regardless of the dashboard time range, which can slow down dashboard loading.

## Annotation query examples

The following examples show common annotation patterns for CockroachDB dashboards.

### Deployments

Mark application deployments on your dashboards:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  deployed_at AS time,
  CONCAT('Deployed ', version, ' to ', environment) AS text,
  environment AS tags
FROM deployments
WHERE $__timeFilter(deployed_at)
ORDER BY deployed_at ASC
```

### Incidents

Overlay incident windows as shaded regions showing start and end times:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  started_at AS time,
  resolved_at AS timeEnd,
  CONCAT(severity, ': ', description) AS text,
  severity AS tags
FROM incidents
WHERE $__timeFilter(started_at)
ORDER BY started_at ASC
```

### Schema migrations

Track database schema changes:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  completed_at AS time,
  CONCAT('Migration: ', description) AS text,
  'migration' AS tags
FROM schema_migrations
WHERE $__timeFilter(completed_at)
ORDER BY completed_at ASC
```

### Configuration changes

Annotate when application or cluster configuration was modified:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  changed_at AS time,
  CONCAT(setting_name, ' changed from ', old_value, ' to ', new_value) AS text,
  CONCAT(setting_name, ',', changed_by) AS tags
FROM config_audit_log
WHERE $__timeFilter(changed_at)
ORDER BY changed_at ASC
```

### CockroachDB cluster events

Use CockroachDB’s internal event log to annotate cluster-level events like node joins, restarts, and zone config changes:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  timestamp AS time,
  CONCAT(event_type, ': ', info) AS text,
  event_type AS tags
FROM system.eventlog
WHERE $__timeFilter(timestamp)
ORDER BY timestamp ASC
```

## Filter annotations by tag

If you have multiple annotation queries on a dashboard, use tags to control which annotations are visible.

1. In the annotation query, return a `tags` column with meaningful values (for example, `'production'`, `'staging'`).
2. At the top of the dashboard, use the annotation toggle to show or hide specific annotation sources.
3. In individual panels, you can filter annotations by tag under **Panel settings** &gt; **Annotations**.

This lets you keep a clean view while still having all event data available when you need it.
