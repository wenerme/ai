---
description: Move files in and out of a sandbox, keep a workspace after its instance stops, and share files through R2.
title: Work with files in a sandbox
image: https://developers.cloudflare.com/sandbox/files/og.png?v=74a9c89ed01f6f30
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Work with files in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/files/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `Files` class from `@cloudflare/sandbox` moves files between your Worker and a running sandbox, and provides common file system operations. For more information, refer to [Move files in and out of a sandbox](https://developers.cloudflare.com/sandbox/files/manage-files/).

Each sandbox name maps to a Durable Object, which starts a Linux instance when needed. Stopping the instance deletes the files on its disk. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#files-and-processes-end-with-the-instance).

## Persistence

You can keep files from a sandbox in several ways, from a snapshot of the whole disk to one directory kept in R2:

| Goal | Guide | Trade-off |
| --- | --- | --- |
| Continue an agent workspace in a later session | [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/) | Saves the whole disk for 30 days after the last save or restore |
| Keep a workspace without explicit save calls | [Save a sandbox automatically](https://developers.cloudflare.com/sandbox/files/save-a-sandbox-automatically/) | Same as snapshots, plus an alarm in your Durable Object |
| Keep a project across images, or beyond 30 days | [Back up a directory to R2](https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/) | Saves one directory, and your Durable Object stores each backup record |
| Share job inputs and outputs with other systems | [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/) | Renames, locks, and permissions do not work as they do on a local disk |

## Combine approaches

Snapshots do not include mounted directories, so a sandbox can use both. For example, a coding agent can keep its repository and dependencies in a snapshot, and write results to a mounted bucket for other Workers to read. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#mounted-buckets-outlive-every-instance).

## Related resources

- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/)
- [Files API](https://developers.cloudflare.com/sandbox/reference/files/)
- [DirectoryBackup API](https://developers.cloudflare.com/sandbox/reference/directory-backups/)
- [S3Mount API](https://developers.cloudflare.com/sandbox/reference/s3-mounts/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/files/#page","headline":"Work with files in a sandbox","description":"Move files in and out of a sandbox, keep a workspace after its instance stops, and share files through R2.","url":"https://developers.cloudflare.com/sandbox/files/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/files/og.png?v=74a9c89ed01f6f30","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
