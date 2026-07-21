---
title: "Configure the Oracle data source | Grafana Enterprise Plugins documentation"
description: "Configure connection, authentication, and performance settings for the Oracle data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Oracle data source

This document explains how to configure the Oracle data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **Oracle Database access:** An Oracle user with `SELECT` permissions on the tables you want to query.
- **Plugin installed:** The Oracle plugin must be installed. Refer to [Install and upgrade the Oracle data source plugin](/docs/plugins/grafana-oracle-datasource/latest/install/) for installation instructions.

> Note
>
> When adding a data source, ensure the database user you specify has only `SELECT` permissions on the relevant database and tables you want to query. Grafana does not validate the safety of queries, which means they can include potentially harmful SQL statements such as `DROP TABLE user;` or `DELETE FROM user;`. To minimize this risk, Grafana strongly recommends creating a dedicated Oracle Database user with restricted permissions.

### Create a least-privilege database user

Create a dedicated Oracle user for Grafana with minimal permissions:

SQL [Copy code to clipboard] Copy

```sql
CREATE USER grafana_reader IDENTIFIED BY "<strong_password>";

GRANT CREATE SESSION TO grafana_reader;

GRANT SELECT ON schema_name.table_name TO grafana_reader;
```

To grant read access to all tables in a schema:

SQL [Copy code to clipboard] Copy

```sql
BEGIN
  FOR t IN (SELECT table_name FROM all_tables WHERE owner = 'SCHEMA_NAME') LOOP
    EXECUTE IMMEDIATE 'GRANT SELECT ON SCHEMA_NAME.' || t.table_name || ' TO grafana_reader';
  END LOOP;
END;
/
```

For monitoring dashboards that query system views (`V$` views, `DBA_` views), grant the appropriate roles:

SQL [Copy code to clipboard] Copy

```sql
GRANT SELECT_CATALOG_ROLE TO grafana_reader;
```

> Caution
>
> `SELECT_CATALOG_ROLE` grants read access to all data dictionary views. For tighter security, grant access to individual views instead (for example, `GRANT SELECT ON V_$SYSSTAT TO grafana_reader`).

## Key concepts

If you’re new to Oracle Database connectivity, these terms are used throughout the configuration:

Expand table

| Term                | Description                                                                                                                               |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **TNSNames**        | A file-based naming method (`tnsnames.ora`) that maps connection identifiers to Oracle Net connection descriptors.                        |
| **Connection pool** | A cache of database connections maintained for reuse, reducing the overhead of creating new connections for each query.                   |
| **PDC**             | Private data source connect, a Grafana Cloud feature that establishes a private, secured connection to data sources in a private network. |
| **Prefetch rows**   | The number of rows buffered from the database after each query execution, improving performance for large result sets.                    |

## Add the data source

To add the Oracle data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Oracle` in the search bar.
4. Select **Oracle Database**.
5. Click **Add new data source**.

## Configure settings

The following settings are available on the data source configuration page.

Expand table

| Setting     | Description                                                  |
|-------------|--------------------------------------------------------------|
| **Name**    | The display name for this data source in panels and queries. |
| **Default** | Toggle to make this the default data source for new panels.  |

## Connection

You can connect to Oracle using two connection methods.

Expand table

| Method                 | Best for                | Grafana Cloud |
|------------------------|-------------------------|---------------|
| **Host with TCP Port** | Any deployment          | Supported     |
| **TNSNames Entry**     | Self-managed Enterprise | Not supported |

### Host with TCP Port

Connect using a hostname or IP address with the TCP port number.

Expand table

| Setting      | Description                                                                          |
|--------------|--------------------------------------------------------------------------------------|
| **Host**     | The hostname or IP address with TCP port number (for example, `oracle-server:1521`). |
| **Database** | The name of the Oracle database or service name.                                     |

### TNSNames Entry

Specify a `tnsnames.ora` entry for connection. This method requires the `tnsnames.ora` file to be present on the Grafana server.

> Note
>
> TNSNames is not supported in Grafana Cloud. Use Host with TCP Port and [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) instead.

Expand table

| Setting     | Description                                                        |
|-------------|--------------------------------------------------------------------|
| **TNSName** | The connection identifier as specified in the `tnsnames.ora` file. |

## Authentication

The data source supports two authentication methods. The available methods depend on your connection type.

### Basic authentication

Basic authentication is available with both connection methods. Authenticate using an Oracle username and password.

Expand table

| Setting      | Description                                      |
|--------------|--------------------------------------------------|
| **User**     | The Oracle username with access to the database. |
| **Password** | The Oracle password for the specified user.      |

### Kerberos authentication

Kerberos authentication requires a TNSNames connection and server-side Kerberos configuration.

> Note
>
> Kerberos authentication is not supported in Grafana Cloud.

Kerberos must be configured in the `tnsnames.ora` and `sqlnet.ora` files. Refer to [Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/kerberos/) for configuration parameters.

## Additional settings

Expand table

| Setting                  | Description                                                                                                                                                                                                                                                                     | Default   |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Timezone**             | The timezone of the Oracle server, selected from a drop-down.                                                                                                                                                                                                                   | `UTC`     |
| **Secure Socks Proxy**   | Proxy the data source connection through a secure socks proxy. Only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled and Grafana is version 10.0 or later. Timezone configuration is ignored when enabled, and Kerberos authentication is not guaranteed. | Disabled  |
| **Connection Pool Size** | Maximum number of connections in the pool. Overrides the `GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE` environment variable when set.                                                                                                                                                 | `50`      |
| **Dataproxy Timeout**    | Maximum time in seconds to wait for a query response. Overrides the `GF_DATAPROXY_TIMEOUT` environment variable when set.                                                                                                                                                       | `120`     |
| **Prefetch Row Size**    | Number of rows buffered after each query execution. Higher values improve performance for large result sets. Refer to [Oracle `prefetch` documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/CLIENT_PREFETCH_ROWS.html) for details.             | Not set   |
| **Row Limit**            | Maximum number of rows returned per query. Queries exceeding this limit return a truncated result.                                                                                                                                                                              | `1000000` |

### Connection pool behavior

The Oracle plugin maintains a pool of persistent TCP connections to the database. Understanding how the pool works helps you tune the **Connection Pool Size** for your workload:

- **Lazy creation:** Connections are created on demand as queries arrive, not all at once when the data source is configured.
- **Reuse:** After a query completes, the connection returns to the pool for the next query.
- **Pool exhaustion:** If all connections are in use, new queries wait until a connection becomes available. Under sustained load this can cause query timeouts. Increase the pool size or reduce dashboard concurrency.
- **Idle connections:** Idle connections remain open indefinitely. Some network appliances or Oracle configurations may close idle connections (causing “connection reset by peer”). Configure Oracle’s `SQLNET.EXPIRE_TIME` to send keep-alive probes.
- **One pool per data source:** Each configured Oracle data source instance has its own independent pool. If you have three Oracle data sources, Grafana maintains three separate pools.

**Sizing guidance:**

Expand table

| Dashboard concurrency                     | Recommended pool size |
|-------------------------------------------|-----------------------|
| Low (1-5 concurrent users)                | 10-25                 |
| Medium (5-20 concurrent users)            | 25-75                 |
| High (20+ concurrent users, auto-refresh) | 75-150                |

Monitor the Oracle `V$SESSION` view to observe how many sessions Grafana actually opens:

SQL [Copy code to clipboard] Copy

```sql
SELECT COUNT(*) FROM V$SESSION WHERE USERNAME = 'GRAFANA_READER';
```

## Private data source connect

For Grafana Cloud users connecting to databases in a private network, Private data source connect (PDC) establishes a secured connection between your Grafana Cloud instance and your private Oracle database.

Refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) for setup instructions.

## Verify the connection

Click **Save &amp; test** to verify the connection. On success, Grafana displays a message with your Oracle version banner, for example: **Success: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production**. If the connection fails, refer to [Troubleshoot connection errors](/docs/plugins/grafana-oracle-datasource/latest/troubleshooting/#connection-errors).

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

### TCP connection with basic authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Oracle
    type: grafana-oracle-datasource
    access: proxy
    url: <HOST>:<PORT>
    jsonData:
      database: <DATABASE>
      user: <USERNAME>
      timezone_name: UTC
      connectionPoolSize: 50
      dataProxyTimeout: 120
      prefetchRowsCount: 100
      rowLimit: 1000000
    secureJsonData:
      password: <PASSWORD>
```

### TNSNames connection with basic authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Oracle (TNS)
    type: grafana-oracle-datasource
    access: proxy
    jsonData:
      timezone_name: UTC
      useTNSNamesBasedConnection: true
      tnsNamesEntry: <TNSNAME>
      useKerberosAuthentication: false
      user: <USERNAME>
    secureJsonData:
      password: <PASSWORD>
```

### Terraform

You can provision the Oracle data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source):

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "oracle" {
  type = "grafana-oracle-datasource"
  name = "Oracle"
  url  = "<HOST>:<PORT>"

  json_data_encoded = jsonencode({
    database           = "<DATABASE>"
    user               = "<USERNAME>"
    timezone_name      = "UTC"
    connectionPoolSize = 50
    dataProxyTimeout   = 120
    prefetchRowsCount  = 100
    rowLimit           = 1000000
  })

  secure_json_data_encoded = jsonencode({
    password = "<PASSWORD>"
  })
}
```

## Manage multiple Oracle data sources

Each Oracle database requires its own data source configuration in Grafana. The plugin doesn’t support dynamic connection switching via template variables. You can’t use a single data source to query different databases based on a dashboard variable.

For environments with many Oracle databases, use automated provisioning to manage data sources at scale.

### Recommended approach for large deployments

1. **Use Terraform for provisioning.** Define data sources as Terraform resources with variables for database-specific values:

   hcl [Copy code to clipboard] Copy

   ```hcl
   variable "oracle_databases" {
     type = map(object({
       host     = string
       port     = number
       database = string
       user     = string
       password = string
     }))
   }

   resource "grafana_data_source" "oracle" {
     for_each = var.oracle_databases

     type = "grafana-oracle-datasource"
     name = "Oracle - ${each.key}"
     url  = "${each.value.host}:${each.value.port}"

     json_data_encoded = jsonencode({
       database           = each.value.database
       user               = each.value.user
       timezone_name      = "UTC"
       connectionPoolSize = 50
       dataProxyTimeout   = 120
       rowLimit           = 1000000
     })

     secure_json_data_encoded = jsonencode({
       password = each.value.password
     })
   }
   ```
2. **Use consistent naming conventions.** Adopt a pattern like `Oracle - <environment> - <service>` (for example, `Oracle - prod - inventory`) so users can find the correct data source using the data source selector or the built-in `datasource` template variable.
3. **Use the Grafana HTTP API.** For CI/CD pipelines, you can create data sources programmatically using the [Data source API](/docs/grafana/latest/developers/http_api/data_source/).
4. **Use the data source template variable.** Create a `datasource` type variable filtered to `grafana-oracle-datasource` to let users switch between Oracle databases within a single dashboard.

## Environment variables

You can configure additional Oracle data source settings using environment variables or the Grafana configuration file (`grafana.ini`).

> Note
>
> Environment variables are not supported in Grafana Cloud.

Expand table

| Variable                                         | Description                                | Default          |
|--------------------------------------------------|--------------------------------------------|------------------|
| `GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE` | Maximum query response size in MB.         | `16` (max `512`) |
| `GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE`          | Connection pool size.                      | `50`             |
| `GF_DATAPROXY_TIMEOUT`                           | Query and health check timeout in seconds. | `120`            |

Example:

Bash [Copy code to clipboard] Copy

```bash
export GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=32
export GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=100
```

Alternatively, configure the response size and connection pool size in `grafana.ini` under the `[plugin.grafana-oracle-datasource]` section.

ini [Copy code to clipboard] Copy

```ini
[plugin.grafana-oracle-datasource]
max_response_size = 128
poolsize = 50
```

> Note
>
> On Grafana 12.4.2 and later, `GF_`-prefixed host environment variables (including `GF_PLUGINS_ORACLE_DATASOURCE_*`) are no longer forwarded to plugin backend processes by default. Use the `[plugin.grafana-oracle-datasource]` section shown above to configure the maximum response size and connection pool size. The `GF_PLUGINS_ORACLE_DATASOURCE_*` variables are still read for backward compatibility.
