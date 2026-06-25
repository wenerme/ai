---
title: "ServiceNow annotations | Grafana Enterprise Plugins documentation"
description: "Use ServiceNow queries as annotation sources to overlay events on Grafana panels."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# ServiceNow annotations

Use ServiceNow annotation queries to overlay events from your ServiceNow instance on time-series panels. Annotations mark points in time on graphs, making it easy to correlate metrics with ServiceNow events such as new incidents, change requests, or escalations.

## Before you begin

- [Configure the ServiceNow data source](/docs/plugins/grafana-servicenow-datasource/latest/configure/).
- Familiarize yourself with [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
- Ensure the ServiceNow user has read access to the tables you want to use as annotation sources.

## Create an annotation query

The ServiceNow annotation editor uses the same query editor as panel queries, including filters, display values, and sort options. To create an annotation from a ServiceNow query:

01. Open a dashboard and click **Dashboard settings** (gear icon).
02. Click **Annotations** in the left menu.
03. Click **Add annotation query**.
04. Enter a name for the annotation (for example, `New Incidents`).
05. Select the **ServiceNow** data source.
06. Set the **Query** type to **Table**.
07. Select a **Table** (for example, `incident`).
08. In **Show Fields**, add the fields you want displayed in the annotation tooltip (for example, `number`, `short_description`, `priority`).
09. Enable the **Time Field** toggle and select a date field (for example, `opened_at`). This field determines where annotations appear on the time axis.
10. Add filters to scope the annotations to relevant events.
11. Click **Apply** and return to the dashboard.

Annotations appear as vertical markers on time-series panels. Hover over a marker to view the ServiceNow record details in the tooltip.

> Note
>
> Annotations require the **Time Field** toggle to be enabled. Without a time field, annotations can’t be positioned on the time axis and won’t appear on your graphs.

## Examples

The following examples demonstrate common annotation use cases with the ServiceNow data source.

### Overlay new incidents on a graph

This example adds annotation markers for each new incident created within the dashboard time range.

1. Create a new annotation query and select the **ServiceNow** data source.
2. Configure the query:

   - Set **Query** to **Table**.
   - Set **Table** to `incident`.
   - In **Show Fields**, add `number`, `short_description`, and `priority`.
   - Enable **Time Field** and select `opened_at`.
   - Add a filter: **Priority** **Equals** `1` (Critical) to show only critical incidents, or omit the filter to show all incidents.
3. Set the annotation color to distinguish it from other annotations (for example, red for critical incidents).
4. Click **Apply**.

Each critical incident created during the visible time range now appears as a marker on time-series panels. Hover over a marker to see the incident number, description, and priority.

### Mark change request windows

This example overlays change request events on your dashboards to correlate deployments or maintenance windows with metric changes.

1. Create a new annotation query and select the **ServiceNow** data source.
2. Configure the query:

   - Set **Query** to **Table**.
   - Set **Table** to `change_request`.
   - In **Show Fields**, add `number`, `short_description`, and `type`.
   - Enable **Time Field** and select the appropriate date field for your instance (for example, `start_date` or `planned_start_date`, depending on your ServiceNow version and configuration).
   - Add a filter: **State** **Not Equals** `3` (Canceled) to exclude canceled changes.
3. Click **Apply**.

Change requests appear as markers on the time axis at their scheduled start time. This helps you identify whether metric changes coincide with planned deployments.

### Use template variables in annotation filters

You can use [template variables](/docs/plugins/grafana-servicenow-datasource/latest/template-variables/) in annotation filters to make annotations respond to dashboard selections. This example shows incidents only for the category selected in a dashboard variable.

1. Create a `category` template variable if you don’t already have one. Refer to [ServiceNow template variables](/docs/plugins/grafana-servicenow-datasource/latest/template-variables/) for setup steps.
2. Create a new annotation query and select the **ServiceNow** data source.
3. Configure the query:

   - Set **Query** to **Table**.
   - Set **Table** to `incident`.
   - In **Show Fields**, add `number`, `short_description`, and `priority`.
   - Enable **Time Field** and select `opened_at`.
   - Add a filter: **Category** **Equals** `${category}`.
4. Click **Apply**.

The annotation markers now update when you change the category selection in the dashboard drop-down, showing only incidents that match the selected category.

## Annotation tooltip fields

The fields you select in **Show Fields** determine what appears in the annotation tooltip when you hover over a marker. All selected fields are displayed in the tooltip as key-value pairs.

Consider including the following fields for useful annotation tooltips:

Expand table

| Field                | Purpose                                                              |
|----------------------|----------------------------------------------------------------------|
| `number`             | The record identifier (for example, INC0012345) for quick reference. |
| `short_description`  | A summary of the event for context.                                  |
| `priority`           | Priority or severity level to assess impact at a glance.             |
| `category` or `type` | Classification for understanding the type of event.                  |
| `assigned_to`        | Who is responsible for the record.                                   |

### Choose the right time field

The field selected as the **Time Field** determines where annotations are placed on the time axis. Choose a field that represents the event you want to visualize:

Expand table

| Time field                           | Use case                                                                                |
|--------------------------------------|-----------------------------------------------------------------------------------------|
| `opened_at`                          | When incidents were reported.                                                           |
| `sys_created_on`                     | When records were created in ServiceNow.                                                |
| `start_date` or `planned_start_date` | Scheduled start of change request windows. The field name varies by ServiceNow version. |
| `resolved_at`                        | When incidents were resolved.                                                           |
| `closed_at`                          | When records were closed.                                                               |

## Filter annotations on the dashboard

After creating annotations, you can toggle their visibility directly on the dashboard:

1. Click the **Annotations** toggle at the top of the dashboard.
2. Enable or disable individual annotation queries by name.

This is useful when you have multiple annotation sources and want to focus on specific event types without editing the dashboard settings.
