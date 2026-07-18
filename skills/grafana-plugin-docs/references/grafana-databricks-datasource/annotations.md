---
title: "Databricks annotations | Grafana Enterprise Plugins documentation"
description: "This document describes Databricks annotations."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Databricks annotations

Annotations in Grafana allow you to overlay event data on your graphs, making it easier to correlate metrics with specific events like deployments, incidents, or data pipeline runs. For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

To create an annotation, your dashboard must already be saved. Annotations only work with the following supported visualization types: time series, state timeline, and candlestick.

## Annotation query columns

Grafana maps columns from your annotation query to annotation fields by column name. Alias your `SELECT` columns to these names:

Expand table

| Column    | Required | Description                                                                         |
|-----------|----------|-------------------------------------------------------------------------------------|
| `time`    | Yes      | The annotation timestamp, as a `timestamp` column or epoch milliseconds.            |
| `timeEnd` | No       | An end timestamp. Include it to create a region annotation that spans a time range. |
| `title`   | No       | A short title for the annotation.                                                   |
| `text`    | No       | The annotation body text shown in the tooltip.                                      |
| `tags`    | No       | A comma-separated list of tags you can use to filter annotations.                   |

A query must return at least a `time` and a `text` column.

**Examples:**

Show data quality issues detected in your pipelines:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  check_timestamp AS time,
  CONCAT('Data Quality Alert: ', table_name) AS title,
  CONCAT('Check: ', check_name, '\nExpected: ', expected_value,
    '\nActual: ', actual_value, '\nSeverity: ', severity) AS text,
  CONCAT('data-quality,', severity) AS tags
FROM monitoring.quality.check_results
WHERE check_timestamp >= $__from
  AND check_timestamp <= $__to
  AND status = 'FAILED'
ORDER BY check_timestamp
```

Track when Databricks jobs complete to correlate with performance metrics:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  end_time * 1000 AS time,
  job_name AS title,
  CONCAT('Job ID: ', job_id, '\nStatus: ', state, '\nDuration: ',
    ROUND((end_time - start_time) / 60, 2), ' minutes') AS text,
  CONCAT('job,', lower(state)) AS tags
FROM system.workflow.job_runs
WHERE end_time >= $__from / 1000
  AND end_time <= $__to / 1000
ORDER BY end_time
```

Track cluster lifecycle events to understand resource usage:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time * 1000 AS time,
  pipeline_name AS title,
  CONCAT('Error: ', error_message, '\nPipeline ID: ', pipeline_id) AS text,
  'failure,alert' AS tags
FROM system.pipeline.events
WHERE event_type = 'FAILED'
  AND event_time >= $__from / 1000
  AND event_time <= $__to / 1000
ORDER BY event_time
```

Show maintenance windows as time regions by adding a `timeEnd` column:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  start_time * 1000 AS time,
  end_time * 1000 AS timeEnd,
  CONCAT('Maintenance: ', component) AS title,
  description AS text,
  'maintenance' AS tags
FROM ops.maintenance_windows
WHERE start_time >= $__from / 1000
  AND start_time <= $__to / 1000
ORDER BY start_time
```

Because this query returns a `timeEnd` column, Grafana renders each row as a region annotation that spans from `time` to `timeEnd` instead of a single vertical line.

After you configure them, annotations appear as:

- Vertical lines on your time series/candlestick/state timeline panels.
- At the timestamp.
- With hover tooltips showing the title and detailed text.
- Filterable by the tags (like “data-quality” or severity level).
