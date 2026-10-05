---
title: "AWS API | Grafana Plugins documentation"
description: "Connect the Infinity data source to AWS management APIs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AWS API

Connect the Infinity data source to AWS management APIs to query metrics, list resources, and retrieve cost data.

The Infinity data source supports two AWS authentication providers and optional IAM role assumption for cross-account or role-based access.

## Authentication providers

Expand table

| Provider                  | Description                                                                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Access and secret key** | Static credentials. Provide an AWS access key and secret key directly.                                                                                                |
| **AWS SDK Default**       | Uses the AWS SDK default credential chain: environment variables, shared credentials file, EC2 instance profile, ECS task role, or EKS IRSA. No static keys required. |

## IAM role assumption (AssumeRole)

Both authentication providers support optional IAM role assumption via STS `AssumeRole`. This is useful for:

- **Cross-account access**: reach resources in a different AWS account.
- **Least privilege**: use a base identity with minimal permissions and assume a role that has the specific permissions.
- **EKS IRSA**: the pod authenticates through IRSA (default credentials) and then assumes a target role that has the required permissions.

Expand table

| Field               | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| **Assume Role ARN** | Optional. The ARN of the IAM role to assume (for example, `arn:aws:iam::123456789012:role/MyRole`).  |
| **External ID**     | Optional. Used when the target role’s trust policy requires an external ID for cross-account access. |

Temporary credentials obtained via `AssumeRole` are automatically refreshed by the AWS SDK when they expire.

## Grafana server configuration

The Grafana server controls which AWS authentication providers the data source offers. Add the following to `grafana.ini` or set equivalent environment variables:

ini [Copy code to clipboard] Copy

```ini
[aws]
allowed_auth_providers = default,keys
assume_role_enabled = true
forward_settings_to_plugins = yesoreyeram-infinity-datasource
```

Or via environment variables:

[Copy code to clipboard] Copy

```none
GF_AWS_ALLOWED_AUTH_PROVIDERS=default,keys
GF_AWS_ASSUME_ROLE_ENABLED=true
GF_AWS_FORWARD_SETTINGS_TO_PLUGINS=yesoreyeram-infinity-datasource
```

If `forward_settings_to_plugins` already contains other data source plugin IDs, append `yesoreyeram-infinity-datasource` to the existing comma-separated list instead of replacing it.

`forward_settings_to_plugins` is what applies `allowed_auth_providers` and `assume_role_enabled` to the plugin backend. If the plugin isn’t listed, the backend falls back to the AWS SDK defaults, which permit the `default`, `keys`, and `credentials` providers and allow role assumption, regardless of the server settings. Include the plugin so that your server settings are enforced end to end.

## Before you begin

The AWS authentication options depend on the Grafana server configuration described in [Grafana server configuration](#grafana-server-configuration). If the server doesn’t allow the `default` provider, the **AWS SDK Default** option isn’t shown, and if `assume_role_enabled` is disabled, the **Assume Role ARN** and **External ID** fields aren’t shown.

On Grafana Cloud, the `default` provider isn’t allowed, so **AWS SDK Default** isn’t offered. Use **Access and secret key**, optionally with an **Assume Role ARN**, which is supported because role assumption is enabled there.

For **Access and secret key** authentication:

- Create an AWS IAM user with programmatic access
- Note down your Access Key ID and Secret Access Key
- Assign appropriate IAM permissions for the APIs you want to query (for example, CloudWatch ReadOnly, Cost Explorer ReadOnly)

For **AWS SDK Default** authentication:

- Ensure the Grafana instance has an IAM role attached (instance profile, task role, or IRSA service account) with the required permissions

## Configure the data source

Choose the authentication provider that matches your environment, then configure the data source.

### Configure with access and secret key

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. Expand the **Authentication** section and select **AWS**.
4. Select **Access and secret key** as the **Authentication Provider**.
5. Configure the following settings:

   Expand table

   | Setting               | Description                   | Example           |
   |-----------------------|-------------------------------|-------------------|
   | **Region**            | AWS region for your resources | `us-east-1`       |
   | **Service**           | AWS service identifier        | `monitoring`      |
   | **Access Key ID**     | Your IAM access key ID        | `KEY...`          |
   | **Secret Access Key** | Your IAM secret access key    | (stored securely) |
6. In **Allowed hosts**, enter your AWS endpoint (for example, `https://monitoring.us-east-1.amazonaws.com`).
7. Click **Save &amp; test**.

### AWS SDK Default

This method is suitable for EC2 instances, ECS tasks, and EKS pods with IRSA.

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. Expand the **Authentication** section and select **AWS**.
4. Select **AWS SDK Default** as the **Authentication Provider**.
5. Select a **Region**.
6. Enter a **Service**.
7. Optionally, enter an **Assume Role ARN** for cross-account access.
8. In **Allowed hosts**, enter your AWS endpoint.
9. Click **Save &amp; test**.

#### EKS IRSA example

When running on EKS with [IAM Roles for Service Accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html):

1. Create an IAM role with the required permissions and a trust policy that allows the Kubernetes service account.
2. Annotate the Kubernetes service account:

   YAML [Copy code to clipboard] Copy

   ```yaml
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: grafana
     annotations:
       eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/GrafanaRole
   ```
3. Configure the data source with **AWS SDK Default**. No static keys are needed.
4. If the IRSA role only has `sts:AssumeRole` permissions, set the **Assume Role ARN** to the target role.

> Tip
>
> Find the appropriate service name in the [AWS service endpoints documentation](https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html).

## Common AWS service identifiers

Expand table

| Service       | Identifier   | Endpoint pattern                    |
|---------------|--------------|-------------------------------------|
| CloudWatch    | `monitoring` | `monitoring.<region>.amazonaws.com` |
| Cost Explorer | `ce`         | `ce.us-east-1.amazonaws.com`        |
| EC2           | `ec2`        | `ec2.<region>.amazonaws.com`        |
| S3            | `s3`         | `s3.<region>.amazonaws.com`         |
| Lambda        | `lambda`     | `lambda.<region>.amazonaws.com`     |

## Query examples

### List CloudWatch metrics

1. Set the **URL** to:

   sh [Copy code to clipboard] Copy

   ```sh
   https://monitoring.us-east-1.amazonaws.com?Action=ListMetrics&Version=2010-08-01
   ```
2. Set **Type** to **XML** (AWS returns XML by default).
3. Set **Parser** to **Backend**.
4. Set the **Root selector** to extract the metrics array.

### CloudWatch metrics with UQL

Use UQL to transform and filter the AWS XML response:

SQL [Copy code to clipboard] Copy

```sql
parse-xml
| scope "ListMetricsResponse.ListMetricsResult.Metrics.member"
| project "Namespace", "MetricName", "Dimensions"
```

### List EC2 instances

**URL:**

sh [Copy code to clipboard] Copy

```sh
https://ec2.us-east-1.amazonaws.com?Action=DescribeInstances&Version=2016-11-15
```

**UQL query:**

SQL [Copy code to clipboard] Copy

```sql
parse-xml
| scope "DescribeInstancesResponse.reservationSet.item.instancesSet.item"
| project "InstanceId"="instanceId", "State"="instanceState.name", "Type"="instanceType"
```

### Cost Explorer data

> Note
>
> Cost Explorer API requires the `ce` service and is only available in `us-east-1`.

**URL:**

sh [Copy code to clipboard] Copy

```sh
https://ce.us-east-1.amazonaws.com
```

**Method:** POST

**Body (JSON):**

JSON [Copy code to clipboard] Copy

```json
{
  "TimePeriod": {
    "Start": "${__from:date:YYYY-MM-DD}",
    "End": "${__to:date:YYYY-MM-DD}"
  },
  "Granularity": "DAILY",
  "Metrics": ["UnBlendedCost"]
}
```

## Provision the data source

### Access Key &amp; Secret Key

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AWS Infinity
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: aws
      aws:
        authType: keys
        region: us-east-1
        service: monitoring
      allowedHosts:
        - https://monitoring.us-east-1.amazonaws.com
    secureJsonData:
      awsAccessKey: YOUR_ACCESS_KEY
      awsSecretKey: YOUR_SECRET_KEY
```

### Access Key &amp; Secret Key + AssumeRole

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AWS Infinity (AssumeRole)
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: aws
      aws:
        authType: keys
        region: us-east-1
        service: monitoring
        assumeRoleArn: arn:aws:iam::123456789012:role/MyRole
        externalId: my-external-id
      allowedHosts:
        - https://monitoring.us-east-1.amazonaws.com
    secureJsonData:
      awsAccessKey: YOUR_ACCESS_KEY
      awsSecretKey: YOUR_SECRET_KEY
```

### AWS SDK Default

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AWS Infinity (IAM Role)
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: aws
      aws:
        authType: default
        region: us-east-1
        service: monitoring
      allowedHosts:
        - https://monitoring.us-east-1.amazonaws.com
```

### Default Credentials + AssumeRole

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AWS Infinity (IAM Role + AssumeRole)
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: aws
      aws:
        authType: default
        region: us-east-1
        service: monitoring
        assumeRoleArn: arn:aws:iam::123456789012:role/MyRole
      allowedHosts:
        - https://monitoring.us-east-1.amazonaws.com
```

## Troubleshoot

Expand table

| Issue                 | Cause                           | Solution                                                                                                                                 |
|-----------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| 403 Forbidden         | Missing IAM permissions         | Verify your IAM user or role has the required permissions                                                                                |
| SignatureDoesNotMatch | Incorrect credentials or region | Verify access key, secret key, and region                                                                                                |
| Connection timeout    | Wrong endpoint                  | Verify the allowed hosts match your endpoint URL                                                                                         |
| Empty response        | Wrong service identifier        | Check the [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html) for the correct identifier |
