---
title: "Configure the Azure DevOps data source | Grafana Enterprise Plugins documentation"
description: "Configure the Azure DevOps data source plugin for Grafana, including authentication, settings, and provisioning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Azure DevOps data source

This document explains how to configure the Azure DevOps data source in Grafana.

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** `Organization administrator` role.
- **Grafana plan:** A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **Azure DevOps account:** An Azure DevOps organization (cloud) or Azure DevOps Server instance (on-prem).
- **Personal access token (PAT):** A PAT with the required scopes. Refer to [Create a personal access token](#create-a-personal-access-token).

## Add the data source

To add the Azure DevOps data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Azure DevOps` in the search bar.
4. Select **Azure DevOps**.
5. Click **Add new data source**.

## Configure settings

The Azure DevOps data source has required and optional settings.

### Required settings

Expand table

| Setting | Description                                                                                                                                                                                                                      |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **URL** | The URL of your Azure DevOps organization. For Azure DevOps Services, use `https://dev.azure.com/<ORGANIZATION>`. For Azure DevOps Server (on-prem), use the URL of your server instance.                                        |
| **PAT** | The personal access token used to authenticate with Azure DevOps. Refer to [Create a personal access token](#create-a-personal-access-token). Once saved, the field displays “Configured”. Click **Reset** to enter a new token. |

### Optional settings

These settings appear under the **Optional Configuration** section.

Expand table

| Setting                | Description                                                                                                                                                                                                                                                                                                                                                |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Projects limit**     | The maximum number of projects to retrieve. Default: `100`. This value applies to the project picker in the query editor, template variable queries, and the health check. Increase this value if your organization has more than 100 projects.                                                                                                            |
| **Username**           | The username of the PAT owner. This may be needed for some versions of Azure DevOps Server (on-prem).                                                                                                                                                                                                                                                      |
| **Secure Socks Proxy** | Enable proxying the data source connection through the secure socks proxy to a different network. This toggle is only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled in Grafana 10 or later. Refer to [Configure a datasource connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/) for more information. |

## Create a personal access token

The Azure DevOps data source authenticates using a personal access token (PAT).

To create a PAT:

1. In Azure DevOps, click your profile icon in the upper right and select **Personal access tokens**.
2. Click **New Token**.
3. Provide a name and set the expiration period.
4. Select the required scopes listed in the following table.
5. Click **Create** and copy the generated token.

For detailed instructions, refer to the [Azure DevOps PAT documentation](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate).

### Required PAT scopes

Set the following scopes to **Read** access for the features you plan to use:

Expand table

| Scope              | Required for                                        |
|--------------------|-----------------------------------------------------|
| **Code (Read)**    | Repositories and pull request queries               |
| **Build (Read)**   | Build and build definition queries                  |
| **Release (Read)** | Release, release definition, and deployment queries |

You can omit scopes for features you don’t use.

## Verify the connection

Click **Save &amp; test** to verify the connection. A successful connection displays one of the following messages:

[Copy code to clipboard] Copy

```none
healthcheck successful. N projects found
```

or, when the **Secure Socks Proxy** toggle is enabled:

[Copy code to clipboard] Copy

```none
Successfully connected to Azure DevOps. Found N projects.
```

In both cases, `N` is the number of projects accessible with your PAT. If the connection test fails, refer to [Troubleshoot Azure DevOps data source issues](/docs/plugins/grafana-azuredevops-datasource/latest/troubleshooting/).

## Provision the data source

You can define the data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Azure DevOps
    type: grafana-azuredevops-datasource
    access: proxy
    jsonData:
      url: https://dev.azure.com/<ORGANIZATION>
      projectsLimit: 100
      # Optional: set username for Azure DevOps Server (on-prem)
      # username: <USERNAME>
      # Optional: enable secure socks proxy
      # enableSecureSocksProxy: true
    secureJsonData:
      patToken: <PAT_TOKEN>
```

Expand table

| Key                               | Description                                                       |
|-----------------------------------|-------------------------------------------------------------------|
| `jsonData.url`                    | Required. The Azure DevOps organization or server URL.            |
| `jsonData.projectsLimit`          | Optional. Maximum number of projects to retrieve. Default: `100`. |
| `jsonData.username`               | Optional. PAT owner username for Azure DevOps Server.             |
| `jsonData.enableSecureSocksProxy` | Optional. Enable secure socks proxy. Default: `false`.            |
| `secureJsonData.patToken`         | Required. The personal access token.                              |

## Provision the data source with Terraform

You can provision the Azure DevOps data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). For more information, refer to [Provision Grafana with Terraform](/docs/grafana/latest/administration/provisioning/terraform/).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "azure_devops" {
  type = "grafana-azuredevops-datasource"
  name = "Azure DevOps"

  json_data_encoded = jsonencode({
    url            = "https://dev.azure.com/<ORGANIZATION>"
    projectsLimit  = 100
    # Optional: set username for Azure DevOps Server (on-prem)
    # username     = "<USERNAME>"
    # Optional: enable secure socks proxy
    # enableSecureSocksProxy = true
  })

  secure_json_data_encoded = jsonencode({
    patToken = "<PAT_TOKEN>"
  })
}
```
