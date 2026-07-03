---
title: "Configure the MongoDB data source | Grafana Enterprise Plugins documentation"
description: "This document outlines configuration instructions and options for the MongoDB data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the MongoDB data source

This document provides instructions for configuring the MongoDB data source and explains the available configuration options. For general information on adding data sources in Grafana refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

## Before you begin

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated self-managed Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- You must have the Organization administrator role to add a data source. Administrators can also configure a data source via [YAML with the Grafana provisioning system](/docs/plugins/grafana-mongodb-datasource/latest/#provision-the-mongodb-data-source).
- You must install the MongoDB plugin prior to adding the MongoDB data source. Refer to [Install and upgrade the MongoDB data source plugin](/docs/plugins/grafana-mongodb-datasource/latest/install/) for instructions.

- A MongoDB 5.0+ instance with credentials (username and password) or Kerberos principal information for authentication.

- Familiarize yourself with your MongoDB security configuration and gather any necessary security certificates and client keys.
- Verify that your MongoDB instance is accessible from the Grafana server or Grafana Cloud stack on port 27017 (or your configured MongoDB port).

## Configure the data source using the UI

To add the MongoDB data source, complete the following steps:

1. Install the MongoDB plugin.
2. Click **Connections** in the left-side menu.
3. Under **Connections**, click **Add new connection**.
4. Enter `MongoDB` in the search bar.
5. Select **MongoDB** under the **Data Source** section.
6. Click **Add new data source** in the upper right.

You are taken to the **Settings** tab where you set up your MongoDB configuration.

## Configuration options

The following is a list of configuration options for MongoDB.

- **Name** - The data source name. Sets the name you use to refer to the data source in panels and queries. Examples: `MongoDB-1`, `MongoDB_Marketing`.
- **Default** - Toggle to set as the default data source.

### Connection

You connect to MongoDB using a connection string. For more information refer to [Connection Strings](https://www.mongodb.com/docs/manual/reference/connection-string/) in MongoDB documentation.

- **Connection string** - Insert your MongoDB connection string, which contains the parameters required to connect to MongoDB. Example: `mongodb://myDatabaseUserName:StrongP4ssw0rd@localhost/sales_db`.

  Ensure username and password are percent-encoded in the connection string, as per MongoDB documentation. For example, if your password is `p@ssw0rd`, the `@` sign should be replaced with `%40` in the connection string, for example, `mongodb://user:p%40ssw0rd@localhost` (note that the `@` that separates password and host should *not* be encoded).

### Authentication

There are three authentication methods you can choose in the Authentication section. Select one of the following authentication methods from the drop-down:

- **No authentication** - Allows access to the data source without any authentication.
- **Credentials** - Authenticate with the default credentials assigned to MongoDB at account creation.

  - **User** - The username assigned to the MongoDB account.
  - **Password** - The password assigned to the MongoDB account.

- **Kerberos** - Kerberos requires a custom build with [manual installation](/docs/grafana/latest/administration/plugin-management/#install-plugin-on-local-grafana). Access the custom build [here](https://storage.googleapis.com/integration-artifacts/grafana-mongodb-datasource-kerberos/release/latest/linux/grafana-mongodb-datasource-latest.linux_amd64.zip).

  > Note
  >
  > Kerberos authentication is not available on Grafana Cloud. It requires a custom build with manual installation on a self-managed Grafana instance.

  - **User** - The client principal’s username.
  - **Password** - The client principal password used to authenticate. Optional if a keytab or ccache file is present.
  - **KeyTab path** - Absolute path to the `KeyTab` file. If provided, the password is ignored. Enabled when the connection string includes the query string parameter `authMechanism=GSSAPI`.
  - **Global ccache path** - Absolute path to the global cache file. If provided, the password is ignored. Enabled when the connection string includes the query string parameter `authMechanism=GSSAPI`.
  - **Ccache lookup file** - Absolute path to the JSON file that provides the Kerberos cache based on the username principal and connection string. If provided, the password is ignored. Enabled when the connection string includes the query string parameter `authMechanism=GSSAPI`.

To run this on Linux, you must install the `libkrb5` library:

sh [Copy code to clipboard] Copy

```sh
apt-get install -y libkrb5-dev
```

### TLS settings

Use TLS (Transport Layer Security) for an additional layer of security when working with MongoDB.

- **Add self-signed certificate** - Check the box to authenticate with a CA certificate. Follow the instructions of the CA (Certificate Authority) to download the certificate file. Required for verifying self-signed TLS certificates.

  - **CA certificate** - Add your self-signed certificate.
- **TLS client authentication** - Check the box to authenticate using TLS client authentication, where the server authenticates the client.

  - **ServerName** - The server name, used to verify the hostname on the returned certificate. Example: `domain.example.com`.
  - **Client certificate** - Your client certificate, which can be generated from a Certificate Authority (CA) or be self-signed.
  - **Client key** - Your client key, which can also be generated from a Certificate Authority (CA) or be self-signed. The client key encrypts the data between client and server.
- **Skip TLS certificate validation** - Check the box to bypass TLS certificate validation. Skipping TLS certificate validation is not recommended unless absolutely necessary or for testing purposes.

> Note
>
> The maximum size for each certificate is 64KB. Longer certificates are trimmed and don’t work.

### Additional settings

Additional settings for the MongoDB data source are optional configurations that provide greater control over its behavior.

**Query syntax validation:**

- **Enable syntax validation** - Toggle on to enable real-time query syntax validation. This feature checks the syntax of a query as you write it and provides immediate feedback on errors or inconsistencies, including missing brackets `{}`, improper structure for operators, and unrecognized field names. It ensures that queries are correctly structured before execution, reducing errors and improving efficiency. Refer to [Document Data Format: BSON](https://www.mongodb.com/docs/drivers/java/sync/current/fundamentals/data-formats/document-data-format-bson/#document-data-format--bson) for more information on the MongoDB BSON document data format.

**TLS CA key file password:**

- **Password** - The password for encrypted TLS certificate key files. Required if your private key is encrypted (PKCS#5 v2.0 or PKCS#8).

**Backend response rows limit:**

- **Rows to return** - Sets the maximum number of rows returned in a query. The default is `100000`. Note that setting this number too high may lead to performance issues with larger queries.

**Private data source connect:**

- **Private data source connect** - *Only for Grafana Cloud users.* Private data source connect, or PDC, allows you to establish a private, secured connection between a Grafana Cloud instance, or stack, and data sources secured within a private network. Click the drop-down to locate the URL for PDC. For more information regarding Grafana PDC refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) and [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/#configure-grafana-private-data-source-connect-pdc) for steps on setting up a PDC connection.

Click **Manage private data source connect** to be taken to your PDC connection page, where you find your PDC configuration details.

Once you have configured your MongoDB data source options, click **Save &amp; test** at the bottom to test out your data source connection.

You should see a confirmation dialog box that says **Plugin health check successful**.

You can also remove a connection by clicking **Delete**.

## Provision the MongoDB data source

You can define and configure the MongoDB data source in YAML files as part of the Grafana provisioning system. For more information about provisioning a data source, and for available configuration options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: MongoDB
    type: grafana-mongodb-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      connection: <CONNECTION_STRING>
      user: <USERNAME>
    secureJsonData:
      password: <PASSWORD>
```

## Provision with Terraform

You can provision the MongoDB data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). The following example creates a MongoDB data source with credentials authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "mongodb" {
  type = "grafana-mongodb-datasource"
  name = "MongoDB"

  json_data_encoded = jsonencode({
    connection = "mongodb+srv://cluster.example.net/mydb?retryWrites=true&w=majority"
  })

  secure_json_data_encoded = jsonencode({
    basicAuthPassword = "<PASSWORD>"
  })

  basic_auth_enabled  = true
  basic_auth_username = "<USERNAME>"
}
```

For a connection with TLS client authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "mongodb_tls" {
  type = "grafana-mongodb-datasource"
  name = "MongoDB TLS"

  json_data_encoded = jsonencode({
    connection       = "mongodb://host.example.com:27017/?tls=true"
    tlsAuth          = true
    tlsAuthWithCACert = true
    serverName       = "host.example.com"
  })

  secure_json_data_encoded = jsonencode({
    basicAuthPassword = "<PASSWORD>"
    tlsCACert         = "<CA_CERTIFICATE_PEM>"
    tlsClientCert     = "<CLIENT_CERTIFICATE_PEM>"
    tlsClientKey      = "<CLIENT_KEY_PEM>"
  })

  basic_auth_enabled  = true
  basic_auth_username = "<USERNAME>"
}
```

For more information, refer to the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).

## Troubleshoot

For help with connection issues, authentication errors, query problems, and other common issues, refer to [Troubleshoot the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/troubleshooting/).
