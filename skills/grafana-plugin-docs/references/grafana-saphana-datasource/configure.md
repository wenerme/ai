---
title: "Configure the SAP HANA data source | Grafana Enterprise Plugins documentation"
description: "Configure the SAP HANA data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the SAP HANA data source

This document provides guidance on configuring the SAP HANA data source.

## Before you begin

The SAP HANA data source has the following requirements.

Grafana requirements:

- One of the following:

  - [Grafana Cloud](/products/cloud/) Free, Pro, or Advanced account.
  - Grafana Enterprise with an [activated license](/docs/grafana/latest/administration/enterprise-licensing/).
- The `Organization administrator` role to add data sources.

SAP HANA requirements:

- SAP HANA URL, username, and password, along with the necessary permissions.
- Connectivity between the Grafana server and your SAP HANA server. If the connection is protected by firewall rules, you need to allow Grafana’s IP to connect.

## Add the SAP HANA data source

For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/datasources/add-a-data-source/).

Complete the following steps to add a new SAP HANA data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `SAP HANA` in the search bar.
4. Select the SAP HANA data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you will set up your SAP HANA configuration.

## Configure the data source in the UI

The following table lists the configuration options for SAP HANA.

Expand table

| Setting             | Description                                                                                                                                                                                                                                                                           |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**            | The data source name. This is how you refer to the data source in panels and queries.                                                                                                                                                                                                 |
| **Default**         | Toggle to select this data source as the default in dashboard panels.                                                                                                                                                                                                                 |
| **Server address**  | **Required.** The base address of the SAP HANA instance (excluding the http/https prefixes). Example: `xxxxxxx-xxxx-xxxx-xxxx-xxxxxxx.hana.trial-us10.hanacloud.ondemand.com`                                                                                                         |
| **Username**        | **Required.** Username to connect to SAP HANA instance. This user must have required permissions to query the database.                                                                                                                                                               |
| **Password**        | **Required.** Password for the SAP HANA user.                                                                                                                                                                                                                                         |
| **Server port**     | The port of the SAP HANA instance. Example: `443` or `39013`. SAP HANA Cloud typically uses `443`, while on-premises or multi-tenant instances use their respective ports. An alternative to using the port for tenant instances is to fill in the database name and instance number. |
| **Default schema**  | Default schema to use. If not specified, you need to specify the schema in every query.                                                                                                                                                                                               |
| **Database name**   | For tenant databases. The database name you want to connect to.                                                                                                                                                                                                                       |
| **Instance number** | For tenant databases. The instance number. The server port is inferred with the formula: `3<instance>13`. Refer to [SAP HANA documentation](https://help.sap.com/docs/SAP_HANA_PLATFORM/78209c1d3a9b41cd8624338e42a12bf6/7a9343c9f2a2436faa3cfdb5ca00c052.html).                      |
| **Timeout**         | The timeout for database connections in seconds. Default: `30`.                                                                                                                                                                                                                       |

### TLS settings

The following settings control TLS/SSL configuration for secure connections:

Expand table

| Setting             | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Skip TLS verify** | Enable this option to skip TLS verification. Default: `false`.              |
| **TLS Client Auth** | Enable this option to provide client certificate and key. Default: `false`. |
| **With CA Cert**    | Needed for verifying self-signed TLS certificates. Default: `false`.        |

### Secure Socks Proxy

If you’re using Grafana 10.0 or later, you can enable the **Secure Socks Proxy** option to proxy the data source connection through a secure socks proxy to a different network. For more information, refer to [Configure a datasource connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/).

## Find the right port to connect

When creating the data source configuration, you need to specify the correct port number of the SAP HANA instance.

- For SAP HANA Cloud instances, the port is typically `443`.
- For on-premises or multi-tenant instances, you can find the respective port number by following the guidance in the [SAP HANA documentation](https://help.sap.com/viewer/6b94445c94ae495c83a19646e7c3fd56/2.0.02/en-US/440f6efe693d4b82ade2d8b182eb1efb.html).

You can determine the ports used by a particular tenant database by querying the `M_SERVICES` system view, either from the tenant database itself or from the system database.

From the tenant database:

SQL [Copy code to clipboard] Copy

```sql
SELECT SERVICE_NAME, PORT, SQL_PORT, (PORT + 2) HTTP_PORT FROM SYS.M_SERVICES WHERE ((SERVICE_NAME='indexserver' and COORDINATOR_TYPE= 'MASTER') or (SERVICE_NAME='xsengine'))
```

From the system database:

SQL [Copy code to clipboard] Copy

```sql
SELECT DATABASE_NAME, SERVICE_NAME, PORT, SQL_PORT, (PORT + 2) HTTP_PORT FROM SYS_DATABASES.M_SERVICES WHERE DATABASE_NAME='<DBNAME>' and ((SERVICE_NAME='indexserver' and COORDINATOR_TYPE= 'MASTER') or (SERVICE_NAME='xsengine'))
```

## Verify the connection

Click **Save &amp; test** to verify the connection settings and user credentials. A “Data source is working” message indicates that Grafana can connect to your SAP HANA instance. If you don’t see this message, refer to [Troubleshooting](/docs/plugins/grafana-saphana-datasource/latest/troubleshooting/) for help resolving common issues.

> Note
>
> The Save &amp; test validation doesn’t check access permissions to schemas. You may need to explicitly grant schema read permissions to the user.

## Access and permissions

To connect Grafana to SAP HANA, use dedicated credentials and only provide the required permissions to the user.

### Create a restricted user

Create a restricted user with username and password. The following query creates a restricted user and disables the force password change:

SQL [Copy code to clipboard] Copy

```sql
CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD> NO FORCE_FIRST_PASSWORD_CHANGE;
```

### Enable client connect

Allow the user to connect to the system through clients such as Grafana:

SQL [Copy code to clipboard] Copy

```sql
ALTER USER <USER> ENABLE CLIENT CONNECT;
```

### Grant permissions

Give the user access to necessary views, tables, and schemas:

SQL [Copy code to clipboard] Copy

```sql
ALTER USER <USER> GRANT ROLE PUBLIC;
GRANT SELECT ON SCHEMA <SCHEMA> TO <USER>;
```

## Data source permissions

Limit access to SAP HANA data by clicking on the **Permissions** tab in the data source configuration page to enable [data source permissions](/docs/grafana/latest/administration/data-source-management/). On the permissions page, admins can enable permissions and restrict query permissions to specific users and teams.

## Configure the data source with provisioning

You can define and configure the data source in YAML files as part of the Grafana provisioning system. For more information about provisioning and available configuration options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: SAP HANA
    type: grafana-saphana-datasource
    uid: sap_hana
    access: proxy
    orgId: 1
    jsonData:
      server: xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx.hana.trial-us10.hanacloud.ondemand.com
      port: 443
      username: GRAFANA_HANA_USERNAME
      tlsSkipVerify: false
      tlsAuth: false
      tlsAuthWithCACert: false
      defaultSchema: EXAMPLE
      databaseName: DATABASE
      instance: "01"
    secureJsonData:
      password: $SECURE_HANA_PASSWORD_FROM_ENVIRONMENT_VAR
      tlsCACert:
      tlsClientCert:
      tlsClientKey:
    version: 1
    editable: false
```

## Configure the data source with Terraform

You can configure the SAP HANA data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

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

resource "grafana_data_source" "sap_hana" {
  type = "grafana-saphana-datasource"
  name = "SAP HANA"

  json_data_encoded = jsonencode({
    server        = var.sap_hana_server
    port          = var.sap_hana_port
    username      = var.sap_hana_username
    defaultSchema = var.sap_hana_default_schema
    databaseName  = var.sap_hana_database_name
    instance      = var.sap_hana_instance
    tlsSkipVerify = false
    tlsAuth       = false
    tlsAuthWithCACert = false
  })

  secure_json_data_encoded = jsonencode({
    password = var.sap_hana_password
  })
}

# Variables
variable "grafana_url" {
  description = "Grafana instance URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "grafana_auth" {
  description = "Grafana authentication (e.g., admin:password or API key)"
  type        = string
  sensitive   = true
}

variable "sap_hana_server" {
  description = "SAP HANA server address"
  type        = string
}

variable "sap_hana_port" {
  description = "SAP HANA server port"
  type        = number
  default     = 443
}

variable "sap_hana_username" {
  description = "SAP HANA username"
  type        = string
}

variable "sap_hana_password" {
  description = "SAP HANA password"
  type        = string
  sensitive   = true
}

variable "sap_hana_default_schema" {
  description = "Default schema to use"
  type        = string
  default     = ""
}

variable "sap_hana_database_name" {
  description = "Database name for tenant databases"
  type        = string
  default     = ""
}

variable "sap_hana_instance" {
  description = "Instance number for tenant databases"
  type        = string
  default     = ""
}

# Outputs
output "sap_hana_uid" {
  description = "UID of the SAP HANA data source"
  value       = grafana_data_source.sap_hana.uid
}
```

## Next steps

After configuring the SAP HANA data source, you can:

- [Create queries](/docs/plugins/grafana-saphana-datasource/latest/query-editor/) using the SAP HANA query editor
- [Set up template variables](/docs/plugins/grafana-saphana-datasource/latest/template-variables/) for dynamic dashboards
- [Add annotations](/docs/plugins/grafana-saphana-datasource/latest/annotations/) to overlay events on your graphs
- [Configure alerting](/docs/plugins/grafana-saphana-datasource/latest/alerting/) to monitor your SAP HANA data
