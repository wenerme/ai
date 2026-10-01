---
description: Compare monthly rates across all Basin products.
title: Pricing
image: https://developers.cloudflare.com/basin/platform/pricing/og.png?v=1e7f03300ed545d3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin/platform/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Basin pricing includes Pipelines processing, Catalog operations, and SQL queries. All included usage allocations on this page apply monthly.

R2 storage, read, and write operations add separate charges. This page excludes R2 rates and costs from every table and example. Refer to [R2 pricing](https://developers.cloudflare.com/r2/pricing/).

## [Basin Pipelines](https://developers.cloudflare.com/basin-pipelines/platform/pricing/)

Pipelines charges for SQL transforms and sink delivery. Stream ingress remains free without a usage limit.

| Dimension | Monthly included usage | Additional usage rate |
| --- | --- | --- |
| Stream ingress | Unlimited | Free |
| SQL transforms | 50 GB | $0.04 per GB |
| Sink delivery, JSON | 50 GB shared sink allowance | $0.03 per GB |
| Sink delivery, Parquet or Iceberg | 50 GB shared sink allowance | $0.06 per GB |

Sink billing uses uncompressed data delivered to each destination.

## [Basin Catalog](https://developers.cloudflare.com/basin-catalog/platform/pricing/)

Catalog charges for operations and optional compaction. Both compaction dimensions apply only when compaction is enabled.

| Dimension | Monthly included usage | Additional usage rate |
| --- | --- | --- |
| Catalog operations | 1 million operations | $9 per million operations |
| Compaction data processed | 10 GB | $0.005 per GB |
| Compaction objects processed | 1 million objects | $2 per million objects |

Snapshot expiration does not have a separate charge. Related R2 and Catalog operations may still incur charges.

## [Basin SQL](https://developers.cloudflare.com/basin-sql/platform/pricing/)

SQL charges for compressed data scanned from R2. Each query has a 10 MB minimum billable scan.

| Dimension | Monthly included usage | Additional usage rate |
| --- | --- | --- |
| Compressed data scanned | 10 GB | $0.0025 per GB ($2.50 per TB) |

Queries that fail before or during execution do not incur SQL scan charges. This includes syntax, system, and runtime failures.

Metadata-only operations, including `EXPLAIN`, `SHOW`, and `DESCRIBE`, do not scan data. Related R2 and Catalog operations may still incur charges.

## End-to-end Basin data pipeline

Assume 500 GB enters a stream and is filtered with SQL transforms to deliver 300 GB of uncompressed data to Basin Catalog.

Catalog usage includes 500,000 operations and 20 GB of compaction across 200,000 objects. SQL queries scan 50 GB of compressed data.

Monthly included allocations are otherwise unused. The SQL total already accounts for per-query minimums.

| Product and dimension | Formula | Cost |
| --- | --- | --- |
| Pipelines stream ingress | 500 GB × $0 | $0.00 |
| Pipelines SQL transforms | (500 GB - 50 GB) × $0.04 per GB | $18.00 |
| Pipelines Iceberg sink | (300 GB - 50 GB) × $0.06 per GB | $15.00 |
| **Pipelines subtotal** | $0.00 + $18.00 + $15.00 | **$33.00** |
| Catalog operations | 500,000 operations within included usage | $0.00 |
| Catalog compaction data | (20 GB - 10 GB) × $0.005 per GB | $0.05 |
| Catalog compaction objects | 200,000 objects within included usage | $0.00 |
| **Catalog subtotal** | $0.00 + $0.05 + $0.00 | **$0.05** |
| SQL scans | (50 GB - 10 GB) × $0.0025 per GB | $0.10 |
| **SQL subtotal** | $0.10 | **$0.10** |
| **Total Basin cost** | $33.00 + $0.05 + $0.10 | **$33.15** |

R2 costs are not included in this example.

## Basin Catalog and Basin SQL

Assume 500,000 Catalog operations and 20 GB of compaction across 200,000 objects. SQL queries scan 50 GB of compressed data after per-query minimums.

Monthly included allocations are otherwise unused.

| Product and dimension | Formula | Cost |
| --- | --- | --- |
| Catalog operations | 500,000 operations within included usage | $0.00 |
| Catalog compaction data | (20 GB - 10 GB) × $0.005 per GB | $0.05 |
| Catalog compaction objects | 200,000 objects within included usage | $0.00 |
| **Catalog subtotal** | $0.00 + $0.05 + $0.00 | **$0.05** |
| SQL scans | (50 GB - 10 GB) × $0.0025 per GB | $0.10 |
| **SQL subtotal** | $0.10 | **$0.10** |
| **Pipelines subtotal** | Not used | **$0.00** |
| **Total Basin cost** | $0.05 + $0.10 | **$0.15** |

R2 costs are not included in this example.

## Basin Catalog with DuckDB or Trino

Assume 500,000 Catalog operations and 20 GB of compaction across 200,000 objects. Queries use an external engine instead of Basin SQL.

Monthly included allocations are otherwise unused. Configure [DuckDB](https://developers.cloudflare.com/basin-catalog/config-examples/duckdb/) or [Trino](https://developers.cloudflare.com/basin-catalog/config-examples/trino/) to access the Catalog.

| Product and dimension | Formula | Cost |
| --- | --- | --- |
| Catalog operations | 500,000 operations within included usage | $0.00 |
| Catalog compaction data | (20 GB - 10 GB) × $0.005 per GB | $0.05 |
| Catalog compaction objects | 200,000 objects within included usage | $0.00 |
| **Catalog subtotal** | $0.00 + $0.05 + $0.00 | **$0.05** |
| **Basin SQL subtotal** | Not used | **$0.00** |
| **Total Basin cost** | $0.05 + $0.00 | **$0.05** |

R2 costs are not included in this example.

For billing calculation details, refer to the [Cloudflare billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin/platform/pricing/#page","headline":"Pricing","description":"Compare monthly rates across all Basin products.","url":"https://developers.cloudflare.com/basin/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/basin/platform/pricing/og.png?v=1e7f03300ed545d3","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
