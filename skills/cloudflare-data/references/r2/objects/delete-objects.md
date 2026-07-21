---
description: Delete individual objects or folders from an R2 bucket.
title: Delete objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

#  Delete objects

Last updated Apr 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/r2/objects/delete-objects/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can delete objects from R2 using the dashboard, Workers API, S3 API, or command-line tools. To empty or delete an entire bucket, refer to [Delete buckets](https://developers.cloudflare.com/r2/buckets/delete-buckets/).

## Delete via dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.
[ Go to **Overview** ↗ ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. (Optional) Select the **View prefixes as directories** checkbox to view prefixes grouped as [folders](https://developers.cloudflare.com/r2/objects/#prefixes-and-folders).
4. Select the objects or folders you want to delete. You can select a mix of both in the same operation.
5. Select **Delete**.
6. Confirm your choice in the dialog that appears.

To delete all objects in a bucket at once, refer to [Empty a bucket](https://developers.cloudflare.com/r2/buckets/delete-buckets/#empty-a-bucket).

## Delete via Workers API

Use R2 [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in Workers to delete objects:

```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		await env.MY_BUCKET.delete("image.png");
		return new Response("Deleted");
	},
} satisfies ExportedHandler<Env>;
```

For complete documentation, refer to [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).

## Delete via S3 API

Use S3-compatible SDKs to delete objects. You'll need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [R2 API token](https://developers.cloudflare.com/r2/api/tokens/).

```ts
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
	region: "auto", // Required by SDK but not used by R2
	// Provide your Cloudflare account ID
	endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`,
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	credentials: {
		accessKeyId: '<ACCESS_KEY_ID>',
		secretAccessKey: '<SECRET_ACCESS_KEY>',
	},
});

await S3.send(
	new DeleteObjectCommand({
		Bucket: "my-bucket",
		Key: "image.png",
	}),
);
```

```python
import boto3

s3 = boto3.client(
	service_name="s3",
	# Provide your Cloudflare account ID
	endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
	# Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	aws_access_key_id=ACCESS_KEY_ID,
	aws_secret_access_key=SECRET_ACCESS_KEY,
	region_name="auto", # Required by SDK but not used by R2
)

s3.delete_object(Bucket="my-bucket", Key="image.png")
```

For complete S3 API documentation, refer to [S3 API](https://developers.cloudflare.com/r2/api/s3/api/).

## Delete via Wrangler

Caution

Deleting objects from a bucket is irreversible.

Use [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) to delete objects. Run the [r2 object delete command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-delete):

```sh
wrangler r2 object delete test-bucket/image.png
```

## Related resources

### [ Delete buckets ](https://developers.cloudflare.com/r2/buckets/delete-buckets/)

 Empty all objects from a bucket and permanently delete it.

### [ Bucket locks ](https://developers.cloudflare.com/r2/buckets/bucket-locks/)

 Protect objects from accidental deletion with retention policies.

### [ Object lifecycles ](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)

 Automatically expire objects after a specified period.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/objects/delete-objects/#page","headline":"Delete objects · Cloudflare R2 docs","description":"Delete individual objects or folders from an R2 bucket.","url":"https://developers.cloudflare.com/r2/objects/delete-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
