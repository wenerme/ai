---
title: "Amazon Timestream annotations | Grafana Plugins documentation"
description: "Use annotations with the Amazon Timestream data source to mark events on Grafana dashboard panels."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Timestream annotations

Annotations allow you to overlay event information on graphs, providing context for metric changes. The Amazon Timestream data source supports annotation queries that pull event data directly from your Timestream tables.

For general information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- [Configure the Amazon Timestream data source](/docs/plugins/grafana-timestream-datasource/latest/configure/).
- Verify that your Timestream table contains event data with a timestamp column.

## Create an annotation query

To add a Timestream annotation to a dashboard:

1. Click **Dashboard settings** (gear icon).
2. Click **Annotations**.
3. Click **Add annotation query**.
4. Select your Amazon Timestream data source.
5. Enter a SQL query that returns the required columns.
6. Click **Apply**.

## Required columns

Your annotation query must return at least a time column. Grafana automatically maps the following column names to annotation properties.

Expand table

| Column    | Required | Description                                                                                           |
|-----------|----------|-------------------------------------------------------------------------------------------------------|
| `time`    | Yes      | The timestamp for the annotation.                                                                     |
| `timeEnd` | No       | The end timestamp for range annotations. When present, the annotation spans from `time` to `timeEnd`. |
| `text`    | No       | The annotation body text displayed on hover.                                                          |
| `title`   | No       | A title for the annotation.                                                                           |
| `tags`    | No       | Comma-separated tags used to filter annotations.                                                      |

## Annotation query examples

The following examples demonstrate common annotation query patterns. Annotation queries support the same macros and template variables as regular queries.

### Mark point-in-time events

The following query retrieves deployment events and displays them as point annotations:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  time,
  measure_value::varchar AS text
FROM $__database.deployment_events
WHERE $__timeFilter
  AND measure_name = 'deployment'
ORDER BY time ASC
```

### Categorize annotations with tags

Add a `tags` column to categorize annotations and filter them in the dashboard:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  time,
  measure_value::varchar AS text,
  environment AS tags
FROM $__database.deployment_events
WHERE $__timeFilter
  AND measure_name = 'deployment'
ORDER BY time ASC
```

### Mark time ranges

Use `timeEnd` to create range annotations that highlight a span of time, such as a maintenance window:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  time,
  timeEnd,
  measure_value::varchar AS text
FROM $__database.maintenance_windows
WHERE $__timeFilter
  AND measure_name = 'maintenance'
ORDER BY time ASC
```
