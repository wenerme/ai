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
- **AWS credentials:** An IAM user with an access key and secret key, a shared credentials file configured on the Grafana server, an EC2 instance role, or an IAM role to assume.
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
| **Assume role**             | A temporary set of IAM credentials obtained by assuming an IAM role, commonly used for cross-account access.                               |
| **External ID**             | An optional value used with Assume Role to protect against the confused deputy problem when a third party assumes a role on your behalf.   |

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

The DynamoDB data source supports the standard AWS authentication methods provided by the shared AWS connection component. Choose the method that fits your deployment.

> Note
>
> Some authentication methods, and the ability to assume a role, may be restricted by your Grafana administrator through the `allowed_auth_providers` and `assume_role_enabled` settings in `grafana.ini`. If a method you expect to see is missing or returns an error, ask your Grafana administrator to check these settings. Refer to [Troubleshooting authentication method not allowed](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#auth-method-not-allowed).

For more information about authentication options and configuration, refer to [AWS authentication](/docs/grafana/latest/datasources/aws-cloudwatch/aws-authentication/).

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

### EC2 IAM role

Use the IAM role attached to the EC2 instance (or the IAM Role for Service Accounts, IRSA, in Kubernetes) that Grafana is running on. No credentials are entered in the data source configuration.

To configure EC2 IAM role authentication:

1. Select **EC2 IAM Role** from the **Authentication Provider** drop-down.
2. Select your **Default Region**.

### AWS SDK Default

Use the default AWS SDK credential chain, which checks environment variables, shared configuration files, and container/instance metadata, in that order.

To configure AWS SDK Default authentication:

1. Select **AWS SDK Default** from the **Authentication Provider** drop-down.
2. Select your **Default Region**.

### Grafana Assume Role

Available only in Grafana Cloud. Use temporary credentials managed by Grafana to assume an IAM role on your behalf.

To configure Grafana Assume Role authentication:

1. Select **Grafana Assume Role** from the **Authentication Provider** drop-down.
2. Select your **Default Region**.

### Assume role

You can layer an assumed IAM role on top of any of the authentication methods described above (except Grafana Assume Role, which manages its own role). This is commonly used for cross-account access to DynamoDB tables.

Expand table

| Setting             | Description                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| **Assume Role ARN** | The ARN of the IAM role to assume, for example `arn:aws:iam::123456789012:role/my-role`.              |
| **External ID**     | Optional. An external ID to include in the assume-role request, required by some role trust policies. |

To configure an assumed role:

1. Configure one of the base authentication methods above.
2. Enter the **Assume Role ARN**.
3. Optionally, enter an **External ID** if required by the role’s trust policy.

> Note
>
> To assume a role, your Grafana administrator must set `assume_role_enabled` to true in the \[aws] section of `grafana.ini`. If assume role is disabled, Save &amp; test fails. Refer to [Authentication method not allowed](/docs/plugins/grafana-dynamodb-datasource/latest/troubleshooting/#auth-method-not-allowed).

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

### Assume role provisioning

Add `assumeRoleARN` (and optionally `externalId`) to `jsonData` on top of any base authentication method. For example, with access keys:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: keys
      defaultRegion: us-west-2
      assumeRoleARN: <ROLE_ARN>
      externalId: <EXTERNAL_ID>
      isV2: true
    secureJsonData:
      accessKey: <ACCESS_KEY_ID>
      secretKey: <SECRET_ACCESS_KEY>
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
