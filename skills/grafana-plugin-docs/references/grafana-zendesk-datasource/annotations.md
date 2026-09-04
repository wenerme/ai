---
title: "Zendesk annotations | Grafana Enterprise Plugins documentation"
description: "Use the Zendesk data source to add annotations to Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zendesk annotations

[Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/) overlay event markers on your graphs, so you can correlate Zendesk activity, such as ticket creation, with the rest of your dashboard. The Zendesk data source supports annotations, which means you can drive these markers from a Zendesk query.

## Before you begin

Before you add an annotation query, ensure you have [configured the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/) and are familiar with the [Zendesk query editor](/docs/plugins/grafana-zendesk-datasource/latest/query-editor/).

## How annotations work

The Zendesk data source uses the standard Grafana annotation support, so it doesn’t have a dedicated annotation query type. An annotation query uses the same query editor as a panel: you select an action, and Grafana turns each returned row into an annotation marker using the row’s timestamp. Actions that return timestamped resources work best, for example:

- **Search** with a `type:ticket` query returns tickets with `created_at` and `updated_at` timestamps.
- **Show tickets by IDs** returns tickets with `created_at` and `updated_at` timestamps.
- **Show deleted tickets** returns tickets with a `deleted_at` timestamp.

The data source parses common timestamp fields, such as `created_at`, `updated_at`, and `deleted_at`, into time fields, so Grafana can place each result on the dashboard time axis.

## Add an annotation query

To add a Zendesk annotation query to a dashboard:

1. Navigate to your dashboard, then select **Edit** &gt; **Options**.
2. Select the **Annotations** tab, then select **Add annotation query**.
3. Enter a name for the annotation.
4. In the **Data source** field, select your Zendesk data source.
5. Under the **Query** section, select **Open query editor**.
6. Select an action that returns timestamped results, such as **Search**.
7. Set any required parameters, then select **Apply** and save the dashboard.

The matching events appear as markers on panels that share the dashboard time range.

## Example: annotate ticket creation on a graph

Use this example to mark when tickets were created on your time series panels.

1. Open the dashboard you want to annotate, then select **Edit** &gt; **Options** &gt; **Annotations**.
2. Select **Add annotation query**, then name it `New tickets`.
3. In the **Data source** field, select your Zendesk data source.
4. Under the **Query** section, select **Open query editor**.
5. Select the **Search** action.
6. Set the **Search query** to `type:ticket` to return tickets. To narrow the markers, use a more specific query, such as `type:ticket status:open`.
7. Select **Apply**, then save the dashboard.

Grafana places a marker at each ticket’s `created_at` time. Toggle the annotation layer from the dashboard controls to show or hide the markers.

## How result fields map to annotations

Grafana builds each annotation marker from the fields returned by the query:

Expand table

| Annotation property    | Source field                                             |
|------------------------|----------------------------------------------------------|
| Time (marker position) | The timestamp field in the result, such as `created_at`. |
| Time end (region)      | A field named `timeEnd`, when present.                   |
| Text                   | A field named `text`, when present.                      |
| Tags                   | A field named `tags`, when present.                      |

Grafana sets the marker position automatically from the parsed timestamp field. When a result includes more than one time field, such as `created_at` and `updated_at`, Grafana uses the first time field for the marker position. Because Zendesk actions return fields with their own names, such as `subject`, `status`, and `description`, Grafana populates the marker text only when the result includes a field named `text`. Zendesk tickets include a `tags` field, so ticket tags map to annotation tags automatically. Annotation queries don’t run panel transformations, so use an action whose timestamps identify the events you want to mark.

## Use cases

The following examples show common ways to use annotations with the Zendesk data source. Each row pairs a scenario with the action and configuration that supports it.

Expand table

| Use case                           | Action               | How to configure it                                                                     |
|------------------------------------|----------------------|-----------------------------------------------------------------------------------------|
| Mark when tickets were created     | Search               | Set **Search query** to `type:ticket`. Markers use each ticket’s `created_at` time.     |
| Mark new high-priority tickets     | Search               | Set **Search query** to `type:ticket priority:high` to mark only high-priority tickets. |
| Mark when tickets were deleted     | Show deleted tickets | Set **Sort by** to `deleted_at`. Markers use each ticket’s `deleted_at` time.           |
| Mark activity for specific tickets | Show tickets by IDs  | Enter the ticket IDs to mark. Markers use each ticket’s `created_at` time.              |

Overlay one of these annotation queries on a time series panel, such as a ticket-count trend, to correlate spikes with the underlying ticket events.
