---
title: "Amazon Athena annotations | Grafana Plugins documentation"
description: "Add annotations from Amazon Athena data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Athena annotations

[Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) let you overlay rich event information on top of graphs. You can add annotations by clicking on panels or by adding annotation queries through **Dashboard settings** &gt; **Annotations**.

## Create an annotation query

To create an annotation query:

1. Open the dashboard where you want to add annotations.
2. Click the dashboard settings gear icon.
3. Select **Annotations** from the left-side menu.
4. Click **Add annotation query**.
5. Select the Amazon Athena data source.
6. Enter a SQL query that returns the required annotation columns.

## Annotation columns

The following table describes the columns that Amazon Athena annotation queries use to render annotations.

Expand table

| Column      | Required | Description                                                                                                              |
|-------------|----------|--------------------------------------------------------------------------------------------------------------------------|
| **time**    | Yes      | The date/time field. Can be a column with a native SQL date/time data type or an epoch value.                            |
| **timeend** | No       | The end date/time field for region annotations. Can be a column with a native SQL date/time data type or an epoch value. |
| **text**    | No       | The event description field displayed in the annotation tooltip.                                                         |
| **tags**    | No       | A comma-separated string used as event tags for filtering annotations.                                                   |

## Example annotation query

The following query creates annotations for humidity readings that exceed 95, tagged by environment.

SQL [Copy code to clipboard] Copy

```sql
SELECT
  time as time,
  environment as tags,
  humidity as text
FROM
  tableName
WHERE
  $__dateFilter(time) and humidity > 95
```

## Next steps

- [Amazon Athena query editor](/docs/plugins/grafana-athena-datasource/latest/query-editor/)
- [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
