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
2. Choose an **Exploration** tab. **All services** is selected by default. Learn about the [available views](../choose-a-view/).
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

## Common tools during investigations

In the Profiles toolbar, you can also use these features while investigating:

- **Upload ad hoc profiles** to load profile data for one-off analysis.
- **Copy shareable link** to capture the current investigation state and share it with teammates.
- **View/edit tenant settings** to adjust settings such as collapsed flame graphs, function details, and maximum node count.
