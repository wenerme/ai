---
title: "Configure the Sumo Logic data source | Grafana Enterprise Plugins documentation"
description: "Configure the Sumo Logic data source in Grafana to connect to your Sumo Logic account."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Sumo Logic data source

To start querying your Sumo Logic data in Grafana, you need to add and configure the Sumo Logic data source. Configuration involves selecting your API region, setting request parameters, and providing your access credentials.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana version:** Grafana 11.6.7 or later.
- **Grafana plan:** A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **Grafana permissions:** Organization administrator role.
- **Sumo Logic account:** An active [Sumo Logic](https://www.sumologic.com/) account.
- **Sumo Logic access credentials:** An access ID and access key pair. Refer to the [Sumo Logic Access Keys documentation](https://help.sumologic.com/docs/manage/security/access-keys/) for instructions on generating credentials.

## Add the data source

To add the Sumo Logic data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Sumo Logic` in the search bar.
4. Select **Sumo Logic**.
5. Click **Add new data source**.

## Configure settings

The **API Region** section contains the connection and request settings. The following table describes the available settings.

Expand table

| Setting              | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API region / URL** | (Required) The Sumo Logic API endpoint for your deployment. Select a preset region from the drop-down, or type a custom URL directly into the field. Available regions: US1 (default), US2, EU, AU, CA, DE, IN, JP, FED. Refer to [Sumo Logic endpoints by deployment](https://help.sumologic.com/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) to determine your region. |
| **Timeout**          | Maximum time in seconds to wait for API responses. Increase this value if you experience timeout errors with complex queries or large time ranges. Minimum: `1`. Default: `30`.                                                                                                                                                                                                                                 |
| **Interval**         | Polling interval in milliseconds for log search job status checks. Lower values return results faster but generate more API requests. Increase this value if you encounter rate limiting. Minimum: `200`. Default: `1000`.                                                                                                                                                                                      |

The following table lists the preset API regions.

Expand table

| Region | URL                                  |
|--------|--------------------------------------|
| US1    | `https://api.sumologic.com/api/`     |
| US2    | `https://api.us2.sumologic.com/api/` |
| EU     | `https://api.eu.sumologic.com/api/`  |
| AU     | `https://api.au.sumologic.com/api/`  |
| CA     | `https://api.ca.sumologic.com/api/`  |
| DE     | `https://api.de.sumologic.com/api/`  |
| IN     | `https://api.in.sumologic.com/api/`  |
| JP     | `https://api.jp.sumologic.com/api/`  |
| FED    | `https://api.fed.sumologic.com/api/` |

## Authentication

The Sumo Logic data source uses access ID and access key authentication. This is the only supported authentication method.

To configure authentication:

1. In the Sumo Logic console, generate an access ID and access key pair. Refer to the [Sumo Logic Access Keys documentation](https://help.sumologic.com/docs/manage/security/access-keys/) for instructions.
2. In the data source configuration, enter your credentials in the **Authentication method** section.

Expand table

| Setting       | Description                                                                                                                         |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **AccessID**  | Your Sumo Logic access ID.                                                                                                          |
| **AccessKey** | Your Sumo Logic access key. This value is stored securely. To change a previously saved key, click **Reset** and enter a new value. |

## Verify the connection

Click **Save &amp; test** to verify the data source is configured correctly. A successful connection displays the message **Sumo Logic successfully connected**.

If the test fails, refer to [Troubleshooting](/docs/plugins/grafana-sumologic-datasource/latest/troubleshooting/) for common errors and solutions.

## Provision the data source

You can define and configure the Sumo Logic data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions the Sumo Logic data source with access key authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Sumo Logic
    type: grafana-sumologic-datasource
    jsonData:
      apiUrl: https://api.sumologic.com/api/
      authMethod: accessKey
      accessId: <ACCESS_ID>
      timeout: 30
      interval: 1000
    secureJsonData:
      accessKey: <ACCESS_KEY>
```

Replace `<ACCESS_ID>` and `<ACCESS_KEY>` with your Sumo Logic credentials. For a complete list of available provisioning settings, refer to the settings tables in the [Configure settings](#configure-settings) and [Authentication](#authentication) sections.

### Provision with Terraform

You can provision the Sumo Logic data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). For more information about Grafana Terraform provisioning, refer to [Provision Grafana with Terraform](/docs/grafana/latest/administration/provisioning/terraform/).

The following example provisions the Sumo Logic data source with access key authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "sumologic" {
  type = "grafana-sumologic-datasource"
  name = "Sumo Logic"

  json_data_encoded = jsonencode({
    apiUrl     = "https://api.sumologic.com/api/"
    authMethod = "accessKey"
    accessId   = "<ACCESS_ID>"
    timeout    = 30
    interval   = 1000
  })

  secure_json_data_encoded = jsonencode({
    accessKey = "<ACCESS_KEY>"
  })
}
```

Replace `<ACCESS_ID>` and `<ACCESS_KEY>` with your Sumo Logic credentials.

## Next steps

After configuring the data source, you can:

- [Build queries](/docs/plugins/grafana-sumologic-datasource/latest/query-editor/) using the metrics visual builder or raw query editor.
- [Create template variables](/docs/plugins/grafana-sumologic-datasource/latest/template-variables/) for dynamic dashboards.
- [Set up alert rules](/docs/plugins/grafana-sumologic-datasource/latest/alerting/) to monitor your Sumo Logic metrics.
