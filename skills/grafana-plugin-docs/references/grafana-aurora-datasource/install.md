---
title: "Install the Amazon Aurora data source plugin | Grafana Enterprise Plugins documentation"
description: "Install, upgrade, and verify the Amazon Aurora data source plugin, including network requirements for restricted and air-gapped environments."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the Amazon Aurora data source plugin

This document explains how to install, upgrade, and verify the Amazon Aurora data source plugin across different Grafana deployment environments, and describes the network access the plugin requires at runtime. After you install the plugin, refer to [Configure the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/) to set up a connection.

## Before you begin

Verify the following requirements before installing:

Expand table

| Requirement         | Details                                                                                                                                                                                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **License**         | Grafana Cloud Pro or Advanced plan, or a self-managed [Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/) that includes `grafana-aurora-datasource`.                                                                     |
| **Grafana version** | 9.4.0 or later. Private data source connect requires Grafana 10.0 or later.                                                                                                                                                                                  |
| **Network access**  | Grafana Cloud instances install the plugin from the catalog automatically. Self-managed installs need access to `grafana.com` or a local plugin ZIP file. Refer to [Network requirements](#network-requirements) for the access the plugin needs at runtime. |

## Install the plugin

Choose the installation method that matches your Grafana deployment.

### Grafana Cloud

The plugin is available to install from the plugin catalog on Pro and Advanced plans:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Amazon Aurora** and open the plugin page.
3. Click **Install**.

### Self-managed Grafana (CLI)

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-aurora-datasource
```

Restart Grafana after installation.

### Docker

Set the `GF_INSTALL_PLUGINS` environment variable:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-aurora-datasource
  - GF_ENTERPRISE_LICENSE_TEXT=<YOUR_LICENSE>
```

### Kubernetes (Helm chart)

Add the plugin to your Helm values:

YAML [Copy code to clipboard] Copy

```yaml
plugins:
  - grafana-aurora-datasource

envFromSecret: grafana-license-secret
```

Or use the `GF_INSTALL_PLUGINS` environment variable in your deployment specification:

YAML [Copy code to clipboard] Copy

```yaml
env:
  - name: GF_INSTALL_PLUGINS
    value: 'grafana-aurora-datasource'
  - name: GF_ENTERPRISE_LICENSE_TEXT
    valueFrom:
      secretKeyRef:
        name: grafana-license
        key: license.jwt
```

### Air-gapped (offline) installation

For environments where the Grafana server has no internet access:

1. Download the plugin ZIP file for your platform from the [plugin catalog](/grafana/plugins/grafana-aurora-datasource/) on a machine with internet access.
2. Transfer the ZIP file to the Grafana server.
3. Extract it to the plugins directory:

   Bash [Copy code to clipboard] Copy

   ```bash
   unzip grafana-aurora-datasource-<VERSION>.zip -d /var/lib/grafana/plugins/
   ```
4. Set ownership:

   Bash [Copy code to clipboard] Copy

   ```bash
   chown -R grafana:grafana /var/lib/grafana/plugins/grafana-aurora-datasource
   ```
5. Restart Grafana.

> Caution
>
> Installing the plugin offline doesn’t remove its runtime network requirements. In particular, MySQL-compatible engines require outbound access to `s3.amazonaws.com` when opening connections. Refer to [Network requirements](#network-requirements) before deploying in an air-gapped environment.

### Verify the installation

After installing, confirm the plugin is loaded:

1. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for **Amazon Aurora** and verify the plugin appears with a status of **Installed**.
3. If the plugin doesn’t appear, check the Grafana server logs for errors and refer to [License and setup errors](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/#license-and-setup-errors).

## Network requirements

The plugin connects to your Aurora cluster directly, so the Grafana server, or the PDC agent when using private data source connect, needs the following outbound network access at runtime:

Expand table

| Destination                           | When it’s required                                                                                                                                                 |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cluster endpoint on the database port | Always. This is the **Database Host** and **Database Port** configured in the data source.                                                                         |
| AWS STS endpoint (HTTPS)              | Only when using **Assume Role ARN**. The plugin calls AWS STS to assume the role before generating the authentication token.                                       |
| `s3.amazonaws.com` (HTTPS)            | Only for MySQL-compatible engines. The plugin downloads the RDS certificate bundle from `https://s3.amazonaws.com/rds-downloads/` each time it opens a connection. |

The RDS authentication token itself is generated by signing the request locally, so token generation doesn’t require any additional network access.

### Restricted and private networks

- **MySQL certificate bundle:** The certificate bundle URL isn’t configurable and there’s no offline alternative, so security-restricted environments must allow outbound HTTPS to `s3.amazonaws.com` to use MySQL-compatible engines. PostgreSQL-compatible engines don’t have this requirement.
- **AWS STS through AWS PrivateLink:** If Grafana or the PDC agent runs in a private subnet without internet access and you use **Assume Role ARN**, create a [VPC interface endpoint for AWS STS](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_interface_vpc_endpoints.html) (`com.amazonaws.<region>.sts`) and set the data source’s **Endpoint** field to the endpoint URL.
- **Private clusters with Grafana Cloud:** Use [private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). The PDC agent needs outbound access to the cluster endpoint on the database port and outbound access on port 22 to Grafana Cloud endpoints.

## Upgrade the plugin

On Grafana Cloud, the plugin is managed by Grafana and updates automatically.

On self-managed Grafana:

1. Update the plugin:

   Bash [Copy code to clipboard] Copy

   ```bash
   grafana cli plugins update grafana-aurora-datasource
   ```
2. Restart Grafana.
3. Verify each Aurora data source connection with **Save &amp; test**.

### Roll back to a previous version

If an upgrade causes issues on self-managed Grafana, you can pin a specific plugin version:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-aurora-datasource <VERSION>
```

Restart Grafana after the rollback. For Docker or Kubernetes, append the version to the plugin name:

YAML [Copy code to clipboard] Copy

```yaml
environment:
  - GF_INSTALL_PLUGINS=grafana-aurora-datasource <VERSION>
```

> Note
>
> Rollback isn’t available on Grafana Cloud. If you experience issues after an automatic update, contact [Grafana Support](/profile/org#support).

## Uninstall the plugin

To remove the plugin from a self-managed Grafana instance:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins remove grafana-aurora-datasource
```

Restart Grafana after uninstalling. Existing data source configurations are preserved in the Grafana database but stop working until the plugin is reinstalled.

For Docker or Kubernetes, remove `grafana-aurora-datasource` from the `GF_INSTALL_PLUGINS` variable and redeploy.

## Next steps

- [Configure the Amazon Aurora data source](/docs/plugins/grafana-aurora-datasource/latest/configure/)
- [Troubleshoot Amazon Aurora data source issues](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)
