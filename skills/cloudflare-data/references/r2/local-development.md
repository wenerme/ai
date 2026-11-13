---
description: Develop with local R2 buckets or remote bindings, seed and inspect test data, and access local public and S3-compatible endpoints.
title: Local development
image: https://developers.cloudflare.com/r2/local-development/og.png?v=d7d1eb63e782ec6d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Local development

Last updated Nov 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/r2/local-development/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Develop and test applications against R2 with [Wrangler](https://developers.cloudflare.com/workers/wrangler/) or the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). Both run your Worker locally and support local R2 simulations and remote bindings.

Local buckets also provide HTTP endpoints for public objects and S3-compatible clients. You can use these endpoints from applications outside Workers.

## Choose local or remote buckets

By default, R2 bindings use [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/) to simulate buckets on your machine. Local buckets start empty and store their data separately from deployed buckets. Operations on these local buckets do not affect data or billing in your Cloudflare account.

To use a real R2 bucket while your Worker runs locally, [configure a remote binding](#connect-to-a-remote-bucket). Reads, writes, and deletes then operate on that bucket, with normal R2 charges. Use a dedicated development bucket to keep test data separate from production.

Remote bindings affect individual bindings. They differ from [`wrangler dev --remote`](https://developers.cloudflare.com/workers/local-development/#wrangler-dev---remote-legacy), which runs your Worker on Cloudflare. For most development, use local execution with local or remote bindings.

## Prerequisites

Use an existing Worker project with [Wrangler](https://developers.cloudflare.com/workers/get-started/guide/) or the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/get-started/). Use the latest version of your development tool. For help choosing, refer to [Wrangler and Vite](https://developers.cloudflare.com/workers/local-development/wrangler-vs-vite/).

Applications that only use S3 still need a Worker development server to host the local bucket. If you do not have a Worker project, create the minimal project described here. You do not need to deploy it or create a remote bucket to use local R2.

<details>

<summary>

Create a minimal Wrangler project

</summary>

1. Create a project directory and open it:

   ```sh
   mkdir -p r2-local/src
   cd r2-local
   ```

2. Install Wrangler:npmyarnpnpmbun

   ```
   npm i wrangler@latest
   ```

   ```
   yarn add wrangler@latest
   ```

   ```
   pnpm add wrangler@latest
   ```

   ```
   bun add wrangler@latest
   ```

3. Create <code>src/index.ts</code> as the Worker entry point:

   *src/index.jsjs*



   ```js
   export default {
   	fetch() {
   		return new Response("R2 local development server");
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
     fetch(): Response {
       return new Response("R2 local development server");
     },
   };
   ```

4. Create a Wrangler configuration file in the project directory:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "r2-local",
     "main": "src/index.ts",
     // Set this to today's date
     "compatibility_date": "2026-11-13"
   }
   ```

   ```toml
   name = "r2-local"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-11-13"
   ```

</details>

## Start a local development session

1. In your Worker project, add an [R2 binding](https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets) to the existing Wrangler configuration file:

   ```jsonc
   {
     "r2_buckets": [
       {
         "binding": "BUCKET",
         "bucket_name": "my-bucket"
       }
     ]
   }
   ```

   ```toml
   [[r2_buckets]]
   binding = "BUCKET"
   bucket_name = "my-bucket"
   ```

   Keep your existing Worker entry point and other project settings. The local bucket is available on `env.BUCKET` through the [R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).
2. Start your project's development server:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   npmyarnpnpm

   ```
   npx vite
   ```

   ```
   yarn vite
   ```

   ```
   pnpm vite
   ```

   If your project uses the [Cloudflare CLI](https://developers.cloudflare.com/cf/projects/) with `cloudflare.config.ts`, `cf dev` starts the development server configured for your project.
3. Check that the server lists your R2 binding in local mode. Keep it running while you follow the local examples.

Use the server address printed in your terminal. The examples use Wrangler's default, `http://localhost:8787`. For Vite, the default is `http://localhost:5173`; substitute your actual address in HTTP requests and S3 client configuration.

## Connect to a remote bucket

To access existing R2 data from a locally running Worker, use a [remote binding](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

1. [Create a dedicated development bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/), or select an existing bucket for testing. [Authenticate Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) with an account that can access it.
2. Add the binding to a development environment in your Wrangler configuration. Replace `my-bucket-development` with the name of your deployed development bucket:

   ```jsonc
   {
     "env": {
       "development": {
         "r2_buckets": [
           {
             "binding": "BUCKET",
             "bucket_name": "my-bucket-development",
             "remote": true
           }
         ]
       }
     }
   }
   ```

   ```toml
   [[env.development.r2_buckets]]
   binding = "BUCKET"
   bucket_name = "my-bucket-development"
   remote = true
   ```

   Bindings are [not inherited by named environments](https://developers.cloudflare.com/workers/wrangler/environments/#non-inheritable-keys-and-environments). Include any other bindings your Worker needs in this environment.
3. Start the development server using that environment:npmyarnpnpm

   ```
   npx wrangler dev --env development
   ```

   ```
   yarn wrangler dev --env development
   ```

   ```
   pnpm wrangler dev --env development
   ```

   Set `CLOUDFLARE_ENV=development` when starting Vite. Refer to [Cloudflare environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/) for configuration instructions.
4. Check that the server lists the R2 binding in remote mode. Calls to `env.BUCKET` now access the deployed development bucket.

Writes and deletes change the remote bucket's data, and [normal R2 charges](https://developers.cloudflare.com/r2/pricing/) apply. The local public and S3 endpoints described on this page do not serve remote bindings.

To return to local simulation, stop the server and start it without the development environment. With Wrangler, `wrangler dev --env development --local` also temporarily overrides remote bindings. For Vite, set [`remoteBindings: false`](https://developers.cloudflare.com/workers/vite-plugin/reference/api/#interface-pluginconfig) in the Cloudflare plugin options to turn off remote connections.

## Populate a local bucket

The following examples use the local `my-bucket` binding. A newly created local bucket is empty; data from a remote bucket is not copied into it.

1. In a second terminal, open the same Worker project directory and create a test file:

   ```sh
   echo 'Hello, R2!' > hello.txt
   ```

2. Upload the file with [`wrangler r2 object put`](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-put) and the `--local` flag:npmyarnpnpm

   ```
   npx wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local
   ```

   ```
   yarn wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local
   ```

   ```
   pnpm wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local
   ```

Use [`wrangler r2 object get`](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-get) and [`wrangler r2 object delete`](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-delete) with the same `--local` flag to read and remove local objects. Without `--local`, these commands act on the remote bucket.

### Inspect objects in Local Explorer

Open `/cdn-cgi/local/explorer` on your development server to list local R2 objects, view metadata, upload files, or delete objects. Verify that `hello.txt` appears in `my-bucket` after the upload.

[Local Explorer](https://developers.cloudflare.com/workers/local-development/local-explorer/) requires Wrangler 4.118.0 or later, or Cloudflare Vite plugin 1.50.0 or later.

## Persist and reset local data

By default, Wrangler and the Vite plugin persist local objects across sessions in `.wrangler/state`. To change the directory, use Wrangler's [`--persist-to`](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) flag or the Vite plugin's [`persistState`](https://developers.cloudflare.com/workers/vite-plugin/reference/api/#interface-pluginconfig) option.

Commands that populate local data must use the **same persistence directory** as the development server. For example, if you start Wrangler with `--persist-to ./local-state`, upload to that directory too:

npmyarnpnpm

```
npx wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local --persist-to ./local-state
```

```
yarn wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local --persist-to ./local-state
```

```
pnpm wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local --persist-to ./local-state
```

This also applies when Vite uses a custom `persistState.path`. For instructions on sharing state between tools and clearing local data, refer to [Where local data gets stored](https://developers.cloudflare.com/workers/local-development/local-data/#where-local-data-gets-stored).

## Serve objects publicly

Every local bucket is served over HTTP at the following path on the development server:

```txt
/cdn-cgi/local/r2/public/<BUCKET_ID>/<KEY>
```

`<BUCKET_ID>` is the bucket's `bucket_name`. When `bucket_name` is not set, it is the binding name instead.

With Wrangler, this endpoint requires version 4.100.0 or later. It needs no additional bucket configuration. To read the object added in [Populate a local bucket](#populate-a-local-bucket):

```sh
curl http://localhost:8787/cdn-cgi/local/r2/public/my-bucket/hello.txt
```

The endpoint simulates a [public bucket](https://developers.cloudflare.com/r2/buckets/public-buckets/). It accepts `GET` and `HEAD` requests, and honors the `Range` and conditional request headers. Stored HTTP metadata, such as `Content-Type`, is returned with the object.

Requests using any other method return `401`. Buckets configured with `remote = true` are not served. This endpoint does not enable public access to a deployed bucket.

## Serve buckets over the S3 API

Experimental

The local S3-compatible endpoint is experimental and may change. With Wrangler, it requires version 4.115.0 or later. For Vite projects, use the latest Cloudflare Vite plugin.

Buckets can be served over an S3-compatible API, which lets you point existing S3 clients at a local bucket. Use this to develop against R2 with the AWS SDKs, the AWS CLI, or any other tool that speaks S3, without connecting to a real bucket.

### Configure a bucket

Unlike the public endpoint, the S3 endpoint is opt-in. Add [`local_dev.experimental_s3_credentials`](https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets) to the existing local bucket binding to serve it:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "BUCKET",
      "bucket_name": "my-bucket",
      "local_dev": {
        "experimental_s3_credentials": {
          "accessKeyId": "local-access-key-id",
          "secretAccessKey": "local-secret-access-key"
        }
      }
    }
  ]
}
```

```toml
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "my-bucket"

[r2_buckets.local_dev.experimental_s3_credentials]
accessKeyId = "local-access-key-id"
secretAccessKey = "local-secret-access-key"
```

Both `accessKeyId` and `secretAccessKey` are required. Their values are arbitrary strings that you choose. They are not [R2 API tokens](https://developers.cloudflare.com/r2/api/tokens/), and they grant no access to production buckets.

Requests are authenticated with AWS Signature Version 4, using either the `Authorization` header or [presigned URL](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) query parameters. Buckets configured with `remote = true` are not served, and their local credentials are ignored.

Remote bindings apply to Workers API calls such as `env.BUCKET.get()`. They do not forward this local S3 endpoint to a deployed bucket. To use an S3 client with a real R2 bucket, configure the [R2 S3 endpoint and API credentials](https://developers.cloudflare.com/r2/get-started/s3/#2-generate-api-credentials) instead.

### Connect an S3 client

The bucket is served at the following path on the development server:

```txt
/cdn-cgi/local/r2/s3
```

Use the address printed by your development server for the endpoint origin. The examples use `http://localhost:8787`; Vite defaults to `http://localhost:5173`.

Set the client's region to `auto` and turn on path-style addressing, so that the client appends the bucket to the endpoint. As with the public endpoint, the bucket is addressed by its `bucket_name`, or by the binding name when `bucket_name` is not set.

Install the SDK in the application that will access the local bucket:

npmyarnpnpmbun

```
npm i @aws-sdk/client-s3@latest
```

```
yarn add @aws-sdk/client-s3@latest
```

```
pnpm add @aws-sdk/client-s3@latest
```

```
bun add @aws-sdk/client-s3@latest
```

```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
	region: "auto",
	endpoint: "http://localhost:8787/cdn-cgi/local/r2/s3",
	credentials: {
		accessKeyId: "local-access-key-id",
		secretAccessKey: "local-secret-access-key",
	},
	forcePathStyle: true,
});

const object = await S3.send(
	new GetObjectCommand({ Bucket: "my-bucket", Key: "hello.txt" }),
);
console.log(await object.Body?.transformToString());
```

```ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
	region: "auto",
	endpoint: "http://localhost:8787/cdn-cgi/local/r2/s3",
	credentials: {
		accessKeyId: "local-access-key-id",
		secretAccessKey: "local-secret-access-key",
	},
	forcePathStyle: true,
});

const object = await S3.send(
	new GetObjectCommand({ Bucket: "my-bucket", Key: "hello.txt" }),
);
console.log(await object.Body?.transformToString());
```

Install the [AWS CLI ↗︎](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), then run:

```sh
AWS_ACCESS_KEY_ID=local-access-key-id \
AWS_SECRET_ACCESS_KEY=local-secret-access-key \
aws s3api get-object \
  --endpoint-url http://localhost:8787/cdn-cgi/local/r2/s3 \
  --region auto \
  --bucket my-bucket \
  --key hello.txt \
  downloaded-hello.txt
```

### Supported operations

The endpoint implements the following operations:

| Type | Operations |
| --- | --- |
| Bucket | [ListBuckets ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html), [HeadBucket ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadBucket.html), [ListObjects ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html), [ListObjectsV2 ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html), [GetBucketLocation ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html), [GetBucketEncryption ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html) |
| Object | [GetObject ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html), [HeadObject ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html), [PutObject ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html), [CopyObject ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html), [DeleteObject ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html), [DeleteObjects ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) |
| Multipart | [CreateMultipartUpload ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html), [UploadPart ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html), [UploadPartCopy ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html), [CompleteMultipartUpload ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html), [AbortMultipartUpload ↗︎](https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html) |

For the full set of operations R2 supports, refer to [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/).

`ListBuckets` returns only the buckets that share the credentials the request was signed with.

### Limitations

Although the local endpoint tries to match R2's production behavior, it does not support all of the same S3 operations and features. For example:

- Server-side encryption with customer-provided keys (SSE-C) is rejected rather than applied.
- The `x-amz-storage-class` header accepts `STANDARD` only. Local buckets do not store a [storage class](https://developers.cloudflare.com/r2/buckets/storage-classes/), so `STANDARD_IA` is rejected.
- Cross-origin requests are always allowed. Production buckets answer preflight requests according to their [CORS configuration](https://developers.cloudflare.com/r2/buckets/cors/).

## Related resources

- [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) and [R2 testing examples](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/) for automated tests.
- [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/) for the operations R2 supports in production.
- [Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/) to expose deployed bucket contents over HTTP.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/local-development/#page","headline":"Local development","description":"Develop with local R2 buckets or remote bindings, seed and inspect test data, and access local public and S3-compatible endpoints.","url":"https://developers.cloudflare.com/r2/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/r2/local-development/og.png?v=d7d1eb63e782ec6d","dateModified":"2026-11-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
