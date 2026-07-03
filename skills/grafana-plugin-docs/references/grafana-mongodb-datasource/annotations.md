---
title: "MongoDB annotations | Grafana Enterprise Plugins documentation"
description: "Learn how to use annotations with the MongoDB data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB annotations

Annotations allow you to overlay event data on your time series graphs, making it easier to correlate metrics with specific events like deployments, errors, or configuration changes. For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Before you begin

- Ensure you have [configured the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/configure/).
- Your dashboard must already be saved before creating annotations.
- Annotations display on time series, state timeline, and candlestick visualization types.

## Annotation query format

Your annotation query must return at least a `time` field. The following table describes all recognized fields:

Expand table

| Field     | Description                                                                                           |
|-----------|-------------------------------------------------------------------------------------------------------|
| `time`    | Required. The timestamp for the annotation. Must be a date type or convertible to one.                |
| `timeEnd` | Optional. End time for region annotations (creates a highlighted range between `time` and `timeEnd`). |
| `title`   | Optional. Short text displayed on the annotation marker.                                              |
| `text`    | Optional. Detailed description shown in the tooltip.                                                  |
| `tags`    | Optional. Comma-separated string of tags for filtering annotations.                                   |

> Note
>
> Use the `$__timeFrom` and `$__timeTo` macros in your annotation query to limit results to the visible dashboard time range. Without these filters, the query may return all matching documents regardless of the selected time window.

## Create an annotation

To create an annotation query:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Select your MongoDB data source.
5. Enter your MongoDB query (using `aggregate` or `find`).
6. Click **Save dashboard**.

## Annotation examples

The following examples show common annotation patterns for MongoDB.

### Track deployment events

Show when deployments occurred to correlate with metric changes:

JavaScript [Copy code to clipboard] Copy

```javascript
ops_db.deployments.aggregate([
  {
    $match: {
      "deployed_at": { $gte: $__timeFrom, $lt: $__timeTo }
    }
  },
  {
    $project: {
      "_id": 0,
      "time": "$deployed_at",
      "title": { "$concat": ["Deploy: ", "$service_name", " v", "$version"] },
      "text": { "$concat": ["Environment: ", "$environment", "\nDeployed by: ", "$deployed_by"] },
      "tags": "deployment"
    }
  }
])
```

### Track error spikes

Annotate time periods when error counts exceeded a threshold:

JavaScript [Copy code to clipboard] Copy

```javascript
logs_db.errors.aggregate([
  {
    $match: {
      "timestamp": { $gte: $__timeFrom, $lt: $__timeTo }
    }
  },
  {
    $group: {
      "_id": {
        "$dateTrunc": { "date": "$timestamp", "unit": "minute", "binSize": 5 }
      },
      "count": { "$sum": 1 },
      "sample_error": { "$first": "$message" }
    }
  },
  {
    $match: { "count": { "$gt": 10 } }
  },
  {
    $project: {
      "_id": 0,
      "time": "$_id",
      "title": { "$concat": ["Error spike: ", { "$toString": "$count" }, " errors"] },
      "text": "$sample_error",
      "tags": "error,spike"
    }
  }
]).sort({"time": 1})
```

### Region annotations for maintenance windows

Use `time` and `timeEnd` to highlight maintenance periods:

JavaScript [Copy code to clipboard] Copy

```javascript
ops_db.maintenance_windows.aggregate([
  {
    $match: {
      "start_time": { $lte: $__timeTo },
      "end_time": { $gte: $__timeFrom }
    }
  },
  {
    $project: {
      "_id": 0,
      "time": "$start_time",
      "timeEnd": "$end_time",
      "title": { "$concat": ["Maintenance: ", "$description"] },
      "text": { "$concat": ["Affected services: ", "$affected_services"] },
      "tags": "maintenance"
    }
  }
])
```

### Track configuration changes

Annotate when configuration changes were applied:

JavaScript [Copy code to clipboard] Copy

```javascript
admin_db.audit_log.aggregate([
  {
    $match: {
      "action": "config_change",
      "timestamp": { $gte: $__timeFrom, $lt: $__timeTo }
    }
  },
  {
    $project: {
      "_id": 0,
      "time": "$timestamp",
      "title": { "$concat": ["Config change: ", "$setting_name"] },
      "text": { "$concat": ["Changed by: ", "$user", "\nOld value: ", "$old_value", "\nNew value: ", "$new_value"] },
      "tags": "config"
    }
  }
]).sort({"time": 1})
```

## Next steps

- Refer to [Template variables](/docs/plugins/grafana-mongodb-datasource/latest/template-variables/) to make your annotations dynamic.
- Refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) for more annotation options.
