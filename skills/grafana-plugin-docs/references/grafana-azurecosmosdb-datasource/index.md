---
title: "Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "Query and visualize Azure Cosmos DB for NoSQL data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB data source

The Azure Cosmos DB data source plugin lets you query and visualize Azure Cosmos DB for NoSQL data in Grafana. Azure Cosmos DB is Microsoft’s globally distributed, multi-model database service. Use this data source to build dashboards, explore your data with queries, and alert on data stored in your Azure Cosmos DB for NoSQL containers.

> Note
>
> The Azure Cosmos DB data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the features supported by the Azure Cosmos DB data source:

Expand table

| Feature                           | Supported |
|-----------------------------------|-----------|
| Metrics                           | Yes       |
| Logs                              | No        |
| Traces                            | No        |
| Alerting                          | Yes       |
| Annotations                       | No        |
| Private data source connect (PDC) | Yes       |

## Requirements

The Azure Cosmos DB data source has the following requirements:

- An Azure Cosmos DB for NoSQL account, including its account endpoint and account key.
- Grafana v11.0.0 or later.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Enterprise plugins aren’t included in the Grafana Cloud Free plan. Contracted Cloud customers should refer to their agreement.

## Compatibility requirements

There are no compatibility requirements for the Azure Cosmos DB plugin.

## Known limitations

The Azure Cosmos DB data source has the following known limitations:

- The plugin only supports Azure Cosmos DB for NoSQL. Other Azure Cosmos DB APIs aren’t supported with this plugin.
- Multi-partition queries don’t work with the `TOP`, `ORDER BY`, `OFFSET`, `LIMIT`, `Aggregates`, `DISTINCT`, and `GROUP BY` keywords. To use these keywords, enter a value in the **PartitionKey** field to run a single-partition query.
- The only authentication method the plugin supports is an account endpoint with an account key.

## Get started

The following documents help you get started with the Azure Cosmos DB data source:

- [Install the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/install/)
- [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/)
- [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/query-editor/)
- [Azure Cosmos DB templates and variables](/docs/plugins/grafana-azurecosmosdb-datasource/latest/template-variables/)
- [Azure Cosmos DB alerting](/docs/plugins/grafana-azurecosmosdb-datasource/latest/alerting/)
- [Troubleshoot the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/)

## Additional features

After you configure the Azure Cosmos DB data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-azurecosmosdb-datasource/latest/alerting/) rules on your Azure Cosmos DB data.
- Connect to Azure Cosmos DB accounts on private networks with [Private data source connect (PDC)](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/#private-data-source-connect-pdc).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Azure Cosmos DB plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update the plugin manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/#version-and-upgrade-guidance).
