---
title: "Install the Zendesk data source | Grafana Enterprise Plugins documentation"
description: "Install the Zendesk data source plugin in Grafana Cloud or self-managed Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the Zendesk data source

This document explains how to install the Zendesk data source plugin. After you install it, refer to [Configure the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/) to connect it to your Zendesk account.

The Zendesk data source is an Enterprise plugin. You can use it in Grafana Cloud with a Pro or Advanced plan, or in self-managed Grafana with an activated Grafana Enterprise license.

## Before you begin

Before you install the plugin, ensure you have:

- **A supported Grafana version:** Grafana 11.6.7 or later.
- **A license:** A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **Grafana permissions:** Organization or server administrator role to install plugins on self-managed Grafana, or an Admin role on your Grafana Cloud stack.

## Install in Grafana Cloud

In Grafana Cloud, Enterprise plugins are managed for you:

1. In your Grafana Cloud stack, click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Zendesk` in the search bar.
4. Select **Zendesk**, then click **Install**.

> Note
>
> Plugins are automatically updated in Grafana Cloud, so you don’t need to upgrade the plugin manually.

## Install on self-managed Grafana

On self-managed Grafana Enterprise, install the plugin from the plugin catalog or with the Grafana command line. For more information about the available methods, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

### Use the plugin catalog

To install the plugin from the catalog:

1. Click **Administration** &gt; **Plugins and data** &gt; **Plugins** in the left-side menu.
2. Type `Zendesk` in the search bar.
3. Select **Zendesk**.
4. Click **Install**.

For more information about Enterprise plugins, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

### Use the Grafana command line

To install the plugin with the Grafana CLI, run the following command on the Grafana server, then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-zendesk-datasource
```

After Grafana restarts, the Zendesk data source is available to add.

### Use an environment variable or Docker

For containerized or provisioned deployments, install the plugin with the `GF_INSTALL_PLUGINS` environment variable. Grafana installs the listed plugins on startup.

Bash [Copy code to clipboard] Copy

```bash
GF_INSTALL_PLUGINS=grafana-zendesk-datasource
```

For example, with Docker:

Bash [Copy code to clipboard] Copy

```bash
docker run -d -p 3000:3000 --name=grafana \
  -e "GF_INSTALL_PLUGINS=grafana-zendesk-datasource" \
  grafana/grafana-enterprise
```

For more information about running Grafana in Docker, refer to [Run Grafana Docker image](/docs/grafana/latest/setup-grafana/installation/docker/).

### Install in an air-gapped environment

If your Grafana server can’t reach the internet, install the plugin manually:

1. On a machine with internet access, download the Zendesk plugin from the [plugin catalog](/grafana/plugins/grafana-zendesk-datasource/?tab=installation).
2. Copy the plugin archive to the Grafana server and extract it into the Grafana plugins directory.
3. Restart Grafana so it loads the plugin on startup.

For detailed steps, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

## Update the plugin

Keep the plugin up-to-date so you have access to the latest features and fixes.

- **Grafana Cloud:** Plugins are updated automatically. No action is required.
- **Self-managed Grafana:** Update from the catalog by clicking **Administration** &gt; **Plugins and data** &gt; **Plugins**, selecting **Zendesk**, and clicking **Update**. Alternatively, run `grafana cli plugins update grafana-zendesk-datasource` and restart Grafana.

Grafana recommends running the latest Grafana version, which also applies to plugins.

## Verify the installation

To confirm the plugin is installed:

1. Click **Administration** &gt; **Plugins and data** &gt; **Plugins** in the left-side menu.
2. Search for `Zendesk`.
3. Confirm the plugin appears and is marked as installed.

If the plugin doesn’t appear or fails to load, refer to [Troubleshoot the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/troubleshooting/).

## Uninstall the plugin

Before you uninstall the plugin, delete any Zendesk data sources that use it. Dashboards and alert rules that query those data sources stop returning data after the plugin is removed.

- **Self-managed Grafana:** Uninstall from the catalog by clicking **Administration** &gt; **Plugins and data** &gt; **Plugins**, selecting **Zendesk**, and clicking **Uninstall**. Alternatively, run `grafana cli plugins uninstall grafana-zendesk-datasource` and restart Grafana.
- **Grafana Cloud:** Click **Connections** &gt; **Zendesk**, then uninstall the plugin from the plugin page.

## Next steps

- [Configure the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/configure/)
- [Zendesk query editor](/docs/plugins/grafana-zendesk-datasource/latest/query-editor/)
