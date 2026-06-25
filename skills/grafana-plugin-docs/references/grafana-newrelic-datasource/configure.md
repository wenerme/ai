---
title: "Configure the New Relic data source | Grafana Enterprise Plugins documentation"
description: "Configure the New Relic data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the New Relic data source

This document explains how to configure the New Relic data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role or datasources:create permission via RBAC.
- **New Relic User API key:** Also called a Personal API key. To create one, refer to [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key).
- **New Relic Account ID:** To find yours, refer to [Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/).

## Add the data source

To add the New Relic data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `New Relic` in the search bar.
4. Select **New Relic**.
5. Click **Add new data source**.

## Configure settings

The following table describes the available configuration settings.

Expand table

| Setting                             | Description                                                                                                                                                              |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                            | The name used to refer to the data source in panels and queries.                                                                                                         |
| **Default**                         | Toggle to make this the default data source for new panels.                                                                                                              |
| **Personal API Key / User API key** | Your New Relic User API key. To create one, refer to [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-key).                  |
| **Account ID**                      | Your New Relic Account ID. To find yours, refer to [Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/).                 |
| **Region**                          | The New Relic region where your account is hosted. Select `US` or `EU`. When left unset, the region defaults to US.                                                      |
| **Timeout in Seconds**              | Maximum time in seconds to wait for a response from the New Relic API. Default: `300`. Increase this if you experience timeouts with complex queries or large data sets. |

## Verify the connection

Click **Save &amp; test** to verify the connection. A successful test displays the message **Plugin health check OK**.

If the test fails, refer to [Troubleshoot New Relic data source issues](/docs/plugins/grafana-newrelic-datasource/latest/troubleshooting/) for guidance on common configuration errors.

## Provision the data source

You can define the data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions the New Relic data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: New Relic
    type: grafana-newrelic-datasource
    jsonData:
      region: US
      timeoutInSeconds: 300
    secureJsonData:
      accountId: '<YOUR_ACCOUNT_ID>'
      personalApiKey: '<YOUR_PERSONAL_API_KEY>'
```

Replace `<YOUR_ACCOUNT_ID>` with your New Relic Account ID and `<YOUR_PERSONAL_API_KEY>` with your User API key.

The following table describes the available provisioning fields:

Expand table

| Field              | Location         | Description                                          |
|--------------------|------------------|------------------------------------------------------|
| `region`           | `jsonData`       | New Relic region. Set to `US` or `EU`.               |
| `timeoutInSeconds` | `jsonData`       | *(Optional)* API timeout in seconds. Default: `300`. |
| `accountId`        | `secureJsonData` | Your New Relic Account ID.                           |
| `personalApiKey`   | `secureJsonData` | Your New Relic User API key.                         |

## Provision the data source with Terraform

You can provision the New Relic data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). For more information about Terraform provisioning, refer to [Provision Grafana with Terraform](/docs/grafana/latest/administration/provisioning/terraform/).

The following example creates a New Relic data source:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "newrelic" {
  type = "grafana-newrelic-datasource"
  name = "New Relic"

  json_data_encoded = jsonencode({
    region           = "US"
    timeoutInSeconds = 300
  })

  secure_json_data_encoded = jsonencode({
    accountId      = "<YOUR_ACCOUNT_ID>"
    personalApiKey = "<YOUR_PERSONAL_API_KEY>"
  })
}
```

Replace `<YOUR_ACCOUNT_ID>` with your New Relic Account ID and `<YOUR_PERSONAL_API_KEY>` with your User API key.
