---
title: "Install and upgrade the Jenkins data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Jenkins data source plugin across Grafana deployment environments"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Jenkins data source plugin

This document covers how to install, upgrade, and verify the Jenkins data source plugin across different Grafana deployment environments. After the plugin is installed, refer to the [Jenkins data source overview](/docs/plugins/grafana-jenkins-datasource/latest/) to configure a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                                                 |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-jenkins-datasource`. Free and Starter plans don’t include Enterprise plugins. |
| **Grafana version** | Grafana 10.4.8 or later.                                                                                                                                                                |
| **Role**            | The `Organization administrator` role. Only account administrators can install the plugin and configure the data source.                                                                |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin ZIP.                      |

## Activate the Enterprise plugin

The Jenkins data source is a Grafana Enterprise plugin. Before you can install it, the plugin must be licensed and activated for your environment. If the plugin isn’t activated, the **Install** button doesn’t appear, and **Save &amp; test** returns a generic `Plugin health check failed` error.

### Grafana Cloud

To activate the plugin on Grafana Cloud:

1. Go to [grafana.com/orgs](/orgs) and sign in.
2. Select your organization and open the **Plugins** tab to verify the plugin is activated.
3. If it isn’t listed, confirm your Cloud plan is Pro or Advanced, and contact your Grafana account team to add it.

### Self-managed Grafana Enterprise

To activate the plugin on self-managed Grafana Enterprise:

1. Confirm your Grafana Enterprise license includes the plugin.
2. Provide the license using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a license file path. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
3. Restart Grafana and confirm the license is active under **Administration** &gt; **General** &gt; **Stats and license**.

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

To install the plugin on Grafana Cloud:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Jenkins** and click **Install**.

### Self-managed Grafana (CLI)

Use the Grafana CLI to install the plugin, then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-jenkins-datasource
```

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable and provide the Enterprise license with `GF_ENTERPRISE_LICENSE_TEXT`:

Bash [Copy code to clipboard] Copy

```bash
docker run -d \
  -p 3000:3000 \
  -e "GF_INSTALL_PLUGINS=grafana-jenkins-datasource" \
  -e "GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE_TEXT>" \
  grafana/grafana-enterprise
```

### Kubernetes

Add the plugin to your Helm values or the `GF_INSTALL_PLUGINS` environment variable. If you don’t control the Helm chart, use an init container to download and unzip the plugin into the plugins volume. Provide the Enterprise license through the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a mounted license file.

### Air-gapped (offline) installation

To install the plugin without internet access on the Grafana server:

1. Download the plugin ZIP on a machine with internet access from the [plugin catalog](/grafana/plugins/grafana-jenkins-datasource/?tab=installation).
2. Transfer the ZIP to the Grafana server and extract it into the plugins directory.
3. Set ownership of the extracted files to the Grafana service account and restart Grafana.
4. If Grafana reports an unsigned plugin error, allow it with `allow_loading_unsigned_plugins` in `grafana.ini`.

## Verify the installation

To verify that the plugin is installed:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Jenkins** and verify it shows a status of **Installed**.

## Upgrade the plugin

Keep the plugin up-to-date to get the latest features and fixes.

> Note
>
> On Grafana Cloud, the Jenkins plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. In other managed environments, such as Azure Managed Grafana, the plugin version is controlled by the platform provider and can lag behind the latest release.

To upgrade on self-managed Grafana, use the Grafana CLI and restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins update grafana-jenkins-datasource
```

To install a specific version, append the version to the plugin ID:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-jenkins-datasource <VERSION>
```

To roll back on self-managed Grafana, install the previous known-good version using the same command with the earlier version number, then restart Grafana.

## Uninstall the plugin

To remove the plugin on self-managed Grafana, use the Grafana CLI and restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-jenkins-datasource
```

For Docker and Kubernetes, remove the plugin ID from `GF_INSTALL_PLUGINS` and redeploy. Existing data source configurations are preserved in the Grafana database but become non-functional until the plugin is reinstalled.

## Troubleshoot installation issues

The following table lists common installation issues and how to resolve them:

Expand table

| Issue                                | Cause and solution                                                                                                                                              |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Plugin doesn’t appear in the catalog | The plugin isn’t activated for your account. Confirm your Cloud plan is Pro or Advanced, or that your Enterprise license includes `grafana-jenkins-datasource`. |
| **Install** button is missing        | You don’t have the `Organization administrator` role, or the plugin isn’t licensed for your environment.                                                        |
| License key errors                   | Verify the license text or file is valid and active under **Administration** &gt; **General** &gt; **Stats and license**.                                       |
| Unsigned plugin error (air-gapped)   | Add the plugin ID to `allow_loading_unsigned_plugins` in `grafana.ini` and restart Grafana.                                                                     |

For more troubleshooting guidance, refer to [Troubleshoot the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/).
