---
description: Bulk import images from Amazon S3 into Cloudflare Images.
title: Import from S3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Import from S3

Last updated Sep 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Import from S3 lets you define one or more sources of images to bulk import from Amazon S3\. You can reuse a source to import only new images into your Cloudflare Images account.

Imports skip unsupported objects and files in the source. You can also target paths, define image prefixes, and view error logs.

## Check storage class support

Use Import from S3 for buckets that contain images in non-archival storage classes. Import from S3 skips images in [archival storage classes ↗](https://aws.amazon.com/s3/storage-classes/#Archive), which require a separate import.

Import from S3 skips images stored using S3 Glacier tiers (not including Glacier Instant Retrieval) and logs them in the migration log. It also skips and logs images stored using S3 Intelligent Tiering in the Deep Archive tier.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/#page","headline":"Import from S3 · Cloudflare Images docs","description":"Bulk import images from Amazon S3 into Cloudflare Images.","url":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
