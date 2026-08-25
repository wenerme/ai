---
description: Ingest, transform, and deliver streaming data to R2 as Apache Iceberg tables or Parquet and JSON files.
title: Cloudflare Pipelines
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Pipelines

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Pipelines is in **open beta**, and any developer with a [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/) can start using it.

Ingest, transform, and load streaming data into Apache Iceberg or Parquet in R2.

Available on Paid plans

Cloudflare Pipelines ingests events, transforms them with SQL, and delivers them to R2 as [Iceberg tables](https://developers.cloudflare.com/r2-data-catalog/) or as Parquet and JSON files.

Whether you're processing server logs, mobile application events, IoT telemetry, or clickstream data, Pipelines provides durable ingestion via HTTP endpoints or Worker bindings, SQL-based transformations, and exactly-once delivery to R2\. This makes it easy to build analytics-ready data warehouses and lakehouses without managing streaming infrastructure.

Create your first pipeline by following the [getting started guide](https://developers.cloudflare.com/pipelines/getting-started) or running this [Wrangler](https://developers.cloudflare.com/workers/wrangler/) command:

```sh
npx wrangler pipelines setup
```

---

## Features

[Create your first pipeline](https://developers.cloudflare.com/pipelines/getting-started/)

Build your first pipeline to ingest data via HTTP or Workers, apply SQL transformations, and deliver to R2 as Iceberg tables or Parquet files.

Get started

[Streams](https://developers.cloudflare.com/pipelines/streams/)

Durable, buffered queues that receive events via HTTP endpoints or Worker bindings.

Learn about Streams

[Pipelines](https://developers.cloudflare.com/pipelines/pipelines/)

Connect streams to sinks with SQL transformations that validate, filter, transform, and enrich your data at ingestion time.

Learn about Pipelines

[Sinks](https://developers.cloudflare.com/pipelines/sinks/)

Configure destinations for your data. Write Apache Iceberg tables to R2 Data Catalog or export as Parquet and JSON files.

Learn about Sinks

[Examples](https://developers.cloudflare.com/pipelines/examples/)

Follow end-to-end examples, including how to fan one stream out into multiple Iceberg tables.

Browse examples

---

## Related products

[R2](https://developers.cloudflare.com/r2/)

Cloudflare R2 Object Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

[Workers](https://developers.cloudflare.com/workers/)

Cloudflare Workers allows developers to build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

---

## More resources

### [Limits](https://developers.cloudflare.com/pipelines/platform/limits/)

Learn about pipelines limits.

### [@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.

### [Developer Discord](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pipelines/#page","headline":"Pipelines · Cloudflare Pipelines Docs","description":"Ingest, transform, and deliver streaming data to R2 as Apache Iceberg tables or Parquet and JSON files.","url":"https://developers.cloudflare.com/pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
