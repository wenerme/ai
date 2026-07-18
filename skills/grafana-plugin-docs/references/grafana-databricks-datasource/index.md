---
title: "Databricks data source for Grafana | Grafana Enterprise Plugins documentation"
description: "This document introduces the Databricks data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Databricks data source

The Databricks data source lets you connect your Databricks data lake to Grafana. You can write SQL queries directly in Grafana, visualize the results in dashboards, and monitor your data in real time.

Watch the following video to learn how to connect Databricks to your Grafana instance and start exploring and visualizing your data.

## Supported Databricks environments

The Databricks data source supports the following Databricks deployment types:

- **Databricks on AWS** - Databricks running on Amazon Web Services infrastructure.
- **Databricks on Azure** - Databricks running on Microsoft Azure infrastructure (Azure Databricks).
- **Databricks on Google Cloud** - Databricks running on Google Cloud Platform infrastructure.

## Requirements

The Databricks data source is a Grafana Enterprise plugin. Before you install and use it, make sure you meet the following requirements:

- Grafana version 11.6.11 or later.
- An active Grafana Enterprise or Grafana Cloud license that includes the Databricks plugin. The plugin must be part of your plan, and the license must not be expired. If the plugin isn’t included, contact your Grafana account team to add it. Refer to [Grafana Enterprise](/docs/grafana/latest/introduction/grafana-enterprise/) for more information.
- The `Organization administrator` role. Only account administrators can install the plugin and configure the data source.

If your license doesn’t include the plugin or has expired, **Save &amp; test** returns a generic `Plugin health check failed` error. Refer to [License and setup errors](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#license-and-setup-errors) for help.

## Get started

The following documents will help you get started with the Databricks data source:

- [Install the Databricks data source](/docs/plugins/grafana-databricks-datasource/latest/install/)
- [Configure the Databricks data source](/docs/plugins/grafana-databricks-datasource/latest/configure/)
- [Databricks query editor](/docs/plugins/grafana-databricks-datasource/latest/query-editor/) to create and edit queries
- [Template variables](/docs/plugins/grafana-databricks-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/)

## Additional features

After you have configured the Databricks data source, you can:

- Add [Annotations](/docs/plugins/grafana-databricks-datasource/latest/annotations/) to overlay Databricks events on your graphs.
- Configure and use [Template variables](/docs/plugins/grafana-databricks-datasource/latest/template-variables/) for dynamic dashboards.
- Display query results in the [Logs](/docs/plugins/grafana-databricks-datasource/latest/logs/) visualization.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- Set up [Alerting](/docs/plugins/grafana-databricks-datasource/latest/alerting/) to monitor your Databricks data.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Databricks plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#version-and-upgrade-guidance).
