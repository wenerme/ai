---
description: Send Cloudflare traces and logs to Honeycomb with OpenTelemetry.
title: Export to Honeycomb
image: https://developers.cloudflare.com/observability/export/opentelemetry/honeycomb/og.png?v=a91ac1dd9ce63aa2
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Export to Honeycomb

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/export/opentelemetry/honeycomb/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Honeycomb is an observability platform for high-cardinality telemetry data. Export Cloudflare telemetry to Honeycomb to query logs, inspect traces, and create dashboards.

![Trace view including POST request, fetch operations, durable object subrequest, and queue send, with timing information displayed on a timeline](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2196,height=704,format=webp/_astro/honeycomb-example.cEkEF1c4.png)

This guide configures Honeycomb to receive Cloudflare traces and logs.

## Prerequisites

Before you begin, you need an active [Honeycomb account ↗︎](https://ui.honeycomb.io/signup). You also need Cloudflare logs or traces to export.

## 1. Get your Honeycomb API key

1. Log in to your [Honeycomb account ↗︎](https://ui.honeycomb.io/).
2. From your profile menu, select **Team Settings**.
3. Select **Environments**, then select the gear icon.
4. Select an environment or create one.
5. Under **API Keys**, select **Create Ingest API Key**.
6. Enter a descriptive name, such as `cloudflare-otel`.
7. Select **Can create services/datasets**.
8. Select **Create**.
9. Copy and securely store the API key.

The API key starts with `hcaik_`.

## 2. Configure Cloudflare Observability destinations

Honeycomb provides separate OpenTelemetry Protocol (OTLP) endpoints for traces and logs:

- **Traces**: `https://api.honeycomb.io/v1/traces`
- **Logs**: `https://api.honeycomb.io/v1/logs`

### Configure a traces destination

1. In the Cloudflare dashboard, go to **Observability** > **Destinations**. [Go to **OpenTelemetry** ↗](https://dash.cloudflare.com/?to=/:account/observability/destinations)
2. Select **Add destination**.
3. Configure the destination:
   - **Destination name**: `honeycomb-traces`
   - **Destination type**: *Traces*
   - **OTLP endpoint**: `https://api.honeycomb.io/v1/traces`
   - **Custom header name**: `x-honeycomb-team`
   - **Custom header value**: Your Honeycomb API key
4. Select **Save**.

### Configure a logs destination

1. Select **Add destination** again.
2. Configure the destination:
   - **Destination name**: `honeycomb-logs`
   - **Destination type**: *Logs*
   - **OTLP endpoint**: `https://api.honeycomb.io/v1/logs`
   - **Custom header name**: `x-honeycomb-team`
   - **Custom header value**: Your Honeycomb API key
3. Select **Save**.

## 3. Enable export

Creating a destination does not start exporting telemetry. To export [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) or [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/), [configure OpenTelemetry export for your Worker](https://developers.cloudflare.com/workers/observability/opentelemetry-export/). To export [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/), [configure export for your domain](https://developers.cloudflare.com/observability/traces/configuration/#export-traces).

Data may take several minutes to appear in Honeycomb.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/export/opentelemetry/honeycomb/#page","headline":"Export to Honeycomb","description":"Send Cloudflare traces and logs to Honeycomb with OpenTelemetry.","url":"https://developers.cloudflare.com/observability/export/opentelemetry/honeycomb/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/export/opentelemetry/honeycomb/og.png?v=a91ac1dd9ce63aa2","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
