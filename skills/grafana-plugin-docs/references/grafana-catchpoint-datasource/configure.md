---
title: "Configure the Catchpoint data source | Grafana Enterprise Plugins documentation"
description: "Configure the Catchpoint data source in Grafana, including authentication and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Catchpoint data source

This document explains how to configure the Catchpoint data source.

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** Organization administrator role to add a data source.
- **Catchpoint account:** Access to the Catchpoint portal.
- **Catchpoint REST API v2 key:** A bearer token generated in the Catchpoint portal.

## Key concepts

If you’re new to Catchpoint, these terms are used throughout the configuration:

Expand table

| Term                | Description                                                                                       |
|---------------------|---------------------------------------------------------------------------------------------------|
| **REST API v2 key** | The bearer token used to authenticate Grafana with the Catchpoint client API.                     |
| **Bearer token**    | An authorization credential sent with each request to the Catchpoint API.                         |
| **Client API**      | The Catchpoint REST API v2 endpoint (`https://io.catchpoint.com/api/v2`) that the plugin queries. |

## Add the data source

To add the Catchpoint data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Catchpoint` in the search bar.
4. Select **Catchpoint**.
5. Click **Add new data source**.

## Configure settings

Use the following settings to configure the data source:

Expand table

| Setting     | Description                                                      |
|-------------|------------------------------------------------------------------|
| **Name**    | The name used to refer to the data source in panels and queries. |
| **Default** | Toggle to make this the default data source for new panels.      |

## Authentication

The Catchpoint data source authenticates with the Catchpoint client API using a bearer token. Generate a REST API v2 key in the Catchpoint portal, then enter it in Grafana.

To get your REST API v2 key:

1. Log in to the Catchpoint portal.
2. Navigate to **Settings** &gt; **API**.
3. Find the **REST API V2 Key** under the **REST API** section.

Enter the key in the data source configuration:

Expand table

| Setting   | Description                                                                                                     |
|-----------|-----------------------------------------------------------------------------------------------------------------|
| **Token** | Your Catchpoint REST API v2 key. The token is stored securely and isn’t returned to the browser after you save. |

## Verify the connection

Click **Save &amp; test** to verify the connection. Grafana validates the token against the Catchpoint client API.

- On success, the data source is ready to query.
- If the token is missing or empty, the test fails with an `invalid/empty bearer token` error.
- If the token is invalid, the test fails with a `status code: 401` error.

For help resolving connection problems, refer to [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/).

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Catchpoint
    type: grafana-catchpoint-datasource
    secureJsonData:
      catchpoint.token: <CATCHPOINT_REST_API_V2_KEY>
```

Replace `<CATCHPOINT_REST_API_V2_KEY>` with your Catchpoint REST API v2 key.

## Provision with Terraform

You can also manage the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource.

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "catchpoint" {
  type = "grafana-catchpoint-datasource"
  name = "Catchpoint"

  secure_json_data_encoded = jsonencode({
    "catchpoint.token" = var.catchpoint_token
  })
}

variable "catchpoint_token" {
  type        = string
  description = "Catchpoint REST API v2 key"
  sensitive   = true
}
```

Store the token outside of version control, for example in a `TF_VAR_catchpoint_token` environment variable or a secrets manager.

## Next steps

- [Catchpoint query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-catchpoint-datasource/latest/template-variables/)
