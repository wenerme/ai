---
description: Review which S3 API operations and features R2 supports, including implementation status.
title: S3 API compatibility
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# S3 API compatibility

Last updated Jul 31, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/r2/api/s3/api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

R2 implements the S3 API to allow users and their applications to migrate with ease. When comparing to AWS S3, Cloudflare has removed some API operations' features and added others. The S3 API operations are listed below with their current implementation status. Feature implementation is currently in progress. Refer back to this page for updates. The API is available via the `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` endpoint. Find your [account ID in the Cloudflare dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

## How to read this page

This page has two sections: bucket-level operations and object-level operations.

Each section will have two tables: a table of implemented APIs and a table of unimplemented APIs.

Refer the feature column of each table to review which features of an API have been implemented and which have not.

✅ Feature Implemented
 🚧 Feature Implemented (Experimental)
 ❌ Feature Not Implemented

## Bucket region

When using the S3 API, the region for an R2 bucket is `auto`. For compatibility with tools that do not allow you to specify a region, an empty value and `us-east-1` will alias to the `auto` region.

This also applies to the `LocationConstraint` for the `CreateBucket` API.

## Checksum Types

Checksums have an algorithm and a [type ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity.html#ChecksumTypes). Refer to the table below.

| Checksum Algorithm | `FULL_OBJECT` | `COMPOSITE` |
| --- | --- | --- |
| CRC-64/NVME (`CRC64NVME`) | ✅ | ❌ |
| CRC-32 (`CRC32`) | ❌ | ✅ |
| CRC-32C (`CRC32C`) | ❌ | ✅ |
| SHA-1 (`SHA1`) | ❌ | ✅ |
| SHA-256 (`SHA256`) | ❌ | ✅ |

## Bucket-level operations

The following tables are related to bucket-level operations.

### Implemented bucket-level operations

Below is a list of implemented bucket-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

| API Name | Feature |
| --- | --- |
| ✅ [ListBuckets ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html) | |
| ✅ [HeadBucket ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadBucket.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [CreateBucket ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html) | ❌ ACL: <br>   ❌ x-amz-acl <br>   ❌ x-amz-grant-full-control <br>   ❌ x-amz-grant-read <br>   ❌ x-amz-grant-read-acp <br>   ❌ x-amz-grant-write <br>   ❌ x-amz-grant-write-acp <br> ❌ Object Locking: <br>   ❌ x-amz-bucket-object-lock-enabled <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteBucket ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteBucketCors ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketCors.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [GetBucketCors ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketCors.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [GetBucketLifecycleConfiguration ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [GetBucketLocation ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [GetBucketEncryption ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html) | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| ✅ [PutBucketCors ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketCors.html) | ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [PutBucketLifecycleConfiguration ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html) | ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |

### Unimplemented bucket-level operations

<details>

<summary>

Unimplemented bucket-level operations

</summary>

| API Name | Feature |
| --- | --- |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAccelerateConfiguration.html">GetBucketAccelerateConfiguration ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAcl.html">GetBucketAcl ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration ↗</a> | ❌ id <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketIntelligentTieringConfiguration.html">GetBucketIntelligentTieringConfiguration ↗</a> | ❌ id |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketInventoryConfiguration.html">GetBucketInventoryConfiguration ↗</a> | ❌ id <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycle.html">GetBucketLifecycle ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLogging.html">GetBucketLogging ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketMetricsConfiguration.html">GetBucketMetricsConfiguration ↗</a> | ❌ id <br>❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketNotification.html">GetBucketNotification ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketNotificationConfiguration.html">GetBucketNotificationConfiguration ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketOwnershipControls.html">GetBucketOwnershipControls ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketPolicy.html">GetBucketPolicy ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketPolicyStatus.html">GetBucketPolicyStatus ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketReplication.html">GetBucketReplication ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketRequestPayment.html">GetBucketRequestPayment ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html">GetBucketTagging ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketWebsite.html">GetBucketWebsite ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectLockConfiguration.html">GetObjectLockConfiguration ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketAnalyticsConfigurations.html">ListBucketAnalyticsConfigurations ↗</a> | ❌ Query Parameters: <br>   ❌ continuation-token <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketIntelligentTieringConfigurations.html">ListBucketIntelligentTieringConfigurations ↗</a> | ❌ Query Parameters: <br>   ❌ continuation-token <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketInventoryConfigurations.html">ListBucketInventoryConfigurations ↗</a> | ❌ Query Parameters: <br>   ❌ continuation-token <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketMetricsConfigurations.html">ListBucketMetricsConfigurations ↗</a> | ❌ Query Parameters: <br>   ❌ continuation-token <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration ↗</a> | ❌ Checksums: <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAcl.html">PutBucketAcl ↗</a> | ❌ Permissions: <br>   ❌ x-amz-grant-full-control <br>   ❌ x-amz-grant-read <br>   ❌ x-amz-grant-read-acp <br>   ❌ x-amz-grant-write <br>   ❌ x-amz-grant-write-acp <br> ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration ↗</a> | ❌ id <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketEncryption.html">PutBucketEncryption ↗</a> | ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketIntelligentTieringConfiguration.html">PutBucketIntelligentTieringConfiguration ↗</a> | ❌ id <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketInventoryConfiguration.html">PutBucketInventoryConfiguration ↗</a> | ❌ id <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle ↗</a> | ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLogging.html">PutBucketLogging ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration ↗</a> | ❌ id <br>❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotification.html">PutBucketNotification ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner:   <br> ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotificationConfiguration.html">PutBucketNotificationConfiguration ↗</a> | ❌ Validation: <br>   ❌ x-amz-skip-destination-validation <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketOwnershipControls.html">PutBucketOwnershipControls ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketPolicy.html">PutBucketPolicy ↗</a> | ❌ Validation: <br>   ❌ x-amz-confirm-remove-self-bucket-access <br> ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketReplication.html">PutBucketReplication ↗</a> | ❌ Object Locking: <br>   ❌ x-amz-bucket-object-lock-token <br> ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketRequestPayment.html">PutBucketRequestPayment ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketTagging.html">PutBucketTagging ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketVersioning.html">PutBucketVersioning ↗</a> | ❌ Multi-factor authentication: <br>   ❌ x-amz-mfa <br> ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketWebsite.html">PutBucketWebsite ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br> ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectLockConfiguration.html">PutObjectLockConfiguration ↗</a> | ❌ Object Locking: <br>   ❌ x-amz-bucket-object-lock-token <br> ❌ Checksums: <br>   ❌ Content-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock ↗</a> | ❌ Checksums: <br>   ❌ Content-MD5 <br>   ❌ x-amz-sdk-checksum-algorithm <br>   ❌ x-amz-checksum-algorithm <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |

</details>

## Object-level operations

The following tables are related to object-level operations.

### Implemented object-level operations

Below is a list of implemented object-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

#### Behaviors & Limitations

**UploadPart:** Uploading to the same part number replaces the previous part. If a subsequent upload to the same part fails, the original part is lost and must be re-uploaded.

| API Name | Feature |
| --- | --- |
| ✅ [HeadObject ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html) | ✅ Conditional Operations: <br>   ✅ If-Match <br>   ✅ If-Modified-Since <br>   ✅ If-None-Match <br>   ✅ If-Unmodified-Since <br> ✅ Range: <br>   ✅ Range (has no effect in HeadObject) <br>   ✅ partNumber <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [ListObjects ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html) | Query Parameters: <br>   ✅ delimiter <br>   ✅ encoding-type <br>   ✅ marker <br>   ✅ max-keys <br>   ✅ prefix <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [ListObjectsV2 ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html) | Query Parameters: <br>   ✅ list-type <br>   ✅ continuation-token <br>   ✅ delimiter <br>   ✅ encoding-type <br>   ✅ fetch-owner <br>   ✅ max-keys <br>   ✅ prefix <br>   ✅ start-after <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [GetObject ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html) | ✅ Conditional Operations: <br>   ✅ If-Match <br>   ✅ If-Modified-Since <br>   ✅ If-None-Match <br>   ✅ If-Unmodified-Since <br> ✅ Range: <br>   ✅ Range <br>   ✅ PartNumber <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [PutObject ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html) | ✅ Conditional Operations: <br>   ✅ If-Match <br>   ✅ If-Modified-Since <br>   ✅ If-None-Match <br>   ✅ If-Unmodified-Since <br> ✅ System Metadata: <br>   ✅ Content-Type <br>   ✅ Cache-Control <br>   ✅ Content-Disposition <br>   ✅ Content-Encoding <br>   ✅ Content-Language <br>   ✅ Expires <br>   ✅ Content-MD5 <br> ✅ Storage Class: <br>   ✅ x-amz-storage-class <br>     ✅ STANDARD <br>     ✅ STANDARD\_IA <br> ❌ Object Lifecycle <br> ❌ Website: <br>   ❌ x-amz-website-redirect-location <br> ❌ SSE: <br>   ❌ x-amz-server-side-encryption-aws-kms-key-id <br>   ❌ x-amz-server-side-encryption <br>   ❌ x-amz-server-side-encryption-context <br>   ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Tagging: <br>   ❌ x-amz-tagging <br> ❌ Object Locking: <br>   ❌ x-amz-object-lock-mode <br>   ❌ x-amz-object-lock-retain-until-date <br>   ❌ x-amz-object-lock-legal-hold <br> ❌ ACL: <br>   ❌ x-amz-acl <br>   ❌ x-amz-grant-full-control <br>   ❌ x-amz-grant-read <br>   ❌ x-amz-grant-read-acp <br>   ❌ x-amz-grant-write-acp <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteObject ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html) | ❌ Multi-factor authentication: <br>   ❌ x-amz-mfa <br> ❌ Object Locking: <br>   ❌ x-amz-bypass-governance-retention <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteObjects ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) | ❌ Multi-factor authentication: <br>   ❌ x-amz-mfa <br> ❌ Object Locking: <br>   ❌ x-amz-bypass-governance-retention <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [ListMultipartUploads ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html) | ✅ Query Parameters: <br>   ✅ delimiter <br>   ✅ encoding-type <br>   ✅ key-marker <br>   ✅️ max-uploads <br>   ✅ prefix <br>   ✅ upload-id-marker |
| ✅ [CreateMultipartUpload ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html) | ✅ System Metadata: <br>   ✅ Content-Type <br>   ✅ Cache-Control <br>   ✅ Content-Disposition <br>   ✅ Content-Encoding <br>   ✅ Content-Language <br>   ✅ Expires <br>   ✅ Content-MD5 <br> ✅ Storage Class: <br>   ✅ x-amz-storage-class <br>     ✅ STANDARD <br>     ✅ STANDARD\_IA <br> ❌ Website: <br>   ❌ x-amz-website-redirect-location <br> ❌ SSE: <br>   ❌ x-amz-server-side-encryption-aws-kms-key-id <br>   ❌ x-amz-server-side-encryption <br>   ❌ x-amz-server-side-encryption-context <br>   ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Tagging: <br>   ❌ x-amz-tagging <br> ❌ Object Locking: <br>   ❌ x-amz-object-lock-mode <br>   ❌ x-amz-object-lock-retain-until-date <br>   ❌ x-amz-object-lock-legal-hold <br> ❌ ACL: <br>   ❌ x-amz-acl <br>   ❌ x-amz-grant-full-control <br>   ❌ x-amz-grant-read <br>   ❌ x-amz-grant-read-acp <br>   ❌ x-amz-grant-write-acp <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [CompleteMultipartUpload ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html) | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer |
| ✅ [AbortMultipartUpload ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html) | ❌ Request Payer: <br>   ❌ x-amz-request-payer |
| ✅ [CopyObject ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html) | ✅ Operation Metadata: <br>   ✅ x-amz-metadata-directive <br> ✅ System Metadata: <br>   ✅ Content-Type <br>   ✅ Cache-Control <br>   ✅ Content-Disposition <br>   ✅ Content-Encoding <br>   ✅ Content-Language <br>   ✅ Expires <br> ✅ Conditional Operations: <br>   ✅ x-amz-copy-source <br>   ✅ x-amz-copy-source-if-match <br>   ✅ x-amz-copy-source-if-modified-since <br>   ✅ x-amz-copy-source-if-none-match <br>   ✅ x-amz-copy-source-if-unmodified-since <br> ✅ Storage Class: <br>   ✅ x-amz-storage-class <br>     ✅ STANDARD <br>     ✅ STANDARD\_IA <br> ❌ ACL: <br>   ❌ x-amz-acl <br>   ❌ x-amz-grant-full-control <br>   ❌ x-amz-grant-read <br>   ❌ x-amz-grant-read-acp <br>   ❌ x-amz-grant-write-acp <br> ❌ Website: <br>   ❌ x-amz-website-redirect-location <br> ❌ SSE: <br>   ❌ x-amz-server-side-encryption <br>   ❌ x-amz-server-side-encryption-aws-kms-key-id <br>   ❌ x-amz-server-side-encryption-context <br>   ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br>   ✅ x-amz-copy-source-server-side-encryption-customer-algorithm <br>   ✅ x-amz-copy-source-server-side-encryption-customer-key <br>   ✅ x-amz-copy-source-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Tagging: <br>   ❌ x-amz-tagging <br>   ❌ x-amz-tagging-directive <br> ❌ Object Locking: <br>   ❌ x-amz-object-lock-mode <br>   ❌ x-amz-object-lock-retain-until-date <br>   ❌ x-amz-object-lock-legal-hold <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner <br>   ❌ x-amz-source-expected-bucket-owner <br> ❌ Checksums: <br>   ❌ x-amz-checksum-algorithm |
| ✅ [UploadPart ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html) | ✅ System Metadata: <br>   ✅ Content-MD5 <br> ❌ SSE: <br>   ❌ x-amz-server-side-encryption <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |
| ✅ [UploadPartCopy ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html) | ✅ Copy Source: <br>   ✅ x-amz-copy-source (required) <br> ❌ Conditional Operations: <br>   ❌ x-amz-copy-source-if-match <br>   ❌ x-amz-copy-source-if-modified-since <br>   ❌ x-amz-copy-source-if-none-match <br>   ❌ x-amz-copy-source-if-unmodified-since <br> ✅ Range: <br>   ✅ x-amz-copy-source-range <br> ✅ SSE-C: <br>   ✅ x-amz-server-side-encryption-customer-algorithm <br>   ✅ x-amz-server-side-encryption-customer-key <br>   ✅ x-amz-server-side-encryption-customer-key-MD5 <br>   ✅ x-amz-copy-source-server-side-encryption-customer-algorithm <br>   ✅ x-amz-copy-source-server-side-encryption-customer-key <br>   ✅ x-amz-copy-source-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner <br>   ❌ x-amz-source-expected-bucket-owner |
| ✅ [ListParts ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html) | Query Parameters: <br>   ✅ max-parts <br>   ✅ part-number-marker <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |

Caution

Even though `ListObjects` is a supported operation, it is recommended that you use `ListObjectsV2` instead when developing applications. For more information, refer to [ListObjects ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html).

### Unimplemented object-level operations

<details>

<summary>

Unimplemented object-level operations

</summary>

| API Name | Feature |
| --- | --- |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectTagging.html">PutObjectTagging ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner <br> ❌ Request Payer: <br>   ❌ x-amz-request-payer <br> ❌ Checksums: <br>   ❌ x-amz-sdk-checksum-algorithm |
| ❌ <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjectTagging.html">DeleteObjectTagging ↗</a> | ❌ Bucket Owner: <br>   ❌ x-amz-expected-bucket-owner |

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/api/s3/api/#page","headline":"S3 API compatibility","description":"Review which S3 API operations and features R2 supports, including implementation status.","url":"https://developers.cloudflare.com/r2/api/s3/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-31","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
