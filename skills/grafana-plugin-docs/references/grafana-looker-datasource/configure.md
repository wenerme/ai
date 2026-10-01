---
title: "Configure the Looker data source | Grafana Enterprise Plugins documentation"
description: "Configure the Looker data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Looker data source

This document explains how to configure the Looker data source. To install the plugin, refer to [Install the Looker data source plugin](/docs/plugins/grafana-looker-datasource/latest/install/).

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** The `Organization administrator` role, which you need to add and configure data sources.
- **A Looker instance URL:** The base URL of your Looker instance, such as `https://xxxxx.looker.app`.
- **Looker API credentials:** A client ID and client secret with permission to run queries and read the models you plan to visualize.

## Key concepts

If you’re new to Looker, these terms are used throughout the configuration:

Expand table

| Term                     | Description                                                                                                                           |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **API credentials**      | A `client_id` and `client_secret` pair generated for a Looker user. The data source uses them to authenticate against the Looker API. |
| **Looker URL**           | The base URL of your Looker instance, for example `https://xxxxx.looker.app`. The data source calls the Looker API at this host.      |
| **LookML model**         | A Looker project artifact that defines the explores, views, and fields you can query.                                                 |
| **Role and permissions** | The Looker roles and permission sets that determine which models and data the credentials can access.                                 |

## Get Looker API credentials

To connect Grafana to Looker, you need a client ID and client secret from your Looker instance. To generate them, in Looker, navigate to **Admin** &gt; **Users**, select a user, click **Edit Keys**, then click **New API Key**. For full instructions, refer to [Looker API authentication](https://cloud.google.com/looker/docs/api-auth).

Use credentials for a user or service account whose role and permission set grant read access to the models you want to query.

## Add the data source

To add the Looker data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Looker` in the search bar.
4. Select **Looker**.
5. Click **Add new data source**.

## Configure settings

Set the following options to connect to your Looker instance.

Expand table

| Setting                  | Description                                                                                                                          |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                 | The name used to refer to the data source in panels and queries.                                                                     |
| **Default**              | Toggle to make this the default data source for new panels.                                                                          |
| **Looker URL**           | The base URL of your Looker instance, such as `https://xxxxx.looker.app`.                                                            |
| **Looker Client ID**     | The client ID from your Looker API credentials.                                                                                      |
| **Looker Client Secret** | The client secret from your Looker API credentials. This value is stored encrypted and isn’t returned to the browser after you save. |

## Authentication

The Looker data source authenticates to the Looker API with a client ID and client secret. Enter the **Looker Client ID** and **Looker Client Secret** from your API credentials. Grafana exchanges these credentials for a short-lived API token when it queries Looker.

## Verify the connection

Click **Save &amp; test** to verify the connection. On success, Grafana displays a message similar to `Successfully connected to Looker. 5 LookML models found`, where the number reflects the models your credentials can access.

If the test fails, refer to [Troubleshoot Looker data source issues](/docs/plugins/grafana-looker-datasource/latest/troubleshooting/).

## Provision with YAML files

You can define the Looker data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions a Looker data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Looker
    type: grafana-looker-datasource
    jsonData:
      base_url: https://xxxxx.looker.app
      client_id: <YOUR_LOOKER_CLIENT_ID>
    secureJsonData:
      client_secret: <YOUR_LOOKER_CLIENT_SECRET>
```

The following table describes the available `jsonData` and `secureJsonData` fields:

Expand table

| Field           | Location         | Description                                                               |
|-----------------|------------------|---------------------------------------------------------------------------|
| `base_url`      | `jsonData`       | The base URL of your Looker instance, such as `https://xxxxx.looker.app`. |
| `client_id`     | `jsonData`       | The client ID from your Looker API credentials.                           |
| `client_secret` | `secureJsonData` | The client secret from your Looker API credentials.                       |

## Configure Looker with Terraform

You can configure the Looker data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

The following example provisions a Looker data source and defines the required variables:

Terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.0"
    }
  }
}

provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

resource "grafana_data_source" "looker" {
  type = "grafana-looker-datasource"
  name = "Looker"

  json_data_encoded = jsonencode({
    base_url  = var.looker_base_url
    client_id = var.looker_client_id
  })

  secure_json_data_encoded = jsonencode({
    client_secret = var.looker_client_secret
  })
}

# Variables
variable "grafana_url" {
  description = "Grafana instance URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "grafana_auth" {
  description = "Grafana authentication, such as admin:password or a service account token"
  type        = string
  sensitive   = true
}

variable "looker_base_url" {
  description = "Base URL of your Looker instance"
  type        = string
}

variable "looker_client_id" {
  description = "Looker API client ID"
  type        = string
}

variable "looker_client_secret" {
  description = "Looker API client secret"
  type        = string
  sensitive   = true
}
```

## Next steps

- [Use the Looker query editor](/docs/plugins/grafana-looker-datasource/latest/query-editor/)
- [Configure template variables](/docs/plugins/grafana-looker-datasource/latest/template-variables/)
