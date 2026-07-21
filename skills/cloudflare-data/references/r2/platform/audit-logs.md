---
description: Review audit logs for configuration changes made to your R2 buckets.
title: Audit Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

#  Audit Logs

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/r2/platform/audit-logs/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to R2 buckets. This functionality is available on all plan types, free of charge, and is always enabled.

## Viewing audit logs

To view audit logs for your R2 buckets, go to the **Audit logs** page.

[ Go to **Audit logs** ↗ ](https://dash.cloudflare.com/?to=/:account/audit-log)

For more information on how to access and use audit logs, refer to [Review audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

## Logged operations

The following configuration actions are logged:

| Operation                          | Description                                                        |
| ---------------------------------- | ------------------------------------------------------------------ |
| CreateBucket                       | Creation of a new bucket.                                          |
| DeleteBucket                       | Deletion of an existing bucket.                                    |
| AddCustomDomain                    | Addition of a custom domain to a bucket.                           |
| RemoveCustomDomain                 | Removal of a custom domain from a bucket.                          |
| ChangeBucketVisibility             | Change to the managed public access (r2.dev) settings of a bucket. |
| PutBucketStorageClass              | Change to the default storage class of a bucket.                   |
| PutBucketLifecycleConfiguration    | Change to the object lifecycle configuration of a bucket.          |
| DeleteBucketLifecycleConfiguration | Deletion of the object lifecycle configuration for a bucket.       |
| PutBucketCors                      | Change to the CORS configuration for a bucket.                     |
| DeleteBucketCors                   | Deletion of the CORS configuration for a bucket.                   |

Note

Logs for data access operations, such as `GetObject` and `PutObject`, are not included in audit logs. To log HTTP requests made to public R2 buckets, use the [HTTP requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) Logpush dataset.

## Example log entry

Below is an example of an audit log entry showing the creation of a new bucket:

```json
{
  "action": { "info": "CreateBucket", "result": true, "type": "create" },
  "actor": {
    "email": "<ACTOR_EMAIL>",
    "id": "3f7b730e625b975bc1231234cfbec091",
    "ip": "fe32:43ed:12b5:526::1d2:13",
    "type": "user"
  },
  "id": "5eaeb6be-1234-406a-87ab-1971adc1234c",
  "interface": "API",
  "metadata": { "zone_name": "r2.cloudflarestorage.com" },
  "newValue": "",
  "newValueJson": {},
  "oldValue": "",
  "oldValueJson": {},
  "owner": { "id": "1234d848c0b9e484dfc37ec392b5fa8a" },
  "resource": { "id": "my-bucket", "type": "r2.bucket" },
  "when": "2024-07-15T16:32:52.412Z"
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/audit-logs/#page","headline":"Audit Logs · Cloudflare R2 docs","description":"Review audit logs for configuration changes made to your R2 buckets.","url":"https://developers.cloudflare.com/r2/platform/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
