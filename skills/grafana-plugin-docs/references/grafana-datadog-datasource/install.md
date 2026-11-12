---
title: "Install and upgrade the Datadog data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Datadog data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Datadog data source plugin

This document covers how to install, upgrade, and verify the Datadog data source plugin across different Grafana deployment environments. After you install the plugin, refer to [Configure the Datadog data source](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before you install:

Expand table

| Requirement         | Details                                                                                                                                                                                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | A Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-datadog-datasource`. Free and Starter plans don’t include Enterprise plugins. For details, refer to [Grafana Cloud features](https://grafana.com/docs/grafana-cloud/introduction/understand-grafana-cloud-features/). |
| **Grafana version** | `11.6.11` or later.                                                                                                                                                                                                                                                                                                             |
| **Role**            | Organization administrator. Only administrators can install the plugin and add the data source.                                                                                                                                                                                                                                 |
| **Network access**  | Grafana Cloud instances download the plugin from the catalog and require internet access. Self-managed installations need access to `grafana.com` or a local plugin ZIP file.                                                                                                                                                   |
| **Datadog access**  | A Datadog account with an API key and an application key. For instructions, refer to [Get an API key and application key from Datadog](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/#get-an-api-key-and-application-key-from-datadog).                                                                    |

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

Enterprise plugins must be enabled for your organization before they appear as installable in the plugin catalog.

1. Go to the [Grafana account portal](https://grafana.com/orgs) and sign in with your Grafana Cloud account.
2. Select your organization.
3. Navigate to the **Plugins** tab and verify that the Datadog plugin is enabled. If it isn’t listed, confirm that your Cloud plan is Pro or Advanced.
4. In your Grafana Cloud instance, navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
5. Search for **Datadog** and click **Install**.

> Note
>
> If the **Install** button doesn’t appear, verify that the plugin is enabled for your organization at the [Grafana account portal](https://grafana.com/orgs) and that your Cloud plan is Pro or Advanced.

### Self-managed Grafana (CLI)

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana cli plugins install grafana-datadog-datasource
```

Restart Grafana after installation:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
sudo systemctl restart grafana-server
```

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable:

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-datadog-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```yaml
plugins:
  - grafana-datadog-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

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

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

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

For environments without internet access, install the official signed ZIP. Don’t load an unsigned copy.

1. On a machine with internet access, download the plugin ZIP from the [Datadog plugin page](https://grafana.com/grafana/plugins/grafana-datadog-datasource) or your [Grafana account portal](https://grafana.com/orgs). Official Grafana catalog downloads include a valid signature.
2. Transfer the ZIP file to the Grafana server.
3. Extract the full plugin directory into the plugins path. The folder name must match the plugin ID, `grafana-datadog-datasource`, and the directory must include `MANIFEST.txt`:

   Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   unzip grafana-datadog-datasource-<version>.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Confirm the extracted layout. You should have `/var/lib/grafana/plugins/grafana-datadog-datasource/MANIFEST.txt` plus the plugin binaries and frontend assets. If `MANIFEST.txt` is missing, you don’t have a complete signed copy.
5. Set ownership:

   Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-datadog-datasource
   ```
6. Restart Grafana.

If Grafana reports an unsigned plugin error, treat it as a bad or incomplete copy. Re-download the official signed ZIP, extract the full plugin directory including `MANIFEST.txt`, match the folder name to `grafana-datadog-datasource`, and match the ZIP architecture and Grafana version to your server. Don’t disable signature verification or allow unsigned plugins.

### Verify the installation

After you install the plugin, confirm that it loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Datadog** and verify that the plugin appears with a status of **Installed**.
3. Navigate to **Connections** &gt; **Add new connection** and search for **Datadog** to confirm that it’s available as a data source.
4. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshoot installation issues](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/install/#troubleshoot-installation-issues).

## Upgrade the plugin

Upgrade steps depend on your Grafana deployment environment.

### Grafana Cloud

Plugins update automatically on Grafana Cloud, and no manual action is required. If you experience issues after an automatic update, contact [Grafana Support](https://grafana.com/support/).

### Self-managed Grafana

1. Update the plugin:

   Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   grafana cli plugins update grafana-datadog-datasource
   ```
2. Restart Grafana.
3. Verify each data source connection with **Save &amp; test**.

To install a specific version:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana cli plugins install grafana-datadog-datasource <version>
```

For Docker or Kubernetes, append the version to the plugin name:

YAML ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-datadog-datasource <version>
```

### Roll back to a previous version

If an upgrade causes issues on a self-managed instance, pin a specific plugin version:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
grafana cli plugins install grafana-datadog-datasource <version>
```

Restart Grafana after the rollback.

> Note
>
> Rollback isn’t available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](https://grafana.com/support/).

## Uninstall the plugin

To remove the Datadog plugin from a self-managed Grafana instance:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

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

1. Go to the [Grafana account portal](https://grafana.com/orgs).
2. Select your organization and navigate to the **Plugins** tab.
3. Verify that the Datadog plugin is listed and enabled.
4. Confirm that your Cloud plan is Pro or Advanced. For details, refer to [Grafana Cloud features](https://grafana.com/docs/grafana-cloud/introduction/understand-grafana-cloud-features/).

### Install button missing or “Plugin not found”

**Cause:** Your Grafana instance doesn’t have access to the Enterprise plugin repository.

**Solution:**

- **Grafana Cloud:** Verify that the plugin is enabled at the [Grafana account portal](https://grafana.com/orgs).
- **Self-managed:** Verify that your Grafana Enterprise license is active. Set the license with the `GF_ENTERPRISE_LICENSE_TEXT` environment variable or the license path. Refer to [Grafana Enterprise license](https://grafana.com/docs/grafana/latest/administration/enterprise-licensing/).

### License errors (self-managed)

**Cause:** The `GF_ENTERPRISE_LICENSE_TEXT` environment variable contains an invalid or malformed license key.

**Solution:**

1. Verify that the license key doesn’t contain extra whitespace, line breaks, or truncated characters.
2. Confirm that the key is for the correct Grafana instance URL.
3. Check that the license hasn’t expired at the [Grafana account portal](https://grafana.com/orgs).
4. For more details about license errors, refer to [License issues](https://grafana.com/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/#license-issues).

### “Unsigned plugin” error (air-gapped installs)

**Cause:** Grafana can’t verify the plugin signature. Official catalog downloads are signed, so this usually means the ZIP is incomplete, renamed, or not the official build for your architecture and Grafana version.

**Solution:**

1. Re-download the plugin ZIP from the [Datadog plugin page](https://grafana.com/grafana/plugins/grafana-datadog-datasource) or your [Grafana account portal](https://grafana.com/orgs). Don’t use a copied or rebuilt directory.
2. Extract the complete plugin directory, including `MANIFEST.txt`.
3. Confirm the folder name is `grafana-datadog-datasource` and that the ZIP matches your Grafana version, operating system, and architecture.
4. Restart Grafana.

Don’t disable plugin signature verification. If the signature still fails after you install a complete official ZIP, contact [Grafana Support](https://grafana.com/support/).
