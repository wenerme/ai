---
title: "Configure the CockroachDB data source | Grafana Enterprise Plugins documentation"
description: "Configure the CockroachDB data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the CockroachDB data source

This document explains how to configure the CockroachDB data source in Grafana.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **CockroachDB instance:** A running CockroachDB cluster. To find your host URL and default database, log in to the [CockroachDB Cloud Console](https://cockroachlabs.cloud/), select your cluster, and navigate to the **Connection Info** section.
- **Credentials:** Depending on your authentication method, you need one of the following:

  - **SQL authentication:** Username and password.
  - **Kerberos authentication:** Username and credential cache file path. Requires an Enterprise CockroachDB license.
  - **TLS/SSL authentication:** Username, password, and the file path or content for a root certificate, client certificate, and client key.

## Add the data source

To add the CockroachDB data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `CockroachDB` in the search bar.
4. Select **CockroachDB**.
5. Click **Add new data source**.

## Configure settings

The following table lists the main connection settings:

Expand table

| Setting      | Description                                                                      |
|--------------|----------------------------------------------------------------------------------|
| **Name**     | The display name for this data source in panels and queries.                     |
| **Default**  | Toggle to make this the default data source for new panels.                      |
| **Host URL** | The host and port of your CockroachDB instance (for example, `localhost:26257`). |
| **Database** | The default database to connect to (for example, `defaultdb`).                   |

## Authentication

The CockroachDB data source supports three authentication methods.

### SQL authentication

SQL authentication uses a username and password to connect to CockroachDB.

Expand table

| Setting      | Description                          |
|--------------|--------------------------------------|
| **User**     | The CockroachDB username.            |
| **Password** | The password for the specified user. |

### Kerberos authentication

Kerberos authentication uses a Kerberos credential cache to connect. This method requires an Enterprise CockroachDB license.

Expand table

| Setting                   | Description                                                                                                                                 |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **User**                  | The CockroachDB username.                                                                                                                   |
| **Credential cache path** | The file path to the Kerberos credential cache (for example, `/tmp/krb5cc_1000`). This file must be accessible by the user running Grafana. |
| **krb5 config file path** | The path to the Kerberos configuration file. Default: `/etc/krb5.conf`.                                                                     |
| **Kerberos server name**  | The Kerberos service name. Default: `postgres`.                                                                                             |

### TLS/SSL authentication

TLS/SSL authentication uses client certificates to connect securely.

Expand table

| Setting            | Description                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
| **User**           | The CockroachDB username.                                                                                           |
| **Password**       | The password for the specified user.                                                                                |
| **TLS/SSL method** | Choose `file-path` to provide paths to certificate files, or `file-content` to paste certificate contents directly. |
| **TLS/SSL mode**   | The SSL mode to use: `disable`, `require`, `verify-ca`, or `verify-full`.                                           |
| **Root cert**      | The CA certificate used to verify the server. Provide as a file path or content depending on the method.            |
| **Client cert**    | The client certificate for authentication. Provide as a file path or content depending on the method.               |
| **Client key**     | The client private key for authentication. Provide as a file path or content depending on the method.               |

## Additional settings

These settings control connection pooling and query behavior.

Expand table

| Setting                     | Default | Description                                                                                  |
|-----------------------------|---------|----------------------------------------------------------------------------------------------|
| **Query timeout**           | `30`    | Maximum time in seconds a query can run before timing out. Range: 5-600 seconds.             |
| **Max open connections**    | `5`     | Maximum number of open connections to the database.                                          |
| **Auto max idle**           | Off     | When enabled, automatically sets **Max idle connections** to match **Max open connections**. |
| **Max idle connections**    | `2`     | Maximum number of idle connections in the pool.                                              |
| **Max connection lifetime** | `300`   | Maximum time in seconds a connection can be reused.                                          |

## Verify the connection

After configuring the data source, click **Save &amp; test**. Grafana attempts to connect to your CockroachDB instance, run a ping, and execute a test query.

If the connection is successful, you’ll see the message: **Data source is working**.

If the test fails, refer to [Troubleshooting](/docs/plugins/grafana-cockroachdb-datasource/latest/troubleshooting/) for common errors and solutions.

## Provision the data source

You can define the data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

The following examples show provisioning configurations for each authentication method.

### SQL authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: CockroachDB
    type: grafana-cockroachdb-datasource
    jsonData:
      url: <YOUR_HOST_URL>
      database: <YOUR_DATABASE>
      user: <YOUR_USERNAME>
      authType: "SQL Authentication"
      queryTimeout: 30
    secureJsonData:
      password: <YOUR_PASSWORD>
```

### Kerberos authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: CockroachDB
    type: grafana-cockroachdb-datasource
    jsonData:
      url: <YOUR_HOST_URL>
      database: <YOUR_DATABASE>
      user: <YOUR_USERNAME>
      authType: "Kerberos Authentication"
      credentialCache: <YOUR_CREDENTIAL_CACHE_PATH>
      configFilePath: /etc/krb5.conf
      kerberosServerName: postgres
      queryTimeout: 30
```

### TLS/SSL authentication

> Note
>
> TLS values can be either a file path or the file content of the certificate and key.

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: CockroachDB
    type: grafana-cockroachdb-datasource
    jsonData:
      url: <YOUR_HOST_URL>
      database: <YOUR_DATABASE>
      user: <YOUR_USERNAME>
      authType: "TLS/SSL Authentication"
      queryTimeout: 30
    secureJsonData:
      tlsCACert: <YOUR_TLS_CA_CERT>
      tlsClientCert: <YOUR_TLS_CLIENT_CERT>
      tlsClientKey: <YOUR_TLS_CLIENT_KEY>
      password: <YOUR_PASSWORD>
```

## Provision the data source with Terraform

You can provision the CockroachDB data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source). Use `json_data_encoded` for non-sensitive settings and `secure_json_data_encoded` for credentials.

### SQL authentication

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "cockroachdb" {
  type = "grafana-cockroachdb-datasource"
  name = "CockroachDB"

  json_data_encoded = jsonencode({
    url          = "<YOUR_HOST_URL>"
    database     = "<YOUR_DATABASE>"
    user         = "<YOUR_USERNAME>"
    queryTimeout = 30
  })

  secure_json_data_encoded = jsonencode({
    password = "<YOUR_PASSWORD>"
  })
}
```

### Kerberos authentication

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "cockroachdb" {
  type = "grafana-cockroachdb-datasource"
  name = "CockroachDB"

  json_data_encoded = jsonencode({
    url                = "<YOUR_HOST_URL>"
    database           = "<YOUR_DATABASE>"
    user               = "<YOUR_USERNAME>"
    authType           = "Kerberos Authentication"
    credentialCache    = "<YOUR_CREDENTIAL_CACHE_PATH>"
    configFilePath     = "/etc/krb5.conf"
    kerberosServerName = "postgres"
    queryTimeout       = 30
  })
}
```

### TLS/SSL authentication

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "cockroachdb" {
  type = "grafana-cockroachdb-datasource"
  name = "CockroachDB"

  json_data_encoded = jsonencode({
    url          = "<YOUR_HOST_URL>"
    database     = "<YOUR_DATABASE>"
    user         = "<YOUR_USERNAME>"
    authType     = "TLS/SSL Authentication"
    queryTimeout = 30
  })

  secure_json_data_encoded = jsonencode({
    password      = "<YOUR_PASSWORD>"
    tlsCACert     = "<YOUR_TLS_CA_CERT>"
    tlsClientCert = "<YOUR_TLS_CLIENT_CERT>"
    tlsClientKey  = "<YOUR_TLS_CLIENT_KEY>"
  })
}
```
