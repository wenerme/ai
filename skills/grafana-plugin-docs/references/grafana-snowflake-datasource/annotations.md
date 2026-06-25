---
title: "Snowflake annotations | Grafana Enterprise Plugins documentation"
description: "Learn how to use annotations with the Snowflake data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Snowflake annotations

Annotations in Grafana allow you to overlay event data on your graphs, making it easier to correlate metrics with specific events like query failures, warehouse scaling, or data loading operations. For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- Ensure you have [configured the Snowflake data source](/docs/plugins/grafana-snowflake-datasource/latest/configure/).
- Your dashboard must already be saved before creating annotations.
- Annotations only work with the following visualization types: time series, state timeline, and candlestick.

## Annotation query format

Your annotation query must return at least a `time` column. Optional columns include:

Expand table

| Column    | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| `time`    | Required. The timestamp for the annotation.                              |
| `timeEnd` | Optional. End time for region annotations (creates a highlighted range). |
| `title`   | Optional. Short text displayed on the annotation marker.                 |
| `text`    | Optional. Detailed description shown in the tooltip.                     |
| `tags`    | Optional. Comma-separated tags for filtering annotations.                |

## Create an annotation

To create an annotation query:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Select your Snowflake data source.
5. Enter your SQL query.
6. Click **Save dashboard**.

## Annotation examples

The following examples show common annotation patterns for Snowflake.

### Track failed queries

Show when queries have failed to help correlate with performance issues:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  start_time AS time,
  CONCAT('Query Failed: ', query_type) AS title,
  CONCAT('Error: ', error_message, '\nWarehouse: ', warehouse_name,
    '\nUser: ', user_name) AS text,
  'query-failure,error' AS tags
FROM snowflake.account_usage.query_history
WHERE start_time >= $__from
  AND start_time <= $__to
  AND execution_status = 'FAIL'
ORDER BY start_time
```

### Track warehouse scaling events

Monitor when warehouses scale up or down:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  timestamp AS time,
  CONCAT('Warehouse: ', warehouse_name) AS title,
  CONCAT('Cluster count changed to ', cluster_number,
    '\nEvent type: ', event_name) AS text,
  CONCAT('warehouse,', warehouse_name) AS tags
FROM snowflake.account_usage.warehouse_events_history
WHERE timestamp >= $__from
  AND timestamp <= $__to
  AND event_name IN ('SCALE_UP', 'SCALE_DOWN', 'RESUME_WAREHOUSE', 'SUSPEND_WAREHOUSE')
ORDER BY timestamp
```

### Track data loading operations

Annotate when data loads complete or fail:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  last_load_time AS time,
  CONCAT('Load: ', table_name) AS title,
  CONCAT('Status: ', status, '\nRows loaded: ', row_count,
    '\nFile: ', file_name) AS text,
  CASE
    WHEN status = 'LOADED' THEN 'load-success'
    WHEN status = 'LOAD_FAILED' THEN 'load-failed,error'
    ELSE 'load-partial'
  END AS tags
FROM snowflake.account_usage.load_history
WHERE last_load_time >= $__from
  AND last_load_time <= $__to
ORDER BY last_load_time
```

### Track user login events

Monitor authentication events for security visibility:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_timestamp AS time,
  CONCAT('Login: ', user_name) AS title,
  CONCAT('Client: ', client_ip, '\nAuth method: ', first_authentication_factor,
    '\nStatus: ', is_success) AS text,
  CASE
    WHEN is_success = 'YES' THEN 'login-success'
    ELSE 'login-failed,security'
  END AS tags
FROM snowflake.account_usage.login_history
WHERE event_timestamp >= $__from
  AND event_timestamp <= $__to
ORDER BY event_timestamp
```

### Track task executions

Monitor scheduled task completions and failures:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  scheduled_time AS time,
  query_start_time AS timeEnd,
  CONCAT('Task: ', name) AS title,
  CONCAT('Database: ', database_name, '.', schema_name,
    '\nState: ', state, '\nDuration: ',
    DATEDIFF('second', query_start_time, completed_time), 's') AS text,
  CASE
    WHEN state = 'SUCCEEDED' THEN 'task-success'
    WHEN state = 'FAILED' THEN 'task-failed,error'
    ELSE 'task-skipped'
  END AS tags
FROM snowflake.account_usage.task_history
WHERE scheduled_time >= $__from
  AND scheduled_time <= $__to
ORDER BY scheduled_time
```

## Annotation display

Once configured, annotations appear as:

- Vertical lines on your time series, candlestick, or state timeline panels
- At the timestamp specified in your query
- With hover tooltips showing the title and detailed text
- Filterable by tags (like “query-failure” or “warehouse”)

## Next steps

- Learn about [Template variables](/docs/plugins/grafana-snowflake-datasource/latest/template-variables/) to make your annotations dynamic.
- Refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for more annotation options.
