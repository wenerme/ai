---
description: Configure data destinations in Cloudflare Pipelines to write to R2 or R2 Data Catalog.
title: Sinks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Sinks

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sinks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sinks define destinations for your data in Cloudflare Pipelines. They support writing to [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) as Apache Iceberg tables or to [R2](https://developers.cloudflare.com/r2/) as raw JSON or Parquet files.

Sinks provide exactly-once delivery guarantees, ensuring events are never duplicated or dropped. They can be configured to write files frequently for low-latency ingestion or to write larger, less frequent files for better query performance.

## Learn more

### [Manage sinks](https://developers.cloudflare.com/pipelines/sinks/manage-sinks/)

Create, configure, and delete sinks using Wrangler or the API.

### [Available sinks](https://developers.cloudflare.com/pipelines/sinks/available-sinks/)

Learn about supported sink destinations and their configuration options.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pipelines/sinks/#page","headline":"Sinks · Cloudflare Pipelines Docs","description":"Configure data destinations in Cloudflare Pipelines to write to R2 or R2 Data Catalog.","url":"https://developers.cloudflare.com/pipelines/sinks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
