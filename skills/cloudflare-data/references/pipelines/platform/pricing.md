---
description: Cloudflare Pipelines pricing for SQL transforms, sinks, and included usage details.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/platform/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Pipelines charges based on two dimensions:

1. **SQL transforms**: The volume of data processed by stateless SQL.
2. **Sinks**: The volume of data delivered to each sink destination.

Ingress into a Pipeline stream is free. Standard [R2 storage and operations](https://developers.cloudflare.com/r2/pricing/) charges apply for data written to R2 buckets. [R2 Data Catalog](https://developers.cloudflare.com/r2-data-catalog/platform/pricing/) charges apply when writing to Iceberg tables.

All included usage is on a monthly basis.

## Pipelines pricing

|                                            | Workers Paid  |
| ------------------------------------------ | ------------- |
| **Streams (ingress)**                      |               |
| Included                                   | Unlimited     |
| **SQL transforms**                         |               |
| Included                                   | 50 GB / month |
| Additional                                 | $0.04 / GB    |
| **Sinks (egress)** [1](#user-content-fn-1) |               |
| Included                                   | 50 GB / month |
| R2 — JSON format                           | $0.03 / GB    |
| R2 — Parquet / Iceberg                     | $0.06 / GB    |

### Streams

Streams provide durable, distributed log storage that buffers incoming messages. Ingress into a stream is free regardless of volume. A single stream can be read by multiple pipelines.

### SQL transforms

SQL transforms let you filter, reshape, and compute over data before it reaches a sink. Any query currently counts as a transform.

Pricing covers stateless transforms (for example, filter, reshape, unnest, cast, and compute). Future stateful operations such as aggregations, joins, and windows may be priced separately.

### Sinks

Sink pricing is based on the volume of uncompressed data delivered to the destination. The rate varies by output format:

* **JSON**: $0.03 / GB — lowest compute cost, suitable for simple log forwarding.
* **Parquet / Iceberg**: $0.06 / GB — higher compute cost for columnar encoding and Iceberg table management. Best for analytics workloads.

## Billing examples

### Example: filtered ingest to Iceberg with SQL

A pipeline ingests 500 GB of event data per month. A SQL transform filters and reshapes the data, reducing output to 300 GB written to an R2 Data Catalog Iceberg table.

| Dimension       | Usage  | Included  | Billable | Cost       |
| --------------- | ------ | --------- | -------- | ---------- |
| Streams         | 500 GB | Unlimited | 0 GB     | $0.00      |
| SQL transforms  | 500 GB | 50 GB     | 450 GB   | $18.00     |
| Sinks (Iceberg) | 300 GB | 50 GB     | 250 GB   | $15.00     |
| **Total**       |        |           |          | **$33.00** |

## Cloudflare billing policy

To learn more about how usage is billed, refer to [Cloudflare Billing Policy](https://developers.cloudflare.com/billing/understand/billing-policy/).

## Footnotes

1. Sink egress is measured on uncompressed data. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/platform/pricing/#page","headline":"Cloudflare Pipelines - Pricing · Cloudflare Pipelines Docs","description":"Cloudflare Pipelines pricing for SQL transforms, sinks, and included usage details.","url":"https://developers.cloudflare.com/pipelines/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
