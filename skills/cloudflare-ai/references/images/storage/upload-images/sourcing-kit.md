---
description: Bulk import images from Amazon S3 into Cloudflare Images using Sourcing Kit.
title: Upload via Sourcing Kit
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload via Sourcing Kit

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Sourcing Kit you can define one or multiple repositories of images to bulk import from Amazon S3\. Once you have these set up, you can reuse those sources and import only new images to your Cloudflare Images account. This helps you make sure that only usable images are imported, and skip any other objects or files that might exist in that source.

Sourcing Kit also lets you target paths, define prefixes for imported images, and obtain error logs for bulk operations.

## When to use Sourcing Kit

Sourcing Kit can be a good choice if the Amazon S3 bucket you are importing consists primarily of images stored using non-archival storage classes, as images stored using [archival storage classes ↗](https://aws.amazon.com/s3/storage-classes/#Archive) will be skipped and need to be imported separately. Specifically:

* Images stored using S3 Glacier tiers (not including Glacier Instant Retrieval) will be skipped and logged in the migration log.
* Images stored using S3 Intelligent Tiering and placed in Deep Archive tier will be skipped and logged in the migration log.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/#page","headline":"Upload via Sourcing Kit · Cloudflare Images docs","description":"Bulk import images from Amazon S3 into Cloudflare Images using Sourcing Kit.","url":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
