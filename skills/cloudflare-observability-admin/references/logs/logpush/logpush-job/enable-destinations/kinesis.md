---
description: Learn about enable amazon kinesis in Cloudflare Logs.
title: Enable Amazon Kinesis
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Amazon Kinesis

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/kinesis/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Logpush supports [Amazon Kinesis ↗](https://aws.amazon.com/kinesis/) as a destination for all datasets. Each Kinesis record that Logpush sends will contain a batch of GZIP-compressed data in newline-delimited JSON format (by default), or in the format specified in the [output\_options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/) parameter when the job was created.

## Configure Kinesis using STS Assume Role (recommended)

1. Create an IAM Role for Cloudflare Logpush to Assume with the following trust relationship:

```java
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::391854517948:user/cloudflare-logpush"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

1. Ensure that the IAM role has permissions to perform the `PutRecord` action on your Kinesis stream. Replace `<AWS_REGION>`, `<YOUR_AWS_ACCOUNT_ID>` and `<STREAM_NAME>` with your own values:

```java
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "kinesis:PutRecord",
            "Resource": "arn:aws:kinesis:<AWS_REGION>:<YOUR_AWS_ACCOUNT_ID>:stream/<STREAM_NAME>"
        }
    ]
}
```

1. Create a Logpush job, using the following format for the `destination_conf` field:

```bash
kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>
```

1. (optional) When using STS Assume Role, you can include `sts-external-id` as a `destination_conf` parameter so it is included in your Logpush job's requests to Kinesis. Refer to [Securely Using External ID for Accessing AWS Accounts Owned by Others ↗](https://aws.amazon.com/blogs/apn/securely-using-external-id-for-accessing-aws-accounts-owned-by-others/) for more information.

```bash
kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>&sts-external-id=<EXTERNAL_ID>
```

### STS Assume Role example

```bash
$ curl https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs \
-H 'Authorization: Bearer <API_TOKEN>' \
-H 'Content-Type: application/json' -d '{
  "name": "kinesis",
  "destination_conf": "kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>",
  "dataset": "http_requests",
  "enabled": true
}'
```

## Configure Kinesis using IAM Access Keys

When configuring your Logpush job using IAM Access Keys, ensure that the IAM user has permission to perform the `PutRecord` action on your Kinesis stream:

```bash
kinesis://<STREAM_NAME>?region=<AWS_REGION>&access-key-id=<AWS_ACCESS_KEY_ID>&secret-access-key=<AWS_SECRET_ACCESS_KEY>
```

### IAM Access Key example

```bash
$ curl https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs \
-H 'Authorization: Bearer <API_TOKEN>' \
-H 'Content-Type: application/json' -d '{
  "name": "kinesis",
  "destination_conf": "kinesis://<STREAM_NAME>?region=<AWS_REGION>&access-key-id=<AWS_ACCESS_KEY_ID>&secret-access-key=<AWS_SECRET_ACCESS_KEY>",
  "dataset": "http_requests",
  "enabled": true
}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/kinesis/#page","headline":"Enable Amazon Kinesis · Cloudflare Logs docs","description":"Learn about enable amazon kinesis in Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/kinesis/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
