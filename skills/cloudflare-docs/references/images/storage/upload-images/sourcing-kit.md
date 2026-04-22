---
title: Upload via Sourcing Kit
description: Bulk import images from Amazon S3 into Cloudflare Images using Sourcing Kit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/storage/upload-images/sourcing-kit/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Upload via Sourcing Kit

With Sourcing Kit you can define one or multiple repositories of images to bulk import from Amazon S3\. Once you have these set up, you can reuse those sources and import only new images to your Cloudflare Images account. This helps you make sure that only usable images are imported, and skip any other objects or files that might exist in that source.

Sourcing Kit also lets you target paths, define prefixes for imported images, and obtain error logs for bulk operations.

## When to use Sourcing Kit

Sourcing Kit can be a good choice if the Amazon S3 bucket you are importing consists primarily of images stored using non-archival storage classes, as images stored using [archival storage classes ↗](https://aws.amazon.com/s3/storage-classes/#Archive) will be skipped and need to be imported separately. Specifically:

* Images stored using S3 Glacier tiers (not including Glacier Instant Retrieval) will be skipped and logged in the migration log.
* Images stored using S3 Intelligent Tiering and placed in Deep Archive tier will be skipped and logged in the migration log.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/sourcing-kit/","name":"Upload via Sourcing Kit"}}]}
```
