---
title: "Datadog template variables | Grafana Enterprise Plugins documentation"
description: "This document describes using templates and variables with Datadog"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog template variables

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana lists these variables in dropdown select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as template variables.

For an introduction to templates and variables, see the following topics:

- [Variables](/docs/grafana/latest/dashboards/variables/)
- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](//docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

To add a new Datadog query variable, see [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Datadog data source as your data source. The following queries are available:

Expand table

| Query              | Description                                                                                                                                                                      |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| all-metrics        | Fetches the list of available metrics                                                                                                                                            |
| all-tags           | Returns all tags (Max: 1000)                                                                                                                                                     |
| all-hosts          | Returns all hosts                                                                                                                                                                |
| \[tag]             | Returns all tags using tag value                                                                                                                                                 |
| \[metric]:all-tags | Returns all tag values associated with a given metric name. For example, `datadog.agent.running:all-tags` would return all tags associated with the datadog.agent.running metric |
| \*                 | Legacy alias for all-metrics                                                                                                                                                     |
| tag                | Legacy alias for all-tags                                                                                                                                                        |
| scope              | Legacy alias for all-tags                                                                                                                                                        |
|                    |                                                                                                                                                                                  |

For custom tag groups, enter the tag group name. For example, if your custom tag group name is `subscription_name`, enter that name in the **Query** field.

After you create a variable, you can add it to your Datadog queries. For more information, see [Variable syntax](/docs/grafana/latest/variables/syntax/).

## Ad hoc filters

The [ad hoc filters](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters) variable ships with Grafana and can be used with all Datadog queries. Ad hoc filters allow you to retrieve all key-value pairs from tags, such as `region:east` or `region:west`, and uses them as query tags. To create this variable, complete the following steps:

1. Open your dashboard and go to **Dashboard settings**.
2. Click **Variables** under **Settings** in the sidebar menu.
3. Click **Add variable**.
4. Select the **Ad-hoc filters** variable type from the dropdown menu.
5. Enter [general options](/docs/grafana/latest/dashboards/variables/add-template-variables/#enter-general-options).
6. Select `Datadog` as the data source.

> Note
>
> Ad-hoc filters are only supported with the **metric** query types query, raw query or arithmetic.

Ad hoc filters are one of the most complex and flexible variable options available. Instead of a regular list of variable options, this variable allows you to build a dashboard-wide ad hoc query. Filters you apply in this manner are applied to all panels on the dashboard.
