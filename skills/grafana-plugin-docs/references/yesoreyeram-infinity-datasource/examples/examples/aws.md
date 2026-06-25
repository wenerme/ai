---
title: "AWS API | Grafana Plugins documentation"
description: "Connect the Infinity data source to AWS management APIs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AWS API

Connect the Infinity data source to AWS management APIs to query metrics, list resources, and retrieve cost data.

## Before you begin

- Create an AWS IAM user with programmatic access
- Note down your Access Key ID and Secret Access Key
- Assign appropriate IAM permissions for the APIs you want to query (for example, CloudWatch ReadOnly, Cost Explorer ReadOnly)

## Configure the data source

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. Expand the **Authentication** section and select **AWS**.
4. Configure the following settings:

   Expand table

   | Setting        | Description                   | Example           |
   |----------------|-------------------------------|-------------------|
   | **Region**     | AWS region for your resources | `us-east-1`       |
   | **Service**    | AWS service identifier        | `monitoring`      |
   | **Access Key** | Your IAM access key ID        | `KEY...`          |
   | **Secret Key** | Your IAM secret access key    | (stored securely) |
5. In **Allowed hosts**, enter your AWS endpoint (for example, `https://monitoring.us-east-1.amazonaws.com`).
6. Click **Save &amp; test**.

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

Configure AWS authentication through provisioning:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: AWS Infinity
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: aws
      aws:
        region: us-east-1
        service: monitoring
      allowedHosts:
        - https://monitoring.us-east-1.amazonaws.com
    secureJsonData:
      awsAccessKey: YOUR_ACCESS_KEY
      awsSecretKey: YOUR_SECRET_KEY
```

## Troubleshoot

Expand table

| Issue                 | Cause                           | Solution                                                                                                                                 |
|-----------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| 403 Forbidden         | Missing IAM permissions         | Verify your IAM user has the required permissions                                                                                        |
| SignatureDoesNotMatch | Incorrect credentials or region | Verify access key, secret key, and region                                                                                                |
| Connection timeout    | Wrong endpoint                  | Verify the allowed hosts match your endpoint URL                                                                                         |
| Empty response        | Wrong service identifier        | Check the [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html) for the correct identifier |
