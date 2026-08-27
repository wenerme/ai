---
title: "Install the Drone data source | Grafana Enterprise Plugins documentation"
description: "Install the Drone data source plugin in Grafana Cloud or self-managed Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the Drone data source

> Note
>
> Drone data source plugin is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

This document explains how to install the Drone data source plugin. After you install it, refer to [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/) to connect it to your Drone instance.

The Drone data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise.

## Before you begin

Before you install the plugin, ensure you have:

- **A supported Grafana version:** Grafana 10.3.3 or later.
- **A license:** A Grafana Cloud Pro or Advanced plan or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **Grafana permissions:** Organization or server administrator role to install plugins on self-managed Grafana.

## Required permissions

Installing a plugin requires elevated permissions:

- **Self-managed Grafana:** A server administrator can install plugins with the Grafana CLI or by editing the configuration. An organization administrator can install plugins from the catalog in the UI.
- **Grafana Cloud:** An Admin role on the stack is required to install plugins.

## Version compatibility

The Drone data source requires Grafana 10.3.3 or later. Before you install, confirm your Grafana version is supported:

1. Click the help icon in the top navigation bar, or check **Administration** &gt; **General** &gt; **Settings**.
2. Note the Grafana version number.
3. If your version is older than 10.3.3, upgrade Grafana before installing the plugin. For upgrade guidance, refer to [Upgrade Grafana](/docs/grafana/latest/upgrade-guide/).

## Install in Grafana Cloud

In Grafana Cloud, Enterprise plugins are managed for you:

1. In your Grafana Cloud stack, click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Drone` in the search bar.
4. Select **Drone**, then click **Install**.

> Note
>
> Plugins are automatically updated in Grafana Cloud, so you don’t need to upgrade the plugin manually.

## Install on self-managed Grafana

On self-managed Grafana Enterprise, install the plugin from the plugin catalog or with the Grafana command line. For more information about the available methods, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

### Use the plugin catalog

To install the plugin from the catalog:

1. Click **Administration** &gt; **Plugins and data** &gt; **Plugins** in the left-side menu.
2. Type `Drone` in the search bar.
3. Select **Drone**.
4. Click **Install**.

For more information about Enterprise plugins, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

### Use the Grafana command line

To install the plugin with the Grafana CLI, run the following command on the Grafana server, then restart Grafana:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-drone-datasource
```

After Grafana restarts, the Drone data source is available to add.

### Use an environment variable or Docker

For containerized or provisioned deployments, install the plugin with the `GF_INSTALL_PLUGINS` environment variable. Grafana installs the listed plugins on startup.

Bash [Copy code to clipboard] Copy

```bash
GF_INSTALL_PLUGINS=grafana-drone-datasource
```

To pin a specific version for reproducible deployments, append the version after an `@`:

Bash [Copy code to clipboard] Copy

```bash
GF_INSTALL_PLUGINS=grafana-drone-datasource@0.1.0
```

For example, with Docker:

Bash [Copy code to clipboard] Copy

```bash
docker run -d -p 3000:3000 --name=grafana \
  -e "GF_INSTALL_PLUGINS=grafana-drone-datasource" \
  grafana/grafana-enterprise
```

For more information about running Grafana in Docker, refer to [Run Grafana Docker image](/docs/grafana/latest/setup-grafana/installation/docker/).

### Install in an air-gapped environment

If your Grafana server can’t reach the internet, install the plugin manually:

1. On a machine with internet access, download the Drone plugin from the [plugin catalog](/grafana/plugins/grafana-drone-datasource/?tab=installation).
2. Copy the plugin archive to the Grafana server and extract it into the Grafana plugins directory.
3. Restart Grafana so it loads the plugin on startup.

For detailed steps, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/).

## Update the plugin

Keep the plugin up-to-date so you have access to the latest features and fixes.

- **Grafana Cloud:** Plugins are updated automatically. No action is required.
- **Self-managed Grafana:** Update from the catalog by clicking **Administration** &gt; **Plugins and data** &gt; **Plugins**, selecting **Drone**, and clicking **Update**. Alternatively, run `grafana cli plugins update grafana-drone-datasource` and restart Grafana.

Grafana recommends running the latest Grafana version, which also applies to plugins.

## Verify the installation

To confirm the plugin is installed:

1. Click **Administration** &gt; **Plugins and data** &gt; **Plugins** in the left-side menu.
2. Search for `Drone`.
3. Confirm the plugin appears and is marked as installed.

If the plugin doesn’t appear or fails to load, refer to [Troubleshooting](/docs/plugins/grafana-drone-datasource/latest/troubleshooting/).

## Uninstall the plugin

Before you uninstall the plugin, delete any Drone data sources that use it. Dashboards that query those data sources stop returning data after the plugin is removed.

- **Self-managed Grafana:** Uninstall from the catalog by clicking **Administration** &gt; **Plugins and data** &gt; **Plugins**, selecting **Drone**, and clicking **Uninstall**. Alternatively, run `grafana cli plugins uninstall grafana-drone-datasource` and restart Grafana.
- **Grafana Cloud:** Click **Connections** &gt; **Drone**, then uninstall the plugin from the plugin page.

## Next steps

- [Configure the Drone data source](/docs/plugins/grafana-drone-datasource/latest/configure/)
- [Drone query editor](/docs/plugins/grafana-drone-datasource/latest/query-editor/)
