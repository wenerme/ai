---
title: "Configure the GitLab data source | Grafana Enterprise Plugins documentation"
description: "Configure the GitLab data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the GitLab data source

This document explains how to configure the GitLab data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role
- **GitLab account:** A GitLab.com or self-hosted GitLab instance
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
| **URL**                | The root URL for your GitLab instance API. Leave blank to default to `https://gitlab.com/api/v4`. For self-hosted instances, enter your GitLab URL (for example, `https://gitlab.example.com/api/v4`).                              |
| **Access token**       | Your GitLab personal access token with the `read_api` scope.                                                                                                                                                                        |
| **Page limit**         | The maximum number of pages fetched per query. Default: `5`. Increase this value to return more results per query. This setting is found under **Additional Settings**.                                                             |
| **Secure Socks Proxy** | Enable to proxy the data source connection through the secure socks proxy. Only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled on Grafana 10 or later. This setting is found under **Additional Settings**. |

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
