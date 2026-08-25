---
description: Create, configure, and manage SQL transformations between streams and sinks
title: Manage pipelines
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage pipelines

Last updated Jun 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn how to:

* Create pipelines with SQL transformations
* View pipeline configuration and SQL
* Delete pipelines when no longer needed

## Create a pipeline

Pipelines execute SQL statements that define how data flows from streams to sinks.

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
[Go to **Pipelines** ↗](https://dash.cloudflare.com/?to=/:account/pipelines/overview)
2. Select **Create Pipeline** to launch the pipeline creation wizard.
3. Follow the wizard to configure your stream, sink, and SQL transformation.

### Wrangler CLI

To create a pipeline, run the [pipelines create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-create) command:

```bash
npx wrangler pipelines create my-pipeline \
  --sql "INSERT INTO my_sink SELECT * FROM my_stream"
```

You can also provide SQL from a file:

```bash
npx wrangler pipelines create my-pipeline \
  --sql-file pipeline.sql
```

Alternatively, to use the interactive setup wizard that helps you configure a stream, sink, and pipeline, run the [pipelines setup](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-setup) command:

```bash
npx wrangler pipelines setup
```

### SQL transformations

Pipelines support SQL statements for data transformation. For complete syntax, supported functions, and data types, see the [SQL reference](https://developers.cloudflare.com/pipelines/sql-reference/).

Common patterns include:

#### Basic data flow

Transfer all data from stream to sink:

```sql
INSERT INTO my_sink SELECT * FROM my_stream
```

#### Filtering events

Filter events based on conditions:

```sql
INSERT INTO my_sink
SELECT * FROM my_stream
WHERE event_type = 'purchase' AND amount > 100
```

#### Selecting specific fields

Choose only the fields you need:

```sql
INSERT INTO my_sink
SELECT user_id, event_type, timestamp, amount
FROM my_stream
```

#### Transforming data

Apply transformations to fields:

```sql
INSERT INTO my_sink
SELECT
  user_id,
  UPPER(event_type) as event_type,
  timestamp,
  amount * 1.1 as amount_with_tax
FROM my_stream
```

#### Route one stream to multiple tables

A single pipeline can run multiple `INSERT` statements, separated by semicolons. Each statement reads from the same stream and writes to a different sink, so you can route ("fan out") events from one stream into several tables based on their content.

This avoids running a separate pipeline for each destination. Each statement filters the stream with its own `WHERE` clause and projects only the columns relevant to that table. This can also be a used as a cost optimization as you will be [billed](https://developers.cloudflare.com/pipelines/platform/pricing/) once for the transformations, not per statement.

```sql
INSERT INTO purchases_sink
SELECT user_id, product_id, amount FROM my_stream
WHERE event_type = 'purchase';

INSERT INTO page_views_sink
SELECT user_id, product_id FROM my_stream
WHERE event_type = 'view_product';
```

For a complete example that fans a live event stream out into five tables, refer to [Fan out a stream to multiple Iceberg tables](https://developers.cloudflare.com/pipelines/examples/bluesky-firehose-fanout/).

## View pipeline configuration

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
2. Select a pipeline to view its SQL transformation, connected streams/sinks, and associated metrics.

### Wrangler CLI

To view a specific pipeline, run the [pipelines get](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-get) command with either the pipeline ID or pipeline name:

```bash
npx wrangler pipelines get <PIPELINE_NAME_OR_ID>
```

To list all pipelines in your account, run the [pipelines list](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-list) command:

```bash
npx wrangler pipelines list
```

## Delete a pipeline

Deleting a pipeline stops data flow from the connected stream to sink.

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
2. Select the pipeline you want to delete. 3\. In the **Settings** tab, and select **Delete**.

### Wrangler CLI

To delete a pipeline, run the [pipelines delete](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-delete) command:

```bash
npx wrangler pipelines delete <PIPELINE_ID>
```

Caution

Deleting a pipeline immediately stops data flow between the stream and sink.

## Limitations

Pipeline SQL cannot be modified after creation. To change the SQL transformation, you must delete and recreate the pipeline.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/#page","headline":"Manage pipelines · Cloudflare Pipelines Docs","description":"Create, configure, and manage SQL transformations between streams and sinks","url":"https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
