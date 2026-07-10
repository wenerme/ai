---
title: "SolarWinds annotations | Grafana Enterprise Plugins documentation"
description: "Learn how to use annotations with the SolarWinds data source to overlay SolarWinds events on your Grafana graphs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds annotations

Annotations let you overlay event markers on your graphs. The SolarWinds data source supports annotations, so you can display SolarWinds events, such as triggered alerts or status changes, alongside your time series panels.

## Before you begin

Ensure you have [configured the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/).

## Write SWQL queries for annotations

The SolarWinds data source drives annotations from a SWQL query rather than a dedicated annotation query type. To use a query for annotations, return a column that Grafana can map to the annotation time and a column it can map to the annotation text.

Follow these guidelines when you write a SWQL query for annotations:

- Return a timestamp column for the annotation time, for example `EventTime` or `TriggeredDateTime`.
- Return a text column for the annotation description, for example `Message` or an alert name.
- Filter the query so it returns only the events you want to display.

## Add an annotation query

To add a SolarWinds annotation query to your dashboard:

1. Click the dashboard settings icon (gear) in the top navigation.
2. Select **Annotations** from the left-side menu.
3. Click **Add annotation query**.
4. In the **Data source** field, select your SolarWinds data source.
5. Enter a SWQL query that returns a timestamp column and a text column.
6. Map the returned columns to the annotation time and text fields.
7. Click **Save dashboard**.

## Map query results to annotation fields

Grafana maps the columns returned by your SWQL query to annotation fields:

Expand table

| Annotation field | Description                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------|
| **Time**         | The timestamp column that determines where the annotation appears on the graph.                              |
| **Time end**     | An optional timestamp column that turns the annotation into a region spanning from the time to the time end. |
| **Text**         | The column that provides the annotation description.                                                         |
| **Tags**         | An optional column whose values are added as annotation tags.                                                |

## Examples

The following examples show SWQL queries you can use for annotations. Adjust the entity and column names to match your SolarWinds environment.

### Annotate with active alerts

To mark when alerts triggered, join the active alerts to their configuration and return the trigger time and alert name:

SQL [Copy code to clipboard] Copy

```sql
SELECT ac.Name, aa.TriggeredDateTime
FROM Orion.AlertActive aa
JOIN Orion.AlertObjects o ON aa.AlertObjectID = o.AlertObjectID
JOIN Orion.AlertConfigurations ac ON ac.AlertID = o.AlertID
ORDER BY aa.TriggeredDateTime DESC
```

Map `TriggeredDateTime` to the annotation time and `Name` to the annotation text.

### Annotate with SolarWinds events

To display recent SolarWinds events, query `Orion.Events` for the event time and message:

SQL [Copy code to clipboard] Copy

```sql
SELECT EventTime, Message FROM Orion.Events
```

Map `EventTime` to the annotation time and `Message` to the annotation text. The dashboard displays a marker for each event, with the event message shown when you hover over the marker.

## Related documentation

- [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [SolarWinds query editor](/docs/plugins/grafana-solarwinds-datasource/latest/query-editor/)
