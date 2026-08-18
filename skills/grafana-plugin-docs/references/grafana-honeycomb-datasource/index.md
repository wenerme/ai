---
title: "Honeycomb data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize Honeycomb metrics and link to Honeycomb traces from Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Honeycomb data source

The Honeycomb data source for Grafana lets you query and visualize Honeycomb metrics and open related Honeycomb queries for further exploration, including linking into the Honeycomb UI for traces and deeper analysis.

> Note
>
> The Honeycomb data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install and upgrade the Honeycomb data source plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/).

## Supported features

Expand table

| Feature     | Supported                                     |
|-------------|-----------------------------------------------|
| Metrics     | Yes                                           |
| Logs        | No                                            |
| Traces      | No (you can open queries in the Honeycomb UI) |
| Alerting    | Yes                                           |
| Annotations | Yes                                           |

## Requirements

The Honeycomb data source has the following requirements:

- Grafana version 11.6.7 or later.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- An active Honeycomb Enterprise team.
- To query SLO report data (budget remaining and compliance), a [Honeycomb Enterprise plan](https://docs.honeycomb.io/api/slos/#get-an-slo).

## Known limitations

The Honeycomb data source has the following limitations:

- Changes to the Honeycomb API may occasionally affect data source behavior.
- You can’t use the Grafana **Ad hoc filters** feature with this data source.
- Due to API limitations, the variable editor can only return the first 1000 unique values for a selected column.
- By default, the data source queries the last 7 days of data due to Honeycomb API limitations. You can adjust this with the **Time Window (days)** [advanced setting](/docs/plugins/grafana-honeycomb-datasource/latest/configure/#advanced-settings).
- The use of `__all__` as the dataset slug to list all columns isn’t supported for classic environments, per Honeycomb documentation.

## Get started

The following documents help you get started:

- [Install and upgrade the Honeycomb data source plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/)
- [Configure the Honeycomb data source](/docs/plugins/grafana-honeycomb-datasource/latest/configure/)
- [Honeycomb query editor](/docs/plugins/grafana-honeycomb-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-honeycomb-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-honeycomb-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-honeycomb-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-honeycomb-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Use the **Query with Assistant** button in the query editor for AI-powered help building and refining Honeycomb queries. Refer to [Grafana Assistant](/docs/grafana/latest/ai/assistant/).
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-honeycomb-datasource/latest/alerting/) rules using any Honeycomb query type.
- Add [annotations](/docs/plugins/grafana-honeycomb-datasource/latest/annotations/) that overlay event markers on panels.

## Pre-built dashboards

The Honeycomb data source includes a pre-built **Honeycomb (demo)** dashboard to help you get started.

To find and import the available dashboards:

1. Go to **Connections** &gt; **Data sources**.
2. Select the **Honeycomb** data source.
3. Select the **Dashboards** tab to see available pre-built dashboards.
4. Click **Import** next to the dashboard you want to add.

After importing, your dashboards appear in the **Dashboards** menu.

For more information, refer to [Import a dashboard](/docs/grafana/latest/dashboards/build-dashboards/build-dashboards/#import-a-dashboard).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Honeycomb plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-honeycomb-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Related resources

- [Official Honeycomb API documentation](https://docs.honeycomb.io/api/)
- [Grafana community forum](https://community.grafana.com/)
