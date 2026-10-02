---
description: Send Cloudflare traces and logs to Axiom with OpenTelemetry.
title: Export to Axiom
image: https://developers.cloudflare.com/observability/export/opentelemetry/axiom/og.png?v=501bb85a9cd9f2d9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Export to Axiom

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/export/opentelemetry/axiom/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Axiom stores, searches, and analyzes telemetry data. Export Cloudflare traces and logs to query data and create dashboards.

![Trace view with timing information displayed on a timeline](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=3773,height=1235,format=webp/_astro/axiom-example.BRPbEoGh.png)

This guide configures Axiom to receive Cloudflare traces and logs.

## Prerequisites

Before you begin, you need an active [Axiom account ↗︎](https://app.axiom.co/register). You also need Cloudflare logs or traces to export.

## 1. Create a dataset

Skip this step if you already have a dataset.

1. Log in to your [Axiom account ↗︎](https://app.axiom.co/).
2. Go to **Datasets**.
3. Select **New Dataset**.
4. Enter a name, such as `cloudflare-otel`.
5. Select **Create Dataset**.

## 2. Get an Axiom API token

1. Go to **Settings** > **API Tokens**.
2. Select **Create API Token**.
3. Enter a descriptive name, such as `cloudflare-otel`.
4. Select the **Ingest** permission.
5. Select datasets for the token, or select **All Datasets**.
6. Select **Create**.
7. Copy and securely store the API token.

The API token starts with `xaat-`.

## 3. Configure a Cloudflare Observability destination

Axiom provides separate OpenTelemetry Protocol (OTLP) endpoints for traces and logs:

- **Traces**: `https://api.axiom.co/v1/traces`
- **Logs**: `https://api.axiom.co/v1/logs`

1. In the Cloudflare dashboard, go to **Observability** > **Destinations**. [Go to **OpenTelemetry** ↗](https://dash.cloudflare.com/?to=/:account/observability/destinations)
2. Select **Add destination**.
3. Configure the destination:
   - **Destination name**: Enter `axiom-traces` or `axiom-logs`.
   - **Destination type**: Select *Traces* or *Logs*.
   - **OTLP endpoint**: Enter the matching Axiom endpoint.
4. Add an authentication header:
   - **Header name**: `Authorization`
   - **Header value**: `Bearer <YOUR_API_TOKEN>`
5. Add the dataset header:
   - **Header name**: `X-Axiom-Dataset`
   - **Header value**: Your dataset name
6. Select **Save**.

## 4. Enable export

Creating a destination does not start exporting telemetry. To export [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) or [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/), [configure OpenTelemetry export for your Worker](https://developers.cloudflare.com/workers/observability/opentelemetry-export/). To export [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/), [configure export for your domain](https://developers.cloudflare.com/observability/traces/configuration/#export-traces).

Data may take several minutes to appear in Axiom.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/export/opentelemetry/axiom/#page","headline":"Export to Axiom","description":"Send Cloudflare traces and logs to Axiom with OpenTelemetry.","url":"https://developers.cloudflare.com/observability/export/opentelemetry/axiom/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/export/opentelemetry/axiom/og.png?v=501bb85a9cd9f2d9","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
