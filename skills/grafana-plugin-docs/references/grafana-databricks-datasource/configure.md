---
title: "Configure the Databricks data source | Grafana Enterprise Plugins documentation"
description: "This document describes configuration options for the Databricks data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Databricks data source

This document describes configuration options for the Databricks data source in Grafana.

## Before you begin

- You must have an active Grafana Enterprise or Grafana Cloud license that includes the Databricks plugin. The Databricks data source is a Grafana Enterprise plugin, so it doesn’t work without a valid license that covers it. If your license doesn’t include the plugin or has expired, **Save &amp; test** returns a generic `Plugin health check failed` error. Refer to [License and setup errors](/docs/plugins/grafana-databricks-datasource/latest/troubleshooting/#license-and-setup-errors) for help.
- You must have the `Organization administrator` role. Only account administrators can install the Databricks plugin and configure the data source. Organization administrators can also [configure the data source with YAML](#provision-the-data-source) using the Grafana provisioning system.
- You must install the Databricks plugin before adding the data source. Refer to [Install and upgrade the Databricks data source plugin](/docs/plugins/grafana-databricks-datasource/latest/install/) for installation methods across Grafana Cloud, Docker, and Kubernetes. Grafana recommends keeping your plugin up-to-date to access all current features.
- Familiarize yourself with your Databricks security configuration and gather any necessary security certificates and client keys. You need this information to set up your connection.
- Decide which [authentication method](#authentication-methods) best fits your deployment. Grafana recommends Personal Access Token or OAuth M2M for most installations.

> Note
>
> The plugin does not work with token-based authentication when run on bare Alpine Linux. If Alpine Linux is a requirement, Grafana recommends using the official [Alpine images](https://hub.docker.com/r/grafana/grafana).

## Configure the data source using the UI

To add the Databricks data source, complete the following steps:

1. Install the Databricks plugin.
2. Click **Connections** in the left-side menu.
3. Under **Connections**, click **Add new connection**.
4. Enter `Databricks` in the search bar.
5. Select **Databricks** under the **Data Source** section.
6. Click **Add new data source** in the upper right.

You are taken to the **Settings** tab where you set up your Databricks configuration. Configuration happens in three parts: [connection settings](#connection-settings), an [authentication method](#authentication-methods), and optional [additional configuration options](#additional-configuration-options).

## Connection settings

These settings identify the data source and the Databricks SQL warehouse it connects to.

Expand table

| Field         | Description                                                                                                                          |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Name**      | The data source name. Sets the name you use to refer to the data source in panels and queries. **Example:** `databricks_warehouse_1` |
| **Default**   | Toggle to set as the default data source.                                                                                            |
| **Host**      | Enter your Databricks workspace hostname. **Example:** `your-workspace.cloud.databricks.com`                                         |
| **HTTP path** | The HTTP path of your Databricks SQL warehouse or cluster. **Example:** `/sql/1.0/warehouses/abc123def456789`                        |

## Authentication methods

After you set the connection details, choose an authentication method. The configuration fields displayed change according to the selected method.

The Databricks data source supports the following authentication methods. Use the comparison table to choose the method that fits your deployment, then follow the matching section for setup details.

Expand table

| Method                    | Best for                                       | Grafana Cloud | Supports alerting | User context required |
|---------------------------|------------------------------------------------|---------------|-------------------|-----------------------|
| **Personal Access Token** | Quick setup and single-user access             | Yes           | Yes               | No                    |
| **OAuth M2M**             | Service principals, cloud-agnostic deployments | Yes           | Yes               | No                    |
| **OAuth Passthrough**     | Per-user access through SSO                    | Yes           | No                | Yes                   |
| **Azure (On-Behalf-Of)**  | Per-user access on Azure Databricks            | Yes           | No                | Yes                   |
| **Azure Entra ID M2M**    | Automated workloads on Azure Databricks        | Yes           | Yes               | No                    |

> Note
>
> Methods that require a user context, such as **OAuth Passthrough** and **Azure (On-Behalf-Of)**, can’t run alert rules because no user is present during alert evaluation. For alerting, use **Personal Access Token**, **OAuth M2M**, or **Azure Entra ID M2M**. Refer to [Alerting](/docs/plugins/grafana-databricks-datasource/latest/alerting/) for details.

> Caution
>
> Known limitations:
>
> - **Azure Managed Grafana:** **OAuth Passthrough** and **Azure (On-Behalf-Of)** require editing the `grafana.ini` configuration file, which isn’t possible in Azure Managed Grafana or other fully managed environments. Use **Personal Access Token**, **OAuth M2M**, or **Azure Entra ID M2M** instead.
> - **Azure Entra ID M2M version requirement:** In plugin versions earlier than 1.14.3, **Azure Entra ID M2M** was a preview feature gated behind the `databricksAzureM2MEntraIdAuth` feature toggle. It’s available to all instances in current versions, so upgrade the plugin if the method doesn’t appear.

### Personal Access Token authentication

Personal Access Token (PAT) authentication uses a token generated in your Databricks workspace. This is the quickest method to set up and is suited to single-user or shared-credential access. For more information, refer to [Manage personal access token permissions](https://docs.databricks.com/aws/en/security/auth/api-access-permissions) in the Databricks documentation.

Expand table

| Setting   | Description                       |
|-----------|-----------------------------------|
| **Token** | Enter your personal access token. |

> Note
>
> Databricks Community Edition workspaces don’t support Personal Access Token authentication. Use OAuth M2M with a service principal instead.

### OAuth M2M authentication

OAuth machine-to-machine (M2M) authentication is service-to-service authentication with no human interaction. Grafana authenticates as a registered application (a service principal) in Databricks, so authentication is tied to an application identity rather than a user. This is more secure and easier to manage long term, and it works with Databricks on AWS, Azure, and Google Cloud.

Expand table

| Setting           | Description                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Client ID**     | *Required.* The OAuth client ID of a Databricks service principal. The client ID and secret are generated when you create an OAuth secret for the service principal in your Databricks account or workspace.           |
| **Client Secret** | *Required.* The secret key associated with your client ID. It functions like a password for your service principal and must be kept secure. It’s generated when you create the OAuth secret for the service principal. |

> Note
>
> **OAuth M2M** authenticates against a *Databricks-managed* service principal. It doesn’t accept Azure Entra ID (Microsoft Entra ID) credentials. If you use an Azure AD service principal and select **OAuth M2M**, authentication fails with `invalid_client` or `Client authentication failed`. For Azure AD service principals, use [Azure Entra ID M2M authentication](#azure-entra-id-m2m-authentication) instead.

### OAuth Passthrough authentication

OAuth Passthrough authentication passes through the user’s existing OAuth credentials, so each user queries Databricks with their own identity. This method requires a user context and can’t run alert rules.

OAuth Passthrough has no additional fields on the data source settings page. Grafana forwards the signed-in user’s OAuth token automatically after you complete the server-side configuration described in this section.

If you are using OAuth Passthrough with Microsoft Entra ID (formerly Azure Active Directory), complete the following steps.

01. In your Databricks workspace, navigate to **Settings** &gt; **Identity and access** &gt; **SSO and sync** &gt; **SSO Settings**, then click **Manage**.
02. Copy the Databricks SAML URL. *Don’t close this tab.*
03. In a new tab, open the [Azure Portal](https://portal.azure.com/).
04. Go to **Microsoft Entra ID** &gt; **Add** &gt; **Enterprise Application**.
05. Enter a name for the application. When prompted with “What are you looking to do with your application?”, select **Integrate any other application you don’t find in the gallery**.
06. Under **Properties**, set **Assignment required** to **No**.
07. Under **Single sign-on**, click **SAML**, then under **Basic SAML Configuration**, click **Edit**.
08. Set **Identifier (Entity ID)** to the **Databricks SAML URL** you copied earlier. For **Reply URLs**, enter both:

    - The same **Databricks SAML URL**, and
    - The [Grafana redirect URLs](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/azuread/#create-the-azure-ad-application).
09. Under **SAML Signing Certificate**, click **Edit**. Set **Sign-in option** to **Sign SAML response and assertion**, then click **Save**.
10. Under **Attributes &amp; Claims**, click **Edit**. Set the **Unique User Identifier (Name ID)** field to `user.mail`.
11. Under **SAML Certificates**, next to **Certificate (Base64)**, click **Download**. This downloads a `.cer` file. Copy its contents for later use in Databricks.
12. Also save the **Login URL** and **Microsoft Entra ID Identifier** for your Databricks configuration.
13. Return to your **Databricks SSO Settings** tab and update the following fields:

    - **Single Sign-On URL** - enter the **Login URL** from the previous step.
    - **Identity Provider Entity ID** - enter the **Microsoft Entra ID Identifier** from the previous step.
    - **X.509 Certificate** - paste the contents of the downloaded certificate.

#### Complete Grafana OAuth setup

To complete the Grafana OAuth setup, follow these steps:

1. In the [Azure Portal](https://portal.azure.com/), go to **App registrations** &gt; **All applications**, and select your application.
2. On the **Overview** page, note the following values:

   - **Application (client) ID** - Used as the OAuth client ID in your `grafana.ini` file.
   - **Directory (tenant) ID** - Also required in your Grafana configuration.
3. Click **Endpoints**, and note the following URLs:

   - **OAuth 2.0 authorization endpoint (v2)** - This is your **Authorization URL**.
   - **OAuth 2.0 token endpoint (v2)** - This is your **Token URL**.
4. Navigate to **Certificates &amp; secrets**. Under **Client secrets**, click **New client secret**.
5. Create a new client secret with the following configuration:

   - **Description:** `Grafana OAuth`
   - **Expires:** `Never`
6. Click **Add**, then copy the **Value** of the newly created secret. This value is your **OAuth client secret**.

#### Define required roles

To enable secure access control and manage which users can query Databricks data through Grafana, you must define the appropriate roles in **Microsoft Entra ID**. This ensures that Grafana can properly authenticate and authorize users based on their assigned roles.

1. In the **Microsoft Entra ID** portal, navigate to **Enterprise applications**.
2. Search for your application and select it.
3. Go to **Users and groups**.
4. Click **Add user/group** to assign users or groups to the Grafana roles.
5. Return to **Microsoft Entra ID**, then navigate to **App registrations**. Search for your application and select it.
6. Go to **App roles** and configure the roles as described in [Configure application roles for Grafana in the Azure portal](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/azuread/).
7. Configure Azure AD OAuth in the Grafana configuration file as described in [Configure Azure AD authentication using the Grafana configuration file](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/azuread/#configure-azure-ad-authentication-client-using-the-grafana-configuration-file).

#### Forward token to users

To ensure user authentication tokens are securely forwarded to the Databricks data source, update your Grafana configuration file.

In your `grafana.ini` file, add or update the following setting:

ini [Copy code to clipboard] Copy

```ini
[azure]
forward_settings_to_plugins = grafana-azure-monitor-datasource, prometheus, grafana-azure-data-explorer-datasource, mssql, grafana-databricks-datasource
```

This setting allows Grafana to forward Azure authentication tokens to supported data sources, including Databricks.

After saving your configuration, return to the Grafana data source settings page and set **Authentication type** to **OAuth Passthrough**.

### Azure (On-Behalf-Of) authentication

Azure On-Behalf-Of (OBO) authentication allows Grafana to act on behalf of individual users using their own Azure Active Directory (Microsoft Entra ID) credentials. It applies only to [Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/) clusters and requires a user context, so it can’t run alert rules.

Expand table

| Setting                     | Description                                                                                                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Azure Cloud**             | Fixed to `Azure` (Azure public cloud). For on-behalf-of authentication, this field is locked and can’t be changed, because private clouds aren’t supported. |
| **Directory (tenant) ID**   | *Required.* Your Azure Active Directory tenant ID in GUID format. **Example:** `12345678-1234-1234-1234-123456789abc`.                                      |
| **Application (client) ID** | *Required.* The client ID of your Azure AD App Registration that you created for this integration. **Example:** `87654321-4321-4321-4321-abcdef123456`.     |
| **Client Secret**           | *Required.* The secret key you generated for your Azure AD App Registration in the Azure Portal.                                                            |

On-behalf-of authentication isn’t currently supported for private clouds (Azure China Cloud, Azure Government Cloud).

> Warning
>
> Avoid configuring alerts if your data source uses on-behalf-of authentication. Alert rules can’t run because there is no user context available to provide credentials for the query.

To configure on-behalf-of authentication, complete the following steps:

1. Configure Grafana to use OAuth2 with Microsoft Entra ID as [documented](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/azuread/). Ensure that the `[auth.azuread]` `scopes` (or `$GF_AUTH_AZUREAD_SCOPES`) includes `.default openid email profile offline_access`.
2. In the [Azure Portal](https://portal.azure.com/), go to **App registrations** &gt; your application &gt; **Manage** &gt; **Authentication**. Enable **ID tokens** by selecting the corresponding checkbox.
3. In the [Azure Portal](https://portal.azure.com/), navigate to **App registrations** &gt; your application &gt; **Manage** &gt; **API permissions**. Add the following permissions:

   - **Microsoft Graph**: `User.Read`
   - **Azure Databricks**: `user_impersonation`
4. In the [Azure Portal](https://portal.azure.com/), navigate to **App registrations** &gt; your application &gt; **Security** &gt; **Permissions**. Enable **Admin consent** to grant consent on behalf of all users in the tenant. This prevents individual users from being prompted for consent when using the application.
5. When configuring the data source for an Azure Databricks cluster, navigate to your Databricks workspace: **SQL Warehouses** &gt; **Connection details** &gt; **Server hostname** and **HTTP path**. Use these values when setting up the data source in Grafana.
6. Use the **Tenant ID**, **Client ID**, and **Client Secret** from the application registration you created in step 1.

### Azure Entra ID M2M authentication

Azure Entra ID M2M authentication authenticates Grafana directly as a service principal using the Azure Entra ID client credentials flow. Unlike On-Behalf-Of (OBO), this method doesn’t require a user context. Grafana authenticates as the application identity itself, which makes it suitable for automated or background workloads such as alerts and scheduled reports. This method applies only to [Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/) workspaces.

Expand table

| Setting                     | Description                                                                                                                                                        |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Azure Cloud**             | Select your Azure cloud environment from the drop-down. `Azure` is the default.                                                                                    |
| **Directory (tenant) ID**   | *Required.* Your Azure Entra ID tenant ID in GUID format. **Example:** `12345678-1234-1234-1234-123456789abc`.                                                     |
| **Application (client) ID** | *Required.* The client ID of the Azure App Registration (service principal) you created for this integration. **Example:** `87654321-4321-4321-4321-abcdef123456`. |
| **Client Secret**           | *Required.* The client secret generated for your Azure App Registration.                                                                                           |

To use Azure Entra ID M2M authentication, complete the following steps:

1. In the [Azure Portal](https://portal.azure.com/), go to **Microsoft Entra ID** &gt; **App registrations** &gt; **New registration**. Create a new application and note its **Application (client) ID** and **Directory (tenant) ID**.
2. Under **Certificates &amp; secrets**, create a new **Client secret**. Copy the **Value**. This is your **Client Secret**.
3. In your Databricks workspace, add the service principal and configure its permissions:

   1. Navigate to **Settings** &gt; **Identity and access** &gt; **Service principals**, then click **Add service principal**. Select **Microsoft Entra ID managed** and enter the **Application (client) ID** from step 1.
   2. Open the service principal and go to the **Configuration** tab. Under **Entitlements**, enable **Databricks SQL access**.
   3. Go to the **Permissions** tab and grant access to any users, service principals, or groups that should be able to manage or use this service principal. For more information, refer to [Who can manage and use service principals?](https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/service-principals) in the Azure Databricks documentation.
   4. Grant the service principal access to the SQL warehouse it queries. Navigate to **SQL Warehouses**, select your warehouse, open the **Permissions** tab, and add the service principal with at least **Can use** permission.
4. In Grafana, set **Authentication type** to **Azure Entra ID M2M** and enter the **Directory (tenant) ID**, **Application (client) ID**, and **Client Secret** from the steps above.

## Additional configuration options

These options are optional and appear after the authentication fields in the data source settings. Use them to tune query behavior, enable Unity Catalog, and control connection routing.

Expand table

| Field                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Retries**               | Number of times Grafana automatically retries a failed query. The default is `5`.                                                                                                                                                                                                                                                                                                                                                 |
| **Pause**                 | The delay, in seconds, between retry attempts. Setting this to `0` means no pause between retries. Increase this if Databricks is temporarily overloaded and needs time between requests. The default is `0`.                                                                                                                                                                                                                     |
| **Timeout**               | Maximum time, in seconds, Grafana waits for a query response from Databricks before timing out. If your queries are complex and take longer than 60 seconds, increase this value. The default is `60`.                                                                                                                                                                                                                            |
| **Max rows**              | Maximum number of rows returned from any single query. This prevents accidentally pulling massive datasets that could overwhelm Grafana. The default is `10000`. If you need more than 10,000 rows, increase this limit.                                                                                                                                                                                                          |
| **Retry timeout**         | Total time, in seconds, Grafana spends on all retry attempts combined. If left empty, it defaults to `60`.                                                                                                                                                                                                                                                                                                                        |
| **Debug**                 | Check to enable debugging. When enabled, this adds detailed logging information about the connection and queries to the Grafana server logs. This is useful for troubleshooting connection or query issues.                                                                                                                                                                                                                       |
| **Unity Catalog support** | Check to enable support for the Databricks Unity Catalog three-level namespace (`catalog.schema.table`). Refer to [Unity Catalog support](/docs/plugins/grafana-databricks-datasource/latest/query-editor/#unity-catalog-support).                                                                                                                                                                                                |
| **Default query format**  | Sets the default format for how query results are returned. Options are `table` or `timeseries`.                                                                                                                                                                                                                                                                                                                                  |
| **Secure Socks Proxy**    | Toggle to route the data source connection through the Grafana secure SOCKS proxy to reach a different network. This field appears only when the `secureSocksDSProxyEnabled` feature toggle is enabled and Grafana is version 10.0.0 or later. Refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-security/configure-database-encryption/#configure-a-datasource-connection-proxy). |

## Provision the data source

You can define and configure the data source in YAML files as part of the Grafana provisioning system. For general information about provisioning in Grafana, refer to [Provision data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Following is a provisioning example for the Databricks data source using Personal Access Token authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Databricks
    type: grafana-databricks-datasource
    jsonData:
      host: community.cloud.databricks.com
      httpPath: path-from-databricks-odbc-settings
      authType: Pat
    secureJsonData:
      token: personal-access-token
```

## Use Terraform to configure the Databricks data source

You can automate the configuration of the Databricks data source in Grafana using Terraform.

terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }
}

provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

variable "grafana_url" {
  description = "Grafana instance URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "grafana_auth" {
  description = "Grafana API key or service account token"
  type        = string
  sensitive   = true
}

variable "databricks_host" {
  description = "Databricks workspace URL"
  type        = string
}

variable "databricks_token" {
  description = "Databricks personal access token"
  type        = string
  sensitive   = true
}

variable "databricks_http_path" {
  description = "HTTP path for Databricks SQL warehouse or cluster"
  type        = string
}

resource "grafana_data_source" "databricks" {
  name = "Databricks"
  type = "grafana-databricks-datasource"

  json_data_encoded = jsonencode({
    host     = var.databricks_host
    httpPath = var.databricks_http_path
    authType = "Pat"
  })

  secure_json_data_encoded = jsonencode({
    token = var.databricks_token
  })

  # Optional: Set as default data source
  is_default = false
}

output "datasource_id" {
  description = "The ID of the created Databricks data source"
  value       = grafana_data_source.databricks.id
}

output "datasource_uid" {
  description = "The UID of the created Databricks data source"
  value       = grafana_data_source.databricks.uid
}
```

To deploy this configuration, create a `terraform.tfvars` file with your specific values:

hcl [Copy code to clipboard] Copy

```hcl
grafana_url          = "https://your-grafana.com"
grafana_auth         = "your-api-key"
databricks_host      = "https://your-workspace.cloud.databricks.com"
databricks_token     = "your-databricks-token"
databricks_http_path = "/sql/1.0/warehouses/your-warehouse-id"
```

Initialize and apply the configuration:

Bash [Copy code to clipboard] Copy

```bash
terraform init
terraform plan
terraform apply
```

The configuration uses the Grafana Terraform provider to create the data source with secure storage of credentials. You can set `is_default` to `true` if you want this to be your default data source in Grafana.
