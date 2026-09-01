---
description: Snapshot a sandbox directory to R2 and restore it later.
title: Backup and restore
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Backup and restore

Last updated Sep 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/guides/backup-restore/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to snapshot a sandbox directory to R2 and restore it later.

Use backup and restore when a project directory such as `/workspace` should come back after the sandbox sleeps. For a separate persisted storage path, mount a bucket instead. If you mount a bucket over `/workspace`, the mount overlays files seeded by your image in production.

For why production restore uses an overlay, refer to [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/).

## Prerequisites

1. Create an R2 bucket:
```sh
npx wrangler r2 bucket create my-backup-bucket
```
2. Add the `BACKUP_BUCKET` R2 binding and presigned URL settings to your Wrangler configuration:
```jsonc
{
	"name": "my-sandbox-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-09-01",
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
name = "my-sandbox-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-01"
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
[vars]
BACKUP_BUCKET_NAME = "my-backup-bucket"
CLOUDFLARE_ACCOUNT_ID = "<YOUR_ACCOUNT_ID>"
[[r2_buckets]]
binding = "BACKUP_BUCKET"
bucket_name = "my-backup-bucket"
```
If the bucket uses a jurisdiction-specific endpoint, add `BACKUP_BUCKET_ENDPOINT` to `vars`. For an EU bucket, use `https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com`.
3. Store R2 API credentials as secrets:
```sh
npx wrangler secret put R2_ACCESS_KEY_ID
npx wrangler secret put R2_SECRET_ACCESS_KEY
```
Create the token in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **R2** \> **Overview** \> **Manage R2 API Tokens**. Grant **Object Read & Write** on the backup bucket.

Note

The `vars` and API secrets in steps 2 and 3 are required for production. For `wrangler dev`, only the `BACKUP_BUCKET` binding is required. Refer to [Use backup and restore in local development](#use-backup-and-restore-in-local-development).

## Create a backup

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
```

The directory must be an absolute path under `/workspace`, `/home`, `/tmp`, `/var/tmp`, or `/app`.

## Restore a backup

Stop processes that write to the target directory, then restore:

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
const result = await sandbox.restoreBackup(backup);
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
const result = await sandbox.restoreBackup(backup);
```

In production, restore mounts a copy-on-write overlay. The mount is lost when the sandbox sleeps or the container restarts. Restore again from the stored handle.

The restore target is `backup.dir`. You can point that field at a different allowed directory than the one you originally backed up.

## Exclude generated caches

After a production restore, renaming a directory inside the restored tree can fail with `EXDEV` (`cross-device link not permitted`). Omit disposable generated directories from the backup, or delete them after restore. Vite's cache is one such directory:

```js
const backup = await sandbox.createBackup({
	dir: "/workspace/app",
	excludes: ["node_modules/.vite"],
});
```

```ts
const backup = await sandbox.createBackup({
	dir: "/workspace/app",
	excludes: ["node_modules/.vite"],
});
```

```js
await sandbox.restoreBackup(backup);
await sandbox.exec("rm -rf /workspace/app/node_modules/.vite");
```

```ts
await sandbox.restoreBackup(backup);
await sandbox.exec("rm -rf /workspace/app/node_modules/.vite");
```

This failure does not occur in `wrangler dev`, which extracts the archive. For overlay restore, refer to [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/).

## Exclude gitignored files

To skip `.gitignore` matches such as `node_modules/` or `dist/` in a git repository:

```js
const backup = await sandbox.createBackup({
	dir: "/workspace",
	gitignore: true,
});
```

```ts
const backup = await sandbox.createBackup({
	dir: "/workspace",
	gitignore: true,
});
```

If the directory is not inside a git repository, `gitignore` has no effect. If `git` is not installed in the container, the SDK logs a warning and continues without git-based exclusions. Nested `.gitignore` files apply.

## Checkpoint and roll back

```js
const sandbox = getSandbox(env.Sandbox, "my-sandbox");
const checkpoint = await sandbox.createBackup({ dir: "/workspace" });

try {
	await sandbox.exec("npm install some-experimental-package");
	await sandbox.exec("npm run build");
} catch (error) {
	await sandbox.restoreBackup(checkpoint);
}
```

```ts
const sandbox = getSandbox(env.Sandbox, "my-sandbox");
const checkpoint = await sandbox.createBackup({ dir: "/workspace" });

try {
	await sandbox.exec("npm install some-experimental-package");
	await sandbox.exec("npm run build");
} catch (error) {
	await sandbox.restoreBackup(checkpoint);
}
```

## Store backup handles

`DirectoryBackup` is serializable. Persist it to KV, D1, or Durable Object storage:

```js
const backup = await sandbox.createBackup({
	dir: "/workspace",
	name: "deploy-v2",
	ttl: 604800, // 7 days
});

await env.KV.put(`backup:${userId}`, JSON.stringify(backup));

const stored = await env.KV.get(`backup:${userId}`);
if (stored) {
	await sandbox.restoreBackup(JSON.parse(stored));
}
```

```ts
const backup = await sandbox.createBackup({
	dir: "/workspace",
	name: "deploy-v2",
	ttl: 604800, // 7 days
});

await env.KV.put(`backup:${userId}`, JSON.stringify(backup));

const stored = await env.KV.get(`backup:${userId}`);
if (stored) {
	await sandbox.restoreBackup(JSON.parse(stored));
}
```

## Set a name and TTL

Names can be up to 256 characters. The default TTL is 3 days (`259200` seconds). The SDK rejects an expired backup at restore time. It does not delete the R2 objects.

```js
const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const shortBackup = await sandbox.createBackup({
	dir: "/workspace",
	ttl: 600, // 10 minutes
});

const longBackup = await sandbox.createBackup({
	dir: "/workspace",
	name: "daily-snapshot",
	ttl: 604800, // 7 days
});
```

```ts
const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const shortBackup = await sandbox.createBackup({
	dir: "/workspace",
	ttl: 600, // 10 minutes
});

const longBackup = await sandbox.createBackup({
	dir: "/workspace",
	name: "daily-snapshot",
	ttl: 604800, // 7 days
});
```

To delete expired objects automatically, add an [R2 object lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) on the `backups/` prefix. If your longest TTL is 7 days, expire objects older than 7 days.

## Clean up backup objects

Archives live at `backups/{backupId}/data.sqsh` and `backups/{backupId}/meta.json`.

### Replace the latest backup

```js
if (previousBackup) {
	await env.BACKUP_BUCKET.delete([
		`backups/${previousBackup.id}/data.sqsh`,
		`backups/${previousBackup.id}/meta.json`,
	]);
}

const backup = await sandbox.createBackup({
	dir: "/workspace",
	name: "latest",
});
await env.KV.put("latest-backup", JSON.stringify(backup));
```

```ts
if (previousBackup) {
	await env.BACKUP_BUCKET.delete([
		`backups/${previousBackup.id}/data.sqsh`,
		`backups/${previousBackup.id}/meta.json`,
	]);
}

const backup = await sandbox.createBackup({
	dir: "/workspace",
	name: "latest",
});
await env.KV.put("latest-backup", JSON.stringify(backup));
```

### Delete a backup by ID

```js
await env.BACKUP_BUCKET.delete([
	`backups/${backup.id}/data.sqsh`,
	`backups/${backup.id}/meta.json`,
]);
```

```ts
await env.BACKUP_BUCKET.delete([
	`backups/${backup.id}/data.sqsh`,
	`backups/${backup.id}/meta.json`,
]);
```

### Delete backups by age

List objects under `backups/` and delete by upload time:

```js
const listed = await env.BACKUP_BUCKET.list({ prefix: "backups/" });
const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

for (const object of listed.objects) {
	const ageMs = Date.now() - object.uploaded.getTime();
	if (ageMs > sevenDaysMs) {
		await env.BACKUP_BUCKET.delete(object.key);
	}
}
```

```ts
const listed = await env.BACKUP_BUCKET.list({ prefix: "backups/" });
const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

for (const object of listed.objects) {
	const ageMs = Date.now() - object.uploaded.getTime();
	if (ageMs > sevenDaysMs) {
		await env.BACKUP_BUCKET.delete(object.key);
	}
}
```

## Use backup and restore in local development

Pass `localBucket: true` so `wrangler dev` uses the `BACKUP_BUCKET` binding. Presigned URL credentials are not required.

```js
const backup = await sandbox.createBackup({
	dir: "/workspace",
	localBucket: Boolean(env.LOCAL_DEV),
});

const result = await sandbox.restoreBackup(backup);
```

```ts
const backup = await sandbox.createBackup({
	dir: "/workspace",
	localBucket: Boolean(env.LOCAL_DEV),
});

const result = await sandbox.restoreBackup(backup);
```

Local restore extracts the archive with `unsquashfs` and replaces the directory. The stored handle's `localBucket` field selects the restore path.

## Fix path permissions

`createBackup()` must read every file under the target directory. Files with mode `0600` or directories owned by another user cause `BackupCreateError`.

Set permissions in the image when you can. `a+rX` adds read permission on files and execute permission on directories:

```dockerfile
RUN mkdir -p /home/sandbox && chmod -R a+rX /home/sandbox
```

If a process creates restrictive files at runtime, fix them before the backup:

```ts
await sandbox.exec("chmod -R a+rX /home/sandbox/.claude");
const backup = await sandbox.createBackup({ dir: "/home/sandbox" });
```

## Handle errors

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

try {
	const backup = await sandbox.createBackup({ dir: "/workspace" });
} catch (error) {
	if (error.code === "INVALID_BACKUP_CONFIG") {
		console.error("Configuration error:", error.message);
	} else if (error.code === "BACKUP_CREATE_FAILED") {
		console.error("Backup failed:", error.message);
	}
}

try {
	await sandbox.restoreBackup(backup);
} catch (error) {
	if (error.code === "BACKUP_NOT_FOUND") {
		console.error("Backup not found in R2:", error.message);
	} else if (error.code === "BACKUP_EXPIRED") {
		console.error("Backup TTL has elapsed:", error.message);
	} else if (error.code === "BACKUP_RESTORE_FAILED") {
		console.error("Restore failed:", error.message);
	}
}
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

try {
	const backup = await sandbox.createBackup({ dir: "/workspace" });
} catch (error) {
	if (error.code === "INVALID_BACKUP_CONFIG") {
		console.error("Configuration error:", error.message);
	} else if (error.code === "BACKUP_CREATE_FAILED") {
		console.error("Backup failed:", error.message);
	}
}

try {
	await sandbox.restoreBackup(backup);
} catch (error) {
	if (error.code === "BACKUP_NOT_FOUND") {
		console.error("Backup not found in R2:", error.message);
	} else if (error.code === "BACKUP_EXPIRED") {
		console.error("Backup TTL has elapsed:", error.message);
	} else if (error.code === "BACKUP_RESTORE_FAILED") {
		console.error("Restore failed:", error.message);
	}
}
```

## Related resources

* [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/) \- Overlay restore, local extract, and `EXDEV`
* [Backups API](https://developers.cloudflare.com/sandbox/api/backups/) \- Methods, options, and types
* [Storage API](https://developers.cloudflare.com/sandbox/api/storage/) \- Mount S3-compatible buckets
* [R2 documentation](https://developers.cloudflare.com/r2/) \- R2 buckets and credentials
* [R2 lifecycle rules](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) \- Automatic object cleanup

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/backup-restore/#page","headline":"Backup and restore · Cloudflare Sandbox SDK docs","description":"Snapshot a sandbox directory to R2 and restore it later.","url":"https://developers.cloudflare.com/sandbox/guides/backup-restore/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
