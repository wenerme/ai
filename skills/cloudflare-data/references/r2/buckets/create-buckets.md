---
description: Create R2 buckets using the Cloudflare dashboard or Wrangler CLI.
title: Create new buckets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Create new buckets

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/buckets/create-buckets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can create a bucket from the Cloudflare dashboard or using Wrangler.

Note

Wrangler is [a command-line tool](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for building with Cloudflare's developer products, including R2.

The R2 support in Wrangler allows you to manage buckets and perform basic operations against objects in your buckets. For more advanced use-cases, including bulk uploads or mirroring files from legacy object storage providers, we recommend [rclone](https://developers.cloudflare.com/r2/examples/rclone/) or an [S3-compatible](https://developers.cloudflare.com/r2/api/s3/) tool of your choice.

## Bucket-Level Operations

Create a bucket with the [r2 bucket create](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-create) command:

```sh
wrangler r2 bucket create your-bucket-name
```

Note

* Bucket names can only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).
* Bucket names cannot begin or end with a hyphen.
* Bucket names can only be between 3-63 characters in length.

The placeholder text is only for the example.

List buckets in the current account with the [r2 bucket list](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-list) command:

```sh
wrangler r2 bucket list
```

To delete a bucket, you must first empty it and then delete it. For detailed instructions, refer to [Delete buckets](https://developers.cloudflare.com/r2/buckets/delete-buckets/).

## Notes

* Bucket names and buckets are not public by default. To allow public access to a bucket, refer to [Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).
* For information on controlling access to your R2 bucket with Cloudflare Access, refer to [Protect an R2 Bucket with Cloudflare Access](https://developers.cloudflare.com/r2/tutorials/cloudflare-access/).
* Invalid (unauthorized) access attempts to private buckets do not incur R2 operations charges against that bucket. Refer to the [R2 pricing FAQ](https://developers.cloudflare.com/r2/pricing/#frequently-asked-questions) to understand what operations are billed vs. not billed.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/buckets/create-buckets/#page","headline":"Create new buckets · Cloudflare R2 docs","description":"Create R2 buckets using the Cloudflare dashboard or Wrangler CLI.","url":"https://developers.cloudflare.com/r2/buckets/create-buckets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
