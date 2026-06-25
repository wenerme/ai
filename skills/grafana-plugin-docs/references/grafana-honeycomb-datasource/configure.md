---
title: "Configure the Honeycomb data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Honeycomb data source for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Honeycomb data source

This document explains how to configure the Honeycomb data source for Grafana.

## Before you begin

To configure this data source, you need:

- An active Honeycomb Enterprise team
- A [Grafana Cloud](/products/cloud/) Free, Advanced, or Trial account, or an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/)
- A Honeycomb API key with the required permissions

## Get an API key from Honeycomb

Before configuring the data source, you need an API key from Honeycomb:

1. Go to [https://ui.honeycomb.io/account](https://ui.honeycomb.io/account).
2. Create a new API key or use an existing one.
3. Copy your API key.

### Required API key permissions

Your Honeycomb API key must have the following permissions enabled:

Expand table

| Permission                 | Description                                      |
|----------------------------|--------------------------------------------------|
| Manage Queries and Columns | Required to access dataset columns and metadata. |
| Run Queries                | Required to execute queries against your data.   |

Without these permissions, the data source connection test will fail with a permissions error.

## Add the Honeycomb data source

For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/datasources/add-a-data-source/).

Complete the following steps to add a new Honeycomb data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Honeycomb` in the search bar.
4. Select the Honeycomb data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you will set up your Honeycomb configuration.

## Honeycomb settings

Configure the following settings for your Honeycomb data source:

Expand table

| Field             | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| Name              | A name for this particular Honeycomb data source.                  |
| Honeycomb API Key | [API key from Honeycomb](#get-an-api-key-from-honeycomb).          |
| URL               | URL to the Honeycomb API. For example, `https://api.honeycomb.io`. |
| Team Name         | The Honeycomb team associated with the API key.                    |
| Environment Name  | Honeycomb environment name associated with the API key.            |

## Advanced settings

Expand table

| Field              | Description                                                                                                       |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| Time Window (days) | The number of days of historical data the data source can query. Default is `7` due to Honeycomb API limitations. |

## Configure with provisioning

You can configure the Honeycomb data source using configuration files with Grafana’s provisioning system. To learn more about how the provisioning system works, including all of the data source settings, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

Example:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Honeycomb
    type: grafana-honeycomb-datasource
    jsonData:
      hostname: https://api.honeycomb.io
      team: Team
      environment: test
    secureJsonData:
      apiKey: API Key
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
    hostname    = "https://api.honeycomb.io"
    team        = "my-team"
    environment = "production"
  })

  secure_json_data_encoded = jsonencode({
    apiKey = var.honeycomb_api_key
  })
}
```

For more information about the Grafana Terraform provider, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs).
