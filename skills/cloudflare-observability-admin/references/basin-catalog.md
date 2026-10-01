---
description: A managed Apache Iceberg data catalog built directly into R2 buckets.
title: Basin Catalog
image: https://developers.cloudflare.com/basin-catalog/og.png?v=c6a88a025de15231
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-catalog/llms.txt
> Use this file to discover all available pages before exploring further.

# Basin Catalog

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin-catalog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Basin Catalog is a managed [Apache Iceberg ↗︎](https://iceberg.apache.org/) data catalog built directly into your R2 bucket. It exposes a standard Iceberg REST catalog interface, so you can connect the engines you already use, like [Spark](https://developers.cloudflare.com/basin-catalog/config-examples/spark-scala/), [Snowflake](https://developers.cloudflare.com/basin-catalog/config-examples/snowflake/), and [PyIceberg](https://developers.cloudflare.com/basin-catalog/config-examples/pyiceberg/).

Basin Catalog is now Generally Available

Basin Catalog, formerly known as R2 Data Catalog, is now Generally Available. Existing configurations and APIs continue to work and will be deprecated in the future.

To report bugs or give feedback, go to the [**#basin-catalog Discord channel** ↗︎](https://discord.cloudflare.com/). If you are having issues with Wrangler, report issues in the [**Wrangler GitHub repository** ↗︎](https://github.com/cloudflare/workers-sdk/issues/new/choose).

Basin Catalog makes it easy to turn an R2 bucket into a data warehouse or lakehouse for a variety of analytical workloads including log analytics, business intelligence, and data pipelines. R2's zero-egress fee model means that data users and consumers can access and analyze data from different clouds, data platforms, or regions without incurring transfer costs.

To get started with Basin Catalog, refer to the [Basin Catalog: Getting started](https://developers.cloudflare.com/basin-catalog/get-started/).

## What is Apache Iceberg?

[Apache Iceberg ↗︎](https://iceberg.apache.org/) is an open table format designed to handle large-scale analytics datasets stored in object storage. Key features include:

- ACID transactions - Ensures reliable, concurrent reads and writes with full data integrity.
- Optimized metadata - Avoids costly full table scans by using indexed metadata for faster queries.
- Full schema evolution - Allows adding, renaming, and deleting columns without rewriting data.

Iceberg is already [widely supported ↗︎](https://iceberg.apache.org/vendors/) by engines like Apache Spark, Trino, Snowflake, DuckDB, and ClickHouse, with a fast-growing community behind it.

## Why do you need a data catalog?

Although the Iceberg data and metadata files themselves live directly in object storage (like [R2](https://developers.cloudflare.com/r2/)), the list of tables and pointers to the current metadata need to be tracked centrally by a data catalog.

Think of a data catalog as a library's index system. While books (your data) are physically distributed across shelves (object storage), the index provides a single source of truth about what books exist, their locations, and their latest editions. Without this index, readers (query engines) would waste time searching for books, might access outdated versions, or could accidentally shelve new books in ways that make them unfindable.

Similarly, data catalogs ensure consistent, coordinated access, which allows multiple query engines to safely read from and write to the same tables without conflicts or data corruption.

## Learn more

### [Get started](https://developers.cloudflare.com/basin-catalog/get-started/)

Learn how to enable the Basin Catalog on your bucket, load sample data, and run your first query.

### [Managing catalogs](https://developers.cloudflare.com/basin-catalog/manage-catalogs/)

Enable or disable Basin Catalog on your bucket, retrieve configuration details, and authenticate your Iceberg engine.

### [Connect to Iceberg engines](https://developers.cloudflare.com/basin-catalog/config-examples/)

Find detailed setup instructions for Apache Spark and other common query engines.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/basin-catalog/#page","headline":"Basin Catalog","description":"A managed Apache Iceberg data catalog built directly into R2 buckets.","url":"https://developers.cloudflare.com/basin-catalog/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-catalog/og.png?v=c6a88a025de15231","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
