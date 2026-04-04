---
title: Mount buckets
description: Mount S3-compatible object storage as local filesystems for persistent data storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/guides/mount-buckets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Mount buckets

Mount S3-compatible object storage buckets as local filesystem paths. Access object storage using standard file operations.

S3-compatible providers

The SDK works with any S3-compatible object storage provider. Examples include Cloudflare R2, Amazon S3, Google Cloud Storage, Backblaze B2, MinIO, and [many others ↗](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Non-Amazon-S3). The SDK automatically detects and optimizes for R2, S3, and GCS.

## When to mount buckets

Mount S3-compatible buckets when you need:

* **Persistent data** \- Data survives sandbox destruction
* **Large datasets** \- Process data without downloading
* **Shared storage** \- Multiple sandboxes access the same data
* **Cost-effective persistence** \- Cheaper than keeping sandboxes alive

## Mount an R2 bucket

* [  JavaScript ](#tab-panel-6435)
* [  TypeScript ](#tab-panel-6436)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "data-processor");


// Mount R2 bucket

await sandbox.mountBucket("my-r2-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

});


// Access bucket with standard filesystem operations

await sandbox.exec("ls", { args: ["/data"] });

await sandbox.writeFile("/data/results.json", JSON.stringify(results));


// Use from Python

await sandbox.exec("python", {

  args: [

    "-c",

    `

import pandas as pd

df = pd.read_csv('/data/input.csv')

df.describe().to_csv('/data/summary.csv')

`,

  ],

});


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


const sandbox = getSandbox(env.Sandbox, 'data-processor');


// Mount R2 bucket

await sandbox.mountBucket('my-r2-bucket', '/data', {

endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com'

});


// Access bucket with standard filesystem operations

await sandbox.exec('ls', { args: ['/data'] });

await sandbox.writeFile('/data/results.json', JSON.stringify(results));


// Use from Python

await sandbox.exec('python', { args: ['-c', `

import pandas as pd

df = pd.read_csv('/data/input.csv')

df.describe().to_csv('/data/summary.csv')

`] });


```

Mounting affects entire sandbox

Mounted buckets are visible across all sessions since they share the filesystem. Mount once per sandbox.

## Credentials

### Automatic detection

Set credentials as Worker secrets and the SDK automatically detects them:

Terminal window

```

npx wrangler secret put R2_ACCESS_KEY_ID

npx wrangler secret put R2_SECRET_ACCESS_KEY


```

R2 credentials

We also automatically detect `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for compatibility with other S3-compatible providers.

* [  JavaScript ](#tab-panel-6421)
* [  TypeScript ](#tab-panel-6422)

JavaScript

```

// Credentials automatically detected from environment

await sandbox.mountBucket("my-r2-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

});


```

TypeScript

```

// Credentials automatically detected from environment

await sandbox.mountBucket('my-r2-bucket', '/data', {

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com'

});


```

### Explicit credentials

Pass credentials directly when needed:

* [  JavaScript ](#tab-panel-6423)
* [  TypeScript ](#tab-panel-6424)

JavaScript

```

await sandbox.mountBucket("my-r2-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  credentials: {

    accessKeyId: env.R2_ACCESS_KEY_ID,

    secretAccessKey: env.R2_SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-r2-bucket', '/data', {

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',

  credentials: {

    accessKeyId: env.R2_ACCESS_KEY_ID,

    secretAccessKey: env.R2_SECRET_ACCESS_KEY

  }

});


```

## Mount bucket subdirectories

Mount a specific subdirectory within a bucket using the `prefix` option. Only contents under the prefix are visible at the mount point:

* [  JavaScript ](#tab-panel-6445)
* [  TypeScript ](#tab-panel-6446)

JavaScript

```

// Mount only the /uploads/images/ subdirectory

await sandbox.mountBucket("my-bucket", "/images", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  prefix: "/uploads/images/",

});


// Files appear at mount point without the prefix

// Bucket: my-bucket/uploads/images/photo.jpg

// Mounted path: /images/photo.jpg

await sandbox.exec("ls", { args: ["/images"] });


// Write to subdirectory

await sandbox.writeFile("/images/photo.jpg", imageData);

// Creates my-bucket:/uploads/images/photo.jpg


// Mount different prefixes to different paths

await sandbox.mountBucket("datasets", "/training-data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  prefix: "/ml/training/",

});


await sandbox.mountBucket("datasets", "/test-data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  prefix: "/ml/testing/",

});


```

TypeScript

```

// Mount only the /uploads/images/ subdirectory

await sandbox.mountBucket('my-bucket', '/images', {

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',

  prefix: '/uploads/images/'

});


// Files appear at mount point without the prefix

// Bucket: my-bucket/uploads/images/photo.jpg

// Mounted path: /images/photo.jpg

await sandbox.exec('ls', { args: ['/images'] });


// Write to subdirectory

await sandbox.writeFile('/images/photo.jpg', imageData);

// Creates my-bucket:/uploads/images/photo.jpg


// Mount different prefixes to different paths

await sandbox.mountBucket('datasets', '/training-data', {

endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',

prefix: '/ml/training/'

});


await sandbox.mountBucket('datasets', '/test-data', {

endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',

prefix: '/ml/testing/'

});


```

Prefix format

The `prefix` must start and end with `/` (e.g., `/data/`, `/logs/2024/`). This is required by the underlying s3fs tool.

## Read-only mounts

Protect data by mounting buckets in read-only mode:

* [  JavaScript ](#tab-panel-6427)
* [  TypeScript ](#tab-panel-6428)

JavaScript

```

await sandbox.mountBucket("dataset-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  readOnly: true,

});


// Reads work

await sandbox.exec("cat", { args: ["/data/dataset.csv"] });


// Writes fail

await sandbox.writeFile("/data/new-file.txt", "data"); // Error: Read-only filesystem


```

TypeScript

```

await sandbox.mountBucket('dataset-bucket', '/data', {

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',

  readOnly: true

});


// Reads work

await sandbox.exec('cat', { args: ['/data/dataset.csv'] });


// Writes fail

await sandbox.writeFile('/data/new-file.txt', 'data');  // Error: Read-only filesystem


```

## Local development

You can mount R2 buckets during local development with `wrangler dev` by passing the `localBucket` option. This uses the R2 binding from your Worker environment directly, so no S3-compatible endpoint or credentials are required.

### Configure R2 bindings

Add an R2 bucket binding to your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-6419)
* [  wrangler.toml ](#tab-panel-6420)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "my-test-bucket"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "my-test-bucket"


```

### Mount with `localBucket`

Pass `localBucket: true` in the options to mount the bucket locally:

* [  JavaScript ](#tab-panel-6425)
* [  TypeScript ](#tab-panel-6426)

JavaScript

```

await sandbox.mountBucket("MY_BUCKET", "/data", {

  localBucket: true,

});


// Access files using standard operations

await sandbox.exec("ls", { args: ["/data"] });

await sandbox.writeFile("/data/results.json", JSON.stringify(results));


```

TypeScript

```

await sandbox.mountBucket('MY_BUCKET', '/data', {

  localBucket: true

});


// Access files using standard operations

await sandbox.exec('ls', { args: ['/data'] });

await sandbox.writeFile('/data/results.json', JSON.stringify(results));


```

Note

You can use an environment variable to toggle `localBucket` between local development and production. Set an environment variable such as `LOCAL_DEV` in your Wrangler configuration using `vars` for local development, then reference it in your code:

TypeScript

```

await sandbox.mountBucket('MY_BUCKET', '/data', {

  localBucket: Boolean(env.LOCAL_DEV),

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com'

});


```

When `localBucket` is `true`, the `endpoint` is ignored and the SDK uses the R2 binding directly. For more information on setting environment variables, refer to [Environment variables in Wrangler configuration](https://developers.cloudflare.com/workers/configuration/environment-variables/).

The `readOnly` and `prefix` options work the same way in local mode:

* [  JavaScript ](#tab-panel-6431)
* [  TypeScript ](#tab-panel-6432)

JavaScript

```

// Read-only local mount

await sandbox.mountBucket("MY_BUCKET", "/data", {

  localBucket: true,

  readOnly: true,

});


// Mount a subdirectory

await sandbox.mountBucket("MY_BUCKET", "/images", {

  localBucket: true,

  prefix: "/uploads/images/",

});


```

TypeScript

```

// Read-only local mount

await sandbox.mountBucket('MY_BUCKET', '/data', {

  localBucket: true,

  readOnly: true

});


// Mount a subdirectory

await sandbox.mountBucket('MY_BUCKET', '/images', {

localBucket: true,

prefix: '/uploads/images/'

});


```

### Local development considerations

During local development, files are synchronized between R2 and the container using a periodic sync process rather than a direct filesystem mount. Keep the following in mind:

* **Synchronization window** \- A brief delay exists between when a file is written and when it appears on the other side. For example, if you upload a file to R2 and then immediately read it from the mounted path in the container, the file may not yet be available. Allow a short window for synchronization to complete before reading recently written data.
* **High-frequency writes** \- Rapid successive writes to the same file path may take slightly longer to fully propagate. For best results, avoid writing to the same file from both R2 and the container at the same time.
* **Bidirectional sync** \- Changes made in the container are synced to R2, and changes made in R2 are synced to the container. Both directions follow the same periodic sync model.

Note

These considerations apply to local development with `wrangler dev` only. In production, bucket mounts use a direct filesystem mount with no synchronization delay.

## Unmount buckets

* [  JavaScript ](#tab-panel-6429)
* [  TypeScript ](#tab-panel-6430)

JavaScript

```

// Mount for processing

await sandbox.mountBucket("my-bucket", "/data", { endpoint: "..." });


// Do work

await sandbox.exec("python process_data.py");


// Clean up

await sandbox.unmountBucket("/data");


```

TypeScript

```

// Mount for processing

await sandbox.mountBucket('my-bucket', '/data', { endpoint: '...' });


// Do work

await sandbox.exec('python process_data.py');


// Clean up

await sandbox.unmountBucket('/data');


```

Automatic cleanup

Mounted buckets are automatically unmounted when the sandbox is destroyed. Manual unmounting is optional.

## Other providers

The SDK supports any S3-compatible object storage. Here are examples for common providers:

### Amazon S3

* [  JavaScript ](#tab-panel-6433)
* [  TypeScript ](#tab-panel-6434)

JavaScript

```

await sandbox.mountBucket("my-s3-bucket", "/data", {

  endpoint: "https://s3.us-west-2.amazonaws.com", // Regional endpoint

  credentials: {

    accessKeyId: env.AWS_ACCESS_KEY_ID,

    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-s3-bucket', '/data', {

  endpoint: 'https://s3.us-west-2.amazonaws.com',  // Regional endpoint

  credentials: {

    accessKeyId: env.AWS_ACCESS_KEY_ID,

    secretAccessKey: env.AWS_SECRET_ACCESS_KEY

  }

});


```

### Google Cloud Storage

* [  JavaScript ](#tab-panel-6437)
* [  TypeScript ](#tab-panel-6438)

JavaScript

```

await sandbox.mountBucket("my-gcs-bucket", "/data", {

  endpoint: "https://storage.googleapis.com",

  credentials: {

    accessKeyId: env.GCS_ACCESS_KEY_ID, // HMAC key

    secretAccessKey: env.GCS_SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-gcs-bucket', '/data', {

  endpoint: 'https://storage.googleapis.com',

  credentials: {

    accessKeyId: env.GCS_ACCESS_KEY_ID,  // HMAC key

    secretAccessKey: env.GCS_SECRET_ACCESS_KEY

  }

});


```

GCS requires HMAC keys

Generate HMAC keys in GCS console under Settings → Interoperability.

### Other S3-compatible providers

For providers like Backblaze B2, MinIO, Wasabi, or others, use the standard mount pattern:

* [  JavaScript ](#tab-panel-6439)
* [  TypeScript ](#tab-panel-6440)

JavaScript

```

await sandbox.mountBucket("my-bucket", "/data", {

  endpoint: "https://s3.us-west-000.backblazeb2.com", // Provider-specific endpoint

  credentials: {

    accessKeyId: env.ACCESS_KEY_ID,

    secretAccessKey: env.SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-bucket', '/data', {

  endpoint: 'https://s3.us-west-000.backblazeb2.com',  // Provider-specific endpoint

  credentials: {

    accessKeyId: env.ACCESS_KEY_ID,

    secretAccessKey: env.SECRET_ACCESS_KEY

  }

});


```

For provider-specific configuration, see the [s3fs-fuse wiki ↗](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Non-Amazon-S3) which documents supported providers and their recommended flags.

## Troubleshooting

### Missing credentials error

**Error**: `MissingCredentialsError: No credentials found`

**Solution**: Set credentials as Worker secrets:

Terminal window

```

npx wrangler secret put R2_ACCESS_KEY_ID

npx wrangler secret put R2_SECRET_ACCESS_KEY


```

or

Terminal window

```

npx wrangler secret put AWS_ACCESS_KEY_ID

npx wrangler secret put AWS_SECRET_ACCESS_KEY


```

### Mount failed error

**Error**: `S3FSMountError: mount failed`

**Common causes**:

* Incorrect endpoint URL
* Invalid credentials
* Bucket doesn't exist
* Network connectivity issues

Verify your endpoint format and credentials:

* [  JavaScript ](#tab-panel-6443)
* [  TypeScript ](#tab-panel-6444)

JavaScript

```

try {

  await sandbox.mountBucket("my-bucket", "/data", {

    endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  });

} catch (error) {

  console.error("Mount failed:", error.message);

  // Check endpoint format, credentials, bucket existence

}


```

TypeScript

```

try {

  await sandbox.mountBucket('my-bucket', '/data', {

    endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com'

  });

} catch (error) {

  console.error('Mount failed:', error.message);

  // Check endpoint format, credentials, bucket existence

}


```

### Path already mounted error

**Error**: `InvalidMountConfigError: Mount path already in use`

**Solution**: Unmount first or use a different path:

* [  JavaScript ](#tab-panel-6441)
* [  TypeScript ](#tab-panel-6442)

JavaScript

```

// Unmount existing

await sandbox.unmountBucket("/data");


// Or use different path

await sandbox.mountBucket("bucket2", "/storage", { endpoint: "..." });


```

TypeScript

```

// Unmount existing

await sandbox.unmountBucket('/data');


// Or use different path

await sandbox.mountBucket('bucket2', '/storage', { endpoint: '...' });


```

### Slow file access

File operations on mounted buckets are slower than local filesystem due to network latency.

**Solution**: Copy frequently accessed files locally:

* [  JavaScript ](#tab-panel-6447)
* [  TypeScript ](#tab-panel-6448)

JavaScript

```

// Copy to local filesystem

await sandbox.exec("cp", {

  args: ["/data/large-dataset.csv", "/workspace/dataset.csv"],

});


// Work with local copy (faster)

await sandbox.exec("python", {

  args: ["process.py", "/workspace/dataset.csv"],

});


// Save results back to bucket

await sandbox.exec("cp", {

  args: ["/workspace/results.json", "/data/results/output.json"],

});


```

TypeScript

```

// Copy to local filesystem

await sandbox.exec('cp', { args: ['/data/large-dataset.csv', '/workspace/dataset.csv'] });


// Work with local copy (faster)

await sandbox.exec('python', { args: ['process.py', '/workspace/dataset.csv'] });


// Save results back to bucket

await sandbox.exec('cp', { args: ['/workspace/results.json', '/data/results/output.json'] });


```

## Best practices

* **Mount early** \- Mount buckets at sandbox initialization
* **Use R2 for Cloudflare** \- Zero egress fees and optimized configuration
* **Secure credentials** \- Always use Worker secrets, never hardcode
* **Read-only when possible** \- Protect data with read-only mounts
* **Use prefixes for isolation** \- Mount subdirectories when working with specific datasets
* **Mount paths** \- Use `/data`, `/storage`, or `/mnt/*` (avoid `/workspace`, `/tmp`)
* **Handle errors** \- Wrap mount operations in `try...catch` blocks
* **Optimize access** \- Copy frequently accessed files locally

## Related resources

* [Persistent storage tutorial](https://developers.cloudflare.com/sandbox/tutorials/persistent-storage/) \- Complete R2 example
* [Storage API reference](https://developers.cloudflare.com/sandbox/api/storage/) \- Full method documentation
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Credential configuration
* [R2 documentation](https://developers.cloudflare.com/r2/) \- Learn about Cloudflare R2
* [Proxy requests to external APIs](https://developers.cloudflare.com/sandbox/guides/proxy-requests/) \- Keep R2 credentials out of the sandbox by proxying requests through a Worker

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/mount-buckets/","name":"Mount buckets"}}]}
```
