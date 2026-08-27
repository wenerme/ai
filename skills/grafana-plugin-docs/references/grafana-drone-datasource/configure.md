---
title: "Configure the Drone data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Drone data source in Grafana, including the connection URL and API token authentication."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Drone data source

This document explains how to configure the Drone data source in Grafana.

## Before you begin

Before you configure the data source, ensure you have:

- **Drone data source plugin installed:** For installation instructions, refer to [Install the Drone data source](/docs/plugins/grafana-drone-datasource/latest/install/).
- **Grafana permissions:** Organization administrator role.
- **A Drone API token:** Find your token on the `<YOUR_DRONE_URL>/account` page of your Drone instance.
- **Network access:** Outbound connectivity from Grafana to your Drone instance over HTTPS.

## Add the data source

To add the Drone data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Drone` in the search bar.
4. Select **Drone**.
5. Click **Add new data source**.

## Configure the connection

The data source connects to your Drone instance’s API. Enter the base URL of your Drone server in the **URL** field.

### Server URL

Include the protocol, such as `https://`, and don’t add a trailing slash. The following examples show correct and incorrect URLs:

Expand table

| URL                          | Correct                  |
|------------------------------|--------------------------|
| `https://drone.company.com`  | Yes                      |
| `https://company.com/drone`  | Yes                      |
| `drone.company.com`          | No, missing `https://`   |
| `https://drone.company.com/` | No, has a trailing slash |

## Authentication

The Drone data source uses API token authentication.

Expand table

| Setting   | Description                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------------------------------|
| **Token** | The Drone API token used to authenticate with your Drone instance. Find it on the `<YOUR_DRONE_URL>/account` page. |

The token is stored securely and isn’t shown after you save the data source.

## Verify the connection

Click **Save &amp; test** to verify the connection. Grafana runs a health check that requests the list of repositories from your Drone instance. When the connection succeeds, Grafana displays a success message.

If the test fails, refer to [Troubleshoot the Drone data source](/docs/plugins/grafana-drone-datasource/latest/troubleshooting/) for solutions to common connection and authentication errors.

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Drone
    type: grafana-drone-datasource
    jsonData:
      variables:
        url: <YOUR_DRONE_URL>
    secureJsonData:
      drone.token: <YOUR_API_TOKEN>
```

Replace `<YOUR_DRONE_URL>` with the URL of your Drone instance and `<YOUR_API_TOKEN>` with your Drone API token.

### Provision with Terraform

You can provision the data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "drone" {
  type = "grafana-drone-datasource"
  name = "Drone"

  json_data_encoded = jsonencode({
    variables = {
      url = "<YOUR_DRONE_URL>"
    }
  })

  secure_json_data_encoded = jsonencode({
    "drone.token" = var.drone_token
  })
}
```

For more information, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).
