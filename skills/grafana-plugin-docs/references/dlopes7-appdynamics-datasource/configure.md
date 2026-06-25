---
title: "Configure the AppDynamics data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the AppDynamics data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the AppDynamics data source

This document explains configuration options for the AppDynamics data source in Grafana.

## Before you begin

Before you can configure the AppDynamics data source, ensure you have the following:

- The `Organization Administrator` role in Grafana to add data sources.
- The AppDynamics data source plugin installed. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).
- An [AppDynamics](https://www.appdynamics.com/) account.
- A user or API client with `view` access to **Account**, **Applications**, **Databases**, and **Analytics** in AppDynamics.
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).

### Security considerations

Keep the following security best practices in mind when configuring the AppDynamics data source:

- **Least privilege:** Create a dedicated read-only role in AppDynamics (for example, `grafana_readonly`) with only `view` permissions. Don’t reuse administrator accounts or roles that grant write access.
- **Credential storage:** Grafana encrypts sensitive values such as passwords, client secrets, and API keys using `secureJsonData`. Don’t store credentials in plaintext configuration files or version control.
- **API client authentication:** When possible, use API client authentication instead of basic authentication. API client secrets can be rotated independently without changing user passwords.
- **Analytics API keys:** The Analytics API key is stored and transmitted separately from your Metrics credentials. Generate a dedicated key with the minimum required [Analytics permissions](https://docs.appdynamics.com/appd/24.x/latest/en/analytics/deploy-analytics-with-the-analytics-agent/analytics-and-data-security/manage-api-keys).
- **TLS verification:** Keep **Skip TLS Verify** disabled in production environments to ensure encrypted and authenticated connections to your AppDynamics controller.
- **Network access:** Ensure your Grafana server can reach the AppDynamics controller over HTTPS (port 443). For private networks, use [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) or the [Secure Socks Proxy](#secure-socks-proxy) instead of exposing your controller to the public internet.

## Add the AppDynamics data source

For general information on installing and managing plugins and data sources in Grafana refer to the following documents:

- [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins)
- [Plugin management](/docs/grafana/latest/administration/plugin-management/)
- [Data source management](/docs/grafana/latest/administration/data-source-management/#data-source-management)

To install the AppDynamics data source plugin, refer to Grafana’s [AppDynamics installation page](/grafana/plugins/dlopes7-appdynamics-datasource/?tab=installation).

> Note
>
> You must install the AppDynamics data source plugin prior to adding and configuring the AppDynamics data source. The plugin connects you to the data source.

Once you have installed the AppDynamics plugin, complete the following steps to add the AppDynamics data source:

1. Click **Connections** in the left-side menu.
2. Enter `AppDynamics` in the search bar.
3. Select the **AppDynamics data source** tile.
4. Click **Add new data source** in the upper right.
5. You are taken to the **Settings** tab where you will set up your AppDynamics configuration.

## AppDynamics configuration options

The following general settings are available:

Expand table

| Setting     | Description                                                                                            |
|-------------|--------------------------------------------------------------------------------------------------------|
| **Name**    | The display name for this data source. This is how you refer to the data source in queries and panels. |
| **Default** | Toggle to make this the default data source for new panels.                                            |
| **URL**     | The URL of your AppDynamics controller. For example, `https://mycompany.saas.appdynamics.com`.         |

### Connection settings

Grafana supports two authentication methods with the AppDynamics data source: **Basic authentication** or **API client authentication**. If you configure both, API client authentication takes precedence.

#### Basic authentication

Use basic authentication to connect with an AppDynamics username and password.

To create a dedicated role and user in AppDynamics:

1. Navigate to the AppDynamics Administration settings.
2. From the **Roles** tab, click the **+** button to create a new role, such as `grafana_readonly`.
3. From the **Account** tab, add the permission `View Business Flow`.
4. From the **Applications** tab, check the **View** box to allow Grafana to view application data.
5. From the **Databases** tab, check the **View** box to allow Grafana to view database data.
6. From the **Analytics** tab, check the **Can view data from all Applications** box to allow Grafana to view analytics data.
7. From the **Users** tab, create a new user, such as `grafana`, and assign it to the role you created.

In the Grafana data source configuration, enable **Basic auth** and enter the following:

- **User** - The AppDynamics username.
- **Password** - The AppDynamics password.

#### API client authentication

Use API client authentication to connect with OAuth credentials.

To create an API client in AppDynamics:

1. Sign in to the AppDynamics Controller UI at `https://<COMPANY>.saas.appdynamics.com/controller`.
2. Click the gear icon and select **Administration**.
3. Click the **API clients** tab.
4. Click **Create** to create a new API client.
5. Add a name and description, then generate a client secret.
6. Assign the role you created (for example, `grafana_readonly`) to the API client.

In the Grafana data source configuration, enter the following:

- **Client Name** - The name of the API client as shown in AppDynamics.
- **Client Domain** - Your company or domain name. For SaaS controllers, if your controller URL is `https://mycompany.saas.appdynamics.com`, use `mycompany`. For on-premises controllers, use the account name configured in your controller.
- **Client Secret** - The client secret generated when you created the API client.

#### Analytics authentication

The Analytics Events API uses a separate endpoint and authentication from the Metrics API. You must configure analytics authentication separately to use Analytics queries.

- **Analytics API URL** - The SaaS or on-premises endpoint for the [Analytics Event Service](https://docs.appdynamics.com/appd/24.x/latest/en/extend-splunk-appdynamics/splunk-appdynamics-apis/analytics-events-api). Select from the drop-down or enter a custom URL. Available preset options include:

  - `https://analytics.api.appdynamics.com` (default)
  - `https://fra-ana-api.saas.appdynamics.com` (Frankfurt region)
  - `https://syd-ana-api.saas.appdynamics.com` (Sydney region)
  - For on-premises controllers, an endpoint based on your controller host is auto-detected.
- **Global Account Name** - The global account name, as shown on the **License** page in the AppDynamics Controller UI under **Settings** &gt; **License** &gt; **Account**.
- **Analytics API Key** - An API key with the required [Analytics permissions](https://docs.appdynamics.com/appd/24.x/latest/en/analytics/deploy-analytics-with-the-analytics-agent/analytics-and-data-security/manage-api-keys).

### Optional settings

The following optional settings are available for advanced authentication and network scenarios.

- **TLS Client Auth** - Enable to authenticate using Transport Layer Security client certificates.
- **Skip TLS Verify** - Enable to skip TLS certificate verification.
- **With Credentials** - Enable to send credentials such as cookies or auth headers with cross-site requests.
- **With CA Cert** - Enable to verify self-signed TLS certificates.
- **Forward OAuth Identity** - Forward the OAuth identity of the user signed in to Grafana, for cases where the same OAuth provider is used for both Grafana and AppDynamics.

### Secure Socks Proxy

> Note
>
> The Secure Socks Proxy option is available in Grafana 10.0 and later when the `secureSocksDSProxyEnabled` feature toggle is enabled.

- **Enabled** - Enable to proxy the data source connection through the secure socks proxy to a different network. For more information, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

Once you have added your connection settings, click **Save &amp; test** to test the data source connection. The health check validates the Metrics API connection and, if all three Analytics fields are configured (Analytics API URL, Global Account Name, and Analytics API Key), also validates the Analytics API connection. A successful connection displays the message: **Data source is working, found N apps.**

## Configure the data source with provisioning

Configure the AppDynamics data source using Grafana’s provisioning system by defining settings in YAML files. For details on the provisioning system and configuration options, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

### Basic authentication example

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AppDynamics
    type: dlopes7-appdynamics-datasource
    basicAuth: true
    basicAuthUser: <USERNAME>
    url: https://<COMPANY>.saas.appdynamics.com
    secureJsonData:
      basicAuthPassword: <PASSWORD>
```

### API client with Analytics example

> Note
>
> If you configure both an API key and basic authentication, the API key takes precedence.

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AppDynamics
    type: dlopes7-appdynamics-datasource
    jsonData:
      clientName: <CLIENT_NAME>
      clientDomain: <CLIENT_DOMAIN>
      analyticsURL: https://analytics.api.appdynamics.com
      globalAccountName: <GLOBAL_ACCOUNT_NAME>
    secureJsonData:
      clientSecret: <CLIENT_SECRET>
      analyticsAPIKey: <ANALYTICS_API_KEY>
```

Replace the `<PLACEHOLDER>` values with your actual credentials and configuration.

## Configure the data source with Terraform

You can configure the AppDynamics data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

The following examples demonstrate configurations for basic authentication and API client authentication.

### Basic authentication

terraform [Copy code to clipboard] Copy

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

resource "grafana_data_source" "appdynamics_basic" {
  type       = "dlopes7-appdynamics-datasource"
  name       = "AppDynamics"
  url        = "https://${var.appdynamics_company}.saas.appdynamics.com"
  basic_auth_enabled  = true
  basic_auth_username = var.appdynamics_username

  secure_json_data_encoded = jsonencode({
    basicAuthPassword = var.appdynamics_password
  })
}
```

### API client with Analytics

terraform [Copy code to clipboard] Copy

```terraform
resource "grafana_data_source" "appdynamics_api_client" {
  type = "dlopes7-appdynamics-datasource"
  name = "AppDynamics"
  url  = "https://${var.appdynamics_company}.saas.appdynamics.com"

  json_data_encoded = jsonencode({
    clientName        = var.appdynamics_client_name
    clientDomain      = var.appdynamics_client_domain
    analyticsURL      = "https://analytics.api.appdynamics.com"
    globalAccountName = var.appdynamics_global_account_name
  })

  secure_json_data_encoded = jsonencode({
    clientSecret    = var.appdynamics_client_secret
    analyticsAPIKey = var.appdynamics_analytics_api_key
  })
}
```

For more information about the Grafana Terraform provider, refer to the [Grafana provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs).
