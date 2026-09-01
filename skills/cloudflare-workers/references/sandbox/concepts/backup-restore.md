---
description: Production restore mounts a copy-on-write overlay. Local restore extracts the archive instead.
title: Directory backups
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Directory backups

Last updated Sep 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/concepts/backup-restore/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Backup and restore snapshot a sandbox directory into an R2 archive, then bring that tree back later. The public API is the same in production and in `wrangler dev`. The restore mechanism is not.

Use backups when you want a project directory such as `/workspace` to return later. Use [bucket mounts](https://developers.cloudflare.com/sandbox/guides/mount-buckets/) when a separate storage path such as `/data` should persist independently of the sandbox filesystem.

## Production restore

In production, `restoreBackup()` mounts the squashfs archive with FUSE overlayfs:

* The backup is a read-only lower layer.
* New writes go to a writable upper layer.
* The original archive in R2 does not change.
* Restoring the same handle again discards the upper layer.

The overlay exists only while the container is running. When the sandbox sleeps or the container restarts, the mount is gone and the directory is empty. Store the `DirectoryBackup` handle and restore again.

## Local restore

With `localBucket: true`, `wrangler dev` extracts the archive with `unsquashfs`. The target directory is replaced. There is no overlay, so local restore does not reproduce production FUSE behavior.

## Cross-device renames

Overlayfs treats the lower and upper layers as different devices. A rename that moves a directory from the restored lower layer into the writable upper layer can fail with `EXDEV` (`cross-device link not permitted`).

Vite does this with `node_modules/.vite/deps`. Omit that directory from the backup, or delete it after restore.

For the procedure, refer to [Exclude generated caches](https://developers.cloudflare.com/sandbox/guides/backup-restore/#exclude-generated-caches).

## Related resources

* [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/) \- Create, restore, and exclude caches
* [Backups API](https://developers.cloudflare.com/sandbox/api/backups/) \- Method signatures and options
* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/concepts/sandboxes/) \- What happens when a sandbox sleeps

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/backup-restore/#page","headline":"Directory backups · Cloudflare Sandbox SDK docs","description":"Production restore mounts a copy-on-write overlay. Local restore extracts the archive instead.","url":"https://developers.cloudflare.com/sandbox/concepts/backup-restore/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
