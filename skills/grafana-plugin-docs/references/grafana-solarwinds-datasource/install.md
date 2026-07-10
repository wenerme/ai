---
title: "Install the SolarWinds data source | Grafana Enterprise Plugins documentation"
description: "Learn how to install the SolarWinds Enterprise data source plugin in Grafana Cloud and self-managed Grafana Enterprise."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the SolarWinds data source

This document explains how to install the SolarWinds data source plugin. The SolarWinds data source is an Enterprise plugin, so you need an eligible Grafana Cloud plan or an activated Grafana Enterprise license to use it.

## Before you begin

Before you install the plugin, ensure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- Grafana 11.6.7 or later.
- Administrator access to your Grafana instance to install plugins.

For general guidance on Enterprise plugins, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

> Note
>
> The SolarWinds data source is an Enterprise plugin. It only appears in the plugin catalog and the data source list when your Grafana instance has a valid Grafana Enterprise license or an eligible Grafana Cloud plan. If you can’t find the plugin or there’s no install button, verify that your license is valid and active.

## Install on Grafana Cloud

On Grafana Cloud, you can install the plugin from the plugin catalog:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `SolarWinds` in the search bar.
4. Select **SolarWinds**.
5. Click **Install**.

> Note
>
> On Grafana Cloud, it can take up to 15 minutes for the data source plugin to appear in Grafana after installation.

## Install on self-managed Grafana Enterprise

On self-managed Grafana Enterprise, you can install the plugin through the catalog or with Grafana CLI. After the plugin is installed, you can optionally provision the data source configuration.

### Use the plugin catalog

If your Grafana instance can reach the internet, install the plugin from the catalog:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `SolarWinds` in the search bar.
4. Select **SolarWinds**.
5. Click **Install**.

### Use Grafana CLI

If your Grafana server can reach the internet, use Grafana CLI to install the plugin from the command line:

Bash [Copy code to clipboard] Copy

```bash
grafana-cli plugins install grafana-solarwinds-datasource
```

Restart Grafana after the installation completes.

### Install in an air-gapped environment

If your Grafana server can’t reach the internet, install the plugin manually from a downloaded archive:

1. On a machine with internet access, download the plugin archive from the [SolarWinds data source plugin page](/grafana/plugins/grafana-solarwinds-datasource/?tab=installation). Use a plugin version that’s compatible with your Grafana version.
2. Copy the archive to your Grafana server.
3. Extract the archive into your Grafana plugins directory, which defaults to `/var/lib/grafana/plugins`.
4. Confirm the extracted directory is named `grafana-solarwinds-datasource`.
5. Restart Grafana.

> Note
>
> Because this is an Enterprise plugin, your Grafana instance must still have a valid Grafana Enterprise license for the plugin to load, even in an air-gapped installation.

### Provision the data source

After the plugin is installed, you can configure the data source with provisioning files. Provisioning configures the data source connection; it doesn’t install the plugin. For an example, refer to [Provision the data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/#provision-the-data-source).

## Verify the installation

To verify that the plugin is installed:

1. In Grafana, click **Connections** in the left-side menu.
2. Click **Data sources**.
3. Click **Add new data source**.
4. Type `SolarWinds` in the search bar.
5. Confirm that **SolarWinds** appears in the results and that you can select it.

If **SolarWinds** doesn’t appear or you can’t select it, check that your Grafana Enterprise license is valid and reinstall the plugin. If you still need help, contact Grafana Labs.

## Next steps

- [Configure the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/)
