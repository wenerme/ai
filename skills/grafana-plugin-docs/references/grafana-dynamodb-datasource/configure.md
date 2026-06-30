---
title: "Configure the DynamoDB data source | Grafana Enterprise Plugins documentation"
description: "Configure the DynamoDB data source for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the DynamoDB data source

This document explains how to configure the DynamoDB data source in Grafana. DynamoDB uses the [AWS SDK for Go](https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/) to connect to your DynamoDB instance using AWS IAM credentials.

> Note
>
> The DynamoDB data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **A [Grafana Cloud Pro or Advanced](/pricing/) plan** or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- **AWS credentials:** An IAM user with an access key and secret key, or a shared credentials file configured on the Grafana server.
- **DynamoDB permissions:** The IAM identity must have `dynamodb:PartiQLSelect` permission on the tables you want to query. For write operations, additional PartiQL permissions may be needed.

## Key concepts

If you’re new to AWS, these terms are used throughout the configuration:

Expand table

| Term                        | Description                                                                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| **Access key**              | A credential composed of an access key ID and secret access key, used to authenticate programmatic requests to AWS.                        |
| **Secret key**              | The second part of an access key pair, used alongside the access key ID to sign requests.                                                  |
| **Session token**           | A temporary credential used with temporary security credentials from AWS STS.                                                              |
| **Shared credentials file** | A local file (`~/.aws/credentials`) that stores AWS credential profiles, allowing applications to authenticate without hardcoding secrets. |
| **Default region**          | The AWS region where your DynamoDB tables are located (for example, `us-east-1`).                                                          |

## Add the data source

To add the data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `DynamoDB` in the search bar.
4. Select **DynamoDB**.
5. Click **Add new data source**.

## Configure settings

The following table describes the available connection settings:

Expand table

| Setting            | Description                                                                                                 |
|--------------------|-------------------------------------------------------------------------------------------------------------|
| **Name**           | The display name for this data source in panels and queries.                                                |
| **Default**        | Toggle to make this the default data source for new panels.                                                 |
| **Default Region** | The AWS region where your DynamoDB tables are located (for example, `us-west-2`). Required.                 |
| **Endpoint**       | Optional. Override the default AWS SDK endpoint. Use this for local DynamoDB instances or custom endpoints. |

## Authentication

The DynamoDB data source supports two authentication methods. Choose the method that fits your deployment.

> Note
>
> The DynamoDB data source doesn’t support Assume Role, Grafana Assume Role, AWS SDK Default, or EC2 IAM Role authentication. If you select an unsupported type, refer to [Troubleshooting unsupported auth type](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#unsupported-auth-type).

### Access keys

Use static IAM access keys to authenticate directly with AWS. This is the default authentication method.

Expand table

| Setting               | Description                                                                     |
|-----------------------|---------------------------------------------------------------------------------|
| **Access Key ID**     | Your AWS access key ID. Required.                                               |
| **Secret Access Key** | Your AWS secret access key. Required.                                           |
| **Session Token**     | Optional. A temporary session token for use with AWS STS temporary credentials. |

To configure access key authentication:

1. Select **Access &amp; secret key** from the **Authentication Provider** drop-down.
2. Enter your **Access Key ID**.
3. Enter your **Secret Access Key**.
4. Optionally, enter a **Session Token** if using temporary credentials.
5. Select your **Default Region**.

### AWS credentials file

Use a shared credentials file stored on the Grafana server to authenticate. This method reads credentials from `~/.aws/credentials`.

Expand table

| Setting                      | Description                                                                                       |
|------------------------------|---------------------------------------------------------------------------------------------------|
| **Credentials Profile Name** | The profile name in your `~/.aws/credentials` file. If left empty, the `default` profile is used. |

To configure credentials file authentication:

1. Select **Credentials file** from the **Authentication Provider** drop-down.
2. Enter the **Credentials Profile Name** if you use a non-default profile.
3. Select your **Default Region**.

## Verify the connection

Click **Save &amp; test** to verify the connection. A **Data source is working** message confirms that Grafana can connect to your DynamoDB instance.

If the test fails, refer to [Troubleshoot DynamoDB data source issues](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/) for common errors and solutions.

## Provision the data source

You can define the data source in YAML files as part of the Grafana provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

### Advanced settings

The following optional settings are available through provisioning only and don’t appear in the UI:

Expand table

| Setting   | Description                                  | Default |
|-----------|----------------------------------------------|---------|
| `timeout` | Query timeout in seconds.                    | `60`    |
| `retries` | Number of retry attempts for failed queries. | `5`     |
| `pause`   | Pause in seconds between retry attempts.     | `5`     |

Include these in `jsonData` to override the defaults.

### Access key provisioning

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: keys
      defaultRegion: us-west-2
      isV2: true
    secureJsonData:
      accessKey: <ACCESS_KEY_ID>
      secretKey: <SECRET_ACCESS_KEY>
```

To include a session token for temporary credentials, add `sessionToken` to `secureJsonData`:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: keys
      defaultRegion: us-west-2
      isV2: true
    secureJsonData:
      accessKey: <ACCESS_KEY_ID>
      secretKey: <SECRET_ACCESS_KEY>
      sessionToken: <SESSION_TOKEN>
```

### Credentials file provisioning

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: credentials
      defaultRegion: us-west-2
      profile: <PROFILE_NAME>
      isV2: true
```

## Provision with Terraform

You can provision the DynamoDB data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source).

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "dynamodb" {
  type = "grafana-dynamodb-datasource"
  name = "DynamoDB"

  json_data_encoded = jsonencode({
    authType      = "keys"
    defaultRegion = "us-west-2"
    isV2          = true
  })

  secure_json_data_encoded = jsonencode({
    accessKey = var.aws_access_key_id
    secretKey = var.aws_secret_access_key
  })
}
```

For credentials file authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "dynamodb" {
  type = "grafana-dynamodb-datasource"
  name = "DynamoDB"

  json_data_encoded = jsonencode({
    authType      = "credentials"
    defaultRegion = "us-west-2"
    profile       = "my-profile"
    isV2          = true
  })
}
```
