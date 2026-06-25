---
title: "Install the Infinity data source | Grafana Plugins documentation"
description: "Learn how to install the Infinity data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the Infinity data source

You can install the Infinity data source plugin using several methods, depending on your Grafana deployment.

## Before you begin

- Grafana 10.4.8 or later.
- Administrator access to your Grafana instance.

## Grafana Cloud

The Infinity data source plugin is pre-installed on Grafana Cloud instances. Updates are managed automatically by Grafana, so no installation or upgrade steps are needed. You can proceed directly to [configuring the data source](/docs/plugins/yesoreyeram-infinity-datasource/latest/configure/).

## Self-managed Grafana

For self-managed Grafana installations, use one of the following methods to install the Infinity data source plugin.

### Install from the Grafana plugin catalog

The simplest way to install the plugin is from the [Grafana plugin catalog](/grafana/plugins/yesoreyeram-infinity-datasource/):

1. In Grafana, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for “Infinity”.
3. Click **Install**.

Alternatively, visit the [plugin page](/grafana/plugins/yesoreyeram-infinity-datasource/?tab=installation) and follow the installation instructions.

### Install using Grafana CLI

Use the Grafana CLI to install the latest version:

shell [Copy code to clipboard] Copy

```shell
grafana cli plugins install yesoreyeram-infinity-datasource
```

To install a specific version, provide the plugin URL:

shell [Copy code to clipboard] Copy

```shell
grafana cli --pluginUrl https://github.com/grafana/grafana-infinity-datasource/releases/download/v2.4.0/yesoreyeram-infinity-datasource-2.4.0.zip plugins install yesoreyeram-infinity-datasource
```

After installation, restart Grafana for the plugin to load.

### Install from GitHub releases

To install manually:

1. Download the desired version from [GitHub releases](https://github.com/grafana/grafana-infinity-datasource/releases).
2. Extract the archive to your Grafana plugins directory (typically `/var/lib/grafana/plugins/`).
3. Restart Grafana.

### Install using Docker

Use the `GF_INSTALL_PLUGINS` environment variable to install the plugin when starting the container:

shell [Copy code to clipboard] Copy

```shell
docker run -p 3000:3000 -e "GF_INSTALL_PLUGINS=yesoreyeram-infinity-datasource" grafana/grafana-enterprise:latest
```

To install a specific version:

shell [Copy code to clipboard] Copy

```shell
docker run -p 3000:3000 -e "GF_INSTALL_PLUGINS=yesoreyeram-infinity-datasource;https://github.com/grafana/grafana-infinity-datasource/releases/download/v2.4.0/yesoreyeram-infinity-datasource-2.4.0.zip" grafana/grafana-enterprise:latest
```

### Install using Helm

If you deploy Grafana using the [Grafana Helm chart](https://github.com/grafana/helm-charts/tree/main/charts/grafana), add the plugin to your `values.yaml`:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - yesoreyeram-infinity-datasource
```

To install a specific version:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - https://github.com/grafana/grafana-infinity-datasource/releases/download/v2.4.0/yesoreyeram-infinity-datasource-2.4.0.zip;yesoreyeram-infinity-datasource
```

### Verify installation

After installation:

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source**.
3. Search for “Infinity” — if it appears, the installation was successful.

### Update the plugin

Keep the Infinity data source plugin up to date to access new features, performance improvements, and bug fixes. Check the [changelog](https://github.com/grafana/grafana-infinity-datasource/blob/main/CHANGELOG.md) for details on each release.

#### Grafana plugin catalog

1. In Grafana, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for “Infinity” and select it.
3. If an update is available, click **Update**.

#### Grafana CLI

shell [Copy code to clipboard] Copy

```shell
grafana cli plugins update yesoreyeram-infinity-datasource
```

After updating, restart Grafana for the changes to take effect.

#### Docker and Helm

For containerized deployments, update the version in your configuration and redeploy. Refer to the installation sections above for version-specific examples.

## Next steps

- [Configure the Infinity data source](/docs/plugins/yesoreyeram-infinity-datasource/latest/configure/)
- [Create your first query](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/)
