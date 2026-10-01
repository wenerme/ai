---
title: "Install the Looker data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Looker data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the Looker data source plugin

This document covers how to install, upgrade, and verify the Looker data source plugin across different Grafana deployment environments. After you install the plugin, refer to [Configure the Looker data source](/docs/plugins/grafana-looker-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                                                |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-looker-datasource`. Free and Starter plans don’t include Enterprise plugins. |
| **Grafana version** | Grafana `11.6.7` or later.                                                                                                                                                             |
| **Role**            | The `Organization administrator` role. Only account administrators can install the plugin and configure the data source.                                                               |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin archive.                 |

## Activate the Enterprise plugin

The Looker data source is a Grafana Enterprise plugin. Before you can install it, the plugin must be licensed and activated for your environment. If the plugin isn’t activated, the **Install** button doesn’t appear, and **Save &amp; test** returns a generic `Plugin health check failed` error.

### Grafana Cloud

To confirm the plugin is available on Grafana Cloud:

1. Go to the [Grafana Cloud portal](/orgs) and sign in.
2. Select your organization and open the **Plugins** tab to verify the plugin is activated.
3. If it isn’t listed, confirm your Cloud plan is Pro or Advanced, and contact your Grafana account team to add it.

### Self-managed Grafana Enterprise

To activate the plugin on self-managed Grafana Enterprise:

1. Confirm your Grafana Enterprise license includes the plugin.
2. Provide the license using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a path to a license file. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
3. Restart Grafana and confirm the license is active under **Administration** &gt; **General** &gt; **Stats and license**.

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

To install on Grafana Cloud:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Looker** and click **Install**.

### Self-managed Grafana (CLI)

Install the plugin with the Grafana CLI:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-looker-datasource
```

Restart Grafana after installation.

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable and provide the Enterprise license with `GF_ENTERPRISE_LICENSE_TEXT`:

Bash [Copy code to clipboard] Copy

```bash
docker run -d \
  -p 3000:3000 \
  -e "GF_INSTALL_PLUGINS=grafana-looker-datasource" \
  -e "GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE_TEXT>" \
  grafana/grafana-enterprise
```

### Kubernetes

Add the plugin to your Helm values or the `GF_INSTALL_PLUGINS` environment variable. If you don’t control the Helm chart, use an init container to download and extract the plugin into the plugins volume.

### Air-gapped (offline) installation

To install without internet access on the Grafana server:

1. Download the plugin archive on a machine with internet access from the [plugin catalog](/grafana/plugins/grafana-looker-datasource/).
2. Transfer the archive to the Grafana server and extract it into the plugins directory.
3. Confirm the extracted folder is named `grafana-looker-datasource` and contains the complete, unmodified archive contents.
4. Set ownership on the extracted files and restart Grafana.

Grafana signs the Looker plugin, so it loads without extra configuration. If Grafana reports a signature error after a manual extraction, the cause is usually an incomplete extraction or a renamed folder. Re-download the archive from the catalog, confirm the folder is named `grafana-looker-datasource`, and extract the complete, unmodified contents. Don’t enable `allow_loading_unsigned_plugins`, because Grafana signs the plugin and a signature error indicates a packaging problem to fix rather than a plugin to force-load.

## Verify the installation

To confirm the plugin installed successfully:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Looker** and verify it shows a status of **Installed**.

## Upgrade the plugin

> Note
>
> On Grafana Cloud, Grafana manages the Looker plugin, so it updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the platform provider controls the plugin version, which can lag behind the latest release.

To upgrade on self-managed Grafana:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Looker** and open its page.
3. If an update is available, click **Update**, then restart Grafana.

To install a specific version with the CLI, append the version to the plugin ID:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-looker-datasource <VERSION>
```

To roll back to a previous version, install the earlier version with the CLI and restart Grafana. Existing data source configurations are preserved.

## Uninstall the plugin

To remove the plugin with the Grafana CLI:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-looker-datasource
```

Restart Grafana after removal. For Docker and Kubernetes, remove the plugin ID from `GF_INSTALL_PLUGINS` or the Helm values, and redeploy. Existing data source configurations remain in the Grafana database but become non-functional until you reinstall the plugin.

## Troubleshoot installation issues

The following are common installation issues and their causes:

- **Plugin doesn’t appear in the catalog.** The plugin isn’t activated for your license or Cloud plan. Refer to [Activate the Enterprise plugin](#activate-the-enterprise-plugin).
- **Install button is missing.** You don’t have the `Organization administrator` role, or the plugin isn’t licensed.
- **License key errors.** The Enterprise license doesn’t include `grafana-looker-datasource`. Contact your Grafana account team.
- **Signature errors after a manual extraction.** Grafana signs the plugin, so this usually means an incomplete extraction or a renamed folder. Confirm the folder is named `grafana-looker-datasource` and contains the complete archive contents.

For more help, refer to [Troubleshoot Looker data source issues](/docs/plugins/grafana-looker-datasource/latest/troubleshooting/).
