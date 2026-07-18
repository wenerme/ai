---
title: "Install and upgrade the Databricks data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Databricks data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Databricks data source plugin

This document covers how to install, upgrade, and verify the Databricks data source plugin across different Grafana deployment environments. After the plugin is installed, refer to [Configure the Databricks data source](/docs/plugins/grafana-databricks-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement           | Details                                                                                                                                                                                                                                                          |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**           | A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-databricks-datasource`. Free and Starter plans don’t include Enterprise plugins.                                                                       |
| **Grafana version**   | 11.6.11 or later.                                                                                                                                                                                                                                                |
| **Role**              | The `Organization administrator` role. Only account administrators can install the plugin and configure the data source.                                                                                                                                         |
| **Network access**    | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin ZIP. The Grafana server also needs outbound HTTPS access on port 443 to your Databricks workspace. |
| **Databricks access** | A Databricks SQL warehouse or cluster, with its server hostname and HTTP path from **SQL Warehouses** &gt; **Connection details**.                                                                                                                               |

## Activate the Enterprise plugin

The Databricks data source is a Grafana Enterprise plugin. Before you can install it, the plugin must be licensed and activated for your environment. If the plugin isn’t activated, the **Install** button doesn’t appear, and **Save &amp; test** returns a generic `Plugin health check failed` error.

### Grafana Cloud

Enterprise plugins must be activated for your organization before they appear as installable in the plugin catalog.

1. Go to [grafana.com/orgs](/orgs) and sign in with your Grafana Cloud account.
2. Select your organization.
3. Navigate to the **Plugins** tab and verify that the Databricks plugin is activated.
4. If the plugin isn’t listed, confirm your Cloud plan is Pro or Advanced. Free and Starter plans don’t include Enterprise plugins. Contact your Grafana account team to add the plugin to your plan.

### Self-managed Grafana Enterprise

Self-managed installations require an active Grafana Enterprise license that includes `grafana-databricks-datasource`.

1. Confirm your Grafana Enterprise license includes the Databricks plugin. You can review your licensed plugins in your [Grafana account portal](/orgs).
2. Provide the license to Grafana using the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or a license file path. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
3. Restart Grafana and confirm the license is active under **Administration** &gt; **General** &gt; **Stats and license**.

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

First, confirm the plugin is activated for your organization. Refer to [Activate the Enterprise plugin](#activate-the-enterprise-plugin).

1. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Databricks** and click **Install**.

> Note
>
> If the **Install** button doesn’t appear, verify that the plugin is activated for your organization at [grafana.com/orgs](/orgs) and that your Cloud plan is Pro or Advanced.

### Self-managed Grafana (CLI)

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-databricks-datasource
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
  - GF_INSTALL_PLUGINS=grafana-databricks-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-databricks-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: 'grafana-databricks-datasource'
  - name: GF_ENTERPRISE_LICENSE_TEXT
    valueFrom:
      secretKeyRef:
        name: grafana-license
        key: license.jwt
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
        curl -sL https://grafana.com/api/plugins/grafana-databricks-datasource/versions/latest/download \
          -o /plugins/grafana-databricks-datasource.zip && \
        unzip /plugins/grafana-databricks-datasource.zip -d /plugins/
    volumeMounts:
      - name: plugins
        mountPath: /plugins
```

Mount the same volume at `/var/lib/grafana/plugins` in the Grafana container.

### Air-gapped (offline) installation

For environments without internet access:

1. Download the plugin ZIP from your [Grafana account portal](/orgs) on a machine with internet access.
2. Transfer the ZIP to the Grafana server.
3. Extract the ZIP to the plugins directory:

   Bash [Copy code to clipboard] Copy

   ```bash
   unzip grafana-databricks-datasource-<version>.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-databricks-datasource
   ```
5. Restart Grafana.

If Grafana reports an “unsigned plugin” error, add the following to `grafana.ini`:

ini [Copy code to clipboard] Copy

```ini
[plugins]
allow_loading_unsigned_plugins = grafana-databricks-datasource
```

> Caution
>
> Only allow unsigned plugins if you trust the source of the ZIP file. Official downloads from grafana.com are signed.

### Verify the installation

After installing, confirm the plugin is loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Databricks** and verify the plugin appears with a status of **Installed**.
3. Navigate to **Connections** &gt; **Add new connection** and search for **Databricks** to confirm it’s available as a data source.
4. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshoot installation issues](#troubleshoot-installation-issues).

## Upgrade the plugin

The Databricks plugin is an Enterprise plugin, so upgrade steps depend on your Grafana deployment environment.

> Note
>
> Update behavior depends on your environment: on Grafana Cloud the plugin is managed by Grafana and updates automatically, whereas on self-managed Grafana you must update plugins manually. Many issues resolve after upgrading. Refer to [Version and upgrade guidance](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

### Grafana Cloud

The Databricks plugin is managed by Grafana on Grafana Cloud and updates automatically; no manual action is required. If you experience issues after an update, contact [Grafana Support](/support/).

### Self-managed Grafana

1. Update the plugin:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-databricks-datasource
   ```
2. Restart Grafana.
3. Verify each data source connection with **Save &amp; test**.

To install a specific version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-databricks-datasource <version>
```

For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-databricks-datasource <version>
```

### Roll back to a previous version

If an upgrade causes issues on a self-managed instance, pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-databricks-datasource 1.13.9
```

Restart Grafana after the rollback.

> Note
>
> Rolling back to a specific version isn’t available through the Grafana Cloud plugin catalog. Contact [Grafana Support](/support/) if you need to roll back on Grafana Cloud.

## Uninstall the plugin

To remove the Databricks plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-databricks-datasource
```

Restart Grafana after uninstalling. Existing data source configurations are preserved in the Grafana database but become non-functional until the plugin is reinstalled.

For Docker or Kubernetes, remove `grafana-databricks-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.

## Troubleshoot installation issues

The following sections address common installation problems.

### Plugin doesn’t appear in the catalog (Grafana Cloud)

**Cause:** The Enterprise plugin isn’t activated for your organization.

**Solution:**

1. Go to [grafana.com/orgs](/orgs).
2. Select your organization and navigate to the **Plugins** tab.
3. Verify that the Databricks plugin is listed and activated.
4. Confirm your Cloud plan is Pro or Advanced. Free and Starter plans don’t include Enterprise plugins.

### Plugin not found, or the install button is missing

**Cause:** Your Grafana instance doesn’t have access to the Enterprise plugin repository, or you don’t have the required role.

**Solution:**

- **Grafana Cloud:** Verify plugin activation at [grafana.com/orgs](/orgs).
- **Self-managed:** Verify your Grafana Enterprise license is active. Set the license with the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or the license path. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- Confirm you have the `Organization administrator` role. Only account administrators can install the plugin.

### License key errors (self-managed)

**Cause:** The `GF_ENTERPRISE_LICENSE_TEXT` environment variable contains an invalid or malformed license key.

**Solution:**

1. Verify the license key doesn’t contain extra whitespace, line breaks, or truncated characters.
2. Confirm the key is for the correct Grafana instance URL.
3. Check that the license hasn’t expired at [grafana.com/orgs](/orgs).
4. For license activation help, refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).

### Unsigned plugin error (air-gapped installs)

**Cause:** The plugin was installed from a ZIP file and Grafana can’t verify its signature.

**Solution:**

1. Ensure you downloaded the ZIP from the official [Grafana account portal](/orgs). Official downloads are signed.
2. If the error persists, add `allow_loading_unsigned_plugins = grafana-databricks-datasource` to `grafana.ini` under `[plugins]`.
3. Restart Grafana.
