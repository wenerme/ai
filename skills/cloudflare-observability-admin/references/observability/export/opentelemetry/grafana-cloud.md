---
description: Send Cloudflare traces and logs to Grafana Cloud.
title: Export to Grafana Cloud
image: https://developers.cloudflare.com/observability/export/opentelemetry/grafana-cloud/og.png?v=5df6f3224492c5f5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Export to Grafana Cloud

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/export/opentelemetry/grafana-cloud/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Grafana Cloud provides visualization, alerting, and telemetry analytics. It accepts Cloudflare telemetry through the OpenTelemetry Protocol (OTLP).

Export Cloudflare traces to Grafana Tempo and logs to Grafana Loki.

![Grafana Tempo trace view showing a distributed trace for a service with multiple spans including fetch requests, durable object subrequests, and queue operations, with timing information displayed on a timeline](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1934,height=714,format=webp/_astro/grafana-traces.CuFntNVO.png)

This guide configures Grafana Cloud to receive Cloudflare traces and logs.

## Prerequisites

Before you begin, you need an active [Grafana Cloud account ↗︎](https://grafana.com/auth/sign-up/create-user). You also need Cloudflare logs or traces to export.

## 1. Get your OpenTelemetry credentials

1. Log in to the [Grafana Cloud portal ↗︎](https://grafana.com/).
2. From your organization home page, go to **Connections** > **Add new connection**.
3. Search for `OpenTelemetry`, then select **OpenTelemetry (OTLP)**.
4. Select **Quickstart**, then select **JavaScript**.
5. Select **Create a new token**.
6. Enter a token name, such as `cloudflare-otel`.
7. Select **Create token**, then select **Close**.
8. Copy the `OTEL_EXPORTER_OTLP_ENDPOINT` value from **Environment variables**.
9. Copy the `OTEL_EXPORTER_OTLP_HEADERS` value from the same block.

## 2. Configure Cloudflare Observability destinations

1. In the Cloudflare dashboard, go to **Observability** > **Destinations**. [Go to **OpenTelemetry** ↗](https://dash.cloudflare.com/?to=/:account/observability/destinations)
2. Select **Add destination**.
3. Enter a descriptive destination name, such as `grafana-traces`.
4. For **Destination type**, select *Traces* or *Logs*. Create a separate destination for each type you export.
5. Enter the Grafana OTLP endpoint for your telemetry type:
   - **Traces**: Append `/v1/traces` to the endpoint.
   - **Logs**: Append `/v1/logs` to the endpoint.
6. Add the Grafana authentication header:
   - **Header name**: `Authorization`
   - **Header value**: The Basic authentication value from Grafana
7. Select **Save**.

The endpoint resembles `https://otlp-gateway-prod-us-east-2.grafana.net/otlp`.

## 3. Enable export

Creating a destination does not start exporting telemetry. To export [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) or [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/), [configure OpenTelemetry export for your Worker](https://developers.cloudflare.com/workers/observability/opentelemetry-export/). To export [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/), [configure export for your domain](https://developers.cloudflare.com/observability/traces/configuration/#export-traces).

Data may take several minutes to appear in Grafana Cloud.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/export/opentelemetry/grafana-cloud/#page","headline":"Export to Grafana Cloud","description":"Send Cloudflare traces and logs to Grafana Cloud.","url":"https://developers.cloudflare.com/observability/export/opentelemetry/grafana-cloud/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/export/opentelemetry/grafana-cloud/og.png?v=5df6f3224492c5f5","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
