---
title: "Configure the Jira data source | Grafana Enterprise Plugins documentation"
description: "This document describes configuration options for the Jira data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Jira data source

Grafana provides a number of configuration options for the Jira data source. For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

## Before you begin

Before you configure the Jira data source, complete the following steps:

1. Install the Jira data source plugin. To install the plugin, refer to [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins).
2. Verify you have access to the Jira projects you want to query. The Jira account needs **Browse Projects** on those projects. Jira site administrator access is not required for this data source.
3. Ensure you can add data sources in Grafana. Organization administrator access is enough, or a custom RBAC role with `datasources:create`. Refer to [Role-based access control](/docs/grafana/latest/administration/roles-and-permissions/access-control/).
4. Gather credentials for the authentication method you plan to use:

   - **Basic Auth:** a Jira API token. To create a token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/). For Jira Data Center or Jira Server, you can use a Personal Access Token (PAT) instead.
   - **OAuth 2.0 (service account):** a Jira Cloud [service account](https://confluence.atlassian.com/enterprise/create-a-service-account-via-the-ui-1627556046.html) with a client ID and client secret, plus the site [Cloud ID](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/). Available in plugin 2.6.0 and later.

## Add the Jira data source

Complete the following steps to add a new Jira data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Jira` in the search bar.
4. Select the Jira data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you set up your Jira configuration.

## Jira configuration options

The following section describes the configuration options available for the Jira data source.

### Connection

Configure the connection to your Jira instance. If you are unsure of your Jira URL, contact your Jira administrator.

- **Provider** - Where your Jira instance is hosted. Select **Jira Cloud** if Jira is hosted on Atlassian Cloud. Select **Jira Data Center / Jira Server** if Jira is hosted on-premises or elsewhere.
- **URL** - The root URL for your Atlassian instance. For example, `https://your-domain.atlassian.net`. If you omit `https://` or `http://`, the plugin adds `https://` at the start. For OAuth 2.0 and scoped API tokens, Grafana still stores this URL, but API requests go to `https://api.atlassian.com/ex/jira/{cloudId}`.

### Authentication

Configure authentication to access the data source. Select an **Authentication method**, then complete the fields for that method. The authentication method depends on your Jira deployment type.

Expand table

| Method                          | Best for                                                             | Jira Cloud | Jira Data Center / Server | Plugin version       |
|---------------------------------|----------------------------------------------------------------------|------------|---------------------------|----------------------|
| **Basic Auth**                  | User or service-account API tokens, or a PAT on Data Center / Server | Yes        | Yes                       | All current versions |
| **OAuth 2.0 (service account)** | Jira Cloud service accounts (client credentials)                     | Yes        | No                        | 2.6.0 or later       |

OAuth 2.0 is available only for Jira Cloud, and only as **client credentials** for a service account. Both methods support Grafana alerting. The plugin doesn’t support a user login (authorization-code) OAuth flow, OAuth for Jira Data Center or Jira Server, or certificate-based Jira credentials. Selecting **OAuth 2.0 (service account)** sets **Provider** to **Jira Cloud**. Use the TLS settings in this form only for transport encryption.

#### Basic Auth

Use **Basic Auth** with an email address and API token, or with a Personal Access Token (PAT) on Jira Data Center or Jira Server.

- **User email** (optional) - The email address for the user or service account. Required for Jira Cloud.
- **API Token** - The API token associated with the user. To create an API token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/). To replace a token, create the new token first, update this field, click **Save &amp; test**, then revoke the old token. For the full procedure, refer to [Rotate an API token](/docs/plugins/grafana-jira-datasource/latest/troubleshooting/#rotate-an-api-token). If you are using an API token with scopes enabled, the token must include the following permissions: `read:jira-user` and `read:jira-work`. Ensure these permissions are granted to support the required APIs, including [Issue Search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) and [Myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-rest-api-3-myself-get). You may use Granular scopes instead of Classic scopes, however Classic scopes are recommended.
- **Scoped Token** - Toggle on if the API token is configured with scopes. When this switch is on, the **Jira App Cloud Id** field appears.
- **Jira App Cloud Id** - The Cloud ID of the Jira Cloud app. Required when **Scoped Token** is enabled. With a scoped token, the plugin sends API requests to `https://api.atlassian.com/ex/jira/{cloudId}` instead of the **URL** you entered.

Expand table

| Jira deployment  | User email | API Token                   | Method                        |
|------------------|------------|-----------------------------|-------------------------------|
| Jira Cloud       | Required   | API token from Atlassian    | Basic authentication          |
| Jira Data Center | Optional   | Personal Access Token (PAT) | Bearer token (if email empty) |
| Jira Server      | Optional   | Personal Access Token (PAT) | Bearer token (if email empty) |

> Note
>
> For Jira Data Center and Jira Server, you can use Personal Access Tokens (PAT) with Bearer token authentication. Leave the **User email** field empty and enter your PAT in the **API Token** field.

#### OAuth 2.0 (service account)

Use OAuth 2.0 client credentials for a Jira Cloud service account. This method isn’t available for Jira Data Center or Jira Server. If you don’t see **OAuth 2.0 (service account)** in the UI, update the plugin to version 2.6.0 or later. Selecting it disables the **Provider** radio and sets the provider to **Jira Cloud**. The plugin requests tokens from `https://auth.atlassian.com/oauth/token` and sends API requests to `https://api.atlassian.com/ex/jira/{cloudId}`.

The app must grant the `read:jira-user` and `read:jira-work` scopes. The health check calls the Jira `/myself` endpoint, which requires `read:jira-user`.

- **Client ID** - The OAuth 2.0 Client ID for the Jira service account.
- **Client Secret** - The OAuth 2.0 Client Secret for the Jira service account.
- **Jira App Cloud Id** - The Cloud ID of the Jira Cloud app. Required.

Expand table

| Jira deployment | Client ID | Client Secret | Jira App Cloud Id | Method    |
|-----------------|-----------|---------------|-------------------|-----------|
| Jira Cloud      | Required  | Required      | Required          | OAuth 2.0 |

#### TLS settings

Configure TLS when Grafana connects to Jira over HTTPS with a private CA or a client certificate. These options encrypt the connection. They aren’t a substitute for **Basic Auth** or **OAuth 2.0 (service account)**.

- **Add self-signed certificate** - Provide a CA certificate used to verify the TLS certificate presented by Jira. Follow the CA (Certificate Authority) instructions to download the certificate file.
- **TLS client authentication** - Toggle on to use client authentication. When enabled, add the **Server name**, **Client cert**, and **Client key**. The client provides a certificate that the server validates to establish the client’s identity.
- **Skip TLS certificate validation** - Toggle on to bypass TLS certificate validation. Don’t use this setting in production.

### Additional settings

Additional settings are optional and provide more control over your data source.

> Note
>
> **Secure Socks Proxy** is visible only when the `secureSocksDSProxyEnabled` feature toggle is enabled in your Grafana configuration.

- **Enable Secure Socks Proxy** - Toggle to enable proxying the data source connection through a secure socks proxy to a different network. For more information, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

### Private data source connect (PDC)

> Note
>
> Private data source connect (PDC) is only available for Grafana Cloud users.

Use PDC to connect to and query data within a secure network without opening that network to inbound traffic from Grafana Cloud. For more information on how PDC works, refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). For setup instructions, refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

- **Private data source connect** - Select the PDC connection from the drop-down menu or create a new connection.

## Save and test

After you have configured your Jira data source options, click **Save &amp; test** to validate the connection. On success, Grafana displays:

**Plugin health check successful**

If the connection fails, expand **Show details** in the error alert and refer to [Troubleshoot Jira data source issues](/docs/plugins/grafana-jira-datasource/latest/troubleshooting/). You can also remove a connection by clicking **Delete**.

## Provision the Jira data source

You can provision the Jira data source in YAML files as part of the Grafana provisioning system. For more information about provisioning a data source, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

### Basic Auth

Use the following YAML to provision Basic Auth with an email address and API token:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Jira
    type: grafana-jira-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      url: https://your-domain.atlassian.net
      user: user@example.com
      hosting: cloud
      scopedToken: false
    secureJsonData:
      token: <your-api-token>
```

The following table describes the Basic Auth provisioning options:

Expand table

| Field         | Description                                                                                                                                            | Required |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `url`         | The root URL for your Atlassian instance. If the scheme is omitted, the plugin adds `https://` at the start                                            | Yes      |
| `user`        | The email address for the user or service account. If empty, the plugin sends the token as a Bearer token (PAT)                                        | No       |
| `hosting`     | The Jira provider type: `cloud` or `server`. If omitted, the plugin uses the Cloud API (v3). Set `server` for Jira Data Center or Jira Server (API v2) | No       |
| `token`       | The API token or PAT                                                                                                                                   | Yes      |
| `scopedToken` | Set to `true` when the API token includes scopes                                                                                                       | No       |
| `cloudId`     | The Jira App Cloud Id. Required when `scopedToken` is `true`                                                                                           | No       |

### Basic Auth with a scoped token

Use the following YAML when the API token includes scopes. Set `scopedToken` to `true` and provide `cloudId`:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Jira
    type: grafana-jira-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      url: https://your-domain.atlassian.net
      user: user@example.com
      hosting: cloud
      scopedToken: true
      cloudId: <your-cloud-id>
    secureJsonData:
      token: <your-scoped-api-token>
```

### OAuth 2.0 (service account)

Use the following YAML to provision OAuth 2.0 for a Jira Cloud service account:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Jira
    type: grafana-jira-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      url: https://your-domain.atlassian.net
      hosting: cloud
      authMethod: oauth2
      oauthClientID: <your-client-id>
      cloudId: <your-cloud-id>
    secureJsonData:
      oauthClientSecret: <your-client-secret>
```

The following table describes the OAuth 2.0 provisioning options:

Expand table

| Field               | Description                                                                               | Required |
|---------------------|-------------------------------------------------------------------------------------------|----------|
| `url`               | Stored on the data source. API requests use `https://api.atlassian.com/ex/jira/{cloudId}` | Yes      |
| `hosting`           | Forced to Cloud in the UI when you select OAuth 2.0. Set `cloud` in provisioning          | No       |
| `authMethod`        | Set to `oauth2`. If omitted, the plugin defaults to `basicAuth`                           | Yes      |
| `oauthClientID`     | The client ID for the service account                                                     | Yes      |
| `cloudId`           | The Jira App Cloud Id                                                                     | Yes      |
| `oauthClientSecret` | The client secret for the service account                                                 | Yes      |

## Provision with Terraform

You can provision the Jira data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).

### Basic Auth

Use the following Terraform resource for Basic Auth:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "jira" {
  type = "grafana-jira-datasource"
  name = "Jira"

  json_data_encoded = jsonencode({
    url     = "https://your-domain.atlassian.net"
    user    = "user@example.com"
    hosting = "cloud"
  })

  secure_json_data_encoded = jsonencode({
    token = var.jira_api_token
  })
}
```

### OAuth 2.0 (service account)

Use the following Terraform resource for OAuth 2.0:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "jira" {
  type = "grafana-jira-datasource"
  name = "Jira"

  json_data_encoded = jsonencode({
    url           = "https://your-domain.atlassian.net"
    hosting       = "cloud"
    authMethod    = "oauth2"
    oauthClientID = var.jira_client_id
    cloudId       = var.jira_cloud_id
  })

  secure_json_data_encoded = jsonencode({
    oauthClientSecret = var.jira_client_secret
  })
}
```
