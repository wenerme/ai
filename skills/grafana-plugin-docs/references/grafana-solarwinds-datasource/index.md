---
title: "SolarWinds data source | Grafana Enterprise Plugins documentation"
description: "Use the SolarWinds data source to query and visualize SolarWinds infrastructure and network monitoring data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds data source

The SolarWinds data source plugin allows you to query and visualize data from SolarWinds in Grafana. SolarWinds is a network and infrastructure monitoring platform that provides tools to monitor network performance, server health, and application availability. Use this data source to query key infrastructure metrics, such as CPU load, memory usage, and active alerts, directly within Grafana dashboards.

> Note
>
> SolarWinds data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

> Note
>
> The SolarWinds data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/install/).

## Supported SolarWinds products

The SolarWinds data source connects to the SolarWinds Information Service (SWIS) API and queries data using SolarWinds Query Language (SWQL). It works with products that expose the SWIS API, such as the SolarWinds Platform (formerly Orion), including modules like Network Performance Monitor (NPM) and Server &amp; Application Monitor (SAM).

The data source doesn’t support SolarWinds products that don’t expose the SWIS API. For example, the SolarWinds Database Performance Analyzer (DPA) isn’t supported. To query DPA, use its own API with a general-purpose data source such as the [Infinity data source](/grafana/plugins/yesoreyeram-infinity-datasource/).

## Requirements

To use this data source, you need:

- A SolarWinds instance with a username and password that can access the SolarWinds Information Service API.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- Grafana 11.6.7 or later.

## Version compatibility

Expand table

| Plugin version | Minimum Grafana version |
|----------------|-------------------------|
| 0.2.x          | 11.6.7                  |

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Get started

The following documents help you set up and use the SolarWinds data source:

- [Install the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/install/)
- [Configure the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/)
- [SolarWinds query editor](/docs/plugins/grafana-solarwinds-datasource/latest/query-editor/)
- [SolarWinds template variables](/docs/plugins/grafana-solarwinds-datasource/latest/template-variables/)
- [SolarWinds alerting](/docs/plugins/grafana-solarwinds-datasource/latest/alerting/)
- [SolarWinds annotations](/docs/plugins/grafana-solarwinds-datasource/latest/annotations/)
- [Troubleshooting](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/)

## Pre-built dashboards

The plugin includes pre-built dashboards that you can import to get started quickly:

Expand table

| Dashboard             | Description                                                                                                 |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| **SolarWinds Top 10** | Top 10 volumes by space used, and top 10 nodes by percent memory used, CPU load, and current response time. |
| **SolarWinds Alerts** | Active alerts by severity and a table of active alerts.                                                     |

To import a pre-built dashboard:

1. Click **Connections** in the left-side menu.
2. Under **Connections**, click **Data sources**.
3. Select your SolarWinds data source.
4. Select the **Dashboards** tab.
5. Click **Import** next to the dashboard you want to use.

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [alerting](/docs/plugins/grafana-solarwinds-datasource/latest/alerting/) rules based on SolarWinds data.
- Add [annotations](/docs/plugins/grafana-solarwinds-datasource/latest/annotations/) to overlay SolarWinds events on your graphs.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Additional resources

- [Use SolarWinds Query Language (SWQL)](https://support.solarwinds.com/SuccessCenter/s/article/Use-SolarWinds-Query-Language-SWQL?language=en_US)
- [SWQL built-in functions](https://github.com/solarwinds/OrionSDK/wiki/SWQL-Functions)
- [Grafana community forum](https://community.grafana.com/)
