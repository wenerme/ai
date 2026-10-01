---
description: Push Cloudflare logs to Basin Pipelines.
title: Enable Basin Pipelines
image: https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/og.png?v=bbd63068f3162e05
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Basin Pipelines

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Basin Pipelines](https://developers.cloudflare.com/basin-pipelines/) ingests events, transforms them with [SQL](https://developers.cloudflare.com/basin-pipelines/sql-reference/), and delivers them to [R2](https://developers.cloudflare.com/r2/) as [Iceberg](https://developers.cloudflare.com/basin-catalog/) tables or as Parquet and JSON files. Logpush can write data to Basin Pipelines as a native destination.

Instead of sending raw logs directly to a storage bucket as JSON, Logpush can route them to a pipeline to filter, enrich, and transform your data into Parquet or Apache Iceberg tables managed by [Basin Catalog](https://developers.cloudflare.com/basin-catalog/). This allows the data to be much more compact and optimized for analytics such as querying with [Basin SQL](https://developers.cloudflare.com/basin-sql/).

The Basin Pipelines destination supports the following Logpush datasets:

| Scope | Datasets |
| --- | --- |
| Zone | `http_requests`, `firewall_events`, `dns_logs` |
| Account | `workers_trace_events` |

For a full list of fields available in each dataset, refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or domain (also known as zone) level.
   - For account: [Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/logs)
   - For domain (also known as zone): [Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Select **Create a Logpush job**.
3. Select **Basin Pipelines** as the destination.
4. In the **Dataset** step, select the dataset from the dropdown.
   - A Pipeline name is auto-generated, but you can edit it.
5. In the **Destination** step, configure the destination:
   - Select an existing R2 bucket or type a new name to create one during setup.
   - Choose the storage format: Parquet, JSON, or [Basin Catalog (Apache Iceberg)](https://developers.cloudflare.com/basin-catalog/).
   - If you select Basin Catalog, enter a catalog namespace and table name.
   - Optionally, expand **Delivery settings** to configure roll size, roll interval, and other destination-specific settings. For more information about these settings, refer to the [Basin Pipelines sinks documentation](https://developers.cloudflare.com/basin-pipelines/sinks/).
6. In the **Transform** step, choose how to process logs before they are written to the Sink:
   - **Simple** forwards all fields without modification (default).
   - **Custom SQL** opens a SQL editor where you can filter, transform, and enrich your data. Refer to the [Basin Pipelines SQL reference](https://developers.cloudflare.com/basin-pipelines/sql-reference/) for a complete list of SQL functions.
7. In the **Review** step, verify your configuration and select **Create**. This automatically creates all required resources, including the [stream](https://developers.cloudflare.com/basin-pipelines/streams/), [sink](https://developers.cloudflare.com/basin-pipelines/sinks/), R2 credentials or catalog token, [pipeline](https://developers.cloudflare.com/basin-pipelines/), and the Logpush job.

Note

It can take a few minutes for the events to start streaming from the Logpush source.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/#page","headline":"Enable Basin Pipelines","description":"Push Cloudflare logs to Basin Pipelines.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/og.png?v=bbd63068f3162e05","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
