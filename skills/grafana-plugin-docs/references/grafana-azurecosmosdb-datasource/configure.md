---
title: "Configure the Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "Configure the Azure Cosmos DB data source in Grafana, including authentication and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Azure Cosmos DB data source

This document explains how to configure the Azure Cosmos DB data source.

To install the plugin, refer to [Install the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/install/).

## Before you begin

Before you configure the data source, ensure you have:

- **License:** A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes the plugin. The Azure Cosmos DB data source is an Enterprise plugin and isn’t included in the Grafana Cloud Free plan.
- **Grafana permissions:** Only users with the organization administrator role can add data sources.
- **Installed plugin:** The Azure Cosmos DB plugin. Refer to [Install the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/install/).
- **Azure Cosmos DB account:** An Azure Cosmos DB for NoSQL account.
- **Credentials:** Your account endpoint and account key. To find them, refer to [Secure access to data in Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/secure-access-to-data?tabs=using-primary-key).

## Key concepts

If you’re new to Azure Cosmos DB, these terms are used throughout the configuration:

Expand table

| Term                 | Description                                                                                             |
|----------------------|---------------------------------------------------------------------------------------------------------|
| **Account endpoint** | The URI of your Azure Cosmos DB account, in the form `https://<account-name>.documents.azure.com:443/`. |
| **Account key**      | A primary or secondary key that grants full access to the account’s data. Treat it as a secret.         |

## Add the data source

To add the Azure Cosmos DB data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Azure Cosmos DB` in the search bar.
4. Select **Azure Cosmos DB**.
5. Click **Add new data source**.

## Configure settings

Configure the following account settings:

Expand table

| Setting              | Description                                                                                             |
|----------------------|---------------------------------------------------------------------------------------------------------|
| **Account Endpoint** | The URI of your Azure Cosmos DB account, for example `https://<account-name>.documents.azure.com:443/`. |
| **Account Key**      | The account key used to authenticate requests. Stored as a secret and never returned to the browser.    |

## Authentication

The Azure Cosmos DB data source authenticates with an account endpoint and an account key. This is currently the only supported authentication method.

To authenticate the data source:

1. In **Account Endpoint**, enter your Azure Cosmos DB account URI.
2. In **Account Key**, enter your primary or secondary account key.
3. Click **Save &amp; test**.

## Private data source connect (PDC)

Private data source connect (PDC) lets Grafana Cloud query an Azure Cosmos DB account that’s only reachable from a private network, such as an Azure virtual network or an on-premises environment, without exposing it to the public internet. Because the Azure Cosmos DB data source runs queries in the backend, it supports PDC.

To use PDC with the data source:

1. Set up a PDC connection for your Grafana Cloud stack. Refer to [Configure Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).
2. On the Azure Cosmos DB data source configuration page, select your PDC connection from the **Private data source connect** list.
3. Click **Save &amp; test**.

For more information, refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

> Note
>
> On self-managed Grafana, you can route the connection through a secure socks proxy instead. Enable the **Secure Socks Proxy** option on the data source configuration page, then refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

## Verify the connection

Click **Save &amp; test** to verify the configuration. When the connection succeeds, Grafana displays a **Data source is working** message.

If the test fails, refer to [Troubleshoot the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/).

## Provision the data source

You can define and configure the data source in YAML files as part of the Grafana provisioning system. Only users with the organization administrator role can add data sources. For more information about provisioning and available settings, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

### Provision with YAML

The following example provisions the data source using an account endpoint and account key:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure Cosmos DB
    type: grafana-azurecosmosdb-datasource
    jsonData:
      accountEndpoint: <ACCOUNT_ENDPOINT>
    secureJsonData:
      accountKey: <ACCOUNT_KEY>
```

Replace `<ACCOUNT_ENDPOINT>` with your account URI and `<ACCOUNT_KEY>` with your primary or secondary account key.

### Provision with Terraform

You can provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azure_cosmosdb" {
  type = "grafana-azurecosmosdb-datasource"
  name = "Azure Cosmos DB"

  json_data_encoded = jsonencode({
    accountEndpoint = "<ACCOUNT_ENDPOINT>"
  })

  secure_json_data_encoded = jsonencode({
    accountKey = "<ACCOUNT_KEY>"
  })
}
```

Replace `<ACCOUNT_ENDPOINT>` with your account URI and `<ACCOUNT_KEY>` with your primary or secondary account key. Store the account key in a Terraform variable or secret manager rather than in plain text.
