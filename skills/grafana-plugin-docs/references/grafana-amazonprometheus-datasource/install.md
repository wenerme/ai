---
title: "Install and upgrade the Amazon Managed Service for Prometheus data source plugin | Grafana Plugins documentation"
description: "Install and upgrade the Amazon Managed Service for Prometheus data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Amazon Managed Service for Prometheus data source plugin

This document covers how to install, upgrade, and verify the Amazon Managed Service for Prometheus data source plugin across different Grafana deployment environments. After the plugin is installed, refer to [Configure the Amazon Managed Service for Prometheus data source](/docs/plugins/grafana-amazonprometheus-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                               |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Grafana version** | A supported version of Grafana. For the full supported version list, refer to [Requirements](/docs/plugins/grafana-amazonprometheus-datasource/latest/#requirements). |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin ZIP.    |
| **AWS access**      | An Amazon Managed Service for Prometheus workspace and AWS credentials or an IAM role with permission to query it.                                                    |

## Install the plugin

The Amazon Managed Service for Prometheus plugin is a signed plugin available in the Grafana plugin catalog on all Grafana Cloud plans and self-managed Grafana. Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

To install the plugin on Grafana Cloud:

1. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Amazon Managed Service for Prometheus** and click **Install**.

Plugins are automatically updated on Grafana Cloud, so no further action is required to stay current.

> Note
>
> SigV4 authentication must be enabled for your Grafana Cloud instance before you can configure the data source. If the **SigV4 auth** option is missing from the authentication drop-down, contact [Grafana Support](/help/). For more information, refer to [Troubleshooting](/docs/plugins/grafana-amazonprometheus-datasource/latest/troubleshooting/).

### Self-managed Grafana (CLI)

Install the plugin with the Grafana CLI:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-amazonprometheus-datasource
```

Restart Grafana after installation:

Bash [Copy code to clipboard] Copy

```bash
sudo systemctl restart grafana-server
```

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-amazonprometheus-datasource
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-amazonprometheus-datasource
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: "grafana-amazonprometheus-datasource"
```

### Kubernetes (init container)

If you don’t control the Helm chart, for example on a shared platform cluster, use an init container to download the plugin before Grafana starts:

YAML [Copy code to clipboard] Copy

```yaml
initContainers:
  - name: install-plugins
    image: curlimages/curl:latest
    command:
      - sh
      - -c
      - |
        curl -sL https://grafana.com/api/plugins/grafana-amazonprometheus-datasource/versions/latest/download \
          -o /plugins/grafana-amazonprometheus-datasource.zip && \
        unzip /plugins/grafana-amazonprometheus-datasource.zip -d /plugins/
    volumeMounts:
      - name: plugins
        mountPath: /plugins
```

Mount the same volume at `/var/lib/grafana/plugins` in the Grafana container.

### Air-gapped (offline) installation

For environments without internet access:

1. Download the plugin ZIP from the [Grafana plugin catalog](/grafana/plugins/grafana-amazonprometheus-datasource/) on a machine with internet access.
2. Transfer the ZIP to the Grafana server.
3. Extract the ZIP to the plugins directory:

   Bash [Copy code to clipboard] Copy

   ```bash
   unzip grafana-amazonprometheus-datasource-<version>.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-amazonprometheus-datasource
   ```
5. Restart Grafana.

If Grafana reports an “unsigned plugin” error, add the following to `grafana.ini`:

ini [Copy code to clipboard] Copy

```ini
[plugins]
allow_loading_unsigned_plugins = grafana-amazonprometheus-datasource
```

> Caution
>
> Only allow unsigned plugins if you trust the source of the ZIP file. Official downloads from grafana.com are signed.

### Verify the installation

After installing, confirm the plugin is loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Amazon Managed Service for Prometheus** and verify the plugin appears with a status of **Installed**.
3. Navigate to **Connections** &gt; **Add new connection** and search for **Amazon Managed Service for Prometheus** to confirm it’s available as a data source.
4. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshoot installation issues](#troubleshoot-installation-issues).

## Upgrade the plugin

Upgrade steps depend on your Grafana deployment environment.

### Grafana Cloud

Plugins are automatically updated on Grafana Cloud. No manual action is required. If you experience issues after an automatic update, contact [Grafana Support](/help/).

### Self-managed Grafana

To upgrade a self-managed installation:

1. Update the plugin:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-amazonprometheus-datasource
   ```
2. Restart Grafana.
3. Verify each data source connection with **Save &amp; test**.

To install a specific version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-amazonprometheus-datasource <version>
```

For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-amazonprometheus-datasource <version>
```

### Roll back to a previous version

If an upgrade causes issues on a self-managed instance, pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-amazonprometheus-datasource 2.4.0
```

Restart Grafana after the rollback.

> Note
>
> Rollback isn’t available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](/help/).

## Uninstall the plugin

To remove the plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-amazonprometheus-datasource
```

Restart Grafana after uninstalling. Existing data source configurations are preserved in the Grafana database but become non-functional until the plugin is reinstalled.

For Docker or Kubernetes, remove `grafana-amazonprometheus-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.

## Troubleshoot installation issues

The following sections address common installation problems.

### “Plugin not found” or install button missing

This problem usually means your Grafana instance can’t reach the plugin catalog.

**Solutions:**

- **Grafana Cloud:** Confirm your instance has finished provisioning and try the search again. If the plugin still doesn’t appear, contact [Grafana Support](/help/).
- **Self-managed:** Verify the Grafana server has outbound access to `grafana.com`. For environments without internet access, use the [air-gapped installation](#air-gapped-offline-installation) method.

### “Unsigned plugin” error (air-gapped installs)

This error means Grafana installed the plugin from a ZIP file and can’t verify its signature.

**Solutions:**

1. Ensure you downloaded the ZIP from the official [Grafana plugin catalog](/grafana/plugins/grafana-amazonprometheus-datasource/). Official downloads are signed.
2. If the error persists, add `allow_loading_unsigned_plugins = grafana-amazonprometheus-datasource` to `grafana.ini` under `[plugins]`.
3. Restart Grafana.
