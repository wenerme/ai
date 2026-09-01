---
description: Create and restore point-in-time snapshots of sandbox directories.
title: Backups
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Backups

Last updated Sep 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/api/backups/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Create point-in-time snapshots of sandbox directories and restore them from R2.

For setup, restore workflows, and generated-cache exclusions, refer to [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/). For overlay semantics, refer to [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/).

## Methods

### `createBackup()`

Create a snapshot of a directory and upload it to R2.

```ts
await sandbox.createBackup(options: BackupOptions): Promise<DirectoryBackup>
```

**Parameters**:

* `options` \- Backup configuration (see [BackupOptions](#backupoptions)):
  * `dir` (required) - Absolute path to back up. Must be under `/workspace`, `/home`, `/tmp`, `/var/tmp`, or `/app`.
  * `name` (optional) - Human-readable name. Maximum 256 characters. Control characters are rejected.
  * `ttl` (optional) - Time-to-live in seconds. Default: `259200` (3 days). Must be a positive number.
  * `gitignore` (optional) - When `true`, exclude paths matching `.gitignore` rules if `dir` is inside a git repository. Default: `false`. If the directory is not in a git repository, no git exclusions apply. If `git` is not installed, the SDK logs a warning and continues without git-based exclusions.
  * `excludes` (optional) - Glob patterns to omit from the archive. Passed to `mksquashfs` as wildcard excludes. `**` globstars are normalized automatically. Default: `[]`.
  * `localBucket` (optional) - When `true`, use the `BACKUP_BUCKET` R2 binding instead of presigned URLs. Intended for `wrangler dev`. Default: `false`.
  * `compression` (optional) - Archive compression. Default format: `lz4`. Default threads: `8`. Format must be `gzip`, `lz4`, or `zstd`. `threads` must be a positive integer.
  * `multipart` (optional) - Use parallel multipart upload for large archives. Default: `true`.

**Returns**: `Promise<DirectoryBackup>` containing:

* `id` \- Unique backup identifier (UUID)
* `dir` \- Directory that was backed up
* `localBucket` (optional) - Whether the backup used local R2 binding mode

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
await sandbox.restoreBackup(backup);
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

const backup = await sandbox.createBackup({ dir: "/workspace" });
await sandbox.restoreBackup(backup);
```

**How it works**:

In production:

1. The container creates a compressed squashfs archive.
2. The container uploads the archive to R2 with a presigned URL.
3. Metadata is stored alongside the archive in R2.
4. The local archive is deleted.

With `localBucket: true`:

1. The container creates a compressed squashfs archive.
2. The archive is uploaded through the `BACKUP_BUCKET` R2 binding.
3. Metadata is stored alongside the archive in R2.
4. The local archive is deleted.

**Throws**:

* `InvalidBackupConfigError` \- If `dir` is not an allowed absolute path, the `BACKUP_BUCKET` binding is missing, or (in production) R2 presigned URL credentials are not configured
* `BackupCreateError` \- If archive creation or the upload to R2 fails

R2 binding required

Configure a `BACKUP_BUCKET` R2 binding in `wrangler.jsonc` before using backup methods. Production also requires `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_ACCOUNT_ID`, and `BACKUP_BUCKET_NAME`. Refer to [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/#prerequisites).

Path permissions

`mksquashfs` must read every file and subdirectory in `dir`. Restrictive permissions fail with `BackupCreateError`. Refer to [Fix path permissions](https://developers.cloudflare.com/sandbox/guides/backup-restore/#fix-path-permissions).

Partial writes

Partially written files may not be captured consistently. Completed writes are included.

---

### `restoreBackup()`

Restore a previously created backup.

```ts
await sandbox.restoreBackup(backup: DirectoryBackup): Promise<RestoreBackupResult>
```

**Parameters**:

* `backup` \- Handle returned by `createBackup()`. Contains `id` and `dir`. Restore writes into `backup.dir`, which may differ from the original backup path. (see [DirectoryBackup](#directorybackup))

**Returns**: `Promise<RestoreBackupResult>` containing:

* `success` \- Whether the restore succeeded
* `dir` \- Directory that was restored
* `id` \- Backup ID that was restored

```js
await sandbox.restoreBackup(backup);
```

```ts
await sandbox.restoreBackup(backup);
```

**How it works**:

In production:

1. Metadata is downloaded from R2 and the TTL is checked, with a 60-second buffer. An expired backup throws.
2. The container downloads the archive from R2 with a presigned URL.
3. The container mounts the archive with FUSE overlayfs.

With `localBucket: true`:

1. Metadata is downloaded from the `BACKUP_BUCKET` binding and the TTL is checked.
2. The archive is downloaded from the R2 binding.
3. The archive is extracted with `unsquashfs`.

**Throws**:

* `InvalidBackupConfigError` \- If `backup.id` is missing or not a UUID, or `backup.dir` is invalid
* `BackupNotFoundError` \- If the metadata or archive is not in R2
* `BackupExpiredError` \- If the TTL has elapsed
* `BackupRestoreError` \- If the container fails to restore

Copy-on-write

In production, the backup is a read-only lower layer and new writes go to a writable upper layer. In local development, the directory is replaced. For overlay constraints, refer to [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/).

Ephemeral mount

In production, the FUSE mount is lost when the sandbox sleeps or restarts. Restore again from the handle. Stop processes that write to the target directory before restoring.

## Behavior

* Concurrent backup and restore operations on the same sandbox are serialized.
* `DirectoryBackup` is serializable. Store it in KV, D1, or Durable Object storage.
* Overlapping backups are independent. Restoring a parent directory overwrites subdirectory mounts. Restore the parent first when restoring both.
* `ttl` is enforced at restore time only. Expired objects remain in R2 until you delete them or an [R2 lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) removes them.
* Backup objects use `backups/{id}/data.sqsh` and `backups/{id}/meta.json`.

## Types

### `BackupOptions`

```ts
interface BackupCompressionOptions {
	format?: "gzip" | "lz4" | "zstd";
	threads?: number;
}

interface BackupOptions {
	dir: string;
	name?: string;
	ttl?: number;
	gitignore?: boolean;
	excludes?: string[];
	localBucket?: boolean;
	compression?: BackupCompressionOptions;
	multipart?: boolean;
}
```

**Fields**:

* `dir` (required) - Absolute path under `/workspace`, `/home`, `/tmp`, `/var/tmp`, or `/app`
* `name` (optional) - Human-readable name. Maximum 256 characters. No control characters.
* `ttl` (optional) - Time-to-live in seconds. Default: `259200` (3 days). Must be a positive number.
* `gitignore` (optional) - When `true`, exclude `.gitignore` matches if `dir` is inside a git repository. Default: `false`.
* `excludes` (optional) - Glob patterns to omit. Example: `['node_modules/.cache', '*.log']`. Refer to [Exclude generated caches](https://developers.cloudflare.com/sandbox/guides/backup-restore/#exclude-generated-caches).
* `localBucket` (optional) - Use the `BACKUP_BUCKET` binding instead of presigned URLs. Default: `false`.
* `compression` (optional) - `format` defaults to `lz4`. `threads` defaults to `8`.
* `multipart` (optional) - Parallel multipart upload. Default: `true`.

### `DirectoryBackup`

```ts
interface DirectoryBackup {
	readonly id: string;
	readonly dir: string;
	readonly localBucket?: boolean;
}
```

**Fields**:

* `id` \- Unique backup identifier (UUID)
* `dir` \- Directory to restore into
* `localBucket` (optional) - Whether the backup used local R2 binding mode

### `RestoreBackupResult`

```ts
interface RestoreBackupResult {
	success: boolean;
	dir: string;
	id: string;
}
```

**Fields**:

* `success` \- Whether the restore succeeded
* `dir` \- Directory that was restored
* `id` \- Backup ID that was restored

## Related resources

* [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/) \- Setup and restore workflows
* [Directory backups](https://developers.cloudflare.com/sandbox/concepts/backup-restore/) \- Overlay restore and `EXDEV`
* [Storage API](https://developers.cloudflare.com/sandbox/api/storage/) \- Mount S3-compatible buckets
* [Files API](https://developers.cloudflare.com/sandbox/api/files/) \- Read and write files
* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Configure bindings

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/backups/#page","headline":"Backups · Cloudflare Sandbox SDK docs","description":"Create and restore point-in-time snapshots of sandbox directories.","url":"https://developers.cloudflare.com/sandbox/api/backups/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
