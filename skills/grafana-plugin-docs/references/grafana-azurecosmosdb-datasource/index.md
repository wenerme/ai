---
title: "Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "This document introduces the Azure Cosmos DB data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Cosmos DB data source

The Cosmos DB data source plugin allows you to query and visualize Cosmos DB data in Grafana.

- [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/)
- [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/editor/)
- [Azure Cosmos DB templates and variables](/docs/plugins/grafana-azurecosmosdb-datasource/latest/templates-and-variables/)

## Requirements

The Azure Cosmos DB data source has the following requirements:

- An Azure Cosmos DB instance.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Compatibility requirements

There are no compatibility requirements for the Azure Cosmos DB plugin.

## Known limitations

- The plugin only supports Azure Cosmos DB for NoSQL. Other Azure Cosmos DB APIs are not supported with this plugin.
- Multi partition queries do not work with `TOP` `ORDER BY` `OFFSET` `LIMIT` `Aggregates` `DISTINCT` `GROUP BY`.
- For now, the only auth type this plugin supports is an account endpoint with an account key.

## Get the most out of the Azure Cosmos DB plugin

After installing and configuring Azure Cosmos DB you can:

- Add [Transformations](/docs/grafana/latest/panels/transformations/)
- Set up [Alerting](/docs/grafana/latest/alerting/)
