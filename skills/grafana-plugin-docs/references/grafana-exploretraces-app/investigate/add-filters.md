---
title: "Refine your investigation with filters | Grafana Plugins documentation"
description: "Investigate trends and spikes to identify issues."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Refine your investigation with filters

Use filters to focus your investigation on specific data.

Filters are available on the **Breakdown** and **Comparison** views. Refer to [Analyze tracing data](../analyze-tracing-data/) to learn how to use these views.

## Add filters

Each time you add a filter, the condition appears in the list of filters at the top of the page. The list of filters expands as you investigate and explore your tracing data using Traces Drilldown.

1. Refine your investigation by adding filters.
2. Optional: Use the tabs underneath the metrics selection to provide insights into breakdowns, comparisons, latency, and other explorations.
3. Choose filters to focus on problem areas. Each selected filter is added to the **Filters** bar at the top of the page. You can select filters on the **Comparison** and **Breakdown** tabs in the following ways:

   - Select **Include** to add a matching filter (`=`) or **Exclude** to add a negating filter (`!=`).
   - Use the **Filters** bar near the top.
   - Attributes shown with a filter icon in the **Attributes** sidebar are already applied in your current **Filters**. The **Attributes** sidebar helps you pick and favorite attributes used for grouping, comparison, and **Trace list** columns. Refer to the [UI reference](../../ui-reference/).

### Example

Let’s say that you want to investigate a spike in root spans with errors that are longer than 200ms.

1. Select **Root spans**.
2. Select the **Errored traces** tab.
3. In **Filter by label values**, enter `span:duration`, select greater than (`>`) from the drop-down list, and then enter `200ms`.
4. After the data updates, sort the table by the **Duration** column.

## Modify a filter

Selecting an option for a filter automatically updates the displayed data. If there are no matches, the app displays a “No data for selected query” message.

To modify an applied filter:

1. Select the filter to modify in the filter bar.
2. Select an option from the drop-down list.

You can also click in the **Filters** bar to add filters using drop-down lists.

## Remove filters

To remove a filter, select **Remove filter** (**X**) at the end of the filter you want to remove.

## Change the time range

Use the time picker at the top right to modify the data shown in Traces Drilldown.

You can select a time range of up to 24 hours in duration. By default, this time range can be any 24-hour period in your configured trace data retention period. The default retention period is 30 days. Your configuration may vary from these values.

For more information about the time range picker, refer to [Use dashboards](/404/).
