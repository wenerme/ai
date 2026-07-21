---
title: "Configure the Vercel data source | Grafana Enterprise Plugins documentation"
description: "Configure the Vercel data source in Grafana, including access token authentication, Team ID, and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Vercel data source

This document explains how to configure the Vercel data source in Grafana.

## Before you begin

Before you configure the data source, ensure you have the following:

- The Grafana `Organization administrator` role. Only administrators can add and configure data sources.
- A Vercel access token. For more information, refer to [Creating an access token](https://vercel.com/docs/rest-api#creating-an-access-token) in the Vercel documentation.
- If you scoped your token to a team, the ID of that Vercel team.

## Key concepts

If you’re new to Vercel, this page uses the following terms:

Expand table

| Term             | Description                                                                                                                 |
|------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Access token** | A bearer token that authenticates requests to the Vercel REST API.                                                          |
| **Token scope**  | The set of resources a token can access. A token can access either your full account or a specific team.                    |
| **Team ID**      | The identifier of a Vercel team, in the form `team_xxxxxxxxxxxxxxxxxxxxxxxx`. Required when you scope your token to a team. |

## Add the data source

To add the Vercel data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Enter `Vercel` in the search bar.
4. Select **Vercel**.
5. Click **Add new data source**.

## Configure settings

Configure the following settings for the data source.

Expand table

| Setting     | Description                                                                                                                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**    | The name used to refer to the data source in panels and queries.                                                                                                                                        |
| **Default** | Toggle to make this the default data source for new panels.                                                                                                                                             |
| **Team ID** | The ID of the Vercel team to query, for example `team_1a2b3c4d5e6f7g8h9i0j1k2l`. Provide this value when you scope your access token to a team. Queries reference it through the `${team_id}` variable. |

## Authentication

The Vercel data source authenticates with a bearer access token.

### Access token

Vercel scopes access tokens to either your full account or a specific team. If you scope a token to a team, you must also provide a **Team ID** that matches the scope of the token.

To create and add an access token:

1. Log in to the [Vercel account tokens page](https://vercel.com/account/tokens).
2. Click **Create Token**, name the token, set a scope, and set an expiration date.
3. Copy the generated token.
4. In the Grafana data source configuration, under **Authentication**, enter the token in the **Token** field.
5. If the token is team-scoped, enter the matching team in the **Team ID** field.

## Verify the connection

Click **Save &amp; test** to verify the configuration. The health check retrieves the list of projects for the authenticated account or team. When the test succeeds, Grafana displays `health check succeeded for 'Retrieve a list of projects' query`, which confirms that the access token, and the Team ID when required, are valid.

If the test fails, Grafana displays the reason returned by the health check. For example, a missing or empty token returns `invalid/empty bearer token`. For more failure messages and fixes, refer to [Troubleshoot the Vercel data source](/docs/plugins/grafana-vercel-datasource/latest/troubleshooting/).

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions a Vercel data source with an access token and a Team ID:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Vercel
    type: grafana-vercel-datasource
    jsonData:
      variables:
        team_id: team_1a2b3c4d5e6f7g8h9i0j1k2l
    secureJsonData:
      vercel.token: your-token-here
```

Omit the `variables.team_id` value when you scope your access token to your full account.

## Provision the data source with Terraform

You can also provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the [`grafana_data_source`](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source) resource. You set the Team ID through the `variables` object in `json_data_encoded`, and you set the access token through `secure_json_data_encoded`.

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "vercel" {
  type = "grafana-vercel-datasource"
  name = "Vercel"

  json_data_encoded = jsonencode({
    variables = {
      team_id = "team_1a2b3c4d5e6f7g8h9i0j1k2l"
    }
  })

  secure_json_data_encoded = jsonencode({
    "vercel.token" = "your-token-here"
  })
}
```

Omit the `variables` object when you scope your access token to your full account.
