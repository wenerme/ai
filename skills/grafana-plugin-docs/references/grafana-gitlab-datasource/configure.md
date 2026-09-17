---
title: "Configure the GitLab data source | Grafana Enterprise Plugins documentation"
description: "Configure the GitLab data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the GitLab data source

This document explains how to configure the GitLab data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana Enterprise plugin entitlement:** The GitLab data source is an Enterprise plugin and requires an active entitlement. It isn’t included in every plan or contract. To verify, check whether **GitLab** is available under **Plugins and data** &gt; **Plugins**. If it isn’t, contact your account team or [Grafana Support](/profile/org#support). For installation, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).
- **Grafana permissions:** Organization administrator role
- **GitLab account:** A GitLab.com or self-managed GitLab instance
- **GitLab personal access token:** A token with the `read_api` scope

## Create a GitLab personal access token

To authenticate with GitLab, create a personal access token with `read_api` permissions:

1. In GitLab, navigate to your [Personal Access Tokens](https://gitlab.com/-/profile/personal_access_tokens) page.
2. Enter a name in the **Token name** field.
3. Set an expiration date in the **Expiration date** field.
4. Under **Select scopes**, select **read\_api**.
5. Click **Create personal access token**.
6. Copy the token value. You can’t view the token again after you leave the page.

## Add the data source

To add the GitLab data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `GitLab` in the search bar.
4. Select **GitLab**.
5. Click **Add new data source**.

## Configure settings

The following table describes the available configuration settings:

Expand table

| Setting                | Description                                                                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**               | The display name for this data source instance.                                                                                                                                                                                     |
| **URL**                | The root URL for your GitLab instance API. Leave blank to default to `https://gitlab.com/api/v4`. For self-managed instances, enter your GitLab URL (for example, `https://gitlab.example.com/api/v4`).                             |
| **Access token**       | Your GitLab personal access token with the `read_api` scope.                                                                                                                                                                        |
| **Page limit**         | The maximum number of pages fetched per query. Default: `5`. Increase this value to return more results per query. This setting is found under **Additional Settings**.                                                             |
| **Secure Socks Proxy** | Enable to proxy the data source connection through the secure socks proxy. Only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled on Grafana 10 or later. This setting is found under **Additional Settings**. |

## Private data source connect

Private data source connect (PDC) lets Grafana Cloud query a GitLab instance that runs on a private network, without exposing the instance to inbound traffic from Grafana Cloud. For self-managed Grafana, use the secure socks proxy for the equivalent routing.

### Grafana Cloud

In Grafana Cloud, route the connection through a PDC network that you control:

1. Set up a PDC network and run the PDC agent. For instructions, refer to [Configure Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).
2. In the GitLab data source configuration, under **Additional Settings** &gt; **Private data source connect**, select your network from the **Private data source connect network** drop-down. To create one, click **Manage private data source connect networks**.
3. Click **Save &amp; test**.

### Self-managed Grafana

The **Secure Socks Proxy** toggle appears under **Additional Settings** only when the `secureSocksDSProxyEnabled` feature toggle is enabled and you run Grafana version 10.0.0 or later.

1. Enable the `secureSocksDSProxyEnabled` feature toggle.
2. Configure the secure socks proxy in the `[secure_socks_datasource_proxy]` section of `grafana.ini`. For instructions, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).
3. In the GitLab data source configuration, enable the **Secure Socks Proxy** toggle and click **Save &amp; test**.

## Verify the connection

Click **Save &amp; test** to verify the connection.

If the connection is successful, you see the message **Plugin health check successful**.

If you see an error, refer to [Troubleshoot GitLab data source issues](/docs/plugins/grafana-gitlab-datasource/latest/troubleshooting/) for help resolving common errors.

## Provision the data source

You can define the data source using YAML files as part of Grafana’s provisioning system. For more information about provisioning, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: GitLab
    type: grafana-gitlab-datasource
    access: proxy
    url: https://gitlab.com/api/v4
    jsonData:
      pageLimit: 5
      enableSecureSocksProxy: false
    secureJsonData:
      accessToken: <YOUR_ACCESS_TOKEN>
```

Replace `<YOUR_ACCESS_TOKEN>` with your GitLab personal access token.

### Provision the data source with Terraform

You can provision the GitLab data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "gitlab" {
  type = "grafana-gitlab-datasource"
  name = "GitLab"
  url  = "https://gitlab.com/api/v4"

  json_data_encoded = jsonencode({
    pageLimit              = 5
    enableSecureSocksProxy = false
  })

  secure_json_data_encoded = jsonencode({
    accessToken = var.gitlab_access_token
  })
}
```
