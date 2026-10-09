---
title: "IBM Db2 annotations | Grafana Enterprise Plugins documentation"
description: "Use IBM Db2 queries to add annotations to your Grafana dashboards"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 annotations

Annotations mark points in time on your dashboard panels with events or notes. The IBM Db2 data source uses the built-in Grafana SQL annotation support, so you can populate annotations from any query that runs against your IBM Db2 database.

## Before you begin

Before you create annotations, ensure you have:

- [Configured the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/)
- A table or view that contains event data with a timestamp column

## Create an annotation query

To create an annotation query:

1. Open your dashboard, click **Edit**, then click **Options** (gear icon).
2. Click **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Enter a name for the annotation query.
5. Click **Open query editor**, then select your IBM Db2 data source.
6. Enter a SQL query that returns the required columns.
7. Click **Apply** to save the annotation query.

## Annotation query requirements

Grafana maps the result set to annotations by column name. Alias your columns to these names so Grafana can map them correctly:

Expand table

| Column    | Required | Description                                                                                                                |
|-----------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `time`    | Yes      | Start time of the annotation. Must be a `TIMESTAMP` value.                                                                 |
| `timeend` | No       | End time of the annotation. Include it to create a region annotation that spans a time range. Must be a `TIMESTAMP` value. |
| `text`    | No       | Text to display in the annotation.                                                                                         |
| `tags`    | No       | Comma-separated tags for filtering.                                                                                        |

Order the results by the `time` column so annotations render in chronological order.

> Note
>
> The `time` and `timeend` columns must be `TIMESTAMP` values. If your column is a `DATE`, the plugin converts it to a `TIMESTAMP` automatically. If it’s a `TIME`, cast it to a `TIMESTAMP` in the query. The IBM Db2 data source doesn’t support SQL macros such as `$__timeFilter`, so filter with standard Db2 SQL or [template variables](/docs/plugins/grafana-ibmdb2-datasource/latest/template-variables/).

## Examples

The following examples use placeholder table names. Replace them with your own schema.

### Point-in-time annotation

Mark each event with a single timestamp, a description, and tags:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  event_description AS text,
  event_category AS tags
FROM events
ORDER BY event_time
```

### Region annotation

Include a `timeend` column to highlight a time range, such as a deployment or maintenance window:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  start_time AS time,
  end_time AS timeend,
  deployment_name AS text,
  'deployment' AS tags
FROM deployments
ORDER BY start_time
```

### Filter annotations with a template variable

Use a [template variable](/docs/plugins/grafana-ibmdb2-datasource/latest/template-variables/) to show only the events you care about:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  event_description AS text,
  event_category AS tags
FROM events
WHERE event_category = '$category'
ORDER BY event_time
```

## Related resources

- [IBM Db2 query editor](/docs/plugins/grafana-ibmdb2-datasource/latest/query-editor/)
- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
