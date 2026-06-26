---
title: "Sentry annotations | Grafana Plugins documentation"
description: "Use annotations to overlay Sentry issues on Grafana dashboard graphs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sentry annotations

Annotations let you overlay Sentry data on dashboard graphs, marking when issues were first or last seen directly on your time-series panels. This helps you correlate application errors with metrics from other data sources.

## Before you begin

- [Configure the Sentry data source](/docs/plugins/grafana-sentry-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Supported query types for annotations

All Sentry query types are available for annotations. The **Issues** and **Events** query types are best suited because they return discrete records with timestamps that map naturally to annotation markers.

Expand table

| Query type   | Recommended | Notes                                                                              |
|--------------|-------------|------------------------------------------------------------------------------------|
| Issues       | Yes         | Uses `FirstSeen` and `LastSeen` timestamps. Best for marking when issues appeared. |
| Events       | Yes         | Uses event timestamps. Useful for marking individual error or transaction events.  |
| Spans        | Yes         | Uses span timestamps. Useful for marking specific span occurrences.                |
| Events Stats | No          | Returns time-series data, which is less natural for annotation markers.            |
| Spans Stats  | No          | Returns time-series data, which is less natural for annotation markers.            |
| Metrics      | No          | Returns time-series data, which is less natural for annotation markers.            |
| Stats        | No          | Returns time-series data, which is less natural for annotation markers.            |

## Create an annotation query

To add Sentry annotations to a dashboard:

01. Open the dashboard where you want to display annotations.
02. Navigate to **Dashboard settings** &gt; **Annotations**.
03. Click **Add annotation query**.
04. Select the **Sentry** data source.
05. Select a **Query Type**. **Issues** is the most common choice for annotations.
06. (Optional) Filter by **Projects** to limit annotations to specific Sentry projects.
07. (Optional) Filter by **Environments** to limit annotations to specific environments.
08. (Optional) Enter a **Query** to filter which results appear as annotations.
09. (Optional) Set **Sort By** to control the order of results (for example, **Last Seen** or **Priority**).
10. (Optional) Set a **Limit** to control how many annotations display.
11. Click **Save dashboard**.

## Annotation examples

The following examples show common annotation configurations.

### Overlay all unresolved issues

Display all unresolved issues from a specific project:

1. Set **Query Type** to **Issues**.
2. Select the target project in **Projects**.
3. Set **Query** to `is:unresolved`.

### Overlay high-priority issues only

Display only high-priority issues as annotations:

1. Set **Query Type** to **Issues**.
2. Set **Query** to `is:unresolved priority:high`.

### Overlay issues for a specific release

Mark issues associated with a particular release:

1. Set **Query Type** to **Issues**.
2. Set **Query** to `release:1.2.0`.

### Overlay recent error events

Mark individual error events on your graphs:

1. Set **Query Type** to **Events**.
2. Set **Query** to `event.type:error`.
3. Set **Sort By** to **Last Seen** with **Descending** sort direction.
4. Set **Limit** to control how many events appear.

### Overlay issues using template variables

Use dashboard template variables to make annotations dynamic:

1. Set **Query Type** to **Issues**.
2. Select `var: ${project}` in the **Projects** field.
3. Set **Query** to `is:unresolved`.

When the user changes the project variable, the annotations update to show issues for the selected project.

## Limitations

- Annotations are filtered by the dashboard time range. Only data within the visible time range appears.
- Sentry API rate limits apply. If you have many matching results, set a **Limit** to reduce the number of API calls.

For more information, refer to [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
