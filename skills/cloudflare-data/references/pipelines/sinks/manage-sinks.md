---
description: Create, configure, and manage sinks for data storage
title: Manage sinks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage sinks

Last updated Jun 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sinks/manage-sinks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn how to:

* Create and configure sinks for data storage
* View sink configuration
* Delete sinks when no longer needed

## Create a sink

Sinks are made available to pipelines as SQL tables using the sink name (e.g., `INSERT INTO my_sink SELECT * FROM my_stream`).

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
[Go to **Pipelines** ↗](https://dash.cloudflare.com/?to=/:account/pipelines/overview)
2. Select **Create Pipeline** to launch the pipeline creation wizard.
3. Complete the wizard to create your sink along with the associated stream and pipeline.

### Wrangler CLI

To create a sink, run the [pipelines sinks create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-create) command:

```bash
npx wrangler pipelines sinks create <SINK_NAME> \
  --type r2 \
  --bucket my-bucket \
```

For sink-specific configuration options, refer to [Available sinks](https://developers.cloudflare.com/pipelines/sinks/available-sinks/).

Alternatively, to use the interactive setup wizard that helps you configure a stream, sink, and pipeline, run the [pipelines setup](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-setup) command:

```bash
npx wrangler pipelines setup
```

## View sink configuration

### Dashboard

1. In the Cloudflare dashboard, go to **Pipelines** \> **Sinks**.
2. Select a sink to view its configuration.

### Wrangler CLI

To view a specific sink, run the [pipelines sinks get](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-get) command with either the sink ID or sink name:

```bash
npx wrangler pipelines sinks get <SINK_NAME_OR_ID>
```

To list all sinks in your account, run the [pipelines sinks list](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-list) command:

```bash
npx wrangler pipelines sinks list
```

## Delete a sink

### Dashboard

1. In the Cloudflare dashboard, go to **Pipelines** \> **Sinks**.
2. Select the sink you want to delete.
3. In the **Settings** tab, navigate to **General**, and select **Delete**.

### Wrangler CLI

To delete a sink, run the [pipelines sinks delete](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-delete) command:

```bash
npx wrangler pipelines sinks delete <SINK_ID>
```

Caution

Deleting a sink stops all data writes to that destination.

## Limitations

* Sinks cannot be modified after creation. To change sink configuration, you must delete and recreate the sink.
* The R2 Data Catalog Sink does not currently support writing to R2 buckets into a different jurisdiction.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sinks/manage-sinks/#page","headline":"Manage sinks · Cloudflare Pipelines Docs","description":"Create, configure, and manage sinks for data storage","url":"https://developers.cloudflare.com/pipelines/sinks/manage-sinks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
