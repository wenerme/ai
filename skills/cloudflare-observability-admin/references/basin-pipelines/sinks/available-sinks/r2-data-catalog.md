---
description: Write data as Apache Iceberg tables to Basin Catalog
title: Basin Catalog
image: https://developers.cloudflare.com/basin-pipelines/sinks/available-sinks/r2-data-catalog/og.png?v=9d9855a6c7edd678
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Basin Catalog

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin-pipelines/sinks/available-sinks/r2-data-catalog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Basin Catalog sinks write processed data from pipelines as [Apache Iceberg ↗︎](https://iceberg.apache.org/) tables to [Basin Catalog](https://developers.cloudflare.com/basin-catalog/). Iceberg tables provide ACID transactions, schema evolution, and time travel capabilities for analytics workloads.

To create a Basin Catalog sink, run the `basin pipelines sinks create` command and specify the sink type, target bucket, namespace, and table name:

npmyarnpnpm

```
npx wrangler basin pipelines sinks create my-sink --type basin-catalog --bucket my-bucket --namespace my_namespace --table my_table --catalog-token YOUR_CATALOG_TOKEN
```

```
yarn wrangler basin pipelines sinks create my-sink --type basin-catalog --bucket my-bucket --namespace my_namespace --table my_table --catalog-token YOUR_CATALOG_TOKEN
```

```
pnpm wrangler basin pipelines sinks create my-sink --type basin-catalog --bucket my-bucket --namespace my_namespace --table my_table --catalog-token YOUR_CATALOG_TOKEN
```

Use `basin-catalog` for new sinks. The legacy `r2-data-catalog` value also remains valid, and existing sink configurations do not need to change.

The sink will create the specified namespace and table if they do not exist. Sinks cannot be created for existing Iceberg tables.

## Format

Basin Catalog sinks only support Parquet format. JSON format is not supported for Iceberg tables.

### Compression options

Configure Parquet compression for optimal storage and query performance:

```bash
--compression zstd
```

**Available compression options:**

- `zstd` (default) - Best compression ratio
- `snappy` - Fastest compression
- `gzip` - Good compression, widely supported
- `lz4` - Fast compression with reasonable ratio
- `uncompressed` - No compression

### Row group size

[Row groups ↗︎](https://parquet.apache.org/docs/file-format/configurations/) are sets of rows in a Parquet file that are stored together, affecting memory usage and query performance. Configure the target row group size in MB:

```bash
--target-row-group-size 256
```

## Batching and rolling policy

Control when data is written to Iceberg tables. Configure based on your needs:

- **Lower values**: More frequent writes, smaller files, lower latency
- **Higher values**: Less frequent writes, larger files, better query performance

### Roll interval

Set how often files are written (default: 300 seconds, minimum: 60 seconds):

```bash
--roll-interval 60  # Write files every 60 seconds
```

The minimum interval for Basin Catalog sinks is 60 seconds to prevent compaction issues. Iceberg tables require periodic compaction to merge small files into larger ones for optimal query performance. Writing too often creates merge conflicts with the compaction process.

### Roll size

Set maximum file size in MB before creating a new file:

```bash
--roll-size 100  # Create new file after 100MB
```

## Authentication

Basin Catalog sinks require an API token with [R2 Admin Read & Write permissions](https://developers.cloudflare.com/basin-catalog/manage-catalogs/#create-api-token-in-the-dashboard). This permission grants the sink access to both Basin Catalog and R2 storage.

```bash
--catalog-token YOUR_CATALOG_TOKEN
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin-pipelines/sinks/available-sinks/r2-data-catalog/#page","headline":"Basin Catalog","description":"Write data as Apache Iceberg tables to Basin Catalog","url":"https://developers.cloudflare.com/basin-pipelines/sinks/available-sinks/r2-data-catalog/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-pipelines/sinks/available-sinks/r2-data-catalog/og.png?v=9d9855a6c7edd678","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
