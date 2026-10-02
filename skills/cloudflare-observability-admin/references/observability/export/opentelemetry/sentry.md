---
description: Send Cloudflare traces and logs to Sentry with OpenTelemetry.
title: Export to Sentry
image: https://developers.cloudflare.com/observability/export/opentelemetry/sentry/og.png?v=247022c35dd41725
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Export to Sentry

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/export/opentelemetry/sentry/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Sentry provides distributed tracing, logs, and application monitoring. Export Cloudflare telemetry to query data and create alerts or dashboards.

![Sentry trace view with timing information displayed on a timeline](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2474,height=862,format=webp/_astro/sentry-example.DU-HO2rh.png)

This guide configures Sentry to receive Cloudflare traces and logs.

## Prerequisites

Before you begin, you need an active [Sentry account ↗︎](https://sentry.io/signup/). You also need Cloudflare logs or traces to export.

## 1. Create a Sentry project

Skip this step if you already have a project.

1. Log in to your [Sentry account ↗︎](https://sentry.io/).
2. Go to **Insights** > **Projects**.
3. Select [**New Project** ↗︎](https://sentry.io/orgredirect/organizations/:orgslug/insights/projects/new/).
4. Complete the project form, then select **Create Project**.

## 2. Get your Sentry OTLP endpoints

Sentry provides separate OpenTelemetry Protocol (OTLP) endpoints for traces and logs:

- **Traces**: `https://<HOST>/api/<PROJECT_ID>/integration/otlp/v1/traces`
- **Logs**: `https://<HOST>/api/<PROJECT_ID>/integration/otlp/v1/logs`

1. In Sentry, go to [**Settings** > **Projects** ↗︎](https://sentry.io/orgredirect/organizations/:orgslug/settings/projects/).
2. Select your project.
3. Under **SDK Setup**, select **Client Keys (DSN)**.
4. Copy the OTLP endpoints and authentication header.

For endpoint details, refer to [Sentry OTLP documentation ↗︎](https://docs.sentry.io/concepts/otlp/).

## 3. Configure Cloudflare Observability destinations

In the Cloudflare dashboard, go to **Observability** > **Destinations**.

[Go to **OpenTelemetry** ↗](https://dash.cloudflare.com/?to=/:account/observability/destinations)

### Configure a traces destination

1. Select **Add destination**.
2. Configure the destination:
   - **Destination name**: `sentry-traces`
   - **Destination type**: *Traces*
   - **OTLP endpoint**: Your Sentry OTLP traces endpoint
   - **Custom header name**: `x-sentry-auth`
   - **Custom header value**: `sentry sentry_key=<SENTRY_PUBLIC_KEY>`
3. Select **Save**.

### Configure a logs destination

1. Select **Add destination**.
2. Configure the destination:
   - **Destination name**: `sentry-logs`
   - **Destination type**: *Logs*
   - **OTLP endpoint**: Your Sentry OTLP logs endpoint
   - **Custom header name**: `x-sentry-auth`
   - **Custom header value**: `sentry sentry_key=<SENTRY_PUBLIC_KEY>`
3. Select **Save**.

## 4. Enable export

Creating a destination does not start exporting telemetry. To export [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) or [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/), [configure OpenTelemetry export for your Worker](https://developers.cloudflare.com/workers/observability/opentelemetry-export/). To export [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/), [configure export for your domain](https://developers.cloudflare.com/observability/traces/configuration/#export-traces).

Data may take several minutes to appear in Sentry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/export/opentelemetry/sentry/#page","headline":"Export to Sentry","description":"Send Cloudflare traces and logs to Sentry with OpenTelemetry.","url":"https://developers.cloudflare.com/observability/export/opentelemetry/sentry/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/export/opentelemetry/sentry/og.png?v=247022c35dd41725","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
