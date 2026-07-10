---
title: "Install and upgrade the Datadog data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Datadog data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Datadog data source plugin

This document covers how to install, upgrade, and verify the Datadog data source plugin across different Grafana deployment environments. After you install the plugin, refer to [Configure the Datadog data source](/docs/plugins/grafana-datadog-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before you install:

Expand table

| Requirement         | Details                                                                                                                                                                                                                                                                                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | A Grafana Enterprise license that includes `grafana-datadog-datasource`, or a Grafana Cloud account with Enterprise plugins enabled. On Grafana Cloud, Enterprise plugins are included on some plans and available as a paid add-on on others. For details, refer to [Grafana Cloud features](/docs/grafana-cloud/introduction/understand-grafana-cloud-features/). |
| **Grafana version** | `11.6.11` or later.                                                                                                                                                                                                                                                                                                                                                 |
| **Network access**  | Grafana Cloud instances download the plugin from the catalog and require internet access. Self-managed installations need access to `grafana.com` or a local plugin ZIP file.                                                                                                                                                                                       |
| **Datadog access**  | A Datadog account with an API key and an application key. For instructions, refer to [Get an API key and application key from Datadog](/docs/plugins/grafana-datadog-datasource/latest/#get-an-api-key-and-application-key-from-datadog).                                                                                                                           |

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

Enterprise plugins must be enabled for your organization before they appear as installable in the plugin catalog.

1. Go to the [Grafana account portal](/orgs) and sign in with your Grafana Cloud account.
2. Select your organization.
3. Navigate to the **Plugins** tab and verify that the Datadog plugin is enabled. If it isn’t listed, confirm that your Cloud plan includes Enterprise plugins.
4. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
5. Search for **Datadog** and click **Install**.

> Note
>
> If the **Install** button doesn’t appear, verify that the plugin is enabled for your organization at the [Grafana account portal](/orgs) and that your Cloud plan includes Enterprise plugins.

### Self-managed Grafana (CLI)

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-datadog-datasource
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
  - GF_INSTALL_PLUGINS=grafana-datadog-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-datadog-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: "grafana-datadog-datasource"
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
        curl -sL https://grafana.com/api/plugins/grafana-datadog-datasource/versions/latest/download \
          -o /plugins/grafana-datadog-datasource.zip && \
        unzip /plugins/grafana-datadog-datasource.zip -d /plugins/
    volumeMounts:
      - name: plugins
        mountPath: /plugins
```

Mount the same volume at `/var/lib/grafana/plugins` in the Grafana container.

### Air-gapped (offline) installation

For environments without internet access:

1. Download the plugin ZIP file from your [Grafana account portal](/orgs) on a machine with internet access.
2. Transfer the ZIP file to the Grafana server.
3. Extract it to the plugins directory:

   Bash [Copy code to clipboard] Copy

   ```bash
   unzip grafana-datadog-datasource-<version>.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-datadog-datasource
   ```
5. Restart Grafana.

If Grafana reports an “unsigned plugin” error, add the following to `grafana.ini`:

ini [Copy code to clipboard] Copy

```ini
[plugins]
allow_loading_unsigned_plugins = grafana-datadog-datasource
```

> Caution
>
> Only allow unsigned plugins if you trust the source of the ZIP file. Official downloads from Grafana are signed.

### Verify the installation

After you install the plugin, confirm that it loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Datadog** and verify that the plugin appears with a status of **Installed**.
3. Navigate to **Connections** &gt; **Add new connection** and search for **Datadog** to confirm that it’s available as a data source.
4. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshoot installation issues](#troubleshoot-installation-issues).

## Upgrade the plugin

Upgrade steps depend on your Grafana deployment environment.

### Grafana Cloud

Plugins update automatically on Grafana Cloud, and no manual action is required. If you experience issues after an automatic update, contact [Grafana Support](/support/).

### Self-managed Grafana

1. Update the plugin:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-datadog-datasource
   ```
2. Restart Grafana.
3. Verify each data source connection with **Save &amp; test**.

To install a specific version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-datadog-datasource <version>
```

For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-datadog-datasource <version>
```

### Roll back to a previous version

If an upgrade causes issues on a self-managed instance, pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-datadog-datasource <version>
```

Restart Grafana after the rollback.

> Note
>
> Rollback isn’t available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](/support/).

## Uninstall the plugin

To remove the Datadog plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-datadog-datasource
```

Restart Grafana after you uninstall the plugin. Existing data source configurations are preserved in the Grafana database but stop working until you reinstall the plugin.

For Docker or Kubernetes, remove `grafana-datadog-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.

## Troubleshoot installation issues

The following sections address common installation problems.

### Plugin doesn’t appear in the catalog (Grafana Cloud)

**Cause:** The Enterprise plugin isn’t enabled for your organization.

**Solution:**

1. Go to the [Grafana account portal](/orgs).
2. Select your organization and navigate to the **Plugins** tab.
3. Verify that the Datadog plugin is listed and enabled.
4. Confirm that your Cloud plan includes Enterprise plugins. For details, refer to [Grafana Cloud features](/docs/grafana-cloud/introduction/understand-grafana-cloud-features/).

### Install button missing or “Plugin not found”

**Cause:** Your Grafana instance doesn’t have access to the Enterprise plugin repository.

**Solution:**

- **Grafana Cloud:** Verify that the plugin is enabled at the [Grafana account portal](/orgs).
- **Self-managed:** Verify that your Grafana Enterprise license is active. Set the license with the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or the license path. Refer to [Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).

### License errors (self-managed)

**Cause:** The `GF_ENTERPRISE_LICENSE_TEXT` environment variable contains an invalid or malformed license key.

**Solution:**

1. Verify that the license key doesn’t contain extra whitespace, line breaks, or truncated characters.
2. Confirm that the key is for the correct Grafana instance URL.
3. Check that the license hasn’t expired at the [Grafana account portal](/orgs).
4. For more details about license errors, refer to [License issues](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/#license-issues).

### “Unsigned plugin” error (air-gapped installs)

**Cause:** You installed the plugin from a ZIP file and Grafana can’t verify its signature.

**Solution:**

1. Make sure you downloaded the ZIP file from the official [Grafana account portal](/orgs). Official downloads are signed.
2. If the error persists, add `allow_loading_unsigned_plugins = grafana-datadog-datasource` to `grafana.ini` under `[plugins]`.
3. Restart Grafana.
