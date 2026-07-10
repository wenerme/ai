---
title: "Datadog template variables | Grafana Enterprise Plugins documentation"
description: "This document describes using templates and variables with Datadog"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog template variables

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana lists these variables in drop-down lists at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as template variables.

For an introduction to templates and variables, refer to the following topics:

- [Variables](/docs/grafana/latest/dashboards/variables/)
- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

To add a new Datadog query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Datadog data source as your data source. The following queries are available:

Expand table

| Query               | Description                                                                                                                                                                    |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `all-metrics`       | Returns the list of available metrics.                                                                                                                                         |
| `all-tags`          | Returns all tags. The maximum is `1000`.                                                                                                                                       |
| `all-hosts`         | Returns all hosts.                                                                                                                                                             |
| `[metric]:all-tags` | Returns all tag values associated with a given metric name. For example, `datadog.agent.running:all-tags` returns all tags associated with the `datadog.agent.running` metric. |
| `<keyword>`         | Returns the tags that match the given search keyword.                                                                                                                          |
| `*`                 | Legacy alias for `all-metrics`.                                                                                                                                                |
| `tag`               | Legacy alias for `all-tags`.                                                                                                                                                   |
| `scope`             | Legacy alias for `all-tags`.                                                                                                                                                   |

For custom tag groups, enter the tag group name in the **Query** field. For example, if your custom tag group name is `subscription_name`, enter `subscription_name`.

After you create a variable, you can add it to your Datadog queries. For more information, refer to [Variable syntax](/docs/grafana/latest/variables/syntax/).

## Examples

The following examples show how to create variables and use them in queries.

### Filter panels by host

Create a drop-down that filters every panel by host:

1. In **Dashboard settings** &gt; **Variables**, click **Add variable**.
2. Set **Select variable type** to **Query** and select your Datadog data source.
3. In the **Query** field, enter `all-hosts`.
4. Name the variable `host` and click **Apply**.

Use the variable in a query by adding it as a tag filter. For example, in a **Raw query**, enter `avg:system.cpu.user{host:$host}`. When you select a host from the drop-down, the panel updates to show only that host.

### List the tags for a metric

Create a variable whose values are the tags associated with a specific metric:

1. Add a **Query** variable that uses your Datadog data source.
2. In the **Query** field, enter `<metric>:all-tags`, such as `system.cpu.user:all-tags`.
3. Name the variable and click **Apply**.

The variable’s drop-down lists the tag values reported for that metric, which you can then use to filter or group your queries.

## Ad hoc filters

The [ad hoc filters](/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters) variable ships with Grafana and can be used with metric Datadog queries. Ad hoc filters let you retrieve all key-value pairs from tags, such as `region:east` or `region:west`, and use them as query tags. To create this variable, complete the following steps:

1. Open your dashboard and go to **Dashboard settings**.
2. Click **Variables** under **Settings** in the sidebar menu.
3. Click **Add variable**.
4. Select the **Ad hoc filters** variable type from the drop-down menu.
5. Enter [general options](/docs/grafana/latest/dashboards/variables/add-template-variables/#enter-general-options).
6. Select `Datadog` as the data source.

> Note
>
> Ad hoc filters are only supported with the metric query types: query, raw query, or arithmetic.

Ad hoc filters are one of the most complex and flexible variable options available. Instead of a regular list of variable options, this variable lets you build a dashboard-wide ad hoc query. Filters you apply in this manner are applied to all panels on the dashboard.
