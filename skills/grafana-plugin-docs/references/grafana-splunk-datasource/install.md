---
title: "Install and upgrade the Splunk data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Splunk data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Splunk data source plugin

This document covers how to install, upgrade, and verify the Splunk data source plugin across different Grafana deployment environments. After the plugin is installed, refer to [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                                              |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-splunk-datasource`. Free and Starter plans don’t include Enterprise plugins. |
| **Grafana version** | 11.6.7 or later.                                                                                                                                                                     |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin ZIP.                   |
| **Splunk access**   | A Splunk Enterprise or Splunk Cloud instance with [port 8089 (REST API) enabled](https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ConfigureOutboundPorts).            |

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

Enterprise plugins must be activated for your organization before they appear as installable in the plugin catalog.

1. Go to [grafana.com/orgs](/orgs) and sign in with your Grafana Cloud account.
2. Select your organization.
3. Navigate to the **Plugins** tab and verify that the Splunk plugin is activated. If it isn’t listed, confirm your Cloud plan includes Enterprise plugins.
4. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
5. Search for **Splunk** and click **Install**.

> Note
>
> If the **Install** button doesn’t appear, verify that the plugin is activated for your organization at [grafana.com/orgs](/orgs) and that your Cloud plan is Pro or Advanced.

### Self-managed Grafana (CLI)

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-splunk-datasource
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
  - GF_INSTALL_PLUGINS=grafana-splunk-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-splunk-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: "grafana-splunk-datasource"
  - name: GF_ENTERPRISE_LICENSE_TEXT
    valueFrom:
      secretKeyRef:
        name: grafana-license
        key: license.jwt
```

### Kubernetes (init container)

If you don’t control the Helm chart (for example, on a shared platform cluster), use an init container to download the plugin before Grafana starts:

YAML [Copy code to clipboard] Copy

```yaml
initContainers:
  - name: install-plugins
    image: curlimages/curl:latest
    command:
      - sh
      - -c
      - |
        curl -sL https://grafana.com/api/plugins/grafana-splunk-datasource/versions/latest/download \
          -o /plugins/grafana-splunk-datasource.zip && \
        unzip /plugins/grafana-splunk-datasource.zip -d /plugins/
    volumeMounts:
      - name: plugins
        mountPath: /plugins
```

Mount the same volume at `/var/lib/grafana/plugins` in the Grafana container.

### Air-gapped (offline) installation

For environments without internet access:

1. Download the plugin ZIP from your [Grafana account portal](/orgs) on a machine with internet access.
2. Transfer the ZIP to the Grafana server.
3. Extract to the plugins directory:

   Bash [Copy code to clipboard] Copy

   ```bash
   unzip grafana-splunk-datasource-<version>.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-splunk-datasource
   ```
5. Restart Grafana.

If Grafana reports an “unsigned plugin” error, add the following to `grafana.ini`:

ini [Copy code to clipboard] Copy

```ini
[plugins]
allow_loading_unsigned_plugins = grafana-splunk-datasource
```

> Caution
>
> Only allow unsigned plugins if you trust the source of the ZIP file. Official downloads from grafana.com are signed.

### Verify the installation

After installing, confirm the plugin is loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Splunk** and verify the plugin appears with a status of **Installed**.
3. Navigate to **Connections** &gt; **Add new connection** and search for **Splunk** to confirm it’s available as a data source.
4. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshoot installation issues](#troubleshoot-installation-issues).

## Upgrade the plugin

Upgrade steps depend on your Grafana deployment environment.

### Grafana Cloud

Plugins are automatically updated on Grafana Cloud. No manual action is required. If you experience issues after an automatic update, contact [Grafana Support](/support/).

### Self-managed Grafana

1. Update the plugin:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-splunk-datasource
   ```
2. Restart Grafana.
3. Verify each data source connection with **Save &amp; test**.

To install a specific version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-splunk-datasource <version>
```

For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-splunk-datasource <version>
```

### Roll back to a previous version

If an upgrade causes issues on a self-managed instance, pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-splunk-datasource 5.8.19
```

Restart Grafana after the rollback.

> Note
>
> Rollback is not available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](/support/).

## Uninstall the plugin

To remove the Splunk plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-splunk-datasource
```

Restart Grafana after uninstalling. Existing data source configurations are preserved in the Grafana database but become non-functional until the plugin is reinstalled.

For Docker or Kubernetes, remove `grafana-splunk-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.

## Troubleshoot installation issues

The following sections address common installation problems.

### Plugin doesn’t appear in the catalog (Grafana Cloud)

**Cause:** The Enterprise plugin isn’t activated for your organization.

**Solution:**

1. Go to [grafana.com/orgs](/orgs).
2. Select your organization and navigate to the **Plugins** tab.
3. Verify that the Splunk plugin is listed and activated.
4. Confirm your Cloud plan is Pro or Advanced. Free and Starter plans don’t include Enterprise plugins.

### “Plugin not found” or install button missing

**Cause:** Your Grafana instance doesn’t have access to the Enterprise plugin repository.

**Solution:**

- **Grafana Cloud:** Verify plugin activation at [grafana.com/orgs](/orgs).
- **Self-managed:** Verify your Grafana Enterprise license is active. The license must be set via the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or the license path. Refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/activate-aws-marketplace-license/).

### License key errors (self-managed)

**Cause:** The `GF_ENTERPRISE_LICENSE_TEXT` environment variable contains an invalid or malformed license key.

**Solution:**

1. Verify the license key doesn’t contain extra whitespace, line breaks, or truncated characters.
2. Confirm the key is for the correct Grafana instance URL.
3. Check that the license hasn’t expired at [grafana.com/orgs](/orgs).
4. For license activation help, refer to [Activate an Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/activate-aws-marketplace-license/).

### “Unsigned plugin” error (air-gapped installs)

**Cause:** The plugin was installed from a ZIP file and Grafana can’t verify its signature.

**Solution:**

1. Ensure you downloaded the ZIP from the official [Grafana account portal](/orgs). Official downloads are signed.
2. If the error persists, add `allow_loading_unsigned_plugins = grafana-splunk-datasource` to `grafana.ini` under `[plugins]`.
3. Restart Grafana.
