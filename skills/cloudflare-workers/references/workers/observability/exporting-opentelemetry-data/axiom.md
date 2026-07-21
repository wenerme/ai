---
description: Send OpenTelemetry traces and logs from Cloudflare Workers to Axiom.
title: Export to Axiom
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Export to Axiom

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/axiom/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Axiom is a serverless log analytics platform that helps you store, search, and analyze massive amounts of data. By exporting your Cloudflare Workers application telemetry to Axiom, you can:

* Store and query logs and traces at scale
* Create dashboards and alerts to monitor your Workers
![Trace view with timing information displayed on a timeline](https://developers.cloudflare.com/_astro/axiom-example.BRPbEoGh_IlBGJ.webp)

This guide will walk you through exporting OpenTelemetry-compliant traces and logs to Axiom from your Cloudflare Worker application

## Prerequisites

Before you begin, ensure you have:

* An active [Axiom account ↗](https://app.axiom.co/register) (free tier available)
* A deployed Worker that you want to monitor
* An Axiom dataset to send data to

## Step 1: Create a dataset

If you don't already have a dataset to send data to:

1. Log in to your [Axiom account ↗](https://app.axiom.co/)
2. Navigate to **Datasets** in the left sidebar
3. Click **New Dataset**
4. Enter a name (e.g. `cloudflare-workers-otel`)
5. Click **Create Dataset**

## Step 2: Get your Axiom API token and dataset

1. Navigate to **Settings** in the left sidebar
2. Click on **API Tokens**
3. Click **Create API Token**
4. Configure your API token:
  * **Name**: Enter a descriptive name (e.g., `cloudflare-workers-otel`)
  * **Permissions**: Select **Ingest** permission (required for sending telemetry data)
  * **Datasets**: Choose which datasets this token can write to, or select **All Datasets**
5. Click **Create**
6. **Important**: Copy the API token immediately and store it securely - you won't be able to see it again

The API token will look something like: `xaat-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## Step 3: Configure Cloudflare destinations

Now you'll create destinations in the Cloudflare dashboard that point to Axiom.

### Axiom OTLP endpoints

Axiom provides separate OTLP endpoints for traces and logs:

* **Traces**: `https://api.axiom.co/v1/traces`
* **Logs**: `https://api.axiom.co/v1/logs`

### Configure trace or logs destination

1. Navigate to your Cloudflare account's [Workers Observability ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability/pipelines) section
2. Click **Add destination**
3. Configure your trace destination:
  * **Destination Name**: `axiom-traces` (or any descriptive name)
  * **Destination Type**: Select **Traces**
  * **OTLP Endpoint**: `https://api.axiom.co/v1/traces` (or `/v1/logs`)
  * **Custom Headers**: Add two required headers:
    * Authentication header
      * Header name: `Authorization`
      * Header value: `Bearer <your-api-token>`
    * Dataset header:
      * Header name: `X-Axiom-Dataset`
      * Header value: Your dataset name (e.g., `cloudflare-workers-otel`)
4. Click **Save**

## Step 3: Configure your Worker

With your destinations created in the Cloudflare dashboard, update your Worker's configuration to enable telemetry export.

```jsonc
{
  "observability": {
    "traces": {
      "enabled": true,
      // Must match the destination name in the dashboard
      "destinations": ["axiom-traces"]
    },
    "logs": {
      "enabled": true,
      // Must match the destination name in the dashboard
      "destinations": ["axiom-logs"]
    }
  }
}
```

```toml
[observability.traces]
enabled = true
destinations = [ "axiom-traces" ]

[observability.logs]
enabled = true
destinations = [ "axiom-logs" ]
```

After updating your configuration, deploy your Worker for the changes to take effect.

Note

It may take a few minutes after deployment for data to appear in Axiom.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/axiom/#page","headline":"Export to Axiom · Cloudflare Workers docs","description":"Send OpenTelemetry traces and logs from Cloudflare Workers to Axiom.","url":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/axiom/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
