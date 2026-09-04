---
title: "Configure the Zendesk data source | Grafana Enterprise Plugins documentation"
description: "Configure the Zendesk data source in Grafana, including authentication and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Zendesk data source

This document explains how to configure the Zendesk data source and provision it with configuration files.

## Before you begin

Before you configure the data source, ensure you have:

- **The plugin installed:** The Zendesk plugin installed in your Grafana instance. Refer to [Install the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/install/).
- **Grafana permissions:** The organization administrator role. Only users with this role can add data sources.
- **A Zendesk subdomain:** The subdomain of your Zendesk instance.
- **A Zendesk API token:** An API token with access to the resources you want to query. Refer to [Managing access to the Zendesk API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API) to create one.

## Key concepts

If you’re new to Zendesk, these terms are used throughout the configuration:

Expand table

| Term          | Description                                                                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Subdomain** | The unique prefix in your Zendesk URL. If your URL is `https://company.zendesk.com`, the subdomain is `company`.                                          |
| **API token** | A credential generated in Zendesk that authenticates API requests together with your account email.                                                       |
| **Agent**     | A Zendesk user role with permission to view and manage tickets. The data you can query depends on the permissions of the account that owns the API token. |

## Add the data source

To add the Zendesk data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Zendesk` in the search bar.
4. Select **Zendesk**.
5. Click **Add new data source**.

## Configure settings

After you add the data source, configure its settings. Fields marked with an asterisk (`*`) are required.

Set a **Name** to identify the data source in panels and queries, and optionally toggle **Default** to make it the default data source for new panels.

### Connection

Under **Connection** &gt; **Server configuration**, provide the details Grafana uses to reach your Zendesk instance:

Expand table

| Setting       | Description                                                                                                                            |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Subdomain** | The subdomain of your Zendesk instance. For example, if your Zendesk URL is `https://company.zendesk.com`, the subdomain is `company`. |

### Authentication

The Zendesk data source uses **Basic authentication** with your Zendesk account email and an API token. Under **Authentication**, provide your credentials:

Expand table

| Setting       | Description                                                                                                                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Email**     | The email address used to sign in to Zendesk.                                                                                                                                                                   |
| **API Token** | The API token generated from Zendesk. Refer to [Managing access to the Zendesk API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API) to learn how to create one. |

## Verify the connection

Click **Save &amp; test** to verify the connection. Grafana runs a health check that queries the ticket count for your account. When the test succeeds, Grafana displays `health check succeeded for 'Count tickets' query`, which confirms that the credentials and subdomain are valid.

If the test fails, Grafana displays the reason returned by the health check. For example, missing credentials return `invalid/empty Email`. For more failure messages and fixes, refer to [Troubleshoot the Zendesk data source](/docs/plugins/grafana-zendesk-datasource/latest/troubleshooting/).

## Connect through Private data source connect

> Note
>
> Private data source connect is a Grafana Cloud feature. It isn’t available on self-managed Grafana.

The Zendesk data source supports [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/), which lets Grafana Cloud reach the Zendesk API through a secure tunnel from your private network. Use PDC when your network policy requires outbound traffic to Zendesk to originate from your own environment rather than directly from Grafana Cloud.

Because PDC routes requests through the plugin’s backend, it works with the Zendesk data source. To use it:

1. Set up a PDC connection and deploy the PDC agent in your network. Refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).
2. In the Zendesk data source configuration, expand **Private data source connect** and select your PDC connection.
3. Click **Save &amp; test** to verify that Grafana can reach Zendesk through the tunnel.

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information about provisioning and available settings, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here is a provisioning example for the Zendesk data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Zendesk Data Source
    type: grafana-zendesk-datasource
    jsonData:
      services:
        zendesk:
          auth:
            username: '<EMAIL_ADDRESS>'
      variables:
        subdomain: '<ZENDESK_SUBDOMAIN>'
    secureJsonData:
      zendesk.password: '<ZENDESK_API_TOKEN>'
```

Replace the placeholders with your values:

- `<EMAIL_ADDRESS>`: The email address used to sign in to Zendesk.
- `<ZENDESK_SUBDOMAIN>`: The subdomain of your Zendesk instance.
- `<ZENDESK_API_TOKEN>`: The API token generated from Zendesk.

## Provision with Terraform

You can also provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). The following example creates the Zendesk data source with the `grafana_data_source` resource:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "zendesk" {
  type = "grafana-zendesk-datasource"
  name = "Zendesk Data Source"

  json_data_encoded = jsonencode({
    services = {
      zendesk = {
        auth = {
          username = "<EMAIL_ADDRESS>"
        }
      }
    }
    variables = {
      subdomain = "<ZENDESK_SUBDOMAIN>"
    }
  })

  secure_json_data_encoded = jsonencode({
    "zendesk.password" = "<ZENDESK_API_TOKEN>"
  })
}
```

Replace the placeholders with your values:

- `<EMAIL_ADDRESS>`: The email address used to sign in to Zendesk.
- `<ZENDESK_SUBDOMAIN>`: The subdomain of your Zendesk instance.
- `<ZENDESK_API_TOKEN>`: The API token generated from Zendesk.

> Caution
>
> Store secrets such as the API token outside of version control, for example in Terraform variables or a secrets manager, rather than committing them directly to your configuration.
