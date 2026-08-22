---
title: "Configure the Azure Monitor Managed Service for Prometheus data source | Grafana Plugins documentation"
description: "Configure the Azure Monitor Managed Service for Prometheus data source in Grafana, including Azure authentication and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Azure Monitor Managed Service for Prometheus data source

This document explains how to configure the Azure Monitor Managed Service for Prometheus data source and covers Azure authentication, data source settings, and provisioning.

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** The organization administrator role to add and configure data sources.
- **An Azure Monitor workspace:** Including its Prometheus query endpoint URL, which you can copy from the workspace **Overview** page in the Azure portal.
- **Azure credentials:** A Microsoft Entra ID identity or Azure managed identity with permission to query the workspace, such as the **Monitoring Data Reader** role.

## Key concepts

If you’re new to Azure Monitor managed service for Prometheus or Azure authentication, these terms are used throughout the configuration:

Expand table

| Term                        | Description                                                                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Azure Monitor workspace** | The Azure resource that stores Prometheus metrics collected from AKS and other sources.                                                         |
| **Query endpoint**          | The HTTPS URL Grafana uses to run PromQL against the workspace. Copy it from the workspace **Overview** page.                                   |
| **App Registration**        | A Microsoft Entra ID application (service principal) that Grafana uses with a client ID and client secret.                                      |
| **Managed Identity**        | An Azure identity attached to the VM, App Service, or Azure Managed Grafana workspace that runs Grafana. No client secret is stored in Grafana. |
| **Workload Identity**       | Federated identity for Grafana running in Kubernetes, such as AKS, using a projected service account token.                                     |
| **Current User**            | Forwards the signed-in Grafana user’s Entra ID token to Azure so each user queries with their own permissions.                                  |
| **Fallback credentials**    | A shared identity used for background features such as alerting when Current User authentication is selected.                                   |

## Add the data source

To add the data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Azure Monitor Managed Service for Prometheus` in the search bar.
4. Select **Azure Monitor Managed Service for Prometheus**.
5. Click **Add new data source**.

## Configure settings

Use the following settings to identify the data source and set its endpoint.

Expand table

| Setting                   | Description                                                                                                                      |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **Name**                  | The name used to refer to the data source in panels and queries.                                                                 |
| **Default**               | Toggle to make this the default data source for new panels.                                                                      |
| **Prometheus server URL** | The query endpoint URL of your Azure Monitor workspace, for example `https://<WORKSPACE>.<REGION>.prometheus.monitor.azure.com`. |

> Note
>
> Browser (direct) access mode isn’t available in this data source. Use server (proxy) access mode, which Grafana selects by default.

## Authentication

The Azure Monitor Managed Service for Prometheus data source authenticates with Microsoft Entra ID. Unlike the core Prometheus data source, Azure authentication is the only authentication method, and Grafana attaches a bearer token to every request to the workspace.

The data source supports four authentication methods. Choose based on where Grafana is hosted, your security requirements, and whether you need alerting:

Expand table

| Authentication method | Best for                    | Grafana Cloud | Supports alerting | Server configuration required |
|-----------------------|-----------------------------|---------------|-------------------|-------------------------------|
| **App Registration**  | Any Grafana deployment      | Yes           | Yes               | `[auth] azure_auth_enabled`   |
| **Managed Identity**  | Grafana hosted in Azure     | No            | Yes               | Yes                           |
| **Workload Identity** | Grafana in Kubernetes (AKS) | No            | Yes               | Yes                           |
| **Current User**      | Per-user access control     | Yes           | Partial           | Yes                           |

> Note
>
> Certificate-based App Registration authentication isn’t supported for this data source. Use a client secret, Managed Identity, Workload Identity, or Current User.

The **Authentication** drop-down lists **Managed Identity**, **Workload Identity**, and **Current User** only when the corresponding method is enabled on the Grafana server. If none of those methods are enabled, **App Registration** is the only option, and its fields appear directly without a drop-down.

**Current User** authentication doesn’t support background operations such as alerting, reporting, and recorded queries unless you configure **fallback service credentials**. Alerts then run under the fallback credential’s permissions.

### Grafana server prerequisites

The plugin backend attaches Azure tokens only when Azure authentication is enabled on the Grafana server. On self-managed Grafana, add the following setting:

ini [Copy code to clipboard] Copy

```ini
[auth]
azure_auth_enabled = true
```

If you’ve customized `forward_settings_to_plugins` under `[azure]`, include `grafana-azureprometheus-datasource`. Grafana includes this plugin ID by default. A missing entry causes `401 Unauthorized` errors even when the data source credentials look correct.

> Note
>
> If you use Azure authentication, don’t enable **Forward OAuth identity**. Both methods use the same HTTP authorization headers, and the OAuth token overwrites your Azure credentials. The data source UI restricts authentication to Azure methods, but you can still enable **Forward OAuth identity** through provisioning or the API by setting `oauthPassThru` in `jsonData`, so make sure it’s disabled there too.

> Note
>
> On Grafana Cloud, Azure authentication isn’t enabled by default and isn’t a self-service setting. You must contact [Grafana Support](/help/) to enable it for your instance. Until it’s enabled, **Save &amp; test** returns a generic `401 Unauthorized` even when your credentials are valid.

### App Registration

Use a Microsoft Entra ID app registration (service principal) with a client secret. This method works with any Grafana deployment, including Grafana Cloud.

To create the app registration and client secret, refer to the [Microsoft documentation for creating a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal). Assign the **Monitoring Data Reader** role on the Azure Monitor workspace.

Select **App Registration** in the **Authentication** drop-down, then complete the following fields:

Expand table

| Setting                     | Description                                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------------------|
| **Azure Cloud**             | The Azure environment. Use the public cloud unless you query Azure Government or Azure China. |
| **Directory (tenant) ID**   | The GUID that identifies your Microsoft Entra ID tenant.                                      |
| **Application (client) ID** | The GUID for the app registration.                                                            |
| **Client Secret**           | The secret for the app registration. Keep this secure and rotate it periodically.             |

### Managed Identity

Use Azure Managed Identity when Grafana runs in Azure, such as on a virtual machine, App Service, or Azure Managed Grafana. Managed Identity isn’t available in Grafana Cloud.

Enable managed identity in the Grafana server configuration:

ini [Copy code to clipboard] Copy

```ini
[azure]
managed_identity_enabled = true
```

To use a user-assigned managed identity instead of the system-assigned identity, also set:

ini [Copy code to clipboard] Copy

```ini
[azure]
managed_identity_enabled = true
managed_identity_client_id = <USER_ASSIGNED_IDENTITY_CLIENT_ID>
```

Grant the identity the **Monitoring Data Reader** role on the Azure Monitor workspace. In the data source UI, select **Managed Identity**. The directory ID, application ID, and client secret fields are hidden.

### Workload Identity

Use Azure Workload Identity when Grafana runs in Kubernetes with workload identity federation, such as AKS.

Enable workload identity in the Grafana server configuration:

ini [Copy code to clipboard] Copy

```ini
[azure]
workload_identity_enabled = true
```

Optional overrides:

ini [Copy code to clipboard] Copy

```ini
[azure]
workload_identity_enabled = true
workload_identity_tenant_id = <IDENTITY_TENANT_ID>
workload_identity_client_id = <IDENTITY_CLIENT_ID>
workload_identity_token_file = <TOKEN_FILE_PATH>
```

Grant the workload identity the **Monitoring Data Reader** role on the Azure Monitor workspace. In the data source UI, select **Workload Identity**. For more information, refer to the [Azure workload identity documentation](https://azure.github.io/azure-workload-identity/docs/).

### Current User

Forward the signed-in Grafana user’s Microsoft Entra ID credentials so each user queries with their own permissions.

> Note
>
> Current User authentication requires Microsoft Entra ID login for Grafana. On Grafana Cloud, contact Grafana Support to enable this feature.

Enable current user authentication in the Grafana server configuration:

ini [Copy code to clipboard] Copy

```ini
[azure]
user_identity_enabled = true
```

By default, this also enables fallback service credentials. To disable fallback credentials for the whole instance:

ini [Copy code to clipboard] Copy

```ini
[azure]
user_identity_enabled = true
user_identity_fallback_credentials_enabled = false
```

Current User authentication doesn’t support backend features such as alerting, reporting, and recorded queries because a user token isn’t available for those requests. To keep those features working, enable **Fallback Service Credentials** on the data source and provide an App Registration, Managed Identity, or Workload Identity. Features that use the fallback run with that shared identity’s permissions, not the user’s.

Query caching is disabled by default for data sources that use Current User authentication.

## Private data source connect

The data source supports [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/), which lets Grafana Cloud query an Azure Monitor workspace that isn’t exposed to the public internet.

To use PDC with this data source:

1. Set up a PDC connection. Refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).
2. On the data source configuration page, expand **Secure Socks Proxy** and select the PDC connection.
3. Click **Save &amp; test** to verify connectivity through the private network.

> Note
>
> The **Secure Socks Proxy** settings appear only when the secure SOCKS data source proxy is enabled on your Grafana instance. PDC is available in Grafana Cloud.

## Additional settings

Expand **Advanced settings** to configure optional behavior. These settings are shared with the core Prometheus data source.

Expand table

| Setting                           | Description                                                                                                                                                           |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Manage alerts via Alerting UI** | When enabled, lets you manage recording and alerting rules stored in the workspace from the Grafana Alerting UI.                                                      |
| **Scrape interval**               | Sets the interval Grafana uses to align queries. Set this to match the scrape interval configured for your metrics. The default is `15s`.                             |
| **Query timeout**                 | The maximum time Grafana waits for a query to return. The default is `60s`.                                                                                           |
| **Default editor**                | Sets the default query editor mode, either **Builder** or **Code**.                                                                                                   |
| **Disable metric lookup**         | Disables the metric and label autocomplete and the metrics browser to reduce load on large workspaces.                                                                |
| **Prometheus type**               | Identifies the Prometheus-compatible backend for version-specific behavior. Select the type that matches your workspace, then set **Prometheus version** if prompted. |
| **Cache level**                   | Controls how aggressively Grafana caches metadata responses. Options are `Low`, `Medium`, `High`, and `None`.                                                         |
| **Incremental querying**          | When enabled, Grafana caches query results and requests only new data on dashboard refreshes.                                                                         |
| **Query overlap window**          | When incremental querying is enabled, the amount of overlapping time to re-request to avoid gaps, for example `10m`.                                                  |
| **Disable recording rules**       | Prevents Grafana from querying for and processing recording rules.                                                                                                    |
| **Custom query parameters**       | Appends custom URL parameters to all queries, such as `max_source_resolution=5m`.                                                                                     |
| **HTTP method**                   | The HTTP method Grafana uses for queries. `POST` is recommended and is the default.                                                                                   |

## Resource-scoped queries

Azure Monitor can scope PromQL queries to a resource, resource group, or subscription instead of an entire workspace. To use this mode:

1. Set **Prometheus server URL** to the regional query endpoint, `https://query.<REGION>.prometheus.monitor.azure.com`.
2. In **Advanced HTTP settings**, add a custom header named `x-ms-azure-scoping` whose value is the Azure resource ID, resource group ID, or subscription ID.
3. Authenticate with an identity that has at least the **Monitoring Reader** role on that scope.

For more information, refer to [Resource-scoped PromQL queries](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/prometheus-resource-scoped-queries).

## Verify the connection

To verify the connection, click **Save &amp; test**. When the configuration is valid, Grafana displays a success message such as **Successfully queried the Prometheus API.** If the test fails, refer to [Troubleshooting](/docs/plugins/grafana-azureprometheus-datasource/latest/troubleshooting/).

## Provision the data source

You can define and configure the data source in code so it’s reproducible across environments. This section covers provisioning with a Grafana YAML file and with Terraform.

The backend reads the client secret from `secureJsonData.azureClientSecret`. A legacy `clientSecret` key is accepted only for migrated data sources.

### Provision with a YAML file

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions the data source with App Registration authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure Monitor Managed Service for Prometheus
    uid: grafana-azureprometheus
    type: grafana-azureprometheus-datasource
    access: proxy
    url: https://<WORKSPACE>.<REGION>.prometheus.monitor.azure.com
    editable: true
    jsonData:
      httpMethod: POST
      defaultEditor: builder
      manageAlerts: true
      azureCredentials:
        authType: clientsecret
        azureCloud: AzureCloud
        clientId: <CLIENT_ID>
        tenantId: <TENANT_ID>
    secureJsonData:
      azureClientSecret: <CLIENT_SECRET>
```

To use Managed Identity:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure Monitor Managed Service for Prometheus
    type: grafana-azureprometheus-datasource
    access: proxy
    url: https://<WORKSPACE>.<REGION>.prometheus.monitor.azure.com
    jsonData:
      httpMethod: POST
      azureCredentials:
        authType: msi
```

To use Workload Identity:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure Monitor Managed Service for Prometheus
    type: grafana-azureprometheus-datasource
    access: proxy
    url: https://<WORKSPACE>.<REGION>.prometheus.monitor.azure.com
    jsonData:
      httpMethod: POST
      azureCredentials:
        authType: workloadidentity
```

To use Current User authentication with App Registration fallback credentials:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure Monitor Managed Service for Prometheus
    type: grafana-azureprometheus-datasource
    access: proxy
    url: https://<WORKSPACE>.<REGION>.prometheus.monitor.azure.com
    jsonData:
      httpMethod: POST
      azureCredentials:
        authType: currentuser
        serviceCredentialsEnabled: true
        serviceCredentials:
          authType: clientsecret
          azureCloud: AzureCloud
          clientId: <CLIENT_ID>
          tenantId: <TENANT_ID>
    secureJsonData:
      azureClientSecret: <CLIENT_SECRET>
```

Replace the placeholder values:

- `<WORKSPACE>` and `<REGION>`: The Azure Monitor workspace name and Azure region from the query endpoint URL.
- `<CLIENT_ID>` and `<TENANT_ID>`: The app registration application ID and directory ID.
- `<CLIENT_SECRET>`: The app registration client secret.

Valid `azureCloud` values include `AzureCloud` (public), `AzureUSGovernment`, and `AzureChinaCloud`.

### Provision with Terraform

You can manage the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource. Store secrets such as the client secret in Terraform variables or a secrets manager rather than in plain text.

The following example provisions the data source with App Registration authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azureprometheus" {
  type = "grafana-azureprometheus-datasource"
  name = "Azure Monitor Managed Service for Prometheus"
  url  = "https://${var.workspace}.${var.region}.prometheus.monitor.azure.com"

  json_data_encoded = jsonencode({
    httpMethod    = "POST"
    defaultEditor = "builder"
    manageAlerts  = true
    azureCredentials = {
      authType   = "clientsecret"
      azureCloud = "AzureCloud"
      clientId   = var.client_id
      tenantId   = var.tenant_id
    }
  })

  secure_json_data_encoded = jsonencode({
    azureClientSecret = var.client_secret
  })
}
```

To use Managed Identity instead of a client secret:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azureprometheus" {
  type = "grafana-azureprometheus-datasource"
  name = "Azure Monitor Managed Service for Prometheus"
  url  = "https://${var.workspace}.${var.region}.prometheus.monitor.azure.com"

  json_data_encoded = jsonencode({
    httpMethod = "POST"
    azureCredentials = {
      authType = "msi"
    }
  })
}
```

To use Workload Identity:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azureprometheus" {
  type = "grafana-azureprometheus-datasource"
  name = "Azure Monitor Managed Service for Prometheus"
  url  = "https://${var.workspace}.${var.region}.prometheus.monitor.azure.com"

  json_data_encoded = jsonencode({
    httpMethod = "POST"
    azureCredentials = {
      authType = "workloadidentity"
    }
  })
}
```

To use Current User authentication with App Registration fallback credentials:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azureprometheus" {
  type = "grafana-azureprometheus-datasource"
  name = "Azure Monitor Managed Service for Prometheus"
  url  = "https://${var.workspace}.${var.region}.prometheus.monitor.azure.com"

  json_data_encoded = jsonencode({
    httpMethod = "POST"
    azureCredentials = {
      authType                  = "currentuser"
      serviceCredentialsEnabled = true
      serviceCredentials = {
        authType   = "clientsecret"
        azureCloud = "AzureCloud"
        clientId   = var.client_id
        tenantId   = var.tenant_id
      }
    }
  })

  secure_json_data_encoded = jsonencode({
    azureClientSecret = var.client_secret
  })
}
```

Define the referenced variables, for example in a `variables.tf` file:

hcl [Copy code to clipboard] Copy

```hcl
variable "workspace" {
  type = string
}

variable "region" {
  type = string
}

variable "client_id" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "client_secret" {
  type      = string
  sensitive = true
}
```
