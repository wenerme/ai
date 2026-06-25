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
2. Create a Jira API token for basic authentication. To create an API token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
3. Create a [service account](https://confluence.atlassian.com/enterprise/create-a-service-account-via-the-ui-1627556046.html) with OAuth 2.0 credentials and get your Jira app’s [Cloud ID](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/) for OAuth 2.0 authentication.
4. Verify you have access to the Jira projects you want to query.
5. Ensure you have the organization `administrator` role in Grafana. Only administrators can add data sources.

## Add the Jira data source

Complete the following steps to add a new Jira data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Jira` in the search bar.
4. Select the Jira data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you will set up your Jira configuration.

## Jira configuration options

The following section describes the configuration options available for the Jira data source.

### Connection

Configure the connection to your Jira instance. If you are unsure of your Jira URL, contact your Jira administrator.

- **Provider** - Where your Jira instance is hosted. Select **Jira Cloud** if Jira is hosted on Atlassian Cloud. Select **Jira Data Center / Jira Server** if Jira is hosted on-premises or elsewhere.
- **URL** - The root URL for your Atlassian instance. For example, `https://your-domain.atlassian.net`.

### Authentication

Configure authentication to access the data source. The authentication method depends on your Jira deployment type.

#### Basic Auth

- **User email** (optional) - The email address for the user or service account. Required for Jira Cloud.
- **API Token** - The API token associated with the user. To create an API token, refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/). If you are using an API token with scopes enabled, the token must include the following permissions: `read:jira-user` and `read:jira-work`. Ensure these permissions are granted to support the required APIs, including [Issue Search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) and [Myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-rest-api-3-myself-get). You may use Granular scopes instead of Classic scopes, however Classic scopes are recommended.
- **Scoped token** - The toggle switch to indicate the API Token is configured with scopes
- **Cloud ID** - The Cloud ID of the Jira Cloud App

Expand table

| Jira deployment  | User email | API Token                   | Method                        |
|------------------|------------|-----------------------------|-------------------------------|
| Jira Cloud       | Required   | API token from Atlassian    | Basic authentication          |
| Jira Data Center | Optional   | Personal Access Token (PAT) | Bearer token (if email empty) |
| Jira Server      | Optional   | Personal Access Token (PAT) | Bearer token (if email empty) |

#### OAuth 2.0 - Service Account

- **Client ID** - The OAuth 2.0 Client ID for the Jira Service Account
- **Client Secret** - The OAuth 2.0 Client Secret for the Jira Service Account
- **Cloud ID** - The Cloud ID of the Jira Cloud App

Expand table

| Jira deployment | Client ID | Client Secret | Cloud ID | Method    |
|-----------------|-----------|---------------|----------|-----------|
| Jira Cloud      | Required  | Required      | Required | OAuth 2.0 |

#### TLS Settings

- **Add self-signed-certificate** - Authenticate with a CA certificate. Follow the instructions of the CA (Certificate Authority) to download the certificate file. Required for verifying self-signed TLS certificates.
- **TLS Client authentication** - Toggle on to use client authentication. When enabled, add the `Server name`, `Client cert` and `Client key`. The client provides a certificate that is validated by the server to establish the client’s trusted identity. The client key encrypts the data between client and server.
- **Skip TLS certificate validation** - Toggle on to bypass TLS certificate validation.

> Note
>
> For Jira Data Center and Jira Server, you can use Personal Access Tokens (PAT) with Bearer token authentication. Leave the **User email** field empty and enter your PAT in the **API Token** field.

### Additional settings

Additional settings are optional and provide more control over your data source. This section is available in Grafana 10.0.0 and later.

- **Enable Secure Socks Proxy** - Toggle to enable proxying the data source connection through a secure socks proxy to a different network. For more information, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

### Private data source connect (PDC)

> Note
>
> Private data source connect (PDC) is only available for Grafana Cloud users.

Use PDC to connect to and query data within a secure network without opening that network to inbound traffic from Grafana Cloud. For more information on how PDC works, refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). For setup instructions, refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

- **Private data source connect** - Select the PDC connection from the drop-down menu or create a new connection.

## Save and test

After you have configured your Jira data source options, click **Save &amp; test** to validate the connection. You can also remove a connection by clicking **Delete**.

## Provision the Jira data source

You can provision the Jira data source in YAML files as part of the Grafana provisioning system. For more information about provisioning a data source, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

##### Basic Auth

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
      cloudId: cloud id of Jira Cloud App
    secureJsonData:
      token: <your-api-token>
```

The following table describes the provisioning options:

Expand table

| Field     | Description                                                            | Required |
|-----------|------------------------------------------------------------------------|----------|
| `url`     | The root URL for your Atlassian instance                               | Yes      |
| `user`    | The email address for the user or service account                      | No       |
| `hosting` | The Jira provider type: `cloud` or `server`                            | Yes      |
| `token`   | The API token for authentication                                       | Yes      |
| `cloudId` | The Cloud ID of the Jira Cloud App. Required when using a scoped token | No       |

##### OAuth 2.0 - Service Account

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
      cloudId: cloud id of Jira Cloud App
    secureJsonData:
      oauthClientSecret: <your-client-secret>
```

The following table describes the provisioning options:

Expand table

| Field               | Description                                 | Required |
|---------------------|---------------------------------------------|----------|
| `url`               | The root URL for your Atlassian instance    | Yes      |
| `hosting`           | The Jira provider type: `cloud` or `server` | Yes      |
| `authMethod`        | The auth method: `basicAuth` or `oauth2`    | Yes      |
| `oauthClientID`     | The client id for the service account       | Yes      |
| `cloudId`           | The cloud id of Jira Cloud App              | Yes      |
| `oauthClientSecret` | The client secret for the service account   | Yes      |

## Provision using Terraform

You can provision the Jira data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).

##### Basic Auth

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

##### OAuth 2.0 - Service Account

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
