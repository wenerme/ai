---
title: "Configure the Datadog data source | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration options for the Datadog data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Datadog data source

Grafana provides a number of configuration options for Datadog. To install the Datadog plugin, refer to [Install the Datadog data source plugin](/docs/plugins/grafana-datadog-datasource/latest/install/). For general information about adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

## Before you begin

Before you configure the Datadog data source, ensure you have:

- **A Grafana Enterprise license, or a Grafana Cloud account with Enterprise plugins enabled.** The Datadog data source is an Enterprise plugin. Without the required license or entitlement, the plugin doesn’t install or enable, and you might not see an **Install** or **Enable** button on the plugin page. On Grafana Cloud, Enterprise plugins are included on some plans and available as a paid add-on on others. For details, refer to [Grafana Cloud features](/docs/grafana-cloud/introduction/understand-grafana-cloud-features/).
- **Grafana version `11.6.11` or later.**
- **The organization `administrator` role**, which you need to add data sources. Administrators can also configure the data source with the [Grafana provisioning system](/docs/grafana/latest/administration/provisioning/).
- **A Datadog API key and application key.** For instructions, refer to [Get an API key and application key from Datadog](/docs/plugins/grafana-datadog-datasource/latest/#get-an-api-key-and-application-key-from-datadog).

> Caution
>
> The Datadog data source requires Enterprise plugin entitlement. If the plugin fails to start with a `Plugin health check failed` message, or a license error such as `invalid license for the enterprise plugin`, the cause is your license or plan, not your Datadog credentials. Verify your license before you install. For details, refer to [License issues](/docs/plugins/grafana-datadog-datasource/latest/troubleshooting/#license-issues).

## Configure the data source

To add the Datadog data source, complete the following steps:

1. Install the Datadog plugin.
2. Click **Connections** in the left-side menu.
3. Under **Connections**, click **Add new connection**.
4. Enter **Datadog** in the search bar.
5. Select **Datadog** under the **Data Source** section.
6. Click **Add new data source** in the upper right.

Grafana opens the **Settings** tab, where you set up your Datadog configuration.

## Configuration options

The following is a list of configuration options for Datadog.

The first option to configure is the name of your connection:

- **Name** - The data source name. This is how you refer to the data source in panels and queries. Examples: `Datadog_Metrics`, `Datadog-1`.
- **Default** - Toggle to set as the default data source when creating queries.

### Connection

You can connect to Datadog using 2 different connection modes, **Default** or **Hosted Datadog Metrics**.

- **Mode** - Select your connection mode for Datadog.

  - **Default** - Connect directly to Datadog API endpoints.
  - **Hosted Datadog Metrics** - This mode is now deprecated. Refer to [Datadog proxy documentation](/docs/grafana-cloud/send-data/metrics/metrics-datadog/#send-or-visualize-datadog-metrics) for more information.
- **API URL / Region** - *Use with Default mode*. Select your Datadog region from the list, or enter a custom API URL. The following regions are available:

  Expand table

  | Region        | API URL                         |
  |---------------|---------------------------------|
  | US1 / Default | `https://api.datadoghq.com`     |
  | US3           | `https://api.us3.datadoghq.com` |
  | US5           | `https://api.us5.datadoghq.com` |
  | EU            | `https://api.datadoghq.eu`      |
  | US1-FED       | `https://api.ddog-gov.com`      |

### Authentication

The way you authenticate depends on your connection method.

If you connect using **Default mode**, configure the following to authenticate:

- **API key** - Enter the Datadog API key unique to your organization. To generate an API key, refer to [Add an API key or client token](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token). For more information about API keys, refer to [API and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/) in the Datadog documentation.
- **App key** - Enter the Datadog application key unique to your organization. The application key works in conjunction with the API key to grant user access. To generate an application key, refer to [Add application keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys). For more information about application keys, refer to [Application keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys) in the Datadog documentation.

### API key and application key permissions

The Datadog data source authenticates each request with both keys:

- The **API key** identifies your Datadog organization. Every request requires it.
- The **application key** authorizes the request. By default, an application key inherits the permissions of the user who created it. You can also create a [scoped application key](https://docs.datadoghq.com/account_management/api-app-keys/#scope-application-keys) that grants only specific permissions.

The application key must have permission to read the Datadog products that you query. Metric, time series, event, host, and tag queries don’t require a specific permission beyond valid keys. Other query types require the following Datadog permissions:

Expand table

| Query type                   | Datadog API endpoint                                               | Required application key permission         |
|------------------------------|--------------------------------------------------------------------|---------------------------------------------|
| Query, Raw query, Arithmetic | `/api/v1/query`                                                    | None beyond valid keys                      |
| Events, Annotations          | `/api/v1/events`                                                   | None beyond valid keys                      |
| Monitor                      | `/api/v1/monitor/search`, `/api/v1/monitor/groups/search`          | `monitors_read`                             |
| SLO                          | `/api/v1/slo`, `/api/v1/slo/{slo_id}/history`                      | `slos_read`                                 |
| Logs                         | `/api/v2/logs/events/search`, `/api/v2/logs/analytics/aggregate`   | `logs_read_data` and `logs_read_index_data` |
| RUM                          | `/api/v2/rum/events/search`, `/api/v2/rum/analytics/aggregate`     | `rum_apps_read`                             |
| APM Spans                    | `/api/v2/spans/events/search`, `/api/v2/spans/analytics/aggregate` | `apm_read`                                  |

The Datadog **Read Only** role includes all of these permissions. The simplest setup is to create the application key under a user or service account that has at least the Read Only role. To follow the principle of least privilege, create a scoped application key with only the permissions for the query types that you use. For the full list of permissions, refer to [Datadog Role Permissions](https://docs.datadoghq.com/account_management/rbac/permissions/).

> Note
>
> **Save &amp; test** validates only your API key and metric access. It can succeed even when the application key lacks permission for other query types, such as logs or APM spans. If a specific query type returns a `403 Forbidden` error, verify that the application key has the permission listed in the preceding table.

### Validate your keys

Before you enter your keys into Grafana, you can validate them against the Datadog API. Replace `<api_key>` and `<app_key>` with your keys, and use the API URL for your [region](#connection).

Validate the API key:

Bash [Copy code to clipboard] Copy

```bash
curl -X GET "https://api.datadoghq.com/api/v1/validate" \
  -H "DD-API-KEY: <api_key>"
```

A valid API key returns `{"valid":true}`.

Validate both keys together, and confirm that the application key can read metrics:

Bash [Copy code to clipboard] Copy

```bash
curl -X GET "https://api.datadoghq.com/api/v1/metrics?from=$(($(date +%s) - 3600))" \
  -H "DD-API-KEY: <api_key>" \
  -H "DD-APPLICATION-KEY: <app_key>"
```

A `403 Forbidden` response means that one or both keys are incorrect or lack the required permissions. To test a specific query type, call its endpoint from the preceding table. For example, to confirm the `monitors_read` permission, call `/api/v1/monitor/search`.

## Additional settings

Additional settings are optional settings that you can configure for more control over your Datadog data source.

- **API rate limits** - Limit access to the Datadog API.

  - **Show API rate limits** - Check the box to show Datadog API limits for each queried endpoint. To view the API rate limits, go to the **Query Inspector**, select the **JSON** option, and set the source to **DataFrame structure**.
  - **Enable API rate limit threshold** - Check the box to enable rate limiting. Datadog queries stop once the threshold is reached.
  - **API rate limit threshold %** - Enter a threshold percentage in the box. When the API hits the rate limit percent specified, the plugin blocks subsequent requests until the next reset. The default is `100`.
- **Disable data links** - Check the box to disable data links. The Datadog data source adds data links to **Monitor** query results, which let users open the relevant monitor directly in Datadog. For more information, refer to [Data links](/docs/plugins/grafana-datadog-datasource/latest/query-editor/#data-links).
- **Response Size** - Set the maximum number of items to retrieve in a single API request, such as when querying the metric list or host list. The default is `100`.
- **Secure Socks Proxy** - *Available when the `secureSocksDSProxyEnabled` feature toggle is enabled and you run Grafana version 10.0.0 or later.* Route the data source connection through the Secure Socks Proxy to a different network. For setup instructions, refer to [Connect through the Secure Socks Proxy](#connect-through-the-secure-socks-proxy).

After you configure your Datadog data source options, click **Save &amp; test** at the bottom to test your data source connection. When the connection succeeds, Grafana displays an `OK` message. You can also remove a connection by clicking **Delete**.

## Connect through the Secure Socks Proxy

By default, Grafana connects directly to the Datadog API over the public internet. If your network policy requires outbound traffic to route through a specific network, you can send the data source connection through the Secure Socks Proxy. The **Secure Socks Proxy** toggle, in the **PDC Connect** section of the data source configuration, appears only when the `secureSocksDSProxyEnabled` feature toggle is enabled and you run Grafana version 10.0.0 or later.

### Grafana Cloud

In Grafana Cloud, use Private data source connect (PDC) to route the connection through a network that you control:

1. Set up a PDC network and run the PDC agent. For instructions, refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).
2. In the Datadog data source configuration, enable the **Secure Socks Proxy** toggle in the **PDC Connect** section.
3. Select your PDC network and click **Save &amp; test**.

### Self-managed Grafana

1. Enable the `secureSocksDSProxyEnabled` feature toggle.
2. Configure the secure socks proxy in the `[secure_socks_datasource_proxy]` section of `grafana.ini`. For instructions, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).
3. In the Datadog data source configuration, enable the **Secure Socks Proxy** toggle and click **Save &amp; test**.

## Configure the data source with provisioning

Configure the Datadog data source using configuration files with the Grafana provisioning system. To learn more about how the provisioning system works, including all of the data source settings, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

You can define and configure the Datadog data source in YAML files as part of the Grafana provisioning system. For more information about provisioning a data source, and for available configuration options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

The following example is for provisioning the Datadog data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Datadog
    type: grafana-datadog-datasource
    jsonData:
      url: https://api.datadoghq.com
      logApiRateLimits: false
      rateLimitEnabled: false
      rateLimitMetrics: 100
      disableDataLinks: false
      size: 100
    secureJsonData:
      apiKey: <YOUR_DATADOG_API_KEY>
      appKey: <YOUR_DATADOG_APPLICATION_KEY>
```

The following table describes the available `jsonData` and `secureJsonData` fields:

Expand table

| Field                    | Location         | Description                                                                              |
|--------------------------|------------------|------------------------------------------------------------------------------------------|
| `url`                    | `jsonData`       | The Datadog API URL for your region, such as `https://api.datadoghq.com`.                |
| `logApiRateLimits`       | `jsonData`       | Show Datadog API rate limits for each queried endpoint. The default is `false`.          |
| `rateLimitEnabled`       | `jsonData`       | Enable the API rate limit threshold. The default is `false`.                             |
| `rateLimitMetrics`       | `jsonData`       | The API rate limit threshold percentage. The default is `100`.                           |
| `disableDataLinks`       | `jsonData`       | Disable data links that take users to Datadog. The default is `false`.                   |
| `size`                   | `jsonData`       | The maximum number of items to retrieve in a single API request. The default is `100`.   |
| `enableSecureSocksProxy` | `jsonData`       | Route the data source connection through the Secure Socks Proxy. The default is `false`. |
| `apiKey`                 | `secureJsonData` | The Datadog API key unique to your organization.                                         |
| `appKey`                 | `secureJsonData` | The Datadog application key unique to your organization.                                 |

## Configure Datadog with Terraform

You can configure the Datadog data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

The following example provisions a Datadog data source and defines the required variables:

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

resource "grafana_data_source" "datadog" {
  type = "grafana-datadog-datasource"
  name = "Datadog"

  json_data_encoded = jsonencode({
    url               = var.datadog_api_url
    logApiRateLimits  = false
    rateLimitEnabled  = false
    rateLimitMetrics  = 100
    disableDataLinks  = false
    size              = 100
  })

  secure_json_data_encoded = jsonencode({
    apiKey = var.datadog_api_key
    appKey = var.datadog_app_key
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

variable "datadog_api_url" {
  description = "Datadog API URL for your region"
  type        = string
  default     = "https://api.datadoghq.com"
}

variable "datadog_api_key" {
  description = "Datadog API key unique to your organization"
  type        = string
  sensitive   = true
}

variable "datadog_app_key" {
  description = "Datadog application key unique to your organization"
  type        = string
  sensitive   = true
}
```
