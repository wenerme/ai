---
title: "Drone CI data source | Grafana Enterprise Plugins documentation"
description: "Use the Drone data source to query repositories and builds from your Drone CI instance in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Drone CI data source

> Note
>
> Drone data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

The Drone data source plugin lets you retrieve repository and build data from your Drone continuous integration (CI) instance and visualize it in Grafana. Use it to track build activity, monitor repository health, and correlate CI events with other data on your dashboards.

> Note
>
> The Drone data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install the Drone data source](/docs/plugins/grafana-drone-datasource/latest/install/).

## Requirements

To use this data source, you need:

- A working Drone instance and a Drone API token.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- Grafana 10.3.3 or later.

## Version compatibility

Expand table

| Plugin version | Minimum Grafana version |
|----------------|-------------------------|
| 0.1.x          | 10.3.3                  |

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | No        |
| Annotations | Yes       |

## Get started

The following documents help you set up and use the Drone data source:

- [Install the Drone data source](/docs/plugins/grafana-drone-datasource/latest/install/)
- [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/)
- [Drone query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/)
- [Drone template variables](/docs/plugins/grafana-drone-datasource/latest/template-variables/)
- [Drone annotations](/docs/plugins/grafana-drone-datasource/latest/annotations/)
- [Troubleshooting](/docs/plugins/grafana-drone-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Add [annotations](/docs/plugins/grafana-drone-datasource/latest/annotations/) to overlay Drone events on your graphs.

## Pre-built dashboards

The plugin includes a pre-built dashboard that you can import to get started quickly. The dashboard has a repository variable and visualizes stats for the selected repository. It showcases the plugin’s functionality, so import it and adapt it to your needs.

To import the pre-built dashboard:

1. Click **Connections** in the left-side menu.
2. Under **Connections**, click **Data sources**.
3. Select your Drone data source.
4. Select the **Dashboards** tab.
5. Click **Import** next to the dashboard you want to use.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Additional resources

- [Drone documentation](https://docs.drone.io/)
- [Grafana community forum](https://community.grafana.com/)
