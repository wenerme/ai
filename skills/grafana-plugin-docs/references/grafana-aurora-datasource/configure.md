---
title: "Configure the Amazon Aurora data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Amazon Aurora data source, including authentication, database settings, private data source connect, and provisioning with YAML or Terraform."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Amazon Aurora data source

This document explains how to configure the Amazon Aurora data source and how to provision it with YAML or Terraform.

## Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **An Aurora cluster with IAM database authentication enabled:** Refer to the [AWS IAM database authentication documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html).
- **A database user configured for IAM authentication:** Refer to the [AWS guide to creating a database account using IAM authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html).
- **AWS credentials with the `rds-db:connect` permission:** Refer to the following [example IAM permissions](#example-iam-permissions).
- **Network access:** Grafana must be able to reach your cluster endpoint. For private clusters in Grafana Cloud, use [private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). For MySQL-compatible engines, Grafana also needs outbound HTTPS access to `s3.amazonaws.com` to download the RDS certificate bundle when it opens a connection.

### Example IAM permissions

The AWS user or role that Grafana uses to query Aurora must have the `rds-db:connect` permission for your cluster and database user. For example:

JSON [Copy code to clipboard] Copy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["rds-db:connect"],
      "Resource": ["arn:aws:rds-db:us-east-2:1234567890:dbuser:cluster-ABCDEFGHIJKL01234/db_user"]
    }
  ]
}
```

For more information, refer to the [AWS IAM database authentication policy documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html).

## Key concepts

If you’re new to AWS or Aurora, these terms are used throughout the configuration:

Expand table

| Term                                  | Description                                                                                                                                              |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **IAM database authentication**       | An AWS feature that lets you connect to your database using an IAM identity and a short-lived token instead of a database password.                      |
| **RDS authentication token**          | A temporary credential that the plugin generates with your AWS credentials and presents to the database as the password. Tokens expire after 15 minutes. |
| **Assume role**                       | An AWS mechanism that lets one identity take on temporary credentials for another role, often used for cross-account access.                             |
| **Reader endpoint**                   | An Aurora cluster endpoint that load-balances connections across all read replicas. Grafana recommends the reader endpoint for query workloads.          |
| **Private data source connect (PDC)** | A Grafana Cloud feature that routes data source traffic through a secure SOCKS proxy so Grafana can reach databases in private networks.                 |

## Add the data source

To add the Amazon Aurora data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Amazon Aurora` in the search bar.
4. Select **Amazon Aurora**.
5. Click **Add new data source**.

## Connection details

The plugin uses the AWS SDK for Go to obtain AWS credentials, then exchanges them for a temporary RDS authentication token that it uses as the database password. Configure how Grafana obtains AWS credentials in the **Connection Details** section.

### Authentication

Expand table

| Setting                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Authentication Provider**  | Which AWS credentials chain Grafana uses. Options include **Access &amp; secret key**, **Credentials file**, and **AWS SDK Default**, which supports service-based IAM roles. Administrators can restrict the available providers with the `allowed_auth_providers` server setting. Refer to [AWS authentication](/docs/grafana/latest/datasources/aws-cloudwatch/aws-authentication/#select-an-authentication-method) for details on each provider. |
| **Access Key ID**            | The AWS access key ID, when using the **Access &amp; secret key** provider. Stored encrypted.                                                                                                                                                                                                                                                                                                                                                        |
| **Secret Access Key**        | The AWS secret access key, when using the **Access &amp; secret key** provider. Stored encrypted.                                                                                                                                                                                                                                                                                                                                                    |
| **Credentials Profile Name** | The profile to use from your AWS credentials file, when using the **Credentials file** provider.                                                                                                                                                                                                                                                                                                                                                     |

> Note
>
> On Grafana Cloud, you must provide AWS access keys. Authenticating with only an IAM role, without access keys, isn’t currently supported for this data source. On self-managed Grafana, the **AWS SDK Default** provider can authenticate without keys through a service-based IAM role, such as an EC2 instance profile or an IAM role for service accounts.

### Assume role

Optionally, configure the **Assume Role** section to have the selected authentication provider assume a role rather than use its credentials directly. The base credentials must have `sts:AssumeRole` permission for the target role.

Expand table

| Setting             | Description                                                                                               |
|---------------------|-----------------------------------------------------------------------------------------------------------|
| **Assume Role ARN** | Optional. The Amazon Resource Name of the role to assume with the credentials from the selected provider. |
| **External ID**     | Optional. An external ID, sometimes required when assuming a role in another account.                     |

### Additional settings

Expand table

| Setting            | Description                                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------------------------|
| **Endpoint**       | Optional. Overrides the default AWS service endpoint from the [AWS SDK](https://github.com/aws/aws-sdk-go-v2). |
| **Default Region** | The AWS region of your Aurora cluster, such as `us-west-2`.                                                    |

## Database settings

Configure the connection to your Aurora cluster in the **Database Settings** section.

Expand table

| Setting           | Description                                                                                                                                                                                                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Engine**        | The Aurora engine your cluster uses: **Aurora (PostgreSQL Compatible)** or **Aurora (MySQL Compatible)**. Defaults to Aurora (PostgreSQL Compatible).                                                                                                                                                      |
| **Database Name** | Optional. The name of the database to connect to.                                                                                                                                                                                                                                                          |
| **Database User** | Required. The database user configured for IAM authentication.                                                                                                                                                                                                                                             |
| **Database Host** | Required. The cluster endpoint to query. Grafana recommends the [reader endpoint](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html#Aurora.Endpoints.Reader), which connects to your read replicas, because nothing in Grafana prevents writes to your database. |
| **Database Port** | Required. The port to connect to. Typically `5432` for PostgreSQL-compatible engines and `3306` for MySQL-compatible engines.                                                                                                                                                                              |

### Separate host and port for authentication

To connect to your cluster, Grafana makes two calls:

1. It generates an RDS authentication token for an endpoint.
2. It opens an SQL connection to your database host using that token.

Usually both steps use the same endpoint. However, if your cluster is behind a load balancer, the RDS token must be generated for the actual cluster endpoint while SQL connections go through the load balancer. In that case, configure the **Advanced: Separate Host and Port for Auth** section:

Expand table

| Setting                        | Description                                                                                                                                                                                           |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Advanced: DB Host For Auth** | Optional. The host to use when [generating the RDS authentication token](https://docs.aws.amazon.com/cli/latest/reference/rds/generate-db-auth-token.html). If empty, Grafana uses **Database Host**. |
| **Advanced: DB Port For Auth** | Optional. The port to use when generating the RDS authentication token. If empty, Grafana uses **Database Port**.                                                                                     |

For example, set **Database Host** and **Database Port** to your load balancer endpoint, and set **Advanced: DB Host For Auth** and **Advanced: DB Port For Auth** to the cluster endpoint behind the load balancer.

## Private data source connect

Private data source connect (PDC) lets Grafana Cloud reach Aurora clusters that aren’t exposed to the public internet. The plugin supports PDC for both PostgreSQL-compatible and MySQL-compatible engines and requires Grafana 10.0 or later.

> Note
>
> PDC is available only on Grafana Cloud. If you run self-managed Grafana, this section doesn’t apply. To reach private networks from a self-managed instance, use the [secure SOCKS proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/) instead.

To use PDC:

1. Configure a PDC agent in your network. Refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).
2. In the data source settings, under **Private data source connect**, select your network in the **Private data source connect network** drop-down. The drop-down shows how many agents are connected for each network.
3. To set up or manage networks, click **Manage private data source connect networks**.

## Verify the connection

Click **Save &amp; test** to verify the connection. When the connection test passes, Grafana displays the message **Data source is working**.

> Note
>
> RDS authentication tokens expire after 15 minutes. If a token expires between queries, the plugin automatically generates a new token and retries the query once.

## Query caching

To reduce the load on your Aurora cluster and speed up repeated queries, you can enable query caching for the data source. Query caching is available in Grafana Cloud and Grafana Enterprise, and is turned off by default for each data source.

To enable it, open the data source settings, go to the **Cache** tab, and click **Enable**. You can optionally set custom TTLs for cached queries. For details, refer to [Query and resource caching](/docs/grafana/latest/administration/data-source-management/#query-and-resource-caching).

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

The following provisioning properties are available:

Expand table

| Property                          | Description                                                                                               |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------|
| `jsonData.authType`               | The authentication provider: `keys`, `credentials`, or `default`.                                         |
| `jsonData.engine`                 | The Aurora engine: `aurora-postgres` or `aurora-mysql`.                                                   |
| `jsonData.defaultRegion`          | The AWS region of your cluster.                                                                           |
| `jsonData.dbName`                 | Optional. The database name.                                                                              |
| `jsonData.dbUser`                 | The database user configured for IAM authentication.                                                      |
| `jsonData.dbHost`                 | The cluster endpoint to query.                                                                            |
| `jsonData.dbPort`                 | The port to connect to.                                                                                   |
| `jsonData.dbHostAuth`             | Optional. A separate host for generating the RDS authentication token.                                    |
| `jsonData.dbPortAuth`             | Optional. A separate port for generating the RDS authentication token.                                    |
| `jsonData.assumeRoleArn`          | Optional. The Amazon Resource Name of a role to assume.                                                   |
| `jsonData.externalId`             | Optional. An external ID for assuming a role in another account.                                          |
| `jsonData.profile`                | Optional. The credentials profile name, when `authType` is `credentials`.                                 |
| `jsonData.endpoint`               | Optional. Overrides the default AWS service endpoint.                                                     |
| `jsonData.enableSecureSocksProxy` | Optional. Set to `true` to route traffic through private data source connect or the secure SOCKS proxy.   |
| `secureJsonData.accessKey`        | The AWS access key ID, when `authType` is `keys`. Stored encrypted.                                       |
| `secureJsonData.secretKey`        | The AWS secret access key, when `authType` is `keys`. Stored encrypted.                                   |
| `secureJsonData.sessionToken`     | Optional. An AWS session token, when using temporary credentials with `authType: keys`. Stored encrypted. |

### YAML provisioning examples

The following example provisions the data source with access and secret keys:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Amazon Aurora
    type: grafana-aurora-datasource
    editable: true
    jsonData:
      authType: keys
      engine: aurora-postgres
      defaultRegion: us-east-1
      dbName: testDatabase
      dbUser: db_user
      dbHost: example.cluster-ro-example.us-east-1.rds.amazonaws.com
      dbPort: 5432
    secureJsonData:
      accessKey: <AWS_ACCESS_KEY_ID>
      secretKey: <AWS_SECRET_ACCESS_KEY>
    version: 1
```

The following example uses the AWS SDK default credentials chain, which supports service-based IAM roles:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Amazon Aurora
    type: grafana-aurora-datasource
    editable: true
    jsonData:
      authType: default
      engine: aurora-mysql
      defaultRegion: us-east-1
      dbName: testDatabase
      dbUser: db_user
      dbHost: aurora-mysql.cluster-123.us-east-1.rds.amazonaws.com
      dbPort: 3306
    version: 1
```

The following example configures a cluster behind a load balancer, with a separate host and port for generating the authentication token:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Amazon Aurora behind a load balancer
    type: grafana-aurora-datasource
    editable: true
    jsonData:
      authType: keys
      engine: aurora-mysql
      defaultRegion: us-east-1
      dbName: testDatabase
      dbUser: db_user
      dbHost: protected-by-a-load-balancer.example.com
      dbPort: 3307
      dbHostAuth: aurora-mysql.cluster-123.us-east-1.rds.amazonaws.com
      dbPortAuth: 3306
    secureJsonData:
      accessKey: <AWS_ACCESS_KEY_ID>
      secretKey: <AWS_SECRET_ACCESS_KEY>
    version: 1
```

### Provision with Terraform

You can also provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the `grafana_data_source` resource. The `json_data_encoded` and `secure_json_data_encoded` arguments accept the same keys as the YAML `jsonData` and `secureJsonData` properties.

hcl [Copy code to clipboard] Copy

```hcl
terraform {
  required_providers {
    grafana = {
      source = "grafana/grafana"
    }
  }
}

resource "grafana_data_source" "aurora" {
  type = "grafana-aurora-datasource"
  name = "Amazon Aurora"

  json_data_encoded = jsonencode({
    authType      = "keys"
    engine        = "aurora-postgres"
    defaultRegion = "us-east-1"
    dbName        = "testDatabase"
    dbUser        = "db_user"
    dbHost        = "example.cluster-ro-example.us-east-1.rds.amazonaws.com"
    dbPort        = 5432
  })

  secure_json_data_encoded = jsonencode({
    accessKey = var.aws_access_key_id
    secretKey = var.aws_secret_access_key
  })
}
```

Store secrets such as AWS keys in Terraform variables or a secrets manager instead of hard-coding them in your configuration.

## Next steps

- [Amazon Aurora query editor](/docs/plugins/grafana-aurora-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-aurora-datasource/latest/template-variables/)
- [Troubleshooting](/docs/plugins/grafana-aurora-datasource/latest/troubleshooting/)
