---
title: "Datadog template variables | Grafana Enterprise Plugins documentation"
description: "This document describes using templates and variables with Datadog"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Datadog template variables

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana lists these variables in drop-down lists at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as template variables.

For an introduction to templates and variables, refer to the following topics:

- [Variables](https://grafana.com/docs/grafana/latest/dashboards/variables/)
- [Templates](https://grafana.com/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/)

To add a Datadog query variable, refer to [Add a query variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable). Set **Select variable type** to **Query**, select your Datadog data source, and enter one of the following queries in the **Query** field:

Expand table

| Query               | Description                                                                                                                                            |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `all-metrics`       | Returns available metrics. The list is limited by the data source **Response Size** setting. The default is `100`.                                     |
| `all-tags`          | Returns tags as `key:value` pairs. The maximum is `1000`.                                                                                              |
| `all-hosts`         | Returns host names. The list is limited by the data source **Response Size** setting.                                                                  |
| `[metric]:all-tags` | Returns tags associated with a metric, as `key:value` pairs. For example, `datadog.agent.running:all-tags`. Limited by **Response Size**.              |
| `<keyword>`         | Returns tags that match the search keyword, as `key:value` pairs. Use this for a tag key or custom tag group, such as `region` or `subscription_name`. |
| `*`                 | Legacy alias for `all-metrics`.                                                                                                                        |
| `tag`               | Legacy alias for `all-tags`.                                                                                                                           |
| `scope`             | Legacy alias for `all-tags`.                                                                                                                           |

After you create a variable, use it in Datadog queries with `$variable` or `${variable}` syntax. For more information, refer to [Variable syntax](https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/).

- If the variable lists host names from `all-hosts`, filter with `host:$host`.
- If the variable lists full tags from `all-tags` or a keyword query, filter with `$tag` (for example, `avg:system.cpu.user{$region}`).

## Examples

The following examples show how to create variables and use them in queries.

### Filter panels by host

Create a drop-down that filters every panel by host:

1. In **Dashboard settings** &gt; **Variables**, click **Add variable**.
2. Set **Select variable type** to **Query** and select your Datadog data source.
3. In the **Query** field, enter `all-hosts`.
4. Name the variable `host` and click **Apply**.

Use the variable as a tag filter. For example, in a **Raw Query**, enter `avg:system.cpu.user{host:$host}`. In a **Query** type query, add `host:$host` in **From**. When you select a host from the drop-down, the panel updates to show only that host.

### List the tags for a metric

Create a variable whose values are the tags associated with a specific metric:

1. Add a **Query** variable that uses your Datadog data source.
2. In the **Query** field, enter `<metric>:all-tags`, such as `system.cpu.user:all-tags`.
3. Name the variable and click **Apply**.

The variable’s drop-down lists tags reported for that metric, such as `host:web-01` or `env:prod`. Use a selected value as a filter, for example `avg:system.cpu.user{$tag}` in a **Raw Query**.

## Ad hoc filters

The [**Ad hoc filters**](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters) variable type is included with Grafana. With a Datadog data source, selected `key:value` tag pairs are applied to **Query** type metric queries (the visual builder **From** tags). To create this variable, complete the following steps:

1. Open your dashboard and go to **Dashboard settings**.
2. Click **Variables**.
3. Click **Add variable**.
4. Set **Select variable type** to **Ad hoc filters**.
5. Enter [general options](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#enter-general-options).
6. Select your Datadog data source.

> Note
>
> **Ad hoc filters** apply to the **Query** metric query type. An **Arithmetic** query also inherits these filters through the **Query** queries it references. Filters aren’t applied directly to **Raw Query**, Logs, RUM, APM Spans, Monitor, Events, or SLO queries.

Instead of a fixed list of values, this variable lets dashboard users add and remove tag filters. Filters you apply this way affect every **Query** type panel that uses that Datadog data source on the dashboard.
