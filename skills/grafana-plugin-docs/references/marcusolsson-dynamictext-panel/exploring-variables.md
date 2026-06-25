---
title: "Exploring variables | Grafana Plugins documentation"
description: "Learn how dashboard, global, and environment variables work in Grafana, how they differ, and where to find more examples."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Exploring variables

Variables in Grafana come in three types: dashboard, global, and environment. This page breaks them down and shows how they fit into your Grafana deployment.

[](/media/docs/grafana/panels-visualizations/business-charts/variables.png)

## Dashboard variables

Dashboard variables live within a single dashboard, powering filters and dynamic controls. They’re your go-to for tailoring what users see.

[](/media/docs/grafana/panels-visualizations/business-charts/variables-edit.png)

## Global variables

Global variables tap into Grafana-wide settings, ready to use across your dashboards. This is a list of the most common ones:

Expand table

| Variable          | Description                        |
|-------------------|------------------------------------|
| `${__dashboard}`  | Name of the current dashboard      |
| `${__from}`       | Start of the time range (epoch ms) |
| `${__interval}`   | Time grouping parameter            |
| `${__org.name}`   | Name of the current organization   |
| `${__org}`        | ID of the current organization     |
| `${__to}`         | End of the time range (epoch ms)   |
| `${__user.email}` | Email of the current user          |
| `${__user.id}`    | ID of the current user             |
| `${__user.login}` | Login handle of the current user   |

For the full list, refer to [Grafana global variable documentation](/docs/grafana/latest/visualizations/dashboards/variables/add-template-variables/#global-variables).

## Environment variables

Environment variables pull from the system where Grafana runs (for example, operating system or device settings). Dashboards can’t read them directly by default. To use them, add a data source that exposes environment variables to Grafana.

## Variables at a glance

For Business Charts variable substitution in the Charts function, refer to [Variables](/docs/plugins/volkovlabs-echarts-panel/latest/features/variables/).
