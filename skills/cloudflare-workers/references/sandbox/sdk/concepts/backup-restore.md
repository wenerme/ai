---
description: Sandbox SDK 0.x restores a directory backup as a copy-on-write overlay in production and by extracting the archive in local development.
title: Directory backups
image: https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/og.png?v=8c9073e99248bf35
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Directory backups

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This page documents Sandbox SDK 0.x for existing applications. For new applications, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/). To move an existing application to `@cloudflare/sandbox` 1.0, refer to [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

Backup and restore snapshot a sandbox directory into an R2 archive, then bring that tree back later. The public API is the same in production and in `wrangler dev`. The restore mechanism is not.

Use backups when you want a project directory such as `/workspace` to return later. Use [bucket mounts](https://developers.cloudflare.com/sandbox/sdk/guides/mount-buckets/) when a separate storage path such as `/data` should persist independently of the sandbox filesystem.

## Production restore

In production, `restoreBackup()` mounts the squashfs archive with FUSE overlayfs:

- The backup is a read-only lower layer.
- New writes go to a writable upper layer.
- The original archive in R2 does not change.
- Restoring the same handle again discards the upper layer.

The overlay exists only while the container is running. When the sandbox sleeps or the container restarts, the mount is gone and the directory is empty. Store the `DirectoryBackup` handle and restore again.

## Local restore

With `localBucket: true`, `wrangler dev` extracts the archive with `unsquashfs`. The target directory is replaced. There is no overlay, so local restore does not reproduce production FUSE behavior.

## Cross-device renames

Overlayfs treats the lower and upper layers as different devices. A rename that moves a directory from the restored lower layer into the writable upper layer can fail with `EXDEV` (`cross-device link not permitted`).

Vite does this with `node_modules/.vite/deps`. Omit that directory from the backup, or delete it after restore.

For the procedure, refer to [Exclude generated caches](https://developers.cloudflare.com/sandbox/sdk/guides/backup-restore/#exclude-generated-caches).

## Related resources

- [Backup and restore](https://developers.cloudflare.com/sandbox/sdk/guides/backup-restore/) - Create, restore, and exclude caches
- [Backups API](https://developers.cloudflare.com/sandbox/sdk/api/backups/) - Method signatures and options
- [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/sdk/concepts/sandboxes/) - What happens when a sandbox sleeps

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/#page","headline":"Directory backups","description":"Sandbox SDK 0.x restores a directory backup as a copy-on-write overlay in production and by extracting the archive in local development.","url":"https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/og.png?v=8c9073e99248bf35","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
