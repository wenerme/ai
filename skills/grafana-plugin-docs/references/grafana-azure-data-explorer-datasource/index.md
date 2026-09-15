---
title: "Azure Data Explorer data source | Grafana Plugins documentation"
description: "The Azure Data Explorer data source allows you to query and visualize Azure Data Explorer data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Data Explorer data source

The Azure Data Explorer data source allows you to query and visualize data from [Azure Data Explorer](https://learn.microsoft.com/en-us/azure/data-explorer/), a fast, fully managed data analytics service for real-time analysis of large volumes of data. Use the visual query builder or write Kusto Query Language (KQL) to build dashboards, explore logs and traces, and set up alerts.

> Note
>
> The Azure Data Explorer data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature                | Supported | Description                                                   |
|------------------------|-----------|---------------------------------------------------------------|
| **Metrics**            | Yes       | Query numeric data and visualize it as time series or tables. |
| **Logs**               | Yes       | Query and visualize log data.                                 |
| **Traces**             | Yes       | Format query results for the built-in trace visualization.    |
| **Alerting**           | Yes       | Create alert rules based on Azure Data Explorer queries.      |
| **Annotations**        | Yes       | Overlay events from Azure Data Explorer on your dashboards.   |
| **Template variables** | Yes       | Create dynamic dashboards with query-based variables.         |

## Requirements

Before you use the Azure Data Explorer data source, verify that you meet the following requirements:

- Grafana 11.6.11 or later.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- An Azure Data Explorer cluster and database, and a Microsoft Entra identity with viewer access to that database.

## Get started

The following documents help you get started with the Azure Data Explorer data source:

- [Install and upgrade the Azure Data Explorer data source plugin](/docs/plugins/grafana-azure-data-explorer-datasource/latest/install/) - Install, license, and upgrade the Enterprise plugin.
- [Configure the Azure Data Explorer data source](/docs/plugins/grafana-azure-data-explorer-datasource/latest/configure/) - Set up the connection and authentication.
- [Azure Data Explorer query editor](/docs/plugins/grafana-azure-data-explorer-datasource/latest/query-editor/) - Build queries with the visual builder, KQL, or the OpenAI query generator.
- [Template variables](/docs/plugins/grafana-azure-data-explorer-datasource/latest/template-variables/) - Create dynamic dashboards with Azure Data Explorer variables.
- [Annotations](/docs/plugins/grafana-azure-data-explorer-datasource/latest/annotations/) - Overlay Azure Data Explorer events on your graphs.
- [Alerting](/docs/plugins/grafana-azure-data-explorer-datasource/latest/alerting/) - Create alert rules from Azure Data Explorer queries.
- [Troubleshooting](/docs/plugins/grafana-azure-data-explorer-datasource/latest/troubleshooting/) - Solve common connection, authentication, and query errors.

## Additional features

After you configure the Azure Data Explorer data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/grafana/latest/alerting/) rules based on your Azure Data Explorer data.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Azure Data Explorer plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-azure-data-explorer-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Related resources

- [Azure Data Explorer documentation](https://learn.microsoft.com/en-us/azure/data-explorer/)
- [Kusto Query Language (KQL) overview](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)
- [`azure-data-explorer-datasource` on GitHub](https://github.com/grafana/azure-data-explorer-datasource) - Source code, issues, and CHANGELOG.
- [Grafana community forum](https://community.grafana.com/)
