---
title: "Catchpoint data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize Catchpoint Tests, RUM, and SLO data in Grafana with the Catchpoint data source plugin."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint data source

The Catchpoint data source plugin lets you query and visualize Catchpoint `Tests`, `RUM`, and `SLO` data in Grafana. Use it to bring synthetic monitoring, real user monitoring, and service level objective data into your dashboards alongside the rest of your observability data.

> Note
>
> The Catchpoint data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

> Note
>
> This plugin is in public preview. Refer to the [Grafana Labs release life cycle documentation](/docs/release-life-cycle/) for more details. If you notice an issue or have a feature request, create a support ticket through your Grafana Enterprise support channel.

## Supported features

The Catchpoint data source supports the following Grafana features:

Expand table

| Feature            | Supported |
|--------------------|-----------|
| Metrics            | Yes       |
| Logs               | No        |
| Traces             | No        |
| Alerting           | Yes       |
| Annotations        | Yes       |
| Template variables | Yes       |

## Requirements

This plugin has the following requirements:

- A Catchpoint account with a REST API v2 key.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.
- Grafana version 11.6.7 or later.

## Install the plugin

To install the data source, refer to [Install the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/install/).

## Get started

The following pages help you get started with the Catchpoint data source:

- [Install the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/install/)
- [Configure the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/)
- [Catchpoint query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-catchpoint-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-catchpoint-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-catchpoint-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alert rules](/docs/plugins/grafana-catchpoint-datasource/latest/alerting/) on Catchpoint queries.
- Add [annotations](/docs/plugins/grafana-catchpoint-datasource/latest/annotations/) to mark events on your panels.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Catchpoint documentation](https://docs.catchpoint.com/)
- [Catchpoint website](https://www.catchpoint.com/)
- [Grafana community forum](https://community.grafana.com/)
