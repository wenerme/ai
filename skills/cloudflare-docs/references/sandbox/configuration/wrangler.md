---
title: Wrangler configuration
description: The minimum required configuration for using Sandbox SDK:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/configuration/wrangler.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Wrangler configuration

## Minimal configuration

The minimum required configuration for using Sandbox SDK:

* [  wrangler.jsonc ](#tab-panel-6221)
* [  wrangler.toml ](#tab-panel-6222)

```

{

  "name": "my-sandbox-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-02",

  "compatibility_flags": ["nodejs_compat"],

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Sandbox",

        "name": "Sandbox",

      },

    ],

  },

  "migrations": [

    {

      "new_sqlite_classes": ["Sandbox"],

      "tag": "v1",

    },

  ],

}


```

```

name = "my-sandbox-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-02"

compatibility_flags = [ "nodejs_compat" ]


[[containers]]

class_name = "Sandbox"

image = "./Dockerfile"


[[durable_objects.bindings]]

class_name = "Sandbox"

name = "Sandbox"


[[migrations]]

new_sqlite_classes = [ "Sandbox" ]

tag = "v1"


```

## Required settings

The Sandbox SDK is built on Cloudflare Containers. Your configuration requires three sections:

1. **containers** \- Define the container image (your runtime environment)
2. **durable\_objects.bindings** \- Bind the Sandbox Durable Object to your Worker
3. **migrations** \- Initialize the Durable Object class

The minimal configuration shown above includes all required settings. For detailed configuration options, refer to the [Containers configuration documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#containers).

## Backup storage

To use the [backup and restore API](https://developers.cloudflare.com/sandbox/api/backups/), you need an R2 bucket binding and presigned URL credentials. The container uploads and downloads backup archives directly to/from R2 using presigned URLs, which requires R2 API token credentials.

### 1\. Create the R2 bucket

Terminal window

```

npx wrangler r2 bucket create my-backup-bucket


```

### 2\. Add the binding and environment variables

* [  wrangler.jsonc ](#tab-panel-6215)
* [  wrangler.toml ](#tab-panel-6216)

```

{

  "vars": {

    "BACKUP_BUCKET_NAME": "my-backup-bucket",

    "CLOUDFLARE_ACCOUNT_ID": "<YOUR_ACCOUNT_ID>",

  },

  "r2_buckets": [

    {

      "binding": "BACKUP_BUCKET",

      "bucket_name": "my-backup-bucket",

    },

  ],

}


```

```

[vars]

BACKUP_BUCKET_NAME = "my-backup-bucket"

CLOUDFLARE_ACCOUNT_ID = "<YOUR_ACCOUNT_ID>"


[[r2_buckets]]

binding = "BACKUP_BUCKET"

bucket_name = "my-backup-bucket"


```

### 3\. Set R2 API credentials as secrets

Terminal window

```

npx wrangler secret put R2_ACCESS_KEY_ID

npx wrangler secret put R2_SECRET_ACCESS_KEY


```

Create an R2 API token in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **R2** \> **Overview** \> **Manage R2 API Tokens**. The token needs **Object Read & Write** permissions for your backup bucket.

The SDK uses these credentials to generate presigned URLs that allow the container to transfer backup archives directly to and from R2\. For a complete setup walkthrough, refer to the [backup and restore guide](https://developers.cloudflare.com/sandbox/guides/backup-restore/).

## Troubleshooting

### Binding not found

**Error**: `TypeError: env.Sandbox is undefined`

**Solution**: Ensure your `wrangler.jsonc` includes the Durable Objects binding:

* [  wrangler.jsonc ](#tab-panel-6217)
* [  wrangler.toml ](#tab-panel-6218)

```

{

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Sandbox",

        "name": "Sandbox",

      },

    ],

  },

}


```

```

[[durable_objects.bindings]]

class_name = "Sandbox"

name = "Sandbox"


```

### Missing migrations

**Error**: Durable Object not initialized

**Solution**: Add migrations for the Sandbox class:

* [  wrangler.jsonc ](#tab-panel-6219)
* [  wrangler.toml ](#tab-panel-6220)

```

{

  "migrations": [

    {

      "new_sqlite_classes": ["Sandbox"],

      "tag": "v1",

    },

  ],

}


```

```

[[migrations]]

new_sqlite_classes = [ "Sandbox" ]

tag = "v1"


```

## Related resources

* [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) \- Configure HTTP vs WebSocket transport
* [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/) \- Complete Wrangler reference
* [Durable Objects setup](https://developers.cloudflare.com/durable-objects/get-started/) \- DO-specific configuration
* [Dockerfile reference](https://developers.cloudflare.com/sandbox/configuration/dockerfile/) \- Custom container images
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Passing configuration to sandboxes
* [Get Started guide](https://developers.cloudflare.com/sandbox/get-started/) \- Initial setup walkthrough

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/configuration/wrangler/","name":"Wrangler configuration"}}]}
```
