---
title: "Configure the SolarWinds data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the SolarWinds data source in Grafana, including authentication and TLS settings."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the SolarWinds data source

This document explains how to configure the SolarWinds data source in Grafana.

## Before you begin

Before you configure the data source, ensure you have:

- **SolarWinds data source plugin installed:** For installation instructions, refer to [Install the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/install/).
- **Grafana permissions:** Organization administrator role.
- **SolarWinds credentials:** A username and password that can access the SolarWinds Information Service API.
- **Network access:** Outbound connectivity from Grafana to your SolarWinds instance on port `17774`.

## Add the data source

To add the SolarWinds data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `SolarWinds` in the search bar.
4. Select **SolarWinds**.
5. Click **Add new data source**.

## Configure settings

Configure the following settings for the SolarWinds data source:

Expand table

| Setting     | Description                                                                                                                                                                |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**    | The name used to refer to the data source in panels and queries.                                                                                                           |
| **Default** | Toggle to make this the default data source for new panels.                                                                                                                |
| **URL**     | The base URL of your SolarWinds instance, including `https://` and without a trailing slash, for example `https://solarwinds.example.com`. Enter only the scheme and host. |

## Configure the connection

The SolarWinds data source connects to the SolarWinds Information Service (SWIS) API, not the SolarWinds Orion web UI. Configure the connection so that Grafana can reach the SWIS API.

### Server URL

Enter only the scheme and host of your SolarWinds server in the **URL** field, for example `https://solarwinds.example.com`. The data source automatically appends the SWIS port (`17774`) and API path, so you don’t add them yourself.

> Caution
>
> Don’t use the SolarWinds Orion web UI URL, such as `https://solarwinds.example.com/Orion/SummaryView.aspx`. The plugin connects to the SWIS API, so the URL must be the base host only. Don’t include a port, path, or trailing slash. The data source builds the final endpoint as `https://<host>:17774/SolarWinds/InformationService/v3/Json`.

### Required port

The SWIS REST API listens on port `17774` by default. This port must be open between your Grafana server and your SolarWinds server. Port `443`, which serves the Orion web UI, isn’t used by this data source.

## Authentication

The SolarWinds data source uses basic authentication. Provide the credentials for a SolarWinds account that can access the SWIS API.

Expand table

| Setting      | Description                                                |
|--------------|------------------------------------------------------------|
| **Username** | The username of a SolarWinds account with SWIS API access. |
| **Password** | The password for that SolarWinds account.                  |

Use a SolarWinds Orion account that’s allowed to authenticate against the SWIS API and that has permission to read the entities you query, such as `Orion.Nodes` and `Orion.AlertActive`. If you can sign in to the Orion web console but queries fail with authorization errors, confirm the account is permitted to use the SWIS API.

### TLS settings

If your SolarWinds instance uses a self-signed or custom certificate, configure one of the following TLS options:

Expand table

| Setting                             | Description                                                                        |
|-------------------------------------|------------------------------------------------------------------------------------|
| **Add self-signed certificate**     | Provide the CA certificate so Grafana can verify a self-signed certificate.        |
| **TLS Client Authentication**       | Provide a client certificate and key, and an optional server name, for mutual TLS. |
| **Skip TLS certificate validation** | Disable certificate verification.                                                  |

> Caution
>
> Skipping TLS certificate validation makes the connection vulnerable to machine-in-the-middle attacks. Only use it for testing, and prefer adding a self-signed certificate in production.

> Note
>
> The Grafana backend uses the Go runtime, which enforces stricter certificate compliance than some tools. A certificate that works with `curl -k` might still be rejected by Grafana. In particular, certificates with a negative serial number fail with an `x509: negative serial number` error, even when you skip TLS certificate validation. To resolve this, reissue the SolarWinds server certificate with a positive serial number. For more information, refer to [TLS certificate errors](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/#tls-certificate-errors).

## Verify the connection

Click **Save &amp; test** to verify the connection. Grafana runs a SWQL health check query against your SolarWinds instance. When the connection succeeds, Grafana displays the message `health check succeeded for 'SWQL Query' query`.

If the test fails, refer to [Troubleshoot the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/troubleshooting/) for solutions to common connection, authentication, and TLS errors.

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: SolarWinds
    type: grafana-solarwinds-datasource
    jsonData:
      variables:
        url: https://<HOSTNAME>
      services:
        solarwinds:
          auth:
            username: <USERNAME>
    secureJsonData:
      solarwinds.password: <PASSWORD>
```

Replace `<HOSTNAME>` with the hostname of your SolarWinds instance, `<USERNAME>` with your SolarWinds username, and `<PASSWORD>` with your SolarWinds password.

### Provision with Terraform

You can provision the data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "solarwinds" {
  type = "grafana-solarwinds-datasource"
  name = "SolarWinds"

  json_data_encoded = jsonencode({
    variables = {
      url = "https://<HOSTNAME>"
    }
    services = {
      solarwinds = {
        auth = {
          username = var.solarwinds_username
        }
      }
    }
  })

  secure_json_data_encoded = jsonencode({
    "solarwinds.password" = var.solarwinds_password
  })
}
```

For more information, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).
