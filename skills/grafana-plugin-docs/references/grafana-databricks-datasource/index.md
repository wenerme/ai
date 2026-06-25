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

## Get started

The following documents will help you get started with the Databricks data source:

- [Configure the Databricks data source](/docs/plugins/grafana-databricks-datasource/latest/configure/)
- [Databricks query editor](/docs/plugins/grafana-databricks-datasource/latest/query-editor/) to create and edit queries
- [Template variables](/docs/plugins/grafana-databricks-datasource/latest/template-variables/)
- [Troubleshoot](/docs/plugins/grafana-databricks-datasource/latest/troubleshoot/)

## Additional features

After you have configured the Databricks data source, you can:

- Add [Annotations](/docs/plugins/grafana-databricks-datasource/latest/annotations/) to overlay Databricks events on your graphs.
- Configure and use [Templates and variables](/docs/plugins/grafana-databricks-datasource/latest/template-variables/) for dynamic dashboards.
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up [Alerting](/docs/grafana/latest/alerting/) to monitor your Databricks data.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.
