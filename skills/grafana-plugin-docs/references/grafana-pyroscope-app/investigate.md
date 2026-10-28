---
title: "Investigate trends and spikes | Grafana Plugins documentation"
description: "Investigate trends and spikes to identify issues."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Investigate trends and spikes

Grafana Profiles Drilldown provides powerful tools that help you identify and analyze problems in your applications and services.

Using these steps, you can use the profile data to investigate issues.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [the Grafana Play site](https://play.grafana.org/a/grafana-pyroscope-app/profiles-explorer).

[Try it](https://play.grafana.org/a/grafana-pyroscope-app/profiles-explorer)

## Explore your profile data

When you use Profiles Drilldown, your investigations usually follow these steps.

1. Verify your data source in the **Data source** drop-down.
2. Choose an **Exploration** tab. **All services** is selected by default. Learn about the [available views](https://grafana.com/docs/plugins/grafana-pyroscope-app/latest/choose-a-view/).
3. Look for spikes or trends in services to identify where to investigate. Use the **Profile type** drop-down to change profile metrics.
4. After you identify the service to explore, you can change views:

   - Select **Profile types** to review profile metrics for a service.
   - Select **Labels** to view labels for a service and refine the scope of your investigation.
   - Select **Flame graph** to view the flame graph for a service.
5. Optional: Select filters to focus on problem areas. Each filter is added to the filter expression near the top of the page. You can add filters in the following ways:

   - Use filter selectors in the filter bar to add labels and operators.
   - In **Labels** view, use **Include** or **Exclude** on areas of interest.

   If **Labels** view shows no data, select a different service, profile type, or group-by label.
6. Optional: Click and drag on a chart to zoom to a smaller time range.
7. To compare two flame graphs, open **Diff flame graph**.

   - Configure **Baseline** and **Comparison** using time range selectors, label filters, and chart range selection.
   - Use **Auto-select** or choose a comparison preset to speed up setup.
8. Use **Diff flame graph** to compare where relative time share changes between baseline and comparison, and then drill into functions to identify likely causes.

## Drill down to an individual profile

While flame graphs show an aggregate of all profiles in the selected time range, you may want to inspect the exact profile behind a spike. Exemplars are individual profiles shown as markers on the timeseries panel. They let you go from an aggregated view to a specific individual profile.

1. Navigate to the **Flame graph** or **Labels** view for your service. Exemplars are enabled by default in these views. In other views with a timeseries panel, select the **Exemplars** toggle in the panel header to enable them.
2. Each diamond marker on the timeseries represents an individual profile.
3. Click an exemplar marker to view its details, including the profile ID, value, timestamp, and associated labels such as pod, namespace, and cluster.
4. Select **View profile** in the exemplar popover. The flame graph updates to show only that single individual profile. A **profile id selector** tag appears above the flame graph confirming your selection.
5. To return to the aggregated flame graph, click **X** on the profile id selector tag.

## Move from profiles to traces

Use the span heatmap to investigate how resource usage varies across trace spans. Start with the distribution of span profile values, select an exemplar, and inspect its flame graph or associated trace.

The span heatmap is a visualization within the **Flame graph** view, not a separate **Exploration** tab.

### Before you begin

You need:

- A Pyroscope data source with span profiles for the service, profile type, filters, and time range you want to investigate. Aggregated profile data alone doesn’t guarantee that span profiles are available.
- To inspect associated traces, a Tempo data source containing the matching trace data and permission to query it. You can inspect span profiles without selecting Tempo.

### Open the span heatmap

1. Open **Profiles Drilldown** and select your Pyroscope **Data source**.
2. Select the **Flame graph** view and choose a service and **Profile type**.
3. Set the time range and any label filters for your investigation.
4. In the **Profile timeline visualization** toggle above the chart, select **Span heatmap**.

To return to the time series visualization, select **Time series** in the same toggle.

### Read the heatmap

The heatmap groups spans into buckets:

- The horizontal axis represents time.
- The vertical axis represents the selected profile metric’s value per span.
- Cell color represents the count of spans in a bucket. Use the tooltip and color scale to interpret the counts.

Look for changes in the distribution or spans with unusually high profile values. For example, with a CPU profile type, higher-value buckets represent spans with more profiled CPU usage, not necessarily longer elapsed duration.

Exemplar markers identify individual span profiles you can investigate. The **Top span exemplars** table provides timestamps, span IDs, and profile metric values. Trace details, including duration and trace ID, are loaded from the selected Tempo data source when available.

### Inspect an individual span profile

1. Find an exemplar in the heatmap or the **Top span exemplars** table.
2. Use **Select exemplar** to highlight it in the heatmap and focus the table on that exemplar.
3. In the table, select **Open flame graph** to inspect the span’s profile and identify the functions contributing to its resource usage.

Use **Clear exemplar selection** in the table to remove the exemplar highlight and restore the table’s other rows.

### Open the associated trace

1. In **Top span exemplars**, select the **Tempo data source** that contains the service’s traces.
2. Wait for trace details to load. Use the span name, duration, timestamp, and profile metric value to find a span of interest.
3. Select **Open trace** for a span with resolved trace details. The associated trace opens in a drawer.
4. Inspect the trace to understand the span in the context of the request. Close the drawer to continue investigating the heatmap.

A span’s profile metric value and its trace duration describe different things. Use the flame graph to understand profiled resource usage and the trace to understand request timing and relationships between spans.

### Troubleshoot missing data

#### Span heatmap is unavailable

If **Span heatmap** is disabled, its tooltip says: **No span profiles are available for the current service, filters, and time range**.

Check that you selected the intended service and profile type. Expand the time range or remove restrictive filters, then try again. If span profiles are still unavailable, verify that your profiling setup collects span profiles. Seeing data in **Time series** doesn’t by itself mean span profiles are present.

#### No span exemplars are shown

If the table displays **No span exemplars in the selected time range**, try a time range and filters that include span profiles. The exemplar table is not a complete list of every span represented by the heatmap.

#### Trace details are missing

Select the Tempo data source that contains the matching traces. A missing trace ID or **Open trace** action means no trace details have been resolved for that exemplar.

If you see **Unable to load trace details from Tempo**, check your access to the selected Tempo data source and whether it can be queried. Also verify that the matching traces are still available within your trace retention period. You can continue investigating the available profile data without trace details.

## Common tools during investigations

In the Profiles toolbar, you can also use these features while investigating:

- **Upload ad hoc profiles** to load profile data for one-off analysis. The ad hoc view provides a **Single view** to inspect one uploaded profile and a **Diff view** to compare two uploaded profiles. In the diff view, select **Side by side** to show each profile in its own flame graph, or **Diff flamegraph** to show a computed difference. To compute a difference, the two profiles must share a common profile type.
- **Copy shareable link** to capture the current investigation state and share it with teammates.
- **View/edit tenant settings** to adjust settings such as collapsed flame graphs, function details, and maximum node count.

### Add a time series panel to a dashboard

You can save a time series visualization from Profiles Drilldown to a Grafana dashboard to monitor it alongside your other observability data.

1. Hover over a time series panel and open the panel menu.
2. Select **Add to dashboard**.
3. Choose an existing dashboard or create a new one, then save.

### Save and reuse searches

When you apply filters, you can save the current search and return to it later. A saved search captures the data source, profile type, and filters.

1. Apply one or more filters.
2. Select **Save in Saved queries** and enter a title and an optional description.
3. To reuse a saved search, select **Load Saved query** and choose one from the list.

When the Grafana query library is available, searches are saved to the shared **Saved queries** library. When it isn’t available, these actions appear as **Save search** and **Load saved search**, and searches are stored locally in your browser and only available on that device.
