---
title: "Configure the Sentry data source | Grafana Plugins documentation"
description: "Configure the Sentry data source in Grafana, including authentication setup and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Sentry data source

This document explains how to configure the Sentry data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana version:** Grafana 10.4.0 or later.
- **Grafana permissions:** Organization administrator role. Refer to [Permissions](/docs/grafana/latest/administration/roles-and-permissions/) for more information.
- **Sentry account:** An active Sentry account.
- **Sentry role:** The Admin, Manager, or Owner role in Sentry, required to create an internal integration token.

## Get an authentication token from Sentry

To configure the Sentry data source plugin, you need an internal integration token from Sentry:

1. Go to `https://sentry.io`.
2. Navigate to **Settings** &gt; **Developer Settings** &gt; **Custom Integrations**.
3. Click **Create New Integration** and select **Internal Integration**.
4. Enter a valid name, such as *Grafana*.
5. Under **Permissions**, grant **Read** access to the required resources, such as **Project**, **Issue &amp; Event**, and **Organization**.
6. Click **Save Changes**, then scroll down to **Tokens** and click **New Token**.
7. Copy the token for use in the **Sentry Auth Token** field when configuring the data source in Grafana.

> Note
>
> The Admin, Manager, or Owner role in Sentry is required to create internal integrations.

## Add the data source

To add the Sentry data source in Grafana:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Sentry` in the search bar.
4. Select **Sentry**.
5. Click **Add new data source**.

## Configure settings

The following table describes the available configuration settings.

### Sentry settings

Expand table

| Setting               | Description                                                                                                                                                                                |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Sentry URL**        | (Required) The Sentry URL to connect to. Defaults to `https://sentry.io`. Set this to your self-hosted Sentry URL if you aren’t using the hosted service.                                  |
| **Sentry Org**        | (Required) The Sentry organization slug. This is the last segment of your organization URL: `https://sentry.io/organizations/{organization_slug}/`. Enter only the slug, not the full URL. |
| **Sentry Auth Token** | (Required) The authentication token from Sentry. Create one from `https://sentry.io/settings/{organization_slug}/developer-settings/` using the steps in the previous section.             |

### Additional settings

These optional settings provide more control over your data source connection.

Expand table

| Setting                       | Description                                                                                                                                                                                 |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Skip TLS Verify**           | Skip TLS certificate verification. Use this option for self-hosted Sentry instances with self-signed certificates.                                                                          |
| **Enable Secure Socks Proxy** | Enable proxying the data source connection through the secure socks proxy to a different network. Available in Grafana 10.0.0 and later when the proxy is enabled in Grafana configuration. |

## Private data source connect

> Note
>
> Only for Grafana Cloud users.

Private data source connect, or PDC, allows you to establish a private, secured connection between a Grafana Cloud instance, or stack, and data sources secured within a private network. Click the drop-down to locate the URL for PDC. For more information regarding Grafana PDC, refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/) for instructions on setting up a PDC connection.

Click **Manage private data source connect** to open your PDC connection page and view your configuration details.

## Verify the connection

Click **Save &amp; test** to verify the connection. A successful test displays the message: **plugin health check successful. N projects found.**, where *N* is the number of projects accessible with the configured credentials. If the test fails, refer to [Troubleshoot Sentry data source issues](/docs/plugins/grafana-sentry-datasource/latest/troubleshooting/) for common solutions.

## Provision the data source

You can define the Sentry data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Sentry
    type: grafana-sentry-datasource
    access: proxy
    jsonData:
      url: https://sentry.io
      orgSlug: <ORGANIZATION_SLUG>
    secureJsonData:
      authToken: <AUTH_TOKEN>
```

The following table describes the provisioning keys.

Expand table

| Key                               | Description                                                                |
|-----------------------------------|----------------------------------------------------------------------------|
| `jsonData.url`                    | The Sentry URL. Defaults to `https://sentry.io`.                           |
| `jsonData.orgSlug`                | The Sentry organization slug.                                              |
| `jsonData.tlsSkipVerify`          | Set to `true` to skip TLS certificate verification for self-hosted Sentry. |
| `jsonData.enableSecureSocksProxy` | Set to `true` to proxy the connection through the secure socks proxy.      |
| `secureJsonData.authToken`        | The Sentry authentication token.                                           |

## Provision the data source with Terraform

You can provision the Sentry data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). Use the `grafana_data_source` resource to create and manage data source instances.

### Basic Terraform provisioning

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "sentry" {
  type = "grafana-sentry-datasource"
  name = "Sentry"

  json_data_encoded = jsonencode({
    url     = "https://sentry.io"
    orgSlug = "<ORGANIZATION_SLUG>"
  })

  secure_json_data_encoded = jsonencode({
    authToken = "<AUTH_TOKEN>"
  })
}
```

### Terraform provisioning for self-hosted Sentry

The following example configures the data source for a self-hosted Sentry instance with TLS verification disabled:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "sentry" {
  type = "grafana-sentry-datasource"
  name = "Sentry (self-hosted)"

  json_data_encoded = jsonencode({
    url           = "https://sentry.example.com"
    orgSlug       = "<ORGANIZATION_SLUG>"
    tlsSkipVerify = true
  })

  secure_json_data_encoded = jsonencode({
    authToken = "<AUTH_TOKEN>"
  })
}
```

For more information about the Grafana Terraform provider, refer to the [provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).
