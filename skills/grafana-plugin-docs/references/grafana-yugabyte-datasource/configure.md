---
title: "Configure the Yugabyte data source | Grafana Plugins documentation"
description: "Configure the Yugabyte data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Yugabyte data source

This document explains how to add and configure the Yugabyte data source in Grafana. After you configure the data source, refer to the [Yugabyte query editor](/docs/plugins/grafana-yugabyte-datasource/latest/query-editor/) to start querying your data.

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** The `Organization administrator` role. Only organization administrators can add data sources.
- **A YugabyteDB instance:** The host and port of a running YugabyteDB instance that’s reachable from Grafana. YugabyteDB accepts SQL connections on port `5433` by default.
- **Database credentials:** A username and password for a database user with permission to query the target database.

## Add the data source

To add the Yugabyte data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Enter `Yugabyte` in the search bar.
4. Select **Yugabyte**.
5. Click **Add new data source**.

## Name and default

At the top of the settings page, set the data source name and choose whether it’s the default:

Expand table

| Setting     | Description                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------|
| **Name**    | The name used to refer to the data source in panels and queries.                                |
| **Default** | Toggle to make this the default data source, which Grafana pre-selects when you create a panel. |

## Connection

In the **Connection** section, set the options used to reach your YugabyteDB instance:

Expand table

| Setting      | Description                                                                                     | Required |
|--------------|-------------------------------------------------------------------------------------------------|----------|
| **Host URL** | The host name or IP address and port of your YugabyteDB instance, for example `localhost:5433`. | Yes      |
| **Database** | The name of the YugabyteDB database to query.                                                   | Yes      |

## Authentication

In the **Authentication** section, provide the credentials Grafana uses to authenticate with YugabyteDB:

Expand table

| Setting      | Description                                                                                                                              | Required |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|----------|
| **Username** | The database user’s login name.                                                                                                          | Yes      |
| **Password** | The database user’s password. Grafana stores the password encrypted and doesn’t return it to the browser after you save the data source. | No       |

### TLS and SSL

The Yugabyte data source doesn’t provide TLS/SSL configuration options in the UI. It connects using the `sslmode=allow` connection setting. With this setting, the connection uses TLS when the server requires it, but Grafana doesn’t verify the server’s certificate and can’t present a client certificate. If your YugabyteDB deployment requires verified TLS or client certificates, place a TLS-terminating proxy in front of YugabyteDB and connect Grafana to the proxy.

[Private data source connect](#private-data-source-connect) encrypts traffic between Grafana Cloud and your private network, but it doesn’t change how the plugin negotiates TLS with the database.

## Additional settings

The **Additional Settings** section contains optional configuration.

### Private data source connect

> Note
>
> Private data source connect (PDC) is only available in Grafana Cloud.

Use private data source connect (PDC) to query a YugabyteDB instance within a secured network, without opening that network to inbound traffic from Grafana Cloud. For more information about how PDC works, refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). For steps to set up a connection, refer to [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/).

The Yugabyte data source routes connections through PDC with the **Secure Socks Proxy Enabled** toggle in the **Additional Settings** section of the configuration page. Turn on this toggle to send the database connection through your PDC network or configured proxy, then click **Save &amp; test**.

> Note
>
> The **Secure Socks Proxy Enabled** toggle only appears when the secure socks proxy is enabled for your Grafana instance. If the **Additional Settings** section is empty, the proxy isn’t enabled, which is expected on a default installation. Direct connections don’t require it.

On Grafana Cloud, setting up PDC for your stack enables the toggle. On self-managed Grafana, enable the secure socks proxy in your Grafana configuration file, then restart Grafana:

ini [Copy code to clipboard] Copy

```ini
[secure_socks_datasource_proxy]
enabled = true
```

For the full set of proxy options, refer to [Configure Grafana](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

## Verify the connection

Click **Save &amp; test** to verify the connection. When the connection succeeds, Grafana displays a **Data source is working** message. If the test fails, refer to [Troubleshoot Yugabyte data source issues](/docs/plugins/grafana-yugabyte-datasource/latest/troubleshooting/).

## Query caching

On Grafana Cloud and Grafana Enterprise, you can use the **Cache** tab on the data source page to enable query caching, which reduces load on YugabyteDB by reusing recent query results. For more information, refer to [Query and resource caching](/docs/grafana/latest/administration/data-source-management/#query-and-resource-caching).

## Provision the data source

You can provision the Yugabyte data source as code, either with the Grafana file-based provisioning system or with the Grafana Terraform provider. Both approaches use the same connection values.

Replace the following placeholders in the examples with your own values:

- `<HOST>`: The host name or IP address of your YugabyteDB instance.
- `<USERNAME>`: The database user’s login name.
- `<DATABASE>`: The name of the database to query.
- `<PASSWORD>`: The database user’s password.

### Provision with a configuration file

You can define the data source in YAML files as part of the Grafana provisioning system. For more information about provisioning and available options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following example provisions a Yugabyte data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Yugabyte
    type: grafana-yugabyte-datasource
    url: <HOST>:5433
    user: <USERNAME>
    jsonData:
      database: <DATABASE>
      # Optional: enable Private data source connect (PDC) on Grafana Cloud.
      enableSecureSocksProxy: false
    secureJsonData:
      password: <PASSWORD>
```

### Provision with Terraform

You can provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource. Pass the plugin’s `jsonData` and `secureJsonData` values through the `json_data_encoded` and `secure_json_data_encoded` fields.

The following example provisions a Yugabyte data source:

hcl [Copy code to clipboard] Copy

```hcl
terraform {
  required_providers {
    grafana = {
      source = "grafana/grafana"
    }
  }
}

resource "grafana_data_source" "yugabyte" {
  type     = "grafana-yugabyte-datasource"
  name     = "Yugabyte"
  url      = "<HOST>:5433"
  username = "<USERNAME>"

  json_data_encoded = jsonencode({
    database = "<DATABASE>"
    # Optional: enable Private data source connect (PDC) on Grafana Cloud.
    enableSecureSocksProxy = false
  })

  secure_json_data_encoded = jsonencode({
    password = "<PASSWORD>"
  })
}
```
