---
description: Create import jobs for images stored in Amazon S3.
title: Import images from S3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Import images from S3

Last updated Sep 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/enable/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure a source to start importing images from your Amazon S3 account.

To create an import job, you must first define an import source.

## Define an import source

1. In the Cloudflare dashboard, go to **Hosted Images** \> **Import from S3**.
[Go to **Import from S3** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted/import)
2. Select **Create Source** to create an import source.
3. In **Source name**, enter a name for your source.
4. In **Bucket name**, enter the S3 bucket name where your images are stored.
5. In **Credentials**, enter your Amazon S3 credentials. This connects Cloudflare Images to your source. Refer to [Credentials](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/credentials/) to set up credentials.
6. Select **Save**.

## Create an import job

1. In the Cloudflare dashboard, go to **Hosted Images** \> **Import from S3**.
[Go to **Import from S3** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted/import)
2. Select **Import images** to create an import job.
3. In **Source**, select a source you defined.
4. (Optional) In **Amazon S3 root path**, enter the Amazon S3 path that contains the images you want to import.
5. (Optional) In **Add a prefix to your delivery path**, enter a prefix for imported images.
6. In **Overwrite images**, choose to overwrite existing images with changed source files or skip the changed files and keep existing images.
7. Select **Start Import**.

Your import job is now created. You can review its status on the **Import from S3** page, including discovered objects, imported images, and errors.

Note

Cloudflare Images warns you when you approach the storage quota for your plan. Import jobs stop when you exhaust the available storage. If you see this warning on the **Import from S3** page, select **View plan** to change your plan limits.

## Next steps

Refer to [Edit source details](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/edit/) to edit existing sources or abort running import jobs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/enable/#page","headline":"Import images from S3 · Cloudflare Images docs","description":"Create import jobs for images stored in Amazon S3.","url":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
