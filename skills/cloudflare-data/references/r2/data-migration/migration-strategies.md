---
description: Combine Super Slurper and Sippy to migrate objects to R2 with minimal downtime.
title: Migration Strategies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Migration Strategies

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/data-migration/migration-strategies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use a combination of Super Slurper and Sippy to effectively migrate all objects with minimal downtime.

### When the source bucket is actively being read from / written to

1. Enable Sippy and start using the R2 bucket in your application.
  * This copies objects from your previous bucket into the R2 bucket on demand when they are requested by the application.
  * New uploads will go to the R2 bucket.
2. Use Super Slurper to trigger a one-off migration to copy the remaining objects into the R2 bucket.
  * In the **Destination R2 bucket** \> **Overwrite files?**, select "Skip existing".

### When the source bucket is not being read often

1. Use Super Slurper to copy all objects to the R2 bucket.
  * Note that Super Slurper may skip some objects if they are uploaded after it lists the objects to be copied.
2. Enable Sippy on your R2 bucket, then start using the R2 bucket in your application.
  * New uploads will go to the R2 bucket.
  * Objects which were uploaded while Super Slurper was copying the objects will be copied on-demand (by Sippy) when they are requested by the application.

### Optimizing your Slurper data migration performance

For an account, you can run three concurrent Slurper migration jobs at any given time, and each Slurper migration job can process a set amount of requests per second.

To increase overall throughput and reliability, we recommend splitting your migration into smaller, concurrent jobs using the prefix (or bucket subpath) option.

When creating a migration job:

1. Go to the **Source bucket** step.
2. Under **Define rules**, in **Bucket subpath**, specify subpaths to divide your data by prefix.
3. Complete the data migration set up.

For example, suppose your source bucket contains:

* photos
  * 2024
    * file1.jpg
    * file2.jpg
  * 2023
    * file3.jpg
  * 2019
    * file4.jpg

You can create separate jobs with prefixes such as:

* `/photos/2024` to migrate all 2024 files
* `/photos/202` to migrate all files from 2023 and 2024

Each prefix runs as an independent migration job, allowing Slurper to transfer data in parallel. This improves total transfer speed and ensures that a failure in one job does not interrupt the others.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-migration/migration-strategies/#page","headline":"Migration Strategies · Cloudflare R2 docs","description":"Combine Super Slurper and Sippy to migrate objects to R2 with minimal downtime.","url":"https://developers.cloudflare.com/r2/data-migration/migration-strategies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
