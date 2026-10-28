---
title: "Looker data source | Grafana Enterprise Plugins documentation"
description: "Guide for using the Looker data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Looker data source

> Note
>
> The Looker data source is in public preview. Features and behavior can change before the plugin becomes generally available. For more information, refer to the [Grafana Labs release life cycle documentation](https://grafana.com/docs/release-life-cycle/). If you find an issue or have a feature request, open a support ticket through your Grafana Enterprise support channel.

The Looker data source plugin lets you query and visualize data from your Looker instance directly in Grafana dashboards. Run saved Looks or build LookML queries against your models and explores, then combine the results with other data sources in Grafana.

> Note
>
> The Looker data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install the Looker data source plugin](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/install/).

## Supported features

The following table lists the features supported by the Looker data source.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Annotations | Yes       |
| Alerting    | Yes       |
| Logs        | No        |
| Traces      | No        |

## Requirements

The Looker data source has the following requirements:

- Grafana version `11.6.7` or later.
- A [Grafana Cloud Pro or Advanced](https://grafana.com/pricing/) plan or an [activated on-prem Grafana Enterprise license](https://grafana.com/docs/grafana/latest/enterprise/license/activate-license/).
- A Looker instance, plus a client ID and client secret with permission to run queries and read the models you want to visualize. For details, refer to [Looker API authentication](https://cloud.google.com/looker/docs/api-auth).

## Known limitations

The following are current known limitations:

- Referencing template variables inside Looker panel queries isn’t supported, whether you use the builder, the LookML JSON body, or the filter expression. You can still use Looker variables elsewhere in Grafana, such as to repeat panels. Refer to [Looker template variables](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/template-variables/).

## Get started

The following documents help you get started:

- [Install the Looker data source plugin](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/install/)
- [Configure the Looker data source](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/configure/)
- [Looker query editor](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/query-editor/)
- [Looker template variables](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/template-variables/)
- [Looker annotations](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/annotations/)
- [Looker alerting](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/alerting/)
- [Troubleshoot Looker data source issues](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](https://grafana.com/docs/grafana/latest/explore/) to query Looker data without building a dashboard.
- Create [time series](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/time-series/), [table](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/table/), and other [visualizations](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/).
- Apply [transformations](https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to reshape query results.
- Configure [template variables](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/template-variables/) to build dynamic, reusable dashboards.
- Add [annotations](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/annotations/) to overlay Looker events on your graphs.
- Set up [alerting](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/alerting/) on Looker query results.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, Grafana manages the Looker plugin, so it updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Try this first: update the plugin](https://grafana.com/docs/plugins/grafana-looker-datasource/latest/troubleshooting/#try-this-first-update-the-plugin).

## Related resources

- [Looker documentation](https://cloud.google.com/looker/docs)
- [Looker API reference](https://developers.looker.com/api/explorer/4.0/methods/Query/run_inline_query)
- [Looker API authentication](https://cloud.google.com/looker/docs/api-auth)
- [Grafana community forum](https://community.grafana.com/)
