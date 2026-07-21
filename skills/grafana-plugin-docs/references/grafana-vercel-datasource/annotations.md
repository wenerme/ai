---
title: "Vercel annotations | Grafana Enterprise Plugins documentation"
description: "Use the Vercel data source to add annotations to Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Vercel annotations

[Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) overlay event markers on your graphs, so you can correlate Vercel activity, such as deployments, with the rest of your dashboard. The Vercel data source supports annotations, which means you can drive these markers from a Vercel query.

## Before you begin

Before you add an annotation query, ensure you have [configured the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/configure/) and are familiar with the [Vercel query editor](/docs/plugins/grafana-vercel-datasource/latest/query-editor/).

## How annotations work

The Vercel data source uses the standard Grafana annotation support, so it doesn’t have a dedicated annotation query type. An annotation query uses the same query editor as a panel: you select an action, and Grafana turns each returned row into an annotation marker using the row’s timestamp. Actions that return timestamped resources work best, for example:

- **List deployments** returns deployments with `created` and `createdAt` timestamps.
- **Get deployment events** returns build events for a single deployment.

The data source parses common timestamp fields, such as `createdAt` and `created`, into time fields, so Grafana can place each result on the dashboard time axis.

## Add an annotation query

To add a Vercel annotation query to a dashboard:

1. Navigate to your dashboard, then select **Edit** &gt; **Settings**.
2. Select the **Annotations** tab, then select **Add annotation query**.
3. Enter a name for the annotation.
4. In the **Data source** field, select your Vercel data source.
5. Select an action that returns timestamped results, such as **List deployments**.
6. Set any required parameters, then select **Apply** and save the dashboard.

The matching events appear as markers on panels that share the dashboard time range.

## Example: annotate deployments on a graph

Use this example to mark each deployment on your time series panels.

1. Open the dashboard you want to annotate, then select **Edit** &gt; **Settings** &gt; **Annotations**.
2. Select **Add annotation query**, then name it `Deployments`.
3. In the **Data source** field, select your Vercel data source.
4. Select the **List deployments** action.
5. To limit the markers to one project, expand **Additional Parameters** and set `projectId`. To mark only failed builds, set `state` to `ERROR`.
6. Select **Apply**, then save the dashboard.

Grafana places a marker at each deployment’s `created` time. Toggle the annotation layer from the dashboard controls to show or hide the markers.

## How result fields map to annotations

Grafana builds each annotation marker from the fields returned by the query:

Expand table

| Annotation property    | Source field                                                         |
|------------------------|----------------------------------------------------------------------|
| Time (marker position) | The timestamp field in the result, such as `created` or `createdAt`. |
| Time end (region)      | A field named `timeEnd`, when present.                               |
| Text                   | A field named `text`, when present.                                  |
| Tags                   | A field named `tags`, when present.                                  |

Grafana sets the marker position automatically from the parsed timestamp field. Because Vercel actions return fields with their own names, such as `name`, `url`, and `state`, Grafana populates the marker text and tags only when the result includes fields named `text` or `tags`. Annotation queries don’t run panel transformations, so use an action whose timestamps identify the events you want to mark.
