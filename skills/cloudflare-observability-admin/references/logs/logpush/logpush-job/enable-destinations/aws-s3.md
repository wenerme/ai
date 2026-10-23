---
description: Push Cloudflare logs to Amazon S3.
title: Enable Amazon S3
image: https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/og.png?v=919663589b56b43b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Amazon S3

Last updated Oct 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Logpush supports pushing logs directly to Amazon S3 via the Cloudflare dashboard or via API. Customers that use AWS GovCloud locations should use our **S3-compatible endpoint** and not the **Amazon S3 endpoint**. AWS does not let a commercial AWS identity assume a role in GovCloud, so GovCloud buckets require access keys.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or domain (also known as zone) level.

   For account: [Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/logs)

   For domain (also known as zone): [Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.

4. In **Select a destination**, choose **Amazon S3**.
5. Enter or select the following destination information:
   - **Bucket** - S3 bucket name
   - **Path** - bucket location within the storage container
   - **Organize logs into daily subfolders** (recommended)
   - **Bucket region**
   - If your bucket policy requires [AWS SSE-S3 AES256 Server Side Encryption ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html), select the encryption option. Do not select it for a bucket that uses SSE-KMS. Refer to [Encrypt logs with server-side encryption](#encrypt-logs-with-server-side-encryption).
   - For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a [policy ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html#iam-policy-ex0) (if you did not add it already):
     - Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** > **Bucket Policy** and select **Save**.

When you are done entering the destination details, select **Continue**.

6. To prove ownership, Cloudflare will send a file to your designated destination. To find the token, select the **Open** button in the **Overview** tab of the ownership challenge file, then paste it into the Cloudflare dashboard to verify your access to the bucket. Enter the **Ownership Token** and select **Continue**.
7. Select the dataset to push to the storage service.
8. In the next step, you need to configure your logpush job:
   - Enter the **Job name**.
   - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.
   - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
9. In **Advanced Options**, you can:
   - Choose the format of timestamp fields in your logs ( `RFC3339` (default), `Unix`, or `UnixNano`).
   - Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
   - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
10. Select **Submit** once you are done configuring your logpush job.

## Create and get access to an S3 bucket

Cloudflare uses Amazon Identity and Access Management (IAM) to gain access to your S3 bucket. The Cloudflare IAM user needs `PutObject` permission for the bucket.

Logs are written into that bucket as gzipped objects using the S3 Access Control List (ACL) `Bucket-owner-full-control` permission.

For illustrative purposes, imagine that you want to store logs in the bucket `burritobot`, in the `logs` directory. The S3 URL would then be `s3://burritobot/logs`.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).



To enable Logpush to Amazon S3:

1. Create an S3 bucket. Refer to [instructions from Amazon ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html).

   Note

   Buckets in China regions ( `cn-north-1`, `cn-northwest-1`) are currently not supported.
2. Edit and paste the policy below into **S3** > **Bucket** > **Permissions** > **Bucket Policy**, replacing the `Resource` value with your own bucket path. The `AWS` `Principal` is owned by Cloudflare and should not be changed.

```json
{
	"Id": "<POLICY_ID>",
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Stmt1506627150918",
			"Action": ["s3:PutObject"],
			"Effect": "Allow",
			"Resource": "arn:aws:s3:::burritobot/logs/*",
			"Principal": {
				"AWS": ["arn:aws:iam::391854517948:user/cloudflare-logpush"]
			}
		}
	]
}
```

Note

Logpush uploads each log file, including the ownership challenge file, with a single `PutObject` request. It does not use multipart upload, so failed uploads do not leave incomplete multipart uploads in your bucket.

## Use an IAM role in your AWS account

Instead of granting the Cloudflare IAM user access in your bucket policy, you can have Logpush assume an IAM role in your AWS account. Logpush then writes to your bucket as that role. Use this option if your bucket policy cannot name a third-party principal, or if your bucket uses SSE-KMS encryption.

This option is available through the API and Terraform. It is not available in the dashboard or for AWS GovCloud buckets.

1. Create an IAM role with the following trust policy. Replace `<EXTERNAL_ID>` with a unique value that you choose. The external ID prevents another Cloudflare account from using your role. For more information, refer to [Access to AWS accounts owned by third parties ↗︎](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html).

   ```json
   {
   	"Version": "2012-10-17",
   	"Statement": [
   		{
   			"Effect": "Allow",
   			"Principal": {
   				"AWS": "arn:aws:iam::391854517948:user/cloudflare-logpush"
   			},
   			"Action": "sts:AssumeRole",
   			"Condition": {
   				"StringEquals": { "sts:ExternalId": "<EXTERNAL_ID>" }
   			}
   		}
   	]
   }
   ```

2. Attach a permission policy that allows the role to write to your bucket path. Replace `<BUCKET_NAME>` and `<PATH>` with your own values.

   ```json
   {
   	"Version": "2012-10-17",
   	"Statement": [
   		{
   			"Effect": "Allow",
   			"Action": "s3:PutObject",
   			"Resource": "arn:aws:s3:::<BUCKET_NAME>/<PATH>/*"
   		}
   	]
   }
   ```

   If the bucket uses SSE-KMS, also grant the role `kms:GenerateDataKey` on the key. Refer to [Encrypt logs with server-side encryption](#encrypt-logs-with-server-side-encryption).
3. Use the following format for the `destination_conf` field when you request the ownership challenge and when you create the job:

   ```txt
   s3://<BUCKET_NAME>/<PATH>/{DATE}?region=<REGION>&sts-assume-role-arn=arn:aws:iam::<AWS_ACCOUNT_ID>:role/<ROLE_NAME>&sts-external-id=<EXTERNAL_ID>
   ```

4. Request an ownership challenge, then create the job with the token. Logpush writes the ownership challenge file as the role. For the API calls, refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/).

You cannot combine `sts-assume-role-arn` with `access-key-id` and `secret-access-key` in the same job.

## Encrypt logs with server-side encryption

Logpush supports two kinds of server-side encryption for Amazon S3.

### SSE-S3

To request SSE-S3 encryption on each object, add `sse=AES256` to the `destination_conf`. In the dashboard, select the encryption option. `AES256` is the only accepted value.

You only need this option if your bucket policy denies uploads without the `x-amz-server-side-encryption` header. Amazon S3 encrypts new objects with SSE-S3 by default.

### SSE-KMS

Logpush does not send SSE-KMS headers or a KMS key ID. Instead, Amazon S3 applies your bucket's default encryption to each object that Logpush writes. To store logs encrypted with your AWS Key Management Service (AWS KMS) key:

1. Set the bucket's [default encryption ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html) to SSE-KMS with your customer managed key.
2. Configure the job to [use an IAM role in your AWS account](#use-an-iam-role-in-your-aws-account). The Cloudflare IAM user cannot use KMS keys in your account.
3. Grant the role `kms:GenerateDataKey` on the key. If the key is in a different AWS account from the role, the key policy must also allow the role.
4. Leave `sse` out of the `destination_conf`. If you set `sse=AES256`, Amazon S3 uses SSE-S3 instead of your KMS key.
5. Remove bucket policy statements that deny `PutObject` requests without the `x-amz-server-side-encryption` header, including statements that use `StringNotEqualsIfExists`. Logpush does not send this header.

To confirm that logs use your key, run `aws s3api head-object` on a delivered object. The response shows `ServerSideEncryption` as `aws:kms` and your key in `SSEKMSKeyId`. Any identity that reads the logs or the ownership challenge file needs `kms:Decrypt` on the key.

If the ownership challenge fails with an `AccessDenied` error for `kms:GenerateDataKey` that names `user/cloudflare-logpush`, the job uses the Cloudflare IAM user. Switch the job to an IAM role in your AWS account.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/#page","headline":"Enable Amazon S3","description":"Push Cloudflare logs to Amazon S3.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/","inLanguage":"en","image":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/og.png?v=919663589b56b43b","dateModified":"2026-10-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
