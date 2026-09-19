---
title: "Configure the Jenkins data source | Grafana Enterprise Plugins documentation"
description: "Configure the Jenkins data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Jenkins data source

This document explains how to configure the Jenkins data source. For query instructions, refer to the [Jenkins query editor](/docs/plugins/grafana-jenkins-datasource/latest/query-editor/).

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** The `Organization administrator` role.
- **Installed plugin:** The Jenkins data source plugin is installed. Refer to [Install and upgrade the Jenkins data source plugin](/docs/plugins/grafana-jenkins-datasource/latest/install/).
- **Jenkins prerequisites:** A Jenkins instance with the [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/) enabled, and credentials if the instance requires authentication.

## Add the data source

To add the data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Jenkins` in the search bar.
4. Select **Jenkins**.
5. Click **Add new data source**.

## Connection

Configure the connection to your Jenkins instance.

Expand table

| Setting  | Description                                                                                     |
|----------|-------------------------------------------------------------------------------------------------|
| **Name** | The name used to refer to the data source in panels and queries.                                |
| **URL**  | The URL of your Jenkins instance, for example, `https://ci.jenkins.io`. This field is required. |

## Authentication

If your Jenkins instance requires authentication, provide the following credentials. The data source uses HTTP basic authentication.

Expand table

| Setting      | Description                                          |
|--------------|------------------------------------------------------|
| **User**     | The username to use for authentication.              |
| **Password** | The password or API token to use for authentication. |

To read more about the Jenkins Remote Access API, refer to the [Jenkins documentation](https://www.jenkins.io/doc/book/using/remote-access-api/).

## Private data source connect

The Jenkins data source supports [Private Data Source Connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/), which lets Grafana Cloud query a Jenkins instance on a private network.

When the Secure Socks Proxy feature is enabled in your Grafana environment, an **Enable Secure Socks Proxy** toggle appears in the data source configuration. Enable it to route the data source connection through the proxy to your private network.

## Verify the connection

Click **Save &amp; test** to verify the connection. When the connection succeeds, Grafana displays `Data source is working`. If the connection fails, Grafana displays `Unable to connect to Jenkins` followed by the error details.

To make Jenkins the default data source for new panels and queries, click **Make default** at the bottom of the configuration page, next to **Save &amp; test**.

## Provision the data source

You can define the data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here’s a provisioning example for this data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Jenkins
    type: grafana-jenkins-datasource
    access: proxy
    jsonData:
      url: https://ci.jenkins.io
      username: <USERNAME>
    secureJsonData:
      password: <PASSWORD>
```

You can also provision the data source with [Terraform](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "jenkins" {
  type = "grafana-jenkins-datasource"
  name = "Jenkins"

  json_data_encoded = jsonencode({
    url      = "https://ci.jenkins.io"
    username = "<USERNAME>"
  })

  secure_json_data_encoded = jsonencode({
    password = "<PASSWORD>"
  })
}
```

The Jenkins data source reads the instance URL from `jsonData.url`, so set the URL inside `json_data_encoded` rather than the resource’s top-level `url` argument.

## Next steps

- [Use the Jenkins query editor](/docs/plugins/grafana-jenkins-datasource/latest/query-editor/)
- [Troubleshoot the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/)
