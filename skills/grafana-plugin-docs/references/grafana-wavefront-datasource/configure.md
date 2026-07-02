---
title: "Configure the Wavefront data source | Grafana Enterprise Plugins documentation"
description: "Configure the Wavefront data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Wavefront data source

This document explains how to configure the Wavefront data source in Grafana.

## Before you begin

Before you configure the data source, make sure you have:

- **Grafana permissions:** An administrator role for the Grafana organization.
- **Wavefront tenant URL:** For example, `https://myenvironment.wavefront.com`.
- **Wavefront API token:** Generated from a user account or a service account. For details, refer to [Generate a Wavefront API token](#generate-a-wavefront-api-token).

## Generate a Wavefront API token

You can authenticate with a user token or a service account token. Service accounts are recommended for shared Grafana deployments because they aren’t tied to an individual user.

### Generate a user account token

1. Sign in to your Wavefront tenant.
2. Click the gear icon in the top right of the page and select your user name (for example, `me@grafana.com`).
3. Select the **API Access** tab at the top of the user page.
4. Copy an existing token or click **Generate**.
5. Save the token for the next step.

### Generate a service account token

1. Sign in to your Wavefront tenant.
2. Click the gear icon in the top right of the page and select **Account management**.
3. In the left navigation, select **Accounts, Groups, &amp; Roles**.
4. Select the **Service Accounts** tab and click **Create New Account**.
5. Enter a name for the service account.
6. Under **Permissions**, select **Accounts, Groups, &amp; Roles**.
7. Under **Tokens**, copy the generated token.

> Note
>
> The service account token is displayed only once. Save it before leaving the page.

## Add the data source

To add the Wavefront data source in Grafana:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Wavefront` in the search bar.
4. Select **Wavefront**.
5. Click **Add new data source**.

## Configure settings

The configuration page has a general settings area at the top followed by two plugin sections: **Wavefront settings** and **Customization**.

### General settings

Expand table

| Setting     | Description                                                                                               |
|-------------|-----------------------------------------------------------------------------------------------------------|
| **Name**    | The display name for this data source instance. Panels and queries refer to the data source by this name. |
| **Default** | Toggle to use this data source as the default for new panels.                                             |

### Wavefront settings

Expand table

| Setting     | Description                                                                                                                                                                                                                  |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API URL** | The URL you use to access your Wavefront tenant, for example `https://myenvironment.wavefront.com`. The field is pre-filled with `https://try.wavefront.com` (VMware’s public demo tenant); replace it with your tenant URL. |
| **Token**   | The Wavefront API token from a user or service account. The token is stored as a secure setting. To rotate a saved token, click **Reset** next to the field, enter the new token, and click **Save &amp; test**.             |

### Customization

Expand table

| Setting                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Request timeout in seconds** | Timeout for Wavefront API requests. Defaults to `30` seconds if left blank.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Enable Secure Socks Proxy**  | Route the Wavefront connection through Grafana’s [SOCKS5 connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/) to reach a tenant on a different network. The switch only appears when the `secureSocksDSProxyEnabled` feature toggle is on and Grafana is v10.0.0 or later. This switch is also how you enable [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) for the Wavefront data source in Grafana Cloud. |

## Verify the connection

Click **Save &amp; test** to verify the configuration. When the connection succeeds, Grafana displays the message `OK`.

If the test fails, Grafana displays one of the following messages:

Expand table

| Message                                                                           | Cause                                                          |
|-----------------------------------------------------------------------------------|----------------------------------------------------------------|
| `Enter an API URL.`                                                               | The **API URL** field is empty.                                |
| `Enter a token.`                                                                  | The **Token** field is empty.                                  |
| `Could not connect to Wavefront. This usually happens when the URL is incorrect.` | Wavefront returned a `400 Bad Request`. Check the **API URL**. |
| `The credentials are incorrect. Check that the token is correct.`                 | Wavefront returned a `401 Unauthorized`. Check the **Token**.  |

For more error scenarios, refer to [Troubleshoot the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/troubleshooting/).

## Provision the data source

You can provision the Wavefront data source with either a Grafana provisioning YAML file or the Grafana Terraform provider.

### Provision the data source with YAML

Define the data source in a YAML file under Grafana’s provisioning directory. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Wavefront
    type: grafana-wavefront-datasource
    access: proxy
    editable: true
    jsonData:
      url: <WAVEFRONT_TENANT_URL>
      requestTimeout: 30
      enableSecureSocksProxy: false
    secureJsonData:
      token: <WAVEFRONT_API_TOKEN>
```

Replace the placeholders with your values:

- `<WAVEFRONT_TENANT_URL>` - Your Wavefront tenant URL, for example `https://myenvironment.wavefront.com`.
- `<WAVEFRONT_API_TOKEN>` - A Wavefront API token with permission to read metrics and events.

Set `enableSecureSocksProxy` to `true` only when you need to route the connection through a secure socks proxy.

### Provision the data source with Terraform

You can provision the Wavefront data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "wavefront" {
  type = "grafana-wavefront-datasource"
  name = "Wavefront"
  url  = "https://myenvironment.wavefront.com"

  json_data_encoded = jsonencode({
    url                    = "https://myenvironment.wavefront.com"
    requestTimeout         = 30
    enableSecureSocksProxy = false
  })

  secure_json_data_encoded = jsonencode({
    token = var.wavefront_api_token
  })
}

variable "wavefront_api_token" {
  type      = string
  sensitive = true
}
```

Set the `url` attribute on the resource and the `url` key inside `json_data_encoded` to the same Wavefront tenant URL. The plugin reads the URL from `jsonData`; the resource-level `url` is displayed in the Grafana UI.

## Next steps

- Learn how to [build queries with the Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/).
- Create dynamic dashboards with [Wavefront template variables](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/).
