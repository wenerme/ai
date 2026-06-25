---
title: "Create annotations from Jira data | Grafana Enterprise Plugins documentation"
description: "Learn how to create annotations from Jira issue data"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Create annotations from Jira data

Annotations allow you to overlay Jira issue events on time series visualizations. Use annotations to correlate issue creation, resolution, or status changes with metrics from other data sources.

For general information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add a Jira annotation query

To create annotations from Jira data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** in the left menu.
3. Click **Add annotation query**.
4. Enter a name for the annotation.
5. Select your Jira data source from the **Data source** drop-down.
6. Configure the annotation query:

   - Select a date field as the time field (for example, **Created**, **Updated**, or **Resolution Date**)
   - Select a text field for the annotation label (for example, **Summary** or **Key**)
   - Add a JQL filter to limit which issues appear as annotations
7. Click **Apply**.

## Common annotation use cases

The following examples demonstrate common annotation use cases.

### Show when issues are created

Overlay markers on your visualizations when new issues are created:

- Time field: **Created**
- Text field: **Summary**
- JQL Filter: `project = 'Your Project' AND created >= -7d`

### Show when issues are resolved

Track issue resolutions alongside your metrics:

- Time field: **Resolution Date**
- Text field: **Summary**
- JQL Filter: `project = 'Your Project' AND resolved >= -30d`

### Show deployment-related issues

Highlight issues related to deployments or releases:

- Time field: **Updated**
- Text field: **Key**
- JQL Filter: `project = 'Your Project' AND labels = 'deployment'`

### Show high-priority issues

Mark when critical issues are created or updated:

- Time field: **Created**
- Text field: **Summary**
- JQL Filter: `project = 'Your Project' AND priority = 'Critical' AND created >= -14d`

## Annotation configuration options

When configuring Jira annotations, the following options are available:

- **Name** - A descriptive name for the annotation query.
- **Data source** - Select your Jira data source.
- **Enabled** - Toggle to show or hide annotations on the dashboard.
- **Color** - Choose the annotation marker color.
- **Show in** - Select which panels display the annotations.

## Filter annotations by time range

Annotations are automatically filtered by the dashboard time range. To ensure relevant annotations appear:

1. Use relative time filters in your JQL (for example, `created >= -30d`).
2. Alternatively, use the time range macros `$__timeFrom` and `$__timeTo`:

jql [Copy code to clipboard] Copy

```jql
created >= $__timeFrom AND created <= $__timeTo
```

This ensures annotations align with the dashboard’s selected time range.
