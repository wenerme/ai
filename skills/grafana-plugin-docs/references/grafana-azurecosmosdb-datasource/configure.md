---
title: "Configure the Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration options for the Azure Cosmos DB data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Azure Cosmos DB data source

To install a data source, see [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins). For general information on adding a data source see [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

Only users with the organization `administrator` role can add data sources. Administrators can also configure the data source via YAML with [Grafana’s provisioning system](/docs/grafana/latest/administration/provisioning/).

To install the Azure Cosmos DB plugin, see [Installation](/grafana/plugins/grafana-azurecosmosdb-datasource/?tab=installation) on the Azure Cosmos DB plugin page.

You will need your account endpoint and your account key. To find your account endpoint and key refer to [Secure access to data in Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/secure-access-to-data?tabs=using-primary-key).

## Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including and all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here are some provisioning examples for this data source using the account endpoint and account key to authenticate:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Cosmos DB
    type: grafana-azurecosmosdb-datasource
    jsonData:
      accountEndpoint: your_endpoint
    secureJsonData:
      accountKey: your_key
```
