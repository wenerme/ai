---
title: "Install and upgrade the Azure Cosmos DB data source | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Azure Cosmos DB data source plugin across Grafana deployment environments."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Azure Cosmos DB data source

This document covers how to install, upgrade, and verify the Azure Cosmos DB data source plugin across different Grafana deployment environments. After you install the plugin, refer to [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before you install the plugin:

Expand table

| Requirement         | Details                                                                                                                                                                                              |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-azurecosmosdb-datasource`. The Grafana Cloud Free plan doesn’t include Enterprise plugins. |
| **Grafana version** | Grafana v11.0.0 or later.                                                                                                                                                                            |
| **Role**            | The organization administrator role. Only administrators can install plugins and add data sources.                                                                                                   |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin archive.                               |

## Activate the Enterprise plugin

The Azure Cosmos DB data source is a Grafana Enterprise plugin. Before you can install it, the plugin must be licensed and activated for your environment. If the plugin isn’t activated, the **Install** button doesn’t appear, and **Save &amp; test** returns a generic `Plugin health check failed` error.

### Grafana Cloud

To confirm the plugin is available on Grafana Cloud:

1. Go to [https://grafana.com/orgs](/orgs) and sign in.
2. Select your organization and open the **Plugins** tab.
3. If the plugin isn’t listed, confirm your Cloud plan is Pro or Advanced, and contact your Grafana account team to add it.

### Self-managed Grafana Enterprise

To activate the plugin on self-managed Grafana Enterprise:

1. Confirm your Grafana Enterprise license includes the plugin.
2. Provide the license using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a path to a license file. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
3. Restart Grafana and confirm the license is active under **Administration** &gt; **General** &gt; **Stats and license**.

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

To install the plugin on Grafana Cloud:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Azure Cosmos DB**.
3. Click **Install**.

### Self-managed Grafana (CLI)

To install the plugin with the Grafana CLI, run the following command and then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-azurecosmosdb-datasource
```

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable to install the plugin when the container starts:

Bash [Copy code to clipboard] Copy

```bash
GF_INSTALL_PLUGINS=grafana-azurecosmosdb-datasource
```

Because this is an Enterprise plugin, self-managed containers must also provide a Grafana Enterprise license using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable.

### Kubernetes

Add the plugin to the `GF_INSTALL_PLUGINS` environment variable or your Helm chart values. If you don’t control the Helm chart, use an init container to download and extract the plugin into the plugins volume. Provide your Grafana Enterprise license using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a mounted license file.

### Air-gapped (offline) installation

To install the plugin in an environment without internet access:

1. Download the signed plugin archive on a machine with internet access.
2. Transfer the archive to the Grafana server.
3. Extract it into the Grafana plugins directory and set the correct ownership.
4. Restart Grafana.

The Azure Cosmos DB plugin is signed by Grafana Labs, so Grafana verifies its signature at startup. Don’t enable `allow_loading_unsigned_plugins`, and don’t modify the plugin’s files, because either action invalidates the signature and prevents the plugin from loading.

## Verify the installation

To verify the installation:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Azure Cosmos DB**.
3. Confirm the plugin shows a status of **Installed**.

## Upgrade the plugin

> Note
>
> On Grafana Cloud, the Azure Cosmos DB plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update the plugin manually.

To upgrade the plugin on self-managed Grafana, update it with the Grafana CLI and restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins update grafana-azurecosmosdb-datasource
```

To install a specific version with the Grafana CLI, pass the version as an argument, then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-azurecosmosdb-datasource 0.2.2
```

When you use the `GF_INSTALL_PLUGINS` environment variable, append the version to the plugin ID with an `@`, for example `grafana-azurecosmosdb-datasource@0.2.2`.

## Uninstall the plugin

To remove the plugin on self-managed Grafana, run the following command and restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-azurecosmosdb-datasource
```

For Docker and Kubernetes, remove the plugin ID from `GF_INSTALL_PLUGINS` and redeploy. Existing data source configurations are preserved in the Grafana database but stop working until you reinstall the plugin.

## Next steps

- [Configure the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/configure/)
- [Troubleshoot the Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/troubleshooting/)
