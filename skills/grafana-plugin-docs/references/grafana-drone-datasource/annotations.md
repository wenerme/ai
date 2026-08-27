---
title: "Drone annotations | Grafana Enterprise Plugins documentation"
description: "Use the Drone data source to add annotations to Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Drone annotations

The Drone data source supports annotations, which let you overlay Drone events, such as builds, onto your dashboard panels. Annotations mark points in time so you can correlate Drone activity with other metrics on your dashboards.

The data source doesn’t define a dedicated annotation query type, so annotations use the standard query actions described in the [query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/).

## Before you begin

- [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add an annotation query

To add an annotation query that uses Drone data:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Select the **Drone** data source.
4. Build a query with the [query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/) that returns the time-based events you want to mark, such as builds from a `Build List` query.
5. Map the returned fields to the annotation time, text, and tags fields.
6. Save the dashboard.

Grafana renders the returned events as annotation markers on panels that share the dashboard time range.

## Map query results to annotation fields

Grafana maps the fields returned by your Drone query to annotation fields. A `Build List` query is the most useful source because it returns one row per build, each with `started`, `finished`, `created`, and `updated` timestamps, along with the build `status` and `number`.

Expand table

| Annotation field | Description                                                                                                           |
|------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Time**         | The timestamp field that determines where the annotation appears, such as `started` or `created`.                     |
| **Time end**     | An optional timestamp field, such as `finished`, that turns the annotation into a region spanning the build duration. |
| **Text**         | The field that provides the annotation description, such as `status` or `number`.                                     |
| **Tags**         | An optional field whose values become annotation tags, such as `status`.                                              |

## Examples

The following examples use a `Build List` query to annotate build activity for a repository.

### Annotate when builds start

To mark the moment each build started:

1. Add an annotation query that uses a `Build List` query for a repository.
2. Map `started` to the annotation **Time** field.
3. Map `status` to the annotation **Text** field so you can see the build outcome on hover.

Each build appears as a marker on panels that share the dashboard time range.

### Annotate build duration as a region

To highlight the full span of each build instead of a single point:

1. Add an annotation query that uses a `Build List` query for a repository.
2. Map `started` to the annotation **Time** field.
3. Map `finished` to the annotation **Time end** field.
4. Map `status` to the annotation **Tags** field to color or filter regions by outcome.

Grafana renders each build as a shaded region from its start to its finish time, which makes it easy to correlate long-running builds with changes in your other metrics.

## Next steps

- [Drone query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-drone-datasource/latest/troubleshooting/)
