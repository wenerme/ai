---
title: "Configure the Honeycomb data source | Grafana Enterprise Plugins documentation"
description: "Configure the Honeycomb data source for Grafana, including API key, team, environment, and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Honeycomb data source

This document explains how to configure the Honeycomb data source for Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **License:** A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **Honeycomb access:** An active Honeycomb Enterprise team and a Honeycomb API key with the required permissions.
- **Plugin installed:** Refer to [Install and upgrade the Honeycomb data source plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/).

## Key concepts

If you’re new to Honeycomb, these terms are used throughout the configuration:

Expand table

| Term                   | Description                                                                                                                            |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Team**               | Your Honeycomb organization unit. The team name must match the team associated with your API key and is used for data links.           |
| **Environment**        | A Honeycomb environment within a team (for example, production or test). Optional for classic Honeycomb setups.                        |
| **Dataset**            | A collection of events in Honeycomb that you query from Grafana.                                                                       |
| **API key**            | A Honeycomb credential that authenticates Grafana to the Honeycomb API.                                                                |
| **Time Window (days)** | The maximum number of days of historical data the data source allows when querying. Maps to `jsonData.retentionLimit`. Default is `7`. |

## Get an API key from Honeycomb

Before configuring the data source, you need an API key from Honeycomb:

1. Go to [https://ui.honeycomb.io/account](https://ui.honeycomb.io/account).
2. Create a new API key or use an existing one.
3. Copy your API key.

### Required API key permissions

Your Honeycomb API key must have the following permissions enabled:

Expand table

| Permission                     | Description                                      |
|--------------------------------|--------------------------------------------------|
| **Manage Queries and Columns** | Required to access dataset columns and metadata. |
| **Run Queries**                | Required to execute queries against your data.   |

Without these permissions, the data source connection test fails with a permissions error.

## Add the Honeycomb data source

To install the plugin, refer to [Install and upgrade the Honeycomb data source plugin](/docs/plugins/grafana-honeycomb-datasource/latest/install/). For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

Complete the following steps to add a new Honeycomb data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Honeycomb` in the search bar.
4. Select the Honeycomb data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you set up your Honeycomb configuration.

## Honeycomb settings

Configure the following settings for your Honeycomb data source:

Expand table

| Field                 | Description                                                                                         |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| **Name**              | A name for this particular Honeycomb data source.                                                   |
| **Honeycomb API Key** | [API key from Honeycomb](#get-an-api-key-from-honeycomb). Stored in `secureJsonData.apiKey`.        |
| **URL**               | URL to the Honeycomb API. Default: `https://api.honeycomb.io`. Stored in `jsonData.hostname`.       |
| **Team Name**         | The Honeycomb team associated with the API key. Required. Stored in `jsonData.team`.                |
| **Environment Name**  | Honeycomb environment name associated with the API key. Optional. Stored in `jsonData.environment`. |

## Advanced settings

Expand table

| Field                  | Description                                                                                                                                            |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Time Window (days)** | The number of days of historical data the data source can query. Default is `7` due to Honeycomb API limitations. Stored in `jsonData.retentionLimit`. |

[Honeycomb data source configuration settings](/media/docs/plugins/honeycomb_config.png)

## Verify the connection

Click **Save &amp; test** to verify the connection. When the test succeeds, Grafana shows a message similar to:

`Data source is working. Team name: <TEAM_NAME>. Environment: <ENVIRONMENT_NAME>`

The team and environment names come from the API key’s associated team and environment in Honeycomb. If the API key isn’t associated with an environment, such as on Honeycomb Classic, the environment value appears as `-`.

## Configure with provisioning

You can configure the Honeycomb data source using configuration files with the Grafana provisioning system. To learn more about how the provisioning system works, including all of the data source settings, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

Example:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Honeycomb
    type: grafana-honeycomb-datasource
    jsonData:
      hostname: https://api.honeycomb.io
      team: <TEAM_NAME>
      environment: <ENVIRONMENT_NAME>
      retentionLimit: 7
    secureJsonData:
      apiKey: <API_KEY>
```

## Configure with Terraform

You can configure the Honeycomb data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).

Example:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "honeycomb" {
  type = "grafana-honeycomb-datasource"
  name = "Honeycomb"

  json_data_encoded = jsonencode({
    hostname       = "https://api.honeycomb.io"
    team           = "my-team"
    environment    = "production"
    retentionLimit = 7
  })

  secure_json_data_encoded = jsonencode({
    apiKey = var.honeycomb_api_key
  })
}
```

For more information about the Grafana Terraform provider, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs).
