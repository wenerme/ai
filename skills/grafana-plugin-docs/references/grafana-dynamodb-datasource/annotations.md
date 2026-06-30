---
title: "DynamoDB annotations | Grafana Enterprise Plugins documentation"
description: "Add annotations from DynamoDB data to Grafana dashboards"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB annotations

The DynamoDB data source supports annotations, which let you overlay event markers on time-series panels. Annotations help you correlate events stored in DynamoDB with changes in your metrics. For general information about annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- [Configure the DynamoDB data source](/docs/plugins/grafana-dynamodb-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add an annotation query

To add a DynamoDB annotation query to a dashboard:

1. Open the dashboard where you want to add annotations.
2. Click **Dashboard settings** (gear icon).
3. Select **Annotations** in the left-side menu.
4. Click **Add annotation query**.
5. Select the **DynamoDB** data source.
6. Enter a PartiQL query that returns the required fields.
7. Click **Save dashboard**.

## Query format

Annotation queries must return specific fields so Grafana can render the event markers. The DynamoDB data source uses the standard Grafana annotation format.

The following table describes the supported fields:

Expand table

| Field     | Required | Description                                                                                   |
|-----------|----------|-----------------------------------------------------------------------------------------------|
| `time`    | Yes      | A datetime column aliased `AS time`. Determines when the annotation appears on the timeline.  |
| `timeEnd` | No       | A datetime column for the end of a range annotation. Use this to mark events with a duration. |
| `title`   | No       | A string column displayed as a bold heading in the annotation tooltip.                        |
| `text`    | No       | A string column providing the annotation body text displayed on hover.                        |
| `tags`    | No       | A string column with comma-separated tags for filtering annotations.                          |

> Note
>
> The DynamoDB data source doesn’t support time-range macros such as `$__timeFilter`. You must include explicit time filters in your annotation queries to limit results to a relevant range. Without a filter, the query runs against the full table, which may affect performance. For details on timestamp formats and workarounds, refer to [Dynamic time filtering doesn’t work](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#dynamic-time-filtering-doesnt-work).

## Annotation query examples

The following examples demonstrate common annotation patterns with DynamoDB.

### Mark deployments on a dashboard

This query returns deployment events with a title, description, and environment tag:

SQL [Copy code to clipboard] Copy

```sql
SELECT deploy_time AS time, version AS title, description AS text, environment AS tags
FROM "deployments"
WHERE customerId = 'myapp'
ORDER BY deploy_time
```

Each deployment appears as a vertical line on time-series panels. Hovering over it shows the version as a heading and the description as body text.

### Track incidents

This query marks incident events on your dashboard:

SQL [Copy code to clipboard] Copy

```sql
SELECT event_time AS time, severity AS title, event_message AS text
FROM "events"
WHERE event_type = 'incident' AND customerId = 'myapp'
ORDER BY event_time
```

### Show maintenance windows with duration

Use `timeEnd` to create range annotations that highlight a time span rather than a single point:

SQL [Copy code to clipboard] Copy

```sql
SELECT start_time AS time, end_time AS timeEnd, window_name AS title, description AS text
FROM "maintenance-windows"
WHERE systemId = 'prod-cluster'
ORDER BY start_time
```

Range annotations appear as shaded regions on time-series panels.

### Filter by time range

Since the DynamoDB data source doesn’t support time-range macros, include explicit time boundaries in your query to avoid scanning the entire table:

SQL [Copy code to clipboard] Copy

```sql
SELECT event_time AS time, message AS text, category AS tags
FROM "application-events"
WHERE event_time BETWEEN '2024-01-01T00:00:00Z' AND '2024-12-31T23:59:59Z'
  AND appId = 'frontend'
ORDER BY event_time
```

You can use template variables for dynamic filtering:

SQL [Copy code to clipboard] Copy

```sql
SELECT event_time AS time, message AS text
FROM "application-events"
WHERE appId = '$app'
ORDER BY event_time
```

### Simple time-only annotations

If you only need markers without text, a single `time` column is sufficient:

SQL [Copy code to clipboard] Copy

```sql
SELECT restart_time AS time
FROM "service-restarts"
WHERE serviceId = 'api-gateway'
ORDER BY restart_time
```

## Next steps

- Learn how to write queries in the [DynamoDB query editor](/docs/plugins/grafana-dynamodb-datasource/latest/query-editor/).
- [Set up alerting](/docs/plugins/grafana-dynamodb-datasource/latest/alerting/) based on DynamoDB data.
- Refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for full annotation configuration options.
