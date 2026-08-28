---
description: Set up Wrangler bindings, Durable Objects, and container settings for Sandbox SDK.
title: Wrangler configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler configuration

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/configuration/wrangler/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Minimal configuration

The minimum required configuration for using Sandbox SDK:

```jsonc
{
	"name": "my-sandbox-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-08-28",
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

```toml
name = "my-sandbox-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-28"
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

```sh
npx wrangler r2 bucket create my-backup-bucket
```

### 2\. Add the binding and environment variables

```jsonc
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

```toml
[vars]
BACKUP_BUCKET_NAME = "my-backup-bucket"
CLOUDFLARE_ACCOUNT_ID = "<YOUR_ACCOUNT_ID>"

[[r2_buckets]]
binding = "BACKUP_BUCKET"
bucket_name = "my-backup-bucket"
```

### 3\. Set R2 API credentials as secrets

```sh
npx wrangler secret put R2_ACCESS_KEY_ID
npx wrangler secret put R2_SECRET_ACCESS_KEY
```

Create an R2 API token in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **R2** \> **Overview** \> **Manage R2 API Tokens**. The token needs **Object Read & Write** permissions for your backup bucket.

The SDK uses these credentials to generate presigned URLs that allow the container to transfer backup archives directly to and from R2\. For a complete setup walkthrough, refer to the [backup and restore guide](https://developers.cloudflare.com/sandbox/guides/backup-restore/).

## Troubleshooting

### Binding not found

**Error**: `TypeError: env.Sandbox is undefined`

**Solution**: Ensure your `wrangler.jsonc` includes the Durable Objects binding:

```jsonc
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

```toml
[[durable_objects.bindings]]
class_name = "Sandbox"
name = "Sandbox"
```

### Missing migrations

**Error**: Durable Object not initialized

**Solution**: Add migrations for the Sandbox class:

```jsonc
{
	"migrations": [
		{
			"new_sqlite_classes": ["Sandbox"],
			"tag": "v1",
		},
	],
}
```

```toml
[[migrations]]
new_sqlite_classes = [ "Sandbox" ]
tag = "v1"
```

## Related resources

* [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/) \- Deploy and keep package and image aligned
* [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/) \- Containers deploy path
* [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) \- Configure HTTP, WebSocket, and RPC transport
* [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/) \- Complete Wrangler reference
* [Durable Objects setup](https://developers.cloudflare.com/durable-objects/get-started/) \- DO-specific configuration
* [Dockerfile reference](https://developers.cloudflare.com/sandbox/configuration/dockerfile/) \- Custom container images
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) \- Passing configuration to sandboxes
* [Get Started guide](https://developers.cloudflare.com/sandbox/get-started/) \- Initial setup walkthrough

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/configuration/wrangler/#page","headline":"Wrangler configuration · Cloudflare Sandbox SDK docs","description":"Set up Wrangler bindings, Durable Objects, and container settings for Sandbox SDK.","url":"https://developers.cloudflare.com/sandbox/configuration/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
