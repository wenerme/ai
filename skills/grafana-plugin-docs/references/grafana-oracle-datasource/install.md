---
title: "Install and upgrade the Oracle data source plugin | Grafana Enterprise Plugins documentation"
description: "Install and upgrade the Oracle data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install and upgrade the Oracle data source plugin

This document covers how to install, upgrade, and verify the Oracle data source plugin across different Grafana deployment environments. Once the plugin is installed, refer to [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                            |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | Grafana Cloud Pro or Advanced plan, or a self-managed Grafana Enterprise license that includes `grafana-oracle-datasource`.                                        |
| **Grafana version** | 11.6.7 or later (for plugin v3.4.x). Refer to the [version compatibility](#version-compatibility) table for older versions.                                        |
| **Architecture**    | `linux/amd64` only. ARM64 (including Apple Silicon) is not supported.                                                                                              |
| **Network access**  | Grafana Cloud instances require internet access to download the plugin from the catalog. Self-managed installs need access to `grafana.com` or a local plugin ZIP. |

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

The plugin is available to install from the plugin catalog on Pro and Advanced plans. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**, search for “Oracle”, and click **Install**.

### Self-managed Grafana (CLI)

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-oracle-datasource
```

Restart Grafana after installation.

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-oracle-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-oracle-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment spec:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: "grafana-oracle-datasource"
  - name: GF_ENTERPRISE_LICENSE_TEXT
    valueFrom:
      secretKeyRef:
        name: grafana-license
        key: license.jwt
```

> Note
>
> The Oracle plugin only supports the `linux/amd64` architecture. If your Kubernetes nodes run on ARM64, the plugin binary won’t load.

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
        curl -sL https://grafana.com/api/plugins/grafana-oracle-datasource/versions/latest/download \
          -o /plugins/grafana-oracle-datasource.zip && \
        unzip /plugins/grafana-oracle-datasource.zip -d /plugins/
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
   unzip grafana-oracle-datasource-3.4.0.linux_amd64.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-oracle-datasource
   ```
5. Restart Grafana.

### Verify the installation

After installing, confirm the plugin is loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for “Oracle” and verify the plugin appears with a status of **Installed**.
3. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [Troubleshooting: Licensing issues](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#licensing-issues).

## Upgrade the plugin

Always check the version compatibility table before upgrading to ensure your Grafana version supports the target plugin version.

### Version compatibility

Expand table

| Plugin version | Minimum Grafana version | Notes                                                      |
|----------------|-------------------------|------------------------------------------------------------|
| 3.4.x          | 11.6.7                  | Current release. Row Limit setting added.                  |
| 3.3.x          | 11.6.7                  | TNSNames restored (v3.3.0). Field migration fix (v3.3.3).  |
| 3.0.x to 3.2.x | 10.0.0                  | New go-ora driver. Breaking changes for Wallet/LDAP users. |
| 2.x            | 8.0.0                   | Legacy Oracle Instant Client driver.                       |

> Warning
>
> Plugin v2.x is not compatible with Grafana 13.x or later. Upgrade to plugin v3.x before upgrading Grafana.

### Upgrade steps

1. **Back up data source settings** before upgrading (export via API or note current configuration).
2. Install the new plugin version:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-oracle-datasource
   ```
3. Restart Grafana.
4. Verify each data source connection with **Save &amp; test**.
5. If using TNSNames, confirm the **TNSName** field retained its value after upgrade (a v3.3.2 regression cleared this field; fixed in v3.3.3).

### Troubleshoot upgrade issues

Expand table

| Symptom                                                | Solution                                                                                                                                                                                                    |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `oracle-plugin_linux_amd64: no such file or directory` | The plugin binary is missing. Reinstall using `grafana cli plugins install grafana-oracle-datasource` and restart Grafana.                                                                                  |
| `Could not load plugin: 404 Not Found`                 | The plugin files are corrupted. Uninstall (`grafana cli plugins remove grafana-oracle-datasource`), reinstall, and restart.                                                                                 |
| “Unsigned plugin” error                                | Ensure you’re installing from the official Grafana plugin catalog. For air-gapped installs, set `allow_loading_unsigned_plugins = grafana-oracle-datasource` in `grafana.ini` only if you trust the source. |
| Data source settings corrupted after upgrade           | Re-enter connection details and click **Save &amp; test**. For provisioned data sources, redeploy the provisioning YAML.                                                                                    |

Refer to [Upgrade from v2.x to v3.x](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#upgrade-from-v2x-to-v3x) for breaking changes specific to the v3 migration.

### Roll back to a previous version

If an upgrade causes issues, you can pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-oracle-datasource 3.3.3
```

Restart Grafana after the rollback. For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-oracle-datasource 3.3.3
```

> Note
>
> Rollback is not available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](/support/).

## Uninstall the plugin

To remove the Oracle plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-oracle-datasource
```

Restart Grafana after uninstalling. Existing data source configurations are preserved in the Grafana database but become non-functional until the plugin is reinstalled.

For Docker or Kubernetes, remove `grafana-oracle-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.
