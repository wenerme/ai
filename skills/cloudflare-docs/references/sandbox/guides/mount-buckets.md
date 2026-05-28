---
title: Mount buckets
description: Mount S3-compatible object storage as local filesystems for persistent data storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Mount buckets

Mount S3-compatible object storage buckets as local filesystem paths. Access object storage using standard file operations. For Cloudflare R2 in production, you can also mount by Worker R2 binding name so credentials stay in the Worker runtime.

Mounting `/workspace`

Mounting a bucket at `/workspace` or a subpath under it can be confusing in app or project setups. In production, the mount overlays that path instead of merging with files already in the image or template. If you want `/workspace` itself to persist over time, [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/) is often a better fit.

S3-compatible providers

The SDK works with any S3-compatible object storage provider. Examples include Cloudflare R2, Amazon S3, Google Cloud Storage, Backblaze B2, MinIO, and [many others ↗](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Non-Amazon-S3). The SDK automatically detects and optimizes for R2, S3, and GCS.

## Production prerequisites for R2 binding mounts

To mount an R2 bucket in production without passing credentials into the container, add an R2 binding and export `ContainerProxy` from your Worker entrypoint.

* [  wrangler.jsonc ](#tab-panel-8328)
* [  wrangler.toml ](#tab-panel-8329)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "my-r2-bucket"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "my-r2-bucket"


```

* [  JavaScript ](#tab-panel-8332)
* [  TypeScript ](#tab-panel-8333)

JavaScript

```

import { ContainerProxy } from "@cloudflare/sandbox";


export { ContainerProxy };


```

TypeScript

```

import { ContainerProxy } from "@cloudflare/sandbox";


export { ContainerProxy };


```

When you omit `endpoint`, the first argument to `mountBucket()` must be the Worker R2 binding name, such as `MY_BUCKET`.

## When to mount buckets

Mount S3-compatible buckets when you need:

* **Persistent data** \- Data survives sandbox destruction
* **Large datasets** \- Process data without downloading
* **Shared storage** \- Multiple sandboxes access the same data
* **Cost-effective persistence** \- Cheaper than keeping sandboxes alive

## Mount an R2 bucket

* [  JavaScript ](#tab-panel-8342)
* [  TypeScript ](#tab-panel-8343)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "data-processor");


// Mount R2 bucket by Worker binding name

await sandbox.mountBucket("MY_BUCKET", "/data");


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


// Mount R2 bucket by Worker binding name

await sandbox.mountBucket('MY_BUCKET', '/data');


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

In this example, `MY_BUCKET` is the binding name from `wrangler.toml`. It does not have to match the bucket's dashboard name, although many projects use matching names.

Mounting affects entire sandbox

Mounted buckets are visible across all sessions since they share the filesystem. Mount once per sandbox.

## Credentials

R2 binding mounts do not require credentials. Remote endpoint mounts remain supported for Cloudflare R2 and other S3-compatible providers, and those flows can still use automatic credential detection or explicit credentials.

### Automatic detection

When you include an `endpoint`, set credentials as Worker secrets and the SDK automatically detects them:

Terminal window

```

npx wrangler secret put R2_ACCESS_KEY_ID

npx wrangler secret put R2_SECRET_ACCESS_KEY


```

R2 credentials

We also automatically detect `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for compatibility with other S3-compatible providers.

* [  JavaScript ](#tab-panel-8334)
* [  TypeScript ](#tab-panel-8335)

JavaScript

```

// Credentials automatically detected from environment for remote endpoint mounts

await sandbox.mountBucket("my-r2-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

});


```

TypeScript

```

// Credentials automatically detected from environment for remote endpoint mounts

await sandbox.mountBucket('my-r2-bucket', '/data', {

  endpoint: 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com'

});


```

### Explicit credentials

Pass credentials directly when needed:

* [  JavaScript ](#tab-panel-8336)
* [  TypeScript ](#tab-panel-8337)

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

* [  JavaScript ](#tab-panel-8354)
* [  TypeScript ](#tab-panel-8355)

JavaScript

```

// Mount only the /uploads/images/ subdirectory

await sandbox.mountBucket("MY_BUCKET", "/images", {

  prefix: "/uploads/images/",

});


// Files appear at mount point without the prefix

// Bound bucket: my-r2-bucket/uploads/images/photo.jpg

// Mounted path: /images/photo.jpg

await sandbox.exec("ls", { args: ["/images"] });


// Write to subdirectory

await sandbox.writeFile("/images/photo.jpg", imageData);

// Creates my-r2-bucket/uploads/images/photo.jpg


// Mount different prefixes to different paths

await sandbox.mountBucket("MY_BUCKET", "/training-data", {

  prefix: "/ml/training/",

});


await sandbox.mountBucket("MY_BUCKET", "/test-data", {

  prefix: "/ml/testing/",

});


```

TypeScript

```

// Mount only the /uploads/images/ subdirectory

await sandbox.mountBucket('MY_BUCKET', '/images', {

  prefix: '/uploads/images/'

});


// Files appear at mount point without the prefix

// Bound bucket: my-r2-bucket/uploads/images/photo.jpg

// Mounted path: /images/photo.jpg

await sandbox.exec('ls', { args: ['/images'] });


// Write to subdirectory

await sandbox.writeFile('/images/photo.jpg', imageData);

// Creates my-r2-bucket/uploads/images/photo.jpg


// Mount different prefixes to different paths

await sandbox.mountBucket('MY_BUCKET', '/training-data', {

  prefix: '/ml/training/'

});


await sandbox.mountBucket('MY_BUCKET', '/test-data', {

  prefix: '/ml/testing/'

});


```

Prefix format

The `prefix` must start with `/` (for example, `/data` or `/logs/2024/`).

## Read-only mounts

Protect data by mounting buckets in read-only mode:

* [  JavaScript ](#tab-panel-8338)
* [  TypeScript ](#tab-panel-8339)

JavaScript

```

await sandbox.mountBucket("MY_BUCKET", "/data", {

  readOnly: true,

});


// Reads work

await sandbox.exec("cat", { args: ["/data/dataset.csv"] });


// Writes fail

await sandbox.writeFile("/data/new-file.txt", "data"); // Error: Read-only filesystem


```

TypeScript

```

await sandbox.mountBucket('MY_BUCKET', '/data', {

  readOnly: true

});


// Reads work

await sandbox.exec('cat', { args: ['/data/dataset.csv'] });


// Writes fail

await sandbox.writeFile('/data/new-file.txt', 'data');  // Error: Read-only filesystem


```

## Local development

You can also mount R2 buckets during local development with `wrangler dev` by passing the `localBucket` option. Production R2 binding mounts and local `localBucket` mounts both avoid explicit credentials, but they are different execution paths. Production uses credential-less egress interception and overlays the target path. Local development uses periodic synchronization with the R2 binding.

* [  JavaScript ](#tab-panel-8340)
* [  TypeScript ](#tab-panel-8341)

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

const mountOptions = env.LOCAL_DEV ? { localBucket: true } : {};


await sandbox.mountBucket('MY_BUCKET', '/data', mountOptions);


```

When `localBucket` is `true`, the SDK uses local R2 binding synchronization. When `localBucket` is `false` or omitted and `endpoint` is also omitted, the SDK uses the production R2 binding mount path. For more information on setting environment variables, refer to [Environment variables in Wrangler configuration](https://developers.cloudflare.com/workers/configuration/environment-variables/).

The `readOnly` and `prefix` options work the same way in local mode:

* [  JavaScript ](#tab-panel-8346)
* [  TypeScript ](#tab-panel-8347)

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

These considerations apply to local development with `wrangler dev` only. In production, bucket mounts use a direct filesystem mount with no synchronization delay. Local sync-style behavior may not fully reflect how a production mount overlays the target path.

## Unmount buckets

* [  JavaScript ](#tab-panel-8344)
* [  TypeScript ](#tab-panel-8345)

JavaScript

```

// Mount for processing

await sandbox.mountBucket("MY_BUCKET", "/data");


// Do work

await sandbox.exec("python process_data.py");


// Clean up

await sandbox.unmountBucket("/data");


```

TypeScript

```

// Mount for processing

await sandbox.mountBucket('MY_BUCKET', '/data');


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

* [  JavaScript ](#tab-panel-8348)
* [  TypeScript ](#tab-panel-8349)

JavaScript

```

await sandbox.mountBucket("my-s3-bucket", "/data", {

  endpoint: "https://s3.us-west-2.amazonaws.com",

  credentials: {

    accessKeyId: env.AWS_ACCESS_KEY_ID,

    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-s3-bucket', '/data', {

  endpoint: 'https://s3.us-west-2.amazonaws.com',

  credentials: {

    accessKeyId: env.AWS_ACCESS_KEY_ID,

    secretAccessKey: env.AWS_SECRET_ACCESS_KEY

  }

});


```

### Google Cloud Storage

* [  JavaScript ](#tab-panel-8350)
* [  TypeScript ](#tab-panel-8351)

JavaScript

```

await sandbox.mountBucket("my-gcs-bucket", "/data", {

  endpoint: "https://storage.googleapis.com",

  credentials: {

    accessKeyId: env.GCS_ACCESS_KEY_ID,

    secretAccessKey: env.GCS_SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-gcs-bucket', '/data', {

  endpoint: 'https://storage.googleapis.com',

  credentials: {

    accessKeyId: env.GCS_ACCESS_KEY_ID,

    secretAccessKey: env.GCS_SECRET_ACCESS_KEY

  }

});


```

GCS requires HMAC keys

Generate HMAC keys in GCS console under **Settings** \> **Interoperability**.

### Other S3-compatible providers

For providers like Backblaze B2, MinIO, Wasabi, or others, use the standard mount pattern:

* [  JavaScript ](#tab-panel-8352)
* [  TypeScript ](#tab-panel-8353)

JavaScript

```

await sandbox.mountBucket("my-bucket", "/data", {

  endpoint: "https://s3.us-west-000.backblazeb2.com",

  credentials: {

    accessKeyId: env.ACCESS_KEY_ID,

    secretAccessKey: env.SECRET_ACCESS_KEY,

  },

});


```

TypeScript

```

await sandbox.mountBucket('my-bucket', '/data', {

  endpoint: 'https://s3.us-west-000.backblazeb2.com',

  credentials: {

    accessKeyId: env.ACCESS_KEY_ID,

    secretAccessKey: env.SECRET_ACCESS_KEY

  }

});


```

For provider-specific configuration, see the [s3fs-fuse wiki ↗](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Non-Amazon-S3) for supported providers and recommended flags.

## Troubleshooting

### R2 binding not found error

**Error**: `R2 binding "MY_BUCKET" not found in Worker env`

**Solution**: Ensure your Worker has an `r2_buckets` binding and that `mountBucket()` uses the binding name, not the bucket's dashboard name:

* [  wrangler.jsonc ](#tab-panel-8330)
* [  wrangler.toml ](#tab-panel-8331)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "my-r2-bucket"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "my-r2-bucket"


```

### Credential-less R2 mount fails immediately

**Solution**: Ensure your Worker entrypoint exports `ContainerProxy`. If you are using an older Wrangler version, you may also need the `enable_ctx_exports` compatibility flag.

### Missing credentials error

**Error**: `MissingCredentialsError: No credentials found`

**Solution**: This error only applies when you mount a remote S3-compatible endpoint by setting `endpoint`. Set credentials as Worker secrets:

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
* Missing `ContainerProxy` export, or on older Wrangler versions missing `enable_ctx_exports`
* Bucket does not exist
* Network connectivity issues

Verify your binding or endpoint configuration:

* [  JavaScript ](#tab-panel-8356)
* [  TypeScript ](#tab-panel-8357)

JavaScript

```

try {

  await sandbox.mountBucket("MY_BUCKET", "/data");

} catch (error) {

  console.error("Mount failed:", error.message);

  // Check binding name, ContainerProxy export, or remote endpoint configuration

}


```

TypeScript

```

try {

  await sandbox.mountBucket('MY_BUCKET', '/data');

} catch (error) {

  console.error('Mount failed:', error.message);

  // Check binding name, ContainerProxy export, or remote endpoint configuration

}


```

### Path already mounted error

**Error**: `InvalidMountConfigError: Mount path already in use`

**Solution**: Unmount first or use a different path:

* [  JavaScript ](#tab-panel-8358)
* [  TypeScript ](#tab-panel-8359)

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

* [  JavaScript ](#tab-panel-8360)
* [  TypeScript ](#tab-panel-8361)

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
* **Choose the right mount mode** \- Use R2 binding mounts when you want Worker-managed R2 access, or use `endpoint` for explicit R2, S3, GCS, and other S3-compatible providers
* **Secure credentials** \- Always use Worker secrets, never hardcode
* **Read-only when possible** \- Protect data with read-only mounts
* **Mount the narrowest path** \- Use prefixes to expose only the data a sandbox needs
* **Mount paths** \- Prefer `/data`, `/storage`, or `/mnt/*`; if you mount under `/workspace`, account for the mount overlaying that path in production
* **Handle errors** \- Wrap mount operations in `try...catch` blocks
* **Optimize access** \- Copy frequently accessed files locally

## Related resources

* [Persistent storage tutorial](https://developers.cloudflare.com/sandbox/tutorials/persistent-storage/) \- Complete R2 example
* [Storage API reference](https://developers.cloudflare.com/sandbox/api/storage/) \- Full method documentation
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Credential configuration for remote endpoint mounts
* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Configure R2 bindings and compatibility flags
* [R2 documentation](https://developers.cloudflare.com/r2/) \- Learn about Cloudflare R2
* [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) \- Learn how `ContainerProxy` and outbound interception work

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/mount-buckets/","name":"Mount buckets"}}]}
```
