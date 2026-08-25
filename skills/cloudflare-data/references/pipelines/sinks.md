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

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sinks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sinks define destinations for your data in Cloudflare Pipelines. They support writing to [R2 Data Catalog](https://developers.cloudflare.com/r2-data-catalog/) as Apache Iceberg tables or to [R2](https://developers.cloudflare.com/r2/) as raw JSON or Parquet files.

Sinks provide exactly-once delivery guarantees, ensuring events are never duplicated or dropped. They can be configured to write files frequently for low-latency ingestion or to write larger, less frequent files for better query performance.

## Learn more

### [Manage sinks](https://developers.cloudflare.com/pipelines/sinks/manage-sinks/)

Create, configure, and delete sinks using Wrangler or the API.

### [Available sinks](https://developers.cloudflare.com/pipelines/sinks/available-sinks/)

Learn about supported sink destinations and their configuration options.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pipelines/sinks/#page","headline":"Sinks · Cloudflare Pipelines Docs","description":"Configure data destinations in Cloudflare Pipelines to write to R2 or R2 Data Catalog.","url":"https://developers.cloudflare.com/pipelines/sinks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
