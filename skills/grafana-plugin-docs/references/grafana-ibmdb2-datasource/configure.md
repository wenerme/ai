---
title: "Configure the IBM Db2 data source | Grafana Enterprise Plugins documentation"
description: "Configure the IBM Db2 data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the IBM Db2 data source

This document explains how to configure the IBM Db2 data source plugin.

For general information on adding data sources, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

## Before you begin

Before you configure the data source, ensure you have:

- **IBM Db2 plugin:** Install the plugin from the [Grafana plugin catalog](/grafana/plugins/grafana-ibmdb2-datasource/).
- **Grafana permissions:** Organization administrator role or equivalent.
- **IBM Db2 database:** A running database configured for external access.
- **Network access:** Connectivity from Grafana to the Db2 server host and port.

## Add the data source

To add the data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Search for `IBM Db2`.
4. Select **IBM Db2**.
5. Click **Add new data source**.

## Configure connection settings

Enter the connection details for your IBM Db2 database. All fields in this section are required.

Expand table

| Setting           | Description                                                                                                                                                 |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Host URL**      | The hostname and port of your Db2 server in `host:port` format. Example: `db2.example.com:50000`. Always include the port. The default Db2 port is `50000`. |
| **Database name** | The name of the database to connect to. Example: `SAMPLE`.                                                                                                  |

## Configure authentication

Enter the credentials and security settings for your database connection.

Expand table

| Setting            | Description                                                                                                                                                                                                                                                                |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Username**       | Required. The database user for authentication. Example: `db2inst1`.                                                                                                                                                                                                       |
| **Password**       | Required. The password for the database user. This value is stored securely.                                                                                                                                                                                               |
| **SSL Connection** | Enable or disable SSL/TLS encryption. Enabled by default. Disable it when the server uses AT-TLS (Application Transparent TLS). In AT-TLS environments the network layer handles TLS transparently, and enabling this option causes a protocol conflict (ERRORCODE=-4499). |

## Additional settings

Expand **Additional settings** (collapsible section) to configure optional options for more control over your data source. The section is collapsed by default.

### Query Timeout

Expand table

| Setting           | Description                                                                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query Timeout** | Controls how long queries can run before timing out (1 to 600 seconds, default: 30 seconds). Increase for slow databases or large result sets. |

### Connection pool

The plugin maintains a separate connection pool for each data source to avoid the overhead of creating a new TCP connection and authenticating with Db2 for every query.

Expand table

| Setting                     | Description                                                                                                                                                                                                                                                                                                                                      |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Connection pool size**    | Maximum number of concurrent connections kept open for this data source (1 to 100, default: 50). Increase for high query concurrency; decrease to limit load on the database server. On self-managed Grafana, the default can be overridden globally for all data sources with the `GF_PLUGINS_IBMDB2_DATASOURCE_POOLSIZE` environment variable. |
| **Max connection lifetime** | Maximum time in seconds a pooled connection may be reused before it is closed and replaced (default: 300 seconds / 5 minutes). Set to `0` for no limit. Lowering this value is useful when the database server enforces short connection lifetimes.                                                                                              |

Pools are keyed by data source UID and configuration version. When you save updated credentials or settings, Grafana increments the configuration version, and the plugin automatically creates a fresh pool with the new credentials. No restart is required.

### Custom parameters

Use this field to pass additional properties that are not exposed as dedicated UI settings but that are still required by your IBM Db2 database instance. Enter one property per line, or separate properties with semicolons, using `key=value` format.

> Note
>
> This field is gated by the OpenFeature flag `grafana-ibmdb2-datasource.custom-connection-parameters`. The text area is hidden until the flag is enabled on your Grafana instance. When the flag is off, the backend ignores `customConnectionParameters` in `jsonData`, so setting the value through the Grafana HTTP API does not bypass the gate. Contact Grafana Support if you need the flag enabled on a Grafana Cloud stack.

Expand table

| Setting               | Description                                                                                                                                                                                                                    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Custom parameters** | Additional `key=value` connection properties forwarded directly to the driver. Example: `securityMechanism=7` for IBM Db2 z/OS instances that require DES-encrypted password authentication (`Authentication=SERVER_ENCRYPT`). |

Example:

[Copy code to clipboard] Copy

```none
securityMechanism=7
loginTimeout=180
```

or

[Copy code to clipboard] Copy

```none
securityMechanism=7;loginTimeout=180
```

### Private data source connect (PDC)

> Note
>
> Private data source connect (PDC) is only available for Grafana Cloud users.

Use PDC to connect to and query your IBM Db2 database in a secure network without opening that network to inbound traffic from Grafana Cloud.

Grafana Cloud has a **Private data source connect** section at the bottom of the data source configuration page. Use the drop-down menu to select your PDC network.

In the same drop-down, you can also click on **Manage private data source connect** to be taken to your PDC connection page, where you’ll find your PDC configuration details and be able to create new connections.

For more information on how PDC works, refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

> Note
>
> A Grafana Cloud stack can have at most **25 IBM Db2 PDC datasources with different database targets** (different host or port) active simultaneously. If you need more than 25 distinct PDC-connected Db2 databases in a single stack, contact Grafana support.

## Verify the connection

Click **Save &amp; test** to verify the connection to your IBM Db2 database.

A successful connection displays the message **Data source is working**.

If the test fails, the message includes the reason, such as `Database connection error.` or `Database connection timed out.`, followed by the driver detail. For help interpreting and resolving these messages, refer to [Troubleshoot IBM Db2 data source issues](/docs/plugins/grafana-ibmdb2-datasource/latest/troubleshooting/).

## Provision the data source

You can define the data source using YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

Example provisioning configuration:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: IBM Db2
    type: grafana-ibmdb2-datasource
    access: proxy
    jsonData:
      settings:
        - name: type
          value: db2
        - name: host
          value: <DB2_HOST>
        - name: port
          value: '<DB2_PORT>'
        - name: database
          value: <DATABASE_NAME>
        - name: username
          value: <USERNAME>
        - name: sslConnection
          value: 'true'
        - name: password
          secure: true
      queryTimeoutSeconds: 30      # Optional: query timeout in seconds (default: 30, range: 1-600)
      connectionPoolSize: 50       # Optional: max connections in pool (default: 50, range: 1-100)
      connMaxLifetime: 300         # Optional: max connection lifetime in seconds (default: 300, 0 = no limit)
      # customConnectionParameters: "securityMechanism=7"  # Optional: extra connection properties (for example, for z/OS)
    secureJsonData:
      password: <PASSWORD>
```

## Configure the data source with Terraform

You can use the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) to manage the IBM Db2 data source as code.

Example Terraform configuration:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "ibm_db2" {
  type = "grafana-ibmdb2-datasource"
  name = "IBM Db2"

  json_data_encoded = jsonencode({
    settings = [
      { name = "type", value = "db2" },
      { name = "host", value = "<DB2_HOST>" },
      { name = "port", value = "<DB2_PORT>" },
      { name = "database", value = "<DATABASE_NAME>" },
      { name = "username", value = "<USERNAME>" },
      { name = "sslConnection", value = "true" },
      { name = "password", secure = true }
    ]
    # Optional: query timeout in seconds (default: 30, range: 1-600)
    queryTimeoutSeconds = 30
    # Optional: connection pool settings
    connectionPoolSize = 50  # max connections per datasource (default: 50, range: 1-100)
    connMaxLifetime    = 300 # max connection lifetime in seconds (default: 300, 0 = no limit)
    # Optional: extra connection properties (for example, "securityMechanism=7" for z/OS)
    # customConnectionParameters = "securityMechanism=7"
  })

  secure_json_data_encoded = jsonencode({
    password = var.db2_password
  })
}
```
