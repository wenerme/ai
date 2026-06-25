---
title: "Configure the Cloudflare data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Cloudflare data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Cloudflare data source

This document explains how to configure the Cloudflare data source in Grafana.

## Before you begin

Before you configure the data source, ensure you have:

- **Cloudflare data source plugin installed:** For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins)
- **Grafana permissions:** Organization administrator role
- **Cloudflare API token:** A user token with the required permissions (see [Required permissions](#required-permissions))

## Required permissions

When creating your Cloudflare API token, add the following permissions based on the features you want to use. In the Cloudflare dashboard, permissions follow the format **Category &gt; Resource &gt; Access Level**.

Expand table

| Category    | Resource         | Access | Scope                      | Required for          |
|-------------|------------------|--------|----------------------------|-----------------------|
| **Account** | Account Settings | Read   | All accounts (or specific) | Account queries       |
| **Zone**    | Zone             | Read   | All zones (or specific)    | Zone queries          |
| **Zone**    | Analytics        | Read   | All zones (or specific)    | DNS Analytics queries |

> Note
>
> Cloudflare Radar queries don’t require any special permissions because Radar APIs are publicly accessible.

For security best practices:

- Only grant permissions for the features you need
- Limit scope to specific accounts or zones when possible
- Use the principle of least privilege

For more information about Cloudflare API token permissions, refer to the [Cloudflare permissions documentation](https://developers.cloudflare.com/fundamentals/api/reference/permissions/).

## Create an API token

To create an API token in Cloudflare:

1. Go to the [Cloudflare API Tokens page](https://dash.cloudflare.com/profile/api-tokens).
2. Click **Create Token**.
3. Select **Create Custom Token**.
4. Add the required permissions (see [Required permissions](#required-permissions)).
5. Click **Continue to summary**, then **Create Token**.
6. Copy the token and paste it into the **Token** field in Grafana.

For detailed instructions, refer to the [Cloudflare documentation](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

> Note
>
> The Cloudflare data source only supports user tokens. Account-owned tokens aren’t supported.

## Add the data source

To add the Cloudflare data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Cloudflare` in the search bar.
4. Select **Cloudflare**.
5. Click **Add new data source**.

## Configure settings

Configure the following settings for the Cloudflare data source:

Expand table

| Setting     | Description                                                      |
|-------------|------------------------------------------------------------------|
| **Name**    | The name used to refer to the data source in panels and queries. |
| **Default** | Toggle to make this the default data source for new panels.      |

### Authentication

Expand table

| Setting   | Description                |
|-----------|----------------------------|
| **Token** | Your Cloudflare API token. |

## Verify the connection

Click **Save &amp; test** to verify the connection. A success message confirms that Grafana can connect to Cloudflare.

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Cloudflare
    type: grafana-cloudflare-datasource
    secureJsonData:
      cloudflare.token: <YOUR_CLOUDFLARE_API_TOKEN>
```

Replace `<YOUR_CLOUDFLARE_API_TOKEN>` with your Cloudflare API token.

### Provision with Terraform

You can provision the data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "cloudflare" {
  type = "grafana-cloudflare-datasource"
  name = "Cloudflare"

  secure_json_data_encoded = jsonencode({
    "cloudflare.token" = var.cloudflare_api_token
  })
}
```

For more information, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).
